# The Ethereum Virtual Machine (EVM) Architecture
Modul Presentasi: Programmability and Virtual Machines (04.2)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** The Ethereum Virtual Machine (EVM) Architecture
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Anatomi internal mesin virtual Ethereum, struktur memori, siklus eksekusi opcode, serta mekanisme interaksi antar-kontrak.
- *Visual:* Skema mesin virtual kuantum dengan partisi stack, memori volatile, storage persisten, dan calldata.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul kedua Chapter 4.
- Membongkar jeroan teknis di balik runtime Ethereum Virtual Machine.
- Memahami bagaimana kode smart contract diproses secara deterministik oleh ribuan validator global.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kedua dari Chapter 4.
Di sesi sebelumnya, kita sudah memahami visi besar Ethereum sebagai sebuah komputer dunia yang diatur oleh mekanisme bahan bakar gas.
Sekarang saatnya kita membuka kap mesin dan melihat langsung arsitektur fisiknya.
Bagaimana sebenarnya mesin ini bekerja di tingkat komputasi paling mendasar?
Hari ini kita akan membedah anatomi internal Ethereum Virtual Machine atau EVM.
Kita akan menjelajahi enam wilayah partisi data, menelusuri siklus hidup eksekusi opcode langkah demi langkah, dan memahami bagaimana kontrak-kontrak cerdas saling berkomunikasi secara aman melalui instruksi tingkat rendah.

---

## Slide 2: EVM Sebagai State Transition Machine

### Konten Slide
- **Peran Inti EVM:** Runtime execution environment untuk seluruh smart contract di Ethereum dan puluhan rantai kompatibel (Polygon, Arbitrum, Optimism, Avalanche, Base).
- **Formalisasi Matematis State Transition:**
  $$\sigma' = f_{\text{EVM}}(\sigma, T)$$
  - $\sigma$: State dunia saat ini (*current world state*).
  - $T$: Transaksi valid yang masuk (*valid incoming transaction*).
  - $\sigma'$: State dunia baru yang dihasilkan secara deterministik.
- **Prinsip Determinisme Mutlak:**
  - Puluhan ribu validator independen di seluruh dunia mengeksekusi bytecode yang persis sama pada perangkat keras lokal masing-masing.
  - Seluruh node wajib tiba pada *cryptographic state root* yang identik bit per bit.
- *Visual:* Formula transisi state dengan input transaksi menghasilkan state root hash baru yang terverifikasi secara global.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- EVM bukan sekadar virtual machine biasa seperti JVM, melainkan deterministic state machine.
- Rumus sederhana: state lama ditambah transaksi menghasilkan state baru.
- Ribuan validator di dunia wajib menghasilkan hash state root yang identik.

**Naskah Tutur (Voiceover Script):**
Secara ilmiah, Ethereum Virtual Machine adalah sebuah deterministic state transition machine.
Artinya, jika kita memiliki status jaringan saat ini yang kita simbolkan dengan sigma, lalu memasukkan transaksi valid T, maka fungsi eksekusi EVM akan menghasilkan status baru sigma aksen.
Formula matematis ini dijalankan secara mandiri oleh puluhan ribu komputer validator di seluruh dunia.
Masing-masing validator menggunakan perangkat keras yang berbeda-beda, ada yang memakai prosesor Intel, AMD, maupun Apple Silicon.
Namun karena aturan mesin virtual ini sangat presisi, setiap instruksi menghasilkan mutasi biner yang persis sama.
Tidak boleh ada toleransi perbedaan satu bit pun di antara ribuan komputer tersebut.
Jika ada satu komputer menghasilkan angka yang berbeda, komputer itu akan langsung diisolasi dan dikeluarkan dari konsensus jaringan.

---

## Slide 3: Taksonomi Enam Wilayah Data EVM

### Konten Slide
- **Karakteristik Mesin:** EVM adalah *quasi-Turing-complete, stack-based machine*.
- **Partisi Data Berdasarkan Siklus Hidup (Lifecycle):**
  - *Volatile Context (Terhapus Seketika Saat Transaksi Berakhir):*
    - **Stack:** 1.024 slot kata 256-bit untuk komputasi cepat LIFO.
    - **Memory:** Buffer linear byte-addressable sementara untuk manipulasi data dinamis.
    - **Calldata:** Payload transaksi read-only yang dikirimkan oleh pemanggil.
    - **ReturnData:** Penampung byte hasil keluaran dari panggilan sub-kontrak.
  - *Persistent State (Tersimpan Permanen di Hard Drive Node):*
    - **Storage:** Database kunci-nilai $2^{256}$ slot berbiaya tinggi yang terikat pada akun kontrak.
    - **Code:** ROM bytecode program kontrak yang bersifat immutable.
