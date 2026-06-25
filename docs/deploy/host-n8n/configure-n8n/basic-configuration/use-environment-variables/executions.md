---
title: Executions environment variables
description: Environment variables to configure settings related to workflow executions.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Executions
originalFilePath: hosting/configuration/environment-variables/executions.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/executions'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/executions
layout:
  description:
    visible: false
---

# Executions environment variables <a href="#executions-environment-variables" id="executions-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

This page lists environment variables to configure workflow execution settings.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `EXECUTIONS_MODE` | Enum string: `regular`, `queue` | `regular` | Whether executions should run directly or using queue.<br><br>Refer to [Queue mode](../../scaling/enable-queue-mode.md) for more details. |
| `EXECUTIONS_TIMEOUT` | Number | `-1` | Sets a default timeout (in seconds) to all workflows after which n8n stops their execution. Users can override this for individual workflows up to the duration set in `EXECUTIONS_TIMEOUT_MAX`. Set `EXECUTIONS_TIMEOUT` to `-1` to disable. |
| `EXECUTIONS_TIMEOUT_MAX` | Number | `3600` | The maximum execution time (in seconds) that users can set for an individual workflow. |
| `N8N_AI_TIMEOUT_MAX` | Number | `3600000` | Sets the HTTP request timeout in milliseconds for AI and LLM nodes (such as OpenAI, Anthropic, Mistral, and Ollama). This controls how long n8n waits for responses from AI services before timing out. Useful for slower local AI services or complex prompts that require longer processing time. |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | Enum string: `all`, `none` | `all` | Whether n8n saves execution data on error. |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | Enum string: `all`, `none` | `all` | Whether n8n saves execution data on success. |
| `EXECUTIONS_DATA_SAVE_ON_PROGRESS` | Boolean | `false` | Whether to save progress for each node executed (true) or not (false). |
| `EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS` | Boolean | `true` | Whether to save data of executions when started manually. |
| `N8N_EXECUTION_DATA_STORAGE_MODE` | Enum string: `database`, `filesystem`, `s3`, `azure` | `database` | Where n8n stores execution data. The `s3` and `azure` modes require an Enterprise license. Refer to [External data storage](external-data-storage.md) for the related storage variables. |
| `N8N_STORAGE_PATH` | String | `N8N_USER_FOLDER/storage` | Base path for filesystem storage. When `N8N_EXECUTION_DATA_STORAGE_MODE` is `filesystem`, n8n stores execution data here. n8n also uses this path for filesystem binary data. |
| `EXECUTIONS_DATA_PRUNE` | Boolean | `true` | Whether to delete data of past executions on a rolling basis. |
| `EXECUTIONS_DATA_MAX_AGE` | Number | `336` | The execution age (in hours) before it's deleted. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | Number | `10000` | Maximum number of executions to keep in the database. 0 = no limit |
| `EXECUTIONS_DATA_HARD_DELETE_BUFFER` | Number | `1` | How old (hours) the finished execution data has to be to get hard-deleted. By default, this buffer excludes recent executions as the user may need them while building a workflow. |
| `EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL` | Number | `15` | How often (minutes) execution data should be hard-deleted. |
| `EXECUTIONS_DATA_PRUNE_SOFT_DELETE_INTERVAL` | Number | `60` | How often (minutes) execution data should be soft-deleted. |
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | Number | `-1` | Max production executions allowed to run concurrently, in both regular and scaling modes. `-1` to disable in regular mode. |
| `N8N_CONCURRENCY_EVALUATION_LIMIT` | Number | License-tier default | Max test cases that can run in parallel within a single [evaluation](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/test-and-improve-ai-workflows/use-metrics-to-measure-quality#run-test-cases-in-parallel) test run. When unset, the limit follows the license tier (Community/Pro: 1, Business: 3, Enterprise: 5). Setting this overrides the tier default. |
| `N8N_WORKFLOW_AUTODEACTIVATION_ENABLED` | Boolean | `false` | Whether workflows are automatically unpublished after repeated crashed executions. |
| `N8N_WORKFLOW_AUTODEACTIVATION_MAX_LAST_EXECUTIONS` | Number | `3` | Number of crashed executions before unpublishing a workflow. |
