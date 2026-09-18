# Token Standards and Digital Ownership
Modul Presentasi: Decentralized Systems (05.1)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Token Standards and Digital Ownership
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Transformasi kepemilikan digital dari lisensi privat Web2 menjadi primitif matematika composable berbasis standar ERC-20, ERC-721, dan ERC-1155.
- *Visual:* Diagram evolusi dari database tersentralisasi tertutup menuju ekosistem aset terdesentralisasi yang saling terhubung di atas Ethereum Virtual Machine.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di Chapter 05: Decentralized Systems.
- Membahas fondasi ekonomi aplikasi di atas Ethereum Virtual Machine.
- Mengapa standarisasi kode token menjadi syarat mutlak likuiditas global.

**Naskah Tutur (Voiceover Script):**
Selamat datang di Chapter 05 dari trek Fundamentals: Decentralized Systems.
Pada modul sebelumnya, kita sudah membedah bagaimana Ethereum Virtual Machine mengeksekusi bytecode, menghitung gas, dan membaca realitas dunia luar lewat oracle.
Sekarang kita akan naik satu tingkat ke lapisan aplikasi.
Kita akan membedah primitif ekonomi paling mendasar yang berjalan di atas virtual machine tersebut: standarisasi kepemilikan aset digital.
Hari ini kita akan mengupas mengapa kepemilikan digital sebelum blockchain hanyalah ilusi semu.
Kita juga akan mempelajari bagaimana standar ERC-20, ERC-721, dan ERC-1155 mengubah baris kode menjadi hak milik finansial yang berdaulat dan universal.

---

## Slide 2: Ilusi Kepemilikan Digital Tradisional

### Konten Slide
- **Realitas Web2:** Membeli buku di Kindle, lagu di iTunes, atau skin di game online bukan berarti memiliki aset digital.
- **Lisensi Perangkat Lunak Bersyarat:** Pengguna hanya memegang izin pakai (*revocable license*) yang tersimpan pada private database korporasi.
- **Kerapuhan Sistem Terpusat:**
  - Akun dapat dibekukan secara sepihak atas diskresi korporat.
  - Penutupan server atau kebangkrutan penyedia layanan seketika melenyapkan seluruh aset pengguna.
  - Aset terisolasi total di dalam walled garden dan mustahil dipindahkan lintas platform.
- **Revolusi Blockchain:** Smart contract mengubah kepemilikan digital dari kesepakatan hukum kertas menjadi kepemilikan matematis yang otonom di atas ledger publik tanpa perantara.
- *Visual:* Perbandingan akun database korporat yang dapat disita sepihak vs dompet Web3 yang dikendalikan kunci kriptografi mandiri.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Di Web2 kita tidak memiliki aset, kita hanya menyewa izin akses.
- Database perusahaan bisa mati atau akun bisa diblokir kapan saja.
- Blockchain menghadirkan kedaulatan kepemilikan berbasis aturan kode matematika.

**Naskah Tutur (Voiceover Script):**
Sebelum adanya blockchain yang dapat diprogram, kepemilikan digital sebenarnya adalah ilusi yang sangat rapuh.
Ketika kalian membeli ebook di Kindle atau skin senjata langka di dalam game online, kalian sebenarnya sama sekali tidak memiliki barang tersebut.
Kalian hanya diberikan lisensi perangkat lunak bersyarat yang dicatat di database privat perusahaan.
Kalau perusahaan penerbit bangkrut, server dimatikan, atau akun kalian ditutup karena melanggar kebijakan sepihak, seluruh aset digital tersebut lenyap dalam semalam.
Kalian juga tidak bisa membawa skin game tersebut ke platform lain karena terkurung di dalam walled garden.
Ethereum mengubah paradigma ini secara radikal.
Di atas blockchain, kepemilikan tidak ditentukan oleh syarat dan ketentuan korporat.
Kepemilikan dijamin oleh kode smart contract yang dieksekusi secara otonom pada ledger publik yang netral dan tanpa izin.

---

## Slide 3: Masalah Fragmentasi & Kebutuhan Standarisasi

### Konten Slide
- **Dilema Tanpa Standar:** Jika setiap developer bebas menentukan nama fungsi transfer sesuka hati:
  - Developer A: `transferMoney(address to, uint256 amount)`
  - Developer B: `sendCoins(address receiver, uint256 val)`
  - Developer C: `pay(uint256 tokens, address destination)`
