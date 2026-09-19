# Decentralized Autonomous Organizations
Modul Presentasi: Decentralized Systems (05.5)

---

## Slide 1: Decentralized Autonomous Organizations (DAOs)

### Konten Slide
Decentralized Autonomous Organizations (DAOs)
The Transition from Paper Legal Entities to On-Chain Institutional Architecture (Module 05.5)

The Institutional Metamorphosis:
Replacing traditional corporate bureaucracy, paper legal charters, and human executive boards with deterministic, transparent, and self-executing smart contract governance.
How GovernorBravo state machines, timelock controllers, minority ragequit rights, and quadratic consensus protect hundred-million-dollar treasuries from adversarial takeovers.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul 05.5: Decentralized Autonomous Organizations (DAOs).
- Menjelaskan evolusi institusi manusia dari korporasi hukum kertas menuju organisasi otonom berbasis kode di atas blockchain.
- Mengulas pilar institusional: Token, Kode Tata Kelola (Governor Engine), dan Perbendaharaan (Treasury).

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul penutup Chapter 05: Decentralized Autonomous Organizations atau DAO.
Sepanjang bab ini, kita telah menyaksikan bagaimana uang, pertukaran, dan kredit telah berhasil diubah menjadi kode otonom.
Kini, kita mencapai puncak dari transformasi tersebut: mendesentralisasikan institusi manusia itu sendiri.
Selama ratusan tahun, koordinasi modal skala besar membutuhkan entitas perseroan terbatas, notaris, dewan direksi, dan stempel hukum pengadilan.
DAO merombak tatanan tersebut dengan mengubah aturan anggaran dasar menjadi logika deterministik smart contract di atas Ethereum.
Hari ini, kita akan membedah anatomi internal DAO, siklus hidup proposal, benteng pengaman timelock, ancaman peretasan flash loan, serta bagaimana seluruh aplikasi Web3 ini akhirnya menabrak tembok batas skalabilitas Layer 1.

---

## Slide 2: The Institutional Shift: Joint-Stock Corporations vs Internet-Native DAOs

### Konten Slide
The Institutional Shift: Joint-Stock Corporations vs Internet-Native DAOs

Joint-Stock Corporations (Traditional Legacy):
- Legal Enforcement: Managed by paper charters, boards of directors, and court jurisdictions (e.g., Delaware Chancery Court).
- Geographic Access: Rigid national borders restricting global talent and capital participation behind accredited investor barriers.
- Execution Speed & Cost: Slow, expensive bureaucratic overhead reliant on human executives, corporate lawyers, and bank wire settlement delays.

Internet-Native DAOs (Decentralized Future):
- Legal Enforcement: Governed strictly by immutable smart contracts executing deterministically on a public decentralized blockchain.
- Geographic Access: Global, permissionless access coordinated via cryptographic wallet signatures with zero physical passport requirements.
- Execution Speed & Cost: Autonomous bytecode execution with zero reliance on physical middlemen, board meetings, or executive signatures.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bandingkan korporasi perseroan terbatas konvensional dengan DAO internet-native.
- Korporasi berbasis kertas hukum, terikat yurisdiksi negara tertentu, dan bergantung pada eksekutif manusia yang lambat.
- DAO diatur oleh smart contract yang tidak dapat diubah, dapat diakses tanpa izin dari seluruh dunia, dan dieksekusi secara otomatis oleh mesin virtual.

**Naskah Tutur (Voiceover Script):**
Institusi korporasi modern seperti Perseroan Terbatas lahir pada abad ketujuh belas untuk membagi risiko ekspedisi dagang samudra.
Meskipun sangat sukses di era industri, korporasi tradisional memiliki keterbatasan fisik yang parah: ia terikat oleh yurisdiksi geografis sempit seperti hukum Delaware, memerlukan tumpukan dokumen kertas, dan sangat bergantung pada integritas segelintir eksekutif manusia.
DAO menghadirkan lompatan institusional berikutnya yang dirancang murni untuk era internet.
Di dalam DAO, anggaran dasar bukan lagi perjanjian di atas kertas bermeterai, melainkan kode biner yang berjalan di atas Ethereum Virtual Machine.
Siapa pun dari seluruh belahan bumi dapat bergabung, menyumbangkan modal, dan memberikan suara hanya dengan modal tanda tangan kunci privat tanpa perlu paspor fisik.
Keputusan yang telah disetujui tidak memerlukan tanda tangan basah seorang direktur, melainkan dieksekusi secara otonom dan seketika oleh jaringan komputer global.

