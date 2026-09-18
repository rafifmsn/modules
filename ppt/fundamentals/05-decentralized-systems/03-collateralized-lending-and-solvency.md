# Collateralized Lending and Protocol Solvency
Modul Presentasi: Decentralized Systems (05.3)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Collateralized Lending and Protocol Solvency
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Mekanika pasar utang terdesentralisasi, paradigma over-collateralization, batas risiko Loan-to-Value, formula Health Factor, mesin likuidasi bot, dan kurva suku bunga dinamis.
- *Visual:* Ilustrasi brankas smart contract yang menahan aset kolateral kripto dengan neraca utang stablecoin dan pemantauan Health Factor secara real-time.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul 5.3.
- Menjelaskan bagaimana kredit bekerja tanpa bank, slip gaji, atau pengadilan.
- Membedah over-collateralization, formula Health Factor, dan mitigasi bad debt.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga: Collateralized Lending and Protocol Solvency.
Pada modul sebelumnya, kita sudah membedah bagaimana pasar spot dijalankan secara otonom oleh automated market maker.
Sekarang kita melangkah ke pilar berikutnya dalam ekosistem keuangan: pasar kredit dan peminjaman dana.
Di dunia perbankan konvensional, pinjaman didasarkan pada identitas legal, analisis slip gaji, dan ancaman penegakan hukum perdata.
Tetapi di atas jaringan blockchain publik, setiap pengguna beroperasi di balik alamat pseudonim tanpa kartu identitas atau riwayat skor kredit.
Hari ini kita akan mengupas bagaimana protokol seperti Aave, Compound, dan MakerDAO memecahkan paradoks ini.
Kita akan membedah prinsip over-collateralization, formula matematis Health Factor, operasi bot likuidasi otomatis, dan model suku bunga berkurva kinked yang menjaga ketersediaan kas protokol.

---

## Slide 2: Dilema Pinjaman Tanpa Skor Kredit di Dunia Anonim

### Konten Slide
- **Model Perbankan Tradisional (Underwritten Banking):**
  - Mengandalkan biro pemeringkat kredit (seperti FICO, Equifax, atau Pefindo) dan verifikasi aset fisik.
  - Mitigasi risiko gagal bayar (*default*) ditegakkan melalui sistem peradilan negara, sita jaminan fisik, atau pemotongan gaji.
- **Realitas Lingkungan Blockchain Publik:**
  - Pengguna hanya diidentifikasi oleh 20-byte alamat heksadesimal pseudonim.
  - Tidak ada yurisdiksi hukum tunggal, tidak ada identitas fisik wajib, dan tidak ada juru sita pengadilan.
- **The Trust Barrier:**
  - Jika smart contract meminjamkan sepuluh ribu dolar tanpa jaminan, peminjam dapat dengan mudah meninggalkan alamat dompet tersebut dan tidak pernah mengembalikannya.
- **Solusi Desentralisasi:** Mengganti kepercayaan personal dengan jaminan modal kriptografis yang terkunci secara matematis di dalam smart contract sebelum pinjaman dicairkan.
- *Visual:* Perbandingan alur kredit bank (cek KTP dan skor FICO) vs kredit Web3 (kunci jaminan on-chain di smart contract).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bank konvensional meminjamkan uang karena mereka memegang identitas hukum kita.
- Di blockchain publik, semua orang adalah alamat anonim.
- Tanpa jaminan keras, pinjaman tanpa agunan di Web3 adalah bunuh diri ekonomi.

**Naskah Tutur (Voiceover Script):**
Ketika kita mengajukan pinjaman ke bank konvensional, bank bersedia mencairkan dana bukan karena mereka percaya pada kata-kata kita.
Bank bersedia meminjamkan uang karena mereka memegang data identitas legal kita, memeriksa slip gaji, meninjau riwayat skor kredit, dan didukung oleh aparat penegak hukum yang bisa menyita aset kita jika kita mangkir.
Namun di atas blockchain publik, arsitektur hukum fisik ini tidak berlaku.
Di sini, semua pengguna hanyalah deretan alamat heksadesimal dua puluh byte tanpa nama.
Tidak ada batas negara, tidak ada pengadilan sentral, dan tidak ada juru sita yang bisa mendatangi rumah peminjam.
Jika sebuah protokol DeFi meminjamkan sepuluh ribu dolar secara cuma-cuma tanpa agunan, peminjam cukup memindahkan dana itu ke mixer dan membuang kunci privat dompet lamanya selamanya.
Oleh karena itu, dunia terdesentralisasi membutuhkan paradigma baru: kita mengganti kepercayaan berbasis reputasi manusia dengan jaminan modal berbasis kepastian kode matematika.

