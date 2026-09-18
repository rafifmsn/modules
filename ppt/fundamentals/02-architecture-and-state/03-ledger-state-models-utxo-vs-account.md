# Ledger State Models: UTXO vs. Account Model
Modul Presentasi: Arsitektur dan State (02.3)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Ledger State Models: UTXO vs. Account Model
- **Track:** Architecture and State
- **Fokus Utama:** Perbandingan arsitektur penyimpanan status antara UTXO model dan Account model, implikasi konkurensi, expressiveness smart contract, dan state bloat.
- *Visual:* Perbandingan grafis antara grafik koin diskrit yang terhubung (UTXO) dan tabel terpusat saldo akun (Account).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul ketiga: Ledger State Models: UTXO vs Account Model.
- Membahas bagaimana data state sebenarnya disimpan di memori dan disk simpul.
- Membedah dua filosofi besar: uang fisik diskrit versus rekening koran perbankan.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga dari bab Arsitektur dan State.
Di modul sebelumnya, kita sudah membedah formula transisi status di mana blok baru memperbarui status lama menjadi status baru yang kita sebut sebagai sigma.
Namun rumus matematis tersebut memunculkan pertanyaan rekayasa yang sangat krusial: seperti apa sebenarnya wujud status sigma tersebut di dalam hard drive komputer kita?
Dalam rekayasa sistem terdistribusi, ada dua kubu filosofi besar dalam mencatat kepemilikan.
Kubu pertama adalah model UTXO yang digunakan oleh Bitcoin dan Cardano.
Kubu kedua adalah model Akun yang digunakan oleh Ethereum, Solana, dan seluruh sistem perbankan tradisional.
Pilihan arsitektur antara dua model ini menentukan segalanya tentang sebuah blockchain: mulai dari kecepatan transaksi, privasi pengguna, kompleksitas smart contract, hingga beban penyimpanan data simpul.
Mari kita mulai dengan memahami model mental keduanya.

---

## Slide 2: Dua Paradigma: Uang Fisik vs Rekening Bank

### Konten Slide
- **1. Model UTXO (Analogi Lembaran Uang Tunai di Dompet):**
  - Tidak ada entitas "saldo akun" yang tersimpan di dalam database.
  - Koin eksis sebagai potongan nilai diskrit yang tidak dapat dibagi bernama **Unspent Transaction Outputs (UTXOs)**.
  - Membeli barang seharga $60 menggunakan lembaran $50 dan $20 menghancurkan kedua lembar tersebut, menghasilkan lembaran baru $60 untuk penjual dan $10 uang kembalian untuk pembeli.
- **2. Model Account (Analogi Rekening Koran Bank):**
  - Database global memetakan setiap alamat langsung ke angka total saldonya.
  - Transfer uang dieksekusi melalui mutasi aritmatika langsung di baris database (*in-place arithmetic*):
    $$\text{Balance}_{\text{Alice}} \leftarrow \text{Balance}_{\text{Alice}} - 60$$
    $$\text{Balance}_{\text{Bob}} \leftarrow \text{Balance}_{\text{Bob}} + 60$$
- *Visual:* Diagram komparasi dompet berisi 3 lembar uang tunai versus buku rekening bank dengan catatan debit dan kredit saldo.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- UTXO mirip lembaran uang kertas di dompet fisik kita.
- Model akun bekerja persis seperti buku tabungan di bank komersial.
- Di Bitcoin tidak ada angka saldo Alice; saldo hanyalah hasil penjumlahan koin-koin unspent miliknya.

