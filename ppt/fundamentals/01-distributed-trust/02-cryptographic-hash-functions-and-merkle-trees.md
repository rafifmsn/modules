# Cryptographic Hash Functions and Merkle Trees
Modul Presentasi: Fondasi Distributed Trust (01.2)

---

---

## Slide 1: Cryptographic Hash Functions and Merkle Trees

### Konten Slide
Cryptographic Hash Functions and Merkle Trees
Fundamentals of Distributed Trust: Module 01.2
The mathematical foundations of data integrity, cryptographic compression, and logarithmic verification in decentralized systems.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul kedua trek Fundamentals.
- Menjelaskan pentingnya hash function sebagai pilar integritas data blockchain.
- Menghubungkan konsensus Nakamoto dari modul sebelumnya ke masalah efisiensi verifikasi data.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kedua dari trek Fundamentals.
Pada sesi sebelumnya, kita sudah melihat bagaimana Nakamoto Consensus menyelesaikan masalah double spending dengan menyusun transaksi ke dalam rantai blok.
Namun, arsitektur desentralistik itu langsung melahirkan tantangan teknik baru: bagaimana ribuan komputer independen bisa memverifikasi bahwa ribuan transaksi di dalam blok valid tanpa harus membaca data gigabyte demi gigabyte dari awal?
Jawabannya bertumpu pada satu primitif matematika elegan bernama cryptographic hash function dan struktur data Merkle tree.
Hari ini kita akan membedah cara kerja matematika di balik fungsi hash, lima sifat mutlak keamanannya, dan bagaimana struktur pohon Merkle memungkinkan perangkat sekecil ponsel memverifikasi transaksi secara instan.

---

---

## Slide 2: The Scale Crisis: Decentralized Ledgers

### Konten Slide
The Scale Crisis: Decentralized Ledgers
The Linear Verification Dilemma:
If nodes are forced to download and read the entire ledger line-by-line, computation bottlenecks.
Each additional block increases storage, bandwidth, and verification time linearly: O(N).

The Need for Cryptographic Primitives:
Mechanisms to identify arbitrary-sized documents as compact, fixed-size representations.
Mathematical guarantees that a single-bit modification will be detected instantly.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah utama: tidak ada database admin yang bisa kita percaya untuk berkata bahwa data valid.
- Memeriksa seluruh transaksi secara linier membuat jaringan runtuh saat skala membesar.
- Kita butuh representasi data yang ringkas, permanen, dan peka terhadap perubahan.

**Naskah Tutur (Voiceover Script):**
Bayangkan kalian menjalankan sebuah full node blockchain di laptop kalian.
Setiap sepuluh menit, ada ribuan transaksi baru yang masuk dari seluruh penjuru bumi.
Dalam sistem terpusat seperti bank, server database SQL tinggal melakukan indexing dan kita percaya penuh pada catatan server tersebut.
Namun di jaringan desentralistik, tidak ada administrator yang bisa kita percaya kata-katanya.
Prinsip utama blockchain adalah *don't trust, verify*.
Masalahnya, kalau setiap kali kita ingin memverifikasi sebuah pembayaran kita harus membaca ulang seluruh file riwayat transaksi secara linier dari blok pertama, kapasitas laptop kita akan habis dalam hitungan bulan.
Sistem akan lumpuh oleh beban datanya sendiri.
Kita membutuhkan teknologi yang bisa merangkum data sebesar apa pun menjadi sidik jari digital yang ringkas, cepat dihitung, dan mustahil dimanipulasi.

---

---

## Slide 3: Digital Fingerprints: Intuition and Compression

### Konten Slide
Digital Fingerprints: Intuition and Compression
Arbitrary Input Compression:
Input can be a single character, a 250-byte transaction file, or hundreds of gigabytes of data.
Output digest is always a fixed size (typically 32 bytes or 256 bits).

