# Rollup Architectures: Optimistic vs. Zero-Knowledge
Modul Presentasi: Scalability and Security (06.3)

---

## Slide 1: Rollup Architectures: Optimistic vs. Zero-Knowledge

### Konten Slide
Rollup Architectures: Optimistic vs. Zero-Knowledge
Module 06.3: Scalability and Security
Track: Fundamentals of Distributed Trust

Core Architectural Focus:
- How Layer 1 verifies the correctness of off-chain execution without re-executing transactions.
- Game-theoretic retrospective dispute resolution: Fraud Proofs, the 7-day challenge window, and interactive bisection.
- Mathematical preventative verification: Validity Proofs, ZK-SNARKs vs ZK-STARKs, and state delta compression.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul ketiga dari Chapter 06: Optimistic vs ZK Rollups.
- Inti pembahasan: bagaimana Layer 1 memverifikasi kebenaran ribuan transaksi off-chain tanpa mengulang komputasi.
- Dua pendekatan: Optimistic (percaya dulu tapi ada masa sanggah) vs ZK (harus menyertakan bukti matematika mutlak di muka).

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga dari bab Scalability and Security.
Di modul sebelumnya, kita sudah sepakat bahwa rollup adalah masa depan skalabilitas blockchain karena mewarisi keamanan Layer 1 secara penuh.
Namun, arsitektur ini menyisakan satu pertanyaan rekayasa yang sangat krusial:
Ketika sebuah komputer sequencer di Layer 2 mengklaim telah mengeksekusi sepuluh ribu transaksi dan menyerahkan komitmen status saldo yang baru ke Layer 1, bagaimana Layer 1 bisa tahu bahwa angka-angka tersebut sah dan tidak dimanipulasi?
Untuk memverifikasi kebenaran transaksi off-chain ini, ekosistem terpecah menjadi dua kubu kriptografi yang sangat berbeda.
Di satu sisi ada Optimistic Rollups yang menggunakan pendekatan praduga tak bersalah berbasis Fraud Proofs.
Di sisi lain ada Zero-Knowledge Rollups yang menggunakan pendekatan nihil kepercayaan berbasis Validity Proofs.
Hari ini kita akan membedah mekanika internal, keunggulan teknis, dan trade-off di antara kedua arsitektur ini.

---

## Slide 2: The Off-Chain State Verification Dilemma

### Konten Slide
The Off-Chain State Verification Dilemma

The Verification Imperative:
- Layer 1 cannot re-execute thousands of Layer 2 transactions, as doing so defeats the entire premise of scalability.
- The off-chain sequencer submits only two payloads to Layer 1: compressed raw transaction calldata and a proposed state root commitment.

The Malicious Sequencer Threat:
- What prevents a rogue sequencer from including an invalid state transition that mints millions of tokens into its private account?
- If Layer 1 blindly accepts state root commitments, decentralized trust collapses into centralized custody risk.

Two Divergent Cryptographic Philosophies:
- 1. Retrospective Verification (Optimistic): Assume sequencer assertions are valid, but establish an economic dispute window for independent parties to submit Fraud Proofs.
- 2. Preventative Verification (Zero-Knowledge): Reject all state transitions until accompanied by an unforgeable mathematical Validity Proof establishing flawless compliance with VM rules.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dilema: L1 tidak boleh mengeksekusi ulang seluruh transaksi, tapi tidak boleh percaya buta pada sequencer.
- Mallory si sequencer jahat bisa saja mencoba mencetak uang palsu di L2.
- Dua mazhab: pembuktian retrospektif lewat sanggahan vs pembuktian preventif lewat matematika.

**Naskah Tutur (Voiceover Script):**
Mari kita pahami dulu dilema komputasi yang dihadapi Layer 1.
Tujuan utama kita membuat Layer 2 adalah menghemat komputasi Layer 1.
Artinya, Layer 1 sama sekali tidak boleh mengeksekusi ulang seluruh sepuluh ribu transaksi yang terjadi di Layer 2.
Sequencer hanya menyetor sekumpulan data terkompresi dan mengumumkan satu angka ringkas ke smart contract Layer 1: inilah state root baru hasil transaksi.
Lalu apa yang mencegah sequencer nakal bernama Mallory untuk menyetor angka palsu yang memindahkan seluruh saldo pengguna ke kantong pribadinya?
Jika Layer 1 mempercayai sequencer secara buta, sistem terdesentralisasi kita berubah menjadi bursa terpusat yang berbahaya.
Dari sinilah muncul dua filosofi besar untuk menyelesaikan masalah ini.
Mazhab pertama mengatakan: kita anggap sequencer jujur, tetapi kita beri waktu satu minggu bagi siapa saja untuk memeriksa dan menyanggah kebohongannya.
Mazhab kedua mengatakan: kita tidak percaya pada siapa pun; sequencer wajib menyertakan bukti matematika murni sebelum status baru diterima oleh Layer 1.

