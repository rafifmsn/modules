# Proof of Stake and Finality Gadgets
Modul Presentasi: Consensus and Game Theory (03.3)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Proof of Stake and Finality Gadgets
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Mengamankan konsensus menggunakan agunan modal digital on-chain, pencegahan kecurangan lewat pemotongan saldo (slashing), dan finalitas deterministik.
- *Visual:* Visualisasi grafis kontrak pintar brankas deposit validator yang memancarkan hak suara konsensus dengan mekanisme penguncian dan pemotongan otomatis.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul ketiga bab Consensus and Game Theory.
- Memahami evolusi besar dari pembakaran listrik ke pengikatan modal ekonomi digital.
- Bagaimana insentif ekonomi dan ancaman penalti on-chain menjamin integritas jaringan.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga dari trek Fundamentals.
Di modul sebelumnya, kita telah melihat bagaimana Proof of Work mengandalkan kekuatan fisik listrik dan mesin ASIC untuk mencegah serangan Sybil.
Meskipun sangat aman, model tersebut menuntut konsumsi energi bumi yang luar biasa besar dan memaksa penambang terus menjual koin untuk membayar biaya operasional listrik.
Hari ini kita akan mempelajari paradigma baru yang merevolusi cara kita memandang keamanan terdistribusi: Proof of Stake.
Alih-alih membakar kilowatt-jam listrik, Proof of Stake mengunci modal ekonomi langsung di dalam blockchain.
Kita akan membedah bagaimana protokol ini menyelesaikan dilema Nothing-at-Stake, bagaimana mekanisme slashing menghancurkan modal penyerang secara otomatis, dan bagaimana Casper FFG mengunci finalitas transaksi secara matematis.

---

## Slide 2: Rasional Desain: Tiga Alasan Beralih dari Proof of Work

### Konten Slide
- **1. Efisiensi Lingkungan Hidup (Energy Decoupling):**
  - Validasi blok hanya berupa verifikasi tanda tangan digital dan eksekusi state machine, bukan tebakan hash kompetitif.
  - Dapat dijalankan di komputer mini hemat energi kelas konsumen (seperti Intel NUC atau Mac Mini).
  - Peristiwa The Merge di Ethereum (2022) memangkas konsumsi listrik jaringan hingga 99,988 persen dalam semalam.
- **2. Efisiensi Anggaran Keamanan (Security Budget):**
  - Penambang PoW memiliki beban biaya operasional listrik (OpEx) yang tinggi sehingga wajib menjual koin imbalan ke pasar fiat.
  - Validator PoS hanya mengunci modal awal (CapEx) dengan biaya operasional mendekati nol.
  - Jaringan dapat mempertahankan tingkat keamanan ekonomi setara dengan tingkat inflasi pencetakan koin tahunan yang jauh lebih rendah.
- **3. Daya Hukuman Asimetris (The Slashing Advantage):**
  - Protokol memiliki wewenang untuk membakar modal penyerang secara sepihak langsung di dalam sistem jika terjadi pelanggaran aturan konsensus.
- *Visual:* Grafik perbandingan drastis: konsumsi energi PoW vs PoS berdampingan dengan perbandingan kurva inflasi koin tahunan.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga motivasi utama Proof of Stake: efisiensi energi, efisiensi anggaran moneter, dan daya hukuman langsung.
- The Merge membuktikan konsumsi listrik turun lebih dari 99.9 persen tanpa mengorbankan keamanan.
- Validator tidak butuh bayar tagihan listrik bulanan jutaan dolar sehingga inflasi koin baru bisa ditekan seminimal mungkin.

**Naskah Tutur (Voiceover Script):**
Peralihan dari Proof of Work ke Proof of Stake didorong oleh tiga alasan arsitektural yang sangat mendasar.
Alasan pertama adalah efisiensi energi.
Di dalam Proof of Stake, memvalidasi transaksi hanyalah tugas komputasi standar: memeriksa tanda tangan digital dan memperbarui saldo database.
Tugas ini begitu ringan sehingga bisa dijalankan di komputer mini kelas konsumen biasa.
Ketika Ethereum melakukan transisi The Merge pada September 2022, konsumsi listrik global jaringan langsung merosot sebesar 99,98 persen dalam waktu satu malam.
Alasan kedua adalah efisiensi anggaran keamanan moneter.
Penambang Proof of Work memiliki tagihan listrik bulanan yang masif, sehingga mereka terpaksa menjual koin hasil tambangannya ke pasar terbuka dan menciptakan tekanan jual konstan.
Di Proof of Stake, modal validator terkunci sebagai agunan dan biaya listriknya hampir nol.
Artinya, protokol tidak perlu mencetak banyak koin baru setiap tahun untuk mempertahankan nilai keamanan ekonominya.
Alasan ketiga, dan ini yang paling penting, adalah kemampuan protokol untuk menghukum penyerang secara asimetris lewat mekanisme slashing.

