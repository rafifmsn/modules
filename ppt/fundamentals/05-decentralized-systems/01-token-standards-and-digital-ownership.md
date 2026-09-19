# Token Standards and Digital Ownership
Modul Presentasi: Decentralized Systems (05.1)

---

## Slide 1: The Future of Digital Ownership

### Konten Slide
The Future of Digital Ownership
Exploring Ethereum Standards, EIPs, and Token Models (Module 05.1)

The Architectural Leap:
Transforming digital asset ownership from revocable, centralized corporate licenses into sovereign, composable mathematical primitives.
Standardization under ERC-20, ERC-721, and ERC-1155 transforms isolated database entries into a unified, permissionless global economy.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka Chapter 05: Decentralized Systems dengan fokus pada Token Standards and Digital Ownership.
- Menjelaskan pergeseran dari lisensi korporasi tertutup ke hak milik digital berdaulat berbasis matematika.
- Menekankan bahwa standarisasi antarmuka smart contract adalah kunci interoperabilitas ekonomi Web3.

**Naskah Tutur (Voiceover Script):**
Selamat datang di Chapter 05: Decentralized Systems.
Pada modul-modul sebelumnya, kita telah mengkaji bagaimana Ethereum Virtual Machine mengeksekusi bytecode komputasi dan bagaimana jaringan konsensus mengamankan perubahan status data.
Sekarang, kita melangkah ke lapisan aplikasi dan primitives ekonomi yang menggerakkan ekosistem terdesentralisasi.
Hari ini kita akan membedah standar token dan arsitektur kepemilikan digital.
Kita akan mengeksplorasi bagaimana baris kode smart contract bertransformasi menjadi aset finansial universal melalui standar ERC-20, ERC-721, dan ERC-1155.
Kita juga akan melihat mengapa standarisasi antarmuka adalah prasyarat mutlak bagi lahirnya keuangan terdesentralisasi.

---

## Slide 2: The Paradigm Shift: Web2 Silos vs. Web3 Ownership

### Konten Slide
The Paradigm Shift: Web2 Silos vs. Web3 Ownership

Web2 Platform Monopolies:
- Walled Gardens: User assets (in-game items, ebooks, digital media) reside inside proprietary off-chain relational databases.
- Revocable Licensure: Users never legally own digital assets; they only hold a revocable license governed by corporate terms of service.
- Counterparty & Platform Risk: Accounts can be frozen unilaterally, databases can be altered, and service deprecation permanently wipes out user inventory.

Web3 Cryptographic Sovereignty:
- Autonomous Public Ledgers: Assets exist as transparent state transitions on a decentralized, censorship-resistant state machine.
- Private Key Authority: Custody is governed strictly by public-key cryptography; no centralized entity can seize or modify user balances without cryptographic signatures.
- Frictionless Portability: Assets flow across open protocols, decentralized exchanges, and lending pools without permission.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bandingkan ilusi kepemilikan di Web2 dengan kepemilikan berdaulat di Web3.
- Di Web2, pengguna hanya memiliki lisensi sementara pada database privat yang dapat ditarik sepihak.
- Di Web3, kepemilikan dijamin oleh tanda tangan kriptografi di atas buku besar publik.

**Naskah Tutur (Voiceover Script):**
Di era Web2, pengguna sering berasumsi bahwa mereka benar-benar memiliki aset digital yang mereka beli, baik itu lagu, buku digital, maupun perlengkapan game online.
Namun pada kenyataannya, aset-aset tersebut hanyalah baris data di dalam database tertutup milik korporasi.
Pengguna hanya memegang izin pakai sementara yang dapat dicabut kapan saja jika perusahaan mengubah kebijakan atau menutup servernya.
Web3 merombak total paradigma tersebut dengan menghadirkan kedaulatan kriptografi.
Aset digital pada blockchain publik bukan lagi milik pengembang platform, melainkan milik pemegang kunci privat secara langsung.
Tidak ada entitas tunggal yang dapat menyita, membekukan, atau menghapus kepemilikan tersebut tanpa tanda tangan kriptografi yang sah.

---

## Slide 3: The Composability Imperative: Why Standardization Unlocks Financial Legos

