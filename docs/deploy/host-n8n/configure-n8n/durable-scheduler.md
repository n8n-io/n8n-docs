---
title: Durable scheduler
description: How the durable scheduler runs time-based workflows from a database-backed queue for your self-hosted n8n instance.
layout:
  description:
    visible: false
---

# Durable scheduler

The durable scheduler runs time-based workflows, such as those that start with a Schedule Trigger node, from a database-backed queue instead of from each instance's memory. This page explains what the durable scheduler changes, how to turn it on, and how it works. For the environment variables that configure it, see [Scheduler environment variables](basic-configuration/use-environment-variables/scheduler.md).

{% hint style="info" %}
**Feature availability**

The durable scheduler is available from n8n 2.36.0. Earlier versions back to n8n 2.32.0 include it as a Preview feature. It's off by default: existing instances keep using the in-memory scheduler and behave as before until you opt in.
{% endhint %}

## In-memory scheduler compared to the durable scheduler <a href="#in-memory-vs-durable" id="in-memory-vs-durable"></a>

By default, n8n schedules time-based workflows in memory. Each main instance works out when its active schedules should fire and holds those timers in its own process. This works well for a single instance, but it has limits:

- **Restarts lose pending runs.** When an instance stops, its in-memory timers go with it. n8n skips any run whose time passed during the downtime rather than catching it up.
- **Multiple instances need a leader.** In a multi-main setup, only the leader fires schedules. If leadership changes at the wrong moment, timing can slip.

The durable scheduler addresses both by moving scheduling into the database:

- **Runs survive restarts.** The scheduler records each upcoming run in the database before it's due. A restart doesn't drop it. A run whose time passed while the instance was down still fires late when the instance comes back, as long as it's within its grace period; beyond that, the trigger's [misfire policy](#misfire-policy) decides what happens to it.
- **Each run executes once across instances.** Every main instance shares the same queue and claims runs from it. Only one instance picks up each run, so the work spreads across your mains instead of depending on a single leader.

### What changes functionally <a href="#functional-changes" id="functional-changes"></a>

When you turn the durable scheduler on, keep these behavior changes in mind:

- **Timing stays precise.** Runs still fire at their scheduled instant, as they do on the in-memory scheduler.
- **Clock-aligned timing is the default.** For "every N seconds" and "every N minutes" schedules, the durable scheduler keeps the same clock-aligned timing as the in-memory scheduler unless you change `N8N_SCHEDULER_TRIGGER_NODE_MODE`. See [Schedule Trigger timing](#trigger-node-mode).
- **Missed runs follow a misfire policy.** Because the scheduler records runs in advance, a run missed during downtime stays on record. Within its grace period it still fires, late; beyond that, the trigger's [misfire policy](#misfire-policy) decides whether n8n discards it or runs a catch-up run.

## Turn on the durable scheduler <a href="#turn-on" id="turn-on"></a>

Set `N8N_SCHEDULER_ENABLED` to `true` to opt in.

{% hint style="warning" %}
The durable scheduler only takes over Schedule Trigger nodes when the workflow publication service is also on. Set both `N8N_SCHEDULER_ENABLED` and `N8N_USE_WORKFLOW_PUBLICATION_SERVICE` to `true`. If you enable the scheduler without the publication service, n8n logs a warning and Schedule Trigger nodes keep running on the in-memory scheduler.
{% endhint %}

Poll triggers (trigger nodes with a **Poll Times** parameter, such as Google Sheets Trigger or Airtable Trigger) stay on the in-memory scheduler unless you also opt them in with [`N8N_SCHEDULER_POLL_TRIGGERS_ENABLED`](basic-configuration/use-environment-variables/scheduler.md#enable-vars), available from n8n 2.33.0. Poll trigger support isn't 100% stable yet, so keep it off in production unless you're prepared to keep a close watch on your polling workflows. For how polls behave under the durable scheduler, and for the [durable poll cursors](#durable-poll-cursors) that n8n recommends turning on together with `N8N_SCHEDULER_POLL_TRIGGERS_ENABLED`, see [Poll triggers](#poll-triggers).

To keep an individual Schedule Trigger node on the in-memory scheduler while the durable scheduler is on, set `N8N_ENV_FEAT_SKIP_DURABLE_SCHEDULER` to `true`; the node then shows a **Skip Durable Scheduler** setting. This escape hatch is temporary: a future release will remove it.

The [remaining variables](basic-configuration/use-environment-variables/scheduler.md) only take effect once the scheduler is on. The defaults suit most instances, so change them only to tune timing precision, storage, or load across instances. All durations are in seconds unless stated otherwise.

## How the durable scheduler works <a href="#how-it-works" id="how-it-works"></a>

These terms make the environment variables easier to reason about:

- **Schedule**: a recurring rule, such as a Schedule Trigger node's "every 15 minutes" setting. The scheduler stores each schedule in the database.
- **Run**: a single firing of a schedule at a specific time. The scheduler records upcoming runs ahead of time as individual rows.

The scheduler runs five stages, and each stage has its own [environment variables](basic-configuration/use-environment-variables/scheduler.md):

1. **Materialization.** The scheduler scans your active schedules and records the runs coming up soon (within the *materialization window*). This commits runs to the database before they're due. If a run is already past its [misfire grace](#misfire-policy) when materialization catches it, the schedule's misfire policy handles it instead of the scheduler recording it as-is.
2. **Execution.** The scheduler claims each recorded run up to one check interval before its time, so no other instance takes it, and starts the workflow at the scheduled instant.
3. **Recovery.** If an instance claims a run but stops before finishing (for example after a crash), the *reaper* releases the run so another instance can pick it up.
4. **Retention.** The scheduler keeps finished runs for a while as recent history, then deletes them to keep its tables small.
5. **Owner reconciliation.** Every schedule has an owner, such as the workflow that created it. The scheduler periodically checks that each owner still exists and retires the schedules whose owner no longer exists. See the [owner reconciliation environment variables](basic-configuration/use-environment-variables/scheduler.md#owner-reconciliation).

Across multiple instances, every main runs all five stages. Claiming keeps this safe: because only one instance claims each run, running the loops everywhere shares the load rather than duplicating work.

## Misfire policy <a href="#misfire-policy" id="misfire-policy"></a>

A run counts as missed once it's later than its grace period. The grace period defaults to `N8N_SCHEDULER_MISFIRE_GRACE` (one minute by default); from n8n 2.36.0, a Schedule Trigger node added from that version on can set its own with the **Missed Execution Grace Period (Seconds)** node option. n8n raises a node's grace period to an instance-derived minimum (based on `N8N_SCHEDULER_EXECUTOR_INTERVAL` and `N8N_SCHEDULER_MATERIALIZATION_WINDOW`) when set below it, and caps it at 30 days.

What happens to a missed run, and to any backlog behind it, depends on the trigger's misfire policy:

- **Don't Run Missed Executions** (default). n8n discards the backlog of missed runs entirely, and the schedule resumes from its next run. This matches the in-memory scheduler, which never runs a missed occurrence late.
- **Run the Most Recent Missed Execution.** The backlog collapses into a single catch-up run for the node, at the most recent missed time across all its trigger rules, then the schedule resumes.
- **Run the Most Recent Missed Execution Per Rule.** Like the previous policy, but each trigger rule catches up on its own, so a node with several trigger rules can fire one catch-up run per rule.

From n8n 2.36.0, a Schedule Trigger node added from that version on chooses the policy with the **If Execution Is Missed** node option; see the [Schedule Trigger node documentation](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.scheduletrigger#node-options). Trigger nodes that poll (such as Google Sheets Trigger or Airtable Trigger) always skip missed runs, and polling resumes from the next scheduled run.

Whatever the policy, the schedule's clock advances past the backlog: no policy replays it run by run. A one-off schedule has no next occurrence to resume from, so a catch-up policy still runs it late, while skipping discards it for good.

{% hint style="info" %}
To pick a grace period, start from the floor: keep `N8N_SCHEDULER_MISFIRE_GRACE` above `N8N_SCHEDULER_EXECUTOR_INTERVAL` and at least `N8N_SCHEDULER_MATERIALIZATION_WINDOW` (n8n warns at startup if it isn't). Above that floor, set it to the longest delay a run should tolerate before it counts as missed, such as the time a restart or a leadership change takes on your instance. With the defaults, that's 60 seconds or more.
{% endhint %}

## Schedule Trigger timing (deviations) <a href="#trigger-node-mode" id="trigger-node-mode"></a>

Under the durable scheduler, most Schedule Trigger schedules fire the same way they did in memory. On top of the instance-wide changes above (missed runs following a misfire policy, and each run executing once across instances), two cadences fire differently from the in-memory scheduler in specific cases:

- **"Every N seconds" and "every N minutes".** `N8N_SCHEDULER_TRIGGER_NODE_MODE` controls how these fire. It's the only cadence the setting affects.
- **"Every N hours", "days", "weeks", or "months".** These fire as before in everyday use, under either mode. The durable scheduler handles a few rare calendar edge cases more correctly than the in-memory scheduler: leap years, the 53rd week of a year, and daylight-saving transitions, where the in-memory scheduler could be off by one period.

`N8N_SCHEDULER_TRIGGER_NODE_MODE` has two values:

- `legacy` (default): runs fire on clock boundaries, the same as the in-memory scheduler. "Every 30 seconds" fires at :00 and :30 of each minute. The pattern restarts at the top of every minute, so an interval that doesn't divide evenly into 60 leaves an uneven gap at the minute boundary. "Every 7 seconds" fires at :00, :07, :14, and so on up to :56, then jumps back to :00, a 4-second gap instead of 7.
- `new`: runs fire a fixed number of seconds apart, counted from the moment you activated the workflow instead of from clock boundaries. If you activate at :07, "every 30 seconds" fires at :07, :37, :07, and so on. The gap stays exactly the interval you set, including across minute boundaries, so "every 7 seconds" never drifts.

`legacy` is the default, so timing doesn't change when you switch to the durable scheduler. `new` is the intended future default.

{% hint style="info" %}
`N8N_SCHEDULER_TRIGGER_NODE_MODE` only affects "every N seconds" and "every N minutes" schedules. Every other cadence, including raw cron expressions, fires the same way under either value.
{% endhint %}

## Poll triggers

When [`N8N_SCHEDULER_POLL_TRIGGERS_ENABLED`](#turn-on) is on, each of a poll trigger's poll times runs as its own durable schedule: polls survive restarts and spread across instances like any other run. Three behaviors are specific to poll triggers:

- **Missed polls are always skipped.** A poll fetches everything new since it last ran, so a catch-up poll would repeat the same fetch. See [Misfire policy](#misfire-policy).
- **A poll can occasionally run twice.** The scheduler guarantees each dispatched poll runs at least once, not that it runs only once. A poll can repeat, for example when an instance stalls and another takes over. Turn on [durable poll cursors](#durable-poll-cursors) so a repeated poll can't drop or duplicate items.
- **A poll that runs too long is abandoned.** From n8n 2.37.0, a poll that runs longer than [`N8N_SCHEDULER_POLL_TIMEOUT`](basic-configuration/use-environment-variables/scheduler.md#poll-triggers) (45 seconds by default) is abandoned. n8n stops waiting for it and records nothing: the cursor stays put, so the next poll covers the same ground and no data goes missing. This guards against a poll stuck on a service that never answers. A poll that keeps timing out counts as failing. n8n re-polls it at a widening interval instead of hammering a service that can't keep up. Keep the timeout below `N8N_SCHEDULER_LEASE_DURATION`, so an abandoned poll can't still be running when another instance takes its run over. n8n warns at startup when the timeout reaches the lease duration.

### Durable poll cursors

Each poll trigger node keeps a cursor: its record of how far it has already read, so each poll only fetches what's new. By default, n8n stores the cursor in the workflow's static data and saves it separately from the execution the poll produced. If the instance crashes between the two saves, or two instances poll the same node at once, the cursor and the execution fall out of step, and the workflow either skips items or processes them twice.

From n8n 2.36.0, set `N8N_POLLER_DURABLE_CURSORS_ENABLED` to `true` to prevent this. n8n then keeps each node's cursor in its own database table and saves it together with the execution, so a poll round either fully happened or didn't happen at all. n8n recommends turning it on whenever poll triggers run on the durable scheduler.

From n8n 2.37.0, the setting only takes effect when `N8N_SCHEDULER_ENABLED`, `N8N_SCHEDULER_POLL_TRIGGERS_ENABLED`, and `N8N_USE_WORKFLOW_PUBLICATION_SERVICE` are all on. If any of them is off, n8n logs a warning at startup and cursors stay in workflow static data.

What to expect when you turn it on:

- **The switch is safe.** The node's next poll carries its current cursor over to the new table, so nothing is fetched twice or skipped.
- **n8n checks your workflows first (n8n 2.36 only).** At startup, n8n scans every active workflow's published version for duplicate or missing trigger node ids. If it finds any, or can't scan a workflow, it turns off durable poll cursors, keeps poll triggers on the in-memory scheduler for the whole instance, and logs an error naming the affected workflows and how to fix them.
- **Turning it back off doesn't undo it.** Cursors stay in their table; they just stop saving together with the execution.
- **You can watch cursor saves.** Turn on the [poll trigger metrics](#poll-trigger-metrics) with `N8N_METRICS_INCLUDE_POLL_TRIGGER_METRICS`.

{% hint style="warning" %}
Turn on `N8N_POLLER_DURABLE_CURSORS_ENABLED` together with `N8N_SCHEDULER_POLL_TRIGGERS_ENABLED`. Running poll triggers on the durable scheduler while cursors still live in workflow static data risks dropped or duplicated items.
{% endhint %}

## Observability

The durable scheduler exposes Prometheus metrics on the `/metrics` endpoint, so you can tell whether runs start on time, whether they succeed, and whether the queue is draining. Turn them on with two environment variables:

```bash
export N8N_METRICS=true
export N8N_METRICS_INCLUDE_SCHEDULER_METRICS=true
```

Only main instances emit scheduler metrics. To set up the endpoint itself, see [Enable Prometheus metrics](basic-configuration/configuration-examples/enable-prometheus-metrics.md). To chart the metrics, see [Visualize metrics with Grafana](../keep-n8n-running/visualize-metrics-with-grafana.md); n8n publishes a [ready-made durable scheduler dashboard](https://github.com/n8n-io/n8n-observability/tree/main/dashboards/grafana/n8n-scheduler) with a suggested action for each panel.

Two words in the metric names need translating. A *task* is a run the scheduler recorded in the database. An *occurrence* is a run it computed from a schedule, which becomes a task once materialization records it. Most series carry a `task_type` label, either `workflow:schedule-trigger` or `workflow:poll-trigger`, so you can tell Schedule Trigger nodes and poll triggers apart.

### Queue health

These four gauges are a snapshot of the queue, read fresh on each scrape. They describe the whole cluster, so every main reports the same values: aggregate them with `max` or `avg`, never `sum`.

| Metric | What it tells you |
| :----- | :---------------- |
| `n8n_scheduler_tasks_pending` | How many recorded runs are waiting. This tracks how many schedules you have, so watch the trend rather than the number. |
| `n8n_scheduler_tasks_due` | How many recorded runs are already past their time and still haven't started. Should sit near zero. |
| `n8n_scheduler_tasks_running` | How many runs instances across the cluster have claimed and are running right now. |
| `n8n_scheduler_oldest_pending_age_seconds` | How far behind the oldest due run is. The clearest backlog signal: `0` means nothing is due and waiting, and a climbing value means the scheduler can't keep up. |

Each scrape queries the database once for all four gauges. `N8N_METRICS_SCHEDULER_INTERVAL` (20 seconds by default) caches that query, so a tight scrape interval doesn't hammer the tables the scheduler reads.

### Run throughput and failures

Counters and the histogram record each main's own work, so sum them across your mains for cluster totals.

| Metric | Type | What it tells you |
| :----- | :--- | :---------------- |
| `n8n_scheduler_tasks_dispatched_total` | Counter | How many runs the scheduler handed to a handler to start. Your scheduling throughput. |
| `n8n_scheduler_tasks_completed_total` | Counter | How many runs reached a final outcome, split by a `result` label of `success` or `failure`. A rising failure share points at the workflow or the database, not at the scheduler. |
| `n8n_scheduler_task_retries_total` | Counter | How many failed runs the scheduler queued for another attempt. |
| `n8n_scheduler_tasks_reclaimed_total` | Counter | How many runs the reaper took back from an instance that claimed one and stopped. A rising count means instances are crashing or losing their claim mid-run. |
| `n8n_scheduler_tasks_lease_lost_total` | Counter | How many runs finished after another instance had already reclaimed their claim, so the same run may have executed twice. Split by `task_type`. For poll triggers this is the cross-instance overlap signal, and [durable poll cursors](#durable-poll-cursors) keep the cursor correct when it happens. |
| `n8n_scheduler_tasks_dead_lettered_total` | Counter | How many runs n8n gave up on after `N8N_SCHEDULER_MAX_ATTEMPTS` attempts. Every one is a run that never happened, so treat any increase as an alert. |
| `n8n_scheduler_dispatch_lag_seconds` | Histogram | How long each run waited between falling due and starting. Watch the high percentiles: a p99 pulling away from the p50 means a subset of runs stalls rather than the whole queue slowing down. |

### Background passes

These counters cover the [five stages](#how-it-works) that keep the queue moving. They're most useful when a stage stops doing its job.

| Metric | Type | What it tells you |
| :----- | :--- | :---------------- |
| `n8n_scheduler_occurrences_materialized_total` | Counter | How many upcoming runs the scheduler wrote to the database. Flat at zero while you have published schedules means materialization stopped. |
| `n8n_scheduler_jobs_deferred_total` | Counter | How many schedules materialization couldn't plan and will retry, such as one with an expression it can't read. |
| `n8n_scheduler_occurrences_misfired_total` | Counter | How many due runs a [misfire policy](#misfire-policy) discarded instead of recording, split by `task_type` and by the `policy` that discarded them. Expect a spike after downtime; steady growth means runs routinely arrive late. |
| `n8n_scheduler_occurrences_retired_total` | Counter | How many recorded runs the scheduler dropped because a catch-up run superseded them. |
| `n8n_scheduler_occurrences_missed_total` | Counter | How many recorded runs went past their deadline unclaimed and the reaper marked missed. |
| `n8n_scheduler_tasks_pruned_total` | Counter | How many finished runs retention deleted. If it never rises, the scheduler tables keep growing. |
| `n8n_scheduler_jobs_quarantined_total` | Counter | How many schedules owner reconciliation stopped because their owner no longer exists. Available from n8n 2.39.0. |
| `n8n_scheduler_orphaned_jobs_deleted_total` | Counter | How many stopped schedules owner reconciliation deleted after their owner stayed missing past the quarantine grace. Available from n8n 2.39.0. |
| `n8n_scheduler_jobs_revived_total` | Counter | How many stopped schedules owner reconciliation resumed because their owner turned out to exist after all. Available from n8n 2.39.0. |

### Poll trigger metrics

Poll triggers have their own metric set behind a separate switch, `N8N_METRICS_INCLUDE_POLL_TRIGGER_METRICS`, independent of the scheduler metrics above:

```bash
export N8N_METRICS=true
export N8N_METRICS_INCLUDE_POLL_TRIGGER_METRICS=true
```

Only main instances emit them. They come from the poll engine itself, not the scheduler, so they work even when the durable scheduler doesn't dispatch your polls. Like the scheduler counters, they record each main's own polls: sum across mains for cluster totals. n8n publishes a [ready-made poll triggers dashboard](https://github.com/n8n-io/n8n-observability/tree/main/dashboards/grafana/n8n-poll-triggers) for them.

| Metric | Type | What it tells you |
| :----- | :--- | :---------------- |
| `n8n_poll_trigger_duration_seconds` | Histogram | How long each poll takes, split by `node_type` and `status`. A poll that grows slower over time is drifting toward its own interval. Once the duration crosses that interval, polls start overlapping. |
| `n8n_poll_trigger_errors_total` | Counter | How many polls threw, split by `node_type` and a `kind` label of `auth`, `rate_limited`, or `thrown`. `auth` points at a broken credential, `rate_limited` at polling faster than the service allows. |
| `n8n_poll_trigger_overlapping_ticks_total` | Counter | How many polls started while the previous poll for the same node was still running in the same process. Overlap across instances shows up in `n8n_scheduler_tasks_lease_lost_total` instead. |
| `n8n_poll_trigger_timeouts_total` | Counter | How many polls the durable scheduler abandoned because they ran longer than `N8N_SCHEDULER_POLL_TIMEOUT`, split by `node_type`. An abandoned poll records nothing, and the next poll covers the same window. Steady growth means a polled service answers slower than the timeout. Only the durable scheduler abandons polls, so this stays at zero on the in-memory scheduler. Available from n8n 2.37.0. |
| `n8n_poll_trigger_cursor_commits_total` | Counter | How many cursor saves settled, split by `operation` (`with_execution` or `cursor_only`) and `result`. A `result` of `fence_rejected` means a stale poll lost its claim and wasn't allowed to advance the cursor, which is the protection doing its job. A `result` of `failure` means the save itself failed. |
| `n8n_poll_trigger_cursor_commit_duration_seconds` | Histogram | How long each cursor save takes, with the same `operation` and `result` labels. |

The two cursor metrics track the dedicated cursor table. A node starts reporting them with its first poll after you turn on [durable poll cursors](#durable-poll-cursors). It keeps reporting them after you turn the setting off, because its cursor stays in the table.

All names above assume the default `n8n_` metrics prefix. If you set `N8N_METRICS_PREFIX`, substitute your own.