---

## Slide 3: Paradigma Over-Collateralization

### Konten Slide
- **Aturan Baku Solvensi DeFi:** Nilai jaminan yang disetorkan wajib **lebih besar secara mutlak** daripada nilai pokok pinjaman yang ditarik:
  $$\text{Nilai Kolateral} > \text{Nilai Utang Terpinjam}$$
- **Contoh Kasus Ekuitas Bersih:** Peminjam menyetorkan $15,000 dalam bentuk ETH untuk meminjam $10,000 dalam bentuk stablecoin USDC (rasio jaminan 150%).
- **Empat Motivasi Finansial Peminjam Melakukan Over-Collateralization:**
  1. *Optimalisasi Pajak:* Meminjam uang tunai terhadap agunan aset kripto tidak memicu peristiwa penjualan kena pajak (*capital gains tax*).
  2. *Mempertahankan Paparan Nilai Aset (Long-Term HODL):* Peminjam membutuhkan likuiditas tunai harian tanpa harus kehilangan potensi kenaikan harga aset jangka panjangnya.
  3. *Membuka Posisi Leverage (Going Long):* Meminjam stablecoin untuk memborong lebih banyak aset dasar di pasar spot, lalu menyetorkannya kembali ke dalam pool.
  4. *Shorting Aset Pasar:* Meminjam token yang diproyeksikan akan jatuh nilainya, menjualnya seketika, dan membelinya kembali dengan harga murah di kemudian hari.
- *Visual:* Diagram neraca perbandingan nilai kolateral ETH yang tinggi menopang pinjaman stablecoin USDC yang lebih kecil di dalam smart contract.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Nilai jaminan harus selalu lebih tinggi daripada nilai utang.
- Mengapa orang mau menjaminkan 15 ribu dolar demi meminjam 10 ribu dolar?
- Motivasi utama: pajak, leverage, likuiditas tanpa menjual aset, dan short-selling.

**Naskah Tutur (Voiceover Script):**
Solusi yang dihadirkan oleh Decentralized Finance adalah prinsip over-collateralization atau jaminan berlebih.
Di dalam protokol lending terdesentralisasi, kalian hanya bisa meminjam aset jika kalian menyetorkan jaminan yang nilainya jauh lebih besar daripada utang yang kalian ambil.
Pertanyaan pertama yang selalu diajukan oleh pemula adalah: jika saya sudah punya uang lima belas ribu dolar dalam bentuk ETH, untuk apa saya repot-repot menyetorkannya hanya demi meminjam sepuluh ribu dolar uang tunai?
Mengapa tidak jual saja ETH tersebut secara langsung?
Jawabannya terletak pada empat strategi finansial utama.
Pertama adalah efisiensi pajak: meminjam bukanlah penjualan, sehingga tidak memicu pajak capital gains di mayoritas yurisdiksi.
Kedua, mempertahankan kepemilikan aset jangka panjang: kalian butuh uang tunai hari ini tanpa harus kehilangan potensi apresiasi harga ETH di masa depan.
Ketiga, untuk melipatgandakan daya beli atau leverage: kalian meminjam tunai untuk membeli lebih banyak ETH di pasar.
Dan keempat, kalian bisa meminjam aset tertentu untuk melakukan aksi short-selling saat memprediksi harganya akan anjlok.

---

## Slide 4: Parameter Risiko Inti Protokol Lending

### Konten Slide
- **1. Loan-To-Value (LTV) Ratio:**
  - Persentase batas maksimum pinjaman yang dapat ditarik saat pertama kali menyetorkan jaminan.
  - Kapasitas pinjam: $\text{Kapasitas Maksimal} = \text{Nilai Kolateral} \times \text{LTV}$.
  - Contoh: Jika LTV ETH adalah $80\%$, setoran kolateral senilai $\$10,000$ mengizinkan penarikan utang maksimal senilai $\$8,000$.
- **2. Liquidation Threshold (LT):**
  - Batas ambang batas risiko kritis di mana posisi utang dianggap kurang jaminan (*under-collateralized*) dan otomatis dibuka untuk eksekusi likuidasi publik ($\text{LT} > \text{LTV}$).
  - Selisih antara LTV ($80\%$) dan LT ($85\%$) memberikan zona penyangga aman terhadap volatilitas normal.