---

## Slide 3: Core DAO Architecture: From Tokens to Treasury

### Konten Slide
Core DAO Architecture: From Tokens to Treasury

The 4 Structural Pillars:
1. Token Holders: The distributed community signaling collective intent and voting power via cryptographic wallet signatures.
2. Governance Contract (Governor Engine): The state machine that registers formal proposals, tallies votes, and verifies mathematical quorum.
3. Timelock Controller: The mandatory time-delay execution buffer (typically 48 hours) standing between passed votes and on-chain state mutations.
4. Protocol Treasury: The multi-asset reserve vault holding collective funds, LP positions, and contract admin rights.

Key Institutional Insight:
- Zero Human Intervention: Once a governance proposal achieves mathematical passage and clears the timelock window, the virtual machine executes the payload autonomously.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Empat pilar struktural arsitektur DAO: Pemegang Token -> Kontrak Governor -> Timelock Controller -> Perbendaharaan Protokol.
- Kunci utama: Nol intervensi manusia setelah pemungutan suara disahkan.
- Eksekusi mutasi kode dan pengeluaran dana dijalankan secara otonom oleh mesin virtual.

**Naskah Tutur (Voiceover Script):**
Arsitektur internal sebuah DAO tersusun atas empat pilar utama yang saling terhubung secara deterministik.
Pilar pertama adalah para pemegang token yang memegang kedaulatan hak suara melalui tanda tangan kriptografi dompet mereka.
Pilar kedua adalah Governor Engine, yaitu smart contract yang bertindak sebagai parlemen digital yang mencatat proposal resmi, menghitung suara masuk, dan memvalidasi kuorum pemilih.
Pilar ketiga adalah Timelock Controller, sebuah modul penyangga waktu wajib yang menunda eksekusi keputusan selama setidaknya empat puluh delapan jam.
Dan pilar keempat adalah Perbendaharaan Protokol, brankas pintar yang menyimpan aset kas ratusan juta dolar serta hak administratif atas pembaruan kode aplikasi.
Prinsip paling fundamental di sini adalah ketiadaan campur tangan manusia: begitu proposal disetujui dan masa timelock selesai, EVM akan mengeksekusi instruksi tersebut secara mutlak tanpa bisa dihentikan oleh siapa pun.

---

## Slide 4: The Proposal Lifecycle: Off-Chain to On-Chain

### Konten Slide
The Proposal Lifecycle: Off-Chain to On-Chain

Phase 1: Gasless Off-Chain Deliberation
- Step 1: Request for Comments (RFC) published on open Discourse forums to debate technical architecture and refine community consensus.
- Step 2: Snapshot Temperature Check where token holders sign gasless cryptographic messages (EIP-712) to gauge sentiment without paying network transaction fees.

Phase 2: Gas-Intensive On-Chain Execution
- Step 3: Formal on-chain propose() invocation via GovernorBravo (requires holding a high token proposal threshold, e.g., 100,000 UNI, to prevent proposal spam).

GovernorBravo propose() Explicit Payload Structure:
- targets: Array of destination smart contract addresses to call.
- values: Array of native ETH amounts to transfer with each call.
- signatures: Function interface signatures to execute (e.g., "transfer(address,uint256)").
- calldatas: Hexadecimal ABI-encoded parameter arguments passed to destination functions.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Siklus hidup proposal terbagi dua fase: Off-chain tanpa gas dan On-chain dengan gas.
- Fase 1: Diskusi teknis di forum Discourse dilanjutkan polling Snapshot menggunakan tanda tangan EIP-712 gratis.
- Fase 2: Panggilan propose() di GovernorBravo dengan ambang batas token tinggi untuk mencegah spam.
- Anatomi muatan transaksi: targets, values, signatures, dan calldatas yang akan dieksekusi secara otomatis.

