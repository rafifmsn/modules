# From Static Ledgers to Programmable State
Modul Presentasi: Programmability and Virtual Machines (04.1)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** From Static Ledgers to Programmable State
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Transformasi blockchain dari ledger transaksi statis berspesialisasi tunggal menjadi state machine komputasi universal.
- *Visual:* Ilustrasi kalkulator mekanik berdampingan dengan arsitektur superkomputer terdistribusi global.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul pertama Chapter 4.
- Mengulas lompatan terbesar blockchain: dari sekadar mencatat saldo uang ke komputasi kode program universal.
- Mengapa kalkulator desentralistik berevolusi menjadi komputer dunia.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul pertama dari Chapter 4 trek Fundamentals.
Pada modul-modul sebelumnya, kita sudah membedah tuntas bagaimana konsensus terdistribusi memungkinkan ribuan komputer asing menyepakati urutan blok data yang sama secara permanen.
Namun menyepakati urutan baris data saja baru menyelesaikan setengah dari revolusi desentralisasi.
Pertanyaan krusial berikutnya adalah: apa sebenarnya yang dihitung oleh baris-baris data tersebut?
Hari ini kita akan menjelajahi transisi historis yang sangat radikal, yaitu pergeseran dari ledger statis ala Bitcoin menuju programmable state machine yang melahirkan Ethereum.
Kita akan membedah mengapa Bitcoin Script sengaja dibatasi, apa risiko fatal jika komputasi tanpa batas diizinkan di jaringan terbuka, dan bagaimana mekanisme gas berhasil menjembatani paradoks tersebut.

---

## Slide 2: Batasan Desain Ledger Spesialisasi Tunggal

### Konten Slide
- **Tujuan Asli Bitcoin:** Dirancang secara sengaja sebagai *peer-to-peer electronic cash system*.
- **Fungsi Ledger Tunggal:** Sistem hanya mengeksekusi operasi aritmatika dasar seperti pengurangan saldo pengirim dan penambahan saldo penerima.
- **Pertanyaan Fundamental Para Ilmuwan Komputer:**
  - Jika jaringan desentralistik mampu menyepakati mutasi saldo moneter sederhana tanpa pihak ketiga, bisakah jaringan yang sama menyepakati eksekusi program komputer apa pun?
  - Apakah blockchain bisa bertransformasi dari sekadar buku kas digital menjadi komputer desentralistik global?
- *Visual:* Bagan perbandingan buku kas akuntansi pasif versus sistem operasi komputasi aktif.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bitcoin sangat hebat, tetapi merupakan mesin berspesialisasi tunggal.
- Ledger Bitcoin hanya mengenal debit dan kredit saldo pada UTXO.
- Muncul pertanyaan: bisakah kita menjalankan program apa pun di atas konsensus desentralistik?

**Naskah Tutur (Voiceover Script):**
Ketika Satoshi Nakamoto merilis Bitcoin pada tahun 2008, tujuannya sangat fokus dan spesifik.
Bitcoin diciptakan sebagai uang elektronik murni peer-to-peer, tanpa perantara bank sentral.
Secara teknis, jaringan Bitcoin adalah sebuah spreadsheet raksasa yang mencatat mutasi angka.
Ketika Alice mengirim lima koin ke Bob, jaringan hanya memverifikasi bahwa saldo Alice berkurang lima dan saldo Bob bertambah lima.
Namun para peneliti ilmu komputer segera melihat potensi yang jauh lebih besar di balik arsitektur ini.
Mereka mulai bertanya: jika ribuan komputer di seluruh dunia bisa sepakat tanpa perantara mengenai hasil operasi pengurangan dan penambahan saldo, mengapa kita tidak menggunakan mesin konsensus yang sama untuk menyepakati hasil eksekusi kode program komputer sembarang?
Ide inilah yang memicu eksplorasi menuju programmable blockchain.

---

## Slide 3: Anatomi dan Pembatasan Bitcoin Script

