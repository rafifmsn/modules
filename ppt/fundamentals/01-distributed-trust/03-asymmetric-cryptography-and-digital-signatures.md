# Asymmetric Cryptography and Digital Signatures
Modul Presentasi: Fondasi Distributed Trust (01.3)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Asymmetric Cryptography and Digital Signatures
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Fondasi matematis kepemilikan absolut, kurva eliptik, algoritma tanda tangan digital, dan otorisasi terdesentralisasi.
- *Visual:* Ilustrasi sepasang kunci digital (Private Key dan Public Key) yang terhubung secara matematis ke kurva eliptik dan dokumen transaksi bertanda tangan kriptografis.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul ketiga trek Fundamentals.
- Menjelaskan pergeseran dari integritas data (modul sebelumnya) ke persoalan otoritas kepemilikan.
- Mengenalkan kunci asimetris dan tanda tangan digital sebagai pengganti password dan bank sentral.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga dari trek Fundamentals.
Pada modul sebelumnya, kita sudah mempelajari bagaimana fungsi hash dan pohon Merkle menjamin integritas data secara permanen.
Namun, integritas data saja belum menyelesaikan persoalan kepemilikan.
Jika ada sebuah transaksi yang tercatat di dalam blok, bagaimana ribuan komputer di dunia bisa memastikan bahwa transaksi tersebut benar-benar diizinkan oleh pemilik dananya, bukan dipalsukan oleh peretas?
Di sistem perbankan tradisional, otoritas dibuktikan lewat password, tanda tangan basah, kartu identitas, dan customer service.
Tetapi di blockchain publik, tidak ada kantor cabang atau meja bantuan untuk membatalkan transfer yang salah.
Otoritas kepemilikan harus bersifat absolut secara matematika murni.
Hari ini kita akan membedah pilar kedua dari kriptografi desentralistik: Kriptografi Asimetris, aljabar kurva eliptik, dan mekanisme tanda tangan digital.

---

## Slide 2: Dilema Kriptografi Simetris (The Key Distribution Problem)

### Konten Slide
- **Kriptografi Simetris Klasik:** Menggunakan kunci rahasia $K$ yang identik untuk proses enkripsi dan dekripsi pesan (seperti standar AES).
- **The Key Distribution Problem:**
  - Bagaimana dua entitas yang belum pernah bertemu tatap muka dapat menyepakati kunci rahasia $K$ melalui internet publik tanpa disadap oleh pihak ketiga?
  - Jika kunci dikirimkan melalui jalur komunikasi biasa, pengintai (*eavesdropper*) dapat mencegat kunci tersebut dan membuka seluruh data.
- **Keterbatasan Skala Global:** Dalam jaringan dengan $N$ pengguna, setiap pasangan memerlukan saluran kunci unik yang menuntut pengelolaan $\mathcal{O}(N^2)$ kunci rahasia.
- **Ketergantungan pada Pihak Ketiga:** Institusi keuangan sentral mengatasi dilema ini dengan bertindak sebagai perantara pemegang kredensial, menciptakan titik kegagalan tunggal.
- *Visual:* Diagram alur Alice dan Bob yang berusaha menyepakati kunci rahasia melalui saluran internet terbuka dengan pihak pengintai Eve berada di tengah jalur.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kriptografi simetris menggunakan satu kunci rahasia bersama.
- Dilema distribusi kunci: bagaimana mengirim kunci rahasia melalui internet terbuka tanpa disadap?
- Bank menyelesaikannya dengan menjadi perantara terpusat, tetapi arsitektur blockchain membutuhkan solusi mandiri.

**Naskah Tutur (Voiceover Script):**
Sebelum kita membahas tanda tangan digital di blockchain, kita harus memahami sejarah keterbatasan kriptografi klasik.
Selama ribuan tahun, peradaban manusia hanya mengenal kriptografi simetris.
Contoh modernnya adalah algoritma Advanced Encryption Standard atau AES yang digunakan di perbankan.
Dalam kriptografi simetris, pengirim dan penerima menggunakan kunci rahasia yang sama persis untuk mengunci dan membuka pesan.
Pendekatan ini memicu teka-teki klasik dalam ilmu komputer yang dikenal sebagai *The Key Distribution Problem*.
Bayangkan Alice di London ingin bertransaksi dengan Bob di Tokyo melalui internet terbuka.
Bagaimana cara mereka berdua menyepakati satu kunci rahasia bersama jika mereka belum pernah bertemu secara fisik?
Kalau Alice mengirim kunci tersebut melalui email atau jalur internet biasa, pihak ketiga seperti Eve dapat mencegat kunci itu dan membuka seluruh pesan rahasia mereka.
Dunia perbankan tradisional mengatasi masalah ini dengan menjadi penengah terpercaya yang mengatur kredensial dan kata sandi kita di database tertutup.
Namun di jaringan terdesentralisasi, kita memerlukan mekanisme baru yang memungkinkan siapa pun membuktikan otorisasi secara terbuka tanpa pernah membocorkan rahasianya.

---

## Slide 3: Revolusi Kriptografi Kunci Publik

### Konten Slide
- **Terobosan Akhir 1970-an:** Whitfield Diffie, Martin Hellman, dan Ralph Merkle menemukan paradigma baru untuk memecahkan dilema distribusi kunci.
- **Konsep Pasangan Kunci Matematis (Mathematical Keypair):**
  - **Private Key ($sk$ atau $d$):** Disimpan secara sangat rahasia oleh pemiliknya; berfungsi menghasilkan tanda tangan digital dan mengotorisasi transfer nilai.
  - **Public Key ($pk$ atau $Q$):** Dipublikasikan secara terbuka ke seluruh dunia; berfungsi memverifikasi keabsahan tanda tangan yang dibuat oleh private key pasangannya.
