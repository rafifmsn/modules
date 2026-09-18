# Decentralized Autonomous Organizations
Modul Presentasi: Decentralized Systems (05.5)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Decentralized Autonomous Organizations (DAOs)
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Arsitektur kelembagaan on-chain, siklus hidup proposal tata kelola, smart contract GovernorBravo, mekanisme timelock, Quadratic Voting, pertahanan ragequit, dan mitigasi serangan governance exploit.
- *Visual:* Bagan interaksi demokrasi on-chain: pemungutan suara terdistribusi oleh para pemegang token yang diterjemahkan langsung menjadi eksekusi pembaruan bytecode dan alokasi kas treasury.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul penutup Chapter 05: DAOs.
- Membahas evolusi organisasi manusia dari badan hukum kertas menuju kode otonom.
- Mengupas tuntas alur proposal on-chain, model voting, dan celah eksploitasi nyata.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kelima dan penutup dari Chapter 05: Decentralized Autonomous Organizations atau DAO.
Pada modul sebelumnya, kita sudah memahami bagaimana tokenomics menyelaraskan kepentingan finansial ribuan pelaku ekonomi independen.
Namun token bukan sekadar instrumen ekonomi penangkap nilai.
Di dalam sistem terdesentralisasi, token memegang mandat kedaulatan politik tertinggi.
Siapa yang berhak mengendalikan kas perbendaharaan ratusan juta dolar?
Siapa yang memiliki wewenang untuk memperbarui baris kode smart contract inti protokol?
Hari ini kita akan membedah bagaimana DAO menggantikan struktur hierarki korporasi kuno dengan aturan main on-chain yang transparan dan dapat dieksekusi secara otonom.
Kita akan membedah siklus proposal, arsitektur kontrak Governor, model pemungutan suara matematis, inovasi pertahanan ragequit, hingga studi kasus serangan tata kelola nyata yang pernah mengguncang industri Web3.

---

## Slide 2: Evolusi Tata Kelola: Korporasi Tradisional vs DAO

### Konten Slide
- **Warisan Organisasi Tradisional (Joint-Stock Corporations):**
  - Dikelola oleh piagam hukum kertas, dewan direksi, dan dewan komisaris di balik ruang rapat tertutup.
  - Penegakan hak suara dan kepemilikan bergantung penuh pada yurisdiksi pengadilan nasional, pengacara, dan aparat penegak hukum fisik.
- **Kelemahan Struktural Model Konvensional:**
  - Terikat kaku pada yurisdiksi batas negara tertentu (seperti korporasi Delaware).
  - Biaya birokrasi, legalitas, dan kepatuhan administrasi yang sangat lambat dan mahal.
  - Diskriminasi geografis: sulit bagi talenta atau investor lintas benua untuk memiliki saham dan hak voting yang setara secara instan.
  - Rawan penyalahgunaan kekuasaan sepihak dan manipulasi dana oleh eksekutif korporat.
- **Revolusi DAO (Internet-Native Institutions):**
  - Mengganti piagam kertas dengan smart contract yang tidak dapat dimanipulasi secara sepihak di atas blockchain publik.
  - Pengambilan keputusan kolektif, hak suara, dan alokasi kas perbendaharaan dijalankan secara otomatis tanpa perantara birokrasi.
- *Visual:* Perbandingan bagan korporasi hierarki tertutup dengan perantara hukum vs arsitektur DAO terbuka global berbasis smart contract.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Korporasi konvensional diatur oleh hukum kertas dan hakim pengadilan.
- Sangat lambat, mahal, eksklusif, dan rentan korupsi di balik pintu tertutup.
- DAO membawa organisasi ke era internet: kepemilikan global yang ditegakkan oleh kode.

**Naskah Tutur (Voiceover Script):**
Sepanjang sejarah peradaban modern, kerja sama manusia dalam skala besar selalu diwadahi oleh struktur korporasi berbadan hukum, seperti perseroan terbatas atau trust nirlaba.
Model ini bertumpu pada dokumen hukum kertas, dewan direksi, dan perlindungan pengadilan negeri.
Jika seorang direktur menyelewengkan dana kas perusahaan, para pemegang saham harus menyewa pengacara mahal, mengajukan gugatan ke pengadilan, dan menunggu keputusan hakim selama bertahun-tahun.
Selain sangat lambat dan mahal, sistem korporasi konvensional ini memiliki batasan geografis yang sangat kaku.
Seorang insinyur perangkat lunak berbakat di Asia atau Afrika tidak bisa dengan mudah memiliki saham dan menyalurkan hak suaranya di sebuah korporasi yang terdaftar di Amerika Serikat.
Kelahiran teknologi blockchain membuka pintu bagi bentuk organisasi manusia yang benar-benar baru: Decentralized Autonomous Organization atau DAO.
Di dalam sebuah DAO, aturan anggaran dasar tidak ditulis di atas kertas perjanjian yang ambigu.
Aturan main ditulis dalam bentuk kode smart contract yang transparan, netral, dan kebal terhadap campur tangan sepihak dari siapa pun.

---

## Slide 3: Arsitektur Konseptual DAO

