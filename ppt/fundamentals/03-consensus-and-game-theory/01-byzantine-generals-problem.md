# The Byzantine Generals Problem
Modul Presentasi: Consensus and Game Theory (03.1)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** The Byzantine Generals Problem
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Memahami dilema koordinasi di lingkungan tanpa rasa saling percaya dan fondasi matematis Byzantine Fault Tolerance.
- *Visual:* Ilustrasi pengepungan benteng oleh beberapa divisi militer dengan utusan kurir yang melintasi wilayah musuh.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul pertama bab Konsensus dan Game Theory.
- Membedah masalah koordinasi paling fundamental dalam ilmu komputer terdistribusi.
- Mengapa sistem publik harus tahan terhadap kebohongan aktif, bukan sekadar server rusak.

**Naskah Tutur (Voiceover Script):**
Selamat datang di bab Consensus and Game Theory.
Hari ini kita akan mengupas tuntas salah satu teka-teki paling fundamental dalam ilmu komputer terdistribusi: The Byzantine Generals Problem.
Di sistem terpusat, koordinasi adalah hal yang sangat sepele karena ada satu server pengendali yang memegang otoritas mutlak.
Namun, ketika ribuan komputer anonim di internet harus menyepakati satu riwayat transaksi tanpa perantara, keadaannya berubah drastis.
Komputer di jaringan publik bukan hanya bisa mati lampu atau putus kabel.
Komputer asing bisa secara aktif berbohong, menyebarkan data palsu, dan berkolusi untuk mencuri dana.
Mari kita pelajari bagaimana para ilmuwan merumuskan masalah ini dan batas matematis apa yang melindunginya.

---

## Slide 2: Dua Lingkungan Jaringan Terdistribusi

### Konten Slide
- **Private Data Center (Lingkungan Jinak):**
  - Seluruh mesin dimiliki oleh entitas tunggal dengan kontrol perimeter ketat.
  - Kegagalan sistem bersifat *benign*: server mati mendadak, kehilangan daya listrik, atau kabel jaringan putus.
  - Mesin tidak pernah berbohong atau sengaja memalsukan catatan basis data.
- **Public Blockchain (Lingkungan Tanpa Rasa Percaya):**
  - Beroperasi melintasi internet terbuka dengan partisipan pseudonim.
  - Node dapat dikendalikan oleh penyerang canggih dengan motif finansial.
  - Ancaman mencakup pemalsuan state, serangan Sybil, penolakan pesan, hingga sabotase konsensus.
- *Visual:* Perbandingan grafis antara kluster server Google atau AWS yang aman vs topologi jaringan P2P terbuka yang penuh node bermusuhan.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bandingkan server internal perusahaan dengan jaringan terbuka blockchain.
- Di data center, mesin rusak hanya berhenti bekerja (fail-stop).
- Di blockchain, peserta asing bisa berpura-pura jujur sambil mengirim tipuan.

**Naskah Tutur (Voiceover Script):**
Sebelum kita masuk ke rumus matematis, kita harus membedakan dua dunia sistem terdistribusi.
Dunia pertama adalah data center privat milik korporasi seperti Google atau Amazon.
Di dalam sana, semua mesin berada di bawah kendali satu manajemen.
Jika sebuah server meledak atau mati listrik, server itu langsung diam dan berhenti mengirim data.
Tidak ada satu pun server di data center Google yang sengaja berniat jahat menipu server di sebelahnya.
Dunia kedua adalah blockchain publik.
Di sini, jaringan berjalan di atas internet terbuka di antara pihak-pihak yang sama sekali tidak saling kenal.
Di lingkungan tanpa rasa percaya ini, sebuah node bisa saja berpura-pura patuh sambil secara diam-diam menyebarkan instruksi palsu untuk mencuri uang.
Inilah alasan mengapa arsitektur konsensus blockchain membutuhkan standar keamanan yang jauh lebih ketat.

---

## Slide 3: Asal-Usul Historis: Industri Kedirgantaraan dan Perang Dingin

### Konten Slide
- **Bukan Berakar dari Kripto:** Masalah ini lahir dari rekayasa sistem kendali penerbangan kritis (avionics) pada era Perang Dingin.
- **Transisi ke Fly-by-Wire:**
  - Kendali fisik kabel baja digantikan oleh sinyal digital dari kluster komputer redundan (seperti pada Space Shuttle dan Boeing 777).
  - Jika satu komputer pengendali rusak, komputer cadangan harus mengambil alih secara instan.
