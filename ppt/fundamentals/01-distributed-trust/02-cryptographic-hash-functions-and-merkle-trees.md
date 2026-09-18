# Cryptographic Hash Functions and Merkle Trees
Modul Presentasi: Fondasi Distributed Trust (01.2)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Cryptographic Hash Functions and Merkle Trees
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Fondasi matematis integritas data, kompresi kriptografis, dan verifikasi logaritmik dalam sistem terdesentralisasi.
- *Visual:* Visualisasi alur data mentah masuk ke engine SHA-256 menghasilkan digest 32-byte, berdampingan dengan bagan pohon Merkle bercabang.

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

## Slide 2: Krisis Skala pada Ledger Terdesentralisasi

### Konten Slide
- **Tantangan Verifikasi Data:** Blockchain publik beroperasi di lingkungan tanpa server pusat dan tanpa administrator database terpercaya.
- **Dilema Pemeriksaan Linier:**
  - Jika simpul jaringan wajib mengunduh dan membaca seluruh riwayat transaksi baris demi baris, komputasi akan macet.
  - Setiap penambahan blok memperbesar beban bandwidth, kapasitas disk, dan waktu verifikasi secara linier (*O(N)*).
- **Kebutuhan Primitif Kriptografis:**
  - Mekanisme identifikasi dokumen berukuran sembarang menjadi representasi ringkas berukuran tetap.
  - Jaminan matematis bahwa modifikasi sekecil satu bit pada data akan terdeteksi seketika.
- *Visual:* Diagram perbandingan node yang kewalahan membaca data linier 500 GB vs node yang memverifikasi data instan menggunakan cryptographic digest.

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

## Slide 3: Intuisi Sidik Jari Digital (Digital Fingerprints)

### Konten Slide
- **Analogi Biologis:** Sidik jari manusia berukuran kecil dan unik, mewakili satu individu secara spesifik tanpa harus menduplikasi wujud fisik manusia tersebut.
- **Kompresi Data Sembarang:**
  - Input dapat berupa satu huruf, file transaksi 250 byte, atau data sebesar ratusan gigabyte.
  - Output yang dihasilkan selalu berukuran tetap, misalnya 256 bit (32 byte) pada SHA-256.
- **Sifat Komputasi:**
  - Sangat cepat dan murah dihitung ke arah depan (*forward evaluation*).
  - Menghasilkan ringkasan heksadesimal 64 karakter yang unik untuk setiap muatan data.
- *Visual:* Diagram flowchart input sembarang (teks pendek, transaksi, file ISO raksasa) masuk ke hash engine menghasilkan output heksadesimal 32 byte dengan panjang seragam.

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

## Slide 4: Sifat Matematis 1 & 2: Determinisme dan Pre-Image Resistance

### Konten Slide
- **Formalisasi Pemetaan:** $H: \{0, 1\}^* \to \{0, 1\}^n$, memetakan domain string bit tak hingga ke kodomain string bit berukuran tetap $n$.
- **1. Determinisme (Universal Consistency):**
  - Input yang sama selalu menghasilkan output digest yang persis sama kapan pun dan di mana pun dihitung.
  - Menghilangkan ketergantungan pada jam lokal, status sistem operasi, atau keacakan internal.
- **2. Pre-Image Resistance (Sifat Satu Arah):**
  - Diberikan output hash $y$, secara komputasi mustahil menemukan input asal $x$ sedemikian sehingga $H(x) = y$.
  - Ruang pencarian brute-force untuk 256-bit membutuhkan rata-rata $2^{255}$ kalkulasi.
- *Visual:* Analogi blender buah (mudah menghancurkan stroberi dan pisang menjadi smoothie, mustahil memutar balik pisau blender untuk menyusun kembali buah utuh).

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

## Slide 5: Sifat Matematis 3 & 4: Second Pre-Image vs. Collision Resistance

