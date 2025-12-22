# Batch Visitor Notification Setup

## Overview
Sistem tracking visitor sudah diubah menjadi batch notification. Setiap visitor disimpan dulu, lalu dikirim summary report setiap jam tertentu (bisa diatur).

## Cara Kerja

### 1. Data Collection
- Setiap visitor yang mengunjungi portfolio akan disimpan ke file `logs/visitors.json`
- Data yang disimpan per IP:
  - Pages yang dikunjungi (dengan counter)
  - Browser, OS, Device info
  - Lokasi (country, city)
  - First visit & last visit timestamp

### 2. Batch Notification
- Kirim summary report via Telegram setiap waktu tertentu (bisa diatur)
- Report berisi:
  - Total visitors (new vs returning)
  - Top pages yang paling banyak dikunjungi
  - Top countries
  - Detail 5 visitor teratas
- Setelah kirim report, logs dikosongkan

## Setup

### A. Manual Trigger (Test)

Untuk test batch notification secara manual:

```bash
# PowerShell
$headers = @{
    "Authorization" = "Bearer portfolio_secret_2024_xyz123"
}
Invoke-WebRequest -Uri "http://localhost:3000/api/send-batch-notification" -Method POST -Headers $headers
```

```bash
# cURL
curl -X POST http://localhost:3000/api/send-batch-notification \
  -H "Authorization: Bearer portfolio_secret_2024_xyz123"
```

### B. Scheduled Task (Windows)

**Opsi 1: Task Scheduler (GUI)**

1. Buka **Task Scheduler** (Task Scheduler)
2. Klik **Create Basic Task**
3. Name: `Portfolio Visitor Report`
4. Trigger: **Daily** at **08:00 AM**
5. Action: **Start a program**
   - Program: `powershell.exe`
   - Arguments:
     ```
     -Command "$headers = @{'Authorization' = 'Bearer portfolio_secret_2024_xyz123'}; Invoke-WebRequest -Uri 'https://your-domain.com/api/send-batch-notification' -Method POST -Headers $headers"
     ```

**Opsi 2: PowerShell Script (Recommended) - OTOMATIS DARI ENV**

Setup otomatis menggunakan script yang sudah disediakan:

```powershell
# 1. Test manual trigger dulu
.\send-visitor-report.ps1

# 2. Setup scheduled task (run as Administrator)
.\setup-scheduled-task.ps1
```

Script `setup-scheduled-task.ps1` akan:
- ✅ Otomatis baca `BATCH_NOTIFICATION_CRON` dari `.env.local`
- ✅ Parse cron format ke Windows Task Scheduler
- ✅ Support multiple hours (8,20 = pagi & malam)
- ✅ Support interval hours (*/6 = setiap 6 jam)
- ✅ Support weekday filter (1-5 = Senin-Jumat)

**Ganti jadwal:**
1. Edit `BATCH_NOTIFICATION_CRON` di `.env.local`
2. Run ulang: `.\setup-scheduled-task.ps1`
3. Script akan hapus task lama & buat yang baru

**Hapus task:**
```powershell
Unregister-ScheduledTask -TaskName "Portfolio Visitor Report" -Confirm:$false
```

### C. Cron Job (Linux/Deploy Server)

Edit crontab:
```bash
crontab -e
```

Tambahkan (kirim setiap jam 8 pagi):
```bash
0 8 * * * curl -X POST https://your-domain.com/api/send-batch-notification -H "Authorization: Bearer portfolio_secret_2024_xyz123"
```

**Atau dengan multiple times:**
```bash
# Jam 8 pagi dan 8 malam
0 8,20 * * * curl -X POST https://your-domain.com/api/send-batch-notification -H "Authorization: Bearer portfolio_secret_2024_xyz123"
```

### D. EasyCron atau Cron-Job.org (Cloud Cron)

Untuk hosting yang tidak support cron job:

1. Daftar di https://www.easycron.com/ (gratis)
2. Create New Cron Job:
   - URL: `https://your-domain.com/api/send-batch-notification`
   - Method: POST
   - Headers: `Authorization: Bearer portfolio_secret_2024_xyz123`
   - Schedule: Every day at 08:00 (timezone: Asia/Jakarta)

### E. Vercel Cron Jobs (Recommended for Vercel)

Jika deploy di Vercel, bisa pakai Vercel Cron:

1. Buat file `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/send-batch-notification",
      "schedule": "0 8 * * *"
    }
  ]
}
```

2. Update API untuk support Vercel Cron (sudah include Authorization check)

## Configuration

### Environment Variables

```env
# .env.local
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
BATCH_NOTIFICATION_SECRET=your_random_secret_here

# Batch Notification Schedule (Cron format)
BATCH_NOTIFICATION_CRON=0 8 * * *
```

### Cara Ganti Waktu Kirim

Edit file `.env.local` dan ubah `BATCH_NOTIFICATION_CRON`:

Cron format: `minute hour day month weekday`

**Contoh jadwal:**

```env
# Setiap jam 8 pagi
BATCH_NOTIFICATION_CRON=0 8 * * *

# Setiap jam 8 pagi dan 8 malam
BATCH_NOTIFICATION_CRON=0 8,20 * * *

# Setiap 6 jam (pukul 00:00, 06:00, 12:00, 18:00)
BATCH_NOTIFICATION_CRON=0 */6 * * *

# Setiap hari kerja jam 9 pagi
BATCH_NOTIFICATION_CRON=0 9 * * 1-5

# Setiap Senin jam 9 pagi
BATCH_NOTIFICATION_CRON=0 9 * * 1
```

Setelah ubah cron, jalankan ulang:
```powershell
.\setup-scheduled-task.ps1
```

### Generate Secret Baru

```bash
# PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Linux/Mac
openssl rand -base64 32
```

## Example Notification

```
📊 Portfolio Visitor Report
📅 19/12/2025, 08.00.00

👥 Total Visitors: 15
   • New: 8
   • Returning: 7

📄 Top Pages:
   • /projects: 45 views
   • /about: 23 views
   • /: 18 views
   • /contact: 12 views

🌍 Top Countries:
   • Indonesia: 10 visitors
   • United States: 3 visitors
   • Singapore: 2 visitors

👤 Visitor Details:

1. 🆕 103.xxx.xxx.xxx
   📍 Jakarta, Indonesia
   💻 Chrome on Windows
   📊 5 page views
   📄 Pages: /projects (2), /about (2), / (1)

2. 🔄 202.xxx.xxx.xxx
   📍 Bandung, Indonesia
   💻 Firefox on macOS
   📊 8 page views
   📄 Pages: /projects (4), /contact (3), / (1)

... and 13 more visitors
```

## Troubleshooting

**Tidak menerima notifikasi?**
- Check logs file: `logs/visitors.json` (harus ada data)
- Test manual trigger dulu
- Pastikan secret token benar
- Check Telegram bot token & chat ID

**Scheduled task tidak jalan?**
- Check task scheduler history
- Pastikan script path benar
- Run PowerShell as Administrator
- Check execution policy: `Set-ExecutionPolicy RemoteSigned`

**Data tidak tersimpan?**
- Check folder `logs/` exists dan writable
- Check file permissions
- Lihat console log di browser/server

## Security Notes

- **BATCH_NOTIFICATION_SECRET** harus random dan sulit ditebak
- Jangan commit secret ke Git
- Gunakan HTTPS di production
- Limit rate di API endpoint jika perlu