### Konten Slide
The Composability Imperative: Why Standardization Unlocks Financial Legos

The Cost of Fragmentation:
- Custom Implementations: Without standardized interfaces, every smart contract would define custom functions for balances, transfers, and approvals.
- High Integration Friction: Exchanges, wallets, and protocols would require custom adapter code for every single new asset.

Standardization as an API Contract:
- Universal Syntactic Rules: Ethereum Improvement Proposals (EIPs) define exact function signatures, parameter types, and events.
- Day-Zero Composability: Any decentralized application can immediately interact with newly deployed tokens without modifying application bytecode.
- Money Legos: Standardized tokens seamlessly plug into automated market makers, collateralized lending vaults, and cross-chain bridges.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Jelaskan mengapa standarisasi antarmuka smart contract sangat krusial.
- Tanpa standar, integrasi antar aplikasi akan membutuhkan jembatan kode khusus untuk setiap token baru.
- Standar EIP menciptakan prinsip Money Legos sehingga aplikasi apa pun bisa langsung mengenali token baru.

**Naskah Tutur (Voiceover Script):**
Bayangkan jika setiap bank di dunia menggunakan sistem akun dan mata uang dengan format bahasa komputer yang berbeda-beda tanpa kesepakatan antarmuka bersama.
Integrasi sistem finansial akan sangat lambat, mahal, dan penuh dengan kerentanan keamanan.
Hal yang sama berlaku pada ekosistem smart contract.
Jika setiap pencipta token membuat nama fungsi transfer atau pengecekan saldo sendiri, bursa terdesentralisasi dan dompet digital harus menulis kode khusus untuk setiap aset.
Standarisasi melalui Ethereum Improvement Proposals menghadirkan kontrak antarmuka universal.
Begitu sebuah token mematuhi spesifikasi standar, token tersebut seketika kompatibel dengan ribuan protokol DeFi di seluruh dunia sejak hari pertama diluncurkan.

---

## Slide 4: The Asset Spectrum: ERC-20, ERC-721, and ERC-1155

### Konten Slide
The Asset Spectrum: ERC-20, ERC-721, and ERC-1155

Fungible Tokens (ERC-20):
- Complete Uniformity: Every unit is identical and perfectly interchangeable with any other unit.
- Divisibility: Typically divisible up to 18 decimal places; ideal for currencies, governance tokens, and synthetic commodities.

Non-Fungible Tokens (ERC-721):
- Discrete Individuality: Each token possesses a unique identifier (tokenId) mapped to a specific owner.
- Indivisibility: Represents distinct digital collectibles, legal deeds, identity attestations, and financial positions.

Multi-Token Standard (ERC-1155):
- Hybrid Architecture: Manages an arbitrary combination of fungible, semi-fungible, and non-fungible tokens under one unified contract.
- Batch Processing: Optimized for high-throughput gaming ecosystems and enterprise multi-asset tracking.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kenalkan spektrum tiga standar utama aset Ethereum: ERC-20, ERC-721, dan ERC-1155.
- ERC-20 untuk aset yang identik dan dapat dipertukarkan seperti mata uang.
- ERC-721 untuk barang unik seperti hak milik atau NFT.
- ERC-1155 sebagai standar multi-token hibrida yang sangat efisien biaya gas.

**Naskah Tutur (Voiceover Script):**
Ekosistem Ethereum mengkategorikan aset digital ke dalam spektrum fleksibel berdasarkan sifat kesepadanan atau fungibilitasnya.
Di ujung spektrum pertama, kita memiliki ERC-20 yang mengelola token fungibel di mana setiap satuan bernilai persis sama dengan satuan lainnya, seperti uang tunai atau komoditas.
Di ujung spektrum kedua, ada ERC-721 yang mewakili token non-fungibel, di mana setiap keping memiliki identitas unik dan tidak dapat dipertukarkan begitu saja, cocok untuk sertifikat digital atau karya seni.
Di antara keduanya, lahir standar ERC-1155 yang menggabungkan kedua karakteristik tersebut ke dalam satu kontrak pintar terpadu.
ERC-1155 memungkinkan pengelolaan ribuan jenis aset fungibel dan non-fungibel secara bersamaan dengan efisiensi gas yang jauh lebih tinggi.

