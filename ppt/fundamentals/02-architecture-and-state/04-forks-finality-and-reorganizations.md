# Forks, Finality, and Reorganizations
Modul Presentasi: Arsitektur dan State (02.4)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Forks, Finality, and Reorganizations
- **Track:** Architecture and State
- **Fokus Utama:** Mekanisme percabangan rantai, perbedaan soft fork dan hard fork, resolusi reorganisasi blok akibat latensi jaringan, serta pencapaian finalitas transaksi.
- *Visual:* Diagram percabangan blockchain yang terbelah menjadi dua cabang dan diselesaikan oleh algoritma fork-choice rule.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul penutup Chapter 02: Forks, Finality, and Reorganizations.
- Membahas apa yang terjadi ketika simpul jaringan memiliki versi sejarah yang berbeda.
- Menjelaskan dua arti kata fork: pembaruan software versus tabrakan blok akibat latensi.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul penutup dari bab Arsitektur dan State.
Pada modul-modul terdahulu, kita telah melihat bagaimana transaksi dikemas ke dalam header blok dan bagaimana status dicatat di dalam database.
Semua konsep tersebut mengasumsikan bahwa seluruh komputer di dunia selalu sepakat pada satu garis waktu sejarah yang sama.
Namun di dunia nyata, internet adalah lingkungan yang penuh ketidakpastian.
Tidak ada jam pusat dan tidak ada server pengendali utama.
Serat optik membutuhkan waktu ratusan milidetik untuk membawa data melintasi samudra.
Ketika dua penambang menemukan blok sah di detik yang sama, atau ketika pengembang memperbarui kode program, rantai sejarah akan terbelah.
Fenomena inilah yang kita sebut sebagai fork.
Hari ini kita akan mengupas tuntas mengapa percabangan bisa terjadi, bagaimana jaringan menyembuhkan dirinya dari perpecahan, dan kapan sebuah transaksi benar-benar sah secara permanen.

---

## Slide 2: Dua Wajah "Fork": Upgrade vs Latensi

### Konten Slide
- **Ambiguitas Istilah "Fork":** Dalam terminologi blockchain, kata *fork* merujuk pada dua fenomena rekayasa yang sangat berbeda:
- **1. Consensus Rule Upgrades (Pembaruan Aturan Konsensus):**
  - Modifikasi yang disengaja atau diperdebatkan terhadap kode validasi perangkat lunak klien.
  - Diklasifikasikan menjadi **Soft Fork** (pengetatan aturan) dan **Hard Fork** (pelonggaran aturan).
- **2. Transient State Divergences (Percabangan Status Sementara):**
  - Percabangan rantai yang tidak disengaja akibat keterlambatan propagasi data di jaringan peer-to-peer.
  - Menyebabkan fenomena **Block Reorganization (Reorg)** dan blok yatim (*orphaned blocks*).
- *Visual:* Bagan dikotomi memisahkan ranah upgrade aturan protokol (Hard/Soft Fork) dan ranah tabrakan propagasi fisik jaringan (Reorgs).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kata fork memiliki dua arti yang berbeda secara fundamental.
- Arti pertama: upgrade aturan software yang disengaja oleh developer atau komunitas.
- Arti kedua: tabrakan blok sementara akibat latensi fisik jaringan internet.

**Naskah Tutur (Voiceover Script):**
Sebelum melangkah lebih jauh, kita harus meluruskan satu istilah yang sering membingungkan: kata fork.
Di dunia blockchain, kata fork digunakan untuk mendeskripsikan dua hal yang sama sekali berbeda.
Makna pertama berkaitan dengan evolusi perangkat lunak: pembaruan aturan konsensus yang dilakukan oleh para pengembang.
Ini terbagi menjadi soft fork dan hard fork.
Makna kedua adalah kejadian alamiah di tingkat jaringan: tabrakan blok sementara akibat latensi internet global.
Ketika dua blok sah muncul bersamaan di dua benua berbeda, rantai terbelah sementara sampai protokol menyatukannya kembali lewat proses yang disebut reorganisasi blok.
Kita akan membedah kategori pertama terlebih dahulu: pembaruan aturan konsensus.

---

## Slide 3: Soft Forks: Pengetatan Aturan Kompatibel

### Konten Slide
- **Definisi Soft Fork:** Modifikasi protokol di mana aturan validasi dibuat **lebih ketat** atau dibatasi ke dalam himpunan bagian (*subset*):
  $$\text{Valid}_{\text{new}} \subset \text{Valid}_{\text{old}}$$
