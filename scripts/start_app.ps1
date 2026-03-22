$ErrorActionPreference = 'Stop'

$python = 'C:/Users/yamam/AppData/Local/Programs/Python/Python313/python.exe'

Write-Host 'Starting diary app on http://localhost:3000 ...'
Write-Host 'Press Ctrl+C to stop.'
Write-Host ''

& $python diary_app.py