- **3. Liquidation Bonus (Insentif Likuidator):**
  - Diskon harga kolateral (biasanya berkisar $5\%$ hingga $10\%$) yang diberikan kepada bot likuidator eksternal sebagai kompensasi pelunasan utang macet.
- **4. Close Factor:**
  - Batas persentase maksimum dari total utang peminjam yang dapat dilunasi dalam satu panggilan transaksi likuidasi tunggal (biasanya ditetapkan $50\%$) demi melindungi peminjam dari likuidasi total seketika.
- *Visual:* Skala bertingkat yang memperlihatkan zona aman LTV, batas pemicu LT, dan zona bahaya likuidasi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Empat parameter risiko paling vital di Aave dan Compound.
- LTV adalah batas saat meminjam, LT adalah batas saat mulai bahaya.
- Liquidation bonus mengganjar pihak ketiga yang membersihkan kredit macet.

**Naskah Tutur (Voiceover Script):**
Untuk menjaga agar sistem tetap solvabel setiap detik, protokol pinjaman mengatur empat parameter risiko utama untuk setiap jenis aset.
Parameter pertama adalah Loan-to-Value atau LTV.
LTV menentukan persentase batas maksimal dana yang boleh kalian pinjam saat pertama kali menyetor jaminan.
Jika LTV adalah delapan puluh persen, setoran jaminan sepuluh ribu dolar mengizinkan kalian meminjam maksimal delapan ribu dolar.
Parameter kedua adalah Liquidation Threshold atau LT.
LT adalah batas ambang kritis di mana sebuah posisi dianggap mulai berbahaya.
Nilai LT selalu dipasang lebih tinggi daripada LTV, misalnya di angka delapan puluh lima persen.
Selisih lima persen ini menjadi bantalan pengaman bagi peminjam dari fluktuasi harga wajar.
Parameter ketiga adalah Liquidation Bonus, yaitu diskon sekitar lima hingga sepuluh persen atas aset jaminan yang disita, yang diberikan sebagai kompensasi keuntungan bagi para pencari utang macet.
Dan parameter keempat adalah Close Factor, yaitu batas maksimal utang yang boleh dilunasi dalam satu transaksi, biasanya dibatasi lima puluh persen agar jaminan pengguna tidak langsung habis dalam sekejap.

---

## Slide 5: Formula Health Factor (HF) & Batas Solvensi

### Konten Slide
- **Definisi Health Factor ($HF$):** Indikator numerik tunggal terstandarisasi untuk memantau tingkat kesehatan dan solvensi akun peminjam secara waktu nyata.
- **Formula Matematis Terpadu (Model Aave):**
  $$HF = \frac{\sum \big(\text{Kolateral}_i \times \text{Harga}_i \times \text{LT}_i\big)}{\sum \big(\text{Utang}_j \times \text{Harga}_j\big)}$$
- **Tiga Zona Status Solvensi Akun:**
  - **$HF > 1.0$ (Solvent & Aman):** Nilai jaminan berbobot ambang batas berada di atas total kewajiban utang. Kolateral terkunci aman dan tidak dapat disentuh oleh siapa pun.
  - **$HF = 1.0$ (Batas Ambang Kritis):** Posisi berada di ujung tanduk toleransi risiko protokol.
  - **$HF < 1.0$ (Insolvent / Liquidatable):** Nilai jaminan melanggar batas ambang Liquidation Threshold.
    Smart contract otomatis membuka posisi ini untuk dilikuidasi oleh siapa saja di seluruh dunia.
- *Visual:* Indikator speedometer dinamis memperlihatkan zona hijau ($HF > 1.1$), zona kuning waspada ($1.0 < HF < 1.1$), dan zona merah likuidasi ($HF < 1.0$).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Health Factor adalah skor kesehatan posisi utang pengguna.
- Formula membandingkan nilai jaminan terdiskon LT terhadap total utang riil.
- Nilai di bawah 1.0 seketika memicu hak likuidasi terbuka.

**Naskah Tutur (Voiceover Script):**
Bagaimana smart contract memantau kesehatan rekening peminjam yang memiliki kombinasi beragam aset jaminan dan utang?
Protokol seperti Aave merangkum seluruh posisi tersebut ke dalam satu metrik matematis tunggal bernama Health Factor atau HF.
Formula Health Factor membagi total nilai jaminan yang sudah dikalikan dengan bobot Liquidation Threshold masing-masing, terhadap total nilai kewajiban utang saat ini.
Selama nilai Health Factor berada di atas angka satu koma nol, posisi peminjam dinyatakan solvent dan aman.
Tidak ada satu pun entitas di dunia yang bisa menyentuh jaminan tersebut.
Namun begitu nilai Health Factor turun di bawah angka satu koma nol, misalnya karena harga pasar kolateral merosot tajam, posisi tersebut dinyatakan melanggar batas toleransi risiko.
Secara otomatis, smart contract mencabut proteksi rekening dan membuka posisi tersebut untuk dilikuidasi secara publik oleh siapa pun yang bersedia melunasi utangnya.