### Konten Slide
- **Prinsip Utama DAO:**
  - *Tanpa CEO atau Dewan Direktur Tunggal:* Kekuasaan terdistribusi di antara para pemegang token tata kelola sesuai aturan main yang telah dikodifikasi.
  - *Perbendaharaan Transparan (On-Chain Treasury):* Seluruh dana cadangan tersimpan di dalam smart contract yang dapat diaudit publik selama 24/7.
  - *Eksekusi Otonom:* Keputusan yang lolos voting otomatis dieksekusi oleh mesin virtual tanpa membutuhkan tanda tangan persetujuan pejabat eksekutif manusia.
- **Komponen Inti Arsitektur DAO:**
  1. *Token Holders:* Komunitas terdesentralisasi yang menyalurkan hak suara melalui tanda tangan kriptografi dompet.
  2. *Governance Contract (Governor Engine):* Mesin pencatat proposal, penghitung hak suara, dan verifikator kuorum.
  3. *Timelock Controller:* Kontrak penyangga waktu jeda sebelum instruksi perubahan state dieksekusi ke sistem.
  4. *Protocol Treasury & Target Contracts:* Brankas dana dan kontrak aplikasi yang menerima instruksi mutasi state secara langsung.
- *Visual:* Diagram sistem DAO yang memperlihatkan alur suara pemegang token menuju Governance Contract, melalui Timelock, dan bermuara pada Treasury on-chain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga prinsip: tidak ada CEO, kas transparan, dan eksekusi kode otomatis.
- Arsitektur terbagi menjadi pemegang token, kontrak tata kelola, timelock, dan treasury.
- Begitu voting sah, dana cair atau kode ter-upgrade tanpa ada campur tangan manusia.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah anatomi konseptual dari sebuah DAO.
Di dalam DAO sejati, tidak ada figur CEO yang memiliki kekuasaan mutlak atas arah organisasi.
Otoritas tertinggi berada di tangan para pemegang token tata kelola yang menyalurkan hak suara mereka secara kriptografis dari seluruh penjuru dunia.
Seluruh aset perbendaharaan protokol tersimpan di dalam smart contract di atas blockchain yang bisa diaudit oleh siapa pun secara real-time.
Tidak ada rekening bank privat yang bisa disalahgunakan oleh individu tertentu.
Ketika sebuah usulan kebijakan atau pengeluaran dana disetujui oleh mayoritas anggota melalui mekanisme pemungutan suara on-chain, smart contract akan mengeksekusi instruksi tersebut secara otonom.
Jika voting memutuskan untuk mencairkan hibah dana sebesar satu juta dolar, kode kontrak itu sendiri yang akan memindahkan saldo tersebut langsung ke alamat penerima.
Tidak ada manajer keuangan yang bisa menolak atau memveto hasil keputusan demokratis tersebut.

---

## Slide 4: Siklus Hidup Proposal: Diskusi Off-Chain & Snapshot Check

### Konten Slide
- **Tantangan Biaya Gas Proposal On-Chain:** Mengirimkan proposal langsung ke smart contract membutuhkan biaya gas yang signifikan dan berpotensi membanjiri jaringan dengan spam proposal mentah.
- **Tahap 1: Request for Comments (RFC) di Forum Komunitas:**
  - Ide gagasan baru pertama kali dipublikasikan di forum diskusi publik (seperti Discourse).
  - Mengumpulkan masukan teknis, mendebat implikasi ekonomi, dan mematangkan rancangan spesifikasi kode sebelum diajukan secara resmi.
- **Tahap 2: Temperature Check via Snapshot (Voting Gasless Off-Chain):**
  - Komunitas menyelenggarakan jajak pendapat awal tanpa biaya gas (*gasless off-chain voting*) menggunakan platform **Snapshot**.
  - Pengguna menandatangani pesan kriptografi dengan dompet mereka untuk membuktikan kepemilikan saldo token pada snapshot blok tertentu.
  - Bertindak sebagai sinyal konsensus awal untuk menguji apakah gagasan memiliki dukungan mayoritas komunitas sebelum dilanjutkan ke tahap on-chain yang mengikat secara hukum kode.
- *Visual:* Diagram transisi proposal: Diskusi bebas di forum Discourse -> Verifikasi tanda tangan Snapshot tanpa gas -> Persiapan pengajuan on-chain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Proposal tidak langsung dilempar ke blockchain untuk menghemat biaya gas dan menyaring spam.
- Diskusi matang dilakukan di forum Discourse terbuka.
- Snapshot dipakai untuk mengukur sentimen awal secara gasless lewat tanda tangan digital.

