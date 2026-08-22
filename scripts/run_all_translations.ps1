# Aetheris Oracle Translation Runner (fixed --lang format)
# Runs all remaining translations in sequence
# en (batchSize=25) → ko (batchSize=8) → ja (batchSize=8)
$LogFile = "D:\TL\scripts\translation_run.log"
$Env:NO_COLOR = "1"

function Log {
    param([string]$Msg)
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$Timestamp | $Msg" | Out-File -FilePath $LogFile -Append
}

Log "=== Translation Runner Started ==="
Set-Location D:\TL

# Run all three languages in one node invocation (--lang= format requires = sign)
Log "--- Running en,ko,ja translations ---"
node D:\TL\scripts\translate_oracle.cjs interpretations --lang=en,ko,ja 2>&1 | ForEach-Object {
    Log $_
}
$exitCode = $LASTEXITCODE
Log "All translations finished with exit code: $exitCode"

Log "=== Runner completed ==="
