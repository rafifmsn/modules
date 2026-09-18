# Gas Economics and Execution Halting
Modul Presentasi: Programmability and Virtual Machines (04.3)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Gas Economics and Execution Halting
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Mekanisme pasar komputasi terdesentralisasi, arsitektur dinamis EIP-1559, dan status terminasi eksekusi smart contract.
- *Visual:* Ilustrasi pompa bahan bakar digital mengalirkan gas ke mesin virtual dengan grafik penyesuaian harga dinamis.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul ketiga Chapter 4.
- Membedah ekonomi bahan bakar komputasi di blockchain.
- Menjelaskan mengapa komputasi terdesentralisasi membutuhkan meteran harga yang ketat.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga dari Chapter 4.
Pada sesi sebelumnya, kita sudah membedah arsitektur internal Ethereum Virtual Machine dan bagaimana opcode beroperasi.
Namun ada satu kenyataan fisik yang tidak boleh kita lupakan.
Komputasi di blockchain itu luar biasa langka dan mahal.
Setiap instruksi program tidak dijalankan satu kali di satu server cloud, melainkan dijalankan berulang kali secara redundan oleh puluhan ribu validator independen di seluruh dunia.
Setiap baris data persisten juga disalin ke ribuan SSD fisik secara permanen.
Bagaimana cara sistem mengalokasikan sumber daya komputasi yang sangat langka ini secara adil tanpa mengorbankan keamanan jaringan?
Hari ini kita akan membedah tuntas Gas Economics dan Execution Halting.
Kita akan melihat mengapa gas dipisahkan dari mata uang Ether, bagaimana revolusi EIP-1559 menstabilkan biaya transaksi, dan apa yang terjadi di tingkat mesin saat transaksi gagal di tengah jalan.

---

## Slide 2: Mengapa Memisahkan Gas dari Ether?

### Konten Slide
- **Dilema Volatilitas Pasar Kripto:**
  - Harga pasar mata uang kripto (Ether) berfluktuasi liar setiap detik berdasarkan spekulasi pasar global.
  - Menetapkan tarif komputasi langsung dalam satuan koin akan membuat biaya menjalankan aplikasi berubah-ubah secara drastis setiap hari.
- **Lapisan Penyekat (The Decoupling Insulation):**
  - **Gas Units (Ukuran Kerja Fisik Murni):**
    - Merefleksikan beban nyata komputasi CPU dan memori validator.
    - Tarif bersifat statis dalam protokol: `ADD` selalu berbiaya 3 gas; `SSTORE` selalu berbiaya 20.000 gas.
    - Nilai ini tidak pernah berubah terlepas dari harga ETH di bursa berada di 10 dolar atau 10.000 dolar.
  - **Gas Price (Lelang Pasar Bebas):**
    - Dinyatakan dalam satuan **gwei** ($1 \text{ gwei} = 10^{-9} \text{ ETH}$).
    - Naik dan turun secara dinamis mengikuti tingkat kepadatan antrean ruang blok (*block space*).
- *Visual:* Diagram isolasi: pasar ETH berfluktuasi di luar, Gas Units tetap konstan di dalam mesin, terhubung oleh tuas fleksibel Gas Price.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pertanyaan mendasar: kenapa tidak pakai ETH langsung untuk tarif transaksi?
- Gas adalah satuan kerja fisik CPU, sedangkan ETH adalah aset finansial.
- Memisahkan keduanya melindungi biaya komputasi dari spekulasi harga pasar.

