---
title: Trello credentials
description: Documentation for Trello credentials. Use these credentials to authenticate Trello in n8n, a workflow automation platform.
contentType: integration
---

# Trello credentials

You can use these credentials to authenticate the following nodes with Trello:

- [Trello](/integrations/builtin/app-nodes/n8n-nodes-base.trello/)
- [Trello Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.trellotrigger/)

## Prerequisites

Create a [Trello](https://trello.com/) account.

## Using an access token

1. Go to the [Trello API Key ](https://trello.com/app-key){:target_blank .external-link} portal. The page 404s if you're not signed into Trello.
1. Copy your API key at the top.
1. Select **generate a Token** to create your token. When prompted, allow it all the permissions it asks for.  
--8<-- "_snippets/integrations/builtin/credentials/open-credential-modal-list.md"
1. Enter the API key and API token.
1. Select **Save**. n8n tests the connection.