- **Backward Compatibility:** Simpul versi lama yang belum melakukan upgrade tetap menganggap blok-blok baru sebagai blok yang sah.
- **Mekanisme Penegakan:**
  - Jika mayoritas kekuatan hash penambang atau stake validator mengadopsi aturan baru, rantai baru akan tumbuh lebih cepat.
  - Simpul lama secara otomatis mengikuti rantai baru karena mematuhi aturan rantai terpanjang (*longest-chain rule*).
- **Kasus Historis di Bitcoin:**
  - *BIP-66 (2015):* Pengetatan format tanda tangan DER ketat untuk menghapus celah signature malleability.
  - *BIP-141 Segregated Witness / SegWit (2017):* Pemisahan data tanda tangan ke struktur witness tersendiri di luar batas 1 MB.
  - *BIP-340/341/342 Taproot (2021):* Penambahan tanda tangan Schnorr dengan memanfaatkan opcode kosong yang sudah ada.
- *Visual:* Diagram himpunan Venn: lingkaran Valid_new berada sepenuhnya di dalam lingkaran besar Valid_old.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Soft fork mempersempit aturan validasi lama (subset).
- Sifatnya backward-compatible: simpul lama tidak dipaksa upgrade untuk tetap sinkron.
- Contoh besar: SegWit dan Taproot di Bitcoin.

**Naskah Tutur (Voiceover Script):**
Soft fork adalah pembaruan protokol yang sifatnya memperketat aturan yang sudah ada.
Secara matematika himpunan, semua blok yang sah menurut aturan baru dijamin sah juga menurut aturan lama.
Keunggulan utama soft fork adalah sifatnya yang *backward-compatible*.
Komputer atau simpul lama yang belum mengunduh pembaruan perangkat lunak tidak akan terputus dari jaringan.
Mereka tetap membaca blok-blok baru sebagai blok yang valid karena blok baru tersebut tidak melanggar batas aturan lama apa pun.
Selama mayoritas penambang menerapkan aturan yang lebih ketat ini, rantai baru akan selalu menang dalam akumulasi Proof of Work.
Contoh paling terkenal adalah pembaruan SegWit pada Bitcoin tahun 2017.
SegWit memindahkan data tanda tangan digital ke luar batas blok 1 megabyte lama.
Bagi komputer versi lama, transaksi SegWit terlihat seperti skrip biasa yang sah, sementara komputer versi baru menerapkan verifikasi tanda tangan di pohon witness terpisah.

---

## Slide 4: Hard Forks: Ekspansi Aturan dan Pemisahan Rantai

### Konten Slide
- **Definisi Hard Fork:** Modifikasi protokol di mana aturan diperlonggar, diperluas, atau diubah secara fundamental:
  $$\text{Valid}_{\text{new}} \not\subset \text{Valid}_{\text{old}}$$
- **Non-Backward Compatibility:** Blok yang dibuat di bawah aturan baru akan langsung ditolak mentah-mentah oleh simpul lama sebagai data tidak sah (*invalid*).
- **Tuntutan Upgrade Mutlak:** Seluruh operator simpul penuh, bursa kripto, penambang, dan dompet wajib memperbarui perangkat lunak mereka secara serentak.
- **Risiko Perpecahan Rantai Permanen (*Permanent Chain Split*):**
  - Jika seluruh komunitas sepakat, rantai lama ditinggalkan dan punah.
  - Jika ada faksi minoritas yang menolak aturan baru dan tetap menjalankan software lama, blockchain akan terbelah menjadi dua koin independen dengan riwayat masa lalu yang sama.
- *Visual:* Diagram percabangan permanen: satu jalur terbelah menjadi dua rantai independen yang berjalan berdampingan selamanya.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Hard fork melonggarkan atau mengubah aturan dasar sistem (non-backward-compatible).
- Simpul lama akan langsung menolak blok baru sebagai data ilegal.
- Jika ada komunitas yang bertahan di aturan lama, jaringan terbelah permanen menjadi dua mata uang baru.

**Naskah Tutur (Voiceover Script):**
Berlawanan dengan soft fork, hard fork adalah pembaruan yang sifatnya melonggarkan atau mengubah aturan dasar sistem.
Dalam hard fork, blok yang dihasilkan oleh software baru dianggap ilegal oleh software versi lama.
Ini berarti hard fork tidak memiliki sifat backward-compatibility.
Jika sebuah jaringan memutuskan menaikkan batas ukuran blok dari 1 megabyte menjadi 8 megabyte, simpul lama yang masih memegang batas 1 megabyte akan langsung menolak dan membuang blok baru tersebut.
Seluruh peserta jaringan wajib melakukan upgrade secara serempak.
Jika ada sekelompok penambang atau pengguna yang menolak aturan baru tersebut dan memilih terus menjalankan kode lama, maka konsekuensinya permanen.
Blockchain tersebut akan terbelah menjadi dua rantai independen yang berjalan sendiri-sendiri, masing-masing membawa koin yang berbeda tetapi berbagi riwayat sejarah yang sama sebelum titik percabangan.

