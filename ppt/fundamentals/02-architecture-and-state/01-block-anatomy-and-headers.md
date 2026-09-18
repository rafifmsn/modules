# Anatomy of a Block and Block Headers
Modul Presentasi: Arsitektur dan State (02.1)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Anatomy of a Block and Block Headers
- **Track:** Architecture and State
- **Fokus Utama:** Struktur internal kontainer data blockchain, pemisahan header dan body, serta mekanisme chaining kriptografis.
- *Visual:* Diagram struktur blok memisahkan block header berukuran kompak dan block body berukuran besar berisi daftar transaksi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul pertama Chapter 02: Architecture and State.
- Membahas mengapa transaksi harus dikemas ke dalam blok, bukan disiarkan satu per satu.
- Membedah isi block header sebagai titik temu antara kriptografi dan konsensus.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul pertama dari bab Arsitektur dan State.
Di modul sebelumnya, kita sudah memahami bagaimana kunci kriptografi dan jaringan peer-to-peer memungkinkan pengiriman transaksi yang terautentikasi.
Namun di tingkat jaringan terdistribusi, transaksi tidak pernah dicatat satu per satu secara instan ke dalam ledger global.
Jika ribuan simpul di seluruh dunia harus melakukan voting konsensus untuk setiap transaksi individual, bandwidth jaringan akan seketika lumpuh.
Solusinya adalah mengelompokkan transaksi ke dalam wadah kriptografis yang kita sebut sebagai blok.
Hari ini kita akan membedah anatomi internal dari sebuah blok, memisahkan peran antara header dan body, serta melihat bagaimana metadata matematis mengunci sejarah transaksi agar mustahil dipalsukan.

---

## Slide 2: Mengapa Transaksi Dikelompokkan ke Dalam Blok?

### Konten Slide
- **Problem Individual Gossip:** Menjalankan voting konsensus global untuk setiap transaksi tunggal memicu race conditions tanpa henti.
- **Efisiensi Skala (Batching):** Mengelompokkan ratusan hingga ribuan transaksi ke dalam satu batch menghemat overhead komunikasi jaringan.
- **Pemisahan Tanggung Jawab:**
  - *Consensus Layer:* Menyepakati urutan batch data melalui metadata ringkas.
  - *Execution Layer:* Memproses mutasi saldo dari setiap transaksi di dalam batch.
- *Visual:* Perbandingan alur flooding transaksi individual yang kacau versus pengelompokan transaksi terstruktur ke dalam kontainer blok.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Batasan fisik jaringan internet: latensi dan bandwidth mencegah verifikasi transaksi perorangan secara atomik.
- Batching adalah prinsip rekayasa sistem terdistribusi klasik.
- Konsensus hanya perlu menyepakati urutan kontainer, bukan mendebat setiap transaksi individual secara terpisah.

**Naskah Tutur (Voiceover Script):**
Bayangkan jika setiap kali seseorang mentransfer koin, ribuan komputer di seluruh dunia harus langsung saling bertukar pesan untuk menyepakati apakah transaksi itu sah.
Latensi fisik serat optik antarbenua akan menciptakan konflik urutan waktu yang tidak pernah selesai.
Oleh karena itu, sistem terdistribusi menggunakan teknik batching.
Ribuan transaksi dikumpulkan lebih dulu, lalu diikat bersama ke dalam satu unit diskrit bernama blok.
Dengan cara ini, mesin konsensus tidak perlu memikirkan eksekusi detail setiap transaksi di awal.
Konsensus hanya bertugas menyepakati urutan rantai dari blok-blok tersebut.
Setelah urutan blok disepakati secara global, barulah setiap simpul menjalankan kalkulasi saldo secara deterministik.

---

## Slide 3: Arsitektur Blok: Header vs Body

