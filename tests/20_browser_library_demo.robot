*** Settings ***
Documentation     Task 3 example against a public demo form page.
Library           Browser
Suite Setup       New Browser    chromium    headless=${FALSE}
Suite Teardown    Close Browser

*** Variables ***
${WEB_FORM_URL}           https://www.selenium.dev/selenium/web/web-form.html
${SUCCESS_MESSAGE}        id=message

*** Test Cases ***
Browser Library Can Fill A Public Web Form
    New Context
    New Page       ${WEB_FORM_URL}
    Fill Text      [name="my-text"]                Robot Framework
    Fill Text      [name="my-password"]            secret
    Fill Text      [name="my-textarea"]            Browser Library demo run.
    Select Options By    [name="my-select"]        text    Two
    Check Checkbox  [id="my-check-1"]
    Click          button
    Wait For Elements State    ${SUCCESS_MESSAGE}    visible    10s
    ${message}=    Get Text    ${SUCCESS_MESSAGE}
    Should Be Equal As Strings    ${message}    Received!
