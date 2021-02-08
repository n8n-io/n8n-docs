---
permalink: /credentials/discourse
description: Learn to configure credentials for the Discourse node in n8n
---

# Discourse

You can use these credentials to authenticate the following nodes with Discourse.
- [Discourse](../../nodes-library/nodes/Discourse/README.md)


## Prerequisites

Host an instance of [Discourse](https://discourse.org/) and create an account.

## Using API

1. Open your Discourse dashboard.
2. Click on the ***API*** tab.
3. Click on the ***+ New API Key*** button.
4. Enter a description in the ***Description*** field.
5. Select 'Single User' from the ***User Level*** dropdown list.
6. Enter your username in the ***User*** field and select the user from the dropdown.
7. If you want to select all the scopes, check the ***Global Key (allowed all actions)*** checkbox. Otherwise, select scopes individually under the ***Scopes*** section.
8. Click on the ***Save*** button.
9. Copy the displayed API key.
10. Enter the name for your credentials in the ***Credentials Name*** field in the 'Discourse API' credentials in n8n.
11. Enter the URL of your Discourse instance in the ***URL*** field in the 'Discourse API' credentials in n8n.
12. Paste the API key in the ***API Key*** field in the 'Discourse API' credentials in n8n.
13. Enter your Discourse username in the ***Username*** field in the 'Discourse API' credentials in n8n.
14. Click the ***Create*** button to create your credentials in n8n.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/rLdceGB5zoo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
