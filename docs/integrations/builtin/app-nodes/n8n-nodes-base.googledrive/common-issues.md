---
title: Google Drive node common issues 
description: Documentation for common questions and solutions in the Google Drive node in n8n, a workflow automation platform. Includes details of the issue and suggested resolutions.
contentType: [integration, reference]
priority: high
---

# Google Drive node common issues

Here are some common errors and issues with the [Google Drive node](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/index.md) and steps to resolve or troubleshoot them.

## Google hasn't verified this app

--8<-- "_snippets/integrations/builtin/credentials/google/unverified-app.md"

## Google Cloud app becoming unauthorized

--8<-- "_snippets/integrations/builtin/credentials/google/app-becoming-unauthorized.md"

## Google Drive OAuth error

If using the OAuth authentication method, you may see an error indicating that you can't sign in because the app doesn't meet Google's expectations for keeping apps secure.

Most often, the actual cause of this issue is that the URLs don't match between Google's OAuth configuration and n8n. To avoid this, start by reviewing any links included in Google's error message. This will contain details about the exact error that occurred.

If you are self-hostin n8n, check the n8n configuration items used to construct external URLs. Verify that the [`N8N_EDITOR_BASE_URL`](/hosting/configuration/environment-variables/deployment.md) and [`WEBHOOK_URL`](/hosting/configuration/configuration-examples/webhook-url.md) environment variables use fully qualified domains.

## Get recent files from Google Drive

To retrieve recent files from Google Drive, you need to sort files by modification time. To do this, you need to search for existing files and retrieve their modification times. Next you can sort the files to find the most recent file and use another Google Drive node target the file by ID.

The process looks like this:

1. Add a **Google Drive** node to your canvas.
2. Select the **File/Folder** resource and the **Search** operation.
3. Enable **Return All** to sort through all files.
4. Set the **What to Search** filter to **Files**.
5. In the **Options**, set the **Fields** to **All**.
6. Connect a **Sort** node to the output of the **Google Drive** node.
7. Choose **Simple** sort type.
8. Enter `modifiedTime` as the **Field Name** in the **Fields To Sort By** section.
9. Choose **Descending** sort order.
10. Add a **Limit** node to the output of the **Sort** node.
11. Set **Max Items** to **1** to keep the most recent file.
12. Connect another **Google Drive** node to the output of the **Limit** node.
13. Select **File** as the **Resource** and the operation of your choice.
14. In the **File** selection, choose **By ID**.
15. Select **Expression** and enter `{{ $json.id }}` as the expression.

[[ workflowDemo("file:///integrations/builtin/app-nodes/n8n-nodes-base.googledrive/get-most-recent-file.json") ]]