- **Kegagalan Skalabilitas Ekosistem:**
  - Dompet digital, block explorer, dan decentralized exchange (DEX) wajib menulis kode integrasi khusus untuk setiap token individual.
  - Efek jaringan terfragmentasi dan interoperabilitas protokol hancur.
- **Solusi Ethereum Improvement Proposals (EIP):**
  - Standarisasi antarmuka (*interface specification*) universal melalui konsensus komunitas pengembang.
  - Mewujudkan konsep composability: semua aplikasi dapat berinteraksi dengan aset apa pun secara instan tanpa modifikasi kode.
- *Visual:* Ilustrasi adaptor multi-colokan universal yang menghubungkan beragam token ke satu protokol DEX terpadu.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tanpa aturan antarmuka bersama, aplikasi Web3 akan terpecah belah.
- Analogi adaptor colokan listrik global untuk likuiditas.
- EIP menciptakan composability di mana smart contract saling berbicara tanpa custom wrapper.

**Naskah Tutur (Voiceover Script):**
Bayangkan jika setiap developer di dunia bebas membuat fungsi transfer token dengan nama mereka sendiri.
Ada yang menamainya transferMoney, ada yang menulis sendCoins, dan ada yang memakai fungsi pay.
Jika itu terjadi, setiap bursa terdesentralisasi, aplikasi dompet, dan block explorer harus menulis kode integrasi khusus untuk setiap koin baru yang terbit.
Ekosistem finansial terdesentralisasi akan runtuh sebelum sempat berkembang karena biaya koordinasi yang luar biasa tinggi.
Untuk mengatasi hambatan fragmentasi ini, komunitas Ethereum merumuskan spesifikasi teknis bersama melalui proses Ethereum Improvement Proposal atau EIP.
Standar token bukan tentang membatasi kreativitas logika bisnis token.
Standar token adalah kontrak antarmuka universal agar seluruh protokol dan kontrak pintar di dunia dapat berinteraksi secara mulus sejak detik pertama token tersebut di-deploy.

---

## Slide 4: Triad Standar Token Ethereum

### Konten Slide
- **ERC-20 (Fungible Tokens):**
  - Unit aset identik, dapat saling dipertukarkan, dan dapat dibagi menjadi pecahan desimal.
  - Kasus penggunaan: mata uang digital, stablecoin (USDC, DAI), dan voting governance token (UNI, AAVE).
- **ERC-721 (Non-Fungible Tokens / NFT):**
  - Setiap unit memiliki identitas unik (*tokenId*) dan tidak dapat dipertukarkan satu sama lain.
  - Kasus penggunaan: sertifikat properti fisik, karya seni digital, dan domain name ENS.
- **ERC-1155 (Multi-Token Standard):**
  - Standar hibrida yang menampung token fungible, non-fungible, dan semi-fungible dalam satu smart contract tunggal.
  - Kasus penggunaan: inventaris game online, tiket acara berjenjang, dan bundle aset terpaket.
- *Visual:* Pohon taksonomi aset digital Ethereum yang terbagi menjadi ERC-20, ERC-721, dan ERC-1155 beserta atribut kuncinya.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga pilar aset modern di ekosistem Web3.
- Fungible: uang kertas yang nilainya setara satu sama lain.
- Non-Fungible: sertifikat tanah unik yang nomor serinya berbeda.
- Multi-Token: kombinasi keduanya dalam satu kontrak untuk efisiensi tinggi.

**Naskah Tutur (Voiceover Script):**
Seluruh lanskap aset terdesentralisasi hari ini berdiri di atas tiga standar utama.
Pertama adalah ERC-20, standar untuk aset yang fungible atau dapat dipertukarkan secara identik.
Satu unit token ERC-20 memiliki nilai dan fungsi yang sama persis dengan unit lainnya, persis seperti uang kertas atau komoditas.
Kedua adalah ERC-721, standar untuk Non-Fungible Token atau NFT.
Setiap token memiliki nomor identifikasi unik, sehingga cocok untuk mencatat aset yang tidak tergantikan seperti karya seni atau sertifikat tanah.
Ketiga adalah ERC-1155, inovasi standar multi-token yang menggabungkan karakteristik fungible dan non-fungible di dalam satu kontrak yang sama.
Mari kita bedah arsitektur internal dari masing-masing standar ini secara mendalam.