---

## Slide 5: Pelajaran Sejarah: Tiga Peristiwa Hard Fork Nyata

### Konten Slide
- **1. The 2013 Bitcoin Database Split (Maret 2013):**
  - Bitcoin Core 0.8 beralih database dari BerkeleyDB ke LevelDB.
  - Blok besar memicu crash pada simpul lama versi 0.7 akibat keterbatasan memory lock BerkeleyDB.
  - Jaringan terbelah tanpa sengaja selama 6 jam hingga para penambang berkoordinasi di kanal chat IRC untuk menurunkan versi (*downgrade*) ke 0.7.
- **2. The DAO Fork (Ethereum 2016):**
  - Peretas mengeksploitasi celah reentrancy pada smart contract The DAO dan mencuri 3,6 juta ETH.
  - Mayoritas komunitas mengeksekusi hard fork pemulihan dana untuk mengembalikan aset korban.
  - Faksi minoritas berpegang teguh pada prinsip *"Code is Law"*, melahirkan perpecahan permanen: **Ethereum (ETH)** dan **Ethereum Classic (ETC)**.
- **3. The Merge (Ethereum 2022):**
  - Hard fork konsensus yang direncanakan secara presisi selama bertahun-tahun.
  - Sukses mematikan penambangan Proof of Work dan memindahkan seluruh status eksekusi ke lapisan Proof of Stake Beacon Chain tanpa membelah rantai utama.
- *Visual:* Garis waktu historis tiga peristiwa besar: Bug BerkeleyDB 2013, Pemisahan ETH/ETC 2016, dan Transisi The Merge 2022.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga kasus nyata evolusi hard fork: kecelakaan teknis, perpecahan ideologis, dan upgrade terencana.
- Kasus 2013 membuktikan bug internal database bisa memicu hard fork tanpa sengaja.
- The DAO melahirkan Ethereum Classic, sedangkan The Merge membuktikan hard fork masif bisa berjalan mulus.

**Naskah Tutur (Voiceover Script):**
Sejarah blockchain dipenuhi studi kasus nyata yang sangat berharga mengenai hard fork.
Peristiwa pertama terjadi pada Maret 2013 di Bitcoin.
Waktu itu pengembang memperbarui database internal dari BerkeleyDB ke LevelDB.
Tiba-tiba sebuah blok besar tidak sengaja membuat simpul versi lama mati karena batas memori database lama terlampaui.
Bitcoin terbelah menjadi dua rantai selama enam jam, sampai para pemilik mining pool berkoordinasi darurat di ruang obrolan IRC untuk menurunkan kembali versi perangkat lunak mereka.
Peristiwa kedua adalah The DAO Fork di Ethereum tahun 2016.
Setelah peretas mencuri 3,6 juta koin Ether melalui eksploitasi smart contract, mayoritas komunitas memilih hard fork untuk membatalkan pencurian tersebut.
Namun faksi minoritas berpendapat bahwa sejarah kode tidak boleh diubah atas alasan apa pun.
Perdebatan filosofis ini membelah jaringan secara permanen dan melahirkan dua koin yang kita kenal sekarang: Ethereum dan Ethereum Classic.
Dan peristiwa ketiga adalah The Merge pada tahun 2022, yaitu hard fork terencana yang berhasil mematikan mesin Proof of Work dan beralih ke Proof of Stake tanpa menghentikan aktivitas aplikasi sama sekali.

---

## Slide 6: Fork Transien dan Latensi Jaringan Global

### Konten Slide
- **Realitas Fisik Jaringan Terdistribusi:** Bahkan ketika seluruh simpul di bumi menjalankan versi software yang identik 100 persen, fork tetap terjadi setiap hari.
- **Skenario Tabrakan Blok Simultan:**
  - Penambang A di Islandia menemukan blok sah di ketinggian blok $N$.
  - Pada milidetik yang sama persis, Penambang B di Singapura menemukan blok sah lain di ketinggian blok $N$.
- **Propagasi Serat Optik:**
  - Dibutuhkan waktu 100 hingga 200 milidetik bagi sinyal cahaya untuk melintasi jaringan internet antarbenua.
  - Simpul di Eropa menerima Blok $N_A$ duluan dan menjadikannya ujung rantai mereka.
  - Simpul di Asia menerima Blok $N_B$ duluan dan menjadikannya ujung rantai mereka.
