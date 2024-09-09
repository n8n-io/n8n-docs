---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Beeminder credentials
description: Documentation for Beeminder credentials. Use these credentials to authenticate Beeminder in n8n, a workflow automation platform.
contentType: integration
---

# Beeminder credentials

You can use these credentials to authenticate the following node:

- [Beeminder](/integrations/builtin/app-nodes/n8n-nodes-base.beeminder/)

## Prerequisites

Create a [Beeminder](https://www.beeminder.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API user token

## Related resources

Refer to [Beeminder's API documentation](http://api.beeminder.com/#beeminder-api-reference){:target=_blank .external-link} for more information about the service.

## Using API user token

To configure this credential, you'll need:

- A **User** name: Should match the user who the Auth Token is generated for.
- A personal **Auth Token** for that user. Generate this using either method below:
    - In the GUI: From the [Apps & API](https://help.beeminder.com/article/110-apps-and-api#API-token){:target=_blank .external-link} option within **Account Settings**
    - In the API: From hitting the [`auth_token` API endpoint](http://api.beeminder.com/#auth){:target=_blank .external-link}

