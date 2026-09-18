# Proof of Work and Nakamoto Consensus
Modul Presentasi: Consensus and Game Theory (03.2)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Proof of Work and Nakamoto Consensus
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Mengikat konsensus digital pada hukum fisika termodinamika dan menyelaraskan insentif ekonomi penambang.
- *Visual:* Ilustrasi rig penambangan silikon ASIC yang memancarkan daya komputasi dan energi listrik untuk mengamankan rantai blok kriptografis.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul kedua bab Consensus and Game Theory.
- Menjelaskan bagaimana Satoshi Nakamoto memecahkan kebuntuan koordinasi jaringan terbuka tanpa izin.
- Memahami pergeseran dari identitas virtual ke daya komputasi termodinamika riil.

**Naskah Tutur (Voiceover Script):**
Selamat datang kembali di modul kedua.
Pada materi sebelumnya, kita sudah melihat bagaimana Byzantine Fault Tolerance klasik mensyaratkan kita mengetahui jumlah pasti partisipan di dalam komite.
Namun, di internet terbuka tanpa izin, siapa saja bisa bergabung dan mengunduh perangkat lunak.
Keterbukaan ini adalah kekuatan terbesar desentralisasi, tetapi sekaligus melahirkan celah keamanan paling mematikan: Sybil Attack.
Hari ini kita akan membedah bagaimana Satoshi Nakamoto merancang Proof of Work sebagai jangkar termodinamika pertama di dunia digital.
Kita akan lihat bagaimana matematika SHA-256, penyesuaian tingkat kesulitan, dan teori permainan ekonomi bersatu membentuk Nakamoto Consensus.

---

## Slide 2: Kerentanan Fatal Jaringan Terbuka: Serangan Sybil

### Konten Slide
- **Dilema Demokrasi Digital Sederhana:**
  - Jika sebuah protokol terbuka menerapkan prinsip "satu alamat IP sama dengan satu suara", sistem akan langsung hancur.
  - Alamat IP dan identitas virtual tidak memiliki biaya kelangkaan fisik di dunia nyata.
- **Skenario Eksploitasi Serangan Sybil:**
  - Seorang penyerang dengan dana puluhan dolar dapat menyewa 100.000 mesin virtual di server komputasi cloud.
  - Setiap mesin virtual mengklaim identitas unik dan membanjiri jaringan dengan suara palsu.
  - Penyerang menguasai 99 persen hak suara kuorum dan mengesahkan transaksi belanja ganda secara instan.
- **Kebutuhan Desain:** Protokol terbuka membutuhkan mekanisme distribusi hak konsensus yang tidak memercayai identitas manusia, alamat IP, ataupun otoritas pendaftaran sentral.
- *Visual:* Diagram satu aktor jahat yang melipatgandakan dirinya menjadi ribuan instans virtual di cloud untuk menguasai kuorum pemungutan suara.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengapa sistem pemungutan suara berbasis satu IP satu suara pasti gagal.
- Identitas digital sangat murah untuk dipalsukan dalam jumlah masif.
- Memperkenalkan konsep kerentanan Sybil Attack di jaringan terdistribusi.

**Naskah Tutur (Voiceover Script):**
Mari kita bayangkan jika Satoshi Nakamoto membuat Bitcoin dengan sistem pemungutan suara sederhana: satu komputer atau satu alamat IP memiliki satu hak suara.
Sistem seperti itu akan langsung tumbang dalam hitungan detik.
Di dunia digital, membuat identitas baru tidak membutuhkan biaya kelangkaan fisik sama sekali.
Seorang penyerang bisa membuka kartu kredit, menyewa ratusan ribu virtual machine murah di penyedia cloud, lalu membanjiri jaringan dengan ratusan ribu identitas palsu.
Dengan menguasai mayoritas suara semu ini, penyerang bisa dengan mudah menyetujui transaksi palsu dan merampok dana pengguna lain.
Celah eksploitasi di mana satu entitas memalsukan banyak identitas untuk membajak kuorum dinamakan Sybil Attack.
Agar uang digital desentralistik bisa bertahan hidup, sistem harus menemukan cara membagikan kekuasaan tanpa pernah memercayai nama, wajah, atau alamat IP siapa pun.

---

## Slide 3: Teorema John Douceur (2002) dan Pembuktian Sybil

