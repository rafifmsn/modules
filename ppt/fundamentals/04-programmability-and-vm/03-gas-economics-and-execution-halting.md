# Gas Economics and Execution Halting
Modul Presentasi: Programmability and Virtual Machines (04.3)

---

## Slide 1: EVM Gas Architecture & Execution Halting

### Konten Slide
EVM Gas Architecture & Execution Halting
Programmability and Virtual Machines (Module 04.3)

The Fuel of the World Computer:
Deconstructing computational resource metering, opcode pricing dynamics, storage penalties, and the macroeconomic transition from First-Price Auctions to EIP-1559 base fee burning.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul 04.3: Gas Economics and Execution Halting.
- Membedah bahan bakar komputer dunia: Pengukuran sumber daya komputasi dan dinamika harga gas.
- Memahami evolusi dari lelang First-Price Auction hingga mekanisme pembakaran biaya EIP-1559.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga Chapter 4: EVM Gas Architecture and Execution Halting.
Pada modul sebelumnya, kita telah melihat bagaimana EVM mengeksekusi bytecode instruksi demi instruksi di atas tumpukan Stack dan Storage.
Hari ini kita akan mengupas tuntas sistem saraf ekonomi yang membuat komputer dunia ini dapat bertahan hidup tanpa henti: mekanisme Gas.
Kita akan membedah mengapa gas sengaja dipisahkan dari unit mata uang ether, bagaimana biaya intrinsik transaksi dihitung, kegagalan lelang prioritas konvensional, revolusi algoritma penyesuaian biaya dasar EIP-1559, dan bagaimana batas gas melindungi jaringan dari kehancuran komputasi.

---

## Slide 2: Why Gas is Decoupled from Ether

### Konten Slide
Why Gas is Decoupled from Ether

The Two-Tier Architecture:
- Gas (Physical Work Unit): An immutable, deterministic measure of computational effort, CPU cycles, and disk I/O.
- Gas Price (Market Dollar Value): The dynamic market rate in Gwei (10^-9 ETH) that a user is willing to pay per unit of gas.

The Critical Decoupling Rationale:
If computational opcodes were priced directly in Ether (e.g., ADD = 0.0001 ETH):
- A 10x surge in the market price of ETH would instantly make sending a simple transaction 10x more expensive in fiat terms.
- Smart contract execution would become completely unaffordable during bull markets.

Decoupling insulates computation from crypto volatility: Computational workload remains constant while market forces float freely.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pemisahan mendasar antara Gas (unit kerja komputasi) dan Gas Price (nilai pasar diukur dalam Gwei).
- Mengapa gas tidak dihargai langsung dalam Ether? Menjaga biaya eksekusi agar tidak melonjak liar saat harga pasar ETH naik sepuluh kali lipat.
- Prinsip desain: Kompleksitas komputasi bersifat statis, sementara harga pasar berfluktuasi bebas.

**Naskah Tutur (Voiceover Script):**
Salah satu keputusan arsitektur paling cemerlang dalam perancangan Ethereum adalah memisahkan Gas dari mata uang Ether.
Banyak orang awam mengira gas adalah uang kripto, padahal gas adalah satuan pengukuran kerja fisik.
Satu unit gas mencerminkan usaha komputasi tertentu yang tidak pernah berubah, misalnya instruksi penambahan aritmatika ADD selalu bernilai tepat 3 gas.
Sebaliknya, Gas Price adalah harga pasar dalam satuan Gwei yang ditawarkan pengguna untuk membeli satu unit gas tersebut.
Bayangkan jika operasi kontrak pintar langsung dihargai dengan angka tetap dalam ETH.
Ketika harga pasar ETH melonjak sepuluh kali lipat dari dua ratus dolar menjadi dua ribu dolar, biaya menjalankan aplikasi akan mendadak sepuluh kali lipat lebih mahal bagi pengguna.
Dengan memisahkan keduanya, protokol memastikan bahwa biaya fisik komputasi tetap stabil, sementara pasar bebas menentukan berapa biaya rupiah atau dolar yang bersedia dibayar oleh para pengantre blok.

---

## Slide 3: The Intrinsic Gas Floor & Data Compression Costs

### Konten Slide
The Intrinsic Gas Floor & Data Compression Costs

The 21,000 Gas Minimum Barrier:
Every standard transaction on the Ethereum network immediately pays a non-negotiable base fee of exactly 21,000 Gas before executing a single line of bytecode.

