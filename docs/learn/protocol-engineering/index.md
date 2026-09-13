# Protocol Engineering Track

The Protocol Engineering track is an advanced engineering curriculum for developers building decentralized applications, complex smart contracts, and Web3 infrastructure.
It emphasizes production-grade practices, the Foundry development framework, rigorous testing methodologies, and smart contract auditing.

## Target Outcomes

Upon completing this track, developers will be able to:

- Establish a reproducible local EVM development environment using Foundry (Forge, Cast, Anvil).
- Write secure, gas-efficient Solidity contracts with a clear mental model of EVM storage layout.
- Implement and extend standard contract architectures including ERC-20, ERC-721, and UUPS upgradeable proxies.
- Write robust unit tests, invariant fuzz tests, and gas benchmarks using Forge.
- Build production DeFi primitives including constant product AMMs, staking pools, and oracle integrations.
- Connect full-stack frontend web applications to smart contracts using Viem, Wagmi, and modern connection libraries.
- Run static analysis tools, identify common smart contract vulnerabilities, and draft structured audit reports.

## Prerequisites

- Proficiency in general programming concepts (functions, loops, data structures, and asynchronous execution).
- Familiarity with the Linux command line and Git version control.
- Completion of the [Builder Foundations](/learn/builder-foundations/) track or equivalent practical Solidity experience.

## Curated Syllabus

### Module 1: Local Development Environment & Modern Tooling

1. **Toolchain Setup & CLI Configuration**
   - Node.js, pnpm, and Git configurations for monorepos and multi-package repositories.
   - Installing and configuring Foundry (`foundryup`, `forge`, `cast`, `anvil`).
2. **Local EVM Nodes & Fork Testing**
   - Running local development nodes with Anvil.
   - Forking live mainnets and testnets for local state reproduction.
3. **Key Management & Network Interactions**
   - Handling private keys securely with encrypted keystores and hardware signers.
   - Interacting with deployed contracts from the command line using `cast`.
   - Managing public and private JSON-RPC providers such as Alchemy, Infura, and QuickNode.

### Module 2: Solidity Architecture & Low-Level Primitives

1. **Solidity Type System & Fundamentals**
   - Value types versus reference types including arrays, structs, and mappings.
   - Visibility specifiers and mutability rules.
   - Custom errors versus string reverts for gas efficiency.
2. **EVM Storage Layout & Memory Model**
   - 32-byte storage slots, packing variables, and storage pointers.
   - Stack execution limits, memory allocation, and read-only calldata.
3. **Contract Inheritance & Interfaces**
   - Abstract contracts, multiple inheritance, and C3 linearization.
   - Defining and implementing standardized interfaces.
4. **Low-Level Calls & Address Interactions**
   - Sending Ether with `call`, `transfer`, and `send`.
   - Forwarding execution context with `delegatecall` and reading state via `staticcall`.
   - Fallback and receive functions.

### Module 3: Token Standards & Contract Upgradability

1. **ERC-20 Fungible Tokens**
   - Core interface, balance mappings, allowances, and transfer logic.
   - OpenZeppelin standard implementations and permit signatures via EIP-2612.
2. **ERC-721 Non-Fungible Tokens**
   - Token ownership mappings, minting workflows, and safe transfer checks.
   - Metadata architecture: off-chain IPFS storage versus fully on-chain SVG rendering.
3. **ERC-1155 Multi-Token Standard**
   - Batch transfers, mixed fungible and non-fungible balances, and gas savings.
4. **Upgradeable Proxy Patterns**
   - The delegatecall proxy mechanism and storage collision risks.
   - EIP-1967 storage slots.
   - Transparent Upgradeable Proxies versus Universal Upgradeable Proxy Standard (UUPS).

### Module 4: Rigorous Testing, Fuzzing & Gas Optimization

1. **Solidity-Native Testing with Forge**
   - Structuring tests, assertions, and console logging in Solidity.
   - Forge cheatcodes including `prank`, `deal`, `warp`, `roll`, `expectRevert`, and `expectEmit`.
2. **Fuzzing & Invariant Testing**
   - Stateless fuzz testing: generating random inputs to detect edge-case overflows and assumptions.
   - Stateful invariant testing: defining system invariants across sequential multi-step actor transactions.
3. **Gas Profiling & Optimization Techniques**
   - Generating gas reports and snapshots with `forge snapshot`.
   - Optimization patterns: caching array lengths, unchecked math, custom errors, and slot packing.

### Module 5: DeFi Protocol Engineering & Oracles

1. **Constant Product Automated Market Makers**
   - Architecting a Uniswap v2 core exchange: pair contracts, factory pattern, and liquidity tokens.
   - Computing swap output amounts with 0.3 percent fees without floating-point math.
2. **Staking & Reward Distribution Algorithms**
   - Implementing scalable reward distribution using the Synthetix staking rewards algorithm.
   - Time-weighted average rewards per token to eliminate iterative looping over stakers.
3. **Collateralized Borrowing & Liquidation Engines**
   - Tracking user collateral balances, debt positions, and health factors.
   - Designing permissionless liquidation callbacks with bonus collateral incentives.
4. **Chainlink Oracles & Verifiable Randomness**
   - Consuming decentralized price feeds with stale check validation.
   - Requesting cryptographically proven randomness via Chainlink VRF.

### Module 6: Full-Stack dApp Development

1. **Modern Web3 Frontend Stack**
   - Connecting React or Vue frontends with Viem and Wagmi.
   - Managing wallet connection states with RainbowKit or AppKit.
2. **Contract State Reads & Transaction Lifecycle**
   - Reading contract data with multicall batching.
   - Preparing, signing, and monitoring user transactions with pending and receipt states.
   - Handling wallet rejections and user balance errors gracefully.
3. **Decentralized Metadata Storage**
   - Interfacing with IPFS and Arweave via Pinata or decentralized storage gateways.
4. **Deployment & CI/CD Pipelines**
   - Automating Foundry build and test pipelines with GitHub Actions.
   - Deploying frontend dApps statically to Cloudflare Pages.

### Module 7: Smart Contract Security & Auditing Foundations

1. **Common Vulnerability Patterns**
   - Reentrancy attacks including single-function, cross-function, and read-only reentrancy.
   - Access control flaws, missing modifiers, and initialization vulnerabilities.
   - Arithmetic edge cases, precision loss in integer division, and front-running.
2. **Automated Security Tooling**
   - Running static analysis with Slither and Aderyn.
   - Linting codebases with Solhint.
3. **Exploit Analysis & Case Studies**
   - Deconstructing historic on-chain exploits: The DAO, Parity Multi-Sig, and Euler Finance.
4. **Audit Reporting & Remediation**
   - Classifying findings by severity: Critical, High, Medium, Low, and Informational.
   - Writing remediation recommendations and verification tests.
