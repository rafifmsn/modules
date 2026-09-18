# Automated Market Makers and Liquidity Pools
Modul Presentasi: Decentralized Systems (05.2)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Automated Market Makers and Liquidity Pools
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Mekanika pertukaran aset tanpa izin melalui formula invarian konstan ($x \cdot y = k$), kolam likuiditas bersama, dinamika impermanent loss, dan likuiditas terkonsentrasi.
- *Visual:* Ilustrasi grafik kurva hiperbolik Uniswap dengan pergeseran cadangan token X dan token Y akibat transaksi perdagangan.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul 5.2.
- Mengupas bagaimana matematika menggantikan bursa saham tradisional.
- Membedah formula x * y = k, kalkulasi fee, dan risiko penyedia likuiditas.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kedua: Automated Market Makers and Liquidity Pools.
Pada modul sebelumnya, kita sudah membedah bagaimana aset digital distandarisasi lewat ERC-20, ERC-721, dan ERC-1155.
Sekarang pertanyaannya: setelah token-token tersebut ada di blockchain, bagaimana cara kita memperdagangkannya tanpa bergantung pada perantara terpusat seperti Wall Street atau bursa kripto konvensional?
Hari ini kita akan mempelajari salah satu penemuan paling elegan dalam sejarah ilmu komputer finansial.
Kita akan membedah bagaimana Uniswap dan Automated Market Maker menggantikan buku pesanan rumit dengan formula matematika sederhana x kali y sama dengan k.
Kita juga akan menurunkan rumus swap secara matematis, mengukur dampak harga, dan menganalisis risiko impermanent loss yang dihadapi oleh para penyedia likuiditas.

---

## Slide 2: Keterbatasan Order Book Tradisional

### Konten Slide
- **Pondasi Keuangan Tradisional:** Central Limit Order Book (CLOB) mencocokkan pesanan beli (*bids*) dan jual (*asks*) secara mikrodetik di server bursa (seperti NASDAQ atau Binance).
- **Ketergantungan pada Market Maker:** Lembaga institusi profesional secara aktif memasang dan memperbarui ribuan pesanan limit di kedua sisi buku untuk menyediakan likuiditas.
- **Kegagalan Total CLOB di Ethereum Layer 1 (Era EtherDelta 2016 - 2017):**
  - Setiap pemasangan pesanan, pembatalan (*cancellation*), dan penyesuaian harga mewajibkan satu transaksi on-chain.
  - Interval blok 12 detik dan biaya gas yang berfluktuasi membuat market maker rentan terkena front-running oleh bot arbitrase latensi.
  - Biaya gas harian yang sangat tinggi membangkrutkan penyedia likuiditas sebelum perdagangan tereksekusi.
- *Visual:* Perbandingan alur CLOB tradisional yang macet oleh transaksi gas on-chain vs eksekusi instan berbasis pool.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Order book bekerja hebat di server terpusat, tetapi gagal di blockchain.
- Menaruh ribuan order dan pembatalan di Ethereum memakan biaya gas raksasa.
- EtherDelta membuktikan bahwa DeFi butuh paradigma perdagangan yang benar-benar baru.

**Naskah Tutur (Voiceover Script):**
Di dunia keuangan konvensional, setiap bursa efek dan pertukaran kripto terpusat beroperasi menggunakan Central Limit Order Book atau CLOB.
Sistem ini mengandalkan buku pesanan yang mencocokkan tawaran beli dan jual secara real-time.
Agar pasar tetap likuid, perusahaan market maker profesional harus terus-menerus memperbarui ribuan pesanan setiap detik.
Namun ketika para insinyur mencoba membawa model ini ke Ethereum pada tahun 2016 lewat platform seperti EtherDelta, sistemnya hancur berantakan.
Di blockchain publik, setiap tindakan memasang order atau membatalkan order membutuhkan biaya gas dan waktu tunggu konfirmasi blok.
Market maker tidak bisa memperbarui kuotasi harga dengan cepat untuk merespons pergerakan pasar.
Akibatnya, mereka terus-menerus menjadi korban arbitrase dan merugi besar karena membayar gas transaksi yang tidak ada habisnya.
Komunitas menyadari bahwa kita tidak bisa sekadar menyalin arsitektur Wall Street ke dalam buku besar terdistribusi.

---

## Slide 3: Pergeseran Paradigma: Order Book vs Liquidity Pool