- **Ancaman Asymmetric Fault (Bit-Flip):**
  - Radiasi kosmik di atmosfer dapat memicu *single-event upset* pada sirkuit silikon.
  - Komputer yang mengalami kerusakan acak tidak mati secara bersih, melainkan mengirim perintah "naik" ke sayap kiri dan perintah "turun" ke sayap kanan.
- *Visual:* Ilustrasi sistem fly-by-wire pesawat penumpang modern yang menerima sinyal digital asimetris dari komputer kontrol yang rusak.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ceritakan asal mula konsep BFT dari industri pesawat terbang luar angkasa.
- Kabel mekanik diganti sinyal komputer digital redundan.
- Fenomena bit-flip akibat radiasi kosmik membuat komputer mengirim perintah saling bertolak belakang.

**Naskah Tutur (Voiceover Script):**
Banyak orang mengira Byzantine fault tolerance adalah konsep yang baru ditemukan oleh komunitas cryptocurrency.
Faktanya, penelitian ini lahir dari dunia kedirgantaraan militer pada era Perang Dingin.
Ketika pesawat tempur canggih dan pesawat ulang alik mulai meninggalkan kendali kabel mekanik beralih ke sistem kendali fly-by-wire, komputer digital memegang kendali fisik sayap pesawat.
Para insinyur memasang beberapa komputer cadangan untuk mengantisipasi kerusakan.
Namun mereka menemukan fenomena aneh yang fatal.
Ketika radiasi kosmik di lapisan atmosfer menghantam chip silikon komputer kontrol, terjadi pembalikan bit acak.
Komputer yang rusak ini tidak langsung mati.
Komputer tersebut justru mengirim perintah kontradiktif: ia memerintahkan sayap kiri untuk menanjak, tetapi secara bersamaan mengirim perintah ke sayap kanan untuk menukik.
Sistem redundansi standar gagal total menghadapi sinyal asimetris seperti ini.
Para ilmuwan komputer akhirnya dituntut merancang algoritma yang tetap sanggup mencapai kesepakatan mutlak meskipun ada komponen yang mengirim sinyal dusta.

---

## Slide 4: Alegori Klasik: Lamport, Shostak, dan Pease (1982)

### Konten Slide
- **Formalisasi Makalah Ilmiah (1982):** Leslie Lamport, Robert Shostak, dan Marshall Pease memformalkan tantangan ini dalam bentuk perumpamaan militer.
- **Skenario Pengepungan Kota:**
  - Pasukan Byzantium terbagi menjadi beberapa divisi dan mengepung kota musuh dari berbagai sisi.
  - Masing-masing divisi dipimpin oleh seorang jenderal (misalnya Jenderal Alice, Bob, Charlie, dan Mallory).
  - Para jenderal terpisah jarak geografis dan hanya bisa berkomunikasi lewat kurir pejalan kaki.
- **Tujuan Koordinasi Mutlak:**
  - Kota musuh memiliki pertahanan yang sangat kokoh.
  - Pasukan hanya akan menang jika seluruh divisi menyerang secara serentak pada waktu fajar.
  - Jika hanya sebagian divisi yang menyerang sementara sisanya mundur, pasukan yang menyerang akan dihancurkan total.
- *Visual:* Peta medan perang dengan benteng musuh di tengah dan empat kamp jenderal yang saling bertukar pesan lewat kurir berkuda.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Leslie Lamport membungkus masalah matematika rumit ini dengan cerita perang.
- Jenderal hanya bisa berkomunikasi via kurir pejalan kaki.
- Keputusan harus serentak: semua menyerang bersama, atau semua mundur bersama.

**Naskah Tutur (Voiceover Script):**
Pada tahun 1982, Leslie Lamport bersama rekan-rekannya menerbitkan karya ilmiah legendaris yang merumuskan dilema ini.
Agar konsep matematika rumit ini mudah dibayangkan, Lamport membungkusnya dalam sebuah alegori militer kuno.
Bayangkan ada empat divisi tentara Byzantium yang sedang mengepung kota musuh dari empat penjuru berbeda.
Masing-masing divisi dipimpin oleh seorang jenderal, katakanlah Jenderal Alice, Bob, Charlie, dan Mallory.
Mereka tidak bisa berkumpul tatap muka, melainkan hanya bisa mengirim kurir pejalan kaki melintasi medan musuh.
Benteng kota musuh ini sangat tangguh.
Satu-satunya cara untuk merebut kota tersebut adalah jika seluruh divisi menyerang secara serentak saat fajar tiba.
Kalau separuh jenderal menyerang sedangkan separuh lainnya memilih mundur, pasukan penyerang akan kalah dibantai.
Tantangannya jelas: para jenderal harus berkoordinasi untuk menyepakati satu tindakan seragam, yaitu semua menyerang bersama atau semua mundur bersama.

