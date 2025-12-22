# PowerShell Script untuk Clear Visitor Logs
# File: clear-visitor-logs.ps1

# ============================================
# Clear Visitor Logs
# ============================================

$logFile = Join-Path $PSScriptRoot "logs\visitors.json"

Write-Host "🗑️ Clearing visitor logs..." -ForegroundColor Cyan

if (Test-Path $logFile) {
    try {
        Remove-Item $logFile -Force
        Write-Host "✅ Visitor logs cleared successfully!" -ForegroundColor Green
        Write-Host "   File: $logFile" -ForegroundColor Gray
    } catch {
        Write-Host "❌ Error clearing logs:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⚠️ Log file not found (already empty)" -ForegroundColor Yellow
    Write-Host "   File: $logFile" -ForegroundColor Gray
}

Write-Host ""
Write-Host "📝 Cleared at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