**Naskah Tutur (Voiceover Script):**
Banyak pemula sering bertanya: mengapa Ethereum harus menciptakan konsep gas dan tidak langsung menetapkan biaya transaksi dalam satuan koin Ether saja?
Jawabannya terletak pada volatilitas harga pasar.
Nilai tukar koin kripto seperti Ether bisa naik turun puluhan persen hanya dalam hitungan hari.
Bayangkan jika biaya mengeksekusi satu smart contract dipatok langsung sebesar 0,01 Ether.
Ketika harga Ether naik dari seratus dolar ke empat ribu dolar, biaya menjalankan aplikasi kalian akan seketika melonjak empat puluh kali lipat tanpa ada perubahan beban komputasi di dunia nyata.
Untuk mencegah kekacauan ini, Ethereum memisahkan kerja fisik dari aset keuangannya.
Jumlah unit gas mencerminkan kerja fisik prosesor dan memori yang selalu konstan.
Menjumlahkan dua angka akan selalu memakan tiga gas, baik di tahun 2015 maupun di tahun 2030.
Sementara itu, harga gas per unitnya yang dihitung dalam gwei dibiarkan mengapung mengikuti hukum permintaan dan penawaran ruang blok.

---

## Slide 3: The Intrinsic Gas Floor

### Konten Slide
- **Syarat Mutlak Transaksi:** Sebelum EVM memproses opcode pertama, setiap transaksi wajib membayar biaya dasar tidak dapat dikembalikan (*non-refundable*) yang disebut **Intrinsic Gas** ($G_{\text{intrinsic}}$).
- **Formula Intrinsic Gas:**
  $$G_{\text{intrinsic}} = 21.000 + G_{\text{calldata}} + G_{\text{creation}} + G_{\text{access\_list}}$$
- **Komponen Biaya Dasar:**
  - *21.000 Gas Standar:* Menutup beban verifikasi kurva eliptik ECDSA (`ecrecover`), pembaruan nonce akun, dan penulisan saldo ke disk trie.
  - *Biaya Calldata:*
    - **4 gas** untuk setiap byte bernilai nol (`0x00`) karena kompresinya sangat efisien.
    - **16 gas** untuk setiap byte bukan nol yang menuntut bandwidth riil.
  - *Contract Creation (32.000 gas):* Biaya inisialisasi node status baru jika transaksi membuat smart contract baru.
- **Pertahanan Mempool:** Transaksi dengan `gasLimit` di bawah $G_{\text{intrinsic}}$ akan langsung ditolak oleh node tanpa sempat masuk ke antrean eksekusi.
- *Visual:* Bagan tangga biaya dasar: 21.000 baseline ditambah calldata dan biaya inisialisasi akun baru.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Setiap transaksi punya batas biaya minimal bernama intrinsic gas.
- Transfer ETH biasa selalu memakan minimal 21.000 gas.
- Byte bukan nol di calldata dihargai 16 gas karena memakan bandwidth jaringan.

**Naskah Tutur (Voiceover Script):**
Sebelum mesin virtual mulai membaca satu baris instruksi pun di smart contract, sistem mewajibkan setiap transaksi membayar biaya masuk minimum yang disebut Intrinsic Gas.
Biaya dasar ini adalah lantai paling bawah dari konsumsi bahan bakar jaringan.
Untuk sebuah transfer sederhana antar-rekening biasa, biayanya dipatok tepat dua puluh satu ribu gas.
Angka ini bukan angka sembarangan.
Dua puluh satu ribu gas ini dihitung secara presisi untuk menutupi beban kerja komputer dalam memverifikasi tanda tangan digital kurva eliptik pengirim, menaikkan nomor nonce akun, dan mencatat mutasi saldo ke database trie.
Jika transaksi membawa data tambahan atau calldata, setiap byte nol dikenakan biaya empat gas, dan setiap byte bukan nol dikenakan tarif enam belas gas.
Bahkan jika kalian membuat smart contract baru, ada biaya pembukaan akun baru sebesar tiga puluh dua ribu gas.
Jika pengguna mengirim transaksi dengan gasLimit di bawah batas intrinsic gas ini, komputer validator akan langsung membuang transaksi tersebut dari mempool tanpa mau menyalakan mesin virtualnya.

---

## Slide 4: Era First-Price Auction dan Kerapuhannya