**Naskah Tutur (Voiceover Script):**
Untuk memahami perbedaan kedua model ini, kita bisa menggunakan analogi sehari-hari.
Bayangkan model UTXO seperti lembaran uang kertas di dalam dompet kulit kalian.
Jika dompet kalian berisi uang delapan puluh dolar, kalian sebenarnya tidak memegang tulisan angka delapan puluh.
Kalian mungkin memegang satu lembar lima puluh dolar, satu lembar dua puluh dolar, dan satu lembar sepuluh dolar.
Ketika kalian membeli jaket seharga enam puluh dolar, kalian tidak bisa merobek lembaran lima puluh dolar tersebut.
Kalian menyerahkan lembar lima puluh dan dua puluh dolar sekaligus.
Transaksi tersebut memusnahkan kedua lembar uang tadi, lalu menciptakan dua lembar uang baru: enam puluh dolar untuk pemilik toko, dan sepuluh dolar uang kembalian yang masuk kembali ke dompet kalian.
Sebaliknya, model Akun bekerja persis seperti rekening bank atau spreadsheet Excel.
Di Ethereum, sistem mencatat alamat kalian dan menyandingkannya langsung dengan angka saldo total kalian.
Ketika kalian mentransfer dana, sistem cukup melakukan pengurangan aritmatika pada saldo kalian dan menambahkan angka yang sama ke saldo penerima.

---

## Slide 3: Anatomi UTXO: Koin Diskrit dan Outpoint

### Konten Slide
- **Pondasi Status Bitcoin (UTXO Set):** Kumpulan seluruh luaran transaksi yang belum pernah dibelanjakan sejak Genesis Block.
- **Struktur Transaksi Bitcoin:**
  - *Transaction Inputs:* Tidak mencantumkan nominal dana, melainkan menunjuk ke UTXO masa lalu menggunakan **Outpoint**:
    - `TxID`: Hash 32-byte dari transaksi pembuat koin sebelumnya.
    - `vout`: Indeks integer 4-byte yang menunjukkan luaran spesifik yang ingin dibelanjakan.
    - `scriptSig` / `Witness`: Bukti pembuka gembok kriptografis (tanda tangan digital dan kunci publik).
  - *Transaction Outputs (`TxOut`):*
    - `value`: Jumlah nilai satoshi yang dikunci ke dalam luaran baru ini.
    - `scriptPubKey`: Skrip gembok kriptografis yang menentukan syarat pengeluaran dana di masa depan.
- *Visual:* Diagram transaksi Bitcoin menghubungkan Outpoint di sisi input menuju scriptPubKey baru di sisi output.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- UTXO Set adalah basis data aktif yang disimpan di RAM simpul penuh.
- Input tidak membawa nilai uang, melainkan pointer Outpoint ke transaksi masa lalu.
- Output berisi nominal satoshi dan skrip penguncian cryptographic scriptPubKey.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah arsitektur teknis dari model UTXO.
Di dalam Bitcoin, status jaringan direpresentasikan oleh apa yang disebut sebagai *UTXO Set*.
Ini adalah daftar seluruh luaran koin yang pernah tercipta tetapi belum pernah dibelanjakan.
Setiap transaksi Bitcoin tersusun dari larik input dan larik output.
Hal unik yang sering mengejutkan pemula adalah: input transaksi Bitcoin sama sekali tidak mencantumkan nominal uang.
Sebuah input hanyalah sebuah penunjuk atau *Outpoint*.
Outpoint ini memuat `TxID`, yaitu hash dari transaksi masa lalu yang menciptakan koin tersebut, serta nomor indeks `vout`.
Input juga membawa bukti pembuka gembok berupa tanda tangan digital dan kunci publik.
Di sisi seberang, luaran atau `TxOut` menentukan berapa jumlah satoshi yang ingin dikunci serta menyematkan skrip pengunci bernama `scriptPubKey` yang mendikte siapa yang berhak membelanjakan koin tersebut kelak.

---

## Slide 4: Hukum Kekekalan Nilai dan Fee Implisit

### Konten Slide
- **Prinsip Indivisibilitas UTXO:** Sebuah UTXO tidak pernah bisa dibelanjakan sebagian; ia harus dibelanjakan utuh 100 persen atau tidak sama sekali.
- **Hukum Kekekalan Nilai Transaksi:**
  $$\sum \text{Value}(\text{Inputs}) = \sum \text{Value}(\text{Outputs}) + \text{MinerFee}$$