**Naskah Tutur (Voiceover Script):**
Mengajukan perubahan pada protokol terdesentralisasi tidak bisa dilakukan secara serampangan.
Siklus hidup proposal DAO dibagi menjadi dua fase strategis: fase off-chain tanpa gas dan fase on-chain berbiaya gas.
Pada fase pertama, gagasan diperdebatkan secara mendalam di forum komunitas terbuka seperti Discourse melalui dokumen Request for Comments.
Setelah matang, dilakukan pemungutan suara awal di platform Snapshot di mana pengguna menandatangani pesan kriptografi secara gratis tanpa membayar gas untuk melihat sentimen riil komunitas.
Jika lolos, proposal melangkah ke fase kedua yaitu pemanggilan fungsi on-chain propose pada kontrak GovernorBravo.
Untuk mencegah banjir proposal sampah, hanya pengguna yang memegang sejumlah besar token yang berhak memanggil fungsi ini.
Proposal on-chain ini bukan sekadar teks narasi, melainkan memuat kode biner mentah berupa daftar alamat target, nilai transfer, dan data fungsi yang siap dieksekusi secara otomatis begitu voting berakhir.

---

## Slide 5: Consensus Mechanics: Quorum & The Timelock

### Konten Slide
Consensus Mechanics: Quorum & The Timelock

The Snapshot Block:
- Historical State Checkpoint: Voting power is permanently locked to an exact historical block height before the voting period begins.
- Flash-Loan Immunization: Mathematically neutralizes flash loan attacks; borrowing billions of tokens during the active vote provides zero voting power because balances are queried at the historical snapshot block.

Mathematical Passage Requirements:
- Majority Approval: Affirmative votes must strictly exceed negative votes ($Votes_{For} > Votes_{Against}$).
- Quorum Threshold: Affirmative participation must exceed a mandatory quorum (typically 4% to 10% of total circulating token supply) to defeat voter apathy exploits.

The 48-Hour Timelock Freeze & Escape Hatch:
- Execution Buffer: Approved proposals are enqueued into the TimelockController for a mandatory 48-hour delay.
- The Sovereign Escape Hatch: If a proposal is controversial or malicious, dissenting capital allocators have 48 hours to peacefully withdraw their liquidity and exit the protocol before the code mutation takes effect.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Snapshot Block: Mengunci hak suara pada nomor blok historis di masa lalu untuk mematikan serangan flash loan.
- Syarat kelulusan ganda: Mayoritas setuju dan kuorum partisipasi minimal 4 hingga 10 persen pasokan token.
- Timelock 48 jam sebagai buffer pengaman dan pintu keluar damai (escape hatch) bagi pengguna yang menolak perubahan kode sebelum dieksekusi.

**Naskah Tutur (Voiceover Script):**
Bagaimana sistem tata kelola memastikan keabsahan pemungutan suara dan melindungi diri dari kecurangan?
Mekanisme pertahanan pertama adalah Snapshot Block.
Ketika proposal dibuka, hak suara dihitung berdasarkan saldo token pada nomor blok historis sebelum voting diumumkan.
Ini berarti peretas tidak bisa meminjam miliaran dolar token lewat flash loan di tengah-tengah voting, karena saldo pinjaman tersebut terjadi di masa depan setelah blok snapshot terkunci.
Mekanisme pertahanan kedua adalah syarat ganda: voting harus meraih suara mayoritas setuju sekaligus memenuhi batas kuorum minimum, biasanya empat hingga sepuluh persen dari total pasokan token.
Dan pertahanan pamungkas adalah Timelock Controller selama empat puluh delapan jam.
Jeda waktu ini bertindak sebagai pintu darurat atau escape hatch: jika mayoritas pemegang token meloloskan perubahan kode yang berbahaya, para penyedia likuiditas yang tidak setuju memiliki waktu dua hari penuh untuk menarik seluruh modal mereka keluar dari protokol sebelum kode baru tersebut aktif berjalan.

---

## Slide 6: The Voting Dilemma: Linear vs. Quadratic Voting

### Konten Slide
The Voting Dilemma: Linear vs. Quadratic Voting

Linear Plutocracy ($V = T$):
- 1 Token = 1 Vote: Direct linear proportionality where voting power scales 1:1 with capital ownership.
- The Whale Dilemma: Large venture funds and protocol founders holding millions of tokens easily outvote tens of thousands of grassroots users.
- Severe Voter Apathy: Retail users abstain entirely from voting, realizing their collective capital cannot overcome concentrated insider blocks.

