*** Settings ***
Documentation     Verifies that encrypted values can be decrypted in this project setup.
Resource          resources/encrypted.resource

*** Test Cases ***
Encrypted Values Are Configured Or Skipped Cleanly
    IF    '${ENCRYPTED_USERNAME}' == '' or '${ENCRYPTED_PASSWORD}' == ''
        Skip    No encrypted values configured in .env yet.
    END
    ${username}=    Get Decrypted Text    ${ENCRYPTED_USERNAME}
    ${password}=    Get Decrypted Text    ${ENCRYPTED_PASSWORD}
    Should Not Be Empty    ${username}
    Should Not Be Empty    ${password}