- **Karakteristik Fee Implisit:**
  - Biaya transaksi penambang tidak dideklarasikan secara eksplisit sebagai output.
  - Fee penambang adalah selisih murni antara total nilai seluruh input dikurangi total nilai seluruh output.
- **Bahaya Salah Perhitungan:** Jika pengguna atau dompet lupa membuat output uang kembalian (*change output*), maka seluruh sisa dana input otomatis dihadiahkan kepada penambang sebagai fee.
- *Visual:* Neraca timbangan matematika memperlihatkan sisi input seimbang sempurna dengan sisi output ditambah biaya penambang.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Koin UTXO tidak bisa dibelanjakan separuh; harus dikonsumsi seutuhnya.
- Biaya penambang bersifat implisit, dihitung dari selisih input dikurangi output.
- Risiko fatal: tanpa change output, seluruh sisa koin diserap penambang sebagai tip.

**Naskah Tutur (Voiceover Script):**
Karena koin UTXO bersifat atomik dan tidak bisa dibagi di tengah jalan, transaksi wajib mematuhi hukum kekekalan nilai.
Total nilai seluruh koin yang masuk ke sisi input harus sama persis dengan total nilai koin yang keluar di sisi output, ditambah biaya transaksi penambang.
Satu hal yang sangat penting dipahami: biaya penambang di Bitcoin bersifat implisit.
Kalian tidak akan menemukan kolom khusus bertuliskan biaya fee di dalam struktur data transaksi.
Fee penambang hanyalah selisih matematika murni antara total input dikurangi total output.
Kondisi ini menciptakan risiko fatal bagi pengembang perangkat lunak dompet.
Jika sistem kalian mengambil input senilai sepuluh Bitcoin untuk membayar satu Bitcoin, tetapi kode kalian lupa menciptakan output kembalian sebesar sembilan Bitcoin ke dompet pengguna, maka protokol akan menganggap sisa sembilan Bitcoin tersebut sebagai bonus tip sukarela untuk penambang.
Sembilan koin itu akan lenyap seketika masuk ke kantong penambang.

---

## Slide 5: Mesin Stack Kriptografis: Bitcoin Script

### Konten Slide
- **Karakteristik Bahasa Script:** Bersifat Forth-like, berbasis tumpukan (*stack-based*), sengaja dibuat non-Turing complete tanpa perulangan (*loops*) untuk mencegah *halting problem*.
- **Mekanisme Evaluasi Transaksi:** Node mengeksekusi skrip pembuka gembok (`scriptSig`) milik pembelanja, dilanjutkan dengan skrip pengunci (`scriptPubKey`) milik koin asal pada satu stack yang sama.
- **Tahapan Eksekusi P2PKH (Pay-to-Public-Key-Hash):**
  1. Masukkan tanda tangan digital `[sig]` ke atas stack.
  2. Masukkan kunci publik `[pubKey]` ke atas stack.
  3. `OP_DUP`: Gandakan item teratas stack (`pubKey`).
  4. `OP_HASH160`: Lakukan hashing SHA-256 dan RIPEMD-160 pada kunci publik.
  5. Masukkan hash target yang diharapkan dari skrip pengunci.
  6. `OP_EQUALVERIFY`: Pastikan hash kunci publik cocok dengan alamat target.
  7. `OP_CHECKSIG`: Verifikasi keabsahan tanda tangan ECDSA menggunakan kunci publik terhadap digest transaksi.
- **Hasil Akhir:** Operasi berhasil jika nilai teratas stack bernilai `TRUE` (bukan nol) tanpa pesan kesalahan.
- *Visual:* Diagram visual tumpukan stack mengevaluasi instruksi OP_DUP, OP_HASH160, dan OP_CHECKSIG langkah demi langkah.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bitcoin menggunakan bahasa skrip berbasis stack tanpa perulangan untuk mencegah infinite loop.
- Skrip pengunci dan pembuka dieksekusi secara berurutan di atas tumpukan memori stack.
- Evaluasi P2PKH memastikan pembuktian kepemilikan kunci publik dan keabsahan tanda tangan secara matematis.

