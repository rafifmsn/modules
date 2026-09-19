# Proof of Stake and Finality Gadgets
Modul Presentasi: Fondasi Distributed Trust (03.3)

---

## Slide 1: The Architecture of Economic Finality

### Konten Slide
The Architecture of Economic Finality
Consensus and Game Theory (03.3)
Securing distributed trust through on-chain capital, deterministic cryptography, and asymmetric punishment.

System Integrity Indicators:
- Economic Security Level: Maximum
- Finality Latency: Near-Zero (Deterministic)
- Capital Efficiency: Optimized
- Trust Model: Deterministic & Cryptoeconomic

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul ketiga dari bab Consensus and Game Theory.
- Menjelaskan pergeseran paradigma dari keamanan berbasis termodinamika listrik (PoW) ke keamanan berbasis modal kriptografis (PoS).
- Menyoroti pilar utama: Deposit modal on-chain, kurva tanda tangan BLS agregat, dan hukuman Slashing asimetris.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga dari bab Consensus and Game Theory: Proof of Stake and Finality Gadgets.
Pada modul sebelumnya, kita telah melihat bagaimana Proof of Work mengunci konsensus menggunakan energi listrik fisik.
Hari ini kita akan membedah lompatan teknologi berikutnya: The Architecture of Economic Finality.
Kita akan melihat bagaimana sistem blockchain modern mengamankan kesepakatan global bukan dengan membakar bahan bakar fosil, melainkan dengan mengunci modal aset digital di atas kontrak pintar.
Kita akan membedah bagaimana protokol Gasper menggabungkan pohon LMD-GHOST dengan finality gadget Casper FFG, bagaimana matematika kurva BLS memadatkan ribuan tanda tangan menjadi satu paket 96 byte, serta bagaimana teori permainan penalti kuadratik menghancurkan modal penyerang secara otomatis tanpa memerlukan pengadilan manusia.

---

## Slide 2: The Paradigm Shift: Three Imperatives for Proof of Stake

### Konten Slide
The Paradigm Shift: Three Imperatives for Proof of Stake

1. Energy Decoupling
- Mechanism: Validation shifts from competitive hash guessing to standard digital signature verification.
- Impact: Enables nodes to run on consumer hardware (e.g., Mac Mini). The Ethereum Merge (2022) instantly reduced global network power consumption by 99.988%.

2. Security Budget Efficiency
- Mechanism: Shifts miner constraints from high operational expenses (OpEx / electricity) to locked initial capital (CapEx).
- Impact: Eliminates the constant fiat sell-pressure required to pay electricity bills, allowing the network to drastically lower annual coin inflation while maintaining equivalent economic security.

3. The Slashing Advantage
- Mechanism: Asymmetric punishment. In PoW, a community cannot physically destroy an attacker's ASIC hardware.
- Impact: In PoS, the protocol has the supreme authority to automatically and unilaterally burn an attacker's locked digital capital from within the system.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga alasan imperatif transisi ke Proof of Stake: Dekopling Energi, Efisiensi Anggaran Keamanan, dan Keunggulan Slashing.
- Dekopling energi: Memangkas konsumsi daya listrik dunia sebesar 99,988 persen pasca The Merge.
- Efisiensi anggaran: Menghapus tekanan jual fiat penambang dan menekan inflasi koin tahunan.
- Keunggulan Slashing: Protokol dapat memusnahkan aset penyerang di atas rantai secara permanen.

**Naskah Tutur (Voiceover Script):**
Transisi dari Proof of Work ke Proof of Stake didorong oleh tiga keharusan arsitektural.
Keharusan pertama adalah Dekopling Energi.
Validasi blok tidak lagi mengandalkan perlombaan tebakan hash yang boros listrik, melainkan beralih ke verifikasi tanda tangan digital standar.
Simpul validator kini dapat dijalankan di atas komputer hemat daya sekelas Mac Mini.
Peristiwa bersejarah Ethereum Merge pada tahun 2022 memangkas konsumsi energi listrik jaringan global sebesar 99,988 persen dalam satu detik.
Keharusan kedua adalah Efisiensi Anggaran Keamanan.
Karena validator tidak lagi menanggung tagihan listrik jutaan dolar per bulan, tekanan jual koin ke pasar fiat lenyap seketika, memungkinkan protokol menurunkan tingkat inflasi penerbitan koin baru secara drastis tanpa menurunkan tingkat keamanan.
Keharusan ketiga adalah Keunggulan Slashing.
Di dalam Proof of Work, komunitas tidak bisa menghancurkan chip ASIC milik penyerang secara fisik.
Namun di dalam Proof of Stake, protokol memiliki kekuasaan mutlak untuk menyita dan memusnahkan seluruh deposit modal penyerang langsung dari dalam kode sistem.

