---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Drive Trigger node common issues
description: Documentation for common issues and questions in the Google Drive Trigger node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: integration
priority: medium
---

# Google Drive Trigger node common issues

Here are some common errors and issues with the [Google Drive Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.googledrivetrigger/) and steps to resolve or troubleshoot them.


## 401 unauthorized error

The full text of the error looks like this:
<!--vale off-->
```
401 - {"error":"unauthorized_client","error_description":"Client is unauthorized to retrieve access tokens using this method, or client not authorized for any of the scopes requested."}
```
<!--vale on-->

This error occurs when there's an issue with the credential you're using and its scopes or permissions.

To resolve:

1. For [OAuth2](/integrations/builtin/credentials/google/oauth-single-service/) credentials, make sure you've enabled the Google Drive API in **APIs & Services > Library**. Refer to [Google OAuth2 Single Service - Enable APIs](/integrations/builtin/credentials/google/oauth-single-service/#enable-apis) for more information.
2. For [Service Account](/integrations/builtin/credentials/google/service-account/) credentials:
    1. [Enable domain-wide delegation](/integrations/builtin/credentials/google/service-account/#enable-domain-wide-delegation).
    2. Make sure you add the Google Drive API as part of the domain-wide delegation configuration.

## Handling more than one file change

The Google Drive Trigger node polls Google Drive for changes at a set interval (once every minute by default).

If multiple changes to the **Watch For** criteria occur during the polling interval, a single Google Drive Trigger event occurs containing the changes as items. To handle this, your workflow must account for times when the data might contain more than one item.

You can use an [if node](/integrations/builtin/core-nodes/n8n-nodes-base.if/) or a [switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch/) to change your workflow's behavior depending on whether the data from the Google Drive Trigger node contains a single item or multiple items.

## Google Drive Trigger not capturing when file moved into a folder

To trigger a workflow when a file is moved into a Google Drive folder, you can set a Google Drive Trigger node to watch for file changes.

To configure this behavior:

1. Set the **Trigger On** parameter to **Changes Involving a Specific Folder**.
2. Select the **Folder** to watch with the **From list** option.
3. In the **Watch For** parameter, select **File Updated** to capture changes to files, including moving a file into a folder.

If you want to trigger when a file is created in that folder as well, add a second Google Drive Trigger node with the same configuration, but with **Watch For** set to **File Created**. The File Created event only occurs when an entirely new file is created in your Google Drive account.