### Konten Slide
- **Karya Ilmiah John Douceur (2002):** Peneliti Microsoft Research memformalkan batas ketahanan identitas digital dalam makalah *The Sybil Attack*.
- **Pernyataan Pembuktian Matematis:**
  - *"Tanpa keberadaan otoritas sertifikasi identitas yang terpusat, jaringan terbuka terdistribusi tidak akan pernah bisa bertahan dari musuh yang memalsukan identitas virtual tanpa batas untuk mendominasi kuorum."*
- **Konsekuensi Paradigma:**
  - Ilmuwan komputer sempat meyakini bahwa sistem terbuka tanpa perantara bank atau pemerintah adalah hal yang mustahil secara teoritis.
  - Jika ingin mencegah Sybil, Anda harus mewajibkan paspor, kartu identitas, atau server verifikasi terpusat.
- *Visual:* Ilustrasi gerbang identitas sentral yang menjadi satu-satunya pelindung jaringan sebelum penemuan Nakamoto Consensus.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- John Douceur membuktikan secara matematis bahwa jaringan terbuka tidak bisa aman dari Sybil tanpa server pusat.
- Makalah ini sempat mematikan harapan para peneliti uang digital selama bertahun-tahun.
- Paradigma yang berlaku: kalau mau mencegah Sybil, harus ada KTP atau sertifikat dari institusi sentral.

**Naskah Tutur (Voiceover Script):**
Pada tahun 2002, seorang ilmuwan komputer di Microsoft Research bernama John Douceur menerbitkan makalah monumental berjudul The Sybil Attack.
Douceur membuktikan sebuah teorema matematis yang sempat mematahkan semangat para pengembang sistem desentralisasi.
Ia menyatakan bahwa tanpa adanya otoritas sentral yang bertugas memvalidasi identitas asli seseorang, sebuah sistem terbuka mustahil mempertahankan diri dari serangan identitas palsu.
Kesimpulan ini sangat telak.
Artinya, jika kalian ingin jaringan yang aman dari Sybil, kalian wajib memiliki server pendaftaran terpusat yang memeriksa identitas pengguna, seperti sistem paspor atau kartu tanda penduduk.
Namun memiliki server sentral berarti melenyapkan esensi desentralisasi itu sendiri.
Inilah dinding tebal yang menghalangi terwujudnya uang digital peer-to-peer selama bertahun-tahun.

---

## Slide 4: Solusi Nakamoto: Mengikat Hak Suara pada Hukum Termodinamika

### Konten Slide
- **Melewati Batasan Identitas:** Satoshi Nakamoto menyelesaikan teka-teki Sybil bukan dengan memperbaiki verifikasi identitas, melainkan dengan membuang identitas sepenuhnya.
- **Prinsip "Satu Hash Satu Suara":**
  - Protokol tidak peduli siapa Anda, apa kewarganegaraan Anda, atau berapa juta node perangkat lunak yang Anda jalankan.
  - Untuk mengajukan blok baru yang sah, Anda wajib menyertakan bukti kriptografis bahwa komputer Anda telah menghabiskan energi komputasi nyata.
- **Jangkar Fisik Termodinamika:**
  - Menghitung hash menuntut chip silikon fisik (ASIC) dan konsumsi daya listrik riil (kilowatt-hour).
  - Hak suara diikat secara langsung ke hukum termodinamika dunia nyata, menciptakan biaya marjinal yang tidak bisa dipalsukan.
- *Visual:* Konseptualisasi kabel listrik tegangan tinggi dari pembangkit listrik yang langsung mengalirkan daya ke dalam formula kriptografis blockchain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Satoshi tidak mencari cara memverifikasi KTP di internet, melainkan membuang konsep identitas.
- Mengganti satu orang satu suara menjadi satu unit hash per detik satu suara.
- Komputasi membutuhkan listrik nyata yang memiliki biaya fisik di dunia nyata.

