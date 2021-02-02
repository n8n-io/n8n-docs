---
permalink: /credentials/clickUp
description: Learn to configure credentials for the ClickUp node in n8n
---

# ClickUp

You can use these credentials to authenticate the following nodes with ClickUp.
- [ClickUp](../../nodes-library/nodes/ClickUp/README.md)
- [ClickUp Trigger](../../nodes-library/trigger-nodes/ClickUpTrigger/README.md)

## Prerequisites

Create a [ClickUp](https://www.clickup.com/) account.

## Using OAuth

::: tip ⛅️ Note for n8n.cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your ClickUp account to n8n.
:::

1. Open your ClickUp [dashboard](https://app.clickup.com).
2. Click on your profile icon in the bottom left.
3. Click on ***Integrations*** under your workspace profile.
4. Click on ***ClickUp API***.
5. Click on the ***+ Create an App*** button under the ***ClikcUp API*** section.
6. Enter the name of your app in the ***App Name*** field.
7. Copy the 'OAuth Callback URL' provided in the 'ClickUp OAuth2 API' credentials in n8n.
8. Paste it in the ***Redirect URL(s)*** field.
9. Click on the ***Create App*** button.
10. Copy the displayed client ID.
11. Enter a name for your credentials in the ***Credentials Name*** field in the 'ClickUp OAuth2 API' credentials in n8n.
12. Paste the client ID in the ***Client ID*** field in the 'ClickUp OAuth2 API' credentials in n8n.
13. Copy the client secret from ClickUp.
14. Paste the client secret in the ***Client Secret*** field in the 'ClickUp OAuth2 API' credentials in n8n.
15. Click on the circle button in the OAuth section to connect a ClickUp account to n8n.
16. Click the ***Save*** button to save your credentials in n8n.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/jPD0p8n-Ddk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The following video demonstrates the steps to authenticate the ClickUp node on [n8n.cloud](https://n8n.cloud).

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/1CjF_cPNSzM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Access Token

1. Open the ClickUp [dashboard](https://app.clickup.com).
2. Click on your profile icon in the bottom left.
3. Click on ***Apps*** under your user profile.
4. Click on the ***Generate*** button under the ***API Token*** section.
5. Click on the ***Copy*** button to copy the token.
6. Enter a name for your credentials in the ***Credentials Name*** field in the 'ClickUp API' credentials in n8n.
7. Paste the token in the ***Access Token*** field in the 'ClickUp API' credentials in n8n.
8. Click on the ***Create*** button to create the credentials.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/FMc8uiFT-Eo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
