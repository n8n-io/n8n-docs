---
title: Workflow history environment variables
description: Environment variables to configure workflow history in n8n.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Workflow history
originalFilePath: hosting/configuration/environment-variables/workflow-history.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/environment-variables/workflow-history
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/workflow-history
layout:
  description:
    visible: false
---

# Workflow history environment variables <a href="#workflow-history-environment-variables" id="workflow-history-environment-variables"></a>

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_WORKFLOW_HISTORY_PRUNE_TIME` | Number | `-1` | How long to keep workflow history versions before automatically deleting them (in hours). Set to `-1` to keep all versions indefinitely. |
