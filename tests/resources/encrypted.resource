*** Settings ***
Variables         ../variables/env_loader.py
Library           CryptoLibrary    ${CRYPTO_PRIVATE_KEY_PASSWORD}    variable_decryption=False    key_path=${CURDIR}${/}..${/}keys
Resource          ../variables/app.resource

*** Keywords ***
Login With Encrypted Credentials
    IF    '${ENCRYPTED_USERNAME}' == '' or '${ENCRYPTED_PASSWORD}' == ''
        Skip    Generate encrypted credentials first and place them in .env.
    END
    ${username}=    Get Decrypted Text    ${ENCRYPTED_USERNAME}
    ${password}=    Get Decrypted Text    ${ENCRYPTED_PASSWORD}
    Suppress Logging
    Fill Text      ${USERNAME_INPUT}    ${username}
    Fill Text      ${PASSWORD_INPUT}    ${password}
    Unsuppress Logging
    Click          ${LOGIN_BUTTON}
    Wait For Elements State    ${LOGIN_SUCCESS_MARKER}    visible    10s