---

## Slide 3: Time and Capital: The Gasper Framework

### Konten Slide
Time and Capital: The Gasper Framework

The Capital Constraint:
A prospective validator deposits exactly 32 ETH to the Layer 1 deposit contract, paired with a BLS12-381 cryptographic public key.

The Churn Limit Queue:
To prevent massive influxes of hostile capital, the protocol strictly bottlenecks entry and exit rates (8 to 16 validators per epoch).
This neutralizes flash-attacks intended to corrupt consensus and immediately withdraw.

Consensus Geometry:
Time is rigid and discrete:
- Slots (12 seconds): Each slot selects one pseudo-random Block Proposer and an Attestation Committee.
- Epochs (32 Slots = 6.4 minutes): The macro-cycle where finality checkpoints are evaluated and balance adjustments occur.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kerangka kerja waktu dan modal pada protokol Gasper Ethereum.
- Syarat modal: Deposit tepat 32 ETH ke kontrak pintar L1 dengan kunci publik kurva BLS12-381.
- Churn Limit Queue: Membatasi laju masuk/keluar validator per epoch demi mencegah serangan modal kilat.
- Geometri waktu: Slot (12 detik, 1 pengusul blok) dan Epoch (32 slot = 6,4 menit, evaluasi checkpoint finalitas).

**Naskah Tutur (Voiceover Script):**
Arsitektur konsensus Ethereum modern diatur oleh kerangka kerja bernama Gasper yang menyatukan waktu dan modal.
Di sisi modal, seorang calon validator wajib menyetorkan tepat 32 ether ke dalam kontrak deposit Layer 1, yang ditautkan ke kunci publik kriptografi kurva eliptik BLS12-381.
Untuk mencegah serangan modal kilat di mana penyerang memasukkan modal raksasa secara mendadak lalu kabur setelah merusak konsensus, protokol menerapkan *Churn Limit Queue*.
Antrean ini membatasi laju masuk dan keluar validator maksimal delapan hingga enam belas validator per epoch.
Di sisi waktu, tempo berjalan secara kaku dan teratur.
Waktu dibagi menjadi *Slot* berdurasi dua belas detik.
Di setiap slot, satu validator dipilih secara acak untuk mengusulkan blok, sementara validator lainnya bertindak sebagai komite atestasi yang memberikan suara.
Tiga puluh dua slot digabungkan menjadi satu siklus makro yang disebut *Epoch* berdurasi 6,4 menit, di mana evaluasi pos pemeriksaan finalitas dan pembagian insentif bunga modal dieksekusi.

---

## Slide 4: Cryptographic Scaling & Deterministic Randomness

### Konten Slide
Cryptographic Scaling & Deterministic Randomness

Unforgeable Entropy (RANDAO):
If block schedules are predictable, attackers can launch targeted DDoS attacks against the next validator's IP.
RANDAO solves this by forcing proposers to sign the current epoch number with their private BLS key.
Because BLS signatures are deterministic, proposers cannot manipulate the randomness.
This unforgeable seed dictates block proposer schedules two epochs in advance.

Infinite Signature Aggregation:
If hundreds of thousands of validators broadcast independent signatures every 12 seconds, global internet bandwidth would collapse.

The 96-Byte Solution:
The BLS12-381 elliptic curve allows thousands of identical committee votes to be mathematically aggregated into a single 96-byte signature.
A receiving node verifies one tiny payload to prove absolute committee consensus.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Keacakan tak terduga via RANDAO: Mencegah serangan DDoS pada pengusul blok berikutnya menggunakan determinisme tanda tangan BLS.
- Masalah ledakan bandwidth: Ratusan ribu validator menandatangani suara setiap 12 detik.
- Solusi 96 byte BLS12-381: Ribuan tanda tangan komite digabungkan secara matematis menjadi satu tanda tangan kompak 96 byte.

