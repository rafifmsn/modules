# Layer 2 Fundamentals
Modul Presentasi: Scalability and Security (06.2)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Layer 2 Fundamentals: Taksonomi dan Prinsip Eksekusi Off-Chain
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Kriteria fundamental yang membedakan Layer 2 sejati dari sidechain biasa, serta evolusi arsitektur penskalaan dari payment channels hingga rollups.
- *Visual:* Diagram dua tingkat yang memperlihatkan Layer 1 sebagai jangkar keamanan dasar dan Layer 2 sebagai lingkungan eksekusi cepat di atasnya.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul kedua: Layer 2 Fundamentals.
- Menjelaskan batasan istilah marketing Layer 2 vs definisi teknis yang ketat.
- Membedah dua pilar utama Layer 2 sejati: Inherited Security dan Unilateral Exit.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kedua dari bab Scalability and Security.
Di modul sebelumnya, kita sudah memahami bahwa untuk melipatgandakan throughput tanpa mengorbankan desentralisasi, kita wajib memindahkan eksekusi keluar dari Layer 1.
Namun di industri kripto hari ini, kata Layer 2 sering kali disalahgunakan sebagai alat pemasaran belaka.
Banyak proyek mengaku sebagai Layer 2, padahal arsitektur teknis mereka hanyalah blockchain independen yang memiliki asumsi keamanan terpisah dan berisiko tinggi.
Hari ini kita akan menetapkan batasan teknis yang sangat ketat tentang apa yang mendefinisikan sebuah Layer 2 sejati.
Kita akan membedah taksonomi sistem penskalaan off-chain, mulai dari State Channels, Plasma, Sidechains, hingga terobosan arsitektur Rollup.

---

## Slide 2: Motif di Balik Eksekusi Off-Chain

### Konten Slide
- **Refleksi Batasan Layer 1:**
  - Kapasitas komputasi dan ruang disk Layer 1 adalah barang publik yang langka dan mahal.
  - Setiap komputasi on-chain dieksekusi ulang oleh puluhan ribu validator secara global.
- **Tujuan Arsitektur Off-Chain:**
  - Memproses transaksi bervolume tinggi di luar rantai utama (*off-chain*) untuk menekan beban komputasi validator L1.
  - Menjaga agar biaya transaksi pengguna tetap dalam hitungan pecahan sen.
- **Tantangan Utama Rekayasa:**
  - Bagaimana memproses jutaan transaksi di luar Layer 1 tanpa kehilangan kedaulatan, keamanan, dan sifat anti-sensor dari Layer 1?
- *Visual:* Perbandingan pipa sempit L1 yang kelebihan beban vs pipa lebar off-chain yang menyalurkan ringkasan data ke L1.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- L1 adalah ruang persidangan tertinggi yang mahal dan lambat.
- Tidak semua aktivitas sehari-hari perlu disidangkan di mahkamah agung L1.
- Tujuan off-chain: geser komputasi ke luar, tapi bawa hasil akhirnya ke L1.

**Naskah Tutur (Voiceover Script):**
Mari kita ingat kembali kenapa kita butuh sistem off-chain sejak awal.
Layer 1 seperti Ethereum adalah ruang sidang mahkamah agung yang sangat aman, tapi kapasitas sidangnya sangat terbatas dan mahal.
Jika setiap transaksi kecil seperti membeli kopi atau menukar token receh harus disidangkan oleh puluhan ribu hakim validator di seluruh dunia, sistem akan macet total.
Idenya adalah: kita ingin memindahkan miliaran transaksi komputasi tersebut ke luar rantai utama atau secara off-chain.
Pengguna bisa bertransaksi ribuan kali dengan biaya super murah dan latensi instan.
Namun tantangan rekayasanya sangat berat.
Bagaimana caranya agar transaksi yang terjadi di luar rantai utama tersebut tetap memiliki kekuatan hukum dan keamanan mutlak yang sama persis seperti Layer 1?

---

