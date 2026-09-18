# Protocol Security and Maximum Extractable Value
Modul Presentasi: Scalability and Security (06.5)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Protocol Security and Maximum Extractable Value (MEV)
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Membedah kerentanan kode smart contract tingkat rendah, dinamika predator transaksi di mempool publik, serta arsitektur Proposer-Builder Separation untuk menjaga desentralisasi konsensus.
- *Visual:* Ilustrasi perisai keamanan siber kriptografis berdampingan dengan radar pemindai bot transaksi MEV di mempool.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul penutup dari Trek Fundamentals: Protocol Security and MEV.
- Modul ini menggabungkan dua topik krusial: keamanan kode smart contract dan keamanan teori permainan urutan transaksi.
- Memahami mengapa menulis kode di blockchain sangat berbeda dengan membuat aplikasi web konvensional.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kelima sekaligus modul penutup dari bab Scalability and Security dan seluruh trek Fundamentals.
Di modul-modul sebelumnya, kita telah mempelajari bagaimana sistem terdistribusi ini dibangun, diskalakan lewat Layer 2, dan dihubungkan lewat jembatan lintas rantai.
Namun sekarang kita harus menghadapi kenyataan paling keras dalam dunia rekayasa perangkat lunak:
Blockchain publik adalah lingkungan yang sangat kejam dan tanpa ampun.
Tidak seperti aplikasi web konvensional yang dilindungi oleh dinding api dan firewall server privat, setiap baris kode smart contract, status memori, dan antrean transaksi kalian terpampang telanjang di internet terbuka.
Hari ini kita akan membedah dua medan pertempuran keamanan utama di blockchain.
Pertama adalah kerentanan pada tingkat kode mesin virtual seperti reentrancy dan kontrol akses.
Kedua adalah pertarungan teori permainan di ruang tunggu transaksi yang dikenal sebagai Maximal Extractable Value atau MEV.

---

## Slide 2: Realitas Lingkungan Adversarial Blockchain

### Konten Slide
- **Perbedaan Paradigma Keamanan Perangkat Lunak:**
  - *Sistem Tradisional (Web2):* Kode berada di server tertutup, database dilindungi firewall, transaksi bersifat privat, dan transaksi curang dapat dibatalkan melalui intervensi bank atau pengadilan.
  - *Sistem Desentralisasi (Web3):* Bytecode terbuka untuk umum, status akun transparan global, eksekusi bersifat deterministik dan tidak dapat dibatalkan (*immutable*).
- **The Dark Forest (Hutan Gelap Mempool):**
  - Ribuan bot algoritmis mengawasi setiap transaksi yang belum dikonfirmasi selama 24 jam sehari secara otomatis.
  - Setiap kesalahan logika sekecil apa pun akan langsung dieksploitasi dalam hitungan detik tanpa peringatan dan tanpa jalur hukum untuk memulihkan dana.
- *Visual:* Perbandingan grafis antara benteng Web2 dengan firewall vs Hutan Gelap Web3 dengan radar bot pemangsa otomatis.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengapa Web3 disebut sebagai lingkungan adversarial mutlak.
- Analogi Dan Robinson: The Dark Forest di mempool publik.
- Sekali kode dirilis ke mainnet, kode tersebut langsung menjadi target eksploitasi instan.

**Naskah Tutur (Voiceover Script):**
Jika kalian terbiasa membangun perangkat lunak konvensional, kalian harus merombak total pola pikir keamanan kalian saat masuk ke blockchain.
Di dunia perbankan atau Web2, jika ada bug pada aplikasi, tim keamanan bisa mematikan server, menambal kode, dan meminta bank membatalkan transfer yang salah.
Di blockchain publik, tidak ada tombol jeda darurat dan tidak ada bantuan hukum.
Bytecode aplikasi kalian terpasang secara abadi di buku besar global, dan siapa pun di muka bumi bisa membedah setiap instruksi opcodenya.
Lebih dari itu, ruang tunggu transaksi atau mempool publik sering diibaratkan sebagai The Dark Forest, hutan gelap yang penuh dengan pemangsa bersenjata otomatis.
Ribuan bot algoritmis terus memindai setiap transaksi yang dikirim pengguna.
Jika kalian membuat satu saja kesalahan logika pada smart contract kalian, bot penyerang akan mengeksekusi eksploitasi tersebut dalam hitungan milidetik sebelum kalian sempat menyadarinya.

---

## Slide 3: Kerentanan Klasik Smart Contract: Reentrancy Attack

