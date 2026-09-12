---
sitemap: false
head:
  - - meta
    - name: robots
      content: noindex, nofollow
---

# Special Pages & Archive

This section serves as dedicated space for auxiliary, occasional, and unlisted resources, including event specifications, competition guidelines, legal notices, and staging verification.
Use this space to test diagrams, mathematical notation, and new component layouts before integrating them into active curricula.

## Mermaid Diagram Verification

The following diagram verifies Mermaid rendering within the documentation portal.
It illustrates a standard Web3 transaction lifecycle from client broadcast to block inclusion.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Wallet
    participant RPC as RPC Node
    participant Mempool
    participant Validator
    participant State as State DB

    User->>Wallet: Sign Transaction
    Wallet->>RPC: eth_sendRawTransaction
    RPC->>Mempool: Validate & Pool
    Mempool->>Validator: Select Transactions
    Validator->>State: Execute State Transition
    Validator-->>RPC: Emit Block
    RPC-->>User: Transaction Confirmed
```

## KaTeX Mathematical Notation Verification

The following equations verify KaTeX LaTeX rendering for cryptographic concepts.

### Elliptic Curve Cryptography

The secp256k1 curve used in Bitcoin and Ethereum follows the short Weierstrass form:

$$y^2 \equiv x^3 + 7 \pmod{p}$$

The public key $P$ is derived through scalar multiplication of the private key $k$ with the generator point $G$:

$$P = k \cdot G$$

### Merkle Tree Root Hash

Parent nodes in a cryptographic hash tree are computed by hashing concatenated child hashes:

$$\mathcal{H}_{\text{parent}} = \text{Hash}(\mathcal{H}_{\text{left}} \mathbin{\Vert} \mathcal{H}_{\text{right}})$$

### Zero-Knowledge Proof Relation

A zero-knowledge relation checks whether an instance $x$ and a witness $w$ satisfy circuit constraints:

$$\mathcal{R} = \{ (x, w) \mid \mathcal{C}(x, w) = 0 \}$$
