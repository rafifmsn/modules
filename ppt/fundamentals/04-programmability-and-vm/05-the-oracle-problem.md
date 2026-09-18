# The Oracle Problem
Modul Presentasi: Programmability and Virtual Machines (04.5)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** The Oracle Problem
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Keterbatasan determinisme blockchain, arsitektur Decentralized Oracle Networks (DONs), push vs pull models, dan mitigasi flash loan oracle attacks.
- *Visual:* Ilustrasi jembatan kabel fiber optik kriptografis menghubungkan bola dunia nyata yang dinamis ke dalam kubus blockchain deterministik.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul penutup Chapter 4.
- Membahas salah satu paradoks terbesar blockchain: smart contract itu pintar tetapi buta terhadap dunia nyata.
- Menjelaskan bagaimana data off-chain dijembatani ke on-chain secara aman tanpa titik kegagalan tunggal.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kelima sekaligus penutup dari Chapter 4 trek Fundamentals.
Sepanjang modul-modul sebelumnya, kita telah mengagumi kecanggihan mesin virtual Ethereum, presisi pasar gas, dan fleksibilitas akun pintar terprogram.
Namun di balik semua kecanggihan komputasi tersebut, ada satu kenyataan yang sangat mengejutkan.
Smart contract di blockchain pada hakikatnya buta, tuli, dan terputus total dari dunia fisik kita.
Sebuah kontrak keuangan bernilai triliunan rupiah tidak bisa mengecek sendiri berapa kurs dolar hari ini atau apakah sebuah bencana alam baru saja terjadi.
Hambatan struktural dan risiko keamanan dalam menghubungkan data luar ke dalam blockchain ini dikenal sebagai The Oracle Problem.
Hari ini kita akan membedah mengapa blockchain dilarang keras melakukan HTTP request, bagaimana Decentralized Oracle Networks bekerja, serta bagaimana trik manipulasi harga flash loan bisa menguras ratusan juta dolar jika pengembang salah memilih arsitektur oracle.

---

## Slide 2: Paradoks Kebutaan Smart Contract

### Konten Slide
- **Definisi Populer Smart Contract:** Perjanjian komputasi otomatis berbasis aturan tegas (*if-then deterministic execution*):
  - *"Jika harga ETH anjlok di bawah 2.000 dolar, likuidasi agunan pinjaman milik Alice."*
  - *"Jika penerbangan maskapai tertunda lebih dari 2 jam, cairkan asuransi tiket untuk Bob."*
  - *"Jika Tim A memenangkan turnamen, bayarkan hadiah di pasar prediksi kepada Charlie."*
- **Paradoks Kebutaan Komputasi (The Blindness Paradox):**
  - Smart contract tidak dapat mengeksekusi HTTP `GET` request ke REST API internet.
  - Smart contract tidak dapat menghubungi database maskapai penerbangan atau sensor cuaca IoT.
  - Smart contract tidak dapat membaca papan harga saham Apple di bursa NASDAQ.
- **Dampak Keterisolasian:** Tanpa jembatan data eksternal, mayoritas use case revolusioner Web3 seperti DeFi, asuransi parametrik, dan pasar prediksi tidak akan pernah bisa berfungsi.
- *Visual:* Ilustrasi smart contract duduk di depan terminal komputer tetapi kabel internetnya terputus secara fisik.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Smart contract digadang-gadang mengeksekusi perjanjian otomatis jika syarat terpenuhi.
- Masalahnya: kontrak tidak bisa mengecek syarat dunia nyata sendiri.
- Tidak bisa browsing web, tidak bisa ping API, dan tidak bisa membaca harga pasar saham.

**Naskah Tutur (Voiceover Script):**
Di dalam literatur teknologi, smart contract sering dipromosikan sebagai perjanjian otomatis yang sangat revolusioner.
Logikanya tampak sangat sederhana: jika kondisi tertentu terjadi di dunia nyata, maka kontrak akan secara otomatis mencairkan dana.
Misalnya, jika harga pasar Ether turun di bawah dua ribu dolar, likuidasi agunan pinjaman Alice.
Atau jika jadwal pesawat terbang terlambat lebih dari dua jam, bayarkan klaim asuransi ke rekening Bob seketika.
Namun di balik narasi indah itu, ada paradoks yang sangat canggung.
Smart contract sama sekali tidak memiliki kemampuan untuk memeriksa apakah kondisi tersebut benar-benar sudah terjadi atau belum.
Smart contract tidak bisa membuka browser, tidak bisa menembak REST API bursa saham, dan tidak bisa mengecek data satelit cuaca.
Kontrak pintar tersebut terkurung di dalam dunianya sendiri.
Tanpa adanya jembatan informasi yang dapat dipercaya, seluruh visi besar aplikasi keuangan terdesentralisasi akan mandek total.

---

## Slide 3: Mengapa Blockchain Tidak Bisa Melakukan HTTP Request?

