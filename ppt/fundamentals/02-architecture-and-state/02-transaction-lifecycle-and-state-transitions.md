# Transaction Lifecycle and State Transitions
Modul Presentasi: Fondasi Distributed Trust (02.2)

---

## Slide 1: Transaction Lifecycle & State Transitions

### Konten Slide
Transaction Lifecycle & State Transitions
Architecture and State (02.2)
A transaction is not a single event. It is a multi-stage distributed systems pipeline.
- Local Realm: Binary serialization and cryptographic signing at the device level.
- P2P Network Realm: RPC static validation and localized mempool queuing.
- Consensus Realm: Deterministic state mutation via the virtual machine.
Every latency spike, stuck transaction, and arbitrage vulnerability occurs within this precise sequence.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul kedua dari bab Architecture and State.
- Menjelaskan bahwa transaksi bukanlah peristiwa tunggal sesaat, melainkan pipa sistem terdistribusi bertahap.
- Menyoroti tiga ranah: Ranah Lokal (dompet), Ranah Jaringan P2P (mempool), dan Ranah Konsensus (EVM).

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kedua dari bab Architecture and State: Transaction Lifecycle and State Transitions.
Banyak pengguna mengira bahwa ketika mereka mengklik tombol kirim di aplikasi dompet, saldo mereka langsung berpindah secara instan.
Faktanya, sebuah transaksi blockchain bukanlah satu peristiwa tunggal yang ajaib.
Transaksi adalah sebuah pipa rekayasa sistem terdistribusi bertahap yang sangat ketat.
Perjalanan ini melintasi ranah lokal di perangkat pengguna, ranah jaringan peer-to-peer di antrean mempool, hingga ranah konsensus mesin virtual.
Setiap jeda latensi, transaksi macet, hingga eksploitasi arbitrase bot MEV terjadi di dalam tahapan-tahapan yang akan kita bedah hari ini.

---

## Slide 2: Phase 1: Payload Construction

### Konten Slide
Phase 1: Payload Construction

Core User Inputs:
- to: 20-byte destination address (Externally Owned Account or smart contract).
- value: Native cryptocurrency transfer amount measured in atomic units (wei).
- calldata: Arbitrary byte array. Empty for standard transfers; contains encrypted function selectors for contract execution.

Auto-Injected Protocol Parameters (EIP-1559):
- gasLimit: Maximum computational units authorized for consumption.
- maxFeePerGas: Absolute maximum price willing to be paid per gas unit.
- maxPriorityFeePerGas: Direct validator tip to incentivize rapid mempool selection.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tahap 1: Konstruksi muatan transaksi di perangkat pengguna.
- Input inti: alamat tujuan (to), nilai nominal (value), dan muatan data (calldata).
- Parameter biaya EIP-1559: gasLimit, maxFeePerGas, dan priority tip untuk validator.

**Naskah Tutur (Voiceover Script):**
Tahap pertama dari siklus hidup transaksi dimulai langsung di perangkat pengguna: Konstruksi Muatan atau Payload Construction.
Aplikasi dompet menyusun struktur data biner yang memuat tiga input inti dari pengguna.
Pertama adalah alamat tujuan to sebesar dua puluh byte, baik berupa akun pribadi pengguna lain maupun alamat smart contract.
Kedua adalah nilai nominal value dalam satuan terkecil wei.
Ketiga adalah calldata, yaitu susunan byte mentah yang memuat pemilih fungsi dan argumen pemanggilan kontrak pintar.
Selain input tersebut, protokol secara otomatis menyuntikkan parameter gas modern berbasis EIP-1559.
Ada batas konsumsi komputasi gasLimit, batas harga tertinggi yang rela dibayar maxFeePerGas, serta biaya tip prioritas maxPriorityFeePerGas yang diberikan langsung kepada validator agar transaksi segera diproses.

---

## Slide 3: Cryptographic Serialization & The Nonce

### Konten Slide
Cryptographic Serialization & The Nonce