### Konten Slide
- **Definisi Reentrancy:** Celah keamanan yang terjadi ketika sebuah kontrak memanggil alamat eksternal sebelum menyelesaikan pembaruan status internalnya sendiri.
- **Mekanisme Pembajakan Alur Kontrol (Control Flow Hijacking):**
  - Kontrak target mentransfer koin ke alamat penyerang (Mallory).
  - Pengiriman koin otomatis memicu fungsi penampung (*fallback / receive function*) pada smart contract milik Mallory.
  - Alih-alih menerima dana secara pasif, kode Mallory sengaja memanggil kembali (*re-enter*) fungsi penarikan `withdraw()` pada kontrak target sebelum saldo akunnya disetel ke nol.
- **Kasus Historis Terkenal:** The DAO Hack (2016) yang menguras 3,6 juta ETH dan memicu hard fork perpecahan antara Ethereum dan Ethereum Classic.
- *Visual:* Sequence diagram loop reentrancy: Target memeriksa saldo -> Kirim nilai -> Fallback Mallory memanggil withdraw lagi secara rekursif hingga dana ludes.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Reentrancy adalah bug paling legendaris dalam sejarah smart contract (The DAO 2016).
- Masalah inti: mentransfer dana dulu sebelum mencatat bahwa dana sudah berkurang.
- Fungsi fallback penyerang membajak kendali eksekusi untuk menguras brankas secara rekursif.

**Naskah Tutur (Voiceover Script):**
Mari kita pelajari kerentanan kode yang paling legendaris dalam sejarah Ethereum: Serangan Reentrancy.
Inilah bug yang meruntuhkan The DAO pada tahun 2016 dan menyebabkan perpecahan antara Ethereum dan Ethereum Classic.
Bagaimana serangan ini bekerja?
Bayangkan ada sebuah kontrak pintar brankas yang memiliki fungsi penarikan dana bernama `withdraw()`.
Ketika pengguna memanggil fungsi ini, kontrak memeriksa apakah saldo pengguna cukup.
Jika cukup, kontrak mengirimkan koin ke alamat pengguna, dan baru di baris terakhir saldo pengguna disetel menjadi nol.
Di sinilah letak bencana komputasinya.
Di Ethereum, mengirim koin ke alamat smart contract lain otomatis menyerahkan kendali eksekusi ke fungsi fallback kontrak penerima tersebut.
Penyerang seperti Mallory tidak membuat dompet biasa, melainkan membuat smart contract jahat.
Begitu koin pertama dikirimkan ke kontraknya, fungsi fallback Mallory langsung memanggil ulang fungsi `withdraw()` di kontrak brankas sebelum baris penyetelan saldo ke nol sempat dieksekusi.
Kontrak brankas mengira ini adalah penarikan baru, melihat saldonya masih utuh, dan mengirimkan koin lagi.
Proses ini berputar terus secara rekursif hingga seluruh isi brankas terkuras habis.

---

## Slide 4: Garis Pertahanan Reentrancy: CEI Pattern & Mutex Guards

### Konten Slide
- **1. Pola Checks-Effects-Interactions (CEI):**
  - Standar mutlak dalam penulisan smart contract yang aman.
  - **Checks:** Validasi seluruh persyaratan input dan saldo akun menggunakan `require()`.
  - **Effects:** Perbarui seluruh variabel status internal dan kurangi saldo akun pemanggil terlebih dahulu.
  - **Interactions:** Lakukan panggilan eksternal atau transfer koin ke luar kontrak sebagai langkah paling akhir.
- **2. ReentrancyGuard (Kunci Mutex / Semaphore):**
  - Mengimplementasikan pengunci status sementara (seperti pustaka OpenZeppelin `nonReentrant`).
  - Menandai variabel boolean pengunci sebelum fungsi berjalan, dan membalikkan transaksi (*revert*) jika ada pemanggilan kembali sebelum eksekusi pertama tuntas.
- *Visual:* Perbandingan kode rentan (Interaction sebelum Effects) vs Kode aman mematuhi CEI Pattern disertai ilustrasi gembok Mutex.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dua obat penawar utama reentrancy: CEI pattern dan Mutex guards.
- Formula CEI: Periksa, Ubah Status Internal, baru Bicara ke Dunia Luar.
- Mutex guard mengunci pintu saat fungsi sedang bekerja agar tidak bisa dimasuki dua kali.

