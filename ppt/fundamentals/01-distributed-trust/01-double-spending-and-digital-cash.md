# The Double-Spending Problem and the History of Digital Cash
Modul Presentasi: Fondasi Distributed Trust (01.1)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** The Double-Spending Problem and the History of Digital Cash
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Mengapa uang digital mustahil tanpa otoritas terpusat sebelum Bitcoin, dan bagaimana Nakamoto Consensus menyelesaikannya.
- *Visual:* Ilustrasi batu Rai Island atau analogi ledger historis berdampingan dengan jaringan peer-to-peer.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di sesi pertama.
- Membahas akar masalah komputer sains terbesar di balik uang digital.
- Menjelaskan evolusi dari uang fisik, bank terpusat, hingga konsensus desentralistik.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul pertama dari trek Fundamentals.
Hari ini kita akan membedah salah satu teka-teki ilmu komputer paling mendasar dalam tiga puluh tahun terakhir: the double-spending problem.
Sebelum Bitcoin lahir pada tahun 2008, hampir semua ilmuwan komputer sepakat bahwa membuat uang digital murni yang peer-to-peer tanpa perantara bank adalah hal yang mustahil secara matematis.
Kita akan lihat kenapa masalah ini begitu sulit, eksperimen apa saja yang pernah gagal di era Cypherpunk, dan bagaimana Satoshi Nakamoto merangkai solusi yang kita kenal sekarang.

---

## Slide 2: Hakikat Uang adalah Ledger

### Konten Slide
- **Uang Bukan Benda Fisik:** Uang pada hakikatnya adalah *coordination game* dan teknologi sosial untuk mencatat utang.
- **Konsensus Mengalahkan Penguasaan Fisik:** Nilai uang tersimpan pada validitas rekaman, bukan pada materialnya.
- **Preseden Historis:**
  - *Rai Stones (Pulau Yap):* Batu kapur raksasa tidak pernah dipindahkan, mutasi kepemilikan disepakati lewat oral consensus warga.
  - *Tally Sticks (Inggris Abad Pertengahan):* Kayu hazelwood dibelah dua (*stock* & *foil*), serat kayu alami menjadi cryptographic key analog.
  - *Shanxi Piaohao (Dinasti Qing):* Wesel kertas terenkripsi menggantikan risiko membawa batangan perak fisik.
- *Visual:* Bagan 3 era: Batu Rai Yap -> Tally Sticks -> Wesel Piaohao -> Ledger Digital.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Uang itu bukan emas atau kertasnya, tapi catatan ledger-nya.
- Contoh Pulau Yap: batu tenggelam di laut tetap bernilai karena konsensus warga sepakat itu milik seseorang.
- Kesimpulan: Ketika ekonomi berkembang, manusia selalu mengganti perpindahan benda fisik dengan perpindahan status ledger.

**Naskah Tutur (Voiceover Script):**
Sebelum kita bicara kode dan kriptografi, kita harus paham dulu apa itu uang.
Banyak orang mengira uang harus berbentuk fisik seperti emas atau lembaran kertas.
Padahal sepanjang sejarah, uang sebenarnya hanyalah sebuah ledger: catatan bersama tentang siapa berutang apa ke siapa.
Contoh paling ekstrem ada di Pulau Yap di Mikronesia.
Warga di sana menggunakan batu kapur raksasa bernama batu Rai sebagai mata uang.
Batunya berbobot berton-ton dan hampir tidak pernah digeser.
Kalau ada transaksi, seluruh penduduk desa berkumpul dan menyaksikan secara publik siapa pemilik barunya.
Bahkan pernah ada satu batu yang tenggelam ke dasar laut saat badai, tapi nilainya tetap diakui oleh seluruh pulau karena semua orang tahu catatan kepemilikannya sah.
Dari batu Rai sampai kayu Tally Stick di Inggris abad pertengahan, polanya selalu sama: manusia selalu beralih dari memindahkan fisik ke memindahkan status ledger.

