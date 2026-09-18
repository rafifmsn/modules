# Transaction Lifecycle and State Transitions
Modul Presentasi: Arsitektur dan State (02.2)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Transaction Lifecycle and State Transitions
- **Track:** Architecture and State
- **Fokus Utama:** Perjalanan menyeluruh transaksi dari penandatanganan di dompet, antrean mempool, hingga mutasi state deterministik di mesin virtual.
- *Visual:* Sequence diagram alur transaksi: Wallet -> JSON-RPC -> Mempool -> Block Builder -> EVM -> State Root.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul kedua: Transaction Lifecycle and State Transitions.
- Menjelaskan apa yang sebenarnya terjadi saat pengguna menekan tombol "Send" di dompet.
- Membedah tahapan validasi, antrean mempool, eksekusi state, hingga penerbitan receipt.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kedua.
Bagi pengguna awam, mengirim transaksi kripto terlihat sangat sederhana.
Alice memasukkan alamat tujuan, menekan tombol kirim di dompetnya, lalu dalam beberapa detik saldonya berkurang dan saldo Bob bertambah.
Namun bagi seorang insinyur sistem terdistribusi, tindakan sederhana itu sebenarnya memicu perjalanan multi-tahap yang sangat kompleks.
Sebuah transaksi harus melalui serialisasi biner, validasi statis di simpul RPC, mengapung di mempool terdistribusi, bersaing di pasar lelang prioritas, hingga akhirnya dieksekusi oleh mesin virtual.
Setiap lonjakan latensi, transaksi yang tersangkut, hingga celah arbitrase terjadi di sepanjang jalur pipa ini.
Hari ini kita akan membedah seluruh tahapan tersebut secara terperinci.

---

## Slide 2: Pipeline End-to-End: Dari Dompet ke Ledger

### Konten Slide
- **Delapan Tahapan Kronologis Pipa Transaksi:**
  1. *Konstruksi & Signing:* Klien merakit payload, menetapkan nonce, gas, dan menandatangani data dengan private key.
  2. *RPC Ingestion:* Pengiriman payload biner via panggilan `eth_sendRawTransaction`.
  3. *Validasi Statis:* Node RPC memverifikasi format, tanda tangan, kecukupan saldo, dan gas intrinsik.
  4. *Gossip Mempool:* Transaksi disebarkan secara peer-to-peer ke antrean mempool simpul lain.
  5. *Seleksi Builder:* Block builder memilih transaksi dengan insentif fee tertinggi.
  6. *Eksekusi Sekuensial:* EVM mengeksekusi transaksi satu per satu dan menghitung state baru.
  7. *Pengemasan Blok:* Blok baru dirakit bersama state root dan disiarkan ke jaringan.
  8. *Finalisasi Settlement:* Tanda terima (*receipt*) diterbitkan dan saldo global resmi diperbarui.
- *Visual:* Diagram alur horisontal delapan fase transaksi dari perangkat pengguna hingga tercatat permanen di blockchain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Peta jalan menyeluruh: 8 tahapan kronologis.
- Menghubungkan ranah lokal pengguna, ranah jaringan P2P, dan ranah konsensus eksekusi.
- Memberikan gambaran besar sebelum masuk ke rincian setiap fase.

**Naskah Tutur (Voiceover Script):**
Ini adalah peta jalan lengkap dari siklus hidup sebuah transaksi.
Perjalanan ini terbagi menjadi delapan tahapan kronologis.
Dimulai dari ranah lokal di perangkat pengguna, di mana dompet menyusun parameter teknis dan menandatanganinya dengan kunci privat.
Setelah ditandatangani, data biner tersebut dikirim melalui panggilan JSON-RPC ke sebuah simpul jaringan.
Simpul ini tidak langsung percaya; mereka menjalankan serangkaian uji kelayakan statis sebelum meneruskannya ke mempool.
Di dalam mempool, transaksi mengapung menunggu giliran dipilih oleh pembuat blok berdasarkan tip prioritas.
Ketika blok dirakit, mesin virtual mengeksekusi instruksi transaksi secara sekuensial dan menghasilkan akar status baru.
Terakhir, tanda terima diterbitkan dan mutasi saldo terkunci secara permanen di dalam rantai.
Mari kita telaah fase pertama: perakitan di sisi klien.

