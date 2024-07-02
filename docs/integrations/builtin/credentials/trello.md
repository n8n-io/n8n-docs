---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Trello credentials
description: Documentation for Trello credentials. Use these credentials to authenticate Trello in n8n, a workflow automation platform.
contentType: integration
---

# Trello credentials

You can use these credentials to authenticate the following nodes:

- [Trello](/integrations/builtin/app-nodes/n8n-nodes-base.trello/)
- [Trello Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.trellotrigger/)

## Prerequisites

- Create a [Trello](https://trello.com/){:target=_blank .external-link} account.
- Create a Trello [Power-Up](https://developer.atlassian.com/cloud/trello/guides/power-ups/managing-power-ups/#adding-a-new-custom-power-up){:target=_blank .external-link}. 

## Supported authentication methods

- API key

## Related resources

Refer to [Trello's API documentation](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Generated from your Power-Up. Refer to [Managing your API key](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/#managing-your-api-key){:target=_blank .external-link} for more information.
- An **API Token**: Generated from your Power-Up. Refer to [Authentication and Authorization](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/#authentication-and-authorization){:target=_blank .external-link} for more information.

Once you've created your Power-Up, open its **API Key** tab and select the option to **Generate a new API key**. With your key generated, select the **Token** option next to it. When prompted, allow it all the permissions it asks for. Copy the Key and Token and add them to your n8n credential.