# Ledger State Models: UTXO vs. Account Model
Modul Presentasi: Fondasi Distributed Trust (02.3)

---

## Slide 1: Ledger State Models: UTXO vs. Account Model

### Konten Slide
Ledger State Models: UTXO vs. Account Model
Architecture and State (02.3)
The architectural dichotomy between discrete output graphs and global state mappings dictates network concurrency, smart contract expressivity, and node hardware requirements.

Comparative Anatomy Matrix:
- Concurrency: UTXO enables Parallel Validation; Account enforces Sequential Execution.
- Expressivity: UTXO has Limited Stateless logic; Account provides Turing-Complete Stateful compute.
- Scalability: UTXO features High Prunability; Account faces Challenging State Growth.
- Security Surface: UTXO has Narrow double-spend attack surface; Account has Broad reentrancy and state bloat surface.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul ketiga bab Architecture and State.
- Membedah dikotomi arsitektur mendasar antara grafik koin diskret (UTXO) dan pemetaan status global (Model Akun).
- Menjelaskan bagaimana model data memengaruhi konkurensi, fleksibilitas kontrak pintar, dan beban perangkat keras validator.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga dari bab Architecture and State: Ledger State Models: UTXO versus Account Model.
Di dunia blockchain publik, seluruh cara kerja jaringan ditentukan oleh bagaimana data saldo disimpan di dalam memori komputer.
Apakah sistem memandang koin sebagai lembaran fisik terpisah yang berpindah tangan dalam sebuah grafik terarah?
Ataukah sistem memandang koin sebagai angka saldo akun di dalam satu tabel basis data raksasa?
Pilihan arsitektur antara model UTXO pada Bitcoin dan model Account pada Ethereum bukanlah sekadar selera desain kode program.
Pilihan ini secara langsung menentukan apakah jaringan dapat memproses transaksi secara paralel, seberapa cerdas kontrak pintar yang bisa dijalankan, hingga seberapa mahal spesifikasi komputer yang dibutuhkan untuk menjadi validator independen.

---

## Slide 2: Model UTXO vs. Account Model: The Core Metaphors

### Konten Slide
1. Model UTXO: Physical Wallet Metaphor
- Global Balance Entity: Null.
- Structure: Coins exist as discrete, indivisible chunks of value called Unspent Transaction Outputs (UTXOs).
- Mechanism: Buying a $60 item with a $50 and $20 bill destroys both bills, minting a new $60 bill for the merchant and a $10 change bill for the buyer.

2. Account Model: Banking Ledger Metaphor
- Global Balance Entity: Active.
- Structure: A global database maps every address directly to its total balance.
- Mechanism: Value transfer executes via in-place arithmetic mutation of the database row:
  Balance(Alice) = Balance(Alice) - 60
  Balance(Bob) = Balance(Bob) + 60

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Analogi dompet fisik (UTXO) vs buku kas perbankan (Model Akun).
- UTXO: Koin bersifat pecahan tak terbagi yang dilebur dan dicetak ulang menjadi output baru.
- Model Akun: Saldo tersimpan pada entitas akun global dan dimutasi langsung lewat aritmatika tambah/kurang.

**Naskah Tutur (Voiceover Script):**
Untuk memahami perbedaan kedua model ini, kita dapat menggunakan dua analogi di dunia nyata.
Model UTXO bekerja persis seperti dompet fisik berisi lembaran uang tunai.
Di dalam Bitcoin, tidak ada kolom basis data yang mencatat saldo total Alice.
Yang ada hanyalah lembaran koin digital terpisah yang belum dibelanjakan atau Unspent Transaction Outputs.
Jika Anda memiliki selembar uang lima puluh dolar dan selembar dua puluh dolar di dompet Anda, lalu ingin membeli barang seharga enam puluh dolar, Anda tidak bisa memotong fisik lembaran uang tersebut.
Anda harus menyerahkan kedua lembar uang tersebut ke kasir untuk dihancurkan, lalu sistem mencetak selembar uang baru enam puluh dolar untuk pedagang dan selembar uang baru sepuluh dolar sebagai kembalian ke dompet Anda.
Sebaliknya, Model Akun bekerja persis seperti buku kas perbankan modern.
Setiap alamat terdaftar sebagai satu baris data di dalam basis data global.
Ketika Alice mentransfer enam puluh dolar ke Bob, sistem hanya melakukan operasi aritmatika sederhana: saldo Alice langsung dikurangi enam puluh dan saldo Bob langsung ditambah enam puluh di baris data mereka masing-masing.