Serialization Pipeline:
Raw Payload Data -> RLP Encoding -> Keccak-256 Hash (32-byte digest) -> ECDSA secp256k1 Signature -> Raw Hex String Tuple (r, s, v).

The Nonce (N_tx = N_state):
Before network broadcast, the wallet must assign a strict scalar integer: the Account Nonce.
Unlike Bitcoin's mining nonce, an Account Nonce enforces two vital security guarantees:
1. Replay Protection: Rejects duplicated broadcasts of identical transactions across the network.
2. Deterministic Sequencing: A transaction with nonce 5 is mathematically guaranteed to execute before nonce 6, regardless of validator arrival time.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Serialisasi biner RLP, hashing Keccak-256, dan penandatanganan ECDSA menghasilkan tuple (r, s, v).
- Account Nonce berbeda total dengan mining nonce Proof of Work.
- Dua fungsi vital Account Nonce: Replay Protection dan Deterministic Sequencing.

**Naskah Tutur (Voiceover Script):**
Setelah muatan data lengkap, transaksi tidak langsung disiarkan dalam format teks biasa.
Transaksi harus diserialisasikan menjadi susunan biner mentah menggunakan standar Recursive Length Prefix atau RLP.
Susunan biner ini di-hash dengan Keccak-256, lalu ditandatangani menggunakan kurva eliptik ECDSA untuk menghasilkan tiga parameter tanda tangan: r, s, dan v.
Sebelum disiarkan, dompet wajib menyematkan sebuah bilangan bulat skalar yang sangat penting: Account Nonce.
Perlu diingat, nonce akun di sini sama sekali berbeda dengan nonce penambang pada Proof of Work.
Nonce akun adalah nomor urut transaksi yang dikeluarkan oleh sebuah alamat dompet.
Nonce ini memberikan dua jaminan keamanan mutlak: pertama, Replay Protection, memastikan tidak ada pihak jahat yang bisa menyiarkan ulang transaksi Anda untuk mencuri uang berulang kali.
Kedua, Deterministic Sequencing, menjamin bahwa transaksi bernonce lima pasti dieksekusi sebelum transaksi bernonce enam, kapan pun transaksi tersebut tiba di tangan validator.

---

## Slide 4: Phase 2: RPC Ingestion

### Konten Slide
Phase 2: RPC Ingestion

Payload Submission:
Payloads enter the network via the eth_sendRawTransaction JSON-RPC call.

The 6-Stage Static Validation Gates:
RPC nodes do not blindly broadcast data. They act as the first line of defense, executing a 6-stage static verification sequence:
1. Syntax Check: Validates formatting and RLP byte structure.
2. Size Check: Ensures payload does not exceed network maximum size limits.
3. Signature Check: Recovers public key and verifies ECDSA authorization.
4. Intrinsic Gas Check: Confirms gasLimit covers minimum execution requirements.
5. Nonce Check: Verifies transaction nonce is not less than current state nonce.
6. Balance Check: Ensures sender has enough funds to cover value plus max gas costs.

Transactions failing these checks are dropped in microseconds, expending zero miner gas and neutralizing DoS vectors.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Transaksi masuk ke jaringan melalui panggilan RPC eth_sendRawTransaction.
- Simpul RPC bertindak sebagai benteng pertahanan pertama dengan 6 gerbang validasi statis.
- Transaksi cacat dibuang dalam hitungan mikrodetik tanpa membuang gas penambang dan mencegah serangan DoS.

**Naskah Tutur (Voiceover Script):**
Setelah ditandatangani secara sah, string heksadesimal mentah dikirim ke simpul jaringan melalui panggilan API JSON-RPC bernama `eth_sendRawTransaction`.
Simpul RPC tidak langsung menyebarkan data tersebut secara membabi buta ke seluruh dunia.
Simpul RPC bertindak sebagai benteng pertahanan pertama yang menyaring serangan spam dengan menjalankan enam gerbang validasi statis.
Simpul memeriksa sintaksis struktur byte RLP, batas ukuran data, keabsahan tanda tangan digital, kecukupan batas gas minimum, kepatuhan nomor urut nonce, serta kecukupan saldo pengirim untuk membayar nilai transfer dan biaya gas maksimum.
Pemeriksaan statis ini selesai dalam hitungan mikrodetik di tingkat memori lokal.
Jika ada transaksi yang cacat atau berniat spam, transaksi tersebut langsung dibuang seketika tanpa perlu melibatkan validator dan tanpa memakan biaya gas sedikit pun.