---

## Slide 3: Fase 1: Konstruksi Parameter Transaksi

### Konten Slide
- **Tiga Parameter Inti Pengguna:**
  - `to`: Alamat tujuan 20-byte (berupa akun pribadi EOA atau alamat smart contract).
  - `value`: Jumlah native cryptocurrency yang ditransfer dalam satuan terkecil (wei pada Ethereum, satoshi pada Bitcoin).
  - `data` (*calldata*): Larik byte arbitrer; kosong untuk transfer biasa, tetapi memuat *function selector* dan parameter ABI saat memanggil smart contract.
- **Injeksi Parameter Otomatis oleh Dompet:**
  - Dompet pengguna secara otomatis menginjeksi parameter operasional penting: `nonce`, `gasLimit`, `maxFeePerGas`, dan `maxPriorityFeePerGas`.
- *Visual:* Anatomi payload transaksi memperlihatkan pemisahan antara data input pengguna dan parameter protokol yang disisipkan dompet.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pengguna hanya melihat to dan value, tetapi dompet menyusun struktur data yang jauh lebih lengkap.
- Field data atau calldata adalah pintu masuk interaksi smart contract.
- Nilai transfer selalu dihitung dalam unit terkecil seperti wei atau satoshi.

**Naskah Tutur (Voiceover Script):**
Di antarmuka dompet, pengguna biasanya hanya mengetik alamat penerima dan nominal dana.
Namun di balik layar, dompet menyusun struktur data biner yang memuat tiga parameter fundamental.
Pertama adalah `to`, alamat tujuan sepanjang 20 byte yang bisa berupa alamat pengguna biasa atau alamat kontrak pintar.
Kedua adalah `value`, yaitu jumlah koin yang dikirim, yang selalu dihitung dalam satuan atomik terkecil, misalnya wei di Ethereum di mana satu ETH bernilai sepuluh pangkat delapan belas wei.
Ketiga adalah field `data` atau calldata.
Jika kita hanya mentransfer ETH biasa, field data ini dibiarkan kosong.
Tetapi jika kita sedang berinteraksi dengan aplikasi DeFi atau mencetak NFT, field data ini akan diisi dengan kode fungsi dan argumen yang telah dienkripsi menggunakan standar ABI.
Selain tiga parameter ini, dompet harus menyisipkan parameter keamanan krusial yang disebut nonce.

---

## Slide 4: Peran Kritis Nonce

### Konten Slide
- **Definisi Nonce:** Bilangan bulat skalar yang mencatat secara ketat jumlah transaksi yang pernah dikirim dari suatu akun ($0, 1, 2, \dots$).
- **Garansi Keamanan Nonce:**
  - *Replay Protection:* Mencegah penyerang menyiarkan ulang transaksi yang sama untuk menguras dana korban dua kali.
  - *Deterministic Sequencing:* Transaksi dengan nonce 5 dijamin dieksekusi mendahului transaksi dengan nonce 6, terlepas dari waktu kedatangan di validator.
- **Aturan Eksekusi:** Sebuah transaksi hanya valid jika nilai noncenya tepat sama dengan nonce akun di status global saat ini ($N_{\text{tx}} = N_{\text{state}}$).
- *Visual:* Ilustrasi penyerang mencoba memutar ulang transaksi nonce 0 yang ditolak jaringan karena nonce akun korban sudah naik menjadi 1.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Nonce di Ethereum berbeda dengan nonce penambangan Bitcoin.
- Fungsi utama nonce: mencegah replay attack dan menjaga urutan eksekusi.
- Transaksi dari satu akun wajib diproses secara berurutan sesuai kenaikan nomor nonce.

