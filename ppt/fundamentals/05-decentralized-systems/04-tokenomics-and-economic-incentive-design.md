# Tokenomics and Economic Incentive Design
Modul Presentasi: Decentralized Systems (05.4)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Tokenomics and Economic Incentive Design
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Teori permainan insentif protokol, taksonomi aset, kurva emisi pasokan (Bitcoin vs Ethereum), jadwal vesting, kegagalan modal tentara bayaran, dan mekanisme Vote-Escrowed (veToken).
- *Visual:* Bagan interaksi tokenomics yang memperlihatkan aliran nilai protokol antara emisi token, mekanisme penguncian veToken, dan distribusi arus kas nyata.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul 5.4: Tokenomics.
- Membedah bagaimana kode smart contract mengkoordinasikan manusia tanpa ada kantor fisik atau bos.
- Mempelajari mengapa model yield farming lama gagal dan bagaimana model veToken menyelesaikannya.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul keempat: Tokenomics and Economic Incentive Design.
Pada modul-modul terdahulu, kita telah membedah bagaimana protokol keuangan terdesentralisasi mengeksekusi perdagangan dan pasar utang tanpa perantara manusia.
Namun, ada satu pertanyaan mendasar yang belum kita jawab: bagaimana sebuah sistem perangkat lunak sumber terbuka mampu menarik ribuan orang untuk menyetorkan modal miliaran dolar tanpa adanya kantor fisik, dewan direksi, atau gaji bulanan?
Jawabannya adalah Tokenomics, perpaduan antara teori permainan, ekonomi moneter, kriptografi, dan ilmu komputer.
Hari ini kita akan membedah bagaimana kebijakan pasokan Bitcoin dan Ethereum dirancang.
Kita juga akan mempelajari kegagalan fatal era liquidity mining tahun 2020, serta bagaimana mekanisme Vote-Escrowed atau veToken mengubah spekulan jangka pendek menjadi penjaga likuiditas jangka panjang.

---

## Slide 2: Tokenomics sebagai Mesin Koordinasi Tanpa Perusahaan Fisik

### Konten Slide
- **Keuangan Perusahaan Tradisional:**
  - Perusahaan mengelola modal melalui arus kas operasional, neraca keuangan, dan pembagian dividen.
  - Kepatuhan hukum dan koordinasi karyawan diatur oleh anggaran dasar korporasi, kontrak kerja tertulis, dan pengawasan regulator sekuritas.
- **Realitas Protokol Terdesentralisasi:**
  - Protokol Web3 adalah kumpulan smart contract otonom di atas blockchain publik tanpa kantor pusat, departemen HR, atau yurisdiksi tunggal.
  - Untuk bertahan hidup, menarik modal likuiditas, dan mengamankan jaringan, protokol wajib menyelaraskan insentif ribuan aktor anonim yang mementingkan keuntungan pribadi.
- **Definisi Tokenomics (Token Economics):**
  - Desain mekanisme (*mechanism design*) yang merekayasa aturan insentif matematis agar tindakan egois individu secara otomatis menghasilkan keamanan dan keberlanjutan bagi ekosistem secara keseluruhan.
- *Visual:* Ilustrasi perbandingan: korporasi piramida vertikal tradisional vs jaringan mesh terdesentralisasi yang digerakkan oleh tokenomics otonom.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tidak ada bos, tidak ada HRD, tidak ada kontrak kerja kertas.
- Bagaimana ribuan orang anonim mau bekerja bersama mengamankan protokol?
- Tokenomics mendesain aturan main agar kepentingan egois individu memperkuat sistem.

**Naskah Tutur (Voiceover Script):**
Di dunia korporasi tradisional, sebuah perusahaan bisa berjalan karena ada struktur komando piramida yang jelas.
Ada CEO, dewan direksi, kontrak kerja hukum, dan rekening bank perusahaan.
Namun protokol desentralistik tidak memiliki kantor pusat, tidak memiliki manajer HRD, dan tidak terikat pada satu yurisdiksi negara mana pun.
Protokol hanyalah susunan kode smart contract yang hidup di atas blockchain.
Agar ribuan orang asing di seluruh dunia bersedia menyumbangkan daya komputasi, menyetorkan tabungan mereka, dan menjaga keamanan sistem, kita membutuhkan mesin koordinasi ekonomi baru.
Inilah hakikat dari Tokenomics.
Tokenomics adalah cabang ilmu mechanism design yang merancang formula insentif finansial di level kode.
Tujuannya adalah memastikan bahwa ketika setiap individu bertindak rasional demi mengejar keuntungan pribadinya sendiri, tindakan tersebut secara otomatis memperkuat dan mengamankan seluruh jaringan ekosistem.