### Konten Slide
- **Mekanisme Pasar Pra-London Hard Fork (Sebelum Agustus 2021):**
  - Ethereum menggunakan lelang harga pertama (*blind first-price auction*).
  - Pengguna hanya mengajukan satu angka penawaran: `gasPrice`.
  - Penambang menyortir transaksi murni berdasarkan penawaran tertinggi dan mengantongi 100 persen biaya tersebut.
- **Tiga Cacat Struktural First-Price Auction:**
  - *Ketidakpastian Ekstrem:* Pengguna tidak tahu berapa harga yang wajar dan sering kali membayar jauh terlalu mahal (*drastic overpaying*) demi kepastian transaksi.
  - *Lonjakan Volatilitas Liar:* Saat terjadi minting NFT populer atau kepanikan pasar DeFi, gas price meroket ribuan persen dalam beberapa detik.
  - *Insentif Manipulasi Penambang:* Penambang dapat memasukkan transaksi fiktif buatan sendiri untuk memompa harga dasar lelang demi keuntungan sepihak.
- *Visual:* Grafik simulasi perang lelang gas yang bergerigi tajam pada model first-price auction lama.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Sebelum 2021, lelang gas memakai first-price auction tradisional.
- Siapa bayar paling tinggi, transaksinya masuk duluan.
- Masalahnya: pengguna sering overpay dan penambang bisa memanipulasi lelang.

**Naskah Tutur (Voiceover Script):**
Sebelum bulan Agustus 2021, pasar biaya transaksi di Ethereum dijalankan dengan mekanisme lelang konvensional bernama first-price auction.
Cara kerjanya sangat primitif: pengguna memasukkan satu angka penawaran harga gas ke dalam transaksinya.
Penambang yang serakah tentu saja akan memilih transaksi dengan tawaran harga tertinggi untuk dimasukkan ke dalam blok, dan mereka berhak mengantongi seluruh biaya tersebut ke kantong pribadi mereka.
Sistem ini terbukti sangat rapuh saat ekosistem Ethereum berkembang pesat.
Pengguna mengalami kebingungan luar biasa karena tidak pernah tahu berapa tarif lelang yang sebenarnya cukup.
Akibatnya, orang-orang saling melompat mengajukan harga yang jauh terlalu mahal hanya demi memastikan transaksinya tidak tersangkut berjam-jam.
Ketika ada peluncuran NFT populer atau gejolak likuidasi pasar DeFi, perang lelang ini membuat biaya gas melonjak ribuan persen seketika.
Selain itu, penambang bisa dengan mudah memanipulasi lelang dengan menyusupkan transaksi palsu mereka sendiri untuk menaikkan harga pasar secara artifisial.

---

## Slide 5: Revolusi EIP-1559: Arsitektur Dual-Fee

### Konten Slide
- **Aktivasi London Hard Fork (Agustus 2021):** Restrukturisasi radikal mekanisme pasar biaya Ethereum melalui proposal **EIP-1559**.
- **Dekonstruksi Biaya Transaksi Menjadi Dua Komponen:**
  1. **Base Fee (Algoritmik & Wajib):**
     - Dihitung secara otomatis oleh protokol konsensus berdasarkan utilisasi blok sebelumnya.
     - Berlaku seragam untuk seluruh transaksi di dalam satu blok yang sama.
     - **Dimusnahkan 100 persen (Burned):** Koin ETH yang terkumpul sebagai base fee dihapus permanen dari peredaran.
  2. **Priority Fee / Tip (Insentif Validator):**
     - Pembayaran tip opsional yang disetel langsung oleh pengguna.
     - Diberikan seutuhnya kepada block proposer untuk memprioritaskan urutan transaksi di dalam blok.
- **Tujuan Arsitektur:** Menghadirkan estimasi biaya yang dapat diprediksi secara transparan oleh dompet pengguna.
- *Visual:* Skema percabangan biaya transaksi: Base Fee diarahkan ke wadah pembakaran (burn) dan Tip dialirkan ke validator.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- EIP-1559 mengubah total cara pembayaran gas di Ethereum.
- Biaya dipecah dua: Base Fee yang dihitung protokol dan Priority Fee yang menjadi tip validator.
- Base Fee wajib dibakar habis, bukan diberikan ke penambang.

