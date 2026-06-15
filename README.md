# Tes Kepribadian Mendalam

Aplikasi React + TypeScript + Vite untuk tes kepribadian berbasis pilihan situasional, simbolik, naratif, dan interaktif. Scoring utama berjalan deterministik di browser dan tetap bisa dipakai tanpa koneksi API.

## Install

```bash
npm install
```

## Jalan lokal tanpa API

```bash
npm run dev
```

Buka alamat lokal yang muncul di terminal.

## Jalan lokal dengan Vercel function

Install Vercel CLI jika belum ada, lalu jalankan:

```bash
vercel dev
```

## Build

```bash
npm run build
```

## Deploy ke Vercel

1. Upload project ke GitHub atau impor folder project ke Vercel.
2. Pastikan Build Command: `npm run build`.
3. Pastikan Output Directory: `dist`.
4. Deploy.

## Environment variable untuk narasi panjang

Di Vercel, buka Project Settings → Environment Variables, lalu tambahkan:

```bash
GEMINI_API_KEY=isi_api_key_baru
```

Opsional jika ingin mengganti model:

```bash
GEMINI_MODEL=gemini-2.0-flash
```

## Peringatan keamanan

- Jangan hardcode API key di source code.
- Jangan memakai `VITE_GEMINI_API_KEY`, karena variabel `VITE_` akan masuk ke browser.
- Jangan commit `.env` atau `.env.local` ke GitHub.
- Scoring utama tetap berjalan tanpa API.
- Endpoint `api/generateResult.ts` hanya memperhalus narasi dari hasil final deterministik, bukan menentukan tipe dari nol.
