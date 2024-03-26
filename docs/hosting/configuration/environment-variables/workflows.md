---
title: Workflows
description: Environment variables to configure workflows in n8n, including default naming, onboarding flow preferences, tag management, and caller policy settings.
contentType: reference
hide:
  - toc
---

# Workflows

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `WORKFLOWS_DEFAULT_NAME` | String | `My workflow` | The default name used for new workflows. |
| `N8N_ONBOARDING_FLOW_DISABLED` | Boolean | `false` | Whether to show onboarding tips when creating a new workflow (true) or not (false). |
| `N8N_WORKFLOW_TAGS_DISABLED` | Boolean | `false` | Whether to disable workflow tags (true) or enable tags (false). |
| `N8N_WORKFLOW_CALLER_POLICY_DEFAULT_OPTION` | String | `workflowsFromSameOwner` | Which workflows can call a workflow. Options are: `any`, `none`, `workflowsFromAList`, `workflowsFromSameOwner`. This feature requires [Workflow sharing](/workflows/sharing/). |
