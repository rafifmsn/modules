# Anatomy of a Block and Block Headers
Modul Presentasi: Fondasi Distributed Trust (02.1)

---

## Slide 1: Anatomy of a Block and Block Headers

### Konten Slide
Anatomy of a Block and Block Headers
Architecture, State, and Cryptographic Chaining
Dissecting the internal structure of blockchain data containers, the separation of execution from consensus, and the mathematical metadata that makes history immutable.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka Bab 2: Arsitektur dan Status Ledger (Architecture and State).
- Menjelaskan pentingnya blok sebagai wadah pengemasan transaksi terdistribusi.
- Menyoroti pemisahan antara lapisan konsensus (header) dan lapisan eksekusi (body).

**Naskah Tutur (Voiceover Script):**
Selamat datang di bab kedua dari trek Fundamentals of Distributed Trust: Architecture and State.
Pada bab sebelumnya, kita telah memahami bagaimana jaringan peer-to-peer menyebarkan data mentah melintasi benua.
Namun, sistem blockchain tidak memproses transaksi satu per satu secara langsung di tingkat konsensus.
Transaksi dikemas ke dalam wadah modular terstruktur yang disebut blok.
Hari ini kita akan membedah anatomi internal sebuah blok, memisahkan antara identitas kriptografis pada block header dan muatan transaksi pada block body, serta melihat metadata matematika yang membuat riwayat blockchain mustahil dimanipulasi.

---

## Slide 2: The Individual Gossip Problem & The Solution: Batching

### Konten Slide
The Individual Gossip Problem:
Running global consensus voting for every single atomic transaction triggers endless race conditions and instantly paralyzes network bandwidth.

The Solution: Batching:
Grouping thousands of transactions into a single cryptographic batch.
- Consensus Layer: Agrees strictly on the sequential order of data batches via lightweight metadata.
- Execution Layer: Sequentially processes balance mutations from the batch.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah penyiaran transaksi individual: memicu race condition dan membebani bandwidth global.
- Solusi pengelompokan (batching): ribuan transaksi digabung ke dalam satu wadah blok.
- Pemisahan peran: Konsensus hanya menyepakati urutan batch; Eksekusi memproses mutasi saldo di dalam batch.

**Naskah Tutur (Voiceover Script):**
Mengapa blockchain membutuhkan blok?
Mengapa kita tidak melakukan pemungutan suara konsensus untuk setiap transaksi yang masuk satu per satu?
Jika setiap transaksi individual harus disepakati secara atomik oleh puluhan ribu validator di seluruh planet, jaringan akan terjebak dalam kondisi race condition tanpa henti dan bandwidth internet global akan lumpuh seketika.
Solusi rekayasa komputer untuk masalah ini adalah batching atau pengelompokan data.
Ribuan transaksi digabungkan ke dalam satu wadah tunggal.
Arsitektur ini secara elegan memisahkan lapisan konsensus dan lapisan eksekusi.
Lapisan konsensus hanya bertugas menyepakati urutan paket batch melalui metadata ringan, sementara lapisan eksekusi mengeksekusi mutasi saldo di dalam batch tersebut secara sekuensial.

---

## Slide 3: Header (Cryptographic Identity) vs. Body (Transaction Payload)

### Konten Slide
Block Structure Dualism:

Header (Cryptographic Identity):
- Highly compact (80 bytes in Bitcoin, ~500-600 bytes in Ethereum).
- Acts as the mathematical passport.
- Holds backward hash links, timestamps, and Merkle roots.
- The sole object hashed by miners or signed by validators.

Body (Transaction Payload):
- Massive container (1 to 10+ Megabytes).
- Holds the raw, user-signed transactions.
- Sequentially executed by full nodes to update database state.
- Miners and validators do not hash this payload directly.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dualisme struktur blok: Block Header vs Block Body.
- Header berukuran sangat kecil (80 byte di Bitcoin) bertindak sebagai paspor matematika.
- Body berukuran megabyte memuat transaksi mentah pengguna.
- Penambang dan validator hanya melakukan komputasi hash atau tanda tangan pada header.