### Konten Slide
- **Pemisahan Komponen:** Setiap blok terbagi menjadi dua bagian utama: Block Header dan Block Body.
- **Block Header (Identitas Kriptografis):**
  - Berukuran sangat ringkas (80 byte di Bitcoin, sekitar 500 sampai 600 byte di Ethereum).
  - Berisi hash tautan ke blok sebelumnya, timestamp, target kesulitan, dan Merkle root.
  - Menjadi objek tunggal yang di-hash oleh miner atau ditandatangani oleh validator.
- **Block Body (Payload Transaksi):**
  - Berukuran besar (1 megabyte hingga puluhan megabyte).
  - Berisi daftar mentah transaksi yang ditandatangani oleh pengguna.
  - Dieksekusi secara sekuensial oleh full node untuk memperbarui state database.
- *Visual:* Bagan blok memperlihatkan Block Header kecil di bagian atas yang menaungi Block Body besar di bawahnya.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Header adalah paspor atau identitas matematis, sedangkan body adalah kargo muatan.
- Penambang hanya menghitung hash dari header yang berukuran puluhan byte, bukan seluruh body.
- Klien ringan (SPV node) cukup mengunduh header untuk memverifikasi keabsahan rantai.

**Naskah Tutur (Voiceover Script):**
Secara arsitektur, sebuah blok selalu dipisahkan menjadi dua kompartemen: header dan body.
Kalian bisa membayangkan header sebagai paspor atau manifest penerbangan, sedangkan body adalah kargo kontainer yang berisi barang muatan.
Block body menampung ribuan transaksi mentah yang ukurannya bisa mencapai beberapa megabyte.
Sebaliknya, block header berukuran sangat kecil, tepat 80 byte di Bitcoin.
Meskipun kecil, header inilah yang memegang peranan krusial dalam konsensus.
Ketika penambang menjalankan Proof of Work, mereka sama sekali tidak melakukan hashing pada seluruh isi transaksi di body.
Mereka hanya melakukan hashing berulang pada 80 byte metadata di header.
Pemisahan ini memungkinkan klien ringan memverifikasi integritas jaringan hanya dengan mengunduh header tanpa membebani memori perangkat.

---

## Slide 4: Anatomi 80-Byte Header Bitcoin

### Konten Slide
- **Struktur Minimalis dan Presisi:** Header Bitcoin dirancang tepat berukuran 80 byte dengan serialisasi little-endian.
- **Enam Field Utama Header:**
  - `nVersion` (4 Byte): Versi protokol dan sinyal upgrade soft fork via BIP.
  - `hashPrevBlock` (32 Byte): Double-SHA-256 hash dari header blok sebelumnya sebagai pengikat rantai mundur.
  - `hashMerkleRoot` (32 Byte): Akar pohon Merkle yang merangkum seluruh transaksi di dalam body secara kriptografis.
  - `nTime` (4 Byte): Unix timestamp waktu penemuan blok.
  - `nBits` (4 Byte): Representasi ringkas dari target kesulitan Proof of Work.
  - `nNonce` (4 Byte): Penghitung acak 32-bit yang diiterasi penambang untuk menemukan hash valid.
- *Visual:* Diagram blok tabel 6 field header dengan indikasi ukuran byte masing-masing field.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Total tepat 80 byte: 4 + 32 + 32 + 4 + 4 + 4.
- Setiap field memiliki tujuan matematis spesifik.
- Merkle root bertindak sebagai segel ringkas yang mewakili seluruh transaksi di body.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah struktur header Bitcoin yang menjadi contoh rekayasa kriptografi paling elegan.
Ukurannya tepat 80 byte, tidak lebih dan tidak kurang, yang tersusun dari enam field baku.
Empat byte pertama adalah `nVersion` untuk melacak versi perangkat lunak dan sinyal kesiapan upgrade protokol.
Tiga puluh dua byte berikutnya adalah `hashPrevBlock`, yaitu hash dari header blok sebelumnya yang mengikat sejarah ke masa lalu.
Lalu ada `hashMerkleRoot` sepanjang 32 byte yang bertindak sebagai segel kriptografis atas seluruh transaksi di body.
Tiga field terakhir masing-masing berukuran 4 byte: `nTime` sebagai penanda waktu unix, `nBits` yang menyimpan batas target kesulitan tambang, dan `nNonce` sebagai angka acak yang diputar oleh penambang.
Kombinasi enam komponen inilah yang diproses oleh algoritma double SHA-256.

