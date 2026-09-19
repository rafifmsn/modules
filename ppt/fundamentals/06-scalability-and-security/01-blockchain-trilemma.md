# The Blockchain Trilemma
Modul Presentasi: Scalability and Security (06.1)

---

## Slide 1: The Blockchain Trilemma: Throughput Limits and Modular Paradigms

### Konten Slide
The Blockchain Trilemma: Throughput Limits, Hardware Constraints, and Modular Paradigms
Module 06.1: Scalability and Security
Track: Fundamentals of Distributed Trust

Core Architectural Focus:
- Why monolithic public blockchains cannot simultaneously optimize throughput, security, and decentralization.
- The physics of distributed networks: network latency, CPU execution bounds, and disk I/O bottlenecks.
- How decoupling execution, consensus, settlement, and data availability resolves the trilemma through modular scaling.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul pertama dari Chapter 06: Scalability and Security.
- Memperkenalkan batasan fundamental sistem terdistribusi yang dikenal sebagai The Blockchain Trilemma.
- Menekankan bahwa menaikkan ukuran blok bukan solusi jangka panjang, dan paradigma modular adalah kunci penskalaan masa depan.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul pertama dari bab Scalability and Security.
Pada bab sebelumnya, kita telah mempelajari bagaimana smart contract, automated market makers, dan protokol lending mengoordinasikan modal global secara terdesentralisasi.
Namun ketika jutaan pengguna bertransaksi secara bersamaan, jaringan publik mendadak mengalami kemacetan parah dan biaya gas melonjak tinggi.
Banyak orang bertanya: mengapa blockchain tidak bisa dibuat secepat sistem perbankan terpusat modern?
Hari ini kita akan membedah akar penyebab masalah tersebut melalui The Blockchain Trilemma.
Kita akan meneliti mengapa batasan fisik perangkat keras membuat blockchain monolitik tidak dapat dipercepat tanpa mengorbankan desentralisasi.
Kita juga akan mempelajari bagaimana pergeseran ke paradigma modular memecahkan kebuntuan fundamental ini.

---

## Slide 2: Distributed Systems Trade-offs and the Trilemma Origin

### Konten Slide
Distributed Systems Trade-offs and the Trilemma Origin

The Law of Distributed Physics:
- Designing decentralized protocols requires managing unavoidable fundamental trade-offs.
- No single database or network topology can simultaneously maximize every performance metric.
- Derived from classical distributed systems theory, analogous to the CAP Theorem in database engineering.

Vitalik Buterin Formulation (2017):
- Formalized the core trade-off governing public distributed ledgers.
- A decentralized blockchain can optimize at most two of three primary properties at any given time.
- The three competing pillars: Decentralization, Security, and Scalability.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Hubungkan dengan prinsip trade-off klasik dalam ilmu komputer seperti Teorema CAP.
- Vitalik Buterin merumuskan the blockchain trilemma secara formal pada tahun 2017.
- Pesan inti: tidak ada makan siang gratis dalam sistem terdistribusi monolitik.

**Naskah Tutur (Voiceover Script):**
Dalam ilmu komputer dan arsitektur sistem terdistribusi, tidak pernah ada yang namanya makan siang gratis.
Kalian mungkin familiar dengan Teorema CAP pada sistem basis data tradisional, di mana kita dipaksa memilih antara Consistency, Availability, dan Partition Tolerance.
Hukum trade-off serupa berlaku pada blockchain publik.
Pada tahun 2017, Vitalik Buterin merumuskan aturan main ini secara formal melalui konsep The Blockchain Trilemma.
Dalilnya sangat tegas: sebuah jaringan blockchain terdesentralisasi hanya mampu memaksimalkan paling banyak dua dari tiga sifat dasar sekaligus.
Tiga sifat dasar tersebut adalah Decentralization, Security, dan Scalability.
Jika kita mencoba memaksa memaksimalkan ketiganya dalam satu lapisan monolitik, hukum fisika komputasi dan jaringan akan menolak desain tersebut.

---