### Konten Slide
- **Model CLOB (Peer-to-Peer Matching):**
  - Membutuhkan kecocokan bilateral yang presisi: harga sama, volume pas, dan waktu sinkron antara pembeli dan penjual.
  - Likuiditas bersifat pasif dan terfragmentasi pada level harga tertentu.
- **Model AMM (Peer-to-Contract Trading):**
  - Menghilangkan pencocokan antar-individu secara langsung.
  - Trader berinteraksi langsung dengan cadangan dana yang tersimpan di dalam smart contract (*Liquidity Pool*).
- **Penyedia Likuiditas Pasif (Liquidity Providers / LP):**
  - Siapa pun dapat menyetorkan sepasang token bernilai setara ke dalam pool.
  - Trader menyetor Token X ke dalam kontrak dan menarik Token Y berdasarkan perhitungan invarian deterministik.
- *Visual:* Bagan perbandingan model CLOB (pembeli mencari penjual) vs model AMM (trader bertransaksi langsung melawan smart contract pool).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tidak ada lagi tawar-menawar antara pembeli dan penjual manusia.
- Trader menukar token langsung melawan smart contract cadangan dana.
- Liquidity provider menyetor dana dan menerima bagi hasil biaya transaksi secara pasif.

**Naskah Tutur (Voiceover Script):**
Terobosan besar yang membuka era Decentralized Finance adalah pergeseran dari peer-to-peer matching menjadi peer-to-contract trading.
Dalam model Automated Market Maker atau AMM, tidak ada lagi pembeli yang menunggu penjual datang pada harga yang sama.
Sebagai gantinya, ribuan investor independen menyetorkan aset mereka ke dalam sebuah wadah modal bersama yang disebut Liquidity Pool.
Ketika Alice ingin menukar token ETH miliknya menjadi token USDC, Alice tidak perlu mencari orang lain yang sedang ingin membeli ETH.
Alice cukup mengirimkan token ETH langsung ke dalam smart contract liquidity pool tersebut.
Smart contract kemudian menghitung berapa jumlah token USDC yang berhak diterima oleh Alice berdasarkan formula matematika yang deterministik, lalu mengirimkan USDC tersebut seketika ke dompet Alice.
Seluruh proses berlangsung otomatis, instan, dan tanpa perantara pihak ketiga.

---

## Slide 4: Invarian Constant Product: x * y = k

### Konten Slide
- **Formula Inti Uniswap V2:** Diatur oleh persamaan matematis Constant Product Market Maker (CPMM):
  $$x \cdot y = k$$
- **Definisi Variabel:**
  - $x$: Total cadangan saldo Token X yang tersimpan di dalam smart contract pool.
  - $y$: Total cadangan saldo Token Y yang tersimpan di dalam smart contract pool.
  - $k$: Nilai konstanta invarian yang wajib dijaga nilainya agar tidak berkurang selama transaksi pertukaran berlangsung.
- **Prinsip Keseimbangan Kekal:**
  - Menyetor aset Token X ke dalam pool mengharuskan pengeluaran sejumlah aset Token Y sedemikian rupa sehingga hasil kali kedua cadangan tetap setara minimal senilai $k$.
  - Transaksi perdagangan hanya memindahkan posisi cadangan di sepanjang garis kurva tanpa mengubah nilai dasar $k$ sebelum biaya transaksi dihitung.
- *Visual:* Diagram alur status cadangan awal (x, y), penambahan delta x, pengurangan delta y, dan verifikasi invarian konstan.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Salah satu persamaan terpenting di Web3: x kali y sama dengan k.
- Nilai k tidak boleh berkurang saat terjadi pertukaran token.
- Semakin banyak token ditarik dari kolam, harganya akan melonjak secara otomatis.

**Naskah Tutur (Voiceover Script):**
Inti dari Uniswap V2 digerakkan oleh formula yang sangat elegan: x dikali y sama dengan k.
Di sini, x mewakili saldo cadangan token pertama di dalam pool, misalnya ETH.
Sementara y mewakili saldo cadangan token kedua di dalam pool, misalnya USDC.
Sedangkan k adalah konstanta invarian yang nilainya harus selalu terjaga konstan selama proses swap terjadi.
Aturan mainnya sangat sederhana: berapa pun token yang ingin kalian tukar, hasil perkalian saldo akhir kedua token di dalam pool tidak boleh lebih kecil daripada nilai k awal.
Jika kalian memasukkan sejumlah token X ke dalam kontrak, cadangan token X bertambah.
Agar nilai k tetap sama, smart contract harus mengeluarkan sejumlah token Y kepada kalian.
Mekanisme ini menciptakan penyesuaian harga otomatis murni berdasarkan hukum penawaran dan permintaan di dalam cadangan pool.