Computational Properties:
Extremely fast and cheap forward evaluation.
Generates a unique 64-character hexadecimal digest representing each underlying data payload.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Analogi sidik jari manusia di tempat kejadian perkara.
- Ukuran input bebas, ukuran output selalu tetap 32 byte pada SHA-256.
- Sifat komputasi satu arah: mudah membuat sidik jari dari orangnya, mustahil merekonstruksi tubuh orang dari sidik jarinya saja.

**Naskah Tutur (Voiceover Script):**
Di dunia nyata, polisi forensik menggunakan sidik jari biologis untuk mengidentifikasi seseorang.
Sidik jari itu sangat kecil, tapi cukup unik untuk membedakan satu individu dari delapan miliar manusia di bumi.
Kalian tidak bisa merekonstruksi tubuh manusia utuh hanya dari gambar sidik jari di atas kertas.
Namun jika orangnya ada di depan kalian dan sidik jarinya dicocokkan, verifikasinya berlangsung instan dan tanpa keraguan.
Cryptographic hash function bekerja persis seperti mesin sidik jari digital untuk segala bentuk data.
Kalian bisa memasukkan satu huruf "a", file teks transaksi sebesar 250 byte, atau seluruh isi perpustakaan digital sebesar lima ratus gigabyte.
Engine hash seperti SHA-256 akan memproses muatan tersebut dan selalu memuntahkan output dengan panjang yang persis sama: 256 bit atau 32 byte.
Hasil ini biasa kita lihat sebagai deretan 64 karakter heksadesimal yang menjadi identitas permanen dari data tersebut.

---

---

## Slide 4: Mathematical Properties 1 & 2: Determinism and Pre-Image Resistance

### Konten Slide
Mathematical Properties 1 & 2: Determinism and Pre-Image Resistance
Determinism (Universal Consistency):
The exact same input always yields the exact same output digest, regardless of time, location, or hardware architecture.
Eliminates reliance on local clocks, operating system status, or internal randomness.

Pre-Image Resistance (One-Way):
Given output digest y, it is computationally impossible to reverse-engineer input x such that H(x) = y.
Average brute-force search space requires 2^255 calculations for 256-bit hashes.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Fungsi hash biasa beda dengan cryptographic hash.
- Determinisme menjamin konsensus global: mesin di Jakarta dan Tokyo menghasilkan output identik.
- Pre-image resistance adalah sifat jalan satu arah (analogi smoothie buah).

**Naskah Tutur (Voiceover Script):**
Secara matematika, fungsi hash adalah fungsi pemetaan dari domain string tak hingga ke kodomain berukuran tetap $n$ bit.
Fungsi hash biasa seperti checksum CRC32 juga memetakan data ke output tetap, tapi itu tidak aman dari manipulasi peretas.
Untuk menjadi cryptographic hash function yang aman, ada lima sifat wajib.
Sifat pertama adalah determinisme.
Kapan pun dan di mana pun kalian menghitung hash dari data yang sama, hasilnya wajib identik seratus persen.
Komputer di Jakarta, server di Tokyo, atau ponsel di London harus menghasilkan string yang sama persis agar konsensus desentralistik tercapai.
Sifat kedua adalah pre-image resistance, atau sifat jalan satu arah.
Kalau saya beri tahu nilai hash-nya, secara komputasi mustahil bagi siapa pun untuk menebak data aslinya.
Analoginya seperti membuat jus stroberi dan pisang di blender.
Menghancurkan buah menjadi segelas smoothie merah muda sangat mudah dan cepat.
Tetapi kalau kalian disodorkan segelas smoothie, kalian tidak akan pernah bisa membalikkan putaran pisau blender untuk mengembalikan buah stroberi dan pisang utuh ke bentuk semula.

---

---

## Slide 5: Mathematical Properties 3 & 4: Second Pre-Image vs. Collision Resistance