---

## Slide 3: Two Cryptographic Verification Philosophies: Fraud Proofs vs Validity Proofs

### Konten Slide
Two Cryptographic Verification Philosophies: Fraud Proofs vs Validity Proofs

Optimistic Paradigm (Fraud Proofs):
- Underlying Axiom: Presumption of innocence governed by economic game theory.
- Execution claims are optimistically accepted as valid upon submission.
- Opens a mandatory 7-day challenge window before state finalization.
- If no dispute is raised by independent verifiers, state transitions finalize permanently on Layer 1.
- If invalid execution is detected, verifiers submit a Fraud Proof to revert the block and slash the sequencer bond.

Zero-Knowledge Paradigm (Validity Proofs):
- Underlying Axiom: Zero trust governed by deterministic mathematical certainty.
- Execution claims are considered invalid until proven otherwise.
- Off-chain provers generate succinct cryptographic proofs (ZK-SNARKs or ZK-STARKs).
- Layer 1 on-chain verifier contracts evaluate algebraic polynomial equations in constant time.
- Yields immediate, deterministic finality the instant the proof is verified on-chain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kontras mendasar: Fraud Proofs vs Validity Proofs.
- Optimistic bergantung pada pengawasan aktif dan insentif ekonomi game theory.
- ZK bergantung pada kepastian hukum matematika dan kriptografi polinomial.

**Naskah Tutur (Voiceover Script):**
Dua pendekatan ini mewakili cara pandang yang bertolak belakang dalam epistemologi ilmu komputer.
Di kubu Optimistic, filosofinya adalah praduga tak bersalah yang dipandu oleh teori permainan ekonomi.
Ketika sequencer mengumumkan perubahan status, Layer 1 langsung menerimanya secara sementara.
Layer 1 membuka masa tunggu selama tujuh hari bagi para validator independen untuk memeriksa apakah ada kebohongan di dalamnya.
Jika tidak ada yang memprotes selama tujuh hari, status itu dianggap sah dan final.
Sebaliknya, kubu Zero-Knowledge menolak segala bentuk asumsi kepercayaan manusia.
Mereka tidak peduli siapa sequencernya dan berapa banyak uang jaminan yang dipertaruhkan.
Status baru tidak akan pernah diterima oleh Layer 1 tanpa adanya sebuah berkas matematika ringkas bernama validity proof.
Begitu kontrak verifikator di Layer 1 memastikan persamaan aljabar di dalam bukti tersebut benar, transaksi langsung sah seketika tanpa perlu menunggu masa sanggah.

---

## Slide 4: Optimistic Rollup Architecture: Incentivizing Honesty

### Konten Slide
Optimistic Rollup Architecture: Incentivizing Honesty

Core Architectural Components:
- Sequencer: Runs an execution client (derived from Geth or Erigon), batches transactions, and publishes compressed data to Layer 1.
- L1 Rollup Contract: Receives calldata/blobs, registers proposed state roots, and manages bonded sequencer stakes.
- Verifier / Challenger Nodes: Independent auditing nodes that download data batches from Layer 1 and reconstruct L2 state locally.