**Naskah Tutur (Voiceover Script):**
Untuk mengakhiri kegilaan perang lelang tersebut, pada hard fork London tahun 2021, Ethereum mengaktifkan proposal bersejarah bernama EIP-1559.
Inovasi inti dari EIP-1559 adalah memecah struktur biaya transaksi menjadi dua komponen yang terpisah.
Komponen pertama disebut Base Fee.
Base Fee ini tidak lagi ditentukan oleh penawaran pengguna, melainkan dihitung secara matematis oleh algoritma protokol konsensus.
Setiap transaksi di dalam satu blok yang sama wajib membayar Base Fee yang setara.
Yang paling radikal: seratus persen dari Base Fee ini langsung dimusnahkan atau dibakar dari peredaran selamanya.
Komponen kedua disebut Priority Fee atau tip.
Ini adalah uang tip sukarela yang diberikan langsung ke saku validator agar transaksi kita diproses di urutan paling depan saat antrean padat.
Dengan pemisahan ini, aplikasi dompet digital bisa menampilkan biaya transaksi secara transparan dan akurat tanpa tebak-tebakan lagi.

---

## Slide 6: Mekanisme Base Fee Burning dan Dampak Moneter

### Konten Slide
- **Rasionalitas Keamanan: Mengapa Base Fee Wajib Dibakar?**
  - Jika Base Fee diserahkan kepada validator, validator dan pengguna dapat berkolusi di luar jaringan (*off-chain side agreements*).
  - Validator dapat memasukkan transaksi pengguna secara gratis sambil tetap merekayasa angka dasar lelang tanpa kerugian ekonomi.
  - Membakar Base Fee menghapus insentif finansial validator untuk memanipulasi algoritma ukuran blok jaringan.
- **Transformasi Kebijakan Moneter Ethereum (The Ultrasound Money Thesis):**
  - Pembakaran ETH secara konstan mengurangi pasokan beredar (*circulating supply*) setiap kali jaringan aktif digunakan.
  - Pada saat aktivitas on-chain tinggi, laju pembakaran Base Fee dapat melampaui laju pencetakan koin baru dari hadiah staking, mengubah ETH menjadi aset deflasioner.
- *Visual:* Neraca timbangan moneter: pencetakan hadiah staking vs pembakaran Base Fee menuju keseimbangan pasokan baru.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kenapa Base Fee harus dibakar dan bukan dikasih ke validator?
- Membakar biaya menghilangkan risiko kolusi antara validator dan pengguna nakal.
- Dampak sampingan: suplai koin Ethereum menjadi deflasioner saat jaringan ramai.

**Naskah Tutur (Voiceover Script):**
Mungkin kalian bertanya-tanya: mengapa protokol harus membakar Base Fee tersebut dan membuang jutaan dolar ke alamat mati?
Mengapa uang itu tidak dibagikan saja kepada para validator yang telah bekerja keras mengamankan jaringan?
Alasannya berakar pada teori permainan dan pencegahan kolusi.
Bayangkan jika Base Fee diberikan kepada validator.
Validator bisa berkolusi dengan pengguna nakal di luar jaringan secara diam-diam.
Validator bisa mengembalikan uang fee tersebut kepada pengguna lewat transfer bank, sambil tetap memasukkan transaksi palsu untuk memompa Base Fee dan memeras pengguna umum lainnya.
Dengan membakar Base Fee, setiap transaksi memakan biaya riil yang tidak bisa diakali oleh siapa pun.
Jika validator ingin memasukkan transaksi rekayasa, mereka harus rela membakar uang mereka sendiri.
Dampak sampingan dari arsitektur keamanan ini adalah transformasi ekonomi moneter Ethereum.
Setiap kali ada aktivitas transaksi di jaringan, pasokan Ether di dunia berkurang secara permanen, menciptakan aset kripto yang pasokannya menyusut seiring tingginya adopsi aplikasi.

---