### Konten Slide
Mathematical Properties 3 & 4: Second Pre-Image vs. Collision Resistance
Second Pre-Image Resistance (Weak Collision Resistance):
Given specific input x1, it is impossible to find a different input x2 such that H(x1) = H(x2).
Prevents attackers from substituting a legitimate transaction with a fraudulent transaction of identical hash.

Collision Resistance (Strong Collision Resistance):
It is impossible to find any arbitrary pair x1 and x2 in the universe such that H(x1) = H(x2).
In free collision search, attackers have total freedom to alter both inputs simultaneously.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bedakan weak collision resistance (second pre-image) dan strong collision resistance.
- Second pre-image melindungi transaksi yang sudah terbit agar tidak ditukar oleh peretas.
- Collision resistance melarang siapa pun menemukan dua file berbeda dengan hash sama di mana pun.

**Naskah Tutur (Voiceover Script):**
Dua sifat berikutnya sering disalahpahami karena terdengar mirip, padahal tingkat keamanannya sangat berbeda.
Sifat ketiga adalah second pre-image resistance.
Katakanlah Alice memublikasikan transaksi resmi: "Alice transfer 1 Bitcoin ke Bob", dengan nilai hash tertentu.
Second pre-image resistance menjamin bahwa seorang penyerang seperti Mallory tidak akan bisa membuat transaksi palsu bertuliskan "Alice transfer 1000 Bitcoin ke Mallory" yang memiliki nilai hash sama persis.
Jika sifat ini runtuh, Mallory bisa menukar isi transaksi Alice di jaringan dan node akan tertipu karena hash-nya cocok.
Sifat keempat adalah collision resistance yang lebih kuat.
Di sini, penyerang tidak ditantang mencocokkan transaksi milik Alice.
Penyerang diberi kebebasan penuh untuk mencari dua data sembarang apa pun di dunia yang jika di-hash menghasilkan output kembar.
Secara matematika tabrakan pasti ada karena input tak terbatas dipadatkan ke 256 bit.
Tetapi secara komputasi praktis, menemukan tabrakan tersebut harus mustahil dilakukan oleh komputer mana pun di dunia.

---

---

## Slide 6: The Birthday Paradox

### Konten Slide
The Birthday Paradox
Pigeonhole Principle & Probabilities:
Mapping an infinite input space to a finite output space (2^256) guarantees mathematical collisions exist.
The Birthday Paradox proves finding a match between any two arbitrary inputs is vastly easier than matching a specific target.

Security Limits:
Collision resistance boundary drops from 2^n to 2^(n/2).
For SHA-256, finding a collision requires 2^128 operations, remaining strictly secure against modern supercomputers.
Obsolete Algorithms: MD5 (collapsed 2004), SHA-1 (broken 2017).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Teori probabilitas Birthday Paradox: 23 orang sudah cukup untuk peluang kecocokan 50 persen.
- Keamanan collision resistance turun menjadi akar kuadrat ($2^{n/2}$).
- SHA-256 memiliki margin keamanan $2^{128}$ operasi, aman dari serangan komputer klasik.

**Naskah Tutur (Voiceover Script):**
Mengapa mencari tabrakan sembarang jauh lebih mudah daripada membongkar satu target tertentu?
Jawabannya ada pada prinsip probabilitas terkenal bernama Birthday Paradox.
Dalam setahun ada 365 hari.
Namun jika kalian mengumpulkan hanya 23 orang di satu ruangan, probabilitas ada dua orang yang tanggal lahirnya sama persis sudah melampaui lima puluh persen.
Itu terjadi karena kita membandingkan setiap pasangan orang yang ada, bukan mencocokkan satu tanggal tertentu.
Akibatnya, batas keamanan untuk menemukan tabrakan pada fungsi hash turun drastis menjadi akar kuadrat dari ruang kunci, yaitu dua pangkat $n$ per dua.
Untuk fungsi hash 256-bit seperti SHA-256, tingkat kesulitan collision resistance adalah dua pangkat 128 operasi komputasi.
Angka ini masih luar biasa besar dan membutuhkan waktu miliaran tahun bagi superkomputer terkuat saat ini.
Namun algoritma lama yang output bit-nya lebih pendek sudah resmi tumbang.
MD5 yang hanya 128 bit berhasil dibobol pada tahun 2004 dan tabrakannya sekarang bisa dibuat di ponsel dalam beberapa detik.
Begitu pula SHA-1 dengan output 160 bit yang dibobol oleh tim Google pada tahun 2017.
Itulah sebabnya industri blockchain hari ini standarnya adalah 256 bit ke atas.