---

## Slide 3: Taksonomi Fungsional Kriptoaset

### Konten Slide
- **1. Bahan Bakar Jaringan (Network Gas Tokens):**
  - Aset dasar lapisan pertama yang wajib dibayarkan kepada validator untuk membeli ruang blok komputasi eksekusi (seperti BTC, ETH, SOL).
  - Permintaan pasar berskala linear langsung dengan volume transaksi dan utilisasi jaringan.
- **2. Hak Tata Kelola (Governance Tokens):**
  - Memberikan hak suara (*voting power*) atas perubahan parameter risiko, peningkatan kode smart contract, dan alokasi dana perbendaharaan treasury (seperti UNI, AAVE, COMP).
- **3. Modal Jaminan & Validasi (Work / Staking Tokens):**
  - Aset yang dikunci sebagai jaminan untuk melakukan pekerjaan komputasi atau konsensus (seperti validator PoS atau node oracle).
  - Pelanggaran aturan konsensus dihukum melalui pemotongan jaminan (*slashing*).
- **4. Penangkapan Nilai Nyata (Value-Accrual Tokens):**
  - Token yang menangkap surplus ekonomi protokol melalui mekanisme pembelian kembali dan pembakaran (*buyback-and-burn*) atau pembagian arus kas biaya riil langsung kepada pemegang token (seperti veCRV dan MKR).
- *Visual:* Kuadran taksonomi tokenomics yang membedakan gas utility, governance, staking collateral, dan cash flow value capture.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tidak semua token kripto memiliki fungsi ekonomi yang sama.
- Empat peran kunci: Gas jaringan, voting tata kelola, jaminan staking, dan penangkap nilai riil.
- Nilai token jangka panjang ditentukan oleh utilitas dan penangkapan arus kasnya.

**Naskah Tutur (Voiceover Script):**
Sebelum kita merancang model token, kita harus memahami taksonomi fungsional dari aset kripto.
Secara garis besar, ada empat peran ekonomi utama yang bisa diemban oleh sebuah token.
Pertama adalah gas token atau bahan bakar jaringan seperti ETH dan SOL.
Token ini wajib dibayar untuk membeli ruang blok komputasi, sehingga permintaannya tumbuh seiring dengan bertambahnya volume transaksi di jaringan.
Kedua adalah governance token seperti UNI dan AAVE, yang memberikan hak voting politik atas kas perbendaharaan dan perubahan parameter protokol.
Ketiga adalah work atau staking token, di mana modal dikunci sebagai jaminan untuk melakukan tugas validasi blok dengan ancaman slashing jika curang.
Dan keempat adalah value-accrual token, yaitu token yang dirancang untuk menangkap pendapatan riil protokol, baik lewat pembagian dividen biaya transaksi maupun lewat mekanisme buyback-and-burn.
Memahami peran token ini adalah kunci dalam menilai fundamental ekonomi suatu proyek.

---

## Slide 4: Dinamika Pasokan: Fixed Cap Bitcoin

### Konten Slide
- **Arsitektur Batas Mutlak Bitcoin:** Menegakkan batas pasokan maksimal secara matematis sebesar **21 juta koin**:
  $$\text{Max Supply} = \sum_{i=0}^{32} 210,000 \times \frac{50}{2^i} \approx 20,999,999.976 \text{ BTC}$$
- **Mekanisme Halving Berkala:**
  - Setiap 210,000 blok (kurang lebih empat tahun sekali), subsidi pencetakan blok dipotong separuh ($50 \to 25 \to 12.5 \to 6.25 \to 3.125 \dots$).
  - Subsidi blok akan mencapai angka nol satoshi pada sekitar tahun 2140 setelah 64 peristiwa halving.
