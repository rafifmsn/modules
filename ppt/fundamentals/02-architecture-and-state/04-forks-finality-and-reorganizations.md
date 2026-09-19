# Forks, Finality, and Reorganizations
Modul Presentasi: Fondasi Distributed Trust (02.4)

---

## Slide 1: Forks, Finality, and Reorganizations

### Konten Slide
Forks, Finality, and Reorganizations
Architecture and State (02.4)
In a network without a central clock or master server, chain fractures are inevitable.
This module dissects why forks occur, how the network auto-recovers from divergence, and when a transaction achieves permanent finality.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Membuka modul penutup dari Bab 2: Architecture and State.
- Menjelaskan bahwa di jaringan tanpa server sentral, percabangan rantai adalah kepastian fisik, bukan kesalahan sistem.
- Menyoroti tiga topik utama: penyebab percabangan (fork), mekanisme pemulihan otomatis (reorg), dan pencapaian finalitas mutlak.

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul keempat sekaligus modul penutup dari bab Architecture and State: Forks, Finality, and Reorganizations.
Di dalam jaringan komputer yang tidak memiliki jam sentral maupun server pengendali lalu lintas, perpecahan garis waktu rantai bukanlah sebuah anomali atau kesalahan kode program.
Percabangan adalah konsekuensi alami dari hukum fisika transmisi data di planet bumi.
Hari ini kita akan membedah secara mendalam mengapa percabangan rantai bisa terjadi, bagaimana algoritma konsensus secara otomatis memulihkan perpecahan status melalui mekanisme reorganisasi blok, serta kapan sebuah transaksi dapat dianggap mencapai finalitas permanen yang mustahil untuk dibatalkan.

---

## Slide 2: The Two Faces of "Fork"

### Konten Slide
The Two Faces of "Fork"

1. Consensus Rule Upgrades
- Intentional or debated modifications to client software validation rules.
- Driven by developer consensus, community governance, and human coordination.
- Categorized strictly into Soft Forks (backward compatible) and Hard Forks (non-backward compatible).

2. Transient State Divergences
- Accidental chain splits caused by data propagation delays in the peer-to-peer network.
- Driven by physical limits (latency and the speed of light).
- Results in Block Reorganizations (Reorgs) and orphaned blocks.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Istilah "Fork" memiliki dua makna yang sangat berbeda di dunia blockchain.
- 1. Pembaruan aturan konsensus: perubahan kode sengaja yang dikoordinasikan manusia (Soft Fork & Hard Fork).
- 2. Divergensi status transien: percabangan blok tidak sengaja akibat keterlambatan propagasi latensi fisik.

**Naskah Tutur (Voiceover Script):**
Ketika mendengar kata *Fork*, komunitas sering kali mencampuradukkan dua konsep rekayasa yang sangat bertolak belakang.
Wajah pertama dari Fork adalah pembaruan aturan konsensus.
Ini adalah modifikasi sengaja terhadap aturan validasi perangkat lunak klien yang dipicu oleh koordinasi sosial dan tata kelola pengembang.
Pembaruan ini diklasifikasikan secara tegas menjadi *Soft Fork* yang kompatibel ke belakang dan *Hard Fork* yang tidak kompatibel ke belakang.
Wajah kedua dari Fork adalah divergensi status sementara atau *transient state divergence*.
Ini adalah percabangan rantai yang terjadi secara tidak sengaja karena keterlambatan transmisi data di jaringan peer-to-peer.
Percabangan ini murni disebabkan oleh batasan hukum fisika kecepatan cahaya, dan diselesaikan secara otomatis oleh protokol melalui proses *Block Reorganization* dan pembuangan *orphan blocks*.

---

## Slide 3: Consensus Rule Upgrades: Soft Forks vs. Hard Forks

### Konten Slide
Consensus Rule Upgrades

1. Soft Forks (Backward Compatible)
- Set Logic: Valid_new is a subset of Valid_old.
- Rules are restricted to a stricter subset.
- Old nodes view new blocks as valid and continue following the chain without mandatory software updates.
- Historical Examples: BIP-66 (2015), SegWit (2017), Taproot (2021).

