# Peer-to-Peer Networks and Network Topologies
Modul Presentasi: Fondasi Distributed Trust (01.4)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Peer-to-Peer Networks and Network Topologies
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Arsitektur jaringan mesh terdesentralisasi, protokol gossip, penemuan simpul Kademlia DHT, serta mitigasi serangan level jaringan.
- *Visual:* Visualisasi topologi mesh global yang menghubungkan ribuan simpul komputer independen tanpa server pusat.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul keempat sekaligus modul penutup bab Distributed Trust.
- Menjelaskan pentingnya lapisan jaringan komunikasi P2P sebagai pondasi fisik blockchain.
- Menghubungkan tanda tangan kriptografis dari modul sebelumnya ke mekanisme distribusi data global.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul keempat dari trek Fundamentals.
Pada modul-modul sebelumnya, kita sudah membedah solusi double-spending, integritas pohon Merkle, dan tanda tangan digital.
Kita tahu bagaimana Alice dapat membuat transaksi dan membuktikan otoritasnya secara matematis.
Namun secanggih apa pun kriptografi yang kita gunakan, transaksi yang hanya tersimpan di komputer lokal Alice tidak akan pernah bernilai jika tidak sampai ke validator di belahan bumi lain.
Sebuah blockchain pada dasarnya adalah mesin penyimpan status bersama yang harus disinkronkan ke ribuan komputer secara terus-menerus.
Di dunia tanpa server sentral seperti AWS atau Google Cloud, bagaimana data disebarkan dengan cepat, andal, dan tahan sensor?
Jawabannya terletak pada lapisan jaringan Peer-to-Peer atau P2P.
Hari ini kita akan membedah bagaimana protokol gossip bekerja, bagaimana simpul menemukan rekannya lewat Kademlia DHT, serta ancaman fisik jaringan seperti Eclipse Attack dan BGP Hijacking.

---

## Slide 2: Pergeseran Paradigma Arsitektur: Client-Server vs. Peer-to-Peer

### Konten Slide
- **Model Tradisional Client-Server (Web2):**
  - *Peran Asimetris:* Server sentral memegang kendali basis data, mengeksekusi logika bisnis, dan menentukan otorisasi akses; perangkat pengguna (*clients*) hanya menjadi konsumen pasif.
  - *Hierarki Kepercayaan:* Pengguna wajib percaya penuh pada integritas operator server sentral.
  - *Titik Lemah Struktural:* Rentan terhadap serangan DDoS terkoordinasi, putusnya kabel ISP utama, penutupan sepihak (*deplatforming*), dan pemaksaan regulasi negara.
- **Model Jaringan Jala Peer-to-Peer (Mesh P2P):**
  - *Peran Simetris (Servents):* Setiap simpul bertindak secara simultan sebagai peminta data (*client*) sekaligus penyedia data (*server*).
  - *Ketiadaan Koordinator Sentral:* Tidak membutuhkan server master, direktori terpusat, atau pendaftar DNS tunggal untuk merutekan paket data.
  - *Ketahanan Bawaan (Organic Fault Tolerance):* Jika 50 persen simpul terputus serentak, separuh jaringan lainnya tetap beroperasi memproses transaksi tanpa henti.
- *Visual:* Diagram komparasi arsitektur: Topologi bintang Client-Server (dengan satu server pusat raksasa) vs Topologi jala P2P Mesh (koneksi terdistribusi antar-simpul setara).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bandingkan model client-server Web2 dengan P2P mesh.
- Pada model P2P, setiap simpul bertindak sebagai client sekaligus server (servent).
- Ketahanan organik: separuh simpul mati di dunia, sistem tetap berjalan lancar.

**Naskah Tutur (Voiceover Script):**
Untuk memahami cara kerja blockchain, kita harus melihat perbedaan mendasar antara internet konvensional dan jaringan terdesentralisasi.
Seluruh aplikasi Web2 yang kita pakai hari ini dibangun di atas model *client-server*.
Di arsitektur ini, ada jurang pemisah yang lebar antara pengguna dan server.
Pusat data raksasa milik Amazon AWS atau Google memegang basis data utama dan memegang kuasa mutlak untuk melayani atau memblokir pengguna.
Jika server utama mereka mengalami gangguan teknis atau terkena serangan siber, jutaan pengguna di seluruh dunia seketika lumpuh tidak bisa bertransaksi.
Sebaliknya, blockchain dibangun di atas model Peer-to-Peer.
Di jaringan P2P, semua komputer memiliki derajat yang setara dan disebut sebagai *servent*, singkatan dari server dan client.
Setiap simpul meminta data dari tetangganya sekaligus melayani permintaan data dari simpul lain.
Tidak ada komputer master atau direktur lalu lintas sentral.
Arsitektur ini memiliki sifat *organic fault tolerance*.
Bahkan jika lima puluh persen komputer di jaringan P2P mendadak mati karena pemadaman listrik massal, sisa lima puluh persen simpul lainnya akan tetap melanjutkan pencatatan ledger tanpa terhenti satu detik pun.

---

## Slide 3: Pembelajaran Historis P2P: Dari Napster ke BitTorrent