**Naskah Tutur (Voiceover Script):**
Mengelola hampir satu juta validator aktif di seluruh dunia melahirkan dua tantangan kriptografi raksasa: keacakan dan skalabilitas bandwidth.
Tantangan pertama adalah keacakan.
Jika jadwal giliran pengusul blok dapat ditebak di masa depan, peretas dapat melancarkan serangan DDoS terkoordinasi ke alamat IP validator tersebut agar bloknya gagal terbit.
Ethereum menyelesaikan ini melalui mekanisme RANDAO.
Setiap pengusul blok wajib menandatangani nomor epoch menggunakan kunci privat BLS mereka.
Karena tanda tangan kurva BLS bersifat kaku dan deterministik murni, penyerang tidak bisa memanipulasi angka acak yang dihasilkan.
Bibit keacakan ini mengunci jadwal validator dua epoch ke depan secara adil.
Tantangan kedua adalah beban transmisi data.
Jika satu juta validator menyiarkan tanda tangan terpisah setiap dua belas detik, jaringan internet dunia akan lumpuh seketika.
Solusinya adalah agregasi kurva BLS12-381.
Ribuan tanda tangan dari anggota komite dapat digabungkan secara aljabar menjadi satu tanda tangan tunggal berukuran tepat sembilan puluh enam byte.
Simpul penerima cukup memvalidasi satu paket mini 96 byte ini untuk membuktikan konsensus mutlak seluruh komite.

---

## Slide 5: The Vulnerability of Naive Consensus: Nothing-at-Stake

### Konten Slide
The Vulnerability of Naive Consensus: Nothing-at-Stake

The Physical Friction of Proof of Work:
When a chain branches, a miner must choose.
Splitting physical hash power 50/50 across branches cuts their probability of winning in half while doubling wasted electricity costs.
Miners are economically forced to back one single branch.

The Zero-Cost Voting Dilemma in PoS:
Digital signatures require only microseconds of CPU calculation with zero marginal energy cost.
In early, naive PoS designs, the most rational economic strategy for validators was to vote on ALL competing branches simultaneously to guarantee a reward whichever chain won.
Without physical costs, forks could never resolve, allowing low-budget attackers to easily rewrite history.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dilema klasik Nothing-at-Stake pada Proof of Stake generasi awal.
- PoW memiliki friksi fisik: Membagi hashrate ke dua cabang menggandakan biaya listrik dan memotong peluang menang separuhnya.
- PoS naif tidak memiliki biaya marjinal: Menandatangani blok hanya butuh mikrodetik di prosesor.
- Strategi rasional validator adalah memberi suara ke semua cabang sekaligus, membuat percabangan tidak pernah sembuh.

**Naskah Tutur (Voiceover Script):**
Meskipun Proof of Stake terlihat sangat efisien, arsitektur ini awalnya dihantui oleh satu kelemahan fatal yang dikenal sebagai masalah *Nothing-at-Stake*.
Di dalam Proof of Work, hukum fisika menciptakan friksi yang nyata.
Jika rantai bercabang dua, seorang penambang harus memilih salah satu cabang.
Jika ia membagi daya tambangnya lima puluh-lima puluh di kedua cabang, peluang menangnya terpotong separuh sementara tagihan listriknya membengkak dua kali lipat.
Penambang dipaksa secara ekonomi untuk setia pada satu cabang terkuat.
Namun di dalam Proof of Stake naif, menandatangani blok hanyalah komputasi CPU satu mikrodetik tanpa biaya listrik marjinal.
Bagi validator rasional pemburu laba, strategi terbaik saat terjadi percabangan adalah menandatangani *kedua cabang sekaligus* demi memastikan mereka tetap mendapatkan hadiah blok rantai mana pun yang menang nanti.
Karena menandatangani cabang tidak memerlukan pengorbanan modal atau energi apa pun, percabangan rantai tidak akan pernah bisa diselesaikan, dan penyerang bermodal kecil dapat dengan mudah memutarbalikkan riwayat transaksi.

---

## Slide 6: Cryptographic Enforcement: Slashing Conditions

### Konten Slide
Cryptographic Enforcement: Slashing Conditions

Self-Reporting Annihilation:
Because digital signatures cannot be forged, a cheating validator leaves an undeniable mathematical trail.
Any network participant can submit two conflicting signatures from the same validator to trigger automated protocol execution.