---

## Slide 5: Representasi Target: Mekanisme nBits

### Konten Slide
- **Tantangan Ruang:** Target penambangan $T$ adalah bilangan bulat tanpa tanda sebesar 256-bit (32 byte).
- **Format Floating-Point Kompak:** Field `nBits` mengompresi angka 256-bit menjadi hanya 4 byte dengan format `0xEEAABBCC`.
  - Byte pertama (`EE`): Nilai eksponen yang menunjukkan panjang byte angka.
  - Tiga byte berikutnya (`AABBCC`): Nilai mantisa atau koefisien angka.
- **Formula Rekonstruksi Target:**
  $$\text{Target} = \text{Mantissa} \times 256^{(\text{Exponent} - 3)}$$
- **Efisiensi Ruang:** Menghemat 28 byte data pada setiap header yang disiarkan di seluruh dunia.
- *Visual:* Ilustrasi konversi dari nilai nBits heksadesimal 4-byte menjadi target 256-bit dengan deretan nol di depan.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Target aslinya berukuran 256 bit atau 32 byte.
- nBits mengompres target menjadi notasi eksponen dan mantisa 4 byte mirip floating point.
- Penghematan 28 byte per blok tampak kecil, tetapi sangat signifikan untuk transmisi data global jangka panjang.

**Naskah Tutur (Voiceover Script):**
Di dalam Proof of Work, penambang harus menemukan hash yang nilainya berada di bawah target tertentu.
Target ini adalah angka raksasa sebesar 256-bit, yang jika disimpan mentah akan memakan 32 byte di header.
Untuk menghemat ruang, Satoshi merancang format floating-point kompak bernama `nBits` yang hanya berukuran 4 byte.
Satu byte pertama bertindak sebagai eksponen, dan tiga byte sisanya adalah mantisa.
Sebagai contoh, jika nilai nBits adalah `0x1804b46c`, maka eksponennya adalah heksadesimal 18 atau 24 desimal, dan mantisanya adalah `0x04b46c`.
Node merekonstruksi target 256-bit penuh dengan mengalikan mantisa terhadap 256 berpangkat eksponen minus tiga.
Trik rekayasa sederhana ini berhasil memangkas 28 byte dari setiap header tanpa kehilangan presisi yang dibutuhkan oleh protokol.

---

## Slide 6: Nonce Exhaustion dan Solusi ExtraNonce

### Konten Slide
- **Keterbatasan Ruang Nonce:** Field `nNonce` hanya berukuran 4 byte (32 bit), menyediakan tepat $2^{32}$ (sekitar 4,29 miliar) kemungkinan.
- **Kecepatan ASIC Modern:** Mesin tambang modern mampu menghitung lebih dari 100 terahash per detik, menghabiskan seluruh keyspace 32-bit dalam waktu kurang dari 40 mikrodetik.
- **Mekanisme ExtraNonce:**
  - Penambang memanfaatkan field `scriptSig` pada transaksi pertama di dalam blok (Coinbase Transaction).
  - Field ini dapat menampung data arbitrer sebesar 2 hingga 100 byte.
  - Penambang menyisipkan counter 4 hingga 8 byte bernama **ExtraNonce** ke dalam transaksi Coinbase.
- **Dampak Berjenjang:** Mengubah ExtraNonce mengubah hash transaksi Coinbase, mengubah Merkle Root di header, dan mereset ruang pencarian nonce 32-bit.
- *Visual:* Diagram alur: Coinbase Tx -> ExtraNonce berubah -> Merkle Root berubah -> Nonce direset ke 0 untuk pencarian ulang.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Nonce 32-bit hanya punya 4,29 miliar kombinasi.
- Hardware ASIC modern menghabiskan ruang itu dalam hitungan mikrodetik.
- Solusinya: menyisipkan ExtraNonce di Coinbase transaction agar Merkle root ikut berubah.