## Slide 3: Definisi Sejati Layer 2 (The Two Invariants)

### Konten Slide
- **Standar Teknis Mutlak:** Tidak semua sistem sekunder yang berada di luar Layer 1 berhak disebut sebagai Layer 2.
- **Syarat 1: Inherited Security (Keamanan Terwariskan):**
  - Sistem L2 memperoleh jaminan keamanannya secara langsung dan eksklusif dari konsensus Layer 1 yang mendasarinya.
  - L2 tidak memiliki validator set independen yang dapat membalikkan transaksi secara sepihak.
- **Syarat 2: Unilateral Exit (Hak Penarikan Mandiri Sepihak):**
  - Pengguna memiliki hak matematis mutlak untuk menarik kembali aset mereka ke Layer 1 secara mandiri.
  - Penarikan dana dijamin tetap berhasil meskipun seluruh operator, sequencer, dan validator Layer 2 mati total atau bersekongkol menyerang sistem.
- *Visual:* Diagram gembok Layer 1 yang mengamankan brankas Layer 2 dengan pintu darurat unilateral exit yang langsung menuju L1.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dua syarat mutlak Layer 2 sejati: Inherited Security dan Unilateral Exit.
- Jika pengguna tidak bisa menarik aset saat operator kabur, sistem itu bukan Layer 2.
- Jangan terkelola oleh jargon pemasaran; pegang teguh dua prinsip ini.

**Naskah Tutur (Voiceover Script):**
Ini adalah slide paling penting untuk memfilter klaim-klaim palsu di industri blockchain.
Sebuah sistem komputasi berhak disebut sebagai Layer 2 sejati jika dan hanya jika memenuhi dua kriteria mutlak ini.
Kriteria pertama adalah Inherited Security.
Keamanan dari sistem tersebut harus berasal seratus persen dari konsensus Layer 1.
Sistem itu tidak boleh bergantung pada voting konsensus baru yang berdiri sendiri.
Kriteria kedua adalah Unilateral Exit.
Ini adalah prinsip kedaulatan mutlak pengguna.
Pengguna harus selalu bisa menarik aset mereka kembali ke Layer 1 secara mandiri lewat smart contract di L1.
Hak penarikan ini harus dijamin secara matematis dan kriptografis, bahkan dalam skenario terburuk di mana seluruh operator dan sequencer Layer 2 sengaja mematikan server mereka atau berkomplot untuk menyensor transaksi kalian.
Jika sebuah sistem tidak punya pintu darurat mandiri ini, sistem itu bukan Layer 2.

---

## Slide 4: Taksonomi Penskalaan Off-Chain

### Konten Slide
- **Empat Paradigma Utama Evolusi Off-Chain:**
  - **1. State Channels:** Pembayaran dan perubahan status instan antar-pihak melalui tanda tangan kriptografis bilateral (contoh: Lightning Network, Raiden).
  - **2. Plasma Chains:** Rantai anak yang mengirimkan komitmen Merkle root berkala ke kontrak pintar Layer 1 (contoh: OMG Network).
  - **3. Sidechains:** Blockchain independen dengan konsensus sendiri yang terhubung ke L1 melalui kontrak jembatan dua arah (contoh: Polygon PoS).
  - **4. Rollups:** Arsitektur modern yang mengeksekusi transaksi off-chain namun menerbitkan seluruh data mentah langsung ke Layer 1 (contoh: Arbitrum, Optimism, zkSync).
- *Visual:* Garis waktu evolusi arsitektur penskalaan dari State Channels (2015) hingga era Rollup modern.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Sejarah eksplorasi teknik selama satu dekade terakhir.
- Empat rumpun besar: Channels, Plasma, Sidechains, dan Rollups.
- Masing-masing mewakili evolusi dari cara mengelola data dan sengketa.

