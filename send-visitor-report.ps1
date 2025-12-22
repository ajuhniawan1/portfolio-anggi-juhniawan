# PowerShell Script untuk Scheduled Batch Notification
# File: send-visitor-report.ps1

# ============================================
# CONFIGURATION (Ambil dari .env.local)
# ============================================

# Baca .env.local file
$envFile = Join-Path $PSScriptRoot ".env.local"

if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.+)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            Set-Variable -Name $key -Value $value -Scope Script
        }
    }
} else {
    Write-Host "❌ File .env.local tidak ditemukan!" -ForegroundColor Red
    exit 1
}

# ============================================
# API Configuration
# ============================================

$apiUrl = "http://localhost:3000/api/send-batch-notification"
# Untuk production, ganti dengan domain Anda:
# $apiUrl = "https://your-domain.com/api/send-batch-notification"

$headers = @{
    "Authorization" = "Bearer $BATCH_NOTIFICATION_SECRET"
}

# ============================================
# Send Notification
# ============================================

Write-Host "📊 Sending visitor report..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri $apiUrl -Method POST -Headers $headers -UseBasicParsing
    
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Notification sent successfully!" -ForegroundColor Green
        
        $result = $response.Content | ConvertFrom-Json
        Write-Host "   Message: $($result.message)" -ForegroundColor Gray
        
        if ($result.summary) {
            Write-Host "   Total Visitors: $($result.summary.totalVisitors)" -ForegroundColor Gray
            Write-Host "   New Visitors: $($result.summary.newVisitors)" -ForegroundColor Gray
            Write-Host "   Returning: $($result.summary.returningVisitors)" -ForegroundColor Gray
        }
    } else {
        Write-Host "⚠️ Unexpected response code: $($response.StatusCode)" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Error sending notification:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "   Status Code: $statusCode" -ForegroundColor Red
        
        if ($statusCode -eq 401) {
            Write-Host "   Check BATCH_NOTIFICATION_SECRET in .env.local" -ForegroundColor Yellow
        }
    }
    
    exit 1
}

Write-Host ""
Write-Host "📝 Log time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
