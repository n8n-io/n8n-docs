---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SIGNL4 credentials
description: Documentation for SIGNL4 credentials. Use these credentials to authenticate SIGNL4 in n8n, a workflow automation platform.
contentType: integration
---

# SIGNL4 credentials

You can use these credentials to authenticate the following nodes:

- [SIGNL4](/integrations/builtin/app-nodes/n8n-nodes-base.signl4/)

## Prerequisites

Create a [SIGNL4](https://www.signl4.com/){:target=_blank .external-link} account.

## Supported authentication methods

- Webhook secret

## Related resources

Refer to [SIGNL4's Inbound Webhook documentation](https://connect.signl4.com/webhook/docs/index.html){:target=_blank .external-link} for more information about the service.

## Using webhook secret

To configure this credential, you'll need:

- A **Team Secret**: SIGNL4 includes this secret in the "✅ Sign up complete" email as the last part of the webhook URL. If your webhook URL is `https://connect.signl4.com/webhook/helloworld`, your team secret would be `helloworld`.