**Naskah Tutur (Voiceover Script):**
Ada satu masalah teknis yang sangat menarik pada header Bitcoin.
Field nonce di header hanya berukuran 32-bit.
Artinya, penambang hanya memiliki sekitar 4,29 miliar kombinasi tebakan.
Di era awal ketika penambangan masih menggunakan CPU komputer biasa, mencoba 4 miliar kombinasi butuh waktu berhari-hari.
Namun perangkat ASIC modern saat ini mampu menjalankan ratusan triliun hash per detik.
Mesin tambang modern menghabiskan seluruh keyspace nonce 32-bit tersebut hanya dalam waktu 40 mikrodetik.
Lalu apa yang dilakukan penambang saat seluruh kombinasi nonce habis tapi belum ada hash yang valid?
Mereka menggunakan mekanisme yang disebut ExtraNonce.
Penambang menyisipkan counter tambahan di dalam transaksi Coinbase, yaitu transaksi penciptaan koin di awal blok.
Begitu counter ExtraNonce dinaikkan, hash transaksi Coinbase berubah.
Karena transaksi ini adalah daun dari pohon Merkle, maka Merkle root di header ikut berubah total.
Header baru tercipta, dan ruang pencarian 4 miliar nonce bisa diulang kembali dari angka nol.

---

## Slide 7: Rantai Kriptografis dan Tamper Evidence

### Konten Slide
- **Mekanisme Tautan Mundur:** Setiap block header secara eksplisit menyertakan hash dari header blok sebelumnya melalui field `hashPrevBlock`.
- **Relasi Matematis:**
  $$\text{Hash}(B_n) = \text{SHA-256}\big(\text{SHA-256}(\text{Header}_n)\big)$$
- **Pohon Ketergantungan Deterministik:** Setiap blok mengunci seluruh sejarah blok yang mendahuluinya hingga ke Genesis Block.
- **Tamper Evidence:** Perubahan sekecil satu bit pada data transaksi di masa lalu akan merambat secara eksponensial ke seluruh blok berikutnya.
- *Visual:* Tiga blok berurutan (Blok 100, 101, 102) dengan panah hashPrevBlock mengikat header secara berantai ke belakang.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengapa disebut blockchain: karena header memuat hash header blok pendahulunya.
- Setiap blok adalah segel atas seluruh riwayat masa lalu.
- Sifat tamper evidence: perubahan sekecil apa pun akan langsung terdeteksi.

**Naskah Tutur (Voiceover Script):**
Mengapa struktur data ini dinamakan blockchain atau rantai blok?
Alasannya terletak pada keterikatan kriptografis antarheader.
Setiap header blok memuat field `hashPrevBlock` yang merupakan hasil double-SHA-256 dari header blok tepat sebelum dirinya.
Keterikatan mundur ini membentuk pohon dependensi yang tidak terputus hingga ke blok pertama atau Genesis Block.
Artinya, blok nomor 101 bukan hanya memvalidasi transaksinya sendiri.
Secara tidak langsung, blok 101 mengonfirmasi keabsahan blok 100, blok 99, dan seluruh riwayat transaksi sebelumnya.
Inilah pondasi dari sifat *tamper evidence*: setiap data yang sudah tertanam di masa lalu terkunci oleh akumulasi rantai blok di atasnya.

---

## Slide 8: Anatomi Serangan: Runtuhnya Integritas Historis

### Konten Slide
- **Skenario Eksploitasi:** Penyerang (Mallory) mencoba mengubah data transaksi pada Blok 100 di masa lalu untuk mencuri koin.
- **Efek Domino Kriptografis:**
  1. Mallory mengubah 1 byte transaksi pada body Blok 100.
  2. Hash transaksi berubah, menyebabkan `hashMerkleRoot` pada Header 100 berubah total.
  3. Nilai $\text{Hash}(B_{100})$ berubah, sehingga tidak lagi cocok dengan `hashPrevBlock` pada Blok 101.
  4. Tautan kriptografis putus; seluruh simpul jujur di dunia menolak rantai Mallory secara instan.
