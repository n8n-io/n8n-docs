---
title: Rundeck node documentation
description: >-
  Learn how to use the Rundeck node in n8n. Follow technical documentation to
  integrate Rundeck node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Rundeck node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.rundeck.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.rundeck'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.rundeck'
layout:
  description:
    visible: false
---

# Rundeck node <a href="#rundeck-node" id="rundeck-node"></a>

Use the Rundeck node to automate work in Rundeck, and integrate Rundeck with other applications. n8n has built-in support for executing jobs and getting metadata.

On this page, you'll find a list of operations the Rundeck node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Rundeck credentials](../credentials/rundeck.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

- **Job**
    - Execute a job
    - Get metadata of a job

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Rundeck node documentation integration templates](https://n8n.io/integrations/rundeck) or [search all templates](https://n8n.io/workflows/)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}

## Find the job ID <a href="#find-the-job-id" id="find-the-job-id"></a>

1. Access your Rundeck dashboard.
2. Open the project that contains the job you want to use with n8n.
3. In the sidebar, select **JOBS**.
4. Under **All Jobs**, select the name of the job you want to use with n8n.
5. In the top left corner, under the name of the job, copy the string that's displayed in smaller font below the job name. This is your job ID.
6. Paste this job ID in the **Job Id** field in n8n.