---

## Slide 5: Jebakan Pengkhianat dan Syarat Konsensus

### Konten Slide
- **Munculnya Aktor Khianat (Byzantine Traitor):**
  - Satu atau lebih jenderal (seperti Jenderal Mallory) berniat menggagalkan rencana penyerangan.
  - Tujuan pengkhianat adalah memecah kesepakatan jenderal yang setia (*loyal generals*).
- **Strategi Kebohongan Asimetris (Equivocation):**
  - Kepada Jenderal Alice, Mallory mengirim kurir dengan pesan: *"Serang fajar nanti!"*
  - Kepada Jenderal Bob dan Charlie, Mallory mengirim kurir dengan pesan: *"Mundur fajar nanti!"*
  - Saat para jenderal meneruskan pesan antar-kamp untuk saling memverifikasi perintah, Mallory kembali menyebarkan laporan palsu.
- **Dua Kondisi Mutlak Konsensus:**
  - **1. Agreement:** Seluruh jenderal yang setia harus menyepakati dan mengeksekusi rencana aksi yang identik.
  - **2. Validity:** Jika panglima tertinggi adalah jenderal setia, seluruh jenderal setia wajib mematuhi perintah asli panglima tersebut.
- *Visual:* Diagram alur pesan bertentangan yang dikirim Mallory secara serentak ke Alice dan Bob.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pengkhianat bernama Mallory mengirim perintah berbeda ke masing-masing jenderal.
- Istilah teknis ekuivokasi: berbicara beda ke pihak yang berbeda.
- Konsensus hanya valid jika memenuhi dua syarat: Agreement dan Validity.

**Naskah Tutur (Voiceover Script):**
Masalah koordinasi ini menjadi sangat rumit karena salah satu jenderal, yaitu Mallory, ternyata seorang pengkhianat.
Tujuan tunggal Mallory adalah membuat para jenderal yang setia terbelah keputusannya.
Kepada Jenderal Alice, Mallory mengirim kurir yang berpesan untuk menyerang saat fajar.
Namun di saat bersamaan, kepada Jenderal Bob, Mallory mengirim kurir dengan pesan agar segera mundur.
Ketika para jenderal yang setia mencoba saling mengonfirmasi pesan yang mereka terima, Mallory kembali berbohong mengenai siapa yang mengatakan apa.
Taktik berbicara dua hal yang berbeda ke pihak berbeda ini kita sebut sebagai ekuivokasi.
Supaya sebuah protokol koordinasi dianggap berhasil menyelesaikan masalah ini, sistem harus memenuhi dua syarat mutlak.
Syarat pertama adalah Agreement: semua jenderal yang jujur harus mengambil keputusan akhir yang sama persis.
Syarat kedua adalah Validity: jika panglima pemberi pesan awal adalah jenderal yang setia, seluruh jenderal setia harus menjalankan perintah asli tersebut tanpa terdistorsi.

---

## Slide 6: CFT vs BFT: Dua Model Kegagalan Terdistribusi

### Konten Slide
- **Crash Fault Tolerance (CFT):**
  - *Model Kegagalan:* Node hanya gagal dengan cara berhenti beroperasi (*fail-stop* / *fail-silent*).
  - *Asumsi Kepercayaan:* Node tidak pernah memalsukan pesan.
    Jika node merespons, datanya dijamin jujur.
  - *Algoritma Klasik:* Paxos (1998), Raft (2014), ZAB (Apache ZooKeeper).
  - *Batas Toleransi:* Menoleransi kerusakan hingga $f < \frac{n}{2}$ (selama mayoritas $51\%$ aktif, sistem berjalan).
- **Byzantine Fault Tolerance (BFT):**
  - *Model Kegagalan:* Node dapat bertindak arbitrer, manipulatif, dan berniat jahat (*Byzantine failure mode*).
  - *Kemampuan Musuh:* Ekuivokasi, menjatuhkan paket pesan terpilih, berkoordinasi untuk double-spending.
  - *Batas Toleransi:* Menoleransi kerusakan maksimal $f < \frac{n}{3}$ (membutuhkan lebih dari dua pertiga node jujur).