**Naskah Tutur (Voiceover Script):**
Bagaimana simpul jaringan memverifikasi bahwa seseorang berhak membelanjakan sebuah UTXO?
Bitcoin menggunakan bahasa pemrograman berbasis stack yang mirip dengan bahasa Forth.
Bahasa ini sengaja dirancang non-Turing complete tanpa fitur loop agar eksekusinya selalu berhenti dan tidak bisa diserang dengan script tanpa akhir.
Mari kita lihat bagaimana transaksi standar P2PKH diverifikasi di atas memori stack.
Pertama, tanda tangan dan kunci publik pengirim didorong ke atas tumpukan stack.
Instruksi `OP_DUP` kemudian menggandakan kunci publik di posisi teratas.
Selanjutnya instruksi `OP_HASH160` memproses kunci publik tersebut dengan algoritma hash untuk membuktikan bahwa kuncinya cocok dengan alamat tujuan.
Setelah diverifikasi kesesuaiannya dengan `OP_EQUALVERIFY`, instruksi pamungkas `OP_CHECKSIG` memverifikasi tanda tangan digital kurva eliptis terhadap transaksi.
Jika tanda tangan valid, stack akan menyisakan nilai `TRUE`.
Begitu angka `TRUE` muncul, status koin lama dihapus dari database UTXO dan koin baru resmi diterbitkan.

---

## Slide 6: Arsitektur Account Model: World State Ethereum

### Konten Slide
- **Pondasi Status Global:** Status global Ethereum dimodelkan sebagai pemetaan kunci-nilai (*key-value mapping*) dari alamat 20-byte menuju objek status akun:
  $$\sigma: \text{Address} \to \text{Account}$$
- **Empat Komponen Akun Ethereum (4-Tuple):**
  - `nonce`: Penghitung skalar transaksi yang dikirim (untuk EOA) atau jumlah kontrak yang dibuat (untuk kontrak).
  - `balance`: Saldo native cryptocurrency milik akun dalam satuan wei.
  - `storageRoot`: Hash 256-bit akar dari Merkle Patricia Trie internal yang menyimpan variabel penyimpanan persisten kontrak.
  - `codeHash`: Hash Keccak-256 dari bytecode mesin virtual yang mengikat akun ini.
- *Visual:* Diagram objek akun Ethereum memperlihatkan 4 field: nonce, balance, storageRoot, dan codeHash.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ethereum tidak melacak koin individual, melainkan memetakan alamat ke objek akun.
- Setiap akun memiliki 4 field baku: nonce, balance, storageRoot, dan codeHash.
- storageRoot dan codeHash membedakan akun manusia dengan smart contract.

**Naskah Tutur (Voiceover Script):**
Sekarang mari kita alihkan perhatian ke model Akun milik Ethereum.
Di Ethereum, jaringan sama sekali tidak melacak lembaran koin individual.
Status global Ethereum adalah sebuah peta relasional raksasa yang menghubungkan setiap alamat akun dengan objek data empat serangkai.
Setiap akun di Ethereum memiliki empat field terstruktur.
Pertama adalah `nonce`, yaitu jumlah transaksi yang pernah dipancarkan.
Kedua adalah `balance`, yaitu saldo total dalam satuan wei.
Dua field berikutnya adalah pembeda revolusioner Ethereum: `storageRoot` dan `codeHash`.
Jika akun tersebut adalah akun dompet biasa milik manusia, field `storageRoot` dan `codeHash` ini akan dibiarkan kosong.
Namun jika akun tersebut adalah smart contract, `codeHash` akan mengunci kode program yang mengendalikan akun tersebut, dan `storageRoot` akan mengarah ke pohon data tersendiri yang menyimpan variabel memori persisten dari aplikasi tersebut.

---

## Slide 7: Anatomi Akun: EOA vs Smart Contract

### Konten Slide
- **1. Externally Owned Accounts (EOA):**
  - Dikendalikan oleh manusia atau perangkat lunak off-chain melalui kepemilikan private key.
  - Nilai `codeHash` adalah hash string kosong; nilai `storageRoot` kosong.
  - Memiliki kemampuan menginisiasi transaksi secara mandiri, membayar gas, dan menggerakkan eksekusi jaringan.