---

## Slide 3: Keunggulan Hukuman Asimetris: Keajaiban Slashing

### Konten Slide
- **Dilema Penyerang pada Proof of Work:**
  - Jika Mallory menguasai 51 persen mesin ASIC dan menyerang jaringan PoW, komunitas jujur dapat melakukan *hard fork* ke algoritma baru.
  - Komunitas tidak memiliki kuasa fisik untuk menyita atau menghancurkan mesin penambang ASIC di gudang Mallory.
  - Mallory tetap memiliki perangkat keras fisik miliknya secara utuh dan dapat menjualnya kembali di pasar sekunder untuk memulihkan modalnya.
- **Kekuatan Hukuman pada Proof of Stake:**
  - Modal agunan penyerang (koin staked) bersemayam langsung di dalam kontrak pintar sistem.
  - Jika Mallory mencoba memalsukan riwayat transaksi atau menandatangani dua blok yang saling bertentangan, algoritma konsensus mendeteksi pengkhianatan tersebut secara kriptografis.
  - Protokol secara otomatis membakar seluruh koin jaminan milik Mallory tanpa memerlukan polisi, pengacara, ataupun putusan pengadilan.
- *Visual:* Ilustrasi perbandingan: penyerang PoW memegang mesin fisiknya vs penyerang PoS yang koin digitalnya hangus terbakar di brankas smart contract.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bandingkan nasib penyerang di PoW versus PoS.
- Di PoW, komunitas tidak bisa menghancurkan chip ASIC milik penyerang secara fisik.
- Di PoS, senjata penyerang adalah koin di dalam sistem yang bisa langsung dimusnahkan oleh aturan kode.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah apa yang terjadi jika ada pihak jahat yang mencoba menyerang kedua sistem ini.
Bayangkan Mallory membeli mesin penambang dalam jumlah raksasa dan melancarkan serangan reorganisasi 51 persen di jaringan Proof of Work.
Komunitas pengguna memang bisa memisahkan diri lewat hard fork ke algoritma baru.
Namun komunitas tidak bisa masuk ke gudang pabrik Mallory untuk menghancurkan ribuan mesin ASIC miliknya secara fisik.
Mallory masih memiliki seluruh aset fisiknya secara utuh, dan ia bisa menjual mesin-mesin itu kembali di pasar untuk mengambil uangnya kembali.
Keadaannya berbanding terbalik di Proof of Stake.
Di sini, modal yang digunakan Mallory untuk menyerang bukanlah mesin fisik di gudang, melainkan koin yang terkunci langsung di dalam kontrak pintar buku besar itu sendiri.
Jika Mallory mencoba berbuat curang atau menandatangani dua cabang riwayat bertentangan, kode protokol akan mendeteksi bukti kriptografis tersebut secara instan.
Sistem akan langsung membakar modal jaminan milik Mallory hingga musnah tanpa membutuhkan polisi, tentara, ataupun hakim pengadilan.
Senjata penyerang dihancurkan langsung oleh sistem yang ia coba serang.

---

## Slide 4: Siklus Hidup Validator dan Arsitektur Waktu Konsensus

### Konten Slide
- **Pendaftaran dan Deposit:**
  - Calon validator menyetorkan agunan tepat **32 ETH** ke kontrak deposit Layer 1 beserta kunci publik kriptografi **BLS12-381**.
- **Regulasi Masuk-Keluar (Churn Limit Queue):**
  - Protokol membatasi jumlah validator yang boleh aktif atau mundur per siklus (biasanya 8 hingga 16 validator per putaran waktu).
  - Mencegah penyerang bermodal triliunan rupiah menyuntikkan modal mendadak untuk merusak konsensus dalam beberapa detik lalu kabur seketika.
- **Struktur Waktu Konsensus (Standar Gasper Ethereum):**
  - **Slot (12 Detik):** Unit waktu terkecil.
    Tepat satu validator dipilih secara acak semu menjadi *Block Proposer*, didampingi komite pemeriksa (*Attesters*).
  - **Epoch (32 Slot / 6,4 Menit):** Satu siklus penuh yang berisi 32 slot.
    Perhitungan checkpoint finalitas dan penyesuaian imbalan dilakukan di batas epoch.