---

## Slide 5: Anatomy of Intrinsic Gas

### Konten Slide
Anatomy of Intrinsic Gas
Intrinsic Gas is the non-refundable computational baseline paid before the first opcode executes.

Formula:
G_intrinsic = 21000 + G_calldata + G_access_list + G_creation

Cost Components:
- Base Cost: 21,000 Gas
  Covers systemic node overhead: disk I/O operations, ECDSA signature recovery, and global account balance mutations.
- Variable Cost: Calldata
  4 gas per zero byte (0x00).
  16 gas per non-zero byte.
  Non-zero bytes cost 4x more specifically to penalize permanent disk state bloat.
- Conditional: Contract Creation (+32,000 Gas)
  Compensates the network for creating and initializing a new contract account.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Definisi Intrinsic Gas: biaya komputasi dasar yang hangus sebelum opcode pertama dieksekusi.
- Biaya dasar 21.000 gas untuk transfer akun standar (memulihkan tanda tangan dan mutasi disk).
- Calldata: byte bukan-nol berbiaya 16 gas (4 kali lebih mahal dari byte nol) demi mencegah pembengkakan state disk.
- Biaya tambahan 32.000 gas jika membuat kontrak pintar baru.

**Naskah Tutur (Voiceover Script):**
Salah satu syarat lolosnya transaksi pada pemeriksaan gerbang keempat adalah kecukupan batas gas untuk membayar apa yang disebut sebagai *Intrinsic Gas*.
Intrinsic Gas adalah biaya komputasi dasar yang wajib dibayar di muka dan tidak dapat di-refund, bahkan sebelum baris kode program pertama dieksekusi oleh mesin virtual.
Untuk transaksi transfer ETH biasa, biaya dasarnya adalah tepat 21.000 gas.
Angka 21.000 ini dirancang untuk mengompensasi beban kerja simpul dalam memulihkan kunci publik dari tanda tangan ECDSA serta memperbarui catatan saldo di media penyimpanan disk.
Jika transaksi menyertakan muatan data calldata, setiap byte bernilai nol dikenakan biaya 4 gas, sedangkan byte bukan nol dikenakan biaya 16 gas.
Biaya byte bukan nol sengaja dibuat empat kali lebih mahal untuk memberi penalti ekonomi pada data yang membengkakkan memori buku besar secara permanen.
Dan jika transaksi bertujuan menyebarkan smart contract baru, protokol menambahkan biaya penalti sebesar 32.000 gas tambahan.

---

## Slide 6: Phase 3: Mempool Dynamics & Nonce Gaps

### Konten Slide
Phase 3: Mempool Dynamics & Nonce Gaps

Local Queue Architecture:
The mempool is not a synchronized global database; it is localized RAM queuing within individual nodes.

Queue Separation:
- Pending Queue (N_tx = N_state):
  Transactions perfectly matching the current state nonce.
  Eligible for immediate block builder extraction.
- Queued (Future) Queue (N_tx > N_state):
  Transactions arriving out of sequence.
  A single missing nonce creates a Nonce Gap, paralyzing all subsequent transactions from that account indefinitely until the missing integer is mined.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mempool bukanlah basis data global terpadu, melainkan antrean RAM lokal di masing-masing simpul.
- Pembagian antrean: Pending Queue (siap dieksekusi) vs Queued Queue (menunggu nomor nonce sebelumnya).
- Fenomena Nonce Gap: satu transaksi tersangkut melumpuhkan seluruh transaksi berikutnya dari akun yang sama.