Quadratic Voting ($V = \sqrt{T}$):
- Diminishing Marginal Influence: Voting weight scales with the square root of tokens committed: $Voice = \sqrt{Tokens}$.
- Grassroots Empowerment: 100 individuals contributing 100 tokens each generate $100 \times 10 = 1,000$ votes; 1 whale contributing 10,000 tokens generates only $\sqrt{10,000} = 100$ votes.
- The Sybil Attack Vulnerability: On an anonymous public blockchain, whales simply split their 10,000 tokens across 100 freshly created anonymous wallets, completely neutralizing the quadratic penalty without Proof of Humanity.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dilema model pemungutan suara: Linear Plutocracy (1 Token = 1 Vote) vs Quadratic Voting (Suara = Akar Token).
- Linear Plutocracy memicu dominasi whale dan apatisme pemilih ritel.
- Quadratic Voting memberdayakan komunitas akar rumput namun rentan fatal terhadap Sybil Attack jika pengguna anonim memecah token ke ribuan dompet palsu tanpa sistem verifikasi identitas unik.

**Naskah Tutur (Voiceover Script):**
Salah satu perdebatan paling mendalam dalam tata kelola terdesentralisasi adalah bagaimana bobot suara dihitung.
Model yang paling umum digunakan hari ini adalah Linear Plutocracy, yaitu satu token bernilai satu suara.
Kelemahan fatal model ini adalah kekuasaan mutlak berada di tangan pemegang modal raksasa atau paus institusi, yang dengan mudah mengalahkan suara puluhan ribu pengguna ritel dan memicu keputusasaan pemilih biasa.
Sebagai alternatif, ilmuwan politik memperkenalkan Quadratic Voting, di mana bobot suara dihitung dari akar kuadrat jumlah token yang dipertaruhkan.
Dalam model kuadratik, seratus orang yang masing-masing menyumbang seratus token menghasilkan seribu suara, sedangkan satu paus yang menyetor sepuluh ribu token hanya memperoleh seratus suara, memberi kekuatan besar pada konsensus akar rumput.
Namun di blockchain publik yang anonim, Quadratic Voting menghadapi celah mematikan bernama Sybil Attack.
Tanpa adanya bukti identitas manusia tunggal atau Proof of Humanity, sang paus cukup memecah sepuluh ribu tokennya ke dalam seratus dompet baru, seketika membatalkan penalti kuadratik dan merebut kembali dominasi suara.

---

## Slide 7: Minority Protection: The MolochDAO Architecture

### Konten Slide
Minority Protection: The MolochDAO Architecture

The Coordination Problem (Moloch):
- Named after the god of coordination failure, designed by Ameen Soleimani to solve the tragedy of the commons and prevent majority tyranny in decentralized grant pools.

The Architecture of Non-Transferable Guild Shares:
- Capital Pooling: Members tribute capital (ETH/DAI) into the Guild Bank in exchange for non-transferable voting shares.
- The Ragequit Mechanism:
  - When a governance proposal passes, a mandatory 7-day Grace Period begins before proposal funds can be drawn.
  - Any minority member who voted against the proposal or disagrees with the capital allocation can call ragequit().
  - The smart contract burns their voting shares and atomically returns their exact proportional slice of the Guild Bank assets directly to their private wallet.
  - The majority funds the proposal using only their own remaining capital, rendering majority theft mathematically impossible.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Arsitektur MolochDAO dirancang Ameen Soleimani untuk memecahkan kegagalan koordinasi dan tirani mayoritas.
- Menggunakan saham guild non-transferable yang tidak bisa diperjualbelikan di pasar luar.
- Inovasi mekanisme ragequit(): Anggota minoritas yang menolak proposal berhak membakar saham dan menarik porsi aset kas mereka secara damai sebelum dana proposal dicairkan.

