---
title: Gmail Trigger node common issues
description: Documentation for common issues and questions in the Gmail Trigger node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: [integration, reference]
priority: _priority-from-main-node_
---

# Gmail Trigger node common issues

Here are some common errors and issues with the [Gmail Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/index.md) and steps to resolve or troubleshoot them.


## 401 unauthorized error

The full text of the error looks like this:
<!--vale off-->
```
401 - {"error":"unauthorized_client","error_description":"Client is unauthorized to retrieve access tokens using this method, or client not authorized for any of the scopes requested."}
```
<!--vale on-->

This error occurs when there's an issue with the credential you're using and its scopes or permissions.

To resolve:

1. For [OAuth2](/integrations/builtin/credentials/google/oauth-single-service.md) credentials, make sure you've enabled the Gmail API in **APIs & Services > Library**. Refer to [Google OAuth2 Single Service - Enable APIs](/integrations/builtin/credentials/google/oauth-single-service.md#enable-apis) for more information.
2. For [Service Account](/integrations/builtin/credentials/google/service-account.md) credentials:
    1. [Enable domain-wide delegation](/integrations/builtin/credentials/google/service-account.md#enable-domain-wide-delegation).
    2. Make sure you add the Gmail API as part of the domain-wide delegation configuration.