**Naskah Tutur (Voiceover Script):**
Di sistem berbasis akun seperti Ethereum, kata *nonce* memiliki arti yang berbeda dari nonce penambangan Bitcoin.
Di sini, nonce adalah sebuah penghitung bilangan bulat sederhana yang mencatat berapa banyak transaksi yang sudah pernah dikirim dari akun tersebut.
Setiap kali kalian membuat akun baru, noncenya dimulai dari angka nol.
Transaksi pertama kalian wajib bernomor nonce nol, transaksi kedua bernomor satu, dan seterusnya.
Nonce memberikan dua jaminan keamanan yang sangat vital.
Pertama adalah proteksi dari replay attack.
Jika Mallory menyadap transaksi transfer kalian di jaringan, dia tidak bisa menyiarkan transaksi yang sama berulang kali untuk menguras saldo kalian, karena jaringan akan menolaknya begitu melihat nomor noncenya sudah pernah dipakai.
Kedua adalah kepastian urutan eksekusi.
Jika kalian mengirim transaksi A dengan nonce lima dan transaksi B dengan nonce enam, mesin konsensus tidak akan pernah mengeksekusi transaksi B sebelum transaksi A tuntas, tidak peduli transaksi mana yang sampai lebih dulu di simpul validator.

---

## Slide 5: Struktur Biaya EIP-1559 dan Signing

### Konten Slide
- **Mekanisme Biaya Transaksi (EIP-1559):**
  - `gasLimit`: Batas maksimum unit gas yang diizinkan untuk dikonsumsi transaksi (misal: 21.000 untuk transfer koin, 250.000 untuk transaksi DeFi).
  - `maxFeePerGas`: Harga tertinggi per unit gas yang rela dibayar pengirim (terdiri dari base fee ditambah priority fee).
  - `maxPriorityFeePerGas`: Uang tip langsung kepada validator agar transaksi diprioritaskan masuk ke blok.
- **Serialisasi dan Penandatanganan Kriptografis:**
  - Seluruh field dirangkai menggunakan encoding biner Recursive Length Prefix (RLP).
  - Data hasil encoding di-hash menggunakan Keccak-256 menghasilkan digest 32-byte.
  - Digest ditandatangani menggunakan kunci privat pengirim via algoritma ECDSA secp256k1, menghasilkan tuple tanda tangan $(r, s, v)$.
- *Visual:* Diagram alur serialisasi RLP -> Keccak-256 -> Tanda tangan ECDSA menghasilkan raw transaction hex string.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga variabel gas EIP-1559: limit komputasi, harga maksimum, dan tip validator.
- RLP encoding adalah standar serialisasi biner di Ethereum.
- Tanda tangan ECDSA menghasilkan tuple r, s, dan v yang membuktikan kepemilikan tanpa membocorkan private key.

**Naskah Tutur (Voiceover Script):**
Parameter penting berikutnya adalah kalkulasi biaya komputasi di bawah standar EIP-1559.
Dompet menetapkan tiga variabel biaya.
Pertama adalah `gasLimit`, yaitu pagu anggaran unit komputasi tertinggi yang diizinkan oleh pengguna.
Kedua adalah `maxFeePerGas`, yaitu batas harga tertinggi per satuan gas yang bersedia dibayar.
Ketiga adalah `maxPriorityFeePerGas`, yaitu tip langsung yang diberikan kepada validator agar transaksi kita dipilih lebih cepat.
Setelah seluruh data transaksi tersusun lengkap, dompet merangkainya menggunakan serialisasi biner bernama Recursive Length Prefix atau RLP.
Hasil serialisasi ini di-hash dengan algoritma Keccak-256, lalu ditandatangani menggunakan kunci privat pengirim melalui kurva eliptis ECDSA.
Tanda tangan ini menghasilkan komponen matematis r, s, dan v.
Hasil akhirnya adalah sebuah string heksadesimal mentah yang mandiri, tahan manipulasi, dan siap disiarkan ke internet.

