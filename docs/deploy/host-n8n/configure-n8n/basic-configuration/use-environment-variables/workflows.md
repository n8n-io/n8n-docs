---
title: Workflows environment variables
description: >-
  Environment variables to configure workflows in n8n, including default naming,
  onboarding flow preferences, tag management, and caller policy settings.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Workflows
originalFilePath: hosting/configuration/environment-variables/workflows.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/workflows'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/workflows
layout:
  description:
    visible: false
---

# Workflows environment variables <a href="#workflows-environment-variables" id="workflows-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_ONBOARDING_FLOW_DISABLED` | Boolean | `false` | Whether to disable onboarding tips when creating a new workflow (true) or not (false). |
| `N8N_WORKFLOW_ACTIVATION_BATCH_SIZE` | Number | `1` | How many workflows to publish simultaneously during startup. 
| `N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION` | String | `workflowsFromSameOwner` | Which workflows can call a workflow. Options are: `any`, `none`, `workflowsFromAList`, `workflowsFromSameOwner`. This feature requires [Workflow sharing](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/share-with-others). |
| `N8N_WORKFLOW_TAGS_DISABLED` | Boolean | `false` | Whether to disable workflow tags (true) or enable tags (false). |
| `WORKFLOWS_DEFAULT_NAME` | String | `My workflow` | The default name used for new workflows. |
