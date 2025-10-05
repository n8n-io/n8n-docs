---
title: Google Drive Trigger node common issues
description: Documentation for common issues and questions in the Google Drive Trigger node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: [integration, reference]
priority: medium
---

# Google Drive Trigger node common issues

Here are some common errors and issues with the [Google Drive Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.googledrivetrigger/index.md) and steps to resolve or troubleshoot them.


## 401 unauthorized error

The full text of the error looks like this:
<!--vale off-->
```
401 - {"error":"unauthorized_client","error_description":"Client is unauthorized to retrieve access tokens using this method, or client not authorized for any of the scopes requested."}
```
<!--vale on-->

This error occurs when there's an issue with the credential you're using and its scopes or permissions.

To resolve:

1. For [OAuth2](/integrations/builtin/credentials/google/oauth-single-service.md) credentials, make sure you've enabled the Google Drive API in **APIs & Services > Library**. Refer to [Google OAuth2 Single Service - Enable APIs](/integrations/builtin/credentials/google/oauth-single-service.md#enable-apis) for more information.
2. For [Service Account](/integrations/builtin/credentials/google/service-account.md) credentials:
    1. [Enable domain-wide delegation](/integrations/builtin/credentials/google/service-account.md#enable-domain-wide-delegation).
    2. Make sure you add the Google Drive API as part of the domain-wide delegation configuration.

## Handling more than one file change

The Google Drive Trigger node polls Google Drive for changes at a set interval (once every minute by default).

If multiple changes to the **Watch For** criteria occur during the polling interval, a single Google Drive Trigger event occurs containing the changes as items. To handle this, your workflow must account for times when the data might contain more than one item.

You can use an [if node](/integrations/builtin/core-nodes/n8n-nodes-base.if.md) or a [switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md) to change your workflow's behavior depending on whether the data from the Google Drive Trigger node contains a single item or multiple items.