## Slide 3: The Three Pillars Defined: Decentralization, Security, Scalability

### Konten Slide
The Three Pillars Defined: Decentralization, Security, Scalability

1. Decentralization:
- The network can be verified and validated by thousands of independent participants using standard consumer hardware.
- Prevents systemic reliance on expensive, specialized institutional data centers.
- Anyone can run a full node locally to independently audit the state of the system.

2. Security:
- The protocol provides mathematical and economic resistance against coordinated Byzantine attacks and 51 percent reorganizations.
- The economic cost to manipulate or reverse transactions far exceeds any potential attacker profit.
- Finalized state transitions remain tamper-proof and mathematically immutable.

3. Scalability:
- The network processes thousands of transactions per second (TPS) with sub-second latency and minimal fees.
- High capacity to absorb surges in global economic activity without pricing out everyday users.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bedah satu per satu arti konkret dari desentralisasi, keamanan, dan skalabilitas.
- Desentralisasi bukan sekadar jargon politik, melainkan syarat bahwa pengguna biasa mampu memverifikasi buku besar di rumah.
- Keamanan adalah ketahanan termodinamika atau ekonomi terhadap serangan 51 persen.

**Naskah Tutur (Voiceover Script):**
Mari kita definisikan ketiga pilar ini secara presisi agar kita tidak terjebak dalam slogan pemasaran.
Pilar pertama adalah Decentralization.
Ini bukan sekadar desentralisasi di atas kertas.
Syarat mutlaknya adalah: pengguna biasa harus mampu menjalankan full node verifikasi di laptop atau komputer rumah sendiri tanpa perlu menyewa server data center berbiaya mahal.
Pilar kedua adalah Security.
Ini berarti jaringan memiliki jaminan ekonomi dan kriptografis yang sangat kokoh terhadap serangan Byzantine atau reorganisasi 51 persen.
Modal yang diperlukan untuk menyerang jaringan harus jauh melampaui seluruh nilai aset yang tersimpan di dalamnya.
Pilar ketiga adalah Scalability atau throughput.
Artinya sistem mampu memproses ribuan transaksi per detik dengan latensi instan dan biaya transaksi hanya beberapa sen saja.
Tantangan utamanya: memilih dua pilar pertama secara langsung akan menekan pilar ketiga.

---

## Slide 4: The Monolithic Compromise Spectrum

### Konten Slide
The Monolithic Compromise Spectrum

Decentralization + Security (Sacrificing Scalability):
- Examples: Bitcoin, Ethereum Layer 1.
- Profile: Tens of thousands of independent consumer nodes globally; astronomically expensive attack cost.
- Limitation: Low throughput (7 to 30 TPS); high gas fees and network congestion during demand peaks.

Scalability + Security (Sacrificing Decentralization):
- Examples: Solana, Binance Smart Chain.
- Profile: High throughput reaching thousands of TPS with negligible transaction fees.
- Limitation: Requires high-end enterprise hardware (multi-core server CPUs, 256 GB RAM, 10 Gbps data center fiber); regular users cannot run verifying nodes.

Scalability + Decentralization (Sacrificing Security):
- Examples: Early multi-chain sharding without shared security.
- Profile: Multiple independent parallel chains with low entry barriers.
- Limitation: Partitioned economic security; individual shards remain highly vulnerable to 51 percent takeovers and validator collusion.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bitcoin dan Ethereum L1 memprioritaskan desentralisasi dan keamanan, menerima konsekuensi throughput rendah.
- Rantai berkecepatan tinggi sering kali menuntut hardware enterprise sehingga mengorbankan desentralisasi node.
- Sharding tanpa shared security membuat keamanan terpecah menjadi rapuh.

