# Automated Market Makers and Liquidity Pools
Modul Presentasi: Decentralized Systems (05.2)

---

## Slide 1: Automated Market Makers & Liquidity Pools

### Konten Slide
Automated Market Makers & Liquidity Pools
Math, Invariants, and Architecture (Module 05.2)

The Algorithmic Revolution:
Eliminating traditional market intermediaries and centralized order books in favor of autonomous, deterministic smart contract liquidity reserves.
How constant product invariants, hyperbolic pricing curves, and concentrated tick math power 24/7 decentralized financial markets.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul 05.2: Automated Market Makers and Liquidity Pools.
- Menjelaskan revolusi penggantian order book tradisional dengan cadangan likuiditas smart contract.
- Mengulas sekilas matematika di balik kurva invarian produk konstan dan likuiditas terkonsentrasi.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul kedua Chapter 05: Automated Market Makers and Liquidity Pools.
Di modul sebelumnya, kita telah memahami bagaimana standar token mengubah kode menjadi aset bernilai.
Namun, memiliki aset saja tidak cukup jika tidak ada mekanisme pasar yang efisien untuk memperdagangkannya.
Hari ini, kita akan membedah inovasi paling fundamental dalam lanskap keuangan terdesentralisasi: Automated Market Maker atau AMM.
Kita akan meneliti bagaimana sebuah persamaan matematika sederhana mampu menggantikan seluruh infrastruktur bursa saham Wall Street.
Kita juga akan membedah formula swap, risiko impermanent loss, hingga arsitektur likuiditas terkonsentrasi modern.

---

## Slide 2: The L1 Bottleneck: CLOB Failure

### Konten Slide
The L1 Bottleneck: CLOB Failure

Central Limit Order Books (CLOB) in Traditional Finance:
- Relies on continuous order submissions: Bids and asks placed across multiple price tiers by high-frequency market makers.
- High cancellation volume: Professional market makers cancel and replace over 90% of their quotes within milliseconds to avoid stale fills.

Why CLOB Collapses on Layer 1 Blockchains:
- State Bloat & Compute Costs: Every order placement, cancelation, and modification requires an on-chain transaction consuming gas fees.
- Block Latency Exposure: With block times of 12 seconds, quotes sit unprotected in the public mempool, exposing market makers to predatory front-running and toxic arbitrage.
- Illiquidity Spiral: Because quoting is economically punitive on-chain, spreads widen, liquidity dries up, and trading halts.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Jelaskan mengapa model Central Limit Order Book gagal total di blockchain Layer 1.
- Market maker di bursa tradisional membatalkan lebih dari 90 persen kuotasi harga dalam hitungan milidetik.
- Di blockchain, setiap pembatalan order memakan gas dan latensi blok memicu risiko arbitrase predator.

**Naskah Tutur (Voiceover Script):**
Di bursa keuangan konvensional seperti Nasdaq atau Bursa Efek Indonesia, perdagangan digerakkan oleh sistem Central Limit Order Book atau buku pesanan terpusat.
Dalam model ini, para market maker profesional secara aktif memasang ribuan pesanan beli dan jual.
Mereka membatalkan dan memperbarui lebih dari sembilan puluh persen kuotasi tersebut setiap detik untuk merespons pergerakan pasar.
Ketika model ini dicoba langsung di atas blockchain Layer 1 seperti Ethereum, sistem langsung runtuh karena dua kendala fisik: biaya gas dan latensi waktu blok.
Setiap pesanan atau pembatalan membutuhkan transaksi on-chain yang mahal.
Ditambah lagi, pesanan yang mengendap selama dua belas detik di mempool publik menjadi mangsa empuk bagi bot pencari keuntungan kilat.
Akibatnya, market maker enggan menyediakan likuiditas, dan pasar menjadi tidak likuid.

---

## Slide 3: Model CLOB (P2P) vs Model AMM (Peer-to-Contract)

### Konten Slide
Model CLOB (P2P) vs Model AMM (Peer-to-Contract)

Central Limit Order Book (Peer-to-Peer Matching):
- Bilateral Dependency: A trade occurs if and only if a buyer and seller agree on the exact same price and volume.
- Asynchronous Liquidity: Trades stall when counterparties are absent or during periods of extreme market volatility.
- Custodial or Centralized Engine: Requires off-chain high-speed matching engines to remain economically viable.