2. Hard Forks (Non-Backward Compatible)
- Set Logic: Valid_new is NOT a subset of Valid_old.
- Rules are expanded or fundamentally altered.
- Old nodes reject new blocks entirely as invalid; failure to upgrade permanently splits the network into two distinct blockchains.
- Historical Examples: 2013 Bitcoin DB Bug, The DAO Fork (2016), Ethereum The Merge (2022).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Logika himpunan himpunan matematika: Soft Fork mempersempit aturan (subset), Hard Fork memperluas atau mengubah aturan.
- Soft Fork kompatibel ke belakang: simpul lama tetap menganggap blok baru sah tanpa wajib update perangkat lunak (contoh: SegWit, Taproot).
- Hard Fork tidak kompatibel ke belakang: simpul lama menolak blok baru sehingga rantai terbelah permanen jika tidak semua sepakat (contoh: The DAO fork).

**Naskah Tutur (Voiceover Script):**
Secara matematika himpunan, perbedaan antara Soft Fork dan Hard Fork sangatlah tegas.
Pada Soft Fork, aturan validasi baru diperketat sehingga himpunan blok valid baru adalah *subset* atau bagian kecil dari himpunan blok valid lama.
Karena aturan baru lebih ketat, komputer validator lama yang belum memperbarui perangkat lunak mereka tetap akan memandang blok-blok baru sebagai data yang sah.
Jaringan dapat terus berjalan harmonis tanpa memaksa seluruh pengguna di dunia memperbarui kode mereka pada hari yang sama, seperti yang terjadi pada pembaruan SegWit dan Taproot di Bitcoin.
Sebaliknya, pada Hard Fork, aturan validasi diperluas atau diubah secara fundamental sehingga blok baru bukanlah bagian dari aturan lama.
Simpul validator lama yang menjalankan aturan terdahulu akan langsung menolak blok baru sebagai data ilegal.
Jika ada sebagian komunitas yang menolak memperbarui perangkat lunak mereka, jaringan akan terbelah secara permanen menjadi dua mata uang kripto yang berdiri sendiri, seperti perpecahan bersejarah antara Ethereum dan Ethereum Classic pasca peretasan The DAO pada tahun 2016.

---

## Slide 4: The Physics of Latency

### Konten Slide
The Physics of Latency

Simultaneous Discovery:
Miner A (Iceland) and Miner B (Singapore) discover a valid block at height N on the exact same millisecond.

Propagation Delay:
It takes 100 to 200 milliseconds for light signals to traverse intercontinental submarine fiber optic cables.
European nodes receive Block N_A first.
Asian nodes receive Block N_B first.

Result:
The global network briefly fractures into two equally valid historical realities.
Nodes on both continents believe their local chain is the legitimate canonical truth.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Hukum fisika latensi serat optik: penambang di Islandia dan Singapura menemukan blok pada milidetik yang sama.
- Jeda propagasi 100-200 milidetik melintasi kabel bawah laut antar-benua.
- Jaringan global terbelah sesaat menjadi dua realitas sejarah yang sama-sama valid secara matematis.

**Naskah Tutur (Voiceover Script):**
Sekarang mari kita telusuri jenis percabangan kedua yang lahir dari hukum fisika: jeda latensi jaringan.
Bayangkan dua penambang besar, Penambang A di Islandia dan Penambang B di Singapura, berhasil memecahkan teka-teki hash Proof of Work pada ketinggian blok N di milidetik yang sama persis.
Kedua penambang langsung menyiarkan blok sah mereka ke jaringan internet.
Namun, sinyal foton cahaya yang melintasi kabel serat optik di dasar samudra membutuhkan jeda waktu fisik sekitar seratus hingga dua ratus milidetik.
Simpul-simpul di benua Eropa akan menerima blok dari Islandia terlebih dahulu dan menguncinya di memori lokal mereka.
Sementara itu, simpul-simpul di benua Asia menerima blok dari Singapura terlebih dahulu dan menguncinya di memori lokal mereka.
Dalam sekejap, seluruh jaringan internet dunia terbelah menjadi dua kenyataan sejarah yang sama-sama sah.
Kedua belahan dunia sama-sama yakin bahwa cabang rantai merekalah kebenaran kanonikal yang sah.

---

## Slide 5: Anatomy of a Reorg

### Konten Slide
Anatomy of a Reorg
A Poisson Process breaks the tie. Mining is purely random, making simultaneous discovery of block N+1 nearly impossible.

Resolution Pipeline:
1. Tie-Breaker:
   Miner C discovers Block N+1 built atop N_A (Iceland branch) and broadcasts it globally.
