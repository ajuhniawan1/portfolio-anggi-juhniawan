# Telegram Visitor Tracking Setup

## 1. Buat Telegram Bot

1. Buka Telegram dan cari **@BotFather**
2. Kirim perintah: `/newbot`
3. Masukkan nama bot (contoh: `Portfolio Visitor Tracker`)
4. Masukkan username bot (harus diakhiri `bot`, contoh: `anggi_portfolio_bot`)
5. Copy **token** yang diberikan (format: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## 2. Dapatkan Chat ID

**Cara 1: Menggunakan Bot**
1. Cari bot Anda di Telegram (username yang tadi dibuat)
2. Klik **START** atau kirim pesan `/start`
3. Buka di browser: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Cari `"chat":{"id":123456789}` dan copy angka tersebut

**Cara 2: Menggunakan @userinfobot**
1. Cari **@userinfobot** di Telegram
2. Klik **START**
3. Bot akan menampilkan Chat ID Anda

## 3. Setup Environment Variables

1. Copy file `.env.local.example` menjadi `.env.local`:
   ```bash
   Copy-Item .env.local.example .env.local
   ```

2. Edit `.env.local` dan isi dengan credentials Telegram:
   ```env
   TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   TELEGRAM_CHAT_ID=987654321
   ```

## 4. Test Setup

1. Restart development server:
   ```bash
   npm run dev
   ```

2. Buka portfolio di browser: `http://localhost:3000`

3. Anda akan menerima notifikasi di Telegram dengan info:
   - 📅 Waktu kunjungan
   - 📄 Halaman yang dikunjungi
   - 🌐 Lokasi (negara & kota)
   - 💻 Browser, OS, dan Device type
   - 🔗 Referrer (dari mana visitor datang)

## 5. Fitur Tracking

- ✅ Auto-track setiap kali ada visitor baru
- ✅ Track perpindahan halaman
- ✅ Deteksi lokasi berdasarkan IP
- ✅ Parse browser, OS, dan device type
- ✅ Tampilkan referrer source
- ✅ Format pesan yang rapi dan informatif

## 6. Privacy Note

Sistem ini mencatat:
- IP address (untuk mendeteksi lokasi)
- User Agent (untuk mendeteksi browser/device)
- Page yang dikunjungi
- Referrer

Pastikan ini sesuai dengan privacy policy website Anda.

## 7. Troubleshooting

**Tidak menerima notifikasi?**
- Pastikan bot token dan chat ID benar
- Pastikan sudah klik START di bot Telegram
- Check console browser untuk error
- Check terminal server untuk error log

**Location tidak muncul?**
- IP lokal (127.0.0.1) tidak bisa dideteksi lokasinya
- Deploy ke production untuk test location feature
- Free tier ipapi.co: 1000 requests/day

**Terlalu banyak notifikasi?**
- Tambahkan debounce/throttle di tracking code
- Atau track hanya initial visit (hapus routeChangeComplete listener)
