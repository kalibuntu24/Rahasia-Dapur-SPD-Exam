# Rahasia Dapur - Backend API

Backend API untuk "Rahasia Dapur," platform memasak untuk anggota PKK. API ini menangani otentikasi pengguna, manajemen resep, dan menyajikan konten ke frontend (Web & Mobile).

## Tech Stack

- **Node.js** & **Express.js**: Web Server
- **MongoDB** & **Mongoose**: Database
- **JWT (JSON Web Token)**: Otentikasi
- **BcryptJS**: Password Hashing

## Prasyarat

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Lokal atau Atlas)

## Instalasi

1.  Masuk ke direktori backend:
    ```bash
    cd backend-web
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Siapkan variabel lingkungan (environment variables):
    Buat file `.env` di root `backend-web` dan tambahkan:
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/rahasia_dapur
    JWT_SECRET=rahasia_dapur_pkk_secret_key_123
    ```

## Penggunaan

### Jalankan Lokal
```bash
# Jalankan dalam mode development (dengan nodemon)
npm run dev

# Jalankan dalam mode production
npm start
```
Server akan berjalan di `http://localhost:5000`.

### Seed Database (Isi Data Dummy)
Untuk mengisi database dengan pengguna dan resep dummy:
```bash
npm run data:import
```
Untuk menghapus semua data:
```bash
npm run data:destroy
```

## API Endpoints

### Otentikasi
- `POST /api/auth/register` - Daftar pengguna baru
    - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login pengguna
    - Body: `{ email, password }`
- `GET /api/auth/me` - Ambil profil pengguna saat ini (Perlu Login)

### Resep
- `GET /api/recipes` - Ambil semua resep (Perlu Login)
    - Query: `?category=Masakan Rumah`
- `GET /api/recipes/:id` - Ambil detail resep (Perlu Login)
- `POST /api/recipes` - Buat resep baru (Perlu Login)

## Struktur Proyek
- `config/` - Konfigurasi Database
- `controllers/` - Logika untuk menangani request
- `models/` - Mengelola skema data Mongoose
- `routes/` - Definisi rute API
- `middleware/` - Middleware kustom (Auth, Error)
- `data/` - Data dummy untuk seeding