- *Visual:* Tabel komparasi CFT vs BFT mencakup asumsi kepercayaan, algoritma populer, dan batas toleransi matematis.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pembedaan mendasar antara Crash Fault Tolerance dan Byzantine Fault Tolerance.
- CFT cukup mayoritas sederhana 51 persen karena tidak ada node yang berbohong.
- BFT butuh supermayoritas lebih dari 66.7 persen karena musuh aktif memanipulasi pemungutan suara.

**Naskah Tutur (Voiceover Script):**
Dalam ilmu sistem terdistribusi, kita mengenal dua model toleransi kegagalan.
Model pertama adalah Crash Fault Tolerance atau CFT.
Di model ini, komputer hanya bisa rusak dengan cara mati mendadak atau terputus jaringan.
Algoritma populer seperti Paxos dan Raft yang dipakai di infrastruktur cloud masuk ke kategori ini.
Karena tidak ada komputer yang berbohong, sistem CFT hanya butuh mayoritas sederhana lima puluh satu persen untuk terus berfungsi.
Bahkan jika separuh kurang satu server mati, sistem tetap aman.
Model kedua adalah Byzantine Fault Tolerance atau BFT.
Ini adalah model keamanan tanpa rasa percaya di mana node diasumsikan dapat memalsukan pesan, menolak transaksi secara sepihak, dan berkomplot.
Untuk bertahan dari musuh yang berbohong aktif, mayoritas sederhana lima puluh satu persen terbukti tidak cukup.
Secara matematis, BFT menuntut lebih dari dua pertiga kekuatan jaringan harus dipegang oleh aktor jujur.

---

## Slide 7: Bukti Matematis Batas BFT: Mengapa n >= 3f + 1

### Konten Slide
- **Rumusan Matematis:** Mengapa batas toleransi BFT deterministik klasik adalah $f < \frac{n}{3}$?
- **Langkah Pembuktian:**
  1. *Kebutuhan Liveness:* Jaringan tidak boleh mengalami kebuntuan (*deadlock*).
     Protokol harus terus memproses transaksi saat menerima $n - f$ respon, karena $f$ node jujur mungkin sekadar lambat merespons.
  2. *Skenario Terburuk Musuh:* Dari $n - f$ respon yang diterima, $f$ respon di antaranya ternyata berasal dari node Byzantine yang menyebarkan suara dusta.
  3. *Jumlah Suara Jujur Minimal:* Jumlah respon jujur yang terjamin dalam kuorum hanyalah $(n - f) - f = n - 2f$.
  4. *Menang Suara Melawan Musuh:* Agar node jujur menang dan konsensus tidak dimanipulasi, jumlah suara jujur harus strictly lebih banyak dari jumlah musuh:
     $$n - 2f > f \implies n > 3f \implies n \ge 3f + 1$$
- *Visual:* Diagram kuorum pemungutan suara menunjukkan pemecahan $n$ menjadi node jujur aktif ($n - 2f$), node lambat ($f$), dan node Byzantine ($f$).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bedah langkah demi langkah penurunan rumus n >= 3f + 1.
- Node lambat dan node mati tidak bisa dibedakan dalam jaringan asinkron.
- Agar node jujur mengalahkan node pengkhianat di kuorum, kita wajib punya lebih dari 3f node.

**Naskah Tutur (Voiceover Script):**
Mari kita buktikan secara matematis mengapa sebuah sistem BFT deterministik hanya bisa menoleransi kurang dari sepertiga node jahat.
Misalkan total node validator kita adalah $n$, dan jumlah maksimal pengkhianat adalah $f$.
Pertama, sistem tidak boleh macet menunggu node yang offline selamanya.
Karena bisa saja ada $f$ node jujur yang koneksinya lambat, protokol harus segera melangkah maju begitu menerima laporan dari $n - f$ node.
Kedua, bayangkan skenario terburuk di mana seluruh $f$ pengkhianat mengirimkan laporan palsu ke dalam kuorum $n - f$ tersebut.
Artinya, jumlah laporan jujur yang benar-benar kita pegang dalam kuorum itu tinggal $n - f$ dikurangi $f$, alias $n - 2f$.
Ketiga, agar kebenaran menang, jumlah suara jujur $n - 2f$ ini harus secara mutlak mengalahkan jumlah suara si pengkhianat yang berjumlah $f$.
Jika kita selesaikan pertidaksamaannya, $n - 2f > f$ menghasilkan $n > 3f$, atau $n \ge 3f + 1$.
Artinya, jika ada 1 pengkhianat, kalian butuh minimal 4 node.
Jika pengkhianat menguasai sepertiga saja dari hak suara, sistem BFT klasik pasti runtuh.