---

## Slide 3: UTXO Anatomy: Pointers and Locks

### Konten Slide
UTXO Anatomy: Pointers and Locks

Core Definitions:
- UTXO Set: The active database of all unspent transaction outputs since Genesis, cached in validator RAM.
- Transaction Inputs (Pointers):
  Inputs do not contain value. They point to past UTXOs using an Outpoint:
  TxID: 32-byte hash of the past transaction.
  vout: 4-byte integer index of the specific output.
  scriptSig: Cryptographic unlocking witness (signatures + public keys).
- Transaction Outputs (Locks / TxOut):
  value: Nominal satoshi amount.
  scriptPubKey: Cryptographic locking script dictating future spend conditions.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Anatomi transaksi UTXO: Outpoint, Input, dan Output.
- UTXO Set: Himpunan koin yang belum dibelanjakan, disimpan di RAM validator untuk validasi instan.
- Input adalah penunjuk (pointer) ke output masa lalu (TxID dan vout).
- Output adalah gembok kriptografis (value dalam satoshi dan scriptPubKey).

**Naskah Tutur (Voiceover Script):**
Mari kita bedah struktur data internal di balik transaksi UTXO.
Setiap simpul penuh Bitcoin menyimpan sebuah basis data memori berkecepatan tinggi bernama *UTXO Set*.
UTXO Set adalah kumpulan seluruh koin di dunia yang saat ini berstatus belum dibelanjakan.
Ketika sebuah transaksi baru dibuat, bagian Input transaksi sebenarnya sama sekali tidak memuat nominal uang.
Input hanyalah sebuah penunjuk atau pointer yang merujuk ke koin masa lalu menggunakan *Outpoint*, yaitu kombinasi dari hash TxID 32-byte transaksi sebelumnya dan nomor indeks output `vout`.
Input menyertakan `scriptSig` yang memuat tanda tangan kriptografis sebagai kunci pembuka gembok.
Di sisi lain, bagian Output transaksi bertindak sebagai gembok baru.
Output memuat nilai nominal koin dalam satuan satoshi serta kode program `scriptPubKey` yang menentukan kriteria matematika apa yang wajib dipenuhi oleh calon penerima di masa depan untuk dapat membuka koin tersebut.

---

## Slide 4: Value Conservation and Implicit Fees

### Konten Slide
Value Conservation and Implicit Fees

The Law of Value Conservation:
Sum(Value_Inputs) = Sum(Value_Outputs) + MinerFee
Principle: UTXOs are indivisible. They must be consumed 100% or not at all.

The Fatal Flaw of Implicit Fees:
Miner fees are strictly implicit, calculated purely as the mathematical difference between total inputs and total outputs:
MinerFee = Sum(Inputs) - Sum(Outputs)

The Danger:
If a buggy wallet software forgets to create a change output for the remaining funds, the protocol automatically awards the entire excess balance to the miner as a tip.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Hukum kekekalan nilai: Total nilai input wajib sama dengan total output ditambah biaya penambang.
- Koin UTXO bersifat tak terbagi (indivisible): wajib dikonsumsi seratus persen atau tidak sama sekali.
- Biaya penambang bersifat implisit (selisih input dikurangi output).
- Bahaya bug dompet: jika lupa mencantumkan alamat kembalian, seluruh sisa dana hangus tersedot ke penambang.

**Naskah Tutur (Voiceover Script):**
Di dalam model UTXO berlaku hukum fisika kekekalan nilai atau *The Law of Value Conservation*.
Karena koin UTXO bersifat tak terbagi, sebuah koin yang dijadikan input transaksi wajib dihanguskan seratus persen.
Jumlah seluruh nilai input harus sama persis dengan jumlah seluruh nilai output ditambah biaya penambang.
Satu keunikan krusial pada Bitcoin adalah bahwa biaya transaksi atau miner fee bersifat *implisit*.
Tidak ada bidang data khusus di dalam transaksi Bitcoin yang menuliskan nominal biaya penambang.
Protokol secara otomatis menghitung biaya penambang sebagai selisih matematika murni antara total input dikurangi total output.
Sifat ini pernah melahirkan insiden fatal bagi pengembang perangkat lunak dompet.
Jika kode dompet mengalami bug dan lupa menyertakan alamat kembalian untuk uang sisa pengguna, protokol Bitcoin akan menganggap seluruh sisa uang tersebut sebagai tip sukarela dan memberikannya secara instan kepada penambang yang menemukan blok.