**Naskah Tutur (Voiceover Script):**
Selama sepuluh tahun terakhir, para peneliti telah mengeksplorasi berbagai paradigma rekayasa untuk mencapai penskalaan off-chain.
Ada empat kategori besar yang perlu kita pahami.
Pertama adalah State Channels, yang mengandalkan tanda tangan pertukaran status antar-pihak secara privat.
Kedua adalah Plasma, yang mencoba membuat rantai anak pohon berantai dengan mencatatkan akar Merkle ke rantai utama.
Ketiga adalah Sidechains, yang sebenarnya merupakan blockchain terpisah yang dijalankan oleh sekelompok validator independen dan disambungkan ke Layer 1 menggunakan kontrak jembatan.
Dan yang keempat adalah Rollups, penemuan paling mutakhir yang menyelesaikan kelemahan-kelemahan dari model sebelumnya dengan memanfaatkan ketersediaan data langsung di Layer 1.
Mari kita bedah kelebihan dan kelemahan dari masing-masing model ini satu per satu.

---

## Slide 5: State Channels (e.g. Bitcoin Lightning Network)

### Konten Slide
- **Prinsip Kerja:** Hanya mengirimkan dua transaksi ke Layer 1, yaitu transaksi deposit pembukaan saluran dan transaksi penyelesaian penutupan.
- **Alur Transaksi Off-Chain:**
  - Alice dan Bob mengunci modal masing-masing 1 BTC ke dalam smart contract multi-sig di Layer 1.
  - Keduanya melakukan ribuan transaksi pembayaran mikro off-chain secara instan dengan saling bertukar pesan bertanda tangan digital.
  - Status saldo terus diperbarui: Status 1 (Alice 0.9, Bob 1.1), Status 2 (Alice 0.8, Bob 1.2), hingga Status N (Alice 0.5, Bob 1.5).
- **Mekanisme Penyelesaian Sengketa:**
  - Jika Alice berbuat curang dengan menyetorkan Status 1 lama ke L1, Bob memiliki batas waktu sanggahan untuk menyetorkan Status N yang memiliki nomor urut lebih baru.
  - Kontrak L1 otomatis menghukum Alice dengan menyita seluruh modalnya dan memberikannya kepada Bob.
- *Visual:* Sequence diagram Alice dan Bob membuka channel multi-sig di L1, bertukar transaksi off-chain, dan menutup channel di L1.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- State channels: analogi membuka tab di kedai kopi.
- Sangat efisien: jutaan transaksi off-chain hanya butuh dua transaksi on-chain.
- Penalti kecurangan: siapa yang menyetor data lama akan kehilangan seluruh uang jaminannya.

**Naskah Tutur (Voiceover Script):**
Model pertama yang sangat populer adalah State Channels, yang paling terkenal diimplementasikan pada Lightning Network di Bitcoin.
Analoginya mirip seperti membuka tagihan atau tab di kedai kopi favorit kalian.
Alice dan Bob sama-sama menyetorkan 1 koin ke dalam kontrak multi-sig di Layer 1 untuk membuka saluran.
Setelah saluran terbuka, mereka bisa saling mentransfer uang jutaan kali di luar rantai utama.
Setiap kali mentransfer, mereka hanya saling mengirim nota digital yang ditandatangani oleh kedua belah pihak dengan status saldo terbaru.
Ini instan dan tanpa biaya gas sama sekali.
Ketika mereka selesai, mereka hanya perlu menyetorkan status terakhir ke Layer 1 untuk mencairkan saldo masing-masing.
Bagaimana jika Alice curang dan mengirim status lama saat saldonya masih banyak?
Sistem memiliki mekanisme sengketa.
Bob diberi jendela waktu untuk menyetorkan bukti tanda tangan yang lebih baru.
Jika terbukti Alice curang, kontrak Layer 1 akan menyita seluruh saldo milik Alice dan menyerahkannya kepada Bob sebagai hukuman.

---

## Slide 6: Batasan Struktural State Channels