**Naskah Tutur (Voiceover Script):**
Bagaimana sebuah gagasan dari salah satu anggota komunitas bertransformasi menjadi baris kode yang dieksekusi di blockchain?
DAO terkemuka seperti Uniswap, Aave, dan Compound menerapkan jalur pipa tata kelola bertingkat yang sangat disiplin.
Tahap pertama dimulai di luar rantai atau off-chain melalui forum Discourse publik.
Di sini, pengusul menerbitkan Request for Comments atau RFC untuk mendiskusikan latar belakang, risiko teknis, dan rancangan kode bersama seluruh anggota komunitas.
Setelah perdebatan matang, usulan tersebut masuk ke tahap kedua yang disebut Temperature Check menggunakan platform Snapshot.
Snapshot adalah platform pemungutan suara off-chain yang sepenuhnya bebas biaya gas.
Para pemegang token cukup menandatangani pesan kriptografis menggunakan dompet mereka untuk membuktikan bahwa mereka benar-benar memegang saldo token tersebut.
Jika sinyal sentimen di Snapshot menunjukkan dukungan yang solid, proposal tersebut dinyatakan layak untuk melangkah ke tahap pengajuan resmi di atas blockchain.

---

## Slide 5: Pengajuan Proposal On-Chain & Governor Contracts

### Konten Slide
- **Pondasi Standar Industri: GovernorBravo (Compound & OpenZeppelin):** Standar kontrak cerdas paling teruji untuk mengelola tata kelola on-chain otonom.
- **Pencegahan Spam Melalui Batas Ambang Pengusul (Proposal Threshold):**
  - Hanya alamat akun yang memiliki atau didelegasikan sejumlah token dalam batas minimum tinggi (misal: 2,500,000 UNI) yang memiliki wewenang memanggil fungsi `propose()`.
- **Anatomi Payload Panggilan Fungsi `propose()`:**
  - Pengusul wajib menyertakan empat larik parameter (*arrays*) yang terkoordinasi secara presisi:
    1. `targets`: Daftar alamat smart contract tujuan yang akan dipanggil.
    2. `values`: Jumlah saldo native ETH yang dikirimkan bersama panggilan.
    3. `signatures`: Format teks antarmuka fungsi yang dipanggil (misal: `transfer(address,uint256)`).
    4. `calldatas`: Data parameter heksadesimal yang di-encode sesuai standar ABI.
- **Sifat Mengikat Mutlak:** Begitu proposal lolos pemungutan suara, parameter array inilah yang akan dieksekusi secara literal oleh mesin virtual tanpa interpretasi manusia.
- *Visual:* Struktur payload data fungsi propose yang memetakan array targets, values, signatures, dan calldatas ke dalam fungsi eksekusi kontrak.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- GovernorBravo adalah standar industri kontrak tata kelola on-chain.
- Proposal threshold mencegah spam dengan mensyaratkan jumlah token minimal yang besar.
- Empat array parameter: target kontrak, nilai ETH, signature fungsi, dan data calldata ABI.

**Naskah Tutur (Voiceover Script):**
Begitu proposal lolos verifikasi awal, pengusul melangkah ke tahap ketiga: pengajuan resmi di atas rantai melalui kontrak Governor, seperti standar GovernorBravo milik Compound.
Untuk mencegah banjir usulan sampah yang membebani jaringan, smart contract menetapkan Proposal Threshold yang tinggi.
Hanya anggota yang memegang atau mendapatkan delegasi jutaan token yang diizinkan memanggil fungsi propose.
Hal yang sangat menarik dari arsitektur ini adalah isi dari proposal on-chain itu sendiri.
Proposal on-chain bukanlah sekadar paragraf tulisan esai bahasa manusia.
Proposal on-chain memuat instruksi eksekusi kode biner yang sangat presisi melalui empat susunan array: alamat kontrak target, jumlah ETH yang ditransfer, nama fungsi yang dipanggil, dan parameter calldata yang di-encode secara heksadesimal.
Artinya, apa yang diajukan untuk divoting adalah instruksi mutasi sistem nyata yang akan langsung dijalankan secara mekanis oleh mesin virtual jika usulan tersebut disetujui.

---

## Slide 6: Periode Voting, Kuorum, & Snapshot Block

### Konten Slide
- **Masa Jeda Voting (Voting Delay):** Jeda waktu wajib (misal: 1 hingga 2 hari) antara pengajuan proposal dan dimulainya masa pemungutan suara aktif.
- **Pencegahan Flash Borrowing Melalui Snapshot Block:**
  - Kekuatan suara pemilih dikunci secara permanen pada tinggi blok masa lalu (*historical snapshot block height*).
  - Melumpuhkan taktik penyerang yang mencoba meminjam jutaan token sesaat sebelum voting dimulai di pasar sekunder untuk memanipulasi hasil suara.
- **Pemberian Suara Aktif (Voting Period):**
  - Berlangsung selama 3 hingga 5 hari; pemegang token memilih salah satu opsi: `For`, `Against`, atau `Abstain`.
- **Dua Syarat Kelulusan Matematis Proposal:**
  1. *Mayoritas Mutlak (Majority Approval):* Jumlah suara setuju wajib melampaui suara tolak:
     $$\text{Suara Setuju (For)} > \text{Suara Tolak (Against)}$$
  2. *Ambang Batas Partisipasi (Quorum Threshold):* Total partisipasi suara minimum wajib menyentuh persentase tertentu dari seluruh suplai token beredar (biasanya $4\%$ hingga $10\%$).
  - Mencegah kartel minoritas membajak tata kelola secara diam-diam di tengah ketidakpedulian komunitas.
