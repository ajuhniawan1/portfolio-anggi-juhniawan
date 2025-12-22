# PowerShell Script untuk Setup Windows Task Scheduler
# File: setup-scheduled-task.ps1
# Run as Administrator

# ============================================
# CONFIGURATION (Ambil dari .env.local)
# ============================================

$envFile = Join-Path $PSScriptRoot ".env.local"

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^BATCH_NOTIFICATION_INTERVAL_MINUTES=(.+)$') {
            $intervalMinutes = [int]$matches[1].Trim()
        }
    }
} else {
    Write-Host "❌ File .env.local tidak ditemukan!" -ForegroundColor Red
    exit 1
}

if (-not $intervalMinutes) {
    Write-Host "❌ BATCH_NOTIFICATION_INTERVAL_MINUTES tidak ditemukan di .env.local!" -ForegroundColor Red
    exit 1
}

# ============================================
# Parse Interval
# ============================================

Write-Host "📋 Setting up notification interval: $intervalMinutes minutes" -ForegroundColor Cyan
Write-Host ""

# ============================================
# Setup Task Scheduler
# ============================================

$taskName = "Portfolio Visitor Report"
$scriptPath = Join-Path $PSScriptRoot "send-visitor-report.ps1"

Write-Host "🔧 Setting up Windows Task Scheduler..." -ForegroundColor Cyan
Write-Host "   Task Name: $taskName" -ForegroundColor Gray
Write-Host "   Script: $scriptPath" -ForegroundColor Gray
Write-Host ""

# Check if task already exists
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host "⚠️ Task already exists. Removing old task..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Create action
$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -File `"$scriptPath`"" `
    -WorkingDirectory $PSScriptRoot

# Create trigger based on interval
Write-Host "⏰ Creating trigger: Every $intervalMinutes minutes" -ForegroundColor Green

$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1)
$trigger.Repetition = $(New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes $intervalMinutes) -RepetitionDuration ([TimeSpan]::MaxValue)).Repetition

# Create settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable

# Register task
try {
    Register-ScheduledTask `
        -TaskName $taskName `
        -Action $action `
        -Trigger $trigger `
        -Settings $settings `
        -Description "Send portfolio visitor report to Telegram every $intervalMinutes minutes" `
        -User $env:USERNAME `
        -RunLevel Limited
    
    Write-Host ""
    Write-Host "✅ Task Scheduler berhasil dibuat!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Task Details:" -ForegroundColor Cyan
    
    $task = Get-ScheduledTask -TaskName $taskName
    Write-Host "   Status: $($task.State)" -ForegroundColor Gray
    Write-Host "   Next Run: $((Get-ScheduledTaskInfo -TaskName $taskName).NextRunTime)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "💡 Tips:" -ForegroundColor Yellow
    Write-Host "   • Lihat task di Task Scheduler: taskschd.msc" -ForegroundColor Gray
    Write-Host "   • Edit cron di .env.local lalu run script ini lagi" -ForegroundColor Gray
    Write-Host "   • Test manual: .\send-visitor-report.ps1" -ForegroundColor Gray
    Write-Host "   • Hapus task: Unregister-ScheduledTask -TaskName '$taskName'" -ForegroundColor Gray
    
} catch {
    Write-Host ""
    Write-Host ""
    Write-Host "💡 Tips:" -ForegroundColor Yellow
    Write-Host "   • Lihat task di Task Scheduler: taskschd.msc" -ForegroundColor Gray
    Write-Host "   • Edit interval di .env.local lalu run script ini lagi" -ForegroundColor Gray
    Write-Host "   • Test manual: .\send-visitor-report.ps1" -ForegroundColor Gray
    Write-Host "   • Hapus task: Unregister-ScheduledTask -TaskName '$taskName'" -ForegroundColor Gray