Automated Market Maker (Peer-to-Contract Pooling):
- Autonomous Counterparty: Traders execute directly against an immutable smart contract reserve holding both asset pairs.
- Continuous Guaranteed Execution: Trades settle instantaneously against pool reserves regardless of trading volume or counterparty presence.
- Passive Capital Aggregation: Anyone can deposit paired capital and earn a proportional share of trading fees without active quote management.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bedakan model pencocokan P2P pada CLOB dengan model Peer-to-Contract pada AMM.
- CLOB bergantung pada ketersediaan pihak lawan yang cocok harga dan volumenya.
- AMM mengeksekusi perdagangan secara instan melawan kumpulan likuiditas smart contract tanpa perlu menunggu rekanan.

**Naskah Tutur (Voiceover Script):**
Untuk mengatasi kebuntuan tersebut, DeFi menciptakan paradigma perdagangan baru yang disebut Peer-to-Contract.
Pada model konvensional, transaksi adalah pencocokan bilateral antar sesama pengguna atau Peer-to-Peer.
Transaksi hanya terjadi jika ada pembeli dan penjual yang sepakat pada harga yang sama persis di saat yang bersamaan.
Sebaliknya, pada Automated Market Maker, pengguna tidak berdagang dengan orang lain, melainkan berinteraksi langsung dengan smart contract.
Smart contract ini menyimpan cadangan sepasang aset di dalam kumpulan likuiditasnya.
Kapan pun seorang trader ingin menukar token, kontrak pintar akan mengeksekusi perdagangan secara seketika berdasarkan aturan matematis yang sudah terkunci, memberikan kepastian likuiditas selama dua puluh empat jam penuh.

---

## Slide 4: The Mathematical Engine: x * y = k

### Konten Slide
The Mathematical Engine: x * y = k

The Constant Product Market Maker (CPMM):
- Proposed by Vitalik Buterin and implemented by Uniswap: $x \cdot y = k$.
- x: Reserve balance of Token A in the liquidity pool.
- y: Reserve balance of Token B in the liquidity pool.
- k: The invariant constant, representing the total liquidity product of the pool.

The Conservation Law:
- Invariant Rule: In an idealized zero-fee trade, any transaction removing an amount of one asset must deposit a proportional amount of the other such that the product remains constant: $(x + \Delta x)(y - \Delta y) = k$.
- Hyperbolic Price Discovery: The marginal spot price of Token A in terms of Token B is defined as the negative slope of the curve: $P = -rac{dy}{dx} = rac{y}{x}$.
- Infinite Reserve Guarantee: Because the hyperbola is asymptotic to both axes, the pool reserves can never be entirely depleted of either asset.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bedah formula Constant Product Market Maker: x dikali y sama dengan k.
- x dan y adalah cadangan token di dalam pool; k adalah konstanta invarian.
- Kurva hiperbolik menjamin bahwa cadangan token tidak akan pernah habis total karena harga mendekati tak terhingga saat saldo mendekati nol.

**Naskah Tutur (Voiceover Script):**
Jantung matematis dari AMM generasi awal adalah rumus Constant Product Market Maker: x dikali y sama dengan k.
Di sini, x mewakili jumlah cadangan token A, y mewakili cadangan token B, dan k adalah konstanta yang harus selalu dipertahankan.
Ketika seorang pengguna memasukkan sejumlah token x ke dalam cadangan, ia harus mengeluarkan sejumlah token y sedemikian rupa sehingga hasil perkalian keduanya tetap bernilai k.
Harga instan dari suatu aset secara matematis adalah rasio cadangan kedua token, yaitu y dibagi x.
Karena kurva ini berbentuk hiperbola yang asimtotik terhadap sumbu horizontal dan vertikal, harga akan melonjak secara eksponensial jika salah satu token diambil terlalu banyak.
Mekanisme ini secara elegan menjamin bahwa cadangan pool tidak akan pernah bisa dikuras habis sampai nol.

---

## Slide 5: Swap Mechanics & Fee Derivation

### Konten Slide
Swap Mechanics & Fee Derivation

