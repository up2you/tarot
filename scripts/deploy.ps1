# ============================================================
# Aetheris 一鍵部署腳本
# 用法：powershell -File scripts/deploy.ps1 -Message "你的更新說明"
# 流程：git add → commit → push → GitHub 備份 + Vercel 自動部署
# ============================================================

param(
    [Parameter(Mandatory = $false)]
    [string]$Message = "update: 例行更新與部署",

    [switch]$NoCommit,   # 只 push 不 commit（用於已 commit 的情況）
    [switch]$SkipEnv     # 跳過環境檢查
)

$ErrorActionPreference = "Stop"
$GIT = "D:\tools\PortableGit\cmd\git.exe"
$REPO = "D:\TL"

if (-not $SkipEnv) {
    # 檢查 git 存在
    if (-not (Test-Path $GIT)) {
        Write-Host "❌ 找不到 git：$GIT" -ForegroundColor Red
        exit 1
    }

    # 檢查是否有未提交變更
    $status = & $GIT -C $REPO status --short 2>$null
    if (-not $status) {
        Write-Host "✅ 工作目錄乾淨，無需提交" -ForegroundColor Green
        if (-not $NoCommit) {
            # 沒有變更就不需要 push，直接結束
            Write-Host "（沒有新變更，部署已完成）" -ForegroundColor Yellow
            exit 0
        }
    }
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 Aetheris 部署流程啟動" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. 暫存所有變更
if (-not $NoCommit) {
    Write-Host "`n[1/3] 暫存變更..." -ForegroundColor Yellow
    & $GIT -C $REPO add -A 2>&1 | Out-Null
    $staged = & $GIT -C $REPO status --short 2>$null
    $count = ($staged | Measure-Object).Count
    Write-Host "  已暫存 $count 個檔案變更"
}

# 2. 提交
if (-not $NoCommit) {
    Write-Host "`n[2/3] 提交..." -ForegroundColor Yellow
    & $GIT -C $REPO commit -m $Message 2>&1 | ForEach-Object { Write-Host "  $_" }
}

# 3. Push（觸發 Vercel 自動部署）
Write-Host "`n[3/3] Push 到 GitHub（將自動觸發 Vercel 部署）..." -ForegroundColor Yellow
# -c credential.helper= ：繞過 credential helper（PortableGit 在無互動環境會卡在 helper 等待）
# remote URL 已內嵌認證 token（存在 .git/config，不會上傳 GitHub）
& $GIT -C $REPO -c credential.helper= push origin main 2>&1 | ForEach-Object { Write-Host "  $_" }
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Push 失敗！請確認 GitHub 認證。" -ForegroundColor Red
    exit 1
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✅ 部署完成！" -ForegroundColor Green
Write-Host "   GitHub 備份: https://github.com/up2you/tarot" -ForegroundColor Green
Write-Host "   Vercel 部署: 自動進行中（可在 Vercel Dashboard 查看）" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# 4. 顯示最新 commit
$latest = & $GIT -C $REPO log --oneline -1 2>$null
Write-Host "`n最新 commit: $latest"
# deploy script v1.0
# Permanent deploy token configured
