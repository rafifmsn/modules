# Rollup Architectures: Optimistic vs. Zero-Knowledge
Modul Presentasi: Scalability and Security (06.3)

---

## Slide 1: Judul Presentasi

### Konten Slide
- **Topik:** Rollup Architectures: Optimistic vs. Zero-Knowledge
- **Track:** Fundamentals of Distributed Trust
- **Fokus Utama:** Membedah dua filosofi pembuktian keabsahan eksekusi off-chain ke Layer 1 melalui Fraud Proofs dan Validity Proofs.
- *Visual:* Ilustrasi kontras antara dua timbangan: timbangan deteksi kecurangan interaktif (Optimistic) vs kalkulasi pembuktian matematis instan (Zero-Knowledge).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Selamat datang di modul ketiga: Optimistic vs ZK Rollups.
- Inti pembahasan: bagaimana L1 memverifikasi kebenaran ribuan transaksi yang dikerjakan di L2.
- Dua pendekatan: Optimistic (percaya dulu tapi ada masa sanggah) vs ZK (harus membuktikan bukti matematika mutlak di muka).

**Naskah Tutur (Voiceover Script):**
Selamat datang di modul ketiga dari bab Scalability and Security.
Di modul sebelumnya, kita sudah sepakat bahwa rollup adalah masa depan skalabilitas blockchain karena mewarisi keamanan Layer 1 secara penuh.
Namun, arsitektur ini menyisakan satu pertanyaan rekayasa yang sangat krusial:
Ketika sebuah komputer sequencer di Layer 2 mengklaim telah mengeksekusi sepuluh ribu transaksi dan menyerahkan komitmen status saldo yang baru ke Layer 1, bagaimana Layer 1 bisa tahu bahwa angka-angka tersebut sah dan tidak dimanipulasi?
Untuk memverifikasi kebenaran transaksi off-chain ini, ekosistem terpecah menjadi dua kubu kriptografi yang sangat berbeda.
Di satu sisi ada Optimistic Rollups yang menggunakan pendekatan praduga tak bersalah berbasis Fraud Proofs.
Di sisi lain ada Zero-Knowledge Rollups yang menggunakan pendekatan nihil kepercayaan berbasis Validity Proofs.
Hari ini kita akan membedah mekanika internal, keunggulan teknis, dan trade-off di antara kedua arsitektur ini.

---

## Slide 2: Teka-teki Verifikasi State Off-Chain

### Konten Slide
- **Tantangan Verifikasi pada Layer 1:**
  - Layer 1 tidak mengeksekusi ulang ribuan transaksi L2 karena hal itu akan melanggar tujuan penskalaan.
  - Sequencer L2 hanya mengirimkan dua komponen ke L1: kumpulan data transaksi mentah (*data batch*) dan komitmen akar status terbaru (*proposed state root* $S_{t+1}$).
- **Ancaman Sequencer Nakal (Mallory):**
  - Apa yang mencegah operator sequencer memasukkan transaksi palsu yang mencetak satu miliar token ke dompet pribadinya?
  - Jika Layer 1 langsung menelan klaim status tersebut begitu saja, seluruh sistem ekonomi akan runtuh.
- **Dua Filosofi Solusi:**
  - *Retrospektif (Optimistic):* Asumsikan benar, berikan insentif ekonomi bagi pihak lain untuk menyanggah jika ada kebohongan.
  - *Preventif (Zero-Knowledge):* Tolak klaim status sampai disertai bukti matematis yang membuktikan bahwa seluruh aturan mesin virtual telah ditaati tanpa cela.
- *Visual:* Sequencer menyetorkan State Root ke smart contract L1 dengan tanda tanya besar mengenai keabsahannya.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Dilema: L1 tidak boleh mengeksekusi ulang seluruh transaksi, tapi tidak boleh percaya buta pada sequencer.
- Mallory si sequencer jahat bisa saja mencoba mencetak uang palsu di L2.
- Dua mazhab: pembuktian retrospektif lewat sanggahan vs pembuktian preventif lewat matematika.