**Naskah Tutur (Voiceover Script):**
Langkah jenius Satoshi Nakamoto bukanlah menemukan cara yang lebih canggih untuk memverifikasi siapa manusia di balik layar.
Satoshi justru membuang konsep identitas manusia sepenuhnya dari protokol konsensus.
Di dalam Bitcoin, jaringan sama sekali tidak peduli siapa kalian, apa alamat IP kalian, atau berapa banyak aplikasi wallet yang kalian pasang.
Satoshi memperkenalkan prinsip satu hash satu suara.
Untuk bisa mengajukan satu blok transaksi baru ke buku besar global, kalian harus menyerahkan bukti matematika bahwa kalian telah membakar energi komputasi.
Menjalankan komputasi matematika ini menuntut chip fisik silikon di dunia nyata dan membakar daya listrik listrik riil dari gardu pembangkit.
Karena energi listrik tidak bisa diciptakan dari ketiadaan dan memiliki biaya fisik di dunia nyata, hak suara dalam konsensus tidak bisa lagi dipalsukan dengan menyewa komputer virtual murah.
Satoshi mengikat kebenaran digital langsung pada hukum termodinamika bumi.

---

## Slide 5: Mekanisme Penambangan: Pencarian Pre-Image dan Target Hash

### Konten Slide
- **Teka-Teki Kriptografis (Pre-Image Search):**
  - Penambang mengambil 80-byte header blok dan menghitung fungsi hash ganda:
    $$\text{Block Hash} = \text{SHA-256}\big(\text{SHA-256}(\text{Header})\big)$$
- **Kondisi Validitas Konsensus:**
  - Hash 256-bit yang dihasilkan wajib bernilai lebih kecil secara numerik daripada ambang batas dinamis yang disebut **Target ($T$)**:
    $$\text{Block Hash} < T$$
- **Representasi Leading Zeroes:**
  - Semakin kecil angka target $T$, semakin banyak deretan angka nol biner di awal karakter hash.
  - Menemukan hash yang diawali belasan angka nol seperti $\mathtt{00000000000000000002a4b5\dots}$ adalah peristiwa yang luar biasa langka.
- **Metode Brute-Force Murni:** Karena sifat *one-way* dan *avalanche effect* pada SHA-256, tidak ada jalan pintas selain menebak nilai *nonce* satu per satu secara acak.
- *Visual:* Diagram siklus komputasi header: menguji nonce 0, mengecek target, menaikkan nonce, hingga menemukan hash yang valid.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Menjelaskan matematika di balik penambangan: double-SHA-256 pada header blok.
- Hash yang dihasilkan harus lebih kecil dari angka Target.
- Tidak ada rumus cepat: satu-satunya cara adalah menebak angka nonce secara brute-force.

**Naskah Tutur (Voiceover Script):**
Bagaimana cara sebuah komputer membuktikan kepada dunia bahwa ia telah melakukan kerja komputasi nyata?
Komputer penambang menjalankan teka-teki kriptografi yang disebut pre-image search.
Penambang merangkai delapan puluh byte data header blok, lalu menghitung fungsi hash ganda menggunakan algoritma SHA-256.
Agar blok tersebut diakui sah oleh seluruh node di dunia, angka hash yang dihasilkan harus bernilai lebih kecil daripada batas angka Target yang ditetapkan protokol.
Karena angka Target ini sangat kecil, secara visual hash blok yang valid akan terlihat diawali oleh belasan angka nol berturut-turut.
Karena sifat fungsi hash SHA-256 yang satu arah dan tidak bisa dibalik, tidak ada rumus matematika atau kecerdasan buatan mana pun yang bisa memprediksi angka mana yang akan menghasilkan hash valid.
Satu-satunya metode di muka bumi untuk menemukannya adalah brute-force: tebak angka nonce acak, hitung hash-nya, periksa apakah angkanya lebih kecil dari Target, dan ulangi miliaran kali per detik hingga berhasil.

---

## Slide 6: Karakteristik Matematis: Proses Poisson Tanpa Memori (Memoryless)

### Konten Slide
- **Proses Acak Poisson (Bernoulli Trials):**
  - Setiap perhitungan hash adalah uji coba independen dengan probabilitas sukses $p = \frac{T}{2^{256}}$.
  - Hasil perhitungan hash saat ini sama sekali tidak memiliki korelasi dengan tebakan sebelumnya ataupun masa depan.
- **Sifat Memoryless (Tanpa Memori):**
  - Mesin penambang yang sudah menyala dan menghitung selama sepuluh jam berturut-turut memiliki peluang sukses yang sama persis di milidetik berikutnya dengan mesin yang baru dinyalakan satu detik lalu.
  - Kerja masa lalu tidak bisa ditimbun atau diakumulasikan untuk menjamin kemenangan di masa depan.