- **2. Contract Accounts (Smart Contracts):**
  - Dikelola secara otonom oleh kode bytecode EVM yang tersimpan permanen di on-chain.
  - Memiliki `codeHash` yang menunjuk ke bytecode program dan `storageRoot` yang menunjuk ke variabel status.
  - **Sifat Reaktif:** Tidak memiliki kunci privat dan tidak dapat menginisiasi transaksi sendiri; hanya aktif jika dipanggil oleh EOA atau kontrak lain.
- *Visual:* Bagan perbandingan EOA (aktor inisiator dengan private key) versus Contract Account (mesin reaktif dengan storage dan bytecode).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- EOA dikendalikan private key, sedangkan contract account dikendalikan bytecode.
- EOA adalah inisiator utama; smart contract bersifat reaktif menunggu panggilan.
- Smart contract memiliki database internal sendiri yang dirangkum oleh storageRoot.

**Naskah Tutur (Voiceover Script):**
Ethereum membagi aktor di jaringannya ke dalam dua kategori akun yang berbeda.
Kategori pertama adalah Externally Owned Accounts atau EOA.
Ini adalah akun dompet kita sehari-hari yang dikendalikan oleh kunci privat di luar sistem blockchain.
EOA adalah satu-satunya entitas yang memiliki wewenang untuk memulai transaksi di jaringan dan membayar biaya komputasi gas.
Kategori kedua adalah Contract Accounts atau Smart Contracts.
Akun ini tidak dipegang oleh manusia dan tidak memiliki kunci privat.
Akun kontrak dikendalikan sepenuhnya oleh sekumpulan kode bytecode yang tersimpan permanen di blockchain.
Kontrak pintar bersifat reaktif murni: mereka tidak bisa bangun sendiri di pagi hari dan mengirim transaksi.
Mereka hanya akan terbangun dan menjalankan logikanya jika ada transaksi dari EOA atau kontrak lain yang memicu eksekusinya.
Setiap mutasi memori internal kontrak akan secara otomatis mengubah nilai `storageRoot` di akun tersebut.

---

## Slide 8: Data Struktur: Modified Merkle Patricia Trie

### Konten Slide
- **Kebutuhan Struktur Data:** Bagaimana ribuan simpul dapat menyepakati jutaan saldo akun secara instan tanpa inkonsistensi data?
- **Modified Merkle Patricia Trie (MPT):**
  - Menggabungkan keunggulan integritas kriptografis pohon Merkle dengan efisiensi pencarian jalur milik Radix tree.
  - *Kunci (Path):* Hash Keccak-256 dari alamat akun 20-byte.
  - *Nilai (Value):* Objek status akun 4-tuple yang di-encode menggunakan RLP.
- **Efisiensi Mutasi Logaritmik:**
  - Ketika sebuah saldo akun berubah, simpul tidak perlu menghitung ulang seluruh pohon.
  - Hanya simpul-simpul di sepanjang jalur dari daun menuju akar yang dihitung ulang dalam kompleksitas $O(\log n)$.
  - Akar pohon setinggi 32-byte dicatat langsung ke dalam header blok sebagai `stateRoot`.
- *Visual:* Arsitektur MPT memperlihatkan percabangan nibble heksadesimal dari Root Node menuju Extension Node, Branch Node, hingga Leaf Node.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- World State disimpan dalam Modified Merkle Patricia Trie (MPT).
- Menggabungkan efisiensi lookup Radix Trie dengan keamanan kriptografis Merkle Tree.
- Perubahan saldo satu akun hanya memperbarui simpul di jalurnya dengan efisiensi logaritmik O(log n).