**Naskah Tutur (Voiceover Script):**
Mari kita pahami dulu dilema komputasi yang dihadapi Layer 1.
Tujuan utama kita membuat Layer 2 adalah menghemat komputasi Layer 1.
Artinya, Layer 1 sama sekali tidak boleh mengeksekusi ulang seluruh sepuluh ribu transaksi yang terjadi di Layer 2.
Sequencer hanya menyetor sekumpulan data terkompresi dan mengumumkan satu angka ringkas ke smart contract Layer 1: inilah state root baru hasil transaksi.
Lalu apa yang mencegah sequencer nakal bernama Mallory untuk menyetor angka palsu yang memindahkan seluruh saldo pengguna ke kantong pribadinya?
Jika Layer 1 mempercayai sequencer secara buta, sistem terdesentralisasi kita berubah menjadi bursa terpusat yang berbahaya.
Dari sinilah muncul dua filosofi besar untuk menyelesaikan masalah ini.
Mazhab pertama mengatakan: kita anggap sequencer jujur, tetapi kita beri waktu satu minggu bagi siapa saja untuk memeriksa dan menyanggah kebohongannya.
Mazhab kedua mengatakan: kita tidak percaya pada siapa pun; sequencer wajib menyertakan bukti matematika murni sebelum status baru diterima oleh Layer 1.

---

## Slide 3: Dua Filosofi Verifikasi Kriptografi

### Konten Slide
- **Paradigma Optimistic (Fraud Proofs):**
  - Status transaksi yang diserahkan sequencer diasumsikan valid secara *optimistik*.
  - Membuka jendela waktu sanggahan (*challenge window*) selama 7 hari.
  - Jika tidak ada sanggahan dari verifier independen, status difinalisasi secara permanen di Layer 1.
  - Jika terjadi kecurangan, pengawas (*challenger*) menyetorkan bukti kecurangan untuk membatalkan blok dan menyita deposit sequencer.
- **Paradigma Zero-Knowledge (Validity Proofs):**
  - Status transaksi yang diserahkan sequencer dianggap tidak valid sampai terbukti sebaliknya.
  - Komputer pembuat bukti (*prover*) menghasilkan bukti kriptografis ringkas (ZK-SNARK atau ZK-STARK).
  - Kontrak verifikator di Layer 1 mengevaluasi persamaan matematika bukti tersebut secara deterministik.
  - Menghasilkan finalitas instan begitu bukti valid diverifikasi di Layer 1.
- *Visual:* Diagram alur paralel: Alur Optimistic dengan jendela sanggahan 7 hari vs Alur ZK dengan prover dan verifikasi instan on-chain.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Kontras mendasar: Fraud Proofs vs Validity Proofs.
- Optimistic bergantung pada pengawasan aktif dan insentif ekonomi game theory.
- ZK bergantung pada kepastian hukum matematika dan kriptografi polinomial.

**Naskah Tutur (Voiceover Script):**
Dua pendekatan ini mewakili cara pandang yang bertolak belakang dalam epistemologi ilmu komputer.
Di kubu Optimistic, filosofinya adalah praduga tak bersalah yang dipandu oleh teori permainan ekonomi.
Ketika sequencer mengumumkan perubahan status, Layer 1 langsung menerimanya secara sementara.
Layer 1 membuka masa tunggu selama tujuh hari bagi para validator independen untuk memeriksa apakah ada kebohongan di dalamnya.
Jika tidak ada yang memprotes selama tujuh hari, status itu dianggap sah dan final.
Sebaliknya, kubu Zero-Knowledge menolak segala bentuk asumsi kepercayaan manusia.
Mereka tidak peduli siapa sequencernya dan berapa banyak uang jaminan yang dipertaruhkan.
Status baru tidak akan pernah diterima oleh Layer 1 tanpa adanya sebuah berkas matematika ringkas bernama validity proof.
Begitu kontrak verifikator di Layer 1 memastikan persamaan aljabar di dalam bukti tersebut benar, transaksi langsung sah seketika tanpa perlu menunggu masa sanggah.

---

## Slide 4: Arsitektur Optimistic Rollup: Menjamin Kejujuran Lewat Insentif

### Konten Slide
- **Komponen Inti Arsitektur Optimistic (Arbitrum One, Optimism Mainnet):**
  - *Sequencer:* Menjalankan execution client (berbasis Geth/Erigon), memproses transaksi instan, dan mempublikasikan data batch ke Layer 1.
  - *L1 Rollup Smart Contract:* Menerima batch calldata/blobs, mencatat usulan state root, dan mengelola staking jaminan sequencer.
  - *Verifier / Challenger Nodes:* Simpul pengawas independen (seperti Bob) yang terus mengunduh batch data dari L1 dan merekonstruksi status secara lokal.