What 21,000 Gas Covers:
- Cryptographic signature recovery via ECDSA (ecrecover).
- Transaction format validation and nonce sequence verification.
- Writing the base account balance mutation to the global state trie.

Calldata Payload Costs:
Beyond the baseline 21,000 gas, transactions transmit payload data:
- Zero Bytes (0x00): Cost 4 gas per byte (easy to compress on validator disks).
- Non-Zero Bytes: Cost 16 gas per byte (random, uncompressible payload data).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Angka keramat 21.000 gas sebagai batas lantai intrinsik minimum setiap transaksi.
- Biaya 21.000 gas mencakup: Pemulihan tanda tangan ECDSA, validasi nonce, dan pembaruan balance di state trie.
- Biaya calldata: Byte bernilai nol hanya 4 gas (mudah dikompresi), byte bukan nol bernilai 16 gas (sulit dikompresi).

**Naskah Tutur (Voiceover Script):**
Pernahkah Anda bertanya mengapa biaya transfer Ethereum paling murah selalu membutuhkan tepat 21.000 gas?
Angka 21.000 gas ini adalah batas lantai intrinsik yang wajib dibayar di muka sebelum EVM menjalankan instruksi bytecode pertamanya.
Biaya dasar ini mencakup tiga beban kerja perangkat keras validator: memverifikasi tanda tangan kriptografi kurva elips pengirim, memeriksa validitas urutan nomor nonce, dan memperbarui saldo rekening di basis data state trie.
Jika transaksi Anda membawa muatan data calldata tambahan, ada biaya per bita yang harus dibayar.
Uniknya, EVM membedakan jenis byte tersebut.
Byte yang bernilai nol hanya dikenakan biaya 4 gas karena sangat mudah dikompresi di hard disk validator.
Sedangkan byte yang bukan nol dikenakan biaya 16 gas karena berupa data acak yang sulit dikompresi.
Efisiensi kompresi data ini adalah salah satu teknik optimasi gas paling vital bagi para arsitek rollup Layer 2.

---

## Slide 4: The Failure of First-Price Auctions (Pre-EIP-1559)

### Konten Slide
The Failure of First-Price Auctions (Pre-EIP-1559)

The Blind Bidding War:
Prior to August 2021 (London Hard Fork), Ethereum operated under a traditional First-Price Auction (FPA) system.

The Structural Flaws of FPA:
1. Blind Overbidding: Users could not observe real-time market clearing prices. To ensure inclusion, users wildly overbid, overpaying up to 500% during periods of volatility.
2. Fragile Fee Estimation: Wallets relied on naive historical block averages, causing transactions to get stuck for hours when demand suddenly spiked.
3. Miner Bribery & Self-Dealing: Miners could artificially inflate gas price estimates by stuffing blocks with fake, high-fee transactions from their own private wallets.

The ecosystem urgently required a predictable, automated, algorithmic fee mechanism.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Mengapa mekanisme lelang lama First-Price Auction (sebelum EIP-1559) gagal total.
- Pengguna menebak-nebak di ruang gelap dan membayar hingga 500% lebih mahal agar transaksinya tidak tertunda.
- Estimasi dompet yang tidak akurat membuat transaksi macet berjam-jam saat volatilitas melonjak.
- Penambang dapat memanipulasi pasar dengan memasukkan transaksi palsu buatan mereka sendiri.

**Naskah Tutur (Voiceover Script):**
Sebelum bulan Agustus 2021, mekanisme penentuan harga gas di Ethereum menggunakan sistem lelang harga pertama atau First-Price Auction.
Di sistem ini, siapa pun yang membayar tip gas tertinggi akan diprioritaskan oleh penambang untuk masuk ke dalam blok.
Namun di dunia nyata, model lelang buta ini sangat merugikan pengguna biasa.
Karena pengguna tidak tahu berapa persisnya tarif yang dibutuhkan untuk masuk blok berikutnya, dompet kripto sering kali merekomendasikan harga gas yang terlalu tinggi hingga lima ratus persen demi mencegah transaksi macet.
Jika lonjakan transaksi terjadi secara tiba-tiba, ribuan transaksi pengguna dengan biaya normal akan terjebak di mempool selama berjam-jam tanpa kepastian.
Lebih buruk lagi, para penambang bisa dengan sengaja memanipulasi pasar dengan memasukkan transaksi berbayar mahal milik mereka sendiri ke dalam blok untuk menaikkan estimasi biaya secara buatan.
Jaringan membutuhkan revolusi penetapan harga yang algoritmik dan transparan.