---

## Slide 3: Dilema Data Digital (Unchecked Replication)

### Konten Slide
- **Sifat Alami Data Digital:** Terdiri dari bit (0 dan 1) yang dapat disalin tanpa batas dengan biaya marjinal nol.
- **Scarcity Fisik vs Duplikasi Digital:**
  - *Fisik:* Menyerahkan lembar uang tunai berarti pemilik sebelumnya kehilangan akses fisik terhadap aset tersebut.
  - *Digital:* Mengirim file menghasilkan salinan identik di sisi penerima tanpa menghapus file di perangkat pengirim.
- **The Core Tension:** Sifat duplikasi sempurna sangat baik untuk distribusi informasi, tetapi menjadi bencana untuk konsep nilai dan kelangkaan (*scarcity*).
- *Visual:* Perbandingan alur perpindahan cash fisik (hilang dari pengirim) vs pengiriman file digital (terduplikasi di kedua pihak).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Internet menyelesaikan distribusi informasi lewat replikasi bit.
- Masalahnya: uang menuntut kelangkaan mutlak.
- File PDF atau MP3 bisa di-copy paste sepuasnya; jika uang digital bekerja seperti file biasa, sistem ekonomi runtuh.

**Naskah Tutur (Voiceover Script):**
Begitu kita masuk ke era internet, kita menghadapi benturan hukum fisika.
Data digital itu pada dasarnya adalah susunan bit, angka nol dan satu.
Sifat alaminya adalah bisa diduplikasi secara sempurna tanpa biaya sama sekali.
Waktu kalian mengirim email atau foto ke teman, kalian tidak sedang memindahkan barang itu.
Kalian membuat salinan baru di perangkat mereka, sementara file aslinya tetap aman di hard drive kalian.
Untuk penyebaran ilmu pengetahuan dan media, ini penemuan luar biasa.
Tapi untuk uang, ini mimpi buruk.
Uang membutuhkan sifat *scarcity* atau kelangkaan mutlak.
Kalau uang digital bisa diperlakukan seperti file biasa, katakanlah file `token.dat`, pemiliknya bisa mengirim file yang sama ke banyak orang sekaligus tanpa ada yang tahu.

---

## Slide 4: Mekanisme Serangan Double-Spending

### Konten Slide
- **Definisi Serangan:** Tindakan membelanjakan unit saldo digital yang sama lebih dari satu kali secara simultan.
- **Skenario Eksploitasi:**
  1. Alice memiliki saldo digital senilai sepuluh dolar.
  2. Alice mengirim token tersebut ke Bob untuk membeli barang fisik.
  3. Pada detik yang sama persis, Alice menyiarkan token identik ke Charlie untuk layanan lain.
  4. Bob dan Charlie memverifikasi keaslian token secara independen dan menganggap pembayaran tuntas.
- **Dampak Fatal:** Alice melipatgandakan daya beli dari ketiadaan, merugikan salah satu atau kedua pedagang.
- *Visual:* Diagram alur transaksi Alice bercabang dua ke Bob dan Charlie secara paralel.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ilustrasi interaksi Alice, Bob, dan Charlie.
- Masalah latensi jaringan: Bob dan Charlie tidak tahu transaksi satu sama lain secara instan.
- Double-spending merusak integritas seluruh sistem moneter jika tidak dicegah.

**Naskah Tutur (Voiceover Script):**
Mari kita lihat skenario nyatanya.
Bayangkan ada Alice, Bob, dan Charlie.
Alice punya saldo digital senilai sepuluh dolar.
Dia datang ke Bob, membeli sebuah buku, lalu mengirimkan bukti token sepuluh dolar tersebut.
Di pecahan detik yang sama persis, Alice menyiarkan file token yang sama ke Charlie untuk membayar kopi.
Karena latensi jaringan, Bob memeriksa token itu dan melihat formatnya valid, begitu juga Charlie di tempat lain.
Keduanya melepas barang dagangan mereka karena mengira pembayaran sudah lunas.
Padahal nilai riil yang ada sejak awal cuma sepuluh dolar.
Alice baru saja menggandakan uang dari ketiadaan, dan salah satu dari Bob atau Charlie akan menanggung kerugian.
Celah eksploitasi inilah yang dinamakan *double-spending problem*.