---

---

## Slide 7: The Avalanche Effect

### Konten Slide
The Avalanche Effect
A microscopic 1-bit change in the input triggers a radical, unpredictable inversion of approximately 50% of the output bits.
Prevents attackers from deducing patterns, correlations, or mathematical vectors between inputs and output digests.
Acts purely as an idealized random oracle.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Avalanche effect: ubah satu titik di akhir kalimat, 50 persen bit output teracak total.
- Mencegah tebakan bertahap (tidak bisa pakai prinsip semakin dekat semakin mirip).
- Menjadi dasar mekanisme Proof of Work di Bitcoin mining.

**Naskah Tutur (Voiceover Script):**
Sifat wajib kelima adalah *avalanche effect* atau efek longsoran bit.
Sifat ini menyatakan bahwa jika kalian mengubah satu karakter kecil saja pada input, bahkan hanya satu bit, kira-kira separuh dari seluruh bit pada output hash akan berbalik secara acak.
Kalian bisa lihat contoh nyata di layar.
Kalimat "The quick brown fox jumps over the lazy dog" menghasilkan hash heksadesimal yang diawali huruf d7a8.
Ketika kita menambahkan satu tanda titik di ujung kalimat tersebut, hash-nya berubah total menjadi diawali ef53.
Tidak ada pola yang bisa dibaca.
Kalian tidak bisa melihat dua hash tersebut lalu menyimpulkan bahwa kedua dokumen aslinya hampir mirip.
Sifat ini membuat fungsi hash berperilaku seperti fungsi acak sejati di mata pengamat.
Ini menutup celah bagi penyerang untuk menggunakan teknik gradien atau interpolasi matematika guna mendekati input secara perlahan.
Efek longsoran inilah yang nantinya menjadi pondasi utama kompetisi penambangan Proof of Work di Bitcoin.

---

---

## Slide 8: Production Hash Functions in Blockchains

### Konten Slide
Production Hash Functions in Blockchains
Blockchains optimize hash architectures for specific cryptographic and hardware integrations:
SHA-256 (Merkle-Damgard, Bitcoin): Battle-tested NIST standard, hardware-accelerated by ASIC circuits.
Keccak-256 (Sponge Construction, Ethereum): SHA-3 standard winner, immune to length-extension attacks.
RIPEMD-160 (Bitcoin P2PKH): Compresses public key hashes to 20 bytes to save ledger space.
BLAKE3 (Tree-Based, Solana Tooling): Highly parallelized SIMD performance.
Poseidon (Algebraic Sponge, ZK-Rollups): Optimized for zero-knowledge arithmetic circuits.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tidak semua blockchain menggunakan SHA-256.
- Ethereum memilih Keccak-256 untuk menghindari length-extension attack.
- Perkembangan modern: BLAKE3 untuk komputasi paralel dan Poseidon untuk Zero-Knowledge proofs.