**Naskah Tutur (Voiceover Script):**
Untungnya, ilmu rekayasa smart contract telah berkembang pesat untuk menangkal serangan ini.
Ada dua garis pertahanan wajib yang harus diterapkan setiap pengembang.
Pertahanan pertama adalah Checks-Effects-Interactions Pattern atau pola CEI.
Aturan mainnya sangat tegas:
Pertama, periksa semua syarat dan pastikan pemanggil punya hak.
Kedua, ubah status internal di database kalian terlebih dahulu: kurangi saldo pengguna menjadi nol sekarang juga.
Ketiga, baru lakukan interaksi ke dunia luar dengan mentransfer koin.
Dengan pola ini, jika penyerang mencoba memanggil ulang fungsi tersebut secara rekursif, saldo internal mereka sudah bernilai nol pada pengecekan kedua, sehingga transaksi langsung dibatalkan.
Pertahanan kedua adalah memasang gembok pengunci atau Mutex Guard, seperti modifier `nonReentrant` dari OpenZeppelin.
Gembok ini menandai bahwa fungsi sedang berjalan.
Jika ada instruksi yang mencoba masuk kembali ke pintu fungsi yang sama sebelum eksekusi pertama selesai, sistem akan seketika menolaknya.

---

## Slide 5: Kerentanan Aritmatika dan Kontrol Akses

### Konten Slide
- **Kerentanan Aritmatika (Overflow & Underflow):**
  - *Di bawah Solidity 0.8.0:* Angka integer berputar tanpa error (*silent wraparound*); mengurangi 1 dari nilai nol pada `uint256` menghasilkan angka raksasa $2^{256} - 1$.
  - *Solidity 0.8.0 ke atas:* Kompilator menyertakan pengecekan otomatis bawaan yang langsung membatalkan transaksi (*revert*) jika terjadi overflow, kecuali di dalam blok `unchecked { ... }`.
- **Kegagalan Kontrol Akses (Access Control Failures):**
  - Lupa menetapkan batasan pemanggil (*visibility & access modifiers*) pada fungsi penting seperti pengaturan pemilik, pencetakan token, atau inisialisasi kontrak.
  - **Tragedi Parity Multi-Sig (2017):** Fungsi inisialisasi pustaka dompet tidak dilindungi; penyerang memanggil `initWallet()`, mengangkat diri menjadi pemilik, lalu memanggil `selfdestruct()`, membekukan 513.774 ETH secara permanen.
- *Visual:* Ilustrasi putaran roda angka aritmatika wrap-around dan pintu brankas tanpa gembok kontrol akses.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dulu butuh pustaka SafeMath untuk mencegah overflow, sekarang Solidity 0.8+ sudah otomatis menangani ini.
- Bahaya blok `unchecked` jika dipakai sembarangan demi menghemat gas.
- Kasus Parity Multi-Sig: keteledoran kontrol akses membekukan setengah juta ETH selamanya.

**Naskah Tutur (Voiceover Script):**
Dua kerentanan klasik lain yang sering menghancurkan protokol adalah masalah aritmatika dan kegagalan kontrol akses.
Dulu, sebelum versi Solidity 0.8, variabel angka di smart contract mengalami masalah putaran diam atau overflow dan underflow.
Jika variabel bernilai nol dikurangi satu, angkanya tidak menjadi minus satu, melainkan melompat menjadi angka maksimum dua pangkat 256 dikurang satu.
Pengembang dulu terpaksa menggunakan pustaka SafeMath untuk setiap operasi matematika.
Kini, kompiler modern Solidity otomatis membatalkan transaksi jika ada overflow, kecuali pengembang sengaja mematikannya di dalam blok `unchecked` demi menghemat gas.
Kerentanan berikutnya adalah kelalaian kontrol akses.
Banyak pengembang lupa memberi modifier pembatas pada fungsi vital seperti inisialisasi atau penarikan dana.
Kasus paling tragis terjadi pada dompet Parity Multi-Sig tahun 2017.
Sebuah fungsi inisialisasi perpustakaan kode dibiarkan terbuka untuk siapa saja.
Seorang pengguna sengaja memanggil fungsi tersebut, mengangkat dirinya menjadi pemilik perpustakaan, lalu memicu instruksi bunuh diri `selfdestruct()`.
Akibatnya, perpustakaan kode itu lenyap dari blockchain, dan 513.000 koin ETH di ratusan dompet multi-sig membeku selamanya tanpa bisa dicairkan hingga hari ini.

---

## Slide 6: Pengantar Maximal Extractable Value (MEV)

### Konten Slide
- **Definisi Formal (Phil Daian et al., 2019 - *Flash Boys 2.0*):**
  - Nilai maksimum yang dapat diekstraksi dari produksi blok di luar hadiah blok reguler (*block reward*) dan biaya gas standar.
  - Diekstraksi melalui kewenangan menyertakan, mengecualikan, atau **mengubah urutan kronologis transaksi** di dalam sebuah blok.
