# Alternative and Hybrid Consensus Models
Modul Presentasi: Consensus and Game Theory (03.4)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Alternative and Hybrid Consensus Models
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Membedah spektrum inovasi konsensus di luar PoW dan PoS murni: DPoS, BFT Klasik, Jam Kriptografis (PoH), dan Arsitektur Graf Asinkron (DAG).
- *Visual:* Visualisasi spektrum arsitektur konsensus dari rantai blok linier konvensional menuju topologi grafik multi-dimensi DAG dan jam sekuensial frekuensi tinggi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul penutup bab Consensus and Game Theory.
- Memahami bahwa tidak ada algoritma konsensus tunggal yang sempurna untuk seluruh kebutuhan.
- Menjelajahi alternatif mutakhir yang dioptimalkan untuk kecepatan kilat, latensi instan, dan throughput tinggi.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul keempat dari bab Consensus and Game Theory.
Sejauh ini, kita telah mendalami dua raksasa konsensus yang paling dominan di industri: Proof of Work milik Bitcoin dan Proof of Stake milik Ethereum.
Namun, dunia sistem terdistribusi tidak berhenti di sana.
Setiap algoritma konsensus pada hakikatnya adalah kajian tentang kompromi rekayasa perangkat lunak.
Tidak ada satu pun sistem yang bisa memaksimalkan semua parameter sekaligus: kapasitas transaksi, waktu konfirmasi, desentralisasi node, konsumsi daya, dan efisiensi modal.
Kebutuhan industri yang kian beragam, mulai dari perdagangan bursa sub-detik hingga pemrosesan data paralel, telah melahirkan beragam inovasi arsitektur baru.
Hari ini kita akan membedah model konsensus alternatif dan hibrida, mulai dari Delegated Proof of Stake, evolusi BFT klasik, jam kriptografis Proof of History, hingga arsitektur modern berbasis Directed Acyclic Graph.

---

## Slide 2: Lanskap Kompromi dalam Desain Konsensus

### Konten Slide
- **Hukum Ketegangan Kompromi Rekayasa:**
  - Tidak ada algoritma konsensus yang dapat memaksimalkan seluruh dimensi secara simultan.
  - Setiap inovasi selalu mengorbankan aspek tertentu demi mengejar keunggulan di aspek lain.
- **Enam Sumbu Tarik-Menarik Desain Konsensus:**
  - **1. Throughput (TPS):** Jumlah transaksi yang sanggup diproses per detik.
  - **2. Latency to Finality:** Waktu yang dibutuhkan hingga sebuah transaksi terkunci permanen tanpa risiko pembatalan.
  - **3. Validator Decentralization:** Jumlah simpul independen yang sanggup berpartisipasi dalam konsensus.
  - **4. Fault Tolerance Threshold:** Batas toleransi maksimal terhadap partisipan yang korup atau offline.
  - **5. Network Overhead:** Jumlah bandwidth dan pesan komunikasi antar-simpul yang dibutuhkan.
  - **6. Capital Accessibility:** Batas modal minimum yang disyaratkan untuk menjadi validator.
- *Visual:* Radar chart enam sumbu yang membandingkan profil ekstrem antara Bitcoin PoW, Tendermint BFT, dan Sui Mysticeti DAG.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tidak ada konsensus gratis: setiap kelebihan selalu dibayar dengan pengorbanan di sektor lain.
- Enam sumbu tarik-menarik: Throughput, Latensi Finalitas, Desentralisasi, Batas Toleransi, Beban Pesan, dan Akses Modal.
- Rekayasa konsensus adalah tentang memilih kompromi yang tepat untuk kebutuhan aplikasi tertentu.

**Naskah Tutur (Voiceover Script):**
Sebelum kita menganalisis algoritma satu per satu, ada satu prinsip dasar yang harus selalu kita ingat: di dunia sistem terdistribusi, tidak ada makan siang gratis.
Kalian tidak akan pernah menemukan satu algoritma konsensus ajaib yang bisa memaksimalkan kapasitas data, memiliki latensi instan di bawah satu milidetik, melibatkan jutaan komputer validator, hemat energi, dan murah modalnya sekaligus.
Desain konsensus selalu merupakan seni memilih kompromi.
Jika kalian ingin memproses puluhan ribu transaksi per detik dengan latensi instan, kalian terpaksa harus memangkas jumlah validator menjadi segelintir komputer server berkecepatan tinggi.
Sebaliknya, jika kalian menuntut desentralisasi tanpa izin di mana siapa pun boleh menjadi validator menggunakan laptop tua, kalian harus rela mengorbankan kecepatan throughput dan menerima waktu konfirmasi yang lebih lambat.
Mari kita lihat bagaimana arsitektur alternatif meramu kompromi-kompromi ini untuk memenuhi kasus penggunaan nyata.

---

## Slide 3: Delegated Proof of Stake (DPoS): Demokrasi Perwakilan Berkecepatan Tinggi