**Naskah Tutur (Voiceover Script):**
Secara struktural, setiap blok terbagi menjadi dua komponen utama: Header dan Body.
Block Header adalah identitas kriptografis blok yang sangat kompak, hanya berukuran 80 byte pada Bitcoin dan sekitar lima ratus hingga enam ratus byte pada Ethereum.
Header bertindak sebagai paspor matematika yang menyimpan tautan hash ke blok sebelumnya, stempel waktu, dan akar Merkle.
Header inilah satu-satunya objek yang dihitung oleh mesin tambang atau ditandatangani oleh validator.
Sebaliknya, Block Body adalah kontainer penyimpanan berukuran megabyte yang menampung seluruh transaksi mentah pengguna.
Muatan body dieksekusi secara sekuensial oleh simpul penuh untuk memperbarui basis data saldo, namun penambang tidak pernah melakukan hashing langsung terhadap muatan transaksi raksasa ini.

---

## Slide 4: Block Header Structure (80 Bytes)

### Konten Slide
Bitcoin Block Header Layout (Exactly 80 Bytes):

- nVersion (4 Bytes): Protocol version and soft fork upgrade signaling.
- hashPrevBlock (32 Bytes): Double-SHA-256 hash of the previous block header, forming the backward chain link.
- hashMerkleRoot (32 Bytes): The cryptographic seal summarizing the entire transaction body payload.
- nTime (4 Bytes): Unix timestamp of block discovery.
- nBits (4 Bytes): Compact floating-point representation of the Proof of Work difficulty target.
- nNonce (4 Bytes): 32-bit random counter iterated to find a valid block hash.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Enam bidang data presisi dalam 80 byte Block Header Bitcoin.
- nVersion (4B), hashPrevBlock (32B), hashMerkleRoot (32B), nTime (4B), nBits (4B), nNonce (4B).
- Menjelaskan bagaimana 80 byte ini mengikat seluruh integritas rantai.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah anatomi 80 byte Block Header Bitcoin yang legendaris.
Bidang pertama adalah nVersion sebesar 4 byte yang menentukan versi protokol dan sinyal pembaruan jaringan.
Bidang kedua adalah hashPrevBlock sebesar 32 byte yang menyimpan hash ganda SHA-256 dari header blok sebelumnya, membentuk rantai mundur yang mengunci sejarah.
Bidang ketiga adalah hashMerkleRoot sebesar 32 byte, komitmen kriptografis tunggal yang merangkum ribuan transaksi di dalam block body.
Bidang keempat adalah nTime sebesar 4 byte, mencatat stempel waktu Unix saat blok ditemukan.
Bidang kelima adalah nBits sebesar 4 byte, representasi padat dari target tingkat kesulitan penambangan.
Dan bidang keenam adalah nNonce sebesar 4 byte, angka acak yang diputar oleh penambang untuk menemukan hash yang valid.

---

## Slide 5: The nBits Mechanism & The nNonce Exhaustion

### Konten Slide
1. The nBits Mechanism:
Constraint: The difficulty target is a massive 256-bit (32 byte) unsigned integer.
Workaround: nBits compresses this into a 4-byte floating-point format (Exponent + Mantissa), saving 28 bytes per block worldwide.
Formula: Target = Mantissa * 256^(Exponent - 3)

2. The nNonce Exhaustion:
Constraint: The 4-byte nNonce only provides 2^32 (4.29 billion) combinations. Modern ASICs exhaust this search space in just 40 microseconds.
Workaround: Mutating the ExtraNonce (a 4-8 byte counter inserted into the Coinbase transaction scriptSig). This alters the Coinbase hash, updates hashMerkleRoot in the header, and completely refreshes the 32-bit nonce space.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kompresi target nBits: menghemat 28 byte dengan format eksponen dan mantisa.
- Batasan nNonce 4 byte: habis dipindai oleh mesin ASIC dalam 40 mikrodetik (2^32 kombinasi).
- Solusi ExtraNonce di transaksi Coinbase: memperbarui Merkle Root untuk mereset ruang pencarian nonce tanpa batas.