### Konten Slide
- **Evolusi Sistem Berbagi Berkas Terdesentralisasi:** Desain blockchain modern mengadopsi pelajaran arsitektur dari sejarah sistem P2P era awal.
- **Napster (1999) - P2P Hibrida:**
  - Memelopori transfer berkas MP3 langsung antar-perangkat pengguna.
  - *Kelemahan Fatal:* Mengandalkan server indeks terpusat untuk mencatat berkas mana yang disimpan oleh pengguna tertentu.
  - *Kejatuhan:* Ketika pengadilan memerintahkan penutupan server indeks pusat, seluruh jaringan mati dalam semalam.
- **Gnutella & BitTorrent (2001) - P2P Murni:**
  - Menghilangkan peran server indeks terpusat sepenuhnya.
  - Memperkenalkan Distributed Hash Table (DHT) dan sistem kawanan (*swarms*) mandiri.
  - *Daya Tahan:* Mampu bertahan dari tuntutan hukum, pemblokiran ISP agresif, dan intervensi regulasi selama puluhan tahun.
- *Visual:* Bagan sejarah evolusi P2P: Napster (server indeks sentral runtuh) berevolusi menjadi BitTorrent (kawanan DHT tahan sensor) yang menginspirasi arsitektur jaringan blockchain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Napster membuktikan bahaya server indeks terpusat: perusahaannya dituntut, jaringannya mati.
- BitTorrent menyempurnakannya dengan desentralisasi penuh lewat DHT.
- Blockchain mengadopsi ketahanan BitTorrent agar tidak bisa dimatikan oleh entitas mana pun di dunia.

**Naskah Tutur (Voiceover Script):**
Inovasi jaringan blockchain tidak lahir di ruang hampa.
Satoshi Nakamoto dan para pengembang awal mengambil pelajaran berharga dari sejarah perang teknologi *file sharing* di era 2000-an.
Eksperimen P2P pertama yang meledak secara massal adalah Napster pada tahun 1999.
Napster memungkinkan jutaan pengguna bertukar lagu secara langsung dari komputer ke komputer.
Namun, arsitektur Napster memiliki satu kelemahan arsitektural: mereka masih menggunakan satu server indeks terpusat untuk melacak siapa menyimpan lagu apa.
Ketika pengadilan federal Amerika Serikat mengeluarkan surat perintah penyitaan terhadap server indeks tersebut, seluruh jaringan Napster langsung musnah dalam satu malam.
Melihat kegagalan itu, generasi berikutnya seperti Gnutella dan BitTorrent lahir dengan arsitektur P2P murni.
BitTorrent menghapus server sentral sepenuhnya dan menggantinya dengan Distributed Hash Table atau DHT.
BitTorrent membuktikan kepada dunia sains komputer bahwa sistem tanpa pusat pengendali dapat bertahan puluhan tahun melawan sensor hukum terkeras di dunia.
Arsitektur inilah yang diwarisi oleh Bitcoin dan Ethereum, memastikan tidak ada satu tombol power pun yang dapat mematikan jaringan.

---

## Slide 4: Protokol Gossip dan Epidemic Dissemination

### Konten Slide
- **Tantangan Siaran Global:** Bagaimana transaksi Alice di Argentina sampai ke validator di Korea Selatan dalam hitungan detik tanpa server siaran sentral?
- **Model Penyebaran Epidemi Biologis:** Protokol Gossip dimodelkan secara matematis dari cara virus biologis menyebar di dalam populasi padat.
- **Karakteristik Penyebaran:**
  - Simpul tidak menyiarkan data ke seluruh komputer di dunia secara serentak.
  - Simpul hanya meneruskan data ke sejumlah kecil tetangga langsung (*peers*), biasanya 8 hingga 12 simpul terdekat.
- **Skalabilitas Fan-Out Eksponensial:**
  - Pada graf acak dengan derajat $d$, jumlah simpul yang terinfeksi informasi bertambah secara eksponensial ($d^1, d^2, d^3, \dots$).
  - Pesan menjangkau seluruh $N$ simpul global hanya dalam kompleksitas $\mathcal{O}(\log N)$ lompatan (*hops*).
- *Visual:* Sequence diagram alur Gossip Protocol: Alice menyiarkan ke 2 peer, masing-masing menyiarkan ke 8 peer lain, menghasilkan gelombang eksponensial ke seluruh dunia.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah siaran: tidak ada server broadcast sentral di blockchain.
- Solusi: Protokol Gossip yang meniru cara virus biologis menular.
- Penyebaran eksponensial: hanya butuh $O(\log N)$ lompatan untuk mencapai seluruh penjuru bumi dalam hitungan detik.

**Naskah Tutur (Voiceover Script):**
Sekarang bayangkan Alice menandatangani transaksi pembayaran di Argentina.
Bagaimana cara pesan tersebut sampai ke komputer validator di Korea Selatan dalam waktu kurang dari dua detik tanpa ada server siaran sentral?
Jawabannya adalah Protokol Gossip.
Protokol ini dirancang menggunakan model matematika penularan epidemi biologis.
Ketika laptop Alice menyiarkan transaksi, Alice tidak mengirimkannya ke puluhan ribu komputer di dunia sekaligus karena bandwidth-nya tidak akan sanggup.
Alice hanya menyebarkannya ke segelintir tetangga terdekat yang terhubung dengan kliennya, biasanya delapan hingga dua belas simpul.
Setiap simpul tetangga yang menerima pesan itu akan memeriksa keabsahan datanya, lalu membisikkan data tersebut ke delapan tetangga mereka masing-masing.
Pola penularan ini menciptakan efek pelipatgandaan eksponensial yang sangat dahsyat.
Dari delapan menjadi enam puluh empat, lalu lima ratus dua belas, dan seterusnya.
Dalam teori graf acak, pesan transaksi ini dapat menjangkau puluhan ribu simpul di seluruh planet bumi hanya dalam waktu logaritmik, yaitu $O(\log N)$ lompatan jaringan.
Penyebaran global terjadi secara otomatis dalam hitungan sepersekian detik.