- **Divergensi Status Sementara:** Jaringan global terbelah secara alami menjadi dua realitas sejarah yang sama-sama valid.
- *Visual:* Peta dunia memperlihatkan sinyal blok dari Islandia dan Singapura merambat berlawanan arah di atas kabel bawah laut.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Fork transien terjadi bukan karena beda aturan software, tapi karena batasan kecepatan cahaya di kabel serat optik.
- Dua penambang di lokasi berbeda bisa menemukan blok valid pada milidetik yang sama.
- Sebagian dunia memegang blok A, sebagian lain memegang blok B.

**Naskah Tutur (Voiceover Script):**
Sekarang kita beralih ke jenis fork yang kedua: fork transien atau percabangan sementara.
Fenomena ini terjadi bukan karena perbedaan kode software, melainkan murni akibat batasan hukum fisika.
Kecepatan cahaya di dalam kabel serat optik membutuhkan waktu sekitar seratus hingga dua ratus milidetik untuk merambat antarbenua.
Bayangkan ada Penambang A di Islandia dan Penambang B di Singapura.
Keduanya memecahkan teka-teki Proof of Work pada milidetik yang sama persis di ketinggian blok yang sama.
Keduanya langsung menyiarkan blok temuan mereka ke tetangga terdekat.
Simpul-simpul di kawasan Eropa menerima blok Islandia lebih dulu dan mulai menambang di atasnya.
Di saat yang sama, simpul-simpul di kawasan Asia menerima blok Singapura lebih dulu dan mulai menambang di atas blok tersebut.
Untuk beberapa saat, dunia terbelah menjadi dua versi kebenaran yang sama-sama sah.
Bagaimana sistem menyatukan kembali sejarah ini secara otomatis tanpa bantuan wasit terpusat?

---

## Slide 7: Anatomi Block Reorganization (Reorg)

### Konten Slide
- **Proses Poisson yang Memecah Kebuntuan:** Penemuan blok berikutnya bersifat acak murni, sehingga hampir mustahil kedua belah pihak menemukan blok $N+1$ secara bersamaan lagi.
- **Kronologi Terjadinya Reorg:**
  1. Penambang C menemukan Blok $N+1$ di atas Blok $N_A$ (cabang Islandia) dan menyiarkannya ke seluruh dunia.
  2. Simpul-simpul di Asia menerima paket rantai baru tersebut.
  3. Simpul Asia mengevaluasi: cabang $[N_A \to N+1]$ memiliki **dua blok bukti kerja**, sedangkan cabang lokal $[N_B]$ hanya memiliki **satu blok**.
  4. Simpul Asia tunduk pada aturan konsensus dan mengeksekusi **Block Reorganization (Reorg)**.
- **Langkah Pemulihan Status:**
  - Membatalkan (*rollback*) seluruh mutasi saldo dari Blok $N_B$.
  - Menerapkan (*apply*) seluruh mutasi status dari Blok $N_A$ dan Blok $N+1$.
  - Blok $N_B$ dicabut statusnya dan menjadi **Orphaned Block** (atau *stale block*).
  - Transaksi unik di Blok $N_B$ dikembalikan ke mempool untuk ditambang di masa depan.
- *Visual:* Diagram rollback cabang B yang kalah dan transisi simpul menuju cabang rantai A yang lebih panjang.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Penemuan blok N+1 memecahkan kebuntuan secara otomatis.
- Simpul di cabang yang kalah melakukan rollback status dan mengadopsi cabang yang lebih berbobot.
- Blok yang kalah menjadi orphaned block dan transaksinya dikembalikan ke mempool.

**Naskah Tutur (Voiceover Script):**
Kebuntuan ini akan segera terpecahkan pada blok berikutnya.
Karena penambangan adalah proses acak independen, kemungkinan kedua cabang menemukan blok berikutnya secara bersamaan lagi adalah mendekati nol.
Katakanlah seorang penambang di Amerika Serikat menemukan blok nomor N plus satu yang dibangun di atas blok Islandia.
Blok baru ini langsung disiarkan ke seluruh dunia.
Ketika simpul-simpul di Asia menerima blok tersebut, perangkat lunak mereka langsung membandingkan kedua jalur.
Jalur Islandia sekarang memiliki dua blok akumulasi Proof of Work, sedangkan jalur Singapura lokal mereka hanya memiliki satu blok.
Berdasarkan aturan rantai terpanjang, simpul-simpul di Asia secara otomatis mengeksekusi apa yang disebut sebagai *Block Reorganization* atau Reorg.
Komputer mereka membatalkan seluruh transaksi di blok Singapura, lalu menerapkan transaksi dari blok Islandia beserta blok baru di atasnya.
Blok Singapura tadi resmi gugur dan menjadi *orphaned block*.
Seluruh transaksi yang tadinya ada di blok gugur tersebut dikembalikan ke mempool agar tidak ada transaksi sah yang hilang.