### Konten Slide
- **Pertanyaan Alami Pemula:** Mengapa pengembang protokol tidak menambahkan opcode sederhana seperti `OP_HTTP_GET` ke dalam EVM?
- **Pilar Mutlak Konsensus: Determinisme Tanpa Kompromi:**
  - Setiap full node di seluruh dunia wajib mengeksekusi transaksi yang sama dan menghasilkan **World State Root 32-byte yang identik secara mutlak**.
- **Skenario Keruntuhan Konsensus (The Non-Deterministic Collapse):**
  1. Node 1 di Tokyo memproses `HTTP_GET(binance_api)` pada detik 12:00:01.000 dan memperoleh harga **3.000,50 dolar**.
  2. Node 2 di Frankfurt memproses transaksi yang sama 500 milidetik kemudian dan memperoleh harga **3.001,20 dolar**.
  3. Node 3 di New York mengalami gangguan jaringan ISP dan menerima respon error `HTTP 504 Gateway Timeout`.
- **Konsekuensi Fatal:** Setiap node menghitung state root yang berbeda; konsensus global terpecah dan rantai blockchain mengalami *permanent hard fork*.
- *Visual:* Diagram percabangan fatal: tiga node di tiga benua mengeksekusi panggilan API yang sama namun menghasilkan tiga state root berbeda, membelah blockchain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kenapa developer Ethereum tidak membuat opcode HTTP GET saja?
- Karena konsensus menuntut determinisme mutlak bit per bit.
- Perbedaan latensi internet di tiap benua akan membuat angka API berbeda dan memecah jaringan menjadi ribuan fork.

**Naskah Tutur (Voiceover Script):**
Pertanyaan pertama yang selalu diajukan oleh developer software konvensional adalah: mengapa tim pengembang inti Ethereum tidak menambahkan satu opcode sederhana seperti HTTP GET ke dalam mesin virtual?
Mengapa kontrak tidak dibiarkan memanggil API web secara langsung?
Jawabannya kembali ke hukum sakral konsensus desentralistik: determinisme mutlak.
Setiap komputer validator di seluruh dunia wajib memverifikasi blok transaksi yang sama dan menghasilkan nilai hash state root yang persis sama.
Bayangkan apa yang terjadi jika smart contract diizinkan melakukan HTTP request ke server bursa Binance.
Komputer validator di Tokyo yang mengeksekusi kode pada detik pertama membaca harga Ether di angka tiga ribu koma lima puluh dolar.
Komputer validator di Frankfurt yang mengeksekusinya selang setengah detik kemudian mendapatkan harga tiga ribu satu koma dua puluh dolar karena harga pasar sudah bergerak.
Sementara validator di New York mengalami timeout internet dan mendapat pesan error lima ratus empat.
Ketika ketiga komputer ini mencatat hasil eksekusi ke database mereka, status angka mereka berbeda total.
Konsensus global hancur seketika dan blockchain terpecah menjadi ribuan cabang yang saling bertentangan.
Inilah alasan mengapa internet web tidak akan pernah boleh dipanggil langsung dari dalam mesin virtual blockchain.

---

## Slide 4: Definisi dan Tiga Peran Pokok Oracle

### Konten Slide
- **Prinsip Dasar Arsitektur:**
  - Data eksternal tidak pernah boleh ditarik (*pulled*) oleh smart contract secara mandiri.
  - Data eksternal wajib didorong (*pushed*) ke dalam blockchain oleh entitas luar melalui transaksi resmi yang bertanda tangan kriptografis.
- **Definisi Blockchain Oracle:** Entitas atau jaringan perantara yang bertugas memantau, memverifikasi, dan menyuntikkan data realitas off-chain ke dalam memori persistent smart contract.
- **Tiga Peran Sekuensial Oracle:**
  1. **Fetch (Mengambil):** Memindai dan membaca data dari satu atau banyak sumber eksternal (API bursa CEX/DEX, sensor IoT, Bloomberg terminal).
  2. **Attest (Mengesahkan):** Menstandardisasi format data dan membubuhkan tanda tangan digital menggunakan private key terpercaya.
  3. **Commit (Menyimpan):** Menyiarkan transaksi on-chain ke kontrak oracle untuk menulis data tersebut ke dalam storage publik blockchain.
- *Visual:* Diagram alur tiga tahap: API Dunia Nyata -> Pengesahan Tanda Tangan Digital -> Transaksi Masuk ke On-Chain Storage Slot.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Data tidak ditarik oleh kontrak, melainkan didorong masuk oleh entitas luar.
- Oracle adalah kurir data terpercaya antara dunia off-chain dan on-chain.
- Tiga tugas pokok oracle: Fetch (ambil data), Attest (tanda tangani secara kriptografis), dan Commit (tulis ke storage blockchain).

