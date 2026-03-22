$ErrorActionPreference = 'Stop'

$python = 'C:/Users/yamam/AppData/Local/Programs/Python/Python313/python.exe'

& $python -m pip install -r requirements.txt
& $python -m Browser.entry init

if (-not (Test-Path '.env') -and (Test-Path '.env.example')) {
    Copy-Item '.env.example' '.env'
    Write-Host 'Created .env from .env.example'
}

Write-Host 'Setup completed.'
