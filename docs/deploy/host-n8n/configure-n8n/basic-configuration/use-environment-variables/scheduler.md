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

Turn on Prometheus metrics for the durable scheduler with `N8N_METRICS_INCLUDE_SCHEDULER_METRICS` and `N8N_METRICS_SCHEDULER_INTERVAL`, which live with the other metrics variables on the [Endpoints](endpoints.md) page. For what each metric means, see [Durable scheduler observability](../../durable-scheduler.md#observability).

{% hint style="info" %}
**Feature availability**

The durable scheduler is available from n8n 2.36.0. Earlier versions back to n8n 2.32.0 include it as a Preview feature.
{% endhint %}

## Enable the scheduler <a href="#enable-vars" id="enable-vars"></a>

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_ENABLED` | Boolean | `false` | Whether to turn on the durable scheduler. When on, the scheduler stores scheduled runs in the database before they execute, so a restart doesn't drop them and, across multiple instances, each run executes once. Requires `N8N_USE_WORKFLOW_PUBLICATION_SERVICE` to take over Schedule Trigger nodes. |
| `N8N_SCHEDULER_POLL_TRIGGERS_ENABLED` | Boolean | `false` | Whether the durable scheduler also takes over polling triggers (trigger nodes with a Poll Times parameter). Requires `N8N_SCHEDULER_ENABLED` and `N8N_USE_WORKFLOW_PUBLICATION_SERVICE`. Available from n8n 2.33.0. |
| `N8N_ENV_FEAT_SKIP_DURABLE_SCHEDULER` | Boolean | `false` | Whether Schedule Trigger nodes show a **Skip Durable Scheduler** setting that keeps an individual trigger on the in-memory scheduler while the durable scheduler is on. A temporary escape hatch for migrating gradually; a future release will remove it. |

{% hint style="warning" %}
Poll trigger support isn't 100% stable yet. Keep `N8N_SCHEDULER_POLL_TRIGGERS_ENABLED` off in production unless you're prepared to keep a close watch on your polling workflows: check their execution lists for gaps or duplicate runs, and turn on scheduler metrics to watch scheduling lag, retries, and dead-letters (see [Durable scheduler observability](../../durable-scheduler.md#observability)). This doesn't affect Schedule Trigger support, which is stable.
{% endhint %}

## Poll triggers

Controls trigger nodes with a **Poll Times** parameter (such as Google Sheets Trigger or Airtable Trigger): how they store their cursor, the node's record of how far it has already read, and how long a single poll may run. To route these nodes through the durable scheduler, turn on `N8N_SCHEDULER_POLL_TRIGGERS_ENABLED` (in the Enable the scheduler table). See [Poll triggers](../../durable-scheduler.md#poll-triggers).

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_POLLER_DURABLE_CURSORS_ENABLED` | Boolean | `false` | Whether n8n stores a poll trigger node's cursor in a dedicated database table and commits it in the same transaction as the execution the poll produced, so a crash mid-poll can't drop or duplicate data. Available from n8n 2.36.0. From n8n 2.37.0, requires `N8N_SCHEDULER_ENABLED`, `N8N_SCHEDULER_POLL_TRIGGERS_ENABLED`, and `N8N_USE_WORKFLOW_PUBLICATION_SERVICE`. See [Durable poll cursors](../../durable-scheduler.md#durable-poll-cursors). |
| `N8N_SCHEDULER_POLL_TIMEOUT` | Number | `45` | How long, in seconds, a single poll may run before n8n abandons it. An abandoned poll records nothing: the cursor stays put and the next poll covers the same ground, so no data goes missing. A poll that keeps timing out counts as failing, so n8n re-polls it at a widening interval. Keep the timeout below `N8N_SCHEDULER_LEASE_DURATION`: the timeout clock only starts once the poll itself does, so a poll allowed the full lease can still be running when another instance takes its run over. n8n warns at startup when the timeout reaches the lease duration. Must be greater than 0. Available from n8n 2.37.0. |

## Materialization <a href="#materialization-vars" id="materialization-vars"></a>

Controls how far ahead and how often the scheduler records upcoming runs to the database.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_MATERIALIZATION_WINDOW` | Number | `60` | How far into the future, in seconds, the scheduler records upcoming runs. A larger window commits more runs in advance (more resilient to downtime, slightly more storage churn). Must be greater than 0. |
| `N8N_SCHEDULER_MATERIALIZATION_INTERVAL` | Number | `10` | How often, in seconds, the scheduler scans active schedules to record the runs falling within the window. Must be greater than 0. |
| `N8N_SCHEDULER_MATERIALIZATION_TIMEOUT` | Number | `60` | How long, in seconds, a single scan may run before it's abandoned and retried on the next interval. Guards against a scan stuck on a slow database. Must be greater than 0. |

## Execution <a href="#execution-vars" id="execution-vars"></a>

Controls how often the scheduler starts due runs and how it claims each one so only one instance runs it.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_EXECUTOR_INTERVAL` | Number | `5` | How often, in seconds, the scheduler checks for recorded runs coming due. Each check claims the runs due within the next interval and holds them on a precise timer, so a run starts at its scheduled instant rather than on the polling cadence. The interval caps how long the scheduler takes to pick up a newly activated or edited schedule. Must be greater than 0. |
| `N8N_SCHEDULER_EXECUTOR_TIMEOUT` | Number | `60` | How long, in seconds, a single check for due runs may run before it's abandoned and retried on the next interval. Must be greater than 0. |
| `N8N_SCHEDULER_LEASE_DURATION` | Number | `60` | How long, in seconds, an instance holds an exclusive claim on a run it picked up, so no other instance starts the same one. If the instance stops without finishing, the claim expires after this long and another instance may take over. Keep it comfortably above the time a run needs to get going: too short risks a double run, too long delays recovery after a crash. Must be greater than 0. |
| `N8N_SCHEDULER_CLAIM_BATCH_SIZE` | Number | `100` | The most runs a single claim takes from the queue in one pass. Larger batches drain a backlog faster but hold more work on one instance per tick. Must be greater than 0. |

## Recovery <a href="#recovery-vars" id="recovery-vars"></a>

Controls the reaper, which releases runs an instance claimed but never finished so another instance can take them.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_REAPER_INTERVAL` | Number | `30` | How often, in seconds, the scheduler looks for runs an instance claimed but never finished (for example after a crash or shutdown) and makes them available again. Must be greater than 0. |
| `N8N_SCHEDULER_REAPER_BATCH_SIZE` | Number | `100` | The most expired-claim runs a single reaper pass reclaims. Larger batches recover a backlog faster but hold more work on one instance per pass. Must be greater than 0. |
| `N8N_SCHEDULER_REAPER_TIMEOUT` | Number | `60` | How long, in seconds, a single recovery pass may run before it's abandoned and retried on the next interval. Must be greater than 0. |
| `N8N_SCHEDULER_MAX_ATTEMPTS` | Number | `5` | How many times a scheduled run may be reclaimed (for example after a crash) or retried on error before n8n gives up on it and dead-letters it. Raise it on infrastructure prone to instance restarts or transient errors; lower it to give up and move on sooner. Must be greater than 0. |

## Retention <a href="#retention-vars" id="retention-vars"></a>

Controls how long the scheduler keeps finished runs as history and how often it deletes old ones. n8n keeps failed and missed runs longer than clean ones so you have time to notice and debug a problem.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_RETENTION` | Number | `86400` | How long, in seconds, the scheduler keeps runs that finished cleanly (a success or a cancellation) before deleting them. Defaults to one day. Raise it to keep more history, lower it to reclaim database space sooner. Must be greater than 0. |
| `N8N_SCHEDULER_FAILED_RETENTION` | Number | `604800` | How long, in seconds, the scheduler keeps runs that went wrong (a failure, or a missed run) before deleting them. Defaults to seven days. Keep it longer than `N8N_SCHEDULER_RETENTION` so there's time to debug; the scheduler warns if you set it lower. Must be greater than 0. |
| `N8N_SCHEDULER_RETENTION_INTERVAL` | Number | `3600` | How often, in seconds, the scheduler deletes finished runs older than the retention windows. Defaults to one hour. Must be greater than 0. |
| `N8N_SCHEDULER_RETENTION_TIMEOUT` | Number | `300` | How long, in seconds, a single cleanup pass may run before it's abandoned and retried on the next interval. Defaults to five minutes. Must be greater than 0. |

## Owner reconciliation

Controls the sweep that retires schedules whose owner no longer exists, such as a workflow that's no longer published. The sweep stops them right away and deletes them after a grace period. See [How the durable scheduler works](../../durable-scheduler.md#how-it-works).

{% hint style="info" %}
**Feature availability**

Owner reconciliation is available from n8n 2.39.0.
{% endhint %}

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_OWNER_RECONCILIATION_ENABLED` | Boolean | `true` | Whether the scheduler periodically checks that every schedule's owner still exists and retires the schedules whose owner is missing. Turning it off leaves those schedules in place. |
| `N8N_SCHEDULER_OWNER_RECONCILIATION_INTERVAL` | Number | `900` | How often, in seconds, the sweep runs. Defaults to 15 minutes. It's a safety net rather than the usual cleanup path, so a long interval is fine. Must be greater than 0. |
| `N8N_SCHEDULER_OWNER_RECONCILIATION_TIMEOUT` | Number | `300` | How long, in seconds, a single sweep may run before it's abandoned and retried on the next interval. Defaults to five minutes. Must be greater than 0. |
| `N8N_SCHEDULER_OWNER_RECONCILIATION_BATCH_SIZE` | Number | `500` | How many owners the sweep checks per database query. Larger batches finish a sweep in fewer queries; smaller ones keep each query light. Must be between 1 and 1000. |
| `N8N_SCHEDULER_OWNER_QUARANTINE_GRACE` | Number | `86400` | How long, in seconds, the sweep keeps a stopped schedule before deleting it. Defaults to one day. The schedule stops firing as soon as the sweep finds it, so this only delays the delete. Must be greater than 0. |
| `N8N_SCHEDULER_OWNER_SETTLE_PERIOD` | Number | `300` | How old, in seconds, a schedule must be before the sweep considers it. Defaults to five minutes. n8n can write a schedule a moment before its owner, so this stops the sweep from mistaking a brand-new schedule for an abandoned one. Must be greater than 0. |

## Coordination across instances <a href="#coordination-vars" id="coordination-vars"></a>

Controls how the scheduler overlaps its background passes and spreads database load across instances.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_MAX_CONCURRENT_PASSES` | Number | `10` | The most background passes of the same kind that can run at once on one instance, when the database supports overlapping passes (PostgreSQL). If a pass comes due while the limit is already in use, n8n skips it. On SQLite, passes never overlap, so this setting has no effect. Must be greater than 0. |
| `N8N_SCHEDULER_JITTER_RATIO` | Number | `0.1` | A small random variation added to the timing of each periodic pass, as a fraction of the interval. With `0.1`, a pass set to run every 10 seconds actually runs every 9 to 11 seconds. This spreads out database queries from instances started at the same time, such as during a rolling deploy. Set it to `0` for exact intervals, or raise it to spread load more evenly. Must be at least 0 and below 1. |

## Schedule behavior <a href="#behavior-vars" id="behavior-vars"></a>

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_MIN_INTERVAL` | Number | `0` | The smallest gap, in seconds, allowed between consecutive runs of the same schedule. n8n slows a schedule set to run more often down to this gap. Defaults to `0`, which disables the limit and honors whatever interval each schedule specifies. Set it to stop a runaway every-second schedule from overloading the instance. |
| `N8N_SCHEDULER_TRIGGER_NODE_MODE` | Enum (`legacy`, `new`) | `legacy` | How a Schedule Trigger node's "every N seconds" and "every N minutes" schedules fire. `legacy` keeps clock-aligned timing matching the in-memory scheduler; `new` spaces runs a steady N apart from activation time. Only affects second and minute intervals. See [Schedule Trigger timing](../../durable-scheduler.md#trigger-node-mode). |
| `N8N_SCHEDULER_MISFIRE_GRACE` | Number | `60` | How late, in seconds, a run may start and still count as on time. A run later than this counts as missed, and its trigger's misfire policy decides what happens to it and to any backlog behind it. This is the default a schedule inherits; from n8n 2.36.0, a Schedule Trigger node can set its own grace period instead. Should exceed `N8N_SCHEDULER_EXECUTOR_INTERVAL` and be at least `N8N_SCHEDULER_MATERIALIZATION_WINDOW`; n8n warns at startup if it doesn't. Capped at 30 days. See [Misfire policy](../../durable-scheduler.md#misfire-policy). Available from n8n 2.34.0. |