- *Visual:* Alur waktu tata kelola: Submit -> Voting Delay (Kunci Snapshot Block) -> Voting Period -> Verifikasi Kuorum & Mayoritas.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Snapshot block mengunci hak suara ke saldo masa lalu untuk mematikan pinjaman kilat.
- Dua syarat mutlak kelulusan proposal: menang mayoritas dan mencapai batas kuorum.
- Kuorum melindungi protokol dari manipulasi sepihak kelompok minoritas.

**Naskah Tutur (Voiceover Script):**
Ketika sebuah proposal diajukan, pemungutan suara tidak langsung dimulai detik itu juga.
Ada mekanisme pengaman krusial yang disebut Voting Delay dan Snapshot Block.
Smart contract sengaja memberikan jeda satu hingga dua hari sebelum membuka kotak suara.
Tepat saat masa jeda ini berakhir, kontrak mencatat nomor blok spesifik yang disebut Snapshot Block.
Kekuatan hak suara setiap pemilih dikunci mati berdasarkan berapa saldo token yang mereka miliki pada nomor blok tersebut di masa lalu.
Aturan teknis ini sangat vital untuk mencegah penyerang jahat memborong atau meminjam jutaan token dari bursa hanya untuk memanipulasi hasil pemungutan suara, lalu menjualnya kembali beberapa menit kemudian.
Setelah masa voting aktif selama beberapa hari selesai, proposal harus memenuhi dua syarat matematis mutlak agar bisa disahkan: memenangkan mayoritas suara For di atas suara Against, dan memenuhi kuorum partisipasi minimal, biasanya sekitar empat hingga sepuluh persen dari total pasokan token yang beredar.

---

## Slide 7: Timelock Controller: Buffer Pengaman Terakhir

### Konten Slide
- **Ancaman Regulasi Mayoritas Tirani:** Apa yang terjadi jika sebuah usulan jahat berhasil mengumpulkan suara mayoritas (misal: menguras kas treasury atau menaikkan biaya protokol menjadi 100%)?
- **Arsitektur Timelock Controller:**
  - Kontrak penahan wajib yang menjeda eksekusi setiap proposal yang lolos selama durasi tertentu (misal: **48 Jam**).
  - Proposal yang sah dimasukkan ke dalam antrean (*queue*) dan dibekukan sementara.
- **Fungsi Timelock sebagai Katup Penyelamat Likuiditas Pengguna:**
  - Memberikan jendela waktu transparan bagi para pengguna, pedagang, dan penyedia likuiditas untuk meninjau perubahan kode yang akan datang.
  - Jika pengguna tidak setuju dengan arah keputusan tata kelola, mereka memiliki waktu 48 jam penuh untuk mencairkan tabungan mereka secara damai sebelum kode baru diaktifkan di jaringan.
- **Eksekusi Akhir (`execute`):** Setelah timer pendinginan habis, fungsi eksekusi terbuka secara publik untuk memicu eksekusi mutasi state on-chain secara permanen.
- *Visual:* Sequence diagram: Proposal Disetujui -> Masuk Antrean Timelock 48 Jam -> Jendela Penarikan Modal Pengguna -> Eksekusi Akhir On-Chain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Timelock controller adalah rem pengaman darurat terpenting di DeFi.
- Memberikan jeda 48 jam sebelum kode yang menang voting dieksekusi.
- Memberi hak keluar bagi pengguna untuk menarik dana mereka jika tidak sepakat dengan hasil voting.

**Naskah Tutur (Voiceover Script):**
Bayangkan skenario terburuk: sebuah proposal kontroversial atau berbahaya berhasil memenangkan voting mayoritas, misalnya usulan untuk menaikkan fee menjadi seratus persen atau menguras isi kas perbendaharaan.
Apakah pengguna protokol langsung menjadi korban penindasan mayoritas tersebut?
Di sinilah letak kejeniusan arsitektur Timelock Controller.
Proposal yang menang tidak pernah dieksekusi secara instan.
Proposal tersebut wajib dimasukkan ke dalam antrean timelock yang mengunci eksekusi selama minimal dua hari atau empat puluh delapan jam.
Masa pendinginan ini adalah katup pengaman terakhir bagi para penyedia modal dan pengguna aplikasi.
Jika kalian sebagai penyedia likuiditas tidak setuju dengan keputusan tata kelola tersebut, kalian memiliki waktu empat puluh delapan jam penuh untuk mencairkan seluruh aset kalian dari protokol secara aman.
Kalian tidak bisa dipaksa tunduk pada aturan baru yang merugikan.
Hanya setelah jendela waktu penarikan damai ini kedaluwarsa, fungsi eksekusi baru boleh dipanggil untuk memperbarui sistem secara permanen.

---

## Slide 8: Model Voting: Linear Plutocracy vs Tantangan Whales

### Konten Slide
- **Model Voting Standar: Linear Plutocracy (Satu Token = Satu Suara):**
  - Bobot pengaruh politik berskala linear secara langsung dengan kuantitas modal token yang dimiliki:
    $$V = T$$
  - Pengguna dengan 10 juta token memegang 10 juta hak suara.