---

## Slide 5: Tiga Syarat Mutlak Uang Digital

### Konten Slide
- **1. Unforgeability (Kebal Pemalsuan):** Unit moneter tidak dapat dibuat secara ilegal di luar aturan pencetakan sistem (*minting rules*).
- **2. Authenticity (Otoritas Valid):** Hanya pemilik sah dari suatu saldo yang memiliki kewenangan matematis untuk mentransfernya.
- **3. Exclusivity (Pencegahan Belanja Ganda):** Sekali nilai berhasil dipindahkan, pemilik lama kehilangan hak membelanjakan unit yang sama secara permanen.
- *Visual:* Tiga pilar keamanan: Asymmetric Cryptography (Authenticity), Strict Emission Curves (Unforgeability), Distributed Consensus (Exclusivity).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Sebelum blockchain, kriptografi klasik hanya bisa menyelesaikan syarat 1 dan 2.
- Digital signature menyelesaikan kepemilikan dan autentikasi.
- Syarat nomor 3 (Exclusivity) adalah rintangan tersulit yang selalu gagal dipecahkan tanpa server sentral.

**Naskah Tutur (Voiceover Script):**
Supaya sebuah protokol uang digital bisa berjalan jujur, sistem itu wajib menjamin tiga syarat mutlak.
Pertama, *Unforgeability*: uangnya tidak boleh bisa dipalsukan di luar aturan emisi.
Kedua, *Authenticity*: hanya pemilik sah yang punya hak matematis memindahkan dana tersebut, misalnya menggunakan tanda tangan digital.
Kriptografi modern sebenarnya sudah lama berhasil menyelesaikan syarat nomor satu dan nomor dua ini.
Tantangan terbesarnya ada di syarat nomor tiga: *Exclusivity*.
Begitu Alice mengirim uang ke Bob, sistem harus bisa menjamin secara absolut bahwa Alice tidak bisa lagi membelanjakan koin itu ke pihak lain.
Bagaimana cara mencegahnya jika tidak ada polisi atau server pusat yang mengawasi?

---

## Slide 6: Solusi Tradisional (Centralized Clearinghouses)

### Konten Slide
- **Mekanisme Server Sentral:** Uang bukan file di perangkat pengguna, melainkan baris data (*entry*) pada private database milik institusi.
- **Penyelesaian Double-Spending:**
  - Alice mengirim instruksi transfer ke server bank.
  - Database engine mengunci baris data akun Alice (*database row lock / serialization*).
  - Mutasi debit saldo Alice dan kredit saldo Bob dieksekusi secara atomik.
  - Permintaan kedua yang mencoba membelanjakan saldo yang sama ditolak oleh server.
- *Pondasi Sistem Modern:* Bank komersial, Visa, Mastercard, PayPal, dan ACH.
- *Visual:* Sequence diagram Alice -> Server Bank (Row Lock + Mutasi Ledger) -> Notifikasi ke Bob.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Solusi industri selama ini: gunakan pihak ketiga tepercaya (*trusted intermediary*).
- Bank bekerja dengan row locks di database relasional mereka.
- Solusi ini berhasil mencegah double-spending, tetapi menciptakan ketergantungan penuh pada satu entitas.

