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

The durable scheduler runs time-based workflows, such as those that start with a Schedule Trigger node, from a database-backed queue instead of from each instance's memory. This page explains what the durable scheduler changes, how to turn it on, and what each environment variable does.

{% hint style="warning" %}
**Preview feature**

The durable scheduler is a preview feature behind an environment flag. The environment variables and default behavior can change before the feature reaches general availability.
{% endhint %}

{% hint style="info" %}
The durable scheduler is off by default and rolling out gradually. Existing instances keep using the in-memory scheduler and behave as before until you opt in. n8n recommends testing it in a non-production environment first.
{% endhint %}

## In-memory scheduler compared to the durable scheduler <a href="#in-memory-vs-durable" id="in-memory-vs-durable"></a>

By default, n8n schedules time-based workflows in memory. Each main instance works out when its active schedules should fire and holds those timers in its own process. This works well for a single instance, but it has limits:

- **Restarts lose pending runs.** When an instance stops, its in-memory timers go with it. n8n skips any run whose time passed during the downtime rather than catching it up.
- **Multiple instances need a leader.** In a multi-main setup, only the leader fires schedules. If leadership changes at the wrong moment, timing can slip.

The durable scheduler addresses both by moving scheduling into the database:

- **Runs survive restarts.** The scheduler records each upcoming run in the database before it's due. A restart doesn't drop it. A run whose time passed while the instance was down still runs when the instance comes back, so it fires late rather than not at all.
- **Each run executes once across instances.** Every main instance shares the same queue and claims runs from it. Only one instance picks up each run, so the work spreads across your mains instead of depending on a single leader.

### What changes functionally <a href="#functional-changes" id="functional-changes"></a>

When you turn the durable scheduler on, keep these behavior changes in mind:

- **Timing precision.** The scheduler checks for due runs on a short interval (`N8N_SCHEDULER_EXECUTOR_INTERVAL`, five seconds by default), so a run can start up to one interval after its scheduled time. The in-memory scheduler fires closer to the exact instant.
- **Clock-aligned timing is the default.** For "every N seconds" and "every N minutes" schedules, the durable scheduler keeps the same clock-aligned timing as the in-memory scheduler unless you change `N8N_SCHEDULER_TRIGGER_NODE_MODE`. See [Schedule Trigger timing](#trigger-node-mode).
- **Late runs after downtime.** Because the scheduler records runs in advance, a run missed during downtime fires when the instance recovers instead of dropping.

## Turn on the durable scheduler <a href="#turn-on" id="turn-on"></a>

Set `N8N_SCHEDULER_ENABLED` to `true` to opt in.

{% hint style="warning" %}
The durable scheduler only takes over Schedule Trigger nodes when the workflow publication service is also on. Set both `N8N_SCHEDULER_ENABLED` and `N8N_USE_WORKFLOW_PUBLICATION_SERVICE` to `true`. If you enable the scheduler without the publication service, n8n logs a warning and Schedule Trigger nodes keep running on the in-memory scheduler.
{% endhint %}

The remaining variables only take effect once the scheduler is on. The defaults suit most instances, so change them only to tune timing precision, storage, or load across instances. All durations are in seconds unless stated otherwise.

## How the durable scheduler works <a href="#how-it-works" id="how-it-works"></a>

These terms make the environment variables easier to reason about:

- **Schedule**: a recurring rule, such as a Schedule Trigger node's "every 15 minutes" setting. The scheduler stores each schedule in the database.
- **Run**: a single firing of a schedule at a specific time. The scheduler records upcoming runs ahead of time as individual rows.

The scheduler moves each run through four stages, and each stage has its own environment variables:

1. **Materialization.** The scheduler scans your active schedules and records the runs coming up soon (within the *materialization window*). This commits runs to the database before they're due.
2. **Execution.** The scheduler checks for recorded runs whose time has arrived, claims each one so no other instance takes it, and starts the workflow.
3. **Recovery.** If an instance claims a run but stops before finishing (for example after a crash), the *reaper* releases the run so another instance can pick it up.
4. **Retention.** The scheduler keeps finished runs for a while as recent history, then deletes them to keep its tables small.

Across multiple instances, every main runs all four stages. Claiming keeps this safe: because only one instance claims each run, running the loops everywhere shares the load rather than duplicating work.

## Schedule Trigger timing (deviations) <a href="#trigger-node-mode" id="trigger-node-mode"></a>

Under the durable scheduler, most Schedule Trigger schedules fire the same way they did in memory. On top of the instance-wide changes above (late runs after downtime, and each run executing once across instances), two cadences fire differently from the in-memory scheduler in specific cases:

- **"Every N seconds" and "every N minutes".** `N8N_SCHEDULER_TRIGGER_NODE_MODE` controls how these fire. It's the only cadence the setting affects.
- **"Every N hours", "days", "weeks", or "months".** These fire as before in everyday use, under either mode. The durable scheduler handles a few rare calendar edge cases more correctly than the in-memory scheduler: leap years, the 53rd week of a year, and daylight-saving transitions, where the in-memory scheduler could be off by one period.

`N8N_SCHEDULER_TRIGGER_NODE_MODE` has two values:

- `legacy` (default): runs fire on clock boundaries, the same as the in-memory scheduler. "Every 30 seconds" fires at :00 and :30 of each minute. The pattern restarts at the top of every minute, so an interval that doesn't divide evenly into 60 leaves an uneven gap at the minute boundary. "Every 7 seconds" fires at :00, :07, :14, and so on up to :56, then jumps back to :00, a 4-second gap instead of 7.
- `new`: runs fire a fixed number of seconds apart, counted from the moment you activated the workflow instead of from clock boundaries. If you activate at :07, "every 30 seconds" fires at :07, :37, :07, and so on. The gap stays exactly the interval you set, including across minute boundaries, so "every 7 seconds" never drifts.

`legacy` is the default, so timing stays the same while the durable scheduler rolls out. `new` is the intended future default.

{% hint style="info" %}
`N8N_SCHEDULER_TRIGGER_NODE_MODE` only affects "every N seconds" and "every N minutes" schedules. Every other cadence, including raw cron expressions, fires the same way under either value.
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
| `N8N_SCHEDULER_TRIGGER_NODE_MODE` | Enum (`legacy`, `new`) | `legacy` | How a Schedule Trigger node's "every N seconds" and "every N minutes" schedules fire. `legacy` keeps clock-aligned timing matching the in-memory scheduler; `new` spaces runs a steady N apart from activation time. Only affects second and minute intervals. See [Schedule Trigger timing](#trigger-node-mode). |
