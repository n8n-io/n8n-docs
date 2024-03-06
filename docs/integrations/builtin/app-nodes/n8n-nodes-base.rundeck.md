---
title: Rundeck
description: Documentation for the Rundeck node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Rundeck

Use the Rundeck node to automate work in Rundeck, and integrate Rundeck with other applications. n8n has built-in support for executing jobs and getting metadata.

On this page, you'll find a list of operations the Rundeck node supports and links to more resources.

/// note | Credentials
Refer to [Rundeck credentials](/integrations/builtin/credentials/rundeck/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Rundeck integrations](https://n8n.io/integrations/rundeck/){:target="_blank" .external-link} list.
///

## Basic Operations

**Job**
- Execute a job
- Get metadata of a job

## FAQs

### How do I find the Job ID?

1. Access your Rundeck dashboard.
2. Open the project that contains the job you want to use with n8n.
3. In the sidebar, click on 'JOBS'.
4. Under 'All Jobs', click on the name of the job you want to use with n8n.
5. In the top left corner, under the name of the job, copy the string that's displayed in smaller font below the job name. This is your job ID.
6. Paste this job ID in the `Job Id` field in n8n.