- **Transisi Keamanan Jangka Panjang:** Setelah subsidi blok berakhir, validator penambang akan bergantung sepenuhnya pada biaya transaksi pengguna (*transaction fees*) untuk mendanai keamanan hash rate jaringan.
- **Tesis Moneter Kelangkaan Mutlak:** Kurva emisi yang sama sekali tidak elastis terhadap lonjakan permintaan pasar memastikan daya beli unit moneter terlindungi dari devaluasi inflasi buatan.
- *Visual:* Grafik tangga penurunan subsidi blok Bitcoin berdampingan dengan kurva asimtot logaritmik mendekati 21 juta koin.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Formula deret geometri membuktikan batas kaku 21 juta koin Bitcoin.
- Halving memotong emisi koin setiap empat tahun sekali hingga tahun 2140.
- Tantangan masa depan: keamanan jaringan harus didanai murni dari fee transaksi pengguna.

**Naskah Tutur (Voiceover Script):**
Mari kita telusuri model pasokan moneter pertama dan paling terkenal: batas mutlak Bitcoin.
Satoshi Nakamoto menetapkan aturan moneter yang tidak dapat diubah di tingkat kode, yaitu batas kaku dua puluh satu juta koin.
Angka ini diturunkan secara matematis dari deret geometri subsidi blok.
Setiap dua ratus sepuluh ribu blok, atau kira-kira empat tahun sekali, laju pencetakan koin baru dipotong separuh melalui mekanisme halving.
Mulai dari lima puluh koin per blok di awal 2009, menyusut bertahap hingga menyentuh angka nol pada sekitar tahun 2140.
Tesis ekonominya sangat lugas: pasokannya bersifat inelastis sempurna terhadap permintaan pasar.
Sebanyak apa pun orang menginginkan Bitcoin, pasokannya tidak bisa dipompa secara artifisial seperti uang fiat perbankan sentral.
Namun kebijakan ini menyimpan tantangan jangka panjang: ketika subsidi blok habis, keamanan jaringan harus didanai sepenuhnya dari biaya transaksi pengguna.

---

## Slide 5: Dinamika Pasokan: Keseimbangan Dinamis Ethereum

### Konten Slide
- **Ketiadaan Batas Kaku (No Fixed Cap):** Kebijakan moneter Ethereum dikendalikan oleh dua gaya ekonomi yang saling berlawanan (*Dynamic Supply Equilibrium*):
  $$\Delta \text{Pasokan} = \text{Emisi Staking Proof-of-Stake} - \text{Pembakaran Base Fee EIP-1559}$$
- **Komponen 1: Emisi Staking PoS (Gaya Inflasi Lembut):**
  - Protokol mencetak ETH baru secara berkala untuk menggaji validator Proof-of-Stake yang menjaga konsensus.
  - Laju inflasi tahunan sangat rendah, berkisar antara $0.5\%$ hingga $0.8\%$, sebanding dengan akar kuadrat total ETH yang di-stake.
- **Komponen 2: Pembakaran Base Fee EIP-1559 (Gaya Deflasi Otomatis):**
  - Setiap transaksi di jaringan Ethereum membakar 100 persen base fee yang dibayarkan pengguna, melenyapkan ETH dari sirkulasi selamanya.
- **Kondisi Ultrasound Money:**
  - Saat aktivitas on-chain tinggi (DeFi, NFT, rollup batch settlement), laju pembakaran melampaui laju emisi baru, menyebabkan total suplai beredar **berkurang (deflasi)**.
  - Pasokan moneter mengembang dan menyusut secara otonom mengikuti utilitas riil ekosistem.
- *Visual:* Neraca timbangan dinamis antara kran pencetakan validator PoS dan cerobong pembakaran base fee EIP-1559.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ethereum tidak memiliki batas kaku 21 juta, melainkan sistem ekuilibrium dinamis.
- Emisi validator menambah pasokan secara stabil, EIP-1559 membakar pasokan di setiap transaksi.
- Pasokan ETH bisa menyusut (deflasi) saat jaringan ramai digunakan.

**Naskah Tutur (Voiceover Script):**
Berbeda dengan Bitcoin yang menerapkan batas kaku, Ethereum memilih pendekatan ekuilibrium dinamis yang sering disebut sebagai Ultrasound Money.
Ethereum tidak memiliki batas jumlah koin maksimal.
Jumlah pasokannya ditentukan oleh pertarungan dua kekuatan ekonomi setiap detiknya: emisi staking dan pembakaran base fee EIP-1559.
Di satu sisi, jaringan mencetak ETH baru dalam jumlah kecil sekitar nol koma lima persen setahun untuk memberi upah para validator Proof-of-Stake.
Namun di sisi lain, sejak aktivasi EIP-1559, seluruh base fee dari setiap transaksi di Ethereum dibakar dan dimusnahkan secara permanen dari sirkulasi.
Ketika aktivitas aplikasi DeFi, NFT, dan rollup Layer 2 sedang ramai, jumlah ETH yang dibakar setiap hari jauh lebih besar daripada jumlah ETH baru yang dicetak.
Akibatnya, total pasokan ETH di dunia justru menyusut atau mengalami deflasi.
Sistem ini menciptakan kebijakan moneter otonom di mana kelangkaan aset secara otomatis mencerminkan kegunaan riil dari jaringan komputasinya.

