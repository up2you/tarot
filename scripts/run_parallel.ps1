# Parallel translation runner — runs en, ko, ja concurrently
# Each language uses its own progress file to avoid race conditions
$LogDir = "D:\TL\scripts"
$WorkDir = "D:\TL"
$Env:NO_COLOR = "1"

function Start-LangTranslation {
    param([string]$Lang)
    $logFile = Join-Path $LogDir "run_${Lang}.log"
    $progressFile = Join-Path $LogDir "translate_progress_${Lang}.json"
    $stdoutFile = Join-Path $LogDir "stdout_${Lang}.log"
    $stderrFile = Join-Path $LogDir "stderr_${Lang}.log"
    
    $proc = Start-Process -WindowStyle Hidden -FilePath pwsh -ArgumentList @(
        "-NoProfile", "-ExecutionPolicy", "Bypass",
        "-Command", "node D:\TL\scripts\translate_oracle.cjs interpretations --lang=$Lang --progress-file=$progressFile 2>&1 | Tee-Object -FilePath '$logFile'"
    ) -PassThru -RedirectStandardOutput $stdoutFile -RedirectStandardError $stderrFile
    
    return $proc
}

$langs = @('en', 'ko', 'ja')
$procs = @{}

# Launch all three in parallel
foreach ($lang in $langs) {
    $proc = Start-LangTranslation $lang
    $procs[$lang] = $proc
    "$(Get-Date -Format 'HH:mm:ss') | Started $lang (PID $($proc.Id))" | Out-File -FilePath "D:\TL\scripts\parallel_run.log" -Append
}

# Monitor until all are done
$running = $true
while ($running) {
    Start-Sleep -Seconds 60
    $running = $false
    foreach ($lang in $langs) {
        $proc = $procs[$lang]
        if (-not $proc.HasExited) {
            $running = $true
        }
    }
}

"$(Get-Date -Format 'HH:mm:ss') | All translations completed!" | Out-File -FilePath "D:\TL\scripts\parallel_run.log" -Append