- **Hubungan Asimetris Satu Arah:**
  - Komputasi untuk menurunkan Public Key dari Private Key berlangsung instan.
  - Merekayasa balik Private Key dari Public Key adalah hal yang secara komputasi mustahil dilakukan.
- *Visual:* Bagan perbandingan: Kunci Privat rahasia di dalam brankas menghasilkan Kunci Publik terbuka melalui fungsi matematis satu arah.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Terobosan penting era 1970-an oleh Diffie, Hellman, dan Merkle.
- Konsep keypair: Kunci Privat untuk otorisasi, Kunci Publik untuk verifikasi terbuka.
- Sifat satu arah yang mutlak: mengetahui kunci publik tidak membantu peretas menebak kunci privat.

**Naskah Tutur (Voiceover Script):**
Kebuntuan kriptografi simetris akhirnya terpecahkan pada akhir dekade 1970-an berkat terobosan brilian dari Whitfield Diffie, Martin Hellman, dan Ralph Merkle.
Mereka memperkenalkan paradigma baru yang revolusioner: Kriptografi Asimetris atau Kriptografi Kunci Publik.
Alih-alih mengandalkan satu kunci bersama, sistem asimetris menghasilkan sepasang kunci yang terikat secara matematis.
Kunci pertama adalah Private Key yang wajib disimpan sangat rahasia oleh pemiliknya sendiri di dalam dompet digital.
Kunci kedua adalah Public Key yang dapat kalian sebarkan secara bebas ke seluruh dunia tanpa rasa cemas.
Kunci privat digunakan untuk membuat tanda tangan digital dan mengotorisasi pengeluaran saldo.
Sementara kunci publik digunakan oleh seluruh komputer di dunia untuk menguji apakah tanda tangan tersebut benar-benar sah.
Hubungan antara kedua kunci ini bersifat searah secara mutlak.
Sangat mudah bagi prosesor komputer untuk menghitung kunci publik dari kunci privat dalam hitungan mikrodetik.
Namun, secara matematika mustahil bagi superkomputer terkuat di dunia untuk membongkar kunci privat hanya dari melihat kunci publiknya.

---

## Slide 4: Trapdoor One-Way Functions & Keunggulan ECC

### Konten Slide
- **Konsep Trapdoor One-Way Function:** Fungsi matematika yang sangat mudah dihitung ke depan ($y = f(x)$), namun mustahil dibalik ($x = f^{-1}(y)$) kecuali memiliki informasi rahasia (*trapdoor*).
- **Dua Keluarga Masalah Trapdoor Utama:**
  - *Integer Factorization (RSA):* Mudah mengalikan dua bilangan prima raksasa ($N = p \cdot q$), namun sangat berat memfaktorkan $N$ kembali menjadi $p$ dan $q$.
  - *Elliptic Curve Discrete Logarithm Problem (ECC):* Mudah mengalikan titik kurva dengan angka bulat skalar, namun mustahil mencari angka skalar dari titik hasil perkalian.
- **Perbandingan Ukuran Kunci (Tingkat Keamanan 128-bit):**
  - Standar RSA membutuhkan panjang kunci 3.072 bit.
  - Elliptic Curve Cryptography (ECC) hanya membutuhkan panjang kunci 256 bit.
- **Rasional Desain Blockchain:** Kunci ECC sekitar 12 kali lebih ringkas dari RSA, memangkas kebutuhan bandwidth jaringan dan kapasitas penyimpanan disk pada node secara masif.
- *Visual:* Tabel matriks perbandingan ukuran bit kunci RSA vs ECC pada tingkat keamanan 80-bit, 128-bit, dan 256-bit beserta rasio efisiensi kapasitasnya.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Trapdoor function adalah fungsi komputasi satu arah dengan pintu rahasia.
- Dua mazhab utama: RSA berbasis bilangan prima vs ECC berbasis kurva eliptik.
- ECC 256-bit setara RSA 3.072-bit, menghemat ruang penyimpanan di blockchain secara masif.

**Naskah Tutur (Voiceover Script):**
Kriptografi asimetris bekerja di atas pondasi komputasi yang disebut *trapdoor one-way function*.
Ini adalah operasi matematika yang sangat ringan jika dijalankan ke depan, tetapi mustahil diputar balik kecuali kalian memegang informasi rahasia atau trapdoor tertentu.
Di dunia kriptografi modern, ada dua rumpun masalah trapdoor yang paling dominan, yaitu RSA dan ECC.
RSA mengandalkan kesulitan memfaktorkan perkalian dua bilangan prima berukuran raksasa.
Sementara ECC atau Elliptic Curve Cryptography mengandalkan masalah logaritma diskret pada kurva eliptik.
Hampir seluruh arsitektur blockchain modern, mulai dari Bitcoin, Ethereum, hingga Solana, memilih ECC dan meninggalkan RSA.
Alasan utamanya adalah efisiensi ukuran kunci.
Untuk mendapatkan tingkat keamanan standar industri 128-bit, algoritma RSA membutuhkan ukuran kunci sepanjang 3.072 bit.
Sementara dengan kurva eliptik, kita hanya membutuhkan panjang kunci 256 bit untuk tingkat keamanan yang persis setara.
Kunci ECC dua belas kali lebih kecil daripada RSA.
Di dalam sistem blockchain di mana jutaan transaksi harus disimpan selamanya di hard drive ribuan komputer independen, penghematan ukuran data ini adalah faktor krusial bagi skalabilitas jaringan.

---

## Slide 5: Mekanika Aljabar Elliptic Curve Cryptography (ECC)

