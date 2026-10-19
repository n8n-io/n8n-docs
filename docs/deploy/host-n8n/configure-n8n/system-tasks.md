---
title: System tasks
description: How n8n runs its internal maintenance tasks, and the Prometheus metrics they expose on your self-hosted instance.
layout:
  description:
    visible: false
---

# System tasks

System tasks are the recurring maintenance jobs n8n runs on itself: pruning old executions, compacting insights data, cleaning up stale records, renewing your license. They aren't workflows, they don't belong to a project, and they don't show up anywhere in the editor. When one of them stops running, nothing fails: your database just keeps growing, or your insights data goes stale.

This page explains how system tasks run and which Prometheus metrics they expose, so you can tell that they still run, and how well.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## How system tasks run

Each system task declares its own cadence, either a fixed interval or a cron schedule, and runs in one of three modes. The `mode` label on the run and schedule series below tells you which one a task uses:

- **Leader timer**, `leader_timer`: the task runs from a timer in the leader main instance's process. This is the default mode for tasks that act on data shared by the whole setup. Only the leader runs these timers: they stop when an instance steps down and start again on the instance that takes over. A run whose time passes while the instance is down doesn't happen. If the process runs but sleeps, a suspended container for example, the timer fires once for all the occurrences it slept through instead of replaying them one by one.
- **Instance timer**, `instance_timer`: every process the task targets runs its own copy from its own timer, because the task acts on state that belongs to that process, such as an in-memory buffer. These tasks don't depend on the leader or on `N8N_SCHEDULER_SYSTEM_TASKS_ENABLED`. `data-table-file-cleanup` runs on every main instance. `event-bus-unsent-message-flush`, `external-secrets-refresh`, `instance-registry-heartbeat`, and `telemetry-buffer-flush` run on every main, worker, and webhook processor. Instance timers are available from n8n 2.42.0.
- **Durable mode**, `durable`: the task runs from the [durable scheduler](durable-scheduler.md)'s database-backed queue, so any main instance can pick up the run and a restart doesn't drop it. Only one run of a task executes at a time. If a main instance stops during a run, another main instance takes the run over. Set `N8N_SCHEDULER_SYSTEM_TASKS_ENABLED` to `true` to use this mode. It also requires `N8N_SCHEDULER_ENABLED`, which is on by default from n8n 2.45.0. Give every instance in your setup the same values for both variables. Only tasks that support durable mode move over. The rest stay on the leader timer. The first tasks that support durable mode are available from n8n 2.41.0, and later versions move more tasks over. To see the mode of each task on your instance, read `n8n_system_task_info`.

{% hint style="warning" %}
In a multi-main setup, turn on `N8N_SCHEDULER_SYSTEM_TASKS_ENABLED` only when every main instance runs a version that supports it. During a rolling deploy, older main instances still run the tasks from their leader timers, so the same task can run twice at the same time.
{% endhint %}

