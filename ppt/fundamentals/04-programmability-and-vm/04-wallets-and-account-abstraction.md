# Wallets and Account Abstraction
Modul Presentasi: Programmability and Virtual Machines (04.4)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Wallets and Account Abstraction
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Arsitektur dompet kripto modern (BIP-39, BIP-32, BIP-44), keterbatasan struktural EOA, dan revolusi Smart Contract Accounts via ERC-4337.
- *Visual:* Ilustrasi metamorfosis dari kunci fisik bergerigi tunggal menjadi akun cerdas digital yang dilengkapi modul biometrik dan pemulihan sosial.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul keempat Chapter 4.
- Membahas jembatan utama interaksi manusia dengan blockchain: dompet digital.
- Menjelaskan lompatan dari dompet berbasis kunci privat kaku menuju akun kontrak pintar terprogram.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul keempat dari Chapter 4.
Di sesi-sesi sebelumnya, kita sudah membedah bagaimana mesin virtual mengeksekusi instruksi dan bagaimana bahan bakar komputasi ditagihkan.
Sekarang kita akan menelaah jembatan paling krusial yang menghubungkan manusia dengan sistem terdesentralisasi ini: dompet kripto.
Bagi sebagian besar masyarakat, dompet digital adalah satu-satunya pintu gerbang mereka ke dunia Web3.
Namun arsitektur akun warisan masa lalu menyimpan bahaya keamanan yang luar biasa menakutkan bagi pengguna biasa.
Hari ini kita akan membedah bagaimana standar hierarkis BIP-39, BIP-32, dan BIP-44 bekerja di balik layar.
Kita juga akan melihat mengapa dompet tradisional atau EOA memiliki cacat desain yang sangat fatal, dan bagaimana inovasi Account Abstraction melalui standar ERC-4337 mengubah akun pengguna menjadi smart contract yang fleksibel, aman, dan ramah pengguna.

---

## Slide 2: Hakikat Dompet Kripto dan Triad Standar BIP

### Konten Slide
- **Miskonsepsi Populer:** Dompet kripto tidak pernah menyimpan koin atau token di dalam memori ponsel atau perangkat fisik hardware.
- **Realitas Arsitektur:**
  - Seluruh saldo aset dan kepemilikan hidup permanen di atas ledger publik terdesentralisasi.
  - Dompet pada hakikatnya adalah perangkat lunak pengelola kunci (*key manager*) yang bertugas menyimpan kunci privat, menghasilkan tanda tangan digital, dan menghitung alamat akun.
- **Pondasi Tiga Standar BIP (Bitcoin Improvement Proposals):**
  - **BIP-39:** Mengonversi entropi acak perangkat keras menjadi frasa mnemonik 12 atau 24 kata yang mudah diingat manusia.
  - **BIP-32:** Menghasilkan pohon pasangan kunci tanpa batas dari satu master seed secara deterministik (*Hierarchical Deterministic*).
  - **BIP-44:** Menstandardisasi jalur pohon derivasi lintas multi-akun dan multi-blockchain dalam satu format universal.
- *Visual:* Bagan rantai alur hierarkis: Entropi Hardware -> BIP-39 Mnemonic -> BIP-32 Master Seed -> BIP-44 Multi-Chain Addresses.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Koin tidak ada di HP kita, melainkan tersimpan di ledger publik blockchain.
- Dompet hanyalah penyimpan kunci privat dan pembuat tanda tangan digital.
- Seluruh dompet modern dibangun di atas tiga standar: BIP-39, BIP-32, dan BIP-44.

**Naskah Tutur (Voiceover Script):**
Langkah awal yang harus kita luruskan adalah memahami apa itu dompet kripto.
Banyak orang awam mengira bahwa koin kripto tersimpan di dalam aplikasi ponsel atau perangkat fisik seperti Ledger dan Trezor.
Secara teknis, pemahaman itu keliru.
Uang kita tidak pernah berada di dalam saku kita, melainkan tersimpan abadi di buku besar publik blockchain sebagai catatan saldo atau UTXO.
Aplikasi dompet kita sebenarnya hanyalah sebuah perangkat lunak pengelola kunci kriptografi.
Dompet bertugas menyimpan private key rahasia, membuat tanda tangan digital untuk mengesahkan transaksi, dan menghitung alamat publik kita.
Di masa awal, pengguna harus mencadangkan setiap kunci privat satu per satu secara manual.
Untuk mengatasi kerepotan tersebut, industri kripto menyepakati tiga standar emas: BIP-39 untuk membuat kata sandi yang mudah dibaca manusia, BIP-32 untuk menurunkan ribuan kunci dari satu sumber, dan BIP-44 untuk mengatur struktur cabang alamat lintas berbagai blockchain.