### Konten Slide
- **Pencetus dan Penerapan (2014):** Digagas oleh Daniel Larimer dan diimplementasikan pada sistem seperti BitShares, Steem, dan EOS.
- **Konsep Demokrasi Perwakilan:**
  - Alih-alih mengizinkan ribuan node memproduksi blok secara serentak, pemegang token memberikan hak suara untuk memilih perwakilan.
  - Bobot suara seorang pemilih berbanding lurus dengan jumlah token yang ia miliki (*token-weighted voting*).
- **Mekanisme Kerja Inti:**
  - **Komite Tetap Skala Kecil:** Hanya kandidat peraih suara teratas dalam jumlah terbatas (misalnya tepat **21 Delegasi** di EOS) yang diberi hak menandatangani blok.
  - **Rotasi Round-Robin Deterministik:** 21 delegasi memproduksi blok secara bergantian dalam urutan tetap yang kaku tanpa persaingan tebakan hash.
  - **Pemberhentian Seketika (Instant Eviction):** Jika sebuah delegasi offline atau berbuat curang, pemilik token dapat memindahkan suaranya dan mencopot delegasi tersebut dalam hitungan menit.
- *Visual:* Diagram alur pemilih token menyalurkan suara ke 21 delegasi terpilih yang memproduksi blok dalam rotasi lingkaran round-robin.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- DPoS mengganti demokrasi langsung menjadi sistem perwakilan perlemen.
- Pemegang koin memilih komite kecil (misalnya 21 delegasi).
- Delegasi terpilih memproduksi blok bergantian secara terjadwal tanpa undian yang rumit.

**Naskah Tutur (Voiceover Script):**
Model alternatif pertama yang sangat populer di pertengahan dekade lalu adalah Delegated Proof of Stake atau DPoS yang dirancang oleh Daniel Larimer.
Jika Proof of Stake biasa bekerja seperti demokrasi langsung di mana semua pemilik modal berhak memvalidasi transaksi, DPoS bekerja layaknya sistem republik perwakilan.
Seluruh pemilik koin menggunakan saldo mereka sebagai hak suara untuk memilih sekelompok kecil perwakilan yang disebut Delegasi atau Witnesses.
Jumlah delegasi ini dikunci dalam kuota yang sangat sedikit, contohnya tepat dua puluh satu delegasi pada blockchain EOS.
Hanya dua puluh satu komputer terpilih inilah yang memiliki hak kriptografis untuk memproduksi blok.
Karena jumlahnya sangat sedikit dan jadwalnya sudah ditentukan secara bergiliran, mereka tidak perlu membuang waktu mengundi giliran atau menghitung rumus matematika yang berat.
Blok diproduksi secara bergantian dalam rotasi lingkaran setiap setengah detik sekali.
Jika salah satu delegasi berbuat curang atau servernya mati, para pemilik koin bisa segera mencabut suaranya dan menggantinya dengan delegasi cadangan.

---

## Slide 4: Jebakan Sentralisasi DPoS: Oligarki dan Kartel Validator

### Konten Slide
- **Keunggulan Throughput Ekstrem:**
  - Dengan hanya 21 simpul, overhead pertukaran pesan di jaringan sangat minim.
  - Delegasi dapat menyewa perangkat keras server data center kelas enterprise yang terhubung lewat kabel serat optik privat berkecepatan tinggi.
  - Menghasilkan interval blok 500 milidetik dan ribuan transaksi per detik.
- **Kelemahan Fatal: Formasi Kartel dan Oligarki:**
  - Dalam praktiknya, 21 delegasi teratas sering kali membentuk aliansi politik dan kartel ekonomi tertutup.
  - Mereka saling memberikan suara menggunakan dana perbendaharaan bersama dan membagi imbalan blok di antara kelompok mereka sendiri.
  - Pemegang token ritel biasa tidak memiliki kekuatan suara yang cukup untuk menggulingkan posisi mereka.
- **Kerentanan Koersi Regulasi dan Serangan Siber:**
  - Keberadaan 21 alamat IP publik yang statis membuat jaringan sangat mudah diserang DDoS, disita secara fisik oleh pemerintah, atau dipaksa tunduk pada sensor hukum.
- *Visual:* Ilustrasi lingkaran tertutup 21 delegasi yang saling mengunci suara di dalam benteng kartel yang terisolasi dari komunitas luar.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Throughput tinggi dan latensi 500ms adalah keunggulan utama DPoS.
- Masalah terbesarnya adalah sentralisasi politik: pembentukan kartel oligarki antar-delegasi.
- Sangat rapuh terhadap intervensi regulator dan sensor karena hanya ada 21 server yang diketahui publik.