---

## Slide 6: Fase 2: RPC Ingestion dan Validasi Statis

### Konten Slide
- **Pintu Masuk RPC:** Dompet mengirim raw transaction hex string ke simpul RPC via panggilan `eth_sendRawTransaction`.
- **Pertahanan Terhadap Serangan Spam:** Node RPC melakukan verifikasi statis sebelum memasukkan transaksi ke mempool lokal:
  1. *Syntax Check:* Format RLP valid dan struktur field memenuhi spesifikasi.
  2. *Size Check:* Ukuran muatan transaksi tidak melampaui batas protokol (misal: maksimal 128 KB).
  3. *Signature Check:* Kunci publik pengirim dapat dipulihkan dengan valid via algoritma `ecrecover`.
  4. *Intrinsic Gas Check:* Nilai `gasLimit` mencukupi batas minimum gas intrinsik.
  5. *Nonce Check:* Nilai nonce tidak lebih rendah dari nonce akun saat ini di database.
  6. *Balance Check:* Saldo pengirim cukup untuk menutupi $\text{Value} + (\text{gasLimit} \times \text{maxFee})$.
- *Visual:* Bagan 6 pintu gerbang filter validasi statis pada node RPC yang langsung menggugurkan transaksi cacat.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Node RPC tidak langsung menyebarkan transaksi secara membabi buta.
- Enam filter statis melindungi jaringan dari serangan spam dan denial-of-service.
- Transaksi yang gagal di fase ini ditolak seketika tanpa memakan biaya gas miner.

**Naskah Tutur (Voiceover Script):**
Ketika dompet kalian mengirim transaksi, data tersebut diterima pertama kali oleh sebuah simpul JSON-RPC.
Simpul ini bertindak sebagai penjaga gerbang pertama jaringan.
Node RPC tidak akan langsung menyebarkan transaksi begitu saja ke simpul lain.
Untuk melindungi dirinya dan seluruh jaringan dari serangan denial-of-service, node menjalankan enam lapis pemeriksaan statis yang sangat ketat.
Node akan memeriksa apakah format RLP-nya benar, apakah ukurannya tidak melebihi 128 kilobyte, dan apakah tanda tangannya valid menggunakan fungsi pemulihan kunci publik.
Kemudian node memeriksa apakah gas limit memenuhi syarat biaya intrinsik, apakah noncenya tidak kadaluwarsa, dan apakah saldo dompet pengirim mencukupi untuk membayar nilai transfer ditambah biaya gas maksimum.
Jika salah satu saja dari enam syarat ini gagal, transaksi langsung dibuang seketika.
Pemeriksaan ini terjadi dalam hitungan mikrodetik tanpa membebani komputasi penambang atau validator.

---

## Slide 7: Anatomi Biaya: Kalkulasi Intrinsic Gas

### Konten Slide
- **Definisi Intrinsic Gas ($G_{\text{intrinsic}}$):** Biaya dasar non-refundable yang wajib dibayar setiap transaksi sebelum mengeksekusi opcode pertama.
- **Formula Matematis:**
  $$G_{\text{intrinsic}} = 21000 + G_{\text{calldata}} + G_{\text{access\_list}} + G_{\text{creation}}$$
- **Komponen Penyusun:**
  - *Base Cost (21.000 gas):* Biaya disk I/O, pemulihan tanda tangan ECDSA, dan pembaruan saldo akun.
  - *Calldata Cost:* 4 gas untuk setiap byte bernilai nol ($0x00$), dan 16 gas untuk setiap byte bukan nol.
  - *Contract Creation (32.000 gas):* Biaya tambahan jika transaksi bertugas menginisiasi smart contract baru.
