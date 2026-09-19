# The Ethereum Virtual Machine
Modul Presentasi: Programmability and Virtual Machines (04.2)

---

## Slide 1: The Ethereum Virtual Machine: Under the Hood

### Konten Slide
The Ethereum Virtual Machine: Under the Hood
Programmability and Virtual Machines (Module 04.2)

The Global Execution Engine:
Deconstructing the low-level virtual machine powering thousands of decentralized applications.
Stack limits, linear memory expansion, persistent state trees, dynamic jumps, and the architectural distinction between CALL and DELEGATECALL.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul 04.2: The Ethereum Virtual Machine.
- Menjelajahi mesin komputasi internal Ethereum di level perangkat keras virtual tingkat rendah.
- Struktur memori, eksekusi opcode, dan interaksi antar-kontrak pintar.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kedua Chapter 4: The Ethereum Virtual Machine: Under the Hood.
Pada modul sebelumnya, kita telah memahami bagaimana konsep gas berhasil menjinakkan paradoks komputasi Turing-complete di jaringan terbuka.
Hari ini kita akan melangkah lebih dalam ke ruang mesin Ethereum.
Kita tidak akan membicarakan antarmuka visual atau bahasa tingkat tinggi seperti Solidity.
Kita akan membedah EVM sebagaimana adanya: sebuah mesin eksekusi biner terdistribusi dengan arsitektur memori yang sangat unik.
Kita akan melihat bagaimana tumpukan Stack bekerja, bagaimana Memory berekspansi secara kuadratik, bagaimana basis data Persistent Storage tersusun, dan bagaimana opcode dieksekusi siklus demi siklus.

---

## Slide 2: The EVM as a Discrete State Transition Machine

### Konten Slide
The EVM as a Discrete State Transition Machine

The Formal Mathematical Model:
The EVM is a deterministic, quasi-Turing-complete, stack-based state transition machine defined in the Ethereum Yellow Paper:

Y(sigma, T) = sigma'

Core Architecture Properties:
- 256-Bit Native Word Size: Purpose-built for cryptographic operations (Keccak-256 hashes, secp256k1 curves, and curve points).
- Strict Determinism: Identical inputs must yield bit-for-bit identical outputs across thousands of heterogeneous hardware nodes worldwide.
- Isolated Sandbox: Contract execution operates in a strictly isolated environment without network sockets, filesystem access, or external hardware interrupts.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Definisi formal matematika EVM dari Ethereum Yellow Paper: Y(sigma, T) = sigma'.
- Standar kata 256-bit dirancang khusus untuk fungsi hash kriptografis dan kurva eliptis.
- Karakteristik mutlak: Deterministik total dan sandbox terisolasi tanpa akses internet atau filesystem.

**Naskah Tutur (Voiceover Script):**
Secara formal, Ethereum Virtual Machine dirumuskan dalam Yellow Paper sebagai mesin transisi status diskret.
Rumusnya sederhana: fungsi Y menerima status dunia saat ini sigma dan transaksi baru T, lalu menghasilkan status dunia baru sigma prime.
Berbeda dengan prosesor komputer Anda seperti Intel atau ARM yang memiliki panjang register 64-bit, EVM menggunakan ukuran kata 256-bit secara native.
Arsitektur 256-bit ini sengaja dirancang agar operasi kriptografi seperti hashing Keccak-256 dan kalkulasi kurva elips secp256k1 dapat berjalan optimal dalam satu register tanpa pemotongan byte.
Selain itu, EVM beroperasi di dalam sandbox yang sangat terisolasi.
Sebuah kontrak tidak memiliki izin membuka koneksi soket internet, membaca hard disk server validator, atau meminta interupsi jam fisik lokal.
Semuanya harus murni deterministik.

---

## Slide 3: EVM Memory Topology: Four Data Regions

### Konten Slide
EVM Memory Topology: Four Data Regions

1. Stack (Volatile, LIFO):
- 1,024 slots deep, 256-bit wide words.
- In-flight computation engine. Ultra-cheap gas (3 gas per basic operation).