---

## Slide 5: Cryptographic Stack Execution

### Konten Slide
Cryptographic Stack Execution

Engine Architecture:
Forth-like, stack-based engine.
Intentionally non-Turing complete (no loops) to permanently prevent the halting problem.

Execution Sequence (P2PKH):
1. Push signature [sig] and public key [pubKey] to stack.
2. OP_DUP: Duplicate the top stack item (pubKey).
3. OP_HASH160: Apply SHA-256 and RIPEMD-160 to pubKey.
4. Push target expected hash from locking script.
5. OP_EQUALVERIFY: Validate that the public key hash matches the target address.
6. OP_CHECKSIG: Verify ECDSA signature against transaction digest.

Result: Spend is valid only if the final top stack value evaluates to TRUE.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mesin eksekusi Bitcoin Script berbasis tumpukan (stack) mirip bahasa Forth.
- Sengaja dibuat non-Turing complete (tanpa looping) demi mencegah serangan halting problem.
- Alur eksekusi P2PKH: OP_DUP, OP_HASH160, OP_EQUALVERIFY, dan OP_CHECKSIG.
- Transaksi sah hanya jika nilai puncak tumpukan bernilai TRUE di akhir eksekusi.

**Naskah Tutur (Voiceover Script):**
Bagaimana simpul memvalidasi bahwa kunci pembuka input cocok dengan gembok output?
Bitcoin menggunakan mesin komputasi berbasis tumpukan atau stack yang mirip dengan bahasa pemrograman Forth bernama *Bitcoin Script*.
Satoshi sengaja merancang Script bersifat non-Turing complete, artinya Script tidak memiliki perintah perulangan atau looping.
Desain ini bertujuan untuk mencegah *halting problem*, memastikan bahwa program validasi selalu berhenti dan tidak ada peretas yang bisa membuat simpul berputar selamanya.
Pada skema transaksi standar P2PKH, proses validasi berjalan dalam enam langkah tumpukan.
Tanda tangan dan kunci publik didorong ke dalam stack.
Opcode OP_DUP menggandakan kunci publik, lalu OP_HASH160 menghitung hashnya.
Setelah itu, sistem mencocokkan hash tersebut dengan alamat penerima melalui OP_EQUALVERIFY.
Terakhir, opcode OP_CHECKSIG memverifikasi keabsahan tanda tangan kurva eliptik terhadap data transaksi.
Jika seluruh operasi matematika berhasil tanpa cacat dan menyisakan nilai TRUE di puncak stack, koin dinyatakan sah untuk dibelanjakan.

---

## Slide 6: Account Anatomy: The Ethereum 4-Tuple

### Konten Slide
Account Anatomy: The Ethereum 4-Tuple

State Mapping:
sigma: Address (20-byte) -> Account 4-Tuple

The 4-Tuple Components:
1. nonce: Scalar transaction counter (for EOAs) or contract creation counter.
2. balance: Native cryptocurrency balance measured in wei.
3. storageRoot: 256-bit hash root of a dedicated internal Merkle Patricia storage tree.
4. codeHash: Keccak-256 hash of the governing contract bytecode.

Account Types:
- Externally Owned Accounts (EOA):
  Human/key-controlled.
  storageRoot and codeHash are empty.
  The only entities that can initiate transactions and pay gas.
- Contract Accounts:
  Managed autonomously by permanent on-chain EVM bytecode.
  Hold state variables in their private storageRoot trie.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Struktur data 4-Tuple pada setiap akun Ethereum: nonce, balance, storageRoot, codeHash.
- Dua jenis akun: EOA (dikendalikan private key manusia) vs Contract Account (dikendalikan kode program).
- Hanya EOA yang dapat menginisiasi transaksi pertama dan membayar gas.

