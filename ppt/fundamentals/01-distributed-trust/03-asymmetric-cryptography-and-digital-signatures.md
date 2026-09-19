# Asymmetric Cryptography and Digital Signatures
Modul Presentasi: Fondasi Distributed Trust (01.3)

---

---

## Slide 1: Asymmetric Cryptography and Digital Signatures

### Konten Slide
Asymmetric Cryptography and Digital Signatures
Fundamentals of Distributed Trust: Module 01.3
The mathematical foundations of sovereign ownership, elliptic curve keypairs, and non-repudiable digital signatures.

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

---

## Slide 2: The Symmetric Dilemma: The Key Distribution Problem

### Konten Slide
The Symmetric Dilemma: The Key Distribution Problem
The Symmetric Dilemma:
- Mechanism: Classical cryptography relies on a shared secret key K for both encryption and decryption (e.g., AES).
- The Fatal Flaw: Agreeing on K over an open network exposes it to eavesdroppers. Scaling to N users requires O(N^2) secret communication channels.
- Legacy Fix: Centralized financial intermediaries act as trust brokers, holding passwords in closed databases, creating a single point of failure.

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

---

## Slide 3: The Asymmetric Revolution: Public Key Cryptography

### Konten Slide
The Asymmetric Revolution: Public Key Cryptography
The Asymmetric Revolution (1970s):
- Mechanism: Diffie, Hellman, and Merkle introduced the Mathematical Keypair.
- Private Key (sk): Secret scalar value. Used to authorize value transfer.
- Public Key (pk): Openly distributed coordinate. Used by the entire network to independently verify signatures.
- Mathematical Absolutism: Deriving pk from sk is instantaneous. Reverse-engineering sk from pk is computationally impossible.

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

---

## Slide 4: Trapdoor One-Way Functions & ECC Superiority

### Konten Slide
Trapdoor One-Way Functions & ECC Superiority
Integer Factorization (RSA):
- Mechanism: Easy to multiply primes (N = p * q), but infeasible to factor N without the trapdoor.
- Security Standard: 128-bit industry security requires a massive 3,072-bit key length.
- Blockchain Verdict: Too bloated. Explodes validator state storage.

Elliptic Curve Cryptography (ECC):
- Mechanism: Easy to multiply a curve point by a scalar, but impossible to find the scalar from the resulting point (Discrete Logarithm).
- Security Standard: 128-bit security requires only a 256-bit key length.
- Blockchain Verdict: The undisputed standard. 12x smaller than RSA, maximizing state storage efficiency.

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

---

## Slide 5: Elliptic Curve Algebra & Finite Fields

### Konten Slide
Elliptic Curve Algebra & Finite Fields
The Algebraic Baseline:
Defined geometrically by the equation y^2 = x^3 + ax + b.

The Floating-Point Hazard:
Evaluating continuous curves on real numbers requires decimals.
Different CPU architectures execute floating-point rounding differently, permanently fracturing decentralized consensus.

The Modular Solution:
Curves are restricted to a finite field modulo a massive prime number p:
y^2 = x^3 + ax + b (mod p)
The curve collapses into discrete integers, preserving group laws with deterministic precision.

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

---

## Slide 6: Group Law and the ECDLP Fortress

### Konten Slide
Group Law and the ECDLP Fortress
Group Law Operations:
- Point Addition (P + Q = R): Intersect curve with secant line, reflect across x-axis.
- Point Doubling (P + P = 2P): Intersect tangent line with curve, reflect across x-axis.
- Scalar Multiplication: P = k * G computed in logarithmic time O(log k) via Double-and-Add.

The ECDLP Fortress:
Given private key scalar k and generator point G, calculating public key P is instantaneous.
Given only P and G, the Elliptic Curve Discrete Logarithm Problem dictates finding k requires 2^128 operations (Pollard rho), strictly impossible for classical supercomputers.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Aritmatika grup kurva eliptik: Point Addition (P + Q) dan Point Doubling (P + P = 2P).
- Perkalian skalar P = k * G dihitung dalam waktu logaritmik O(log k) lewat algoritma Double-and-Add.
- Benteng ECDLP: menghitung maju P = k * G sangat instan, membalik mencari k membutuhkan 2^128 operasi Pollard rho.
- Mengamankan kedaulatan private key dari serangan komputer tercanggih di dunia.