---

## Slide 8: Dua Pilar Konsensus: Safety vs Liveness

### Konten Slide
- **Dua Garansi Mutlak Setiap Sistem Konsensus:**
  - **Safety ("Nothing Bad Happens"):**
    - Seluruh node jujur menyepakati urutan transaksi yang identik.
    - Tidak pernah ada dua cabang riwayat yang bertentangan disahkan secara bersamaan.
    - Menjamin tidak ada transaksi belanja ganda (*double-spending*).
  - **Liveness ("Something Good Eventually Happens"):**
    - Sistem terus bergerak maju dan tidak pernah mengalami kebuntuan (*deadlock*).
    - Setiap transaksi yang valid pada akhirnya akan diproses dan dicatat ke dalam buku besar.
- *Visual:* Bagan neraca timbangan yang menggambarkan ketegangan konstan antara garansi Safety dan garansi Liveness.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Konsensus selalu bertumpu pada dua prinsip: Safety dan Liveness.
- Safety: tidak ada data palsu yang disahkan.
- Liveness: sistem tidak boleh macet dan harus terus memproses transaksi.

**Naskah Tutur (Voiceover Script):**
Setiap perancang protokol konsensus di dunia selalu terikat pada dua garansi fundamental: Safety dan Liveness.
Safety menjamin bahwa tidak ada hal buruk yang terjadi.
Artinya, seluruh komputer jujur menyepakati urutan transaksi yang sama persis, dan tidak ada dua mutasi saldo yang saling bertentangan yang disahkan secara permanen.
Safety mencegah terjadinya double-spending.
Di sisi lain, Liveness menjamin bahwa hal baik pada akhirnya pasti terjadi.
Sistem harus terus bergerak maju menghasilkan blok baru dan tidak boleh mengalami situasi hang atau freeze permanen.
Setiap kali pengguna mengirim transaksi valid, sistem harus hidup dan memasukkannya ke dalam ledger.
Masalah terbesarnya adalah, di dunia nyata kita sering dipaksa mengorbankan salah satu dari kedua garansi ini ketika terjadi gangguan jaringan.

---

## Slide 9: Teorema Ketidakmungkinan FLP (1985)

### Konten Slide
- **Penemuan Fischer, Lynch, dan Paterson (1985):** Hasil pembuktian batas matematis paling terkenal dalam ilmu komputasi terdistribusi.
- **Pernyataan Teorema:**
  - *"Di dalam sistem terdistribusi murni asinkron, tidak ada protokol konsensus deterministik yang sanggup menjamin Safety dan Liveness secara bersamaan, bahkan jika hanya ada satu kegagalan mesin tunggal (crash fault)."*
- **Akar Masalah Jaringan Asinkron:**
  - Jeda pengiriman pesan tidak memiliki batas waktu atas yang pasti (*unbounded delay*).
  - Sebuah node tidak bisa membedakan apakah rekannya mati total atau hanya mengalami keterlambatan sinyal internet.
  - Penyerang yang bisa memperlambat paket data dapat membuat algoritma berputar tanpa henti dalam status ragu-ragu selamanya.
- *Visual:* Diagram pesan asinkron yang tertunda tanpa batas waktu sehingga node penerima terjebak dalam siklus voting tanpa akhir.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- FLP Impossibility Theorem adalah batasan ilmiah terpenting sistem terdistribusi.
- Jaringan asinkron tidak punya batas waktu latensi pesan.
- Mustahil membuat algoritma konsensus deterministik yang sempurna tanpa kompromi.