The Three Fatal Offenses:
1. Double Proposing:
A single proposer broadcasting two different valid blocks for the exact same 12-second slot.

2. Double Voting:
A validator signing two different checkpoint votes targeting the exact same epoch.

3. Surround Voting:
A validator casting a vote that explicitly leaps over or surrounds a previously signed checkpoint vote, attempting to subvert finality rules.

Outcome: The validator is immediately ejected and their staked capital is slashed.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Penegakan hukum kriptografis: Aturan hukuman Slashing.
- Bukti kejahatan mandiri: Tanda tangan digital yang bertentangan menjadi bukti tak terbantahkan di atas rantai.
- Tiga pelanggaran fatal pembawa maut: Double Proposing, Double Voting, dan Surround Voting.
- Hukuman: Modal disita dan validator dikeluarkan paksa dari jaringan selamanya.

**Naskah Tutur (Voiceover Script):**
Untuk menghancurkan celah Nothing-at-Stake, protokol modern menciptakan aturan penegakan hukum kriptografis yang sangat kejam: *Slashing Conditions*.
Kriptografi tanda tangan digital memiliki sifat pembuktian mandiri.
Jika seorang validator mencoba berbuat curang dengan memberi suara muka dua, ia wajib membubuhkan tanda tangan kriptografis miliknya pada kedua pesan yang saling bertolak belakang tersebut.
Siapa pun di jaringan dapat mengambil kedua tanda tangan tersebut dan menyerahkannya ke kontrak pintar konsensus sebagai bukti kejahatan yang tak terbantahkan.
Ada tiga kejahatan fatal yang langsung memicu pemusnahan modal.
Pertama adalah Double Proposing: seorang pengusul blok menerbitkan dua blok berbeda di slot dua belas detik yang sama.
Kedua adalah Double Voting: seorang validator menandatangani dua suara pos pemeriksaan yang berbeda di epoch yang sama.
Ketiga adalah Surround Voting: seorang validator memberikan suara yang melompati atau mengelilingi pos pemeriksaan sebelumnya demi merusak urutan finalitas.
Validator yang melanggar aturan ini akan langsung dikeluarkan paksa dari jaringan dan modal ether mereka disita untuk dimusnahkan.

---

## Slide 7: The Correlation Penalty: Quadratic Game Theory

### Konten Slide
The Correlation Penalty: Quadratic Game Theory

Differentiating Intent:
The protocol must distinguish between an honest hardware mistake (a solo validator misconfiguring a server) and a coordinated cartel attack (thousands of nodes colluding).

The 36-Day Quarantine:
Upon a slashing offense, a minimum 1 ETH penalty is instantly applied, and the validator is forcefully ejected.
The protocol then monitors network-wide slashing rates for 36 days.

Quadratic Annihilation:
The final financial penalty scales proportionally to the square of the total implicated stake.
- Isolated incident: The penalty remains nominal (~1 ETH).
- Massive cartel attack: If thousands of validators commit offenses simultaneously, the formula triggers a 100% burn of their entire 32 ETH collateral.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Penalti Korelasi berbasis Teori Permainan Kuadratik.
- Membedakan kelalaian teknis validator rumahan biasa dengan serangan kartel skala besar.
- Masa karantina 36 hari memantau persentase jaringan yang bersalah bersamaan.
- Hukuman kuadratik: Jika sendirian hanya dipotong ~1 ETH, jika ribuan validator berkolusi maka 100% modal 32 ETH dibakar hangus.

**Naskah Tutur (Voiceover Script):**
Namun, bagaimana jika seorang validator rumahan yang jujur melakukan kesalahan teknis tidak sengaja, misalnya menyalakan komputer cadangan tanpa mematikan komputer utama sehingga terjadi penandatanganan ganda?
Apakah adil jika seluruh modal hidupnya disita?
Ethereum merancang mekanisme game theory yang sangat elegan bernama *The Correlation Penalty* atau penalti korelasi kuadratik.
Ketika pelanggaran slashing terjadi, validator langsung dikeluarkan dan modalnya dikarantina selama tiga puluh enam hari.
Selama masa karantina, protokol memantau berapa banyak validator lain di seluruh dunia yang melakukan pelanggaran serupa pada rentang waktu yang sama.
Besaran denda finansial akhir dihitung secara kuadratik terhadap persentase total modal yang terlibat.
Jika Anda sendirian yang melakukan kesalahan karena salah konfigurasi server, dendanya sangat kecil, sekitar satu ether saja.
Namun, jika ada kartel bursa atau sindikat peretas yang mencoba menyerang jaringan dengan ribuan validator secara serentak, rumus kuadratik ini akan melonjak secara eksponensial hingga membakar seratus persen modal 32 ether mereka hingga ludes tak bersisa.