- **The Whale Dilemma (Tirani Pemodal Besar):**
  - Satu entitas pemodal ventura atau investor paus (*whale*) raksasa dapat dengan mudah mengalahkan suara gabungan dari puluhan ribu pengguna aktif akar rumput (*grassroots community*).
  - Tata kelola rentan terdegradasi menjadi plutokrasi tertutup, di mana kebijakan protokol hanya melayani kepentingan konglomerat pemegang modal besar.
- **Apatisme Pemilih Ritel (Voter Apathy):**
  - Pemegang token kecil merasa suara mereka tidak memiliki dampak matematis pada hasil voting, memicu penurunan partisipasi aktif ke tingkat yang sangat rendah.
- *Visual:* Timbangan politik yang timpang memperlihatkan satu paus bermodal 10 juta token mengalahkan ribuan pengguna kecil di model linear plutocracy.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Model 1 token = 1 suara menciptakan tirani orang kaya (plutokrasi).
- Investor paus dengan mudah menindas puluhan ribu pengguna komunitas kecil.
- Akibatnya: pengguna biasa malas ikut voting karena merasa suaranya sia-sia.

**Naskah Tutur (Voiceover Script):**
Di balik kecanggihan teknisnya, mekanisme pemungutan suara di Web3 menghadapi dilema politik yang sangat berat.
Mayoritas DAO hari ini beroperasi menggunakan model Linear Plutocracy, di mana satu token setara dengan satu suara.
Artinya, kekuatan politik kalian berbanding lurus dengan tebalnya dompet kalian.
Kondisi ini memicu apa yang disebut sebagai The Whale Dilemma.
Satu perusahaan modal ventura besar yang memegang sepuluh juta token dapat dengan santai mengalahkan suara gabungan dari sepuluh ribu pengguna setia yang masing-masing hanya memegang seratus token.
Tata kelola terdesentralisasi terancam bermutasi menjadi oligarki baru, di mana segelintir pemodal besar mendikte aturan main demi kepentingan mereka sendiri.
Dampak buruk lanjutannya adalah apatisme pemilih ritel.
Pengguna komunitas biasa merasa suara mereka tidak ada artinya di atas kertas matematika, sehingga mereka berhenti mengikuti pemungutan suara dan membiarkan protokol terbengkalai.

---

## Slide 9: Quadratic Voting (QV) & Celah Sybil Attack

### Konten Slide
- **Inovasi Quadratic Voting (Glen Weyl):** Merancang bobot suara untuk menyeimbangkan kedalaman preferensi komunitas melawan konsentrasi kekayaan modal semata:
  $$\text{Kekuatan Suara } V = \sqrt{T} \quad \iff \quad \text{Biaya Token } T = V^2$$
  - 1 Suara membutuhkan $1^2 = 1 \text{ token}$.
  - 2 Suara membutuhkan $2^2 = 4 \text{ token}$.
  - 10 Suara membutuhkan $10^2 = 100 \text{ token}$.
  - 100 Suara membutuhkan $100^2 = 10,000 \text{ token}$.
- **Pemberdayaan Konsensus Komunitas:**
  - 1 Paus dengan 10,000 token hanya mendapatkan $\sqrt{10,000} = 100 \text{ suara}$.
  - 100 Anggota komunitas dengan 100 token masing-masing meraih $100 \times \sqrt{100} = 1,000 \text{ suara}$.
  - Komunitas akar rumput berhasil mengungguli paus dengan perbandingan 1,000 melawan 100 suara.
- **Kelemahan Fatal di Blockchain Anonim: Kerentanan Sybil Attack:**
  - Jika sang paus memecah 10,000 token miliknya ke dalam 100 alamat dompet baru (masing-masing 100 token), kekuatan suaranya melonjak seketika dari 100 menjadi 1,000 suara.
  - Quadratic Voting mustahil diterapkan secara aman di blockchain publik tanpa adanya sistem verifikasi identitas unik manusia (*Proof of Humanity / Decentralized Identity*).
- *Visual:* Perbandingan matematis: dampak rumus akar kuadrat pada suara paus vs komunitas, dan diagram serangan Sybil pemecahan dompet.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Quadratic voting menggunakan rumus akar kuadrat: suara = akar dari token.
- Komunitas kecil bersatu bisa mengalahkan paus besar secara adil.
- Kelemahan fatal di Web3: mudah dibobol Sybil attack jika paus memecah koin ke ratusan dompet palsu.

