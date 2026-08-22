param(
    [string]$Langs = "ko,en,ja"
)

$ErrorActionPreference = "Continue"
$logFile = "D:\TL\logs\translation_loop.log"
$logDir = Split-Path $logFile -Parent
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }

function Write-Log { param([string]$Msg) "$(Get-Date -Format "yyyy-MM-dd HH:mm:ss") | $Msg" | Out-File -FilePath $logFile -Append -Encoding UTF8 }

Write-Log "=== Translation Loop Started for $Langs ==="

# Clean stale locks
Remove-Item "D:\TL\scripts\*.lock" -Force -ErrorAction SilentlyContinue

$maxLoops = 500
for ($i = 0; $i -lt $maxLoops; $i++) {
    Write-Log "=== Iteration $i ==="
    Remove-Item "D:\TL\scripts\*.lock" -Force -ErrorAction SilentlyContinue
    
    $result = node D:\TL\scripts\translate_oracle.cjs interpretations --lang=$Langs 2>&1
    $exitCode = $LASTEXITCODE
    Write-Log "Exit code: $exitCode"
    
    foreach ($line in $result[-5..-1]) { Write-Log "  $line" }
    
    if ($exitCode -eq 0) {
        Write-Log "✅ Process completed normally - all languages might be done"
        Start-Sleep -Seconds 3
    } else {
        Write-Log "⚠️  Process exited with code $exitCode - will retry"
        Start-Sleep -Seconds 5
    }
}

Write-Log "=== Translation Loop Ended ==="