The 1-of-N Honest Verifier Assumption:
- Security is mathematically guaranteed as long as at least one honest, active verifier exists anywhere in the world.
- Economic Slashing Mechanism: Sequencers must lock substantial economic bonds; if a verifier proves fraud, the sequencer stake is slashed and awarded to the challenger.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bagaimana Optimistic Rollup beroperasi sehari-hari.
- Asumsi 1-of-N: kita hanya butuh satu orang jujur di dunia untuk menjaga seluruh sistem tetap aman.
- Teori permainan: sequencer mempertaruhkan modal jutaan dolar yang akan disita jika mencoba curang.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah cara kerja Optimistic Rollup seperti Arbitrum dan Optimism.
Setiap hari, sequencer mengumpulkan transaksi pengguna, mengeksekusinya di mesin virtual lokal yang setara dengan Ethereum, lalu mengunggah data terkompresi ke Layer 1 bersama usulan state root.
Agar sequencer tidak berbuat curang, protokol mewajibkan sequencer mengunci sejumlah modal uang jaminan yang sangat besar di kontrak Layer 1.
Di sisi lain, ada ribuan komputer pengawas independen bernama challengers, salah satunya Bob.
Bob mengunduh data mentah dari Layer 1, mengeksekusi ulang transaksinya di komputernya sendiri, dan mencocokkan apakah state root hasil perhitungannya sama dengan angka yang disetor sequencer.
Sistem ini bersandar pada asumsi keamanan yang sangat kuat: 1-of-N honest verifier.
Artinya, dari ribuan node pengawas di seluruh penjuru bumi, kita hanya butuh satu saja peserta yang jujur dan menyala untuk menggagalkan upaya pencurian sequencer.
Jika Bob menemukan kebohongan, Bob bisa melaporkannya dan berhak membawa pulang hadiah uang jaminan sequencer yang disita.

---

## Slide 5: The 7-Day Challenge Window: Economic Finality and Censorship Defense

### Konten Slide
The 7-Day Challenge Window: Economic Finality and Censorship Defense

The 7-Day Dispute Delay:
- All asset withdrawals from Layer 2 to Layer 1 on Optimistic Rollups are subject to a mandatory 7-day time lock.

Security Rationale Behind the 7-Day Window:
- 1. Defense Against Layer 1 Censorship Attacks:
- A malicious sequencer could attempt to bribe Layer 1 miners/validators to censor challenger dispute transactions.
- A 7-day window makes sustained, unbroken censorship economically and practically impossible on a decentralized base layer.
- 2. Absorbing Extreme Network Congestion:
- Ensures challengers have sufficient time to land proof transactions on Layer 1 even during multi-day gas fee spikes.

User Impact:
- Standard bridge withdrawals require 7 days, though liquidity providers and cross-chain fast bridges offer instant liquidity for a fee.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pertanyaan umum: kenapa penarikan di Arbitrum atau Optimism butuh waktu 7 hari?
- Jawaban teknis: bukan karena komputer lambat, melainkan protokol pertahanan terhadap sensor L1.
- Memberikan waktu yang cukup bagi validator jujur untuk menembus kemacetan jaringan.

**Naskah Tutur (Voiceover Script):**
Pertanyaan yang paling sering dikeluhkan oleh pengguna biasa adalah: kenapa penarikan aset dari Arbitrum atau Optimism ke Ethereum memakan waktu sampai tujuh hari?
Penundaan tujuh hari ini bukan karena komputasi komputer kita lambat.
Ini adalah fitur keamanan game theory yang sengaja dirancang untuk menghadapi skenario serangan terburuk.
Bayangkan jika jendela sanggahan hanya berdurasi tiga puluh menit.
Sequencer nakal yang memiliki modal miliaran dolar bisa membanjiri jaringan Ethereum dengan jutaan transaksi sampah atau menyuap validator Layer 1 agar menyensor transaksi sanggahan milik Bob.
Jika transaksi sanggahan Bob tertahan selama tiga puluh menit saja akibat kemacetan jaringan, status palsu sequencer akan otomatis sah dan uang pengguna terkuras.
Dengan durasi tujuh hari, hampir mustahil bagi siapa pun di dunia untuk menyensor jaringan Ethereum tanpa henti selama seminggu penuh.
Tujuh hari memberi kepastian absolut bahwa kebenaran pasti memiliki celah waktu untuk tercatat di blockchain Layer 1.

---

## Slide 6: Interactive Dispute Resolution: Multi-Round Bisection Game

### Konten Slide
Interactive Dispute Resolution: Multi-Round Bisection Game

The L1 Gas Limit Constraint:
- Re-executing an entire disputed block of thousands of transactions on Layer 1 would far exceed block gas limits.