### Konten Slide
- **1. Capital Lockup (Ketidakefisienan Modal):**
  - Saldo yang terkunci di dalam saluran tidak dapat digunakan untuk keperluan ekonomi lain sampai saluran ditutup.
  - Mengharuskan pengguna mengunci modal penuh di muka secara tidak likuid.
- **2. Online Liveness & Watchtowers:**
  - Peserta saluran wajib tetap online untuk memantau apakah lawan transaksi mencoba menyetorkan status curang ke Layer 1.
  - Jika pengguna offline saat kecurangan terjadi dan jendela sanggahan terlewati, dana mereka hilang permanen kecuali menyewa pihak ketiga (*Watchtowers*).
- **3. Ketiadaan Shared State (Tanpa Smart Contract Global):**
  - Saluran hanya bekerja dengan baik untuk transaksi bilateral antar-pihak tertentu.
  - Tidak mampu menjalankan logika aplikasi multi-pengguna global seperti liquidity pool AMM atau protokol peminjaman terdesentralisasi.
- *Visual:* Ilustrasi modal terperangkap dalam pipa saluran tertutup dan kegagalan menjalankan aplikasi DeFi kolaboratif.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengapa State Channels tidak bisa menjadi solusi tunggal untuk DeFi.
- Capital lockup membuat modal tidur dan tidak efisien.
- Ketergantungan pada status online menciptakan risiko keamanan bagi pengguna kasual.

**Naskah Tutur (Voiceover Script):**
Meskipun State Channels sangat cepat dan murah untuk pembayaran mikro satu lawan satu, model ini membentur tiga batasan struktural yang sangat fatal.
Pertama adalah inefisiensi modal.
Uang yang kalian kunci di dalam saluran benar-benar membeku dan tidak bisa diputar ke protokol lain selama saluran masih aktif.
Kedua adalah keharusan untuk selalu online.
Karena ada jendela waktu sanggahan, kalian harus terus-menerus memantau blockchain agar pihak lawan tidak mengirim data lama.
Jika internet kalian mati selama seminggu dan lawan transaksi kalian curang, kalian bisa kehilangan seluruh uang kalian kecuali kalian membayar layanan penjaga yang disebut Watchtowers.
Tetapi kelemahan paling fundamental adalah ketiadaan *shared state*.
State Channels hanya bisa mengikat pihak-pihak yang menandatangani saluran tersebut.
Kalian tidak bisa membuat automated market maker seperti Uniswap di mana ribuan orang asing saling bertukar token dari satu kolam likuiditas bersama yang sama.

---

## Slide 7: Plasma Chains dan Tragedi Data Availability

### Konten Slide
- **Konsep Plasma (Poon & Buterin, 2017):**
  - Membangun pohon rantai anak (*child chains*) yang memproses transaksi massal secara mandiri.
  - Operator rantai anak secara berkala mengirimkan komitmen Merkle root dari blok transaksi ke kontrak pintar di Layer 1.
- **Mekanisme Penarikan (Exit Game):**
  - Pengguna menarik dana ke L1 dengan menyertakan Merkle proof yang membuktikan kepemilikan saldo sah mereka pada root terakhir.
- **Kelemahan Fatal: The Data Availability Flaw:**
  - Operator rantai anak dapat mengirimkan Merkle root baru ke L1, namun dengan sengaja menahan data transaksi mentah (*data withholding attack*).
  - Tanpa data blok mentah, pengguna biasa tidak dapat membuat Merkle proof untuk membuktikan saldo mereka dalam proses penarikan dana.
  - Memicu kekacauan *Mass Exit Problem* di mana seluruh pengguna panik berebut keluar ke L1 hingga menyumbat jaringan dasar.
- *Visual:* Diagram penyerang menahan data transaksi di Plasma -> Pengguna panik mencoba exit -> Jaringan L1 lumpuh karena antrean massal.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Plasma adalah pelopor rantai anak yang mengandalkan Merkle root di L1.
- Masalah mematikan: Data Withholding Attack.
- Jika operator menyembunyikan data mentah, pengguna tidak bisa membuktikan saldo mereka saat ingin keluar.