## Slide 7: Elastic Blocks dan Formula Penyesuaian Base Fee

### Konten Slide
- **Konsep Blok Elastis (Elastic Block Sizes):**
  - Ethereum meninggalkan ukuran blok statis kaku dan beralih ke kapasitas dinamis adaptif.
  - **Kapasitas Target (Target Gas):** 15.000.000 gas (tingkat keterisian 50 persen).
  - **Kapasitas Maksimal (Hard Cap):** 30.000.000 gas (tingkat keterisian 100 persen).
- **Formula Penyesuaian Algoritmik:**
  $$B_{n+1} = B_n \times \left( 1 + \frac{1}{8} \times \frac{G_n - 15.000.000}{15.000.000} \right)$$
  - Jika blok terisi tepat 15M gas: Nilai pembilang nol, Base Fee blok berikutnya tetap stabil.
  - Jika blok terisi penuh 30M gas: Base Fee melonjak tepat **+12,5 persen** pada blok berikutnya.
  - Jika blok kosong 0 gas: Base Fee merosot tepat **-12,5 persen** pada blok berikutnya.
- **Dinamika Eksponensial:** Lonjakan permintaan berturut-turut memicu kenaikan eksponensial ($(1,125)^{10} \approx 3,25\times$ dalam 10 blok atau 2 menit), secara otomatis meredam kemacetan lalu lintas jaringan.
- *Visual:* Grafik osilasi Base Fee otomatis naik saat blok di atas 15M dan turun saat blok di bawah 15M gas.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Blok Ethereum bersifat elastis: target 15 juta gas, batas maksimal 30 juta gas.
- Jika blok terisi di atas 50%, harga otomatis naik maksimal 12,5% per blok.
- Penyesuaian eksponensial mendinginkan lonjakan lalu lintas hanya dalam beberapa menit.

**Naskah Tutur (Voiceover Script):**
Bagaimana protokol tahu kapan harus menaikkan atau menurunkan angka Base Fee ini?
Ethereum menerapkan sistem kendali otomatis berbasis ukuran blok yang elastis.
Ukuran blok di Ethereum tidak lagi dibuat kaku.
Protokol menetapkan target ideal sebesar lima belas juta gas per blok, yaitu separuh dari kapasitas fisik maksimal yang mencapai tiga puluh juta gas.
Kondisi ini dikendalikan oleh formula matematis yang sangat elegan.
Jika sebuah blok terisi tepat lima belas juta gas, algoritma menganggap jaringan stabil dan Base Fee tidak berubah.
Namun jika terjadi lonjakan aktivitas dan blok terisi penuh hingga tiga puluh juta gas, Base Fee untuk blok berikutnya akan langsung dinaikkan tepat dua belas koma lima persen.
Sebaliknya, jika blok sepi dan kosong, harganya turun tepat dua belas koma lima persen.
Karena perubahan dua belas koma lima persen ini berlipat secara eksponensial di setiap blok, harga dasar bisa melonjak lebih dari tiga kali lipat hanya dalam sepuluh blok atau dua menit.
Kenaikan harga yang sangat cepat ini secara otomatis menyaring transaksi yang tidak mendesak, sehingga beban jaringan kembali dingin ke target ideal lima belas juta gas.

---

## Slide 8: Kalkulasi Biaya Transaksi Efektif

### Konten Slide
- **Tiga Parameter Input Pengguna:**
  - `gasLimit`: Batas maksimum kuota unit gas yang diizinkan dikonsumsi.
  - `maxFeePerGas`: Batas harga absolut tertinggi per unit gas yang rela dibayar pengguna.
  - `maxPriorityFeePerGas`: Batas tip tertinggi yang dialokasikan khusus untuk validator.
- **Formula Penentuan Harga Efektif (Effective Gas Price):**
  $$\text{EffectiveGasPrice} = \min\big(\text{maxFeePerGas}, \text{BaseFee} + \text{maxPriorityFeePerGas}\big)$$