---

## Slide 5: Karakteristik Kurva Hiperbolik

### Konten Slide
- **Bentuk Geometris Kurva:** Persamaan $y = \frac{k}{x}$ membentuk kurva hiperbola halus asimtotik pada bidang koordinat Kartesius.
- **Sifat Asimtotik Kurva:**
  - Ketika cadangan $x$ mendekati tak terhingga, cadangan $y$ mendekati nol, membuat nilai marjinal Token Y bernilai tak terhingga mahal.
  - Ketika cadangan $x$ mendekati nol, nilai marjinal Token X melonjak menuju tak terhingga mahal.
- **Jaminan Matematis Likuiditas Tak Pernah Habis:**
  - Kurva hiperbola tidak pernah menyentuh sumbu vertikal maupun sumbu horizontal untuk nilai perdagangan berhingga ($x > 0$ dan $y > 0$).
  - Smart contract secara matematis mustahil kehabisan cadangan token secara total karena harga aset akan melonjak tajam sebelum saldo mencapai angka nol.
- *Visual:* Plot grafik hiperbola bidang Kartesius memperlihatkan kurva y = k / x yang asimtotik terhadap kedua sumbu koordinat.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kurva hiperbola menjamin pool tidak akan pernah kosong total.
- Semakin langka suatu token di dalam pool, harganya akan menjadi tak terhingga mahal.
- Perbedaan mendasar dengan sistem konvensional yang bisa mengalami fenomena order book kosong.

**Naskah Tutur (Voiceover Script):**
Jika kita memetakan persamaan x kali y sama dengan k ke dalam grafik koordinat Kartesius, kita akan melihat bentuk kurva hiperbola yang sangat khas.
Kurva ini memiliki sifat asimtotik terhadap kedua sumbu koordinat.
Artinya, kurva ini tidak akan pernah menyentuh garis nol, baik di sumbu horizontal maupun sumbu vertikal.
Secara finansial, ini adalah jaminan matematis bahwa pool AMM tidak akan pernah kehabisan saldo token secara total.
Semakin banyak kalian menguras token Y dari dalam pool, pasokannya akan semakin langka.
Sesuai kurva, harga marjinal untuk menarik sisa token berikutnya akan melonjak secara eksponensial menuju tak hingga sebelum saldo token tersebut habis.
Sifat ini memberikan ketahanan luar biasa bagi protokol DeFi dibandingkan sistem konvensional yang bisa mengalami kekosongan antrean order sewaktu-waktu.

---

## Slide 6: Penurunan Matematis Rumus Swap dengan Fee

### Konten Slide
- **Biaya Transaksi Standar Uniswap V2:** Fee sebesar 0.30 persen dialokasikan penuh kepada penyedia likuiditas ($\gamma = 0.997$ atau pengali $99.7\%$).
- **Langkah Penurunan Formula:**
  1. Status awal pool memenuhi:
     $$x \cdot y = k$$
  2. Nilai setoran efektif setelah dipotong trading fee:
     $$\Delta x_{\text{effective}} = 0.997 \cdot \Delta x$$
  3. Menjaga invarian produk konstan setelah perdagangan:
     $$(x + 0.997 \cdot \Delta x)(y - \Delta y) = x \cdot y$$
  4. Menyelesaikan nilai token keluar ($\Delta y$):
     $$y - \Delta y = \frac{x \cdot y}{x + 0.997 \cdot \Delta x}$$
     $$\Delta y = y - \frac{x \cdot y}{x + 0.997 \cdot \Delta x} = \frac{y(x + 0.997 \cdot \Delta x) - x \cdot y}{x + 0.997 \cdot \Delta x}$$
  5. Rumus akhir jumlah token yang diterima trader:
     $$\Delta y = \frac{0.997 \cdot \Delta x \cdot y}{x + 0.997 \cdot \Delta x}$$
- *Visual:* Persamaan aljabar bertahap yang membuktikan penurunan rumus token output delta y pada smart contract pair Uniswap.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Fee 0.3% langsung dipotong di awal dari token input.
- Penurunan aljabar menghasilkan formula deterministik untuk delta y.
- Rumus ini yang dieksekusi on-chain di setiap panggilan fungsi swap.