- *Visual:* Garis waktu linier satu Epoch terbagi menjadi 32 slot berdurasi masing-masing 12 detik dengan penetapan proposer dan komite.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Syarat menjadi validator Ethereum: setor 32 ETH dan kunci BLS.
- Antrean Churn Limit mencegah manipulasi modal kilat yang keluar-masuk seketika.
- Pahami pembagian waktu: satu Slot berdurasi 12 detik, satu Epoch berisi 32 slot (6.4 menit).

**Naskah Tutur (Voiceover Script):**
Mari kita telusuri bagaimana arsitektur validator modern bekerja dengan mengambil protokol Gasper milik Ethereum sebagai standar industri.
Untuk menjadi validator aktif, seorang peserta harus menyetorkan modal sebesar tiga puluh dua ETH ke smart contract resmi di Layer 1 dan mendaftarkan kunci publik kriptografi BLS miliknya.
Agar stabilitas jaringan tidak goyah oleh arus modal raksasa yang datang tiba-tiba, protokol menerapkan antrean ketat bernama Churn Limit.
Hanya sejumlah kecil validator yang diizinkan masuk atau keluar dalam setiap siklus waktu.
Aturan ini mencegah penyerang berkantong tebal memasukkan modal miliaran dolar secara kilat untuk merusak sistem selama beberapa detik lalu langsung menarik uangnya kembali.
Di lapisan konsensus, waktu dibagi secara presisi ke dalam satuan Slot dan Epoch.
Satu Slot berlangsung selama dua belas detik.
Di setiap slot, tepat satu validator dipilih untuk mengajukan blok baru, sementara ratusan validator lainnya bertindak sebagai komite yang memverifikasi blok tersebut.
Kumpulan tiga puluh dua slot membentuk satu Epoch yang berdurasi enam koma empat menit, di mana evaluasi finalitas dan penyesuaian saldo validator dieksekusi.

---

## Slide 5: Sumber Keacakan Tanpa Koordinator: Mekanisme RANDAO

### Konten Slide
- **Ancaman Penjadwalan Deterministik:**
  - Jika jadwal pembuat blok masa depan dapat diprediksi jauh hari, musuh dapat meluncurkan serangan Denial of Service (DDoS) tepat ke alamat IP validator berikutnya untuk mematikan jaringan.
- **Solusi RANDAO (Randomness DAO):**
  - Di setiap slot, proposer blok terpilih wajib menyumbangkan entropi ke akumulator keacakan global.
  - Kontribusi dilakukan dengan mengevaluasi dan membuka tanda tangan BLS terhadap nomor epoch yang sedang berjalan.
- **Karakteristik Kriptografis Unik:**
  - Tanda tangan BLS bersifat deterministik dan tidak dapat dimanipulasi (*unforgeable & deterministic*).
  - Proposer tidak bisa merekayasa hasil angka acak demi menguntungkan dirinya sendiri.
- **Jadwal Dua Epoch di Muka:** Nilai acak RANDAO digunakan untuk mengacak susunan komite dan jadwal proposer blok hingga dua epoch ke depan.
- *Visual:* Alur pengumpulan entropi RANDAO: tanda tangan BLS dari proposer slot masuk ke fungsi pengacak untuk menghasilkan susunan komite epoch berikutnya.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah keacakan: jadwal yang mudah ditebak membuat validator rentan diserang DDoS.
- RANDAO menghasilkan entropi on-chain menggunakan tanda tangan BLS yang deterministik.
- Penyerang tidak bisa mengatur angka acak demi keuntungan pribadi.

**Naskah Tutur (Voiceover Script):**
Bagaimana cara sistem menentukan siapa yang berhak membuat blok di setiap slot tanpa adanya server pengatur di pusat?
Jika urutan giliran validator ditentukan secara statis berminggu-minggu sebelumnya, penyerang bisa dengan mudah melihat jadwal tersebut.
Penyerang tinggal melancarkan serangan DDoS terarah ke alamat IP milik validator yang gilirannya tiba untuk melumpuhkan jaringan.
Untuk mengatasi ancaman ini, Ethereum memanfaatkan mekanisme keacakan on-chain bernama RANDAO.
Di setiap slot waktu, proposer yang bertugas wajib menyumbangkan angka acak ke akumulator sistem dengan cara membubuhkan tanda tangan kriptografi BLS pada nomor epoch saat itu.
Karena sifat matematika tanda tangan BLS yang sangat kaku dan deterministik, si pembuat blok tidak memiliki celah untuk merekayasa atau memilih-milih angka mana yang ingin ia keluarkan demi menguntungkan dirinya sendiri.
Biji keacakan yang dihasilkan ini kemudian dipakai oleh protokol untuk mengundi susunan komite dan menetapkan pembuat blok berikutnya dua epoch ke depan secara adil dan bebas manipulasi.