---

## Slide 5: Arsitektur Internal ERC-20

### Konten Slide
- **Hakikat ERC-20:** Smart contract ERC-20 pada dasarnya adalah lembar data saldo (*spreadsheet*) yang disimpan dalam state mapping Solidity.
- **Struktur Data Inti:**
  - `mapping(address => uint256) private _balances;`
    Menghubungkan alamat publik pengguna dengan jumlah saldo token yang dimiliki.
  - `mapping(address => mapping(address => uint256)) private _allowances;`
    Menghubungkan pemilik dana dengan batas kuota pengeluaran yang diizinkan untuk alamat pihak ketiga.
- **Enam Fungsi Wajib Antarmuka IERC20:**
  - `totalSupply()`: Mengembalikan total suplai token yang beredar.
  - `balanceOf(account)`: Membaca saldo token dari alamat tertentu.
  - `transfer(recipient, amount)`: Memindahkan token dari pemanggil fungsi ke alamat tujuan.
  - `allowance(owner, spender)`: Memeriksa sisa batas otorisasi transfer pihak ketiga.
  - `approve(spender, amount)`: Memberikan izin debit dana kepada alamat spender.
  - `transferFrom(sender, recipient, amount)`: Mengeksekusi penarikan token resmi atas nama pihak ketiga.
- *Visual:* Diagram struktur mapping dua tingkat Solidity untuk pencatatan saldo dan kuota allowance.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kontrak ERC-20 bukanlah brankas koin, melainkan buku besar saldo.
- Mapping balances mencatat kepemilikan langsung.
- Mapping allowances membuka kemampuan eksekusi otomatis oleh smart contract lain.

**Naskah Tutur (Voiceover Script):**
Ketika kita memegang token ERC-20 di dompet kita, token tersebut sebenarnya tidak tersimpan secara fisik di perangkat kita.
Kontrak ERC-20 pada dasarnya hanyalah sebuah spreadsheet digital di dalam jaringan Ethereum yang diimplementasikan menggunakan mapping Solidity.
Mapping pertama mencatat saldo tiap alamat akun.
Ketika Alice mengirim token ke Bob menggunakan fungsi transfer biasa, kontrak cukup mengurangi saldo Alice dan menambah saldo Bob.
Namun, masalah besar muncul ketika Alice ingin berinteraksi dengan protokol otomatis seperti Uniswap atau Aave.
Sebuah smart contract tidak bisa mengambil token dari dompet pengguna secara sepihak tanpa izin eksplisit.
Di sinilah mapping kedua, yaitu allowance, memegang peran yang sangat krusial.

---

## Slide 6: Mekanisme Allowance Dua Langkah (approve & transferFrom)

### Konten Slide
- **Masalah Interaksi Kontrak Otonom:** Smart contract target tidak dapat menarik saldo dompet pengguna tanpa adanya otorisasi kriptografi sebelumnya.
- **Alur Kerja Dua Langkah (Two-Step Allowance Pattern):**
  1. *Langkah 1 (approve):* Pemilik memanggil `approve(SpenderContract, 500 DAI)` pada kontrak token.
     Mapping allowance diperbarui: `_allowances[Alice][SpenderContract] = 500`.
  2. *Langkah 2 (transferFrom):* Pemilik memanggil fungsi bisnis pada protokol (misal: `executeSwap()`).
     Protokol kemudian memanggil `transferFrom(Alice, PoolAddress, 500)` pada kontrak token.
     Kontrak token memverifikasi kuota allowance, memotong limit izin menjadi nol, dan memindahkan saldo secara atomik.
- **Trade-Off Keamanan:** Menyetujui batas pengeluaran tanpa batas (*infinite approval*) berisiko tinggi jika kontrak pihak ketiga memiliki celah peretasan.
- *Visual:* Sequence diagram interaksi Alice -> Token Contract (Approve) -> Protokol Swap -> Token Contract (TransferFrom).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Analogi kartu debit dan mandat penarikan otomatis.
- Mengapa transfer biasa gagal pada interaksi DeFi.
- Peringatan bahaya infinite approval bagi keamanan dana pengguna.