**Naskah Tutur (Voiceover Script):**
Karena blockchain tidak bisa keluar mencari data sendiri, maka arsitekturnya harus dibalik.
Data dari dunia luar harus didorong masuk ke dalam blockchain oleh pihak luar melalui sebuah transaksi resmi yang ditandatangani.
Pihak perantara inilah yang kita sebut sebagai Blockchain Oracle.
Nama oracle diambil dari mitologi Yunani kuno, yaitu sosok perantara tempat para manusia memohon petunjuk kebenaran dari para dewa.
Di ranah komputasi terdesentralisasi, sebuah oracle menjalankan tiga tugas utama secara berurutan.
Pertama adalah Fetch: oracle membaca data harga atau informasi cuaca dari berbagai sumber eksternal di luar jaringan.
Kedua adalah Attest: oracle merapikan format data tersebut lalu menandatanganinya dengan kunci privat kriptografis sebagai bukti keabsahan.
Ketiga adalah Commit: oracle menyiarkan transaksi biasa ke jaringan blockchain, lalu menuliskan angka tersebut ke dalam slot database storage smart contract.
Begitu data tersebut tersimpan di storage blockchain, angka itu telah menjadi data deterministik yang aman dan bisa dibaca dengan murah oleh aplikasi DeFi mana pun.

---

## Slide 5: Bahaya Mematikan Oracle Terpusat

### Konten Slide
- **Paradoks Oracle Sentral (The Centralized Oracle Paradox):**
  - Protokol DeFi dapat membangun arsitektur smart contract tanpa celah yang telah diaudit oleh firma keamanan elit dunia.
  - Namun jika protokol tersebut mengandalkan satu server API terpusat untuk memasok data harga, desentralisasi protokol musnah seketika.
- **Anatomi Vektor Serangan Murah:**
  - Penyerang tidak perlu membobol enkripsi Ethereum atau meretas private key validator.
  - Penyerang cukup menyuap pemilik server oracle, meretas kunci API, atau melancarkan serangan *DNS spoofing* dan *BGP routing hijack*.
- **Skenario Petaka Finansial:**
  - Jika server oracle palsu melaporkan harga 1 ETH setara dengan 0,01 dolar, mesin likuidasi protokol pinjaman akan bekerja otomatis sesuai kode.
  - Seluruh agunan pengguna jujur disita secara otomatis dan dijual kepada penyerang dengan harga nyaris nol.
- **Aksioma Keamanan:** Tingkat keamanan sebuah smart contract terdesentralisasi dibatasi secara mutlak oleh tingkat keamanan oracle yang memasok datanya.
- *Visual:* Ilustrasi brankas baja anti-gempa berkunci kriptografi super kuat, namun di sampingnya ada jendela kayu lapuk berlabel "Centralized Server Feed".

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Protokol DeFi bernilai miliaran dolar bisa runtuh jika memakai satu server oracle tunggal.
- Hacker tidak perlu meretas blockchain, cukup meretas satu server penyedia harga.
- Jika harga dipalsukan, kontrak pintar akan secara patuh melikuidasi pengguna yang tidak bersalah.

**Naskah Tutur (Voiceover Script):**
Di sinilah letak bahaya terbesar yang sering diremehkan oleh banyak developer pemula: mempercayai satu server oracle terpusat.
Kalian bisa saja menulis smart contract dengan kode yang sangat sempurna dan lulus audit keamanan kelas dunia.
Tetapi jika protokol DeFi kalian yang mengelola uang ratusan juta dolar hanya mengandalkan satu server atau satu alamat website untuk membaca harga koin, sistem kalian pada hakikatnya tidak terdesentralisasi.
Keamanan seluruh protokol kalian merosot jatuh mengikuti tingkat keamanan server tunggal tersebut.
Peretas profesional tidak akan membuang waktu mencoba meretas kriptografi blockchain Ethereum yang mustahil ditembus.
Mereka cukup meretas satu server penyedia harga, menyuap adminnya, atau memanipulasi jalur routing internet via DNS spoofing.
Jika peretas berhasil mengubah laporan harga Ether menjadi satu sen dolar saja selama beberapa detik, kontrak likuidasi otomatis akan langsung mengeksekusi instruksinya dengan patuh.
Aset agunan milik ribuan pengguna jujur akan disita dan dilelang ke peretas dengan harga sampah.
Ingatlah selalu aturan emas ini: sebuah smart contract hanya sekuat oracle yang memberinya makan data.

---

## Slide 6: Decentralized Oracle Networks (DONs)

### Konten Slide
- **Solusi Arsitektur:** Menghapus ketergantungan pada titik kegagalan tunggal dengan membangun jaringan simpul desentralistik, dipelopori oleh **Chainlink**.
- **Tiga Lapisan Redundansi Struktural:**
  1. *Banyak Operator Simpul Independen:* Puluhan operator infrastruktur profesional terkemuka (Deutsche Telekom, Swisscom, node operator tier-1) menjalankan simpul validator secara terpisah.
  2. *Banyak Sumber Data Terakreditasi:* Setiap node secara mandiri mengumpulkan data dari beragam aggregator institusional (CoinGecko, CoinMarketCap, Kaiko) untuk mencegah anomali glitch bursa tunggal.
  3. *Agregasi Konsensus Terdistribusi:* Laporan harga disaring dan digabungkan melalui konsensus agregat sebelum ditulis ke on-chain feed.
