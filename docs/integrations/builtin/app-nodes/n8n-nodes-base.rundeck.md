---
title: Rundeck node documentation
description: Learn how to use the Rundeck node in n8n. Follow technical documentation to integrate Rundeck node into your workflows.
contentType: [integration, reference]
---

# Rundeck node

Use the Rundeck node to automate work in Rundeck, and integrate Rundeck with other applications. n8n has built-in support for executing jobs and getting metadata.

On this page, you'll find a list of operations the Rundeck node supports and links to more resources.

/// note | Credentials
Refer to [Rundeck credentials](/integrations/builtin/credentials/rundeck.md) for guidance on setting up authentication. 
///

## Operations

- **Job**
    - Execute a job
    - Get metadata of a job

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'rundeck') ]]

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Find the job ID

1. Access your Rundeck dashboard.
2. Open the project that contains the job you want to use with n8n.
3. In the sidebar, select **JOBS**.
4. Under **All Jobs**, select the name of the job you want to use with n8n.
5. In the top left corner, under the name of the job, copy the string that's displayed in smaller font below the job name. This is your job ID.
6. Paste this job ID in the **Job Id** field in n8n.