2. Evaluation:
   Asian nodes receive the new chain. The [N_A -> N+1] branch has two blocks of accumulated Proof of Work, while their local [N_B] branch has only one.
3. Execution (Reorg):
   Nodes strictly obey consensus rules. They rollback state mutations from N_B and apply the state transitions from N_A and N+1.
4. Orphaning:
   Block N_B becomes an Orphaned Block. Its unique valid transactions return safely to the mempool.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Proses acak Poisson memecahkan kebuntuan: peluang penemuan blok N+1 secara simultan mendekati nol.
- Penambang C menemukan blok N+1 di atas cabang N_A.
- Evaluasi kumulatif: cabang N_A memiliki akumulasi Proof of Work lebih berat dibanding cabang N_B.
- Eksekusi Reorg: simpul membatalkan (rollback) mutasi N_B dan menerapkan status N_A serta N+1. Blok N_B menjadi orphan.

**Naskah Tutur (Voiceover Script):**
Bagaimana sistem memulihkan perpecahan status ini secara otomatis tanpa bantuan penengah manusia?
Proses acak Poisson pada penambangan Proof of Work menjadi penentu kemenangan.
Karena penemuan hash bersifat acak murni, probabilitas terjadinya penemuan ganda untuk kedua kalinya pada blok N plus satu secara simultan mendekati nol.
Ketika Penambang C di belahan dunia lain berhasil menemukan blok N plus satu yang dibangun di atas cabang Islandia, blok tersebut disiarkan ke seluruh dunia.
Simpul-simpul di Asia kini melihat dua pilihan cabang di hadapan mereka.
Cabang lokal mereka hanya memiliki satu blok bukti kerja, sedangkan cabang baru memiliki dua blok bukti kerja akumulatif.
Tunduk pada aturan konsensus, simpul-simpul Asia secara otomatis melakukan *Block Reorganization*.
Mereka membatalkan atau me-rollback seluruh mutasi transaksi dari blok Singapura N_B, lalu mengeksekusi mutasi status baru dari blok N_A dan N plus satu.
Blok N_B resmi dibuang menjadi *Orphaned Block*, dan transaksi-transaksi unik di dalamnya dikembalikan dengan aman ke dalam antrean mempool.

---

## Slide 6: The Reorg Double-Spend

### Konten Slide
The Reorg Double-Spend: Mallory's 1-Confirmation Attack

Attack Execution:
- Step 1: Mallory deposits 1,000 coins into an exchange within public Block N_B.
- Step 2: The exchange carelessly assumes 1 block confirmation is final and allows Mallory to withdraw fiat cash.
- Step 3: Secretly, Mallory mines a private chain [N_A -> N+1] routing those exact 1,000 coins to his own private wallet.
- Step 4: Mallory broadcasts his heavier private chain. The network executes a Reorg.
- Step 5: Block N_B is orphaned. The exchange deposit record is erased from official history. The exchange permanently loses 1,000 coins.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Skenario eksploitasi serangan double-spend memanfaatkan Reorg pada bursa kripto ceroboh.
- Bursa menganggap 1 konfirmasi blok sudah final dan mencairkan uang tunai.
- Penyerang menambang rantai privat lebih panjang secara diam-diam dan menyiarkannya belakangan.
- Rantai publik dibatalkan oleh Reorg, catatan deposit terhapus, dan bursa menderita kerugian finansial permanen.

**Naskah Tutur (Voiceover Script):**
Reorganisasi blok alami adalah proses teknis yang tidak berbahaya, namun jika sebuah aplikasi komersial tidak memahami sifat reorg, celah ini dapat dieksploitasi untuk mencuri dana.
Mari kita pelajari skenario serangan *1-Confirmation Double-Spend Attack*.
Seorang penyerang bernama Mallory mengirim deposit seribu koin ke sebuah bursa kripto di dalam blok publik N_B.
Pihak bursa secara ceroboh mengasumsikan bahwa satu konfirmasi blok sudah aman dan langsung mengizinkan Mallory mencairkan uang tunai ke rekening bank fisiknya.
Secara diam-diam di saat yang sama, Mallory menggunakan mesin tambangnya untuk menambang cabang rantai privat yang mengalihkan seribu koin tadi kembali ke dompet rahasianya sendiri.
Begitu uang tunai berhasil ditarik dari bursa, Mallory menyiarkan cabang privatnya yang memiliki dua blok bukti kerja ke internet.
Seluruh simpul di dunia secara otomatis tunduk pada rantai Mallory yang lebih berat dan mengeksekusi reorganisasi blok.
Blok N_B seketika terlempar menjadi orphan.
Catatan deposit seribu koin di bursa terhapus selamanya dari riwayat sejarah resmi, dan bursa kehilangan uang tunai tanpa bisa menuntut siapa pun.