- **Proteksi Komputasi:** Jika `gasLimit` yang disetel pengirim lebih kecil dari $G_{\text{intrinsic}}$, transaksi langsung ditolak di gerbang RPC.
- *Visual:* Komposisi biaya gas intrinsik: balok base 21.000 gas ditambah variabel calldata dan deployment fee.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengapa transfer ETH selalu butuh minimal 21.000 gas.
- Byte bukan nol pada calldata lebih mahal (16 gas) dibanding byte nol (4 gas).
- Transaksi pembuatan kontrak dikenai biaya dasar tambahan sebesar 32.000 gas.

**Naskah Tutur (Voiceover Script):**
Pernahkah kalian bertanya mengapa setiap transaksi paling murah di Ethereum selalu memakan tepat 21.000 gas?
Angka tersebut adalah komponen dari apa yang kita sebut sebagai *Intrinsic Gas*.
Ini adalah tarif dasar yang wajib dibayar di muka sebelum mesin virtual mengeksekusi instruksi program apa pun.
Biaya 21.000 gas ini dirancang untuk menutupi beban kerja sistem dalam memverifikasi tanda tangan eliptis, menaikkan nomor nonce, dan memperbarui catatan database di hard drive node.
Jika transaksi membawa muatan data atau calldata, protokol menambahkan biaya 4 gas untuk setiap byte bernilai nol dan 16 gas untuk setiap byte bukan nol.
Perbedaan harga ini sengaja dibuat karena byte bernilai selain nol memakan kapasitas penyimpanan disk yang lebih besar.
Selain itu, jika transaksi bertujuan untuk men-deploy smart contract baru, sistem menambahkan biaya pembukaan akun sebesar 32.000 gas.
Jika pengirim menyetel gas limit di bawah total gas intrinsik ini, sistem langsung menolak transaksi tersebut di pintu gerbang.

---

## Slide 8: Fase 3: Dinamika Ruang Tunggu Mempool

### Konten Slide
- **Hakikat Mempool:** Mempool bukan database global yang tersinkronisasi, melainkan ruang tunggu sementara berbasis memori RAM pada masing-masing node.
- **Dua Antrean Internal Mempool:**
  - *Pending Queue:* Transaksi yang nomor noncenya cocok sempurna dengan nonce akun saat ini ($N_{\text{tx}} = N_{\text{state}}$).
    Transaksi di antrean ini siap dieksekusi seketika ke dalam blok.
  - *Queued (Future) Queue:* Transaksi yang noncenya melompati urutan ($N_{\text{tx}} > N_{\text{state}}$).
    Transaksi ini tertahan sampai seluruh nonce perantara yang hilang masuk dan ditambang.
- **Risiko Nonce Gap:** Jika transaksi bernomor nonce 11 tidak pernah dikirim, maka transaksi nonce 12 akan tertahan selamanya di antrean queued hingga kadaluwarsa.
- *Visual:* Pembagian mempool menjadi dua jalur: Jalur Hijau (Pending - Nonce runtut) dan Jalur Kuning (Queued - Tertahan karena celah nonce).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mempool adalah antrean di memori RAM simpul, bukan basis data terpusat.
- Pending queue siap dieksekusi, sedangkan queued queue menunggu nomor nonce yang terlewat.
- Fenomena transaksi nyangkut sering kali diakibatkan oleh jeda atau gap pada nomor nonce.

**Naskah Tutur (Voiceover Script):**
Setelah lolos verifikasi awal, transaksi masuk ke dalam mempool atau memory pool.
Perlu dipahami bahwa mempool bukanlah satu basis data terpusat yang sama di seluruh dunia.
Setiap simpul penuh mengelola antrean mempool di memori RAM mereka sendiri secara mandiri.
Di dalam mempool setiap simpul, transaksi dikelompokkan ke dalam dua antrean internal.
Pertama adalah *Pending Queue*, yaitu tempat berkumpulnya transaksi yang nomor noncenya cocok persis dengan nonce akun terkini.
Transaksi di antrean ini siap diambil kapan saja oleh pembuat blok.
Kedua adalah *Queued* atau *Future Queue*.
Ini adalah tempat bagi transaksi yang nomor noncenya mendahului urutan, atau mengalami *nonce gap*.
Misalnya, jika nonce akun Alice saat ini bernilai sepuluh, lalu Alice menyiarkan transaksi dengan nonce dua belas, transaksi tersebut akan terjebak di antrean queued.
Transaksi itu tidak akan pernah bisa dieksekusi sampai transaksi bernomor nonce sebelas muncul dan berhasil ditambang ke dalam rantai.

