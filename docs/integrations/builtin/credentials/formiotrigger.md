---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Form.io Trigger credentials
description: Documentation for Form.io Trigger credentials. Use these credentials to authenticate Form.io Trigger in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Form.io Trigger credentials

You can use these credentials to authenticate the following nodes:

- [Form.io Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.formiotrigger/)

## Supported authentication methods

- Basic auth

## Related resources

Refer to [Form.io's API documentation](https://apidocs.form.io/){:target=_blank .external-link} for more information about the service.

## Using basic auth

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
