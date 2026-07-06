---
title: Insights environment variables
description: >-
  Configure insights metrics collection with environment variables for your
  self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Insights
originalFilePath: hosting/configuration/environment-variables/insights.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/insights'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/insights
layout:
  description:
    visible: false
---

# Insights environment variables <a href="#insights-environment-variables" id="insights-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

Insights gives instance owners and admins visibility into how workflows perform over time. Refer to [Insights](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights) for details.

{% hint style="warning" %}
**Storage and compaction thresholds**

`N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS` and `N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS` set how many days n8n keeps high-resolution insights (metrics stored in one-hour buckets) before each compaction step (from the hour bucket to the day bucket, then from the day bucket to the week bucket). You configure those day counts on your instance.

Raising the values delays compaction. That adds more rows to `insights_by_period` and increases database usage. For how this relates to retention, see [Insights](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/observe-and-log/track-usage-with-insights#disable-or-configure-insights-metrics-collection).
{% endhint %}

If you encounter database load issues during compaction, tune how often compaction runs and how much work n8n does in each run:

- Decrease `N8N_INSIGHTS_COMPACTION_INTERVAL_MINUTES` to run compaction more often. This can reduce the amount of data that builds up between runs.
- Increase `N8N_INSIGHTS_COMPACTION_BATCH_DELAY_MILLISECONDS` to wait longer between batches.
- Decrease `N8N_INSIGHTS_COMPACTION_MAX_BATCHES_PER_RUN` to process fewer batches in each run.
- Decrease `N8N_INSIGHTS_COMPACTION_MAX_RUNTIME_SECONDS` to stop each run sooner.

These settings only control compaction workload and scheduling. They don't change retention or the age thresholds for each compaction step.



 | Variable                                                 | Type   | Default | Description                                                                             |
 |:---------------------------------------------------------|:-------|:--------|:----------------------------------------------------------------------------------------|
 | `N8N_DISABLED_MODULES`                                   | String | -       | Set to `insights` to disable the feature and metrics collection for an instance.        |
 | `N8N_INSIGHTS_COMPACTION_BATCH_SIZE`                     | Number | 500     | The number of raw insights data to compact in a single batch.                           |
 | `N8N_INSIGHTS_COMPACTION_BATCH_DELAY_MILLISECONDS`       | Number | 100     | Delay in milliseconds between full compaction batches. Increase this to wait longer between batches. Set to `0` to skip the delay. |
 | `N8N_INSIGHTS_COMPACTION_DAILY_TO_WEEKLY_THRESHOLD_DAYS` | Number | 180     | Age in days after which n8n compacts daily insights rows to weekly. |
 | `N8N_INSIGHTS_COMPACTION_HOURLY_TO_DAILY_THRESHOLD_DAYS` | Number | 90      | Age in days after which n8n compacts hourly insights rows to daily. |
 | `N8N_INSIGHTS_COMPACTION_INTERVAL_MINUTES`               | Number | 60      | Interval (in minutes) at which compaction should run. Decrease this to run compaction more often and reduce how much data builds up between runs. |
 | `N8N_INSIGHTS_COMPACTION_MAX_BATCHES_PER_RUN`            | Number | 1000    | Maximum number of compaction batches to process in one run. Decrease this to process fewer batches per run. Set to `0` to disable this limit. |
 | `N8N_INSIGHTS_COMPACTION_MAX_RUNTIME_SECONDS`            | Number | 300     | Maximum runtime in seconds for one compaction run. Decrease this to stop each run sooner. Set to `0` to disable this limit. |
 | `N8N_INSIGHTS_FLUSH_BATCH_SIZE`                          | Number | 1000    | The maximum number of insights data to keep in the buffer before flushing.              |
 | `N8N_INSIGHTS_FLUSH_INTERVAL_SECONDS`                    | Number | 30      | The interval (in seconds) at which n8n flushes insights data to the database. |
 | `N8N_INSIGHTS_MAX_AGE_DAYS`                              | Number | 365     | Number of days n8n keeps compacted insights data before pruning. The maximum value is 730 (two years). |
 | `N8N_INSIGHTS_PRUNE_CHECK_INTERVAL_HOURS`                | Number | 24      | How often (in hours) the instance checks for insights data older than the effective max age and deletes it. |