**Naskah Tutur (Voiceover Script):**
Di industri blockchain modern, ada beragam algoritma hash yang dipilih berdasarkan trade-off teknis masing-masing.
Bitcoin memilih SHA-256 yang distandardisasi oleh NIST.
Algoritma ini sangat teruji selama puluhan tahun dan didukung oleh instruksi akselerasi hardware pada prosesor modern serta chip ASIC penambangan.
Ketika Ethereum dirancang, mereka memilih Keccak-256 yang menggunakan arsitektur sponge.
Keccak kebal terhadap jenis serangan bernama *length-extension attack* yang secara teoritis bisa mengancam konstruksi Merkle-Damgard milik SHA-256.
Bitcoin juga memanfaatkan RIPEMD-160 untuk memadatkan alamat publik menjadi 20 byte saja agar menghemat memori.
Lalu bagaimana dengan blockchain generasi baru?
Solana dan sistem berkecepatan tinggi melirik BLAKE3 yang berbasis pohon dan mampu memanfaatkan seluruh core CPU secara paralel.
Sementara di dunia Layer 2 dan Zero-Knowledge Rollup seperti Starknet dan zkSync, mereka menggunakan fungsi hash khusus bernama Poseidon.
Poseidon dirancang dengan struktur aljabar medan prima yang secara drastis memangkas biaya komputasi pembuktian matematika di dalam sirkuit ZK-SNARK.

---

---

## Slide 9: Merkle Tree Anatomy

### Konten Slide
Merkle Tree Anatomy
Invented by Ralph Merkle (1979): A binary hash tree aggregating thousands of transactions into a single cryptographic commitment.

Tree Construction:
1. Leaf Hashing: Raw transactions are hashed independently (H_A = H(Tx_A)).
2. Pairwise Concatenation: Adjacent leaves are paired and concatenated (H_AB = H(H_A || H_B)).
3. Recursive Reduction: Recursively repeated upward until only a single 32-byte root remains: The Merkle Root.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ralph Merkle mematenkan binary hash tree pada 1979.
- Cara kerja: hash transaksi satu per satu, pasangkan dua-dua, lalu hash ke atas sampai sisa satu root.
- Jika transaksi ganjil, gandakan transaksi terakhir agar pohon tetap simetris.

**Naskah Tutur (Voiceover Script):**
Sekarang kita masuk ke struktur data yang mengubah seluruh efisiensi verifikasi blockchain: Merkle Tree.
Ditemukan oleh Ralph Merkle pada tahun 1979, Merkle Tree adalah pohon biner di mana setiap simpul daun berisi hash dari suatu data, dan setiap simpul di atasnya berisi hash dari gabungan anak-anaknya.
Bayangkan sebuah blok berisi empat transaksi: A, B, C, dan D.
Langkah pertama, sistem menghitung hash individual dari masing-masing transaksi menjadi daun $H_A, H_B, H_C$, dan $H_D$.
Langkah kedua, daun-daun yang bersebelahan dipasangkan dan digabungkan.
$H_A$ digabung dengan $H_B$ lalu di-hash ulang menghasilkan simpul $H_{AB}$.
Begitu juga $H_C$ dan $H_D$ menghasilkan simpul $H_{CD}$.
Langkah ketiga, proses ini berulang ke atas sampai hanya tersisa satu nilai hash 32-byte di puncak pohon, yang kita sebut Merkle Root.
Merkle Root ini menyegel seluruh transaksi di bawahnya secara absolut.
Kalau ada blok dengan jumlah transaksi ganjil, misalnya lima transaksi, implementasi standar seperti Bitcoin akan menduplikasi transaksi kelima agar pohonnya tetap seimbang dan simetris.

---

---

## Slide 10: The Audit Path: Merkle Proof Verification

### Konten Slide
The Audit Path: Merkle Proof Verification
Cryptographic proofs of inclusion without downloading the full block.

Verification Components:
- Raw transaction payload (Tx_A).
- Array of sibling hashes along the branch ([H_B, H_CD, H_EFGH]).
- Trusted Merkle Root in the block header.

Local Verification Logic:
Compute H_A locally, recursively hash upward with sibling hashes.
If locally calculated root matches the trusted header root, transaction inclusion is mathematically proven.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Merkle Proof memungkinkan verifikasi inklusi tanpa mengunduh blok penuh.
- Yang dibutuhkan penerima hanya: transaksi target, daftar sibling hashes, dan Merkle Root di header.
- Cukup beberapa kali kalkulasi hash lokal untuk membuktikan data asli dan tidak diubah.