**Naskah Tutur (Voiceover Script):**
DPoS berhasil membuktikan bahwa blockchain bisa berjalan sangat kencang dengan memproses ribuan transaksi per detik dan waktu blok hanya setengah detik.
Namun, kecepatan luar biasa ini dibayar dengan ongkos sentralisasi yang sangat fatal.
Ketika hak mengamankan seluruh jaringan hanya diserahkan kepada dua puluh satu komputer, sistem tersebut secara de facto berubah menjadi oligarki politik.
Dalam sejarah penerapannya di dunia nyata, para delegasi teratas sering kali berkoalisi membentuk kartel tertutup.
Mereka saling memilih satu sama lain menggunakan pundi-pundi token proyek, membagikan keuntungan blok di lingkaran internal mereka, dan membuat pemilih ritel tidak lagi mampu mendongkel kekuasaan mereka.
Lebih buruk lagi dari sisi keamanan siber, mengamankan seluruh ekonomi blockchain di atas dua puluh satu alamat IP yang diketahui publik membuat jaringan sangat rentan diserang.
Pemerintah otoriter cukup mengirimkan surat panggilan hukum atau menyita server di dua puluh satu data center tersebut untuk mematikan seluruh blockchain seketika.

---

## Slide 5: Classical BFT: Practical Byzantine Fault Tolerance (PBFT)

### Konten Slide
- **Warisan Ilmu Komputer Akademis (1999):** Miguel Castro dan Barbara Liskov memperkenalkan PBFT, membuktikan mesin status toleran-Byzantine dapat berjalan efisien di bawah model *partial synchrony*.
- **Garansi Utama:** Memberikan **finalitas deterministik instan** tanpa ada kemungkinan percabangan atau reorganisasi rantai (*zero reorgs*).
- **Tiga Fase Pemungutan Suara Multi-Putaran:**
  - **1. Pre-Prepare:** Pemimpin (*Primary Leader*) menerima transaksi dari klien dan mengusulkan urutan blok ke seluruh replika.
  - **2. Prepare:** Setiap replika memvalidasi proposal dan menyiarkan pesan persetujuan ke **seluruh replika lain di dalam jaringan**.
    Simpul menunggu kuorum dua pertiga ($2f + 1$).
  - **3. Commit:** Setelah kuorum Prepare terpenuhi, setiap replika menyiarkan pesan pengesahan akhir ke **seluruh replika lain**.
    Simpul menunggu kuorum dua pertiga ($2f + 1$) sebelum menulis data permanen ke disk.
- *Visual:* Diagram urutan fase komunikasi PBFT menunjukkan banjir pesan antar-simpul pada fase Prepare dan Commit.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- PBFT lahir tahun 1999, jauh sebelum Bitcoin diciptakan.
- Menghadirkan finalitas instan: sekali blok disahkan, blok tersebut tidak pernah bisa dibatalkan.
- Membutuhkan tiga putaran pemungutan suara: Pre-Prepare, Prepare, dan Commit.

**Naskah Tutur (Voiceover Script):**
Jauh sebelum Satoshi Nakamoto memperkenalkan Proof of Work, dunia akademis sistem terdistribusi telah mengembangkan keluarga algoritma yang disebut Classical BFT.
Tonggak terpentingnya adalah makalah Practical Byzantine Fault Tolerance atau PBFT yang diterbitkan oleh Castro dan Liskov pada tahun 1999.
Berbeda dengan rantai Nakamoto yang bersifat probabilistik, PBFT menawarkan finalitas deterministik seketika.
Begitu sebuah transaksi dinyatakan selesai, transaksi tersebut dikunci secara permanen di piringan cakram keras dan tidak akan pernah mengalami pembatalan sejarah atau reorg.
PBFT mencapai kesepakatan mutlak ini melalui tiga fase pemungutan suara yang sangat disiplin.
Pertama adalah fase Pre-Prepare, di mana satu node pemimpin mengajukan draf urutan transaksi ke semua komputer anggota.
Kedua adalah fase Prepare, di mana setiap komputer memeriksa transaksi tersebut lalu menyiarkan suaranya ke semua rekan lainnya di jaringan hingga kuorum dua pertiga tercapai.
Ketiga adalah fase Commit, di mana semua komputer kembali saling mengirim sinyal konfirmasi bahwa mereka siap mengeksekusi state tersebut ke basis data permanen.

---

## Slide 6: Hambatan Skalabilitas PBFT: Ledakan Pesan Kuadratik O(N^2)

### Konten Slide
- **Akar Masalah Arsitektur:** Pada fase Prepare dan Commit, setiap simpul wajib mengirim pesan ke setiap simpul lainnya (*all-to-all broadcast*).
- **Kompleksitas Komunikasi Kuadratik:**
  $$\text{Message Complexity} = \mathcal{O}(N^2)$$