**Naskah Tutur (Voiceover Script):**
Untuk mengatasi keterbatasan State Channels, pada tahun 2017 Joseph Poon dan Vitalik Buterin merancang Plasma.
Idenya sangat ambisius: membuat rantai anak otonom yang bisa memproses ribuan transaksi, lalu operator rantai anak hanya perlu menyetorkan ringkasan berupa akar Merkle ke kontrak pintar di Layer 1 secara berkala.
Jika pengguna ingin menarik uangnya kembali ke Layer 1, mereka cukup menunjukkan bukti Merkle atau Merkle proof yang menunjukkan saldo mereka ada di dalam akar tersebut.
Namun, arsitektur Plasma runtuh karena satu celah keamanan teoritis yang mematikan: The Data Availability Flaw.
Bayangkan operator Plasma bertindak jahat.
Mereka mengirimkan akar Merkle baru ke Layer 1, tetapi menolak menyiarkan data transaksi mentah di balik akar tersebut ke publik.
Tiba-tiba pengguna tahu ada blok baru, tapi tidak ada yang tahu siapa punya saldo apa.
Tanpa data mentah tersebut, kalian tidak bisa menyusun Merkle proof untuk menarik uang kalian sendiri.
Kondisi ini memicu kepanikan massal yang disebut Mass Exit, di mana semua orang serentak berebut mengajukan penarikan darurat sampai Layer 1 tersumbat total.

---

## Slide 8: Anatomi Sidechain: Mengapa Polygon PoS Bukan Layer 2 Sejati

### Konten Slide
- **Karakteristik Sidechain:**
  - Merupakan blockchain mandiri yang beroperasi penuh dengan mekanisme konsensus terpisah (seperti DPoS atau Proof of Authority).
  - Berjalan sejajar di samping rantai utama dan terhubung melalui kontrak jembatan dua arah (*two-way bridge*).
- **Kelemahan Keamanan Fundamental:**
  - **Zero Inherited Security:** Sidechain sama sekali tidak mewarisi keamanan dari Layer 1.
  - Keamanan dana sepenuhnya bergantung pada kejujuran dan kekuatan ekonomi sekelompok kecil validator internal sidechain itu sendiri.
- **Skenario Serangan Kritis:**
  - Jika validator sidechain bersekongkol atau mengalami serangan 51 persen, mereka dapat memanipulasi konsensus lokal untuk menandatangani pelepasan dana ilegal.
  - Seluruh aset jaminan yang terkunci di dalam kontrak jembatan Layer 1 dapat dikuras habis tanpa ada mekanisme yang bisa dilakukan oleh Layer 1 untuk mencegahnya.
- *Visual:* Diagram isolasi keamanan: Serangan 51 persen pada validator sidechain membobol brankas jembatan di Layer 1.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kasus umum di pasar: banyak orang menganggap Polygon PoS adalah Layer 2.
- Secara teknis, Polygon PoS adalah sidechain independen dengan validator set sendiri.
- Bahaya terbesar: jika validator sidechain kompromi, aset cadangan di L1 bisa dikuras habis.

**Naskah Tutur (Voiceover Script):**
Di tengah kegagalan Plasma, banyak tim memilih jalur pintas pragmatis dengan membangun Sidechains, contoh paling populernya adalah Polygon PoS.
Banyak orang keliru mengira Polygon PoS adalah Layer 2.
Secara teknis, sidechain bukanlah Layer 2.
Sidechain adalah blockchain mandiri yang memiliki aturan konsensus, mesin virtual, dan sekelompok validator independennya sendiri.
Kalian memindahkan dana dengan mengunci aset di smart contract jembatan di Layer 1, lalu token representasi dicetak di sidechain.
Masalah fundamentalnya adalah: sidechain sama sekali tidak mewarisi keamanan Layer 1.
Keamanan uang kalian sepenuhnya bergantung pada integritas segelintir validator di sidechain tersebut.
Jika dua pertiga validator sidechain berkomplot jahat atau kunci privat mereka dicuri oleh peretas, mereka bisa menandatangani pesan palsu ke kontrak jembatan di Layer 1 dan menguras seluruh aset cadangan yang ada di sana.
Layer 1 tidak punya cara matematis untuk memverifikasi apakah transaksi di sidechain itu sah atau curang.

