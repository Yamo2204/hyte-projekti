*** Settings ***
Documentation     Task 6: login with encrypted username and password.
Resource          resources/common.resource
Resource          resources/encrypted.resource
Test Setup        Open Application
Test Teardown     Close Application

*** Test Cases ***
User Can Log In With Encrypted Credentials
    Login With Encrypted Credentials
    ${current_url}=    Get Url
    Should Be Equal As Strings    ${current_url}    ${HOME_URL}