**Naskah Tutur (Voiceover Script):**
Untuk melawan dominasi kaum plutokrat, para peneliti mengusulkan model inovatif bernama Quadratic Voting yang dipelopori oleh Glen Weyl.
Alih-alih berskala linear, kekuatan hak suara dihitung berdasarkan akar kuadrat dari jumlah token yang disumbangkan.
Untuk memberikan satu suara, kalian butuh satu token; untuk dua suara, kalian butuh empat token; dan untuk seratus suara, kalian butuh sepuluh ribu token.
Dengan formula ini, seratus anggota komunitas kecil yang masing-masing memegang seratus token bisa mengumpulkan total seribu suara, dengan mudah mengalahkan satu investor paus bermodal sepuluh ribu token yang suaranya dipangkas rumus akar kuadrat menjadi hanya seratus suara.
Namun, Quadratic Voting menyimpan satu celah fatal yang sangat mematikan jika diterapkan di blockchain tanpa izin: kerentanan terhadap Sybil Attack.
Karena membuat alamat dompet baru di Ethereum tidak membutuhkan biaya, sang paus cukup memecah tabungannya ke dalam seratus dompet berbeda untuk melipatgandakan hak suaranya kembali sepuluh kali lipat.
Tanpa adanya infrastruktur verifikasi identitas satu manusia satu akun yang tahan uji, Quadratic Voting tidak dapat berjalan secara aman.

---

## Slide 10: Arsitektur MolochDAO & Inovasi Mekanisme Ragequit

### Konten Slide
- **Filosofi MolochDAO (Ameen Soleimani 2019):** Mengambil nama Moloch, monster kegagalan koordinasi manusia, untuk merancang struktur organisasi yang kebal terhadap penindasan fraksi mayoritas.
- **Inovasi Mekanisme Ragequit:**
  - Mengizinkan anggota minoritas yang kalah suara untuk mencairkan modal dan keluar dari organisasi secara terhormat sebelum keputusan tereksekusi.
- **Siklus Periode Masa Rahmat (Grace Period):**
  - Setiap kali proposal lolos pemungutan suara, smart contract membuka masa **Grace Period selama 7 hari** sebelum eksekusi dimulai.
- **Proses Eksekusi Pemanggilan `ragequit()`:**
  - Anggota yang menolak proposal memanggil fungsi `ragequit()` di smart contract.
  - Kontrak secara otomatis membakar saham kepemilikan DAO anggota tersebut dan mentransfer fraksi aset cadangan kas perbendaharaan (seperti ETH dan DAI) secara proporsional langsung ke dompet pribadi mereka.
  - Proposal yang menang hanya dieksekusi menggunakan sisa modal anggota yang menyetujui arah kebijakan tersebut.
- *Visual:* Alur keputusan Grace Period MolochDAO: Anggota tidak setuju memanggil ragequit dan membawa pulang porsi ETH kas perbendaharaan secara damai.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- MolochDAO memecahkan masalah tirani mayoritas di organisasi manusia.
- Jika voting merugikan minoritas, minoritas tidak terjebak: ada tombol ragequit.
- Membakar saham DAO dan membawa pulang bagian kas perbendaharaan secara adil.

**Naskah Tutur (Voiceover Script):**
Pada tahun 2019, Ameen Soleimani merancang arsitektur DAO legendaris bernama MolochDAO, terinspirasi dari nama monster kegagalan koordinasi manusia.
MolochDAO memperkenalkan salah satu inovasi paling dihormati dalam sejarah tata kelola desentralisasi: mekanisme Ragequit.
Di korporasi konvensional, jika lima puluh satu persen pemegang saham memutuskan untuk membuang kas perusahaan ke proyek yang tidak masuk akal, empat puluh sembilan persen pemegang saham minoritas terperangkap dan harus pasrah menanggung kerugian modal.
MolochDAO menghapus penindasan ini secara mutlak.
Setiap kali ada proposal kontroversial yang lolos voting, kontrak membuka masa jeda selama tujuh hari yang disebut Grace Period.
Bagi anggota yang tidak setuju dengan keputusan tersebut, mereka cukup memanggil fungsi ragequit.
Smart contract akan seketika membakar saham DAO mereka dan mengembalikan porsi aset kas perbendaharaan yang menjadi hak mereka langsung ke dompet pribadi.
Hanya anggota yang memilih bertahan yang akan mendanai eksekusi proposal tersebut.
Ragequit menjamin bahwa modal siapa pun tidak akan pernah bisa disandera oleh tirani kelompok mayoritas.

---

## Slide 11: Vektor Serangan Tata Kelola 1: Flash Loan Takeover

### Konten Slide
- **Ancaman Likuiditas Instan:** Pasar uang DeFi memungkinkan peminjaman modal miliaran dolar tanpa jaminan fisik selama dikembalikan dalam satu transaksi blok yang sama (*Flash Loans*).
- **Studi Kasus Pembobolan Beanstalk Farms (April 2022):**
  - Protokol stablecoin kredit Beanstalk Farms menderita kerugian **$182 juta** dalam satu transaksi tunggal.
- **Kronologi Serangan Atomik:**
  1. Penyerang meminjam modal setara **$1 miliar** melalui flash loan di Aave dan Uniswap.
  2. Penyerang menukar modal tersebut menjadi token tata kelola Beanstalk (Stalk), seketika menguasai **$67\%$ suara supermayoritas**.
  3. Mengajukan proposal darurat jahat (BIP-18) yang menginstruksikan pengalihan seluruh kas perbendaharaan ke dompet penyerang.
  4. Memanfaatkan fitur eksekusi bypass darurat protokol yang melompati timelock jika voting meraih supermayoritas dua pertiga.
  5. Memberikan suara "YES", mengeksekusi proposal, menguras perbendaharaan, melunasi flash loan $1 miliar, dan membawa kabur **$76 juta keuntungan bersih**.