- **Asumsi Kepercayaan 1-of-N (Honest Verifier Assumption):**
  - Keamanan jaringan dijamin absolut selama terdapat **minimal satu** simpul pengawas yang jujur dan aktif di seluruh dunia.
  - Pengawas memiliki insentif ekonomi besar: jika berhasil membuktikan kecurangan sequencer, pengawas menerima sebagian besar modal jaminan sequencer yang disita (*slashed bond*).
- *Visual:* Arsitektur interaksi antara Sequencer, L1 Contract, dan Challenger Node independen.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Bagaimana Optimistic Rollup beroperasi sehari-hari.
- Asumsi 1-of-N: kita hanya butuh satu orang jujur di dunia untuk menjaga seluruh sistem tetap aman.
- Teori permainan: sequencer mempertaruhkan modal jutaan dolar yang akan disita jika mencoba curang.

**Naskah Tutur (Voiceover Script):**
Mari kita bedah cara kerja Optimistic Rollup seperti Arbitrum dan Optimism.
Setiap hari, sequencer mengumpulkan transaksi pengguna, mengeksekusinya di mesin virtual lokal yang setara dengan Ethereum, lalu mengunggah data terkompresi ke Layer 1 bersama usulan state root.
Agar sequencer tidak berbuat curang, protokol mewajibkan sequencer mengunci sejumlah modal uang jaminan yang sangat besar di kontrak Layer 1.
Di sisi lain, ada ribuan komputer pengawas independen bernama challengers, salah satunya Bob.
Bob mengunduh data mentah dari Layer 1, mengeksekusi ulang transaksinya di komputernya sendiri, dan mencocokkan apakah state root hasil perhitungannya sama dengan angka yang disetor sequencer.
Sistem ini bersandar pada asumsi keamanan yang sangat kuat: *1-of-N honest verifier*.
Artinya, dari ribuan node pengawas di seluruh penjuru bumi, kita hanya butuh satu saja peserta yang jujur dan menyala untuk menggagalkan upaya pencurian sequencer.
Jika Bob menemukan kebohongan, Bob bisa melaporkannya dan berhak membawa pulang hadiah uang jaminan sequencer yang disita.

---

## Slide 5: Mengapa Jendela Sanggahan Harus 7 Hari?

### Konten Slide
- **The 7-Day Challenge Window:**
  - Seluruh penarikan dana dari Layer 2 menuju Layer 1 pada Optimistic Rollup wajib tertahan selama 7 hari kalender.
- **Alasan Keamanan di Balik Penundaan 7 Hari:**
  - **1. Pertahanan terhadap Serangan Sensor L1:**
    - Jika sequencer nakal mencoba menyetor status palsu, mereka bisa mencoba menyuap penambang atau validator Layer 1 untuk menyensor transaksi sanggahan Bob (*censorship attack*).
    - Jendela 7 hari memberi waktu yang sangat longgar bagi komunitas untuk mendeteksi sensor, menaikkan gas fee, atau melakukan reorganisasi sosial.
  - **2. Penanganan Kemacetan Jaringan (Network Congestion):**
    - Jika Layer 1 mengalami kepadatan ekstrem, transaksi sanggahan Bob mungkin membutuhkan waktu puluhan jam untuk masuk ke dalam blok.
- **Dampak bagi Pengguna:** Pengguna biasa (Alice) harus menunggu 7 hari untuk mencairkan aset lewat jembatan resmi, atau membayar biaya diskon ke market maker jembatan pihak ketiga.
- *Visual:* Garis waktu 7 hari dengan simulasi upaya penyerang menyensor sanggahan yang akhirnya digagalkan oleh durasi jendela waktu.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Pertanyaan umum: kenapa penarikan di Arbitrum atau Optimism butuh waktu 7 hari?
- Jawaban teknis: bukan karena komputer lambat, melainkan protokol pertahanan terhadap sensor L1.
- Memberikan waktu yang cukup bagi validator jujur untuk menembus kemacetan jaringan.