- *Visual:* Peta arsitektur membagi area volatile (RAM) dan area persisten (Disk Trie).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- EVM membagi data ke dalam enam wilayah berbeda.
- Wilayah sementara (volatile): Stack, Memory, Calldata, ReturnData.
- Wilayah permanen (persistent): Storage di hard drive dan Code di ROM.

**Naskah Tutur (Voiceover Script):**
EVM memiliki cara unik dalam mengelola data.
Berbeda dengan komputer desktop biasa yang menggabungkan memori di bawah sistem operasi umum, EVM membagi data secara kaku ke dalam enam wilayah fisik.
Pembagian ini didasarkan pada siklus hidup dan biaya gasnya.
Empat wilayah pertama bersifat volatile atau sementara, artinya data langsung lenyap dari RAM begitu eksekusi transaksi selesai.
Wilayah sementara ini mencakup Stack untuk kalkulasi cepat, Memory sebagai scratchpad dinamis, Calldata sebagai tempat membaca argumen transaksi, dan ReturnData untuk menangkap respon sub-call.
Sementara itu, ada dua wilayah yang bersifat permanen dan tersimpan abadi di hard drive ribuan validator.
Kedua wilayah itu adalah Code yang memuat bytecode kontrak tanpa bisa diubah, serta Storage yang berfungsi sebagai database jangka panjang kontrak.

---

## Slide 4: The Stack: Jantung Komputasi LIFO

### Konten Slide
- **Arsitektur Stack Machine:** Beroperasi dengan prinsip *Last-In, First-Out* (LIFO), bukan register fisik seperti prosesor x86 atau ARM.
- **Spesifikasi Teknis:**
  - *Kapasitas Maksimal:* Tepat **1.024 item**.
  - Operasi yang mendorong item ke-1.025 memicu fatal exception: `Stack Overflow`.
  - *Ukuran Kata (Word Size):* Setiap slot berukuran tepat **256 bit** (32 byte), dioptimalkan untuk kriptografi Keccak-256 dan kurva secp256k1.
- **Keterbatasan Akses 16 Slot ("Stack Too Deep"):**
  - Opcode swap dan duplikasi (`SWAP1`-`SWAP16`, `DUP1`-`DUP16`) hanya mampu menjangkau maksimal 16 item teratas tumpukan.
  - Fungsi kontrak yang mengolah lebih dari 16 variabel lokal secara simultan akan memicu kompilator menolak build dengan error `"Stack too deep"`.
- *Visual:* Diagram animasi evaluasi ekspresi aritmatika 3 + 5 pada tumpukan stack LIFO.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- EVM bukan register machine melainkan stack machine.
- Kapasitas stack maksimal 1.024 slot, masing-masing slot berisi 256 bit.
- Masalah klasik developer Solidity: error "Stack too deep" jika memakai lebih dari 16 variabel lokal bersamaan.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah wilayah komputasi pertama: The Stack.
Komputer modern seperti laptop kita menggunakan register di dalam CPU untuk menghitung angka.
Namun EVM dirancang sebagai stack machine dengan model Last-In, First-Out.
Setiap kali ada instruksi penjumlahan, mesin mengambil dua elemen paling atas tumpukan, menjumlahkannya, lalu meletakkan hasilnya kembali di puncak tumpukan.
Kapasitas maksimal stack ini dibatasi tepat seribu dua puluh empat slot.
Setiap slot berukuran dua ratus lima puluh enam bit, dirancang khusus agar serasi dengan output fungsi hash Keccak-256.
Namun ada satu batasan arsitektur penting yang sering membuat pusing para developer smart contract.
Meskipun kapasitasnya seribu dua puluh empat item, instruksi swap dan duplicate di EVM hanya bisa meraih enam belas slot teratas.
Jika kalian menulis fungsi dengan lebih dari enam belas variabel lokal sekaligus, compiler Solidity akan langsung mogok dan mengeluarkan error legendaris: Stack too deep.