**Naskah Tutur (Voiceover Script):**
Setelah lolos validasi statis, transaksi masuk ke ranah jaringan: Mempool.
Perlu dipahami bahwa mempool bukanlah sebuah basis data global yang tersinkronisasi sempurna di seluruh dunia.
Mempool adalah ruang antrean memori RAM lokal di masing-masing komputer simpul.
Di dalam mempool, transaksi pengguna dipisahkan menjadi dua kelompok antrean.
Kelompok pertama adalah Pending Queue, yaitu transaksi yang nomor noncenya cocok sempurna dengan nomor nonce akun saat ini di blockchain.
Transaksi di antrean pending siap dipungut oleh pembuat blok kapan saja.
Kelompok kedua adalah Queued Queue.
Jika akun Anda berada pada nonce 11, lalu Anda mengirim transaksi bernonce 13, transaksi tersebut akan terjebak di antrean masa depan.
Kondisi ini disebut Nonce Gap.
Selama transaksi bernonce 12 belum pernah ditambang ke dalam blok, seluruh transaksi berikutnya dari akun Anda akan membeku dan tidak akan pernah dieksekusi oleh validator.

---

## Slide 7: The Dark Forest & Replace-by-Fee

### Konten Slide
The Dark Forest & Replace-by-Fee

Mempool Exploitation:
Public mempools are unencrypted.
Arbitrage bots continuously scan this Dark Forest for extractable value (MEV), rearranging transaction execution orders via validator tips to execute sandwich attacks:
1. Bot Front-run: High tip, buys asset ahead of user.
2. Victim Transaction: Executes at severe price slippage.
3. Bot Back-run: Sells asset for risk-free profit.

Resolving Gridlock:
Users can unstick pending transactions via Replace-by-Fee (RBF).
By broadcasting a new payload with an identical nonce and a minimum 10% fee increase, nodes will overwrite the paralyzed transaction in RAM.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mempool publik bersifat transparan tanpa enkripsi: ekosistem Dark Forest dan bot MEV.
- Anatomi Sandwich Attack: Bot front-run, transaksi korban tergelincir (slippage), bot back-run mengunci profit.
- Solusi transaksi tersangkut via Replace-by-Fee (RBF): menyiarkan transaksi baru dengan nonce identik dan kenaikan biaya minimal 10 persen.

**Naskah Tutur (Voiceover Script):**
Karena mempool publik bersifat transparan tanpa enkripsi, lingkungan ini sering dijuluki sebagai *The Dark Forest* atau Hutan Gelap.
Di dalam hutan ini, ribuan bot arbitrase otomatis memindai setiap transaksi yang mengantre untuk mengekstrak Maximum Extractable Value atau MEV.
Ketika ada pengguna yang ingin membeli token di pasar desentralisasi, bot MEV dapat melakukan *Sandwich Attack*.
Bot menyuap validator dengan tip prioritas tinggi agar transaksi bot diproses tepat sebelum transaksi korban untuk menaikkan harga aset.
Setelah transaksi korban tereksekusi dengan harga mahal akibat slippage, bot langsung menjual kembali token tersebut di belakangnya untuk meraup keuntungan bebas risiko.
Lalu, bagaimana jika transaksi biasa Anda macet berjam-jam karena lonjakan biaya jaringan?
Anda dapat memanfaatkan mekanisme Replace-by-Fee atau RBF.
Dengan menyiarkan transaksi baru yang menggunakan nomor nonce yang sama persis namun menaikkan biaya gas minimal sepuluh persen, simpul jaringan akan secara otomatis menimpa dan membuang transaksi lama yang tersangkut dari memori RAM mereka.

---

## Slide 8: Phase 4: EVM State Transition

### Konten Slide
Phase 4: EVM State Transition

Deterministic State Machine:
sigma_{t+1} = Pi(sigma_t, B_{t+1})
sigma_i = Y(sigma_{i-1}, T)

