# Blockchain Fundamentals Track

The Blockchain Fundamentals track provides a rigorous conceptual and architectural foundation in distributed ledgers, cryptographic primitives, and decentralized protocols.
It synthesizes core computer science principles with real-world blockchain mechanics, omitting speculative trading material in favor of protocol engineering concepts.

## Target Outcomes

Upon completing this track, learners will be able to:

- Trace the historical evolution and computer science breakthroughs that led to decentralized consensus.
- Understand how cryptographic hash functions, asymmetric keypairs, and Merkle trees guarantee data integrity.
- Compare how state transitions occur across UTXO and account-based blockchain architectures.
- Evaluate the security, finality guarantees, and trade-offs between Proof of Work, Proof of Stake, and BFT consensus.
- Analyze virtual machine execution environments, gas metering mechanics, and the role of oracles.
- Deconstruct the mathematical mechanics of automated market makers, collateralized lending, and token distribution models.
- Explain Layer 2 scaling architectures including Optimistic and Zero-Knowledge rollups.

## Prerequisites

- High-level familiarity with computer science concepts (data structures, networking basics, and state machines).
- General comfort reading algorithmic pseudocode and architectural diagrams.
- No prior smart contract programming experience required.

## Curated Syllabus

### Module 1: Foundations of Distributed Trust & Cryptography

1. **[The Double-Spending Problem & Digital Cash History](/learn/fundamentals/01-distributed-trust/01-double-spending-and-digital-cash)**
   - Centralized clearinghouses versus decentralized verification.
   - Pre-Bitcoin systems: DigiCash, Hashcash, and B-money.
2. **[Cryptographic Hash Functions & Merkle Trees](/learn/fundamentals/01-distributed-trust/02-cryptographic-hash-functions-and-merkle-trees)**
   - Determinism, pre-image resistance, collision resistance, and avalanche effect.
   - Merkle trees, Merkle proofs, and efficient state verification.
3. **[Asymmetric Cryptography & Digital Signatures](/learn/fundamentals/01-distributed-trust/03-asymmetric-cryptography-and-digital-signatures)**
   - Public-private keypairs and elliptic curve cryptography (secp256k1, ed25519).
   - Message signing, signature verification, and address derivation.
4. **[Peer-to-Peer Networks & Network Topologies](/learn/fundamentals/01-distributed-trust/04-peer-to-peer-networks-and-topologies)**
   - Gossip protocols, node discovery, peer connectivity, and network latency.

### Module 2: Blockchain Architecture & State Models

1. **[Anatomy of a Block & Block Headers](/learn/fundamentals/02-architecture-and-state/01-block-anatomy-and-headers)**
   - Block headers, previous block hashes, timestamps, nonces, and transaction roots.
2. **[Transaction Lifecycle & State Transitions](/learn/fundamentals/02-architecture-and-state/02-transaction-lifecycle-and-state-transitions)**
   - Transaction broadcasting, the memory pool, fee estimation, and inclusion.
   - State transition functions: converting ledger state from block n to block n+1.
3. **[Ledger State Models: UTXO vs Account Model](/learn/fundamentals/02-architecture-and-state/03-ledger-state-models-utxo-vs-account)**
   - Bitcoin Unspent Transaction Output verification model.
   - Ethereum global world-state trie and balance account model.
4. **[Forks, Finality & Reorganizations](/learn/fundamentals/02-architecture-and-state/04-forks-finality-and-reorganizations)**
   - Soft forks versus hard forks.
   - Longest-chain rules, block reorganizations, and probabilistic versus deterministic finality.

### Module 3: Consensus Mechanisms & Game Theory

1. **[The Byzantine Generals Problem](/learn/fundamentals/03-consensus-and-game-theory/01-byzantine-generals-problem)**
   - Distributed fault tolerance, safety versus liveness, and network partition assumptions.
2. **[Proof of Work & Nakamoto Consensus](/learn/fundamentals/03-consensus-and-game-theory/02-proof-of-work-and-nakamoto-consensus)**
   - Sybil resistance through computational work.
   - Dynamic difficulty adjustment and energy expenditure trade-offs.
3. **[Proof of Stake & Finality Gadgets](/learn/fundamentals/03-consensus-and-game-theory/03-proof-of-stake-and-finality-gadgets)**
   - Economic security, validator registration, and attestation committees.
   - Slashing conditions, the nothing-at-stake problem, and Casper LMD-GHOST mechanisms.