### Konten Slide
- **Keberadaan Script di Bitcoin:** Setiap output transaksi Bitcoin (UTXO) dilindungi oleh instruksi penguncian berbasis *Bitcoin Script*.
- **Karakteristik Bitcoin Script:**
  - Bahasa berbasis tumpukan (*stack-based Forth-like language*).
  - Mengevaluasi instruksi secara linear dari atas ke bawah.
- **Tiga Batasan Sengaja (Deliberate Constraints):**
  - *Non-Turing Complete:* Tidak memiliki instruksi perulangan (*looping opcodes*).
  - *Stateless Execution:* Eksekusi murni di dalam RAM sementara tanpa memori persisten.
  - *Value-Blindness:* Script tidak dapat memeriksa nilai nominal dana yang ditransfer.
- *Visual:* Diagram eksekusi linear Bitcoin Script satu arah tanpa percabangan mundur.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bitcoin sebenarnya punya bahasa pemrograman bernama Bitcoin Script.
- Satoshi sengaja mengebiri kemampuan bahasa ini demi keamanan.
- Tidak ada loop, tidak ada penyimpanan data permanen, dan tidak bisa membaca nilai saldo.

**Naskah Tutur (Voiceover Script):**
Perlu kita pahami bahwa Bitcoin sebenarnya tidak sepenuhnya tanpa program.
Setiap kali ada transaksi di Bitcoin, outputnya dikunci dengan rangkaian instruksi kode yang disebut Bitcoin Script.
Bahasa ini mirip dengan Forth, di mana data dimasukkan ke dalam stack lalu dievaluasi instruksi per instruksi dari baris awal sampai akhir.
Namun Satoshi Nakamoto sengaja mengebiri fitur bahasa pemrograman ini.
Ada tiga pembatasan fundamental yang ditanamkan secara sadar ke dalam protokol.
Pertama, bahasa ini tidak Turing-complete karena sama sekali tidak menyediakan instruksi perulangan seperti for atau while.
Kedua, eksekusinya bersifat stateless, artinya memori langsung terhapus dari RAM setelah verifikasi selesai tanpa bisa menyimpan variabel ke disk.
Ketiga, script tersebut buta nilai atau value-blind, di mana logika penguncian tidak bisa membatasi berapa jumlah koin yang boleh ditarik.

---

## Slide 4: Alasan Mengapa Looping Dilarang di Bitcoin

### Konten Slide
- **Model Validasi P2P:** Setiap full node di dunia wajib memverifikasi setiap transaksi sebelum meneruskannya ke jaringan.
- **Ancaman Denial-of-Service (DoS):**
  - Jika perulangan diizinkan, penyerang dapat menyiarkan transaksi berisi kode perulangan tak terhingga (`while(true) {}`).
  - Setiap komputer validator yang mencoba memverifikasi transaksi tersebut akan membeku (*hang*) selamanya pada utilisasi CPU 100 persen.
- **Keputusan Desain Satoshi:** Menghapus semua opcode loop demi menjamin setiap script berhenti dalam batas waktu yang pasti (*finite predictable termination*).
- *Visual:* Skema node validator mengalami freeze CPU akibat jebakan infinite loop.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kenapa Satoshi tidak menambahkan fitur loop sederhana?
- Karena serangan infinite loop sangat mudah merontokkan ribuan node di dunia.
- Menghilangkan loop adalah cara instan menjamin script pasti selesai dieksekusi.

**Naskah Tutur (Voiceover Script):**
Mengapa Satoshi mengambil keputusan drastis untuk melarang fitur perulangan atau looping?
Jawabannya berakar pada arsitektur verifikasi peer-to-peer.
Di dalam jaringan desentralistik, setiap full node di bumi bertugas memvalidasi setiap transaksi yang lewat.
Bayangkan jika seorang peretas jahat menyiarkan transaksi yang di dalamnya tertulis instruksi while true atau perulangan tanpa ujung.
Saat ribuan komputer validator di seluruh dunia mencoba menjalankan kode tersebut untuk memeriksa keabsahannya, prosesor mereka akan seketika terkunci seratus persen.
Komputer mereka akan membeku dan seluruh jaringan pembayaran global akan lumpuh total.
Dengan melarang perulangan, Satoshi memastikan secara mutlak bahwa setiap transaksi Bitcoin dijamin selesai diverifikasi dalam hitungan milidetik.
Ketiadaan loop adalah fitur keamanan, bukan cacat teknis yang tidak disengaja.