The Multi-Round Interactive Bisection Protocol:
- Instead of replaying full blocks, the sequencer (Mallory) and challenger (Bob) engage in an on-chain binary search game.
- 1. Mallory claims N execution steps yield state X; Bob asserts they yield state Y.
- 2. The parties bisect the execution trace iteratively: N/2, N/4, down to 1.
- 3. Within O(log N) rounds (roughly 25-30 interactions), they isolate the exact single EVM opcode instruction where their computations diverge.
- 4. The Layer 1 smart contract executes only that single one-step instruction inside a minimal on-chain emulator to determine the honest party.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah: L1 tidak sanggup mengeksekusi ulang seluruh blok transaksi yang disengketakan.
- Solusi Arbitrum Nitro: Bisection game membelah eksekusi secara biner hingga tersisa 1 instruksi saja.
- Kompleksitas O(log N): jutaan instruksi bisa dipersempit hanya dalam sekitar 20 sampai 30 putaran interaktif.

**Naskah Tutur (Voiceover Script):**
Ketika Bob mendeteksi bahwa sequencer menyetor status palsu, bagaimana cara membuktikannya ke Layer 1?
Layer 1 tidak mungkin menjalankan ulang seluruh transaksi yang ada di dalam blok tersebut, karena biaya gasnya akan melebihi batas blok Ethereum.
Arbitrum memecahkan masalah ini dengan penemuan yang sangat jenius bernama interactive multi-round bisection game.
Bayangkan seperti permainan tebak angka biner.
Mallory mengklaim bahwa setelah satu juta instruksi komputer dijalankan, status akhirnya adalah A.
Bob membantah dan mengatakan status akhirnya adalah B.
Kontrak di Layer 1 tidak mengecek semuanya.
Kontrak meminta Mallory dan Bob membelah satu juta instruksi itu menjadi dua di instruksi ke-500.000, lalu bertanya: di belahan mana kalian mulai berbeda pendapat?
Mereka membelahnya lagi menjadi 250.000, lalu 125.000, dan seterusnya.
Dalam kompleksitas O(log N), atau hanya sekitar dua puluh putaran interaksi, mereka berhasil mempersempit perselisihan hingga ke tepat satu instruksi opcode tunggal, misalnya instruksi penjumlahan matematika sederhana.
Di putaran terakhir, kontrak pintar di Layer 1 hanya perlu mengeksekusi satu instruksi penjumlahan itu saja untuk melihat siapa yang benar dan menyita modal pihak yang berbohong.

---

## Slide 7: Zero-Knowledge Rollup Architecture: Instant Mathematical Certainty

### Konten Slide
Zero-Knowledge Rollup Architecture: Instant Mathematical Certainty

The Validity Proof Paradigm:
- Replaces optimistic fraud detection with proactive, tamper-proof mathematical verification.

The Proving Pipeline Architecture:
- 1. Execution Engine: Processes off-chain transactions and produces a complete execution trace recording all register states and memory transitions.
- 2. Arithmetization: Compiles execution traces into systems of multivariate algebraic polynomials (using R1CS, Plonkish, or AIR arithmetization frameworks).
- 3. Cryptographic Prover: High-performance compute clusters solve polynomial constraints and generate a succinct cryptographic proof.
- 4. L1 Verifier Contract: Evaluates pairing or polynomial commitments on Layer 1 in constant deterministic time, verifying thousands of transactions in milliseconds.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Paradigma ZK: dari eksekusi kode menjadi persamaan polinomial aljabar.
- Execution trace mencatat semua pergerakan register CPU dan memori.
- Hasil akhirnya adalah bukti ringkas yang membuktikan kebenaran matematika seluruh transaksi.

**Naskah Tutur (Voiceover Script):**
Sekarang mari kita alihkan perhatian kita ke kubu kedua: Zero-Knowledge Rollup.
Arsitektur ZK Rollup seperti Starknet dan zkSync bekerja dengan cara yang sama sekali berbeda dari Optimistic Rollup.
Mereka tidak menggunakan sistem sanggahan dan tidak ada uang jaminan yang dipertaruhkan.
Ketika transaksi masuk, mesin eksekusi Layer 2 mencatat seluruh riwayat komputasi ke dalam apa yang disebut execution trace.
Execution trace ini mencatat setiap pergerakan register prosesor, pembacaan memori, dan perubahan saldo.
Kemudian, compiler khusus mengubah seluruh jejak komputasi tersebut menjadi sistem persamaan aljabar polinomial raksasa lewat proses bernama arithmetization.
Sebuah komputer berkekuatan tinggi bernama Prover kemudian memecahkan persamaan tersebut dan menghasilkan satu bukti matematika ringkas bersimbol pi.
Bukti pi ini membuktikan secara absolut bahwa ada sekumpulan transaksi sah yang berhasil mengubah status lama menjadi status baru sesuai dengan aturan mesin virtual.
Bukti inilah yang dikirim ke kontrak verifikator di Layer 1.