---

## Slide 7: The Fork-Choice Rule

### Konten Slide
The Fork-Choice Rule

The Heaviest-Chain Rule:
Canonical Chain = argmax(chain) Sum(Difficulty(B_i))
Popularly called the "longest-chain rule", but nodes actually calculate total accumulated Proof of Work difficulty.

Preventing Exploits:
If nodes measured raw block height, an attacker could instantly forge millions of fake blocks at zero difficulty on a private laptop.

Thermodynamic Anchor:
By summing difficulty, nodes guarantee the canonical chain represents the greatest sacrifice of real-world thermodynamic energy.
The heavier the accumulated difficulty, the more irreversible the history becomes.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Aturan pemilihan cabang (Fork-Choice Rule): Rantai terakumulasi terberat (Heaviest-Chain).
- Sering disebut "longest-chain", namun secara teknis simpul menjumlahkan tingkat kesulitan metrik Proof of Work.
- Jika hanya menghitung panjang blok, peretas bisa mencetak jutaan blok palsu dengan kesulitan nol di laptop.
- Menautkan status kanonikal langsung ke hukum termodinamika pengorbanan energi fisik bumi.

**Naskah Tutur (Voiceover Script):**
Aturan matematika yang melindungi jaringan dari penipuan rantai palsu disebut sebagai *Fork-Choice Rule*.
Meskipun masyarakat awam sering menyebutnya sebagai aturan rantai terpanjang atau *longest-chain rule*, secara teknis istilah ini keliru.
Simpul blockchain tidak menghitung jumlah nominal ketinggian blok.
Simpul menghitung *Heaviest-Chain*: cabang rantai yang memiliki total akumulasi tingkat kesulitan Proof of Work paling berat.
Mengapa hal ini sangat penting?
Karena jika simpul hanya mengukur panjang blok, seorang penyerang di kamar tidurnya dapat menyetel tingkat kesulitan ke angka nol dan mencetak satu juta blok palsu di laptopnya hanya dalam waktu beberapa detik.
Dengan menghitung akumulasi kesulitan matematika, protokol memastikan bahwa cabang rantai kanonikal adalah cabang yang mewakili pengorbanan energi listrik dan komputasi termodinamika terbesar di dunia nyata.
Semakin dalam sebuah blok tertimbun di bawah akumulasi kesulitan tersebut, semakin mustahil bagi siapa pun untuk membatalkannya.

---

## Slide 8: Fork-Choice Evolution: GHOST to LMD-GHOST

### Konten Slide
Fork-Choice Evolution

1. GHOST Protocol (Ethereum Era PoW)
- Problem: Ethereum's fast 12-second block times caused orphaned block rates to spike to 10%, favoring central mining pools.
- Solution: Greedy Heaviest Observed Sub-Tree (GHOST).
- Mechanism: Integrates orphans as ommer/uncle blocks. They contribute security weight to the canonical chain and yield partial miner subsidies (75%-87.5%).

2. LMD-GHOST (Ethereum Era PoS / Gasper)
- Paradigm Shift: Consensus shifted from thermodynamic hashing power to cryptographic stake attestations.
- Mechanism: Latest Message Driven (LMD) calculates only the most recent attestation vote from active validators.
- Fork Choice: Nodes choose the child block accumulating the greatest total volume of deposited validator stake (Gasper protocol).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Evolusi aturan fork-choice dari GHOST ke LMD-GHOST.
- GHOST (Era PoW Ethereum): Interval blok cepat 12 detik memicu tingkat orphan tinggi (10 persen); ommer/uncle blocks dirangkul untuk menambah bobot keamanan rantai.
- LMD-GHOST (Era PoS Ethereum): Konsensus beralih ke pembuktian modal (stake attestation); simpul memilih blok dengan akumulasi saldo modal validator terbesar.