**Naskah Tutur (Voiceover Script):**
Di balik kesederhanaan header 80 byte ini, terdapat dua solusi rekayasa yang sangat cerdas.
Pertama adalah mekanisme nBits.
Target kesulitan matematika Proof of Work sebenarnya adalah bilangan bulat raksasa sebesar 256 bit atau 32 byte.
Untuk menghemat ruang buku besar, Bitcoin memampatkan angka ini menjadi format floating-point kompak 4 byte yang membagi data menjadi eksponen dan mantisa, menghemat dua puluh delapan byte di setiap blok secara permanen.
Tantangan kedua adalah habisnya ruang nNonce.
Ruang nNonce 4 byte hanya menyediakan 4,29 miliar kombinasi acak.
Mesin tambang ASIC modern sanggup menghabiskan seluruh kombinasi tersebut hanya dalam waktu empat puluh mikrodetik.
Untuk mengatasi kebuntuan ini, para penambang memodifikasi parameter ExtraNonce di dalam transaksi Coinbase.
Perubahan pada transaksi Coinbase akan mengubah nilai hashMerkleRoot di header blok, sehingga penambang mendapatkan miliaran ruang kombinasi nonce baru tanpa melanggar aturan konsensus.

---

## Slide 6: The Deterministic Dependency Tree

### Konten Slide
Cryptographic Invalidation Mechanics:
Hash(Bn) = SHA-256(SHA-256(Header_n))

Chaining Structure:
Block 100 -> Double-SHA-256 -> hashPrevBlock in Block 101 -> hashPrevBlock in Block 102.

The Deterministic Dependency Tree:
Every block explicitly embeds the cryptographic signature of its predecessor.
Because the hash relies on the entire header, each block mathematically seals the complete history of the network all the way back to the Genesis Block.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Formula identitas blok: Hash ganda SHA-256 dari seluruh header.
- Pohon dependensi deterministik: setiap blok menyematkan identitas blok sebelumnya.
- Penguncian kumulatif: blok terbaru menyegel seluruh riwayat transaksi hingga blok Genesis.

**Naskah Tutur (Voiceover Script):**
Identitas unik dari setiap blok bukanlah nomor urutnya, melainkan nilai hash ganda SHA-256 dari seluruh isi headernya.
Struktur ini membentuk sebuah pohon dependensi deterministik.
Blok 101 secara eksplisit memuat hashPrevBlock dari Blok 100 di dalam headernya.
Blok 102 memuat hash dari Blok 101.
Karena perhitungan hash bergantung pada setiap byte data di dalam header, penambahan blok baru secara otomatis mengunci seluruh sejarah transaksi di belakangnya.
Sebuah blok yang tertanam di ketinggian rantai saat ini secara matematis mengunci integritas seluruh transaksi yang pernah terjadi sejak blok Genesis pertama kali ditambang oleh Satoshi Nakamoto.

---

## Slide 7: The Mallory Attack

### Konten Slide
Tampering with Historical Immutability:

Attack Steps:
1. Mallory alters 1 byte of historical transaction data in Block 100 to steal coins.
2. The transaction hash instantly changes, mutating the hashMerkleRoot.
3. The altered Merkle Root changes the total Header Hash of Block 100.

Fatal Impact:
The cryptographic link is severed.
Block 101's hashPrevBlock pointer fails to match.
Honest nodes instantly reject the chain.
The attacker is forced to out-compute the entire global network to rebuild the chain from the point of fracture.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Simulasi serangan Mallory mengubah 1 byte transaksi di Blok 100.
- Perubahan 1 byte merusak Merkle Root dan membatalkan hash header Blok 100.
- Penunjuk hashPrevBlock di Blok 101 patah seketika.
- Penyerang terpaksa menambang ulang seluruh blok berikutnya melawan kekuatan komputasi dunia.