---

## Slide 6: Mekanisme Likuidasi Langkah demi Langkah

### Konten Slide
- **Sifat Pasif Smart Contract:** Kode blockchain tidak dapat memantau atau mengeksekusi dirinya sendiri secara mandiri tanpa pemicu transaksi eksternal (*externally owned account / bots*).
- **Peran Jaringan Bot Likuidator:** Bot terprogram mengawasi mempool dan event feed oracle selama 24/7 untuk mendeteksi posisi akun dengan $HF < 1.0$.
- **Siklus Hidup Eksekusi Likuidasi:**
  1. *Deteksi & Pembaruan Oracle:* Oracle terdesentralisasi (seperti Chainlink) menyiarkan pembaruan penurunan harga pasar ke kontrak lending.
  2. *Panggilan Likuidasi (`liquidationCall`):* Bot likuidator memanggil fungsi likuidasi, menyetorkan token utang milik peminjam (misal: stablecoin).
  3. *Penghapusan Utang & Penyitaan Jaminan:* Smart contract membakar token utang yang disetor dan menyita aset kolateral peminjam senilai pokok utang ditambah liquidation bonus.
  4. *Realisasi Keuntungan Instan:* Bot likuidator menjual jaminan kripto yang disita ke pool DEX (Uniswap) untuk mengunci laba arbitrase bersih dalam satu blok yang sama.
- *Visual:* Sequence diagram interaksi: Oracle Price Update -> Health Factor Drop -> Liquidator Bot Call -> Debt Burn & Seizure -> DEX Arbitrage Swap.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Smart contract tidak bisa berjalan sendiri tanpa transaksi pemicu.
- Bot likuidator berburu laba arbitrase dari liquidation bonus.
- Siklus likuidasi memulihkan Health Factor peminjam kembali ke zona aman.

**Naskah Tutur (Voiceover Script):**
Banyak orang mengira smart contract bisa memantau dirinya sendiri dan mengeksekusi penyitaan secara otomatis.
Faktanya, smart contract adalah kode pasif yang hanya bereaksi jika dipanggil oleh sebuah transaksi eksternal.
Untuk mengeksekusi likuidasi, protokol mengandalkan ekosistem bot likuidator pihak ketiga yang bersaing ketat di seluruh dunia.
Bot-bot ini memantau pembaruan harga dari oracle Chainlink setiap detiknya.
Begitu oracle memperbarui harga dan membuat Health Factor sebuah rekening jatuh di bawah angka satu, bot likuidator seketika mengirimkan transaksi liquidationCall.
Bot tersebut melunasi sebagian utang si peminjam menggunakan modal miliknya sendiri.
Sebagai imbalannya, smart contract menyerahkan aset jaminan si peminjam senilai pokok utang ditambah bonus likuidasi lima persen.
Detik itu juga, bot likuidator langsung menjual aset jaminan tersebut di Uniswap untuk mengunci keuntungan bersih tanpa risiko pasar.
Melalui mekanisme pasar bebas ini, utang peminjam berkurang drastis dan Health Factor rekeningnya kembali pulih ke zona aman di atas satu.

---

## Slide 7: Simulasi Numerik Likuidasi

### Konten Slide
- **Skenario Awal Alice:**
  - Jaminan: $10 \text{ ETH}$ saat harga $\$1,000$ (Nilai Kolateral = $\$10,000$).
  - Utang: Menarik $\$8,000 \text{ USDC}$.
  - Parameter: $\text{LTV} = 80\%$, $\text{LT} = 85\%$, Bonus Likuidasi $= 5\%$, Close Factor $= 50\%$.
  - Status Awal: $HF = \frac{10,000 \times 0.85}{8,000} = 1.0625$ (Solvent).
- **Kejadian Pasar: Harga ETH Turun Menjadi $\$900$:**
  - Nilai jaminan terkini: $10 \times 900 = \$9,000$.
  - Status Baru: $HF = \frac{9,000 \times 0.85}{8,000} = \frac{7,650}{8,000} = 0.956$ ($HF < 1.0 \to \text{Liquidatable!}$).