- **Beban Komputasi Penyerang:** Mallory dipaksa menambang ulang Proof of Work Blok 100, 101, 102, hingga pucuk rantai lebih cepat daripada gabungan seluruh jaringan jujur.
- *Visual:* Diagram alur kegagalan serangan Mallory: perubahan tx memutus tautan blok 101 dan memaksa komputasi ulang seluruh PoW.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Apa yang terjadi jika penyerang mengubah riwayat transaksi masa lalu?
- Merkle root berubah, hash header berubah, tautan blok berikutnya langsung patah.
- Penyerang harus menambang ulang seluruh blok berikutnya sendirian melawan seluruh dunia.

**Naskah Tutur (Voiceover Script):**
Mari kita uji ketahanan sistem ini dengan sebuah skenario serangan nyata.
Katakanlah seorang penyerang bernama Mallory ingin mengubah riwayat transaksi di Blok 100 untuk mengalihkan dana ke dompetnya.
Ketika Mallory mengubah satu byte saja pada transaksi tersebut, hash transaksi itu berubah.
Perubahan ini merambat naik ke pohon Merkle, menghasilkan Merkle root yang sama sekali berbeda di Header 100.
Begitu Merkle root berubah, hasil hash dari Header 100 ikut berubah secara total.
Masalah fatal muncul di Blok 101: pointer `hashPrevBlock` di Blok 101 masih mencatat hash Header 100 yang asli.
Tautan kriptografisnya seketika patah.
Setiap komputer di dunia yang memeriksa rantai Mallory akan langsung membuang blok tersebut karena tidak valid.
Satu-satunya cara agar penipuan ini diterima adalah jika Mallory menambang ulang Proof of Work Blok 100, lalu menambang ulang Blok 101, Blok 102, dan seterusnya sampai menyalip rantai jujur.
Secara termodinamika dan matematis, ini mustahil dilakukan oleh satu pihak sendirian.

---

## Slide 9: Evolusi State Machine: Block Header Ethereum

### Konten Slide
- **Dari Ledger Statis ke Komputasi Global:** Bitcoin mencatat mutasi nilai koin, sedangkan Ethereum bertindak sebagai Turing-complete state machine.
- **Tuntutan Metadata yang Lebih Kompleks:** Header Ethereum tidak hanya mencatat transaksi, tetapi juga saldo akun, bytecode kontrak, variabel penyimpanan, dan logs eksekusi.
- **Struktur Header Execution Ethereum:**
  - `parentHash`: Hash dari blok induk pendahulu.
  - Tiga akar Merkle Patricia Trie terpisah (`stateRoot`, `transactionsRoot`, `receiptsRoot`).
  - Parameter akuntansi gas (`gasUsed`, `gasLimit`).
  - Kebijakan pasar biaya dinamis (`baseFeePerGas` via EIP-1559).
  - Entropi konsensus (`prevRandao`).
- *Visual:* Bagan komponen header Ethereum memperlihatkan keterhubungan trie roots dan metadata komputasi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ethereum bukan sekadar buku kas, melainkan komputer desentralistik dunia.
- Header Ethereum membutuhkan metadata komputasi yang jauh lebih padat dibanding Bitcoin.
- Tiga akar pohon terpisah memfasilitasi audit saldo akun dan logs aplikasi secara instan.