**Naskah Tutur (Voiceover Script):**
Di atas medan berhingga ini, kurva eliptik memiliki operasi aritmatika penambahan titik yang unik.
Jika Anda menghubungkan dua titik P dan Q dengan garis lurus, garis tersebut akan memotong kurva pada titik ketiga.
Dengan mencerminkan titik tersebut terhadap sumbu x, kita memperoleh hasil penjumlahan titik: R sama dengan P ditambah Q.
Jika kita menjumlahkan titik P dengan dirinya sendiri, kita menarik garis singgung untuk memperoleh Point Doubling: dua P.
Dari kedua operasi dasar ini, kita dapat melakukan perkalian skalar titik.
Kita mengambil titik generator publik G, lalu menjumlahkannya sebanyak k kali: P sama dengan k dikali G.
Perhitungan maju ini berjalan sangat cepat berkat algoritma Double-and-Add yang bekerja dalam waktu logaritmik O(log k), selesai dalam fraksi milidetik di prosesor standar.
Namun, keajaiban kriptografis kurva eliptik terletak pada asimetri satu arahnya yang dikenal sebagai Elliptic Curve Discrete Logarithm Problem atau ECDLP.
Jika seseorang mengetahui titik generator G dan titik hasil akhir P, mencari nilai skalar privat k membutuhkan rata-rata 2 pangkat 128 operasi pencarian algoritma Pollard rho.
ECDLP adalah benteng matematika yang mustahil ditembus oleh superkomputer terkuat di dunia saat ini, menjadikannya fondasi kedaulatan private key Anda.

---

## Slide 7: Layer 1 Curve Standards: secp256k1 vs. Ed25519

### Konten Slide
Layer 1 Curve Standards: secp256k1 vs. Ed25519
secp256k1 (Koblitz Curve, Bitcoin & Ethereum):
- Equation: y^2 = x^3 + 7 (mod p).
- The NSA Suspicion: Satoshi rejected NIST curves due to backdoor concerns. Deterministic parameters with a=0 endomorphism acceleration (30% faster verification).

Ed25519 (Twisted Edwards Curve, Solana, Polkadot, NEAR):
- Designed by Daniel J. Bernstein (2011).
- The Security Edge: Features complete addition formulas without zero-division exceptions. Grants natural immunity against timing side-channel attacks and ultra-fast verification.

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

---

## Slide 8: The Digital Signature Trilemma & ECDSA

### Konten Slide
The Digital Signature Trilemma & ECDSA
The Digital Signature Trilemma:
- Authentication: Mathematically proves instruction originated from the true private key holder.
- Non-Repudiation: Sender cannot later deny authorizing the transaction.
- Integrity: Modifying a single byte of payload invalidates signature instantly.

The ECDSA Mechanism:
Pipeline: KeyGen() -> (sk, pk), Sign(sk, m) -> (r, s), Verify(pk, m, (r, s)) -> True / False.
Uses ephemeral nonce k to sign transaction hash z into final signature pair (r, s).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Tiga jaminan mutlak tanda tangan digital: Autentikasi, Non-Repudiasi, dan Integritas.
- Autentikasi membuktikan kepemilikan tanpa membocorkan kunci privat.
- Non-Repudiasi mencegah penyangkalan otorisasi transaksi.
- Mekanisme ECDSA: memetakan hash transaksi z dan kunci privat menggunakan ephemeral nonce k menghasilkan pasangan tanda tangan (r, s).