---

## Slide 5: The EIP-1559 Revolution: The Dual-Fee Mechanism

### Konten Slide
The EIP-1559 Revolution: The Dual-Fee Mechanism

The Paradigm Shift (London Hard Fork, August 2021):
Replaced the chaotic blind auction with an automated, protocol-regulated pricing model splitting fees into two distinct components.

1. Base Fee (Algorithmic & Burned):
- Dynamically calculated by protocol math based on previous block congestion.
- Mandatory for inclusion: Must be paid by the user.
- Strictly BURNED: Destroyed permanently from total Ether circulating supply.

2. Priority Fee (Direct Validator Tip):
- Discretionary incentive paid directly to the validator to prioritize ordering within the block.
- Remains small and stable even during severe network congestion.

Total Fee Equation:
Effective Gas Price = Base Fee + min(Priority Fee, Max Fee - Base Fee)

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Terobosan EIP-1559 pada London Hard Fork (Agustus 2021).
- Struktur biaya ganda: Base Fee (wajib dan dibakar) dan Priority Fee (tip opsional langsung ke validator).
- Base Fee dibakar (burned) permanen dari peredaran, Priority Fee memberi insentif urutan transaksi.
- Formula biaya efektif: Base Fee ditambah Priority Fee (dibatasi oleh Max Fee).

**Naskah Tutur (Voiceover Script):**
Untuk menghapus ketidakpastian lelang buta tadi, komunitas Ethereum mengadopsi proposal bersejarah EIP-1559 pada Hard Fork London bulan Agustus 2021.
EIP-1559 memecah biaya transaksi menjadi dua komponen terpisah secara struktural.
Komponen pertama adalah Base Fee, yaitu tarif dasar yang dihitung langsung oleh algoritma protokol berdasarkan kepadatan blok sebelumnya.
Pengguna wajib membayar Base Fee ini agar transaksinya valid, namun yang paling revolusioner: seluruh Base Fee ini langsung dibakar dan dimusnahkan secara permanen dari peredaran uang Ether.
Komponen kedua adalah Priority Fee, yaitu tip sukarela yang diberikan langsung ke dompet validator agar transaksi diletakkan di urutan paling depan.
Dengan sistem dua lapis ini, pengguna tidak perlu lagi menebak harga di ruang gelap; mereka cukup membayar Base Fee resmi yang sudah ditetapkan oleh matematika protokol.

---

## Slide 6: Elastic Blocks & The Mathematical Base Fee Formula

### Konten Slide
Elastic Blocks & The Mathematical Base Fee Formula

Dynamic Block Sizing:
- Target Gas Size: Exactly 15,000,000 gas (50% capacity).
- Maximum Hard Cap: Exactly 30,000,000 gas (100% capacity).

The Algorithmic Adjustment Formula:
Base Fee adjusts dynamically each block based on actual gas usage relative to the 15M target:

delta_BaseFee = BaseFee_prev * ((GasUsed - TargetGas) / TargetGas) * (1 / 8)

The 12.5% Bounding Rule:
- If a block is 100% full (30M gas), the Base Fee increases by at most 12.5% for the subsequent block.
- If a block is 0% full (empty), the Base Fee decreases by at most 12.5%.
- Predictable, bounded price steps eliminate wild, multi-thousand-percent fee spikes between adjacent blocks.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Konsep Elastic Block: Ukuran blok fleksibel dengan target 15 juta gas (50%) dan batas keras 30 juta gas (100%).
- Rumus penyesuaian Base Fee matematis: delta_BaseFee berbanding lurus dengan selisih gas terhadap target 15M.
- Batasan peredam 12,5%: Base Fee maksimal naik atau turun 12,5% per blok berurutan, mencegah guncangan harga liar seketika.