---

## Slide 6: Agregasi Tanda Tangan BLS: Solusi Skalabilitas Jaringan

### Konten Slide
- **Tantangan Ledakan Lalu Lintas Data:**
  - Jika ratusan ribu validator menyiarkan tanda tangan digital individu setiap 12 detik, kapasitas bandwidth internet global akan langsung tersumbat total.
- **Keunggulan Kriptografi Kurva BLS12-381:**
  - Boneh-Lynn-Shacham (BLS) signatures mendukung fitur matematika luar biasa: **agregasi tanda tangan tak terbatas** (*infinite signature aggregation*).
- **Mekanisme Agregasi Komite:**
  - Ratusan atau ribuan tanda tangan unik yang memvalidasi pesan yang sama (misalnya persetujuan bahwa Blok 5.000 sah) digabungkan menjadi satu tanda tangan tunggal berukuran hanya **96 byte**.
- **Efisiensi Verifikasi:**
  - Node penerima hanya perlu memverifikasi satu tanda tangan ringkas untuk memastikan secara matematis bahwa seluruh anggota komite telah membubuhkan suaranya secara sah.
- *Visual:* Diagram penggabungan ribuan tanda tangan validator individual menjadi satu paket BLS Signature ringkas 96-byte.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah bandwidth: ratusan ribu validator mengirim tanda tangan setiap 12 detik akan membuat jaringan jebol.
- Kriptografi BLS memungkinkan ribuan tanda tangan digabung menjadi satu tanda tangan 96 byte.
- Mengubah beban lalu lintas data raksasa menjadi verifikasi yang sangat ringan.

**Naskah Tutur (Voiceover Script):**
Ethereum saat ini memiliki hampir satu juta validator aktif yang berpartisipasi dalam konsensus.
Bayangkan apa yang terjadi pada lalu lintas internet jika setiap dua belas detik sekali ada ratusan ribu komputer yang menyiarkan tanda tangan digital mereka sendiri-sendiri.
Bandwidth jaringan internet global akan langsung lumpuh seketika karena kebanjiran data.
Solusi brilian untuk masalah ini datang dari cabang kriptografi tingkat lanjut: tanda tangan BLS pada kurva eliptis BLS12-381.
Tanda tangan BLS memiliki sifat matematika unik yang disebut agregasi tanda tangan tanpa batas.
Ketika ratusan validator di dalam sebuah komite menyetujui pernyataan yang sama, tanda tangan mereka yang berhamburan bisa digabungkan secara matematis menjadi satu tanda tangan tunggal berukuran sangat mini, yaitu hanya sembilan puluh enam byte.
Komputer mana pun di dunia cukup memeriksa satu tanda tangan ringkas ini untuk memastikan dengan kepastian mutlak bahwa seluruh anggota komite tersebut telah menyetujui blok tersebut.
Inilah teknologi kunci yang memungkinkan Proof of Stake berskala ke ratusan ribu partisipan tanpa menumbangkan jaringan internet.

---

## Slide 7: Dilema Klasik: Masalah Nothing-at-Stake

### Konten Slide
- **Perilaku Fisik pada Proof of Work:**
  - Jika blockchain mengalami percabangan sementara menjadi Rantai A dan Rantai B, penambang dipaksa memilih satu cabang.
  - Membagi daya hash 50-50 membuat peluang menang di kedua cabang terbelah dua dan membuang biaya listrik bernilai jutaan rupiah.
- **Celah Teori Permainan pada Naive Proof of Stake:**
  - Menandatangani blok hanya membutuhkan kalkulasi mikrodetik CPU tanpa biaya marjinal sama sekali.
  - Karena tidak ada biaya energi fisik, strategi ekonomi paling rasional bagi validator adalah **memberikan suara pada seluruh cabang yang ada secara bersamaan**.
- **Bencana Konsensus Tanpa Hukuman:**
  - Jika Rantai A menang, validator menerima imbalan.
    Jika Rantai B menang, validator tetap menerima imbalan.
  - Percabangan rantai tidak akan pernah bisa diselesaikan, dan penyerang bermodal kecil bisa menulis ulang riwayat transaksi kapan saja.