**Naskah Tutur (Voiceover Script):**
Sebelum adanya teknologi blockchain, satu-satunya cara manusia memecahkan double spending pada ranah digital adalah dengan menghadirkan pihak ketiga: clearinghouse terpusat.
Ini adalah arsitektur yang dipakai oleh seluruh perbankan modern, Visa, Mastercard, dan aplikasi dompet digital hari ini.
Di sistem ini, uang kita sebenarnya bukan berada di HP kita.
Uang kita hanyalah baris catatan di database internal milik bank.
Ketika Alice mau membayar Bob, Alice tidak mengirim token langsung ke Bob.
Alice mengirim permintaan ke bank, lalu database engine bank akan mengunci baris akun Alice menggunakan mekanisme database serialization.
Jika Alice mencoba mengirim saldo yang sama ke Charlie di saat bersamaan, server langsung mendeteksi bahwa saldo Alice sudah didebit dan permintaan kedua seketika ditolak.
Masalah double-spending selesai dengan rapi, tapi arsitektur ini memicu masalah baru.

---

## Slide 7: Biaya Struktural Sistem Terpusat

### Konten Slide
- **Single Point of Failure:** Gangguan teknis atau serangan siber pada server pusat melumpuhkan seluruh aktivitas ekonomi jaringan.
- **Censorship & Financial Exclusion:** Pengelola database memiliki kuasa mutlak untuk membekukan rekening atau menolak transaksi sepihak.
- **Surveillance & Erosi Privasi:** Setiap jejak transaksi finansial terekam, dianalisis, dan rentan terhadap penyalahgunaan data.
- **Monetary Debasement:** Pasokan moneter terpusat rentan terhadap inflasi dan pencetakan tanpa batas oleh otoritas penerbit.
- **Rent Extraction:** Beban potongan biaya transaksi (*interchange fees*) berkisar 2 sampai 4 persen pada setiap aliran ekonomi global.
- *Visual:* Ikon matriks risiko sentralisasi: outage, blokir akun, profiling data, inflasi fiat, dan potongan biaya perantara.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah trust: kita dipaksa percaya pada integritas satu lembaga.
- Titik kegagalan tunggal: server mati, ekonomi macet.
- Sensor transaksi dan privasi yang hilang.
- Misi Cypherpunk: bagaimana mendapatkan kenyamanan digital tanpa kehilangan kedaulatan uang tunai fisik.

**Naskah Tutur (Voiceover Script):**
Meskipun solusi database terpusat ini bekerja, ada harga mahal yang harus dibayar oleh masyarakat.
Pertama, ada risiko *single point of failure*.
Kalau server utama bank atau payment gateway tumbang karena bencana alam atau serangan siber, ekonomi berhenti berputar seketika.
Kedua, risiko sensor finansial.
Karena operator memegang kendali penuh atas database, mereka bisa membekukan aset siapa pun secara sepihak atas tekanan politik atau kebijakan korporat.
Ketiga, privasi hilang total karena semua riwayat belanja kita dicatat dan diprofiling.
Terakhir, ada pajak friksi berupa potongan biaya 2 hingga 4 persen di setiap transaksi ritel global.
Dari sinilah para peneliti kriptografi di era 1980-an dan 1990-an yang dikenal sebagai Cypherpunks mulai bertanya: bisakah kita menciptakan uang digital yang nyaman seperti internet, tapi punya sifat mandiri, privat, dan tahan sensor seperti uang tunai fisik?

---

## Slide 8: Era Cypherpunk: David Chaum & DigiCash (1982 - 1998)

### Konten Slide
- **Inovasi Blind Signatures (1982):** Memungkinkan bank memvalidasi keabsahan token digital tanpa pernah melihat nomor seri koin tersebut.
- **Analogi Amplop Berkarbon:** Pengguna memasukkan nomor seri ke dalam amplop berkarbon; teller menandatangani amplop dari luar, cap tembus ke slip di dalam.
- **Kelemahan Fatal DigiCash:**
  - *Verifikasi Waktu Nyata:* Penerima tetap wajib menghubungi mint server pusat untuk memastikan nomor seri belum pernah dicairkan.
  - *Sentralisasi Operasional:* DigiCash adalah perusahaan berbadan hukum. Ketika bangkrut pada 1998, server mint mati dan seluruh token eCash seketika menjadi tidak bernilai.