**Naskah Tutur (Voiceover Script):**
Kita dapat melihat spektrum kompromi ini dalam ekosistem blockchain dunia nyata hari ini.
Kubu pertama memilih Desentralisasi dan Keamanan, seperti Bitcoin dan Ethereum Layer 1.
Siapa pun dapat menjalankan node Ethereum di mini PC rumah, dan biaya untuk menyerang jaringannya mencapai miliaran dolar.
Namun konsekuensinya, kapasitas transaksi mereka terbatas pada 15 hingga 30 transaksi per detik, yang memicu lonjakan biaya gas saat lalu lintas padat.
Kubu kedua memilih Skalabilitas dan Keamanan, seperti Solana.
Mereka sanggup memproses ribuan transaksi per detik dengan biaya murah.
Namun untuk menjadi validator, kalian membutuhkan prosesor server puluhan inti, ratusan gigabyte RAM, dan koneksi internet serat optik data center.
Pengguna biasa tersingkir dari proses verifikasi mandiri.
Kubu ketiga mencoba mengejar Skalabilitas dan Desentralisasi dengan memecah jaringan menjadi banyak rantai kecil tanpa keamanan bersama.
Hasilnya, setiap rantai sangat rentan diserang karena modal untuk menguasai validatornya terlalu kecil.

---

## Slide 5: The Throughput Mystery: Why Visa is Fast and Blockchains are Slow

### Konten Slide
The Throughput Mystery: Why Visa is Fast and Blockchains are Slow

Centralized Database Architecture (Visa):
- Capacity: 24,000+ transactions per second on demand.
- Topology: Private server clusters inside secure corporate data centers writing directly to centralized relational databases.
- Single Execution: Each transaction is computed and committed exactly once by the database cluster.
- No P2P gossip latency, no Byzantine fault tolerance overhead, no permissionless public verification.

Decentralized Blockchain Architecture:
- Capacity: 7 to 30 transactions per second on base layers.
- Topology: Global peer-to-peer network across thousands of untrusted, geographically dispersed consumer nodes.
- Redundant Execution: Every single transaction is independently executed and re-computed by every single full node worldwide.
- A token swap initiated in Tokyo is executed identically by nodes in Berlin, New York, and Jakarta to independently verify state transitions.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Jawaban mendasar mengapa blockchain lambat: eksekusi redundan.
- Visa hanya mengeksekusi komputasi satu kali di server internal tertutup mereka.
- Blockchain memaksa puluhan ribu node di seluruh dunia mengulang komputasi yang persis sama.

**Naskah Tutur (Voiceover Script):**
Pertanyaan yang paling sering diajukan orang awam adalah: mengapa jaringan Visa sanggup memproses 24.000 transaksi per detik, tetapi blockchain terdesentralisasi begitu lambat?
Jawabannya terletak pada perbedaan mendasar antara eksekusi tunggal dan eksekusi redundan.
Di sistem terpusat seperti Visa, transaksi kalian diproses oleh cluster server privat yang langsung memperbarui satu master database.
Tidak ada pemungutan suara konsensus melalui internet terbuka, tidak ada toleransi terhadap peretas Byzantine, dan komputasi hanya dijalankan satu kali saja.
Sebaliknya, pada blockchain terdesentralisasi berlaku prinsip redundant execution.
Ketika seorang pengguna melakukan swap token di Uniswap, komputasi tersebut tidak dijalankan sekali.
Komputasi itu dieksekusi ulang secara identik oleh puluhan ribu validator independen di Tokyo, Berlin, New York, dan Jakarta.
Setiap node memeriksa keabsahan signature, mengeksekusi opcode mesin virtual, dan memperbarui database lokal masing-masing secara serentak.

---

## Slide 6: Physical Limits of Network Throughput

### Konten Slide
Physical Limits of Network Throughput

The Governed Formula of Blockchain Physics:
- Throughput is fundamentally bounded by block size, network propagation delay, and CPU execution time:
- Throughput proportional to S / (Delta + T_exec)
- S: Block size in bytes containing raw transaction payload.
- Delta: Global block propagation latency across peer-to-peer network nodes.
- T_exec: Time required for validator CPU to verify cryptographic signatures and execute smart contract bytecode.