---

## Slide 5: Keterbatasan Statelessness dan Value-Blindness

### Konten Slide
- **Stateless Execution:**
  - Script tidak memiliki akses ke state variabel eksternal di luar transaksi langsung.
  - Script tidak dapat membaca saldo alamat lain atau menyimpan riwayat variabel on-chain.
  - Setelah script bernilai `TRUE`, seluruh tumpukan data stack terhapus dari memori.
- **Value-Blindness pada Model UTXO:**
  - Script penguncian hanya menentukan *siapa* yang boleh mencairkan dana lewat tanda tangan.
  - Script tidak dapat menetapkan batas penarikan bersyarat, misalnya: penarikan maksimal 1 BTC per hari.
- **Konsekuensi Logis:** Tidak memungkinkan membangun aplikasi keuangan kompleks seperti lending pool, automated market maker, atau escrow multi-tahap.
- *Visual:* Perbandingan eksekusi stateless yang langsung bersih dari RAM versus stateful database yang menyimpan variabel ke disk.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Stateless berarti memori langsung hilang setelah selesai diverifikasi.
- Value-blind berarti script tidak bisa mengatur kuota penarikan parsial.
- Dampaknya: protokol DeFi seperti lending atau AMM mustahil dibuat langsung di Bitcoin Script.

**Naskah Tutur (Voiceover Script):**
Dua pembatasan berikutnya membuat pembangunan aplikasi modern menjadi mustahil di atas Bitcoin Script murni.
Pertama adalah sifatnya yang stateless.
Script Bitcoin tidak punya memori jangka panjang.
Begitu sebuah transaksi selesai diverifikasi dan menghasilkan nilai boolean true, seluruh memori stack langsung dibersihkan dari RAM.
Script tidak bisa mengingat status kemarin, tidak bisa menaikkan hitungan angka variabel, dan tidak bisa membaca saldo akun lain di jaringan.
Kedua adalah sifat value-blindness.
Script hanya bisa memvalidasi kunci kriptografi siapa yang berhak mengambil uang, tetapi tidak bisa memeriksa nominalnya.
Kita tidak bisa membuat aturan seperti: dana ini hanya boleh ditarik maksimal satu koin per minggu.
Karakteristik serba semua-atau-tidak-sama-sekali ini membuat pembangunan instrumen keuangan modern seperti lending market atau automated market maker sama sekali tidak bisa diwujudkan.

---

## Slide 6: Eksperimen Metacoins dan Overlay Networks (2012 - 2014)

### Konten Slide
- **Kebutuhan Pasar:** Komunitas pengembang sangat mendambakan penerbitan token kustom dan logika finansial canggih di atas blockchain.
- **Colored Coins (2012):**
  - Gagasan menandai (*coloring*) satoshi tertentu untuk merepresentasikan aset dunia nyata seperti saham atau sertifikat emas.
  - *Kelemahan:* Penambang Bitcoin tidak memahami tanda warna tersebut, sehingga satoshi berharga mahal berisiko terbelanja sebagai biaya gas biasa.
- **Mastercoin / Omni Layer (2013):**
  - Memanfaatkan opcode `OP_RETURN` untuk menyematkan data sembarang hingga 80 byte pada transaksi Bitcoin.
  - Digunakan sebagai fondasi awal penerbitan stablecoin USDT pertama di dunia.
- *Visual:* Diagram transaksi Bitcoin membawa payload `OP_RETURN` yang dibaca oleh klien sekunder di luar konsensus.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Developer tahun 2012 tidak menyerah dan mencoba mengakali batasan Bitcoin.
- Colored Coins menandai satoshi tertentu sebagai aset riil.
- Mastercoin menyisipkan data transaksi token ke dalam opcode OP_RETURN.