---

## Slide 5: Volatile Memory: Linear Ephemeral Scratchpad

### Konten Slide
- **Karakteristik Memory EVM:**
  - Array linear satu dimensi yang dialokasikan secara dinamis dalam byte-level addressing.
  - Dibaca menggunakan opcode `MLOAD` dan ditulis menggunakan `MSTORE` (32 byte) atau `MSTORE8` (1 byte).
  - Seluruh alokasi RAM dibersihkan total saat transaksi berakhir.
- **Formula Biaya Gas Ekspansi Kuadratik (Quadratic Expansion Gas):**
  $$C_{\text{mem}}(a) = 3 \times a + \left\lfloor \frac{a^2}{512} \right\rfloor$$
  - $a$: Jumlah kata memori yang dialokasikan (1 kata = 32 byte).
- **Pertahanan Terhadap Serangan RAM:**
  - Mengalokasikan beberapa kilobyte memori berbiaya sangat murah.
  - Suku kuadratik $\frac{a^2}{512}$ membuat alokasi megabyte atau gigabyte melonjak eksponensial, seketika membakar seluruh gasLimit transaksi untuk melindungi RAM validator.
- *Visual:* Grafik kurva eksponensial biaya gas ekspansi memori terhadap ukuran alokasi data.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Memory adalah RAM sementara untuk transaksi.
- Biaya memori murah di awal, tapi meledak secara kuadratik jika ukurannya membesar.
- Rumus kuadratik mencegah hacker menghabiskan kapasitas RAM validator.

**Naskah Tutur (Voiceover Script):**
Wilayah data kedua adalah Memory.
Memory di EVM berfungsi sebagai scratchpad sementara untuk menampung data dinamis berukuran besar seperti teks string atau array selama transaksi berlangsung.
Data di dalam memory bisa diakses per byte secara linear.
Namun perhatikan mekanisme keamanannya yang sangat cerdas.
Untuk mencegah penyerang membombardir validator dengan transaksi yang memakan puluhan gigabyte RAM, EVM menerapkan formula quadratic memory expansion gas.
Biaya gas untuk memperluas memori memiliki komponen kuadratik.
Jika sebuah kontrak hanya memakai beberapa kilobyte, biayanya sangat murah dan hampir gratis.
Tetapi begitu alokasi memori dinaikkan ke ukuran megabyte, nilai suku kuadratik akan meledak sangat tinggi.
Saldo gas pengguna akan langsung habis terbakar dalam sekejap sebelum RAM fisik validator sempat terbebani.

---

## Slide 6: Persistent Storage: Database Permanen On-Chain

### Konten Slide
- **Ruang Lingkup Storage:** Database kunci-nilai (*key-value database*) terisolasi milik setiap kontrak pintar.
- **Kapasitas Ruang Kunci (Keyspace):**
  - Terdiri dari $2^{256}$ slot kunci unik yang memetakan ke $2^{256}$ nilai kata 256-bit.
  - Seluruh slot secara default terinisialisasi dengan nilai kosong nol (`0x00`).
- **Penyimpanan Fisik dan Biaya Disk I/O:**
  - Setiap modifikasi storage ditulis permanen ke database lokal validator (LevelDB atau Pebble) dan dirangkai ke Merkle Patricia Storage Trie.
  - Operasi storage merupakan opcode termahal di seluruh ekosistem EVM:
    - Membaca slot hangat (`SLOAD` warm): 100 gas.
    - Membaca slot dingin (`SLOAD` cold): 2.100 gas.
    - Menulis nilai baru ke slot bernilai nol (`SSTORE`): **20.000 gas**.
- *Visual:* Skema struktur Merkle Patricia Storage Trie yang menghubungkan slot storage ke akar status global.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Storage adalah database abadi yang disimpan ke SSD validator.
- Keyspace raksasa berukuran 2 pangkat 256 slot.
- Menulis data baru ke storage sangat mahal (20.000 gas) karena membebani disk IO ribuan komputer.