**Naskah Tutur (Voiceover Script):**
Kunci kestabilan harga EIP-1559 terletak pada mekanisme blok elastis.
Protokol Ethereum menetapkan target ruang blok rata-rata sebesar 15 juta gas, tetapi mengizinkan blok meregang hingga kapasitas maksimal 30 juta gas saat terjadi lonjakan antrean transaksi.
Setiap kali sebuah blok ditambang, protokol membandingkan gas aktual yang terpakai dengan target 15 juta gas.
Jika blok terisi penuh 30 juta gas, artinya permintaan sedang sangat tinggi, dan algoritma akan menaikkan Base Fee sebesar maksimal 12,5% pada blok berikutnya.
Sebaliknya, jika blok kosong, Base Fee akan diturunkan maksimal 12,5%.
Aturan peredam 12,5% ini menjamin bahwa biaya gas tidak akan pernah melonjak ribuan persen dalam hitungan detik.
Kenaikan harga terjadi secara terukur dan bertahap, memberikan kepastian bagi pengguna dan bot transaksi.

---

## Slide 7: The Deflationary Monetary Engine: Ultra Sound Money

### Konten Slide
The Deflationary Monetary Engine: Ultra Sound Money

Transforming Gas into Monetary Scarcity:
By burning the Base Fee, Ethereum fundamentally linked computational execution demand directly to its macroeconomic supply.

The Supply Equilibrium Dynamic:
- High Network Activity: Millions of transactions burn vast quantities of ETH. If Burn Rate > New Staking Issuance, total ETH supply contracts deflationarily.
- Low Network Activity: Gas burns decline, and network security issuance slightly expands the supply.

Historical Impact (Post-Merge):
- Over 4,000,000+ ETH burned permanently out of circulation.
- Replaced inflationary miner subsidies with a dynamic, fee-burning macroeconomic sink known as Ultra Sound Money.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dampak makroekonomi pembakaran gas: Transformasi pasokan moneter Ether menjadi Ultra Sound Money.
- Keseimbangan pasokan: Saat aktivitas jaringan tinggi, laju pembakaran (burn rate) melampaui inflasi staking, membuat total suplai ETH menyusut secara deflasioner.
- Lebih dari 4 juta ETH telah musnah permanen dari peredaran sejak EIP-1559 diaktifkan.

**Naskah Tutur (Voiceover Script):**
Dampak paling radikal dari pembakaran Base Fee bukan hanya terasa pada kenyamanan pengguna, melainkan pada arsitektur moneter Ethereum secara global.
Dengan memusnahkan Base Fee dari peredaran, Ethereum mengunci permintaan komputasi di dunia nyata langsung ke kelangkaan suplai asetnya.
Ketika aktivitas ekosistem DeFi dan NFT sedang meledak tinggi, jutaan transaksi membakar volume Ether dalam jumlah yang luar biasa besar.
Jika laju pembakaran ini melebihi laju penerbitan koin baru untuk para validator staking, total pasokan Ether di dunia akan mengalami deflasi dan menyusut.
Hingga hari ini, lebih dari empat juta koin ETH telah dimusnahkan selamanya dari peredaran.
Inovasi ini mengubah Ethereum dari aset yang mengalami inflasi tahunan menjadi model moneter yang dijuluki komunitas sebagai Ultra Sound Money.

---

## Slide 8: Execution Termination: REVERT vs. INVALID (Out-of-Gas)

### Konten Slide
Execution Termination: REVERT vs. INVALID (Out-of-Gas)

Two Different Exception Pathways:
When an error occurs during execution, the EVM handles gas fees and state modifications through two sharply contrasting mechanisms.

1. REVERT (Opcode 0xFD - Graceful Failure):
- Triggered by: require() condition failures, explicit custom errors, or user aborts.
- State Effect: All storage and balance modifications are reverted to pre-transaction state.
- Gas Conservation: Returns ALL unspent remaining gas back to the transaction originator.

2. INVALID / Out-of-Gas (OOG - Catastrophic Failure):
- Triggered by: assert() failures, executing unassigned opcodes, or running out of gas.
- State Effect: Total state rollback.
- Gas Seizure: Consumes and burns 100% of the allocated gas limit. Zero refund.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dua jalur penghentian eksekusi saat terjadi error: REVERT vs INVALID / Out-of-Gas.
- REVERT (0xFD): Kegagalan elegan via require(); membatalkan mutasi status tetapi mengembalikan sisa gas ke pengguna.
- INVALID / OOG: Kegagalan fatal via assert() atau kehabisan gas; seluruh gas disita 100% tanpa refund untuk menghukum kelalaian komputasi.