- **Sifat Transparan Mempool Publik:**
  - Sebelum transaksi dimasukkan ke dalam blok resmi, transaksi berada di mempool publik dan dapat dibaca oleh seluruh dunia.
  - Siapa pun dapat melihat niat perdagangan, jumlah token, dan batas toleransi harga (*slippage*) dari transaksi yang tertunda.
- **Pergeseran Istilah:** Semula disebut *Miner Extractable Value* pada era Proof of Work, kini diperluas menjadi *Maximal Extractable Value* pada era Proof of Stake.
- *Visual:* Diagram penambang atau validator mengatur urutan transaksi dari antrean mempool untuk meraup keuntungan pribadi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pengenalan MEV: bukan bug pada kode, melainkan konsekuensi dari kewenangan mengatur urutan transaksi.
- Pertama kali diformalkan oleh Phil Daian lewat makalah Flash Boys 2.0.
- Siapa yang mengontrol urutan blok memegang kekuasaan finansial yang sangat besar.

**Naskah Tutur (Voiceover Script):**
Sekarang kita beralih dari keamanan kode ke wilayah yang jauh lebih dinamis: Maximal Extractable Value atau MEV.
Konsep ini pertama kali diformalkan pada tahun 2019 oleh peneliti Phil Daian dalam makalah terkenal berjudul *Flash Boys 2.0*.
MEV adalah total keuntungan finansial maksimum yang bisa diperas dari sebuah blok, melebihi hadiah blok dan biaya gas biasa, dengan cara memanipulasi urutan transaksi di dalam blok tersebut.
Kenapa ini bisa terjadi?
Karena di blockchain publik, sebelum transaksi kalian resmi masuk ke dalam blok, transaksi itu mengapung di mempool publik.
Siapa pun bisa membaca transaksi kalian.
Validator yang membuat blok memiliki hak istimewa absolut untuk menentukan: transaksi mana yang masuk duluan, transaksi mana yang masuk belakangan, dan transaksi mana yang sengaja dibuang.
Kewenangan mengatur urutan waktu ini membuka peluang ekonomi raksasa bagi siapa saja yang tahu cara memanfaatkannya.

---

## Slide 7: Strategi Ekstraksi MEV: Front-Running, Back-Running, dan Likuidasi

### Konten Slide
- **1. Front-Running:**
  - Bot pengintai (*searcher*) mendeteksi transaksi bernilai untung besar di mempool publik (misalnya transaksi pembelian besar atau likuidasi).
  - Bot menyalin parameter transaksi tersebut dan menyiarkannya dengan biaya prioritas gas (*priority gas fee*) yang lebih tinggi agar ditambang lebih awal oleh validator.
- **2. Back-Running:**
  - Bot mendeteksi transaksi besar yang akan mengubah rasio harga di sebuah kolam AMM.
  - Bot menempatkan transaksinya persis di belakang transaksi korban untuk menangkap peluang arbitrase harga seketika di bursa lain.
- **3. Likuidasi Otomatis:**
  - Ratusan bot memantau protokol peminjaman seperti Aave dan Compound selama 24 jam sehari.
  - Begitu harga agunan jatuh, bot-bot ini berlomba dalam lelang gas (*Priority Gas Auctions / PGA*) untuk mengeksekusi likuidasi dalam blok yang sama dan mengklaim bonus likuidasi.
- *Visual:* Bagan tiga jalur strategi MEV: Front-running (menyalip), Back-running (membuntuti), dan Likuidasi (lelang gas kilat).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga strategi klasik MEV di mempool.
- Front-running: menyalip dengan membayar gas lebih tinggi.
- Back-running: membuntuti tepat di belakang transaksi pemicu untuk meraup arbitrase.
- Likuidasi: eksekusi otomatis yang bermanfaat menjaga kesehatan protokol pinjaman.

**Naskah Tutur (Voiceover Script):**
Ada beberapa strategi utama yang dijalankan oleh bot-bot MEV yang beroperasi di mempool setiap hari.
Strategi pertama adalah Front-Running.
Bayangkan seorang pengguna menemukan celah arbitrase di bursa terdesentralisasi dan mengirimkan transaksinya.
Sebuah bot searcher langsung menyalin transaksi tersebut, menawarkan biaya gas yang lebih tinggi kepada validator, dan transaksi sang bot ditambang lebih dulu mendahului sang penemu aslinya.
Strategi kedua adalah Back-Running.
Ketika ada transaksi pembelian token dalam jumlah raksasa yang akan membuat harga di Uniswap melonjak, bot sengaja menaruh transaksi penjualannya persis satu slot di belakang transaksi tersebut untuk mengunci keuntungan arbitrase secara bebas risiko.
Strategi ketiga adalah Likuidasi.
Ratusan bot memantau protokol pinjaman seperti Aave tanpa henti.
Begitu harga koin peminjam turun di bawah batas aman, bot-bot ini bertarung habis-habisan dalam hitungan milidetik untuk melikuidasi peminjam dan meraup bonus likuidasi.
Likuidasi ini sebenarnya membantu sistem tetap sehat, tetapi perang penawaran gasnya sering kali menyumbat jaringan utama.