---

## Slide 6: Alokasi Token & Anatomi Vesting Schedules

### Konten Slide
- **Struktur Alokasi Peluncuran Token (Genesis Allocation):**
  - *Komunitas & Ekosistem (40% - 60%):* Insentif likuiditas, airdrop pengguna awal, dan hibah dana perbendaharaan (*treasury*).
  - *Tim Pendiri & Kontributor Inti (15% - 25%):* Kompensasi bagi tim pengembang protokol.
  - *Investor Awal / Venture Capital (15% - 25%):* Pemodal bibit yang mendanai riset dan audit keamanan.
  - *Yayasan Protokol (5% - 10%):* Operasional riset jangka panjang dan kepatuhan hukum.
- **Bahaya Dumping Hari Pertama:** Jika investor dan tim menerima token yang likuid di hari pertama, mereka terdorong menjual seluruh kepemilikan kepada publik, membanting harga hingga nol.
- **Anatomi Jadwal Vesting Kontrak Pintar:**
  - *Cliff Period (misal 1 Tahun):* Masa pembekuan mutlak di mana nol persen token dapat dicairkan.
    Kontributor yang hengkang sebelum masa cliff kehilangan haknya sepenuhnya.
  - *Linear Unlock (3 hingga 4 Tahun):* Token terbuka secara bertahap setiap detik atau setiap blok untuk mencegah pasokan membanjiri pasar sekunder secara mendadak.
- *Visual:* Grafik kurva pelepasan token: periode beku horizontal (cliff) diikuti garis miring pelepasan linier selama 4 tahun.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Alokasi token menentukan siapa yang mengendalikan masa depan proyek.
- Bahaya dumping tim dan investor awal jika token langsung cair di awal.
- Kontrak vesting mengunci token dengan cliff satu tahun dan pelepasan linier bertahap.

**Naskah Tutur (Voiceover Script):**
Ketika sebuah protokol meluncurkan token baru, cara mereka membagi alokasi awal menentukan apakah proyek tersebut akan berumur panjang atau hancur dalam hitungan minggu.
Biasanya alokasi dibagi ke empat kantong: kas komunitas, tim inti pengembang, investor modal ventura, dan yayasan ekosistem.
Tantangan terbesarnya adalah godaan moral hazard.
Jika tim pengembang dan investor menerima seratus persen token mereka secara cair di hari pertama, insentif mereka akan rusak.
Mereka sangat berpotensi menjual seluruh token mereka di bursa ke pembeli ritel, lalu meninggalkan proyek begitu saja.
Untuk mencegah hal ini, smart contract menerapkan jadwal vesting yang sangat ketat.
Aturan standarnya menggunakan masa cliff selama satu tahun, yaitu masa pembekuan total di mana tidak ada satu pun token yang boleh dicairkan.
Setelah masa cliff terlewati, token dibuka secara bertahap dan linear setiap detiknya selama tiga hingga empat tahun berikutnya.
Jadwal vesting mengikat nasib finansial para pendiri dengan keberhasilan jangka panjang proyek.

---

## Slide 7: Era DeFi Summer: Mekanisme Liquidity Mining

### Konten Slide
- **Kelahiran Yield Farming (Musim Panas 2020):** Compound meluncurkan token tata kelola COMP, mengawali era ledakan likuiditas *DeFi Summer*.
- **Mekanisme Kerja Liquidity Mining:**
  - Protokol ingin mendongkrak Total Value Locked (TVL) dengan cepat untuk memenangkan persaingan pasar.
  - Siapa pun yang menyetorkan modal pinjaman atau likuiditas perdagangan dihadiahi token tata kelola gratis di setiap blok penambangan.