The 4 Atomic Execution Steps:
1. Pre-execution Debit: Sender balance is deducted (gasLimit * EffectiveGasPrice) to guarantee solvency.
2. Nonce Increment: N_sender is incremented by exactly 1.
3. Execution Context: The EVM allocates stack memory and executes contract bytecode sequentially.
4. Settlement & Refund: Actual gas used is tallied. Unused gas is refunded, base fee is burned, and priority tip is credited to the validator.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rumus matematis transisi status Ethereum: sigma_{t+1} = Pi(sigma_t, B_{t+1}).
- Empat langkah eksekusi atomik: Pre-Debit saldo, penambahan Nonce, eksekusi bytecode di memori stack EVM, dan Settlement penyelesaian refund gas.
- Base fee dimusnahkan (burn) dan sisa gas dikembalikan ke dompet pengirim.

**Naskah Tutur (Voiceover Script):**
Ketika sebuah blok berhasil dirangkai oleh validator, transaksi akhirnya memasuki ranah konsensus: transisi status mesin virtual EVM.
Buku besar Ethereum didefinisikan secara matematis sebagai mesin status deterministik: status dunia baru sigma t plus satu adalah hasil dari fungsi Pi yang memproses status lama sigma t bersama blok baru B t plus satu.
Di dalam mesin virtual, setiap transaksi dieksekusi melalui empat langkah atomik yang ketat.
Langkah pertama adalah Pre-execution Debit: saldo pengirim didebit di muka sebesar batas gas dikali harga gas untuk memastikan pengirim memiliki dana yang cukup.
Langkah kedua adalah Nonce Increment: nomor urut nonce pengirim langsung dinaikkan tepat satu angka.
Langkah ketiga adalah Execution Context: mesin virtual mengalokasikan memori stack dan mengeksekusi rangkaian bytecode kontrak pintar baris demi baris.
Langkah keempat adalah Settlement and Refund: total gas riil yang terpakai dihitung.
Gas yang tidak terpakai dikembalikan ke saldo pengirim, biaya base fee dimusnahkan dari peredaran, dan biaya tip diserahkan kepada validator.

---

## Slide 9: Phase 5: Receipts & Event Logging

### Konten Slide
Phase 5: Receipts & Event Logging

The Transaction Receipt:
Upon execution, nodes generate an immutable proof: the Transaction Receipt (R).
Crucially, even if a transaction reverts mid-execution (status: 0), it is permanently included in the block and gas is consumed.

Receipt Components:
- status (1 for success, 0 for revert).
- cumulativeGasUsed in the block.
- logsBloom: Bitwise filter for contract events.
- logs: Array of emitted event signatures.

Architecture:
Because receipts are immutable history, they are NOT stored in the mutable World State Trie.
They are aggregated into a dedicated Receipts Merkle Patricia Trie in the block header.
Web3 frontends index the logsBloom to update user interfaces without heavy state queries.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bukti eksekusi transaksi dicatat dalam tanda terima transaksi (Transaction Receipt).
- Transaksi yang gagal (revert / status 0) tetap masuk ke dalam blok dan gasnya tetap hangus.
- Tanda terima disimpan di Receipts Trie terpisah, bukan di World State Trie.
- logsBloom memungkinkan antarmuka Web3 membaca event transfer tanpa membebani basis data global.

**Naskah Tutur (Voiceover Script):**
Setelah eksekusi komputasi selesai, simpul menerbitkan bukti permanen yang disebut Transaction Receipt atau tanda terima transaksi.
Satu hal penting yang wajib dipahami dalam rekayasa blockchain: transaksi yang mengalami kegagalan logika atau revert tetap tercatat secara abadi di dalam blok dan biaya gasnya tetap hangus dipotong.
Tanda terima ini mencatat status angka satu untuk sukses atau nol untuk gagal, total gas kumulatif, serta log peristiwa atau event log yang dipancarkan oleh smart contract.
Secara arsitektur, tanda terima tidak disimpan di dalam World State Trie yang dinamis, melainkan dikumpulkan ke dalam Receipts Merkle Patricia Trie tersendiri di header blok.
Melalui filter logsBloom pada receipts trie inilah, aplikasi dompet dan antarmuka Web3 dapat mendeteksi peristiwa seperti transfer token ERC-20 secara instan tanpa perlu memindai seluruh basis data dunia yang berat.