### Konten Slide
- **3. Second Pre-Image Resistance (Weak Collision Resistance):**
  - Diberikan input spesifik $x_1$, mustahil menemukan input berbeda $x_2$ sehingga $H(x_1) = H(x_2)$.
  - Mencegah penyerang mengganti transaksi Alice yang sah dengan transaksi palsu yang ber-hash identik.
- **4. Collision Resistance (Strong Collision Resistance):**
  - Mustahil menemukan pasangan sembarang $x_1$ dan $x_2$ mana pun di alam semesta sedemikian sehingga $H(x_1) = H(x_2)$.
  - Pada tabrakan bebas, penyerang memiliki kebebasan penuh memilih kedua input secara bersamaan.
- **Perbedaan Mendasar:** Second pre-image menantang penyerang mencocokkan target yang ditentukan orang lain, sedangkan collision resistance membebaskan penyerang mencari kecocokan antar dua input bebas.
- *Visual:* Diagram perbandingan: Target tetap $x_1$ menuju $y$ (Second Pre-Image) vs Pasangan bebas $x_1$ dan $x_2$ bertemu di titik hash yang sama (Collision).

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

## Slide 6: The Birthday Paradox dan Keamanan Komputasi

### Konten Slide
- **Pigeonhole Principle:** Ruang input tak terbatas dipetakan ke ruang output berhingga ($2^{256}$), sehingga tabrakan matematis pasti ada.
- **The Birthday Paradox:**
  - Dalam sebuah ruangan berisi 23 orang, probabilitas dua orang berbagi hari ulang tahun yang sama melampaui 50 persen.
  - Mencari kecocokan antar-pasangan acak jauh lebih mudah daripada mencocokkan satu target tanggal lahir tertentu.
- **Kompleksitas Komputasi Tabrakan:**
  - Batas pencarian tabrakan berkurang dari $2^n$ menjadi akar kuadratnya: $\mathcal{O}(2^{n/2})$.
  - Untuk SHA-256: Pre-image resistance setara $2^{256}$ operasi, collision resistance setara $2^{128}$ operasi.
- **Preseden Algoritma yang Usang:**
  - *MD5 (128-bit, batas $2^{64}$):* Runtuh pada tahun 2004, tabrakan dapat dibuat dalam hitungan detik di ponsel.
  - *SHA-1 (160-bit, batas $2^{80}$):* Runtuh resmi oleh Google pada tahun 2017 lewat serangan SHAttered.
- *Visual:* Grafik kurva probabilitas Birthday Paradox melesat naik di 23 orang, disandingkan dengan perbandingan kekuatan kunci MD5, SHA-1, dan SHA-256.

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

## Slide 7: Sifat Matematis 5: The Avalanche Effect

### Konten Slide
- **Definisi Efek Longsoran:** Perubahan mikroskopis pada input wajib memicu perubahan radikal dan tak terduga pada seluruh output hash.
- **Karakteristik Bit:** Mengubah satu bit saja pada file berukuran ratusan megabyte akan membalikkan sekitar 50 persen bit pada digest keluaran.
- **Demonstrasi SHA-256:**
  - `echo -n "The quick brown fox jumps over the lazy dog" | sha256sum` menghasilkan digest berawalan `d7a8fbb3...`
  - `echo -n "The quick brown fox jumps over the lazy dog." | sha256sum` menghasilkan digest berawalan `ef530b25...`
- **Implikasi Desain Keamanan:**
  - Hash function bertindak seperti *random oracle* matematis murni.
  - Mencegah penyerang menggunakan analisis linier atau optimasi gradien untuk menebak input secara bertahap.
- *Visual:* Tampilan dua string teks yang hanya berbeda satu tanda titik, menghasilkan dua baris hash yang berbeda total dari awal hingga akhir.

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

## Slide 8: Lanskap Algoritma Hash Produksi Blockchain