**Naskah Tutur (Voiceover Script):**
Pertanyaan yang paling sering dikeluhkan oleh pengguna biasa adalah: kenapa penarikan aset dari Arbitrum atau Optimism ke Ethereum memakan waktu sampai tujuh hari?
Penundaan tujuh hari ini bukan karena komputasi komputer kita lambat.
Ini adalah fitur keamanan game theory yang sengaja dirancang untuk menghadapi skenario serangan terburuk.
Bayangkan jika jendela sanggahan hanya berdurasi tiga puluh menit.
Sequencer nakal yang memiliki modal miliaran dolar bisa membanjiri jaringan Ethereum dengan jutaan transaksi sampah atau menyuap validator Layer 1 agar menyensor transaksi sanggahan milik Bob.
Jika transaksi sanggahan Bob tertahan selama tiga puluh menit saja akibat kemacetan jaringan, status palsu sequencer akan otomatis sah dan uang pengguna terkuras.
Dengan durasi tujuh hari, hampir mustahil bagi siapa pun di dunia untuk menyensor jaringan Ethereum tanpa henti selama seminggu penuh.
Tujuh hari memberi kepastian absolut bahwa kebenaran pasti memiliki celah waktu untuk tercatat di blockchain Layer 1.

---

## Slide 6: Sanggahan Interaktif: Multi-Round Bisection

### Konten Slide
- **Masalah Komputasi di L1:** Mengeksekusi ulang seluruh blok transaksi yang bermasalah di Layer 1 akan melebihi batas kapasitas gas (*block gas limit*).
- **Inovasi Arbitrum Nitro: Interactive Bisection Game:**
  - Sengketa diselesaikan melalui permainan catur interaktif antara sequencer (Mallory) dan penantang (Bob) di kontrak Layer 1.
- **Tahapan Permainan Bagi-Dua (Bisection):**
  - 1. Mallory mengklaim rentang eksekusi $N$ instruksi menghasilkan status X; Bob menyanggah bahwa hasilnya adalah status Y.
  - 2. Keduanya membagi rentang eksekusi menjadi dua: $\frac{N}{2}, \frac{N}{4}, \dots, 1$.
  - 3. Dalam $\mathcal{O}(\log N)$ putaran, mereka berhasil mengisolasi titik perselisihan hingga ke **satu instruksi opcode EVM tunggal** (misalnya instruksi `ADD` atau `SSTORE`).
  - 4. Kontrak pintar di Layer 1 hanya perlu mengeksekusi satu opcode tunggal tersebut di mesin virtual L1 untuk menentukan siapa yang berbohong.
- *Visual:* Diagram pohon pencarian biner membelah jutaan instruksi menjadi satu opcode tunggal yang dieksekusi di L1.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Masalah: L1 tidak sanggup mengeksekusi ulang seluruh blok transaksi yang disengketakan.
- Solusi Arbitrum: Bisection game membelah eksekusi secara biner hingga tersisa 1 instruksi saja.
- Kompleksitas O(log N): jutaan instruksi bisa dipersempit hanya dalam sekitar 20 sampai 30 putaran interaktif.

**Naskah Tutur (Voiceover Script):**
Ketika Bob mendeteksi bahwa sequencer menyetor status palsu, bagaimana cara membuktikannya ke Layer 1?
Layer 1 tidak mungkin menjalankan ulang seluruh transaksi yang ada di dalam blok tersebut, karena biaya gasnya akan melebihi batas blok Ethereum.
Arbitrum memecahkan masalah ini dengan penemuan yang sangat jenius bernama *interactive multi-round bisection game*.
Bayangkan seperti permainan tebak angka biner.
Mallory mengklaim bahwa setelah satu juta instruksi komputer dijalankan, status akhirnya adalah A.
Bob membantah dan mengatakan status akhirnya adalah B.
Kontrak di Layer 1 tidak mengecek semuanya.
Kontrak meminta Mallory dan Bob membelah satu juta instruksi itu menjadi dua di instruksi ke-500.000, lalu bertanya: di belahan mana kalian mulai berbeda pendapat?
Mereka membelahnya lagi menjadi 250.000, lalu 125.000, dan seterusnya.
Dalam kompleksitas O(log N), atau hanya sekitar dua puluh putaran interaksi, mereka berhasil mempersempit perselisihan hingga ke tepat satu instruksi opcode tunggal, misalnya instruksi penjumlahan matematika sederhana.
Di putaran terakhir, kontrak pintar di Layer 1 hanya perlu mengeksekusi satu instruksi penjumlahan itu saja untuk melihat siapa yang benar dan menyita modal pihak yang berbohong.

---

## Slide 7: Arsitektur Zero-Knowledge Rollup: Kebenaran Matematis Instan