- **Perhitungan Total Biaya dan Mekanisme Refund:**
  $$\text{Total Cost} = \text{GasUsed} \times \text{EffectiveGasPrice}$$
  - Sisa selisih antara `maxFeePerGas` dengan `EffectiveGasPrice` dikembalikan seutuhnya ke saldo akun pengguna.
  - Sisa unit gas yang tidak terpakai dari `gasLimit` juga dikembalikan secara otomatis.
- *Visual:* Diagram pengembalian dana: anggaran maksimal dipotong biaya riil eksekusi dan sisanya dialirkan kembali ke dompet pengirim.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pengguna menentukan batas atas belanja mereka lewat maxFee dan maxPriorityFee.
- Protokol menghitung Effective Gas Price secara adil menggunakan nilai minimum.
- Semua sisa dana yang tidak terpakai dikembalikan secara otomatis ke dompet.

**Naskah Tutur (Voiceover Script):**
Sekarang mari kita lihat bagaimana transaksi kita ditagih secara nyata saat dikirim.
Pengguna tidak perlu khawatir uangnya tercuri jika menyetel angka yang tinggi.
Kalian cukup memasukkan tiga parameter: gasLimit sebagai kuota bahan bakar, maxFeePerGas sebagai batas harga tertinggi yang rela kalian bayar, dan maxPriorityFeePerGas sebagai tip untuk validator.
Ketika transaksi diproses, mesin akan menghitung apa yang disebut Effective Gas Price.
Rumusnya sangat adil: sistem akan mengambil nilai terkecil antara batas atas kalian dengan penjumlahan Base Fee blok ditambah tip validator.
Total biaya akhir yang didebit dari rekening kalian adalah jumlah gas yang benar-benar terpakai dikalikan dengan harga efektif tersebut.
Jika Base Fee saat transaksi terjadi ternyata lebih rendah dari perkiraan awal kalian, seluruh sisa selisih dananya akan langsung dikembalikan ke saldo dompet kalian secara otomatis.
Pengguna terlindungi dari pemborosan biaya tanpa perlu terus-menerus memantau layar grafik gas.

---

## Slide 9: Taksonomi Terminasi Eksekusi: Revert vs Out-of-Gas

### Konten Slide
- **Empat Skenario Akhir Eksekusi EVM:**
  1. `SUCCESS` (`STOP` / `RETURN`): Mutasi data disimpan permanen, sisa kuota gas dikembalikan.
  2. `REVERT`: Logika gagal secara terkendali, mutasi dibatalkan, sisa gas dikembalikan.
  3. `OUT_OF_GAS` (OOG): Bahan bakar habis, mutasi dibatalkan, denda sita 100% gasLimit.
  4. `INVALID_OPCODE`: Instruksi mesin tidak dikenal, mutasi dibatalkan, denda sita 100% gasLimit.
- **Komparasi Penting: Revert Terkendali vs Kegagalan OOG:**
  - *Clean Revert (`require()` / `revert()`):*
    - Dipicu oleh pemeriksaan logika bisnis kontrak (contoh: saldo tidak mencukupi).
    - Seluruh perubahan data dikembalikan ke titik awal secara atomik.
    - Pengguna hanya membayar gas yang telah terpakai hingga instruksi pembatalan terjadi; seluruh sisa kuota gas di-refund.
  - *Out-of-Gas Exception (Bahan Bakar Habis):*
    - Seluruh perubahan data dibatalkan demi menjaga integritas database.
    - **Hukuman Total:** Pengguna kehilangan seratus persen dari nilai `gasLimit` yang dialokasikan sebagai ganti rugi komputasi validator.
- *Visual:* Perbandingan dua cabang pembatalan transaksi: Revert (ada refund sisa) versus Out-of-Gas (tanpa ampun, gas hangus total).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Eksekusi kontrak bisa berakhir dalam sukses, revert, atau out-of-gas.
- Revert terkendali membatalkan data tapi mengembalikan sisa bahan bakar yang belum terpakai.
- Out-of-Gas menyita seratus persen gasLimit tanpa ampun untuk membayar waktu kerja prosesor validator.