**Naskah Tutur (Voiceover Script):**
Kekuatan komputasi terbesar dari Merkle Tree bukan sekadar merangkum data, melainkan kemampuannya menghasilkan bukti audit yang disebut Merkle Proof.
Bayangkan ada blok besar berisi delapan transaksi, dari A sampai H.
Alice ingin membuktikan kepada Bob bahwa transaksinya, transaksi A, benar-benar tercatat di blok tersebut.
Bob tidak punya kuota atau kapasitas untuk mengunduh seluruh transaksi di blok itu.
Bob hanya memegang Merkle Root 32-byte yang tersimpan di header blok tepercaya.
Alice tidak perlu mengirimkan transaksi B, C, D, E, F, G, dan H kepada Bob.
Alice cukup mengirimkan data transaksinya sendiri, ditambah tiga hash tetangga di sepanjang jalur menuju puncak: yaitu $H_B, H_{CD}$, dan $H_{EFGH}$.
Bob menerima paket kecil ini dan menghitung verifikasi lokal: hash transaksi A digabung dengan $H_B$ menjadi $H_{AB}$.
Lalu digabung dengan $H_{CD}$ menjadi $H_{ABCD}$.
Terakhir digabung dengan $H_{EFGH}$ menghasilkan akar pohon.
Jika akar yang dihitung Bob cocok persis dengan Merkle Root di tangannya, Bob memiliki kepastian matematis seratus persen bahwa transaksi A sah dan tidak pernah dimanipulasi.

---

---

## Slide 11: Logarithmic Scale Efficiency: O(log N)

### Konten Slide
Logarithmic Scale Efficiency: O(log N)
Proof size grows logarithmically relative to tree height: O(log2 N).

Payload Comparisons (32-byte hashes):
- 4 Transactions: 2 hashes (64 bytes).
- 1,024 Transactions: 10 hashes (320 bytes) vs 500 KB block.
- 4,096 Transactions: 12 hashes (384 bytes) vs 2 MB block.
- 1,048,576 Transactions: 20 hashes (640 bytes) vs 500 MB block.
Reduces verification bandwidth overhead by over 99.99%.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Keajaiban kompresi logaritmik: $\log_2 N$.
- 1 juta transaksi hanya membutuhkan 20 hash atau 640 byte untuk diverifikasi.
- Menghilangkan friksi bandwidth pada node berdaya rendah.

**Naskah Tutur (Voiceover Script):**
Mari kita cermati mengapa para ilmuwan komputer menyebut Merkle Tree sebagai salah satu penemuan paling elegan.
Efisiensi Merkle Proof bekerja pada skala logaritmik: log basis dua dari jumlah transaksi $N$.
Bandingkan dengan metode linier biasa.
Kalau satu blok berisi seribu transaksi, secara linier kita harus mengunduh data mentah sekitar 500 kilobyte.
Tetapi dengan Merkle Proof, kita hanya memerlukan sepuluh buah hash, atau sekitar 320 byte saja.
Sekarang perhatikan lompatan ekstremnya: bagaimana jika satu blok memuat satu juta transaksi?
Secara linier, ponsel kalian harus menyedot bandwidth sebesar 500 megabyte hanya untuk memastikan satu transfer uang sudah masuk.
Namun dengan Merkle Tree, log basis dua dari satu juta hanyalah dua puluh.
Ponsel kalian hanya perlu meminta 20 buah hash dengan ukuran payload 640 byte, lebih kecil dari ukuran satu pesan chat teks.
Hanya dengan 640 byte, kalian mendapatkan kepastian kriptografis yang setara dengan membaca seluruh file 500 megabyte tersebut.

---

---

## Slide 12: Simplified Payment Verification (SPV)