**Naskah Tutur (Voiceover Script):**
Sekarang kita masuk ke wilayah data yang paling berharga sekaligus paling mahal: Storage.
Storage adalah database permanen milik setiap kontrak cerdas.
Data saldo token kalian, daftar kepemilikan NFT, dan status voting DAO tersimpan aman di wilayah ini.
Secara teoritis, ruang kunci storage ini luar biasa luas, mencapai dua pangkat dua ratus lima puluh enam slot.
Namun karena setiap penulisan data storage memaksa ribuan komputer validator di seluruh dunia menulis data permanen ke SSD fisik mereka, biaya operasinya sangat mahal.
Membaca slot penyimpanan yang belum pernah disentuh berbiaya dua ribu seratus gas.
Bahkan menuliskan variabel baru ke slot yang tadinya kosong berharga dua puluh ribu gas.
Inilah alasan mengapa arsitektur smart contract yang baik selalu meminimalkan penulisan ke storage demi menghemat biaya pengguna.

---

## Slide 7: Calldata: Payload Transaksi Read-Only

### Konten Slide
- **Definisi Calldata:** Array byte read-only yang memuat instruksi eksekusi dan parameter pemanggilan fungsi kontrak.
- **Struktur Standar ABI (Application Binary Interface):**
  - **4 Byte Pertama:** Function Selector (hash 4 byte pertama dari signature fungsi, misalnya `keccak256("transfer(address,uint256)")[0..4]`).
  - **Byte Berikutnya:** Parameter argumen yang dikodekan dalam potongan kata 32-byte secara teratur.
- **Karakteristik Operasional:**
  - Bersifat *immutable*, kontrak penerima tidak dapat mengubah isi byte calldata secara langsung.
  - Efisiensi gas sangat tinggi: hanya 4 gas per byte nol (`0x00`) dan 16 gas per byte bukan nol.
- **Pemanfaatan Strategis:** Menjadi tulang punggung Layer 2 Rollups untuk mengunggah kompresi batch transaksi ke Layer 1 dengan biaya murah.
- *Visual:* Pembongkaran anatomi calldata 4-byte selector diikuti chunk 32-byte argumen penerima dan nominal.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Calldata adalah data kiriman transaksi yang tidak bisa diubah oleh kode kontrak.
- 4 byte pertama adalah function selector, sisanya adalah parameter ABI.
- Karena biaya gasnya murah, calldata dipakai oleh L2 Rollups untuk memposting data batch.

**Naskah Tutur (Voiceover Script):**
Wilayah data keempat yang sangat penting adalah Calldata.
Calldata adalah kumpulan byte yang dikirimkan oleh pengguna atau dompet saat memanggil sebuah kontrak.
Data ini bersifat read-only dan tidak bisa dimodifikasi oleh kode kontrak yang sedang berjalan.
Formatnya mengikuti standar ABI Ethereum.
Empat byte pertama adalah function selector, yaitu penanda unik fungsi apa yang ingin kita panggil.
Sisa byte di belakangnya adalah argumen fungsi yang dipadatkan dalam kelipatan tiga puluh dua byte.
Karena calldata tidak perlu disimpan ke dalam database trie permanen, biaya gasnya jauh lebih hemat daripada storage.
Karakteristik hemat gas ini dimanfaatkan secara cerdas oleh teknologi Layer 2 Rollup seperti Arbitrum dan Optimism untuk mempublikasikan ribuan batch transaksi ke Ethereum dengan biaya yang sangat terjangkau.

---

## Slide 8: Siklus Eksekusi Opcode Tingkat Rendah

### Konten Slide
- **Mekanisme Fetch-Decode-Execute Loop:**
  1. **Program Counter (PC):** Pointer internal menunjuk ke indeks byte instruksi berikutnya di dalam bytecode.
  2. **Fetch & Decode:** EVM membaca satu byte pada posisi PC dan mencocokkannya dengan tabel instruksi opcode (contoh: `0x01` = `ADD`, `0x60` = `PUSH1`, `0x54` = `SLOAD`).
  3. **Gas Accounting:** Menghitung biaya gas statis dan dinamis.
     Jika sisa gas tidak cukup, eksekusi seketika dibatalkan.
  4. **Execute:** Mengambil operan dari stack, memproses kalkulasi pada memory atau storage, lalu mengembalikan hasil ke stack.
  5. **PC Increment:** Penunjuk PC bergerak maju menuju instruksi berikutnya hingga menemukan `STOP`, `RETURN`, atau `REVERT`.