**Naskah Tutur (Voiceover Script):**
Sekarang mari kita bedah logika matematika yang dieksekusi smart contract Uniswap pada setiap transaksi.
Uniswap V2 menerapkan potongan biaya sebesar nol koma tiga persen pada setiap swap untuk mengganjar para penyedia likuiditas.
Ini berarti hanya sembilan puluh sembilan koma tujuh persen dari token yang disetor trader yang masuk ke dalam perhitungan invarian.
Jika Alice memasukkan delta x token, jumlah efektifnya adalah nol koma sembilan sembilan tujuh dikali delta x.
Setelah swap terjadi, perkalian cadangan token X yang baru dengan cadangan token Y yang tersisa harus tetap sama dengan k awal.
Melalui manipulasi aljabar sederhana, kita bisa mengisolasi nilai delta y, yaitu jumlah token Y yang berhak dibawa pulang oleh Alice.
Hasil akhirnya adalah rumus yang sangat rapi: delta y sama dengan nol koma sembilan sembilan tujuh dikali delta x dikali y, dibagi dengan x ditambah nol koma sembilan sembilan tujuh delta x.
Formula satu baris inilah yang dieksekusi secara instan oleh kontrak pasangan Uniswap di setiap blok Ethereum.

---

## Slide 7: Contoh Numerik Swap & Fenomena Price Impact

### Konten Slide
- **Kondisi Awal Liquidity Pool:**
  - Cadangan Token X (ETH): $x = 100 \text{ ETH}$
  - Cadangan Token Y (USDC): $y = 300,000 \text{ USDC}$
  - Spot Price: $\frac{300,000}{100} = \$3,000 \text{ per ETH}$
  - Nilai Invarian $k = 100 \times 300,000 = 30,000,000$
- **Simulasi Transaksi Swap Alice:** Alice menjual **$10 \text{ ETH}$** ($\Delta x = 10$).
  1. Setoran efektif setelah fee: $0.997 \times 10 = 9.97 \text{ ETH}$.
  2. Penyebut rumus: $100 + 9.97 = 109.97$.
  3. Pembilang rumus: $9.97 \times 300,000 = 2,991,000$.
  4. Hasil output token diterima:
     $$\Delta y = \frac{2,991,000}{109.97} \approx 27,198.32 \text{ USDC}$$
- **Analisis Price Impact:**
  - Ekspektasi nilai spot: $10 \times 3,000 = \$30,000 \text{ USDC}$.
  - Realisasi nilai eksekusi: Alice hanya menerima $\$27,198.32 \text{ USDC}$ (rata-rata harga $\$2,719.83 \text{ per ETH}$).
  - Terjadi deviasi sebesar **$\$2,801.68$ (hampir $9.3\%$)** akibat pergeseran rasio cadangan pool oleh ukuran transaksi Alice.
- *Visual:* Grafik pergeseran titik koordinat pool sebelum dan sesudah swap 10 ETH yang menunjukkan kenaikan lereng harga eksekusi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Perhitungan nyata dengan angka: jual 10 ETH di spot 3.000 dolar.
- Alice kehilangan hampir 2.800 dolar dari ekspektasi harga spot.
- Mengapa terjadi deviasi harga besar?
- Ukuran transaksi terlalu masif dibandingkan kedalaman pool (Price Impact).

**Naskah Tutur (Voiceover Script):**
Mari kita uji rumus tadi dengan contoh angka di dunia nyata.
Bayangkan sebuah pool Uniswap memiliki cadangan seratus ETH dan tiga ratus ribu USDC.
Harga spot teoretis saat itu adalah tiga ribu dolar per ETH.
Sekarang, Alice datang ingin menjual sepuluh ETH sekaligus ke dalam pool tersebut.
Jika memakai logika harga spot biasa, Alice mungkin berharap mendapatkan tiga puluh ribu USDC penuh.
Namun ketika kita masukkan angka sepuluh ETH ini ke dalam rumus matematis Uniswap dengan fee nol koma tiga persen, hasilnya sangat mengejutkan.
Alice ternyata hanya menerima sekitar dua puluh tujuh ribu seratus sembilan puluh delapan USDC.
Harga rata-rata eksekusi yang diterima Alice anjlok menjadi sekitar dua ribu tujuh ratus dua puluh dolar per ETH.
Alice kehilangan hampir dua ribu delapan ratus dolar dari ekspektasi awalnya.
Mengapa hal ini bisa terjadi?
Karena transaksi Alice bernilai sepuluh persen dari seluruh likuiditas pool, sehingga transaksinya menggeser rasio cadangan secara signifikan di sepanjang kurva hiperbola.
Fenomena deterministik inilah yang disebut sebagai Price Impact.

---

## Slide 8: Price Impact vs Slippage

