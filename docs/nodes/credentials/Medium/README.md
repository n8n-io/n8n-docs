---
permalink: /credentials/medium
---

# Medium

You can find information about the operations supported by the Medium node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.medium) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Medium).

## Prerequisites

- Create an account on [Medium](https://www.medium.com/).
- Request access to credentials by emailing [yourfriends@medium.com](mailto:yourfriends@medium.com).


## Using OAuth

1. Log in to your Medium account.
2. Click on the avatar on the top right corner.
3. Select '[Settings](https://medium.com/me/settings)' in the drop-down menu.
4. Select 'Developers' from the menu on the left.
5. Click on the 'Manage applications' button.
6. Click on the 'New application' button.
7. Give your application a Name, and provide a Description.
8. Select the 'OAuth 2' option from the *Authorization Protocol* dropdown list.
9. Copy the 'OAuth Callback URL' provided in the Medium OAuth2 API credentials in n8n and paste it in the 'Callback URLs' field in the Medium application page.
10. Click on 'Save' to generate the credentials.
11. Copy and paste ***Client ID*** and ***Client Secret*** in the Medium OAuth2 API credentials in n8n.
12. Click on the circle button in the OAuth section to connect a Medium account to n8n.
13. Click the ***Save*** button to save your credentials in n8n.

![Getting Medium OAuth credentials](./using-oauth.gif)

## Using Access Token

1. Log in to your Medium account.
2. Click on the avatar on the top right corner.
3. Select '[Settings](https://medium.com/me/settings)' in the drop-down menu.
4. Select 'Integration tokens' from the menu on the left.
5. Enter a description for your token in the field.
6. Click on the 'Get integration token' button.
7. Copy and paste ***Token*** in the Medium API credentials in n8n.
8. Click the ***Save*** button to save your credentials in n8n.

![Getting Medium Access Token](./using-access-token.gif)
