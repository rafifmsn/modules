# Peer-to-Peer Networks and Network Topologies

Modul Presentasi: Fondasi Distributed Trust (01.4)

---

## Slide 1: Peer-to-Peer Networks and Network Topologies

### Konten Slide

PEER-TO-PEER NETWORKS AND NETWORK TOPOLOGIES
Fundamentals of Distributed Trust (Module 01.4)
The physical communication backbone, decentralized gossip protocols, and network resilience.

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Membuka modul keempat sekaligus modul penutup bab Distributed Trust.
- Menjelaskan pentingnya lapisan jaringan komunikasi P2P sebagai pondasi fisik blockchain.
- Menghubungkan tanda tangan kriptografis dari modul sebelumnya ke mekanisme distribusi data global.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul keempat dari trek Fundamentals of Distributed Trust.
Pada modul-modul sebelumnya, kita sudah membedah solusi double-spending, integritas pohon Merkle, dan tanda tangan digital.
Kita tahu bagaimana Alice dapat membuat transaksi dan membuktikan otoritasnya secara matematis.
Namun secanggih apa pun kriptografi yang kita gunakan, transaksi yang hanya tersimpan di komputer lokal Alice tidak akan pernah bernilai jika tidak sampai ke validator di belahan bumi lain.
Sebuah blockchain pada dasarnya adalah mesin penyimpan status bersama yang harus disinkronkan ke ribuan komputer secara terus-menerus.
Di dunia tanpa server sentral seperti AWS atau Google Cloud, bagaimana data disebarkan dengan cepat, andal, dan tahan sensor?
Jawabannya terletak pada lapisan jaringan Peer-to-Peer atau P2P.
Hari ini kita akan membedah bagaimana protokol gossip bekerja, bagaimana simpul menemukan rekannya lewat Kademlia DHT, serta ancaman fisik jaringan seperti Eclipse Attack dan BGP Hijacking.

---

## Slide 2: The Peer-to-Peer Paradigm

### Konten Slide

Evolution of Network Topologies and Organic Fault Tolerance

Client-Server (Web2):

- Architecture: Centralized Star Topology.
- Role Asymmetry: Central server controls database and access; devices are passive clients.
- Vulnerability: Single point of failure. Susceptible to coordinated DDoS, cable cuts, and regulatory takedowns.

Hybrid P2P (e.g., Napster, 1999):

- Architecture: Direct transfer with Central Index.
- Mechanic: Peers transfer payloads directly but rely on a central server to track file locations.
- Vulnerability: Structural fragility. Seizing the index server instantly collapses the entire network.

Pure P2P Mesh (Blockchain / BitTorrent):

- Architecture: Decentralized Distributed Hash Table (DHT).
- Role Symmetry: Every node is a Servent (Server + Client).
- Organic Fault Tolerance: Zero central coordinators. 50% of global nodes can go offline simultaneously without halting transaction processing.

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Bandingkan model client-server Web2, hybrid P2P Napster, dan P2P mesh murni.
- Pada model P2P murni, setiap simpul bertindak sebagai client sekaligus server (servent).
- Ketahanan organik: separuh simpul mati di dunia, sistem tetap berjalan lancar.

**Naskah Tutur (Voiceover Script):**
Untuk memahami cara kerja blockchain, kita harus melihat perbedaan mendasar antara internet konvensional dan jaringan terdesentralisasi.
Seluruh aplikasi Web2 yang kita pakai hari ini dibangun di atas model client-server.
Di arsitektur ini, ada jurang pemisah yang lebar antara pengguna dan server.
Pusat data raksasa milik Amazon AWS atau Google memegang basis data utama dan memegang kuasa mutlak untuk melayani atau memblokir pengguna.
Jika server utama mereka mengalami gangguan teknis atau terkena serangan siber, jutaan pengguna di seluruh dunia seketika lumpuh tidak bisa bertransaksi.
Pada tahun 1999, Napster memelopori transfer langsung antar-komputer, namun masih bergantung pada satu server indeks pusat untuk melacak letak file.
Ketika pengadilan federal Amerika menutup server indeks tersebut, seluruh jaringan Napster langsung musnah dalam semalam.
Melihat kegagalan itu, blockchain mengadopsi model Pure P2P Mesh yang diwarisi dari BitTorrent.
Di jaringan P2P murni, semua komputer memiliki derajat yang setara dan disebut sebagai servent, singkatan dari server dan client.
Tidak ada komputer master atau direktur lalu lintas sentral.
Arsitektur ini memiliki sifat organic fault tolerance: bahkan jika lima puluh persen komputer di jaringan mendadak mati, sisa simpul lainnya akan tetap melanjutkan pencatatan ledger tanpa henti.