---

## Slide 5: Siklus Hidup Transaksi di Jaringan P2P (Mempool & Deduplikasi)

### Konten Slide
- **Alur Propagasi Transaksi Langkah demi Langkah:**
  1. *Originasi Pesan:* Alice membuat transaksi bertanda tangan dan mengirimkannya ke simpul terhubung (*outbound peers*).
  2. *Validasi Lokal Ketat:* Simpul penerima tidak langsung meneruskan data secara membabi buta; simpul wajib memeriksa format byte, tanda tangan kriptografis, dan ketersediaan saldo pengirim.
  3. *Mempool Ingestion:* Transaksi yang valid dimasukkan ke dalam **Mempool** (kolam memori penampung transaksi tertunda).
  4. *Targeted Announcement (Pesan `inv`):* Simpul mengumumkan ketersediaan transaksi baru kepada rekan-rekannya menggunakan hash transaksi ringkas.
  5. *Deduplikasi Pesan:* Simpul penerima memeriksa mempool lokal; jika transaksi sudah pernah diterima, pesan diabaikan demi menghemat bandwidth jaringan.
- *Visual:* Diagram alur transaksi melewati tahap Validasi Lokal -> Masuk Mempool -> Siaran hash `inv` -> Permintaan data `getdata` -> Penerimaan payload penuh.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Node tidak percaya begitu saja: setiap transaksi yang lewat diperiksa validitasnya.
- Mempool adalah ruang tunggu transaksi sebelum dibungkus ke dalam blok.
- Sistem pesan `inv` dan deduplikasi mencegah pemborosan kuota internet antar-node.

**Naskah Tutur (Voiceover Script):**
Mari kita telusuri apa yang sebenarnya terjadi di dalam sebuah simpul ketika menerima transaksi baru dari jaringan P2P.
Sebuah simpul blockchain jujur tidak pernah meneruskan data secara membabi buta.
Begitu sebuah transaksi masuk, simpul tersebut langsung menjalankan serangkaian audit lokal yang sangat ketat.
Apakah struktur datanya valid?
Apakah tanda tangan digitalnya cocok secara matematis?
Dan apakah saldo pengirim mencukupi tanpa ada upaya double spending?
Jika ada satu saja syarat yang gagal, transaksi tersebut langsung dibuang ke tempat sampah dan pengirimnya bisa dikenakan penalti reputasi.
Jika transaksinya valid seratus persen, simpul akan memasukkannya ke dalam Mempool, yaitu ruang memori lokal untuk menampung transaksi yang sedang mengantre diproses oleh penambang.
Setelah itu, simpul memberi tahu rekan-rekannya dengan mengirimkan pesan inventaris atau pesan `inv` yang hanya berisi hash dari transaksi tersebut.
Jika rekan-rekannya melihat bahwa hash itu sudah ada di mempool mereka, mereka akan mengabaikannya.
Mekanisme deduplikasi ini sangat penting agar jaringan terbebas dari badai lalu lintas data ganda yang dapat memboroskan kuota internet para operator simpul.

---

## Slide 6: Penemuan Simpul (Node Discovery): Distributed Hash Table (DHT) & Kademlia

### Konten Slide
- **Tantangan Bootstrapping Simpul:** Ketika sebuah simpul baru dinyalakan dengan tabel rute kosong, bagaimana simpul tersebut menemukan komputer lain tanpa direktori sentral?
- **Teknologi Distributed Hash Table (DHT):** Basis data terdistribusi yang memetakan identitas simpul dan konten data di seluruh jaringan tanpa server master.
- **Adopsi Algoritma Kademlia:**
  - Standar industri teruji yang dipelopori oleh BitTorrent, diadaptasi oleh Ethereum sebagai protokol penemuan simpul (`discv4` dan `discv5`).
  - Setiap simpul diberikan identitas permanen berupa **Node ID** sepanjang 256-bit (dihasilkan dari hash kunci publik simpul).
  - Menyusun topologi jaringan berdasarkan kedekatan matematis antar-identitas simpul.
- *Visual:* Diagram alur penemuan simpul Kademlia: Node ID 256-bit dihitung dari kunci publik, dimasukkan ke ruang metrik jarak logaritmik.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah saat node baru menyala: siapa yang harus dihubungi pertama kali tanpa server direktori?
- Distributed Hash Table (DHT) Kademlia adalah solusi standar industri.
- Setiap simpul punya Node ID 256-bit dari hash kunci publiknya.

**Naskah Tutur (Voiceover Script):**
Sekarang bayangkan kalian baru saja mengunduh perangkat lunak node blockchain di komputer kalian dan menekan tombol jalankan.
Komputer kalian menyala dalam kondisi hard drive kosong dan tabel koneksi kosong melompong.
Bagaimana cara komputer kalian menemukan ribuan simpul blockchain lain yang aktif di internet tanpa ada server direktori sentral tempat bertanya?
Di sinilah peran penting Distributed Hash Table atau DHT, khususnya algoritma Kademlia.
Kademlia adalah algoritma penemuan simpul legendaris yang awalnya dipakai oleh BitTorrent, lalu diadaptasi oleh Ethereum menjadi protokol `discv4` dan `discv5`.
Di dalam jaringan Kademlia, setiap komputer diberi identitas unik berupa Node ID sepanjang 256 bit yang diturunkan dari hash kunci publik komputer tersebut.
Kademlia tidak memedulikan lokasi geografis komputer kalian di dunia nyata.
Kademlia menyusun peta hubungan antar-komputer berdasarkan kedekatan matematis di dalam ruang angka 256 bit.