### Konten Slide
- **Persamaan Kurva Eliptik pada Bilangan Real:** Didefinisikan lewat persamaan aljabar $y^2 = x^3 + ax + b$.
- **Kebutuhan Evaluasi pada Medan Hingga (Finite Field):**
  - Perhitungan kontinu pada bilangan real menghasilkan galat pembulatan desimal (*floating-point rounding errors*).
  - Galat pembulatan menghasilkan inkonsistensi status antar-perangkat keras komputer, merusak konsensus desentralistik.
- **Kurva Modular Modulo Bilangan Prima $p$ ($\mathbb{F}_p$):**
  $$y^2 \equiv x^3 + ax + b \pmod p$$
- **Perubahan Wujud Geometris:**
  - Kurva mulus bertransformasi menjadi kisi-kisi titik diskret (*discrete lattice*) pada koordinat bilangan bulat.
  - Struktur aljabar grup abstrak tetap terpelihara secara sempurna di bawah operasi aritmatika modulo.
- *Visual:* Ilustrasi pergeseran dari kurva mulus simetris $y^2 = x^3 + 7$ ke sebaran titik-titik diskret modular pada grid integer finite field $\mathbb{F}_p$.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rumus dasar kurva eliptik: $y^2 = x^3 + ax + b$.
- Mengapa wajib menggunakan modulo bilangan prima p: komputer dilarang menggunakan desimal floating-point dalam konsensus.
- Kurva mulus berubah menjadi sebaran titik bilangan bulat diskret, namun hukum aljabarnya tetap utuh.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah cara kerja matematika di balik Elliptic Curve Cryptography.
Secara geometri di atas bilangan real, kurva eliptik didefinisikan lewat rumus aljabar $y^2 = x^3 + ax + b$.
Wujud grafisnya menyerupai kurva simetris yang terbelah rapi oleh sumbu horizontal $x$.
Namun dalam sistem komputer blockchain, kita tidak boleh menggunakan bilangan desimal riil.
Komputasi desimal floating-point selalu memicu galat pembulatan kecil di prosesor komputer yang berbeda arsitektur.
Perbedaan satu pecahan desimal saja akan merusak konsensus global secara fatal.
Oleh karena itu, para kriptografer mengevaluasi kurva eliptik di atas *finite field* modulo bilangan prima raksasa $p$.
Persamaannya menjadi $y^2$ kongruen dengan $x^3 + ax + b$ modulo $p$.
Di bawah aturan modulo bilangan prima ini, kurva kontinu yang mulus bertransformasi menjadi sebaran titik-titik diskret pada kisi bilangan bulat.
Meskipun wujud visualnya berubah menjadi titik-titik terpisah, sifat aljabar grup abstraknya tetap terlindungi secara sempurna.

---

## Slide 6: Group Law: Point Addition, Doubling, dan Perkalian Skalar

### Konten Slide
- **Aritmatika Grup pada Kurva Eliptik:**
  - *Point Addition ($P + Q$):* Tarik garis lurus melalui titik $P$ dan $Q$. Garis memotong kurva pada titik ketiga $-R$. Cerminkan titik $-R$ terhadap sumbu $x$ untuk memperoleh hasil: $R = P + Q$.
  - *Point Doubling ($P + P = 2P$):* Tarik garis singgung (*tangent line*) pada titik $P$, temukan titik potong ketiga $-R$, lalu cerminkan untuk memperoleh $2P$.
- **Perkalian Skalar Titik (Scalar Multiplication):**
  - Mengalikan titik generator standar $G$ dengan angka bulat skalar $k$:
    $$P = k \cdot G = \underbrace{G + G + \dots + G}_{k \text{ kali}}$$
- **Efisiensi Algoritma Double-and-Add:**
  - Menghitung $k \cdot G$ hanya membutuhkan waktu logaritmik $\mathcal{O}(\log k)$ langkah kalkulasi.
  - Selesai dalam pecahan milidetik pada prosesor modern meskipun skalar $k$ bernilai 256-bit.
- *Visual:* Diagram geometris penambahan titik $P + Q = R$ melalui garis potong sekran dan pencerminan sumbu, serta garis singgung doubling $2P$.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Aturan penambahan titik: tarik garis lurus, temukan perpotongan ketiga, cerminkan terhadap sumbu x.
- Operasi doubling: gunakan garis singgung pada titik kurva yang sama.
- Perkalian skalar $k \cdot G$ dihitung sangat cepat via double-and-add dalam kompleksitas logaritmik.

**Naskah Tutur (Voiceover Script):**
Bagaimana kita melakukan operasi hitung matematika di atas kurva ini?
Para matematikawan merumuskan hukum grup aljabar khusus bernama *Point Addition*.
Jika kalian memiliki dua titik berbeda di kurva, sebut saja titik $P$ dan titik $Q$, tariklah garis lurus yang memotong keduanya.
Secara geometri, garis tersebut dijamin memotong kurva pada tepat satu titik ketiga, yang kita beri label minus $R$.
Lalu cerminkan titik minus $R$ tersebut melewati sumbu $x$.
Titik pantulan itulah yang didefinisikan sebagai hasil penjumlahan $P$ ditambah $Q$.
Jika titik yang ingin dijumlahkan adalah titik yang sama, kita menarik garis singgung kurva, sebuah proses yang disebut *Point Doubling* untuk menghasilkan nilai $2P$.
Dengan mengombinasikan penjumlahan dan doubling ini secara berulang, kita mendapatkan operasi perkalian skalar: mengalikan titik dasar kurva yang disebut generator point $G$ dengan angka bulat rahasia $k$.
Berkat algoritma cerdas bernama *double-and-add*, prosesor kita dapat menghitung perkalian titik ini dalam kompleksitas logaritmik, tuntas hanya dalam hitungan sepersekian milidetik meskipun nilai $k$ adalah angka raksasa 256 bit.