**Naskah Tutur (Voiceover Script):**
Mari kita pahami alur allowance dua langkah ini.
Katakanlah Alice ingin menukar lima ratus DAI ke ETH di Uniswap.
Alice tidak bisa langsung memanggil fungsi swap di Uniswap lalu berharap Uniswap mengambil DAI dari dompetnya.
Langkah pertama yang wajib dilakukan Alice adalah memanggil fungsi approve pada kontrak token DAI.
Melalui transaksi ini, Alice menetapkan limit izin bahwa kontrak Uniswap Router diperbolehkan menarik maksimal lima ratus DAI dari akunnya.
Setelah transaksi approve itu sukses tercatat di blok, Alice baru mengeksekusi langkah kedua: memanggil fungsi swap di Uniswap.
Di tengah-tengah eksekusi swap, Uniswap akan memanggil fungsi transferFrom pada kontrak DAI.
Kontrak DAI memeriksa apakah limit otorisasi Alice masih mencukupi, memotong kuota izin tersebut, dan memindahkan saldo DAI ke liquidity pool.
Pola dua langkah ini menjamin keamanan, tetapi memiliki kelemahan dari sisi efisiensi biaya gas.

---

## Slide 7: Evolusi ERC-20: EIP-2612 & Gasless Approvals

### Konten Slide
- **Friksi Pola Tradisional:** Pengguna dipaksa mengirim dua transaksi terpisah dan membayar gas dua kali untuk satu tindakan finansial tunggal.
- **Inovasi EIP-2612 (Fungsi permit):** Memanfaatkan hashing data terstruktur EIP-712 untuk memberikan otorisasi penarikan secara off-chain.
- **Mekanisme Tanda Tangan Kriptografi (v, r, s):**
  - Alice menandatangani pesan off-chain tanpa gas yang memuat alamat spender, nilai limit, nomor nonce, dan batas waktu kedaluwarsa.
  - Payload tanda tangan dikirimkan langsung ke relayer atau aplikasi.
  - Aplikasi memanggil fungsi `permit()` dan fungsi swap dalam satu transaksi tunggal yang atomik.
- **Keunggulan Ekosistem:** Menghemat biaya gas jaringan dan membuka jalan bagi pengalaman onboarding akun tanpa saldo native token (*gasless UX*).
- *Visual:* Perbandingan alur 2 transaksi konvensional vs 1 transaksi atomik terintegrasi dengan tanda tangan off-chain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Approve konvensional membuang waktu dan biaya transaksi.
- EIP-2612 memanfaatkan tanda tangan digital off-chain tanpa gas.
- Transaksi permit dan eksekusi DeFi disatukan dalam satu transaksi atomik.

**Naskah Tutur (Voiceover Script):**
Kelemahan terbesar dari alur approve konvensional adalah pengalaman pengguna yang lambat dan mahal.
Alice harus menandatangani transaksi approve, menunggu blok selesai ditambang, membayar gas, lalu baru mengirim transaksi kedua untuk swap.
Pada tahun 2020, komunitas melahirkan ekstensi EIP-2612 dengan fungsi bernama permit.
Melalui standar ini, Alice tidak perlu menyiarkan transaksi approve on-chain.
Alice cukup menandatangani pesan persetujuan secara off-chain di dompetnya tanpa biaya gas sama sekali.
Pesan tersebut menghasilkan komponen tanda tangan kriptografi v, r, dan s.
Aplikasi kemudian mengambil tanda tangan itu dan mengirimkannya bersama fungsi pertukaran dalam satu transaksi on-chain yang atomik.
Kontrak pintar memvalidasi tanda tangan tersebut secara instan.
Pendekatan ini memangkas biaya gas hingga separuh dan memungkinkan pengguna baru bertransaksi tanpa perlu memegang saldo native ETH terlebih dahulu.

---

## Slide 8: Arsitektur ERC-721 (Non-Fungible Tokens)