- **Model Antarmuka Baku:** Protokol membaca harga melalui antarmuka standar yang telah teruji pertempuran: `AggregatorV3Interface`.
- *Visual:* Bagan multi-level: Banyak API Bursa -> Banyak Node Independen -> Agregasi Konsensus Median -> Smart Contract Konsumen.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Chainlink memelopori konsep Decentralized Oracle Networks (DONs).
- Menggabungkan puluhan node profesional dan banyak sumber data bursa sekaligus.
- Data diagregasi bersama sehingga anomali pada satu website tidak merusak harga on-chain.

**Naskah Tutur (Voiceover Script):**
Untuk menyingkirkan titik kegagalan tunggal tersebut, para peneliti menciptakan arsitektur Decentralized Oracle Networks atau DONs, yang dipelopori oleh Chainlink.
Prinsipnya sederhana: kita mendesentralisasikan kurir pembawa datanya.
Sistem ini dibangun di atas tiga lapisan redundansi yang sangat kokoh.
Lapisan pertama adalah keberagaman operator simpul.
Jaringan merekrut puluhan operator infrastruktur enterprise independen di berbagai yurisdiksi hukum dunia.
Lapisan kedua adalah keberagaman sumber data.
Masing-masing operator simpul dilarang hanya membaca satu bursa saja.
Mereka diwajibkan mengambil data dari berbagai agregator data pasar tingkat institusi.
Jika ada satu bursa kripto mengalami kegagalan teknis atau flash crash lokal, anomali tersebut tidak akan mencemari pembacaan operator node lainnya.
Lapisan ketiga adalah konsensus agregasi, di mana seluruh laporan simpul disatukan dan disaring terlebih dahulu sebelum status harga final disahkan ke dalam blockchain.

---

## Slide 7: Mekanisme Konsensus Median dan Outlier Filtering

### Konten Slide
- **Mengapa Rata-Rata Aritmatika (Mean) Berbahaya?**
  - Menghitung rata-rata sederhana sangat rentan terhadap manipulasi nilai ekstrem (*outlier skewing*).
  - Satu node jahat yang menyuntikkan harga fiktif 1.000.000 dolar akan langsung mendistorsi rata-rata harga secara drastis.
- **Formula Konsensus Median Statistik:**
  $$\text{Consensus Price} = \text{Median}(P_1, P_2, P_3, \dots, P_n)$$
  - Mengurutkan seluruh laporan harga dari terendah hingga tertinggi dan mengambil nilai tepat di titik tengah.
- **Ketahanan Teori Permainan (Game-Theoretic Resilience):**
  - Menuntut penyerang untuk menguasai **lebih dari 50 persen simpul independen secara simultan** hanya untuk menggeser harga konsensus sebesar satu sen pun.
- **Insentif Kriptoekonomi:** Node wajib mengunci jaminan staking; simpul yang menyetor data menyimpang atau offline akan dikenai sanksi pemotongan jaminan (*slashing*) dan kehilangan reputasi.
- *Visual:* Ilustrasi perbandingan nilai rata-rata (terdistorsi oleh 1 angka ekstrem) versus nilai median (stabil di tengah mengabaikan angka pencilan).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Jangan pernah pakai rata-rata hitung biasa untuk data oracle.
- Menggunakan Median statistik: urutkan data, ambil angka paling tengah.
- Penyerang wajib menguasai lebih dari separuh node untuk memanipulasi hasil median.

**Naskah Tutur (Voiceover Script):**
Bagaimana jaringan oracle menyatukan puluhan angka laporan yang berbeda-beda menjadi satu angka harga resmi?
Banyak orang awam mengira sistem cukup menghitung nilai rata-rata biasa.
Ini adalah kesalahan matematika yang sangat fatal.
Di dalam statistika, rata-rata aritmatika sangat mudah dirusak oleh satu angka ekstrem.
Bayangkan ada sembilan node melaporkan harga tiga ribu dolar, dan ada satu node jahat melaporkan harga satu triliun dolar.
Jika kita memakai rata-rata hitung biasa, harga konsensus akan seketika meledak jutaan persen.
Oleh karena itu, jaringan oracle terdesentralisasi selalu menggunakan nilai Median statistik.
Seluruh laporan harga diurutkan dari yang paling murah hingga paling mahal, lalu sistem mengambil angka yang berada persis di tengah-tengah.
Penggunaan nilai median ini memberikan ketahanan matematis yang luar biasa.
Meskipun ada empat puluh persen node mencoba memanipulasi angka secara ekstrem, angka median tetap tidak akan bergeming sedikit pun.
Seorang penyerang dipaksa harus menguasai secara fisik lebih dari lima puluh persen dari seluruh node independen di dunia secara bersamaan hanya untuk membelokkan harga konsensus sebesar satu rupiah saja.