### Konten Slide
- **Price Impact (Mekanisme Internal Pool):**
  - Pergeseran harga yang bersifat pasti (*deterministik*) akibat ukuran order relatif terhadap total kedalaman cadangan pool.
  - Bersumber langsung dari kurva matematika $x \cdot y = k$ di dalam satu eksekusi transaksi tunggal.
  - Solusi mitigasi: memecah ukuran order menjadi bagian kecil atau memperbesar modal pool likuiditas.
- **Slippage (Latensi Jaringan & Dinamika Mempool):**
  - Deviasi antara harga yang diharapkan saat tombol swap ditekan dan harga aktual saat transaksi berhasil divalidasi ke dalam blok.
  - Bersumber dari transaksi trader lain atau bot MEV yang dieksekusi lebih dahulu di mempool selama jendela konfirmasi blok 12 detik.
  - Solusi mitigasi: menetapkan batas toleransi slippage (*slippage tolerance*) di antarmuka dompet (transaksi otomatis revert jika deviasi melewati batas).
- *Visual:* Diagram komparasi bercabang: Price Impact (bergerak di kurva AMM) vs Slippage (antrean blok mempool yang mengubah harga awal).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Banyak pengguna salah kaprah menyamakan slippage dan price impact.
- Price impact adalah sifat matematis kurva akibat ukuran order kita sendiri.
- Slippage adalah risiko eksternal akibat pergerakan transaksi orang lain di mempool.

**Naskah Tutur (Voiceover Script):**
Banyak pengguna DeFi sering tertukar antara istilah price impact dan slippage.
Keduanya adalah fenomena yang sangat berbeda secara arsitektur.
Price impact adalah konsekuensi matematis internal yang mutlak terjadi akibat ukuran transaksi kalian sendiri terhadap kedalaman pool.
Jika kalian menjual volume besar di kolam yang dangkal, harga pasti memburuk secara deterministik di sepanjang kurva x kali y sama dengan k.
Sebaliknya, slippage adalah risiko eksternal yang timbul karena latensi jaringan.
Ketika kalian menekan tombol swap di dompet, transaksi kalian harus mengantre di mempool selama beberapa detik sebelum dimasukkan ke dalam blok.
Jika di detik-detik tersebut ada pengguna lain atau bot arbitrase yang mengeksekusi order lebih dulu, harga awal pool sudah bergeser saat giliran kalian tiba.
Untuk melindungi diri dari pergeseran liar ini, aplikasi dompet menyediakan batas toleransi slippage yang akan membatalkan transaksi jika harga bergeser melampaui ambang batas aman.

---

## Slide 9: Penyediaan Likuiditas & LP Share Tokens

### Konten Slide
- **Pencetakan Saham Likuiditas (LP Tokens):** Saat investor menyetor sepasang aset dengan nilai setara, smart contract mencetak token ERC-20 LP sebagai bukti kepemilikan proporsional atas cadangan pool.
- **Deposit Perdana (Inisialisasi Pool via Geometric Mean):**
  - Jumlah token LP perdana dihitung menggunakan rata-rata geometris:
    $$S_{\text{minted}} = \sqrt{x_0 \cdot y_0} - 1,000$$
- **Pertahanan Minimum Liquidity Burn (1,000 Wei):**
  - Uniswap V2 membakar seribu unit share perdana secara permanen ke alamat nol (`0x000...000`).
  - Mencegah serangan First Depositor Inflation Attack, di mana penyerang sengaja memanipulasi harga per share dari pool kosong untuk mencuri deposit pengguna berikutnya melalui pembulatan desimal (*rounding truncation*).
- **Deposit Lanjutan & Penarikan Modal:**
  - Investor berikutnya menerima share proporsional: $S_{\text{minted}} = \min\left(\frac{\Delta x}{x} S, \frac{\Delta y}{y} S\right)$.
  - Saat menarik modal, LP membakar token share mereka untuk mencairkan porsi cadangan terkini ditambah akumulasi fee perdagangan.
- *Visual:* Alur siklus setoran modal seimbang -> pencetakan token bukti LP -> akumulasi fee perdagangan -> pembakaran token untuk penarikan dana.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bagaimana pool pertama kali mendapatkan modal dari masyarakat.
- Pembakaran 1.000 unit awal melindungi pool dari serangan inflasi share.
- Investor mendapatkan token LP yang dapat ditebus kapan saja bersama akumulasi fee.