---

## Slide 9: Replace-by-Fee dan Arena "Dark Forest"

### Konten Slide
- **Mekanisme Replace-by-Fee (RBF):**
  - Pengguna dapat mempercepat atau membatalkan transaksi yang tersangkut dengan menyiarkan transaksi baru yang memiliki **nonce identik**.
  - Aturan klien mewajibkan kenaikan fee minimal **10 persen** lebih tinggi dari tarif transaksi lama agar node bersedia menimpa antrean.
- **Mempool Publik sebagai "Dark Forest":**
  - Seluruh isi mempool bersifat transparan dan dapat dibaca oleh siapa saja sebelum dieksekusi.
  - Bot pencari MEV (*Maximal Extractable Value*) terus memantau transaksi yang mengambang di mempool.
- **Anatomi Sandwich Attack:**
  1. Pengguna menyiarkan swap token bernilai besar di bursa terdesentralisasi (DEX).
  2. Bot mendeteksi potensi slippage dan menyiarkan transaksi *front-running* dengan tip lebih tinggi untuk membeli token sebelum pengguna.
  3. Transaksi pengguna dieksekusi pada harga yang lebih buruk akibat lonjakan harga.
  4. Bot mengeksekusi transaksi *back-running* seketika untuk menjual token dan meraup keuntungan bebas risiko.
- *Visual:* Urutan Sandwich Attack: Transaksi Bot Pembelian (Front-run) -> Transaksi Korban -> Transaksi Bot Penjualan (Back-run).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Replace-by-Fee (RBF) menyelesaikan transaksi macet dengan menyetel nonce sama dan fee 10% lebih tinggi.
- Mempool publik adalah arena predator yang transparan.
- Sandwich attack mengeksploitasi urutan transaksi di dalam blok demi meraup keuntungan MEV.

**Naskah Tutur (Voiceover Script):**
Apa yang terjadi jika jaringan sedang sangat padat dan transaksi kita tersangkut berjam-jam karena fee terlalu rendah?
Protokol menyediakan fitur bernama Replace-by-Fee atau RBF.
Kalian cukup menyiarkan transaksi baru dengan nomor nonce yang sama persis, tetapi menaikkan tarif biaya minimal sepuluh persen lebih tinggi.
Ketika simpul jaringan menerima transaksi baru ini, mereka akan membuang transaksi lama dari antrean dan menggantikannya dengan yang baru.
Namun, transparansi mempool publik ini juga memicu sisi gelap.
Para praktisi sistem menyebut mempool publik sebagai arena *Dark Forest*.
Karena mempool tidak dienkripsi, bot arbitrase otomatis yang memburu Maximal Extractable Value atau MEV selalu memantau transaksi yang mengantre.
Jika kalian mengirim transaksi penukaran token dalam jumlah besar di bursa desentralistik, bot MEV bisa melihat potensi pergeseran harga tersebut.
Bot akan menyisipkan transaksi beli tepat sebelum transaksi kalian dengan membayar tip validator lebih tinggi, lalu menjualnya kembali tepat setelah transaksi kalian selesai.
Eksploitasi urutan transaksi ini dikenal sebagai Sandwich Attack.

---

## Slide 10: Fase 4: State Transition Function Eksekusi Blok

### Konten Slide
- **Model Matematis Formal:** Eksekusi blok dimodelkan secara deterministik sebagai fungsi transisi state:
  $$\sigma_{t+1} = \Pi(\sigma_t, B_{t+1})$$
