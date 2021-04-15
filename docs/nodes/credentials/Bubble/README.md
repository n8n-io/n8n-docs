---
permalink: /credentials/bubble
description: Learn to configure credentials for the Bubble node in n8n
---

# Bubble

You can use these credentials to authenticate the following nodes with Bubble.
- [Bubble](../../nodes-library/nodes/Bubble/README.md)

## Prerequisites

Create a [Bubble](https://bubble.io) account.

**Note:** You need a Personal account or higher plan to get access to the Bubble API.

## Using API Key

1. Open your Bubble [dashboard](https://bubble.io/home) page.
2. Select an app under the ***My apps*** section to open the app.
3. Click on ***Settings*** on the left-sidebar.
4. Click on the ***API*** tab.
5. Click on the ***Generate a new API token*** button.
6. Enter a token name in the ***API Token Label*** field.
7. Copy the displayed Private Key.
8. Enter the name for your credentials in the ***Credentials Name*** field in the 'Bubble API' credentials in n8n.
9. Paste the Private Key in the ***API Token*** field in the 'Bubble API' credentials in n8n.
10. Enter the app name in the ***APP Name*** field.
11. Select 'Development' from the ***Environment*** dropdown list. If you want to use the 'Live' environment, select 'Live' instead.
12. Click on the ***Create*** button to create your credentials.

**Note:** If you're self-hosting your Bubble app, select 'Self-hosted' from the ***Hosting*** dropdown list. You also need to enter the domain of your hosted instance in the ***Domain*** field.

The following video demonstrates the steps mentioned above.

<div class="video-container">
    <iframe width="840" height="472.5" src="https://www.youtube.com/embed/ZK3YDchpb1U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
