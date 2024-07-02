---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Form.io Trigger credentials
description: Documentation for Form.io Trigger credentials. Use these credentials to authenticate Form.io Trigger in n8n, a workflow automation platform.
contentType: integration
---

# Form.io Trigger credentials

You can use these credentials to authenticate the following nodes:

- [Form.io Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.formiotrigger/)

## Prerequisites

Create a [Form.io](https://www.form.io/) account.

## Supported authentication methods

- Basic auth

## Related resources

Refer to [Form.io's API documentation](https://apidocs.form.io/){:target=_blank .external-link} for more information about the service.

## Using basic auth

To configure this credential, you'll need:

- Select your **Environment**: 
    - Choose **Cloud hosted** if you are not hosting Form.io yourself.
    - Choose **Self-hosted** if you're hosting Form.io yourself. Add your **Self-Hosted Domain**. Use only the domain itself. For example, if you view a form at `https://yourserver.com/yourproject/manage/view`, the Self-Hosted Domain is `https://yourserver.com`.
- The **Email address** you use to log in to Form.io
- The **Password** you use to log in to Form.io