---

## Slide 8: Arsitektur Push Oracle: Model Klasik Chainlink

### Konten Slide
- **Mekanisme Operasional Push:**
  - Jaringan node oracle secara aktif memantau pasar off-chain tanpa henti.
  - Pembaruan harga ke Layer 1 dipicu oleh dua parameter baku:
    - **Deviation Threshold:** Jika deviasi harga pasar bergerak melampaui batas toleransi (contoh: pergeseran harga $\ge 0,5\%$).
    - **Heartbeat Timer:** Jika deviasi tidak tercapai, pembaruan wajib dikirimkan secara berkala (contoh: minimal sekali setiap 1 jam).
  - Transaksi L1 dikirim oleh node oracle untuk memperbarui storage variable on-chain.
- **Keunggulan Desain (Pros):**
  - Integrasi kontrak konsumen sangat sederhana; dApp cukup memanggil fungsi read-only `latestRoundData()` secara instan.
- **Kelemahan Biaya (Cons):**
  - Biaya gas sangat boros; operator oracle wajib terus membayar gas mahal di Layer 1 meskipun sedang tidak ada pengguna yang bertransaksi pada pasangan aset tersebut.
- *Visual:* Diagram alur Push: Timer berdetik / deviasi 0,5% memicu transaksi oracle mendorong data ke storage on-chain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Push Oracle memperbarui harga secara berkala atau saat harga bergeser di atas 0,5%.
- Sangat mudah dibaca oleh developer smart contract dengan memanggil satu baris fungsi.
- Kelemahannya: biaya gas sangat mahal bagi operator oracle di jaringan utama.

**Naskah Tutur (Voiceover Script):**
Di industri Web3, ada dua pola arsitektur utama untuk menyalurkan data oracle ke blockchain.
Pola pertama adalah Push Oracle, yang merupakan model klasik dari Chainlink.
Pada model Push, kurir oracle secara aktif mendorong data ke dalam smart contract.
Kapan data didorong masuk?
Ada dua pemicu utama.
Pemicu pertama adalah batas deviasi: jika harga di pasar bursa luar bergerak lebih dari nol koma lima persen dari harga terakhir di rantai, node oracle akan langsung mengirim transaksi pembaruan.
Pemicu kedua adalah heartbeat: jika harga pasar tenang dan tidak bergerak, oracle tetap wajib mengirimkan data minimal satu jam sekali untuk membuktikan bahwa jaringannya masih hidup.
Keunggulan model ini adalah kemudahan bagi developer aplikasi.
Developer cukup memanggil fungsi latestRoundData, dan harga terbaru langsung terbaca dalam satu instruksi cepat.
Namun kelemahannya terletak pada pemborosan biaya gas.
Operator oracle harus membakar biaya bahan bakar gas yang sangat mahal di Layer 1 sepanjang hari, bahkan ketika tidak ada satu pun pengguna yang sedang melakukan trading di pasar tersebut.

---

## Slide 9: Arsitektur Pull Oracle: Inovasi Pyth Network

### Konten Slide
- **Mekanisme Operasional Pull (On-Demand Updates):**
  - Node oracle mengalirkan ribuan pembaruan harga berkecepatan tinggi di luar rantai (*off-chain high-frequency streaming*, interval 400 milidetik).
  - Pembaruan harga ditandatangani secara kriptografis menggunakan jaringan jembatan (*Wormhole attestation*).
  - Harga **tidak pernah** ditulis ke blockchain jika tidak ada pengguna yang membutuhkannya.
- **Alur Eksekusi In-Flight Verification:**
  - Saat pengguna ingin mengeksekusi swap atau likuidasi di dApp, transaksi pengguna mengambil bukti harga kriptografis terbaru dari stream off-chain.
  - Pengguna melampirkan bukti tersebut ke dalam payload transaksi mereka sendiri.
  - Smart contract memverifikasi tanda tangan digital harga secara instan dalam transaksi yang sama sebelum mengeksekusi swap.
- **Keunggulan Revolusioner:** Latensi sub-detik (cocok untuk bursa perpetual berkecepatan tinggi) dan nol pemborosan gas di pihak penyedia oracle.
- *Visual:* Diagram alur Pull: Stream harga cepat di off-chain diambil oleh pengguna lalu dimasukkan ke dalam satu transaksi bersama trade-nya.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pull Oracle tidak menulis harga ke blockchain jika tidak ada yang meminta.
- Data mengalir ribuan kali per detik di luar rantai secara terenkripsi.
- Pengguna membawa sendiri bukti harga terbaru di dalam transaksi trading mereka.

