# Rahasia Dapur - Frontend Web

Aplikasi web untuk "Rahasia Dapur," dibangun menggunakan React.js (Vite). Aplikasi ini memungkinkan pengguna untuk mendaftar, masuk, dan melihat resep masakan.

## Tech Stack

- **React.js (Vite)**: Framework Frontend
- **React Router DOM**: Navigasi Halaman
- **Axios**: HTTP Client untuk koneksi ke API
- **CSS Modules/Variables**: Styling

## Prasyarat

- Node.js (v14+)
- Backend API harus berjalan pada port 5000 (lihat dokumentasi backend)

## Instalasi

1.  Masuk ke direktori frontend:
    ```bash
    cd frontend-web
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Penggunaan

1.  Pastikan Backend API sudah berjalan.
2.  Jalankan aplikasi frontend:
    ```bash
    npm run dev
    ```
3.  Buka browser dan akses alamat yang muncul (biasanya `http://localhost:5173`).

## Fitur Utama

- **Otentikasi**: Login dan Register pengguna.
- **Beranda**: Menampilkan daftar resep dengan kategori (Masakan Rumah, Ide Jualan, dll).
- **Detail Resep**: Halaman detail dengan bahan, langkah-langkah, dan estimasi harga jual.
- **Desain Responsif**: Tampilan menyesuaikan untuk mobile dan desktop.

## Struktur Proyek

- `src/api/` - Konfigurasi Axios
- `src/components/` - Komponen yang dapat digunakan kembali (Navbar, dll)
- `src/context/` - Auth Context untuk manajemen state user
- `src/pages/` - Halaman utama (Login, Register, Home, RecipeDetail)
- `src/index.css` - Global styling dan variabel CSS