---

## Slide 7: The Elliptic Curve Discrete Logarithm Problem (ECDLP)

### Konten Slide
- **Asimetri Komputasi Mutlak:**
  - Diberikan bilangan bulat skalar $k$ dan titik acuan generator $G$, menghitung titik koordinat $P = k \cdot G$ berlangsung instan.
  - Diberikan titik hasil $P$ dan titik generator $G$, secara komputasi mustahil menemukan bilangan bulat skalar $k$.
- **Pondasi Akun Kripto:**
  - **Private Key ($k$):** Bilangan bulat acak berukuran 256-bit: $k \in [1, n-1]$.
  - **Public Key ($P$):** Koordinat titik $(x, y)$ pada kurva eliptik hasil dari perkalian skalar $k \cdot G$.
- **Ketahanan terhadap Peretasan Brute-Force:**
  - Algoritma pembongkaran klasik terbaik (Pollard's rho) membutuhkan komputasi sebesar $\mathcal{O}(\sqrt{n})$.
  - Untuk kurva 256-bit, penyerang membutuhkan sekitar $2^{128}$ operasi kalkulasi, mustahil ditembus oleh superkomputer klasik mana pun.
- *Visual:* Diagram kontras: Komputasi arah maju (Private Key ke Public Key) berjalan instan vs Komputasi arah mundur (Public Key ke Private Key) membentur tembok matematis ECDLP.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Inti keamanan kunci privat di blockchain: ECDLP (Elliptic Curve Discrete Logarithm Problem).
- Private key adalah angka bulat acak $k$, public key adalah titik koordinat $(x, y)$ dari $k \cdot G$.
- Membalikkan koordinat untuk mencari $k$ butuh $2^{128}$ langkah komputasi, mustahil dibongkar secara brute-force.

**Naskah Tutur (Voiceover Script):**
Di sinilah letak benteng pertahanan utama seluruh akun kripto kita: Elliptic Curve Discrete Logarithm Problem atau ECDLP.
Menghitung ke arah depan sangat mudah dan cepat: jika kalian memiliki angka skalar $k$ dan titik generator $G$, komputer menghitung titik hasil $P$ sama dengan $k$ dikali $G$ dalam sekejap mata.
Tetapi jika saya hanya memberikan koordinat titik $P$ dan titik $G$, tidak ada rumus matematika di dunia yang bisa langsung memecahkan berapa nilai angka rahasia $k$.
Di arsitektur blockchain:
Private Key kalian sebenarnya hanyalah sebuah bilangan bulat acak sepanjang 256 bit yang dipilih dari ruang angka raksasa.
Sedangkan Public Key kalian adalah titik koordinat $(x, y)$ di atas kurva eliptik yang didapat dari perkalian skalar private key tersebut dengan titik generator.
Untuk membongkar private key seseorang dari public key miliknya, seorang peretas wajib memecahkan masalah logaritma diskret.
Algoritma terbaik yang dikenal manusia saat ini, yaitu algoritma Pollard's rho, masih membutuhkan sekitar dua pangkat 128 langkah komputasi.
Ini membuat kunci privat kalian kebal terhadap pembajakan brute-force selama menggunakan komputer klasik.

---

## Slide 8: Standar Kurva di Blockchain: secp256k1 vs. Ed25519

### Konten Slide
- **Pemilihan Standar Kurva:** Berakar pada pertimbangan kinerja, keamanan implementasi, dan independensi dari intervensi eksternal.
- **1. secp256k1 (Koblitz Curve):**
  - Digunakan oleh: **Bitcoin** dan **Ethereum**.
  - Persamaan Kurva: $y^2 \equiv x^3 + 7 \pmod p$.
  - Rasional Satoshi Nakamoto: Sengaja menghindari kurva standar NIST (seperti secp256r1) karena kekhawatiran adanya pintu belakang rahasia (*NSA mathematical backdoor*); parameter kurva Koblitz dipilih secara deterministik.
  - Efisiensi: Koefisien $a = 0$ memungkinkan optimasi endomorfisme yang mempercepat verifikasi hingga 30 persen.
- **2. Ed25519 / Curve25519 (Twisted Edwards Curve):**
  - Digunakan oleh: **Solana**, **Polkadot**, **NEAR**, dan **Cosmos**.
  - Dirancang oleh Daniel J. Bernstein pada tahun 2011.
  - Keunggulan: Rumus penambahan titik lengkap (*complete addition formulas*) tanpa kondisi pembagian nol, kebal terhadap serangan kebocoran waktu (*side-channel attacks*), dan verifikasi tanda tangan sangat cepat.
- *Visual:* Peta komparasi dua kubu standar: Kubu secp256k1 (Bitcoin dan Ethereum) vs Kubu Ed25519 (Solana dan Polkadot).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bitcoin dan Ethereum menggunakan secp256k1 (kurva Koblitz).
- Satoshi sengaja menghindari kurva NIST karena mencurigai celah rahasia dari intelijen.
- Solana dan Polkadot menggunakan Ed25519: lebih cepat dan kebal side-channel timing attacks.

**Naskah Tutur (Voiceover Script):**
Di industri blockchain, ada dua standar kurva eliptik utama yang mendominasi ekosistem.
Yang pertama adalah secp256k1 yang digunakan oleh Bitcoin dan Ethereum.
Kurva ini memiliki persamaan aljabar sederhana: $y^2$ kongruen dengan $x^3 + 7$.
Mengapa Satoshi Nakamoto memilih kurva ini pada tahun 2008?
Waktu itu, hampir semua sistem korporasi menggunakan kurva standar NIST, seperti secp256r1.
Namun Satoshi sengaja menghindari standar NIST karena komunitas kriptografer mencurigai adanya konstanta acak yang disisipkan oleh badan intelijen Amerika Serikat sebagai pintu belakang matematika.
Kurva secp256k1 memiliki parameter yang sepenuhnya deterministik dan mendukung komputasi endomorfisme yang mempercepat verifikasi hingga tiga puluh persen.
Standar kurva kedua adalah Ed25519 yang dirancang oleh Daniel J. Bernstein pada tahun 2011 dan diadopsi oleh blockchain generasi baru seperti Solana dan Polkadot.
Kurva ini berjenis Twisted Edwards dengan keunggulan rumus penambahan titik yang lengkap tanpa perkecualian pembagian nol.
Hal ini membuat Ed25519 secara alami kebal terhadap eksploitasi kebocoran waktu prosesor atau *side-channel attacks*, serta memiliki kecepatan verifikasi tanda tangan yang luar biasa tinggi.

---

## Slide 9: Tanda Tangan Digital: Autentikasi, Non-Repudiasi, Integritas

### Konten Slide
- **Definisi Digital Signature:** Bukti matematika yang membuktikan bahwa pemegang private key menyetujui transaksi tertentu tanpa membocorkan kunci rahasianya.
- **Tiga Jaminan Keamanan Mutlak:**
  - *Authentication:* Membuktikan secara matematis bahwa pesan transaksi dibuat oleh pemilik akun yang sah.
  - *Non-Repudiation:* Pengirim tidak dapat menyangkal pengiriman transaksi di masa depan karena tanda tangan hanya dapat dibentuk menggunakan private key miliknya.
  - *Integrity:* Menjamin bahwa transaksi tidak mengalami perubahan atau manipulasi satu karakter pun selama transit di internet.
- **Tiga Algoritma Formal Skema Tanda Tangan:**
  - $\text{KeyGen}() \to (sk, pk)$: Menghasilkan pasangan private key dan public key.
  - $\text{Sign}(sk, m) \to \sigma$: Menghasilkan tanda tangan digital dari muatan pesan dan private key.
  - $\text{Verify}(pk, m, \sigma) \to \{\text{True}, \text{False}\}$: Memeriksa validitas tanda tangan secara terbuka bagi publik.
- *Visual:* Sequence diagram proses penandatanganan transaksi oleh Alice, transmisi payload publik ke jaringan, dan verifikasi independen oleh simpul Bob.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tanda tangan digital bukan gambar tanda tangan basah di dokumen PDF.
- Tiga jaminan mutlak: autentikasi, tidak bisa disangkal (non-repudiation), dan integritas data.
- Tiga fungsi inti: KeyGen, Sign, dan Verify.

**Naskah Tutur (Voiceover Script):**
Sekarang kita melangkah ke fungsi terpenting dari kriptografi kunci publik di blockchain: Tanda Tangan Digital.
Tanda tangan digital bukanlah scan tanda tangan basah di atas dokumen PDF yang mudah dipalsukan lewat Photoshop.
Tanda tangan digital adalah bukti kriptografis murni yang mengikat isi transaksi dengan kunci privat pengirim secara matematis.
Protokol ini memberikan tiga jaminan keamanan mutlak.
Pertama, *Authentication*: seluruh dunia tahu pasti bahwa instruksi transfer dana dibuat oleh pemilik kunci privat yang sah.
Kedua, *Non-Repudiation*: pengirim tidak bisa menyangkal pernah mengirim transaksi tersebut di kemudian hari, karena tidak ada entitas lain di dunia yang memiliki private key miliknya.
Ketiga, *Integrity*: jika ada pihak penengah di jaringan yang mencoba mengubah nominal transfer atau alamat penerima walau hanya satu karakter, tanda tangan tersebut seketika menjadi batal dan tertolak.
Secara formal, skema ini terdiri dari tiga fungsi matematika: fungsi KeyGen untuk membuat pasangan kunci, fungsi Sign untuk menandatangani pesan, dan fungsi Verify untuk memvalidasi tanda tangan tersebut secara terbuka.

---

## Slide 10: Algoritma ECDSA dan Bahaya Fatal Nonce Reuse

### Konten Slide
- **Mekanisme Tanda Tangan ECDSA:**
  - Diberikan hash transaksi $z = \text{Hash}(m)$ dan private key $d$.
  - Sistem wajib menghasilkan angka acak sementara bernama **ephemeral key** atau nonce: $k \in [1, n-1]$.
  - Hitung titik kurva $(x_1, y_1) = k \cdot G$, lalu tentukan skalar $r = x_1 \pmod n$.
  - Hitung skalar $s = k^{-1}(z + r \cdot d) \pmod n$. Tanda tangan digital adalah pasangan $\sigma = (r, s)$.
- **Ancaman Mematikan: Penggunaan Ulang Nonce ($k$ Reuse):**
  - Jika penandatangan menggunakan nonce $k$ yang sama untuk menandatangani dua transaksi berbeda ($m_1$ dan $m_2$), nilai $r$ pada kedua tanda tangan bernilai kembar.
  - Pihak luar dapat menghitung nonce $k$ secara aljabar dasar: $k = (z_1 - z_2)(s_1 - s_2)^{-1} \pmod n$.
  - Begitu nilai $k$ diketahui, private key $d$ terbongkar seketika: $d = r^{-1}(s_1 \cdot k - z_1) \pmod n$.
- **Preseden Nyata & Solusi RFC 6979:**
  - Keruntuhan proteksi kode pada Sony PlayStation 3 (2010) akibat penggunaan nonce $k$ statis.
  - Pencurian massal dompet Bitcoin Android (2013) akibat kelemahan generator bilangan acak semu (PRNG).
  - *Solusi Industri (RFC 6979):* Menghasilkan nonce $k$ secara deterministik dari hash kombinasi private key dan data transaksi.
- *Visual:* Rumus matematika penurunan private key akibat tabrakan nonce, disandingkan dengan diagram pembangkitan nonce deterministik RFC 6979.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tanda tangan ECDSA menghasilkan pasangan angka (r, s).
- Membutuhkan angka acak sementara bernama nonce k.
- Jika nonce k dipakai dua kali, private key bisa dibongkar lewat aljabar biasa (kasus PS3 dan bug Android).
- Solusi modern: standar RFC 6979 untuk menghasilkan nonce k secara deterministik.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah algoritma tanda tangan yang paling umum di dunia blockchain: Elliptic Curve Digital Signature Algorithm atau ECDSA.
Di dalam ECDSA, tanda tangan digital kalian berwujud sepasang angka 256-bit yang kita beri simbol $r$ dan $s$.
Untuk menghitung nilai ini, algoritma membutuhkan sebuah angka acak rahasia sekali pakai yang disebut ephemeral key atau nonce $k$.
Di sinilah letak salah satu celah keamanan paling berbahaya dalam sejarah kriptografi terapan.
Nilai nonce $k$ ini wajib selalu unik dan tidak boleh ditebak untuk setiap transaksi baru.
Jika sebuah aplikasi dompet menandatangani dua transaksi yang berbeda dengan nilai nonce $k$ yang sama persis, nilai $r$ pada kedua tanda tangan tersebut akan kembar identik.
Begitu ada dua tanda tangan dengan $r$ yang sama beredar di jaringan publik, siapa pun yang mengamati transaksi dapat membongkar nilai $k$ hanya dengan pengurangan dan pembagian aljabar biasa.
Begitu nilai $k$ terbongkar, private key korban dapat dihitung dalam hitungan detik.
Bencana ini pernah meruntuhkan sistem proteksi konsol PlayStation 3 pada tahun 2010 ketika Sony ceroboh menggunakan nonce statis, serta memicu pencurian jutaan dolar dari dompet Bitcoin Android pada tahun 2013 akibat generator acak yang cacat.
Untuk mengatasi celah mematikan ini, standar modern mengadopsi RFC 6979.
Algoritma ini menghasilkan nonce $k$ secara deterministik dengan me-hash private key dan muatan pesan, menjamin nilai yang selalu unik, tidak dapat ditebak pihak luar, dan seratus persen aman.

---

## Slide 11: Kerentanan Signature Malleability dan Solusi BIP-141 (SegWit)

### Konten Slide
- **Fenomena Malleability pada Kurva Eliptik:**
  - Karena simetri kurva eliptik terhadap sumbu horizontal, jika $(r, s)$ adalah tanda tangan sah untuk hash pesan $z$, maka $(r, -s \pmod n)$ juga sah secara matematis untuk public key yang sama.
  - Siapa pun di jaringan dapat membalik nilai $s$ tanpa perlu mengetahui private key milik pengirim.
- **Eksploitasi TxID pada Arsitektur Klasik Bitcoin:**
  - Pada desain awal, Transaction ID (TxID) dihitung dari hash seluruh payload transaksi mentah termasuk tanda tangan.
  - Penyerang dapat mencegat transaksi di jaringan mempool, mengubah tanda tangan ke bentuk alternatif $(-s)$, dan memancarkan ulang transaksi tersebut.
  - Transaksi tetap valid dan diproses penambang, namun memiliki TxID baru yang berbeda dari transaksi asli.
  - Memicu kekacauan pada bursa pertukaran otomatis: sistem menduga penarikan dana gagal sehingga mengirimkan ulang saldo.
- **Resolusi Protokol:**
  - **BIP-66 (2015):** Menolak secara konsensus tanda tangan yang memiliki nilai $s$ tinggi (*high-s values*).
  - **BIP-141 Segregated Witness / SegWit (2017):** Memisahkan data tanda tangan (*witness*) sepenuhnya dari formula penghitungan TxID.
- *Visual:* Diagram perbandingan formula TxID lama (mencakup data signature) vs formula SegWit (TxID hanya menghitung payload transaksi dasar, data witness dipisahkan).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Simetri kurva membuat pasangan (r, -s) juga sah secara matematis.
- Penyerang bisa memodifikasi tanda tangan tanpa merusak validitas transaksi (malleability).
- Perubahan tanda tangan mengubah TxID lama, memicu penipuan penarikan saldo bursa kripto.
- SegWit (BIP-141) menyelesaikan masalah ini secara permanen dengan memisahkan witness dari TxID.

**Naskah Tutur (Voiceover Script):**
Celah produksi kedua yang meninggalkan luka bersejarah dalam perkembangan Bitcoin adalah *Signature Malleability*.
Karena kurva eliptik bersifat simetris terhadap sumbu horizontal, jika pasangan angka $r$ dan $s$ adalah tanda tangan yang sah, maka pasangan $r$ dan minus $s$ modulo $n$ juga sah secara matematis untuk kunci publik yang sama.
Artinya, pihak ketiga di jaringan dapat mengubah nilai $s$ menjadi minus $s$ tanpa perlu mengetahui kunci privat pengirim.
Tanda tangannya tetap valid, tetapi susunan byte transaksi mentahnya berubah.
Pada arsitektur awal Bitcoin, Transaction ID atau TxID dihitung dari hash seluruh isi transaksi termasuk tanda tangannya.
Ketika penyerang mengubah tanda tangan tadi di jaringan, TxID transaksi tersebut otomatis berubah.
Akibatnya, bursa kripto yang mengirim koin ke pengguna bisa mengira transaksinya gagal karena TxID aslinya tidak pernah tercatat di blockchain, padahal transaksinya sudah berhasil dieksekusi oleh penambang dengan TxID baru.
Bursa otomatis tersebut bisa tertipu dan mengirimkan dana untuk kedua kalinya.
Bitcoin menyelesaikan masalah ini secara permanen lewat pembaruan Segregated Witness atau SegWit pada tahun 2017.
SegWit memisahkan data tanda tangan yang disebut *witness* keluar dari perhitungan TxID, sehingga transaksi menjadi sepenuhnya kebal manipulasi pihak ketiga.

---

## Slide 12: Public Key Recovery dan Schnorr Signatures

### Konten Slide
- **Public Key Recovery pada Ethereum (Parameter $v$):**
  - Transaksi Ethereum tidak mencantumkan public key pengirim sebesar 64 byte untuk menghemat ukuran calldata.
  - Menyertakan recovery identifier byte $v \in \{27, 28\}$ (atau $v \in \{35, 36 + 2 \cdot \text{ChainID}\}$ di bawah EIP-155).
  - Opcode EVM `ecrecover` merekonstruksi public key pengirim secara langsung dari hash pesan dan tanda tangan $(r, s, v)$, memangkas biaya gas on-chain.
- **Revolusi Schnorr Signatures (Bitcoin Taproot BIP-340):**
  - Dipatenkan oleh Claus Schnorr pada tahun 1990; paten kedaluwarsa sehingga dapat diaktifkan di Bitcoin pada tahun 2021.
  - Bersifat linear secara aljabar: penjumlahan tanda tangan setara dengan tanda tangan dari penjumlahan kunci publik.
  - **Agregasi Multi-Signature (MuSig2):** Transaksi multi-signature 3-dari-3 dapat digabungkan secara off-chain menjadi satu tanda tangan kompak 64-byte tunggal.
  - **Privasi dan Efisiensi:** Transaksi multi-signature terlihat identik dengan transaksi tunggal biasa di mata para pengamat blockchain.
- *Visual:* Diagram alur kerja opcode ecrecover di Ethereum berdampingan dengan skema penggabungan tiga tanda tangan menjadi satu tanda tangan Schnorr tunggal.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ethereum menggunakan public key recovery via parameter v (opcode ecrecover) untuk menghemat gas.
- Bitcoin mengadopsi Schnorr Signatures lewat upgrade Taproot (BIP-340) pada 2021.
- Sifat linear Schnorr memungkinkan agregasi multi-signature menjadi satu tanda tangan tunggal yang privat dan hemat tempat.

**Naskah Tutur (Voiceover Script):**
Mari kita cermati dua inovasi lanjutan dalam teknologi tanda tangan digital blockchain.
Pertama, di ekosistem Ethereum, pengguna tidak perlu melampirkan kunci publik 64-byte mereka di setiap transaksi.
Ethereum memanfaatkan teknik *Public Key Recovery* dengan menyertakan satu byte identitas pemulihan yang disebut parameter $v$.
Melalui opcode bawaan EVM bernama `ecrecover`, mesin virtual Ethereum dapat merekonstruksi kembali kunci publik pengirim secara langsung dari tanda tangan dan hash transaksi.
Penghematan 64 byte per transaksi ini secara signifikan memangkas konsumsi gas bagi pengguna di seluruh dunia.
Inovasi besar kedua datang dari ekosistem Bitcoin melalui upgrade Taproot pada tahun 2021 yang memperkenalkan Schnorr Signatures.
Skema Schnorr sebenarnya sudah ditemukan sejak era 1990-an, namun sempat tertahan oleh hak paten komersial.
Tanda tangan Schnorr memiliki keunggulan matematika yang sangat elegan karena sifatnya yang linear.
Artinya, jika Alice, Bob, dan Charlie ingin mengeksekusi transaksi multi-signature bersama, ketiga tanda tangan mereka dapat digabungkan secara off-chain menjadi satu tanda tangan standar 64 byte saja.
Di mata para pemeriksa blockchain, transaksi multi-sig yang rumit terlihat persis sama seperti transaksi pengguna tunggal biasa.
Ini menghadirkan lompatan besar dalam hal efisiensi kapasitas blok sekaligus melindungi privasi para pihak yang bertransaksi.

---

## Slide 13: Pipeline Derivasi Alamat: Bitcoin Base58Check vs. Ethereum EIP-55

### Konten Slide
- **Distingsi Public Key vs. Alamat:** Public key adalah titik koordinat kurva eliptik yang berukuran besar; alamat adalah representasi ringkas dengan proteksi salah ketik.
- **1. Pipeline Alamat Bitcoin (Legacy P2PKH):**
  - Kunci privat menghasilkan kunci publik terkompresi 33-byte: $P = k \cdot G$.
  - Double Hash (HASH160): $\text{Hash160} = \text{RIPEMD-160}(\text{SHA-256}(P))$ menghasilkan digest 20-byte.
  - Tambahkan version byte ($0x00$) dan 4-byte checksum dari double SHA-256.
  - Encode menggunakan **Base58Check**: Menghilangkan karakter ambigu visual ($0, O, I, l$) untuk mencegah kesalahan baca manual.
- **2. Pipeline Alamat Ethereum:**
  - Kunci publik koordinat $(x, y)$ sepanjang 64 byte di-hash menggunakan Keccak-256.
  - Ambil 20 byte paling kanan (40 karakter heksadesimal terakhir) dan tambahkan awalan `0x`.
  - **Checksum EIP-55 (Mixed-Case):** Kapitalisasi huruf heksadesimal ditentukan oleh hash dari alamat huruf kecil; kesalahan ketik satu karakter memicu penolakan transaksi otomatis oleh dompet.
- *Visual:* Diagram alur perbandingan dua pipa derivasi alamat: Jalur Bitcoin (HASH160 ke Base58Check) vs Jalur Ethereum (Keccak-256 ke EIP-55 checksum).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Public key bukan alamat dompet.
- Derivasi Bitcoin: SHA-256, RIPEMD-160 (20 byte), lalu Base58Check yang membuang huruf membingungkan.
- Derivasi Ethereum: Keccak-256, ambil 20 byte terakhir, lalu beri checksum huruf besar/kecil EIP-55.

**Naskah Tutur (Voiceover Script):**
Sering kali pengguna awam mengira alamat dompet yang mereka bagikan adalah kunci publik mereka.
Faktanya tidak demikian.
Kunci publik adalah titik koordinat kurva matematika yang cukup panjang dan rentan salah ketik.
Untuk kenyamanan dan keamanan pengguna, blockchain memproses kunci publik melalui serangkaian fungsi hash untuk menghasilkan alamat dompet yang ringkas dan aman.
Di jaringan Bitcoin, kunci publik 33-byte pertama-tama diproses lewat fungsi SHA-256 lalu dipadatkan lagi dengan RIPEMD-160 menghasilkan ringkasan 20 byte yang disebut HASH160.
Setelah ditambah byte versi jaringan dan empat byte checksum keamanan, data ini dienkripsi dengan format Base58Check.
Format Base58 secara sengaja membuang karakter-karakter yang membingungkan mata manusia, seperti angka nol dan huruf O besar, atau huruf I besar dan huruf L kecil.
Sementara itu di Ethereum, alurnya lebih ringkas.
Kunci publik 64-byte langsung di-hash menggunakan Keccak-256, lalu diambil 20 byte paling belakang.
Untuk mencegah pengguna salah mentransfer dana akibat salah ketik, Ethereum menerapkan standar EIP-55.
Standar ini memanfaatkan kombinasi huruf besar dan huruf kecil pada alamat heksadesimal sebagai checksum otomatis.
Jika ada satu huruf saja yang salah ketik, aplikasi dompet seketika menolak transaksi sebelum sempat disiarkan ke internet.

---

## Slide 14: Jembatan ke Modul Berikutnya: Propagasi Transaksi di Jaringan P2P

### Konten Slide
- **Kelengkapan Fondasi Kriptografis Kedaulatan:**
  - Alice menandatangani transaksi menggunakan private key miliknya, membuktikan otoritas kepemilikan secara mutlak tanpa bantuan bank sentral.
  - Setiap simpul jaringan di seluruh dunia dapat memverifikasi keabsahan transaksi menggunakan public key milik Alice.
  - Transaksi dirangkum dan disegel ke dalam blok menggunakan Merkle tree untuk menjamin integritas permanen.
- **Tantangan Komunikasi Baru:**
  - Transaksi sah yang tersimpan di laptop Alice tidak menghasilkan penyelesaian nilai jika tidak terdistribusi ke validator di belahan dunia lain.
  - Tanpa server sentral seperti Amazon AWS, Cloudflare, atau API gateway terpusat, bagaimana instruksi pembayaran disiarkan ke ribuan komputer secara serentak?
  - Bagaimana simpul-simpul independen saling menemukan (*peer discovery*), menyebarkan blok, dan bertahan dari sensor ISP?
- **Materi Modul Berikutnya:** Membedah tulang punggung komunikasi terdesentralisasi: **Peer-to-Peer Networks and Network Topologies**.
- *Visual:* Ilustrasi laptop Alice memancarkan gelombang transaksi ke jaringan jala simpul komputer yang saling terhubung di seluruh bola dunia.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kepemilikan dan otorisasi matematis sudah tuntas dibahas.
- Masalah baru: bagaimana transaksi di laptop Alice bisa sampai ke validator global tanpa server sentral?
- Teaser materi modul 1.4: Peer-to-Peer Networks & Network Topologies.

**Naskah Tutur (Voiceover Script):**
Kini kita telah menguasai seluruh perangkat kriptografi yang dibutuhkan untuk kedaulatan kepemilikan digital.
Kita paham bagaimana Alice menandatangani transaksi dengan private key miliknya untuk membuktikan otoritas secara absolut tanpa bergantung pada bank sentral.
Kita paham bagaimana seluruh komputer di dunia memverifikasi keaslian tanda tangan tersebut menggunakan public key milik Alice.
Dan kita tahu bagaimana transaksi tersebut dikunci rapat di dalam pohon Merkle.
Namun, ada satu masalah praktis yang tersisa.
Transaksi yang sudah ditandatangani dengan sempurna di laptop Alice tidak ada gunanya jika hanya tersimpan di hard drive lokalnya.
Di dunia terdesentralisasi, tidak ada server web sentral, tidak ada Amazon Web Services, dan tidak ada API gateway terpusat tempat Alice mengunggah datanya.
Lalu bagaimana cara instruksi pembayaran Alice bisa menyebar ke puluhan ribu validator yang tersebar di lima benua dalam hitungan detik?
Bagaimana komputer-komputer asing tersebut saling menemukan satu sama lain di belantara internet terbuka dan bertahan dari serangan sensor?
Di modul penutup dari trek Distributed Trust ini, kita akan membedah fondasi jaringan komunikasi yang menopang seluruh pertukaran data ini: Peer-to-Peer Networks and Network Topologies.
Sampai jumpa di modul berikutnya.
