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

These environment variables configure the durable scheduler, which runs time-based workflows from a database-backed queue instead of from each instance's memory. For what the durable scheduler changes, how to turn it on, and how it works, see [Durable scheduler](../../durable-scheduler.md).

{% hint style="warning" %}
**Preview feature**

The durable scheduler is a preview feature behind an environment flag. The environment variables and default behavior can change before the feature reaches general availability.
{% endhint %}

## Environment variables <a href="#environment-variables" id="environment-variables"></a>

### Enable the scheduler <a href="#enable-vars" id="enable-vars"></a>

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_ENABLED` | Boolean | `false` | Whether to turn on the durable scheduler. When on, the scheduler stores scheduled runs in the database before they execute, so a restart doesn't drop them and, across multiple instances, each run executes once. Requires `N8N_USE_WORKFLOW_PUBLICATION_SERVICE` to take over Schedule Trigger nodes. |

### Materialization <a href="#materialization-vars" id="materialization-vars"></a>

Controls how far ahead and how often the scheduler records upcoming runs to the database.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_MATERIALIZATION_WINDOW` | Number | `60` | How far into the future, in seconds, the scheduler records upcoming runs. A larger window commits more runs in advance (more resilient to downtime, slightly more storage churn). Must be greater than 0. |
| `N8N_SCHEDULER_MATERIALIZATION_INTERVAL` | Number | `10` | How often, in seconds, the scheduler scans active schedules to record the runs falling within the window. Must be greater than 0. |
| `N8N_SCHEDULER_MATERIALIZATION_TIMEOUT` | Number | `60` | How long, in seconds, a single scan may run before it's abandoned and retried on the next interval. Guards against a scan stuck on a slow database. Must be greater than 0. |

### Execution <a href="#execution-vars" id="execution-vars"></a>

Controls how often the scheduler starts due runs and how it claims each one so only one instance runs it.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_EXECUTOR_INTERVAL` | Number | `5` | How often, in seconds, the scheduler checks for recorded runs whose time has arrived and starts them. Sets the worst-case delay between a run's scheduled time and when it starts. Lower it for tighter timing at the cost of more frequent polling. Must be greater than 0. |
| `N8N_SCHEDULER_EXECUTOR_TIMEOUT` | Number | `60` | How long, in seconds, a single check for due runs may run before it's abandoned and retried on the next interval. Must be greater than 0. |
| `N8N_SCHEDULER_LEASE_DURATION` | Number | `60` | How long, in seconds, an instance holds an exclusive claim on a run it picked up, so no other instance starts the same one. If the instance stops without finishing, the claim expires after this long and another instance may take over. Keep it comfortably above the time a run needs to get going: too short risks a double run, too long delays recovery after a crash. Must be greater than 0. |
| `N8N_SCHEDULER_CLAIM_BATCH_SIZE` | Number | `100` | The most runs a single claim takes from the queue in one pass. Larger batches drain a backlog faster but hold more work on one instance per tick. Must be greater than 0. |

### Recovery <a href="#recovery-vars" id="recovery-vars"></a>

Controls the reaper, which releases runs an instance claimed but never finished so another instance can take them.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_REAPER_INTERVAL` | Number | `30` | How often, in seconds, the scheduler looks for runs an instance claimed but never finished (for example after a crash or shutdown) and makes them available again. Must be greater than 0. |
| `N8N_SCHEDULER_REAPER_BATCH_SIZE` | Number | `100` | The most expired-claim runs a single reaper pass reclaims. Larger batches recover a backlog faster but hold more work on one instance per pass. Must be greater than 0. |
| `N8N_SCHEDULER_REAPER_TIMEOUT` | Number | `60` | How long, in seconds, a single recovery pass may run before it's abandoned and retried on the next interval. Must be greater than 0. |

### Retention <a href="#retention-vars" id="retention-vars"></a>

Controls how long the scheduler keeps finished runs as history and how often it deletes old ones. n8n keeps failed and missed runs longer than clean ones so you have time to notice and debug a problem.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_RETENTION` | Number | `86400` | How long, in seconds, the scheduler keeps runs that finished cleanly (a success or a cancellation) before deleting them. Defaults to one day. Raise it to keep more history, lower it to reclaim database space sooner. Must be greater than 0. |
| `N8N_SCHEDULER_FAILED_RETENTION` | Number | `604800` | How long, in seconds, the scheduler keeps runs that went wrong (a failure, or a missed run) before deleting them. Defaults to seven days. Keep it longer than `N8N_SCHEDULER_RETENTION` so there's time to debug; the scheduler warns if you set it lower. Must be greater than 0. |
| `N8N_SCHEDULER_RETENTION_INTERVAL` | Number | `3600` | How often, in seconds, the scheduler deletes finished runs older than the retention windows. Defaults to one hour. Must be greater than 0. |
| `N8N_SCHEDULER_RETENTION_TIMEOUT` | Number | `300` | How long, in seconds, a single cleanup pass may run before it's abandoned and retried on the next interval. Defaults to five minutes. Must be greater than 0. |

### Coordination across instances <a href="#coordination-vars" id="coordination-vars"></a>

Controls how the scheduler overlaps its background passes and spreads database load across instances.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_MAX_CONCURRENT_PASSES` | Number | `10` | The most background passes of the same kind that can run at once on one instance, when the database supports overlapping passes (PostgreSQL). If a pass comes due while the limit is already in use, n8n skips it. On SQLite, passes never overlap, so this setting has no effect. Must be greater than 0. |
| `N8N_SCHEDULER_JITTER_RATIO` | Number | `0.1` | A small random variation added to the timing of each periodic pass, as a fraction of the interval. With `0.1`, a pass set to run every 10 seconds actually runs every 9 to 11 seconds. This spreads out database queries from instances started at the same time, such as during a rolling deploy. Set it to `0` for exact intervals, or raise it to spread load more evenly. Must be at least 0 and below 1. |

### Schedule behavior <a href="#behavior-vars" id="behavior-vars"></a>

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_MIN_INTERVAL` | Number | `0` | The smallest gap, in seconds, allowed between consecutive runs of the same schedule. n8n slows a schedule set to run more often down to this gap. Defaults to `0`, which disables the limit and honors whatever interval each schedule specifies. Set it to stop a runaway every-second schedule from overloading the instance. |
| `N8N_SCHEDULER_TRIGGER_NODE_MODE` | Enum (`legacy`, `new`) | `legacy` | How a Schedule Trigger node's "every N seconds" and "every N minutes" schedules fire. `legacy` keeps clock-aligned timing matching the in-memory scheduler; `new` spaces runs a steady N apart from activation time. Only affects second and minute intervals. See [Schedule Trigger timing](../../durable-scheduler.md#trigger-node-mode). |