Competing Parameter Dynamics:
- Increasing Block Size (S): Transmitting larger blocks drastically inflates propagation latency (Delta) across intercontinental fiber links.
- High Propagation Delay (Delta): If Delta approaches block production interval, nodes produce competing blocks simultaneously, causing high fork/uncle rates and consensus instability.
- Execution Bound (T_exec): If execution takes too long, validators cannot keep up with the real-time head of the chain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Hubungan matematis antara throughput, ukuran blok, latensi propagasi, dan waktu komputasi.
- Hukum fisika: paket data membutuhkan waktu nyata untuk menyeberangi serat optik antar-benua.
- Jika propagasi terlalu lambat dibanding interval blok, konsensus akan pecah karena blok yatim (orphans).

**Naskah Tutur (Voiceover Script):**
Secara fisika komputasi, kapasitas sebuah blockchain publik dibatasi secara ketat oleh simpul verifikasi terlemah dalam topologi jaringan.
Lihat formula sederhana ini.
Throughput sebanding dengan ukuran blok dibagi dengan waktu propagasi blok ditambah waktu eksekusi komputasi.
Jika kita memperbesar ukuran blok S agar memuat lebih banyak transaksi, ukuran paket data yang harus disiarkan lewat jaringan peer-to-peer melonjak drastis.
Akibatnya, waktu propagasi Delta meningkat tajam karena data membutuhkan waktu fisik untuk menyeberangi serat optik antar-benua.
Jika sebuah blok membutuhkan 30 detik untuk tiba di belahan bumi lain sementara blok baru diproduksi setiap 12 detik, jaringan akan mengalami percabangan terus-menerus.
Banyak blok sah berubah menjadi yatim atau orphan, dan keamanan konsensus menjadi sangat tidak stabil.

---

## Slide 7: Three Hardware Validator Bottlenecks

### Konten Slide
Three Hardware Validator Bottlenecks

1. Network Bandwidth Bottleneck:
- Continuously receiving and broadcasting multi-megabyte blocks saturates residential internet uplinks.
- Packet loss and high latency cause home nodes to desynchronize and fall behind the chain tip.

2. CPU Execution Bottleneck:
- Verifying thousands of ECDSA signatures and evaluating complex EVM smart contract opcodes consumes heavy processor cycles.
- Sequential execution models fail to saturate modern multi-threaded architectures.

3. Disk I/O & State Bloat Bottleneck (The Critical Hurdle):
- Every transaction requires reading and writing account balances and contract storage to local key-value stores (LevelDB or Pebble).
- Random read and write operations on Merkle Patricia Trie structures choke disk IOPS.
- Storage performance is the primary physical constraint governing Layer 1 block gas limits.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga bottleneck perangkat keras: Bandwidth, CPU, dan Disk IOPS.
- Tekankan bahwa hambatan terbesar sebenarnya bukan CPU, melainkan Disk I/O dan State Bloat.
- Disk IOPS adalah alasan utama mengapa batas gas blok Ethereum dibatasi secara ketat.

**Naskah Tutur (Voiceover Script):**
Jika kita membedah lebih dalam ke perangkat keras validator, ada tiga hambatan fisik utama.
Pertama adalah Network Bandwidth.
Koneksi internet rumah biasa tidak sanggup mengunduh dan menyiarkan puluhan megabyte data setiap detik secara nonstop tanpa jeda.
Kedua adalah CPU Execution Speed.
Memverifikasi ribuan tanda tangan digital kriptografis dan mengeksekusi instruksi opcode mesin virtual menguras siklus prosesor secara intensif.
Namun hambatan fisik nomor satu yang paling mematikan sebenarnya adalah Disk I/O dan State Bloat.
Setiap kali ada saldo yang berubah, node harus membaca dan menulis struktur data Merkle Patricia Trie ke media penyimpanan lokal.
Batasan operasi input/output per detik atau IOPS pada hard drive inilah yang menjadi batas keras mengapa blockchain monolitik tidak dapat dipaksa berlari kencang di komputer konsumen biasa.

---

## Slide 8: The Monolithic Centralization Trap

### Konten Slide
The Monolithic Centralization Trap

The Naive Scaling Proposal:
- Arbitrarily increase block size to 500 MB and reduce block interval to 1 second.