- **Tabel Ledakan Jumlah Pesan per Blok:**
  - **4 Simpul:** Membutuhkan sekitar 16 pesan (sangat ringan, waktu sub-milidetik).
  - **100 Simpul:** Membutuhkan sekitar 10.000 pesan (konsumsi bandwidth internet mulai melonjak tinggi).
  - **1.000 Simpul:** Membutuhkan sekitar 1.000.000 pesan (jaringan mengalami saturasi dan latensi parah).
  - **10.000 Simpul:** Membutuhkan sekitar 100.000.000 pesan (secara fisik mustahil beroperasi di internet terbuka).
- **Kesimpulan Desain:** PBFT klasik tidak pernah dirancang untuk blockchain publik dengan ribuan validator; ia hanya layak digunakan untuk konsorsium privat perusahaan dengan 10 hingga 50 simpul.
- *Visual:* Grafik kurva kuadratik O(N^2) yang melesat tajam ke atas, memperlihatkan ketidakmampuan algoritma klasik berskala ke ribuan simpul.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah utama PBFT adalah beban komunikasi kuadratik O(N^2).
- Setiap komputer harus mengobrol dengan setiap komputer lain dua kali per blok.
- 1.000 node membutuhkan satu juta pesan per blok, membuat jaringan internet langsung lumpuh.

**Naskah Tutur (Voiceover Script):**
Mengapa algoritma PBFT klasik yang menawarkan finalitas instan dan tanpa pembakaran energi ini tidak dipakai sebagai mesin utama Bitcoin atau Ethereum?
Jawabannya terletak pada satu rumus matematika: kompleksitas pesan kuadratik atau O(N pangkat dua).
Di dalam PBFT, karena setiap komputer harus mengirim pesan ke semua komputer lainnya pada fase Prepare dan fase Commit, beban lalu lintas data melonjak secara eksponensial seiring bertambahnya jumlah anggota jaringan.
Jika jaringan hanya memiliki empat komputer, sistem hanya membutuhkan enam belas pesan, yang bisa diselesaikan dalam pecahan milidetik.
Namun jika anggotanya bertambah menjadi seratus komputer, jumlah pesan melonjak menjadi sepuluh ribu pesan per blok.
Bayangkan jika kita ingin membangun blockchain terdesentralisasi dengan seribu validator mandiri.
Sistem itu harus memproses satu juta pesan untuk mengesahkan satu blok saja.
Bandwidth internet akan langsung tersumbat total oleh lalu lintas data voting ini.
Inilah alasan mengapa PBFT klasik hanya cocok untuk jaringan konsorsium perbankan tertutup dengan puluhan mesin, dan mustahil dipakai di internet terbuka tanpa izin.

---

## Slide 7: Tendermint Core: Membawa BFT Klasik ke Ekosistem Blockchain

### Konten Slide
- **Adaptasi Modern (Jae Kwon, 2014):** Menyederhanakan mekanisme PBFT menjadi mesin konsensus siap pakai untuk ekosistem Cosmos.
- **Siklus Pemungutan Suara Berbasis Putaran (Round-Based State Machine):**
  - **1. Propose:** Pemimpin giliran mengusulkan blok kandidat baru.
  - **2. Prevote:** Validator memeriksa blok dan menyiarkan suara prevote.
    Jika meraih supermayoritas dua pertiga ($> 66,7\%$), blok memperoleh status **Polka**.
  - **3. Precommit:** Menanggapi sinyal Polka, validator menyiarkan suara precommit.
    Jika meraih supermayoritas dua pertiga, blok langsung difinalisasi secara instan.
- **Karakteristik Ketat:**
  - **Zero Reorg Guarantee:** Tidak ada cabang paralel atau pembatalan blok riwayat.
  - **Prioritas Mutlak pada Safety:** Jika terjadi jeda komunikasi yang melewati batas waktu (*timeout*), putaran melangkah ke pemimpin baru; jika partisi memutus sepertiga validator, sistem sengaja berhenti beroperasi.
- *Visual:* Mesin status berulang Tendermint: alur transisi dari status Propose -> Prevote -> Polka -> Precommit -> Commit.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tendermint adalah implementasi modern BFT klasik untuk blockchain publik.
- Menggunakan istilah unik: Polka ketika prevote mencapai dua pertiga supermayoritas.
- Menjamin finalitas instan tanpa reorg, tetapi menghentikan jaringan jika koneksi internet terbelah.

**Naskah Tutur (Voiceover Script):**
Pada tahun 2014, Jae Kwon merekayasa ulang konsep BFT klasik agar ramah terhadap dunia blockchain dengan menciptakan Tendermint Core, yang kini menjadi motor penggerak ekosistem Cosmos.
Tendermint menyederhanakan putaran konsensus menjadi sebuah state machine yang sangat elegan.
Prosesnya terdiri dari tiga langkah utama.
Langkah pertama adalah Propose, di mana pemimpin giliran mengajukan blok transaksi baru.
Langkah kedua adalah Prevote, di mana seluruh validator memeriksa blok tersebut.
Jika dua pertiga supermayoritas kekuatan suara menyetujui, blok tersebut meraih predikat yang dinamakan Polka.
Langkah ketiga adalah Precommit, di mana validator yang melihat status Polka akan memberikan persetujuan final.
Begitu kuorum dua pertiga precommit terkumpul, blok tersebut langsung terkunci permanen di rantai.
Tendermint menjamin kepastian mutlak tanpa reorg dengan waktu blok sekitar enam detik.
Namun sesuai dengan hukum kompromi konsensus, Tendermint secara kaku memilih Safety di atas Liveness.
Jika bencana internet membuat sepertiga validator terputus, sistem akan sengaja berhenti memproduksi blok demi menjaga agar sejarah transaksi tidak terpecah.