2. Memory (Volatile, Linear Byte-Array):
- Ephemeral read/write scratchpad cleared after transaction terminates.
- Dynamically expandable byte addressing with quadratic gas expansion penalty.

3. Storage (Persistent Key-Value Store):
- 2^256 slots of 32-byte words permanently stored on global disk state.
- Extremely expensive (up to 20,000 gas) due to permanent node disk bloat.

4. Calldata (Immutable Byte-Array):
- Read-only transaction input payload sent by the caller.
- Cheap, preserved in transaction receipts without polluting contract state.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Topologi empat wilayah data EVM: Stack, Memory, Storage, dan Calldata.
- Stack: 1.024 slot LIFO, sangat cepat dan murah.
- Memory: RAM sementara linear byte-array, biaya gas naik secara kuadratik.
- Storage: Database permanen on-chain 256-bit, biaya gas termahal.
- Calldata: Buffer read-only payload transaksi.

**Naskah Tutur (Voiceover Script):**
Untuk memahami efisiensi penulisan kontrak pintar, kita harus menguasai empat wilayah data yang disediakan oleh EVM.
Wilayah pertama adalah Stack, tumpukan LIFO berisi maksimal 1.024 slot berukuran 256-bit tempat eksekusi kalkulasi aritmatika berlangsung dengan biaya gas termurah.
Wilayah kedua adalah Memory, memori sementara berupa larik bita linear yang berfungsi seperti RAM komputer biasa.
Memory ini akan dibersihkan dan lenyap begitu transaksi selesai dijalankan.
Wilayah ketiga adalah Storage, basis data permanen on-chain yang dipetakan ke hard disk seluruh validator di dunia.
Karena Storage membebani kapasitas disk global selamanya, operasi penulisan di Storage memiliki tarif gas paling mahal.
Wilayah keempat adalah Calldata, area penyimpanan read-only yang berisi data parameter panggilan transaksi dari pengguna luar dengan biaya gas yang sangat terjangkau.

---

## Slide 4: The Stack: Computation Engine & Limits

### Konten Slide
The Stack: Computation Engine & Limits

LIFO Execution Mechanics:
All EVM computational opcodes manipulate data by pushing, popping, or swapping items on top of the stack.

The Architectural Constraints:
- Maximum Depth: Exactly 1,024 slots. Attempting to push a 1,025th item triggers a fatal Stack Overflow exception.
- Reachability Boundary: The EVM instruction set only supports direct inspection of the top 16 items via SWAP1..SWAP16 and DUP1..DUP16.
- The Stack-Too-Deep Dilemma: Variables positioned deeper than slot 16 cannot be directly accessed or manipulated by bytecode.
- Engineering Solution: Group local variables into structs, or spill transient variables into Memory.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mekanisme kerja LIFO (Last In First Out) pada Stack.
- Batasan maksimal 1.024 slot; slot ke-1.025 menyebabkan Stack Overflow.
- Batasan keterjangkauan: Opcode SWAP dan DUP hanya mampu menjangkau 16 slot teratas.
- Error legendaris "Stack Too Deep" di Solidity dan teknik mitigasinya.

**Naskah Tutur (Voiceover Script):**
Mari kita periksa tumpukan Stack lebih dekat.
EVM adalah mesin berbasis tumpukan, yang berarti hampir semua instruksi bekerja dengan cara mengambil elemen teratas tumpukan dan mendorong hasil kalkulasi kembali ke atas.
Namun ada dua batasan arsitektur yang sangat krusial.
Pertama, kapasitas kedalaman Stack dibatasi tepat 1.024 slot.
Mencoba mendorong elemen ke-1.025 akan memicu error fatal Stack Overflow yang membatalkan seluruh transaksi.
Kedua, instruksi EVM hanya menyediakan opcode SWAP dan DUP hingga kedalaman 16 slot.
Jika kontrak pintar Anda memiliki lebih dari 16 variabel lokal yang aktif bersamaan, variabel yang tenggelam di bawah slot ke-16 tidak dapat diakses lagi.
Inilah sumber dari pesan error paling terkenal di dunia Solidity: "Stack Too Deep".
Para pengembang harus mengelompokkan variabel ke dalam struct atau menyimpannya sementara di Memory.

