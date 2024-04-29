---
title: Box credentials
description: Documentation for Box credentials. Use these credentials to authenticate Box in n8n, a workflow automation platform.
contentType: integration
---

# Box credentials

You can use these credentials to authenticate the following nodes:

- [Box](/integrations/builtin/app-nodes/n8n-nodes-base.box/)
- [Box Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.boxtrigger/)

## Prerequisites

Create a [Box](https://www.box.com/) account.

## Supported authentication methods

- OAuth2

## Related resources

Refer to [Box's API documentation](https://developer.box.com/reference/){:target=_blank .external-link} for more information about the service.

## Using OAuth2

/// note | Note for n8n Cloud users
You'll only need to enter the Credentials Name and select the **Connect my account** button in the OAuth credential to connect your Box account to n8n.
///

Should you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, you'll need to create a Custom App. Refer to the [Box OAuth2 Setup documentation](https://developer.box.com/guides/authentication/oauth2/oauth2-setup/){:target=_blank .external-link} for more information.