**Naskah Tutur (Voiceover Script):**
Ketika sebuah kontrak pintar gagal menyelesaikan eksekusinya, ada dua cara mesin virtual menghentikan transaksi tersebut.
Jalur pertama adalah REVERT dengan kode heksa 0xFD.
Jalur ini dipicu oleh pengecekan kondisi require yang tidak terpenuhi, misalnya saldo pengguna tidak mencukupi.
Pada kondisi REVERT, seluruh mutasi status memang dibatalkan, namun protokol bersikap sangat adil: seluruh sisa gas yang belum sempat terpakai akan langsung dikembalikan ke dompet pengguna.
Jalur kedua adalah kegagalan fatal seperti kondisi Out-of-Gas atau opcode INVALID akibat pelanggaran kondisi assert.
Pada jalur kedua ini, selain membatalkan seluruh status, protokol akan menyita seratus persen kuota gas transaksi tanpa ada pengembalian sepeser pun.
Penyitaan total ini adalah mekanisme hukuman protokol agar pengembang berhati-hati dan tidak membiarkan kode ceroboh membebani jaringan validator.

---

## Slide 9: State Bloat Defense: Cold vs. Warm Access (EIP-2929)

### Konten Slide
State Bloat Defense: Cold vs. Warm Access (EIP-2929)

The Shanghai DoS Attack Vector:
In 2016, attackers spammed empty account reads at 20-40 gas per read, forcing validators to execute heavy random disk I/O operations and freezing the network.

The EIP-2929 Architectural Remedy:
Introduced the concept of Cold vs. Warm access lists during transaction execution.

Opcode Pricing Differentiation:
- SLOAD (Cold Slot Read): 2,100 gas (requires expensive physical SSD retrieval).
- SLOAD (Warm Slot Read): 100 gas (already cached inside node RAM).
- Cold Account Access: 2,600 gas -> Warm Account Access: 100 gas.

Engineering Result: Re-calibrated opcode economics to precisely reflect the physical hardware cost of reading slow persistent disk storage.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Latar belakang serangan Shanghai DoS (2016) akibat tarif baca hard disk yang terlalu murah (20-40 gas).
- Solusi arsitektural EIP-2929: Pembedaan akses data dingin (Cold) versus data hangat (Warm).
- SLOAD Cold berbiaya 2.100 gas (baca SSD fisik), SLOAD Warm berbiaya 100 gas (sudah ada di cache RAM).
- Melindungi validator dari serangan manipulasi disk I/O.

**Naskah Tutur (Voiceover Script):**
Tahukah Anda bahwa pada tahun 2016, jaringan Ethereum hampir lumpuh total akibat serangan denial-of-service yang memanfaatkan disk hard drive?
Penyerang membuat jutaan panggilan membaca akun kosong dengan biaya hanya 20 hingga 40 gas per panggilan.
Bagi penyerang biayanya sangat murah, tetapi bagi komputer validator, setiap panggilan memaksa hard disk SSD membaca lokasi acak hingga sistem operasi macet kehabisan kecepatan I/O.
Untuk melindungi jaringan secara permanen dari kerentanan ini, arsitek Ethereum merilis EIP-2929.
EIP-2929 memperkenalkan konsep akses Cold dan Warm.
Ketika transaksi pertama kali menyentuh sebuah akun atau slot storage dingin dari hard disk, tarif gasnya dinaikkan drastis menjadi 2.100 hingga 2.600 gas.
Namun begitu data tersebut sudah berhasil ditarik ke dalam memori RAM komputer, pemanggilan berikutnya di transaksi yang sama dikategorikan sebagai Warm dan hanya dikenai tarif murah 100 gas.
Ini memastikan tarif gas selalu selaras dengan beban fisik perangkat keras yang sesungguhnya.

---

## Slide 10: Storage Cleansing Incentives: EIP-3529 & The Fall of Gas Tokens

### Konten Slide
Storage Cleansing Incentives: EIP-3529 & The Fall of Gas Tokens

The Original Incentive Design:
To prevent global state bloat, Ethereum initially rewarded developers with massive gas refunds (up to 15,000 gas) whenever they zeroed out storage slots via SSTORE(0) or destroyed contracts via SELFDESTRUCT.

The Unintended Perversion: Gas Tokens (CHI, GST2):
- Arbitrageurs mined empty storage slots when gas was cheap (10 Gwei) and cleared them during congestion spikes (300 Gwei).
- Result: Exacerbated block congestion instead of cleaning state, consuming up to 30% of gas during peak hours.

