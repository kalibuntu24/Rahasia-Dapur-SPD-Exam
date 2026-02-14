# Rahasia Dapur - Aplikasi Full Stack (Ujian SPD)

Proyek ini adalah aplikasi full-stack komprehensif yang terdiri dari Backend API, Web Frontend, dan Aplikasi Mobile.

## Struktur Proyek

-   `backend-web`: Server REST API menggunakan Node.js & Express.
-   `frontend-web`: Aplikasi web React.js (Vite).
-   `mobile-app`: Aplikasi mobile React Native (Expo).

## Prasyarat

Sebelum menjalankan proyek, pastikan Anda telah menginstal:
-   [Node.js](https://nodejs.org/) (Disarankan versi LTS terbaru)
-   [MongoDB](https://www.mongodb.com/) (Instalasi lokal atau URI Atlas)

## Cara Memulai

Ikuti langkah-langkah berikut untuk mengatur dan menjalankan setiap bagian dari aplikasi.

### 1. Backend API (`backend-web`)

1.  Masuk ke direktori backend:
    ```bash
    cd backend-web
    ```
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  Atur variabel lingkungan (environment variables):
    -   Salin `.env.example` ke `.env`:
        ```bash
        cp .env.example .env
        ```
        *(Atau pada Windows Command Prompt: `copy .env.example .env`)*
    -   Perbarui `.env` dengan URI MongoDB Anda jika berbeda.
4.  Jalankan server:
    ```bash
    npm run dev
    ```
    Server akan berjalan pada port `5000` (default).

### 2. Frontend Web (`frontend-web`)

1.  Masuk ke direktori frontend:
    ```bash
    cd frontend-web
    ```
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  Atur variabel lingkungan:
    -   Salin `.env.example` ke `.env`:
        ```bash
        cp .env.example .env
        ```
        *(Atau pada Windows Command Prompt: `copy .env.example .env`)*
    -   Pastikan `VITE_API_BASE_URL` mengarah ke backend Anda (default: `http://localhost:5000/api`).
4.  Jalankan aplikasi web:
    ```bash
    npm run dev
    ```
    Buka tautan yang disediakan di terminal (biasanya `http://localhost:5173`) untuk melihat aplikasi.

### 3. Aplikasi Mobile (`mobile-app`)

1.  Masuk ke direktori mobile app:
    ```bash
    cd mobile-app
    ```
2.  Instal dependensi:
    ```bash
    npm install
    ```
3.  Jalankan server pengembangan Expo:
    ```bash
    npx expo start
    ```
    -   Pindai kode QR dengan aplikasi **Expo Go** di ponsel Anda (Android/iOS).
    -   Atau tekan `a` untuk menjalankan di Android Emulator, `i` untuk menjalankan di iOS Simulator.

## Teknologi yang Digunakan

-   **Backend**: Node.js, Express, MongoDB, Mongoose, JWT Authentication.
-   **Frontend**: React, Vite, Axios.
-   **Mobile**: React Native, Expo, React Navigation.