---

## Slide 8: Primitive Anatomy: ZK-SNARKs vs ZK-STARKs

### Konten Slide
Primitive Anatomy: ZK-SNARKs vs ZK-STARKs

Comparative Cryptographic Foundations:

1. ZK-SNARKs (Succinct Non-Interactive Argument of Knowledge):
- Proof Size: Ultra-compact (roughly 200 to 400 bytes).
- L1 Verification Cost: Very cheap and constant gas usage (around 200,000 gas).
- Setup Assumption: Historical variants require trusted setup ceremonies; modern universal setups (PLONK) reduce setup fragility.
- Quantum Resistance: Vulnerable to future quantum computing attacks (elliptic curve cryptography).

2. ZK-STARKs (Scalable Transparent Argument of Knowledge):
- Proof Size: Larger payload (dozens to hundreds of kilobytes).
- L1 Verification Cost: Higher gas cost due to larger data submission sizes.
- Setup Assumption: Zero trusted setup required; entirely transparent.
- Quantum Resistance: Inherently post-quantum secure (relies purely on collision-resistant hash functions and Reed-Solomon error-correcting codes).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- SNARK: sangat kecil, murah diverifikasi di L1, tetapi varian lama butuh trusted setup dan tidak tahan komputer kuantum.
- STARK: diciptakan oleh Eli Ben-Sasson, transparan tanpa setup, kebal kuantum, tetapi ukuran buktinya besar.
- Keduanya adalah instrumen matematika tercanggih dalam industri komputasi terdistribusi.

**Naskah Tutur (Voiceover Script):**
Di dunia Zero-Knowledge, terdapat dua keluarga primitif matematika utama yang bersaing: ZK-SNARK dan ZK-STARK.
Keluarga pertama adalah SNARK.
Kelebihan utama SNARK adalah buktinya sangat ringkas, hanya berukuran beberapa ratus byte saja.
Karena buktinya kecil, biaya gas untuk memverifikasinya di smart contract Layer 1 sangat murah, hanya sekitar dua ratus ribu gas.
Namun kelemahannya, sebagian besar sistem SNARK membutuhkan upacara pembuatan kunci awal yang disebut trusted setup, dan secara teoritis rentan terhadap serangan komputer kuantum di masa depan.
Keluarga kedua adalah STARK, yang dipelopori oleh tim Starkware.
Huruf T pada STARK berarti Transparent.
STARK sama sekali tidak membutuhkan trusted setup dan hanya bersandar pada fungsi hash kriptografis serta kode koreksi kesalahan Reed-Solomon.
Ini membuat STARK sepenuhnya kebal terhadap ancaman komputer kuantum.
Namun komprominya, ukuran bukti STARK jauh lebih besar, mencapai puluhan kilobyte, yang membuat biaya penulisan datanya di Layer 1 sedikit lebih mahal.

---

## Slide 9: Instant Finality and Extreme Data Compression in ZK Rollups

### Konten Slide
Instant Finality and Extreme Data Compression in ZK Rollups

Deterministic Instant Finality:
- Once the Layer 1 verifier contract successfully validates the validity proof, state transitions achieve immediate economic finality.
- Withdrawals to Layer 1 take minutes to hours (bounded strictly by proof generation frequency) rather than 7 days.

Extreme State Delta Compression:
- Optimistic Rollups must post every transaction signature to Layer 1 so verifiers can check signer authorizations during fraud disputes.
- ZK Rollups verify signatures entirely inside the off-chain ZK circuit.
- The ZK sequencer only publishes net final state mutations (state deltas) to Layer 1, omitting individual signatures and intermediate states entirely.
- Massively reduces on-chain data footprint and scales throughput exponentially.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Keunggulan terbesar ZK: tidak ada masa tunggu 7 hari.
- Penarikan dana bisa selesai secepat bukti ZK di-generate dan diverifikasi di L1.
- Kompresi dahsyat: ribuan signature dibuang dan diganti satu bukti matematika ringkas.