- *Visual:* Diagram alur fetch opcode -> potong gas -> eksekusi stack -> majukan pointer PC.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- EVM bekerja dalam loop sekuensial: ambil instruksi, potong gas, jalankan, lalu majukan pointer.
- Program Counter (PC) menandai baris byte mana yang sedang diproses.
- Eksekusi berhenti saat menemukan instruksi STOP, RETURN, atau REVERT.

**Naskah Tutur (Voiceover Script):**
Bagaimana mesin virtual ini sebenarnya memproses instruksi baris demi baris?
EVM berjalan dalam siklus klasik: fetch, decode, dan execute.
Mesin memiliki penunjuk internal bernama Program Counter atau PC yang dimulai dari angka nol.
Langkah pertama, EVM membaca satu byte instruksi pada posisi PC tersebut.
Byte ini dicocokkan dengan kamus opcode, misalnya heksadesimal 0x01 diterjemahkan sebagai perintah ADD.
Langkah kedua, mesin langsung memotong saldo gas transaksi sesuai tarif instruksi tersebut.
Jika gas masih cukup, mesin melangkah ke tahap ketiga: mengeksekusi instruksi dengan mengambil data dari stack dan memproses hasilnya.
Terakhir, Program Counter dinaikkan ke indeks byte berikutnya.
Proses ini berulang terus menerus secara linear hingga mesin menemukan instruksi penghenti seperti RETURN untuk sukses atau REVERT jika terjadi pembatalan.

---

## Slide 9: Interaksi Antar-Kontrak: CALL vs DELEGATECALL

### Konten Slide
- **Realitas Ekosistem DeFi:** Smart contract jarang berjalan sendirian, melainkan terus memanggil kontrak eksternal lain (*composability*).
- **Opcode `CALL` (Konteks Terisolasi):**
  - Kontrak A memanggil fungsi di Kontrak B.
  - Di dalam Kontrak B, identitas `msg.sender` berubah menjadi **Kontrak A**.
  - Operasi storage berjalan di dalam ruang database Kontrak B.
- **Opcode `DELEGATECALL` (Konteks Bersama / Kode Pinjaman):**
  - Kontrak A meminjam logika kode milik Kontrak B, tetapi mengeksekusinya di dalam ruang data Kontrak A sendiri.
  - Identitas asli `msg.sender` dan nilai `msg.value` dari pemanggil awal tetap dipertahankan.
  - Seluruh pembacaan dan penulisan variabel memutasi **Storage milik Kontrak A**.
- *Visual:* Bagan perbandingan konteks eksekusi CALL (pindah ruangan data) versus DELEGATECALL (meminjam resep ke ruangan sendiri).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Smart contract bisa saling memanggil satu sama lain.
- CALL biasa mengeksekusi kode di database milik kontrak tujuan.
- DELEGATECALL meminjam kode eksternal tapi menjalankannya di atas database sendiri.

**Naskah Tutur (Voiceover Script):**
Kekuatan terbesar aplikasi terdesentralisasi adalah sifat komposabilitasnya, di mana satu kontrak bisa memanggil kontrak lainnya bagaikan merangkai balok lego.
Untuk memfasilitasi hal ini, EVM menyediakan dua instruksi pemanggilan mendasar: CALL dan DELEGATECALL.
Pada instruksi CALL standar, eksekusi berpindah sepenuhnya ke kontrak tujuan.
Jika Kontrak A memanggil Kontrak B, maka msg.sender di dalam Kontrak B adalah Kontrak A, dan semua perubahan data akan tertulis di database Kontrak B.
Namun instruksi DELEGATECALL bekerja dengan cara yang sangat berbeda.
Kontrak A meminjam logika kode dari Kontrak B, tetapi menjalankannya di dalam rumahnya sendiri.
Identitas pengirim asli tetap terjaga, dan yang paling krusial: seluruh mutasi data storage terjadi langsung di dalam database Kontrak A.
Fitur peminjaman kode inilah yang menjadi fondasi utama lahirnya kontrak yang bisa di-upgrade.

---

## Slide 10: Pola Arsitektur Proxy dan Pelajaran Parity Freeze