**Naskah Tutur (Voiceover Script):**
Ketika kita melangkah dari Bitcoin ke Ethereum, arsitektur header mengalami evolusi besar.
Bitcoin pada dasarnya adalah ledger statis untuk mencatat perpindahan koin.
Sementara itu, Ethereum dirancang sebagai sebuah komputer global atau Turing-complete state machine.
Ethereum tidak hanya memproses transfer dana sederhana, melainkan menjalankan ribuan smart contract secara bersamaan.
Akibatnya, header blok Ethereum harus mencatat kondisi komputasi yang jauh lebih rumit.
Ukuran headernya membengkak dari 80 byte menjadi sekitar 500 hingga 600 byte.
Di dalamnya, Ethereum menyematkan parameter kuota gas, penyesuaian tarif biaya transaksi dinamis, sumber keacakan konsensus, dan yang paling krusial: tiga akar pohon kriptografis terpisah untuk mengamankan data jaringan.

---

## Slide 10: Tiga Akar Merkle Patricia Trie Ethereum

### Konten Slide
- **Pemisahan Tiga Ranah Data:** Berbeda dengan Bitcoin yang hanya memiliki satu Merkle root, Ethereum membagi state ke dalam tiga trie terpisah.
- **1. transactionsRoot:**
  - Akar dari trie yang menampung seluruh transaksi yang dieksekusi di dalam blok ini.
  - Fungsinya analog dengan Merkle root milik Bitcoin.
- **2. stateRoot (World State Trie):**
  - Akar dari trie global yang mencatat status termutakhir dari setiap akun dan smart contract di jaringan.
  - Menyimpan saldo wei, nonce, hash kode kontrak, dan storage root.
  - Memungkinkan pembuktian saldo akun tanpa harus memutar ulang riwayat dari Genesis.
- **3. receiptsRoot:**
  - Akar dari trie yang menampung bukti tanda terima (*receipts*) eksekusi transaksi.
  - Menyimpan status keberhasilan, akumulasi gas, dan event logs yang dipicu oleh smart contract.
- *Visual:* Diagram arsitektur Block Header Ethereum yang bercabang ke tiga akar trie: transactionsRoot, stateRoot, dan receiptsRoot.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga akar trie: transaksi, state dunia, dan tanda terima eksekusi.
- stateRoot adalah terobosan terpenting: menyimpan snapshot saldo dan storage seluruh jaringan setelah blok selesai.
- receiptsRoot memungkinkan aplikasi mengecek apakah transaksi sukses atau gagal beserta event log-nya.

**Naskah Tutur (Voiceover Script):**
Inovasi terpenting pada header Ethereum adalah pemisahan tiga akar pohon Merkle Patricia Trie.
Pertama, `transactionsRoot`, yaitu akar pohon yang mengunci seluruh daftar transaksi di blok tersebut, mirip seperti pada Bitcoin.
Kedua, dan ini yang paling fundamental, adalah `stateRoot`.
Ini adalah akar dari World State Trie yang memotret saldo, nonce, kode program, dan data memori dari seluruh akun di Ethereum tepat setelah blok tersebut selesai dieksekusi.
Artinya, jika kalian ingin membuktikan berapa saldo akun kalian ke pihak lain, kalian tidak perlu memutar ulang transaksi dari tahun 2015.
Kalian cukup menyodorkan bukti kriptografis ringkas yang diverifikasi langsung ke `stateRoot` di header blok terakhir.
Ketiga adalah `receiptsRoot`, yang merangkum tanda terima eksekusi transaksi, mencatat apakah sebuah pemanggilan smart contract berhasil atau revert, serta merekam logs event yang dipancarkan.

---

## Slide 11: Metadata Tambahan Header Ethereum

### Konten Slide
- **`logsBloom` (256 Byte):**
  - Struktur data probabilistik Bloom filter untuk pencarian cepat.
  - Memungkinkan aplikasi web3 mendeteksi keberadaan event log kontrak tertentu tanpa memindai seluruh receipt trie.
- **`gasLimit` dan `gasUsed`:**
  - Mengukur konsumsi sumber daya komputasi dan membatasi ukuran beban kerja per blok.
- **`baseFeePerGas` (EIP-1559):**
  - Biaya minimum protokol per unit gas yang wajib dibayar dan dibakar (*burned*) pada setiap transaksi.
  - Disesuaikan secara otomatis oleh algoritma berdasarkan kepadatan blok sebelumnya.