---

## Slide 8: HotStuff: Terobosan Kompleksitas Pesan Linier O(N)

### Konten Slide
- **Inovasi Generasi Ketiga (2018):** Diterbitkan oleh Abraham, Malkhi, dan tim peneliti, diadopsi oleh Diem (Facebook) dan disempurnakan oleh Aptos.
- **Memecahkan Hambatan Terbesar BFT:**
  - Pada PBFT dan Tendermint, jika node pemimpin mati, proses pergantian kepemimpinan (*View-Change*) memicu badai pesan kuadratik $\mathcal{O}(N^2)$ bahkan kubik $\mathcal{O}(N^3)$.
  - HotStuff mencapai terobosan teoritis: **Kompleksitas pesan linier $\mathcal{O}(N)$ dalam seluruh kondisi, termasuk saat pergantian pemimpin**.
- **Dua Pilar Arsitektur HotStuff:**
  - **Topologi Komunikasi Bintang (Star Communication):** Simpul tidak menyiarkan pesan ke semua simpul lain, melainkan hanya mengirim suara ke pemimpin.
    Pemimpin menggabungkan suara menjadi tanda tangan ambang batas (*threshold signature*) lalu menyiarkannya kembali.
  - **Pipelined Chaining:** Fase pemungutan suara dirangkai menyatu di sepanjang rantai blok berikutnya.
    - Proposal Blok $N+1$ bertindak sebagai suara Prepare untuk Blok $N$.
    - Proposal Blok $N+2$ bertindak sebagai suara Precommit untuk Blok $N$.
    - Proposal Blok $N+3$ mengesahkan dan memfinalisasi Blok $N$ secara permanen.
- *Visual:* Diagram perbandingan: jejaring pesan kusut PBFT vs topologi bintang teratur HotStuff dengan rantai persetujuan pipelining 3 blok.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- HotStuff memecahkan masalah overhead pergantian pemimpin yang sebelumnya sangat mahal di BFT klasik.
- Mengubah komunikasi kusut antar-node menjadi topologi bintang linier O(N).
- Mekanisme Pipelining: pengesahan blok masa lalu dititipkan di atas usulan blok-blok berikutnya.

**Naskah Tutur (Voiceover Script):**
Pada tahun 2018, sebuah lompatan besar kembali terjadi di ranah BFT klasik dengan terbitnya makalah HotStuff oleh Dahlia Malkhi dan rekan-rekannya.
Algoritma ini kemudian dipilih oleh proyek Diem milik Meta dan diadopsi oleh blockchain performa tinggi seperti Aptos.
Sebelum HotStuff lahir, kelemahan terbesar BFT klasik adalah ketika node pemimpin mati.
Proses pemilihan pemimpin baru atau View-Change membutuhkan banjir pesan kuadratik bahkan kubik yang bisa melumpuhkan jaringan.
HotStuff berhasil memecahkan kebuntuan ini dengan menurunkan beban komunikasi menjadi murni linier atau O(N), bahkan ketika terjadi kegagalan pemimpin.
Caranya ada dua.
Pertama, mereka mengganti komunikasi kusut semua-ke-semua dengan topologi bintang.
Para validator hanya mengirim suara ke pemimpin saat ini, lalu pemimpin merangkum suara tersebut menjadi satu tanda tangan kriptografi ringkas untuk disebarkan kembali.
Kedua, HotStuff memperkenalkan teknik pipelining.
Alih-alih mengunci satu blok sebelum memikirkan blok berikutnya, suara pengesahan dirangkai secara berantai di atas tiga blok berturut-turut.
Usulan blok berikutnya sekaligus berfungsi sebagai suara konfirmasi bagi blok sebelumnya, menghasilkan efisiensi komputasi yang luar biasa tinggi.

---

## Slide 9: Proof of History (PoH): Jam Kriptografis Sebelum Konsensus

### Konten Slide
- **Akar Masalah Koordinasi Waktu:**
  - Dalam jaringan terdistribusi, menyepakati urutan waktu adalah pekerjaan yang sangat berat dan memakan banyak pertukaran pesan antar-simpul.