**Naskah Tutur (Voiceover Script):**
Antara tahun 2012 dan 2014, komunitas pengembang mulai frustrasi dengan keterbatasan ini.
Mereka ingin menerbitkan token saham, obligasi, dan aset digital kustom, tetapi tidak mau membuat blockchain dari nol karena likuiditas dan keamanan Bitcoin adalah yang terkuat saat itu.
Lahirlah era yang disebut Metacoins atau Overlay Networks.
Eksperimen pertama adalah Colored Coins, di mana sebutir satoshi dilacak silsilahnya dan dianggap merepresentasikan satu lembar saham perusahaan.
Sayangnya, karena penambang Bitcoin tidak tahu konsep warna tersebut, pengguna bisa tanpa sengaja membelanjakan satoshi saham bernilai ribuan dolar sebagai fee transaksi biasa.
Kemudian hadir Mastercoin yang dipelopori J.R. Willett.
Mastercoin memanfaatkan celah opcode OP_RETURN untuk menempelkan teks data hingga delapan puluh byte pada transaksi biasa.
Lewat skema inilah stablecoin legendaris Tether USDT pertama kali diluncurkan ke dunia.

---

## Slide 7: Paradoks Kerapuhan Protokol Overlay

### Konten Slide
- **The Decoupling Flaw:** Jaringan dasar Bitcoin bertindak sebagai pembawa data buta (*blind carrier*).
  - Penambang hanya memvalidasi transfer nominal BTC, tanpa memverifikasi validitas logika data di dalam `OP_RETURN`.
- **Ketergantungan Ekstrem pada Klien Off-Chain:**
  - Node Bitcoin menganggap transaksi valid meskipun saldo token Mastercoin di dalamnya fiktif.
  - Verifikasi keabsahan kepemilikan token menuntut pengguna menjalankan perangkat lunak klien terpisah yang berat untuk memindai seluruh riwayat blockchain.
- **Ketiadaan Komposabilitas:** Dua aplikasi berbeda pada lapisan overlay tidak dapat berinteraksi secara langsung atau melakukan pertukaran atomik.
- *Visual:* Skema pemisahan konsensus L1 yang buta data versus klien off-chain yang menghitung saldo secara terisolasi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah fatal overlay: penambang Bitcoin tidak memvalidasi isi data token.
- Node harus menjalankan software berat kedua di luar Bitcoin Core.
- Tidak ada smart contract composability: aplikasi tidak bisa saling memanggil.

**Naskah Tutur (Voiceover Script):**
Meskipun Mastercoin membuktikan bahwa pasar sangat haus akan aset terprogram, arsitektur overlay ini menyimpan cacat desain yang sangat rapuh.
Kita menyebutnya sebagai decoupling flaw.
Penambang Bitcoin yang mengamankan konsensus sama sekali buta terhadap aturan main Mastercoin.
Bagi penambang, payload OP_RETURN hanyalah deretan byte acak yang tidak berarti apa-apa.
Jika seseorang memalsukan transfer token tanpa saldo, penambang Bitcoin tetap akan mencatat transaksi itu ke dalam blok tanpa curiga.
Akibatnya, siapa pun yang ingin mengecek saldo token wajib menjalankan software klien khusus yang terpisah.
Klien ini harus membaca ulang seluruh rekaman Bitcoin dari masa lalu dan menyaring datanya di luar jaringan.
Lebih buruk lagi, tidak ada konsep komposabilitas, program tidak bisa saling berinteraksi secara instan dalam satu eksekusi.
Jelas bahwa menambal logika komputasi di atas rantai yang buta data adalah jalan buntu secara arsitektur.

---

## Slide 8: Vitalik Buterin dan Paradigma World Computer