- **`prevRandao`:**
  - Nilai keacakan pseudo-random yang dihasilkan oleh lapisan konsensus Proof of Stake (Beacon Chain).
- *Visual:* Visualisasi struktur logsBloom 256-byte sebagai filter probabilitas dan grafik penyesuaian dinamis baseFeePerGas.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- logsBloom adalah filter probabilitas 256 byte untuk query event logs secara instan.
- Gas limit dan gas used mengendalikan beban komputasi CPU validator.
- baseFeePerGas mengatur mekanisme pembakaran biaya transaksi pasca EIP-1559.

**Naskah Tutur (Voiceover Script):**
Selain tiga akar trie, header Ethereum memuat beberapa komponen krusial lain untuk efisiensi sistem.
Salah satunya adalah `logsBloom` sebesar 256 byte.
Ini adalah filter probabilitas yang memungkinkan aplikasi seperti marketplace atau bursa terdesentralisasi untuk memeriksa apakah ada event tertentu di blok ini tanpa harus mengunduh megabyte data tanda terima.
Lalu ada `gasLimit` dan `gasUsed` yang bertindak sebagai meteran pengukur kapasitas komputasi agar blok tidak membebani prosesor validator.
Pasca pembaruan EIP-1559, header juga memuat `baseFeePerGas`.
Ini adalah tarif dasar transaksi yang disesuaikan secara otomatis oleh algoritma protokol untuk meredam lonjakan biaya gas, di mana seluruh biaya dasar ini akan dibakar dan dimusnahkan dari peredaran.
Terakhir, ada `prevRandao` yang menyediakan nilai acak terverifikasi bagi kontrak on-chain langsung dari konsensus Proof of Stake.

---

## Slide 12: Jembatan ke Modul Berikutnya

### Konten Slide
- **Pencapaian Fondasi:** Kita telah memahami bagaimana block header mengunci muatan transaksi dan menjamin integritas riwayat melalui rantai hash.
- **Pertanyaan Operasional Kritis:**
  - Blok tidak terbentuk secara instan dan sendirinya di dalam jaringan.
  - Apa yang terjadi sejak pengguna menekan tombol "Send" di dompet hingga transaksi tersebut terkunci di dalam state root?
  - Bagaimana transaksi melintasi mempool, lolos dari serangan front-running, dan dieksekusi secara deterministik?
- **Materi Modul Berikutnya:** Menelusuri jalur hidup transaksi secara end-to-end dalam **Transaction Lifecycle and State Transitions**.
- *Visual:* Alur visual dari klik dompet pengguna, melewati antrean mempool, hingga masuk ke dalam blok dan memperbarui state root.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Struktur blok dan header sudah dipahami tuntas.
- Mengarahkan audiens ke alur kehidupan transaksi di tingkat operasional.
- Teaser materi modul 2.2: Transaction Lifecycle and State Transitions.

**Naskah Tutur (Voiceover Script):**
Kita sekarang sudah memahami dengan sangat rinci bagaimana kontainer blok dirancang dan bagaimana header bertindak sebagai segel kriptografis yang menyatukan konsensus.
Namun, blok tidak jatuh begitu saja dari langit.
Sebuah blok adalah hasil akhir dari perjalanan panjang ribuan transaksi independen yang dikirim oleh pengguna di seluruh dunia.
Pernahkah kalian bertanya-tanya, apa yang sebenarnya terjadi di balik layar sejak detik pertama kalian menekan tombol konfirmasi di dompet browser kalian?
Bagaimana transaksi itu divalidasi oleh node RPC, mengapung di ruang tunggu mempool, bertahan dari intaian bot arbitrase di arena yang sering disebut sebagai Dark Forest, hingga akhirnya dieksekusi oleh mesin virtual?
Untuk menjawab seluruh siklus perjalanan transaksi ini secara end-to-end, di modul berikutnya kita akan membedah Transaction Lifecycle and State Transitions.
Sampai jumpa di sesi berikutnya.
