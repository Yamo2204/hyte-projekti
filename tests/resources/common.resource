*** Settings ***
Library           Browser
Variables         ../variables/env_loader.py
Resource          ../variables/app.resource

*** Keywords ***
Open Application
    New Browser    chromium    headless=${FALSE}
    New Context
    New Page       ${LOGIN_URL}

Close Application
    Close Browser

Login With Environment Credentials
    Fill Text      ${USERNAME_INPUT}    ${TEST_USERNAME}
    Fill Text      ${PASSWORD_INPUT}    ${TEST_PASSWORD}
    Click          ${LOGIN_BUTTON}
    Wait For Elements State    ${LOGIN_SUCCESS_MARKER}    visible    10s

Create Diary Entry
    [Arguments]    ${title}    ${content}
    Go To          ${NEW_ENTRY_URL}
    Fill Text      ${ENTRY_TITLE_INPUT}    ${title}
    Fill Text      ${ENTRY_CONTENT_INPUT}    ${content}
    Click          ${SAVE_ENTRY_BUTTON}
    Wait For Elements State    ${LATEST_ENTRY_MARKER}    visible    10s