- **Inovasi Solana (Anatoly Yakovenko):** Menciptakan jam kriptografis objektif *sebelum* konsensus dimulai menggunakan **Verifiable Delay Function (VDF)**.
- **Mekanisme SHA-256 Berulang:**
  - Validator menjalankan putaran kalkulasi SHA-256 secara berurutan pada satu inti CPU:
    $$\text{Hash}_1 = \text{SHA-256}(\text{Seed}), \quad \text{Hash}_2 = \text{SHA-256}(\text{Hash}_1), \quad \dots, \quad \text{Hash}_N = \text{SHA-256}(\text{Hash}_{N-1})$$
  - Setiap perhitungan mutlak membutuhkan keluaran dari hash sebelumnya, sehingga mustahil dihitung secara paralel.
  - Menyelesaikan $N$ putaran membuktikan secara matematis bahwa durasi waktu fisik tertentu telah berlalu.
- **Penyisipan Transaksi ke Aliran Waktu (Time Ingestion):**
  - Transaksi yang masuk diselipkan ke dalam status hash saat itu, membuktikan secara permanen bahwa transaksi terjadi setelah hash sebelumnya dan sebelum hash sesudahnya.
- **Verifikasi Asimetris:** Menghitung jam membutuhkan waktu sekuensial pada satu inti, tetapi memverifikasinya dapat dipecah secara paralel ke ribuan inti GPU, menghasilkan interval blok 400 milidetik.
- *Visual:* Pita rekaman hash berurutan yang merekam stempel waktu transaksi secara kriptografis sebelum disiarkan ke komite validator.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah koordinasi waktu di jaringan terdistribusi sangat menyedot bandwidth.
- Proof of History adalah jam kriptografis, bukan algoritma konsensus mandiri.
- SHA-256 sekuensial membuktikan berlalunya waktu fisik bumi secara tidak terbantahkan.

**Naskah Tutur (Voiceover Script):**
Salah satu tantangan paling rumit dalam ilmu komputer terdistribusi adalah menyepakati urutan waktu: transaksi mana yang terjadi lebih dulu dibanding transaksi lainnya.
Biasanya, komputer harus saling bertukar pesan berkali-kali hanya untuk menyepakati jam dinding bersama.
Di Solana, Anatoly Yakovenko memecahkan masalah ini dengan pendekatan yang sangat radikal melalui Proof of History.
Penting untuk dipahami bahwa Proof of History bukanlah algoritma konsensus yang berdiri sendiri, melainkan sebuah jam kriptografis yang berdetak sebelum konsensus dimulai.
Caranya adalah dengan menjalankan fungsi Verifiable Delay Function menggunakan algoritma SHA-256 tanpa henti di satu inti prosesor.
Karena menghitung hash kedua wajib menunggu hasil dari hash pertama, proses ini mustahil dipercepat menggunakan komputer paralel.
Jika ada satu juta kalkulasi hash yang diselesaikan, itu adalah bukti matematika yang mutlak bahwa sekian ratus milidetik waktu bumi telah berlalu.
Ketika transaksi pengguna masuk, data tersebut langsung dicap ke dalam aliran hash tersebut.
Hebatnya, meskipun proses pencatatan waktu harus berjalan sekuensial di satu inti CPU, proses verifikasinya bisa dipecah secara paralel ke ribuan inti kartu grafis GPU.
Para validator tidak perlu lagi berdebat soal urutan waktu, memungkinkan jaringan memproduksi blok secepat empat ratus milidetik.

---

## Slide 10: Arsitektur Directed Acyclic Graph (DAG): Memecah Kebuntuan Rantai Linier

### Konten Slide
- **Hambatan Bawaan Rantai Linier (Linear Chain Bottleneck):**
  - Pada blockchain linier tradisional (Bitcoin, Ethereum, Cosmos), proses penyebaran data (*dissemination*) dan pengurutan (*ordering*) digabung menjadi satu pipa antrean tunggal.
  - Saat node sedang menunggu pemungutan suara konsensus selesai, kapasitas pipa transmisi internet justru menganggur sia-sia.
- **Pemisahan Peran pada Arsitektur DAG (Contoh: Narwhal & Bullshark / Mysticeti):**
  - **Lapisan 1: Penyebaran Data Berkecepatan Tinggi (Narwhal Mempool):**
    - Simpul menyiarkan paket transaksi secara terus-menerus membentuk grafik multi-arah (DAG) tanpa menunggu antrean konsensus.
    - Menghabiskan 100 persen kapasitas bandwidth internet yang tersedia, melesatkan throughput hingga melampaui 100.000 TPS.
  - **Lapisan 2: Pengurutan Konsensus Tanpa Beban Pesan (Bullshark / Mysticeti):**
    - Setelah grafik DAG tersimpan di penyimpanan disk lokal masing-masing simpul, **tidak ada lagi pesan suara konsensus tambahan yang dikirim lewat internet**.
    - Setiap validator membaca geometri grafis lokal secara independen dan mengurutkan transaksi menggunakan aturan deterministik identik.