---

## Slide 9: Terobosan Arsitektur Rollup

### Konten Slide
- **Resolusi Masalah Data Availability:** Rollup menggabungkan eksekusi off-chain berkecepatan tinggi dengan penerbitan data mentah langsung di Layer 1.
- **Tiga Pilar Cara Kerja Rollup:**
  - **1. Off-Chain Execution:** Ribuan transaksi dieksekusi secara instan di luar rantai oleh simpul pengurut (*sequencer*).
  - **2. On-Chain Data Availability:** Sequencer mengompresi kumpulan data transaksi mentah dan menerbitkannya langsung ke Layer 1 (sebagai `calldata` atau data blobs EIP-4844).
  - **3. Cryptographic State Proofs:** Sequencer menyertakan bukti kriptografis (bukti kecurangan atau bukti validitas) untuk menjamin keabsahan perubahan status akun.
- **Prinsip Kedaulatan Mutlak:** Karena seluruh data mentah tersimpan permanen di Layer 1, siapa pun dapat merekonstruksi status Layer 2 dari nol tanpa bergantung pada sequencer.
- *Visual:* Alur kerja Rollup: Transaksi massal di Sequencer -> Kompresi & Publikasi Data ke L1 -> Penjaminan Ketersediaan Data Global.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rollup adalah jawaban pamungkas atas kelemahan fatal Plasma.
- Rumus rollup: Eksekusi di luar rantai, tetapi seluruh data transaksi mentah wajib ditaruh di Layer 1.
- Karena data ada di L1, node independen selalu bisa merekonstruksi state L2 secara otonom.

**Naskah Tutur (Voiceover Script):**
Dari seluruh kegagalan eksperimen masa lalu, lahirlah sebuah inovasi yang menjadi standar emas skalabilitas hari ini: the Rollup.
Rollup berhasil memecahkan teka-teki data availability yang sebelumnya menghancurkan Plasma.
Idenya sangat elegan.
Eksekusi transaksi tetap dilakukan di luar rantai utama oleh komputer berkecepatan tinggi bernama sequencer.
Namun perbedaannya, sequencer tidak boleh hanya mengirimkan akar Merkle.
Sequencer diwajibkan mengompresi seluruh riwayat transaksi mentah dan menerbitkannya langsung ke atas Layer 1 sebagai calldata atau blob data.
Layer 1 tidak perlu mengeksekusi ulang transaksi-transaksi tersebut, melainkan hanya bertindak sebagai papan pengumuman abadi yang menjamin bahwa datanya tersedia bagi siapa saja.
Karena seluruh data mentah sudah tertanam abadi di blockchain Layer 1, siapa pun di seluruh dunia bisa mengunduh data tersebut, merekonstruksi ulang database Layer 2 dari nol, dan memverifikasi kebenarannya tanpa perlu percaya pada sequencer.

---

## Slide 10: Garansi Kedaulatan: Mekanisme Unilateral Exit

### Konten Slide
- **Skenario Musuh Terburuk:**
  - Sequencer Layer 2 mendadak offline permanen karena disita pemerintah, mengalami kerusakan hardware, atau berniat jahat menyensor transaksi Bob.
- **Prosedur Escape Hatch (Pintu Darurat):**
  - **1. Pengajuan Penarikan Mandiri ke L1:** Bob memanggil fungsi penarikan langsung pada smart contract rollup di Layer 1, melewati sequencer L2 sepenuhnya.
  - **2. Pembuktian Kepemilikan Saldo:** Bob menggunakan data transaksi publik yang tersimpan di L1 untuk menyusun bukti kepemilikan asetnya pada state root terakhir.
  - **3. Eksekusi Pencairan Dana:** Kontrak L1 memvalidasi bukti tersebut secara otonom dan mencairkan aset dasar langsung ke dompet Bob di Layer 1.
