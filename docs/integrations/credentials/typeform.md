# Typeform

You can use these credentials to authenticate the following nodes with Typeform.

- [Typeform Trigger](/integrations/trigger-nodes/n8n-nodes-base.typeFormTrigger/)

## Prerequisites

Create a [Typeform](https://typeform.com/) account.

## Using OAuth

1. Access your Typeform dashboard.
2. Go to your user profile in the top right.
3. Click on 'Settings' and then click on 'Developer apps' in the sidebar.
4. Click on the ***Register a new app*** button.
5. Copy the 'OAuth Callback URL' provided in the Typeform OAuth2 API credentials in n8n and paste it in the ***Redirect URI(s)*** section in the Typeform app registration page.
6. Enter any other information necessary and click on the ***Register app*** button.
7. Use the displayed ***Client ID*** and ***Client secret*** with your Typeform OAuth2 API credentials in n8n.
8. Click on the circle button in the OAuth section to connect a Typeform account to n8n.
9. Click the ***Save*** button to save your credentials.

![Getting TypeForm OAuth credentials](/_images/integrations/credentials/typeform/using-oauth.gif)

## Using Access Token

1. Open the Typeform [dashboard](https://admin.typeform.com).
2. Click on your avatar on the top right and select 'Settings'.
3. Click on ***Personal tokens*** under the ***Profile*** section in the sidebar.
4. Click on the ***Generate a new token*** button.
5. Enter a name in the ***Token name*** field.
6. Click on the ***Generate token*** button.
7. Click on the ***Copy*** button to copy the access token.
9. Enter a name for your credentials in the ***Credentials Name*** field in the 'Typeform API' credentials in n8n.
10. Paste the access token in the ***Access Token*** field in the 'Typeform API' credentials in n8n.
11. Click the ***Create*** button to save your credentials in n8n.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/K7UxD2jG_CI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