- **Efek Ledakan Likuiditas Awal:**
  - Imbal hasil persentase tahunan (*Annual Percentage Rate / APR*) melonjak drastis hingga ratusan bahkan ribuan persen.
  - Modal miliaran dolar mengalir deras masuk ke dalam kontrak protokol dalam hitungan minggu.
  - Metrik valuasi token meroket akibat euforia spekulasi global.
- *Visual:* Bagan putaran cepat liquidity mining: setoran modal -> penerimaan token reward inflasi gratis -> pelaporan TVL melesat tinggi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Fenomena DeFi Summer 2020 dimulai oleh peluncuran token COMP.
- Pengguna diberi token gratis setiap blok hanya karena menaruh uang di protokol.
- APR ribuan persen memicu histeria spekulasi dan lonjakan TVL kilat.

**Naskah Tutur (Voiceover Script):**
Pada musim panas tahun 2020, sebuah eksperimen ekonomi baru memicu ledakan yang dikenal sebagai DeFi Summer.
Pemicunya adalah peluncuran token COMP oleh protokol Compound melalui mekanisme yang disebut Liquidity Mining atau yield farming.
Konsep dasarnya sangat sederhana dan memikat.
Untuk menarik pengguna menyetorkan modal sebanyak-banyaknya ke dalam protokol, Compound mencetak token tata kelola baru di setiap blok dan membagikannya secara cuma-cuma kepada siapa saja yang mendepositokan dana.
Tiba-tiba saja, pengguna bisa meraih imbal hasil tahunan atau APR hingga ratusan bahkan ribuan persen hanya dengan memarkir tabungan mereka.
Miliaran dolar modal mengalir masuk ke dalam ekosistem DeFi dalam hitungan minggu.
Namun, di balik euforia keuntungan instan tersebut, tersimpan celah kelemahan game-theoretic yang sangat mematikan.

---

## Slide 8: Jebakan Mercenary Capital & Spiral Kematian

### Konten Slide
- **Karakteristik Modal Tentara Bayaran (Mercenary Capital):**
  - Pemilik modal besar (*yield farmers*) tidak memiliki loyalitas ideologis atau komitmen jangka panjang terhadap protokol.
  - Beroperasi murni secara oportunistik mengejar yield tertinggi di mana pun berada.
- **Spiral Kematian "Farm and Dump" (The Death Spiral Loop):**
  1. Protokol mencetak token reward dalam volume inflasi raksasa setiap blok.
  2. Yield farmer memanen token gratis setiap jam dan langsung menjualnya (*dumping*) di bursa DEX untuk ditukar ke ETH atau stablecoin.
  3. Tekanan jual algoritmis yang masif membanting harga token protokol hingga anjlok lebih dari $90\%$.
  4. Karena harga token hancur, imbal hasil APR farming runtuh seketika dari $100\%$ menjadi $2\%$.
  5. Mercenary capital seketika mencairkan seluruh modal likuiditasnya dan berpindah ke protokol baru berikutnya (*total liquidity flight*).
- **Hasil Akhir Tragis:** Protokol kehilangan likuiditas dalam hitungan jam, harga token hancur lebur, dan komunitas pengguna organik musnah.
- *Visual:* Diagram melingkar vicious cycle: Cetak Token -> Dump ke Pasar -> Harga Runtuh -> APR Habis -> Modal Kabur -> Proyek Mati.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Yield tinggi dibayar oleh inflasi token baru yang tidak berharga.
- Petani yield langsung menjual token hadiah setiap detik ke pasar.
- Siklus kehancuran: harga jatuh membuat modal tentara bayaran kabur seketika.

**Naskah Tutur (Voiceover Script):**
Eksperimen liquidity mining generasi pertama segera memperlihatkan borok strukturalnya: jebakan modal tentara bayaran atau mercenary capital.
Para yield farmer yang menyetor modal miliaran dolar ini sama sekali tidak peduli pada visi atau kelangsungan protokol.
Mereka beroperasi dengan satu algoritma sederhana: setiap detik token hadiah dicetak, mereka langsung mengklaimnya dan seketika membanting token tersebut di Uniswap untuk ditukar menjadi ETH atau dolar tunai.
Ini adalah pola klasik farm and dump.
Karena tidak ada pembeli organik yang mampu menampung jutaan token hasil cetakan inflasi gratis setiap harinya, harga token protokol terjun bebas hingga sembilan puluh persen lebih.
Begitu harga token hancur, yield farming yang tadinya ratusan persen mendadak anjlok menjadi nol koma sekian persen.
Dalam hitungan detik, para paus tentara bayaran ini menarik seluruh likuiditas mereka dan kabur mencari proyek baru berikutnya.
Protokol yang ditinggalkan berakhir menjadi kota hantu: kas likuiditasnya kosong melompong dan harga tokennya hancur lebur.