- **Dampak Keadilan Konsensus:**
  - Menjamin seleksi pembuat blok berlangsung adil, terdesentralisasi, dan bebas manipulasi antrean.
- *Visual:* Kurva distribusi probabilitas eksponensial proses Poisson yang menunjukkan ketidaktergantungan waktu antar-kejadian penemuan blok.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Setiap tebakan hash berdiri sendiri sebagai percobaan independen.
- Penambangan adalah proses acak Poisson yang tidak memiliki memori masa lalu.
- Mesin yang menambang seharian tidak punya keunggulan probabilitas dibanding mesin yang baru colok listrik.

**Naskah Tutur (Voiceover Script):**
Salah satu sifat matematis paling krusial dari penambangan Proof of Work adalah sifatnya yang merupakan proses Poisson tanpa memori atau memoryless.
Setiap kali mesin penambang menghitung satu hash, itu adalah percobaan independen yang murni acak, seperti melempar dadu raksasa bersisi dua pangkat dua ratus lima puluh enam.
Artinya, mesin penambang raksasa yang sudah bekerja keras membakar listrik selama sepuluh jam berturut-turut memiliki peluang yang persis sama untuk memenangkan blok berikutnya dengan laptop kecil yang baru dicolok ke listrik satu detik yang lalu.
Kalian tidak bisa menabung atau menimbun hasil tebakan lama untuk dipakai curang di masa depan.
Ketiadaan memori ini adalah kunci utama yang menjamin keadilan sistem konsensus.
Tidak ada jadwal giliran yang bisa diprediksi, dan tidak ada peserta yang bisa mencurangi sistem dengan menyimpan kerja komputasi masa lalu secara sembunyi-sembunyi.

---

## Slide 7: Dynamic Difficulty Adjustment: Mengendalikan Detak Jantung Jaringan

### Konten Slide
- **Tantangan Fluktuasi Daya Komputasi:**
  - Jika target $T$ bersifat statis dan kaku, penambahan jutaan mesin penambang baru akan membuat blok ditemukan dalam hitungan milidetik.
  - Interval blok yang terlalu cepat memicu badai percabangan (*forks*) dan ledakan kapasitas penyimpanan data.
- **Target Waktu Blok 10 Menit:** Protokol Bitcoin dirancang untuk mempertahankan interval rata-rata penemuan blok setiap 600 detik.
- **Formula Penyesuaian Setiap 2.016 Blok:**
  - Setiap dua minggu sekali (2.016 blok), seluruh full node di dunia menghitung ulang target secara mandiri:
    $$T_{\text{baru}} = T_{\text{lama}} \times \left( \frac{\text{Waktu Nyata 2.016 Blok Terakhir}}{20.160 \text{ menit}} \right)$$
- **Batas Pengaman (Clamping Bounds):** Rasio penyesuaian dibatasi maksimal naik 4 kali lipat atau turun hingga seperempat ($\frac{1}{4} \le \frac{T_{\text{baru}}}{T_{\text{lama}}} \le 4$).
- *Visual:* Diagram umpan balik otomatis: hashrate global naik memicu Target mengecil (lebih sulit), menjaga interval blok kembali stabil ke 10 menit.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Waktu blok harus dijaga rata-rata 10 menit demi stabilitas propagasi data.
- Formula retarget dieksekusi independen oleh seluruh node setiap 2.016 blok (~2 minggu).
- Pembatasan rasio penyesuaian maksimal 4x untuk mencegah manipulasi timestamp ekstrem.

**Naskah Tutur (Voiceover Script):**
Bayangkan apa yang terjadi jika angka target kesulitan Bitcoin dibuat statis dan tidak pernah berubah sejak tahun 2009.
Pada masa awal, hanya ada segelintir laptop yang menambang sehingga butuh waktu lama untuk menemukan blok.
Namun hari ini, dengan jutaan chip penambang superkomputer di seluruh dunia, blok baru akan selesai dalam hitungan pecahan milidetik.
Jika blok diproduksi secepat itu, jaringan internet global tidak akan sempat menyebarkannya, memicu percabangan rantai yang kacau balau.
Untuk menjaga agar detak jantung Bitcoin tetap stabil rata-rata sepuluh menit per blok, Satoshi menyematkan mekanisme Dynamic Difficulty Adjustment.
Setiap dua ribu enam belas blok, atau sekitar dua minggu sekali, setiap full node di dunia secara otomatis menghitung ulang target kesulitan.
Jika penambang menemukan blok lebih cepat dari jadwal dua minggu, target diturunkan sehingga teka-teki menjadi lebih sulit.
Jika penambang mematikan mesin dan blok melambat, teka-teki secara otomatis dipermudah kembali ke rata-rata sepuluh menit.