### Konten Slide
- **Prinsip Utama ZK Rollup (Starknet, zkSync Era, Scroll):**
  - Mengganti pengawasan berbasis sengketa dengan kalkulasi bukti matematis yang kebal manipulasi (*cryptographic validity proofs*).
- **Alur Pembuatan Bukti (Pipeline):**
  - **1. Execution Engine:** Memproses ribuan transaksi off-chain dan mencatat jejak eksekusi lengkap (*execution trace*).
  - **2. Witness Generation & Arithmetization:** Mengonversi jejak register CPU dan mutasi memori menjadi sistem persamaan polinomial aljabar (representasi R1CS, Plonkish, atau AIR).
  - **3. Cryptographic Prover:** Menghitung bukti ringkas $\pi$ menggunakan kluster hardware berdaya komputasi tinggi.
  - **4. L1 Verifier Contract:** Memverifikasi persamaan bukti di Layer 1 secara deterministik dalam waktu konstan.
- *Visual:* Pipeline ZK Rollup: Transaksi -> Execution Trace -> Arithmetization Polinomial -> Prover Kluster -> Bukti Ringkas $\pi$ -> Kontrak Verifikasi L1.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Paradigma ZK: dari eksekusi kode menjadi persamaan polinomial aljabar.
- Execution trace mencatat semua pergerakan register CPU.
- Hasil akhirnya adalah bukti ringkas pi yang membuktikan kebenaran matematika seluruh transaksi.

**Naskah Tutur (Voiceover Script):**
Sekarang mari kita alihkan perhatian kita ke kubu kedua: Zero-Knowledge Rollup.
Arsitektur ZK Rollup seperti Starknet dan zkSync bekerja dengan cara yang sama sekali berbeda dari Optimistic Rollup.
Mereka tidak menggunakan sistem sanggahan dan tidak ada uang jaminan yang dipertaruhkan.
Ketika transaksi masuk, mesin eksekusi Layer 2 mencatat seluruh riwayat komputasi ke dalam apa yang disebut *execution trace*.
Execution trace ini mencatat setiap pergerakan register prosesor, pembacaan memori, dan perubahan saldo.
Kemudian, compiler khusus mengubah seluruh jejak komputasi tersebut menjadi sistem persamaan aljabar polinomial raksasa lewat proses bernama *arithmetization*.
Sebuah komputer berkekuatan tinggi bernama Prover kemudian memecahkan persamaan tersebut dan menghasilkan satu bukti matematika ringkas bersimbol pi.
Bukti pi ini membuktikan secara absolut bahwa ada sekumpulan transaksi sah yang berhasil mengubah status lama menjadi status baru sesuai dengan aturan mesin virtual.
Bukti inilah yang dikirim ke kontrak verifikator di Layer 1.

---

## Slide 8: Anatomi Primitif: ZK-SNARK vs ZK-STARK

### Konten Slide
- **Dua Pilar Kriptografi Bukti Validitas:**

| Parameter Rekayasa | ZK-SNARK | ZK-STARK |
| :--- | :--- | :--- |
| **Kepanjangan** | Succinct Non-Interactive Argument of Knowledge | Scalable Transparent Argument of Knowledge |
| **Ukuran Bukti (Proof Size)** | Sangat ringkas (ratusan byte) | Lebih besar (puluhan hingga ratusan kilobyte) |
| **Biaya Verifikasi L1** | Sangat murah dan konstan ($\approx 200.000$ gas) | Lebih mahal akibat ukuran payload yang lebih besar |
| **Trusted Setup** | Membutuhkan upacara setup awal (Groth16) / Universal (PLONK) | **Zero Trusted Setup** (Transparan murni) |
| **Ketahanan Pasca-Kuantum** | Rentan terhadap komputer kuantum (Kurva eliptik) | **Kebal Komputer Kuantum** (Fungsi hash & kode Reed-Solomon) |

- *Visual:* Perbandingan grafis ukuran bukti dan sifat kriptografis antara ZK-SNARK dan ZK-STARK.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- SNARK: sangat kecil, murah diverifikasi di L1, tetapi varian lama butuh trusted setup dan tidak tahan komputer kuantum.
- STARK: diciptakan oleh Eli Ben-Sasson, transparan tanpa setup, kebal kuantum, tetapi ukuran buktinya besar.
- Keduanya adalah instrumen matematika tercanggih dalam industri komputasi terdistribusi.