---

## Slide 7: Metrik Jarak XOR dan Perutean K-Buckets

### Konten Slide
- **Elegansi Metrik Jarak XOR:**
  - Jarak antara dua simpul $x$ dan $y$ dihitung menggunakan operasi bitwise exclusive-OR (XOR):
    $$d(x, y) = x \oplus y$$
  - Memenuhi seluruh aksioma matematis ruang metrik geometris: identitas diri ($x \oplus x = 0$), simetri ($x \oplus y = y \oplus x$), dan ketidaksamaan segitiga.
- **Struktur Tabel Perutean K-Buckets:**
  - Simpul mengorganisasi daftar rekannya ke dalam kantong-kantong (*k-buckets*), biasanya menampung $k = 16$ simpul per kantong.
  - Kantong dipartisi berdasarkan kesamaan prefiks bit: kantong terjauh berbeda pada bit pertama, kantong terdekat berbagi puluhan bit yang sama.
- **Pencarian Rute Logaritmik:** Menemukan simpul mana pun di seluruh dunia hanya memerlukan maksimal $\mathcal{O}(\log N)$ langkah pencarian iteratif (*iterative lookup*).
- *Visual:* Ilustrasi pembagian ruang Kademlia k-buckets berdasarkan prefiks bit biner dan operasi XOR jarak matematis.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kademlia mengukur jarak antar-node menggunakan operasi XOR ($x \oplus y$).
- Jarak XOR memenuhi hukum matematika ruang geometris murni.
- Tabel perutean diatur dalam k-buckets, menjamin pencarian simpul tuntas dalam waktu logaritmik $O(\log N)$.

**Naskah Tutur (Voiceover Script):**
Salah satu keindahan terbesar dari Kademlia adalah cara mereka mendefinisikan jarak antar-komputer.
Jarak antara komputer X dan komputer Y diukur menggunakan operasi logika bitwise XOR atau exclusive-OR.
Operasi XOR ini memiliki keunikan matematika yang luar biasa.
Jarak sebuah komputer ke dirinya sendiri adalah nol, jarak dari A ke B persis sama dengan jarak dari B ke A, dan rumus ini mematuhi ketidaksamaan segitiga seperti geometri ruang nyata.
Setiap simpul menyimpan alamat komputer lain di dalam tabel perutean yang terbagi menjadi kelompok-kelompok bernama *k-buckets*.
Setiap kantong biasanya berisi enam belas simpul yang dikelompokkan berdasarkan kesamaan awalan bit pada Node ID mereka.
Ada kantong untuk simpul yang jarak matematisnya sangat jauh, dan ada kantong untuk simpul tetangga terdekat.
Ketika komputer kalian ingin mencari simpul tertentu di jaringan global, kalian tidak perlu menyisir seluruh internet.
Kalian cukup menanyakan ke simpul di kantong terdekat secara iteratif.
Pencarian simpul mana pun di seluruh dunia dijamin tuntas dalam kompleksitas logaritmik $O(\log N)$.

---

## Slide 8: Bootnodes dan Penanganan Network Churn

### Konten Slide
- **Masalah Permulaan (The Bootstrap Problem):** Saat simpul pertama kali daring, tabel k-buckets berada dalam kondisi kosong mutlak.
- **Peran Simpul Pelopor (Bootnodes):**
  - Perangkat lunak klien menyertakan daftar alamat IP statis yang ditanam di dalam kode sumber (*hardcoded Bootnodes*).
  - Simpul baru menghubungi bootnode selama beberapa detik pertama semata-mata untuk menanyakan simpul tetangga aktif terdekat via protokol Kademlia.
  - Setelah tabel rute terisi, simpul segera memutuskan koneksi dari bootnode dan beroperasi otonom di jaringan mesh.
- **Resistensi terhadap Network Churn:**
  - *Network Churn:* Fenomena di mana ribuan simpul bebas terhubung dan terputus kapan saja secara tak terduga.
  - *Kebijakan Penggantian K-Bucket:* Mengutamakan simpul yang memiliki masa aktif lama (*least-recently-seen replacement*).
  - Statistik jaringan membuktikan bahwa simpul yang sudah menyala stabil berjam-jam memiliki probabilitas tertinggi untuk tetap daring di masa depan.
- *Visual:* Alur bootstrapping simpul baru: Terhubung ke Bootnode sementara -> Menarik daftar tetangga -> Membangun tabel lokal -> Melepas Bootnode ke jaringan mesh.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bootnode hanya dipakai beberapa detik saat pertama kali menyala untuk mengisi tabel awal.
- Setelah tabel terisi, koneksi ke bootnode dilepas agar tidak ada ketergantungan sentral.
- Kademlia tahan terhadap network churn dengan memprioritaskan koneksi yang sudah lama aktif dan stabil.