- **Solusi Mitigasi Wajib:** Menegakkan Snapshot Block historis pra-proposal, melarang voting pada blok yang sama dengan transfer token, dan menolak bypass eksekusi darurat.
- *Visual:* Sequence diagram eksploitasi flash loan Beanstalk: Pinjam $1B -> Borong Hak Suara -> Loloskan BIP-18 -> Kuras Kas -> Lunasi Utang dalam 1 Blok.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tragedi eksploitasi tata kelola terbesar: kerugian 182 juta dolar dalam satu detik.
- Penyerang memanfaatkan pinjaman kilat flash loan 1 miliar dolar untuk menguasai 67% suara.
- Pelajaran vital: jangan pernah izinkan jalan pintas darurat yang memangkas masa timelock.

**Naskah Tutur (Voiceover Script):**
Meskipun arsitektur DAO sangat elegan, tata kelola on-chain menyimpan celah peretasan yang sangat berbahaya jika tidak diaudit dengan teliti.
Tragedi pembobolan terbesar terjadi pada April 2022 terhadap protokol Beanstalk Farms dengan kerugian mencapai seratus delapan puluh dua juta dolar dalam satu detik.
Bagaimana penyerang melakukannya?
Penyerang memanfaatkan instrumen DeFi bernama Flash Loan: meminjam dana sebesar satu miliar dolar tanpa jaminan apa pun dari Aave dan Uniswap dalam satu transaksi blok.
Dengan modal satu miliar dolar tersebut, penyerang memborong token tata kelola Beanstalk hingga menguasai enam puluh tujuh persen hak suara supermayoritas secara instan.
Penyerang kemudian mengajukan proposal jahat untuk mentransfer seluruh kas perbendaharaan ke dompet pribadinya.
Celah mematikannya adalah: Beanstalk memiliki fitur jalan pintas darurat yang menghapus masa timelock jika sebuah proposal meraih suara dua pertiga.
Penyerang langsung memvoting YES dengan token pinjamannya, mengeksekusi proposal detik itu juga, menguras seluruh kas protokol, melunasi pinjaman flash loan satu miliar dolarnya, dan membawa lari laba bersih tujuh puluh enam juta dolar.
Eksploitasi ini menjadi peringatan keras bagi seluruh industri bahwa timelock dan snapshot block historis adalah harga mati yang tidak boleh ditawar.

---

## Slide 12: Vektor Serangan Tata Kelola 2: Pembajakan Kuorum Rendah

### Konten Slide
- **Akar Masalah: Apatisme Komunitas & Kuorum Rendah:**
  - Banyak proyek DAO memiliki komunitas yang pasif di mana partisipasi voting sering kali di bawah $5\%$.
- **Studi Kasus Pembajakan Build Finance DAO (Februari 2022):**
  - Sebuah entitas penyerang membeli sejumlah token di pool AMM pasar terbuka dengan modal moderat.
  - Jumlah token tersebut dihitung secara presisi cukup untuk memenuhi syarat kuorum minimum pengesahan proposal.
- **Modus Operandi Serangan Senyap:**
  1. Penyerang mengajukan proposal yang samar dan terlihat seperti pembaruan teknis biasa di platform voting.
  2. Karena sebagian besar pemegang token asli tidak memantau forum, tidak ada yang memberikan suara penolakan.
  3. Proposal lolos secara sah karena kuorum terpenuhi dan suara penyerang menjadi mayoritas tunggal.
  4. Proposal memberikan kendali pencetakan token (*minting keys*) secara penuh kepada alamat penyerang.
  5. Penyerang mencetak 1.1 juta token baru dari ketiadaan, membuangnya ke seluruh pool DEX, menguras cadangan modal, dan membunuh proyek selamanya.
- **Solusi Mitigasi:** Membangun bot monitoring otomatis, menaikkan batas kuorum dinamis, dan menempatkan dewan pengawas (*Security Council*) dengan hak veto darurat.
- *Visual:* Kronologi serangan Build Finance: Komunitas tidur -> Penyerang kuasai kuorum -> Proposal senyap lolos -> Hak cetak dikuasai -> Likuiditas DEX terkuras habis.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bahaya mematikan dari kemalasan komunitas pemegang token (voter apathy).
- Penyerang Build Finance memanfaatkan kuorum rendah untuk mencuri hak minting token secara legal.
- Perlunya sistem alarm otomatis dan Security Council untuk membatalkan serangan senyap.