**Naskah Tutur (Voiceover Script):**
Mari kita lihat apa yang terjadi jika ada penyerang bernama Mallory yang mencoba mengubah catatan transaksi masa lalu di Blok 100.
Mallory mengubah satu byte saja pada data transaksi untuk mengalihkan koin ke rekeningnya.
Akibat Avalanche Effect yang telah kita pelajari, hash transaksi tersebut berubah total dan merusak nilai hashMerkleRoot di header Blok 100.
Perubahan Merkle Root seketika membatalkan identitas hash header Blok 100.
Di Blok 101, penunjuk hashPrevBlock tidak lagi cocok dengan hash Blok 100 yang baru.
Tautan rantai kriptografis putus seketika.
Seluruh simpul jujur di dunia akan langsung menolak blok tersebut sebagai data sampah.
Satu-satunya cara bagi Mallory untuk melegalkan manipulasi tersebut adalah menghitung ulang Proof of Work untuk Blok 100, 101, dan seluruh blok sesudahnya lebih cepat daripada gabungan seluruh penambang di planet bumi.

---

## Slide 8: Bitcoin Static Ledger vs. Ethereum Global Compute

### Konten Slide
Evolution from Static Money to Turing-Complete Compute:

Bitcoin (Static Ledger):
- Tracks simple coin mutations.
- Minimal metadata.
- Header size: Exactly 80 bytes.
- Single Merkle root locking the transaction payload.

Ethereum (Global Compute):
- Turing-complete state machine.
- Tracks account balances, contract bytecode, storage variables, and execution logs.
- Header size: ~500 to 600+ bytes.
- Requires advanced computational metadata and dynamic fee algorithms.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Komparasi header: Bitcoin (buku besar statis) vs Ethereum (komputer global).
- Bitcoin fokus pada mutasi koin sederhana dengan header 80 byte tetap.
- Ethereum mengelola mesin virtual Turing-complete dengan saldo, bytecode kontrak, dan variabel memori.
- Header Ethereum berukuran ~500-600 byte untuk memuat akar status komputasi.

**Naskah Tutur (Voiceover Script):**
Ketika kita melangkah dari Bitcoin ke Ethereum, peran block header mengalami transformasi radikal.
Bitcoin dirancang sebagai buku besar moneter statis yang bertugas mencatat mutasi kepemilikan koin.
Headernya berukuran tetap 80 byte dan hanya memuat satu Merkle root untuk mengunci muatan transaksi.
Sebaliknya, Ethereum beroperasi sebagai komputer dunia atau mesin status global yang Turing-complete.
Ethereum tidak hanya mencatat transaksi pengiriman mata uang, melainkan juga mengeksekusi kode program *smart contracts*, menyimpan variabel basis data, dan menerbitkan log peristiwa.
Akibatnya, header Ethereum membengkak menjadi sekitar lima ratus hingga enam ratus byte guna menampung metadata komputasi tingkat tinggi dan algoritma biaya dinamis.

---

## Slide 9: Ethereum Block Header: Three Trie Roots

### Konten Slide
The Three Merkle Patricia Trie Roots in Ethereum:

1. transactionsRoot:
The execution payload.
Operates similarly to Bitcoin, locking the sequence of executed transactions within the block.

2. stateRoot (World State):
The most vital trie.
Captures the exact snapshot of all account balances (wei), nonces, contract bytecode, and storage immediately post-execution.
Allows instantaneous cryptographic proof of balances without replaying history from Genesis.

3. receiptsRoot:
The execution receipts.
Records success/revert status, cumulative gas used, and smart contract event logs.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga akar Merkle Patricia Trie pada header Ethereum.
- transactionsRoot: mengunci urutan transaksi yang dieksekusi.
- stateRoot: snapshot status seluruh akun, saldo, kode kontrak, dan memori penyimpanan dunia.
- receiptsRoot: bukti eksekusi, status sukses/gagal, dan log peristiwa smart contract.

**Naskah Tutur (Voiceover Script):**
Keunikan utama dari block header Ethereum terletak pada keberadaan tiga akar Merkle Patricia Trie yang saling melengkapi.
Akar pertama adalah transactionsRoot, yang berfungsi mirip dengan Merkle root Bitcoin untuk mengunci daftar transaksi mentah yang dikemas di dalam blok.
Akar kedua, dan yang paling krusial, adalah stateRoot atau status dunia.
Akar ini memotret status mutlak dari seluruh akun di Ethereum secara instan setelah blok selesai dieksekusi: saldo ether, angka nonce, kode kontrak pintar, hingga seluruh variabel memori internalnya.
Berkat stateRoot, simpul baru dapat membuktikan saldo seseorang secara kriptografis tanpa perlu memutar ulang riwayat transaksi dari blok Genesis.
Akar ketiga adalah receiptsRoot, yang mencatat tanda bukti eksekusi seperti status transaksi berhasil atau gagal, total konsumsi gas kumulatif, serta log peristiwa yang dipancarkan oleh smart contract.

