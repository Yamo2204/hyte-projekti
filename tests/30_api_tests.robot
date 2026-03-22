*** Settings ***
Documentation     Task 9: REST API tests for the diary application.
Library           RequestsLibrary
Variables         variables/env_loader.py

*** Variables ***
${LOGIN_ENDPOINT}         ${API_URL}/auth/login
${ENTRIES_ENDPOINT}       ${API_URL}/entries

*** Test Cases ***
Login Returns A Token
    [Documentation]    POST /api/auth/login with valid credentials returns 200 and a token.
    ${payload}=    Create Dictionary    username=${TEST_USERNAME}    password=${TEST_PASSWORD}
    ${response}=   POST    ${LOGIN_ENDPOINT}    json=${payload}    expected_status=200
    ${body}=       Evaluate    $response.json()
    Should Not Be Empty    ${body}[token]
    Log    Token received: ${body}[token]

Login With Wrong Password Returns 401
    [Documentation]    POST /api/auth/login with wrong password returns 401.
    ${payload}=    Create Dictionary    username=${TEST_USERNAME}    password=wrong-password
    ${response}=   POST    ${LOGIN_ENDPOINT}    json=${payload}    expected_status=anything
    Should Be Equal As Integers    ${response.status_code}    401

Authenticated User Can Create An Entry Via API
    [Documentation]    POST /api/entries with a valid token returns 201 and the created entry.
    ${auth_payload}=    Create Dictionary    username=${TEST_USERNAME}    password=${TEST_PASSWORD}
    ${auth}=            POST    ${LOGIN_ENDPOINT}    json=${auth_payload}    expected_status=200
    ${token}=           Evaluate    $auth.json()['token']
    ${headers}=         Create Dictionary    Authorization=Token ${token}
    ${body}=            Create Dictionary    title=API Test Entry    content=Written by Robot Framework RequestsLibrary.
    ${response}=        POST    ${ENTRIES_ENDPOINT}    json=${body}    headers=${headers}    expected_status=201
    ${entry}=           Evaluate    $response.json()['entry']
    Should Not Be Empty    ${entry}[id]
    Should Be Equal As Strings    ${entry}[title]    API Test Entry

Authenticated User Can List Entries Via API
    [Documentation]    GET /api/entries with a valid token returns 200 and an entries list.
    ${auth_payload}=    Create Dictionary    username=${TEST_USERNAME}    password=${TEST_PASSWORD}
    ${auth}=            POST    ${LOGIN_ENDPOINT}    json=${auth_payload}    expected_status=200
    ${token}=           Evaluate    $auth.json()['token']
    ${headers}=         Create Dictionary    Authorization=Token ${token}
    ${response}=        GET    ${ENTRIES_ENDPOINT}    headers=${headers}    expected_status=200
    ${body}=            Evaluate    $response.json()
    Should Contain    ${body}    entries
    Should Contain    ${body}    count

Unauthenticated Access To Entries Returns 401
    [Documentation]    GET /api/entries without Authorization header returns 401.
    ${response}=    GET    ${ENTRIES_ENDPOINT}    expected_status=anything
    Should Be Equal As Integers    ${response.status_code}    401