**Naskah Tutur (Voiceover Script):**
Tiga tahun setelah makalah Lamport terbit, dunia ilmu komputer dikejutkan oleh temuan tiga peneliti: Fischer, Lynch, dan Paterson.
Makalah mereka membuktikan sebuah teorema yang dikenal sebagai FLP Impossibility Theorem.
Teorema ini menyatakan bahwa dalam jaringan yang murni asinkron, tidak akan pernah ada algoritma konsensus deterministik yang sanggup menjamin Safety dan Liveness secara bersamaan, bahkan jika gangguannya hanyalah satu komputer biasa yang mati mendadak.
Mengapa ini terjadi?
Karena dalam jaringan internet yang asinkron, keterlambatan pengiriman data tidak memiliki batas waktu pasti.
Satu pesan bisa sampai dalam hitungan milidetik, tapi bisa juga tertahan berjam-jam.
Komputer penerima tidak pernah tahu apakah rekannya sudah hancur atau kabelnya hanya sedang macet.
Penyerang yang cerdik bisa sengaja menunda paket data tertentu sehingga algoritma terjebak berputar selamanya tanpa pernah bisa mengambil keputusan final.

---

## Slide 10: Kompromi Arsitektur di Dunia Nyata

### Konten Slide
- **Pilihan Wajib Arsitek Protokol:** Karena teorema FLP mustahil dilanggar, setiap sistem konsensus wajib mengorbankan salah satu aspek saat jaringan terbelah (*network partition*).
- **1. Classical BFT (Contoh: Tendermint / Cosmos):**
  - **Memprioritaskan Safety di atas Liveness.**
  - Jika gangguan jaringan memutus komunikasi lebih dari sepertiga validator, sistem secara sengaja berhenti memproduksi blok (*network halts*).
  - Lebih baik sistem macet sementara daripada mengesahkan dua blok yang saling bertentangan.
- **2. Nakamoto Consensus (Contoh: Bitcoin):**
  - **Memprioritaskan Liveness di atas Safety instan.**
  - Jika kabel internet bawah laut terputus, kedua belahan dunia tetap terus menambang blok secara independen tanpa henti.
  - Saat koneksi pulih, cabang rantai terberat akan menimpa cabang lainnya (*chain reorganization*).
- *Visual:* Diagram percabangan keputusan saat terjadi partisi internet: jalur BFT yang berhenti vs jalur Bitcoin yang terus berjalan dan melakukan reorg kemudian.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dunia nyata menuntut kompromi: pilih Safety atau Liveness saat ada bencana jaringan.
- Tendermint memilih Safety: rantai berhenti demi mencegah percabangan.
- Bitcoin memilih Liveness: rantai tidak pernah berhenti, rekonsiliasi diselesaikan belakangan lewat rantai terpanjang.

**Naskah Tutur (Voiceover Script):**
Hukum alam ini memaksa setiap insinyur protokol konsensus untuk mengambil pilihan sulit ketika bencana jaringan terjadi.
Protokol BFT klasik seperti Tendermint di ekosistem Cosmos memilih untuk memprioritaskan Safety di atas Liveness.
Jika koneksi internet global terganggu dan lebih dari sepertiga validator terputus, blockchain Tendermint akan sengaja berhenti total memproduksi blok baru.
Mereka memilih jaringan macet demi memastikan tidak ada satu pun transaksi ganda yang lolos.
Sebaliknya, Nakamoto Consensus pada Bitcoin mengambil jalan yang bertolak belakang.
Bitcoin memprioritaskan Liveness di atas Safety instan.
Bahkan jika kabel optik Samudra Atlantik terputus total dan membelah dunia menjadi dua, para penambang di kedua benua akan terus memproduksi blok secara mandiri.
Rantai Bitcoin tidak pernah berhenti berdetak.
Ketika kabel optik tersambung kembali, aturan rantai terakumulasi terberat akan menyatukan sejarah transaksi kembali.

---

## Slide 11: Tiga Inovasi Satoshi Nakamoto Mengakali Batasan FLP

### Konten Slide
- **Teka-Teki Dua Dekade:** Selama lebih dari dua puluh tahun pasca FLP, para ilmuwan mengira sistem uang digital publik tanpa izin mustahil diciptakan.
- **1. Mengganti Deterministik dengan Proses Acak Poisson:**
  - Teorema FLP secara ketat hanya berlaku untuk algoritma deterministik.
  - Nakamoto Consensus bersifat probabilistik menggunakan penambangan Proof of Work berbasis memori acak.
- **2. Melepaskan Hak Suara dari Identitas Digital:**
  - Rumus BFT klasik $n \ge 3f + 1$ membutuhkan pengetahuan pasti tentang jumlah total entitas $n$.
  - Satoshi mengganti penghitungan identitas IP dengan penghitungan daya komputasi termodinamika riil (*hashrate*).
