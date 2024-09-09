---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: JotForm credentials
description: Documentation for JotForm credentials. Use these credentials to authenticate JotForm in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# JotForm credentials

You can use these credentials to authenticate the following nodes:

- [JotForm Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.jotformtrigger/)

## Supported authentication methods

- API key

## Related resources

Refer to [JotForm's API documentation](https://api.jotform.com/docs/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need a [JotForm](https://www.jotform.com/){:target=_blank .external-link} account and:

- An **API Key**
- The **API Domain**

To set it up:

1. Go to **Settings >** [**API**](https://www.jotform.com/myaccount/api){:target=_blank .external-link}.
2. Select **Create New Key**.
3. Select the **Name** in JotForm to update the API key name to something meaningful, like `n8n integration`.
4. Copy the **API Key** and enter it in your n8n credential.
5. In n8n, select the **API Domain** that applies to you based on the forms you're using:
    - **api.jotform.com**: Use this unless the other form types apply to you.
    - **eu-api.jotform.com**: Select this if you're using JotForm [EU Safe Forms](https://www.jotform.com/eu-safe-forms/){:target=_blank .external-link}.
    - **hipaa-api.jotform.com**: Select this if you're using JotForm [HIPAA forms](https://www.jotform.com/hipaa/){:target=_blank .external-link}.

Refer to the [JotForm API documentation](https://api.jotform.com/docs/) for more information on creating keys and API domains.