### Konten Slide
- **Spesialisasi Kebutuhan Protokol:** Berbagai blockchain memilih algoritma hash berdasarkan efisiensi perangkat keras, keamanan struktural, dan integrasi kriptografis.
- **Perbandingan Algoritma Utama:**
  - **SHA-256 (Merkle-Damgard):** Digunakan Bitcoin; standar NIST teruji tempur; didukung instruksi akselerasi hardware pada CPU dan ASIC.
  - **Keccak-256 (Sponge Construction):** Digunakan Ethereum (EVM); pemenang kompetisi SHA-3; kebal terhadap serangan length-extension.
  - **RIPEMD-160:** Digunakan Bitcoin untuk kompresi alamat publik (P2PKH) menjadi 20 byte demi menghemat kapasitas ledger.
  - **BLAKE3 (Tree-Based Merkle):** Digunakan Solana tooling; sangat terparalelisasi di multi-core CPU dan jalur SIMD; performa jauh melampaui SHA-256.
  - **Poseidon (Algebraic Sponge):** Digunakan pada ZK-Rollup (Starknet, zkSync, Scroll); dioptimalkan untuk sirkuit aritmatika prime fields dengan constraint minimal.
- *Visual:* Tabel matriks perbandingan 5 algoritma: Nama, Output, Arsitektur, Penggunaan Utama, dan Keunggulan Utama.

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

## Slide 9: Anatomi dan Konstruksi Merkle Tree

### Konten Slide
- **Latar Belakang:** Ditemukan dan dipatenkan oleh Ralph Merkle pada tahun 1979; struktur pohon biner berbasis hash.
- **Kebutuhan Agregasi Transaksi:** Satu blok blockchain memuat ribuan transaksi; merangkum seluruh transaksi menjadi satu komitmen kriptografis tunggal.
- **Tiga Tahap Konstruksi:**
  1. *Leaf Hashing:* Setiap data transaksi di-hash secara independen: $H_A = H(Tx_A), H_B = H(Tx_B), \dots$
  2. *Pairwise Concatenation:* Pasangan daun yang bersebelahan digabungkan lalu di-hash: $H_{AB} = H(H_A \mathbin{\Vert} H_B)$.
  3. *Recursive Reduction:* Proses penggabungan berulang ke tingkat atas hingga menyisakan satu hash puncak: **Merkle Root** ($H_{ABCD}$).
- **Penanganan Jumlah Ganjil:** Jika jumlah transaksi ganjil, transaksi terakhir diduplikasi untuk membentuk pasangan seimbang.
- *Visual:* Diagram pohon biner 4 transaksi ($Tx_A, Tx_B, Tx_C, Tx_D$) mengerucut dari Leaf Hashes ke Internal Nodes hingga Merkle Root.

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

## Slide 10: Mekanisme Verifikasi Merkle Proof (Audit Path)

### Konten Slide
- **Definisi Merkle Proof:** Bukti kriptografis ringkas yang membuktikan keberadaan suatu transaksi di dalam blok tanpa memerlukan seluruh isi blok tersebut.
- **Komponen Audit Path untuk Transaksi $Tx_A$ (dari 8 transaksi):**
  - Data mentah transaksi: $Tx_A$.
  - Daftar hash tetangga (*sibling hashes*): $[H_B, H_{CD}, H_{EFGH}]$.
  - Nilai tepercaya di tangan verifikator: **Merkle Root** dari block header.
- **Langkah Rekonstruksi oleh Verifikator:**
  1. Hitung hash daun target: $H_A = H(Tx_A)$.
  2. Gabungkan dengan sibling $H_B$: $H_{AB} = H(H_A \mathbin{\Vert} H_B)$.
  3. Gabungkan dengan sibling $H_{CD}$: $H_{ABCD} = H(H_{AB} \mathbin{\Vert} H_{CD})$.
  4. Gabungkan dengan sibling $H_{EFGH}$: $\text{ComputedRoot} = H(H_{ABCD} \mathbin{\Vert} H_{EFGH})$.
  5. Cocokkan: Jika $\text{ComputedRoot} == \text{MerkleRoot}$, keabsahan transaksi terbukti secara mutlak.
- *Visual:* Diagram pohon 8 daun menyorot jalur hijau dari $Tx_A$ ke Root, dengan node sibling $H_B, H_{CD}, H_{EFGH}$ ditandai sebagai data pembuktian.

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