**Naskah Tutur (Voiceover Script):**
Jika tabel K-buckets awalnya kosong, dari mana komputer kita pertama kali mendapatkan alamat simpul rekannya?
Solusi rekayasa perangkat lunak untuk masalah ini adalah *Bootnodes*.
Di dalam kode sumber aplikasi klien blockchain, pengembang menyertakan beberapa alamat IP publik dari simpul stabil yang dikelola oleh komunitas inti.
Ketika simpul baru pertama kali menyala, ia akan menghubungi bootnode ini selama beberapa detik saja.
Simpul baru tidak meminta data transaksi ke bootnode.
Ia hanya meminta daftar simpul aktif lain yang berada di sekitarnya.
Begitu tabel perutean lokalnya terisi oleh alamat rekan-rekan baru, simpul tersebut langsung memutus hubungan dari bootnode dan melebur secara mandiri ke dalam jaringan jala global.
Hal ini mencegah bootnode menjadi titik ketergantungan sentral.
Selain itu, jaringan P2P menghadapi tantangan bernama *network churn*, yaitu kondisi di mana komputer pengguna bisa mati dan menyala sewaktu-waktu.
Kademlia mengatasi ini dengan aturan cerdas: simpul yang sudah terbukti menyala stabil selama berjam-jam akan selalu diprioritaskan di dalam tabel perutean dibanding simpul baru yang belum teruji keandalannya.

---

## Slide 9: Propagasi Blok dan Masalah Latensi Jaringan

### Konten Slide
- **Perbedaan Transaksi vs. Blok Penuh:**
  - Transaksi individual berukuran sangat kecil (beberapa ratus byte).
  - Blok penuh dapat mencapai ukuran beberapa megabyte dan memuat ribuan transaksi.
- **Hambatan Latensi Transmisi ($\Delta$):**
  - Butuh waktu beberapa detik agar sebuah blok baru yang ditambang di satu benua dapat merambat ke seluruh dunia melalui kabel optik bawah laut.
  - *Orphan Rate & Accidental Forks:* Selama masa tunda propagasi tersebut, penambang lain di belahan dunia berbeda tidak sadar dan terus menambang di atas blok lama yang sudah usang.
- **Tekanan Sentralisasi Ekonomi:**
  - Penambang atau validator besar yang terkonsentrasi di pusat data geografis yang sama memiliki keunggulan latensi mutlak dibanding penambang rumahan terpencil.
  - Latensi yang tinggi memaksa peserta jaringan berkumpul ke fasilitas server terpusat demi menghindari kerugian finansial.
- *Visual:* Diagram percabangan rantai (*fork*) akibat jeda waktu rambat blok antarselancar dunia, memicu pemborosan energi dan risiko keamanan.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Blok berukuran megabyte butuh waktu merambat ke seluruh dunia (latensi transmisi).
- Latensi tinggi memicu persaingan blok tidak sengaja (accidental forks dan orphan blocks).
- Tekanan sentralisasi: penambang terdorong berkumpul di satu data center raksasa agar tidak kalah cepat.

**Naskah Tutur (Voiceover Script):**
Menyebarkan transaksi tunggal berukuran beberapa ratus byte sangatlah mudah.
Namun menyebarkan satu blok utuh berukuran beberapa megabyte adalah tantangan fisik yang berat bagi internet global.
Ketika seorang penambang di Asia menemukan blok baru, blok tersebut membutuhkan waktu beberapa detik untuk merambat melintasi benua melalui kabel serat optik bawah laut.
Jeda waktu rambat ini disebut *propagation delay* atau delta.
Selama jeda beberapa detik tersebut, para penambang di Eropa atau Amerika belum tahu bahwa blok baru sudah ditemukan.
Mereka terus membakar listrik menambang di atas puncak rantai lama yang sebenarnya sudah basi.
Jika penambang lain di tempat terpisah menemukan blok di detik yang sama, jaringan akan terbelah menjadi dua cabang sementara yang kita sebut *accidental fork*.
Salah satu blok pasti akan dibuang menjadi *orphan block*, membuang energi penambang secara sia-sia.
Lebih buruk lagi, fenomena ini memicu tekanan sentralisasi yang sangat berbahaya.
Penambang-penambang besar akan terdorong secara ekonomi untuk memindahkan seluruh server mereka ke satu gedung pusat data raksasa yang sama agar tidak kalah latensi, membunuh desentralisasi jaringan secara perlahan.

---

## Slide 10: Solusi Skalabilitas Propagasi: Compact Blocks (BIP-152)

### Konten Slide
- **Inefisiensi Penyiaran Blok Tradisional:** Menyiarkan seluruh berkas blok mentah berukuran 2 MB memboroskan bandwidth, padahal 99 persen isi transaksi di dalam blok tersebut sudah berada di mempool lokal simpul penerima.
- **Inovasi Compact Blocks (Bitcoin BIP-152):**
  - Pengirim tidak mengirimkan ribuan data transaksi utuh.
  - Pengirim hanya mengirimkan **Block Header** sepanjang 80 byte dan daftar **Short Transaction IDs** sebesar 6 byte per transaksi (menggunakan intisari salted SipHash).
- **Rekonstruksi Lokal Seketika:**
  - Simpul penerima mencocokkan ID transaksi pendek 6-byte ke transaksi lengkap di mempool lokalnya.
  - Pada lebih dari 95 persen kasus, seluruh transaksi sudah tersedia dan blok utuh 2 MB direkonstruksi dalam hitungan milidetik.
  - Jika ada satu atau dua transaksi yang hilang, simpul hanya meminta transaksi spesifik yang kurang tersebut.
