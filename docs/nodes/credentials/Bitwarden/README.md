---
permalink: /credentials/bitwarden
description: Learn to configure credentials for the Bitwarden node in n8n
---

# Bitwarden

You can use these credentials to authenticate the following nodes with Bitwarden.
- [Bitwarden](../../nodes-library/nodes/Bitwarden/README.md)

## Prerequisites

Create a [Bitwarden](https://vault.bitwarden.com/#/register?org=teams) organisation account.

## Using API Key

1. Open your Bitwarden [vault](https://vault.bitwarden.com/).
2. Click on your organisation under the ***ORGANISATIONS*** section.
3. Click on the ***Settings*** tab.
4. Click on the ***View API key*** button under the ***API key*** section.
5. Enter your master password in the ***Master password*** field.
6. Click on the ***View API key*** button.
7. Copy the displayed client id.
8. Enter the name for your credentials in the ***Credentials Name*** field in the 'Bitwarden API' credentials in n8n.
9. Paste the client id in the ***Client ID*** field in the 'Bitwarden API' credentials in n8n.
10. Copy the client secret from Bitwarden.
11. Paste the client secret in the ***Client Secret*** field in the 'Bitwarden API' credentials in n8n.
12. Click on the ***Create*** button to create your credentials.

**Note:** If you're hosting Bitwarden on your server, select 'Self-hosted' from the ***Environment*** dropdown list. You also need to enter the domain of your hosted instance in the ***Self-hosted domain*** field.

The following video demonstrates the steps mentioned above.

<div class="video-container">
    <iframe width="840" height="472.5" src="https://www.youtube.com/embed/lK-XdhKDSkk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