---

## Slide 10: Advanced Execution Metadata

### Konten Slide
Ethereum Operational Header Fields:

- logsBloom (256 Byte):
Probabilistic Bloom filter for instant event log querying without downloading massive receipt tries.

- gasLimit & gasUsed:
Computational resource meters restricting workload size per block to protect validator CPUs.

- baseFeePerGas (EIP-1559):
Algorithmic dynamic base fee that is automatically burned upon transaction inclusion.

- prevRandao:
Verifiable pseudo-random entropy injected directly from the Beacon Chain (Proof of Stake consensus).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Metadata eksekusi lanjutan pada Ethereum modern.
- logsBloom 256 byte: filter probabilistik untuk pencarian log peristiwa cepat.
- gasLimit & gasUsed: pembatas beban komputasi per blok agar validator tidak overload.
- baseFeePerGas (EIP-1559): biaya dasar dinamis yang otomatis dimusnahkan (burn).
- prevRandao: sumber keacakan terverifikasi dari konsensus Proof of Stake.

**Naskah Tutur (Voiceover Script):**
Selain ketiga akar pohon status tadi, header Ethereum modern dilengkapi berbagai metadata operasional canggih.
Ada logsBloom berukuran 256 byte, yaitu struktur filter data probabilistik yang memungkinkan aplikasi dompet mencari rekaman log transaksi secara instan tanpa perlu mengunduh seluruh receipts trie.
Terdapat parameter gasLimit dan gasUsed yang bertindak sebagai pembatas beban kerja komputasi agar ukuran blok tidak membuat prosesor validator kewalahan.
Mulai dari pembaruan EIP-1559, header mencatat baseFeePerGas, yaitu tarif biaya gas dinamis yang ditentukan oleh protokol dan langsung dimusnahkan secara permanen.
Dan di era Proof of Stake saat ini, header menyertakan nilai prevRandao yang menyuntikkan keacakan terverifikasi langsung dari lapisan konsensus Beacon Chain untuk kebutuhan aplikasi terdesentralisasi.

---

## Slide 11: Bridge to the Next Module: Transaction Lifecycle and State Transitions

### Konten Slide
The Container is Built. How does the data arrive?

The Architectural Question:
We have mapped the cryptographic vault and metadata of a block.
But how does a user's intent traverse node RPCs, navigate the mempool, survive the Dark Forest of front-running, and execute deterministically?

Next Module:
Module 02.2: Transaction Lifecycle and State Transitions.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Menghubungkan wadah blok ke alur masuknya transaksi dari pengguna.
- Pertanyaan kunci: Bagaimana transaksi berpindah dari klik pengguna di dompet hingga dieksekusi di EVM?
- Teaser materi modul 02.2: Transaction Lifecycle, Mempool, MEV, dan mutasi state sigma.

**Naskah Tutur (Voiceover Script):**
Kita telah membedah arsitektur internal blok sebagai brankas kriptografis yang kokoh.
Wadahnya telah terbangun dengan sempurna di dalam teori ilmu komputer.
Namun, timbul pertanyaan penting berikutnya: bagaimana data transaksi tersebut pertama kali tiba di dalam wadah ini?
Bagaimana instruksi pembayaran dari jari seorang pengguna berpindah melintasi gerbang RPC, mengarungi antrean mempool, bertahan hidup dari serangan bot arbitrase di Dark Forest, hingga akhirnya dieksekusi secara deterministik oleh mesin virtual?
Di modul berikutnya, kita akan membedah siklus hidup transaksi secara menyeluruh dalam Transaction Lifecycle and State Transitions.
Terima kasih, dan sampai jumpa di modul berikutnya.