**Naskah Tutur (Voiceover Script):**
Ketika sebuah transaksi berjalan di EVM, proses tersebut bisa berakhir dalam beberapa kondisi berbeda.
Dua kondisi kegagalan yang paling sering ditemui adalah Revert dan Out-of-Gas.
Sangat penting bagi kita untuk memahami perbedaan tajam di antara keduanya.
Clean Revert adalah pembatalan terprogram yang disengaja karena ada syarat logika yang tidak terpenuhi, misalnya fungsi require yang mendeteksi saldo pengguna kurang.
Pada kondisi Revert, seluruh perubahan data memang dibatalkan, tetapi pengguna hanya ditagih sebesar gas yang sudah terpakai sampai titik kegagalan itu terjadi.
Sisa kuota gas yang masih tersisa akan dikembalikan seutuhnya ke dompet pengguna.
Sebaliknya, Out-of-Gas adalah mimpi buruk bagi pengguna.
Kondisi ini terjadi ketika transaksi kehabisan bahan bakar di tengah komputasi yang berat.
Selain seluruh status perubahan data dibatalkan, sistem tidak memberikan pengembalian dana sama sekali.
Seratus persen dari kuota gasLimit yang kalian sediakan akan disita habis oleh validator.
Hukuman sita ini sengaja diterapkan agar peretas tidak bisa membebani prosesor validator secara gratis lewat komputasi yang tak berujung.

---

## Slide 10: Evolusi Storage Refund dan EIP-3529

### Konten Slide
- **Niat Awal Desain EVM:**
  - Protokol menawarkan insentif pengembalian gas (*gas refund*) bagi pengembang yang membersihkan data storage lama (`SSTORE` dari non-zero ke zero) atau mengeksekusi `SELFDESTRUCT`.
  - Tujuannya mulia: mencegah pembengkakan ukuran database status blockchain (*state bloat*).
- **Penyalahgunaan Sistemik (The Gas Token Arbitrage Era):**
  - Pengembang menciptakan instrumen arbitrase seperti **Chi** dan **Gastoken**.
  - Spekulan "mencetak" token gas saat jaringan sepi dengan memenuhi storage dummy, lalu "membakar" token tersebut saat jaringan macet demi mencairkan refund diskon gas.
  - Trik ini mengubah ruang penyimpanan blockchain menjadi pasar komoditas spekulatif dan memicu bahaya *block-stuffing attacks*.
- **Intervensi EIP-3529 (Agustus 2021):**
  - Menghapus sepenuhnya insentif refund untuk opcode `SELFDESTRUCT`.
  - Memangkas drastis refund pembersihan storage dari 15.000 gas menjadi hanya **4.800 gas**.
  - Membatasi total pengembalian maksimal hanya **seperlima (20 persen)** dari total gas yang terpakai di transaksi.
- *Visual:* Skema penutupan celah arbitrase Gas Token oleh EIP-3529 demi stabilitas latensi blok.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Awalnya Ethereum memberi diskon refund jika kontrak menghapus data storage lama.
- Niat baik ini disalahgunakan pengembang untuk membuat Gas Token spekulatif.
- EIP-3529 memangkas refund dan membatasi maksimal 20% agar validator tidak dibebani blok raksasa.

**Naskah Tutur (Voiceover Script):**
Salah satu babak paling menarik dalam sejarah ekonomi Ethereum adalah eksperimen gas refund.
Di masa awal, perancang Ethereum ingin memberi hadiah kepada developer yang rajin membersihkan hard drive jaringan.
Jika kalian menghapus variabel di storage atau membunuh kontrak lama, protokol memberi hadiah pengembalian gas dalam jumlah besar.
Namun niat baik ini justru melahirkan celah arbitrase yang sangat liar.
Para pengembang pintar menciptakan apa yang disebut Gas Token, seperti Chi dan Gastoken.
Ketika jaringan sedang sepi dan biaya gas murah, mereka sengaja mengisi hard drive validator dengan data sampah untuk mencetak token gas.
Lalu ketika jaringan macet parah, mereka membakar token itu untuk mendapatkan diskon refund raksasa.
Blockchain berubah menjadi pasar penimbunan data spekulatif yang berbahaya.
Untuk menghentikan kegilaan ini, proposal EIP-3529 diaktifkan pada tahun 2021.
EIP-3529 menghapus refund bunuh diri kontrak, memangkas nilai refund storage menjadi sangat kecil, dan mengunci batas refund maksimal hanya dua puluh persen dari total pemakaian transaksi.
Langkah tegas ini berhasil mematikan skema spekulasi gas token dan menyelamatkan latensi eksekusi jaringan.

