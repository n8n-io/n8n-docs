---
title: Form.io Trigger credentials
description: >-
  Documentation for Form.io Trigger credentials. Use these credentials to
  authenticate Form.io Trigger in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Form.io Trigger credentials
originalFilePath: integrations/builtin/credentials/formiotrigger.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/formiotrigger'
url: 'https://docs.n8n.io/integrations/builtin/credentials/formiotrigger'
layout:
  description:
    visible: false
---

# Form.io Trigger credentials <a href="#formio-trigger-credentials" id="formio-trigger-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Form.io Trigger](../trigger-nodes/n8n-nodes-base.formiotrigger.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Form.io's API documentation](https://apidocs.form.io/) for more information about the service.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need a [Form.io](https://www.form.io/) account and:

- Your **Environment**
- Your login **Email address**
- Your **Password**

To set up the credential:

1. Select your **Environment**: 
    - Choose **Cloud hosted** if you aren't hosting Form.io yourself.
    - Choose **Self-hosted** if you're hosting Form.io yourself. Then add:
        - Your **Self-Hosted Domain**. Use only the domain itself. For example, if you view a form at `https://yourserver.com/yourproject/manage/view`, the Self-Hosted Domain is `https://yourserver.com`.
2. Enter the **Email address** you use to log in to Form.io.
3. Enter the **Password** you use to log in to Form.io.