---

## Slide 8: Penyelarasan Insentif Ekonomi dan Nash Equilibrium

### Konten Slide
- **Penambang Bukan Relawan:** Penambang beroperasi atas dasar motif keuntungan finansial murni (*profit-maximizing actors*).
- **Struktur Biaya Nyata Penambang:**
  - *Capital Expenditure (CapEx):* Pembelian perangkat keras mesin penambang silikon.
  - *Operational Expenditure (OpEx):* Tagihan bulanan listrik pembangkit dan pendingin fasilitas.
- **Arsitektur Imbalan Dua Jalur:**
  - *Coinbase Block Subsidy:* Pencetakan koin baru di transaksi pertama blok (mengalami *halving* setiap 210.000 blok).
  - *Transaction Fees:* Selisih nilai input dan output transaksi yang dibayar pengguna.
- **Nash Equilibrium Penambangan Jujur:**
  - Jika penambang mencoba berbuat curang dengan memasukkan transaksi palsu, full node akan langsung menolak blok tersebut.
  - Penambang curang menanggung kerugian seratus persen biaya listrik tanpa mendapatkan imbalan sepeser pun.
- *Visual:* Diagram pohon keputusan ekonomi penambang: jalur jujur menghasilkan laba bersih, jalur curang menghasilkan kerugian listrik mutlak.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Penambang mengeluarkan uang fiat nyata untuk membeli mesin dan membayar listrik.
- Imbalan penambang: subsidi koin baru plus biaya transaksi.
- Berbuat curang membuat penambang rugi 100 persen biaya listrik karena blok ditolak oleh full node.

**Naskah Tutur (Voiceover Script):**
Proof of Work bukan semata-mata algoritma matematika, melainkan sebuah mesin insentif ekonomi berbasis teori permainan.
Para penambang di jaringan Bitcoin tidak bekerja atas dasar kebaikan hati atau sifat sukarela.
Mereka adalah pelaku bisnis yang ingin memaksimalkan keuntungan finansial.
Mereka mengeluarkan modal besar untuk membeli chip penambang dan membayar tagihan listrik jutaan dolar setiap bulan dalam mata uang fiat.
Satu-satunya cara untuk mengembalikan modal tersebut adalah jika blok yang mereka buat diterima secara sah oleh jaringan sehingga mereka berhak mencairkan imbalan blok dan biaya transaksi.
Di sinilah letak kejeniusan Nash Equilibrium pada Nakamoto Consensus.
Jika seorang penambang mencoba berbuat curang, misalnya mencoba membelanjakan koin orang lain, ribuan full node mandiri di seluruh dunia akan langsung membuang blok tersebut ke tempat sampah.
Akibatnya, penambang curang itu membakar listrik secara sia-sia dan menanggung kerugian total tanpa menerima imbalan satu koin pun.
Kejujuran dibuat jauh lebih menguntungkan daripada kecurangan secara matematis.

---

## Slide 9: Batas Keamanan: Serangan Reorganisasi 51 Persen

### Konten Slide
- **Ambang Batas Keamanan Mayoritas:** Apa yang terjadi jika satu entitas atau kartel menguasai lebih dari separuh daya komputasi global ($q > 0.5$)?
- **Mekanisme Serangan Reorganisasi Rahasia:**
  - Penyerang mengirim transaksi deposit ratusan juta dolar ke bursa kripto di rantai publik.
  - Secara bersamaan, penyerang menambang rantai tandingan secara rahasia di tempat terisolasi tanpa menyertakan deposit tersebut.
  - Penyerang mencairkan uang tunai dari bursa setelah beberapa konfirmasi blok.
  - Penyerang menyiarkan rantai rahasianya yang memiliki akumulasi kesulitan lebih tinggi ke publik.
  - Node global mematuhi *longest-chain rule* dan mengadopsi rantai penyerang (*chain reorganization*), menghapus riwayat deposit awal.