---

## Slide 3: BIP-39 dan BIP-32: Dari Entropi ke HD Wallet Tree

### Konten Slide
- **Mekanisme Generasi BIP-39 (Mnemonic Words):**
  1. *Hardware Entropy:* Mengambil 128 hingga 256 bit entropi acak murni dari sensor kebisingan fisik perangkat keras.
  2. *Checksum Hashing:* Menghitung hash SHA-256 dari entropi dan menempelkan bit awal sebagai verifikasi keaslian.
  3. *Kamus 2.048 Kata:* Rangkaian bit dipotong ke dalam segmen 11-bit ($2^{11} = 2.048$) yang dipetakan langsung ke daftar kata baku bahasa Inggris.
     - 128 bit menghasilkan **12 kata seed phrase**.
     - 256 bit menghasilkan **24 kata seed phrase**.
  4. *PBKDF2 Key Derivation:* Frasa kata di-hash menggunakan algoritma PBKDF2 HMAC-SHA512 sebanyak 2.048 putaran menghasilkan **512-bit Master Binary Seed**.
- **Mekanisme Derivasi BIP-32 (Hierarchical Deterministic):**
  - Menggunakan perkalian skalar kurva eliptik bersama **Chain Code 32-byte** untuk menurunkan pohon kunci anak tanpa batas.
  - Cukup mencadangkan 12 kata satu kali untuk mengamankan seluruh kunci privat di masa lalu, sekarang, dan masa depan.
- *Visual:* Diagram transformasi entropi biner 128-bit menjadi 12 kata mnemonic yang diubah lewat PBKDF2 menjadi master seed biner 512-bit.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- BIP-39 mengubah deretan angka biner acak menjadi 12 atau 24 kata bahasa Inggris.
- PBKDF2 memutar hash 2.048 kali untuk menghasilkan master seed 512-bit.
- BIP-32 memungkinkan satu master seed melahirkan jutaan kunci anak secara deterministik.

**Naskah Tutur (Voiceover Script):**
Mari kita lihat matematika elegan di balik dua belas kata rahasia yang biasa kita catat di kertas.
Ketika kalian membuat dompet baru, perangkat keras kalian mengumpulkan seratus dua puluh delapan bit data acak murni yang disebut entropi.
Deretan bit biner nol dan satu ini tentu sangat mustahil untuk dihafal atau disalin manusia tanpa kesalahan.
Di sinilah BIP-39 bekerja.
Sistem menambahkan sedikit bit checksum dari hash SHA-256, lalu membagi seluruh deretan bit tersebut menjadi potongan sebelas bit.
Karena dua pangkat sebelas bernilai dua ribu empat puluh delapan, setiap potongan bit langsung dipetakan ke kamus standar berisi dua ribu empat puluh delapan kata bahasa Inggris.
Seratus dua puluh delapan bit entropi ini menghasilkan dua belas kata yang rapi.
Setelah itu, dua belas kata ini dimasukkan ke fungsi pengacak PBKDF2 sebanyak dua ribu empat puluh delapan putaran untuk melahirkan master seed lima ratus dua belas bit.
Dari satu master seed inilah, standar BIP-32 menggunakan chain code untuk menumbuhkan pohon kunci privat anak yang tak terbatas jumlahnya secara matematis.

---

## Slide 4: BIP-44: Hierarki Derivasi Multi-Akun Multi-Chain