---

## Slide 8: Deterministic Finality: Casper FFG

### Konten Slide
Deterministic Finality: Casper FFG

The Gasper Synthesis:
Ethereum pairs LMD-GHOST (for rapid, slot-by-slot fork choice) with Casper FFG (a finality gadget operating at epoch boundaries) to lock permanent certainty.

Finality Pipeline:
Genesis Block [Finalized] -> Epoch 1 Checkpoint [Justified] -> Epoch 2 Checkpoint.

Justification (>66.7%):
If a supermajority of over two-thirds of the global staked capital signs a cryptographic link from Checkpoint A to Checkpoint B, Checkpoint B becomes Justified.

Finalization:
If Checkpoint B is Justified, and the subsequent Checkpoint C is built directly atop it and also achieves the >66.7% supermajority, Checkpoint B is officially upgraded to Finalized.

The >33.3% Immutable Boundary:
Two conflicting histories can never be finalized simultaneously unless at least one-third of the entire global stake signs malicious, contradicting votes-guaranteeing the destruction of billions of dollars in capital.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Sintesis Gasper: Menggabungkan LMD-GHOST (eksekusi cepat slot per slot) dengan Casper FFG (pengunci finalitas epoch).
- Justifikasi tercapai saat kuorum supermayoritas >66,7% modal menandatangani pos pemeriksaan.
- Finalisasi tercapai saat pos pemeriksaan berikutnya dibangun di atasnya dan kembali meraih suara >66,7%.
- Benteng 33,3%: Mustahil ada dua sejarah yang final sekaligus tanpa membakar minimal sepertiga modal global.

**Naskah Tutur (Voiceover Script):**
Puncak dari seluruh konstruksi ini adalah pencapaian finalitas deterministik mutlak melalui Casper Friendly Finality Gadget atau Casper FFG.
Gasper memadukan LMD-GHOST untuk memilih blok tercepat di setiap slot dua belas detik, dengan Casper FFG yang bertindak sebagai hakim pengunci sejarah di setiap batas epoch 6,4 menit.
Proses penguncian berjalan dalam dua tahap bertingkat.
Tahap pertama adalah Justification: jika lebih dari dua pertiga kuorum modal validator dunia menandatangani tautan dari Pos Pemeriksaan A ke Pos Pemeriksaan B, maka Pos Pemeriksaan B berstatus Justified.
Tahap kedua adalah Finalization: ketika Pos Pemeriksaan C dibangun tepat di atas B dan kembali berhasil mengumpulkan dua pertiga suara supermayoritas, maka Pos Pemeriksaan B resmi dikunci menjadi status *Finalized*.
Begitu sebuah blok berstatus Finalized, sejarah terkunci selamanya.
Secara hukum matematika, mustahil ada dua cabang sejarah yang sama-sama mencapai status final kecuali ada lebih dari sepertiga total modal validator di seluruh dunia yang menandatangani suara palsu secara sadar, sebuah aksi pengkhianatan yang akan langsung memusnahkan puluhan triliun rupiah modal mereka sendiri.

---

## Slide 9: BFT Disaster Recovery: The Inactivity Leak

### Konten Slide
BFT Disaster Recovery: The Inactivity Leak

The Permanent Liveness Failure:
If a global geopolitical disaster or internet undersea cable cut knocks 40% of the world's validators offline, the surviving 60% can never reach the >66.7% supermajority required by Casper FFG.
Standard BFT consensus would freeze forever.

The Autonomous Bleed:
After 4 epochs of failed finality, the protocol triggers the Inactivity Leak.
Online nodes continue earning, but offline nodes see their staked balances quadratically burned away.
This forces the online stake percentage to expand proportionally:
Time 1: Online 60% / Offline 40%
Time 2: Online 70% / Offline 30%
Time 3: Online 80% / Offline 20%
Time 4: Online 90% / Offline 10%
Once online stake crosses the >66.7% threshold, network finality is restored autonomously.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pemulihan bencana BFT: Solusi kebuntuan Liveness permanen saat 40% validator padam.
- Tanpa kuorum 66,7%, protokol BFT standar akan membeku selamanya.
- Mekanisme Inactivity Leak: Saldo validator yang offline dibakar secara kuadratik perlahan-lahan.
- Proporsi modal validator yang online membesar secara otomatis hingga menembus ambang 2/3 dan memulihkan finalitas jaringan.

