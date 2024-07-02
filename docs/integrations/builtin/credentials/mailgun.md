---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Mailgun credentials
description: Documentation for Mailgun credentials. Use these credentials to authenticate Mailgun in n8n, a workflow automation platform.
contentType: integration
---

# Mailgun credentials

You can use these credentials to authenticate the following nodes:

- [Mailgun](/integrations/builtin/app-nodes/n8n-nodes-base.mailgun/)

## Prerequisites

- Create a [Mailgun](https://www.mailgun.com/){:target=_blank .external-link} account.
- [Add and verify a domain](https://help.mailgun.com/hc/en-us/articles/360026833053-Domain-Verification-Setup-Guide){:target=_blank .external-link} in Mailgun or use the provided sandbox domain for testing.

## Supported authentication methods

- API key

## Related resources

Refer to [Mailgun's API documentation](https://documentation.mailgun.com/docs/mailgun/api-reference/intro/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Domain**: If your Mailgun account is based in Europe, select **api.eu.mailgun.net**; otherwise, select **api.mailgun.net**. Refer to [Mailgun Base URLs](https://documentation.mailgun.com/docs/mailgun/api-reference/intro/#base-url){:target=_blank .external-link} for more information.
- An **Email Domain**: Enter the email sending domain you're working with. If you have multiple sending domains, refer to [Working with multiple email domains](#working-with-multiple-email-domains) for more information.
- An **API Key**: View your API key in **Settings > API Keys**. Refer to [Mailgun's API Authentication documentation](https://documentation.mailgun.com/docs/mailgun/api-reference/authentication/){:target=_blank .external-link} for more detailed instructions.

## Working with multiple email domains

If your Mailgun account includes multiple sending domains, create a separate credential for each email domain you're working with.