The Cascading Centralization Failure:
- State Explosion: High-throughput execution generates gigabytes of new state daily, expanding global storage to dozens of terabytes within years.
- Consumer Node Extinction: Everyday laptops and mini PCs run out of IOPS and disk capacity, crashing permanently.
- Data Center Oligopoly: Only well-funded institutions and enterprise data centers can afford enterprise-grade NVMe arrays and high-core servers.
- Censorship Vulnerability: When the validator set shrinks to a handful of corporate entities, governments and regulators can easily coerce validators into censoring transactions and freezing funds.
- Loss of Self-Sovereignty: The blockchain degenerates into an expensive, inefficient replica of traditional cloud computing.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Godaan memperbesar blok: solusi instan yang memicu bencana sentralisasi jangka panjang.
- Ledakan status (state explosion) menyingkirkan validator rumahan dan memaksa ketergantungan pada penyedia RPC korporat.
- Prinsip dasar blockchain: kemampuan verifikasi mandiri adalah benteng pertahanan terakhir kedaulatan digital.

**Naskah Tutur (Voiceover Script):**
Melihat masalah skalabilitas, reaksi pertama orang awam sering kali adalah: perbesar saja ukuran blok seratus kali lipat dan percepat waktu pembuatan blok menjadi satu detik.
Ini adalah jalur yang pernah dicoba oleh banyak rantai monolitik generasi awal.
Pendekatan naif ini langsung memicu apa yang disebut The Monolithic Centralization Trap.
Jika jaringan memproses puluhan ribu transaksi per detik secara terus-menerus, ukuran basis data status global akan membengkak puluhan gigabyte setiap hari.
Dalam beberapa tahun, kalian membutuhkan penyimpanan puluhan terabyte dengan kecepatan enterprise NVMe yang sangat mahal.
Node rumahan milik masyarakat biasa akan tertinggal dan mati satu per satu.
Pada akhirnya, hanya tersisa segelintir data center institusional yang sanggup menjalankan full node.
Begitu jaringan dikuasai oleh segelintir korporasi, regulator atau penegak hukum tinggal mengirim surat panggilan untuk menyensor transaksi atau membekukan aset pengguna.
Di titik itu, sifat desentralisasi runtuh total, dan blockchain kehilangan alasan eksistensinya.

---

## Slide 9: Anatomy of a Monolithic Chain: Four Burdens on One Shoulder

### Konten Slide
Anatomy of a Monolithic Chain: Four Burdens on One Shoulder

The Monolithic Architecture (2009-2020):
- A single blockchain layer is forced to perform four distinct distributed consensus responsibilities simultaneously on every node.

The Four Core Consensus Functions:
- 1. Execution: Processing state transitions, evaluating smart contract bytecode, and mutating account storage.
- 2. Settlement: Finalizing economic transactions, establishing dispute resolution, and enforcing absolute objective validity.
- 3. Consensus: Determining the canonical chronological ordering of transactions and securing against reorganizations via PoW or PoS.
- 4. Data Availability (DA): Guaranteeing that all raw transaction data is published and permanently accessible for public auditing.

Resource Contention:
- When all four functions compete for the same CPU, RAM, and Disk IOPS on a single node, scaling hits a hard computational ceiling.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dekade pertama industri kripto didominasi oleh rantai monolitik: Bitcoin, Ethereum L1 awal, Solana.
- Empat fungsi fundamental: Execution, Settlement, Consensus, Data Availability.
- Karena keempat fungsi ini memperebutkan resource perangkat keras yang sama, skalabilitas terbentur batas fisik.