- *Visual:* Perbandingan grafis: penambang PoW yang terbelah energinya vs validator PoS naif yang mencap stempel di kedua rantai sekaligus demi memaksimalkan laba.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah Nothing-at-Stake adalah batu sandungan terbesar desain awal Proof of Stake.
- Menandatangani blok digital tidak membutuhkan biaya listrik nyata.
- Tanpa hukuman, strategi paling menguntungkan adalah memilih semua rantai cabang secara serentak.

**Naskah Tutur (Voiceover Script):**
Pada masa awal kelahirannya di tahun 2012, Proof of Stake sempat dicap cacat secara teoritis oleh para ilmuwan karena sebuah celah bernama Nothing-at-Stake Problem.
Di dalam Proof of Work, jika rantai terbelah menjadi dua cabang bersaing, penambang dipaksa memilih salah satu.
Jika mereka membagi mesinnya ke dua cabang, mereka membakar listrik dua kali lipat dan memperkecil peluang menangnya sendiri.
Namun di Proof of Stake versi naif, menandatangani blok hanyalah proses kalkulasi digital yang memakan waktu sepersekian mikrodetik tanpa biaya listrik sama sekali.
Karena biayanya nol, strategi ekonomi yang paling menguntungkan bagi seorang validator rasional adalah menandatangani kedua cabang rantai secara serentak.
Jika Rantai A yang menang, mereka dapat hadiah.
Jika Rantai B yang menang, mereka tetap dapat hadiah.
Akibatnya, jaringan tidak akan pernah bisa menyatukan konsensus kembali ketika terjadi percabangan, dan penyerang bermodal kecil bisa dengan mudah memutarbalikkan riwayat transaksi masa lalu.
Inilah alasan mengapa sistem Proof of Stake membutuhkan mekanisme penalti yang keras untuk mengubah aturan permainan ekonomi ini.

---

## Slide 8: Penegakan Hukuman Kriptografis: Kondisi Slashing

### Konten Slide
- **Solusi Kriptografis Definitif:** Menghapus celah Nothing-at-Stake dengan memberikan sanksi pembakaran modal bagi validator yang mencoba bermain dua kaki.
- **Mekanisme Pelaporan Mandiri:**
  - Jika seorang validator menandatangani dua pesan yang bertentangan, siapa pun di jaringan dapat menggabungkan kedua tanda tangan tersebut sebagai bukti kejahatan yang tidak terbantahkan.
- **Tiga Pelanggaran Berat Konsensus (Slashing Offenses):**
  - **1. Double Proposing:** Mengajukan dua blok berbeda yang valid untuk satu nomor slot waktu yang sama persis.
  - **2. Double Voting:** Menandatangani dua suara checkpoint berbeda untuk target epoch yang sama.
  - **3. Surround Voting:** Menandatangani suara checkpoint yang melompati atau mengelilingi suara checkpoint yang pernah ditandatangani sebelumnya.
- *Visual:* Diagram deteksi bukti kejahatan: dua tanda tangan bertentangan dimasukkan ke smart contract penalti menghasilkan status terbukti bersalah (*slashed*).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Slashing adalah jawaban mutlak untuk Nothing-at-Stake: berbuat curang berarti modal Anda dibakar.
- Siapa saja bisa mengunggah bukti tanda tangan ganda ke jaringan untuk memicu penalti otomatis.
- Tiga dosa besar validator: Double Proposing, Double Voting, dan Surround Voting.

**Naskah Tutur (Voiceover Script):**
Para arsitek Proof of Stake modern memecahkan kebuntuan Nothing-at-Stake dengan merancang aturan Slashing.
Prinsipnya sederhana: jika kalian mencoba bermain curang di dua rantai sekaligus, modal taruhan kalian akan dibakar habis oleh protokol.
Karena tanda tangan digital tidak bisa dipalsukan, validator yang berbuat curang meninggalkan jejak matematika yang nyata.
Siapa pun di seluruh dunia yang melihat dua tanda tangan bertentangan dari satu validator yang sama bisa mengemasnya menjadi bukti kejahatan dan mengirimkannya ke jaringan.
Ada tiga pelanggaran mutlak yang akan langsung memicu eksekusi slashing.
Pertama adalah Double Proposing, yaitu mengajukan dua blok berbeda di slot waktu yang sama demi memecah jaringan.
Kedua adalah Double Voting, yaitu memberikan suara pada dua blok target berbeda di dalam satu epoch.
Ketiga adalah Surround Voting, yaitu memberikan suara yang melompati suara masa lalu demi mengelabui aturan finalitas.
Begitu salah satu dari tiga pelanggaran ini terdeteksi, hukuman protokol akan langsung berjalan secara otomatis tanpa ampun.

