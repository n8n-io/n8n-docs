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

/// warning | Storage and compaction thresholds
`N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS` and `N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS` set how many days n8n keeps high-resolution insights (metrics stored in one-hour buckets) before each compaction step (from the hour bucket to the day bucket, then from the day bucket to the week bucket). You configure those day counts on your instance.

Raising the values delays compaction. That adds more rows to `insights_by_period` and increases database usage. For how this relates to retention, see [Insights](/insights.md#disable-or-configure-insights-metrics-collection).
///

<!-- vale from-write-good.Weasel = NO -->

 | Variable                                                 | Type   | Default | Description                                                                             |
 |:---------------------------------------------------------|:-------|:--------|:----------------------------------------------------------------------------------------|
 | `N8N_DISABLED_MODULES`                                   | String | -       | Set to `insights` to disable the feature and metrics collection for an instance.        |
 | `N8N_INSIGHTS_COMPACTION_BATCH_SIZE`                     | Number | 500     | The number of raw insights data to compact in a single batch.                           |
 | `N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS` | Number | 180     | Age in days after which n8n compacts daily insights rows to weekly. |
 | `N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS` | Number | 90      | Age in days after which n8n compacts hourly insights rows to daily. |
 | `N8N_INSIGHTS_COMPACTION_INTERVAL_MINUTES`               | Number | 60      | Interval (in minutes) at which compaction should run.                                   |
 | `N8N_INSIGHTS_FLUSH_BATCH_SIZE`                          | Number | 1000    | The maximum number of insights data to keep in the buffer before flushing.              |
 | `N8N_INSIGHTS_FLUSH_INTERVAL_SECONDS`                    | Number | 30      | The interval (in seconds) at which n8n flushes insights data to the database. |
 | `N8N_INSIGHTS_MAX_AGE_DAYS`                              | Number | 365     | Number of days n8n keeps compacted insights data before pruning. The maximum value is 730 (two years). |
 | `N8N_INSIGHTS_PRUNE_CHECK_INTERVAL_HOURS`                | Number | 24      | How often (in hours) the instance checks for insights data older than the effective max age and deletes it. |

<!-- vale from-write-good.Weasel = YES -->