Deriving the Exact Output Equation:
- When a trader deposits $\Delta x$ with a protocol fee $\gamma$ (where $\gamma = 0.003$ for a 0.3% fee):
- Net deposit retained by the invariant: $\Delta x_{net} = \Delta x \cdot (1 - \gamma) = \Delta x \cdot 0.997$.
- Applying the invariant preservation rule: $(x + \Delta x \cdot 0.997)(y - \Delta y) = k = x \cdot y$.
- Solving explicitly for output tokens $\Delta y$: $\Delta y = rac{y \cdot 0.997 \cdot \Delta x}{x + 0.997 \cdot \Delta x} = rac{y \cdot 997 \cdot \Delta x}{1000 \cdot x + 997 \cdot \Delta x}$.

Integer Arithmetic & Anti-Drain Guarantees:
- EVM Precision: All calculations are scaled by 1,000 to eliminate floating-point numbers in bytecode.
- Invariant Growth: Because the 0.3% fee stays inside the pool, the invariant $k$ strictly grows with every trade, directly enriching passive liquidity providers.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Turunkan rumus output token delta y dari persamaan invarian.
- Perhitungkan potongan fee sebesar 0,3 persen (faktor pengali 997 per 1000).
- Komputasi dilakukan dalam bilangan bulat untuk mencegah presisi floating-point di EVM, dan fee membuat nilai k selalu bertumbuh.

**Naskah Tutur (Voiceover Script):**
Mari kita telusuri bagaimana smart contract AMM menghitung secara pasti berapa jumlah token output yang akan diterima trader.
Jika protokol mengenakan biaya sebesar nol koma tiga persen, maka hanya sembilan puluh sembilan koma tujuh persen dari token input yang digunakan untuk memperbarui status invarian k.
Dengan mensubstitusikan input bersih ini ke dalam persamaan produk konstan, kita memperoleh formula output delta y: y dikali sembilan ratus sembilan puluh tujuh delta x, dibagi seribu x ditambah sembilan ratus sembilan puluh tujuh delta x.
Di dalam EVM, seluruh kalkulasi ini dieksekusi menggunakan pembagian bilangan bulat untuk menghindari galat presisi koma pecahan.
Karena biaya perdagangan nol koma tiga persen ditinggalkan di dalam cadangan pool, nilai invarian k akan selalu bertambah besar seiring waktu, memberikan akumulasi imbal hasil bagi penyedia likuiditas.

---

## Slide 6: Market Dynamics: Price Impact vs Slippage

### Konten Slide
Market Dynamics: Price Impact vs Slippage

Price Impact (Deterministic AMM Mechanics):
- Structural Movement: The internal price shift caused solely by the size of the trader's swap relative to the total liquidity depth in the pool.
- Large Orders vs Thin Reserves: A large order pushes the execution point far along the hyperbolic curve, causing an unfavorable marginal execution price.
- Predictability: Can be calculated with mathematical certainty prior to transaction broadcast.

Slippage (Adversarial Mempool Execution):
- Temporal Shift: The difference between the quoted execution price at the time of transaction signing and the actual execution price when the block is mined.
- External Drivers: Network congestion, intervening transactions from other traders, and malicious MEV searchers executing front-running sandwich attacks.
- Protection Parameter: Traders define a slippage tolerance (e.g., minOutputAmount); if price shifts beyond this limit, the transaction reverts atomically.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bedakan dengan tegas antara Price Impact dan Slippage.
- Price Impact bersifat deterministik berdasarkan ukuran pesanan terhadap kedalaman pool.
- Slippage bersifat temporal dan probabilistik akibat pergerakan transaksi lain di mempool sebelum blok ditambang.

**Naskah Tutur (Voiceover Script):**
Dalam mengeksekusi perdagangan di AMM, terdapat dua fenomena pergeseran harga yang sering disalahartikan: Price Impact dan Slippage.
Price Impact adalah pergeseran harga yang bersifat murni matematis dan deterministik.
Jika Anda mengeksekusi pesanan bernilai satu juta dolar pada pool yang hanya memiliki cadangan dua juta dolar, ukuran pesanan Anda sendiri yang mendorong harga naik di sepanjang kurva hiperbola.
Sebaliknya, Slippage adalah perbedaan harga yang terjadi akibat faktor jeda waktu dan kondisi persaingan di mempool.
Saat Anda menekan tombol swap, harga di layar mungkin bernilai seratus, namun saat transaksi Anda ditambang sepuluh detik kemudian, trader lain atau bot MEV mungkin telah mengubah rasio cadangan pool.
Untuk melindungi diri, pengguna wajib menyetel batas toleransi slippage sehingga transaksi akan otomatis batal jika harga akhir meleset terlalu jauh.