---

## Slide 3: Epidemic Dissemination

### Konten Slide

Global broadcast via the Gossip Protocol

The Broadcast Challenge:
No central broadcast server exists.
Transactions must reach global validators in seconds using limited bandwidth.

Biological Virus Model:
Nodes do not broadcast to the entire world.
A node transmits data only to a localized subset of immediate peers (typically 8 to 12 connections).

Logarithmic Scalability:
Peers validate and forward to their own peers.
In a random graph of degree d, the message infects the entire global network of N nodes in a strict complexity of O(log N) network hops.
Exponential Fan-Out: d^1, d^2, d^3...

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Menjelaskan Gossip Protocol yang meniru penyebaran virus biologis.
- Simpul hanya mengirim transaksi ke 8 sampai 12 tetangga langsungnya.
- Penyebaran eksponensial mencapai seluruh jaringan global dalam O(log N) langkah jaringan.

**Naskah Tutur (Voiceover Script):**
Tanpa adanya server siaran terpusat seperti Cloudflare, bagaimana sebuah transaksi baru disiarkan ke puluhan ribu validator global dalam beberapa detik?
Blockchain menggunakan mekanisme yang disebut Gossip Protocol atau Epidemic Dissemination.
Protokol ini meniru cara kerja penyebaran virus biologis di alam nyata.
Ketika laptop Alice memancarkan sebuah transaksi, ia tidak mengirimkannya ke seluruh dunia sekaligus karena hal itu akan membuat koneksi internetnya macet seketika.
Alice hanya mengirimkan transaksi tersebut ke lingkaran kecil tetangga langsungnya, biasanya berkisar antara delapan hingga dua belas simpul.
Simpul tetangga yang menerima pesan akan memvalidasi keabsahan data tersebut, lalu meneruskannya kembali ke lingkaran tetangga mereka masing-masing.
Melalui pola percabangan eksponensial ini, pesan menyebar secara berlipat ganda dari d pangkat satu, d pangkat dua, hingga d pangkat tiga.
Dalam grafik acak berderajat d, transaksi akan menginfeksi seluruh jaringan global berukuran N simpul dalam kompleksitas O(log N) lompatan jaringan saja.

---

## Slide 4: Transaction Ingestion Mechanics

### Konten Slide

Step-by-step lifecycle of P2P payload processing

Pipeline:

1. Message Origination: Incoming transaction payload from user.
2. Local Audit: Strict verification on zero trust.
3. Mempool Ingestion: Validated transactions queued for block inclusion.
4. Targeted Announcements (inv): Compact hash broadcast to neighbors.
5. Message Deduplication: Filter prevents redundant payload downloads.

Core Rules:

1. Strict Local Audit:
   Nodes operate on zero trust. Incoming transactions face rigorous checks: byte format validity, cryptographic signature verification, and sufficient sender balances. Invalid data is instantly dropped.
2. Mempool Ingestion:
   Validated transactions are deposited into the Mempool, the local memory pool holding pending transactions awaiting block inclusion.
3. Targeted Announcements (inv):
   Nodes broadcast a compact inventory message (inv) containing only the transaction hash to neighbors.
