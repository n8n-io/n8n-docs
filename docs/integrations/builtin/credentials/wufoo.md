---
title: Wufoo credentials
description: >-
  Documentation for Wufoo credentials. Use these credentials to authenticate
  Wufoo in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Wufoo credentials
originalFilePath: integrations/builtin/credentials/wufoo.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/wufoo'
url: 'https://docs.n8n.io/integrations/builtin/credentials/wufoo'
layout:
  description:
    visible: false
---

# Wufoo credentials <a href="#wufoo-credentials" id="wufoo-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Wufoo Trigger](../trigger-nodes/n8n-nodes-base.wufootrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Wufoo](https://wufoo.com) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Wufoo's API documentation](https://wufoo.github.io/docs/) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Get your API key from the [Wufoo Form Manager](https://app.wufoo.com/#/form-manager). To the right of a form, select **More > API Information**. Refer to [Using API Information and Webhooks](https://help.surveymonkey.com/en/wufoo/integrations/wufoo-api/) for more information.
- A **Subdomain**: Your subdomain is the part of your Wufoo URL that comes after `https://` and before `wufoo.com`. So if the full domain is `https://n8n.wufoo.com`, the subdomain is `n8n`. Admins can view the subdomain in the [**Account Manager**](https://help.surveymonkey.com/en/wufoo/account/account-manager/). Refer to [Your Subdomain](https://help.surveymonkey.com/en/wufoo/account/your-subdomain/) for more information.