### Konten Slide
- **Pola Desain Proxy (Upgradeable Contracts):**
  - Pengguna hanya berinteraksi dengan **Proxy Contract** permanen yang memegang seluruh saldo dan status storage.
  - Proxy meneruskan eksekusi menggunakan `DELEGATECALL` ke **Implementation Contract** yang memuat logika bisnis.
  - Pengembang dapat memperbarui logika aplikasi cukup dengan mengubah alamat pointer implementasi di dalam proxy tanpa memindahkan saldo dana pengguna.
- **Tragedi Nyata: The Parity Multi-Sig Freeze (November 2017):**
  - Ratusan dompet multi-sig mendelegasikan fungsinya ke satu kontrak library bersama yang lupa diinisialisasi kepemilikannya.
  - Seorang pengguna secara tidak sengaja mengklaim hak pemilik library lalu memicu opcode `SELFDESTRUCT`.
  - Hancurnya bytecode library seketika membekukan **513.774 ETH** di 587 dompet selamanya tanpa jalan pemulihan.
- *Visual:* Skema struktur Proxy -> Implementation Contract berdampingan dengan ilustrasi perpustakaan bersama yang musnah.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Proxy pattern memisahkan antara tempat penyimpanan dana dan logika kode.
- DELEGATECALL memungkinkan upgrade kontrak tanpa memindahkan saldo pengguna.
- Studi kasus Parity 2017: kelalaian satu baris library membekukan lebih dari 500 ribu ETH untuk selamanya.

**Naskah Tutur (Voiceover Script):**
Pola arsitektur paling populer yang memanfaatkan DELEGATECALL adalah Proxy Pattern.
Secara bawaan, smart contract di blockchain bersifat permanen dan tidak bisa diubah kodenya.
Untuk mengakali ini, developer membuat dua kontrak: Proxy Contract dan Implementation Contract.
Proxy Contract bertindak sebagai brankas yang menampung seluruh saldo aset dan data pengguna.
Setiap kali ada transaksi, proxy meneruskan instruksi lewat DELEGATECALL ke Implementation Contract yang berisi logika perhitungan.
Jika developer menemukan bug atau ingin menambah fitur baru, mereka cukup men-deploy kontrak logika baru lalu menggeser alamat pointer di dalam proxy.
Dana pengguna tetap aman di tempatnya.
Namun kekuatan besar ini membawa risiko yang sangat mengerikan.
Pada bulan November 2017, terjadi bencana Parity Multi-Sig.
Ratusan dompet mendelegasikan logika mereka ke satu kontrak library bersama.
Seorang pengguna menemukan bahwa library tersebut belum memiliki owner, mengklaim kepemilikannya, lalu memicu instruksi bunuh diri kontrak atau SELFDESTRUCT.
Hancurnya satu file library itu seketika melumpuhkan ratusan dompet di atasnya, membekukan lebih dari lima ratus tiga belas ribu Ether selamanya tanpa ada yang bisa mencairkannya kembali.

---

## Slide 11: Derivasi Alamat Deterministik: CREATE vs CREATE2

### Konten Slide
- **Mekanisme Pembuatan Kontrak:** EVM menyediakan dua instruksi berbeda untuk menghitung alamat 20-byte kontrak baru di jaringan.
- **Opcode `CREATE` (Bergantung Nonce):**
  $$\text{Address} = \text{Rightmost20Bytes}\Big(\text{Keccak-256}\big(\text{RLP}(\text{Sender}, \text{Nonce})\big)\Big)$$
  - Alamat sangat bergantung pada urutan kronologis transaksi akun pembuat (*deployer nonce*).
- **Opcode `CREATE2` (Counterfactual Determinism):**
  $$\text{Address} = \text{Rightmost20Bytes}\Big(\text{Keccak-256}\big(\mathtt{0xff} \mathbin{\Vert} \text{Sender} \mathbin{\Vert} \text{Salt} \mathbin{\Vert} \text{Keccak-256}(\text{InitCode})\big)\Big)$$
  - *Prefiks `0xff`:* Menjamin alamat `CREATE2` tidak akan pernah bertabrakan dengan alamat `CREATE`.
  - *Salt & InitCode:* Alamat dapat dihitung secara pasti bertahun-tahun sebelum kontrak benar-benar dideploy ke blockchain.
