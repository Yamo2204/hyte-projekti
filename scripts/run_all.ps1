$ErrorActionPreference = 'Stop'

& "$PSScriptRoot\run_web_tests.ps1"
& "$PSScriptRoot\run_api_tests.ps1"
& "$PSScriptRoot\publish_reports.ps1"

Write-Host 'All test commands completed.'