**Naskah Tutur (Voiceover Script):**
Untuk mengatasi pemborosan biaya gas dan kebutuhan kecepatan tinggi, lahirlah inovasi kedua yang disebut Pull Oracle, yang dipelopori oleh protokol seperti Pyth Network.
Filosofi model Pull ini berbanding terbalik dengan Push.
Jaringan oracle tidak membuang-buang gas menulis harga ke database blockchain jika tidak ada transaksi yang sedang berlangsung.
Sebagai gantinya, ribuan pembaruan harga dialirkan di luar rantai setiap empat ratus milidetik sekali dengan dibubuhi tanda tangan kriptografis.
Ketika seorang trader ingin membuka posisi di bursa perpetual, dompet pengguna secara otomatis memungut bukti harga terbaru dari aliran data luar tersebut, lalu menempelkannya ke dalam transaksi yang sama.
Begitu transaksi tiba di smart contract, kontrak memverifikasi keabsahan tanda tangan kriptografi harga tersebut di detik yang sama, memperbarui harga sesaat, lalu mengeksekusi order trading pengguna.
Siapa yang membayar biaya gas verifikasi pembaruan tersebut?
Pengguna yang sedang bertransaksi itulah yang menanggung biayanya.
Arsitektur ini menghasilkan latensi harga di bawah satu detik yang sangat presisi tanpa membebani operator dengan tagihan gas yang sia-sia.

---

## Slide 10: Anatomi Serangan Flash Loan Oracle Manipulation

### Konten Slide
- **Kesalahan Desain Fatal DeFi:** Menggunakan rasio cadangan Automated Market Maker (AMM) seperti Uniswap V2 secara langsung sebagai referensi harga aset:
  $$\text{Spot Price}_{\text{naive}} = \frac{\text{Reserve}_Y}{\text{Reserve}_X}$$
- **Sifat Pinjaman Flash Loan:**
  - Mengizinkan siapa pun meminjam modal hingga puluhan juta dolar tanpa agunan fisik apa pun.
  - Syarat mutlak: Pinjaman pokok beserta bunga kecil wajib dikembalikan seutuhnya di dalam blok transaksi atomik yang sama.
- **Tahapan Eksploitasi Serangan Tunggal:**
  1. *Pinjam Modal Raksasa:* Meminjam 50 juta dolar stablecoin via Flash Loan dari Aave.
  2. *Manipulasi Rasio Pool:* Mengguyur seluruh 50 juta dolar ke kolam Uniswap, mendistorsi rasio cadangan dan memompa harga Token ABC menjadi 100 kali lipat lebih mahal.
  3. *Kuras Protokol Korban:* Menyetor Token ABC ke protokol lending naif yang membaca spot price Uniswap; meminjam aset nyata bernilai puluhan juta dolar dengan agunan yang telah digelembungkan.
  4. *Pulihkan & Lunasi:* Menjual kembali token untuk memulihkan saldo dan melunasi Flash Loan di akhir transaksi, mengantongi keuntungan bersih secara instan.
- *Visual:* Sequence diagram alur serangan kilat: Pinjam Flash Loan -> Manipulasi Pool AMM -> Kuras Lending Protocol -> Lunasi Pinjaman dalam satu blok transaksi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Jangan pernah menggunakan spot price AMM langsung sebagai harga oracle.
- Flash loan memungkinkan hacker meminjam puluhan juta dolar tanpa agunan dalam 1 blok.
- Hacker memompa harga token secara artifisial, menguras lending protocol, lalu membayar utang flash loan seketika.

**Naskah Tutur (Voiceover Script):**
Sekarang kita tiba pada salah satu babak paling gelap sekaligus paling menarik dalam sejarah keamanan Web3: Flash Loan Oracle Manipulation Attack.
Banyak developer DeFi yang malas mencari oracle resmi memilih jalan pintas yang sangat berbahaya.
Mereka menghitung harga token hanya dengan membagi rasio cadangan likuiditas di Uniswap pool.
Mereka mengira harga di Uniswap selalu mencerminkan harga pasar yang adil.
Asumsi ini menjadi celah maut dengan hadirnya Flash Loan.
Flash Loan memungkinkan siapa pun meminjam dana hingga puluhan juta dolar tanpa jaminan apa pun, asalkan uang tersebut dikembalikan di blok transaksi yang sama persis.
Mari kita lihat bagaimana penyerang mengeksploitasinya.
Dalam satu kedipan mata, penyerang meminjam lima puluh juta dolar dari Aave.
Uang tersebut langsung diguyur ke pool Uniswap, membuat harga Token ABC melonjak seratus kali lipat secara instan.
Lalu penyerang datang ke protokol lending korban.
Protokol korban yang naif membaca bahwa harga token ABC sedang meroket seratus kali lipat, sehingga mengizinkan penyerang meminjam puluhan juta dolar aset nyata lain dengan jaminan token ABC tersebut.
Di baris transaksi berikutnya, penyerang menyeimbangkan kembali pool dan melunasi utang flash loan-nya.
Penyerang membawa lari uang curian puluhan juta dolar, meninggalkan protokol korban dengan tumpukan kredit macet yang tak tertolong.

---

## Slide 11: Pelajaran dari Dunia Nyata: Mango Markets dan Harvest Finance