- **Dampak Performa:** Memangkas konsumsi bandwidth transmisi blok hingga lebih dari 90 persen dan mempercepat propagasi global ke bawah satu detik.
- *Visual:* Sequence diagram BIP-152: Penambang mengirim Header + Short ID -> Simpul mencocokkan ke mempool lokal -> Blok lengkap terbentuk secara instan tanpa mengunduh ulang.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengirim blok utuh memboroskan bandwidth karena datanya sudah ada di mempool.
- BIP-152 Compact Blocks: hanya kirim header 80 byte dan ID transaksi 6 byte.
- Rekonstruksi lokal: memangkas beban transmisi hingga 90 persen lebih dan menekan orphan rate.

**Naskah Tutur (Voiceover Script):**
Bagaimana para insinyur blockchain mengatasi krisis latensi transmisi blok ini?
Jawabannya adalah inovasi brilian bernama *Compact Blocks* atau BIP-152 di Bitcoin.
Para pengembang menyadari satu fakta penting: ketika seorang penambang menyiarkan blok sebesar dua megabyte, sembilan puluh sembilan persen dari transaksi di dalam blok itu sebenarnya sudah pernah diterima dan tersimpan rapi di mempool lokal komputer penerima sejak beberapa menit yang lalu.
Mengirim ulang seluruh data mentah transaksi tersebut adalah pemborosan bandwidth jaringan yang luar biasa konyol.
Lewat standar BIP-152, penambang tidak lagi menyiarkan blok mentah yang gemuk.
Penambang hanya menyiarkan header blok sebesar 80 byte, ditemani oleh daftar nomor pengenal pendek bernama *Short Transaction ID* yang ukurannya hanya 6 byte per transaksi.
Ketika simpul penerima mendapat bundel kecil ini, ia langsung mencocokkan ID 6-byte tersebut ke dalam mempool lokalnya sendiri.
Dalam hitungan milidetik, simpul tersebut merakit sendiri blok dua megabyte yang utuh di dalam memorinya tanpa perlu mengunduh ulang dari internet.
Teknologi ini memangkas konsumsi bandwidth hingga lebih dari sembilan puluh persen dan memangkas waktu propagasi global hingga di bawah satu detik.

---

## Slide 11: Vektor Serangan P2P 1: The Eclipse Attack

### Konten Slide
- **Definisi Serangan:** Upaya penyerang untuk mengisolasi secara total satu simpul target tertentu dari jaringan jujur global.
- **Mekanisme Eksploitasi:**
  - Penyerang membuat ratusan simpul palsu dan membanjiri tabel perutean simpul target (seperti node bursa kripto atau pedagang besar).
  - Penyerang memonopoli seluruh koneksi masuk (*inbound*) dan koneksi keluar (*outbound*) simpul korban.
  - Simpul korban mengalami kondisi gerhana (*eclipsed*): korban hanya melihat pandangan dunia palsu yang diatur oleh penyerang.
- **Konsekuensi Fatal:**
  - Penyerang dapat menyodorkan rantai blok palsu yang ditambang secara privat ke simpul korban.
  - Menipu korban agar menganggap pembayaran transaksi sudah terkonfirmasi resmi, lalu mengeksekusi serangan double-spending di jaringan utama.
- **Mekanisme Pertahanan:**
  - *Diversifikasi Subnet:* Membatasi koneksi keluar agar berasal dari alamat Autonomous System Numbers (ASN) dan subnet IPv4 `/16` yang berbeda-beda.
  - *Anchor Connections:* Menyimpan daftar alamat IP simpul jujur terpercaya yang tahan lama ke penyimpanan disk lokal.
- *Visual:* Ilustrasi simpul korban dikelilingi dan diisolasi oleh simpul merah penyerang, terputus total dari jaringan simpul hijau jujur di luar.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Eclipse attack bertujuan membutakan satu simpul dari dunia luar.
- Penyerang memonopoli seluruh koneksi peer korban untuk menyodorkan blockchain palsu.
- Pertahanan: batasi koneksi dari subnet IP yang sama dan simpan koneksi jangkar terpercaya di disk.

**Naskah Tutur (Voiceover Script):**
Karena blockchain beroperasi di internet publik yang terbuka, lapisan jaringan P2P adalah sasaran empuk bagi para peretas.
Salah satu serangan paling berbahaya di tingkat jaringan adalah *Eclipse Attack* atau serangan gerhana.
Dalam serangan ini, target peretas bukanlah meretas matematika kriptografinya, melainkan mengisolasi satu simpul tertentu dari dunia luar, misalnya simpul milik bursa kripto besar.
Peretas meluncurkan ratusan simpul palsu dan membanjiri koneksi masuk serta koneksi keluar milik korban hingga seluruh jalurnya termonopoli.
Simpul korban kini berada dalam kondisi gerhana: ia tidak bisa lagi mendengar kabar dari simpul-simpul jujur di seluruh dunia.
Korban hanya bisa melihat informasi apa pun yang diizinkan oleh peretas.
Peretas kemudian bisa menyodorkan riwayat blockchain palsu yang ditambang secara rahasia ke bursa tersebut, membuat bursa percaya bahwa transfer uang peretas sudah lunas.
Setelah barang atau uang fiat dicairkan oleh korban, peretas membatalkan transaksi itu di jaringan dunia nyata.
Untuk menangkal serangan ini, klien blockchain modern menerapkan aturan ketat: koneksi keluar wajib disebar ke subnet IPv4 dan penyedia internet yang berbeda-beda, serta menyimpan daftar simpul jangkar terpercaya di memori penyimpanan lokal.

