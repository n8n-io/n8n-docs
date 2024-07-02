---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: JotForm credentials
description: Documentation for JotForm credentials. Use these credentials to authenticate JotForm in n8n, a workflow automation platform.
contentType: integration
---

# JotForm credentials

You can use these credentials to authenticate the following nodes:

- [JotForm Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.jotformtrigger/)

## Prerequisites

Create a [JotForm](https://www.jotform.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API key

## Related resources

Refer to [JotForm's API documentation](https://api.jotform.com/docs/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Get an API key from the [API section](https://www.jotform.com/myaccount/api){:target=_blank .external-link} of **My Account**. Refer to [Jotform API Getting Started](https://api.jotform.com/docs/#gettingstarted) for detailed instructions.
- The **API Domain**: This determines which base URL is used for the API. The domain selected needs to match the forms you're working with. Options include:
    - `api.jotform.com`: The default base URL.
    - `eu-api.jotform.com`: Used by Jotform [EU Safe Forms](https://www.jotform.com/eu-safe-forms/){:target=_blank .external-link}.
    - `hipaa-api.jotform.com`: Used by JotForm [HIPAA forms](https://www.jotform.com/hipaa/){:target=_blank .external-link}.