---

## Slide 8: Risiko Finansial: Double-Spending via Reorg

### Konten Slide
- **Eksploitasi Celah Konfirmasi Rendah:** Reorganisasi blok bukan sekadar urusan teknis, melainkan vektor utama kejahatan transfer nilai digital.
- **Skenario Serangan Double-Spend Mallory:**
  1. Mallory menyetor 1.000 koin ke sebuah bursa kripto di dalam Blok $N_B$.
  2. Bursa yang ceroboh menganggap 1 konfirmasi blok sudah aman, lalu mengizinkan Mallory mencairkan uang tunai ke rekening banknya.
  3. Secara rahasia, Mallory telah menambang cabang tandingan pribadi $[N_A \to N+1]$ di mana 1.000 koin yang sama dikirim kembali ke dompet rahasia miliknya sendiri.
  4. Mallory menyiarkan cabang rahasianya yang lebih panjang ke publik.
  5. Seluruh jaringan melakukan reorg ke rantai Mallory; Blok $N_B$ resmi menjadi yatim (*orphaned*).
  6. Catatan setoran bursa terhapus dari sejarah resmi, dan bursa kehilangan dana 1.000 koin.
- **Pertahanan Industri:** Bursa mewajibkan ambang batas multi-konfirmasi sebelum mengkredit saldo pengguna.
- *Visual:* Sequence alur kejahatan reorg double-spending: setoran di blok publik vs rantai privat yang menyalip dan membatalkan setoran.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengapa reorg berbahaya bagi sektor finansial: memungkinkan pembatalan transaksi yang sudah dianggap lunas.
- Serangan double-spend memanfaatkan bursa yang terlalu cepat mengonfirmasi deposit.
- Alasan fundamental mengapa bursa mewajibkan banyak konfirmasi blok sebelum saldo bisa ditarik.

**Naskah Tutur (Voiceover Script):**
Mengapa fenomena reorganisasi blok ini menjadi perhatian paling kritis bagi institusi finansial?
Karena reorg adalah senjata utama untuk melancarkan serangan *double-spending*.
Bayangkan seorang penyerang bernama Mallory mendepositkan seribu koin ke bursa kripto di dalam blok Singapura tadi.
Jika pihak bursa ceroboh dan langsung menganggap transaksi itu final hanya dengan satu konfirmasi blok, bursa akan mengizinkan Mallory menarik uang tunai ke rekening banknya.
Di saat yang sama, Mallory diam-diam menambang cabang rantai rahasia di mana koin seribu tadi tidak dikirim ke bursa, melainkan dikirim kembali ke dompet pribadinya.
Begitu uang tunai ditarik dari bursa, Mallory merilis cabang rahasianya yang lebih panjang ke internet.
Jaringan global seketika melakukan reorg ke rantai Mallory.
Blok yang memuat deposit bursa dinyatakan gugur dan terhapus dari sejarah resmi.
Bursa kehilangan koinnya, dan Mallory berhasil menggandakan uangnya.
Inilah alasan mendasar mengapa bursa terpercaya mewajibkan kita menunggu belasan hingga puluhan konfirmasi blok sebelum deposit kita dianggap aman.

---

## Slide 9: Fork-Choice Rule: Menentukan Rantai Kanonikal

### Konten Slide
- **Definisi Fork-Choice Rule:** Algoritma deterministik yang dijalankan secara lokal oleh setiap simpul untuk memilih satu rantai kebenaran kanonikal tanpa perantara.
- **The Heaviest-Chain Rule (Bitcoin):**
  - Publik sering menyebutnya "aturan rantai terpanjang", tetapi secara teknis yang dihitung adalah **rantai terberat**:
    $$\text{Canonical Chain} = \arg\max_{\text{chain}} \sum_{i=1}^{M} \text{Difficulty}(B_i)$$
- **Pencegahan Eksploitasi Target Rendah:**
  - Menghitung tinggi blok mentah (*block height*) sangat berbahaya.
  - Penyerang bisa memodifikasi software untuk membuat jutaan blok palsu secara instan pada tingkat kesulitan nol.
  - Dengan mengukur akumulasi tingkat kesulitan Proof of Work, simpul menjamin bahwa hanya rantai dengan pengorbanan energi termodinamika terbesar yang diakui sebagai sejarah sah.
