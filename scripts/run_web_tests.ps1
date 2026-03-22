$ErrorActionPreference = 'Stop'

robot --outputdir outputs tests/10_login.robot tests/11_create_entry.robot tests/12_login_encrypted_template.robot tests/20_browser_library_demo.robot