### Konten Slide
- **Tragedi Mango Markets (Solana, Oktober 2022):**
  - Kerugian dana mencapai **114 juta dolar**.
  - Eksploiter mendepositkan modal besar dan memanipulasi buku pesanan token MNGO di pasar spot.
  - Peningkatan harga artifisial tersebut memicu mesin risiko mengizinkan penyerang meminjam seluruh likuiditas USDC, MSOL, dan BTC dari protokol.
- **Tragedi Harvest Finance (Ethereum, Oktober 2020):**
  - Kerugian dana mencapai **34 juta dolar** dalam hitungan menit.
  - Penyerang menggunakan flash loan untuk memanipulasi rasio harga spot kolam Curve Y-pool secara berulang-ulang (*arbitrage loop*), menguras pundi brankas deposito vault pengguna.
- **Pelajaran Rekayasa Sistemik:**
  - Harga spot sesaat (*instantaneous spot price*) bukanlah representasi kebenaran pasar, melainkan kondisi saldo cadangan transien yang sangat rapuh.
- *Visual:* Kronologi timeline dua petaka besar DeFi akibat kegagalan arsitektur oracle spot price.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ini bukan teori di atas kertas, tapi bencana nyata yang menguras ratusan juta dolar.
- Kasus Mango Markets merugikan 114 juta dolar di Solana.
- Kasus Harvest Finance menguras 34 juta dolar di Ethereum akibat manipulasi kolam Curve.

**Naskah Tutur (Voiceover Script):**
Eksploitasi manipulasi oracle ini bukanlah sekadar simulasi laboratorium, melainkan bencana nyata yang telah menelan kerugian ratusan juta dolar di industri kripto.
Contoh paling mengguncang terjadi pada protokol Mango Markets di jaringan Solana pada bulan Oktober 2022.
Seorang penyerang berhasil memanipulasi perhitungan harga spot token MNGO.
Karena sistem risiko Mango Markets mempercayai kenaikan harga manipulatif tersebut, sistem mengizinkan sang penyerang meminjam hampir seluruh cadangan likuiditas koin stabil dan Bitcoin milik protokol, merugikan pengguna sebesar seratus empat belas juta dolar.
Dua tahun sebelumnya pada Oktober 2020, protokol Harvest Finance di Ethereum juga dibobol sebesar tiga puluh empat juta dolar dalam beberapa menit saja.
Penyerang menggunakan modal flash loan raksasa untuk membolak-balik rasio cadangan kolam likuiditas Curve, sehingga brankas deposit Harvest mengira nilai sahamnya telah berlipat ganda.
Pelajaran pahit dari peristiwa-peristiwa ini sangat jelas: harga spot sesaat di sebuah kolam likuiditas tidak pernah mencerminkan nilai pasar yang sesungguhnya.
Harga spot hanyalah status saldo sementara yang bisa diputarbalikkan dalam satu transaksi atomik.

---

## Slide 12: Solusi Pertahanan: Uniswap V2 TWAP

### Konten Slide
- **Mengapa Flash Loan Berhasil Memanipulasi Spot Price?**
  - Pinjaman flash loan hidup dan mati di dalam rentang waktu fisik **nol detik** ($\Delta t = 0$).
- **Inovasi Time-Weighted Average Price (TWAP):**
  - Uniswap V2 menghapus celah manipulasi atomik dengan memperkenalkan **Cumulative Price Accumulator** yang mencatat integral harga terhadap waktu:
  $$a_t = \sum_{i=1}^t P_i \times \Delta t_i$$
- **Formula Perhitungan Rata-Rata Berbobot Waktu (TWAP):**
  $$\text{TWAP}_{[t_1, t_2]} = \frac{a_{t_2} - a_{t_1}}{t_2 - t_1}$$
- **Kekebalan Mutlak Terhadap Flash Loan:**
  - Karena durasi flash loan adalah $\Delta t = 0$, serangan flash loan memiliki kontribusi matematis nol terhadap akumulator nilai kumulatif.
  - Untuk memanipulasi TWAP berdurasi 30 menit, penyerang harus mengunci modal puluhan juta dolar di posisi harga menyimpang selama puluhan blok berturut-turut, membuka diri terhadap risiko kerugian arbitrase masif dari pedagang lain.
- *Visual:* Grafik matematis integral area di bawah kurva: manipulasi spike nol detik tidak mengubah akumulasi luasan TWAP.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Solusi pertahanan terhadap flash loan: Time-Weighted Average Price (TWAP).
- TWAP mengukur akumulasi harga dikalikan jeda waktu antar-blok.
- Karena flash loan berdurasi nol detik, manipulasi kilat tidak mempan terhadap TWAP.