- *Visual:* Perbandingan dua cabang: cabang dengan banyak blok mudah (kalah) versus cabang dengan sedikit blok berbobot kesulitan tinggi (menang).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Fork-choice rule adalah algoritma yang dijalankan setiap simpul secara lokal untuk memilih cabang pemenang.
- Bitcoin menghitung akumulasi total kesulitan Proof of Work, bukan jumlah blok mentah.
- Mencegah serangan rantai palsu dengan difficulty rendah yang dibuat murah oleh penyerang.

**Naskah Tutur (Voiceover Script):**
Untuk menyelesaikan setiap perselisihan cabang, setiap simpul menjalankan formula matematika lokal yang disebut *Fork-Choice Rule*.
Pada Bitcoin, aturan ini sering secara populer disebut sebagai aturan rantai terpanjang atau longest-chain rule.
Namun secara teknis, istilah yang lebih tepat adalah *heaviest-chain rule* atau aturan rantai terberat.
Sistem tidak sekadar menghitung berapa jumlah blok mentah di dalam sebuah cabang.
Sistem menjumlahkan total akumulasi kesulitan Proof of Work dari setiap blok di sepanjang rantai tersebut.
Mengapa hal ini sangat penting?
Karena jika sistem hanya menghitung tinggi blok, seorang penyerang bisa dengan mudah memanipulasi kode untuk menambang jutaan blok dalam satu detik pada tingkat kesulitan yang mendekati nol.
Dengan menghitung total bobot kesulitan, protokol memastikan bahwa cabang yang diakui sebagai kebenaran kanonikal adalah cabang yang didukung oleh pengorbanan energi komputasi termodinamika terbesar di dunia nyata.

---

## Slide 10: Evolusi Fork-Choice: Dari GHOST ke LMD-GHOST

### Konten Slide
- **1. Protokol GHOST Klasik (Ethereum Era PoW):**
  - *Latar Belakang:* Waktu blok cepat Ethereum (12 detik) memicu tingkat blok yatim hingga 10 persen, merugikan penambang kecil.
  - *Inovasi Greedy Heaviest Observed Sub-Tree:* Blok yatim dimasukkan ke dalam rantai sebagai **ommer / uncle blocks**.
  - Blok paman menyumbangkan bobot keamanannya ke rantai utama dan penambangnya menerima subsidi parsial (75% hingga 87,5%).
- **2. LMD-GHOST (Ethereum Era PoS / Gasper):**
  - *Pergeseran Paradigma:* Konsensus tidak lagi diukur dari daya komputasi hash, melainkan dari bobot suara kriptografis (*attestations*) milik validator ber-stake.
  - *Mekanisme Latest Message Driven:* Algoritma hanya menghitung pesan atestasi paling mutakhir dari setiap validator aktif.
  - Di setiap percabangan, simpul memilih blok anak yang mengumpulkan akumulasi saldo deposit validator terbesar.
- *Visual:* Bagan pohon percabangan GHOST memperlihatkan ommer block yang diikat ke rantai utama, berdampingan dengan alur voting validator LMD-GHOST.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- GHOST di PoW merangkul blok yatim sebagai paman (ommer) agar keamanan tetap kokoh di jaringan berkecepatan tinggi.
- LMD-GHOST di PoS beralih dari energi tambang ke akumulasi modal koin yang di-stake.
- Latest Message Driven memastikan hanya suara terbaru validator yang dihitung di setiap percabangan.

**Naskah Tutur (Voiceover Script):**
Seiring berkembangnya teknologi, algoritma fork-choice juga mengalami evolusi besar.
Pada masa-masa awal Ethereum ketika masih menggunakan Proof of Work dengan waktu blok cepat 12 detik, angka blok yatim sempat melonjak hingga sepuluh persen.
Untuk mengatasinya, Ethereum mengadopsi protokol GHOST.
Daripada membuang blok yatim begitu saja, sistem merangkulnya sebagai *ommer* atau blok paman.
Blok paman ini tetap menyumbangkan bobot keamanan pada rantai utama dan penambangnya tetap menerima sebagian imbalan koin.
Ketika Ethereum beralih ke Proof of Stake, algoritma ini berevolusi menjadi LMD-GHOST.
Di sistem ini, pemenang percabangan tidak lagi ditentukan oleh energi listrik prosesor, melainkan oleh akumulasi tanda tangan atau *attestation* dari para validator yang mengunci jaminan modal koin mereka.
Istilah *Latest Message Driven* berarti protokol hanya mendengarkan suara terbaru dari setiap validator, lalu memilih cabang yang didukung oleh total nilai deposit modal terbesar.

---

## Slide 11: Finalitas Probabilistik dalam Proof of Work