**Naskah Tutur (Voiceover Script):**
Sekarang mari kita beralih ke filosofi yang berseberangan: Model Akun pada Ethereum.
Di dalam basis data Ethereum, setiap alamat dua puluh byte dipetakan secara langsung ke sebuah struktur data yang disebut 4-Tuple.
Empat elemen tersebut adalah nonce sebagai pencatat nomor urut transaksi, balance sebagai penyimpan saldo mata uang native dalam satuan wei, storageRoot sebagai akar pohon penyimpanan memori internal, serta codeHash yang menyimpan hash dari kode program kontrak pintar.
Ethereum membagi ekosistemnya menjadi dua jenis akun.
Pertama adalah Externally Owned Account atau EOA, yaitu akun pribadi yang dikendalikan oleh manusia menggunakan private key.
Akun EOA memiliki nilai storageRoot dan codeHash yang kosong, dan merupakan satu-satunya entitas di jaringan yang berhak menginisiasi transaksi dan membayar gas.
Kedua adalah Contract Account, yaitu akun otonom yang dikendalikan oleh kode bytecode EVM.
Akun kontrak dapat menyimpan variabel data permanen di dalam pohon storageRoot miliknya sendiri dan dapat merespons transaksi yang dikirim oleh akun lain.

---

## Slide 7: Modified Merkle Patricia Trie (MPT)

### Konten Slide
Modified Merkle Patricia Trie (MPT)

The Hybrid Solution:
Merges the cryptographic integrity of a Merkle Tree with the O(log N) path-finding efficiency of a Radix trie.

Trie Hierarchy:
Root Node (32-byte stateRoot) -> Extension Nodes -> Branch Nodes -> Leaf Nodes (Account Data).

Logarithmic Mutation:
When Alice transfers ETH to Bob, nodes do not recalculate the entire database.
Only the specific nodes along the traversal path from leaf to root are updated.

State Root:
The resulting 32-byte stateRoot is embedded directly into the block header, guaranteeing global state consensus across all independent validators.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Struktur Modified Merkle Patricia Trie (MPT) menggabungkan pohon Merkle dan Radix trie.
- Mutasi logaritmik: pembaruan saldo hanya menghitung ulang simpul di sepanjang jalur dari daun ke akar.
- Menghasilkan stateRoot 32-byte yang ditanam di header blok untuk menjamin keseragaman status dunia.

**Naskah Tutur (Voiceover Script):**
Tantangan terbesar dari Model Akun adalah kecepatan pembuktian status.
Jika ada puluhan juta akun di dunia, bagaimana kita merangkum status seluruh akun tersebut ke dalam satu hash 32-byte tanpa harus menghitung ulang seluruh basis data setiap detik?
Ethereum merancang struktur data canggih bernama Modified Merkle Patricia Trie atau MPT.
MPT adalah perkawinan silang antara pohon Merkle yang memberikan integritas kriptografis dan Radix trie yang memberikan efisiensi pencarian kunci berbasis prefiks karakter.
Pohon ini tersusun dari Leaf Nodes di bagian bawah, Branch Nodes di percabangan, Extension Nodes untuk memadatkan jalur, hingga bermuara pada satu Root Node di puncak.
Ketika Alice mentransfer saldo ke Bob, validator tidak perlu menyusun ulang seluruh basis data global.
Validator hanya memperbarui simpul-simpul yang berada di sepanjang jalur dari simpul daun Alice dan Bob menuju puncak pohon secara logaritmik.
Nilai akhir 32-byte stateRoot ini ditanamkan di header blok, memberikan bukti konsensus status dunia yang tak terbantahkan.

---

## Slide 8: Architectural Synthesis Matrix

### Konten Slide
Architectural Synthesis Matrix

Dimension:
1. State Representation:
   - UTXO Model: Independent coin graph.
   - Account Model: Global mapping of balances.
2. Transaction Concurrency:
   - UTXO Model: High (Native parallel processing of disjoint outputs).
   - Account Model: Low (Forced sequential execution for identical accounts).
3. Contract Expressivity:
   - UTXO Model: Limited (Stateless, complex shared state logic).
   - Account Model: Turing-Complete (Effortless shared state execution).