### Konten Slide
- **Kebutuhan Standardisasi:** Menghindari kekacauan struktur pohon kunci pada aplikasi dompet yang mendukung beragam jaringan blockchain berbeda.
- **Format Jalur Derivasi Universal (Universal Derivation Path):**
  $$\mathtt{m / \text{purpose}' / \text{coin\_type}' / \text{account}' / \text{change} / \text{address\_index}}$$
- **Bedah Parameter Jalur:**
  - `purpose'`: Angka `44'` menandakan kepatuhan terhadap standar spesifikasi BIP-44.
  - `coin_type'`: Penanda identitas blockchain terdaftar (`0'` untuk Bitcoin, `60'` untuk Ethereum, `501'` untuk Solana).
  - `account'`: Membagi satu seed ke beberapa rekening independen (misal: Rekening Pribadi vs Rekening Kantor).
  - `change`: `0` untuk alamat penerimaan publik eksternal; `1` untuk alamat uang kembalian internal.
  - `address_index`: Nomor urut alamat sekuensial (`0, 1, 2, ...`).
- **Contoh Jalur Ethereum Primer:**
  $$\mathtt{m / 44' / 60' / 0' / 0 / 0}$$
- *Visual:* Struktur diagram pohon direktori bercabang dari Master Seed menuju cabang Bitcoin, Ethereum, dan Solana.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- BIP-44 adalah standar peta jalan penamaan kunci di dalam dompet.
- Format terstandarisasi: tujuan, jenis koin, nomor akun, jenis kembalian, dan indeks alamat.
- Alamat utama Ethereum selalu berada di jalur m/44'/60'/0'/0/0.

**Naskah Tutur (Voiceover Script):**
Setelah kita punya pohon kunci yang tak terbatas dari BIP-32, bagaimana aplikasi dompet tahu kunci mana yang dipakai untuk Bitcoin dan kunci mana yang dipakai untuk Ethereum?
Untuk menjawabnya, komunitas merumuskan standar BIP-44.
BIP-44 menetapkan struktur jalur percabangan yang sangat teratur dengan format lima tingkat.
Tingkat pertama adalah purpose bernilai empat puluh empat.
Tingkat kedua adalah coin_type, di mana setiap blockchain memiliki nomor registrasi resmi tersendiri: angka nol untuk Bitcoin, angka enam puluh untuk Ethereum, dan angka lima ratus satu untuk Solana.
Tingkat ketiga adalah account, memungkinkan kita memisahkan rekening pribadi dan rekening bisnis dari satu frasa kata yang sama.
Tingkat keempat adalah penanda change untuk alamat kembalian, dan tingkat terakhir adalah address_index yang menghitung urutan alamat dari nol, satu, dua, dan seterusnya.
Inilah alasan mengapa kalian bisa memulihkan dua belas kata yang sama di MetaMask, Rainbow, atau Trust Wallet, dan semua dompet tersebut akan selalu menemukan alamat utama Ethereum kalian yang persis sama di jalur m/44'/60'/0'/0/0.

---

## Slide 5: Paradigma Kaku Externally Owned Accounts (EOA)

### Konten Slide
- **Model Akun Bawaan Ethereum:** Akun yang dikendalikan oleh manusia hari ini beroperasi sebagai **Externally Owned Account (EOA)**.
- **Kopling Keras 1-ke-1 (The Rigid 1-to-1 Coupling):**
  - Satu alamat akun terikat mati secara permanen pada satu pasangan kunci privat ECDSA tertentu.
  $$\text{Private Key (sk)} \iff \text{Public Key (pk)} \iff \text{EOA Address (20 Bytes)}$$
- **Karakteristik Operasional EOA:**
  - Akun tidak memiliki kode program (*zero smart contract bytecode*).
  - Akun tidak memiliki ruang penyimpanan database (*zero persistent storage slots*).
  - Satu-satunya cara memicu mutasi status adalah dengan menyiarkan transaksi yang dibubuhi tanda tangan kurva eliptik **ECDSA secp256k1** yang valid dari pemilik kunci privat tersebut.
- *Visual:* Ilustrasi gembok fisik analog tradisional yang hanya bisa dibuka oleh satu anak kunci logam tunggal tanpa opsi alternatif.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- EOA adalah jenis akun standar di MetaMask saat ini.
- Alamat akun dan kunci privat terikat mati secara permanen satu banding satu.
- EOA tidak punya baris kode program dan tidak punya database storage sendiri.

**Naskah Tutur (Voiceover Script):**
Meskipun standar turunan BIP sangat rapi, arsitektur akun di level protokol Ethereum saat ini menyimpan masalah besar.
Akun standar yang kita gunakan di aplikasi seperti MetaMask dinamakan Externally Owned Account atau EOA.
Di dalam model EOA, ada kopling kaku satu banding satu antara alamat dompet di blockchain dengan satu kunci privat tunggal.
Kunci privat adalah identitas kalian, dan identitas kalian adalah kunci privat itu sendiri.
EOA sama sekali tidak memiliki kode program di dalamnya.
Akun ini juga tidak memiliki ruang database penyimpanan.
Satu-satunya cara agar EOA bisa menggerakkan uang atau berinteraksi dengan aplikasi adalah jika transaksi tersebut ditandatangani oleh satu kunci privat dengan algoritma ECDSA secp256k1.
Jika kalian memegang kuncinya, kalian berkuasa mutlak atas akun tersebut.
Namun jika kuncinya hilang, lenyap pulalah seluruh kendali kalian.
Ketiadaan fleksibilitas kode di level akun ini memicu kelemahan keamanan sistemik yang sangat mengerikan.

---

## Slide 6: Empat Titik Lemah Sistemik Model EOA

### Konten Slide
- **1. Titik Kegagalan Katastropik (Catastrophic Loss Mode):**
  - Tidak ada tombol lupa kata sandi (*no password reset*).
  - Kehilangan seed phrase berarti kehilangan dana total selamanya.
  - Kebocoran seed phrase ke situs phishing memungkinkan bot penjarah menguras seluruh saldo dalam hitungan detik tanpa bisa dicegah.
- **2. Ketergantungan Gas Native (The On-Ramp Barrier):**
  - EOA tidak dapat memproses transaksi apa pun tanpa saldo koin Ether native untuk membayar gas.
  - Pengguna yang memegang ribuan dolar saldo USDC tidak dapat mentransfer dananya jika saldo ETH bernilai nol.
- **3. Kelelahan Otorisasi (Signature Fatigue & UX Friction):**
  - Setiap interaksi menuntut tanda tangan terpisah yang memunculkan jendela konfirmasi pop-up berulang kali, merusak pengalaman bermain game on-chain.
- **4. Keterikatan Kriptografi Kaku (Hardcoded Cryptography):**
  - EOA terikat permanen pada kurva secp256k1, tidak dapat memanfaatkan chip keamanan ponsel (*Apple Secure Enclave* / secp256r1) atau skema kebal kuantum.
- *Visual:* Empat kotak peringatan bahaya EOA: phishing instan, saldo tersangkut tanpa ETH, pop-up konfirmasi tanpa henti, dan ketidakcocokan chip biometrik.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- EOA sangat berbahaya untuk pengguna awam.
- Saldo bisa hangus seketika karena phishing atau kehilangan catatan kertas.
- Pengguna tidak bisa kirim USDC jika saldo ETH kosong untuk biaya gas.

**Naskah Tutur (Voiceover Script):**
Mari kita telusuri empat kelemahan fatal dari dompet model EOA ini.
Masalah pertama adalah mode kegagalan katastropik.
Di dunia EOA, tidak ada tombol lupa kata sandi.
Jika selembar kertas catatan kalian terbakar atau hilang saat pindah rumah, seluruh uang kalian hilang abadi.
Sebaliknya, jika kalian terkecoh mengklik tautan phishing, bot otomatis akan menguras seluruh isi dompet kalian dalam tiga detik tanpa ada cara untuk membatalkannya.
Masalah kedua adalah ketergantungan gas native.
Ini adalah tembok penghalang adopsi terbesar.
Pengguna awam yang baru membeli stablecoin bernilai jutaan rupiah tidak mengerti mengapa uang mereka tersangkut dan tidak bisa ditransfer hanya karena mereka tidak punya pecahan koin Ether di dompetnya.
Masalah ketiga adalah friksi antarmuka.
Bermain game di Web3 mengharuskan pengguna menandatangani puluhan pop-up konfirmasi yang melelahkan.
Terakhir, EOA terikat mati pada algoritma kriptografi lawas secp256k1, sehingga kita tidak bisa menggunakan sensor sidik jari ponsel cerdas atau chip keamanan biometrik modern.

---

## Slide 7: Paradigma Account Abstraction

### Konten Slide
- **Konsep Inti:** Memisahkan identitas akun (*who you are*) dari mekanisme otorisasi penandatanganan (*how you authenticate*).
- **Akun Sebagai Smart Contract:**
  - Akun pengguna bukan lagi sekadar pasangan kunci privat pasif, melainkan **Smart Contract Account (SCA)** yang memiliki kode logika program dan ruang database storage.
- **Verifikasi Otorisasi Fleksibel (Programmable Validation):**
  - Logika verifikasi tidak lagi diikat kaku pada kurva secp256k1 di tingkat konsensus.
  - Setiap akun dapat memprogram logika verifikasi transaksinya sendiri di dalam fungsi kontrak:
    - Autentikasi biometrik FaceID dan Passkeys (*WebAuthn secp256r1*).
    - Multi-signature dinamis (2-dari-3 wali tepercaya).
    - Mekanisme perlindungan transaksi mencurigakan dengan jeda waktu (*timelocks*).
- *Visual:* Skema pemisahan identitas: pengguna login via FaceID memicu verifikasi di Smart Contract Account yang terhubung ke jaringan blockchain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Account Abstraction mengubah akun pengguna menjadi smart contract mandiri.
- Memisahkan identitas dari satu kunci privat tunggal.
- Verifikasi transaksi bisa diprogram: bisa pakai FaceID, multi-sig, atau aturan batas transfer harian.

**Naskah Tutur (Voiceover Script):**
Bagaimana kita menyelesaikan seluruh kerapuhan tersebut?
Jawabannya adalah Account Abstraction.
Ide dasar Account Abstraction sangat revolusioner: kita memisahkan identitas akun dari metode penandatanganannya.
Alih-alih akun kalian dikendalikan mati oleh selembar kertas kunci privat, akun kalian diubah menjadi sebuah smart contract mandiri di blockchain.
Karena akun kalian adalah program komputer, aturan mainnya bisa diprogram secara bebas sesuai kebutuhan hidup manusia modern.
Logika validasi transaksi tidak lagi dipaksa menggunakan kurva kriptografi kuno.
Kalian bisa mengatur agar akun kalian hanya mengizinkan transaksi jika disahkan oleh sensor biometrik FaceID di iPhone kalian melalui standar WebAuthn.
Kalian bisa mengatur batas penarikan maksimal seratus dolar per hari.
Bahkan jika nilai transfer melampaui batas aman, kontrak bisa secara otomatis menahan transaksi selama dua puluh empat jam untuk memberi waktu bagi kalian membatalkannya jika ponsel kalian dicuri.

---

## Slide 8: Fitur Unggulan Smart Contract Accounts

### Konten Slide
- **Social Recovery (Pemulihan Tanpa Seed Phrase):**
  - Pengguna dapat menunjuk wali tepercaya (*Guardians*), seperti anggota keluarga, perangkat kedua, atau institusi pemulih.
  - Jika pengguna kehilangan perangkat, konsensus wali dapat menandatangani transaksi rotasi kunci untuk memulihkan akun ke perangkat baru tanpa memindahkan aset.
- **Gas Sponsorship & Pembayaran Fleksibel (Paymasters):**
  - Aplikasi dApp dapat mensponsori biaya gas seratus persen untuk memberikan pengalaman onboarding mulus bagi pengguna baru.
  - Pengguna diizinkan membayar biaya gas langsung menggunakan token ERC-20 yang mereka miliki (misalnya USDC atau DAI) tanpa memerlukan saldo ETH.
- **Session Keys (Otomasi Transaksi Tanpa Pop-up):**
  - Pengguna dapat membuat kunci sesi sementara dengan parameter ketat (misal: aktif selama 2 jam, maksimal transaksi 10 dolar, hanya untuk kontrak game X).
- **Atomic Transaction Batching:**
  - Menggabungkan operasi `approve` token dan `swap` di bursa terdesentralisasi menjadi **satu transaksi atomik tunggal** dalam satu klik.
- *Visual:* Matriks fitur modern: kartu Social Recovery, kartu Paymaster ERC-20, kartu Session Key game, dan kartu Batch 1-Click Swap.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Social recovery menghapus ketakutan kehilangan seed phrase selamanya.
- Paymaster memungkinkan pengguna membayar gas pakai USDC atau disubsidi oleh dApp.
- Transaction batching menggabungkan approve dan swap menjadi satu klik saja.

**Naskah Tutur (Voiceover Script):**
Mari kita lihat fitur-fitur luar biasa yang bisa kita nikmati saat akun kita bertransformasi menjadi smart contract.
Pertama adalah Social Recovery.
Kalian tidak perlu lagi mencatat dua belas kata di kertas dan menyimpannya di brankas bawah tanah.
Kalian bisa menunjuk tiga wali tepercaya, misalnya teman dekat, laptop cadangan, atau lembaga kustodian aman.
Jika ponsel kalian hilang, dua dari tiga wali ini cukup menandatangani persetujuan, dan akun kalian langsung berpindah ke ponsel baru dengan aman tanpa ada saldo yang berpindah.
Kedua adalah fleksibilitas pembayaran gas lewat Paymaster.
Aplikasi game bisa mensponsori seluruh biaya gas pemain barunya secara gratis.
Atau pengguna bisa membayar biaya gas langsung menggunakan saldo dolar USDC mereka tanpa perlu pusing membeli Ether di bursa.
Ketiga adalah Session Keys, di mana kalian bisa memberi izin bermain game selama dua jam tanpa muncul satu pun pop-up konfirmasi yang mengganggu.
Terakhir adalah transaction batching.
Kalian tidak perlu lagi melakukan dua transaksi terpisah untuk approve dan swap token di Uniswap.
Keduanya digabung menjadi satu eksekusi atomik dalam sekali sentuhan layar.

---

## Slide 9: Terobosan ERC-4337 Tanpa Perubahan Konsensus L1

### Konten Slide
- **Tantangan Historis:** Menerapkan Account Abstraction di masa lalu selalu menuntut *hard fork* kontroversial untuk merombak aturan konsensus inti Ethereum Virtual Machine.
- **Inovasi Terobosan ERC-4337 (Tahun 2021):**
  - Menghadirkan Account Abstraction fungsional penuh **tanpa memodifikasi satu baris pun kode konsensus Layer 1**.
  - Mengalihkan beban inovasi ke lapisan aplikasi dan jaringan *mempool* alternatif.
- **Tiga Pilar Komponen Arsitektur ERC-4337:**
  - **Alternative P2P Mempool:** Jalur gossip terpisah khusus untuk menyiarkan objek transaksi tingkat tinggi (*UserOperation*).
  - **Bundlers:** Operator simpul khusus yang mengumpulkan sekumpulan UserOperation dan membungkusnya menjadi satu transaksi standar Layer 1.
  - **EntryPoint Singleton Contract:** Kontrak router universal yang telah diaudit ketat dan dideploy pada alamat identik di seluruh jaringan kompatibel EVM.
- *Visual:* Arsitektur perbandingan: Mempool standar L1 berjalan paralel berdampingan dengan Alternative UserOp Mempool yang diarahkan oleh Bundler ke EntryPoint.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dulu Account Abstraction butuh hard fork protokol yang sangat sulit disepakati.
- ERC-4337 berhasil menghadirkannya tanpa mengubah konsensus dasar Ethereum sama sekali.
- Kuncinya ada pada Bundler, mempool alternatif, dan smart contract universal EntryPoint.

**Naskah Tutur (Voiceover Script):**
Selama bertahun-tahun, Account Abstraction hanyalah mimpi indah yang mandek di atas kertas.
Penyebabnya adalah: setiap kali peneliti ingin menerapkannya, mereka terbentur keharusan melakukan hard fork untuk mengubah aturan konsensus inti Ethereum.
Mengubah protokol dasar tentu membawa risiko perpecahan rantai yang sangat berbahaya.
Hingga akhirnya pada tahun 2021, Vitalik Buterin dan para peneliti merancang terobosan brilian bernama ERC-4337.
ERC-4337 berhasil menghadirkan kemampuan Account Abstraction seutuhnya tanpa mengubah satu baris pun aturan konsensus dasar Ethereum.
Caranya adalah dengan memindahkan beban sistem ke luar rantai utama.
Mereka menciptakan jalur antrean transaksi alternatif di luar mempool biasa.
Di jalur ini, transaksi pengguna dipaketkan oleh operator khusus yang disebut Bundler.
Bundler kemudian membungkus puluhan transaksi pengguna menjadi satu transaksi biasa yang sah di mata Ethereum, lalu mengirimkannya ke satu smart contract universal bernama EntryPoint.
Dengan rekayasa arsitektur ini, mimpi akun terprogram akhirnya terwujud di dunia nyata tanpa perlu melakukan hard fork sama sekali.

---

## Slide 10: Anatomi Siklus Eksekusi ERC-4337

### Konten Slide
- **Struktur Objek `UserOperation` (UserOp):**
  - Bukan transaksi biasa, melainkan struktur data tingkat tinggi yang memuat: `sender`, `nonce`, `initCode`, `callData`, parameter kuota gas, `paymasterAndData`, dan `signature`.
- **Alur Eksekusi Langkah Demi Langkah (Sequence Lifecycle):**
  1. *User Signing:* Alice menandatangani UserOp (bisa menggunakan kunci biometrik ponsel) dan menyiarkannya ke alternative mempool.
  2. *Bundling:* Bundler memverifikasi keabsahan paket, menggabungkan banyak UserOp, dan memanggil fungsi `handleOps()` pada kontrak EntryPoint sebagai transaksi L1 resmi.
  3. *Verification Loop:* EntryPoint memanggil fungsi `validateUserOp()` pada smart account Alice untuk memeriksa keabsahan signature dan memastikan ketersediaan dana gas.
  4. *Paymaster Check:* Jika ada sponsor, EntryPoint memanggil `validatePaymasterUserOp()` untuk memastikan Paymaster bersedia menanggung tagihan.
  5. *Execution Loop:* EntryPoint mengeksekusi logika perintah bisnis ke dApp target dan mengembalikan sisa biaya gas kepada Bundler.
- *Visual:* Sequence diagram interaksi Alice -> Alt Mempool -> Bundler -> EntryPoint -> Smart Account & Paymaster -> Target dApp.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- UserOp adalah instruksi niat transaksi pengguna.
- EntryPoint membagi proses menjadi dua tahap ketat: verifikasi tanda tangan dulu, baru eksekusi perintah bisnis.
- Bundler menalangi biaya gas di L1 dan diganti rugi oleh smart account atau Paymaster.

**Naskah Tutur (Voiceover Script):**
Bagaimana siklus eksekusi ERC-4337 berjalan secara konkret di balik layar?
Proses ini dimulai dari pengguna.
Ketika Alice ingin melakukan transfer, dompetnya membuat objek data bernama UserOperation.
Objek ini memuat niat transaksi Alice, batas gas, dan tanda tangan digitalnya.
Bundler yang mendengarkan jalur mempool khusus akan memungut UserOp Alice bersama kiriman pengguna lain, lalu membungkus semuanya menjadi satu panggilan transaksi besar handleOps ke kontrak EntryPoint di Layer 1.
Bundler menalangi biaya gas di muka menggunakan koin Ether miliknya.
Begitu transaksi tiba di kontrak EntryPoint, eksekusi dipisah menjadi dua putaran yang sangat ketat.
Putaran pertama adalah loop verifikasi: EntryPoint memanggil fungsi validateUserOp pada dompet kontrak Alice untuk memastikan tanda tangannya valid dan memeriksa ketersediaan saldo penjamin.
Jika ada kontrak Paymaster yang mensponsori, kesediaan Paymaster juga dicek di tahap ini.
Setelah seluruh pemeriksaan verifikasi lulus tanpa cela, barulah EntryPoint masuk ke putaran kedua: mengeksekusi instruksi transaksi bisnis Alice ke aplikasi tujuan dan mengganti rugi biaya gas Bundler.

---

## Slide 11: Komparasi Menyeluruh: EOA vs ERC-4337

### Konten Slide
- **Matriks Evaluasi Komparatif Arsitektur Akun:**

| Parameter Evaluasi | Externally Owned Account (EOA) | Smart Contract Account (ERC-4337) |
| :--- | :--- | :--- |
| **Pusat Kendali Identitas** | Kunci privat ECDSA tunggal kaku | Logika kode smart contract terprogram |
| **Mitigasi Kehilangan Kunci** | Kerugian permanen total tanpa pemulihan | Pemulihan aman via Social Guardians |
| **Risiko Pencurian Kunci** | Akun dikuras seketika tanpa ampun | Dicegah via batasan belanja harian dan timelock |
| **Mata Uang Biaya Gas** | Wajib koin native (ETH) saja | Fleksibel: disponsori dApp atau bayar via token ERC-20 |
| **Standar Kriptografi** | Terkunci pada kurva secp256k1 | Bebas: Passkeys, WebAuthn biometrik, Post-Quantum |
| **Eksekusi Transaksi** | 1 tanda tangan manual per transaksi | Multi-call batching atomik dalam 1 klik |
| **Modifikasi Protokol L1** | Fitur bawaan sejak genesis rantai | Nol modifikasi konsensus Layer 1 |

- *Visual:* Tabel ringkasan perbandingan visual dengan indikator kontras keunggulan telak ERC-4337 atas EOA konvensional.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Ringkasan komparasi telak antara EOA lama versus ERC-4337 baru.
- ERC-4337 unggul dalam segala hal: keamanan, fleksibilitas biaya gas, pemulihan akun, dan kenyamanan pengguna.
- Masa depan onboarding miliaran pengguna baru ada pada dompet smart contract.

**Naskah Tutur (Voiceover Script):**
Slide ini merangkum pergeseran revolusioner antara era dompet tradisional EOA dengan era akun pintar ERC-4337.
Jika kita bandingkan secara berjejer, perbedaannya bagaikan membandingkan ponsel genggam monokrom jadul dengan smartphone modern.
Di era EOA, identitas kalian terkunci mati pada satu kunci privat.
Jika kunci itu hilang atau dicuri, tidak ada jalan kembali dan seluruh saldo musnah seketika.
Kalian juga wajib memegang koin native Ether hanya untuk membayar biaya transaksi, dan setiap interaksi mengharuskan kalian menandatangani pop-up satu per satu secara manual.
Sebaliknya, pada akun pintar ERC-4337, seluruh kendali berada di tangan kode logika yang fleksibel.
Kalian memiliki jaring pengaman berupa Social Recovery untuk memulihkan akun tanpa rasa takut.
Kalian bisa bertransaksi dengan sensor biometrik sidik jari di ponsel, membayar biaya gas menggunakan saldo dolar USDC yang kalian punya, dan mengeksekusi multi-call batching dalam satu kali klik.
Inilah standar emas yang akan membawa miliaran pengguna awam berikutnya masuk ke ekosistem Web3 dengan aman dan nyaman.

---

## Slide 12: Jembatan ke Modul Berikutnya (The Oracle Problem)

### Konten Slide
- **Capaian Modul Ini:** Kita telah menguasai anatomi dompet modern, keterbatasan EOA, mekanisme Account Abstraction, serta arsitektur ERC-4337.
- **Keterbatasan Inheren Seluruh Komputasi On-Chain:**
  - Meskipun akun pengguna kini telah terprogram sangat canggih, mesin virtual Ethereum tetaplah sebuah sistem tertutup yang terisolasi (*cryptographic sandbox*).
  - EVM dapat menghitung persamaan matematika internal, namun tidak memiliki cara untuk mengetahui kenyataan di dunia nyata.
- **Pertanyaan Eksistensial Rekayasa:**
  - Berapa harga pasar 1 ETH dalam mata uang Dolar saat ini?
  - Apakah pesawat rute Tokyo mengalami keterlambatan terbang lebih dari 2 jam?
  - Mengapa smart contract secara teknis mustahil melakukan HTTP Web Request biasa ke API internet?
- **Materi Modul Berikutnya:** Membedah jembatan data antara realitas fisik dan kode deterministik: **The Oracle Problem**.
- *Visual:* Ilustrasi smart contract terkurung di dalam sangkar kaca deterministik yang membutuhkan mata dan telinga ke dunia luar.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah identitas dan akun pengguna sudah terselesaikan dengan rapi.
- Membuka misteri keterisolasian komputasi blockchain dari dunia nyata.
- Teaser materi modul 4.5: Mengapa smart contract buta dan tuli terhadap internet, serta apa itu The Oracle Problem.

**Naskah Tutur (Voiceover Script):**
Kita telah menyaksikan bagaimana dompet dan akun pintar berhasil merevolusi pengalaman pengguna dan menghilangkan ancaman kehilangan seed phrase selamanya.
Namun perhatikan satu batasan arsitektur paling mendasar yang menyelimuti seluruh smart contract di blockchain.
Mesin virtual Ethereum pada hakikatnya adalah sebuah sangkar tertutup yang terisolasi total dari dunia luar.
Smart contract kalian bisa melakukan kalkulasi aljabar yang sangat rumit, memverifikasi tanda tangan digital, dan memindahkan token bernilai miliaran dolar.
Tetapi jika kalian bertanya kepada smart contract: berapa harga satu Ether dalam kurs dolar Amerika sekarang, kontrak tersebut sama sekali tidak tahu jawabannya.
Kontrak juga tidak tahu apakah pertandingan sepak bola tadi malam sudah selesai atau apakah penerbangan pesawat sedang tertunda.
Mengapa sebuah sistem komputer canggih dilarang keras melakukan HTTP request sederhana ke API internet?
Mengapa keterbatasan ini memicu dilema besar yang dikenal sebagai The Oracle Problem?
Dan bagaimana jaringan oracle terdesentralisasi membawa data dunia nyata ke dalam blockchain secara aman tanpa titik kegagalan tunggal?
Untuk menjawab teka-teki krusial ini, di modul penutup Chapter 4 kita akan membedah: The Oracle Problem.
Sampai jumpa di modul berikutnya.