**Naskah Tutur (Voiceover Script):**
Di dunia Zero-Knowledge, terdapat dua keluarga primitif matematika utama yang bersaing: ZK-SNARK dan ZK-STARK.
Keluarga pertama adalah SNARK.
Kelebihan utama SNARK adalah buktinya sangat ringkas, hanya berukuran beberapa ratus byte saja.
Karena buktinya kecil, biaya gas untuk memverifikasinya di smart contract Layer 1 sangat murah, hanya sekitar dua ratus ribu gas.
Namun kelemahannya, sebagian besar sistem SNARK membutuhkan upacara pembuatan kunci awal yang disebut trusted setup, dan secara teoritis rentan terhadap serangan komputer kuantum di masa depan.
Keluarga kedua adalah STARK, yang dipelopori oleh tim Starkware.
Huruf T pada STARK berarti *Transparent*.
STARK sama sekali tidak membutuhkan trusted setup dan hanya bersandar pada fungsi hash kriptografis serta kode koreksi kesalahan Reed-Solomon.
Ini membuat STARK sepenuhnya kebal terhadap ancaman komputer kuantum.
Namun komprominya, ukuran bukti STARK jauh lebih besar, mencapai puluhan kilobyte, yang membuat biaya penulisan datanya di Layer 1 sedikit lebih mahal.

---

## Slide 9: Finalitas Instan dan Kompresi Ekstrem pada ZK Rollup

### Konten Slide
- **Finalitas Instan Tanpa Penundaan:**
  - Begitu kontrak pintar di Layer 1 memverifikasi bukti validitas $\pi$, status transaksi langsung sah dan final secara permanen.
  - Alice dapat menarik asetnya kembali ke Layer 1 dalam hitungan menit hingga beberapa jam (hanya dibatasi oleh interval waktu pembuatan bukti).
- **Efisiensi Kompresi Data Ekstrem:**
  - Pada Optimistic Rollup, setiap transaksi yang diunggah ke L1 wajib menyertakan tanda tangan digital ECDSA agar verifier independen dapat memeriksa keabsahan otorisasi.
  - Pada ZK Rollup, jutaan tanda tangan digital diverifikasi secara off-chain di dalam rangkaian sirkuit ZK.
  - Sequencer ZK hanya perlu menerbitkan **perubahan status akhir (state deltas)** ke Layer 1, tanpa perlu menyertakan tanda tangan pengguna.
- *Visual:* Ilustrasi kompresi data: 10.000 transaksi penuh pada Optimistic Rollup vs Ringkasan State Deltas padat pada ZK Rollup.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Keunggulan terbesar ZK: tidak ada masa tunggu 7 hari.
- Penarikan dana Alice bisa selesai secepat bukti ZK di-generate dan diverifikasi di L1.
- Kompresi dahsyat: ribuan signature dibuang dan diganti satu bukti matematika.

**Naskah Tutur (Voiceover Script):**
Inilah yang membuat banyak peneliti menganggap ZK Rollup sebagai cawan suci skalabilitas blockchain.
Pertama, ZK Rollup menawarkan finalitas transaksi yang instan.
Begitu blok transaksi selesai dibuktikan oleh Prover dan diverifikasi oleh kontrak Layer 1, transaksi itu sah seketika.
Alice tidak perlu menunggu jeda sengketa selama tujuh hari untuk menarik uangnya kembali ke Layer 1.
Uangnya bisa dicairkan segera setelah bukti validitas selesai diproses, biasanya dalam waktu lima belas menit hingga satu jam.
Kedua, ZK Rollup memungkinkan kompresi data yang sangat ekstrem.
Di Optimistic Rollup, sequencer wajib menyertakan tanda tangan digital setiap pengguna ke Layer 1 agar challenger bisa memverifikasi siapa yang mengirim transaksi.
Di ZK Rollup, jutaan tanda tangan digital itu diverifikasi di dalam sirkuit matematika off-chain.
Sequencer hanya perlu menyetor hasil akhir perubahan saldonya saja ke Layer 1.
Data yang harus diunggah ke blockchain menjadi jauh lebih sedikit, yang membuat biaya transaksi semakin murah.

---

## Slide 10: Matriks Perbandingan Mendalam: Optimistic vs. ZK

### Konten Slide
- **Tabel Komparasi Arsitektural Lengkap:**