**Naskah Tutur (Voiceover Script):**
Selama sepuluh tahun pertama sejarah industri kripto, hampir semua blockchain dibangun dengan arsitektur monolitik.
Dalam sistem monolitik, satu lapisan node tunggal dipaksa menanggung empat fungsi dasar konsensus terdistribusi sekaligus.
Fungsi pertama adalah Execution: memproses logika smart contract dan menghitung perubahan saldo akun.
Fungsi kedua adalah Settlement: menjadi pengadilan tertinggi yang memutuskan transaksi mana yang final dan menyelesaikan sengketa bukti keabsahan.
Fungsi ketiga adalah Consensus: menentukan urutan waktu kronologis transaksi agar tidak terjadi pembelanjaan ganda.
Fungsi keempat adalah Data Availability: memastikan bahwa semua data transaksi mentah dipublikasikan ke publik tanpa ada yang disembunyikan oleh validator.
Karena keempat beban ini memperebutkan bandwidth, siklus prosesor, dan ruang disk yang sama pada setiap perangkat komputer, rantai monolitik tidak akan pernah bisa meloloskan diri dari Blockchain Trilemma.

---

## Slide 10: The Modular Architecture Paradigm Shift

### Konten Slide
The Modular Architecture Paradigm Shift

The Modular Core Philosophy:
- Decouple the four consensus responsibilities and assign each function to specialized, purpose-built layers.
- Avoid forcing a single decentralized node to execute, order, settle, and store all global economic activity.

The Modular Architecture Stack:
- Execution Layer (Layer 2 Rollups): Processes thousands of off-chain transactions per second with ultra-low latency (Arbitrum, Optimism, zkSync, Base).
- Settlement Layer (Ethereum Layer 1): Verifies cryptographic validity or fraud proofs, settles cross-chain bridges, and resolves state disputes.
- Consensus Layer (Ethereum Layer 1 / CometBFT): Enforces canonical transaction ordering and prevents chain reorganizations.
- Data Availability Layer (EIP-4844 Blobs / Celestia / EigenDA): Guarantees that raw transaction inputs are published cheaply without consuming execution state.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pelopor arsitektur modular: Mustafa Al-Bassam, John Adler, dan Vitalik Buterin.
- Logika modular: seperti pembagian divisi kerja spesialis dalam manufaktur modern.
- Komputasi dipindahkan ke Layer 2, sementara Layer 1 fokus pada konsensus, penyelesaian akhir, dan ketersediaan data.

**Naskah Tutur (Voiceover Script):**
Untuk keluar dari jebakan tersebut, para peneliti sistem terdistribusi memicu perubahan paradigma besar yang disebut The Modular Blockchain Paradigm Shift.
Filosofinya sangat elegan: daripada memaksa satu lapisan mengerjakan segalanya, mengapa tidak kita bagi tugas ke lapisan-lapisan spesialis yang dioptimalkan secara independen?
Inilah tumpukan arsitektur modular.
Lapisan pertama di puncak adalah Execution Layer, yang kita kenal sebagai Layer 2 Rollup.
Lapisan ini khusus dirancang untuk mengeksekusi ribuan transaksi per detik di luar rantai utama dengan sangat cepat dan murah.
Lapisan kedua di tengah adalah Settlement dan Consensus Layer, yang dijalankan oleh rantai terdesentralisasi kokoh seperti Ethereum Layer 1.
Lapisan ini tidak perlu mengeksekusi transaksi massal satu per satu; tugasnya murni mengurutkan transaksi dan memverifikasi bukti keabsahan matematis.
Lapisan ketiga adalah Data Availability Layer, seperti EIP-4844 atau Celestia, yang bertugas menjamin ketersediaan data transaksi mentah bagi siapa saja yang ingin mengauditnya secara independen.

---

## Slide 11: Resolving the Trilemma via Modular Specialization

### Konten Slide
Resolving the Trilemma via Modular Specialization

Harmonizing All Three Pillars:
- 1. Decentralization Preserved at Layer 1:
- Hardware requirements for Layer 1 full nodes remain light because L1 only verifies compressed cryptographic proofs rather than executing raw smart contracts.
- Regular users continue running full nodes on consumer hardware to maintain censorship resistance.

- 2. Inherited Security for Layer 2:
- Layer 2 networks do not require their own vulnerable validator sets for finality; their security is mathematically anchored to the billions of dollars of economic stake on Layer 1.