---

## Slide 5: Internal ERC-20 Mechanics

### Konten Slide
Internal ERC-20 Mechanics

The Ledger Illusion:
- Tokens are not physical objects stored inside user wallets; they exist solely as balances inside a private state variable.
- State Storage: mapping(address => uint256) private _balances.
- The wallet balance is simply the return value of an RPC query to balanceOf(address).

Mandatory Interface Specifications:
- View Functions: totalSupply() returns total circulating units; balanceOf(account) queries individual balances.
- Transfer Operations: transfer(recipient, amount) updates sender and recipient balances atomically.
- Delegated Spending: approve(spender, amount) sets an allowance; transferFrom(sender, recipient, amount) allows approved third parties to move capital.
- Core State Events: Transfer(address indexed from, address indexed to, uint256 value) and Approval(address indexed owner, address indexed spender, uint256 value).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bedah mitos dompet menyimpan koin fisik: token hanyalah variabel mapping internal smart contract.
- Enam fungsi wajib ERC-20: totalSupply, balanceOf, transfer, approve, allowance, transferFrom.
- Dua event utama: Transfer dan Approval.

**Naskah Tutur (Voiceover Script):**
Banyak pengguna awam membayangkan bahwa dompet mereka menyimpan koin digital seperti kantong fisik menyimpan uang logam.
Secara teknis arsitektur EVM, pemikiran itu keliru.
Token ERC-20 hanyalah sebuah smart contract yang memiliki tabel pemetaan atau mapping internal antara alamat pengguna dan angka saldo.
Ketika Anda memeriksa saldo di dompet Anda, perangkat lunak hanya membaca nilai kembalian dari fungsi balanceOf pada smart contract token tersebut.
Standar ERC-20 menetapkan enam fungsi wajib dan dua event pencatatan.
Fungsi-fungsi ini menjamin bahwa mutasi saldo pengirim dan penerima selalu terjadi secara atomik tanpa risiko penciptaan saldo ganda.

---

## Slide 6: Two-Step Allowance vs EIP-2612

### Konten Slide
Two-Step Allowance vs EIP-2612

The Traditional Two-Step Allowance:
- Step 1 (Approve): The token owner broadcasts an on-chain approve(spender, amount) transaction, consuming gas and mutating the _allowances mapping.
- Step 2 (TransferFrom): The application contract calls transferFrom(owner, recipient, amount) to execute the trade or deposit.
- Systemic Friction: Requires two distinct on-chain transactions, doubles user gas expenditure, and leaves open infinite allowance vulnerabilities.

The EIP-2612 Permit Revolution:
- Gasless Off-Chain Signing: The token owner signs an EIP-712 structured cryptographic signature containing owner, spender, value, nonce, and deadline.
- Atomic Single-Step Execution: The application contract accepts the signature, invokes permit(owner, spender, value, deadline, v, r, s), verifies ECDSA credentials, and executes transferFrom in a single transaction.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Jelaskan kendala UX pada mekanisme approve dua langkah tradisional.
- EIP-2612 permit memecahkan kendala ini melalui tanda tangan kriptografi off-chain berbasis EIP-712.
- Pengguna hanya menandatangani pesan tanpa bayar gas, dan aplikasi mengeksekusi permit serta transfer secara atomik.

**Naskah Tutur (Voiceover Script):**
Interaksi smart contract dengan token ERC-20 secara historis menghadapi kendala pengalaman pengguna yang cukup besar.
Untuk memasukkan token ke dalam bursa terdesentralisasi, pengguna harus mengirim transaksi approve terlebih dahulu untuk memberikan izin penarikan saldo, lalu mengirim transaksi kedua untuk melakukan swap.
Prosedur dua langkah ini membebani pengguna dengan dua kali biaya gas dan waktu tunggu transaksi ganda.
Untuk mengatasi inefisiensi tersebut, diperkenalkan standar EIP-2612 dengan fungsi permit.
Melalui EIP-2612, pengguna cukup menandatangani pesan kriptografi secara off-chain tanpa mengeluarkan gas sama sekali.
Smart contract tujuan kemudian memverifikasi tanda tangan tersebut dan langsung memindahkan token dalam satu transaksi tunggal yang mulus.