4. Storage Burden:
   - UTXO Model: Efficient (Spent coins are pruned from active RAM).
   - Account Model: High (Permanent state bloat over time).
5. Privacy Mechanics:
   - UTXO Model: Superior (Fresh change address generated for every spend).
   - Account Model: Vulnerable (Static address reuse links all transactions).
6. Double-Spend Check:
   - UTXO Model: Outpoint consumption check in UTXO Set.
   - Account Model: Scalar nonce increment check in database.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Matriks perbandingan komparatif UTXO vs Account Model melintasi 6 dimensi rekayasa.
- UTXO unggul dalam konkurensi paralel, pemangkasan memori penyimpanan, dan privasi alamat baru.
- Model Akun unggul mutlak dalam fleksibilitas kontrak pintar dan koordinasi shared-state.

**Naskah Tutur (Voiceover Script):**
Mari kita rangkum perbandingan komparatif antara Model UTXO dan Model Account melintasi enam dimensi rekayasa sistem.
Dalam hal konkurensi transaksi, model UTXO unggul telak karena simpul dapat memproses ribuan transaksi secara paralel selama transaksi tersebut mengonsumsi koin output yang berbeda.
Sebaliknya, model akun terikat pada eksekusi sekuensial yang ketat untuk mencegah konflik saldo pada akun yang sama.
Namun dalam hal fleksibilitas kontrak pintar, model akun adalah pemenang mutlak karena variabel memori dapat diakses dan diubah bersama secara bebas oleh banyak pengguna.
Di sisi beban penyimpanan memori, model UTXO sangat efisien karena koin yang sudah dibelanjakan dapat langsung dihapus dari memori RAM validator, sementara model akun menderita masalah pembengkakan state permanen di mana data yang sudah masuk sulit untuk dihapus.
Dan dari segi privasi, model UTXO secara alami mendorong penggunaan alamat baru di setiap uang kembalian, sedangkan model akun mendorong penggunaan satu alamat statis yang mudah diprofiling.

---

## Slide 9: Real-World Architectural Bottlenecks

### Konten Slide
Real-World Architectural Bottlenecks

1. UTXO Limit: Cardano eUTXO (Concurrency Collision)
- Cardano adopted Extended UTXO for smart contracts, requiring liquidity pools to be represented as single UTXOs.
- The Bottleneck: Representing a liquidity pool as a single UTXO means it can mathematically only execute 1 swap per block.
- Simultaneous user swaps instantly fail due to double-spend collisions on the shared liquidity output.

2. Account Limit: Ethereum Storage (State Bloat & Contention)
- Easy shared-state comes with severe hardware degradation.
- The Bottleneck: Account data and storage slots persist indefinitely in the MPT. Sequential access to popular contract pools triggers extreme gas bidding wars.
- Continuous state bloat chokes disk I/O, forcing full node validators onto enterprise-grade NVMe SSDs just to maintain chain sync.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bottleneck dunia nyata: Kasus kegagalan konkurensi Cardano eUTXO vs Krisis state bloat Ethereum.
- Cardano eUTXO: Kolam likuiditas AMM sebagai 1 UTXO hanya bisa melayani 1 swap per blok karena tabrakan double-spend.
- Ethereum: Kemudahan shared-state memicu perang gas dan pembengkakan I/O disk yang mewajibkan SSD NVMe kelas enterprise.

**Naskah Tutur (Voiceover Script):**
Dilema teoritis ini terbukti nyata dalam insiden rekayasa di dunia industri blockchain.
Ketika Cardano mencoba menghadirkan smart contract menggunakan arsitektur Extended UTXO, mereka membentur tembok konkurensi.
Dalam aplikasi pertukaran terdesentralisasi atau AMM, seluruh likuiditas pasar terikat pada satu output UTXO bersama.
Karena satu UTXO hanya bisa dikonsumsi satu kali per blok, pertukaran tersebut secara matematis hanya mampu melayani tepat satu pengguna per blok.
Ratusan pengguna lain yang mencoba bertransaksi secara bersamaan seketika gagal karena koin likuiditas tersebut sudah terlanjur dilebur oleh pengguna pertama.
Di sisi lain, Ethereum membayar mahal kemudahan sistem akun mereka dengan krisis State Bloat.
Karena data kontrak pintar tersimpan permanen di dalam pohon MPT, beban membaca dan menulis data ke disk semakin hari semakin lambat.
Untuk menjaga sinkronisasi simpul agar tidak tertinggal dari rantai utama, para operator validator independen kini terpaksa menggunakan media penyimpanan SSD NVMe kelas industri dengan kecepatan tinggi, yang pada akhirnya membatasi siapa saja yang sanggup menjalankan simpul sendiri di rumah.

