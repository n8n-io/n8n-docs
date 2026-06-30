---
title: Scheduler environment variables
description: Environment variables to configure the durable scheduler for your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Scheduler
originalFilePath: hosting/configuration/environment-variables/scheduler.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/scheduler'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/scheduler
layout:
  description:
    visible: false
---

# Scheduler environment variables <a href="#scheduler-environment-variables" id="scheduler-environment-variables"></a>

The durable scheduler runs time-based workflows (such as Schedule Trigger nodes) from a database-backed queue. Due runs are recorded in the database before they start, so they survive restarts, and in a multi-instance setup each run executes once rather than once per instance.

The scheduler is off by default, so existing instances keep using the in-memory scheduler and behave as before. Set `N8N_SCHEDULER_ENABLED` to `true` to opt in. The remaining variables only take effect when the scheduler is enabled; the defaults suit most instances, so change them only to tune timing precision or storage.

All durations are in seconds.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_ENABLED` | Boolean | `false` | Whether the durable scheduler is enabled. When on, scheduled runs are stored in the database before they execute, so a restart doesn't drop them and, across multiple instances, each run executes once. |
| `N8N_SCHEDULER_MATERIALIZATION_WINDOW` | Number | `60` | How far into the future, in seconds, the scheduler works out and records upcoming runs. A larger window commits more runs in advance (more resilient to downtime, slightly more storage churn). Must be greater than 0. |
| `N8N_SCHEDULER_SWEEP_INTERVAL` | Number | `10` | How often, in seconds, the scheduler scans active schedules to record their upcoming runs (those falling within the materialization window). Must be greater than 0. |
| `N8N_SCHEDULER_EXECUTOR_INTERVAL` | Number | `5` | How often, in seconds, the scheduler checks for recorded runs whose time has arrived and starts them. Sets the worst-case delay between a run's scheduled time and when it starts; lower it for tighter timing at the cost of more frequent polling. Must be greater than 0. |
| `N8N_SCHEDULER_REAPER_INTERVAL` | Number | `30` | How often, in seconds, the scheduler looks for runs an instance claimed but never finished (for example after a crash or shutdown) and makes them available again for another instance. Must be greater than 0. |
| `N8N_SCHEDULER_LEASE_DURATION` | Number | `60` | How long, in seconds, a single instance holds an exclusive claim on a run it picked up, so no other instance starts the same one. If that instance stops without finishing, the claim expires after this long and another may take over. Keep it comfortably above the time a run needs to get going. Must be greater than 0. |
| `N8N_SCHEDULER_RETENTION` | Number | `604800` | How long, in seconds, finished runs are kept in the scheduler's tables before being deleted. Defaults to 7 days. Raise it to keep scheduling history longer for auditing; lower it to reclaim database space sooner. Must be greater than 0. |
| `N8N_SCHEDULER_MIN_INTERVAL` | Number | `0` | The smallest gap, in seconds, allowed between consecutive runs of the same schedule. A schedule set to run more often is slowed to this gap. Defaults to `0`, which disables the limit and honors whatever interval each schedule specifies. |
