---
title: Google Drive node common issues
description: >-
  Documentation for common questions and solutions in the Google Drive node in
  n8n, a workflow automation platform. Includes details of the issue and
  suggested resolutions.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Google Drive node common issues
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.googledrive/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/common-issues
layout:
  description:
    visible: false
---

# Google Drive node common issues <a href="#google-drive-node-common-issues" id="google-drive-node-common-issues"></a>

Here are some common errors and issues with the [Google Drive node](README.md) and steps to resolve or troubleshoot them.

## Google hasn't verified this app <a href="#google-hasnt-verified-this-app" id="google-hasnt-verified-this-app"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/uEYII1oKijzYurya61sf/" %}

## Google Cloud app becoming unauthorized <a href="#google-cloud-app-becoming-unauthorized" id="google-cloud-app-becoming-unauthorized"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/PlbR0ntmBBE0DgjKiavq/" %}

## Google Drive OAuth error <a href="#google-drive-oauth-error" id="google-drive-oauth-error"></a>

If using the OAuth authentication method, you may see an error indicating that you can't sign in because the app doesn't meet Google's expectations for keeping apps secure.

Most often, the actual cause of this issue is that the URLs don't match between Google's OAuth configuration and n8n. To avoid this, start by reviewing any links included in Google's error message. This will contain details about the exact error that occurred.

If you are self-hostin n8n, check the n8n configuration items used to construct external URLs. Verify that the [`N8N_EDITOR_BASE_URL`](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/deployment) and [`WEBHOOK_URL`](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-webhook-urls-with-reverse-proxy) environment variables use fully qualified domains.

## Get recent files from Google Drive <a href="#get-recent-files-from-google-drive" id="get-recent-files-from-google-drive"></a>

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

{% @n8n-blocks/n8n-workflow-demo content="%7B%0A%20%20%22meta%22%3A%20%7B%0A%20%20%20%20%22instanceId%22%3A%20%22cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7%22%0A%20%20%7D%2C%0A%20%20%22nodes%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22operation%22%3A%20%22download%22%2C%0A%20%20%20%20%20%20%20%20%22fileId%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22__rl%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%22value%22%3A%20%22%3D%7B%7B%20%24json.id%20%7D%7D%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22mode%22%3A%20%22id%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%2245b53bcd-7dcf-4266-8b6e-bfc12008f9e2%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Google%20Drive1%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.googleDrive%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%203%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%201500%2C%0A%20%20%20%20%20%20%20%20300%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22ba223e7c-4fed-41dd-8c80-2e8fd742629f%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22When%20clicking%20%E2%80%98Execute%20workflow%E2%80%99%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.manualTrigger%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20620%2C%0A%20%20%20%20%20%20%20%20300%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22resource%22%3A%20%22fileFolder%22%2C%0A%20%20%20%20%20%20%20%20%22searchMethod%22%3A%20%22query%22%2C%0A%20%20%20%20%20%20%20%20%22returnAll%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%22filter%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22whatToSearch%22%3A%20%22files%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22fields%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22%2A%22%0A%20%20%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%2242799909-16f3-4f0a-9ad9-4dd0375814a0%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Google%20Drive%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.googleDrive%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%203%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20840%2C%0A%20%20%20%20%20%20%20%20300%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22sortFieldsUi%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22sortField%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22fieldName%22%3A%20%22modifiedTime%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22order%22%3A%20%22descending%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22bfb8baa6-1b8c-4540-9ad6-b5d7c3f7521b%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Sort%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.sort%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%201060%2C%0A%20%20%20%20%20%20%20%20300%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%7D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%222883d39a-f7d9-4244-bf7d-b06878678ccc%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Limit%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22n8n-nodes-base.limit%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%201280%2C%0A%20%20%20%20%20%20%20%20300%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22connections%22%3A%20%7B%0A%20%20%20%20%22When%20clicking%20%E2%80%98Execute%20workflow%E2%80%99%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22Google%20Drive%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22Google%20Drive%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22Sort%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22Sort%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22Limit%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22Limit%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22Google%20Drive1%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20%22pinData%22%3A%20%7B%7D%0A%7D%0A" url="https://raw.githubusercontent.com/n8n-io/n8n-docs/refs/heads/main/docs/_workflows/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/get-most-recent-file.json" %}
