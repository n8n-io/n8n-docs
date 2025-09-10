---
title: Insights environment variables
description: Configure insights metrics collection with environment variables for your self-hosted n8n instance. 
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# Insights environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

Insights gives instance owners and admins visibility into how workflows perform over time. Refer to [Insights](/insights.md) for details.

 | Variable                                                 | Type   | Default | Description                                                                             |
 |:---------------------------------------------------------|:-------|:--------|:----------------------------------------------------------------------------------------|
 | `N8N_DISABLED_MODULES`                                   | String | -       | Set to `insights` to disable the feature and metrics collection for an instance.        |
 | `N8N_INSIGHTS_COMPACTION_BATCH_SIZE`                     | Number | 500     | The number of raw insights data to compact in a single batch.                           |
 | `N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS` | Number | 180     | The maximum age (in days) of daily insights data to compact.                            |
 | `N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS` | Number | 90      | The maximum age (in days) of hourly insights data to compact.                           |
 | `N8N_INSIGHTS_COMPACTION_INTERVAL_MINUTES`               | Number | 60      | Interval (in minutes) at which compaction should run.                                   |
 | `N8N_INSIGHTS_FLUSH_BATCH_SIZE`                          | Number | 1000    | The maximum number of insights data to keep in the buffer before flushing.              |
 | `N8N_INSIGHTS_FLUSH_INTERVAL_SECONDS`                    | Number | 30      | The interval (in seconds) at which the insights data should be flushed to the database. |