- **Transisi di Tingkat Transaksi Individual ($\Upsilon$):**
  $$\sigma_{i} = \Upsilon(\sigma_{i-1}, T)$$
- **Empat Tahap Eksekusi Atomik:**
  1. *Pre-execution Debit:* Saldo pengirim didebit sementara sebesar $\text{gasLimit} \times \text{EffectiveGasPrice}$ untuk menjamin solvabilitas.
  2. *Nonce Increment:* Nonce pengirim dinaikkan tepat satu angka: $N_{\text{sender}} \leftarrow N_{\text{sender}} + 1$.
  3. *Execution Context:* EVM mengalokasikan stack memori dan mengeksekusi bytecode kontrak secara sekuensial.
  4. *Settlement & Refund:* Gas riil ($G_{\text{used}}$) dihitung, sisa kuota dikembalikan ke pengirim, base fee dibakar, dan priority tip diberikan ke validator.
- *Visual:* Diagram alur eksekusi sekuensial: Status awal $\sigma_0$ bermutasi melalui $T_1, T_2, \dots, T_n$ hingga menghasilkan status akhir $\sigma_{t+1}$.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Blockchain adalah state machine deterministik: input sama menghasilkan state akhir yang sama.
- Eksekusi dipecah menjadi fungsi blok Pi dan fungsi transaksi individual Upsilon.
- Empat langkah atomik: debit deposit gas, kenaikan nonce, eksekusi kode, dan pengembalian sisa gas.

**Naskah Tutur (Voiceover Script):**
Sekarang kita tiba di jantung dari mesin blockchain: eksekusi blok.
Secara matematis, seluruh operasi ini dimodelkan sebagai State Transition Function yang bersifat deterministik murni.
Status dunia pada blok berikutnya, yaitu sigma t plus satu, adalah hasil pemrosesan status saat ini bersama kumpulan transaksi di dalam blok baru.
Di dalam mesin virtual, setiap transaksi diproses satu demi satu melalui empat tahapan atomik.
Tahap pertama, sistem mendebit sementara saldo pengirim sebesar kuota gas maksimum untuk memastikan pengirim sanggup membayar.
Tahap kedua, nonce akun pengirim dinaikkan satu angka seketika.
Tahap ketiga, mesin virtual membuka ruang memori stack dan mengeksekusi instruksi bytecode smart contract langkah demi langkah.
Tahap terakhir adalah penyelesaian biaya: sistem menghitung gas riil yang terpakai, mengembalikan sisa dana yang tidak terpakai ke saldo pengirim, membakar base fee dari peredaran, dan menyetorkan tip prioritas ke dompet validator.

---

## Slide 11: Fase 5: Transaction Receipts dan Event Logging

### Konten Slide
- **Penerbitan Bukti Eksekusi:** Begitu transaksi tuntas diproses, simpul menerbitkan catatan permanen bernama **Transaction Receipt** ($R$).
- **Struktur Isi Receipt:**
  - `status`: Indikator biner status eksekusi (1 untuk sukses, 0 jika terjadi *revert*).
  - `cumulativeGasUsed`: Akumulasi total gas yang telah dihabiskan di dalam blok hingga transaksi ini selesai.
  - `logsBloom`: Filter Bloom 256-byte untuk indeks pencarian log.
  - `logs`: Larik rekaman peristiwa (*event logs*) yang dipancarkan oleh smart contract selama eksekusi.
- **Penyimpanan Terpisah:** Receipt tidak disimpan di dalam World State Trie karena sifatnya tidak dapat berubah (*immutable*).
  Seluruh receipt dirangkum ke dalam Receipts Merkle Patricia Trie dan akarnya dicatat pada header sebagai `receiptsRoot`.
- *Visual:* Bagan struktur data Transaction Receipt dan koneksinya menuju Receipts Trie di dalam block header.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Transaksi yang revert tetap menghasilkan receipt dan tetap memotong gas.
- Receipts disimpan terpisah di Receipts Trie, bukan di World State Trie.
- Event logs di dalam receipt adalah fondasi pembaruan data antarmuka aplikasi web3.

