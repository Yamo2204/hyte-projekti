*** Settings ***
Documentation     Task 4 template: create a new diary entry.
Resource          resources/common.resource
Test Setup        Open Application
Test Teardown     Close Application

*** Test Cases ***
User Can Create A New Diary Entry
    Login With Environment Credentials
    Create Diary Entry    Robot diary note    Created by an automated test.
    ${entry_text}=    Get Text    ${LATEST_ENTRY_MARKER}
    Should Contain    ${entry_text}    Robot diary note