**Naskah Tutur (Voiceover Script):**
Dari mana modal ratusan juta dolar di dalam pool AMM berasal?
Modal tersebut disediakan oleh Liquidity Provider independen seperti kita semua.
Ketika seorang LP menyetor sepasang token bernilai seimbang, smart contract akan mencetak token bukti kepemilikan proporsional yang disebut LP Share Token.
Ketika pool pertama kali dibuat dari nol, jumlah LP token awal dihitung menggunakan rata-rata geometris: akar kuadrat dari x nol dikali y nol.
Perhatikan bahwa Uniswap sengaja membakar seribu unit fraksi share pertama ke alamat nol selamanya.
Langkah teknis ini sangat brilian untuk mencegah serangan First Depositor Inflation Attack.
Tanpa pembakaran ini, penyerang awal bisa memanipulasi nilai per share di pool kosong untuk mencuri saldo penyetor berikutnya lewat eksploitasi pembulatan angka integer di Solidity.
Bagi penyetor berikutnya, mereka menerima share proporsional sesuai rasio cadangan, dan berhak mencairkan kembali modal mereka beserta akumulasi fee nol koma tiga persen kapan saja.

---

## Slide 10: Impermanent Loss: Definisi & Formula Matematis

### Konten Slide
- **Definisi Impermanent Loss (IL):** Penurunan nilai total portofolio yang dialami penyedia likuiditas dibandingkan jika mereka hanya menyimpan aset yang sama secara pasif di dompet pribadi (*HODL strategy*).
- **Mekanisme Terjadinya IL via Arbitrase:**
  - Saat harga pasar eksternal melonjak, harga di dalam pool AMM tertinggal sementara.
  - Trader arbitrase membeli aset murah dari dalam pool dan memasukkan aset yang terdepresiasi hingga rasio harga pool kembali seimbang dengan pasar global.
  - Akibatnya, pool LP selalu berakhir memegang lebih sedikit aset yang harganya terbang dan lebih banyak aset yang harganya turun.
- **Formula Matematis Penurunan Nilai:** Misalkan rasio pergeseran harga aset adalah $r = \frac{P_{\text{baru}}}{P_{\text{lama}}}$:
  $$\text{IL}(r) = \frac{2\sqrt{r}}{1 + r} - 1$$
- **Skala Kerugian Relatif:**
  - Kenaikan harga $1.25\times (+25\%)$: IL sebesar $-0.6\%$.
  - Kenaikan harga $2.00\times (+100\%)$: IL sebesar $-5.7\%$.
  - Kenaikan harga $4.00\times (+300\%)$: IL sebesar $-20.0\%$.
- **Mengapa Disebut "Impermanent"?** Kerugian hanya berupa floating loss jika rasio harga kembali ke titik awal deposit.
  Kerugian menjadi permanen saat LP mencairkan likuiditas dalam kondisi harga menyimpang.
- *Visual:* Grafik perbandingan nilai aset strategi HODL di dompet vs strategi LP di pool AMM saat rasio harga berfluktuasi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Menjadi LP tidak bebas risiko: ada bahaya Impermanent Loss.
- Arbitrase memeras aset yang sedang naik daun dari pool LP.
- Rumus IL mengukur selisih antara menaruh dana di pool vs diam di dompet pribadi.

**Naskah Tutur (Voiceover Script):**
Menjadi penyedia likuiditas bukanlah investasi bebas risiko.
Ada risiko matematika inheren yang disebut Impermanent Loss.
Impermanent loss mengukur selisih nilai portofolio antara menyetor aset ke dalam pool AMM versus sekadar menyimpannya secara pasif di dompet pribadi.
Kenapa kerugian ini bisa muncul?
Penyebabnya adalah aktivitas bot arbitrase.
Ketika harga ETH di pasar luar tiba-tiba meroket empat kali lipat, harga di dalam pool Uniswap sempat tertinggal.
Bot arbitrase langsung masuk menyerbu pool: mereka memborong ETH yang murah dari pool dan menimbun USDC ke dalamnya sampai harga pool seimbang kembali.
Akibatnya, portofolio LP sekarang berisi lebih sedikit ETH dan lebih banyak USDC.
Secara matematis, jika rasio harga bergeser dua kali lipat, LP mengalami kerugian nilai relatif sebesar lima koma tujuh persen dibandingkan jika mereka hanya menyimpan aset tersebut di dompet.
Kerugian ini disebut impermanent karena jika harga kembali ke rasio awal, kerugian tersebut lenyap.
Namun jika LP menarik dana saat harga masih timpang, kerugian tersebut terwujud secara permanen.

---

## Slide 11: Invarian Khusus: Curve Stableswap