- *Visual:* Perbandingan pipa sempit rantai blok linier berseri vs jaring laba-laba multi-jalur paralel DAG yang memisahkan lapisan data dari lapisan pengurutan.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Blockchain linier membuang bandwidth karena proses pengiriman data dan pemungutan suara antre di satu jalur sempit.
- Arsitektur DAG memisahkan antara ketersediaan data (Narwhal) dengan pengurutan konsensus (Bullshark).
- Konsensus dicapai tanpa mengirim pesan tambahan di kabel internet, melainkan membaca geometri graf di disk lokal.

**Naskah Tutur (Voiceover Script):**
Evolusi paling mutakhir dalam arsitektur konsensus modern adalah transisi dari rantai blok linier konvensional menuju struktur Directed Acyclic Graph atau DAG, seperti yang dipelopori oleh protokol Narwhal, Bullshark, dan Mysticeti pada jaringan Sui.
Pada blockchain tradisional, pengiriman data dan pemungutan suara konsensus dikunci di dalam satu jalur antrean linier yang sama.
Pemimpin harus mengumpulkan transaksi, menyusunnya menjadi blok, menyiarkannya, lalu menunggu seluruh validator memberikan suara sebelum blok berikutnya bisa mulai diproses.
Akibatnya, saluran kabel internet sering kali menganggur sia-sia saat menunggu hasil voting selesai.
Arsitektur DAG memecah kebuntuan ini dengan memisahkan dua tugas tersebut menjadi dua lapisan mandiri.
Lapisan pertama adalah penyebaran data asinkron menggunakan Narwhal.
Di sini, setiap validator terus-menerus membanjiri jaringan dengan batch transaksi secara paralel membentuk grafik multi-dimensi tanpa perlu memikirkan siapa yang menjadi pemimpin atau urutan mana yang menang.
Ini membuat kapasitas bandwidth internet terpakai maksimal hingga menghasilkan kecepatan ratusan ribu transaksi per detik.
Lapisan kedua adalah pengurutan konsensus menggunakan Bullshark.
Begitu jaring-jaring grafik data tersebut tersimpan di piringan disk lokal, para validator tidak perlu lagi saling berkirim pesan suara lewat internet.
Setiap komputer cukup membaca pola geometri grafik di komputernya masing-masing menggunakan algoritma matematika yang sama untuk menghasilkan satu urutan transaksi final yang identik secara mandiri.

---

## Slide 11: Matriks Perbandingan Komprehensif Arsitektur Konsensus

### Konten Slide
- **Tabel Komparasi Lintas Paradigma Utama:**

| Dimensi Rekayasa | Proof of Work (Bitcoin) | Casper PoS (Ethereum) | Delegated PoS (EOS) | Tendermint (Cosmos) | DAG Consensus (Sui Mysticeti) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Ketahanan Sybil** | Hashrate Termodinamika | Agunan Modal On-Chain | Suara Bobot Token | Agunan Modal On-Chain | Agunan Modal On-Chain |
| **Sifat Finalitas** | Probabilistik (Rantai Terberat) | Deterministik (Epoch Checkpoints) | BFT-DPoS Hybrid | Deterministik Seketika (Zero Reorg) | Deterministik Sub-Detik |
| **Latensi Finalitas** | ~60 Menit (6 Blok) | ~12,8 Menit (2 Epoch) | ~1 hingga 2 Detik | ~6 Detik (1 Blok) | ~400 hingga 800 Milidetik |
| **Beban Pesan** | $\mathcal{O}(N)$ Gossip | $\mathcal{O}(N)$ Agregasi BLS | $\mathcal{O}(K)$ (21 Delegasi) | $\mathcal{O}(N^2)$ Multi-Putaran | $\mathcal{O}(N)$ Streaming Lepas |
| **Jumlah Validator** | Tanpa Batas (Bebas Izin) | $> 1.000.000$ Kunci Aktif | Sangat Sedikit (21 Node) | Sedang (100-180 Node) | Tinggi (100+ Simpul Enterprise) |
| **Toleransi Kerusakan ($f$)** | $< 50\%$ Daya Komputasi | $< 33\%$ Modal Taruhan | $< 33\%$ Delegasi Terpilih | $< 33\%$ Modal Taruhan | $< 33\%$ Modal Taruhan |
| **Prioritas Kompromi** | Liveness (Tidak Pernah Berhenti) | Keseimbangan Liveness/Safety | Liveness (Abaikan Node Rusak) | Safety Mutlak (Halt saat Partisi) | Safety Mutlak Sub-Detik |

- *Visual:* Infografis matriks tabel komparasi performa dan kompromi arsitektural dari kelima pilar konsensus.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkum seluruh materi bab ini ke dalam satu tabel perbandingan komprehensif.
- Tunjukkan bagaimana setiap model memiliki profil kelemahan dan keunggulan masing-masing.
- Tekankan bahwa pemilihan konsensus bergantung pada tujuan perancangan aplikasi.