---

## Slide 9: Skala Hukuman Kuadratik: Correlation Penalty

### Konten Slide
- **Dua Profil Pelanggar Protokol:**
  - *Kasus A:* Validator rumahan mandiri yang salah mengonfigurasi perangkat kerasnya sehingga tidak sengaja menandatangani dua kali (*honest mistake*).
  - *Kasus B:* Kartel penyerang terkoordinasi atau penyedia staking raksasa yang mencoba meretas jaringan secara masif (*coordinated attack*).
- **Mekanisme Penalti Bertingkat:**
  - **Hukuman Awal:** Pemotongan instan minimal 1 ETH dan validator langsung dikeluarkan paksa dari antrean konsensus.
  - **Masa Karantina 36 Hari:** Protokol memantau berapa banyak validator lain yang terkena slashing dalam rentang waktu yang sama.
- **Formula Penalti Kuadratik (Correlation Penalty):**
  - Besaran denda berbanding lurus dengan kuadrat rasio validator yang bersalah:
    $$\text{Denda Tambahan} \propto 32 \times \left( \frac{\text{Total Stake Terkena Slashing}}{\text{Total Stake Global}} \right)$$
  - Jika Anda bersalah sendirian, dendanya sangat kecil.
  - Jika ribuan validator bersalah bersamaan, **100 persen saldo 32 ETH akan dibakar habis**.
- *Visual:* Grafik kurva penalti kuadratik: kurva landai saat pelanggaran terisolasi melesat tajam ke 100 persen hangus saat terjadi kolusi massal.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Protokol harus bisa membedakan antara kecerobohan teknis individu vs serangan terkoordinasi berskala besar.
- Denda awal 1 ETH disusul pemantauan selama 36 hari.
- Formula penalti kuadratik membakar hingga 100 persen agunan jika terjadi kolusi massal.

**Naskah Tutur (Voiceover Script):**
Salah satu inovasi paling elegan dalam desain Proof of Stake adalah Correlation Penalty.
Protokol harus cukup cerdas untuk membedakan dua skenario yang sangat berbeda.
Skenario pertama adalah seorang pengguna rumahan yang tidak sengaja salah menyalin kunci validator sehingga komputernya mengirim tanda tangan ganda karena kelalaian teknis.
Skenario kedua adalah peretas canggih atau kartel raksasa yang mengoordinasikan ribuan node sekaligus untuk menggulingkan konsensus sistem.
Untuk merespons hal ini, protokol menerapkan hukuman bertingkat.
Saat pelanggaran terjadi, denda awal sebesar satu ETH langsung dipotong dan validator dikeluarkan paksa dari sistem.
Selama tiga puluh enam hari berikutnya, protokol akan menghitung berapa banyak validator lain yang terkena slashing di jendela waktu yang sama.
Jika insiden tersebut terjadi pada kalian sendirian, dendanya berhenti di angka kecil karena dianggap murni kecelakaan perangkat keras.
Namun jika ribuan validator melakukan pelanggaran di waktu yang sama, sistem menganggapnya sebagai serangan kolusi berskala nasional.
Rumus penalti kuadratik akan bekerja dan membakar seratus persen saldo tiga puluh dua ETH milik seluruh validator tersebut hingga ludes tak bersisa.

---

## Slide 10: Casper FFG: Mekanisme Justifikasi dan Finalisasi Epik

### Konten Slide
- **Gasper: Perkawinan Dua Mesin Konsensus:**
  - Menggabungkan *LMD-GHOST* (aturan pemilihan cabang cepat per slot) dengan **Casper FFG (Casper the Friendly Finality Gadget)** untuk mengunci kepastian permanen.
- **Mekanisme Justifikasi dan Finalisasi Checkpoint:**
  - **Checkpoint:** Blok pertama di setiap epoch (setiap 32 slot).
  - **Justification:** Jika lebih dari dua pertiga supermayoritas ($> 66,7\%$) dari total modal stake menandatangani tautan dari Checkpoint A ke Checkpoint B, maka Checkpoint B dinyatakan *justified*.
  - **Finalization:** Jika Checkpoint B sudah *justified*, dan Checkpoint C berikutnya juga berhasil mencapai kuorum dua pertiga yang dibangun langsung di atas B, maka Checkpoint B dinyatakan **resmi finalized**.