**Naskah Tutur (Voiceover Script):**
Namun, bagaimana jika terjadi bencana geopolitik global atau perang yang memutuskan kabel internet bawah laut sehingga empat puluh persen validator dunia mendadak padam serentak?
Enam puluh persen validator jujur yang tersisa tidak akan pernah sanggup mencapai kuorum dua pertiga yang disyaratkan oleh Casper.
Dalam algoritma BFT klasik, jaringan akan mengalami *liveness failure* dan membeku selamanya.
Ethereum merancang mekanisme penyelamatan darurat otonom bernama *The Inactivity Leak*.
Jika pos pemeriksaan gagal mencapai finalitas selama empat epoch berturut-turut, protokol mengaktifkan mode kebocoran modal.
Validator yang tetap online terus memvalidasi transaksi, sementara saldo modal validator yang offline secara bertahap dipotong dan dibakar secara kuadratik setiap menitnya.
Seiring menyusutnya saldo pihak yang mati, proporsi modal validator yang online secara otomatis membesar: dari enam puluh persen naik ke tujuh puluh persen, delapan puluh persen, hingga akhirnya menembus ambang batas supermayoritas 66,7 persen.
Finalitas deterministik pun pulih kembali secara mandiri tanpa memerlukan campur tangan pengembang perangkat lunak.

---

## Slide 10: Bridge to the Next Module: Alternative and Hybrid Consensus Models

### Konten Slide
The Finality Trade-Off & The Next Frontier

The Speed Constraint:
While Gasper offers unmatched economic security, full finality requires ~12.8 minutes (2 epochs).
Modern high-frequency applications (finance, gaming, high-throughput DEXs) demand sub-second latency and extreme parallel throughput.

The Next Frontier:
How do high-performance protocols bypass the 12-minute finality wait?
- Solana's cryptographic time-stamping: Proof of History (PoH).
- Directed Acyclic Graphs (DAGs): Narwhal, Bullshark, and Mysticeti (Sui).
- Classical BFT adaptations: Tendermint and HotStuff (Aptos/Sui).

Next Module:
Module 03.4: Alternative and Hybrid Consensus Models.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengantarkan peserta ke Modul 03.4: Alternative and Hybrid Consensus Models.
- Batasan Gasper: Keamanan ekonomi sangat tinggi namun butuh waktu finalitas ~12,8 menit.
- Kebutuhan industri modern: Latensi sub-detik untuk transaksi frekuensi tinggi.
- Teaser materi modul 03.4: Proof of History Solana, arsitektur DAG Sui Mysticeti, dan konsensus HotStuff.

**Naskah Tutur (Voiceover Script):**
Proof of Stake dengan finality gadget telah menghadirkan keamanan ekonomi deterministik terkuat di dunia.
Namun, sistem ini memiliki satu kompromi arsitektural: kecepatan.
Di dalam Ethereum, pencapaian finalitas mutlak membutuhkan waktu tunggu sekitar dua belas koma delapan menit atau dua epoch penuh.
Bagi aplikasi perdagangan frekuensi tinggi, pembayaran ritel, dan platform game modern, waktu tunggu belasan menit adalah hal yang terlalu lambat.
Industri komputasi terdistribusi menuntut finalitas di bawah satu detik dengan kapasitas pemrosesan puluhan ribu transaksi per detik.
Bagaimana protokol-protokol mutakhir mendobrak batas kecepatan ini tanpa mengorbankan keamanan konsensus?
Bagaimana Solana menciptakan jam kriptografis Proof of History, bagaimana Aptos mengadopsi algoritma HotStuff, dan bagaimana Sui memanfaatkan grafik asiklik terarah atau DAG Mysticeti untuk memisahkan penyebaran data dari pengurutan transaksi?
Semua ini akan kita bedah di modul penutup bab ini dalam Alternative and Hybrid Consensus Models.
Sampai jumpa di modul selanjutnya.