- **Eksekusi Bot Likuidator:**
  - Bot melunasi $50\%$ utang Alice: $4,000 \text{ USDC}$.
  - Jaminan yang disita protokol (pokok + bonus 5%):
    $$\text{Nilai Sitaan} = 4,000 \times 1.05 = \$4,200 \implies \frac{4,200}{900} \approx 4.667 \text{ ETH}$$
  - Keuntungan Bersih Bot: Menjual 4.667 ETH di pasar seharga $\$4,200$, meraih laba instan **$\$200 \text{ USDC}$**.
- **Kondisi Akhir Rekening Alice:**
  - Sisa utang: $\$4,000 \text{ USDC}$.
  - Sisa jaminan: $10 - 4.667 = 5.333 \text{ ETH}$ (bernilai $\$4,800$).
  - Pemulihan Nilai Solvensi: $HF = \frac{4,800 \times 0.85}{4,000} = \frac{4,080}{4,000} = 1.02$ (Kembali Aman).
- *Visual:* Diagram neraca sebelum dan sesudah likuidasi yang menggambarkan transfer aset jaminan dan pemulihan Health Factor.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Perhitungan nyata dengan angka konkret langkah demi langkah.
- Memperlihatkan bagaimana modal bot menghasilkan laba bersih 200 dolar.
- Membuktikan bagaimana sisa akun Alice terselamatkan dan solvabel kembali di HF 1.02.

**Naskah Tutur (Voiceover Script):**
Mari kita lihat simulasi perhitungannya secara konkret.
Bayangkan Alice menjaminkan sepuluh ETH saat harga pasar seribu dolar per koin, dengan total jaminan sepuluh ribu dolar.
Alice kemudian meminjam delapan ribu dolar USDC.
Dengan batas Liquidation Threshold delapan puluh lima persen, Health Factor Alice berada di posisi aman satu koma nol enam.
Lalu tiba-tiba pasar terkoreksi, dan harga ETH turun menjadi sembilan ratus dolar per koin.
Nilai jaminan Alice anjlok menjadi sembilan ribu dolar, dan Health Factor-nya jatuh ke angka nol koma sembilan lima enam.
Karena sudah berada di bawah satu, posisi Alice langsung terbuka untuk dilikuidasi.
Sebuah bot likuidator melihat peluang ini dan melunasi separuh utang Alice, yaitu empat ribu USDC.
Sesuai aturan bonus lima persen, bot tersebut menerima sitaan ETH senilai empat ribu dua ratus dolar dari jaminan Alice, yang setara dengan sekitar empat koma enam enam tujuh ETH.
Bot langsung menjual ETH tersebut di DEX dan mengantongi laba bersih dua ratus dolar.
Bagi Alice, meskipun dia kehilangan sebagian ETH miliknya sebagai penalti, sisa utangnya kini tinggal empat ribu dolar dan posisi rekeningnya kembali aman dengan Health Factor satu koma nol dua.

---

## Slide 8: Risiko Sistemik: Bad Debt & Protocol Insolvency

### Konten Slide
- **Asumsi Ideal Likuidasi:** Likuidasi berjalan mulus jika harga kolateral turun secara bertahap dan likuiditas perdagangan selalu tersedia.
- **Kondisi Kegagalan Total (Flash Crash):**
  - Jika harga kolateral anjlok drastis dalam satu lompatan blok sebelum bot sempat mengeksekusi likuidasi.
  - Kondisi kolateral di bawah air (*underwater position*):
    $$\text{Nilai Kolateral Riil} < \text{Nilai Utang Terpinjam}$$
- **Terbentuknya Bad Debt (Utang Macet Protokol):**
  - Bot likuidator tidak memiliki insentif finansial untuk melunasi utang peminjam karena nilai jaminan yang disita lebih murah daripada biaya pelunasan utang.
  - Protokol menanggung defisit neraca secara struktural, mengancam dana para depositor lain yang ingin menarik tabungan mereka.
- *Visual:* Bagan neraca defisit di mana nilai kolateral yang jatuh bebas menembus lantai total utang, memicu bad debt.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Likuidasi mengasumsikan pasar bergerak secara kontinu.
- Flash crash mematikan insentif bot karena jaminan sudah tidak bernilai.
- Defisit neraca ini menjadi bad debt yang mengancam keselamatan tabungan depositor.