| Dimensi Rekayasa | Optimistic Rollups | Zero-Knowledge Rollups |
| :--- | :--- | :--- |
| **Model Kepercayaan** | Asumsi verifier jujur $1$-of-$N$ | Kebenaran matematis kriptografis murni |
| **Biaya Verifikasi L1** | Sangat rendah pada kondisi normal (Hanya update root) | Biaya gas tetap per verifikasi bukti ($\approx 200\text{k} - 400\text{k}$ gas) |
| **Beban Komputasi Prover** | Sangat ringan (Cukup CPU server komoditas) | Sangat berat (Membutuhkan kluster akselerator GPU/FPGA/ASIC) |
| **Latensi Penarikan Dana** | Wajib menunggu jendela sanggahan 7 hari | Cepat, selesai setelah verifikasi bukti ($\approx 15 \text{ menit} - 2 \text{ jam}$) |
| **Kesetaraan EVM** | Sangat tinggi (Fork langsung dari codebase Geth) | Sangat kompleks (Membutuhkan sirkuit zkEVM Type 1 sampai Type 4) |
| **Efisiensi Kompresi Data** | Moderat (Wajib menyertakan signatures) | Ekstrem (Hanya menyertakan mutasi state delta akhir) |

- *Visual:* Peta perbandingan keunggulan teknis antara Optimistic (mudah diimplementasikan) vs ZK (unggul dalam finalitas matematis).

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkuman trade-off rekayasa antara Optimistic dan ZK.
- Optimistic menang telak dalam kesetaraan EVM dan kesiapan produksi hari ini.
- ZK menang telak dalam kecepatan finalitas dan batas teoritis kompresi masa depan.

**Naskah Tutur (Voiceover Script):**
Mari kita letakkan kedua arsitektur ini berdampingan untuk melihat trade-off rekayasanya secara jujur.
Optimistic Rollup memiliki keunggulan luar biasa dalam hal kesiapan ekosistem dan kesetaraan EVM.
Karena kodenya merupakan turunan langsung dari klien Ethereum seperti Geth, pengembang bisa memindahkan aplikasi Solidity mereka tanpa mengubah satu baris kode pun.
Beban komputasi sequencer-nya juga sangat murah karena cukup memakai server standar.
Sebaliknya, ZK Rollup menuntut komputasi hardware yang sangat masif.
Menghasilkan bukti matematika polinomial membutuhkan server cluster dengan kartu grafis GPU tingkat tinggi yang memakan biaya listrik besar.
Merancang mesin virtual yang ramah terhadap sirkuit matematika ZK juga merupakan salah satu tantangan matematika tersulit di dunia.
Namun dari sisi teoritis jangka panjang, ZK Rollup unggul di setiap lini: tidak ada masa tunggu tujuh hari, kompresi data jauh lebih padat, dan keamanannya tidak bergantung pada kewaspadaan pihak mana pun.

---

## Slide 11: Konsekuensi Arsitektural: Fragmentasi Likuiditas

### Konten Slide
- **Paradoks Kesuksesan Penskalaan:**
  - Keberhasilan peluncuran puluhan Layer 2 berhasil meningkatkan throughput total industri hingga puluhan ribu transaksi per detik.
  - Namun, hal ini menciptakan masalah fragmentasi baru: **Liquidity & State Fragmentation**.
- **Kondisi Ekosistem Saat Ini:**
  - Pengguna, aset modal, dan aplikasi DeFi kini terpecah-pecah ke dalam pulau-pulau yang terisolasi.
  - Likuiditas modal terperangkap di Arbitrum, Optimism, Base, zkSync, Solana, dan Ethereum L1.
- **Dilema Pengguna (Alice):**
  - Alice memiliki 10.000 USDC di Arbitrum, namun kolam pinjaman dengan imbal hasil terbaik berada di Base.
  - Bagaimana Alice dapat memindahkan nilai dan instruksi komputasi melintasi dua mesin virtual yang sepenuhnya terpisah tanpa harus kembali ke L1?
- *Visual:* Peta kepulauan terisolasi (Island of Liquidity) yang menggambarkan terputusnya aliran modal antar rantai yang berbeda.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Keberhasilan rollup memicu masalah baru: kepulauan likuiditas.
- Modal dan likuiditas terpecah di berbagai L2 dan L1 alternatif.
- Alice terjebak: uangnya ada di rantai A, tapi aplikasi yang ingin dipakainya ada di rantai B.