---

## Slide 12: Vektor Serangan P2P 2: Network-Layer Sybil Attacks & DoS

### Konten Slide
- **Sybil Attack pada Lapisan Jaringan:**
  - Berbeda dari konsensus penambangan (yang dilindungi oleh Proof of Work), membuat identitas simpul virtual di lapisan P2P berbiaya sangat murah.
  - Penyerang menyalakan ribuan simpul bayangan untuk memanipulasi rute pencarian Kademlia DHT dan memata-matai alamat asal transaksi.
- **Erosi Privasi dan De-anonimisasi:**
  - Dengan mengelilingi topologi jaringan, simpul penyerang mencatat simpul mana yang pertama kali membisikkan suatu transaksi (*first-hop monitoring*).
  - Berpotensi memetakan alamat transaksi blockchain ke alamat IP fisik perangkat pengguna di dunia nyata.
- **Ancaman Denial of Service (DoS):**
  - Membanjiri jaringan dengan transaksi sampah yang sengaja dibuat gagal validasi atau memicu kehabisan memori (*memory exhaustion*).
- **Strategi Mitigasi Jaringan:**
  - Pembatasan kuota koneksi per alamat IP secara ketat.
  - Pembatasan laju siaran gossip (*gossip rate limiting*).
  - *Peer Scoring Algorithms:* Sistem penalti otomatis yang memutus dan memblokir simpul yang menyiarkan data cacat atau duplikat.
- *Visual:* Bagan pohon mitigasi: Ribuan simpul palsu Sybil dibendung oleh dinding filter reputasi skor peer dan pembatasan laju transmisi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Identitas simpul virtual sangat murah dibuat, membuka celah Sybil attack di level jaringan.
- Bahaya utama: pemantauan first-hop untuk melacak alamat IP fisik pengguna asli.
- Solusi: skor reputasi rekanan (peer scoring), rate limiting, dan pemutusan simpul berperilaku buruk.

**Naskah Tutur (Voiceover Script):**
Meskipun Nakamoto Consensus menggunakan Proof of Work untuk mencegah manipulasi voting pembuatan blok, ancaman Sybil Attack tetap membayangi lapisan jaringan P2P.
Membuat ribuan akun simpul virtual di internet sangatlah murah dan mudah dilakukan oleh siapa pun yang punya server sewaan.
Seorang penyerang dapat menyebarkan ribuan simpul bayangan ke seluruh jaringan untuk memata-matai pergerakan data.
Bahaya terbesarnya adalah ancaman de-anonimisasi privasi pengguna.
Dengan memonitor simpul mana yang pertama kali menyiarkan sebuah transaksi ke internet, peretas dapat melacak dan memetakan transaksi tersebut ke alamat IP rumah atau kantor pengguna asli.
Selain itu, jaringan terbuka rentan terhadap serangan Denial of Service, di mana peretas membanjiri antrean mempool dengan transaksi sampah untuk membuat sistem kehabisan memori RAM.
Untuk mempertahankan stabilitas, perangkat lunak blockchain menerapkan sistem *Peer Scoring*.
Setiap simpul secara independen memberikan skor reputasi kepada tetangganya.
Jika ada simpul tetangga yang bertindak mencurigakan, mengirim data sampah, atau melanggar aturan laju pesan, simpul tersebut seketika diputus koneksinya dan diblokir dari tabel perutean.

---

## Slide 13: Vektor Serangan P2P 3: BGP Hijacking & Partisi Routing

### Konten Slide
- **Kerentanan Fondasi Internet (BGP):**
  - Internet global mengandalkan Border Gateway Protocol (BGP) untuk merutekan paket data antar-jaringan penyedia jasa internet (*Autonomous Systems*).
  - Protokol BGP klasik tidak memiliki autentikasi kriptografis bawaan, rentan terhadap manipulasi rute palsu.
- **Skenario BGP Hijacking:**
  - Penyedia internet nakal atau aktor negara mengumumkan rute prefiks IP palsu untuk membajak lalu lintas data menuju kolam penambangan (*mining pools*) utama.
  - Memecah jaringan blockchain global menjadi dua partisi wilayah yang terisolasi secara fisik (*network partition*).
  - Setiap partisi terus menambang rantai blok masing-masing tanpa menyadari keberadaan partisi lain, memicu reorganisasi rantai raksasa saat partisi tersambung kembali.
- **Arsitektur Ketahanan Tingkat Lanjut:**
  - *Enkripsi Lapisan Transport:* Pemanfaatan protokol komunikasi modern seperti libp2p yang dilengkapi enkripsi saluran Noise.
  - *Jaringan Terowongan Terenkripsi:* Integrasi jaringan privat virtual dan routing bawang (*Tor onion routing*).
  - *Pemancar Satelit Orbital:* Stasiun luar angkasa independen (seperti Blockstream Satellite) yang memancarkan header dan blok langsung dari orbit bumi, kebal terhadap kabel darat yang diputus.