---

## Slide 5: Memory Expansion & The Quadratic Gas Cost

### Konten Slide
Memory Expansion & The Quadratic Gas Cost

Dynamic Linear Addressing:
EVM Memory is a contiguous array of zero-initialized bytes addressed by 32-byte offsets.

The Gas Expansion Penalty:
Memory is not free. While small memory allocations are cheap, large allocations become exponentially punishing.

The Exact Fee Formula:
C_mem(a) = 3 * a + floor(a^2 / 512)
Where a is the total memory allocated in 32-byte words.

Architectural Rationale:
Linear cost offsets baseline RAM access, while quadratic scaling penalizes memory hogging.
This prevents malicious contracts from crashing validator nodes through multi-gigabyte RAM allocation attacks.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Penjelasan alokasi Linear Memory sementara.
- Rumus biaya ekspansi gas memori: C_mem(a) = 3 * a + floor(a^2 / 512).
- Mengapa kuadratik? Melindungi validator dari serangan crash kehabisan RAM oleh kontrak jahat.

**Naskah Tutur (Voiceover Script):**
Wilayah data kedua adalah Memory, larik bita sementara yang dialokasikan secara dinamis dalam kelipatan 32 byte.
Awalnya, biaya penggunaan memory terasa sangat murah.
Namun, arsitek Ethereum menanamkan penalti kuadratik yang sangat keras terhadap alokasi memori berukuran besar.
Rumus biaya gas memori terdiri dari komponen linear 3 gas per kata, ditambah komponen kuadratik: ukuran kata kuadrat dibagi 512.
Jika kontrak Anda hanya meminta beberapa ratus byte memori, biaya gasnya hampir tidak terasa.
Tetapi jika sebuah kontrak jahat mencoba mengalokasikan ratusan megabyte RAM sekaligus untuk membuat server validator kehabisan memori fisik, biaya gas akan meledak secara kuadratik ke miliaran gas.
Transaksi jahat tersebut akan langsung kehabisan gas di awal dan dibatalkan sebelum sempat merusak stabilitas RAM validator.

---

## Slide 6: Persistent Storage: The 256-Bit Key-Value Disk

### Konten Slide
Persistent Storage: The 256-Bit Key-Value Disk

The Permanent State Database:
Every smart contract possesses its own independent storage space consisting of 2^256 32-byte key-value pairs.

Key Characteristics:
- Massive Key Space: 2^256 addressable slots (equal to the number of atoms in the observable universe).
- Sparse Storage: Unwritten slots contain zeros and consume zero physical disk space.
- Merkle Patricia Trie Root: All contract storage values are committed into a cryptographically authenticated cryptographic tree (storageRoot).

The High Economic Cost:
- SSTORE (Writing new cold storage slot): Up to 20,000 gas.
- SLOAD (Reading cold storage slot): 2,100 gas.
- Storage writes represent permanent disk pollution across all global archive nodes.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Anatomi Persistent Storage: Ruang kunci-nilai 2^256 slot berukuran 32-byte.
- Sifat sparse storage: Slot kosong bernilai nol dan tidak memakan ruang hard disk.
- Hubungan ke State Tree: Nilai storage diikat ke dalam Merkle Patricia Trie (storageRoot).
- Tarif gas tinggi: SSTORE berbiaya hingga 20.000 gas karena membebani disk validator selamanya.