---

## Slide 8: Serangan Predator: The Sandwich Attack

### Konten Slide
- **Target Sasaran:** Pedagang ritel (seperti Alice) yang menukar token di bursa terdesentralisasi dengan menyetel batas toleransi harga (*slippage tolerance*) yang terlalu longgar.
- **Tiga Tahap Serangan Menjepit (The Sandwich):**
  - **1. Front-Run Buy:** Bot pengintai (Eve) mendeteksi rencana pembelian token X oleh Alice; Eve menyalip dengan membeli token X terlebih dahulu, mendorong harga token X naik hingga ke batas toleransi maksimal Alice.
  - **2. Victim Swap:** Transaksi Alice dieksekusi tepat di tengah pada harga terburuk yang diizinkan oleh pengaturan toleransinya.
  - **3. Back-Run Sell:** Pada milidetik yang sama persis di dalam blok yang identik, Eve langsung menjual kembali seluruh token X miliknya pada harga tinggi yang baru saja dipompa oleh pembelian Alice.
- **Hasil Akhir:** Eve mengeruk keuntungan tanpa risiko pasar, sementara Alice menderita kerugian finansial akibat mendapatkan jumlah token yang jauh lebih sedikit.
- *Visual:* Sequence diagram Sandwich Attack: Eve Buy -> Alice Victim Swap (diapit di tengah) -> Eve Sell (mengekstraksi margin keuntungan).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Sandwich attack adalah bentuk MEV yang paling merugikan pengguna biasa.
- Memanfaatkan kelalaian pengguna dalam menyetel slippage tolerance.
- Terjadi dalam satu blok yang sama: beli sebelum korban, jual segera setelah korban.

**Naskah Tutur (Voiceover Script):**
Dari sekian banyak strategi MEV, pola serangan yang paling merugikan pengguna ritel sehari-hari adalah Sandwich Attack.
Mari kita lihat bagaimana serangan penjepit ini mengeksploitasi Alice.
Alice ingin menukar 10.000 dolar ke dalam token tertentu di Uniswap, namun karena terburu-buru, Alice menyetel batas toleransi slippage sebesar 3 persen.
Artinya, Alice rela menerima harga hingga 3 persen lebih mahal dari harga pasar saat ini.
Bot searcher bernama Eve mendeteksi transaksi Alice di mempool publik.
Eve menyusun tiga transaksi sekaligus yang dijepit di dalam blok yang sama.
Di posisi pertama, Eve membeli token tersebut lebih dulu untuk mendongkrak harganya naik setinggi mungkin hingga menyentuh batas toleransi 3 persen milik Alice.
Di posisi kedua, transaksi Alice dieksekusi pada harga yang sudah sangat mahal tersebut.
Dan di posisi ketiga, persis di belakang transaksi Alice, Eve langsung menjual kembali token miliknya pada harga puncak yang baru saja dipompa oleh uang Alice.
Eve mengantongi keuntungan bersih secara bebas risiko, sementara Alice mendapatkan jumlah token yang jauh lebih sedikit dari yang seharusnya.

---

## Slide 9: Bahaya Sentralisasi MEV pada Tingkat Konsensus

### Konten Slide
- **Ancaman terhadap Fondasi Desentralisasi:**
  - Pada masa awal Proof of Stake dan Proof of Work, penambang dan validator mengekstraksi MEV secara mandiri melalui infrastruktur internal.
- **Ketimpangan Ekonomi Staker Rumahan vs Kartel Institusional:**
  - Validator perorangan (*solo home stakers*) tidak memiliki kapabilitas algoritmis untuk bersaing memburu MEV dan hanya menerima imbal hasil dasar (misalnya 4 persen APR).
  - Kartel data center besar bermitra dengan firma perdagangan frekuensi tinggi (*HFT firms*) untuk mengekstrak MEV, mendongkrak imbal hasil mereka menjadi 10 hingga 15 persen APR.
- **Efek Domino Sentralisasi:**
  - Modal staking global secara rasional akan mengalir meninggalkan staker rumahan dan terkonsentrasi ke segelintir operator elite yang mampu memaksimalkan MEV.
  - Konsensus jaringan berisiko terpusat menjadi oligarki validator terkoordinasi.