**Naskah Tutur (Voiceover Script):**
Bagaimana kita melindungi kelompok minoritas dari tirani mayoritas pemegang suara?
Jika lima puluh satu persen pemilih bersepakat untuk mencuri kas perbendaharaan dan membagikannya hanya kepada kelompok mereka, sistem demokrasi biasa akan runtuh.
Menjawab ancaman ini, Ameen Soleimani merancang arsitektur MolochDAO dengan inovasi legendaris bernama ragequit.
Di MolochDAO, anggota menyetorkan modal ke dalam kas bersama untuk mendapatkan saham hak suara yang tidak dapat dipindahtangankan.
Setiap kali sebuah proposal pengeluaran dana disetujui, sistem memasuki masa jeda grace period selama tujuh hari.
Anggota yang tidak setuju dengan proposal tersebut berhak memanggil fungsi ragequit kapan saja selama masa jeda.
Smart contract akan secara otomatis membakar saham mereka dan mengembalikan porsi modal kas perbendaharaan secara utuh ke dompet pribadi mereka.
Dengan mekanisme ini, mayoritas hanya dapat mendanai proyek menggunakan modal mereka sendiri, membuat eksploitasi tirani mayoritas menjadi mustahil secara matematis.

---

## Slide 8: Governance Threat Matrix: Attack Vectors

### Konten Slide
Governance Threat Matrix: Attack Vectors

Case 1: Beanstalk Farms (April 2022) - Flash Loan Takeover ($182M Drained)
- Attack Vector: Exploited an emergency governance bypass function (BIP-18) that permitted instant proposal execution upon reaching a 67% supermajority.
- Execution: The attacker took a $1 billion flash loan via Aave, bought 67% voting majority, voted to pass a malicious proposal draining the entire liquidity treasury, and repaid the loan within a single block.
- Fatal Architecture Failure: Bypassing the mandatory TimelockController and omitting historical snapshot block checks.

Case 2: Build Finance (February 2022) - Low-Quorum Hijacking (Infinite Minting)
- Attack Vector: Capitalized on widespread voter apathy where standard proposals failed to attract community participation.
- Execution: Attacker accumulated modest tokens meeting the low 5% quorum threshold, submitted a disguised proposal transferring the token minting key to their wallet, and passed it unopposed.
- Fatal Architecture Failure: Fixed low quorum thresholds without dynamic scaling or a multisig Security Council veto backstop.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pembedahan 2 studi kasus serangan tata kelola on-chain nyata.
- Beanstalk Farms (2022): Kerugian 182 juta dolar akibat flash loan takeover karena adanya jalur darurat yang memotong timelock dan snapshot block.
- Build Finance (2022): Pembajakan kunci pencetakan token tanpa batas akibat kuorum statis rendah dan sikap apatis pemilih komunitas.

**Naskah Tutur (Voiceover Script):**
Kerentanan dalam arsitektur tata kelola DAO telah memicu beberapa eksploitasi terbesar dalam sejarah kripto.
Mari kita pelajari dua studi kasus nyata.
Kasus pertama adalah insiden Beanstalk Farms pada April 2022 yang merugikan seratus delapan puluh dua juta dolar.
Protokol memiliki fungsi darurat yang dapat mengeksekusi proposal seketika tanpa timelock jika meraih suara enam puluh tujuh persen.
Peretas memanfaatkan celah ini dengan meminjam satu miliar dolar lewat flash loan, membeli suara supermayoritas, meloloskan proposal pencurian kas, dan melunasi pinjaman dalam satu blok yang sama.
Kasus kedua adalah Build Finance pada Februari 2022.
Akibat apatisme komunitas di mana mayoritas pemegang token tidak pernah ikut voting, peretas hanya perlu membeli sedikit token untuk memenuhi kuorum rendah lima persen.
Mereka meloloskan proposal yang secara diam-diam memindahkan kunci pencetakan token ke dompet mereka sendiri, mencetak miliaran koin baru, dan menguras seluruh likuiditas pasar.

---

## Slide 9: The Scalability Wall: Transitioning to Layer 2

### Konten Slide
The Scalability Wall: Transitioning to Layer 2

The Convergence of Decentralized Systems:
- We have assembled the entire Web3 financial stack on Layer 1: Composable Assets (ERC-20/721/1155), AMM Liquidity Pools, Over-Collateralized Lending Markets, and Sovereign Governance DAOs.

The Physical Bottleneck of Ethereum Layer 1:
- The 15-30 TPS Hard Ceiling: Every global node must redundantly compute every single token transfer, swap math, liquidation check, and governance vote.
- Gas Fee Explosion: Surging user adoption during bull cycles pushes gas prices to 300+ Gwei ($50 - $150 per transaction), completely pricing out retail participants.
- The Architectural Dilemma: Can we scale computation by 1,000x without sacrificing the decentralization and cryptographic trust of the underlying base layer?