**Naskah Tutur (Voiceover Script):**
Seiring bertambahnya tuntutan kecepatan transaksi, algoritma fork-choice terus berevolusi.
Ketika Ethereum dirancang dengan interval blok super cepat dua belas detik di era Proof of Work, tingkat blok orphan melonjak drastis hingga sepuluh persen.
Penambang kecil di wilayah terpencil menderita kerugian besar karena blok mereka sering terlambat tiba di jaringan.
Untuk mengatasi krisis ini, Ethereum mengadopsi protokol GHOST atau *Greedy Heaviest Observed Sub-Tree*.
Protokol GHOST merangkul blok-blok yang terlambat sebagai *ommer* atau *uncle blocks*.
Blok paman ini tetap diperhitungkan untuk memperkuat bobot keamanan rantai utama dan penambangnya tetap menerima subsidi imbalan ekonomi parsial.
Di era Proof of Stake modern saat ini, algoritma ini disempurnakan menjadi LMD-GHOST di dalam arsitektur konsensus Gasper.
Bobot konsensus tidak lagi diukur dari daya listrik penambang, melainkan dari volume modal aset ether yang dipertaruhkan oleh para validator.
Algoritma *Latest Message Driven* hanya menghitung suara pemungutan suara terbaru dari setiap validator aktif, memilih cabang blok yang didukung oleh akumulasi modal ekonomi terbesar di dunia.

---

## Slide 9: Probabilistic Finality (PoW) & The 6-Confirmation Standard

### Konten Slide
Probabilistic Finality (PoW)

Mathematical Foundations:
In Nakamoto Consensus, finality is never mathematically absolute; it is probabilistic.
Formula: P ~ Sum ( (lambda^k * e^(-lambda) / k!) * (q / p)^max(z - k, 0) )

The 6-Confirmation Standard:
- After 6 blocks (~1 hour in Bitcoin), the probability of a 10% hash-rate attacker reversing a transaction drops below 0.1%.
- Against a 30% attacker, the risk shrinks below 1.3%.
- The theoretical risk of a Reorg remains eternally non-zero under a coordinated 51% hashrate attack.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pada Nakamoto Consensus, finalitas transaksi tidak pernah absolut seratus persen, melainkan bersifat probabilistik.
- Rumus Poisson Whitepaper Bitcoin: probabilitas pembalikan transaksi menyusut secara eksponensial seiring bertambahnya kedalaman konfirmasi blok (z).
- Standar 6 konfirmasi (1 jam) menurunkan risiko pembalikan di bawah 0,1 persen untuk penyerang berdaya 10 persen.
- Risiko teoritis reorg tetap ada jika penyerang menguasai lebih dari 51 persen hashrate.

**Naskah Tutur (Voiceover Script):**
Pemahaman tentang reorganisasi blok membawa kita pada sebuah kesimpulan penting: di dalam Nakamoto Consensus, finalitas transaksi tidak pernah bersifat absolut seratus persen.
Finalitas transaksi pada Bitcoin bersifat probabilistik.
Di bab sebelas Whitepaper Bitcoin, Satoshi menurunkan rumus probabilitas acak Poisson untuk menghitung peluang penyerang membalik transaksi masa lalu.
Hasilnya membuktikan bahwa probabilitas keberhasilan penyerang menyusut secara eksponensial seiring bertumpuknya blok baru di atas transaksi Anda.
Inilah alasan mengapa industri menetapkan standar *enam konfirmasi blok* atau sekitar satu jam waktu tunggu pada Bitcoin.
Setelah enam blok berlalu, probabilitas penyerang bermodal sepuluh persen hashrate dunia untuk membalik transaksi turun hingga di bawah 0,1 persen.
Meskipun demikian, secara hukum matematika murni, peluang terjadinya reorganisasi tidak pernah benar-benar menyentuh angka nol mutlak jika ada kartel penambang yang sanggup menguasai lebih dari lima puluh satu persen daya komputasi bumi.

---

## Slide 10: Deterministic Finality (PoS) & Economic Anti-Reorg Guarantee

### Konten Slide
Deterministic Finality (PoS)

The Epoch Pipeline (Casper FFG):
1. Justification: Achieved when > 66.7% (supermajority two-thirds) of total validator stake cryptographically signs an epoch checkpoint.
2. Finalization: When the subsequent checkpoint is justified, the preceding checkpoint officially achieves Finalized status.

