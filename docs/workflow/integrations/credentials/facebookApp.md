# Facebook App

You can use these credentials to authenticate the following nodes with Facebook.
- [Facebook Trigger](/workflow/integrations/trigger-nodes/n8n-nodes-base.facebookTrigger/)

**Note:** If you want to create credentials for the [Facebook Graph API](/workflow/integrations/nodes/n8n-nodes-base.facebookGraphAPI/) node, follow the instructions mentioned in the [Facebook Graph API](/workflow/integrations/credentials/facebookGraph/) credentials documentation.

## Prerequisites

Create a [Facebook](https://www.facebook.com/) account.

## Using App Access Token

1. Access the [Facebook for Developers portal](https://developers.facebook.com/).
2. Click on ***My Apps*** on the top right corner.
3. Access your app. Create an app if you don't already have one.
4. Add the ***Webhooks*** product from the ***Add a Product*** section on the dashboard.
5. Click on ***Settings*** in the left sidebar and select 'Basic'.
6. Click on the ***Show*** button and login with your Facebook account.
7. Copy the App Secret displayed on the page.
8. Access the [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer/).
9. Select your app from the ***Facebook App*** dropdown list on the right sidebar.
10. Select 'Get App Token' from the ***User or Page*** dropdown list on the right sidebar.
11. Use the app secret and the generated access token with your Facebook node credentials in Workflow².

![Getting Facebook App credentials](/_images/integrations/credentials/facebookapp/using-app-access-token.gif)