- **Hasil:** Keamanan dana tidak bergantung pada niat baik operator L2; hak penarikan dijamin oleh kode dan matematika L1.
- *Visual:* Diagram alur Unilateral Exit: Bob melewati L2 Sequencer yang mati dan mengeksekusi penarikan langsung melalui smart contract di L1.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Apa yang terjadi jika sequencer rollup bertindak sebagai tiran atau disita polisi?
- Mekanisme Escape Hatch menjamin pengguna tidak bisa disandera oleh sequencer.
- Inilah pembeda paling mutlak antara true Layer 2 dengan sidechain atau server privat.

**Naskah Tutur (Voiceover Script):**
Mari kita uji klaim kedaulatan ini dalam skenario terburuk.
Bayangkan sequencer Layer 2 disita oleh pihak berwajib, servernya terbakar, atau operatornya sengaja memblokir alamat dompet Bob agar tidak bisa bertransaksi.
Di sistem sidechain atau bursa terpusat, uang Bob akan hilang atau disandera.
Namun di Layer 2 sejati, Bob memiliki hak *unilateral exit* melalui mekanisme pintu darurat atau escape hatch.
Bob tidak perlu meminta izin kepada operator Layer 2.
Bob cukup mengirimkan transaksi darurat langsung ke kontrak pintar rollup yang ada di Layer 1.
Karena semua riwayat data transaksi rollup sudah tersimpan secara transparan di Layer 1, Bob bisa mengambil data tersebut untuk membuktikan berapa saldo sah terakhir miliknya.
Kontrak pintar di Layer 1 akan memverifikasi bukti tersebut secara otomatis dan langsung mencairkan koin milik Bob.
Operator Layer 2 tidak punya kuasa apa pun untuk menahan aset kalian.

---

## Slide 11: Matriks Komparasi Arsitektur Off-Chain

### Konten Slide
- **Perbandingan Mendalam Empat Paradigma Penskalaan:**

| Dimensi Rekayasa | State Channels | Sidechains | Optimistic Rollups | Zero-Knowledge Rollups |
| :--- | :--- | :--- | :--- | :--- |
| **Jangkar Keamanan** | Sengketa Multi-sig L1 | Validator set independen | Warisan penuh konsensus L1 | Warisan penuh konsensus L1 |
| **Data Availability** | Off-chain (Pengguna) | Off-chain (Node sidechain) | On-chain L1 (Calldata / Blobs) | On-chain L1 (Calldata / Blobs) |
| **Dukungan Smart Contract** | Terbatas (Tanpa shared state) | Kompatibel penuh EVM | Kesetaraan penuh EVM | zkEVM / zkVM spesifik |
| **Efisiensi Modal** | Rendah (Modal terkunci) | Tinggi | Tinggi | Tinggi |
| **Penarikan ke L1** | Instan jika kooperatif | Cepat (Batas jembatan) | Jeda sanggahan 7 hari | Instan setelah bukti terverifikasi |

- *Visual:* Tabel matriks arsitektur dengan penyorotan warna hijau pada keunggulan Rollup dibanding alternatif lain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkuman komparatif seluruh paradigma off-chain.
- Perhatikan trade-off masing-masing: Channels minim komputasi tapi tanpa shared state; Sidechain fleksibel tapi lemah keamanannya.
- Rollup menawarkan kombinasi terbaik antara keamanan L1 dan fungsionalitas smart contract penuh.