The Paradigm Shift:
- The industry has reached the limits of monolithic base-layer execution, demanding off-chain Layer 2 scaling architectures.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Konvergensi seluruh tumpukan aplikasi Web3 di Layer 1: Token, AMM, Lending, dan DAO.
- Tembok batas fisik Ethereum L1: Kapasitas komputasi mentok di 15 hingga 30 transaksi per detik (TPS).
- Ledakan biaya gas memotong akses pengguna umum dan menuntut pergeseran paradigma menuju penskalaan off-chain Layer 2.

**Naskah Tutur (Voiceover Script):**
Sepanjang Chapter 05 ini, kita telah membangun tumpukan sistem keuangan terdesentralisasi yang sangat lengkap dan saling terhubung di atas Ethereum.
Kita memiliki aset yang dapat diprogram, bursa otomatis tanpa perantara, protokol pinjaman tanpa identitas, dan tata kelola otonom tanpa CEO.
Namun ketika seluruh sistem canggih ini beroperasi secara bersamaan di dunia nyata, seluruh ekosistem membentur tembok batas fisik yang sangat keras di Layer 1.
Ethereum hanya mampu memproses lima belas hingga tiga puluh transaksi per detik karena setiap komputer di seluruh dunia harus menghitung ulang setiap operasi matematika secara berulang.
Ketika jutaan orang berebut masuk, biaya gas meledak hingga ratusan dolar per satu kali klik, menyingkirkan pengguna biasa dan melumpuhkan efisiensi protokol.
Kita telah tiba pada batas akhir komputasi monolitik.
Satu-satunya jalan ke depan untuk menyelamatkan masa depan desentralisasi adalah memindahkan beban komputasi berat ke luar rantai utama melalui arsitektur Layer 2.

---

## Slide 10: Bridge to Chapter 06: Scalability & Security

### Konten Slide
Entering Chapter 06: Scalability & Security

From Decentralized Primitives to Global Scale:
- Chapter 05 demonstrated the extraordinary expressive power of decentralized finance and internet-native institutions.
- However, widespread adoption is strictly throttled by the physical constraints of base-layer throughput, latency, and gas economics.

The Next Frontier:
- How do we solve the fundamental Blockchain Trilemma without compromising base-layer security or censorship resistance?
- How do Optimistic Rollups and Zero-Knowledge Rollups achieve 1,000x throughput while anchoring cryptographic state proofs to Layer 1?

Next Chapter:
Chapter 06: Scalability and Security.
Next Module:
Module 06.1: The Blockchain Trilemma (Throughput Limits, Hardware Constraints, and Modular Paradigms).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Slide transisi penutup Chapter 05: Decentralized Systems menuju Chapter 06: Scalability and Security.
- Menghubungkan batas skalabilitas sistem aplikasi dengan solusi penskalaan modular Layer 2.
- Teaser materi Chapter 06 dan modul 06.1: The Blockchain Trilemma, arsitektur modular, Optimistic vs ZK Rollups, jembatan lintas-rantai, dan keamanan protokol MEV.

**Naskah Tutur (Voiceover Script):**
Kita telah menuntaskan seluruh materi di Chapter 05: Decentralized Systems.
Kita telah memahami bagaimana token diciptakan, bagaimana pasar likuiditas digerakkan secara matematis, bagaimana kredit anonim dipertahankan solvabilitasnya, dan bagaimana institusi otonom diorganisir.
Kini, kurikulum membawa kita ke babak pamungkas dari trek Fundamental: Chapter 06, Scalability and Security.
Di bab berikutnya, kita akan mengurai batas-batas fisik ilmu komputer terdistribusi.
Kita akan membedah formula Blockchain Trilemma, memahami mengapa meningkatkan ukuran blok secara ceroboh justru merusak desentralisasi, dan bagaimana terobosan Optimistic serta Zero-Knowledge Rollup mampu melipatgandakan kecepatan transaksi ribuan kali lipat tanpa mengorbankan keamanan rantai utama.
Selamat atas pencapaian Anda menyelesaikan Chapter 5, dan mari kita masuki Chapter 06: Scalability and Security.