- *Visual:* Grafik jurang ketimpangan imbal hasil antara Solo Staker vs Kartel MEV institusional yang memicu sentralisasi modal.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengapa MEV bukan hanya masalah trader, melainkan ancaman eksistensial bagi konsensus blockchain.
- Jika hanya validator kaya yang bisa mengeruk MEV, staker rumahan akan bangkrut dan tersingkir.
- Ini memicu sentralisasi validator ke tangan segelintir kartel institusional.

**Naskah Tutur (Voiceover Script):**
Mungkin kalian berpikir bahwa MEV hanyalah urusan para trader bursa terdesentralisasi.
Kenyataannya, MEV adalah ancaman eksistensial terbesar terhadap pilar desentralisasi konsensus blockchain.
Begini masalahnya.
Mengekstrak MEV membutuhkan server berkecepatan tinggi, koneksi internet khusus, dan algoritma matematika yang sangat rumit.
Pengguna biasa yang menjalankan validator di laptop atau mini PC di rumah tidak mungkin mampu membangun sistem perdagangan frekuensi tinggi seperti itu.
Akibatnya, staker rumahan hanya mendapatkan bunga staking dasar sekitar 4 persen setahun.
Sementara itu, perusahaan modal besar yang menguasai ribuan validator bisa meraup imbal hasil hingga 15 persen berkat ekstraksi MEV.
Secara hukum ekonomi, para pemilik modal di seluruh dunia akan mencabut koin mereka dari staker mandiri dan menyerahkannya ke segelintir validator institusional elite tersebut.
Lama-kelamaan, seluruh jaringan akan dikuasai oleh kartel data center, dan impian desentralisasi kita akan mati.

---

## Slide 10: Arsitektur Modern MEV: PBS dan MEV-Boost

### Konten Slide
- **Proposer-Builder Separation (PBS):**
  - Solusi arsitektural Ethereum untuk mendemokratisasi hasil MEV dan menyelamatkan staker rumahan.
  - Memisahkan tugas **penyusunan blok (*block building*)** dari tugas **pengusulan blok (*block proposing*)**.
- **Empat Aktor dalam Pipeline MEV-Boost:**
  - **1. Searchers:** Bot algoritmis (seperti Eve) mencari peluang arbitrase, mengemas transaksi menjadi berkas (*bundles*), dan mengirimkannya ke Builders.
  - **2. Block Builders:** Server spesialis berkekuatan tinggi merangkai ribuan transaksi publik dan bundles menjadi calon blok paling bernilai maksimal, lalu mengajukan lelang harga.
  - **3. Relays:** Pihak penengah netral (*escrow*) yang memvalidasi isi blok dan mencegah kecurangan antar-pihak sebelum blok ditandatangani.
  - **4. Block Proposers (Validators):** Staker biasa (Charlie) tidak perlu melihat isi transaksi di dalam blok; Charlie cukup menandatangani header dari Builder yang memberikan tawaran bagi hasil ekonomi tertinggi.
- *Visual:* Alur kerja PBS: Searchers -> Builders -> MEV-Boost Relays -> Solo Proposer Charlie menandatangani blok.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Solusi Ethereum: Proposer-Builder Separation via perangkat lunak MEV-Boost.
- Pembagian tugas: Builder menyusun blok paling menguntungkan, Proposer staker rumahan tinggal memilih penawar tertinggi.
- Staker solo di rumah kini bisa menikmati hasil MEV yang sama besarnya dengan institusi raksasa.

**Naskah Tutur (Voiceover Script):**
Untuk menyelamatkan validator rumahan dari kepunahan, komunitas Ethereum merancang arsitektur revolusioner bernama Proposer-Builder Separation atau PBS, yang dijalankan melalui perangkat lunak MEV-Boost.
Prinsipnya adalah pemisahan tugas secara tegas.
Tugas mencari transaksi menguntungkan dan menyusun blok diserahkan sepenuhnya kepada pihak spesialis bernama Block Builders.
Para Builders ini mengumpulkan transaksi dari para searcher, merangkainya menjadi blok paling berharga, lalu melelang blok tersebut ke jaringan.
Sementara itu, para validator atau Proposers, termasuk staker rumahan seperti Charlie, tidak perlu pusing memikirkan algoritma perdagangan frekuensi tinggi.
Charlie bahkan tidak tahu apa isi transaksi di dalam blok tersebut.
Charlie hanya perlu melihat penawaran lelang tertinggi dari para Builders lewat perantara terpercaya bernama Relay, lalu menandatangani header blok penawar tertinggi tersebut.
Builder mendapatkan biaya penyusunan, dan sebagian besar keuntungan MEV dibayarkan langsung ke dompet Charlie sebagai staker.
Melalui PBS, staker rumahan tetap bisa mendapatkan imbal hasil kompetitif yang setara dengan institusi raksasa.