**Naskah Tutur (Voiceover Script):**
Wilayah data ketiga adalah Persistent Storage, satu-satunya tempat di mana data tetap tersimpan aman setelah transaksi selesai.
Setiap akun kontrak memiliki ruang penyimpanan 2 pangkat 256 slot, sebuah angka fantastis yang hampir menyamai jumlah atom di alam semesta.
Secara fisik, ruang penyimpanan ini bersifat sparse atau jarang, artinya jutaan slot yang bernilai nol tidak akan memakan ruang fisik pada hard disk validator.
Seluruh nilai yang disimpan di Storage dirangkum ke dalam Merkle Patricia Trie dan akarnya disimpan di dalam block header.
Karena setiap bita data yang ditulis ke Storage harus disimpan oleh puluhan ribu node validator di seluruh dunia selama bertahun-tahun, tarif gasnya sangat mahal.
Instruksi SSTORE untuk menulis data ke slot baru membutuhkan biaya hingga 20.000 gas.
Ini adalah cara protokol melindungi ruang hard disk desentralistik agar tidak membengkak tanpa kendali.

---

## Slide 7: Opcode Execution Cycle & Bytecode Disassembly

### Konten Slide
Opcode Execution Cycle & Bytecode Disassembly

From Solidity to Raw Hex:
High-level code compiles into hex bytecode, which the EVM Program Counter (PC) steps through instruction by instruction.

```solidity
// High-Level Solidity
uint256 c = a + b;
```

Bytecode Execution Trace:
- PUSH1 0x05 (Cost: 3 gas, PC: 0) -> Pushes value 5 onto Stack
- PUSH1 0x03 (Cost: 3 gas, PC: 2) -> Pushes value 3 onto Stack
- ADD (Cost: 3 gas, PC: 4) -> Pops 5 and 3, pushes sum 8 onto Stack
- PUSH1 0x00 (Cost: 3 gas, PC: 5) -> Storage target slot 0
- SSTORE (Cost: 20,000 gas, PC: 7) -> Saves 8 permanently into Storage slot 0

The EVM maintains strict deterministic execution: PC increments monotonically unless redirected by a JUMP instruction.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Siklus eksekusi Program Counter (PC) mengevaluasi bytecode biner byte per byte.
- Contoh dekonstruksi komputasi penambahan: PUSH 5, PUSH 3, ADD, PUSH 0, SSTORE.
- Akumulasi gas per instruksi dan peran deterministik Program Counter.

**Naskah Tutur (Voiceover Script):**
Sekarang mari kita lihat bagaimana EVM mengeksekusi kode program di tingkat instruksi biner.
Ketika Anda menulis sebaris kode Solidity sederhana seperti c sama dengan a ditambah b, kompiler menerjemahkannya menjadi rangkaian opcode heksadesimal.
EVM memiliki register Program Counter atau PC yang membaca bita demi bita instruksi secara berurutan.
Langkah pertama, opcode PUSH1 memasukkan angka lima ke atas Stack.
Langkah kedua, PUSH1 memasukkan angka tiga ke atas Stack.
Langkah ketiga, opcode ADD mengambil angka lima dan tiga, menjumlahkannya, lalu mendorong angka delapan kembali ke puncak Stack.
Langkah keempat, PUSH1 menyiapkan alamat slot target.
Dan langkah kelima, opcode SSTORE memindahkan angka delapan dari Stack ke hard disk Persistent Storage permanen.
Setiap langkah mengonsumsi saldo gas transaksi secara deterministik tanpa deviasi sedikit pun.

---

## Slide 8: Control Flow: JUMP, JUMPI, & JUMPDEST Validation

### Konten Slide
Control Flow: JUMP, JUMPI, & JUMPDEST Validation

Non-Linear Execution Mechanics:
Loops and conditional branching require the Program Counter (PC) to move non-linearly using JUMP (unconditional) and JUMPI (conditional).

The Security Constraint: JUMPDEST (0x5B):
To prevent malicious code from jumping into arbitrary memory locations, data payloads, or mid-opcode offsets:
- The destination offset MUST be explicitly marked with a JUMPDEST opcode.
- Attempting to JUMP to any byte offset that is NOT a JUMPDEST opcode results in an immediate, fatal transaction reversion.
- Static bytecode analysis verifies that jump targets remain strictly constrained to valid program pathways.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mekanisme alur kendali percabangan kode: JUMP (tanpa syarat) dan JUMPI (bersyarat).
- Pengaman sistem: Opcode JUMPDEST (0x5B).
- Melompat ke alamat yang bukan JUMPDEST langsung memicu pembatalan fatal transaksi.
- Mencegah penyerang mengeksekusi data mentah calldata sebagai instruksi mesin.