- *Visual:* Sequence diagram alur Blind Signature: Blinding -> Bank Signs Blinded Token -> Unblinding -> Settlement Check ke Mint Server.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- David Chaum adalah bapak uang digital kriptografis.
- Blind signature berhasil memberikan privasi dan anonimitas matematis sempurna.
- Titik kegagalan tetap pada server mint: perusahaannya bangkrut, uangnya mati.

**Naskah Tutur (Voiceover Script):**
Eksperimen digital cash pertama yang sangat serius dibangun oleh Dr. David Chaum pada era 1980-an lewat perusahaannya, DigiCash, dengan protokol bernama eCash.
Chaum menciptakan terobosan matematis yang disebut *blind signatures*.
Bayangkan kalian menulis nomor seri unik di selembar kertas, lalu memasukkannya ke dalam amplop yang dilapisi kertas karbon.
Kalian bawa amplop itu ke bank bersama uang sepuluh dolar tunai.
Pihak bank menandatangani bagian luar amplop tanpa membukanya.
Karena ada karbon di dalam, tanda tangan bank tembus ke slip kertas rahasia tersebut.
Kalian pulang, membuka amplop, dan sekarang kalian memegang uang digital sah bertanda tangan bank tanpa pihak bank tahu berapa nomor serinya.
Privasinya sempurna, bank tidak bisa melacak siapa yang membelanjakan koin itu.
Tetapi kelemahannya fatal: setiap kali transaksi terjadi, pedagang tetap harus mengecek ke server sentral DigiCash apakah koin itu sudah pernah dibelanjakan atau belum.
Begitu perusahaan DigiCash bangkrut pada tahun 1998 dan servernya dimatikan, semua koin eCash langsung hilang nilainya begitu saja.

---

## Slide 9: Adam Back & Hashcash (1997)

### Konten Slide
- **Latar Belakang:** Protokol email terbuka (SMTP) kewalahan menghadapi spam massal karena biaya marjinal mengirim pesan mendekati nol.
- **Konsep Proof of Work (PoW):** Mengharuskan CPU pengirim memecahkan teka-teki kriptografi yang membutuhkan daya komputasi nyata sebelum pesan diterima.
- **Asymmetric Verification:**
  - *Sangat Sulit Dihitung:* Pengirim harus menguji jutaan *nonce* secara sekuensial hingga menghasilkan hash SHA-1 dengan awalan puluhan bit nol.
  - *Sangat Mudah Diverifikasi:* Penerima hanya butuh satu kali kalkulasi hash untuk membuktikan keabsahan bukti kerja tersebut.