---

## Slide 11: Jembatan ke Modul Berikutnya (Account Abstraction)

### Konten Slide
- **Capaian Modul Ini:** Kita telah memahami hukum ekonomi gas, dekonstruksi EIP-1559, kalkulasi harga efektif, serta mekanisme penghentian eksekusi.
- **Friksi Akses Pengguna di Dunia Nyata:**
  - Pada arsitektur tradisional, seluruh biaya gas wajib dibayar menggunakan mata uang native (Ether) yang diotorisasi oleh *Externally Owned Account* (EOA).
  - Pengguna yang memiliki jutaan dolar saldo USDC tidak dapat memindahkan uangnya jika tidak memiliki pecahan ETH di dompetnya.
  - Kehilangan selembar kertas berisi 12 kata rahasia (*seed phrase*) memusnahkan seluruh aset kekayaan pengguna tanpa ada jalan pemulihan.
- **Pertanyaan Rekayasa Identitas:**
  - Bagaimana cara memisahkan identitas pengguna dari kunci privat tunggal?
  - Bagaimana smart contract wallet memungkinkan sponsor biaya gas, transaksi tanpa seed phrase, dan otentikasi biometrik FaceID?
- **Materi Modul Berikutnya:** Membedah revolusi identitas dan dompet modern: **Wallets and Account Abstraction**.
- *Visual:* Ilustrasi dompet tradisional berbasis kertas seed phrase bertransformasi menjadi smart contract wallet interaktif dengan otentikasi biometrik.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Hukum ekonomi komputasi blockchain sudah kita kuasai.
- Menyoroti kelemahan dompet biasa: butuh saldo ETH untuk fee dan risiko fatal kehilangan 12 kata rahasia.
- Teaser materi modul 4.4: Wallets and Account Abstraction (ERC-4337).

**Naskah Tutur (Voiceover Script):**
Kita telah mengupas tuntas bagaimana hukum ekonomi gas menjaga stabilitas komputer dunia dari serangan pembekuan dan eksploitasi arbitrase.
Namun perhatikan satu batasan struktural yang dihadapi oleh setiap pengguna saat ini.
Di dalam arsitektur dasar Ethereum, setiap transaksi wajib dibayar dengan mata uang native Ether dan ditandatangani oleh satu kunci privat tunggal dari dompet biasa atau EOA.
Ini menciptakan friksi yang sangat menyiksa bagi pengguna awam.
Bayangkan seseorang memiliki sepuluh ribu dolar saldo stablecoin USDC di dompetnya, tetapi dia tidak bisa mentransfer uang itu sepeser pun hanya karena dia tidak punya saldo receh koin Ether untuk membayar gas.
Lebih buruk lagi, jika pengguna lupa atau kehilangan dua belas kata seed phrase mereka, seluruh tabungan hidup mereka lenyap seketika tanpa ada layanan pelanggan yang bisa membantu.
Bagaimana cara kita membebaskan pengguna dari tirani kunci privat tunggal ini?
Bagaimana aplikasi bisa mensponsori biaya gas pengguna dan memanfaatkan sensor sidik jari ponsel untuk transaksi kripto yang aman?
Di modul berikutnya, kita akan membedah lompatan besar pengalaman pengguna Web3: Wallets and Account Abstraction.
Sampai jumpa di modul berikutnya.
