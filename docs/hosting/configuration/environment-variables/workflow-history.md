---
title: Workflow history environment variables
description: Environment variables to configure workflow history in n8n.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Workflow history environment variables

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_WORKFLOW_HISTORY_PRUNE_TIME` | Number | `-1` | How long to keep workflow history versions before automatically deleting them (in hours). Set to `-1` to keep all versions indefinitely. |