- **3. Finalitas Probabilistik Menggantikan Finalitas Instan:**
  - Alih-alih menuntut kepastian mutlak sebelum blok berikutnya dibuat, kepastian transaksi tumbuh secara eksponensial seiring bertambahnya kedalaman blok ($k$).
- *Visual:* Tiga pilar sintesis Satoshi: Poisson Process, Thermodynamic Sybil Resistance, Probabilistic Finality.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bagaimana Satoshi mengakali batasan FLP yang dianggap mustahil selama 20 tahun.
- Menggunakan probabilitas acak alih-alih jadwal deterministik yang mudah diserang.
- Mengganti pemungutan suara berbasis identitas dengan hukum fisika termodinamika.

**Naskah Tutur (Voiceover Script):**
Selama lebih dari dua puluh tahun setelah makalah FLP terbit, hampir semua akademisi sepakat bahwa membangun uang terdesentralisasi tanpa otoritas terpusat di internet publik adalah hal yang mustahil.
Satoshi Nakamoto berhasil mendobrak kebuntuan ini melalui tiga terobosan desain yang brilian.
Pertama, ia mengganti pendekatan deterministik dengan proses acak Poisson melalui Proof of Work.
Karena penemuan blok bersifat acak seperti undian probabilistik, penyerang tidak bisa menargetkan antrean giliran validator untuk membuat sistem macet.
Kedua, Satoshi membuang kebutuhan identitas pengguna.
Rumus klasik BFT selalu mensyaratkan kita tahu persis berapa jumlah total partisipan $n$, padahal di internet siapa saja bisa membuat jutaan akun palsu.
Satoshi mengganti perhitungan kepala dengan perhitungan daya listrik dan komputasi riil.
Ketiga, Satoshi tidak memaksakan finalitas instan seratus persen.
Ia membiarkan transaksi diselesaikan secara probabilistik, di mana tingkat keamanan transaksi mengkristal secara eksponensial seiring bertumpuknya blok baru di atasnya.

---

## Slide 12: Jembatan ke Modul Berikutnya: Proof of Work dan Termodinamika

### Konten Slide
- **Refleksi Modul 03.1:** BFT klasik menyelesaikan konsensus untuk komite tertutup dengan identitas terdaftar ($n \ge 3f + 1$).
- **Keterbatasan BFT Klasik di Ruang Terbuka:**
  - Tidak mampu menahan pembuatan jutaan identitas palsu (*Sybil Attack*).
  - Membutuhkan komunikasi pesan kuadratik antar-peserta yang membuat bandwidth jenuh.
- **Materi Modul Berikutnya:**
  - Bagaimana Satoshi Nakamoto mengikat konsensus digital langsung ke hukum fisika termodinamika bumi.
  - Mekanisme pre-image hash search dan Dynamic Difficulty Adjustment setiap 2.016 blok.
  - Penyelarasan insentif ekonomi dan Nash Equilibrium penambang jujur.
- *Visual:* Transformasi dari rapat komite jenderal menuju jaring laba-laba raksasa penambang ASIC global yang mengonsumsi energi fisik.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkum perbedaan BFT komite tertutup vs jaringan terbuka tanpa izin.
- Teaser materi modul 03.2: Proof of Work dan Nakamoto Consensus.
- Bagaimana listrik dan termodinamika menyelaraskan insentif kejujuran penambang.

**Naskah Tutur (Voiceover Script):**
Sekarang kita telah memahami fondasi teori di balik Byzantine Fault Tolerance.
Algoritma BFT klasik berhasil menyelesaikan konsensus untuk komite tertutup dengan jumlah jenderal yang diketahui sejak awal.
Namun, algoritma ini tidak bisa langsung dibawa ke internet bebas di mana siapa saja bisa mengunduh kode dan menyalakan ratusan ribu node palsu.
Bagaimana cara Satoshi Nakamoto melenyapkan ketergantungan pada identitas virtual sama sekali?
Bagaimana Bitcoin mengunci validitas data digital langsung ke konsumsi energi listrik dan termodinamika di dunia nyata?
Dan bagaimana aturan ekonomi ini menciptakan Nash Equilibrium yang membuat penambang lebih untung bersikap jujur daripada berbuat curang?
Untuk membedah mesin komputasi pertama yang menggerakkan mata uang tanpa bank sentral, di modul berikutnya kita akan membedah Proof of Work and Nakamoto Consensus.
Sampai jumpa di modul berikutnya.