4. Message Deduplication:
   Receiving nodes cross-reference the hash against their local Mempool. If already present, the payload is ignored, aggressively conserving global bandwidth.

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Alur pemrosesan muatan transaksi di tingkat simpul P2P.
- Audit lokal ketat berbasis zero-trust (tanda tangan dan saldo diperiksa).
- Mempool menampung transaksi valid sebelum masuk blok.
- Pesan inv menyiarkan hash ringkas untuk deduplikasi data dan efisiensi bandwidth.

**Naskah Tutur (Voiceover Script):**
Ketika sebuah paket transaksi tiba di pintu gerbang sebuah simpul, simpul tersebut menjalankan protokol verifikasi yang sangat disiplin.
Langkah pertama adalah Strict Local Audit.
Simpul blockchain selalu beroperasi dengan prinsip zero trust.
Simpul akan memeriksa format byte data mentah, memverifikasi keabsahan tanda tangan kriptografis, dan memastikan pengirim memiliki saldo yang cukup.
Jika ada satu parameter saja yang tidak valid, paket data akan langsung dibuang ke tempat sampah tanpa diproses lebih lanjut.
Langkah kedua adalah Mempool Ingestion: transaksi yang lolos audit dimasukkan ke dalam Mempool, yaitu ruang penampungan memori lokal untuk menunggu giliran dikemas ke dalam blok oleh penambang atau validator.
Langkah ketiga adalah Targeted Announcements.
Simpul tidak langsung memborbardir tetangganya dengan muatan data penuh.
Simpul hanya mengirimkan pesan inventaris ringkas atau pesan inv yang hanya memuat hash transaksi tersebut.
Langkah keempat adalah Message Deduplication.
Simpul penerima memeriksa hash tersebut ke dalam basis data Mempool miliknya sendiri.
Jika hash tersebut sudah ada di komputernya, simpul penerima akan mengabaikannya.
Teknik deduplikasi ini secara agresif menjaga bandwidth internet global dari pemborosan data berulang.

---

## Slide 5: Node Discovery & Kademlia DHT

### Konten Slide

Locating peers without centralized directories

Distributed Hash Table (DHT):
A decentralized database mapping network state.
Every node generates a permanent, 256-bit Node ID derived from its public key hash.
Physical geography is ignored.

The XOR Distance Metric:
Distance between Node x and Node y is calculated via bitwise exclusive-OR:
d(x, y) = x XOR y
This satisfies all axioms of geometric metric space: identity, symmetry, and triangle inequality.

Logarithmic Routing:
Routing tables are partitioned into K-Buckets by bit-prefix similarity.
Finding any specific node globally requires a maximum of O(log N) iterative lookups.

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Kademlia DHT memetakan jaringan tanpa buku telepon atau server sentral.
- Node ID 256 bit diturunkan dari hash public key, mengabaikan geografi fisik.
- Metrik jarak XOR d(x, y) = x XOR y memenuhi aksioma ruang metrik.
- K-Buckets membagi tabel rute dan menjamin pencarian simpul selesai dalam O(log N) langkah.

**Naskah Tutur (Voiceover Script):**
Ketika sebuah komputer baru menyalakan perangkat lunak blockchain untuk pertama kalinya, bagaimana ia menemukan rekan-rekannya di seluruh dunia tanpa adanya buku telepon atau server DNS terpusat?
Sebagian besar protokol modern, termasuk Ethereum dengan protokol Discv4 dan Discv5, mengandalkan Kademlia Distributed Hash Table atau DHT.
Di dalam Kademlia, setiap simpul menghasilkan identitas unik 256 bit yang disebut Node ID, yang diturunkan dari hash kunci publiknya.
Lokasi geografis fisik seperti negara atau benua diabaikan sepenuhnya.
Jarak antara Simpul x dan Simpul y diukur menggunakan metrik matematika bitwise XOR: jarak d(x, y) sama dengan x XOR y.
Operasi XOR ini memenuhi seluruh aksioma ruang metrik: simetris, non-negatif, dan memenuhi ketidaksamaan segitiga.
Tabel perutean di setiap simpul dibagi menjadi beberapa kelompok yang disebut K-Buckets berdasarkan kesamaan prefiks bit.
Ketika Anda mencari sebuah simpul atau data tertentu, algoritma Kademlia akan menanyakan simpul-simpul yang memiliki jarak XOR semakin mendekati target.
Melalui struktur biner ini, menemukan simpul mana pun di seluruh planet bumi dijamin selesai dalam maksimal O(log N) langkah pencarian iteratif.