**Naskah Tutur (Voiceover Script):**
Model likuidasi yang kita bahas tadi mengasumsikan pasar bergerak turun secara mulus dan wajar.
Namun, apa yang terjadi jika pasar kripto mengalami flash crash yang begitu ekstrem hingga harga kolateral terjun bebas dalam hitungan detik?
Jika harga ETH anjlok begitu dalam sampai nilai total jaminan Alice jatuh lebih rendah daripada nilai utang yang dipinjamnya, posisi ini menjadi di bawah air atau underwater.
Pada kondisi ini, sistem insentif kita mati.
Tidak ada satu pun bot likuidator yang mau melunasi utang Alice sebesar delapan ribu dolar jika jaminan yang bisa disita nilainya hanya tinggal tujuh ribu dolar.
Melunasi posisi tersebut berarti menanggung kerugian langsung bagi si bot.
Akibatnya, posisi utang tersebut terbengkalai dan menjadi Bad Debt atau utang macet protokol.
Jika utang macet ini dibiarkan menumpuk, protokol akan mengalami insolvensi sistemik di mana para penyimpan dana tidak bisa lagi menarik uang mereka dari brankas.

---

## Slide 9: Studi Kasus Nyata: Black Thursday MakerDAO (Maret 2020)

### Konten Slide
- **Tragedi Black Thursday (12 Maret 2020):**
  - Harga ETH anjlok lebih dari $50\%$ dalam kurun waktu 24 jam akibat kepanikan pasar global.
  - Mempool Ethereum mengalami kemacetan parah; gas fee melonjak tajam hingga ratusan gwei.
- **Kemacetan Jaringan & Zero-Bid Auctions:**
  - Transaksi bot likuidator reguler gagal atau tersangkut di antrean mempool akibat setelan gas fee yang terlalu rendah.
  - Segelintir operator bot canggih menyiarkan transaksi lelang dengan priority fee luar biasa tinggi tanpa saingan.
  - Operator ini memenangkan lelang kolateral MakerDAO dengan penawaran konyol: **0 DAI** per transaksi lelang jaminan ETH.
- **Dampak Finansial Fatal:**
  - Likuidator membawa kabur lebih dari **$8 juta jaminan ETH secara cuma-cuma**.
  - MakerDAO menderita **bad debt lebih dari $4 juta**, memicu krisis likuiditas pertama dalam sejarah stablecoin DAI.
- *Visual:* Timeline krisis Black Thursday 2020: pasar runtuh -> gas mempool macet -> transaksi 0 DAI tembus -> timbulnya lubang utang macet 4 juta dolar.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Krisis terparah dalam sejarah DeFi pada awal pandemi 2020.
- Gas fee melesat tinggi membuat bot likuidator umum macet.
- Attacker memenangkan lelang agunan ETH dengan tawaran 0 DAI.

**Naskah Tutur (Voiceover Script):**
Skenario buruk ini benar-benar terjadi secara nyata di lingkungan produksi pada peristiwa legendaris Black Thursday, tanggal dua belas Maret 2020.
Saat kepanikan pandemi melanda dunia, harga ETH ambruk lebih dari lima puluh persen hanya dalam waktu dua puluh empat jam.
Seluruh pengguna panik berbondong-bondong memindahkan aset, mengakibatkan antrean mempool Ethereum tersumbat total dan biaya gas melonjak ke level yang belum pernah terjadi sebelumnya.
Bot likuidator biasa tersangkut di mempool karena gas fee mereka terlalu rendah.
Melihat kekacauan ini, segelintir operator bot likuidator canggih mengirimkan transaksi dengan priority gas fee yang sangat tinggi.
Karena tidak ada saingan di ruang lelang likuidasi MakerDAO, bot-bot ini memasukkan penawaran sebesar nol DAI untuk memenangkan jaminan ETH ribuan dolar.
Hasilnya sangat mengerikan: mereka berhasil menyita lebih dari delapan juta dolar kolateral ETH nyaris tanpa membayar satu sen pun.
MakerDAO seketika terperosok ke dalam krisis solvensi dengan lubang bad debt lebih dari empat juta dolar.

---

## Slide 10: Lapisan Pertahanan Protokol Melawan Bad Debt

