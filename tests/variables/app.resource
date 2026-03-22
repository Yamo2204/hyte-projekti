*** Variables ***
${LOGIN_URL}                 ${APP_URL}/login
${HOME_URL}                  ${APP_URL}/
${NEW_ENTRY_URL}             ${APP_URL}/entries/new
${USERNAME_INPUT}            css=[data-testid="username"]
${PASSWORD_INPUT}            css=[data-testid="password"]
${LOGIN_BUTTON}              css=[data-testid="login-submit"]
${LOGIN_SUCCESS_MARKER}      css=[data-testid="dashboard"]
${NEW_ENTRY_BUTTON}          css=[data-testid="new-entry"]
${ENTRY_TITLE_INPUT}         css=[data-testid="entry-title"]
${ENTRY_CONTENT_INPUT}       css=[data-testid="entry-content"]
${SAVE_ENTRY_BUTTON}         css=[data-testid="save-entry"]
${LATEST_ENTRY_MARKER}       css=#entries [data-testid="entry-card"]:first-child