---

## Slide 6: Bootstrapping & Network Churn

### Konten Slide

Entering the mesh and maintaining stable topology

The Bootstrap Problem:

- Initial State: New nodes power on with completely empty K-Buckets and routing tables.
- The Bootnode Solution: Client software contains hardcoded IP addresses of highly stable community Bootnodes.
- Transient Connection: The new node pings a Bootnode exclusively to request nearby active peers via Kademlia. Once populated, the connection is severed to prevent centralized dependency.

Network Churn Mitigation:

- The Threat: Unpredictable mass connection and disconnection of independent nodes (Network Churn).
- Least-Recently-Seen Replacement: Kademlia actively prioritizes nodes with high, proven uptime. Long-lived nodes statistically demonstrate the highest probability of remaining online, ensuring table stability despite constant network flux.

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Masalah bootstrap: simpul baru menyala dengan tabel rute K-Buckets kosong.
- Solusi Bootnodes: alamat IP komunitas ditanam dalam kode klien sebagai jembatan sementara.
- Mengatasi network churn: aturan Least-Recently-Seen mempertahankan simpul lama yang stabil.

**Naskah Tutur (Voiceover Script):**
Namun, ada satu paradoks awal yang harus dipecahkan: ketika sebuah simpul baru menyala pertama kali, tabel K-Buckets miliknya masih kosong melompong.
Bagaimana ia bisa mengirim sinyal XOR jika belum mengenal satu pun simpul lain?
Tantangan ini diselesaikan melalui mekanisme Bootstrapping.
Pengembang perangkat lunak klien menyertakan beberapa alamat IP statis dari simpul komunitas yang sangat stabil, yang dikenal sebagai Bootnodes.
Perlu dicatat, koneksi ke Bootnode ini bersifat transien atau sementara.
Simpul baru hanya menyapa Bootnode untuk meminta daftar tetangga aktif pertama di sekitarnya.
Begitu tabel rute lokalnya mulai terisi oleh simpul-simpul independen lain, simpul baru akan memutuskan hubungannya dengan Bootnode untuk mencegah ketergantungan sentral.
Tantangan berikutnya adalah Network Churn, yaitu fenomena di mana ribuan komputer pengguna tersambung dan terputus secara acak setiap menitnya.
Untuk menjaga kestabilan topologi jaringan, algoritma Kademlia menerapkan aturan Least-Recently-Seen Replacement.
Kademlia memprioritaskan simpul-simpul yang sudah online dalam durasi lama.
Data statistik membuktikan bahwa komputer yang sudah menyala selama berminggu-minggu memiliki probabilitas paling tinggi untuk tetap aktif, sehingga tabel jaringan tetap kokoh meskipun ribuan simpul baru datang dan pergi.

---

## Slide 7: Scalability: Compact Blocks (BIP-152)

### Konten Slide

Neutralizing propagation delay and accidental forks

The Latency Bottleneck:

- The Physics: Transmitting raw 2MB blocks across submarine cables takes seconds of propagation delay.
- Accidental Forks & Orphan Rate: During this delay, remote miners waste energy building on obsolete chains, creating accidental forks and orphan blocks.
- Centralization Pressure: High latency incentivizes massive data center clustering to minimize physical distance, threatening decentralization.

The BIP-152 Solution:

- The Insight: 99% of transactions in a newly mined block already exist in the receiving node Mempool.
- Data Minimization: Miners stop transmitting full raw blocks. They transmit only an 80-byte Block Header and a list of 6-byte Short Transaction IDs (salted SipHash).
- Instant Local Reconstruction: The receiving node matches the 6-byte IDs to its local Mempool, rebuilding the 2MB block locally in milliseconds.
- Reduces bandwidth waste by >90%.

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Hambatan latensi penyebaran blok mentah 2MB melintasi kabel bawah laut.
- Jeda propagasi memicu orphan blocks dan sentralisasi penambang di data center raksasa.
- Solusi BIP-152 Compact Blocks: 99 persen transaksi sudah ada di Mempool lokal penerima.
- Hanya menyiarkan header 80-byte dan Short ID 6-byte, memangkas bandwidth >90 persen.

**Naskah Tutur (Voiceover Script):**
Ketika volume transaksi meningkat, penyiaran blok mentah berukuran beberapa megabyte membentur batasan hukum fisika internet.
Menyebarkan data blok berukuran besar melintasi kabel serat optik bawah laut membutuhkan jeda waktu propagasi beberapa detik.
Jeda beberapa detik ini sangat berbahaya di dalam sistem Proof of Work.
Ketika satu penambang berhasil menemukan blok, penambang di belahan dunia lain yang terlambat menerima informasi tersebut akan membuang energi listrik untuk menambang di atas blok usang.
Ini memicu timbulnya accidental forks dan orphan blocks.
Keadaan ini menciptakan tekanan sentralisasi, di mana para penambang terpaksa berkumpul di satu pusat data yang sama untuk meminimalkan jarak latensi fisik.
Bitcoin memecahkan krisis ini lewat pembaruan Compact Blocks atau BIP-152 pada tahun 2016.
Para insinyur menyadari bahwa sembilan puluh sembilan persen transaksi yang ada di dalam blok baru sebenarnya sudah tersimpan rapi di dalam Mempool simpul penerima.
Oleh karena itu, penambang tidak perlu lagi menyiarkan blok mentah yang besar.
Penambang cukup menyiarkan header blok berukuran 80 byte dan daftar ID ringkas enam-byte dari transaksi tersebut menggunakan algoritma salted SipHash.
Simpul penerima mencocokkan ID pendek tersebut ke Mempool lokalnya dan merekonstruksi blok utuh secara instan dalam beberapa milidetik, memangkas beban lalu lintas data jaringan hingga lebih dari sembilan puluh persen.

---

## Slide 8: Network-Layer Threats

### Konten Slide

Eclipse isolation and Sybil de-anonymization

1. The Eclipse Attack

- Mechanism: Attacker monopolizes all inbound and outbound connections of a target (e.g., a crypto exchange).
- Impact: The eclipsed node is fed a privately mined, counterfeit blockchain, enabling devastating double-spending attacks.
- Mitigation: Diversifying outbound connections across disparate IPv4 /16 subnets (ASNs) and anchoring trusted peers to local disk storage.

2. Sybil Attacks & DoS

- Mechanism: Flooding the network with cheap virtual identities.
- First-Hop Monitoring: Attackers map the origin of transactions, destroying privacy and de-anonymizing physical IP addresses.
- Mitigation: Peer Scoring Algorithms automatically penalize, disconnect, and ban nodes that spam invalid data or violate gossip rate limits.

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Dua ancaman lapisan jaringan: Eclipse Attack dan Sybil Monitoring.
- Eclipse Attack: Penyerang memonopoli koneksi simpul target untuk menyuapkan blockchain palsu.
- Mitigasi Eclipse: Diversifikasi koneksi keluar melintasi beragam subnet IPv4 /16 dan ASN.
- Sybil Attack memetakan IP fisik pengguna; dimitigasi dengan Peer Scoring Algorithm otomatis.