The EIP-3529 Fix (London Hard Fork):
- Slashed maximum gas refunds from 50% down to a strict 20% cap of total transaction gas.
- Completely eliminated refunds for contract self-destruction (SELFDESTRUCT).
- Neutralized gas hoarding exploits while maintaining baseline protocol hygiene.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Niat awal protokol: Memberikan insentif pengembalian gas (refund) bagi pengembang yang membersihkan storage atau mematikan kontrak.
- Efek samping berbahaya: Kelahiran token gas spekulatif (GasToken GST2, CHI) yang justru memperparah kemacetan blok demi arbitrase biaya.
- Solusi EIP-3529: Memangkas refund maksimal menjadi 20% dan menghapus total refund SELFDESTRUCT.

**Naskah Tutur (Voiceover Script):**
Pelajaran berharga lainnya dari perancangan ekonomi gas adalah kisah tentang token gas spekulatif.
Awalnya, pencipta Ethereum ingin agar pengembang rajin membersihkan basis data blockchain yang menumpuk.
Protokol memberikan hadiah berupa pengembalian atau refund gas hingga 15.000 gas jika pengembang menghapus data storage yang sudah tidak terpakai.
Namun para pelaku pasar menemukan celah arbitrase yang cerdas.
Mereka menciptakan kontrak pintar seperti GasToken yang sengaja mengisi ribuan data sampah saat jaringan sepi dan biaya gas murah, lalu menghapus data sampah tersebut saat jaringan macet demi mencairkan refund gas sebagai keuntungan finansial.
Akibatnya, bukannya membersihkan storage, trik ini justru menghabiskan tiga puluh persen ruang blok saat jaringan sedang padat.
Untuk menutup celah ini, EIP-3529 memangkas batas maksimal refund menjadi hanya dua puluh persen dan menghapus insentif refund dari destruksi kontrak.
Ini membuktikan bahwa desain insentif ekonomi blockchain harus terus disempurnakan berdasarkan perilaku para pelaku pasar di dunia nyata.

---

## Slide 11: Bridge to the Next Module: Wallets and Account Abstraction

### Konten Slide
The Limits of Native Gas & The Next Frontier

The Inherent Friction of EOAs:
- Strict single-point-of-failure reliance on 12-word paper seed phrases.
- Catastrophic asset loss with zero recovery options.
- Users must hold native ETH merely to transfer other assets like USDC.

Smart Contract Wallets (ERC-4337):
- Unlocking programmatic capabilities via Account Abstraction.
- Sponsored gas transactions (Paymasters).
- Biometric signing (FaceID via Secure Enclave).
- Social recovery mechanisms.

Next Module:
Module 04.4: Wallets and Account Abstraction (ERC-4337 Architecture and Operational Flow).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Slide transisi penutup modul 04.3 menuju modul 04.4: Wallets and Account Abstraction.
- Mengulas friksi akun konvensional EOA: Wajib punya ETH hanya untuk bayar gas transfer token dan risiko fatal seed phrase hilang.
- Teaser materi modul 04.4: Revolusi ERC-4337, Paymaster sponsor gas, verifikasi FaceID, dan mekanisme social recovery.

**Naskah Tutur (Voiceover Script):**
Kita telah menguasai seluruh pilar ekonomi gas yang menggerakkan eksekusi Ethereum, mulai dari batas intrinsik hingga revolusi burning EIP-1559.
Namun ada satu kelemahan besar yang masih menyiksa jutaan pengguna baru hingga hari ini.
Pada akun konvensional atau EOA, pengguna diwajibkan memiliki saldo Ether asli hanya untuk membayar biaya gas.
Bayangkan seorang pengguna memiliki seribu dolar dalam token USDC, namun tidak bisa mengirimkannya sama sekali hanya karena tidak memiliki saldo receh lima puluh sen dalam koin Ether.
Ditambah lagi risiko fatal hilangnya dua belas kata seed phrase kertas tanpa ada opsi pemulihan apa pun.
Bagaimana kita bisa menghapus friksi primitif ini?
Bagaimana jika dompet pengguna itu sendiri adalah sebuah smart contract yang dapat diprogram?
Di modul berikutnya, kita akan membedah terobosan arsitektur dompet modern: Wallets and Account Abstraction melalui standar ERC-4337.
Sampai jumpa di modul selanjutnya.