- **Batas Keamanan Sepertiga Modal:** Dua checkpoint yang saling bertentangan tidak akan pernah bisa difinalisasi bersamaan kecuali minimal sepertiga ($> 33,3\%$) total modal stake global menandatangani kebohongan.
- *Visual:* Rantai checkpoint epoch: status peralihan dari Genesis (Finalized) -> Epoch 1 (Justified) -> Epoch 2 (Finalized) dengan persetujuan supermayoritas.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Casper FFG bertindak sebagai gadget finalitas yang mengunci checkpoint di perbatasan epoch.
- Justifikasi butuh 2/3 suara supermayoritas; dua checkpoint berturut-turut menghasilkan status Finalized.
- Menulis ulang blok yang sudah final mewajibkan penyerang membakar minimal sepertiga dari total modal staking di seluruh dunia.

**Naskah Tutur (Voiceover Script):**
Di jaringan Nakamoto seperti Bitcoin, transaksi hanya mencapai tingkat kepastian probabilistik di mana blok tidak pernah mencapai status final mutlak seratus persen.
Sebaliknya, Ethereum menggunakan Casper FFG rancangan Vitalik Buterin untuk memberikan garansi finalitas deterministik.
Casper bekerja di perbatasan epoch dengan memeriksa blok pertama yang disebut checkpoint.
Prosesnya melalui dua tahap: Justifikasi dan Finalisasi.
Pertama, seluruh validator memberikan suara untuk menautkan checkpoint sumber yang sudah valid ke checkpoint tujuan baru.
Jika lebih dari dua pertiga supermayoritas kekuatan stake global menandatangani tautan tersebut, checkpoint baru tersebut berstatus justified.
Kedua, jika checkpoint berikutnya yang berada tepat di atasnya juga berhasil meraih dukungan dua pertiga suara, maka checkpoint sebelumnya secara resmi dikunci sebagai finalized.
Sekali sebuah blok berstatus finalized, sejarah transaksi tersebut terkunci permanen dan mustahil dibatalkan.
Secara matematis, dua riwayat bertentangan mustahil bisa difinalisasi bersamaan kecuali ada minimal sepertiga dari total validator global yang menandatangani ekuivokasi.
Artinya, untuk memutarbalikkan satu saja transaksi yang sudah final, penyerang harus siap kehilangan puluhan juta ETH bernilai ratusan triliun rupiah yang akan hangus terbakar seketika.

---

## Slide 11: Pemulihan Bencana Partisi Global: The Inactivity Leak

### Konten Slide
- **Skenario Bencana Ekstrem:**
  - Apa yang terjadi jika kabel internet bawah laut global terputus atau terjadi pemblokiran akses internet tingkat negara yang memutus 40 persen validator secara mendadak?
- **Kebuntuan Algoritma Klasik:**
  - Validator jujur yang tersisa hanya menguasai 60 persen hak suara, sehingga tidak akan pernah sanggup mencapai ambang batas supermayoritas dua pertiga ($66,7\%$).
  - Tanpa solusi khusus, konsensus akan macet selamanya (*permanent liveness failure*).
- **Mekanisme Penyelamat: The Inactivity Leak:**
  - Jika finalitas tidak tercapai selama 4 epoch berturut-turut, protokol secara otomatis mengaktifkan *Inactivity Leak*.
  - Validator yang tetap online dan merespons terus menerima imbalan seperti biasa.
  - Saldo koin milik validator yang offline dan bungkam akan dibakar secara kuadratik setiap epoch.
- **Pemulihan Konsensus Otonom:** Seiring terkikisnya saldo pihak yang offline, porsi kepemilikan pihak yang online secara matematis merangkak naik hingga melampaui ambang batas 66,7 persen, memulihkan proses finalitas secara mandiri.
- *Visual:* Diagram alur pemulihan Inactivity Leak: porsi stake pihak offline menciut akibat pembakaran kuadratik hingga pihak online kembali menguasai 67 persen hak suara.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah partisi: jika 40 persen validator offline akibat bencana kabel laut, sistem BFT biasa akan macet selamanya.
- Inactivity Leak mengikis saldo validator yang mati secara kuadratik setiap epoch.
- Porsi modal pihak yang hidup secara bertahap naik melampaui dua pertiga, memulihkan finalitas jaringan tanpa campur tangan manusia.

