---
permalink: /credentials/mautic
description: Learn to configure credentials for the Mautic node in n8n
---

# Mautic

You can use these credentials to authenticate the following nodes with Mautic.
- [Mautic](../../nodes-library/nodes/Mautic/README.md)
- [Mautic Trigger](../../nodes-library/trigger-nodes/MauticTrigger/README.md)

## Prerequisites

Create an account on a [Mautic](https://www.mautic.org/) instance.

## Using OAuth

1. Open your Mautic dashboard.
2. Click on the gear icon on the top right and select ***API Credentials***.
3. Click on the ***+ New*** button on the top right.
4. Select 'OAuth 2' from the ***Authorization Protocol*** dropdown list.
5. Enter the name of the credentials in the ***Name*** field.
6. Copy the 'OAuth Callback URL' provided in the 'Mautic OAuth2 API' credentials in n8n.
7. Paste it in the ***Redirect URI*** field on the Mautic credentials page.
8. Click on the ***Apply*** button.
9. Enter the name for your credentials in the ***Credentials Name*** field in the 'Mautic OAuth2 API' credentials in n8n.
10. Copy the ***Client ID*** from the Mautic credentials page.
11. Paste it in the ***Client ID*** field in the 'Mautic OAuth2 API' credentials in n8n.
12. Copy the ***Client Secret*** from the Mautic credentials page.
13. Paste it in the ***Client Secret*** field in the 'Mautic OAuth2 API' credentials in n8n.
14. Enter the URL of your Mautic instance in the ***URL*** field.
15. Click on the circle button in the OAuth section to connect a Mautic account to n8n.
16. Click on the ***Save*** button to save your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
    <iframe width="840" height="472.5" src="https://www.youtube.com/embed/vEL0wJ2_91E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Credentials

1. Open your Mautic dashboard.
2. Click on the gear icon on the top right and select ***Configuration***.
3. Select 'API Settings' from the left sidebar.
4. Select 'Yes' under the ***Enable HTTP basic auth?*** section.
5. Click on the ***Apply*** button.
6. Enter the name for your credentials in the ***Credentials Name*** field in the 'Mautic API' credentials in n8n.
7. Enter the URL of your Mautic instance in the ***URL*** field in the 'Mautic API' credentials in n8n.
8. Enter your Mautic username in the ***Username*** field in the 'Mautic API' credentials in n8n.
9. Enter your Mautic password in the ***Password*** field in the 'Mautic API' credentials in n8n.
10. Click on the ***Create*** button to create your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
    <iframe width="840" height="472.5" src="https://www.youtube.com/embed/077wqv1rPLs" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