### Konten Slide
- **Hakikat Non-Fungibility:** Dunia nyata dipenuhi aset yang tidak dapat saling menggantikan seperti sertifikat tanah, tiket acara, dan identitas digital.
- **Struktur Identifikasi Token:**
  - Setiap unit token dibedakan oleh unsigned integer unik 256-bit bernama **tokenId**.
  - Identitas global aset dijamin oleh kombinasi alamat kontrak dan nomor seri: `(ContractAddress, tokenId)`.
- **Struktur Data Penyimpanan State:**
  - `mapping(uint256 => address) private _owners;`
    Menghubungkan setiap tokenId individual dengan alamat pemilik sahnya saat ini.
  - `mapping(address => uint256) private _balances;`
    Mencatat total kuantitas unit NFT yang dipegang oleh suatu alamat.
  - `mapping(uint256 => address) private _tokenApprovals;`
    Memberikan hak pengelolaan atas satu unit tokenId spesifik kepada pihak ketiga.
- *Visual:* Diagram hubungan relational antara satu unit tokenId dan pemilik tunggal di mapping internal ERC-721.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kontrak ERC-721 memetakan nomor seri unik ke alamat pemilik.
- TokenId bersifat mutlak dan tidak bisa diduplikasi dalam satu kontrak.
- Perbedaan struktur mapping kepemilikan dibandingkan dengan ERC-20.

**Naskah Tutur (Voiceover Script):**
Jika ERC-20 mengelola unit yang nilainya sama, ERC-721 mengelola aset unik yang tidak dapat dipertukarkan.
Diperkenalkan pada tahun 2018, ERC-721 menjadi standar global untuk Non-Fungible Tokens atau NFT.
Di dalam kontrak ERC-721, setiap aset diidentifikasi oleh angka unik 256-bit yang disebut tokenId.
Struktur data mapping internalnya pun dibalik.
Jika ERC-20 memetakan alamat akun ke jumlah saldo, ERC-721 memetakan setiap tokenId unik ke satu alamat pemilik yang sah.
Kombinasi antara alamat smart contract dan nomor tokenId ini menghasilkan identitas aset digital yang unik di seluruh dunia.
Sistem ini memastikan bahwa kepemilikan atas satu barang spesifik tidak dapat tertukar dengan barang lainnya di jaringan blockchain.

---

## Slide 9: Keamanan Transfer & Arsitektur Metadata

### Konten Slide
- **Pencegahan Black Hole via `safeTransferFrom`:**
  - Mencegah token terperangkap permanen di dalam smart contract penerima yang tidak memiliki kode penanganan NFT.
  - Memeriksa apakah kontrak penerima mengembalikan selector antarmuka `IERC721Receiver.onERC721Received`.
  - Jika kontrak tujuan tidak mendukung penanganan NFT, transaksi otomatis dibatalkan (*revert*).
- **Arsitektur Penyimpanan Metadata:**
  - Menyimpan file media resolusi tinggi secara langsung di storage Ethereum membutuhkan biaya gas ratusan ribu dolar.
  - Smart contract hanya menyimpan pointer string ringan yang diakses melalui fungsi `tokenURI(tokenId)`.
- **Tiga Model Penyimpanan Metadata:**
  - *HTTP URL Terpusat (Risiko Tinggi):* Mengarah ke server cloud privat.
    File rentan hilang jika domain mati.
  - *Decentralized Content Addressing (IPFS / Arweave - Standar Industri):* Pointer berbasis hash kriptografis yang abadi dan kebal manipulasi.
  - *100 Persen On-Chain SVG (Ketahanan Maksimal):* Kode visual digenerasikan secara langsung dari byte storage smart contract.
- *Visual:* Alur pemanggilan fungsi tokenURI menuju metadata JSON IPFS yang memuat link aset gambar terdesentralisasi.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Fitur safe transfer melindungi pengguna dari salah kirim alamat kontrak.
- File media berat tidak disimpan di blockchain karena biaya gas.
- Perbandingan model metadata: server cloud vs IPFS vs on-chain SVG.