- *Visual:* Diagram urutan waktu serangan 51 persen: percabangan rantai publik vs rantai privat penyerang yang membatalkan deposit bursa.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Serangan 51 persen terjadi jika penambang menguasai lebih dari 50 persen hashrate global.
- Modus serangan: menambang rantai privat secara rahasia untuk membatalkan pembayaran (double-spending).
- Memanfaatkan longest-chain rule untuk memaksa jaringan melakukan reorganisasi sejarah.

**Naskah Tutur (Voiceover Script):**
Meskipun arsitektur Nakamoto sangat tangguh, sistem ini memiliki batas keamanan fisik yang jelas, yaitu serangan lima puluh satu persen.
Jika satu entitas tunggal atau kartel penambang berhasil menguasai lebih dari separuh total daya komputasi global, mereka bisa menghitung hash lebih cepat daripada gabungan seluruh penambang jujur di bumi.
Dengan keunggulan ini, penyerang bisa melancarkan aksi reorganisasi rantai.
Penyerang bisa mengirimkan dana deposit ratusan juta dolar ke bursa di rantai publik yang dilihat semua orang.
Tetapi di ruang tertutup, penyerang secara diam-diam menambang rantai tandingan rahasia yang tidak mencatat pengiriman deposit tersebut.
Begitu pihak bursa mengonfirmasi transaksi dan mencairkan uang tunai ke rekening penyerang, penyerang tiba-tiba menyiarkan rantai rahasianya ke internet.
Karena rantai rahasia penyerang memiliki akumulasi bukti kerja yang lebih berat, aturan rantai terpanjang memaksa seluruh komputer di dunia beralih ke rantai tersebut.
Transaksi deposit bursa terhapus dari sejarah, dan penyerang berhasil menggandakan uangnya.

---

## Slide 10: Apa yang Bisa dan Tidak Bisa Dilakukan Penyerang 51 Persen

### Konten Slide
- **Mitos Serangan 51 Persen:** Banyak pihak salah mengira bahwa menguasai 51 persen daya komputasi memberikan kendali seperti tuhan (*god mode*).
- **Tindakan yang BISA Dilakukan Penyerang:**
  - Membatalkan transaksi pengeluaran milik penyerang sendiri dalam rentang waktu terdekat (*double-spending*).
  - Melakukan sensor transaksi dengan menolak memasukkan transaksi pengguna tertentu ke dalam blok.
  - Memonopoli pembuatan blok baru dan menyapu seluruh imbalan koin.
- **Tindakan yang TIDAK PERNAH BISA Dilakukan Penyerang:**
  - Mencuri saldo koin dari dompet pengguna lain (karena tidak memiliki kunci privat kriptografi).
  - Mengubah riwayat transaksi kuno yang tertanam jauh di masa lalu sebelum titik percabangan.
  - Mengubah aturan konsensus sistem (misalnya mencetak 100 juta koin di luar batas emisi).
- *Visual:* Matriks pembatas dua kolom yang mempertegas batas wewenang fisik penambang vs aturan mutlak full node kriptografi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Klarifikasi mitos: menguasai 51 persen bukan berarti bisa berbuat segalanya.
- Penyerang hanya bisa membatalkan transaksi miliknya sendiri dan menyensor blok.
- Penyerang tidak bisa mencuri koin orang lain atau mengubah aturan emisi karena full node akan menolak.

**Naskah Tutur (Voiceover Script):**
Sering kali ada kesalahpahaman besar di kalangan masyarakat bahwa penyerang lima puluh satu persen bisa mengacak-acak sistem sesuka hati layaknya admin bank.
Ini adalah mitos yang keliru.
Kalian harus memahami batasan tegas apa yang bisa dan tidak bisa dilakukan oleh penyerang mayoritas.
Penyerang lima puluh satu persen memang bisa membatalkan transaksi belanja miliknya sendiri dan menyensor transaksi orang lain agar tidak masuk ke blok.
Tetapi penyerang sama sekali tidak bisa mencuri saldo dari dompet kalian, karena mereka tidak memiliki tanda tangan kunci privat kalian.
Penyerang juga tidak bisa mengubah aturan fundamental moneter, misalnya mencetak seratus juta koin baru dari ketiadaan.
Mengapa?
Karena ribuan full node milik pedagang dan pengguna biasa akan memvalidasi blok tersebut secara independen.
Jika sebuah blok melanggar aturan matematika, full node akan langsung menolaknya mentah-mentah, tidak peduli seberapa besar daya komputasi yang dibakar di belakang blok tersebut.

