*** Settings ***
Documentation     Task 2 template: login test for the diary application.
Resource          resources/common.resource
Test Setup        Open Application
Test Teardown     Close Application

*** Test Cases ***
User Can Log In With Environment Credentials
    Login With Environment Credentials
    ${current_url}=    Get Url
    Should Be Equal As Strings    ${current_url}    ${HOME_URL}
