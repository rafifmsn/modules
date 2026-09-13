# The Ethereum Virtual Machine (EVM) Architecture

In the previous module, we examined how Ethereum transformed the blockchain from a static ledger into a Turing-complete state machine regulated by gas metering.
However, conceptualizing a "world computer" raises a direct systems question: what does this machine look like under the hood?

In Bitcoin, the state machine is specialized and intentionally limited: transactions consume unspent outputs (UTXOs) and evaluate lightweight Forth-like verification scripts.
While Bitcoin scripts can verify cryptographic signatures, enforce multi-sig thresholds, and establish relative timelocks, they cannot maintain internal state variables, loop dynamically, or evaluate complex arbitrary business logic.

In 2013, Vitalik Buterin recognized that by embedding a complete virtual machine directly inside a decentralized blockchain, the network could transform from a distributed calculator into a **global, decentralized supercomputer**.
That computational engine is the **Ethereum Virtual Machine (EVM)**.

The EVM is the runtime execution environment for every smart contract deployed on Ethereum and dozens of compatible chains (such as Polygon, Avalanche C-Chain, Arbitrum, Optimism, BNB Chain, and Base).
It serves as a deterministic state machine: given a current world state $\sigma$ and a valid transaction $T$, the EVM executes the transaction's bytecode and deterministically transitions the world into a new state $\sigma'$:

$$f_{\text{EVM}}(\sigma, T) = \sigma'$$

Every validating full node on Earth independently runs the exact same EVM bytecode on its local hardware, executing every instruction in lockstep to arrive at the identical cryptographic state root.

## Architectural Components of the EVM

The EVM is a **quasi-Turing-complete, stack-based machine**.
During execution, the EVM partitions data across six distinct physical regions, each with fundamentally different lifecycles, access costs, and performance characteristics:

```mermaid
flowchart TD
    subgraph VolatileContext ["Volatile Execution Context (Cleared After Tx)"]
        Stack["The Stack: 1,024 Slots of 256-Bit Words (LIFO)"]
        Memory["Memory: Byte-Addressable Linear Buffer (Volatile)"]
        Calldata["Calldata: Read-Only Transaction Payload"]
        ReturnData["ReturnData: Buffer Holding Returned Bytes from Sub-calls"]
    end

    subgraph PersistentState ["Persistent State (Stored on Disk via Merkle Trie)"]
        Storage["Storage: 2^256 Slots of 256-Bit Words (Persistent Disk DB)"]
        Code["Code: Immutable Contract Bytecode ROM"]
    end
```

Let us examine the primary four data regions in depth:

### 1. The Stack: The Computational Engine

The EVM is not a register-based machine (like modern x86 or ARM CPUs).
It is a **stack machine** that operates on a Last-In, First-Out (LIFO) stack.
- **Capacity:** Exactly **1,024 items**. If an operation pushes a 1,025th item onto the stack, the EVM triggers a `Stack Overflow` exception and halts.
- **Word Size:** Each stack slot holds exactly one 256-bit word (matching Keccak-256 and secp256k1 curve parameters).
- **The 16-Slot Access Constraint ("Stack Too Deep"):** While the stack can hold 1,024 words, EVM swap and duplicate instructions (`SWAP1` through `SWAP16`, `DUP1` through `DUP16`) can only reach the top 16 items on the stack.
  If a smart contract function attempts to manipulate more than 16 local variables simultaneously, the Solidity compiler aborts with the error: `"Stack too deep"`.

```mermaid
flowchart TD
    subgraph StackEval ["Stack Evaluation of 3 + 5"]
        Step1["1. PUSH1 0x03 -> Stack: [0x03]"] --> Step2["2. PUSH1 0x05 -> Stack: [0x05, 0x03]"]
        Step2 --> Step3["3. ADD -> Pops 0x05 and 0x03, Pushes 0x08"]
        Step3 --> Step4["Stack Result: [0x08]"]
    end
```

### 2. Volatile Memory: Temporary Scratchpad

EVM **Memory** is an ephemeral, linear byte-addressable array allocated during transaction execution.
- **Lifecycle:** Created when a message call begins, expanded dynamically as needed, and completely destroyed (wiped from RAM) the moment execution completes.
- **Addressing:** Bytes are read using `MLOAD` and written using `MSTORE` (32-byte chunks) or `MSTORE8` (single bytes).
- **Quadratic Memory Expansion Gas:** Memory is cheap to allocate initially, but becomes quadratically expensive as it grows to protect nodes against memory-exhaustion attacks.

The gas cost to expand memory to $a$ words (where 1 word = 32 bytes) is:

$$C_{\text{mem}}(a) = 3 \times a + \left\lfloor \frac{a^2}{512} \right\rfloor$$