---

## Slide 10: The Consensus Dilemma

### Konten Slide
The Consensus Dilemma
Reconciling State Models with Global Truth

The Absolute Mandate:
Regardless of whether a ledger relies on the stateless graphs of UTXOs or the global mappings of Account models, all distributed nodes face one absolute mandate:
They must agree on a single, mathematically valid timeline.

The Fracture Scenarios:
- What happens when network latency causes two miners on opposite sides of the globe to discover valid blocks at the exact same millisecond?
- How does a network mathematically resolve temporary block reorganizations versus permanent ideological hard forks?
- When can a user or cryptocurrency exchange safely consider a state transition to be irreversibly final?

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Model status buku besar hanyalah representasi data internal.
- Tantangan mutlak sistem terdistribusi: seluruh simpul wajib menyepakati satu garis waktu kebenaran tunggal.
- Munculnya percabangan: perselisihan latensi jaringan sementara vs perpecahan ideologis permanen.

**Naskah Tutur (Voiceover Script):**
Apapun model buku besar yang dipilih oleh sebuah arsitektur protokol, baik itu grafik koin UTXO tanpa status maupun tabel akun dengan status global, seluruh simpul terdistribusi di dunia terikat pada satu mandat mutlak yang sama: mereka wajib menyepakati satu garis waktu sejarah yang identik.
Namun di dunia nyata, jaringan internet tidaklah sempurna.
Apa yang terjadi ketika dua penambang di belahan bumi yang berbeda menemukan blok valid pada milidetik yang sama persis akibat keterlambatan transmisi serat optik?
Bagaimana protokol memulihkan perpecahan status sementara secara otomatis tanpa campur tangan manusia?
Dan apa perbedaan mendasar antara reorganisasi blok acak dengan perpecahan garpu keras atau hard fork permanen yang membelah komunitas pengembang?
Yang terpenting, kapan sebuah transaksi saldo benar-benar mencapai titik finalitas mutlak yang mustahil untuk dibatalkan?

---

## Slide 11: Bridge to the Next Module: Forks, Finality, and Reorganizations

### Konten Slide
The Inevitability of Divergence:
When physical latency splits the timeline, how does math heal the wound?

Next Module:
Module 02.4: Forks, Finality, and Reorganizations.

Core Themes Explored:
- Soft Forks vs. Hard Forks: Backward-compatible rule tightening vs. permanent chain schisms.
- The Mechanics of Reorgs: The heaviest-chain rule and the economics of the 51% double-spend attack.
- Probabilistic Finality (PoW) vs. Deterministic Economic Finality (PoS Casper FFG).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengantarkan peserta ke modul penutup bab Architecture and State.
- Pertanyaan kunci: Bagaimana protokol merekonsiliasi percabangan garis waktu dan menjamin kepastian transaksi.
- Teaser materi modul 02.4: Mekanisme Reorg, Soft Fork vs Hard Fork, dan evolusi finalitas PoW ke PoS.

**Naskah Tutur (Voiceover Script):**
Pertanyaan tentang garis waktu kebenaran ini membawa kita ke modul penutup dari bab Architecture and State.
Di modul berikutnya, kita akan membedah secara matematis dan ekonomis bagaimana konsensus menangani perpecahan garis waktu di jaringan internet terbuka.
Kita akan melihat bagaimana aturan rantai terakumulasi terberat menyelesaikan reorganisasi blok, bagaimana serangan double-spend dilancarkan melalui pembatalan blok, serta evolusi dramatis dari finalitas probabilistik enam blok pada Proof of Work menuju finalitas ekonomi deterministik pada konsensus Proof of Stake Casper FFG.
Semua ini akan kita kupas tuntas dalam Forks, Finality, and Reorganizations.
Terima kasih, dan sampai jumpa di modul berikutnya.