---

## Slide 11: Selfish Mining: Ketika Kejujuran Bukan Strategi Optimal

### Konten Slide
- **Penemuan Eyal dan Sirer (2014):** Peneliti Cornell membuktikan bahwa penambangan jujur tidak selalu menjadi strategi optimal bagi kolam penambang besar.
- **Mekanisme Serangan Selfish Mining:**
  - Kolam penambang egois menemukan blok baru tetapi sengaja menyembunyikannya dari jaringan publik.
  - Kolam terus menambang blok berikutnya di atas blok rahasianya untuk membangun keunggulan jarak.
  - Saat jaringan jujur menemukan satu blok, penambang egois langsung menyiarkan rantai rahasianya ke internet.
  - Rantai egois yang lebih panjang membuat blok penambang jujur hangus (*orphaned*), menyia-nyiakan listrik mereka.
- **Batas Ambang Keuntungan:**
  - Serangan ini terbukti menguntungkan secara matematis jika sebuah kolam menguasai 25 hingga 33 persen kekuatan hash global.
- *Visual:* Alur percabangan waktu yang menggambarkan blok rahasia penambang egois menyalip blok jujur dan memicu orphan block.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Makalah Eyal dan Sirer 2014 membuktikan celah pada asumsi kejujuran penambang.
- Taktik menyembunyikan blok baru untuk membuat listrik penambang jujur terbuang sia-sia.
- Strategi ini menjadi menguntungkan jika sebuah mining pool menguasai minimal 25 persen hashrate.

**Naskah Tutur (Voiceover Script):**
Pada tahun 2014, dua peneliti bernama Ittay Eyal dan Emin Gün Sirer menerbitkan penelitian yang sempat mengguncang asumsi dasar Bitcoin.
Mereka membuktikan bahwa bagi kolam penambang yang memiliki kekuatan besar, mengikuti aturan jujur bukanlah strategi yang paling menguntungkan.
Strategi ini dikenal sebagai Selfish Mining.
Ketika sebuah kolam penambang egois menemukan blok yang sah, mereka sengaja tidak menyiarkannya ke publik melainkan menyimpannya secara rahasia.
Mereka kemudian diam-diam menambang blok kedua di atas blok rahasia tersebut.
Begitu para penambang jujur di belahan dunia lain berhasil menemukan blok tandingan, penambang egois secara serentak merilis blok-blok rahasianya ke publik.
Karena rantai mereka lebih panjang, jaringan mengadopsi blok mereka dan membuang blok penambang jujur ke tempat sampah.
Daya listrik penambang jujur terbuang percuma, dan pangsa imbalan sang penambang egois meningkat secara proporsional.
Eyal dan Sirer membuktikan trik ini mulai menguntungkan jika sebuah kolam menguasai antara dua puluh lima hingga tiga puluh tiga persen daya komputasi dunia.

---

## Slide 12: Evolusi Perangkat Keras: Dari CPU Konsumen ke Sirkuit ASIC

### Konten Slide
- **Transformasi Industri Silikon (Empat Era Penambangan):**
  - **1. Era CPU (2009-2010):** Penambangan berjalan di prosesor komputer desktop standar (satuan kilohashes per detik).
  - **2. Era GPU (2010-2012):** Kartu grafis memanfaatkan ribuan Arithmetic Logic Units (ALUs) paralel, menghasilkan lompatan kecepatan 100 kali lipat.
  - **3. Era FPGA (2012-2013):** Sirkuit gerbang logika terprogram (*reconfigurable gates*) untuk mengoptimalkan efisiensi energi listrik.
  - **4. Era ASIC (2013-Sekarang):** *Application-Specific Integrated Circuits* mencetak sirkuit logika SHA-256 langsung di atas keping silikon permanen.
- **Spesialisasi Absolut:** Chip ASIC tidak dapat menjalankan fungsi komputasi lain selain menghitung hash, tetapi bekerja miliaran kali lebih efisien dibanding prosesor umum.
- *Visual:* Garis waktu visual evolusi perangkat keras: CPU desktop -> GPU gaming -> papan PCB FPGA -> rak server industri ASIC modern.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Paparkan empat fase evolusi perangkat keras penambangan: CPU, GPU, FPGA, hingga ASIC.
- GPU memanfaatkan ribuan inti paralel ALU untuk menghitung hash lebih cepat.
- ASIC adalah chip khusus yang hanya bisa menghitung algoritma SHA-256 tetapi memiliki efisiensi termodinamika tertinggi.