**Naskah Tutur (Voiceover Script):**
Penskalaan melalui Layer 2 telah membawa industri kita melangkah sangat jauh.
Namun di balik keberhasilan ini, muncul satu konsekuensi operasional yang sangat menyakitkan bagi ekosistem: fragmentasi likuiditas.
Dulu, seluruh modal dan aplikasi terpusat di satu tempat di Ethereum Layer 1.
Hari ini, kita memiliki puluhan Layer 2 dan rantai Layer 1 alternatif yang berjalan sendiri-sendiri.
Modal global kini terpecah-pecah ke dalam pulau-pulau likuiditas yang saling terisolasi.
Ada likuiditas yang terparkir di Arbitrum, ada yang di Optimism, ada yang di Base, dan ada yang di zkSync.
Bayangkan kalian adalah Alice.
Kalian memegang token USDC di jaringan Arbitrum, tetapi aplikasi pinjaman yang menawarkan bunga terbaik berada di jaringan Base.
Bagaimana cara kalian memindahkan uang dan instruksi tersebut menyeberangi dua mesin virtual yang sepenuhnya berbeda?
Inilah yang melahirkan kebutuhan akan jembatan lintas rantai atau cross-chain bridges.

---

## Slide 12: Jembatan ke Modul Berikutnya (Cross-Chain Bridges)

### Konten Slide
- **Tantangan Rekayasa Berikutnya:**
  - Blockchain publik secara desain adalah mesin status yang berdaulat dan terisolasi (*sovereign isolated state machines*).
  - Ethereum tidak bisa membaca memori Solana, dan Arbitrum tidak bisa secara otomatis membaca status internal Optimism.
- **Pertanyaan Kritis Lintas Rantai:**
  - Bagaimana protokol jembatan mengoordinasikan transfer nilai lintas rantai independen?
  - Apa perbedaan antara model Lock-and-Mint, Burn-and-Mint, dan Liquidity Networks?
  - Mengapa Vitalik Buterin memperingatkan bahwa jembatan lintas rantai menghadapi batas keamanan fundamental yang tidak dialami oleh rollup?
  - Mengapa kontrak jembatan menjadi target peretasan terbesar dalam sejarah keuangan global?
- **Materi Modul Berikutnya:** **Interoperability and Cross-Chain Bridges**.
- *Visual:* Ilustrasi jembatan gantung digital yang menghubungkan dua jurang tebing blockchain yang rawan diserang badai peretas.

### Catatan Presenter (Cheatsheet)
**Quick Cues:**
- Rangkuman transisi: dari penskalaan internal rollup ke komunikasi lintas rantai.
- Menyoroti kerentanan fatal jembatan: peretasan ratusan juta dolar.
- Teaser modul 6.4: Interoperability and Cross-Chain Bridges.

**Naskah Tutur (Voiceover Script):**
Rollup berhasil menyelesaikan masalah kecepatan di dalam rumahnya masing-masing.
Namun ketika kita mencoba menghubungkan rumah-rumah tersebut satu sama lain, kita memasuki wilayah rekayasa yang paling berbahaya dalam sejarah Web3.
Secara arsitektur dasar, setiap blockchain adalah mesin komputer yang buta dan tuli terhadap dunia luar.
Ethereum tidak punya mata untuk melihat apa yang terjadi di Solana, dan Arbitrum tidak bisa langsung memeriksa saldo di Optimism.
Untuk menghubungkan mereka, para pengembang membangun sistem jembatan atau Cross-Chain Bridges.
Namun menyatukan dua wilayah konsensus yang berbeda memperkenalkan celah keamanan yang sangat fatal.
Bahkan Vitalik Buterin sendiri pernah mengeluarkan peringatan keras bahwa jembatan lintas rantai memiliki batasan keamanan fundamental yang tidak bisa dipecahkan.
Bukan sebuah kebetulan bahwa peretasan terbesar dalam sejarah keuangan digital, bernilai miliaran dolar, semuanya terjadi di smart contract jembatan ini.
Bagaimana arsitektur jembatan bekerja dan mengapa mereka begitu rentan dibobol peretas?
Kita akan membedah anatomi jembatan lintas rantai di modul berikutnya: Interoperability and Cross-Chain Bridges.
Sampai jumpa di sesi berikutnya.