**Naskah Tutur (Voiceover Script):**
Inilah yang membuat banyak peneliti menganggap ZK Rollup sebagai cawan suci skalabilitas blockchain.
Pertama, ZK Rollup menawarkan finalitas transaksi yang instan.
Begitu blok transaksi selesai dibuktikan oleh Prover dan diverifikasi oleh kontrak Layer 1, transaksi itu sah seketika.
Alice tidak perlu menunggu jeda sengketa selama tujuh hari untuk menarik uangnya kembali ke Layer 1.
Uangnya bisa dicairkan segera setelah bukti validitas selesai diproses, biasanya dalam waktu lima belas menit hingga satu jam.
Kedua, ZK Rollup memungkinkan kompresi data yang sangat ekstrem.
Di Optimistic Rollup, sequencer wajib menyertakan tanda tangan digital setiap pengguna ke Layer 1 agar challenger bisa memverifikasi siapa yang mengirim transaksi.
Di ZK Rollup, jutaan tanda tangan digital itu diverifikasi di dalam sirkuit matematika off-chain.
Sequencer hanya perlu menyetor hasil akhir perubahan saldonya saja ke Layer 1.
Data yang harus diunggah ke blockchain menjadi jauh lebih sedikit, yang membuat biaya transaksi semakin murah.

---

## Slide 10: Deep Comparison Matrix: Optimistic vs Zero-Knowledge

### Konten Slide
Deep Comparison Matrix: Optimistic vs Zero-Knowledge

Comprehensive Architectural Trade-offs:

1. Trust Assumption:
- Optimistic: 1-of-N honest verifier game-theoretic assumption.
- Zero-Knowledge: Pure cryptographic and mathematical truth.

2. On-Chain L1 Verification Cost:
- Optimistic: Negligible during normal operations (only updating root pointers).
- Zero-Knowledge: Fixed gas cost per batch proof verification (approx. 200k-400k gas).

3. Off-Chain Prover Computational Overhead:
- Optimistic: Very low (commodity server CPUs).
- Zero-Knowledge: Extremely high (GPU, FPGA, or ASIC hardware acceleration clusters).

4. L1 Withdrawal Finality Delay:
- Optimistic: Mandatory 7-day challenge period.
- Zero-Knowledge: Fast, finalized upon proof verification (approx. 15 minutes to 2 hours).

5. EVM Compatibility & Equivalence:
- Optimistic: Native bytecode equivalence (direct fork of Geth).
- Zero-Knowledge: Highly complex arithmetization (zkEVM Types 1 through 4).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkuman trade-off rekayasa antara Optimistic dan ZK.
- Optimistic menang telak dalam kesetaraan EVM dan kesiapan produksi hari ini.
- ZK menang telak dalam kecepatan finalitas dan batas teoritis kompresi masa depan.

**Naskah Tutur (Voiceover Script):**
Mari kita letakkan kedua arsitektur ini berdampingan untuk melihat trade-off rekayasanya secara jujur.
Optimistic Rollup memiliki keunggulan luar biasa dalam hal kesiapan ekosistem dan kesetaraan EVM.
Karena kodenya merupakan turunan langsung dari klien Ethereum seperti Geth, pengembang bisa memindahkan aplikasi Solidity mereka tanpa mengubah satu baris kode pun.
Beban komputasi sequencer-nya juga sangat murah karena cukup memakai server standar.
Sebaliknya, ZK Rollup menuntut komputasi hardware yang sangat masif.
Menghasilkan bukti matematika polinomial membutuhkan server cluster dengan kartu grafis GPU tingkat tinggi yang memakan biaya listrik besar.
Merancang mesin virtual yang ramah terhadap sirkuit matematika ZK juga merupakan salah satu tantangan matematika tersulit di dunia.
Namun dari sisi teoritis jangka panjang, ZK Rollup unggul di setiap lini: tidak ada masa tunggu tujuh hari, kompresi data jauh lebih padat, dan keamanannya tidak bergantung pada kewaspadaan pihak mana pun.

---

## Slide 11: Architectural Consequences: Liquidity and State Fragmentation

### Konten Slide
Architectural Consequences: Liquidity and State Fragmentation

The Scaling Paradox:
- Deploying dozens of independent Rollup execution environments expands global throughput to tens of thousands of TPS.
- However, it fragments users, assets, and liquidity into isolated execution islands.

The Island of Liquidity Dilemma:
- Capital is trapped across Arbitrum, Optimism, Base, zkSync, and Ethereum L1.
- Broken Composability: Smart contracts on one rollup cannot synchronously interact with smart contracts on another rollup in a single atomic transaction.