**Naskah Tutur (Voiceover Script):**
Vektor serangan tata kelola berbahaya kedua tidak membutuhkan modal miliaran dolar atau flash loan canggih.
Celah ini murni mengeksploitasi kelemahan psikologis manusia: rasa malas dan ketidakpedulian komunitas.
Tragedi ini menimpa Build Finance DAO pada Februari 2022.
Mayoritas anggota komunitas Build Finance tertidur dan jarang membuka forum tata kelola mereka.
Melihat hal ini, seorang penyerang membeli sejumlah token dari bursa DEX yang pas-pasan hanya untuk menyentuh syarat kuorum minimal.
Penyerang kemudian mengajukan proposal rahasia dengan judul yang mengecoh.
Isi proposal tersebut sebenarnya memberikan wewenang pencetakan token penuh kepada alamat pribadi si penyerang.
Karena para pemegang token lainnya tidak ada yang sadar dan tidak memberikan suara penolakan, proposal tersebut lolos secara sah secara hukum kode.
Begitu masa jeda selesai, penyerang mengeksekusi wewenang barunya: dia mencetak lebih dari satu juta token baru dari ketiadaan, membanting seluruh token tersebut ke dalam pool likuiditas bursa, dan menguras seluruh cadangan modal hingga proyek tersebut mati total.
Kasus ini membuktikan bahwa tanpa sistem alarm pemantau dan dewan veto darurat, desentralisasi bisa berbalik menjadi bumerang yang mematikan.

---

## Slide 13: Jembatan ke Chapter Berikutnya: Skalabilitas Layer 2 dan Keamanan Protokol

### Konten Slide
- **Pencapaian Lengkap Lapisan Aplikasi Desentralisasi:**
  - Standarisasi aset digital yang composable (ERC-20, ERC-721, ERC-1155).
  - Pasar pertukaran spot otonom tanpa perantara Wall Street (AMM & $x \cdot y = k$).
  - Pasar kredit over-collateralized yang solvabel setiap detik (Aave & MakerDAO).
  - Teori permainan tokenomics dan penyelarasan komitmen waktu (veToken).
  - Institusi tata kelola demokrasi internet on-chain tanpa CEO (DAOs).
- **Benturan Fisik Terbesar: The Blockchain Scalability Trilemma:**
  - Seluruh inovasi brilian ini bertumpu pada Ethereum Layer 1 yang hanya mampu memproses sekitar 15 hingga 30 transaksi per detik.
  - Saat permintaan adopsi global melonjak, biaya gas meroket ratusan dolar, mengusir pengguna ritel dan mematikan kelayakan transaksi mikro.
- **Menuju Chapter 06: Scalability and Security:**
  - Bagaimana **Layer 2 Rollups** (Optimistic Rollups dengan fraud proofs & ZK-Rollups dengan validity proofs) memproses ribuan transaksi off-chain namun tetap diselesaikan secara aman di Layer 1?
  - Bagaimana jembatan lintas-rantai (*cross-chain bridges*) memindahkan nilai, dan mengapa jembatan ini menjadi target peretasan nomor satu di dunia Web3?
  - Bagaimana peneliti keamanan mengaudit bytecode smart contract dari serangan reentrancy fatal?
- *Visual:* Peta transisi akbar: Ekosistem aplikasi DeFi Chapter 05 bertransisi menuju mesin skalabilitas L2 Rollups dan benteng audit keamanan Chapter 06.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkuman lengkap pencapaian seluruh modul di Chapter 05.
- Dilema fisik: throughput Layer 1 yang lambat membuat gas fee melonjak tinggi.
- Teaser materi penutup di Chapter 06: Skalabilitas L2 (ZK & Optimistic Rollups), Bridges, dan Audit Keamanan Smart Contract.

**Naskah Tutur (Voiceover Script):**
Kita telah menyelesaikan seluruh perjalanan mendalam di Chapter 05: Decentralized Systems.
Kita telah melihat bagaimana teknologi blockchain menyusun ulang seluruh tatanan ekonomi dan kelembagaan manusia dari fondasi dasar.
Kita belajar bagaimana aset digital distandarisasi lewat token ERC-20 dan NFT.
Kita melihat bagaimana bursa saham konvensional digantikan oleh kolam likuiditas dan kurva konstan x kali y sama dengan k.
Kita membedah bagaimana pasar kredit berjalan tanpa skor kredit lewat over-collateralization dan Health Factor.
Kita memahami bagaimana tokenomics dan veToken menyatukan insentif ribuan orang, serta bagaimana DAO menggantikan dewan direksi korporasi dengan demokrasi berbasis kode.
Namun, seluruh inovasi brilian di lapisan aplikasi ini sekarang menabrak satu tembok tebal hukum fisika komputer: Blockchain Scalability Trilemma.
Ethereum Layer 1 hanya mampu memproses sekitar lima belas hingga tiga puluh transaksi per detik.
Ketika jutaan orang berbondong-bondong menggunakan aplikasi ini, biaya gas melambung tinggi hingga puluhan atau ratusan dolar per klik, mematikan akses bagi pengguna biasa.
Bagaimana industri ini melipatgandakan kecepatan komputasi tanpa mengorbankan desentralisasi dan keamanan?
Bagaimana Layer 2 Rollups, bukti kriptografi Zero-Knowledge, dan Optimistic Rollups membawa transaksi off-chain namun tetap diselesaikan dengan aman di Layer 1?
Di babak pamungkas berikutnya, kita akan melangkah ke garis depan rekayasa sistem terdistribusi: Chapter 06: Scalability and Security.
Terima kasih, dan sampai jumpa di babak penutup.