Allocating a few kilobytes of memory costs negligible gas.
However, attempting to allocate several gigabytes of memory causes the $\frac{a^2}{512}$ quadratic term to skyrocket, rapidly burning the entire transaction gas limit and halting execution.

### 3. Persistent Storage: The On-Chain Database

EVM **Storage** is the persistent, permanent key-value database that survives across transactions.
Every smart contract has its own isolated storage space.
- **Keyspace:** Stupendous: $2^{256}$ keys mapping to $2^{256}$ values of 256-bit words.
  Every storage slot is initialized to zero (`0x00`).
- **Disk Persistence:** Storage modifications are written directly to the host node's underlying database (such as LevelDB or Pebble) and committed to the contract's Merkle Patricia Storage Trie.
- **The Gas Expense (Disk I/O):** Because writing to storage forces thousands of global nodes to write data permanently to physical SSDs, storage operations are the most expensive opcodes in the EVM:
  - Reading a warm storage slot (`SLOAD`): 100 gas.
  - Reading a cold storage slot (`SLOAD`): 2,100 gas.
  - Writing a new value to a zero storage slot (`SSTORE`): **20,000 gas**.

### 4. Calldata: The Read-Only Transaction Payload

**Calldata** is the immutable, read-only byte array sent along with a transaction or cross-contract call.
- **Structure:** Contains the 4-byte function selector followed by ABI-encoded arguments.
- **Immutability:** Contract code cannot modify calldata in place.
- **Gas Efficiency:** Calldata is significantly cheaper than memory or storage (4 gas per zero byte, 16 gas per non-zero byte), making it ideal for passing large datasets (such as rollup state batches).

## The EVM Opcode Execution Cycle

At runtime, the EVM operates as a sequential fetch-decode-execute loop:

```mermaid
flowchart TD
    PC["Program Counter (PC = 0)"] --> Fetch["Fetch Opcode Byte from Bytecode[PC]"]
    Fetch --> DeductGas["Deduct Fixed & Dynamic Gas Cost from Gas Remaining"]
    DeductGas --> CheckGas{"Gas Remaining >= 0?"}
    CheckGas -- No --> OOG["Abort: Out-of-Gas Exception"]
    CheckGas -- Yes --> Decode["Decode Opcode (e.g. 0x01 = ADD)"]
    Decode --> Execute["Pop Operands from Stack, Compute, Push Result"]
    Execute --> IncrementPC["Increment PC (PC = PC + 1 + ArgumentBytes)"]
    IncrementPC --> PC
```

1. **Program Counter (PC):** The EVM maintains a pointer indicating which byte of contract bytecode to execute next.
2. **Fetch and Decode:** The byte at `Bytecode[PC]` is matched to its corresponding opcode (e.g., `0x60` = `PUSH1`, `0x01` = `ADD`, `0x54` = `SLOAD`, `0xF3` = `RETURN`).
3. **Gas Deduction:** The gas cost of the opcode is calculated. If the remaining transaction gas is insufficient, an exception is thrown.
4. **Execution:** Operands are popped from the stack, the operation is executed in memory or storage, and the output is pushed back onto the stack.
5. **PC Advance:** The program counter advances to the next instruction until reaching `RETURN`, `STOP`, `REVERT`, or `SELFDESTRUCT`.

## Cross-Contract Interaction: `CALL` vs. `DELEGATECALL`

In decentralized finance, smart contracts rarely operate in isolation.
Protocols constantly invoke other contracts.
The EVM provides two primary opcodes for cross-contract interaction, each establishing fundamentally different execution contexts:

```mermaid
flowchart TD
    subgraph Call_Isolated ["Standard CALL: Isolated Context"]
        Alice1[Alice] -->|Calls| ContractA1[Contract A]
        ContractA1 -->|CALL| ContractB1[Contract B]
        Note1["msg.sender = Contract A<br/>Storage Modified = Contract B's Storage"]
    end

    subgraph Delegatecall_Shared ["DELEGATECALL: Borrowed Code / Shared Context"]
        Alice2[Alice] -->|Calls| Proxy[Proxy Contract A]
        Proxy -->|DELEGATECALL| Implementation[Implementation Contract B]
        Note2["msg.sender = Alice (Preserved!)<br/>Storage Modified = Proxy Contract A's Storage!"]
    end
```

### 1. The `CALL` Opcode (Isolated Context)

When Contract A executes a standard `CALL` to Contract B:
- **`msg.sender`:** Inside Contract B, `msg.sender` becomes **Contract A**.
- **Storage Context:** Code executes inside Contract B's storage space. Any storage writes modify Contract B's state.

### 2. The `DELEGATECALL` Opcode (The Foundation of Upgradeable Proxies)

