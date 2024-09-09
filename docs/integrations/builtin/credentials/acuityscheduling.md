---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Acuity Scheduling credentials
description: Documentation for Acuity Scheduling credentials. Use these credentials to authenticate Acuity Scheduling in n8n, a workflow automation platform.
contentType: integration
---

# Acuity Scheduling credentials

You can use these credentials to authenticate the following nodes:

- [Acuity Scheduling Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.acuityschedulingtrigger/)

## Prerequisites

Create an [Acuity Scheduling](https://acuityscheduling.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key
- OAuth2

## Related resources

Refer to [Acuity's API documentation](https://developers.acuityscheduling.com/reference/quick-start){:target=_blank .external-link} for more information about working with the service.

## Using API key

To configure this credential, you'll need:

- A numeric **User ID**
- An **API Key**

Refer to the [Acuity API Quick Start authentication instructions](https://developers.acuityscheduling.com/reference/quick-start#authentication){:target=_blank .external-link} to generate an API key and view your User ID.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to set this up from scratch, complete the [Acuity OAuth2 Account Registration page](https://acuityscheduling.com/oauth2/register){:target=_blank .external-link}. Use the **Client ID** and **Client Secret** provided from that registration.