- *Visual:* Diagram peta dunia menunjukkan serangan pembajakan jalur kabel BGP di darat berdampingan dengan pemancar satelit luar angkasa yang memancarkan blok langsung dari orbit.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- BGP adalah sistem navigasi rute internet global yang rentan dibajak oleh ISP nakal atau negara.
- Pembajakan BGP dapat membelah jaringan blockchain menjadi dua partisi wilayah terpisah.
- Solusi mutakhir: enkripsi libp2p, terowongan Tor, hingga relay satelit dari luar angkasa.

**Naskah Tutur (Voiceover Script):**
Ancaman terbesar bagi lapisan fisik blockchain sebenarnya bukan datang dari peretas perorangan, melainkan dari infrastruktur internet itu sendiri: Border Gateway Protocol atau BGP.
BGP adalah protokol navigasi utama yang mengatur bagaimana paket data dialirkan antar-penyedia jasa internet di seluruh dunia.
Sayangnya, protokol BGP warisan era awal internet ini tidak memiliki enkripsi bawaan.
Sebuah perusahaan telekomunikasi nakal atau aktor negara yang otoriter dapat memanipulasi rute BGP untuk membajak lalu lintas data blockchain.
Mereka bahkan memiliki kekuatan fisik untuk membelah jaringan global menjadi dua partisi wilayah yang saling terisolasi, misalnya memutus komunikasi antara benua Asia dan benua Amerika.
Akibatnya, kedua belahan dunia akan menambang rantai blok mereka sendiri-sendiri tanpa sadar, dan ketika kabel tersambung kembali, salah satu rantai akan musnah tertelan reorganisasi konsensus.
Untuk mengantisipasi skenario perang geopolitik dan sensor tingkat negara ini, komunitas blockchain membangun benteng pertahanan berlapis.
Jaringan modern menggunakan protokol libp2p dengan enkripsi Noise, rute terowongan Tor, dan bahkan memanfaatkan relay satelit komersial seperti Blockstream Satellite yang menyiarkan blok Bitcoin langsung dari stasiun luar angkasa secara kontinu, sepenuhnya kebal dari pemutusan kabel optik di dasar samudra.

---

## Slide 14: Empat Pilar Distributed Trust & Jembatan ke Modul Berikutnya

### Konten Slide
- **Sintesis Lengkap Fondasi Kepercayaan Terdesentralisasi:**
  1. *The Double-Spending Solution:* Konsensus Nakamoto menyelaraskan insentif ekonomi termodinamika tanpa otoritas tunggal.
  2. *Cryptographic Hashes & Merkle Trees:* Integritas data matematis permanen dan pembuktian inklusi berkecepatan logaritmik.
  3. *Asymmetric Cryptography:* Kedaulatan kepemilikan mutlak dan otorisasi transfer nilai melalui tanda tangan digital.
  4. *Peer-to-Peer Networks:* Tulang punggung komunikasi jala yang tangguh, tahan sensor, dan tanpa titik kegagalan tunggal.
- **Pertanyaan Struktural Berikutnya:**
  - Kita telah memiliki transaksi terotentikasi yang merambat di atas jaringan jala terdesentralisasi.
  - Namun, bagaimana struktur data internal buku besar (*ledger*) diorganisasikan di dalam memori dan penyimpanan permanen?
  - Mengapa Bitcoin memilih model koin fisik digital lepasan (**UTXO Model**) sementara Ethereum memilih model buku rekening saldo tunggal (**Account Model**)?
- **Arah Kurikulum Selanjutnya:** Memasuki **Modul 2: Blockchain Architecture and State Models**.
- *Visual:* Empat pilar arsitektur Distributed Trust menopang fondasi bangunan yang mengarah ke pintu gerbang arsitektur blockchain dan state models.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkum 4 pilar fondasi Distributed Trust yang sudah tuntas dipelajari.
- Masalah berikutnya: bagaimana data ledger disimpan dan dikelola dalam memori?
- Teaser Modul 2: Blockchain Architecture and State Models (UTXO vs Account-based).

**Naskah Tutur (Voiceover Script):**
Dengan berakhirnya sesi ini, kita telah resmi menuntaskan seluruh fondasi penting di bab pertama: Distributed Trust.
Mari kita lihat kembali empat pilar kokoh yang sudah berhasil kita bangun bersama.
Pertama, solusi double-spending lewat sintesis Nakamoto yang mengikat kebenaran sejarah pada hukum termodinamika energi fisik.
Kedua, fungsi hash dan pohon Merkle yang memberikan jaminan integritas data permanen dalam skala logaritmik.
Ketiga, kriptografi asimetris yang melahirkan tanda tangan digital sebagai bukti kepemilikan mutlak tanpa campur tangan bank sentral.
Dan keempat, jaringan Peer-to-Peer yang mendistribusikan seluruh kebenaran ini ke seluruh penjuru dunia tanpa bergantung pada satu pun server sentral.
Empat pilar ini telah berdiri tegak.
Namun, memiliki transaksi yang sah dan menyebar di jaringan P2P belumlah cukup untuk membangun sistem komputasi global.
Bagaimana sebenarnya struktur data internal sebuah blok dirancang?
Bagaimana komputer menghitung mutasi saldo dan perubahan status dunia dari detik ke detik?
Dan mengapa Bitcoin memilih arsitektur koin lepasan yang disebut UTXO model, sementara Ethereum memilih model buku rekening saldo global yang disebut Account model?
Semua misteri struktural tersebut akan kita bedah secara mendalam di modul berikutnya: Blockchain Architecture and State Models.
Terima kasih atas perhatian kalian, dan sampai jumpa di bab selanjutnya.
