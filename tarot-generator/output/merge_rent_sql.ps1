
$p1 = "rent_oracle_data_part1.sql"
$p2 = "rent_oracle_data_part2.sql"
$out = "rent_oracle_data_v1.sql"

if (Test-Path $p1) {
    if (Test-Path $p2) {
        # Force read as UTF8 (even if no BOM) and write as UTF8
        $c1 = Get-Content $p1 -Encoding UTF8
        $c2 = Get-Content $p2 -Encoding UTF8
        $c1 + $c2 | Set-Content $out -Encoding UTF8
        Write-Host "✅ Merged $p1 and $p2 to $out (UTF-8)"
    } else {
        Write-Host "⚠️ Part 2 not found yet"
    }
} else {
    Write-Host "⚠️ Part 1 not found yet"
}