### Konten Slide
- **Hakikat Finalitas PoW:** Di dalam konsensus Nakamoto, **finalitas tidak pernah bersifat absolut secara matematis; ia bersifat probabilistik**.
- **Model Pembusukan Eksponensial Satoshi:**
  - Penyerang dengan kekuatan hash minoritas ($q < 0,5$) memiliki peluang mengejar rantai jujur yang menyusut secara eksponensial seiring bertambahnya blok baru.
  - Rumus probabilitas Poisson Satoshi:
    $$P \approx \sum_{k=0}^{\infty} \frac{\lambda^k e^{-\lambda}}{k!} \left( \frac{q}{p} \right)^{\max(z - k, 0)}$$
- **Standar 6 Konfirmasi:**
  - Setelah 6 blok konfirmasi (sekitar 1 jam di Bitcoin), probabilitas penyerang dengan 10% hash rate untuk membalikkan transaksi turun di bawah $0,1\%$.
  - Bahkan bagi penyerang dengan 30% hash rate, peluangnya susut di bawah $1,3\%$.
- **Batas Kelemahan:** Risiko reorg secara teoritis tetap ada jika terjadi serangan 51 persen (*51% hash rate attack*).
- *Visual:* Kurva grafik peluruhan probabilitas keberhasilan double-spend menuju nol seiring bertambahnya kedalaman blok konfirmasi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Di Proof of Work, finalitas tidak pernah 100% mutlak, melainkan bersifat probabilistik.
- Peluang pembalikan transaksi meluruh secara eksponensial seiring bertambahnya kedalaman blok konfirmasi.
- Aturan 6 blok konfirmasi Bitcoin memberikan keamanan matematis di atas 99,9 persen.

**Naskah Tutur (Voiceover Script):**
Ini membawa kita ke konsep paling esensial dalam keamanan blockchain: finalitas atau *finality*.
Kapan sebuah transaksi bisa dikatakan permanen dan tidak bisa dibatalkan lagi?
Di dalam konsensus Proof of Work, jawabannya mengejutkan: finalitas tidak pernah bernilai seratus persen mutlak secara matematika.
Finalitas di Proof of Work bersifat *probabilistik*.
Satoshi Nakamoto membuktikan di whitepaper-nya bahwa selama penyerang hanya menguasai minoritas kekuatan komputasi, peluang mereka untuk menyalip rantai jujur akan membusuk secara eksponensial seiring bertambahnya blok baru.
Inilah asal-usul aturan baku industri mengenai enam blok konfirmasi di Bitcoin.
Setelah transaksi kalian tertimbun di bawah enam blok atau sekitar satu jam, peluang penyerang dengan sepuluh persen kekuatan tambang dunia untuk membatalkan transaksi kalian turun di bawah nol koma satu persen.
Secara ekonomi dan praktis, transaksi tersebut sudah bisa dianggap final, meskipun secara teori risiko pembalikan rantai tetap ada jika terjadi serangan 51 persen.

---

## Slide 12: Finalitas Deterministik dan Ekonomi: Casper FFG

### Konten Slide
- **Evolusi Menuju Finalitas Mutlak:** Proof of Stake modern menggabungkan fork-choice rule dengan mesin finalitas (*finality gadget*) seperti Casper FFG.
- **Dua Tahap Menuju Finalisasi Epoch:**
  - Jaringan membagi waktu ke dalam epoch (32 slot / 6,4 menit di Ethereum).
  - *Justification:* Tercapai ketika lebih dari dua pertiga ($> 66,7\%$) total modal stake validator menandatangani batas checkpoint.
  - *Finalization:* Ketika checkpoint berikutnya berhasil dijustifikasi, maka checkpoint pendahulu resmi berstatus **Finalized**.
- **Garansi Ekonomi Anti-Reorg:**
  - Sekali blok berstatus final, simpul penuh tidak akan pernah melakukan reorganisasi pada blok tersebut dalam kondisi apa pun.
  - Jika ada dua checkpoint final yang bertentangan di ketinggian yang sama, protokol secara matematis membuktikan ada minimal sepertiga ($> 33,3\%$) validator yang berbuat curang.
  - **Mekanisme Slashing:** Seluruh modal koin validator curang tersebut otomatis disita dan dibakar oleh protokol (bernilai miliaran dolar).
- *Visual:* Bagan tahapan checkpoint: Blok diusulkan -> Justified via 2/3 suara -> Finalized dengan proteksi slashing modal validator.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Proof of Stake menghadirkan finalitas deterministik dan ekonomi lewat Casper FFG.
- Memerlukan konsensus 2/3 modal validator di batas epoch.
- Membalikkan blok yang sudah finalized secara matematis mengharuskan pembakaran minimal sepertiga dari total modal stake jaringan.