### Konten Slide
- **Gagasan Radikal (Akhir 2013):** Vitalik Buterin menyadari bahwa menciptakan blockchain spesifik untuk setiap use case adalah inefisiensi arsitektur.
- **Tesis Utama Ethereum Whitepaper:**
  - Membangun satu blockchain tunggal dengan bahasa pemrograman Turing-complete terintegrasi langsung di lapisan konsensus.
- **Blockchain Sebagai World Computer:**
  - State blockchain bukan lagi sekadar tabel saldo akun moneter.
  - State blockchain adalah mesin virtual raksasa terpadu yang memuat kode program executable (*smart contracts*) dan basis data persisten.
  - Sekali dideploy, program berjalan persis seperti kodenya tanpa risiko sensor, downtime, atau intervensi pihak ketiga.
- *Visual:* Perbandingan kalkulator moneter Bitcoin versus Ethereum World Computer yang menjalankan ratusan smart contracts di atas satu mesin virtual.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Vitalik Buterin melihat jalan buntu pada pendekatan Bitcoin overlay.
- Pertanyaan revolusioner: kenapa tidak menaruh bahasa pemrograman langsung ke layer konsensus?
- Lahirlah Ethereum sebagai satu komputer desentralistik untuk seluruh dunia.

**Naskah Tutur (Voiceover Script):**
Pada akhir tahun 2013, seorang pemuda berusia sembilan belas tahun bernama Vitalik Buterin melihat kerapuhan ini secara jernih.
Alih-alih membuat blockchain terpisah untuk tiap kebutuhan, satu rantai untuk nama domain, satu rantai untuk penyimpanan data, dan satu rantai untuk token, Vitalik mengajukan lompatan paradigma yang sangat berani.
Bagaimana jika kita membuat satu blockchain tunggal yang memiliki bahasa pemrograman komputasi umum terintegrasi langsung di lapisan konsensusnya?
Gagasan ini dituangkan dalam Ethereum Whitepaper.
Ethereum mengubah blockchain dari buku kas pasif menjadi sebuah World Computer atau komputer dunia.
Di dalam Ethereum, isi blockchain bukan hanya saldo koin, melainkan seluruh memori dari sebuah mesin virtual global.
Mesin ini menyimpan kode program yang disebut smart contract beserta database variabelnya secara permanen.
Siapa pun bisa meluncurkan kode aplikasi ke dalamnya, dan program tersebut akan berjalan abadi persis seperti yang tertulis tanpa bisa disensor atau dimatikan oleh siapa pun.

---

## Slide 9: Paradoks Halting Problem dalam Sistem Konsensus

### Konten Slide
- **Teorema Alan Turing (1936):** Tidak ada algoritma umum yang mampu memeriksa program sembarang dan memastikan secara statis apakah program tersebut akan berhenti (*halt*) atau berjalan selamanya dalam infinite loop.
- **Dilema Validasi Desentralistik:**
  - Validator tidak dapat mengetahui berapa iterasi perulangan sebuah kode sebelum benar-benar mengeksekusinya di CPU.
- **Vektor Serangan Mematikan:**
  - Jika smart contract Turing-complete diizinkan berjalan bebas di blockchain, peretas dapat menyiarkan kode komputasi tak terbatas.
  - Seluruh node global akan terperangkap mengeksekusi kode tanpa henti, memicu kegagalan konsensus total.
- *Visual:* Skema alur keputusan undecidable Halting Problem yang mengancam kestabilan node jaringan desentralistik.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Begitu Ethereum menambahkan loop, masalah klasik komputer sains muncul kembali: The Halting Problem.
- Alan Turing membuktikan kita tidak bisa menebak kode berhenti atau tidak sebelum dijalankan.
- Jika validator dipaksa mengeksekusi infinite loop tanpa batas, jaringan akan mati seketika.

