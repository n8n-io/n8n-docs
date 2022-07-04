# Drift

You can use these credentials to authenticate the following nodes with Drift.
- [Drift](/workflow/integrations/nodes/workflow-nodes-base.drift/)

## Prerequisites

Create a [Drift](https://www.drift.com/) account.

## Using OAuth

!!! note "⛅️ Note fordoc2app.cloudintegration.eu users"
    You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Drift account to Workflow².


1. Access your [Drift apps](https://dev.drift.com/apps) page.
2. Click on the ***Build Your App*** button. You can also select an existing app if you already have one.
3. Enter a name in the ***App name*** field.
4. Click on 'Oauth & Scopes' in the sidebar.
5. Copy your OAuth Callback URL from the 'Create New Credentials' screen in Doc², paste in the ***Add Redirect URL*** field, and click on the ***Add*** button.
6. Click on 'App Credentials' in the sidebar.
7. Use the ***Client ID*** and ***Secret ID*** with your Drift OAuth2 API node credentials in Workflow².
8. Click on the circle button in the OAuth section to connect your Drift account to Workflow².
9. Click the ***Save*** button to save your credentials.

![Getting Drift OAuth credentials](/_images/integrations/credentials/drift/using-oauth.gif)


## Using Access Token

1. Access [your Drift apps](https://dev.drift.com/apps).
2. Select your App (or create a new one).
3. Click on "Manage".
4. Click on "Installing to Drift".
5. Use token with your Drift Node credentials in Workflow².

![Getting Drift credentials](/_images/integrations/credentials/drift/using-access-token.gif)
