---
title: Gmail Trigger node common issues
description: >-
  Documentation for common issues and questions in the Gmail Trigger node in
  n8n, a workflow automation platform. Includes details of the issue and
  suggested solutions.
contentType:
  - integration
  - reference
priority: _priority-from-main-node_
nodeTitle: Gmail Trigger node common issues
originalFilePath: >-
  integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/common-issues
layout:
  description:
    visible: false
---

# Gmail Trigger node common issues <a href="#gmail-trigger-node-common-issues" id="gmail-trigger-node-common-issues"></a>

Here are some common errors and issues with the [Gmail Trigger node](README.md) and steps to resolve or troubleshoot them.


## 401 unauthorized error <a href="#401-unauthorized-error" id="401-unauthorized-error"></a>

The full text of the error looks like this:

```
401 - {"error":"unauthorized_client","error_description":"Client is unauthorized to retrieve access tokens using this method, or client not authorized for any of the scopes requested."}
```


This error occurs when there's an issue with the credential you're using and its scopes or permissions.

To resolve:

1. For [OAuth2](../../credentials/google/oauth-single-service.md) credentials, make sure you've enabled the Gmail API in **APIs & Services > Library**. Refer to [Google OAuth2 Single Service - Enable APIs](../../credentials/google/oauth-single-service.md#enable-apis) for more information.
2. For [Service Account](../../credentials/google/service-account.md) credentials:
    1. [Enable domain-wide delegation](../../credentials/google/service-account.md#enable-domain-wide-delegation).
    2. Make sure you add the Gmail API as part of the domain-wide delegation configuration.
