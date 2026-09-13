# Transaction Lifecycle and State Transitions

In the previous module, we examined how block headers act as cryptographic envelopes that bind transaction payloads to consensus roots.
However, blocks do not generate themselves spontaneously.
To the end user, executing a blockchain transaction appears simple: Alice enters an address, clicks "Send" in her wallet, and watches her balance decrease while Bob's balance increases.

Under the surface, however, an incoming transaction initiates a complex, multi-stage distributed journey.
It travels through client cryptographic signing, RPC ingestion filters, memory staging queues, validator auction markets, and deterministic virtual machine execution engines before permanently altering the global state of the network.

Understanding this lifecycle is essential for protocol engineers, smart contract developers, and system architects.
Every latency spike, stuck transaction, and front-running exploit occurs somewhere along this pathway.

## End-to-End Transaction Pipeline

Before dissecting the specific sub-systems, let us observe the overall chronological flow of a transaction from creation to final settlement:

```mermaid
sequenceDiagram
    autonumber
    actor Alice as Alice (User Wallet)
    participant RPC as JSON-RPC Node
    participant Mempool as Global P2P Mempool
    participant Builder as Block Proposer / Miner
    participant EVM as Virtual Machine / State Engine
    participant Ledger as Canonical Blockchain State

    Alice->>Alice: 1. Construct payload, set nonce, gas, & sign with sk
    Alice->>RPC: 2. Broadcast via eth_sendRawTransaction
    RPC->>RPC: 3. Intrinsic validation checks (syntax, funds, signature)
    RPC->>Mempool: 4. Gossip transaction to peer mempools
    Mempool->>Builder: 5. Builder selects highest-fee transactions
    Builder->>EVM: 6. Execute transactions sequentially & calculate State Root
    EVM->>Ledger: 7. Package into Block N+1 and broadcast to network
    Ledger->>Alice: 8. Transaction mined! (Receipt emitted, state updated)
```

## Phase 1: Construction and Client-Side Signing

A transaction begins inside Alice's client application or wallet (such as MetaMask, Rabby, or a command-line script).
Alice specifies three primary parameters:
- **Recipient (`to`):** The destination 20-byte address (either an Externally Owned Account or a Smart Contract).
- **Value (`value`):** The amount of native cryptocurrency to transfer (measured in wei, where $1 \text{ ETH} = 10^{18} \text{ wei}$, or satoshis, where $1 \text{ BTC} = 10^8 \text{ satoshis}$).
- **Data Payload (`data`):** An arbitrary byte array. Empty for simple payments, but populated with function selectors and ABI-encoded parameters when interacting with smart contracts.

The wallet automatically attaches vital operational fields:

### The Nonce (Replay Protection and Sequential Ordering)

In account-based systems like Ethereum, the **nonce** is an integer scalar strictly tracking the number of transactions sent from that account:

$$\text{Nonce} \in \{0, 1, 2, 3, \dots\}$$

The nonce enforces two critical guarantees:
1. **Replay Protection:** An attacker like Mallory who intercepts Alice's signed transaction on the network cannot broadcast it a second time to drain Alice's funds again. Once a transaction with nonce $N$ is mined, any subsequent transaction from Alice's account must have nonce $N+1$.
2. **Deterministic Sequence:** If Alice broadcasts transaction A (nonce 5) and transaction B (nonce 6) simultaneously, the network will never execute transaction B before transaction A, regardless of which transaction arrives at a validator first.

### Fee Specification: EIP-1559 Parameters

Under Ethereum's EIP-1559 standard, the wallet attaches three fee parameters:
- **`gasLimit`:** The maximum number of gas units the sender authorizes this transaction to consume (such as 21,000 for a simple transfer, or 250,000 for a complex DeFi swap).
- **`maxFeePerGas`:** The absolute maximum price per gas unit (in gwei) the sender is willing to pay.
- **`maxPriorityFeePerGas`:** The direct tip paid to the block proposer to incentivize fast inclusion.

### Cryptographic Serialization and Signing

Once all fields are assembled, the wallet serializes the payload using **Recursive Length Prefix (RLP)** encoding, hashes the encoded bytes using Keccak-256, and signs the resulting 32-byte digest using the account's private key ($sk$) via ECDSA.
The resulting raw transaction hex string (containing the payload and the $(r, s, v)$ signature tuple) is completely self-contained and tamper-proof.

## Phase 2: RPC Ingestion and Static Validation

