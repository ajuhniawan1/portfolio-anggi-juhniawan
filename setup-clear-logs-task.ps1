# PowerShell Script untuk Setup Scheduled Task - Clear Visitor Logs
# File: setup-clear-logs-task.ps1
# Run as Administrator

# ============================================
# CONFIGURATION
# ============================================

$taskName = "Clear Portfolio Visitor Logs"
$scriptPath = Join-Path $PSScriptRoot "clear-visitor-logs.ps1"
$clearTime = "22:00"  # 10 PM

Write-Host "🔧 Setting up scheduled task to clear logs..." -ForegroundColor Cyan
Write-Host "   Task Name: $taskName" -ForegroundColor Gray
Write-Host "   Script: $scriptPath" -ForegroundColor Gray
Write-Host "   Schedule: Daily at $clearTime" -ForegroundColor Gray
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

# Create trigger - Daily at 10 PM
$trigger = New-ScheduledTaskTrigger -Daily -At $clearTime

# Create settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable:$false

# Register task
try {
    Register-ScheduledTask `
        -TaskName $taskName `
        -Action $action `
        -Trigger $trigger `
        -Settings $settings `
        -Description "Clear portfolio visitor logs daily at 10 PM" `
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
    Write-Host "   • Test manual: .\clear-visitor-logs.ps1" -ForegroundColor Gray
    Write-Host "   • Hapus task: Unregister-ScheduledTask -TaskName '$taskName'" -ForegroundColor Gray
    
} catch {
    Write-Host ""
    Write-Host "❌ Error creating scheduled task:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Try running PowerShell as Administrator" -ForegroundColor Yellow
    exit 1
}