---

## Slide 9: Solusi Vote-Escrowed (veToken): Mekanisme veCRV

### Konten Slide
- **Revolusi Desain Insentif Curve Finance (2020):** Michael Egorov merancang model **Vote-Escrowed (veToken)** untuk menghentikan fenomena farm and dump secara permanen.
- **Prinsip Dasar Penguncian Tanpa Pembatalan (Irrevocable Time-Lock):**
  - Pengguna tidak lagi dapat memanfaatkan token governance biasa secara spekulatif.
  - Untuk memperoleh hak istimewa protokol, pengguna wajib **mengunci token CRV** ke dalam smart contract selama **1 minggu hingga 4 tahun**.
  - Sekali dikunci, token mustahil ditarik kembali sebelum durasi timer kontrak habis, apa pun yang terjadi pada harga pasar.
- **Pemberian Token Internal veCRV:**
  - Pengunci menerima saldo akuntansi non-transferable bernama **veCRV**.
  - veCRV tidak dapat diperdagangkan di DEX dan tidak dapat dipindahkan antar-alamat (*soulbound-like accounting balance*).
- **Tiga Hak Istimewa Eksklusif Pemegang veCRV:**
  1. *Hak Suara Gauge Weights:* Menentukan alokasi emisi token ke pool likuiditas mingguan.
  2. *Bagi Hasil Arus Kas Nyata:* Menerima hak langsung atas $50\%$ dari seluruh fee perdagangan platform.
  3. *Boost Imbal Hasil Likuiditas:* Meraih pelipatgandaan yield LP hingga $2.5\times$ lipat.
- *Visual:* Alur konversi: Token CRV cair masuk brankas penguncian waktu -> mencetak veCRV non-transferable -> membuka akses fee riil dan hak voting.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Curve Finance memecahkan masalah ini dengan model Vote-Escrowed (veToken).
- Pengguna dipaksa mengunci token hingga 4 tahun tanpa bisa ditarik.
- Menukar token spekulasi menjadi hak atas arus kas riil dan wewenang emisi.

**Naskah Tutur (Voiceover Script):**
Untuk menghentikan spiral kematian modal tentara bayaran ini, Michael Egorov merancang model Vote-Escrowed atau veToken di Curve Finance.
Curve menyadari bahwa masalah utama token tata kelola konvensional adalah ketidaksesuaian horizon waktu.
Spekulan bisa memegang token selama satu menit, merusak sistem, lalu menjualnya tanpa menanggung risiko apa pun.
Curve mengubah aturan main secara radikal: jika kalian ingin mendapatkan hak istimewa di protokol, kalian wajib mengunci token CRV kalian ke dalam smart contract selama minimal satu minggu hingga maksimal empat tahun penuh.
Kuncian ini bersifat irrevocable: sekali dikunci, tidak ada tombol darurat, tidak ada bantuan admin, dan token tersebut mustahil ditarik hingga kontraknya jatuh tempo.
Sebagai gantinya, kalian menerima saldo internal bernama veCRV.
Token veCRV ini tidak bisa dijual di Uniswap karena tidak bisa ditransfer.
Tetapi veCRV memberikan tiga kekuatan super: hak menentukan arah emisi token baru, pelipatgandaan imbal hasil deposit hingga dua koma lima kali lipat, dan hak menerima separuh dari seluruh pendapatan riil fee perdagangan di platform Curve.

---

## Slide 10: Dinamika Matematika veToken

### Konten Slide
- **Persamaan Bobot Hak Suara Waktu Terbobot:** Kekuatan suara veCRV berskala linear dengan durasi penguncian modal:
  $$\text{Saldo veCRV} = \text{Jumlah CRV Terkunci} \times \frac{\text{Sisa Waktu Terkunci}}{4 \text{ Tahun}}$$
- **Contoh Perhitungan Bobot Saldo:**
  - Mengunci 1 CRV selama 4 tahun penuh: Menghasilkan **1.0 veCRV**.
  - Mengunci 1 CRV selama 2 tahun: Menghasilkan **0.5 veCRV**.
  - Mengunci 1 CRV selama 1 tahun: Menghasilkan **0.25 veCRV**.