**Naskah Tutur (Voiceover Script):**
Meskipun arsitektur mesh terdesentralisasi sangat tangguh, jaringan P2P tetap menghadapi ancaman keamanan di tingkat lapisan jaringan.
Serangan paling berbahaya adalah Eclipse Attack.
Dalam serangan ini, penyerang menargetkan satu simpul tertentu, misalnya simpul milik bursa kripto besar.
Penyerang secara perlahan memonopoli seluruh koneksi masuk dan keluar dari simpul korban.
Setelah simpul terisolasi total dari dunia luar, penyerang menyuapkan rantai blockchain palsu buatan mereka sendiri.
Korban mengira transaksi deposit sudah sah di rantai global, padahal mereka sedang terjebak di dalam ilusi buatan peretas, sehingga penyerang berhasil mencairkan dana lewat serangan double-spending.
Blockchain memitigasi serangan ini dengan mendiversifikasi koneksi keluar secara ketat melintasi berbagai subnet IPv4 garis miring enam belas dan Autonomous System Numbers yang berbeda-beda.
Ancaman kedua adalah Sybil de-anonymization.
Penyerang menyalakan ribuan simpul mata-mata untuk memantau lompatan pertama transaksi, dengan tujuan membongkar identitas alamat IP fisik pengguna.
Untuk melawan hal ini, simpul menerapkan Peer Scoring Algorithm yang secara otomatis memberikan penalti, memutus koneksi, dan memblokir simpul mana pun yang melanggar batas lalu lintas atau menyebarkan data palsu.

---

## Slide 9: Hardware & Routing Resilience

### Konten Slide

Surviving BGP Hijacking and state-level censorship

Border Gateway Protocol (BGP) Vulnerability:

- The Threat: The global internet relies on BGP to route traffic between Autonomous Systems. Classical BGP lacks cryptographic authentication.
- Routing Partitions: Rogue ISPs or authoritarian states can announce fake IP prefix routes, hijacking traffic meant for major mining pools.
- The Consequence: The global mesh is physically cleaved into isolated partitions. Both sides mine independently, triggering massive, destructive chain reorganizations upon reconnection.

Advanced Countermeasures:

- Transport Layer Encryption: Modern networking stacks (libp2p) secured by Noise protocol encryption channels.
- Encrypted Tunnels: Routing traffic through Tor onion networks to obscure node origins and bypass terrestrial firewalls.
- Orbital Satellites: Independent infrastructure (e.g., Blockstream Satellite) continuously broadcasting block headers directly from earth orbit, rendering terrestrial cable cuts ineffective.

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Kerentanan BGP pada routing internet global tanpa otentikasi kriptografis.
- Pembajakan rute BGP oleh ISP nakal atau negara dapat membelah jaringan dan memicu reorg masif.
- Tiga penangkal: Enkripsi Noise protocol di libp2p, terowongan Tor, dan siaran satelit Blockstream dari orbit bumi.

**Naskah Tutur (Voiceover Script):**
Tingkat kerentanan terdalam dari sebuah blockchain terletak pada infrastruktur fisik internet itu sendiri: protokol Border Gateway Protocol atau BGP.
BGP adalah protokol pengatur rute lalu lintas data antar-penyedia layanan internet di seluruh dunia yang sayangnya tidak memiliki mekanisme otentikasi kriptografis bawaan.
Penyedia internet nakal atau rezim negara otoriter dapat menyiarkan rute prefiks IP palsu untuk membajak lalu lintas data simpul penambang besar.
Serangan ini dapat membelah jaringan internet global menjadi dua partisi yang terisolasi secara fisik.
Kedua belahan dunia akan terus memproduksi blok secara mandiri tanpa mengetahui keberadaan satu sama lain.
Ketika kabel kembali tersambung beberapa jam kemudian, cabang rantai yang lebih panjang akan menimpa cabang rantai lainnya, memicu chain reorganization raksasa yang merusak transaksi ekonomi yang telah selesai.
Untuk menghadapi ancaman tingkat negara ini, para insinyur blockchain membangun pertahanan berlapis.
Pertama, enkripsi lapisan transport menggunakan protokol Noise di atas libp2p guna mencegah inspeksi paket oleh ISP.
Kedua, perutean anonim melalui jaringan terowongan Tor untuk menembus sensor firewall terestrial.
Ketiga, pembangunan infrastruktur satelit luar angkasa mandiri seperti Blockstream Satellite yang menyiarkan data blok langsung dari orbit bumi, memastikan bahwa pemutusan kabel serat optik bawah laut sekalipun tidak akan pernah sanggup mematikan denyut nadi blockchain.

