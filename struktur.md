pdf-to-excel/
│
├── app/
│   ├── page.tsx                        // halaman utama
│   ├── api/
│   │   ├── parse-pdf/route.ts          // API parsing PDF
│   │   └── generate-excel/route.ts     // API generate Excel
│
├── components/
│   ├── FileUploader.tsx                // komponen upload PDF
│   └── ResultTable.tsx                 // tabel hasil parsing
│
├── lib/
│   ├── extract.ts                      // logic ekstraksi PDF
│   └── excel.ts                        // logic buat file Excel
│
├── public/
│
├── package.json
├── next.config.js
└── tsconfig.json


Buatkan proyek web lengkap menggunakan Next.js 14 (App Router) dengan struktur berikut:

app/
  page.tsx
  api/
    parse-pdf/route.ts
    generate-excel/route.ts

components/
  FileUploader.tsx
  ResultTable.tsx

lib/
  extract.ts
  excel.ts

🎯 TUJUAN WEBSITE

Website ini digunakan untuk:

Upload file PDF PO.

Ekstrak data dari PDF berdasarkan format tabel berikut:

Order Number

Buyer Item (Buyer Item #)

Short Description

Color

Size

SKU Number

UPC Number

Tampilkan hasil dalam tabel di UI.

Hasil bisa diunduh menjadi file Excel (.xlsx).

Website akan dideploy di Vercel dan repository di Github.

🧩 DETAIL SPESIFIKASI
1. FileUploader.tsx

Input upload PDF (.pdf)

Setelah upload, kirim file ke API /api/parse-pdf

Tampilkan loading saat proses

2. ResultTable.tsx

Menampilkan tabel hasil parsing:

Order Number | Buyer Item | Short Description | Color | Size | SKU | UPC


Ada tombol Download Excel → panggil API /api/generate-excel

3. API /api/parse-pdf

Terima file PDF

Ekstrak data berdasarkan pola tabel PDF seperti contoh dari PO (6000892522.pdf)

Parsing mencakup kolom:

Buyer Item #

Color

Size

SKU Number

UPC Number

Semua baris dikembalikan dalam bentuk array JSON

4. API /api/generate-excel

Terima body JSON → data tabel hasil parsing

Buat file Excel (.xlsx)

Kembalikan dalam response sebagai file download

5. Folder lib/

extract.ts berisi logic ekstraksi PDF
excel.ts berisi logic generate Excel

6. Teknologi yang digunakan

Next.js 14 App Router

TypeScript

Tailwind CSS (opsional, jika mudah)

pdf-parse (untuk baca PDF)

ExcelJS (buat file Excel)

🎨 UI/UX

Bebas dibuat sederhana:

Card upload

Tabel data

Tombol download

🚀 REQUIREMENTS

Pastikan semuanya berjalan di Vercel (gunakan API Route yang kompatibel)

Pastikan parsing PDF fleksibel mengikuti format PO seperti file upload

Buat struktur proyek lengkap sesuai folder yang diminta