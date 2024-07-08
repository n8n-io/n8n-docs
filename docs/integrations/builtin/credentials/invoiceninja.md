---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Invoice Ninja credentials
description: Documentation for Invoice Ninja credentials. Use these credentials to authenticate Invoice Ninja in n8n, a workflow automation platform.
contentType: integration
---

# Invoice Ninja credentials

You can use these credentials to authenticate the following nodes:

- [Invoice Ninja](/integrations/builtin/app-nodes/n8n-nodes-base.invoiceninja/)
- [Invoice Ninja Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.invoiceninjatrigger/)

## Prerequisites

Create an [Invoice Ninja](https://www.invoiceninja.com/){:target=_blank .external-link} account. Only the Pro and Enterprise plans support API integrations.

## Supported authentication methods

- API key

## Related resources

Refer to Invoice Ninja's [v4 API documentation](https://invoice-ninja.readthedocs.io/en/latest/api.html){:target=_blank .external-link} and [v5 API documentation](https://api-docs.invoicing.co/){:target=_blank .external-link} for more information about the APIs.

## Using API key

To configure this credential, you'll need:

- A **URL**: If Invoice Ninja hosts your installation, use either of the default URLs mentioned. If you're self-hosting your installation, use the URL of your Invoice Ninja instance.
- An **API Token**: Generate an API token in **Settings > Account Management > API Tokens**.
- An optional **Secret**, available only for v5 API users