**Naskah Tutur (Voiceover Script):**
Bagaimana komunitas pengembang menangkal serangan flash loan yang mematikan ini?
Uniswap V2 memperkenalkan terobosan matematika pertahanan yang sangat elegan bernama Time-Weighted Average Price atau TWAP.
Para peneliti menyadari satu titik kelemahan fundamental dari flash loan.
Sebesar apa pun modal yang dipinjam dalam flash loan, pinjaman tersebut hanya hidup di dalam satu blok transaksi yang sama, artinya selang waktu fisiknya adalah tepat nol detik.
Uniswap V2 menambahkan variabel akumulator harga kumulatif.
Setiap kali ada blok baru, harga token dikalikan dengan selang waktu sejak blok sebelumnya lalu dijumlahkan secara berkesinambungan.
Untuk menghitung harga rata-rata TWAP selama tiga puluh menit terakhir, kita cukup membagi selisih akumulator tersebut dengan selisih waktu tiga puluh menit.
Apa dampaknya terhadap keamanan?
Karena serangan flash loan terjadi pada durasi waktu nol detik, lonjakan harga sesaat dari hacker memiliki dampak nol mutlak terhadap akumulator TWAP.
Jika seorang hacker nekat ingin menggeser angka TWAP tiga puluh menit, dia terpaksa harus menahan modal ratusan miliar rupiah di harga yang rusak selama ratusan blok berturut-turut.
Tindakan itu akan menjadi bunuh diri finansial karena trader arbitrase lain di seluruh dunia akan langsung menyerbu dan memangsa likuiditas sang peretas hingga bangkrut.

---

## Slide 13: Jembatan ke Chapter Berikutnya (Decentralized Systems)

### Konten Slide
- **Capaian Lengkap Chapter 4 (Programmability and Virtual Machines):**
  - Kita telah menuntaskan seluruh lapisan komputasi dan eksekusi blockchain.
  - Memahami transisi dari skrip statis Bitcoin menuju komputer dunia Turing-complete.
  - Menguasai arsitektur internal EVM, alokasi memori, dan interaksi antar-kontrak.
  - Menguasai ekonomi pasar bahan bakar gas dan kestabilan EIP-1559.
  - Menjelajahi evolusi akun pintar melalui standar ERC-4337.
  - Mengamankan jembatan data dunia nyata melalui arsitektur oracle terdesentralisasi.
- **Pertanyaan Transformasi Kelembagaan Manusia:**
  - Ketika kode program mampu mengelola miliaran dolar modal, bagaimana cara manusia mengoordinasikan keputusannya tanpa dewan direksi perusahaan?
  - Bagaimana **Decentralized Autonomous Organizations (DAOs)** menyepakati tata kelola terdesentralisasi?
  - Bagaimana merancang arsitektur **Tokenomics** yang adil tanpa terjerumus skema piramida?
- **Materi Chapter Berikutnya:** Melangkah dari ranah mesin virtual ke ranah kelembagaan sosial: **Chapter 5: Decentralized Systems and Governance**.
- *Visual:* Peta kurikulum: Lapisan Virtual Machine selesai di bawah, membuka pintu ke lapisan atas Governance, DAOs, dan Tokenomics.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat, Chapter 4 tuntas kita pelajari seutuhnya.
- Dari kode mesin virtual, kini kita naik ke koordinasi manusia dan tata kelola institusi.
- Teaser materi Chapter 5: Decentralized Systems and Governance (DAOs, Tokenomics, dan Kedaulatan Digital).

**Naskah Tutur (Voiceover Script):**
Luar biasa, kita telah menuntaskan seluruh perjalanan panjang di Chapter 4: Programmability and Virtual Machines.
Kita telah menguasai seluruh lapisan tumpukan teknologi komputasi Web3 dari fondasi paling bawah hingga puncaknya.
Kita belajar bagaimana keterbatasan Bitcoin Script melahirkan visi komputer dunia Ethereum.
Kita membedah jeroan mesin virtual EVM, memahami hukum ekonomi gas yang menjaga jaringan dari kehancuran, menjelajahi akun pintar ERC-4337, dan memecahkan The Oracle Problem untuk menghubungkan blockchain dengan realitas fisik dunia.
Namun teknologi blockchain bukan semata-mata tentang kode mesin biner.
Blockchain pada hakikatnya adalah teknologi koordinasi manusia dan tatanan kelembagaan baru.
Ketika kode program mengendalikan triliunan rupiah modal masyarakat, siapa yang berhak mengubah aturan mainnya?
Bagaimana ribuan manusia anonim dari seluruh penjuru bumi bisa berorganisasi dan mengambil keputusan bersama tanpa perlu kantor fisik atau dewan komisaris melalui Decentralized Autonomous Organizations?
Bagaimana kita merancang sistem ekonomi tokenomics yang sehat dan adil tanpa runtuh menjadi gelembung spekulasi?
Untuk meneliti bagaimana blockchain merevolusi koordinasi peradaban manusia, di bab selanjutnya kita akan melangkah masuk ke dalam: Chapter 5: Decentralized Systems and Governance.
Terima kasih atas antusiasme kalian, dan sampai jumpa di bab berikutnya.