- **Mekanisme Peluruhan Linear (Linear Decay):**
  - Seiring berjalannya waktu kalender menuju tanggal pembukaan kunci, saldo hak suara veCRV meluruh secara linear menuju angka nol.
  - Untuk mempertahankan hak suara dan dividen maksimal, pemegang token secara berkala memperpanjang durasi kunci kembali ke 4 tahun (*rolling lock*).
- **Dampak Game-Theoretic:** Memaksa para pemilik modal bertindak demi kesehatan protokol empat tahun ke depan, melenyapkan insentif manipulasi harga jangka pendek.
- *Visual:* Grafik garis peluruhan linear veToken yang menurun dari 1.0 ke 0 seiring waktu, dan efek tangga reset jika masa kunci diperpanjang.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Matematika sederhana: kunci 4 tahun dapat 1.0 suara, kunci 1 tahun cuma dapat 0.25 suara.
- Kekuatan suara meluruh setiap hari seiring mendekatnya masa jatuh tempo.
- Pengguna terdorong untuk terus memperpanjang kunci demi mempertahankan hak dividen.

**Naskah Tutur (Voiceover Script):**
Mari kita lihat logika matematika di balik veCRV.
Kekuatan hak suara dan pembagian dividen dihitung berdasarkan bobot waktu yang sangat presisi.
Jika kalian mengunci satu koin CRV selama empat tahun penuh, kalian akan mendapatkan bobot maksimal satu koma nol veCRV.
Tetapi jika kalian hanya mengunci selama satu tahun, kalian hanya berhak atas nol koma dua lima veCRV.
Yang sangat menarik adalah mekanisme linear decay atau peluruhan linear.
Begitu waktu berjalan, hari demi hari saldo veCRV kalian akan menyusut secara bertahap menuju angka nol saat kontrak jatuh tempo.
Artinya, jika kalian ingin mempertahankan kekuatan hak suara dan arus kas dividen maksimal, kalian dipaksa secara berkala memperbarui kunci kalian kembali ke batas empat tahun.
Dari kacamata game theory, ini adalah desain yang brilian.
Seseorang yang rela mengunci modalnya selama empat tahun ke depan tidak akan pernah mendukung kebijakan sembrono yang bisa membunuh protokol minggu depan.
Mereka kini memiliki kepentingan hidup-mati yang selaras penuh dengan masa depan protokol.

---

## Slide 11: Perang Likuiditas & Pasar Suap: The Curve Wars

### Konten Slide
- **Pemicu Perang: Wewenang Gauge Weights:**
  - Setiap pekan, para pemegang veCRV memberikan suara untuk menentukan berapa persentase emisi CRV harian yang dialokasikan ke masing-masing liquidity pool.
  - Likuiditas pool yang dalam adalah syarat hidup-mati bagi proyek stablecoin (seperti Frax, Abracadabra, atau Synthetix) agar pasak harganya stabil.
- **Kelahiran Perang Terbuka (The Curve Wars):**
  - Puluhan protokol DeFi berebut memborong token CRV di pasar bebas untuk dikunci selama 4 tahun demi menguasai voting emisi bagi pool mereka sendiri.
- **Agregator Kekuatan Suara: Convex Finance:**
  - Convex menawarkan retail imbal hasil likuid (cvxCRV) tanpa harus mengunci dana 4 tahun sendiri.
  - Berhasil memonopoli lebih dari **$50\%$ dari seluruh hak suara veCRV** di seluruh dunia.
- **Pasar Suap Terbuka (Bribe Markets via Votium):**
  - Mengubah lobi politik menjadi pasar tunai efisien: proyek menyetor insentif suap bernilai jutaan dolar setiap minggu langsung ke dompet pemegang veCRV yang memilih pool mereka.
- *Visual:* Diagram ekosistem Curve Wars: Protokol Luar menyetor Suap -> Platform Votium -> Pemegang veCRV/Convex memilih Gauge -> Aliran Emisi CRV terarah.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Hak suara veCRV menjadi komoditas paling diperebutkan di industri DeFi.
- Lahirnya Convex Finance yang memonopoli suara dan likuiditas Curve.
- Bribe markets melegalkan insentif suap transparan di atas blockchain.