---

## Slide 7: LP Architecture: Minting & Burn Protection

### Konten Slide
LP Architecture: Minting & Burn Protection

Liquidity Share Token Mechanics:
- Fungible Pool Shares: When an LP deposits assets into a pool, the contract mints ERC-20 LP tokens tracking their proportional claim on aggregate reserves.
- Initial Deposit Minting: $S_{minted} = \sqrt{x_0 \cdot y_0} - 1000$.
- Subsequent Deposit Minting: $S_{minted} = \min\left(rac{\Delta x}{x} \cdot S_{total}, rac{\Delta y}{y} \cdot S_{total}ight)$.

The First-Depositor Inflation Attack & Burn Defense:
- The Vulnerability: An attacker deposits 1 wei, donates large external tokens to warp the ratio, and manipulates share rounding to steal subsequent deposits.
- The 1000 Wei Permanent Burn: Uniswap V2 permanently burns the initial 1000 wei ($10^{-15}$) of LP shares to address 0x0 (MINIMUM_LIQUIDITY).
- Economic Impossibility: Ensures pool shares cannot be rounded down to zero or artificially monopolized, permanently neutralizing the share inflation exploit.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bagaimana token LP dicetak sebagai bukti kepemilikan proporsional atas cadangan pool.
- Bedah kerentanan First-Depositor Inflation Attack pada pool yang baru diluncurkan.
- Mekanisme pertahanan: Membakar 1.000 wei token LP pertama ke alamat nol untuk mengunci batas minimum likuiditas selamanya.

**Naskah Tutur (Voiceover Script):**
Ketika penyedia likuiditas memasukkan sepasang token ke dalam pool, kontrak pintar akan mencetak token LP berbasis standar ERC-20 sebagai tanda terima kepemilikan proporsional.
Untuk penyetoran pertama kali saat pool baru dibuka, jumlah token LP dihitung dari akar kuadrat hasil kali kedua deposit awal.
Namun di sinilah muncul sebuah celah keamanan terkenal bernama First-Depositor Inflation Attack.
Peretas awal dapat menyetor satu wei, mendonasikan saldo token dalam jumlah besar ke dalam kontrak, lalu memanfaatkan pembulatan pembagian bilangan bulat untuk mencuri dana penyetor berikutnya.
Uniswap V2 mengatasi celah ini secara brilian dengan membakar permanen seribu wei token LP pertama ke alamat nol.
Tindakan ini memastikan nilai saham pool tidak akan pernah bisa dimanipulasi menjadi nol, mengamankan seluruh likuiditas berikutnya.

---

## Slide 8: The Risk Protocol: Impermanent Loss

### Konten Slide
The Risk Protocol: Impermanent Loss

The Divergence Cost:
- Definition: The difference in portfolio value between holding assets in an AMM liquidity pool versus simply holding them passively in a private wallet.
- The Core Mechanism: When market prices shift outside the pool, arbitrageurs immediately trade with the AMM to balance pool ratios with external market rates, extracting capital from the pool.

Mathematical Formulation:
- Let the external price change ratio be $r = rac{P_{new}}{P_{old}}$.
- Relative Portfolio Value: $V_{AMM} = 2 \cdot \sqrt{r} \cdot V_{held_0}$.
- Impermanent Loss Formula: $IL(r) = rac{2 \cdot \sqrt{r}}{1 + r} - 1$.
- Non-Linear Penalty: A 2x price increase ($r=2$) incurs a 5.7% loss; a 5x increase ($r=5$) incurs a 25.5% loss relative to holding.
- Realized Loss: The loss is called impermanent because it disappears if the price ratio returns to $r=1$; it becomes permanent the instant liquidity is withdrawn.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Definisi Impermanent Loss: Kerugian oportunitas penyedia likuiditas dibandingkan hanya memegang aset di dompet.
- Arbitrageur mengekstraksi keuntungan dari pool setiap kali terjadi disparitas harga eksternal.
- Rumus matematika IL: 2 kali akar r dibagi 1 tambah r, dikurangi 1. Kerugian terealisasi saat likuiditas ditarik.