**Naskah Tutur (Voiceover Script):**
ERC-721 membawa dua fitur arsitektur yang sangat penting untuk dipahami.
Pertama adalah fungsi safeTransferFrom.
Jika kalian tidak sengaja mengirim NFT ke sebuah smart contract yang tidak diprogram untuk mengelola NFT, token tersebut akan terkunci selamanya di dalam lubang hitam.
Fungsi safeTransferFrom secara otomatis mendeteksi apakah kontrak penerima mengimplementasikan interface receiver yang sah.
Jika tidak, transaksi seketika digagalkan demi menyelamatkan aset pengguna.
Aspek kedua adalah arsitektur metadata.
Banyak orang salah paham dan mengira file gambar NFT tersimpan langsung di dalam blockchain Ethereum.
Padahal, menyimpan file media beberapa megabyte di storage Ethereum akan menelan biaya gas ratusan ribu dolar.
Sebagai gantinya, smart contract hanya menyimpan string URI yang menunjuk ke metadata JSON.
Standar industri terbaik menggunakan jaringan terdesentralisasi seperti IPFS atau Arweave, atau merender kode SVG langsung dari penyimpanan on-chain.

---

## Slide 10: Arsitektur ERC-1155 (Multi-Token Standard)

### Konten Slide
- **Masalah Game On-Chain & Protokol Kompleks:**
  - Game Web3 memerlukan ribuan item: mata uang emas, senjata unik, dan bahan baku ramuan (*potions*).
  - Menggunakan kombinasi ERC-20 dan ERC-721 memaksa deploy ratusan kontrak terpisah dan memboroskan biaya transaksi pemain.
- **Konsolidasi State Tunggal ERC-1155:**
  - Mengelola token fungible, non-fungible, dan semi-fungible dalam satu smart contract tunggal.
  - Struktur data terpadu: `mapping(uint256 => mapping(address => uint256)) private _balances;`
- **Operasi Atomic Batch Transfers:**
  - Fungsi `safeBatchTransferFrom()` memungkinkan pengiriman puluhan jenis aset berbeda dalam satu transaksi tunggal.
  - Menghemat konsumsi gas jaringan hingga lebih dari 80 persen dibandingkan transfer serial pada ERC-721.
- *Visual:* Diagram perbandingan: puluhan kontrak terpisah ERC-20/721 vs satu kontrak cerdas terpadu ERC-1155 dengan pengiriman batch.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Diciptakan tim Enjin untuk menyelesaikan problem efisiensi game blockchain.
- Satu kontrak mampu menampung jenis token tak terbatas.
- Fitur batch transfer menghemat gas secara masif bagi transaksi multi-aset.

**Naskah Tutur (Voiceover Script):**
Ketika pengembang mulai membangun game berskala besar di atas blockchain, keterbatasan standar ERC-20 dan ERC-721 mulai terasa sangat menyiksa.
Bayangkan sebuah game bermain peran yang memiliki ribuan pedang unik, jutaan koin emas, dan ratusan ribu ramuan kesehatan.
Jika pengembang harus men-deploy kontrak baru untuk setiap jenis pedang dan koin, biaya deployment dan manajemennya akan membengkak luar biasa.
Lebih buruk lagi, jika pemain merakit baju zirah yang butuh emas, besi, dan batu permata, pemain harus mengirim tiga transaksi berbeda dan membayar gas tiga kali lipat.
Pada tahun 2018, tim Enjin memperkenalkan ERC-1155 sebagai standar multi-token.
Di dalam satu kontrak ERC-1155, kita bisa menampung token fungible dan non-fungible sekaligus melalui satu struktur nested mapping.
Fitur paling revolusionernya adalah batch transfer.
Pengguna dapat memindahkan puluhan item berbeda hanya dalam satu transaksi tunggal, memangkas biaya gas jaringan hingga delapan puluh persen.

---

## Slide 11: Matriks Perbandingan Komprehensif

### Konten Slide
- **Dimensi Sifat Aset:**
  - ERC-20: murni fungible dan setara satu sama lain.
  - ERC-721: murni unik dan non-fungible satu-demi-satu.
  - ERC-1155: hibrida (fungible, semi-fungible, dan non-fungible).
- **Struktur State Storage:**
  - ERC-20: `address => uint256`
  - ERC-721: `uint256 => address`
  - ERC-1155: `uint256 => (address => uint256)`
- **Efisiensi & Dukungan Operasi Batch:**
  - ERC-20: Terbatas pada transfer tunggal per panggilan.
  - ERC-721: Satu transaksi per unit NFT tanpa batching bawaan.
  - ERC-1155: Mendukung batch transfer dan batch balance check secara native.