A durable system task is also a scheduler task, so the [durable scheduler metrics](durable-scheduler.md#observability) cover it under a `task_type` label of `system:<task-name>`, for example `system:insights-compaction`. The system task metrics on this page cover all three modes with the same names, which the scheduler metrics can't do: they never see a timer run.

## Observability

{% hint style="info" %}
**Feature availability**

System task metrics are available from n8n 2.41.0.
{% endhint %}

Turn the metrics on with two environment variables:

```bash
export N8N_METRICS=true
export N8N_METRICS_INCLUDE_SYSTEM_TASK_METRICS=true
```

Main instances emit the series of leader timer and durable tasks. Every process that runs an instance timer task emits the series of that task, workers and webhook processors included, if you turn on metrics for that process. To set up the endpoint itself, see [Enable Prometheus metrics](basic-configuration/configuration-examples/enable-prometheus-metrics.md). To chart the metrics, see [Visualize metrics with Grafana](../keep-n8n-running/visualize-metrics-with-grafana.md). n8n publishes a [ready-made system tasks dashboard](https://github.com/n8n-io/n8n-observability/tree/main/dashboards/grafana/n8n-system-tasks) with a suggested action for each panel.

All names below assume the default `n8n_` metrics prefix. If you set `N8N_METRICS_PREFIX`, substitute your own.

### Labels

Every series carries a small, fixed set of labels:

| Label | Values | What it means |
| :---- | :----- | :------------ |
| `task` | The task name, such as `execution-pruning-soft-delete`, `insights-compaction`, or `license-renewal` | Which system task the series describes. Which tasks exist depends on your version, your license, and your settings, so read the list off `n8n_system_task_info` rather than hard-coding it. |
| `mode` | `leader_timer`, `instance_timer`, `durable` | Where the task runs. See [How system tasks run](#how-system-tasks-run). Before n8n 2.42.0, the label had the values `in_memory` and `durable`. If your dashboards or alerts filter on `in_memory`, change them to `leader_timer`. |
| `result` | `success`, `failure`, `aborted`, `lease_lost`, `timed_out` | How a run ended. `aborted` means the run was still going when the instance stepped down or shut down, so it stopped without finishing its work. `lease_lost` means a durable run lost its claim, so another main instance can take the run over. `timed_out` means a durable run took longer than its timeout, set by `N8N_SCHEDULER_TASK_TIMEOUT_SECONDS` unless the task sets its own. n8n reports `lease_lost` and `timed_out` from n8n 2.44.0. |
| `reason` | `overlap`, `provisioned_elsewhere`, `aborted`, `coalesced` | Why an occurrence didn't run. See [In-memory scheduling](#in-memory-scheduling). |

There's no instance label. Prometheus adds `instance` and `job` per scrape target, so aggregate with `max by (task)` for the gauges that describe a task, and `sum by (task)` for counters, histograms, and the in-flight gauge.

### Run health

These three series cover the runs themselves, in all three modes.

| Metric | Type | What it tells you |
| :----- | :--- | :---------------- |
| `n8n_system_task_run_duration_seconds` | Histogram | How long each run takes, split by `task`, `mode`, and `result`. The `_count` series doubles as your run count and failure count, so you don't need a separate counter. A duration creeping toward the task's own cadence means n8n is about to skip the next occurrence for overlap. |
| `n8n_system_task_last_success_timestamp_seconds` | Gauge | The Unix timestamp of the task's last successful run on this instance. The clearest "is this task dead" signal, because it answers for a task that never ran at all, which a rate over a counter can't. |
| `n8n_system_task_runs_in_flight` | Gauge | How many runs of the task are going right now on this instance, `0` or `1` in the normal case. A value stuck at `1` is a hung run, which also blocks the instance from stepping down or shutting down. |

### Schedule health

These series describe the schedule rather than a run, so they exist before the first run happens.

| Metric | Type | What it tells you |
| :----- | :--- | :---------------- |
| `n8n_system_task_info` | Gauge | Always `1`, one series per task this instance can run, with its `mode`. Your inventory of system tasks: join against it to find a task that reports no runs. |
| `n8n_system_task_interval_seconds` | Gauge | The task's declared cadence, for tasks on a fixed interval. This turns "late" into a query instead of a list of thresholds you maintain by hand. Tasks on a cron schedule don't report it. |
| `n8n_system_task_next_run_timestamp_seconds` | Gauge | The Unix timestamp of the next occurrence of the task. Unlike the cadence, it covers tasks on a cron schedule too. For a timer task, it's the occurrence the timer on this instance is armed for. It moves forward each time the timer arms the following occurrence, so a timestamp that sits in the past means the timer stopped planning. For a durable task, it's the first occurrence the scheduler didn't plan yet, read from the database, so every main instance reports the same value. A planned occurrence of a durable task can run before this timestamp. |
| `n8n_system_task_scheduled` | Gauge | `1` while n8n has the task scheduled, `0` once the task lost its schedule, because n8n couldn't plan its timer cadence or no runnable durable job exists for it. A `0` here means the task stopped rather than running late: it takes an instance restart, or a leadership change for a leader timer task, to get it scheduled again. Alert on it. |
| `n8n_system_task_provision_check_failures_total` | Counter | How many times n8n couldn't check whether a task's durable job exists and ran the task from the leader timer instead. A rising count means database trouble, and a small risk of the same task running twice while both paths are live. |

The series for a durable or instance timer task appear as soon as n8n routes the task at startup, so a restart shows up as a reset rather than a gap. The `info`, `scheduled`, `runs_in_flight`, `last_success`, and `next_run_timestamp_seconds` series of a leader timer task exist only while this instance leads, and n8n removes them when the instance steps down: a former leader doesn't keep exporting frozen values for runs it no longer makes. Only `interval_seconds` stays, because the cadence doesn't depend on who leads.

### In-memory scheduling

These series only cover timer runs, in the `leader_timer` and `instance_timer` modes. The durable path has its own equivalents in the [durable scheduler metrics](durable-scheduler.md#observability): `n8n_scheduler_task_retries_total` for retries and `n8n_scheduler_dispatch_lag_seconds` for lag.

| Metric | Type | What it tells you |
| :----- | :--- | :---------------- |
| `n8n_system_task_runs_skipped_total` | Counter | How many occurrences didn't run, split by `reason`. `overlap` means the previous run was still going. `provisioned_elsewhere` means the task has a durable job, so the leader timer stood down. `aborted` means the occurrence fired after the instance had already started stepping down. `coalesced` means the process slept through occurrences and the timer fired a single time for the whole batch, so the counter grows by the number of occurrences that fire stood in for. |
| `n8n_system_task_retries_total` | Counter | How many retries n8n scheduled after a failed run. Only tasks that declare a retry delay retry at all, so a failing task with a flat count here isn't a bug. |
| `n8n_system_task_fire_lag_seconds` | Histogram | How late each timer fires, in seconds. Small values mean a busy event loop. Large ones mean the process paused or slept, and its buckets reach a day because a coalesced fire is late by at least one full cadence. |

## Related resources

* [Configure n8n](./)