**Naskah Tutur (Voiceover Script):**
Namun menambahkan bahasa komputasi umum yang Turing-complete ke dalam blockchain langsung membentur tembok ilmu komputer paling mendasar: The Halting Problem.
Pada tahun 1936, matematikawan legendaris Alan Turing membuktikan bahwa secara matematis mustahil membuat algoritma statis yang bisa membaca sebuah kode sembarang lalu memastikan apakah program itu pasti akan berhenti atau berputar selamanya dalam infinite loop.
Ini dilema raksasa bagi blockchain.
Jika validator tidak bisa menebak apakah sebuah smart contract akan berhenti atau tidak sebelum menjalankannya, bagaimana cara mencegah serangan denial of service?
Seorang penyerang bisa saja menyebarkan kode dengan kalkulasi tak terhingga.
Ketika puluhan ribu komputer validator mencoba mengeksekusi blok tersebut, mereka tidak akan pernah selesai dan jaringan terhenti total.
Inilah alasan mengapa Satoshi melarang loop di masa lalu.
Bagaimana Ethereum mengatasi tantangan matematika yang tidak bisa dipecahkan ini?

---

## Slide 10: Solusi Gas: Mengubah Komputasi Menjadi Komoditas Ekonomi

### Konten Slide
- **Transformasi Paradigma:** Ethereum tidak memecahkan Halting Problem secara matematis, melainkan mengikatnya pada batasan ekonomi fisik (*economic metering*).
- **Mekanisme Gas Terukur:**
  - Setiap instruksi mesin tingkat rendah (opcode) memiliki tarif pasti dalam **satuan gas**.
  - Operasi penambahan sederhana (`ADD`) berbiaya 3 gas; penulisan data ke storage disk (`SSTORE`) berbiaya 20.000 gas.
- **Parameter Transaksi Pengguna:**
  - Pengguna wajib menentukan batas konsumsi maksimum (**`gasLimit`**) pada setiap transaksi.
  - Biaya gas dibayar di muka menggunakan mata uang kripto native (Ether).
- *Visual:* Diagram tangki bahan bakar kendaraan yang menyusut seiring jarum odometer melaju mengeksekusi instruksi kode.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ethereum tidak menentang hukum Alan Turing, melainkan membatasi komputasi dengan uang.
- Setiap baris instruksi mesin punya argo meteran bernama Gas.
- Pengguna harus membayar bahan bakar di muka sebelum mesin mulai bekerja.

**Naskah Tutur (Voiceover Script):**
Solusi brilian Ethereum bukan memecahkan Halting Problem secara teori matematika, melainkan menyelesaikannya lewat rekayasa ekonomi.
Ethereum memperkenalkan konsep yang kita kenal sebagai Gas.
Komputasi di Ethereum tidak pernah gratis.
Setiap satu instruksi mesin paling mendasar yang dieksekusi oleh komputer validator diberi harga pasti dalam satuan gas.
Menjumlahkan dua angka berharga tiga gas, sementara menulis data baru ke hard drive berharga dua puluh ribu gas.
Ketika Alice ingin menjalankan sebuah smart contract, Alice wajib menyertakan parameter gasLimit, yaitu batas maksimal bahan bakar yang dia izinkan untuk dibakar oleh transaksi tersebut.
Alice harus menyetor biaya gas ini di muka menggunakan saldo Ether miliknya.
Dengan cara ini, komputasi komputer diubah menjadi komoditas ekonomi yang terukur dan terbatas.

---

## Slide 11: Terminasi Eksekusi dan Out-of-Gas Exception

### Konten Slide
- **Eksekusi Langkah Demi Langkah:** Mesin virtual memotong sisa gas setiap kali satu opcode berhasil diproses.
- **Kondisi Out-of-Gas (OOG):**
  - Jika transaksi memuat infinite loop, sisa gas akan habis terbakar sebelum instruksi selesai.
  - Begitu gas tersisa menjadi nol, EVM seketika memicu interupsi darurat *Out-of-Gas Exception*.
- **Pemberlakuan Hukuman Ganda (Dual Enforcement):**
  - *State Rollback:* Seluruh modifikasi variabel dan perpindahan saldo dibatalkan secara atomik ke kondisi awal transaksi.
  - *Fee Forfeiture:* Seluruh saldo gas yang dibayarkan di muka disita seratus persen dan diserahkan kepada validator sebagai kompensasi utilisasi CPU.