**Naskah Tutur (Voiceover Script):**
Untuk menghilangkan ketidakpastian probabilistik tersebut, jaringan Proof of Stake modern memperkenalkan apa yang disebut sebagai finalitas deterministik dan ekonomi melalui protokol seperti Casper FFG.
Di Ethereum, waktu dibagi menjadi epoch setiap enam koma empat menit.
Jika lebih dari dua pertiga dari total modal validator menandatangani kesepakatan batas epoch, status blok tersebut naik menjadi *justified*.
Dan ketika epoch berikutnya kembali disepakati, epoch sebelumnya resmi berstatus *finalized*.
Begitu sebuah blok mencapai status finalized, simpul di seluruh dunia menguncinya secara permanen dan tidak akan pernah mengizinkan reorganisasi blok terjadi lagi.
Lalu bagaimana jika ada kartel penyerang yang mencoba memutar balik blok yang sudah finalized?
Secara matematika protokol, tindakan tersebut hanya bisa terjadi jika minimal sepertiga dari total validator di seluruh dunia menandatangani dua suara palsu sekaligus.
Jika ini terjadi, mesin slashing protokol akan mendeteksi bukti kriptografis tersebut dan seketika membakar seluruh modal jaminan mereka sampai hangus.
Inilah garansi ekonomi: membalikkan transaksi yang sudah final membutuhkan biaya penghancuran modal bernilai miliaran dolar.

---

## Slide 13: Jembatan ke Bab Berikutnya

### Konten Slide
- **Pencapaian Lengkap Chapter 02:**
  - Kita telah membedah anatomi header dan penguncian rantai kriptografis.
  - Kita telah menelusuri siklus hidup transaksi dari dompet ke mutasi state.
  - Kita telah membandingkan model status UTXO versus model Akun.
  - Kita telah memahami bagaimana fork diselesaikan hingga mencapai finalitas permanen.
- **Teka-teki Terbesar Sistem Terdistribusi:**
  - Aturan kode perangkat lunak dapat ditulis dengan sangat rapi dan elegan.
  - Namun kode hanyalah teks digital di dalam komputer.
  - Mengapa ribuan aktor anonim, independen, dan egois di seluruh dunia memilih mematuhi aturan tersebut alih-alih berkolusi untuk mencurangi sistem?
  - Apa yang mencegah pasukan penyerang Sybil atau penambang egois meruntuhkan jaringan?
- **Materi Bab Berikutnya (Chapter 03):** Membedah titik temu antara kriptografi, termodinamika, dan insentif ekonomi dalam **Consensus Mechanisms and Game Theory**.
- *Visual:* Ikon integrasi tiga pilar penutup: Aturan Kode Kriptografis, Energi Fisik Termodinamika, dan Teori Permainan Nash Equilibrium.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Chapter 02 tuntas: Arsitektur dan State telah dipahami dari fondasi hingga finalitas.
- Menutup bab dengan pertanyaan filosofis dan ekonomis: mengapa orang mau patuh pada aturan.
- Teaser Chapter 03: Consensus Mechanisms and Game Theory.

**Naskah Tutur (Voiceover Script):**
Kita telah menuntaskan seluruh materi di bab kedua: Architecture and State.
Kalian sekarang telah menguasai bagaimana data dikemas di dalam header, bagaimana transaksi melintasi jaringan hingga dieksekusi oleh mesin virtual, bagaimana state dimodelkan di media penyimpanan, dan bagaimana konsensus menyembuhkan percabangan rantai hingga mencapai finalitas permanen.
Namun di balik semua kecanggihan mekanis ini, tersimpan satu pertanyaan ilmu komputer paling mendalam.
Kode program pada dasarnya hanyalah baris teks digital.
Siapa pun bisa memodifikasi kode tersebut di komputer mereka sendiri.
Lantas mengapa ribuan penambang, validator, dan operator simpul anonim di seluruh penjuru bumi yang tidak saling kenal dan saling bersaing, memilih untuk setia mematuhi aturan protokol yang sama alih-alih berkomplot untuk merampok jaringan?
Apa kekuatan tak terlihat yang menahan para aktor egois ini agar tetap bertindak jujur demi keuntungan mereka sendiri?
Untuk memahami bagaimana kriptografi dipadukan dengan hukum termodinamika energi dan teori permainan ekonomi, kita akan melangkah ke bab berikutnya: Chapter 03, Consensus Mechanisms and Game Theory.
Terima kasih dan sampai jumpa di bab selanjutnya.