**Naskah Tutur (Voiceover Script):**
Risiko finansial paling krusial yang dihadapi oleh setiap penyedia likuiditas AMM adalah Impermanent Loss atau kerugian tidak permanen.
Impermanent loss adalah selisih nilai antara menyediakan likuiditas di dalam pool dibandingkan jika Anda hanya menyimpan aset tersebut secara pasif di dompet pribadi.
Ketika harga salah satu aset melonjak di pasar eksternal, para arbitrageur akan berbondong-bondong menukar aset yang murah di dalam pool hingga rasionya seimbang dengan harga pasar.
Proses arbitrase ini secara sistematis mengurangi aset yang sedang naik daun dan menambah aset yang nilainya melemah di dalam cadangan pool Anda.
Formula matematis membuktikan bahwa setiap kali rasio harga bergeser menjauhi rasio awal, nilai total pool Anda akan selalu lebih rendah daripada strategi beli dan simpan.
Kerugian ini disebut tidak permanen karena akan pulih jika rasio harga kembali ke titik semula, tetapi menjadi permanen saat Anda menarik likuiditas keluar dari pool.

---

## Slide 9: Curve Stableswap: Bridging The Invariants

### Konten Slide
Curve Stableswap: Bridging The Invariants

The Stablecoin Dilemma:
- Constant Product ($x \cdot y = k$): High slippage and price impact for assets that should trade at parity ($1:1$, e.g., USDC/USDT/DAI).
- Constant Sum ($x + y = C$): Zero slippage, but extremely vulnerable to complete pool drainage if one asset depegs.

The Hybrid Stableswap Invariant:
- Dynamic Amplification: Blends Constant Sum near the $1:1$ parity center with Constant Product at the outer boundaries.
- Stableswap Equation: $A \cdot n^n \sum x_i + D = A \cdot D \cdot n^n + rac{D^{n+1}}{n^n \prod x_i}$.
- Amplification Coefficient ($A$): Controls the width of the flat zero-slippage zone. Higher $A$ produces ultra-deep liquidity near parity while retaining AMM protection against total reserve extinction.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Paradoks perdagangan stablecoin: rumus produk konstan menghasilkan slippage terlalu tinggi, sedangkan rumus penjumlahan konstan rentan terkuras habis jika aset depeg.
- Solusi Curve Finance: Invarian hibrida Stableswap yang menggabungkan Constant Sum dan Constant Product.
- Koefisien amplifikasi A menciptakan zona datar dengan slippage mendekati nol di sekitar rasio 1 banding 1.

**Naskah Tutur (Voiceover Script):**
Ketika memperdagangkan aset yang seharusnya memiliki nilai sepadan seperti pasangan stablecoin USDC, USDT, dan DAI, model produk konstan Uniswap terbukti sangat tidak efisien karena menghasilkan slippage yang tidak perlu.
Di sisi lain, model Constant Sum atau penjumlahan konstan x tambah y sama dengan C menawarkan nol slippage, namun sangat berbahaya karena pool bisa terkuras habis jika salah satu koin mengalami gagal pasak atau depeg.
Curve Finance memecahkan dilema ini dengan merancang invarian Stableswap hibrida.
Persamaan Curve menggabungkan keunggulan Constant Sum di area tengah rasio satu banding satu, dengan perlindungan Constant Product di ujung ekstrem.
Melalui koefisien amplifikasi A, kurva Stableswap menjadi sangat datar di sekitar harga paritas, memungkinkan pertukaran bernilai ratusan juta dolar dengan slippage mendekati nol tanpa mengorbankan keamanan cadangan.

---

## Slide 10: Uniswap V3: Concentrated Liquidity

### Konten Slide
Uniswap V3: Concentrated Liquidity

The Capital Inefficiency of V2:
- Infinite Distribution: In Uniswap V2, liquidity is stretched across the entire price spectrum from zero to infinity ($[0, \infty]$).
- Idle Capital: Over 99% of deposited capital sits idle in reserve tiers that the market price will never reach under normal conditions.