- *Visual:* Bagan alur eksekusi opcode: pengurangan gas -> gas habis -> pembatalan state perubahan -> penyerahan denda ke penambang.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mesin memotong sisa gas di setiap instruksi.
- Jika gas habis di tengah jalan, terjadi Out-of-Gas exception.
- Semua mutasi data dibatalkan, tetapi seluruh saldo gas disita untuk validator.

**Naskah Tutur (Voiceover Script):**
Mari kita lihat apa yang terjadi di tingkat mesin saat kode dieksekusi.
Setiap kali mesin virtual memproses satu instruksi opcode, meteran saldo gas Alice langsung dipotong.
Jika penyerang mencoba memasukkan infinite loop, saldo gas yang sudah disetor di muka akan langsung habis terbakar dalam beberapa milidetik.
Saat sisa gas menyentuh angka nol, mesin virtual seketika memicu Out-of-Gas exception dan mematikan eksekusi paksa.
Ada dua konsekuensi penting yang terjadi saat Out-of-Gas terjadi.
Pertama, seluruh perubahan data dibatalkan secara atomik, saldo tidak berpindah dan database kembali ke kondisi sebelum transaksi dikirim.
Kedua, seluruh biaya gas yang disetor Alice disita seratus persen dan diberikan kepada validator.
Penyitaan ini adalah kompensasi nyata atas tenaga listrik dan waktu CPU yang telah dibakar oleh validator.
Melalui aturan tegas ini, serangan denial of service menjadi mustahil karena penyerang akan bangkrut sendiri sebelum mampu membekukan jaringan.

---

## Slide 12: Jembatan ke Modul Berikutnya (Arsitektur EVM)

### Konten Slide
- **Capaian Modul Ini:** Kita telah memahami pergeseran filosofis dan teknis dari ledger statis Bitcoin menuju world computer Ethereum yang teratur oleh gas.
- **Pertanyaan Rekayasa Sistem Berikutnya:**
  - Bagaimana mesin virtual desentralistik ini sebenarnya bekerja pada level byte dan register?
  - Bagaimana data dipartisi di antara volatile stack, linear memory, persistent storage disk, dan calldata?
  - Bagaimana compiler seperti Solidity menerjemahkan logika bisnis manusia menjadi bytecode yang dieksekusi mesin?
- **Materi Modul Berikutnya:** Membedah anatomi internal runtime terpenting di dunia Web3: **The Ethereum Virtual Machine (EVM)**.
- *Visual:* Pratinjau visual susunan internal EVM: Stack 1.024 slot, Memory linear, dan Storage key-value 256-bit.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Fondasi transisi dan mekanisme gas sudah kokoh kita kuasai.
- Membuka rasa ingin tahu audiens mengenai isi jeroan mesin virtual Ethereum.
- Teaser materi modul 4.2: Anatomi arsitektur EVM.

**Naskah Tutur (Voiceover Script):**
Kita telah menelusuri evolusi luar biasa dari keterbatasan Bitcoin Script hingga lahirnya konsep komputer dunia Ethereum yang kebal terhadap serangan infinite loop berkat mekanisme gas.
Namun pemahaman konseptual ini memicu pertanyaan rekayasa perangkat lunak yang jauh lebih mendalam.
Bagaimana sebenarnya mesin virtual desentralistik ini bekerja di tingkat perangkat keras dan byte instruksi?
Bagaimana mesin ini membagi memori antara stack sementara, buffer memori linear, database persisten di hard drive, dan calldata transaksi?
Bagaimana ribuan komputer di seluruh dunia bisa mengeksekusi instruksi biner yang rumit secara serempak dan menghasilkan status angka kriptografi yang identik tanpa ada selisih sedikit pun?
Untuk membedah jeroan dari mesin komputasi terpenting di industri Web3 hari ini, di modul berikutnya kita akan masuk ke dalam: The Ethereum Virtual Machine Architecture.
Sampai jumpa di modul berikutnya.