**Naskah Tutur (Voiceover Script):**
Mari kita rangkum perbandingan arsitektur ini ke dalam satu tabel matriks komparasi.
State Channels menawarkan penyelesaian instan dan murah, tetapi modal kalian terperangkap dan tidak bisa mendukung smart contract multi-pihak seperti DeFi.
Sidechains menawarkan kecepatan tinggi dan dukungan smart contract yang fleksibel, tetapi memiliki kelemahan fatal: keamanannya tidak dijamin oleh Layer 1, melainkan oleh sekelompok kecil validator mandiri yang rentan diretas atau berkomplot.
Sementara itu, Rollups, baik Optimistic maupun Zero-Knowledge, berhasil menyatukan keunggulan dari semua sistem tersebut.
Rollup mewarisi seratus persen keamanan konsensus Layer 1, menjamin ketersediaan data langsung di rantai utama, dan mendukung eksekusi smart contract yang setara dengan Ethereum.
Perbedaan terbesar di antara keluarga rollup terletak pada bagaimana mereka membuktikan keabsahan status transaksi ke Layer 1.

---

## Slide 12: Jembatan ke Modul Berikutnya (Optimistic vs. ZK Rollups)

### Konten Slide
- **Dilema Rekayasa Rollup:**
  - Kita telah membuktikan bahwa Rollup adalah satu-satunya arsitektur yang mewarisi keamanan penuh Layer 1 melalui publikasi Data Availability.
  - Namun, muncul pertanyaan fundamental baru:
  - Ketika sequencer off-chain menyerahkan komitmen state root yang mengklaim 5.000 transaksi berhasil dieksekusi, bagaimana Layer 1 tahu bahwa sequencer tidak berbohong?
- **Dua Mazhab Kriptografi Besar:**
  - **1. Optimistic Rollups:** Berasumsi sequencer jujur secara default, namun memberi jendela waktu 7 hari bagi verifier untuk mengajukan **Fraud Proofs** jika terjadi kecurangan.
  - **2. Zero-Knowledge Rollups:** Tidak mempercayai siapa pun sejak awal, mewajibkan penyertaan bukti matematis **Validity Proofs** (SNARKs/STARKs) sebelum blok disahkan di Layer 1.
- **Materi Modul Berikutnya:** **Rollup Architectures: Optimistic vs. Zero-Knowledge**.
- *Visual:* Ilustrasi perbandingan visual antara Fraud Proofs (Sanggahan Interaktif) vs Validity Proofs (Kalkulasi Kriptografi Instan).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kita sudah sepakat rollup adalah masa depan penskalaan.
- Pertanyaan baru: bagaimana memverifikasi bahwa perhitungan sequencer itu benar?
- Teaser materi modul 6.3: Fraud Proofs vs Validity Proofs.

**Naskah Tutur (Voiceover Script):**
Kita telah membuktikan bahwa Rollup adalah satu-satunya arsitektur penskalaan off-chain yang mewarisi seratus persen keamanan Layer 1 secara murni.
Namun, ini membawa kita ke sebuah teka-teki kriptografi yang sangat mendalam.
Ketika sequencer di Layer 2 mengumumkan ke Layer 1 bahwa sepuluh ribu transaksi telah selesai dieksekusi dan menghasilkan status saldo yang baru, bagaimana Layer 1 bisa tahu secara pasti bahwa angka-angka tersebut benar dan sequencer tidak menciptakan uang palsu dari ketiadaan?
Untuk menjawab tantangan ini, industri terbelah menjadi dua mazhab kriptografi besar.
Mazhab pertama adalah Optimistic Rollups, yang menggunakan filosofi praduga tak bersalah disertai sistem sanggahan berbasis Fraud Proofs.
Mazhab kedua adalah Zero-Knowledge Rollups, yang menggunakan filosofi nihil kepercayaan dengan mewajibkan bukti matematika absolut berupa Validity Proofs.
Bagaimana cara kerja permainan sanggahan interaktif di Arbitrum?
Bagaimana matematika ZK-SNARK bisa mengompres jutaan komputasi ke dalam beberapa ratus byte saja?
Kita akan bedah tuntas di modul berikutnya: Rollup Architectures: Optimistic vs. Zero-Knowledge.
Sampai jumpa di sesi berikutnya.