- **Dampak pada Protokol Modern:** Uniswap V2 dan V3 menggunakan `CREATE2` untuk menghitung alamat liquidity pool pasangan token secara langsung tanpa memerlukan registri on-chain.
- *Visual:* Perbandingan input kalkulasi alamat acak dinamis CREATE versus rumus matematika pasti CREATE2.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- CREATE lama bergantung pada nonce pengirim.
- CREATE2 memungkinkan alamat kontrak diketahui secara pasti sebelum dideploy.
- Sangat krusial untuk Layer 2, counterfactual wallets, dan liquidity pool Uniswap.

**Naskah Tutur (Voiceover Script):**
Ketika kita meluncurkan smart contract baru ke jaringan Ethereum, dari mana datangnya alamat dua puluh byte kontrak tersebut?
Di masa awal, EVM hanya memiliki opcode CREATE.
Alamat kontrak dihitung dari kombinasi alamat pembuat dan angka nonce transaksi pengirim.
Kelemahannya, alamat tersebut dinamis dan bergantung pada urutan pengiriman transaksi di mempool.
Pada upgrade Constantinople, Ethereum memperkenalkan opcode CREATE2.
CREATE2 adalah sebuah inovasi matematika yang luar biasa.
Alamat kontrak tidak lagi dipengaruhi oleh nonce, melainkan dihitung murni dari alamat pembuat, sebuah angka acak bernama salt, dan hash dari bytecode kontrak itu sendiri.
Apa dampaknya?
Kita bisa mengetahui secara absolut di mana alamat kontrak kita akan lahir di blockchain bertahun-tahun sebelum kita benar-benar menyiarkan transaksi deployment-nya.
Konsep ini dinamakan counterfactual deployment.
Protokol pertukaran seperti Uniswap memanfaatkan CREATE2 agar aplikasi bisa langsung menebak alamat pool pasangan token apa pun secara instan lewat rumus matematika, tanpa perlu membayar gas untuk mencari alamat di database registri on-chain.

---

## Slide 12: Jembatan ke Modul Berikutnya (Gas Economics)

### Konten Slide
- **Capaian Modul Ini:** Kita telah menguasai anatomi internal EVM, siklus eksekusi opcode, partisi memori, instruksi interaksi kontrak, dan formula derivasi alamat.
- **Pertanyaan Ekonomi Rekayasa:**
  - Bagaimana protokol menetapkan harga yang adil untuk setiap opcode di tingkat fisik?
  - Mengapa membaca data dingin dari hard drive ribuan kali lebih mahal daripada kalkulasi di stack?
  - Mengapa pasar lelang gas tradisional memicu lonjakan biaya ekstrem saat jaringan padat?
  - Bagaimana arsitektur revolusioner **EIP-1559** membakar base fee dan menstabilkan biaya transaksi?
- **Materi Modul Berikutnya:** Membedah mekanisme pasar komputasi desentralistik: **Gas Economics and Execution Halting**.
- *Visual:* Ilustrasi mekanisme pembakaran koin native (burning base fee) yang mengalir dari eksekusi instruksi mesin virtual.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Anatomi arsitektur EVM telah kita bedah tuntas.
- Mengalihkan fokus ke dimensi ekonomi: bagaimana biaya komputasi dihitung dan dilelang.
- Teaser materi modul 4.3: Gas Economics, EIP-1559, dan eksekusi halting.

**Naskah Tutur (Voiceover Script):**
Kita telah menuntaskan penelusuran arsitektur internal Ethereum Virtual Machine: dari tumpukan stack, scratchpad memory, database storage, hingga presisi matematika CREATE2.
Namun semua operasi mesin virtual yang elegan ini tidak akan bisa berjalan aman tanpa adanya pilar ekonomi yang melindunginya.
Bagaimana sebenarnya protokol menentukan nilai tarif dari setiap instruksi opcode?
Mengapa sistem menetapkan harga yang sangat berbeda antara membaca data yang sudah ada di RAM dengan membaca data dingin dari SSD?
Mengapa di masa lalu pengguna sering berebut membayar biaya gas yang luar biasa mahal saat terjadi kepanikan pasar?
Dan bagaimana inovasi bersejarah EIP-1559 merombak total pasar transaksi Ethereum dengan membakar sebagian besar pasokan koin untuk selamanya?
Untuk menjawab rahasia di balik hukum fisika ekonomi smart contract, di modul berikutnya kita akan membedah: Gas Economics and Execution Halting.
Sampai jumpa di modul berikutnya.