**Naskah Tutur (Voiceover Script):**
Bagaimana mungkin jutaan akun pengguna dan miliaran variabel penyimpanan kontrak bisa diverifikasi secara instan tanpa ada simpul yang mengalami perbedaan data?
Jawabannya ada pada struktur data bernama Modified Merkle Patricia Trie atau MPT.
Struktur data ini adalah perkawinan cerdas antara pohon Merkle dan Radix trie.
Alamat akun di-hash menjadi serangkaian jalur navigasi berbasis heksadesimal.
Setiap angka heksadesimal memandu penelusuran dari simpul akar, melewati simpul percabangan, hingga sampai ke simpul daun yang menyimpan data akun tersebut.
Keunggulan utama dari MPT adalah efisiensi pembaruan datanya.
Jika Alice mentransfer koin ke Bob, hanya beberapa simpul di sepanjang jalur cabang akun Alice dan Bob yang perlu dihitung ulang hash-nya, dengan kompleksitas logaritmik O(log n).
Seluruh cabang pohon lainnya tetap tidak tersentuh.
Akar tunggal 32-byte di puncak pohon inilah yang disimpan di header blok sebagai `stateRoot`.

---

## Slide 9: Matriks Komparasi 6 Dimensi

### Konten Slide
- **Komparasi Mendalam Dua Paradigma:**
  - *Representasi Status:* Graf luaran koin independen (UTXO) vs Peta nilai global saldo dan memori (Account).
  - *Konkurensi Transaksi:* **Tinggi** pada UTXO (dapat diproses paralel lintas core CPU) vs **Rendah/Kompleks** pada Account (wajib sekuensial jika menyentuh akun sama).
  - *Ekspresivitas Smart Contract:* **Terbatas** pada UTXO (stateless/eUTXO rumit) vs **Turing-Complete Kaya** pada Account (state bersama antar-aplikasi sangat mudah).
  - *Beban Penyimpanan (Storage):* **Efisien** pada UTXO (koin terpakai bisa di-prune dari RAM) vs **Rentan State Bloat** pada Account (saldo nol dan storage slot tersimpan permanen).
  - *Privasi:* **Unggul** pada UTXO (alamat baru untuk setiap uang kembalian) vs **Rentan Analisis** pada Account (penggunaan ulang alamat statis).
  - *Pencegahan Double-Spend:* Pemeriksaan Outpoint terpakai di UTXO set vs Pemeriksaan kenaikan skalar nonce akun.
- *Visual:* Tabel matriks visual membandingkan parameter UTXO vs Account dengan indikator keunggulan masing-masing.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Enam dimensi kunci perbandingan arsitektur.
- UTXO unggul dalam konkurensi paralel dan privasi.
- Account model unggul dalam kemudahan memprogram smart contract dan composability.

**Naskah Tutur (Voiceover Script):**
Mari kita sejajarkan kedua model ini dalam enam dimensi teknis.
Pertama, dari segi konkurensi: model UTXO jauh lebih unggul karena transaksi yang membelanjakan koin berbeda dapat diverifikasi secara paralel di berbagai core prosesor tanpa khawatir bentrok.
Di model Akun, pemrosesan paralel sangat sulit karena transaksi yang mengakses akun yang sama harus dijalankan secara berurutan.
Kedua, dari segi kemampuan smart contract: model Akun adalah pemenang mutlak.
Sangat mudah membangun aplikasi pinjam-meminjam atau bursa terdesentralisasi jika semua pengguna bisa berinteraksi ke satu wadah saldo bersama.
Di UTXO, logika bersama semacam itu sangat rumit dibangun.
Ketiga, dari beban penyimpanan: model UTXO sangat bersih karena koin yang sudah terpakai bisa dihapus dari memori aktif, sedangkan model Akun menderita penyakit penumpukan data permanen atau state bloat.
Dan terakhir, privasi pada UTXO lebih terlindungi secara alami karena pengguna terbiasa mengganti alamat untuk setiap uang kembalian.

---

## Slide 10: Studi Kasus: Concurrency di Cardano eUTXO