**Naskah Tutur (Voiceover Script):**
Karena pemegang veCRV memiliki wewenang mingguan untuk menentukan ke mana arah emisi koin baru dibagikan, meletuslah peristiwa fenomenal yang disebut The Curve Wars.
Bagi proyek-proyek penerbit stablecoin baru, memiliki kolam likuiditas yang dalam di Curve adalah urusan hidup dan mati agar pasak harga mereka tidak jebol.
Satu-satunya cara agar penyedia likuiditas mau berkumpul di pool mereka adalah dengan memastikan pool tersebut mendapatkan siraman emisi reward CRV yang deras.
Maka, terjadilah perlombaan antar-protokol untuk memborong CRV sebanyak-banyaknya di pasar terbuka dan menguncinya selama empat tahun demi memenangkan voting mingguan.
Kondisi ini memicu lahirnya Convex Finance, sebuah platform yang mengumpulkan token CRV dari pengguna ritel hingga berhasil menguasai lebih dari separuh seluruh kekuatan suara veCRV di dunia.
Fenomena ini bahkan melahirkan Bribe Markets seperti platform Votium, di mana proyek-proyek stablecoin secara terbuka membayar jutaan dolar uang insentif suap setiap pekan langsung ke dompet para pemilih yang mengarahkan suara ke pool mereka.
Tata kelola terdesentralisasi berevolusi menjadi pasar modal arus kas riil yang sangat efisien.

---

## Slide 12: Jembatan ke Modul Berikutnya

### Konten Slide
- **Mesin Insentif Telah Dipahami:** Kita telah menelusuri bagaimana desain tokenomics, kurva pasokan, jadwal vesting, dan model veToken menyatukan kepentingan ribuan aktor finansial secara berkelanjutan.
- **Pertanyaan Institusional Tertinggi:** Token bukan sekadar instrumen penangkap nilai ekonomi, melainkan mandat kekuasaan politik berdaulat di atas kode.
- **Siapa Pengendali Hak Istimewa Kontrak?**
  - Siapa yang berhak menaikkan suku bunga cadangan, mencairkan dana perbendaharaan bernilai ratusan juta dolar, dan meng-upgrade bytecode smart contract?
  - Korporasi konvensional mengandalkan ruang rapat dewan direksi yang tertutup dan rentan korupsi.
- **Materi Modul Berikutnya:** Membedah siklus proposal on-chain, kontrak GovernorBravo, periode timelock, Quadratic Voting, dan mekanisme ragequit: **Decentralized Autonomous Organizations (DAOs)**.
- *Visual:* Ilustrasi transisi dari model ekonomi tokenomics menuju ruang parlemen tata kelola on-chain dan pemungutan suara proposal DAO.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Insentif ekonomi sudah selaras, tapi siapa yang memegang kendali kekuasaan protokol?
- Mengapa kita butuh institusi baru untuk mengelola kas ratusan juta dolar tanpa direktur.
- Teaser materi modul 5.5: Tata kelola DAO, Governor contracts, dan pertahanan ragequit.

**Naskah Tutur (Voiceover Script):**
Kita telah membedah bagaimana tokenomics bertindak sebagai mesin koordinasi otonom yang menyatukan ribuan aktor independen di seluruh dunia.
Kita melihat bagaimana matematika emisi dan model penguncian veToken mampu menghentikan aksi buang modal dan menyelaraskan horizon investasi hingga bertahun-tahun ke depan.
Namun, hal ini langsung mengantar kita pada pertanyaan institusional paling mendasar: siapa yang sebenarnya mengendalikan kode tersebut?
Ketika sebuah protokol berhasil mengumpulkan kas perbendaharaan bernilai ratusan juta dolar dan mengelola miliaran dolar modal likuiditas, siapa yang berhak memutuskan pembaruan kode, alokasi dana hibah, dan perubahan parameter darurat?
Di dunia korporasi lama, keputusan ini diambil di balik pintu tertutup oleh segelintir dewan direksi yang rentan kongkalikong.
Di dunia Web3, fungsi kelembagaan ini diambil alih oleh institusi baru yang berjalan murni di atas kode: Decentralized Autonomous Organizations atau DAO.
Di modul penutup dari Chapter 5 ini, kita akan membedah bagaimana demokrasi digital on-chain dijalankan tanpa perantara: Decentralized Autonomous Organizations.
Sampai jumpa di modul selanjutnya.