## Slide 11: Efisiensi Skala Logaritmik O(log N)

### Konten Slide
- **Penskalaan Linier vs. Logaritmik:**
  - *Pemeriksaan Linier:* Memeriksa $N$ transaksi menuntut transmisi data sebesar $\mathcal{O}(N)$.
  - *Pemeriksaan Merkle Proof:* Ukuran bukti hanya bertambah sebanding dengan tinggi pohon: $\mathcal{O}(\log_2 N)$.
- **Analisis Ukuran Bukti Nyata (Ukuran Hash = 32 Byte):**
  - 4 Transaksi: Butuh 2 hash menghasilkan 64 byte payload.
  - 16 Transaksi: Butuh 4 hash menghasilkan 128 byte payload.
  - 1.024 Transaksi: Butuh 10 hash menghasilkan 320 byte payload (menggantikan download 500 KB data mentah).
  - 4.096 Transaksi: Butuh 12 hash menghasilkan 384 byte payload (menggantikan download 2 MB data mentah).
  - 1.048.576 Transaksi: Butuh 20 hash menghasilkan 640 byte payload (menggantikan download 500 MB data mentah).
- **Keunggulan Teknis:** Mengurangi beban transfer data hingga 99,99 persen pada dataset berskala raksasa.
- *Visual:* Tabel komparasi ukuran payload linier (naik curam) berdampingan dengan kurva logaritmik ukuran Merkle proof yang sangat landai.

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

## Slide 12: Simplified Payment Verification (SPV) & Light Clients

### Konten Slide
- **Bitcoin Whitepaper Section 8:** Satoshi Nakamoto merancang mekanisme SPV untuk mengoperasikan dompet ringan di perangkat berkapasitas terbatas.
- **Arsitektur Light Client:**
  - Tidak mengunduh riwayat transaksi penuh yang berukuran ratusan gigabyte.
  - Hanya mengunduh **Block Headers** sebesar 80 byte per blok (memuat timestamp, target kesulitan, nonce, dan Merkle Root).
- **Alur Kerja SPV:**
  1. Light client memvalidasi bukti kerja (Proof of Work) pada rangkaian header 80-byte.
  2. Saat menerima pembayaran, client meminta Merkle Proof transaksi tersebut dari full node jaringan.
  3. Client merekonstruksi root secara lokal dan mencocokkannya ke header blok terpanjang.
- **Dampak Demokratisasi:** Memungkinkan partisipasi terdesentralisasi yang aman pada smartphone, dompet perangkat keras (*hardware wallets*), dan browser web.
- *Visual:* Sequence diagram interaksi antara Smartphone (Light Client mengunduh header 80-byte) dan Full Node (mengirim Merkle inclusion proof).

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

## Slide 13: Jembatan ke Modul Berikutnya: Otoritas dan Kepemilikan

### Konten Slide
- **Pencapaian Primitif Integritas:** Cryptographic hash functions dan Merkle trees menjamin integritas data yang permanen, ringkas, dan tahan manipulasi.
- **Pertanyaan Kritis Baru yang Muncul:**
  - Merkle tree membuktikan bahwa suatu transaksi tercatat di dalam blok, tetapi tidak menjelaskan siapa yang berhak membuat transaksi tersebut.
  - Jika Alice menyusun transaksi transfer koin, apa yang mencegah Mallory membuat format transaksi identik untuk menguras seluruh saldo milik Alice?
- **Ketiadaan Otoritas Terpusat:** Di blockchain tidak ada kata sandi, tidak ada customer support, dan tidak ada kartu identitas fisik untuk membuktikan kepemilikan.
- **Materi Modul Berikutnya:** Membedah kepemilikan matematis absolut dan otorisasi transfer nilai: **Asymmetric Cryptography and Digital Signatures**.
- *Visual:* Ilustrasi gembok digital dan sepasang kunci (Private Key dan Public Key) berdampingan dengan dokumen transaksi bertanda tangan matematis.

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
