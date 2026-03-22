$ErrorActionPreference = 'Stop'

$source = Join-Path $PSScriptRoot '..\outputs'
$target = Join-Path $PSScriptRoot '..\docs\reports'

New-Item -ItemType Directory -Path $target -Force | Out-Null

$files = @('log.html', 'report.html', 'output.xml')

foreach ($file in $files) {
    $sourceFile = Join-Path $source $file
    if (Test-Path $sourceFile) {
        Copy-Item $sourceFile $target -Force
    }
}

Write-Host 'Reports copied to docs/reports'