- **Batas Kemampuan:** Efektif membendung spam, tetapi belum bisa menjadi uang karena tidak dapat ditransfer dan tergerus peningkatan efisiensi hardware (Moore's Law).
- *Visual:* Diagram komputasi sender mencari nonce (1 detik CPU) vs penerima verifikasi instan (1 kalkulasi hash).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah spam email mirip dengan masalah double spending: tidak adanya friksi komputasi.
- Adam Back menciptakan konsep Proof of Work lewat Hashcash.
- Karakteristik penting: asimetris (mencari solusinya berat, memverifikasinya instan).

**Naskah Tutur (Voiceover Script):**
Melihat kegagalan server sentral, para kriptografer mulai mencari cara menciptakan batasan berbasis energi matematika.
Pada tahun 1997, Dr. Adam Back menciptakan Hashcash.
Waktu itu masalah utamanya adalah spam email.
Spammer bisa mengirim jutaan email sampah per menit karena tidak ada biaya.
Adam Back membuat aturan: sebelum email dikirim, komputer pengirim harus memecahkan sebuah teka-teki kriptografi dulu dengan mencari nilai acak bernama *nonce*, sampai hash dari header email tersebut memiliki deretan angka nol di depannya.
Karena sifat fungsi hash acak, tidak ada jalan pintas.
Komputer harus menebak jutaan kali sampai dapat, yang memakan waktu sekitar satu detik kerja prosesor.
Bagi pengguna normal yang kirim sepuluh email sehari, satu detik per email tidak terasa.
Tapi buat spammer yang mau kirim sepuluh juta email, server mereka akan terbakar atau bangkrut membayar listrik.
Sifat ini disebut *asymmetric verification*: mencari solusinya butuh energi besar, tapi penerima bisa memverifikasinya hanya dalam satu mikrodetik.
Inilah cikal bakal Proof of Work, meskipun Hashcash waktu itu belum bisa ditransfer antar-orang sebagai uang.

---

## Slide 10: Rintangan Terakhir: B-Money & Bit Gold (1998)

### Konten Slide
- **B-Money (Wei Dai):** Ide pertama ledger moneter tanpa server sentral; setiap simpul P2P menyimpan salinan saldo masing-masing.
  - *Hambatan:* Tidak ada mekanisme konsensus desentralistik untuk menyepakati urutan kronologis transaksi tanpa jam global (*global clock*).
- **Bit Gold (Nick Szabo):** Mengaitkan kelangkaan digital dengan pengorbanan komputasi nyata (*unforgeable costliness*), merantai solusi hash secara berurutan.
  - *Hambatan:* Title registry kepemilikan mengandalkan voting berbasis alamat server atau alamat IP.
- **Ancaman Sybil Attack:** Penyerang dapat membuat ribuan identitas virtual palsu dengan biaya murah untuk menguasai mayoritas suara jaringan.
- *Visual:* Peta komparasi b-money (terkendala urutan waktu) vs Bit Gold (terkendala Sybil Attack pada title registry).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Wei Dai merancang b-money: ledger tersebar, tapi gagal menentukan urutan waktu transaksi.
- Nick Szabo merancang Bit Gold: konsep kelangkaan digital pertama, mirip Bitcoin.
- Kelemahan Bit Gold: voting berbasis IP address mudah diserang lewat Sybil Attack.

**Naskah Tutur (Voiceover Script):**
Pada tahun 1998, dua peneliti lain membawa gagasan ini selangkah lebih dekat.
Pertama, Wei Dai mengusulkan *b-money*.
Ini adalah konsep pertama di mana setiap komputer di jaringan menyimpan salinan saldo bersama secara peer-to-peer tanpa server sentral.
Namun, b-money punya satu kelemahan besar: bagaimana semua komputer bisa sepakat tentang urutan transaksi jika tidak ada jam global?
Kalau ada dua transaksi bertentangan dikirim bersamaan, latensi membuat sebagian komputer menerima transaksi A duluan, sementara sebagian lain menerima transaksi B duluan.
Ledger mereka pecah dan tidak pernah bisa sinkron.
Di tahun yang sama, Nick Szabo merancang *Bit Gold*.
Szabo menyadari bahwa uang komoditas seperti emas bernilai karena butuh biaya nyata untuk menambangnya, yang dia sebut *unforgeable costliness*.
Dia merancang teka-teki Proof of Work berantai untuk menciptakan kelangkaan digital.
Sayangnya, Bit Gold tetap macet karena sistem pencatatan kepemilikannya mengandalkan voting suara terbanyak dari alamat server.
Di internet bebas, seorang penyerang bisa dengan mudah menyewa ribuan IP address palsu untuk memenangkan voting.
Ini adalah celah mematikan bernama *Sybil Attack*.

---

## Slide 11: Sintesis Nakamoto (Bitcoin 2008)

### Konten Slide
- **Bukan Menemukan Primitif Baru:** Satoshi Nakamoto menggabungkan fondasi yang sudah ada menjadi satu mesin konsensus yang koheren.
  - *Asymmetric Cryptography (1970-an):* Mengamankan hak kepemilikan dan otorisasi transfer nilai.
  - *Peer-to-Peer Networking (1990-an):* Menghilangkan ketergantungan pada server sentral.
  - *Merkle Trees (1979):* Memungkinkan verifikasi data transaksi dalam skala besar secara ringkas.
  - *Hashcash Proof of Work (1997):* Mengikat hak konsensus pada daya komputasi termodinamika riil.
- **Solusi Sybil Attack:** Mengganti voting "satu IP satu suara" menjadi **"satu CPU satu suara"** (kekuatan hash termodinamika riil).
- *Visual:* Diagram arsitektur Nakamoto Synthesis: 4 pilar (Kriptografi, P2P, Merkle Tree, PoW) mengerucut ke Nakamoto Consensus Engine.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Satoshi tidak menemukan matematika baru dari nol.
- Kekuatan Bitcoin adalah menyatukan potongan puzzle yang tercecer selama tiga puluh tahun.
- Mengatasi Sybil Attack: voting tidak dihitung dari jumlah akun, melainkan dari jumlah energi komputasi yang dibakar.

**Naskah Tutur (Voiceover Script):**
Sampai akhirnya pada Oktober 2008, seorang peneliti anonim bernama Satoshi Nakamoto menerbitkan whitepaper Bitcoin.
Hal menarik dari Satoshi adalah: dia sebenarnya tidak menciptakan formula matematika atau primitif kriptografi baru.
Satoshi mengambil potongan-potongan puzzle yang sudah ditemukan selama tiga dekade sebelumnya: kriptografi kunci publik dari era 70-an, jaringan peer-to-peer dari era 90-an, pohon Merkle, dan Proof of Work milik Adam Back.
Dia merangkai semuanya menjadi satu mesin konsensus yang utuh.
Langkah revolusioner pertama Satoshi adalah menyelesaikan masalah Sybil Attack yang sebelumnya menghentikan Nick Szabo.
Satoshi tidak menggunakan sistem satu alamat IP satu suara, karena identitas virtual sangat murah untuk dipalsukan.
Satoshi mengikat hak voting langsung ke energi fisik di dunia nyata: satu CPU satu suara, atau lebih tepatnya satu hash per detik satu suara.
Untuk bisa memanipulasi jaringan, penyerang tidak cukup membuat ribuan akun palsu, melainkan harus menguasai daya komputasi dan listrik yang lebih besar daripada gabungan seluruh peserta jujur di dunia.

---

## Slide 12: Resolusi Konsensus & The Longest-Chain Rule

### Konten Slide
- **Blok Transaksi Terantai:** Transaksi dikelompokkan ke dalam blok yang saling mengikat secara kriptografis menggunakan hash blok sebelumnya.
- **Penyelesaian Dilema Urutan Waktu:**
  - Jika terjadi dua transaksi bertentangan (upaya double-spend), para penambang akan memproses blok mana pun yang mereka terima pertama kali.
  - Probabilitas penemuan hash memastikan salah satu cabang rantai akan menemukan blok berikutnya lebih dulu.
- **The Longest Chain Rule:** Seluruh simpul jaringan wajib mengadopsi rantai terpanjang dengan akumulasi Proof of Work terbesar sebagai kebenaran objektif.
- *Visual:* Diagram percabangan fork (dua cabang blok bersaing) yang akhirnya dimenangkan oleh rantai terpanjang dengan Proof of Work terbanyak.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Transaksi dikemas dalam blok yang dirantai oleh hash.
- Mengubah data masa lalu mustahil karena harus menghitung ulang seluruh Proof of Work berikutnya.
- Longest-chain rule: jaringan secara otomatis sepakat pada satu versi kebenaran sejarah tanpa perlu server pusat.

**Naskah Tutur (Voiceover Script):**
Inovasi brilian kedua Satoshi adalah menyelesaikan urutan waktu yang sempat membingungkan Wei Dai.
Satoshi mengelompokkan transaksi ke dalam *blocks*, lalu setiap blok diikat secara kriptografis ke hash dari blok sebelumnya, membentuk apa yang kita sebut *blockchain*.
Karena setiap blok bergantung pada blok pendahulunya, mengubah satu saja transaksi di masa lalu mewajibkan penyerang untuk menghitung ulang Proof of Work dari blok tersebut beserta seluruh blok yang ada di atasnya.
Ini secara matematis hampir mustahil dilakukan.
Lalu bagaimana jika Alice mencoba double-spending dengan mengirim dua transaksi secara serentak ke dua arah berbeda?
Jaringan mungkin sempat terbelah sementara menjadi dua cabang.
Tetapi karena penemuan solusi hash bersifat acak, salah satu cabang pasti akan menemukan blok berikutnya lebih cepat daripada cabang lainnya.
Satoshi menetapkan satu aturan konsensus universal yang sederhana tapi elegan: *the longest-chain rule*.
Semua node di seluruh dunia wajib mematuhi rantai valid yang memiliki akumulasi Proof of Work terbanyak sebagai catatan sejarah yang sah.
Dengan dua pilar ini, untuk pertama kalinya dalam sejarah, masalah double spending berhasil dipecahkan tanpa membutuhkan satu pun server sentral.

---

## Slide 13: Jembatan ke Modul Berikutnya (Verification at Scale)

### Konten Slide
- **Tantangan Baru yang Muncul:** Nakamoto Consensus berhasil menyepakati urutan kronologis transaksi global tanpa server pusat.
- **Pertanyaan Skalabilitas & Verifikasi:**
  - Bagaimana sebuah simpul (*node*) memverifikasi keabsahan jutaan transaksi tanpa harus mengunduh dan membaca ulang seluruh riwayat dunia dari awal?
  - Jika verifikasi data menuntut membaca setiap byte dari nol, jaringan akan runtuh oleh beban datanya sendiri.
- **Materi Modul Berikutnya:** Membedah pondasi matematis verifikasi instan dalam *O(log n)*: **Cryptographic Hash Functions and Merkle Trees**.
- *Visual:* Ilustrasi node ringan memverifikasi potongan kecil data transaksi menggunakan Merkle Proof jalur hijau menuju Merkle Root.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah konsensus selesai, tapi timbul pertanyaan baru: verifikasi data.
- Bagaimana node bisa memeriksa jutaan transaksi secara cepat tanpa beban komputasi raksasa?
- Teaser materi modul 1.2: Cryptographic Hash Functions & Merkle Trees.

**Naskah Tutur (Voiceover Script):**
Sekarang konsensus desentralistik sudah tercapai.
Ribuan komputer anonim di seluruh dunia akhirnya bisa sepakat tentang sejarah mutasi saldo tanpa saling percaya dan tanpa bank sentral.
Namun, arsitektur ini memunculkan tantangan teknik berikutnya.
Bayangkan ada jutaan transaksi yang terjadi setiap bulan.
Bagaimana cara komputer kita memverifikasi bahwa sebuah transaksi di dalam blok benar-benar sah dan tidak dimanipulasi, tanpa kita harus mengunduh dan membaca ulang seluruh data transaksi dari blok pertama di masa lalu?
Kalau setiap kali verifikasi kita harus membaca ulang seluruh isi hard drive jaringan, sistem ini akan runtuh terbebani datanya sendiri.
Untuk menjawab bagaimana verifikasi data bisa dilakukan secara instan, aman, dan matematis tanpa mempercayai siapa pun, di modul berikutnya kita akan membedah fondasi matematis dari seluruh arsitektur ini: Cryptographic Hash Functions dan Merkle Trees.
Sampai jumpa di modul berikutnya.