### Konten Slide
Simplified Payment Verification (SPV)
Light Client Architecture:
Does not download full transaction history (hundreds of gigabytes).
Only downloads 80-byte Block Headers (timestamp, target difficulty, nonce, Merkle Root).

SPV Workflow:
1. Light client validates Proof of Work on 80-byte header chain.
2. Requests Merkle Proofs for incoming payments from full nodes.
3. Reconstructs root locally and verifies against the longest header chain in milliseconds.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Satoshi merancang SPV di Section 8 whitepaper Bitcoin.
- Smartphone tidak perlu download ratusan GB, cukup simpan block header 80 byte.
- SPV memungkinkan ponsel memvalidasi transaksi secara independen tanpa percaya pada pihak ketiga.

**Naskah Tutur (Voiceover Script):**
Di Bagian 8 dari whitepaper Bitcoin, Satoshi Nakamoto menyadari bahwa sistem ini tidak akan pernah bisa diadopsi secara massal jika setiap pengguna wajib mengunduh seluruh riwayat blockchain yang berukuran ratusan gigabyte.
Satoshi memperkenalkan konsep Simplified Payment Verification atau SPV, yang menjadi dasar operasional seluruh mobile wallet hari ini.
Sebuah smartphone yang menjalankan *light client* tidak mengunduh data transaksi penuh.
Aplikasi dompet kalian hanya mengunduh *block header* yang ukurannya sangat kecil, tepatnya hanya 80 byte per blok.
Di dalam header 80 byte tersebut sudah terdapat pembuktian Proof of Work dan sebuah Merkle Root.
Ketika seorang pedagang menerima pembayaran, dompetnya cukup meminta Merkle Proof kecil dari full node acak di internet.
Ponsel pedagang menghitung hash secara lokal dan mencocokkannya ke Merkle Root di header blok yang sudah diverifikasi konsensusnya.
Dalam sepersekian detik, transaksi terbukti sah tanpa perantara, tanpa server perusahaan dompet, dan tanpa mengorbankan keamanan laptop atau ponsel pengguna.

---

---

## Slide 13: Authority and Ownership

### Konten Slide
Authority and Ownership
Cryptographic hash functions and Merkle trees guarantee permanent, tamper-resistant data integrity.
Merkle trees prove a transaction is recorded in a block, but cannot determine who possesses the legal authority to create that transaction.
Without central passwords or database permissions, how do users mathematically prove absolute ownership over digital assets?
Next Module: Asymmetric Cryptography and Digital Signatures.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Integritas data sudah selesai dipecahkan oleh Merkle Tree.
- Masalah baru: otorisasi dan kepemilikan (siapa yang berhak membelanjakan koin?).
- Teaser materi modul 1.3: Asymmetric Cryptography & Digital Signatures.

**Naskah Tutur (Voiceover Script):**
Sekarang kita telah menguasai pilar integritas data.
Kita paham bagaimana fungsi hash menyegel data dan bagaimana Merkle tree memungkinkan verifikasi kilat dalam skala logaritmik.
Namun, integritas data saja belum menyelesaikan persoalan kepemilikan uang digital.
Merkle tree bisa membuktikan bahwa sebuah transaksi tercatat di dalam blok tanpa ada satu huruf pun yang diubah.
Tetapi bagaimana jaringan tahu bahwa transaksi tersebut benar-benar diizinkan oleh pemilik dananya?
Apa yang mencegah Mallory menyusun transaksi palsu berformat rapi yang memindahkan seluruh koin milik Alice ke dompet milik Mallory sendiri?
Di sistem terdesentralisasi, tidak ada petugas bank yang memeriksa kartu identitas kita, dan tidak ada server sentral yang menyimpan password kita.
Otoritas harus dibuktikan secara absolut menggunakan matematika murni.
Di modul berikutnya, kita akan membedah pilar kriptografi kedua yang memungkinkan kepemilikan kedaulatan digital tanpa perantara: Asymmetric Cryptography dan Digital Signatures.
Sampai jumpa di modul berikutnya.