### Konten Slide
- **Kelemahan Model Constant Product pada Pasangan Stabil:**
  - Model $x \cdot y = k$ menimbulkan price impact yang terlalu tajam untuk aset bernilai paritas setara 1:1 (seperti USDC/USDT, DAI/USDC, atau stETH/ETH).
  - Formula Constant Sum murni ($x + y = C$) menawarkan zero slippage, tetapi pool rentan terkuras habis jika salah satu aset kehilangan pasak harga (*depeg*).
- **Inovasi Kurva Hibrida Stableswap (Michael Egorov / Curve Finance 2019):**
  - Menggabungkan kurva Constant Sum dan Constant Product menggunakan koefisien amplifikasi ($A$).
- **Dinamika Kurva Adaptif:**
  - Di sekitar area pasak 1:1, kurva berbentuk datar menyerupai garis lurus, memberikan kedalaman likuiditas masif dengan slippage mendekati nol.
  - Jika terjadi depegging ekstrem, kurva bertransisi dinamis menyerupai kurva hiperbola konstan untuk mengamankan sisa cadangan modal pool.
- *Visual:* Perbandingan tiga kurva: Constant Sum (garis diagonal lurus), Constant Product (hiperbola tajam), dan Curve Stableswap (datar di tengah, melengkung di ujung).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pasangan stablecoin membutuhkan model efisiensi yang berbeda dari ETH/USDC.
- Constant Sum terlalu rentan habis terkuras, Constant Product terlalu mahal slippage-nya.
- Curve menggabungkan keduanya: nyaris nol slippage pada rasio 1:1, tetapi aman saat terjadi depeg.

**Naskah Tutur (Voiceover Script):**
Meskipun formula x kali y sama dengan k sangat hebat untuk pasangan volatil seperti ETH dan USDC, formula ini sangat tidak efisien untuk aset bernilai setara.
Bayangkan jika kalian ingin menukar satu juta USDC ke USDT.
Kedua aset ini nilainya sama-sama satu dolar.
Sangat tidak masuk akal jika kalian harus terkena price impact besar hanya karena kurva hiperbola Uniswap terlalu melengkung.
Di sisi lain, formula penjumlahan konstan x tambah y sama dengan C menawarkan zero slippage, tetapi sangat berbahaya jika salah satu stablecoin mengalami depegging karena seluruh saldo pool bisa terkuras habis seketika.
Pada tahun 2019, Michael Egorov menciptakan Curve Finance dengan formula Stableswap Invariant.
Curve menggabungkan kurva penjumlahan konstan dan kurva perkalian konstan menggunakan koefisien amplifikasi A.
Hasilnya adalah kurva yang sangat datar di sekitar rasio satu banding satu, memberikan likuiditas ultra-dalam dengan slippage mendekati nol, namun tetap otomatis melengkung jika terjadi krisis depeg demi melindungi dana cadangan.

---

## Slide 12: Evolusi Uniswap V3: Concentrated Liquidity

### Konten Slide
- **Masalah Inefisiensi Modal Uniswap V2:**
  - Likuiditas disebar secara seragam di sepanjang kurva dari harga nol hingga tak terhingga ($[0, \infty)$).
  - Pada pasangan ETH/USDC di kisaran harga $2,500 - $3,500, lebih dari **90 persen modal LP menganggur** di rentang ekstrem (seperti rentang $1 atau $1,000,000) dan tidak menghasilkan fee.
- **Inovasi Concentrated Liquidity Uniswap V3 (Mei 2021):**
  - LP bebas mengalokasikan modal mereka pada rentang batas harga khusus ($[P_{\text{bawah}}, P_{\text{atas}}]$) yang disebut **ticks**.
  - Menghasilkan efisiensi modal hingga **4,000 kali lipat** dibandingkan Uniswap V2 pada rentang harga sempit.
- **Transformasi Representasi Posisi LP (ERC-721 NFT):**
  - Karena rentang harga dan parameter setiap penyetor bersifat kustom, posisi likuiditas tidak lagi identik (*non-fungible*).
  - Posisi likuiditas dicatat sebagai token unik ERC-721 NFT, bukan lagi token fungible ERC-20.
- **Risiko Rentang Harga (Out-of-Range Risk):**
  - Jika harga pasar keluar dari rentang yang ditentukan LP, posisi otomatis terkonversi 100 persen ke aset yang nilainya turun dan berhenti menghasilkan fee sampai harga kembali ke dalam rentang.