The wallet transmits the serialized hex string to a blockchain node via an HTTP or WebSocket JSON-RPC call: `eth_sendRawTransaction`.

The receiving node does not forward the transaction immediately.
To protect itself and its peers from denial-of-service spam, the node performs strict **static validation checks**:

```mermaid
flowchart TD
    RawTx["Inbound Raw Transaction"] --> Check1{"1. Syntax Check:<br/>Proper RLP encoding?"}
    Check1 -- Fail --> Drop1["Drop: Invalid Encoding"]
    Check1 -- Pass --> Check2{"2. Size Check:<br/>Payload <= Max Limit (e.g. 128 KB)?"}
    Check2 -- Fail --> Drop2["Drop: Oversized Tx"]
    Check2 -- Pass --> Check3{"3. Signature Check:<br/>Recover valid public key via ecrecover?"}
    Check3 -- Fail --> Drop3["Drop: Invalid Signature"]
    Check3 -- Pass --> Check4{"4. Intrinsic Gas Check:<br/>gasLimit >= G_intrinsic?"}
    Check4 -- Fail --> Drop4["Drop: Intrinsic Gas Too Low"]
    Check4 -- Pass --> Check5{"5. Nonce Check:<br/>Nonce >= current account nonce?"}
    Check5 -- Fail --> Drop5["Drop: Nonce Too Low (Already Spent)"]
    Check5 -- Pass --> Check6{"6. Balance Check:<br/>Balance >= Value + (gasLimit * maxFee)?"}
    Check6 -- Fail --> Drop6["Drop: Insufficient Funds for Gas"]
    Check6 -- Pass --> Mempool["Insert into Local Mempool & Gossip to Peers"]
```

### The Intrinsic Gas Calculation

Before executing a single opcode, every transaction must pay a non-refundable baseline cost called **Intrinsic Gas** ($G_{\text{intrinsic}}$):

$$G_{\text{intrinsic}} = 21000 + G_{\text{calldata}} + G_{\text{access\_list}} + G_{\text{creation}}$$

- **Base Cost (21,000 gas):** Covers signature verification, nonce incrementation, balance checks, and disk I/O record keeping.
- **Calldata Cost:**
  - 4 gas for every zero byte ($0x00$).
  - 16 gas for every non-zero byte.
- **Contract Creation Cost:** An additional 32,000 gas if the transaction deploys a new contract (`to` field is empty).

If the transaction's specified `gasLimit` is less than $G_{\text{intrinsic}}$, the node rejects the transaction immediately at zero computational cost to the miner.

## Phase 3: The Mempool (Memory Pool) Dynamics

Once validated, the transaction enters the node's **Mempool** (memory pool).
The mempool is not a single, synchronized global database.
It is an ephemeral, in-memory holding pen maintained independently by every full node.

```mermaid
flowchart LR
    subgraph Mempool Queues
        Pending["Pending Queue<br/>Executable immediately: Nonce == Account Nonce"]
        Queued["Queued / Future Queue<br/>Stalled: Nonce > Account Nonce (Gapped)"]
    end

    Pending --> Execution[Ready for Block Inclusion]
    Queued -.->|Wait for missing nonces| Pending
```

### Pending vs. Queued Transactions

A node categorizes transactions into two distinct internal queues:
1. **Pending Queue:** Transactions whose nonce matches the account's current state nonce ($N_{\text{tx}} = N_{\text{state}}$). These are immediately executable and ready to be packaged into a block.
2. **Queued (Future) Queue:** Transactions whose nonce is higher than the current state nonce ($N_{\text{tx}} > N_{\text{state}}$).
   For example, if Alice's current account nonce is 10, and she broadcasts a transaction with nonce 12, the node places it in the queued pool.
   It will sit dormant until a transaction with nonce 11 is received and mined.
   If nonce 11 is never mined, nonce 12 will eventually expire and be dropped.

### Replace-by-Fee (RBF) and Speeding Up Transactions

If network traffic surges, low-fee transactions can become stuck in the mempool for hours or days.
A sender can overwrite a pending transaction by broadcasting a replacement transaction containing the **identical nonce** but a higher fee.

Under standard client policies (such as Geth or Bitcoin Core):
- The replacement transaction must pay a `maxFeePerGas` that is at least **10 percent higher** than the original transaction.
- When nodes receive the higher-paying replacement, they drop the original low-fee transaction from their pending queue and gossip the replacement to peers.

### Production Reality: The Mempool as a Dark Forest