Introduced in EIP-7, `DELEGATECALL` allows Contract A to execute code from Contract B **inside Contract A's own storage and execution context**:
- **`msg.sender` and `msg.value`:** Preserved from the original caller (Alice).
- **Storage Context:** Code is fetched from Contract B, but **all reads and writes mutate Contract A's storage slots**.

This architectural primitive enabled the modern **Proxy Pattern**:
- Users interact with an immutable **Proxy Contract** that holds all user funds, token balances, and state variables.
- The proxy executes a `DELEGATECALL` to an **Implementation Contract** holding the business logic.
- To upgrade the protocol, developers deploy a new implementation contract and update a single storage pointer in the proxy, preserving all user balances while upgrading the underlying code.

#### Real-World Battle Scars: The Parity Multi-Sig Freeze (2017)
The dual nature of `DELEGATECALL` carries acute architectural risks.
In November 2017, the second Parity Multi-Sig wallet exploit occurred when an uninitialized shared library contract used by hundreds of multi-sig wallets was accidentally claimed and self-destructed (`kill()` / `SELFDESTRUCT`).
Because all user wallets delegated their core functionality to this single library address, the deletion of the library bytecode instantly froze **513,774 ETH** across 587 wallets, rendering the funds permanently unrecoverable.

## Deterministic Address Derivation: `CREATE` vs. `CREATE2`

When deploying a new smart contract to Ethereum, where does its 20-byte address come from?
The EVM provides two contract creation opcodes with fundamentally different mathematical properties:

```mermaid
flowchart LR
    subgraph Create_Nonce ["CREATE: Nonce-Dependent"]
        Sender1[Sender Address] & Nonce[Account Nonce] --> Hash1[Keccak-256 Hash]
        Hash1 --> Addr1[Contract Address]
    end

    subgraph Create2_Deterministic ["CREATE2: Deterministic Counterfactual"]
        Sender2[Deployer Address] & Salt[32-Byte Salt] & Bytecode[InitCode Hash] --> Hash2[Keccak-256 Hash with 0xff Prefix]
        Hash2 --> Addr2[Predictable Address Known Prior to Deployment!]
    end
```

### 1. The `CREATE` Opcode (Traditional Deployment)

Under `CREATE`, the contract address is derived from the deployer's address and the deployer's sequential transaction count (nonce):

$$\text{Address} = \text{Rightmost20Bytes}\Big(\text{Keccak-256}\big(\text{RLP}(\text{DeployerAddress}, \text{Nonce})\big)\Big)$$

- **Limitation:** The address depends on the exact chronological order in which transactions are broadcast.
  If the deployer broadcasts multiple transactions simultaneously, a reordering in the mempool will change the contract address.

### 2. The `CREATE2` Opcode (Counterfactual Determinism)

Introduced in EIP-1014 (the Constantinople upgrade), `CREATE2` decouples address derivation from the deployer's nonce:

$$\text{Address} = \text{Rightmost20Bytes}\Big(\text{Keccak-256}\big(\mathtt{0xff} \mathbin{\Vert} \text{DeployerAddress} \mathbin{\Vert} \text{Salt} \mathbin{\Vert} \text{Keccak-256}(\text{InitCode})\big)\Big)$$

- **`0xff` Prefix:** A 1-byte constant that guarantees addresses generated via `CREATE2` can never collide with addresses generated via `CREATE`.
- **`Salt`:** An arbitrary 32-byte value chosen by the developer.
- **`InitCode`:** The contract's deployment bytecode and constructor arguments.

#### Why `CREATE2` Revolutionized Ethereum Architecture:
- **Counterfactual Deployment:** Users and protocols can calculate the exact address where a smart contract will live **years before it is physically deployed on-chain**.
- **State Channels and Layer 2s:** Users can deposit funds into a counterfactual smart contract address off-chain, and deploy the contract to Layer 1 only if a dispute arises.
- **Factory Predictability:** Decentralized exchanges (like Uniswap V2 and V3) use `CREATE2` to deterministically calculate liquidity pool addresses from the sorted addresses of the two traded tokens:
  $$\text{PoolAddress} = f(\text{Factory}, \text{TokenA}, \text{TokenB})$$
  eliminating the need for on-chain registry lookups and dramatically saving gas.

## The Next Question: How Are Computational Costs Measured and Priced?

We have explored the internal anatomy of the EVM: how stack, memory, storage, and calldata interact across the opcode lifecycle.
However, every step of this computational machine is strictly regulated by gas metering.

How does the protocol decide what an opcode is worth?
Why is reading from disk thousands of times more expensive than adding two numbers in memory?
Why did early Ethereum suffer from wild, volatile gas price spikes during market crashes?
How did **EIP-1559** completely redesign Ethereum's fee market by burning the base fee and formalizing priority tips?
To explore the economic physics of smart contract execution, we proceed to **Gas Economics and Execution Halting**.