---

## Slide 7: Absolute Uniqueness & Non-Fungibility

### Konten Slide
Absolute Uniqueness & Non-Fungibility

ERC-721 State Architecture:
- Discrete Identifiers: Every distinct asset is tracked via an unsigned 256-bit integer (tokenId).
- Primary Ownership Mapping: mapping(uint256 => address) private _owners.
- Supply and Balance Tracking: mapping(address => uint256) private _balances records the aggregate count of tokens held by an account.

Granular Access Control:
- Token-Specific Approval: approve(to, tokenId) delegates custody of an individual asset without exposing other collection items.
- Operator Delegation: setApprovalForAll(operator, bool) authorizes an external address (such as an NFT marketplace) to transfer any token owned by the caller.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Jelaskan arsitektur internal standar ERC-721 untuk token non-fungibel.
- Perbedaan mendasar: Mapping utama mengikat tokenId spesifik ke alamat pemilik tunggal.
- Kontrol otorisasi dapat diberikan per token individu atau per seluruh koleksi melalui operator approval.

**Naskah Tutur (Voiceover Script):**
Berbeda dengan ERC-20 yang hanya mencatat saldo kuantitatif, ERC-721 dirancang untuk merepresentasikan keunikan absolut.
Struktur data inti pada ERC-721 adalah mapping dari tokenId integer 256-bit menuju alamat pemiliknya.
Ini berarti setiap keping token memiliki identitas mandiri yang tidak dapat disamakan atau digabungkan dengan token lainnya.
Mekanisme persetujuan pada ERC-721 juga memiliki dua lapisan granularitas.
Pemilik dapat memberikan izin pengalihan hanya untuk satu tokenId tertentu, atau mengesahkan operator untuk memindahkan seluruh koleksi aset yang dimilikinya secara efisien.

---

## Slide 8: Transfer Safety & Metadata

### Konten Slide
Transfer Safety & Metadata

Preventing the Smart Contract Black Hole:
- The Blind Transfer Risk: Sending an ERC-721 asset to an unverified contract without withdrawal logic permanently traps the token.
- ERC-165 Interface Detection & safeTransferFrom: Inspects if the target recipient implements the IERC721Receiver interface and returns the magic selector onERC721Received.

Metadata Architecture:
- Decentralized Pointers: tokenURI(tokenId) returns an external Uniform Resource Identifier string pointing to JSON metadata.
- Storage Trade-offs:
  - Centralized Cloud (AWS, S3): High availability but severe censorship and single-point-of-failure vulnerability.
  - Decentralized Content Addressing (IPFS, Arweave): Immutable hash addressing guaranteeing tamper-proof media assets.
  - Pure On-Chain SVG: Stored directly inside EVM storage or bytecode, achieving absolute censorship resistance at high gas costs.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengapa safeTransferFrom diciptakan: mencegah aset terjebak selamanya di kontrak yang tidak kompatibel.
- Metadata tokenURI: jembatan antara identitas di blockchain dengan data atribut atau gambar.
- Perbandingan kompromi penyimpanan metadata: Web2 terpusat vs IPFS/Arweave vs On-chain SVG murni.

**Naskah Tutur (Voiceover Script):**
Salah satu risiko paling fatal dalam interaksi token non-fungibel adalah pengiriman aset ke alamat smart contract yang tidak memiliki logika penarikan.
Jika sebuah token terkirim ke kontrak semacam itu, token tersebut akan terjebak selamanya di dalam lubang hitam digital.
Standar ERC-721 mengatasi hal ini dengan fungsi safeTransferFrom, yang secara aktif memeriksa apakah kontrak penerima mengimplementasikan antarmuka receiver sebelum transfer dituntaskan.
Aspek krusial lainnya adalah arsitektur metadata melalui fungsi tokenURI.
Metadata menghubungkan tokenId dengan atribut fisik atau visualnya.
Pilihan penyimpanan metadata membentang dari server Web2 yang rentan sensor, jaringan IPFS yang terdesentralisasi, hingga penyimpanan kode SVG langsung di dalam storage blockchain demi ketahanan permanen.