- *Visual:* Ilustrasi likuiditas seragam tersebar tipis di V2 vs likuiditas terkonsentrasi tebal di V3 yang diwakili oleh sertifikat NFT posisi LP.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Uniswap V2 memboroskan 90% modal di rentang harga yang tidak pernah tercapai.
- Uniswap V3 memusatkan modal di rentang aktif: efisiensi melonjak hingga 4.000 kali lipat.
- Posisi LP kini unik dan dicatat dalam format ERC-721 NFT.

**Naskah Tutur (Voiceover Script):**
Evolusi terbesar berikutnya terjadi pada Mei 2021 lewat peluncuran Uniswap V3.
Di Uniswap V2, modal penyedia likuiditas disebarkan merata dari harga nol hingga tak terhingga.
Jika ETH sedang diperdagangkan di kisaran tiga ribu dolar, lebih dari sembilan puluh persen modal yang ada di pool sebenarnya tidur menganggur di rentang harga yang mustahil disentuh hari itu.
Efisiensi modalnya sangat rendah.
Uniswap V3 merevolusi sistem ini dengan memperkenalkan Concentrated Liquidity.
Penyedia likuiditas kini bebas memilih rentang harga spesifik tempat modal mereka bekerja, misalnya hanya di antara dua ribu delapan ratus hingga tiga ribu dua ratus dolar.
Dengan memusatkan modal pada rentang yang sempit, kedalaman likuiditas bisa meningkat hingga empat ribu kali lipat dengan modal yang jauh lebih hemat.
Karena setiap LP kini memiliki koordinat rentang harga dan strategi yang berbeda-beda, posisi LP tidak lagi setara satu sama lain.
Posisi likuiditas di Uniswap V3 tidak lagi menggunakan token ERC-20 biasa, melainkan dicetak dalam bentuk ERC-721 NFT.

---

## Slide 13: Jembatan ke Modul Berikutnya

### Konten Slide
- **Mesin Perdagangan Otonom Telah Terkuasai:** Kita telah memahami bagaimana swap spot berjalan tanpa perantara melalui kurva invarian, kolam likuiditas, dan efisiensi modal terarah.
- **Pilar Kedua Sistem Finansial:** Perdagangan spot hanyalah separuh dari roda perekonomian.
  Separuh lainnya adalah infrastruktur kredit, utang, dan peminjaman dana.
- **Tantangan Kredit Tanpa Identitas:**
  - Perbankan konvensional mengandalkan skor kredit FICO, slip gaji, dan ancaman penyitaan aset fisik lewat pengadilan.
  - Di blockchain publik anonim, bagaimana smart contract meminjamkan uang kepada alamat pseudonim tanpa risiko peminjam melarikan diri?
- **Materi Modul Berikutnya:** Membedah arsitektur pasar uang terdesentralisasi, batas pinjaman LTV, formula Health Factor, dan mesin likuidasi otomatis: **Collateralized Lending and Solvency**.
- *Visual:* Ilustrasi transisi dari pool perdagangan token menuju brankas pinjaman dengan kolateral kripto terkunci.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kita sudah menguasai mekanisme pertukaran spot.
- Sekarang giliran infrastruktur kredit dan pinjaman.
- Teaser materi modul 5.3: Over-collateralization, Health Factor, dan protokol Aave/MakerDAO.

**Naskah Tutur (Voiceover Script):**
Kita telah menelusuri bagaimana automated market maker menggantikan peran bursa efek Wall Street dengan cadangan likuiditas dan kurva matematika murni.
Namun, pasar spot hanyalah salah satu pilar dari ekosistem keuangan yang berfungsi utuh.
Pilar besar kedua yang tidak kalah penting adalah sistem kredit dan pinjam meminjam.
Di dunia nyata, bank bersedia meminjamkan uang kepada kalian karena mereka tahu identitas kalian, memeriksa skor kredit, dan punya kuasa hukum untuk menyita rumah kalian jika gagal bayar.
Namun di atas blockchain publik tanpa izin di mana peminjam hanyalah deretan alamat heksadesimal anonim, bagaimana cara kita meminjamkan dana tanpa risiko peminjam kabur membawa lari uang tersebut?
Bagaimana protokol seperti Aave, Compound, dan MakerDAO menciptakan pasar uang yang sepenuhnya solvent menggunakan over-collateralization, rasio pinjaman LTV, dan robot likuidasi otomatis?
Di modul berikutnya, kita akan membedah arsitektur sistem utang terdesentralisasi: Collateralized Lending and Solvency.
Sampai jumpa di modul selanjutnya.