The Cross-Domain Challenge:
- A user holding USDC on Arbitrum who wants to access a lending market on Base must route value across disconnected state machines.
- Necessitates cross-chain bridging infrastructure to restore economic fluidity.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Keberhasilan rollup memicu masalah baru: kepulauan likuiditas (islands of liquidity).
- Modal dan likuiditas terpecah di berbagai L2 dan L1 independen.
- Pengguna terjebak: aset ada di rantai A, tetapi aplikasi yang ingin dipakai berada di rantai B.

**Naskah Tutur (Voiceover Script):**
Penskalaan melalui Layer 2 telah membawa industri kita melangkah sangat jauh.
Namun di balik keberhasilan ini, muncul satu konsekuensi operasional yang sangat menyakitkan bagi ekosistem: fragmentasi likuiditas.
Dulu, seluruh modal dan aplikasi terpusat di satu tempat di Ethereum Layer 1.
Hari ini, kita memiliki puluhan Layer 2 dan rantai Layer 1 alternatif yang berjalan sendiri-sendiri.
Modal global kini terpecah-pecah ke dalam pulau-pulau likuiditas yang saling terisolasi.
Ada likuiditas yang terparkir di Arbitrum, ada yang di Optimism, ada yang di Base, dan ada yang di zkSync.
Bayangkan kalian adalah Alice.
Kalian memegang token USDC di jaringan Arbitrum, tetapi aplikasi pinjaman yang menawarkan bunga terbaik berada di jaringan Base.
Bagaimana cara kalian memindahkan uang dan instruksi tersebut menyeberangi dua mesin virtual yang sepenuhnya berbeda?
Inilah yang melahirkan kebutuhan akan jembatan lintas rantai atau cross-chain bridges.

---

## Slide 12: Transition to Module 06.4: Interoperability and Cross-Chain Bridges

### Konten Slide
Transition to Module 06.4: Interoperability and Cross-Chain Bridges

Bridging the Sovereign Divide:
- Blockchains are by design sovereign, isolated state machines incapable of observing external environments.
- Ethereum cannot read Solana state, and Arbitrum cannot natively verify Optimism state transitions.

Core Questions for Module 06.4:
- How do bridge protocols coordinate value and state transfer between sovereign consensus domains?
- What are the mechanics of Lock-and-Mint, Burn-and-Mint, and Liquidity Networks?
- Why did Vitalik Buterin declare that cross-chain bridges have fundamental security limits that rollups do not share?
- Why have bridge smart contracts become the target of the largest hacks in financial history, losing billions of dollars?

Next Up:
- Module 06.4: Interoperability and Cross-Chain Bridges: Connecting Fragmented Ecosystems.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkuman transisi: dari penskalaan internal rollup ke komunikasi antar-jaringan.
- Menyoroti kerentanan fatal jembatan: peretasan ratusan juta dolar.
- Teaser modul 6.4: Interoperability and Cross-Chain Bridges.

**Naskah Tutur (Voiceover Script):**
Rollup berhasil menyelesaikan masalah kecepatan di dalam rumahnya masing-masing.
Namun ketika kita mencoba menghubungkan rumah-rumah tersebut satu sama lain, kita memasuki wilayah rekayasa yang paling berbahaya dalam sejarah Web3.
Secara arsitektur dasar, setiap blockchain adalah mesin komputer yang buta dan tuli terhadap dunia luar.
Ethereum tidak punya mata untuk melihat apa yang terjadi di Solana, dan Arbitrum tidak bisa langsung memeriksa saldo di Optimism.
Untuk menghubungkan mereka, para pengembang membangun sistem jembatan atau Cross-Chain Bridges.
Namun menyatukan dua wilayah konsensus yang berbeda memperkenalkan celah keamanan yang sangat fatal.
Bahkan Vitalik Buterin sendiri pernah mengeluarkan peringatan keras bahwa jembatan lintas rantai memiliki batasan keamanan fundamental yang tidak bisa dipecahkan.
Bukan sebuah kebetulan bahwa peretasan terbesar dalam sejarah keuangan digital, bernilai miliaran dolar, semuanya terjadi di smart contract jembatan ini.
Bagaimana arsitektur jembatan bekerja dan mengapa mereka begitu rentan dibobol peretas?
Kita akan membedah anatomi jembatan lintas rantai di modul berikutnya: Interoperability and Cross-Chain Bridges.
Sampai jumpa di sesi berikutnya.