**Naskah Tutur (Voiceover Script):**
Bagaimana jika sebuah kontrak pintar membutuhkan percabangan logika if-else atau perulangan for-loop?
Untuk melompat ke baris kode lain, EVM menyediakan instruksi JUMP dan JUMPI.
Namun mengizinkan lompatan kode sembarang di lingkungan terbuka sangatlah berbahaya, karena peretas bisa melompatkan eksekusi ke tengah-tengah data payload untuk dieksekusi sebagai instruksi palsu.
Untuk mencegah hal ini, arsitektur EVM menetapkan aturan yang sangat ketat: setiap target lompatan kode HARUS diawali oleh opcode khusus bernama JUMPDEST dengan kode heksa 0x5B.
Jika Program Counter mencoba melompat ke alamat memori yang tidak memiliki opcode JUMPDEST, EVM akan langsung mendeteksi pelanggaran keamanan dan membatalkan seluruh transaksi seketika.
Aturan sederhana ini memastikan eksekusi kode selalu berjalan di jalur yang sah.

---

## Slide 9: Inter-Contract Calls: CALL vs. DELEGATECALL

### Konten Slide
Inter-Contract Calls: CALL vs. DELEGATECALL

Message-Passing Dynamics:
Smart contracts achieve composability by dispatching messages to external contracts.

1. CALL (Context Boundary Preserved):
- Target contract executes code inside its OWN storage context.
- msg.sender becomes the calling contract.
- Balance and storage mutations occur within the target's state.

2. DELEGATECALL (Context Hijacked by Caller):
- Target contract code is executed inside the CALLER'S storage context.
- msg.sender and msg.value are preserved from the original transaction originator.
- The target's logic directly mutates the caller's storage variables.

DELEGATECALL is the architectural foundation of upgradable proxy patterns and reusable libraries.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Perbedaan arsitektural krusial antara pesan CALL dan DELEGATECALL.
- CALL: Berjalan di ruang konteks target, msg.sender berubah menjadi pemanggil.
- DELEGATECALL: Meminjam logika target tapi dieksekusi di dalam storage pemanggil sendiri.
- Fondasi utama pola smart contract proxy yang dapat di-upgrade.

**Naskah Tutur (Voiceover Script):**
Salah satu fitur paling hebat dari EVM adalah kemampuan kontrak pintar untuk memanggil kontrak pintar lainnya secara langsung dalam satu transaksi yang mulus.
Namun, ada dua cara berbeda dalam melakukan pemanggilan ini.
Instruksi pertama adalah CALL biasa.
Pada instruksi CALL, kontrak tujuan menjalankan logikanya sendiri, memodifikasi basis data penyimpanannya sendiri, dan menganggap kontrak pemanggil sebagai msg.sender.
Instruksi kedua yang sangat revolusioner adalah DELEGATECALL.
Pada DELEGATECALL, kontrak pemanggil meminjam kode program dari kontrak tujuan, namun mengeksekusi kode tersebut di dalam ruang memori dan storage kontrak pemanggil itu sendiri.
Parameter msg.sender dan saldo ether asli tetap dipertahankan tanpa perubahan.
Mekanisme DELEGATECALL inilah yang menjadi fondasi utama seluruh arsitektur smart contract proxy yang dapat di-upgrade di industri DeFi.

---

## Slide 10: Contract Instantiation: CREATE vs. CREATE2

### Konten Slide
Contract Instantiation: CREATE vs. CREATE2

Deploying Bytecode to Deterministic Addresses:
Contracts deploy other contracts using one of two cryptographic derivation methods.

1. CREATE (Nonce-Dependent):
- Address derived via: hash(sender_address, nonce).
- Unpredictable across chains if transaction nonces diverge.

2. CREATE2 (State-Independent, EIP-1014):
- Address derived via:
  hash(0xff ++ sender_address ++ salt ++ init_code_hash)