### Konten Slide
- **Ambisi eUTXO Cardano (2021):** Mengadopsi Extended UTXO untuk menghadirkan kapabilitas smart contract tanpa meninggalkan keunggulan paralelisme model UTXO.
- **Kebuntuan Arsitektur AMM (Kasus Minswap):**
  - Pada Automated Market Maker (AMM), likuiditas perdagangan ditampung dalam satu kumpulan bersama (*liquidity pool*).
  - Di bawah model eUTXO, kumpulan likuiditas tersebut direpresentasikan oleh **satu buah UTXO tunggal**.
  - Sifat dasar UTXO: sebuah output hanya dapat dibelanjakan **tepat satu kali per blok**.
- **Dampak di Lapangan:**
  - Hanya satu transaksi penukaran (*swap*) pengguna yang berhasil di setiap blok; ratusan transaksi pengguna lain di blok yang sama gagal akibat benturan double-spend.
  - Pengembang terpaksa membangun solusi off-chain batcher yang rumit untuk menggabungkan order pengguna sebelum menyentuh pool UTXO.
- *Visual:* Ilustrasi ratusan transaksi swap pengguna menabrak satu UTXO liquidity pool yang hanya bisa melayani 1 transaksi per blok.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Cardano mencoba membawa smart contract ke model UTXO lewat model eUTXO.
- Masalah fatal AMM: pool likuiditas adalah satu UTXO, sehingga hanya bisa melayani 1 swap per blok.
- Ratusan transaksi gagal serentak, membuktikan tantangan shared state pada arsitektur UTXO.

**Naskah Tutur (Voiceover Script):**
Teori arsitektur ini terbukti nyata di dunia produksi.
Salah satu studi kasus paling terkenal terjadi pada peluncuran smart contract Cardano tahun 2021 melalui model Extended UTXO atau eUTXO.
Para pengembang ingin membangun bursa terdesentralisasi seperti Uniswap.
Namun di dalam sistem AMM, seluruh pengguna menukar token ke satu kolam likuiditas bersama.
Masalah fatal muncul karena di bawah model eUTXO, kolam likuiditas tersebut diwakili oleh satu buah koin UTXO tunggal.
Padahal hukum dasar UTXO menegaskan bahwa sebuah koin hanya bisa dibelanjakan satu kali dalam satu blok.
Akibatnya, ketika bursa diluncurkan di jaringan uji coba, hanya ada satu transaksi penukaran yang berhasil di setiap blok.
Ratusan transaksi penukaran dari pengguna lain langsung gagal serentak karena dianggap mencoba melakukan double-spending pada UTXO kolam yang sama.
Kasus ini membuka mata industri bahwa mengelola status bersama atau *shared state* di model UTXO membutuhkan rekayasa off-chain yang luar biasa rumit.

---

## Slide 11: Masalah Struktural Ethereum: State Bloat

### Konten Slide
- **Tantangan Bersama Model Akun:** Kemudahan pemrograman status bersama (*shared state*) di Ethereum harus dibayar dengan degradasi kinerja perangkat keras.
- **Storage Contention & Gas Bidding Wars:**
  - Ketika ribuan pengguna bertransaksi di pool likuiditas yang sama, seluruh eksekusi dipaksa berjalan sekuensial satu per satu.
  - Memicu perang penawaran biaya gas (*priority fee*) ekstrem untuk memperebutkan urutan eksekusi pertama di dalam blok.
- **Fenomena State Bloat:**
  - Setiap akun yang dibuat dan setiap variabel storage smart contract akan menetap selamanya di World State Trie kecuali dihapus eksplisit.
  - Database MPT terus membengkak tanpa batas, memicu degradasi kecepatan pembacaan disk I/O.
- **Tuntutan Spesifikasi Validator:** Operator simpul penuh kini dipaksa menggunakan drive solid-state NVMe kelas enterprise agar simpul tidak tertinggal sinkronisasi rantai.
- *Visual:* Grafik pertumbuhan ukuran World State Ethereum dari tahun ke tahun disertai ilustrasi beban pembacaan disk I/O pada node.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kemudahan model akun Ethereum memicu masalah antrean sekuensial dan perang gas.
- State bloat: data memori akun menumpuk selamanya di hard drive node.
- Dampak desentralisasi: spesifikasi minimum hardware membengkak, menuntut drive NVMe berkecepatan tinggi.