---

## Slide 11: Pertahanan Protokol Modern: Fuzzing dan Verifikasi Formal

### Konten Slide
- **Evolusi Keamanan di Luar Audit Manual:**
  - Audit kode manual oleh manusia terbukti tidak cukup untuk menangani kompleksitas ekosistem DeFi modern.
- **1. Property-Based & Invariant Fuzzing (Foundry, Echidna):**
  - Pengembang mendefinisikan kondisi matematika mutlak (*invariants*) yang wajib berlaku selamanya (misalnya: *"Total cadangan kas protokol harus selalu sama dengan total klaim token pengguna"*).
  - Mesin fuzzer otomatis membombardir smart contract dengan jutaan kombinasi transaksi acak untuk menemukan kondisi di mana invarian tersebut jebol.
- **2. Formal Verification (Certora, Halmos):**
  - Mengonversi logika kode smart contract menjadi proposisi matematika formal.
  - Menggunakan mesin pembukti matematis (*mathematical theorem provers*) untuk membuktikan secara absolut bahwa kode tidak memiliki celah logika tersembunyi.
- *Visual:* Ilustrasi radar fuzzer memecahkan ribuan skenario eksekusi dan simbol pembuktian matematika formal pada smart contract.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Audit manual saja tidak cukup; protokol modern membutuhkan pengujian invarian otomatis.
- Invariant fuzzing: menguji jutaan input acak untuk merusak aturan dasar sistem.
- Formal verification: membuktikan kebenaran kode smart contract secara matematis seperti membuktikan rumus fisika.

**Naskah Tutur (Voiceover Script):**
Di sisi pertahanan kode, industri juga telah melangkah jauh melampaui sekadar audit manual membaca dokumen.
Protokol modern hari ini dibangun menggunakan instrumen pengujian otomatis tingkat tinggi.
Metode pertama adalah Invariant Fuzzing menggunakan perkakas seperti Foundry dan Echidna.
Alih-alih menulis uji coba biasa, pengembang menetapkan aturan hukum mutlak yang disebut invarian sistem, misalnya: jumlah aset di dalam brankas tidak boleh pernah lebih kecil dari total saldo seluruh nasabah.
Kemudian mesin fuzzer akan membombardir smart contract tersebut dengan jutaan kombinasi transaksi acak yang liar untuk mencari tahu apakah ada celah langka yang bisa membuat aturan itu runtuh.
Metode kedua yang paling mutakhir adalah Formal Verification, menggunakan perkakas seperti Certora.
Metode ini menerjemahkan seluruh bytecode smart contract ke dalam persamaan logika matematika murni.
Sebuah mesin komputer pembukti teorema kemudian membuktikan secara matematis bahwa program tersebut tidak akan pernah bisa melanggar spesifikasinya dalam kondisi apa pun.
Ini adalah standar keamanan tertinggi yang diadopsi oleh protokol bernilai miliaran dolar.

---

## Slide 12: Perlindungan Pengguna: Private Mempools & Order Flow Auctions

### Konten Slide
- **Menyelamatkan Pengguna dari Hutan Gelap:**
  - Mengapa pengguna biasa harus membiarkan transaksi mereka diserang oleh bot di mempool publik?
- **1. Private RPC Endpoints (Flashbots Protect):**
  - Pengguna mengarahkan dompet mereka ke jalur koneksi privat (*private RPC*).
  - Transaksi dikirim langsung ke Block Builders terpercaya tanpa pernah disiarkan ke mempool publik.
  - Sepenuhnya menghilangkan risiko serangan Sandwich Attack dan Front-Running karena bot predator tidak bisa melihat transaksi yang belum selesai.
- **2. Order Flow Auctions (MEV-Share, MEV-Blocker):**
  - Jika transaksi pengguna menciptakan nilai arbitrase yang tak terhindarkan, protokol melelang hak arbitrase tersebut kepada searchers secara terkontrol.
  - Sebagian besar nilai keuntungan yang diekstrak (hingga 90 persen) dikembalikan secara otomatis langsung ke kantong dompet pengguna asli dalam bentuk *MEV cashback*.
- *Visual:* Diagram pengguna memotong jalur mempool publik berbahaya lewat pipa terlindung Private RPC menuju Block Builder disertai cashback.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bagaimana pengguna biasa melindungi diri dari bot predator mempool.
- Private RPC menyembunyikan transaksi dari pandangan publik hingga transaksi resmi ditambang.
- Order flow auctions bahkan mengembalikan keuntungan MEV kembali ke pengguna sebagai cashback.