**Naskah Tutur (Voiceover Script):**
Dengan kurva eliptik ini, kita dapat membangun skema tanda tangan digital modern yang memenuhi tiga jaminan kedaulatan informasi.
Jaminan pertama adalah Authentication: tanda tangan membuktikan secara matematis bahwa pesan transfer benar-benar dibuat oleh pemegang kunci privat sah tanpa pernah membocorkan kunci tersebut ke publik.
Jaminan kedua adalah Non-Repudiation: pengirim tidak dapat menyangkal bahwa ia telah menyetujui transaksi tersebut, karena hanya kunci privat miliknya yang sanggup menciptakan bukti matematis tersebut.
Jaminan ketiga adalah Integrity: jika ada peretas yang mengubah nilai transfer atau alamat penerima sebesar satu byte saja di tengah jalan, tanda tangan digital akan seketika menjadi tidak sah dan ditolak oleh seluruh simpul jaringan.
Algoritma standar industri yang mengimplementasikan ketiga pilar ini pada Bitcoin dan Ethereum adalah ECDSA.
Dalam alur kerja ECDSA, penandatangan mengambil hash transaksi z, kunci privat d, serta sebuah angka acak sementara bernama ephemeral nonce k.
Melalui perkalian skalar kurva, algoritma memetakan nilai-nilai ini menjadi sepasang angka koordinat tanda tangan yang kompak: r dan s.
Seluruh simpul di dunia dapat memvalidasi pasangan r dan s ini hanya menggunakan kunci publik Anda.

---

## Slide 9: Signature Malleability and the BIP-141 Resolution

### Konten Slide
Signature Malleability and the BIP-141 Resolution
The Fatal Nonce Reuse (k Reuse):
Reusing ephemeral nonce k across two signatures exposes private key via elementary linear algebra (PS3 breach 2010, Android Bitcoin 2013).
Resolution: RFC 6979 deterministic nonce generation.

Signature Malleability:
Because curves are symmetric, if (r, s) is valid, so is (r, -s mod n).
Attackers could mutate legacy TxIDs without private keys.
Resolution (SegWit BIP-141): Segregated Witness separates witness data completely out of TxID calculation, rendering core transactions immutable.

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

---

## Slide 10: Advanced Compaction: Public Key Recovery & Schnorr Signatures

### Konten Slide
Advanced Compaction: Public Key Recovery & Schnorr Signatures
Public Key Recovery (Ethereum):
- Utilizes recovery byte v in {27, 28}.
- EVM opcode ecrecover reconstructs sender public key directly from signature and hash, saving 64 bytes per transaction.

Schnorr Signatures (Bitcoin Taproot / BIP-340):
- Linear algebra allows multi-signature aggregation (MuSig2).
- Complex 3-of-3 multi-signatures combine off-chain into a single 64-byte signature indistinguishable from standard single-user transactions.

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

---

## Slide 11: Address Derivation Pipelines: Bitcoin Base58Check vs. Ethereum EIP-55

### Konten Slide
Address Derivation Pipelines: Bitcoin Base58Check vs. Ethereum EIP-55
Bitcoin Legacy Pipeline (P2PKH):
Compressed public key -> SHA-256 -> RIPEMD-160 (20 bytes) -> Base58Check encoding with typo-resistant character stripping (0, O, I, l).

Ethereum Pipeline (EIP-55):
Uncompressed public key -> Keccak-256 -> rightmost 20 bytes -> EIP-55 mixed-case capitalization checksum.
A single typo triggers immediate wallet rejection.

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

---

## Slide 12: Bridge to the Next Module: Transaction Propagation in P2P Networks

### Konten Slide
Bridge to the Next Module: Transaction Propagation in P2P Networks
The Completion of Sovereign Cryptography:
Private keys authorize state changes mathematically, public keys allow universal verification, and Merkle trees seal records permanently.

The Physical Distribution Barrier:
A perfectly signed transaction on Alice laptop cannot settle value without reaching global validators.
Without central relays (AWS, Cloudflare), how does data propagate to thousands of nodes in milliseconds?
Next Module: Peer-to-Peer Networks and Network Topologies.

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
