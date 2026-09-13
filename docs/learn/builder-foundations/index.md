# Builder Foundations Track

The Builder Foundations track bridges conceptual theory and production engineering.
It focuses on zero-overhead environments, direct chain queries, your first deployed contracts, and a basic frontend connection, anchoring every theoretical concept with a working script or deployed artifact.

## Target Outcomes

Upon completing this track, learners will be able to:

- Generate cryptographic keypairs, sign messages in script, and verify signatures programmatically.
- Query JSON-RPC endpoints directly to read blocks, receipts, logs, and account balances.
- Write, compile, and deploy custom Solidity contracts to a public testnet using the Remix browser environment.
- Implement, deploy, and inspect standard ERC-20 and ERC-721 contracts using audited OpenZeppelin libraries.
- Connect a web frontend to a wallet provider to execute contract reads and state-changing writes.
- Diagnose execution errors, out-of-gas conditions, and transaction reverts with block explorers.

## Prerequisites

- Basic JavaScript or TypeScript knowledge (variables, functions, async/await, and fetch APIs).
- Familiarity with modern web development toolchains (Node.js, npm/pnpm).
- Completion of the [Blockchain Fundamentals](/learn/fundamentals/) track or equivalent theoretical understanding.

## Curated Syllabus

### Module 1: Cryptographic Primitives in Code

1. **Keys, Signatures & Addresses**
   - Setting up a minimal Node.js scripting environment with Viem.
   - Generating random private keys and deriving public keys and Ethereum addresses.
   - Signing arbitrary messages using personal sign mechanics and inspecting r, s, and v components.
2. **Signature Verification & Authentication**
   - Recovering signer addresses from signatures on-chain and off-chain.
   - Simulating how Web3 authentication works without passwords.
3. **Wallet Mechanics Under the Hood**
   - How browser extensions manage keys and request user confirmations.
   - Funding a development wallet using public testnet faucets.

### Module 2: Interacting Directly with the Node

1. **JSON-RPC Architecture**
   - Connecting directly to an RPC node provider via HTTP and WebSockets.
   - Making raw JSON-RPC requests for methods like `eth_blockNumber`, `eth_getBalance`, and `eth_getTransactionByHash`.
2. **Decoding Transactions & Receipts**
   - Inspecting raw transaction fields: nonce, gas limit, max fee, recipient, and calldata.
   - Reading transaction receipts: status codes, cumulative gas used, and effective gas price.
3. **Logs & Event Filtering**
   - How contracts log events to the receipt bloom filter.
   - Writing a tiny event listener script to monitor testnet activity in real time.

### Module 3: First Smart Contracts in Remix

1. **Solidity Syntax Essentials**
   - Writing basic contracts using Remix IDE without local build tool complexity.
   - State variables, unsigned integers, booleans, strings, and address types.
   - Function visibility (`public`, `external`, `internal`, `private`) and state mutability (`view`, `pure`).
2. **State Mutation & Error Handling**
   - Updating on-chain state with write functions.
   - Guarding execution using `require` statements and custom errors.
   - Emitting custom events for off-chain indexing.
3. **Deployment & Scripted Execution**
   - Compiling contracts and selecting target compiler versions in Remix.
   - Deploying to the Sepolia testnet via browser wallet injection.
   - Writing a Node.js script with Viem to read state and trigger contract functions programmatically.

### Module 4: Working with Token Standards

1. **Deploying Fungible Tokens (ERC-20)**
   - Importing OpenZeppelin standard contracts inside Remix.
   - Configuring token name, symbol, decimals, and initial premint supply.
   - Transferring tokens, setting allowances, and inspecting balances on Etherscan.
2. **Deploying Non-Fungible Tokens (ERC-721)**
   - Writing an NFT contract with public minting and max supply constraints.
   - Setting up basic token URI metadata pointing to IPFS gateways.
   - Verifying contract source code directly on a public block explorer.

### Module 5: Minimal Web Interfaces

1. **Wallet Connection Mechanics**
   - Setting up a basic web project using Vite, React or plain HTML, and Viem.
   - Requesting account access through `window.ethereum` and tracking active chain IDs.
   - Handling network switches, account changes, and wallet disconnections.
2. **Reading & Displaying State**
   - Fetching dynamic contract state on page load.
   - Updating UI components automatically when new blocks or events arrive.
3. **Executing Transactions from UI**
   - Encoding function calldata and prompting user transaction approvals.
   - Managing user feedback during pending states, confirmations, and user rejections.

### Module 6: Gas & Failure Modes

1. **Understanding Transaction Economics**
   - Gas units versus gas price, base fee burns, and priority tips.
   - Estimating gas limits before broadcasting transactions.
2. **Debugging Reverts & Failures**
   - Interpreting revert reasons, out-of-gas errors, and nonce desynchronization.
   - Inspecting contract call traces inside block explorers to pinpoint revert locations.
3. **Foundational Security Awareness**
   - Common pitfalls: `tx.origin` authorization, unchecked transfers, and bad access controls.
   - The rule of least privilege when granting token allowances.