---

## Slide 9: ERC-1155 Consolidation

### Konten Slide
ERC-1155 Consolidation

Multi-Token State Consolidation:
- Single Deployment Architecture: A single deployed contract governs an infinite universe of distinct fungible and non-fungible token IDs.
- Two-Dimensional Mapping: mapping(uint256 => mapping(address => uint256)) private _balances.
- The distinction between fungible and non-fungible is reduced to supply: a tokenId with max supply 1 is non-fungible; a tokenId with max supply > 1 is fungible.

Atomic Batch Operations:
- Batch Transfers: safeBatchTransferFrom(from, to, ids[], values[], data) moves multiple distinct token classes in a single transaction.
- Radical Gas Optimization: Eliminates repetitive transaction base overheads, shared loop execution, and event emission costs for complex gaming ecosystems.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Standar ERC-1155 menyatukan token fungibel dan non-fungibel dalam satu kontrak tunggal.
- Menggunakan mapping dua dimensi (tokenId ke akun ke saldo).
- Fitur batch transfer memungkinkan pengiriman berbagai jenis aset dalam satu transaksi untuk menghemat gas secara radikal.

**Naskah Tutur (Voiceover Script):**
Ketika ekosistem game dan aplikasi Web3 berkembang, menggunakan kontrak terpisah untuk setiap item game menciptakan overhead gas yang sangat boros.
Standar ERC-1155 menjawab tantangan ini dengan menyatukan seluruh spektrum aset ke dalam satu kontrak pintar.
Dengan menggunakan mapping dua dimensi, ERC-1155 dapat melacak saldo ribuan jenis token sekaligus.
Jika pasokan sebuah tokenId dibatasi hanya satu unit, ia berfungsi sebagai NFT; jika pasokannya ribuan unit, ia berfungsi sebagai token fungibel.
Fitur paling revolusioner dari ERC-1155 adalah operasi batch transfer.
Pengguna dapat memindahkan puluhan jenis item dan mata uang berbeda hanya dengan satu transaksi blockchain tunggal, memangkas biaya gas hingga lebih dari delapan puluh persen.

---

## Slide 10: Architectural Comparison Matrix

### Konten Slide
Architectural Comparison Matrix

Dimension | ERC-20 | ERC-721 | ERC-1155
--- | --- | --- | ---
Token Type | Purely Fungible | Strictly Non-Fungible | Hybrid (Fungible & Non-Fungible)
State Storage | mapping(address => uint256) | mapping(uint256 => address) | mapping(uint256 => mapping(address => uint256))
Batch Transfers | Unsupported (Requires multicall) | Unsupported natively | Supported natively (safeBatchTransferFrom)
Metadata Pattern | decimals(), symbol(), name() | tokenURI(uint256) returning JSON | uri(uint256) with ID replacement pattern
Gas Footprint | Low per balance mutation | High per unique token mint/transfer | Extremely Low for multi-item economies
Primary Use Cases | Currencies, stablecoins, governance | Digital art, real-world assets, deeds | Gaming inventories, multi-asset bundles

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkum perbandingan arsitektural ketiga standar token dalam tabel komprehensif.
- Soroti perbedaan struktur data storage, dukungan batching, dan efisiensi gas.
- Tekankan bahwa pemilihan standar bergantung pada use case aplikasi.

**Naskah Tutur (Voiceover Script):**
Tabel perbandingan ini merangkum kompromi teknis di antara ketiga pilar standar token Ethereum.
ERC-20 sangat optimal untuk mutasi saldo kuantitatif murni seperti mata uang atau token tata kelola.
ERC-721 memprioritaskan ketunggalan identitas absolut untuk aset yang tidak dapat dibagi seperti sertifikat kepemilikan dan karya seni digital.
Sementara itu, ERC-1155 menawarkan fleksibilitas tertinggi dan efisiensi komputasi maksimal untuk ekosistem multi-aset yang dinamis.
Memahami trade-off struktur penyimpanan data dan konsumsi gas dari masing-masing standar ini merupakan keahlian fundamental bagi seorang arsitek sistem terdesentralisasi.