**Naskah Tutur (Voiceover Script):**
Setelah sebuah transaksi selesai dieksekusi, sistem menerbitkan dokumen bukti permanen yang disebut Transaction Receipt.
Satu poin penting yang harus diingat: bahkan jika sebuah transaksi gagal atau revert di tengah jalan, transaksi tersebut tetap sah masuk ke dalam blok dan biaya gasnya tetap dipotong.
Tanda terima ini mencatat status biner keberhasilan, yaitu angka satu jika sukses atau angka nol jika revert.
Receipt juga mencatat total gas kumulatif dan deretan event logs yang dipancarkan oleh smart contract, misalnya peristiwa transfer token antar-pengguna.
Tanda terima ini tidak disimpan di dalam World State Trie karena datanya tidak pernah berubah lagi di masa depan.
Sebaliknya, semua tanda terima di dalam satu blok dirangkai ke dalam pohon kriptografis tersendiri bernama Receipts Trie, dan akarnya dicatat pada header blok sebagai `receiptsRoot`.
Melalui tanda terima inilah aplikasi terdesentralisasi memverifikasi apakah transaksi pengguna sudah berhasil atau gagal.

---

## Slide 12: Jembatan ke Modul Berikutnya

### Konten Slide
- **Rangkuman Siklus Hidup:** Kita telah menelusuri bagaimana transaksi berpindah dari perangkat pengguna, disaring di RPC, mengantre di mempool, dan bermutasi menjadi status baru.
- **Teka-teki Arsitektur yang Tersisa:**
  - Persamaan transisi state mendefinisikan mutasi status $\sigma$.
  - Namun, bagaimana wujud fisik status $\sigma$ tersebut diatur di dalam disk penyimpanan simpul?
  - Apakah ledger disimpan sebagai tumpukan lembaran uang digital yang belum dibelanjakan seperti pada Bitcoin?
  - Ataukah ledger dikelola seperti rekening koran bank yang mencatat saldo total akun seperti pada Ethereum?
- **Materi Modul Berikutnya:** Membedah dua filosofi pencatatan status terbesar dalam **Ledger State Models: UTXO vs. Account Model**.
- *Visual:* Komparasi visual berdampingan antara koin fisik diskrit (UTXO) versus tabel saldo rekening perbankan (Account).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Siklus transaksi tuntas: dari dompet hingga receipt di blok.
- Membuka pertanyaan mendasar: bagaimana wujud fisik state di dalam hard drive simpul.
- Teaser materi modul 2.3: Ledger State Models: UTXO vs. Account Model.

**Naskah Tutur (Voiceover Script):**
Kita telah menyelesaikan penelusuran lengkap siklus hidup transaksi.
Mulai dari tanda tangan di dompet, gerbang validasi RPC, dinamika ruang tunggu mempool, hingga formula matematis transisi status di mesin virtual.
Namun pemahaman ini langsung membawa kita ke pertanyaan arsitektur yang jauh lebih mendalam.
Formula transisi status menyebutkan bahwa blok baru mengubah status lama menjadi status baru yang kita lambangkan dengan huruf sigma.
Lantas, seperti apa wujud konkret dari status sigma tersebut di dalam media penyimpanan simpul?
Apakah ledger disusun seperti tumpukan lembaran uang tunai fisik yang berpindah tangan seperti model UTXO milik Bitcoin?
Ataukah ledger dikelola seperti tabel rekening buku tabungan bank di mana saldo setiap akun dicatat secara terpusat seperti model Akun milik Ethereum?
Mengapa perbedaan desain ini memicu perbedaan radikal dalam skalabilitas, privasi, dan kemampuan komputasi kontrak pintar?
Di modul berikutnya, kita akan membedah tuntas perbandingan mendalam antara Ledger State Models: UTXO vs Account Model.
Sampai jumpa di modul berikutnya.