4. **[Alternative & Hybrid Consensus Models](/learn/fundamentals/03-consensus-and-game-theory/04-alternative-and-hybrid-consensus-models)**
   - Delegated Proof of Stake, Practical Byzantine Fault Tolerance, and DAG-based consensus.

### Module 4: Programmability, Virtual Machines & Tooling

1. **[From Static Ledgers to Programmable State](/learn/fundamentals/04-programmability-and-vm/01-static-ledgers-to-programmable-state)**
   - Scripting limitations in Bitcoin script.
   - Turing-completeness in distributed computation.
2. **[The Ethereum Virtual Machine](/learn/fundamentals/04-programmability-and-vm/02-ethereum-virtual-machine)**
   - Stack, memory, and persistent storage layout.
   - Bytecode compilation, contract deployment, and execution flow.
3. **[Gas Economics & Execution Halting](/learn/fundamentals/04-programmability-and-vm/03-gas-economics-and-execution-halting)**
   - Preventing infinite execution through opcode gas metering.
   - Base fees, priority fees via EIP-1559, and revert mechanics.
4. **[Wallets & Account Abstraction](/learn/fundamentals/04-programmability-and-vm/04-wallets-and-account-abstraction)**
   - Hierarchical Deterministic wallets and seed phrase derivation via BIP-32, BIP-39, and BIP-44.
   - Externally Owned Accounts versus Smart Contract Accounts via ERC-4337.
5. **[The Oracle Problem](/learn/fundamentals/04-programmability-and-vm/05-the-oracle-problem)**
   - Deterministic execution limits regarding external off-chain data.
   - Decentralized oracle networks, data aggregation, and cryptographic proofs.

### Module 5: Decentralized Systems: Tokens, Protocols & Governance

1. **[Token Standards & Digital Ownership](/learn/fundamentals/05-decentralized-systems/01-token-standards-and-digital-ownership)**
   - Fungible tokens via ERC-20, non-fungible tokens via ERC-721, and multi-tokens via ERC-1155.
   - Metadata storage: on-chain storage versus IPFS and decentralized file networks.
2. **[Automated Market Makers & Liquidity Pools](/learn/fundamentals/05-decentralized-systems/02-automated-market-makers-and-liquidity-pools)**
   - Constant product formula (x \* y = k).
   - Liquidity provider shares, fee distribution, slippage, and impermanent loss.
3. **[Collateralized Lending & Protocol Solvency](/learn/fundamentals/05-decentralized-systems/03-collateralized-lending-and-solvency)**
   - Over-collateralization, borrowing capacity, liquidation thresholds, and health factors.
4. **[Tokenomics & Economic Incentive Design](/learn/fundamentals/05-decentralized-systems/04-tokenomics-and-economic-incentive-design)**
   - Supply schedules: fixed caps, algorithmic issuance, and burn mechanics.
   - Incentive alignment, staking mechanisms, and governance distribution.
5. **[Decentralized Autonomous Organizations](/learn/fundamentals/05-decentralized-systems/05-decentralized-autonomous-organizations)**
   - Proposal lifecycles, token-weighted voting, quadratic voting, and timelock controllers.

### Module 6: Scalability, Layer 2 & Protocol Security

1. **[The Blockchain Trilemma](/learn/fundamentals/06-scalability-and-security/01-blockchain-trilemma)**
   - Balancing decentralization, security, and transaction throughput.
2. **[Layer 2 Fundamentals](/learn/fundamentals/06-scalability-and-security/02-layer-2-fundamentals)**
   - State channels, sidechains, and off-chain execution with on-chain settlement.
3. **[Rollup Architectures: Optimistic vs Zero-Knowledge](/learn/fundamentals/06-scalability-and-security/03-rollup-architectures-optimistic-vs-zk)**
   - Optimistic rollups: fraud proofs, challenge periods, and sequencer operations.
   - Zero-Knowledge rollups: validity proofs and instant cryptographic finality.
4. **[Interoperability & Cross-Chain Bridges](/learn/fundamentals/06-scalability-and-security/04-interoperability-and-cross-chain-bridges)**
   - Lock-and-mint bridges, light client verification, and relay networks.
   - Security assumptions and bridge attack vectors.
5. **[Protocol Security & Maximum Extractable Value](/learn/fundamentals/06-scalability-and-security/05-protocol-security-and-mev)**
   - Reentrancy, front-running, sandwich attacks, and transaction ordering mechanics.
   - Formal verification and security auditing methodologies.
