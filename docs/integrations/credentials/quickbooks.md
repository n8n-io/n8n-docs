# QuickBooks

You can use these credentials to authenticate the following nodes with QuickBooks.

- [QuickBooks](/integrations/nodes/n8n-nodes-base.quickbooks/)

## Prerequisites

Create a [Intuit developer](https://developer.intuit.com/) account.

## Using OAuth

<!-- !!! tip  Note for n8n.cloud users
    You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your QuickBooks account to n8n.
 -->

1. Open the Intuit Developer [dashboard](https://developer.intuit.com/app/developer/dashboard) page.
2. Click on the ***+ Create an app*** button.
3. Select the ***QuickBooks Online and Payments*** platform.
4. Enter the name of the app in the ***What's your app name?*** field.
5. Select the required scopes under the ***Select Scope*** section.
6. Click on the ***Create app*** button.
7. Click on ***Keys & OAuth*** under the ***Development*** section.
8. Scroll down to the ***Redirect URIs*** section and click on the ***Add URI*** button.
9. Copy the 'OAuth Callback URL' provided in the 'QuickBooks OAuth2 API' credentials in n8n.
10. Paste the URL in the ***Link*** field.
11. Click on the ***Save*** button.
12. Copy the displayed ***Client ID***.
13. Enter a name for your credentials in the ***Credentials Name*** field in the 'QuickBooks OAuth2 API' credentials in n8n.
14. Paste the client ID in the ***Client ID*** field in the 'QuickBooks OAuth2 API' credentials in n8n.
15. Copy the displayed ***Client Secret*** from the Keys page.
16. Paste the client secret in the ***Client Secret*** field in the 'QuickBooks OAuth2 API' credentials in n8n.
17. Select 'Sandbox' from the ***Environment*** dropdown list in the 'QuickBooks OAuth2 API' credentials in n8n.
18. Click on the circle button in the OAuth section to connect a QuickBooks account to n8n.
19. Click the ***Save*** button to save your credentials in n8n.

**Note:** To build the application in production, you will have to fulfill all the requirements mentioned by Intuit. You can learn more on Intuit's [documentation](https://developer.intuit.com/app/developer/qbo/docs/go-live).

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/yAUDkgK74XY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
