# Assignment completion guide

This file maps the repository contents to the 10 course tasks.

## Task 1

- Install dependencies with `scripts/setup.ps1`.
- Browser Library and RequestsLibrary are included.
- CryptoLibrary support is implemented with the correct package `robotframework-crypto`.

## Task 2

- Use `tests/10_login.robot` for the login test of your diary application.

## Task 3

- Use `tests/20_browser_library_demo.robot` as the required Browser Library demo.

## Task 4

- Use `tests/11_create_entry.robot` to automate creation of a new diary entry.

## Task 5

- Store plain username and password in `.env`.
- They are loaded through `tests/variables/env_loader.py`.

## Task 6

- Generate keys with `scripts/generate_crypto_keys.py`.
- Encrypt username and password with `scripts/encrypt_secret.py`.
- Save them as `ENCRYPTED_USERNAME` and `ENCRYPTED_PASSWORD` in `.env`.
- Run `tests/12_login_encrypted_template.robot`.

## Task 7

- All reports are written to `outputs/`.

## Task 8

- Run `scripts/publish_reports.ps1` to copy the latest report files into `docs/reports/`.
- Publish the `docs/` folder with GitHub Pages.

## Task 9

- Use `tests/30_api_tests.robot` to cover backend endpoints.
- Replace the placeholder endpoint paths and assertions with your real API details.

## Task 10

- Use `README.md` and this document as the Markdown documentation for the assignment.
- Add screenshots and short notes after you run the tests on your own application.