---

## Slide 10: Synthesis: The Four Pillars

### Konten Slide

The completed architecture of Distributed Trust

1. The Double-Spending Solution:
   Nakamoto Consensus aligns thermodynamic economic incentives without central authority.

2. Cryptographic Hashes & Merkle Trees:
   Permanent mathematical data integrity and logarithmic-speed inclusion proofs.

3. Asymmetric Cryptography:
   Absolute sovereign ownership and value transfer authorization via digital signatures.

4. Peer-to-Peer Networks:
   A censorship-resistant communication backbone with organic fault tolerance and zero single points of failure.

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Rangkuman empat pilar arsitektur dasar Distributed Trust.
- Konsensus Nakamoto menyelesaikan insentif ekonomi dan ketiadaan otoritas sentral.
- Hash dan Merkle Tree menjamin integritas data dan verifikasi logaritmik.
- Kriptografi Asimetris memberikan kedaulatan otorisasi transfer nilai.
- Jaringan P2P memberikan tulang punggung komunikasi organik tanpa single point of failure.

**Naskah Tutur (Voiceover Script):**
Dengan selesainya pembahasan lapisan jaringan, seluruh arsitektur dasar dari Distributed Trust kini telah lengkap berdiri kokoh di atas empat pilar utama.
Pilar pertama adalah The Double-Spending Solution: Nakamoto Consensus menyelaraskan aturan ekonomi dan hukum termodinamika tanpa memerlukan satu pun figur otoritas sentral.
Pilar kedua adalah Cryptographic Hashes dan Merkle Trees: menjamin integritas data secara permanen dan memungkinkan pembuktian audit transaksi dengan kecepatan logaritmik O(log N).
Pilar ketiga adalah Asymmetric Cryptography: kurva eliptik dan tanda tangan digital menghadirkan kedaulatan mutlak atas kepemilikan dan otorisasi pemindahan nilai.
Dan pilar keempat adalah Peer-to-Peer Networks: menyediakan tulang punggung komunikasi tahan sensor yang memiliki ketahanan mandiri tanpa satu pun titik kegagalan sentral.
Keempat pilar ini saling mengunci, mengubah teori ilmu komputer abstrak menjadi realitas sistem moneter terdesentralisasi pertama di dunia.

---

## Slide 11: Bridge to the Next Module: Blockchain Architecture and State Models

### Konten Slide

The Structural Question:
We now have authenticated transactions propagating over a decentralized mesh.
But how is the internal ledger actually organized in memory?

Next Track:
Module 2: Blockchain Architecture and State Models (UTXO vs. Account Models).

### Catatan Presenter (Cheatsheet)

**Quick Cues:**

- Mengantarkan peserta menuju Bab 2 (Architecture and State).
- Menghubungkan transmisi data P2P ke pengorganisasian memori internal simpul.
- Teaser materi modul 02: Model UTXO pada Bitcoin vs Model Account pada Ethereum.

**Naskah Tutur (Voiceover Script):**
Kini kita telah memiliki transaksi sah yang terotentikasi dan beredar mulus di atas jaringan jala global.
Namun, timbul pertanyaan mendasar berikutnya bagi para arsitek sistem: bagaimana data buku besar ini sebenarnya disusun dan diorganisasikan di dalam memori komputer mesin simpul?
Bagaimana Bitcoin dan Ethereum mencatat saldo pengguna secara fundamental di tingkat struktur data?
Apakah transaksi disimpan sebagai grafik koin pecahan yang belum dibelanjakan, ataukah disimpan seperti buku tabungan rekening bank dengan saldo akun saldo tunggal?
Di bab berikutnya, kita akan membedah Module 2: Blockchain Architecture and State Models: UTXO versus Account Models.
Terima kasih atas perhatian Anda di bab pertama ini, dan sampai jumpa di modul selanjutnya.