**Naskah Tutur (Voiceover Script):**
Slide ini merangkum seluruh spektrum pemikiran yang telah kita bedah di sepanjang bab ini ke dalam satu matriks komparasi yang utuh.
Perhatikan bagaimana setiap arsitektur menempati kuadran kompromi yang sangat berbeda.
Bitcoin dengan Proof of Work menawarkan desentralisasi tanpa batas dan ketahanan liveness mutlak di mana jaringan tidak pernah berhenti berdetak, tetapi harus dibayar dengan waktu finalitas probabilistik sekitar satu jam dan pemborosan energi termodinamika.
Ethereum dengan Casper Proof of Stake menghadirkan desentralisasi masif dengan satu juta validator aktif dan keamanan modal ekonomi puluhan miliar dolar, namun membutuhkan waktu finalitas sekitar dua belas menit.
Di sisi lain, Delegated PoS dan Tendermint mengorbankan jumlah validator demi mengejar finalitas instan dalam hitungan detik.
Hingga akhirnya arsitektur modern berbasis DAG seperti Mysticeti berhasil menyatukan throughput ratusan ribu transaksi per detik dengan finalitas deterministik sub-detik melalui pemisahan cerdas antara ketersediaan data dan pengurutan konsensus.
Pemilihan algoritma mana yang paling unggul sepenuhnya bergantung pada kebutuhan dan toleransi risiko dari sistem yang ingin kalian bangun.

---

## Slide 12: Jembatan ke Modul Berikutnya: Komputabilitas dan Sovereign World Computer

### Konten Slide
- **Pencapaian Konsensus Terdistribusi:** Kita telah menuntaskan pemahaman tentang bagaimana ribuan komputer asing menyepakati urutan blok data yang identik tanpa perantara terpusat.
- **Teka-Teki Tingkat Lanjut:**
  - Menyepakati urutan bit data hanyalah separuh dari revolusi teknologi blockchain.
  - Pertanyaan berikutnya: **Apa yang sebenarnya dihitung oleh deretan byte transaksi tersebut?**
- **Evolusi Menuju Komputasi Universal:**
  - Transaksi Bitcoin hanya mengeksekusi skrip tumpukan sederhana (*stack script*) untuk membuka dan memindahkan unit saldo koin.
  - Blockchain modern mengeksekusi kode program komputer arbitrer yang turing-complete: **Smart Contracts**.
- **Materi Bab Berikutnya (Modul 4: Programmability and the Virtual Machine):**
  - Bagaimana mesin virtual terdesentralisasi (EVM) mengeksekusi kode secara deterministik tanpa risiko *infinite loop* lewat pengukuran bahan bakar (*gas metering*).
  - Manajemen memori stack, memory, dan persistent storage di tingkat byte.
  - Mesin eksekusi alternatif berperforma tinggi: WebAssembly (Wasm) dan Solana Virtual Machine (SVM).
- *Visual:* Pintu gerbang digital yang membuka jalan dari lapisan konsensus menuju inti mesin virtual pemrosesan kode pintar (EVM).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Konsensus telah tuntas: kita tahu cara komputer menyepakati urutan data mentah.
- Pertanyaan baru: bagaimana data tersebut diproses menjadi logika komputasi aplikasi?
- Teaser Modul 4: Programmability and the Virtual Machine (EVM, Gas, Smart Contracts).

**Naskah Tutur (Voiceover Script):**
Kita telah menaklukkan salah satu cabang ilmu terpenting dalam teknologi blockchain: lapisan konsensus.
Kalian sekarang telah memahami bagaimana ribuan mesin di seluruh dunia sanggup menyepakati satu urutan blok data yang sah di tengah lingkungan yang penuh tipuan dan permusuhan.
Namun, menyepakati urutan data mentah sebenarnya barulah separuh dari revolusi ini.
Pertanyaan besar berikutnya adalah: apa yang sebenarnya dieksekusi oleh data-data transaksi tersebut di dalam komputer?
Di Bitcoin, transaksi hanya menjalankan skrip matematika sederhana untuk memindahkan koin dari satu pemilik ke pemilik baru.
Namun di blockchain modern, transaksi-transaksi ini mengeksekusi program perangkat lunak yang utuh dan independen: Smart Contracts.
Bagaimana ribuan komputer di dunia bisa mengeksekusi baris kode program yang sama persis tanpa mengalami perbedaan hasil atau crash?
Bagaimana Ethereum Virtual Machine mencegah peretas membuat program putaran tak terbatas menggunakan mekanisme gas metering?
Dan bagaimana mesin eksekusi modern seperti Solana VM mendorong kinerja pemrosesan komputasi hingga ke batas fisik prosesor komputer?
Untuk menemukan bagaimana buku besar terdistribusi bertransformasi menjadi komputer dunia yang berdaulat, di bab berikutnya kita akan melangkah ke Modul 4: Programmability and the Virtual Machine.
Terima kasih dan sampai jumpa di bab berikutnya.