- **Overhead Deployment Kontrak:**
  - ERC-20 dan ERC-721 membutuhkan satu deployment kontrak mandiri untuk setiap aset atau koleksi.
  - ERC-1155 mengelola seluruh ekosistem aset di dalam satu deployment kontrak terpadu.
- *Visual:* Tabel matriks visual yang merangkum parameter teknis dan use case dominan dari ketiga standar token.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ringkasan komparatif menyeluruh sebelum melangkah ke modul berikutnya.
- Perhatikan kontras pemetaan memori di storage kontrak.
- Pemilihan standar harus disesuaikan dengan kebutuhan arsitektur aplikasi.

**Naskah Tutur (Voiceover Script):**
Mari kita rangkum perbandingan struktural dari ketiga standar token ini.
Dari segi sifat aset, ERC-20 dirancang untuk unit yang dapat dipertukarkan tanpa identitas unik.
ERC-721 mengunci keunikan mutlak di mana setiap token memiliki nomor seri tersendiri.
Sementara ERC-1155 menawarkan fleksibilitas hibrida, di mana token dengan suplai satu bertindak sebagai NFT, dan token dengan suplai banyak bertindak sebagai mata uang.
Perbedaan arsitektur ini tercermin jelas pada struktur mapping di dalam smart contract masing-masing.
Dari sisi efisiensi eksekusi, ERC-1155 adalah standar paling hemat biaya untuk sistem yang melibatkan transaksi banyak aset secara simultan.
Memahami karakteristik teknis dari masing-masing standar ini adalah syarat mutlak bagi setiap arsitek Web3 dalam merancang aplikasi terdesentralisasi yang aman dan efisien.

---

## Slide 12: Jembatan ke Modul Berikutnya

### Konten Slide
- **Fondasi Kepemilikan Telah Terwujud:** Standarisasi aset berhasil mengubah unit kepemilikan menjadi objek matematika yang composable di atas blockchain.
- **Pertanyaan Fundamental Berikutnya:** Bagaimana cara pasar memperdagangkan jutaan aset terstandarisasi ini secara terdesentralisasi tanpa bergantung pada Wall Street?
- **Kegagalan Order Book Tradisional:** Model Central Limit Order Book (CLOB) seperti NASDAQ dan bursa terpusat tidak dapat berjalan di Ethereum Layer 1 karena beban gas dan latensi blok.
- **Materi Modul Berikutnya:** Membedah kurva matematika penentu harga otonom ($x \cdot y = k$), cadangan likuiditas bersama, dan risiko impermanent loss: **Automated Market Makers and Liquidity Pools**.
- *Visual:* Ilustrasi transisi dari token digital terstandarisasi menuju kolam likuiditas AMM yang dikendalikan kurva konstan.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Aset digital sudah terstandarisasi, langkah berikutnya adalah mekanisme pertukaran.
- Mengapa model bursa saham konvensional gagal di jaringan blockchain.
- Teaser materi modul 5.2: Invarian Constant Product x * y = k dan Uniswap.

**Naskah Tutur (Voiceover Script):**
Sekarang kita telah memahami bagaimana kepemilikan digital distandarisasi secara matematis di atas Ethereum Virtual Machine.
Token-token ini sudah hidup, memiliki kedaulatan, dan dapat dibaca oleh protokol mana pun di seluruh dunia.
Namun, kepemilikan aset baru menjadi bernilai secara ekonomi jika kita memiliki pasar untuk memperdagangkannya secara bebas dan tanpa izin.
Di dunia keuangan tradisional, perdagangan aset bergantung pada Central Limit Order Book yang mencocokkan antrean pembeli dan penjual di server bursa terpusat.
Tetapi ketika para insinyur mencoba membawa sistem order book ini ke Ethereum pada tahun 2016, sistem tersebut gagal total karena biaya gas dan latensi blok yang lambat.
Bagaimana ekosistem Web3 mengatasi batasan fisik tersebut?
Bagaimana para pengembang mengganti peran bandar bursa dengan kurva matematika sederhana x kali y sama dengan k?
Di modul berikutnya, kita akan membedah inovasi terbesar dalam dunia keuangan terdesentralisasi: Automated Market Makers and Liquidity Pools.
Sampai jumpa di modul selanjutnya.