Because the public mempool is unencrypted and transparent, transactions are visible to everyone before execution.
This transparency creates an adversarial environment often referred to as the "Dark Forest":
- Automated arbitrage searchers like Eve run bots that continuously parse pending transactions in the mempool.
- If Alice broadcasts a large token swap on a decentralized exchange, Eve detects the slippage Alice's transaction will cause.
- Eve broadcasts a front-running transaction with a higher priority tip to buy the token right before Alice, followed by a back-running transaction to sell the token immediately after Alice.
- This dynamic, known as a **Sandwich Attack**, is part of the broader domain of **Maximal Extractable Value (MEV)**, demonstrating that transaction ordering directly carries financial consequences.

## Phase 4: Block Assembly and State Transitions

Block builders and miners monitor their mempools, sorting pending transactions in descending order of profitability (maximizing priority tips).

The actual execution of a block is mathematically modeled as a deterministic **State Transition Function**:

$$\sigma_{t+1} = \Pi(\sigma_t, B_{t+1})$$

where:
- $\sigma_t$ represents the global world state at block $t$.
- $B_{t+1}$ is the newly assembled block of transactions $[T_1, T_2, \dots, T_k]$.
- $\Pi$ is the block-level state transition function.

```mermaid
flowchart TD
    subgraph Sequential Block Execution
        S0["State sigma_0 (Initial World State)"] --> T1["Execute Tx 1"]
        T1 --> S1["State sigma_1"]
        S1 --> T2["Execute Tx 2"]
        T2 --> S2["State sigma_2"]
        S2 --> Tn["Execute Tx N"]
        Tn --> SFinal["Final State sigma_{t+1}"]
        SFinal --> NewRoot["Compute New World State Root (stateRoot)"]
    end
```

### The Transaction-Level Transition ($\Upsilon$)

For each individual transaction $T$ inside the block, the virtual machine applies the formal state transition function:

$$\sigma_{i} = \Upsilon(\sigma_{i-1}, T)$$

Execution proceeds through atomic stages:
1. **Pre-execution Debit:** The maximum potential fee ($\text{gasLimit} \times \text{EffectiveGasPrice}$) is temporarily deducted from the sender's account to guarantee payment capacity.
2. **Nonce Increment:** The sender's account nonce is incremented by 1:
   $$N_{\text{sender}} \leftarrow N_{\text{sender}} + 1$$
3. **Execution Context:** The EVM allocates stack, volatile memory, and storage access caches.
   If the transaction interacts with smart contracts, opcodes execute sequentially, deducting gas units for each operation.
4. **Final Fee Settlement and Refunds:**
   - The actual gas consumed ($G_{\text{used}}$) is calculated.
   - Any unused gas is refunded back to the sender's balance:
     $$\text{Refund} = (\text{gasLimit} - G_{\text{used}}) \times \text{EffectiveGasPrice}$$
   - The base fee portion is burned, and the priority fee portion is credited to the block proposer's account.

## Phase 5: Receipts and Event Logging

When transaction execution completes, the node generates a permanent record called a **Transaction Receipt** ($R$).

```mermaid
classDiagram
    class TransactionReceipt {
        +uint8 status (1 for Success, 0 for Revert)
        +uint256 cumulativeGasUsed
        +bytes logsBloom (256-byte Bloom Filter)
        +Log[] logs (Contract Event Logs)
    }
```

Receipts are not stored inside the state trie because they do not represent mutable balances or storage slots.
Instead:
- All receipts in a block are organized into a dedicated **Receipts Merkle Patricia Trie**.
- The root of this trie is committed to the block header as `receiptsRoot`.
- Decentralized applications query receipts via RPC (`eth_getTransactionReceipt`) to confirm execution success and parse event logs (such as ERC-20 `Transfer` events) emitted during execution.

## The Next Question: How is Ledger State Stored and Modeled?

We have traced how the state transition function mutates global state block by block.
However, this leads directly to a deeper architectural question:
What does the state $\sigma$ actually *look like* inside a node's database?

Is the ledger structured as an array of discrete, unspent digital banknotes (like Bitcoin's UTXO model)?
Or is it modeled as a global balance sheet where accounts have balances and internal storage slots (like Ethereum's Account model)?
Why did this fundamental design fork lead to radical differences in concurrency, parallel transaction execution, smart contract expressiveness, and state bloat?
To explore these diverging philosophies, we turn to **Ledger State Models: UTXO vs. Account**.