### Konten Slide
- **Arsitektur Pertahanan Berlapis (Multi-Tiered Backstops):** Protokol DeFi modern menerapkan tiga garis pertahanan modal untuk menyerap utang macet:
  1. *Garis Pertahanan 1: Protocol Reserve Factor (Dana Cadangan Kas)*
     Sebagian kecil dari seluruh pendapatan bunga pinjaman disisihkan secara permanen ke kas perbendaharaan darurat untuk menutup defisit awal.
  2. *Garis Pertahanan 2: Backstop Staking Module (Modul Pengaman Komunitas)*
     Pengguna men-stake token protokol (seperti token AAVE) untuk mendapatkan imbal hasil.
     Jika terjadi krisis likuiditas parah, sistem secara otomatis melakukan pemotongan (*slashing*) hingga **30 persen aset staking** untuk dijual demi menutup defisit.
  3. *Garis Pertahanan 3: Flop Debt Auctions (Lelang Rekapitalisasi Darurat)*
     MakerDAO mengeksekusi lelang pencetakan token governance baru (MKR) dari ketiadaan di pasar terbuka untuk menyerap dan membakar bad debt DAI.
- **Biaya Tata Kelola:** Pemegang token tata kelola menanggung risiko dilusi kepemilikan sebagai ganti kekuasaan mengelola parameter risiko protokol.
- *Visual:* Diagram tiga lapis tameng pelindung: Reserve Treasury -> Staking Slashing Module -> Governance Mint & Debt Auction.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga lapis tameng penyelamat solvensi protokol saat terjadi krisis.
- Reserve factor menyerap guncangan ringan dari akumulasi fee.
- Slashing staking modul dan debt auction mencetak token governance untuk rekapitalisasi sistem.

**Naskah Tutur (Voiceover Script):**
Bagaimana protokol DeFi bangkit dan memastikan mereka tidak akan pernah bangkrut dari bad debt?
Arsitektur modern membangun tiga garis pertahanan modal yang sangat kokoh.
Garis pertahanan pertama adalah Reserve Factor.
Setiap kali ada peminjam yang membayar bunga, sebagian kecil potongan bunga tersebut dialirkan ke brankas cadangan kas protokol untuk menyerap guncangan awal.
Jika cadangan kas tidak cukup, sistem masuk ke garis pertahanan kedua: Safety Staking Module, seperti yang diterapkan oleh Aave.
Para pemegang token AAVE dapat mengunci token mereka di modul keamanan untuk mendapatkan yield harian.
Namun jika terjadi peristiwa defisit pasar, smart contract memiliki wewenang otomatis untuk memotong atau men-slash hingga tiga puluh persen dari total aset staking tersebut guna menambal utang macet.
Dan garis pertahanan terakhir adalah Debt Auction, seperti yang dilakukan MakerDAO pasca-Black Thursday.
Protokol mencetak token governance baru langsung dari kode, lalu melelangnya di pasar terbuka untuk mengumpulkan stablecoin demi melunasi sisa utang.
Pemegang token tata kelola terdilusi, tetapi solvensi sistem tetap berhasil diselamatkan seutuhnya.

---

## Slide 11: Dynamic Interest Rates: The Kinked Utilization Curve

### Konten Slide
- **Penetapan Suku Bunga Otonom:** Tidak ada rapat dewan gubernur bank sentral; suku bunga pinjaman dihitung setiap blok berdasarkan **Utilization Rate ($U$)**:
  $$U = \frac{\text{Total Modal Dipinjam}}{\text{Total Modal Disetor}}$$
- **Model Kurva Suku Bunga Kinked (Piecewise Linear):**
  - *Di Bawah Titik Optimal ($U < U_{\text{optimal}}$, misal $80\%$):* Modal menganggur melimpah.
    Suku bunga pinjaman dibuat sangat rendah (misal: $2\%$ - $4\%$) untuk merangsang aktivitas peminjaman.
  - *Di Atas Titik Optimal ($U > U_{\text{optimal}}$):* Cadangan kas likuid mulai menipis tajam.
    Kurva suku bunga menukik vertikal secara drastis (mencapai $50\%$ hingga $100\%$ APR).
- **Mekanisme Penyeimbangan Insentif Finansial:**
  - Lonjakan bunga ekstrem memaksa para peminjam segera melunasi utang mereka untuk menghindari beban biaya pinjaman selangit.
  - Tingginya yield tabungan menarik depositor baru berbondong-bondong menyetor likuiditas segar ke dalam pool.
  - Pemanfaatan pool otomatis kembali turun ke level optimal, menjamin depositor selalu dapat mencairkan tabungan mereka.
- *Visual:* Grafik kurva suku bunga patah (kinked curve) yang melesat naik vertikal saat pemanfaatan modal menembus angka optimal 80%.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bunga DeFi tidak ditentukan oleh bankir, melainkan oleh rasio utilitas pool.
- Kurva patah (kinked) membuat bunga melompat vertikal jika kas menipis di atas 80%.
- Tekanan bunga tinggi otomatis memulihkan likuiditas penarikan bagi depositor.

