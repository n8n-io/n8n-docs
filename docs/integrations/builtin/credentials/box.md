---
title: Box credentials
description: >-
  Documentation for Box credentials. Use these credentials to authenticate Box
  in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Box credentials
originalFilePath: integrations/builtin/credentials/box.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/box'
url: 'https://docs.n8n.io/integrations/builtin/credentials/box'
layout:
  description:
    visible: false
---

# Box credentials <a href="#box-credentials" id="box-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Box](../app-nodes/n8n-nodes-base.box.md)
- [Box Trigger](../trigger-nodes/n8n-nodes-base.boxtrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Box](https://www.box.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Box's API documentation](https://developer.box.com/reference/) for more information about the service.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8WBawhAsMzeYnydxU5Sr/" %}

If you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, you'll need to create a Custom App. Refer to the [Box OAuth2 Setup documentation](https://developer.box.com/guides/authentication/oauth2/oauth2-setup/) for more information.