---

## Slide 11: The Trading Imperative & Order Book Failure

### Konten Slide
The Trading Imperative & Order Book Failure

From Standardization to Exchange:
- The Liquidity Demand: Once digital assets are standardized and sovereignly owned, users require continuous, permissionless price discovery and exchange.
- The Central Limit Order Book (CLOB) Model: Traditional exchanges match buy and sell limit orders on a central matching engine.

The Layer 1 Architectural Wall:
- High-Frequency State Bloat: Market makers update bids and asks hundreds of times per second.
- Prohibitive Gas Economics: On Ethereum Layer 1, posting, canceling, or modifying a limit order costs independent transaction fees.
- Block Latency & Front-Running: Block production latency (12 seconds) creates severe stale-order exposure and front-running vulnerabilities from miners and searchers.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Transisi dari kepemilikan aset menuju kebutuhan pertukaran dan likuiditas.
- Mengapa model bursa tradisional (Central Limit Order Book) gagal diimplementasikan langsung di Layer 1.
- Biaya gas per modifikasi order dan latensi blok membuat market making konvensional tidak layak secara ekonomi.

**Naskah Tutur (Voiceover Script):**
Setelah aset digital berhasil distandarisasi dan dimiliki secara berdaulat, kebutuhan mendesak berikutnya adalah likuiditas dan pertukaran nilai.
Para pengembang awal Web3 secara alami mencoba mereplikasi model bursa keuangan tradisional, yaitu Central Limit Order Book atau buku pesanan terpusat.
Namun mereka segera membentur dinding keterbatasan arsitektur blockchain Layer 1.
Di bursa konvensional, market maker memperbarui dan membatalkan pesanan ribuan kali dalam satu detik tanpa biaya per pesanan.
Di Ethereum, setiap pembuatan atau pembatalan order adalah transaksi on-chain yang memerlukan biaya gas dan menunggu waktu blok berikutnya.
Model buku pesanan terbukti tidak dapat diterapkan di Layer 1 tanpa menimbulkan biaya astronomis dan eksposur front-running yang parah.

---

## Slide 12: Bridge to the Next Module: Automated Market Makers

### Konten Slide
Entering the AMM Frontier

From Order Matching to Algorithmic Liquidity:
- We have established how standardized tokens (ERC-20, ERC-721, ERC-1155) turn smart contracts into programmable property rights.
- However, traditional Central Limit Order Books fail completely on base-layer blockchains due to gas overhead and execution latency.

The Next Paradigm:
- How can decentralized networks provide 24/7 continuous trading liquidity without active market makers or centralized order books?
- How does a deterministic mathematical equation replace the entire Wall Street trading floor?

Next Module:
Module 05.2: Automated Market Makers & Liquidity Pools (Math, Invariants, and Architecture).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Slide transisi penutup modul 05.1 menuju modul 05.2: Automated Market Makers & Liquidity Pools.
- Hubungkan kegagalan order book di Layer 1 dengan lahirnya inovasi Automated Market Maker.
- Teaser materi modul 05.2: Rumus produk konstan, likuiditas pasif, impermanent loss, dan pergeseran ke Uniswap V3.

**Naskah Tutur (Voiceover Script):**
Kita telah menyelesaikan eksplorasi standar token dan bagaimana kedaulatan kepemilikan digital ditegakkan di atas blockchain.
Kita juga telah mengidentifikasi bahwa model pasar konvensional tidak dapat bertahan di bawah keterbatasan eksekusi Layer 1.
Lalu, bagaimana komunitas Web3 memecahkan teka-teki likuiditas ini?
Jawabannya adalah Automated Market Maker, sebuah terobosan revolusioner yang membuang seluruh konsep buku pesanan dan menggantinya dengan persamaan matematika deterministik.
Di modul berikutnya, kita akan membedah formula Constant Product, mekanisme kumpulan likuiditas, risiko impermanent loss, hingga arsitektur likuiditas terkonsentrasi di Uniswap V3.
Sampai jumpa di modul selanjutnya.