- 3. Scalability Unlocked at the Execution Layer:
- Off-chain execution bundles thousands of transactions into single compressed state proofs submitted to L1, driving transaction fees down by 95 percent or more.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bagaimana arsitektur modular akhirnya menaklukkan Blockchain Trilemma tanpa kompromi.
- L1 tidak lagi tercekik karena hanya memvalidasi bukti kompresi ringkas, bukan mengulang setiap swap token.
- Pengguna menikmati transaksi kilat dan murah di L2 sambil mempertahankan jaminan keamanan mutlak L1.

**Naskah Tutur (Voiceover Script):**
Dengan arsitektur modular ini, untuk pertama kalinya kita berhasil memecahkan teka-teki Blockchain Trilemma tanpa ada sifat yang dikorbankan.
Lihat bagaimana ketiga pilar terpenuhi secara harmonis.
Desentralisasi tetap terjaga secara murni di Layer 1.
Karena Ethereum Layer 1 tidak lagi dipaksa mengeksekusi jutaan transaksi ritel secara berulang, beban prosesor dan media penyimpanan L1 tetap stabil.
Kalian dan saya tetap dapat menyalakan full node di laptop rumah untuk memverifikasi seluruh sejarah konsensus dunia.
Keamanan juga terjamin secara maksimal.
Layer 2 tidak membuat sistem konsensus rapuh yang baru; mereka mewarisi seratus persen keamanan ekonomi puluhan miliar dolar milik Layer 1.
Dan yang terpenting, Skalabilitas tercapai secara masif.
Ribuan transaksi per detik dijalankan di Layer 2, lalu dikompresi secara kriptografis menjadi bukti ringkas yang diselesaikan di Layer 1 dengan biaya yang sangat terjangkau.

---

## Slide 12: Transition to Module 06.2: Layer 2 Fundamentals

### Konten Slide
Transition to Module 06.2: Layer 2 Fundamentals

Emerging Engineering Challenges:
- We have established why execution must be decoupled from Layer 1 consensus.
- However, how can an off-chain execution environment prove computational correctness to Layer 1 in a trustless manner?

Core Questions for Module 06.2:
- What architectural criteria strictly distinguish a true Layer 2 from an independent sidechain?
- Why do sidechains like Polygon PoS possess separate trust assumptions, while true rollups inherit L1 security?
- How does the unilateral exit mechanism guarantee user fund safety even if the L2 sequencer goes offline or acts maliciously?

Next Up:
- Module 06.2: Layer 2 Fundamentals: Taxonomy and Principles of Off-Chain Execution.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkum modul 06.1: pergeseran dari arsitektur monolitik ke modular memecahkan Trilemma.
- Muncul pertanyaan lanjutan: bagaimana L1 memverifikasi transaksi yang terjadi di luar rantai secara trustless?
- Mengantarkan peserta ke modul 06.2: Layer 2 Fundamentals.

**Naskah Tutur (Voiceover Script):**
Kita telah menyaksikan bagaimana peralihan dari arsitektur monolitik ke modular menyelamatkan ekosistem terdesentralisasi dari kebuntuan Blockchain Trilemma.
Namun, pemisahan tugas ini memunculkan pertanyaan rekayasa baru yang sangat krusial.
Jika ribuan transaksi dieksekusi di luar rantai utama pada Layer 2, bagaimana mungkin Layer 1 yang berada di bawahnya dapat memastikan bahwa transaksi tersebut sah dan operator off-chain tidak mencuri dana pengguna?
Apakah semua jaringan yang mengklaim dirinya Layer 2 benar-benar aman?
Mengapa sidechain seperti Polygon PoS memiliki asumsi risiko yang berbeda dengan true rollup seperti Arbitrum atau Optimism?
Dan bagaimana mekanisme matematika menjamin bahwa pengguna selalu dapat menarik dana mereka kembali ke Layer 1 bahkan jika operator Layer 2 mati total atau berniat jahat?
Untuk membongkar taksonomi dan cara kerja sistem penskalaan off-chain ini, di modul berikutnya kita akan membedah topik: Layer 2 Fundamentals.
Sampai jumpa di sesi berikutnya.
