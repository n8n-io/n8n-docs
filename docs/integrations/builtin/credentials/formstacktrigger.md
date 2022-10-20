# Formstack Trigger

You can use these credentials to authenticate the following nodes:

- [Formstack Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.formstackTrigger/)

## Prerequisites

Create a [Formstack](https://www.formstack.com/) account.

## Using Access token

After creating your Formstack account: 

1. From the user menu select **API**.
2. Select **New Application**.
3. In the *Create Application* window enter the following:
    * *Application Name*: Provide a descriptive name.
    * *Redirect URI*: Enter the OAuth callback URL for your n8n instance in the format `http://<n8n_url>/rest/oauth2-credential/callback`. For example `http://localhost:5678/rest/oauth2-credential/callback`.
    * *Description*: Enter a brief description.
    * *Platform*: Select **Website**.
4. Click **Create Application**.
5. Copy the *Access Token* for your new application.

From n8n:

6. Enter a descriptive ***Credentials Name***.
7. Enter your Formstack ***Access Token***.
8. Click **Create** to save your new credentials.

## Using OAuth2

After creating your Formstack account: 

1. From the user menu select **API**.
2. Select **New Application**.
3. In the *Create Application* window enter the following:
    * *Application Name*: Provide a descriptive name.
    * *Redirect URI*: Enter the OAuth callback URL for your n8n instance in the format `http://<n8n_url>/rest/oauth2-credential/callback`. For example `http://localhost:5678/rest/oauth2-credential/callback`.
    * *Description*: Enter a brief description.
    * *Platform*: Select **Website**.
4. Click **Create Application**.
5. Select your new application to view the *Application Details*.
6. Copy the *Client ID* and *Client Secret*.

From n8n:

7. Enter a descriptive ***Credentials Name***.
8. Enter your Formstack ***Client ID***.
9. Enter your Formstack ***Client Secret***.
10. Click the circle button to initiate the OAuth2 flow.
11. In the modal window select **Authorize**.
12. Click **Create** to save your new credentials.