- Completely independent of the sender's transaction nonce.

Core Innovations Enabled by CREATE2:
- Counterfactual Instantiation: An address can receive funds and sign approvals BEFORE the contract is physically deployed.
- Identical Multi-Chain Addresses: Deploy identical contract addresses across Ethereum, Arbitrum, Optimism, and Polygon.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mekanisme pembuatan kontrak baru: CREATE vs CREATE2 (EIP-1014).
- CREATE bergantung pada nonce pengirim; sulit disinkronkan lintas blockchain.
- CREATE2 menggunakan salt dan hash bytecode; alamat dapat dihitung secara matematis sebelum kontrak dideploy.
- Memungkinkan deployment alamat identik di seluruh chain dan pola counterfactual onboarding.

**Naskah Tutur (Voiceover Script):**
Ketika sebuah kontrak baru dibuat di Ethereum, di manakah alamat publiknya ditentukan?
Ethereum menyediakan dua mekanisme pembuatan kontrak.
Mekanisme lama menggunakan opcode CREATE, di mana alamat baru dihitung dari hash alamat pembuat dan angka urutan transaksi atau nonce.
Karena nomor nonce terus bertambah setiap kali transaksi dikirim, sangat sulit memprediksi alamat kontrak secara konsisten di beberapa jaringan yang berbeda.
Untuk mengatasi masalah ini, Vitalik Buterin memperkenalkan opcode CREATE2 melalui EIP-1014.
Rumus CREATE2 menggunakan nilai awalan 0xff, alamat pembuat, nilai acak pilihan kita yang disebut salt, dan hash dari kode inisialisasi kontrak.
Hebatnya, rumus ini sama sekali tidak bergantung pada nonce.
Kita dapat menghitung alamat kontrak pintar secara matematis bertahun-tahun sebelum kontrak itu benar-benar dideploy ke blockchain.
Inilah yang memungkinkan wallet cerdas menerima deposit sebelum kontraknya di-deploy di L2.

---

## Slide 11: Bridge to Execution Economics: Gas & Halting

### Konten Slide
The Bridge to Execution Economics

From Hardware Emulation to Economic Sustainability:
We have mapped the physical limits of the Stack, the quadratic constraints of Memory, the high I/O cost of Persistent Storage, and the precision of low-level Opcode execution.

The Engineering Question:
How does a decentralized protocol establish a fair, trustless market price for every low-level opcode?
Why is reading cold disk data thousands of times more expensive than LIFO computation, and how does the network dynamically throttle fee volatility?

Next Module:
Module 04.3: EVM Gas Economics, Execution Halting, and EIP-1559.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Slide transisi penutup modul 04.2 menuju modul 04.3: Gas Economics, Execution Halting, and EIP-1559.
- Menghubungkan topologi memori EVM dengan kalkulasi tarif ekonomi gas.
- Teaser materi modul 04.3: Cold vs warm storage access (EIP-2929), lelang First-Price Auction, dan revolusi burning base fee EIP-1559.

**Naskah Tutur (Voiceover Script):**
Kita telah membedah anatomi internal Ethereum Virtual Machine dari tumpukan Stack hingga manipulasi storage dan alur eksekusi opcode.
Kita telah melihat bagaimana setiap operasi virtual memiliki batasan fisik yang sangat nyata pada perangkat keras validator.
Namun pertanyaan rekayasa berikutnya adalah: bagaimana protokol menentukan tarif harga ekonomi yang adil dan tanpa perantara untuk setiap instruksi tersebut?
Mengapa membaca data dingin dari hard disk dihargai ribuan kali lebih mahal daripada kalkulasi cepat di Stack?
Dan bagaimana protokol meredam lonjakan volatilitas biaya saat jutaan orang berebut ruang blok secara bersamaan?
Semua misteri dinamika ekonomi ini akan kita bedah secara mendalam pada modul berikutnya: EVM Gas Economics and EIP-1559.
Sampai jumpa di modul selanjutnya.
