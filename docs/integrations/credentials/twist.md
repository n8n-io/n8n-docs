# Twist

You can use these credentials to authenticate the following nodes with Twist.

- [Twist](/integrations/nodes/n8n-nodes-base.twist/)

## Prerequisites

Create a [Twist](https://twist.com/) account.

## Using OAuth

!!! note " Callback URL with Twist"
    **Note:** The Redirect URL should be a URL in your domain. For example, `https://mytemplatemaker.example.com/gr_callback`. Twist doesn't accept the localhost callback URL. Refer to the [FAQs](#how-to-configure-the-oauth-credentials-for-the-local-environment) to learn to configure the credentials for the local environment.


1. Access your [Twist](https://twist.com) workspace.
2. Click on your avatar in the top right corner.
3. Select 'Add integrations...' from the dropdown list.
4. Click on ***Build*** on the top.
5. Click on the ***Add a new integration*** button.
6. Enter a name in the ***Integration name*** field.
7. Enter a description in the ***Description*** field.
8. Select 'General integration' from the ***Integration type*** dropdown list.
9. Click on the ***Create my integration*** button.
10. Click on ***OAuth Authentication*** from the left sidebar.
11. Copy the 'OAuth Callback URL' provided in the Twist OAuth2 API credentials in n8n and paste it in the ***OAuth 2 redirect URL*** field on your Twist integration page.
12. Click on the ***Update integration*** button.
13. Use the ***Client ID*** and ***Client Secret*** with your Twist node credentials in n8n.
14. Click on the circle button in the OAuth section to connect a Twist account to n8n.
15. Click the ***Save*** button to save your credentials in n8n.

![Getting Twist credentials](/_images/integrations/credentials/twist/using-oauth.gif)

## FAQs

### How to configure the OAuth credentials for the local environment?
Twist doesn't accept the localhost callback  URL. However, you can follow the steps mentioned below to configure the OAuth credentials for the local environment:
1. We will use [ngrok](https://ngrok.com/) to expose the local server running on port `5678` to the internet. In your terminal, run the following command:
```sh
ngrok http 5678
```
2. Run the following command in a new terminal. Replace `<YOUR-NGROK-URL>` with the URL that you get from the previous step.
```sh
export WEBHOOK_URL=<YOUR-NGROK-URL>
```
3. Start your n8n instance.
4. Follow the instructions mentioned in the [Using OAuth](#using-oauth) section to configure your credentials.
