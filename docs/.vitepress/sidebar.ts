import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.SidebarMulti = {
  "/archive/": [
    {
      text: "Archive & Sandbox",
      items: [{ text: "Testing Suite", link: "/archive/" }],
    },
  ],
  "/learn/fundamentals/": [
    {
      text: "Blockchain Fundamentals",
      items: [
        { text: "Track Overview", link: "/learn/fundamentals/" },
        { text: "Back to All Tracks", link: "/learn/" },
      ],
    },
    {
      text: "Part 1: Distributed Trust & Cryptography",
      collapsed: false,
      items: [
        {
          text: "Double-Spending & Digital Cash",
          link: "/learn/fundamentals/01-distributed-trust/01-double-spending-and-digital-cash",
        },
        {
          text: "Hash Functions & Merkle Trees",
          link: "/learn/fundamentals/01-distributed-trust/02-cryptographic-hash-functions-and-merkle-trees",
        },
        {
          text: "Asymmetric Cryptography & Signatures",
          link: "/learn/fundamentals/01-distributed-trust/03-asymmetric-cryptography-and-digital-signatures",
        },
        {
          text: "P2P Networks & Topologies",
          link: "/learn/fundamentals/01-distributed-trust/04-peer-to-peer-networks-and-topologies",
        },
      ],
    },
    {
      text: "Part 2: Architecture & State Models",
      collapsed: false,
      items: [
        {
          text: "Block Anatomy & Headers",
          link: "/learn/fundamentals/02-architecture-and-state/01-block-anatomy-and-headers",
        },
        {
          text: "Transaction Lifecycle & State Transitions",
          link: "/learn/fundamentals/02-architecture-and-state/02-transaction-lifecycle-and-state-transitions",
        },
        {
          text: "UTXO vs Account Model",
          link: "/learn/fundamentals/02-architecture-and-state/03-ledger-state-models-utxo-vs-account",
        },
        {
          text: "Forks, Finality & Reorganizations",
          link: "/learn/fundamentals/02-architecture-and-state/04-forks-finality-and-reorganizations",
        },
      ],
    },
    {
      text: "Part 3: Consensus Mechanisms & Game Theory",
      collapsed: false,
      items: [
        {
          text: "Byzantine Generals Problem",
          link: "/learn/fundamentals/03-consensus-and-game-theory/01-byzantine-generals-problem",
        },
        {
          text: "Proof of Work & Nakamoto Consensus",
          link: "/learn/fundamentals/03-consensus-and-game-theory/02-proof-of-work-and-nakamoto-consensus",
        },
        {
          text: "Proof of Stake & Finality Gadgets",
          link: "/learn/fundamentals/03-consensus-and-game-theory/03-proof-of-stake-and-finality-gadgets",
        },
        {
          text: "Alternative & Hybrid Consensus",
          link: "/learn/fundamentals/03-consensus-and-game-theory/04-alternative-and-hybrid-consensus-models",
        },
      ],
    },
    {
      text: "Part 4: Programmability, Virtual Machines & Tooling",
      collapsed: false,
      items: [
        {
          text: "Static Ledgers to Programmable State",
          link: "/learn/fundamentals/04-programmability-and-vm/01-static-ledgers-to-programmable-state",
        },
        {
          text: "The Ethereum Virtual Machine",
          link: "/learn/fundamentals/04-programmability-and-vm/02-ethereum-virtual-machine",
        },
        {
          text: "Gas Economics & Halting",
          link: "/learn/fundamentals/04-programmability-and-vm/03-gas-economics-and-execution-halting",
        },
        {
          text: "Wallets & Account Abstraction",
          link: "/learn/fundamentals/04-programmability-and-vm/04-wallets-and-account-abstraction",
        },
        {
          text: "The Oracle Problem",
          link: "/learn/fundamentals/04-programmability-and-vm/05-the-oracle-problem",
        },
      ],
    },
    {
      text: "Part 5: Decentralized Systems: Tokens, Protocols & Governance",
      collapsed: false,
      items: [
        {
          text: "Token Standards & Digital Ownership",
          link: "/learn/fundamentals/05-decentralized-systems/01-token-standards-and-digital-ownership",
        },
        {
          text: "AMMs & Liquidity Pools",
          link: "/learn/fundamentals/05-decentralized-systems/02-automated-market-makers-and-liquidity-pools",
        },
        {
          text: "Collateralized Lending & Solvency",
          link: "/learn/fundamentals/05-decentralized-systems/03-collateralized-lending-and-solvency",
        },
        {
          text: "Tokenomics & Incentive Design",
          link: "/learn/fundamentals/05-decentralized-systems/04-tokenomics-and-economic-incentive-design",
        },
        {
          text: "Decentralized Autonomous Organizations",
          link: "/learn/fundamentals/05-decentralized-systems/05-decentralized-autonomous-organizations",
        },
      ],
    },
    {
      text: "Part 6: Scalability, Layer 2 & Protocol Security",
      collapsed: false,
      items: [
        {
          text: "The Blockchain Trilemma",
          link: "/learn/fundamentals/06-scalability-and-security/01-blockchain-trilemma",
        },
        {
          text: "Layer 2 Fundamentals",
          link: "/learn/fundamentals/06-scalability-and-security/02-layer-2-fundamentals",
        },
        {
          text: "Rollup Architectures: Optimistic vs ZK",
          link: "/learn/fundamentals/06-scalability-and-security/03-rollup-architectures-optimistic-vs-zk",
        },
        {
          text: "Interoperability & Cross-Chain Bridges",
          link: "/learn/fundamentals/06-scalability-and-security/04-interoperability-and-cross-chain-bridges",
        },
        {
          text: "Protocol Security & MEV",
          link: "/learn/fundamentals/06-scalability-and-security/05-protocol-security-and-mev",
        },
      ],
    },
  ],
  "/learn/builder-foundations/": [
    {
      text: "Builder Foundations",
      items: [
        { text: "Track Overview", link: "/learn/builder-foundations/" },
        { text: "Back to All Tracks", link: "/learn/" },
      ],
    },
  ],
  "/learn/protocol-engineering/": [
    {
      text: "Protocol Engineering",
      items: [
        { text: "Track Overview", link: "/learn/protocol-engineering/" },
        { text: "Back to All Tracks", link: "/learn/" },
      ],
    },
  ],
  "/learn/": [
    {
      text: "Curriculum",
      items: [{ text: "All Tracks", link: "/learn/" }],
    },
  ],
};