The Concentrated Liquidity Paradigm:
- Bounded Range Allocation: LPs allocate capital exclusively within a discrete price interval $[P_a, P_b]$.
- Discrete Ticks: Prices are divided into discrete logarithmic steps: $P(i) = 1.0001^i$.
- Massive Capital Efficiency: Concentrating capital into narrow ranges achieves up to 4,000x greater fee generation depth with the same deposit capital.
- Non-Fungible Positions (ERC-721): Because every LP selects unique tick boundaries and capital volumes, LP positions can no longer be fungible ERC-20 tokens; they are minted as unique ERC-721 NFTs.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah inefisiensi modal di Uniswap V2: likuiditas tersebar dari nol hingga tak terhingga sehingga 99 persen dana menganggur.
- Uniswap V3 memperkenalkan Concentrated Liquidity: LP memilih rentang harga spesifik berdasarkan tick logaritmik.
- Efisiensi modal melonjak hingga ribuan kali lipat, dan posisi LP berubah dari ERC-20 menjadi NFT ERC-721.

**Naskah Tutur (Voiceover Script):**
Meskipun Uniswap V2 sangat sukses, desainnya memiliki kelemahan struktural berupa inefisiensi modal yang masif.
Di V2, likuiditas Anda ditebar di sepanjang kurva dari nol hingga tak terhingga.
Artinya, lebih dari sembilan puluh sembilan persen modal Anda hanya diam menganggur di level harga yang hampir mustahil tersentuh oleh pasar.
Uniswap V3 merevolusi lanskap ini dengan memperkenalkan Concentrated Liquidity atau likuiditas terkonsentrasi.
Penyedia likuiditas kini dapat memilih rentang harga khusus di mana modal mereka ingin aktif bekerja, menggunakan satuan tick logaritmik.
Dengan memusatkan modal pada rentang harga yang aktif diperdagangkan, efisiensi modal dapat meningkat hingga ribuan kali lipat.
Karena setiap penyedia likuiditas kini memiliki rentang batas harga dan profil risiko yang berbeda-beda, posisi LP tidak lagi berbentuk token ERC-20 seragam, melainkan dicetak sebagai NFT ERC-721 unik.

---

## Slide 11: Bridge to the Next Module: Collateralized Lending

### Konten Slide
Entering the Lending & Solvency Frontier

From Instant Swaps to Time-Preference Capital:
- We have analyzed how Automated Market Makers establish continuous, permissionless price discovery and token exchange without order books.
- Yet, a fully fledged financial ecosystem requires more than spot trading; it requires credit, leverage, and the ability to borrow capital across time.

The Next Paradigm:
- How can anonymous cryptographic addresses borrow millions of dollars without identity verification or credit scores?
- How do algorithmic protocols maintain guaranteed solvency when asset prices crash by 50% in a single hour?

Next Module:
Module 05.3: Collateralized Lending and Solvency (Over-Collateralization, Liquidation Engines, and Systemic Risk).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Slide transisi penutup modul 05.2 menuju modul 05.3: Collateralized Lending and Solvency.
- Menghubungkan pasar spot AMM dengan kebutuhan sistem kredit dan peminjaman dana.
- Teaser materi modul 05.3: Pinjaman anonim, over-collateralization, formula Health Factor, mesin likuidasi otomatis, dan risiko bad debt.

**Naskah Tutur (Voiceover Script):**
Kita telah menuntaskan pembedahan arsitektur Automated Market Maker, mulai dari rumus Constant Product, dinamika slippage, impermanent loss, hingga efisiensi modal Uniswap V3.
Dengan AMM, masalah likuiditas spot terdesentralisasi telah berhasil dipecahkan.
Namun, sistem ekonomi yang matang tidak hanya membutuhkan pertukaran instan, melainkan juga membutuhkan fasilitas kredit dan pembiayaan antarwaktu.
Pertanyaan besarnya adalah: bagaimana jaringan yang sepenuhnya anonim bisa meminjamkan modal tanpa kartu identitas, jaminan fisik, atau skor kredit perbankan?
Dan bagaimana protokol memastikan bahwa uang pemberi pinjaman tidak akan pernah hilang saat pasar mengalami kejatuhan harga ekstrem?
Semua misteri kredit kriptografi ini akan kita kupas tuntas di modul berikutnya: Collateralized Lending and Solvency.
Sampai jumpa di modul selanjutnya.