---

## Slide 10: Architecture Bridge: Ledger State Models

### Konten Slide
The Physical Coin Model (UTXO) vs. The Bank Ledger Model (Account State)

The Physical Coin Model (UTXO):
- Bitcoin Logic.
- The ledger functions as a pile of unspent digital cash bills.
- Transactions consume distinct inputs to forge entirely new outputs.
- No global balance entity exists in memory.

The Bank Ledger Model (Account State):
- Ethereum Logic.
- The ledger functions as a centralized bank statement.
- Transactions mutate a global database of addresses and singular balances in-place.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Komparasi konseptual dua model buku besar utama: Model UTXO vs Model Account.
- Model UTXO (Bitcoin): analogi lembaran uang fisik yang dilebur dan dicetak ulang.
- Model Account (Ethereum): analogi buku tabungan bank di mana angka saldo dimutasi langsung di tempat.

**Naskah Tutur (Voiceover Script):**
Dengan memahami siklus hidup transaksi dari dompet hingga eksekusi mesin virtual, kita melihat bagaimana status sistem bermutasi dari waktu ke waktu.
Namun, di balik layar komputer, bagaimana status buku besar tersebut sebenarnya disimpan secara fisik di media penyimpanan disk validator?
Dunia blockchain terbelah menjadi dua filosofi arsitektur besar.
Filosofi pertama adalah Model UTXO yang digunakan oleh Bitcoin.
Di dalam sistem UTXO, tidak ada yang namanya saldo akun tunggal.
Buku besar bekerja persis seperti tumpukan lembaran uang kertas fisik, di mana transaksi melebur koin-koin lama yang belum dibelanjakan untuk mencetak lembaran koin baru.
Filosofi kedua adalah Model Account yang diadopsi oleh Ethereum.
Model ini bekerja persis seperti buku rekening perbankan konvensional, di mana setiap alamat dompet memiliki satu baris data saldo yang langsung ditambah atau dikurangi di tempat.

---

## Slide 11: Bridge to the Next Module: Ledger State Models (UTXO vs. Account)

### Konten Slide
The State Storage Dilemma:
We have mapped the sigma transition. But how is sigma physically stored on disk?

The Engineering Trade-Off:
Does discrete coin consumption offer superior concurrency and privacy, or does an account-based balance sheet unlock richer smart contract expressivity?
How do differing state structures impact node RAM, storage bloat, and validation bottlenecks?

Next Module:
Module 02.3: Ledger State Models (UTXO vs. Account).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Menghubungkan mutasi transaksi ke format penyimpanan status internal di media penyimpanan simpul.
- Dilema rekayasa: Konkurensi paralel UTXO vs Fleksibilitas komputasi smart contract pada Model Akun.
- Teaser materi modul 02.3: Analisis mendalam arsitektur UTXO, script execution, dan Modified Merkle Patricia Trie.

**Naskah Tutur (Voiceover Script):**
Kita telah memetakan transisi status matematis dari awal hingga akhir.
Namun, perbedaan mendasar antara model koin diskret UTXO dan model akun global membawa implikasi rekayasa yang sangat luas terhadap performa jaringan.
Apakah model UTXO lebih unggul dalam memproses transaksi secara paralel dan menjaga privasi pengguna?
Ataukah model akun merupakan pilihan wajib untuk menjalankan kontrak pintar yang kompleks meskipun harus dibayar dengan pembengkakan ukuran basis data disk?
Di modul berikutnya, kita akan membedah kedua model arsitektur ini secara mendalam dalam Ledger State Models: UTXO versus Account Models.
Terima kasih atas perhatian Anda, dan sampai jumpa di modul berikutnya.