**Naskah Tutur (Voiceover Script):**
Pilar terakhir dari pasar uang desentralistik adalah penentuan suku bunga.
Berbeda dengan bank konvensional di mana suku bunga ditentukan oleh rapat tertutup dewan bank sentral, suku bunga di protokol DeFi dihitung secara algoritmis di setiap detik berdasarkan tingkat utilisasi pool.
Tingkat utilisasi mengukur rasio antara berapa banyak uang yang sedang dipinjam dibandingkan total uang yang tersedia di dalam brankas.
Protokol menerapkan model kurva patah atau kinked interest rate curve dengan titik optimal di kisaran delapan puluh persen.
Selama utilisasi masih di bawah delapan puluh persen, suku bunga dipasang sangat rendah untuk mendorong orang meminjam.
Namun begitu pinjaman melewati titik optimal dan cadangan kas mulai menipis, kurva suku bunga seketika menukik tajam ke atas, melonjak hingga lima puluh atau seratus persen setahun.
Hukuman bunga yang luar biasa mahal ini memicu dua respons pasar secara serentak: para peminjam buru-buru melunasi utang mereka, dan para penyimpan modal luar berbondong-bondong menyetor dana demi merebut bunga tabungan raksasa.
Dalam hitungan menit, saldo kas pool kembali aman dan depositor dijamin selalu bisa menarik tabungan mereka kapan saja.

---

## Slide 12: Jembatan ke Modul Berikutnya

### Konten Slide
- **Arsitektur Kredit Otonom Berhasil Dibangun:** Kita telah membedah bagaimana pasar pinjaman menjaga solvensi melalui over-collateralization, formula Health Factor, bot likuidator, dan kurva suku bunga dinamis.
- **Ketergantungan pada Token Tata Kelola:** Seluruh protokol ini, mulai dari MakerDAO, Aave, hingga Compound, bergantung pada native governance tokens untuk mengelola parameter risiko dan menyerap kerugian sistemik.
- **Tantangan Desain Insentif Jangka Panjang:**
  - Mencetak token baru sangatlah mudah, tetapi mendesain token yang nilainya berkelanjutan adalah masalah teori permainan yang sangat kompleks.
  - Mengapa skema liquidity mining era DeFi Summer runtuh akibat serbuan modal tentara bayaran (*mercenary capital*)?
  - Bagaimana model Vote-Escrowed (veToken) menyelaraskan komitmen modal jangka panjang hingga 4 tahun?
- **Materi Modul Berikutnya:** Membedah kurva emisi pasokan, jadwal vesting token, dan perang perebutan likuiditas veToken: **Tokenomics and Economic Incentive Design**.
- *Visual:* Ilustrasi transisi dari protokol pinjaman kredit menuju arsitektur desain insentif ekonomi tokenomics dan penguncian veToken.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pasar kredit sudah selesai, sekarang kita melangkah ke penggerak ekonominya: tokenomics.
- Mengapa yield farming masa lalu gagal dan modal tentara bayaran kabur.
- Teaser materi modul 5.4: Model veToken dari Curve dan perang insentif ekonomi.

**Naskah Tutur (Voiceover Script):**
Kita telah menelusuri bagaimana pasar kredit terdesentralisasi menjaga solvensi finansial tanpa perlu satu pun biro kredit atau juru sita pengadilan.
Namun jika kalian perhatikan, seluruh arsitektur ini bergantung erat pada token tata kelola seperti MKR, AAVE, dan COMP.
Token-token inilah yang mengatur parameter risiko, menentukan aset apa yang boleh menjadi jaminan, dan bertindak sebagai jaring pengaman terakhir saat bad debt melanda.
Namun, sekadar mencetak token baru di atas blockchain adalah hal yang sangat sepele.
Mendesain token yang nilainya bertahan lama dan mampu menyatukan insentif ribuan pelaku ekonomi anonim adalah tantangan ilmu komputer dan game theory yang sangat berat.
Mengapa skema yield farming pada era DeFi Summer 2020 berakhir hancur oleh aksi kuras modal tentara bayaran?
Dan bagaimana model Vote-Escrowed yang dipelopori oleh Curve Finance berhasil mengubah spekulan jangka pendek menjadi penjaga protokol sejati?
Di modul berikutnya, kita akan membedah seni dan sains dari perancangan insentif ekonomi: Tokenomics and Economic Incentive Design.
Sampai jumpa di modul selanjutnya.