**Naskah Tutur (Voiceover Script):**
Sebaliknya, model Akun milik Ethereum juga tidak luput dari beban struktural yang berat.
Meskipun model ini membuat pembuatan aplikasi terdesentralisasi menjadi sangat mudah, ada harga mahal yang harus dibayar.
Pertama adalah persaingan akses penyimpanan atau *storage contention*.
Karena semua orang mengakses kontrak yang sama, transaksi harus diantrekan secara ketat satu per satu.
Di saat volatilitas pasar tinggi, ini memicu perang penawaran gas di mana pengguna saling menaikkan tip demi memperebutkan giliran eksekusi pertama.
Masalah kedua yang jauh lebih kronis adalah *state bloat*.
Di Ethereum, sekali sebuah akun atau variabel kontrak diciptakan, data tersebut akan menetap di World State Trie selamanya kecuali dibersihkan secara manual.
Ukuran basis data ini terus membengkak ratusan gigabyte.
Akibatnya, operasi pembacaan disk I/O menjadi sangat lambat, hingga operator simpul validator saat ini wajib menggunakan drive SSD NVMe kelas enterprise berkecepatan tinggi hanya agar simpul mereka tidak tertinggal dari rantai utama.

---

## Slide 12: Jembatan ke Modul Berikutnya

### Konten Slide
- **Pencapaian Pemahaman:** Kita telah membedah perbedaan mendasar antara model UTXO dan model Akun dalam merepresentasikan status dunia.
- **Pertanyaan Konsensus Tingkat Tinggi:**
  - Baik menggunakan UTXO maupun model Akun, seluruh simpul penuh wajib menyepakati satu garis waktu sejarah yang sah.
  - Namun, bagaimana jika dua penambang di belahan bumi berbeda menemukan blok valid pada detik yang sama persis?
  - Bagaimana jika pengembang merilis pembaruan perangkat lunak yang mengubah aturan konsensus?
  - Apa yang membedakan reorganisasi blok sementara dengan perpecahan ideologis permanen seperti kelahiran Ethereum Classic?
- **Materi Modul Berikutnya:** Membedah percabangan rantai dan resolusi konsensus dalam **Forks, Finality, and Reorganizations**.
- *Visual:* Pohon percabangan blockchain membelah menjadi dua cabang sejarah dengan pertanyaan resolusi konsensus.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- State model selesai dibedah: kelebihan dan kekurangan UTXO vs Account.
- Membuka dilema konsensus: apa yang terjadi ketika simpul berbeda melihat sejarah yang berbeda.
- Teaser materi modul 2.4: Forks, Finality, and Reorganizations.

**Naskah Tutur (Voiceover Script):**
Kita telah menuntaskan perbandingan mendalam antara dua pilar pencatatan status: model UTXO dan model Akun.
Kalian sekarang memahami mengapa Bitcoin memilih kesederhanaan dan konkurensi lembaran uang kertas, sementara Ethereum memilih fleksibilitas buku kas komputasi global.
Namun terlepas dari bagaimana status disimpan di hard drive, seluruh komputer di jaringan memiliki satu tugas mutlak yang sama: mereka harus menyepakati sejarah blok mana yang merupakan kebenaran tunggal yang sah.
Lalu apa yang terjadi jika kesepakatan itu retak di tengah jalan?
Bagaimana jika dua penambang di dua benua berbeda menemukan blok yang sama-sama sah pada detik yang sama persis?
Apa yang terjadi jika komunitas pengembang memperbarui aturan konsensus sehingga sebagian komputer menolak blok-blok baru tersebut?
Dan bagaimana jaringan menyelesaikan cabang sejarah yang bertabrakan hingga sebuah transaksi benar-benar mencapai status final yang tidak bisa dibatalkan lagi?
Untuk menjawab seluruh dinamika percabangan konsensus ini, di modul penutup bab ini kita akan membedah Forks, Finality, and Reorganizations.
Sampai jumpa di modul berikutnya.