**Naskah Tutur (Voiceover Script):**
Bagi kita sebagai pengguna biasa, bagaimana cara kita melindungi diri saat bertransaksi di atas ekosistem yang penuh predator ini?
Jawabannya adalah dengan keluar dari mempool publik menggunakan Private RPC Endpoints, seperti Flashbots Protect.
Kalian cukup mengganti alamat RPC di dompet kalian.
Saat kalian melakukan transaksi, transaksi kalian tidak disiarkan ke mempool publik yang bisa dilihat oleh bot.
Transaksi kalian dikirim langsung lewat terowongan privat ke komputer Block Builder terpercaya untuk langsung dimasukkan ke dalam blok.
Bot pencari di luar tidak bisa melihat transaksi kalian, sehingga serangan Sandwich Attack mustahil terjadi.
Bahkan inovasi terbaru seperti MEV-Share dan MEV-Blocker melangkah lebih jauh lewat mekanisme Order Flow Auctions.
Jika transaksi kalian memang menghasilkan pergeseran harga yang memicu arbitrase alami, protokol akan melelang peluang itu secara transparan kepada bot terdaftar.
Hingga sembilan puluh persen dari nilai keuntungan arbitrase tersebut akan langsung ditransfer kembali ke dompet kalian sebagai cashback MEV.
Kita berhasil mengubah ancaman predator menjadi nilai tambah bagi pengguna.

---

## Slide 13: Puncak Kurikulum Fundamentals: Menatap Masa Depan

### Konten Slide
- **Pencapaian Menuntaskan Trek Fundamentals:**
  - Anda telah menuntaskan seluruh fondasi teoretis, arsitektural, dan teori permainan dari sistem terdesentralisasi:
    - *01. Distributed Trust:* Dari batu Rai Yap hingga terobosan konsensus Nakamoto.
    - *02. Architecture & State:* Anatomi blok, model UTXO vs Account, dan mempool.
    - *03. Consensus & Game Theory:* Ketahanan Proof of Work, Proof of Stake, dan finalitas ekonomi.
    - *04. Virtual Machine & Gas:* Mesin Turing-complete, opcode EVM, dan batas komputasi gas.
    - *05. Decentralized Finance:* Standar token, likuiditas AMM, lending, dan tata kelola DAO.
    - *06. Scalability & Security:* Trilemma, Layer 2 rollups, jembatan lintas rantai, dan pertahanan MEV.
- **Gerbang Menuju Trek Rekayasa Spesialis:**
  - Anda kini memiliki kerangka berpikir yang kokoh untuk melangkah ke trek pembangunan teknis: **Builder Foundations** dan **Protocol Engineering**.
- *Visual:* Peta kurikulum enam bab yang telah selesai dipelajari, membuka pintu gerbang menuju pembangunan smart contract dan rekayasa protokol tingkat lanjut.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat!
- Ini adalah slide penutup dari seluruh Trek Fundamentals.
- Rangkum perjalanan dari uang kuno hingga sirkuit ZK dan MEV modern.
- Dorong peserta untuk melanjutkan ke trek praktik rekayasa berikutnya.

**Naskah Tutur (Voiceover Script):**
Selamat!
Kalian telah resmi menyelesaikan seluruh rangkaian pembelajaran di Trek Fundamentals.
Mari kita lihat kembali perjalanan intelektual luar biasa yang telah kita lalui bersama.
Kita memulai trek ini dari batu kapur raksasa Rai di Pulau Yap dan kayu Tally Stick di Inggris, membedah mengapa uang pada hakikatnya hanyalah sebuah ledger sosial.
Kita melihat bagaimana Satoshi Nakamoto menyatukan potongan puzzle tiga dekade menjadi Bitcoin, bagaimana Ethereum memperkenalkan komputer dunia lewat EVM, bagaimana AMM dan protokol DeFi mengoordinasikan modal global tanpa perantara bank, hingga bagaimana hari ini kita menembus batasan Blockchain Trilemma melalui Layer 2 rollups dan pertahanan MEV modern.
Kalian sekarang memegang pemahaman konseptual yang sangat mendalam tentang bagaimana teknologi buku besar terdistribusi bekerja dari prinsip-prinsip fisikanya yang paling mendasar.
Fondasi ini adalah bekal terkuat kalian untuk melangkah ke trek berikutnya: menulis smart contract tingkat lanjut di Builder Foundations, dan merancang protokol terdesentralisasi di Protocol Engineering.
Terima kasih telah berproses bersama kami di Trek Fundamentals, dan mari kita mulai membangun masa depan yang terdesentralisasi.
