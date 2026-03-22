# Robot Framework assignment project

This is a **complete and self-contained** Robot Framework assignment.
The test target is a local diary web application (`diary_app.py`) that runs on your machine.
You do not need any external application.

## Project structure

```
diary_app.py                    <- the diary application (Flask, port 3000)
requirements.txt                <- Python dependencies
.env                            <- credentials and config
tests/
	10_login.robot                <- Task 2 : UI login test
	11_create_entry.robot         <- Task 4 : create diary entry
	12_login_encrypted_template.robot  <- Task 6 : encrypted credentials
	13_crypto_smoke.robot         <- Task 6 : verify decryption works
	20_browser_library_demo.robot <- Task 3 : Browser Library demo (public form)
	30_api_tests.robot            <- Task 9 : REST API tests
	resources/
		common.resource             <- shared Browser keywords
		encrypted.resource          <- CryptoLibrary keywords
	variables/
		app.resource                <- selectors and URL variables
		env_loader.py               <- loads .env into Robot variables
	keys/                         <- CryptoLibrary key pair (already generated)
scripts/
	setup.ps1                     <- install dependencies (run once)
	start_app.ps1                 <- start the diary app
	run_web_tests.ps1             <- run Tasks 2, 4, 6, 3
	run_api_tests.ps1             <- run Task 9
	run_all.ps1                   <- run all suites
	publish_reports.ps1           <- copy outputs to docs/reports
	generate_crypto_keys.py       <- Task 6 helper: generate key pair
	encrypt_secret.py             <- Task 6 helper: encrypt a value
outputs/                        <- Robot Framework outputs
docs/                           <- GitHub Pages site
	index.html
	reports/                      <- published test reports
```

## Initial setup (run once)

```powershell
.\scripts\setup.ps1
```

## Step 1 – Start the diary application

Open a **separate PowerShell window** and run:

```powershell
.\scripts\start_app.ps1
```

The app starts at **http://localhost:3000**. Keep this window open while running tests.

> Login: `test.user@example.com` / `change-me`

## Step 2 – Run the tests

```powershell
# Web tests (Tasks 2, 3, 4, 6)
.\scripts\run_web_tests.ps1

# API tests (Task 9)
.\scripts\run_api_tests.ps1

# All at once
.\scripts\run_all.ps1
```

## Step 3 – Publish reports to GitHub Pages

```powershell
.\scripts\publish_reports.ps1
```

Push to GitHub, then enable Pages for the `docs/` folder.

---

## Task 6: encrypted credentials

The keys and encrypted values are **already generated** in this repository.  
The encrypted `test.user@example.com` and `change-me` values are already in `.env`.  
No extra steps needed to run the Task 6 suite.

To regenerate with a new password:

```powershell
# 1. New key pair
python scripts/generate_crypto_keys.py --password "NEW-PASSWORD"

# 2. Encrypt username
python scripts/encrypt_secret.py --text "test.user@example.com"

# 3. Encrypt password
python scripts/encrypt_secret.py --text "change-me"
```

Paste the `crypt:...` values into `.env` as `ENCRYPTED_USERNAME` / `ENCRYPTED_PASSWORD`.

---

## Task coverage

| Task | What covers it |
|------|----------------|
| 1 | `requirements.txt` + `scripts/setup.ps1` |
| 2 | `tests/10_login.robot` |
| 3 | `tests/20_browser_library_demo.robot` |
| 4 | `tests/11_create_entry.robot` |
| 5 | `.env` + `tests/variables/env_loader.py` |
| 6 | `tests/12_login_encrypted_template.robot` + `tests/13_crypto_smoke.robot` |
| 7 | `outputs/` |
| 8 | `docs/` + `scripts/publish_reports.ps1` |
| 9 | `tests/30_api_tests.robot` |
| 10 | This README |
