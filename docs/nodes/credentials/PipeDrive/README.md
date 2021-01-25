---
permalink: /credentials/pipedrive
description: Learn to configure credentials for the Pipedrive node in n8n
---

# Pipedrive

You can use these credentials to authenticate the following nodes with Pipedrive.
- [Pipedrive](../../nodes-library/nodes/Pipedrive/README.md)
- [Pipedrive Trigger](../../nodes-library/trigger-nodes/PipedriveTrigger/README.md)

## Prerequisites

Create a [Pipedrive](https://pipedrive.com/) account.

## Using OAuth

<!-- ::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Pipedrive account to n8n.
::: -->

1. Create a [Developer Sandbox Account](https://pipedrive.readme.io/docs/developer-sandbox-account).
2. Open your Pipedrive Dashboard.
3. Click on your user profile in the top right and select 'Tools and integrations' from the dropdown list.
4. From the sidebar under the ***Tools*** section, select 'Marketplace manager'.
5. Click on the ***Create new app*** button.
6. Select either 'Yes' or 'No' when asked if you would like to publish your app on the Pipedrive marketplace.
7. Click on the ***Next*** button.
8. Enter the name of the app in the ***App name*** field.
9. Copy the 'OAuth Callback URL' provided in the 'Pipedrive OAuth2 API' credentials in n8n.
10. On the Pipedrive app creation page, scroll down to the ***OAuth & Access scopes*** section and paste the URL in the ***Callback URL*** field.
11. Based on your use-case, select the scopes from the ***Access scopes*** section.
12. Scroll up and click on the ***Save*** button on the top.
13. Select your app from the 'Marketplace manager'
14. Scroll down to ***OAuth & Access scopes*** section and copy the ***Client ID***.
15. Enter the name for your credentials in the ***Credentials Name*** field in the 'Pipedrive OAuth2 API' credentials in n8n.
16. Paste the client ID in the ***Client ID*** field in the 'Pipedrive OAuth2 API' credentials in n8n.
17. On the Pipedrive application page, click on the ***Show*** button next to ***Client Secret***.
18. Copy the ***Client Secret***.
19. Paste the client secret in the ***Client Secret*** field in the 'Pipedrive OAuth2 API' credentials in n8n.
20. Click on the circle button in the OAuth section to connect a Pipedrive account to n8n.
21. Click on the ***Save*** button to save your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/xyRPA-yX9so" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using API Token

1. Open your Pipedrive Dashboard.
2. Click on your user profile in the top right.
3. Select 'Personal preferences' from the dropdown list.
4. Click on the ***API*** tab.
5. Click on the ***Copy*** button to copy the API Token.
6. Enter the name for your credentials in the ***Credentials Name*** field in the 'Pipedrive API' credentials in n8n.
7. Paste the API token in the ***API Token*** field in the 'Pipedrive API' credentials in n8n.
8. Click on the ***Create*** button to save your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/uBdmHiFW7Do" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