The Economic Anti-Reorg Guarantee:
Once finalized, full nodes will never reorganize that block under any network condition.
To mathematically force two conflicting finalized checkpoints, > 33.3% of global validators must cryptographically vote twice (equivocation).
The protocol will automatically detect the fraud, instantly seizing and burning billions of dollars in attacker stake (Slashing).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Finalitas deterministik pada konsensus Proof of Stake (Casper FFG).
- Alur dua tahap: Justifikasi (kuorum 2/3 modal validator) dan Finalisasi (penguncian absolut setelah epoch berikutnya).
- Garansi Anti-Reorg Ekonomi: Simpul penuh menolak reorg pada blok yang sudah final.
- Penyerang yang mencoba membelah rantai harus mempertaruhkan lebih dari sepertiga total stake dunia yang akan langsung dimusnahkan oleh aturan Slashing.

**Naskah Tutur (Voiceover Script):**
Untuk melenyapkan ketidakpastian probabilistik tersebut, protokol Proof of Stake modern seperti Ethereum memperkenalkan *Deterministic Finality* melalui mekanisme Casper FFG.
Casper memproses transaksi melalui alur kerja berjenjang yang disebut *Epoch*.
Sebuah blok pos pemeriksaan pertama-tama mencapai status *Justified* jika berhasil ditandatangani oleh lebih dari dua pertiga kuorum modal validator dunia.
Ketika pos pemeriksaan pada epoch berikutnya berhasil dijustifikasi, pos pemeriksaan sebelumnya resmi mengkristal menjadi status *Finalized*.
Begitu sebuah blok mencapai status Finalized, simpul di seluruh dunia diprogram untuk menolak segala bentuk reorganisasi blok dalam kondisi apa pun.
Secara hukum matematika, untuk memaksakan dua pos pemeriksaan yang saling bertentangan agar disahkan bersamaan, penyerang wajib menguasai lebih dari sepertiga total modal ether di seluruh dunia dan menandatangani dua suara palsu secara serentak.
Protokol konsensus akan mendeteksi kecurangan tersebut seketika dan secara otomatis menyita serta memusnahkan seluruh miliaran dolar modal penyerang melalui aturan hukuman *Slashing*.

---

## Slide 11: Bridge to the Next Chapter: Consensus and Game Theory

### Konten Slide
The Horizon of Distributed Agreement

The Completed Foundation:
We have mapped the physics of blocks, the lifecycle of transactions, the dichotomy of UTXO vs. Account state, and the boundaries of forks and finality.

The Lingering Paradox:
Why do anonymous, rational, and financially self-interested participants cooperate to uphold this truth instead of sabotaging it?
How does game theory enforce honesty in an environment rife with adversarial actors?

Next Chapter:
Chapter 3: Consensus and Game Theory (Module 03.1: The Byzantine Generals Problem).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Menutup Bab 2 (Architecture and State) dan mengantarkan peserta ke Bab 3 (Consensus and Game Theory).
- Refleksi perjalanan kurikulum: Wadah blok, siklus hidup transaksi, model buku besar, dan batas finalitas telah tuntas dipelajari.
- Teaser Bab 3: Mengapa partisipan anonim yang rasional dan mengejar untung memilih bersikap jujur?
- Teaser Modul 03.1: The Byzantine Generals Problem dan batas matematis 3f + 1.

**Naskah Tutur (Voiceover Script):**
Dengan tuntasnya modul ini, seluruh arsitektur dasar dari Bab Architecture and State telah selesai kita bangun secara kokoh.
Kita telah membedah struktur internal wadah blok, menelusuri siklus hidup transaksi dari dompet hingga eksekusi mesin virtual, membandingkan kekuatan dan kelemahan model buku besar UTXO melawan sistem akun, serta memahami batas-batas fisik reorganisasi dan finalitas konsensus.
Namun, seluruh bangunan rekayasa ini menyisakan satu paradoks terbesar dalam ilmu komputasi: mengapa ribuan individu anonim di seluruh dunia, yang tidak saling kenal dan memiliki motif finansial untuk mengejar keuntungan pribadi, bersedia bekerja sama mematuhi aturan protokol alih-alih berkolusi untuk merusaknya?
Bagaimana hukum matematika dan teori permainan game theory menyelaraskan insentif keegoisan manusia agar bermuara pada kejujuran sistemik?
Di bab berikutnya, kita akan menyelami jantung terdalam dari keamanan blockchain dalam Chapter 3: Consensus and Game Theory, yang akan diawali dengan The Byzantine Generals Problem.
Terima kasih atas partisipasi Anda di bab kedua ini, dan sampai jumpa di bab selanjutnya.