**Naskah Tutur (Voiceover Script):**
Tuntutan efisiensi energi dalam Proof of Work telah memicu revolusi besar dalam industri manufaktur semikonduktor dunia.
Perjalanan ini terbagi ke dalam empat era perangkat keras.
Pada era pertama di tahun 2009, penambangan dilakukan menggunakan CPU komputer rumah biasa dengan kecepatan kilohash per detik.
Dua tahun kemudian, para penambang menyadari bahwa kartu grafis atau GPU memiliki ribuan inti ALU paralel yang sanggup menghitung ribuan hash secara serentak, melipatgandakan kecepatan hingga seratus kali lipat.
Era ketiga berlanjut ke perangkat FPGA di mana para insinyur memprogram gerbang logika sirkuit khusus demi menghemat listrik.
Hingga akhirnya kita memasuki era ASIC yang mendominasi sampai hari ini.
ASIC adalah chip silikon yang dirancang mati di tingkat pabrik khusus untuk menjalankan algoritma SHA-256.
Chip ini tidak bisa digunakan untuk mengetik dokumen, bermain gim, atau memutar video.
Tetapi untuk urusan menghitung hash, efisiensi energinya miliaran kali lipat lebih unggul daripada prosesor komputer tercanggih di dunia.

---

## Slide 13: Jembatan ke Modul Berikutnya: Mengamankan Ledger Tanpa Membakar Energi

### Konten Slide
- **Refleksi Modul 03.2:** Proof of Work berhasil menyelesaikan serangan Sybil dengan mengikat hak suara pada listrik dan perangkat keras fisik.
- **Harga Mahal Jangkar Termodinamika:**
  - Konsumsi energi listrik global yang setara dengan konsumsi listrik satu negara menengah.
  - Perlombaan senjata perangkat keras khusus yang memicu sentralisasi fasilitas penambangan skala industri.
  - Tekanan jual konstan di pasar terbuka karena penambang wajib membayar tagihan listrik bulanan dalam mata uang fiat.
- **Tantangan Desain Baru:**
  - Bisakah kita mengganti energi listrik fisik dengan modal kapital digital yang dikunci langsung di dalam buku besar (*on-chain collateral*)?
  - Bagaimana Proof of Stake menyelesaikan dilema klasik *Nothing at Stake*?
  - Bagaimana mekanisme *slashing* menghancurkan modal penyerang secara otomatis tanpa intervensi pengadilan?
- *Visual:* Transisi simbolik dari cerobong energi termodinamika fisik menuju brankas kontrak pintar kriptografi Proof of Stake.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkum keunggulan PoW sekaligus beban biaya termodinamikanya yang mahal.
- Muncul pertanyaan: bisakah keamanan dijamin tanpa harus membakar listrik bumi?
- Teaser materi modul 03.3: Proof of Stake, Nothing-at-Stake, slashing, dan Casper FFG.

**Naskah Tutur (Voiceover Script):**
Proof of Work telah membuktikan diri sebagai benteng pertahanan yang sangat kokoh untuk mengamankan nilai moneter digital.
Namun, keamanan termodinamika ini datang dengan kompensasi fisik yang luar biasa besar.
Jaringan penambangan modern mengonsumsi puluhan terawatt-jam listrik setiap tahun, dan para penambang dipaksa terus menjual koin hasil tambangannya ke pasar untuk membayar tagihan listrik fiat mereka.
Kenyataan ini memicu lahirnya pertanyaan radikal dalam ilmu komputer terdistribusi.
Bisakah kita mempertahankan tingkat keamanan ekonomi yang setara tanpa harus membakar energi listrik sama sekali?
Bisakah kita mengganti mesin fisik penambang dengan agunan modal digital yang dikunci langsung di dalam smart contract?
Bagaimana Proof of Stake mengatasi masalah klasik di mana validator bisa memilih dua rantai sekaligus tanpa biaya?
Dan bagaimana algoritma finalitas modern mengunci kepastian transaksi secara instan?
Untuk memahami transisi terbesar dalam evolusi konsensus blockchain, di modul berikutnya kita akan membahas Proof of Stake and Finality Gadgets.
Sampai jumpa di modul berikutnya.