**Naskah Tutur (Voiceover Script):**
Mari kita uji ketahanan sistem ini dengan skenario bencana geopolitik terburuk.
Bayangkan terjadi perang atau putusnya kabel optik antarbenua yang membuat empat puluh persen validator di seluruh dunia tiba-tiba offline secara serentak.
Di bawah aturan BFT standar, sistem akan langsung mengalami kebuntuan permanen.
Mengapa?
Karena validator yang masih hidup hanya memegang enam puluh persen suara, sehingga mereka tidak akan pernah bisa mencapai syarat kuorum dua pertiga untuk mengesahkan blok baru.
Sistem akan membeku selamanya.
Untuk keluar dari jebakan ini, Casper menyematkan fitur pertahanan diri bernama The Inactivity Leak.
Jika empat epoch berlalu berturut-turut tanpa berhasil mencapai finalitas, protokol akan menyalakan mode darurat ini.
Validator yang tetap online akan terus bekerja seperti biasa.
Namun bagi validator yang offline dan tidak merespons, saldo koin mereka akan mulai dibakar habis secara kuadratik di setiap epoch.
Seiring berkurangnya saldo pihak yang offline, persentase kepemilikan modal pihak yang online secara otomatis akan terdongkrak naik.
Dalam beberapa hari atau minggu, proporsi suara pihak yang hidup akan kembali menembus batas kritis enam puluh tujuh persen.
Jaringan pun kembali mampu memfinalisasi transaksi secara mandiri tanpa memerlukan campur tangan manusia.

---

## Slide 12: Jembatan ke Modul Berikutnya: Spektrum Konsensus Alternatif

### Konten Slide
- **Refleksi Modul 03.3:** Proof of Stake berhasil memangkas konsumsi energi dan menghadirkan jaminan finalitas ekonomi mutlak lewat mekanisme slashing.
- **Kompromi yang Masih Bertahan:**
  - Waktu finalitas Casper masih membutuhkan waktu beberapa menit (sekitar 12,8 menit untuk dua epoch).
  - Kompleksitas protokol yang tinggi untuk mengoordinasikan jutaan kunci validator secara bersamaan.
- **Kebutuhan Kasus Penggunaan Khusus:**
  - Bagaimana mencapai finalitas sub-detik untuk bursa perdagangan terdesentralisasi berkecepatan tinggi?
  - Bagaimana jika waktu dicatat langsung lewat kriptografi sebelum konsensus dimulai (Solana Proof of History)?
  - Bagaimana jika kita meninggalkan struktur rantai blok linier dan beralih ke grafik multi-dimensi (DAG Consensus)?
- *Visual:* Peta spektrum inovasi konsensus yang menghubungkan PoW dan PoS menuju DPoS, Tendermint, Solana PoH, dan Sui Mysticeti DAG.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkum keberhasilan PoS dan sisa komprominya: finalitas masih butuh belasan menit.
- Aplikasi modern seperti trading kilat menuntut latensi konfirmasi di bawah satu detik.
- Teaser materi modul 03.4: Delegated PoS, Tendermint, Proof of History, dan arsitektur DAG.

**Naskah Tutur (Voiceover Script):**
Kita telah menyaksikan bagaimana Proof of Stake dan Casper FFG mentransformasi lanskap keamanan terdistribusi dengan memadukan kekuatan modal dan teori permainan.
Namun, di dunia teknik komputasi, tidak ada satu solusi yang sempurna untuk semua hal.
Meskipun Proof of Stake sangat aman dan ramah lingkungan, finalitasnya masih membutuhkan waktu sekitar dua belas menit agar dua epoch terpenuhi secara penuh.
Bagi aplikasi modern seperti pertukaran derivatif terdesentralisasi atau transaksi pembayaran instan di kasir, menunggu belasan menit tentu terasa sangat lambat.
Kebutuhan akan kecepatan ekstrem ini melahirkan gelombang eksperimen baru dalam arsitektur konsensus.
Bagaimana jika kita memilih wakil delegasi untuk memproduksi blok setiap setengah detik?
Bagaimana jika kita bisa mencatat aliran waktu secara matematis langsung di dalam transaksi sebelum konsensus dimulai seperti pada Proof of History milik Solana?
Dan bagaimana jika kita meninggalkan bentuk rantai blok linier konvensional dan beralih ke struktur Directed Acyclic Graph atau DAG yang memproses transaksi secara paralel?
Untuk menjelajahi batas terdepan inovasi konsensus modern, di modul berikutnya kita akan membahas Alternative and Hybrid Consensus Models.
Sampai jumpa di modul berikutnya.
