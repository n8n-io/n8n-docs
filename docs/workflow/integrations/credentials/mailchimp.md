# Mailchimp

You can use these credentials to authenticate the following nodes with Mailchimp.
- [Mailchimp](/workflow/integrations/nodes/n8n-nodes-base.mailchimp/)
- [Mailchimp Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.mailchimpTrigger/)

## Prerequisites

Create a [Mailchimp](https://www.mailchimp.com/) account.

## Using OAuth

!!! note "⛅️ Note fordoc2app.cloudintegration.eu users"
    You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Mailchimp account to Workflow².


1. Access your Mailchimp dashboard.
2. Click on your user icon on the top right.
3. Click on 'Account' in the dropdown list.
4. Click on the *Extras* dropdown list and then select 'Registered apps'.
5. Click on the *Register An App* button.
6. Copy the 'OAuth Callback URL' from your Doc² Mailchimp OAuth2 API credentials and paste it in the 'Redirect URI' field of the Mailchimp form.
7. Fill out any other necessary details and click on the *Create* button.
8. Use the generated Client ID and Client secret with your Mailchimp OAuth2 API node credentials in Workflow².
9. Click on the circle button in the OAuth section to connect your Mailchimp account to Workflow².
10. Click the *Save* button to save your credentials.

![Getting Mailchimp credentials](/_images/integrations/credentials/mailchimp/using-oauth.gif)

## Using Access Token

1. Access your Mailchimp dashboard.
2. Click on your user icon on the top right.
3. Click on 'Account' in the dropdown list.
4. Click on the *Extras* dropdown list and then select 'API Keys'.
5. Scroll down and create a new key by clicking on 'Create a Key' under the 'Your API keys' section.
6. Use the API key with your Mailchimp node credentials in Workflow².

![Getting Mailchimp credentials](/_images/integrations/credentials/mailchimp/using-access-token.gif)
