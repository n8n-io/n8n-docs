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

The durable scheduler is available from n8n 2.36. Earlier versions back to n8n 2.32 include it as a preview feature. It's off by default: existing instances keep using the in-memory scheduler and behave as before until you opt in.
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

- **Timing stays precise.** The scheduler claims each run up to one check interval (`N8N_SCHEDULER_EXECUTOR_INTERVAL`, five seconds by default) ahead of its scheduled time and holds it on a precise timer, so it fires at the scheduled instant rather than on a polling cadence. The interval caps how long the scheduler takes to pick up a newly activated or edited schedule; it doesn't affect steady-state timing.
- **Clock-aligned timing is the default.** For "every N seconds" and "every N minutes" schedules, the durable scheduler keeps the same clock-aligned timing as the in-memory scheduler unless you change `N8N_SCHEDULER_TRIGGER_NODE_MODE`. See [Schedule Trigger timing](#trigger-node-mode).
- **Missed runs follow a misfire policy.** Because the scheduler records runs in advance, a run missed during downtime stays on record. Within its grace period it still fires, late; beyond that, the trigger's [misfire policy](#misfire-policy) decides whether n8n discards it or runs a catch-up run.

## Turn on the durable scheduler <a href="#turn-on" id="turn-on"></a>

Set `N8N_SCHEDULER_ENABLED` to `true` to opt in.

{% hint style="warning" %}
The durable scheduler only takes over Schedule Trigger nodes when the workflow publication service is also on. Set both `N8N_SCHEDULER_ENABLED` and `N8N_USE_WORKFLOW_PUBLICATION_SERVICE` to `true`. If you enable the scheduler without the publication service, n8n logs a warning and Schedule Trigger nodes keep running on the in-memory scheduler.
{% endhint %}

Poll triggers (trigger nodes with a **Poll Times** parameter, such as Google Sheets Trigger or Airtable Trigger) stay on the in-memory scheduler unless you also opt them in with [`N8N_SCHEDULER_POLL_TRIGGERS_ENABLED`](basic-configuration/use-environment-variables/scheduler.md#enable-vars), available from n8n 2.33. Poll trigger support isn't 100% stable yet, so keep it off in production unless you're prepared to keep a close watch on your polling workflows.

To keep an individual Schedule Trigger node on the in-memory scheduler while the durable scheduler is on, set `N8N_ENV_FEAT_SKIP_DURABLE_SCHEDULER` to `true`; the node then shows a **Skip Durable Scheduler** setting. This escape hatch is temporary: a future release will remove it.

The [remaining variables](basic-configuration/use-environment-variables/scheduler.md) only take effect once the scheduler is on. The defaults suit most instances, so change them only to tune timing precision, storage, or load across instances. All durations are in seconds unless stated otherwise.

## How the durable scheduler works <a href="#how-it-works" id="how-it-works"></a>

These terms make the environment variables easier to reason about:

- **Schedule**: a recurring rule, such as a Schedule Trigger node's "every 15 minutes" setting. The scheduler stores each schedule in the database.
- **Run**: a single firing of a schedule at a specific time. The scheduler records upcoming runs ahead of time as individual rows.

The scheduler moves each run through four stages, and each stage has its own [environment variables](basic-configuration/use-environment-variables/scheduler.md):

1. **Materialization.** The scheduler scans your active schedules and records the runs coming up soon (within the *materialization window*). This commits runs to the database before they're due. If a run is already past its [misfire grace](#misfire-policy) when materialization catches it, the schedule's misfire policy handles it instead of the scheduler recording it as-is.
2. **Execution.** The scheduler claims each recorded run up to one check interval before its time, so no other instance takes it, and starts the workflow at the scheduled instant.
3. **Recovery.** If an instance claims a run but stops before finishing (for example after a crash), the *reaper* releases the run so another instance can pick it up.
4. **Retention.** The scheduler keeps finished runs for a while as recent history, then deletes them to keep its tables small.

Across multiple instances, every main runs all four stages. Claiming keeps this safe: because only one instance claims each run, running the loops everywhere shares the load rather than duplicating work.

## Misfire policy <a href="#misfire-policy" id="misfire-policy"></a>

A run counts as missed once it's later than its grace period. The grace period defaults to `N8N_SCHEDULER_MISFIRE_GRACE` (one minute by default); from n8n 2.36, a Schedule Trigger node added from that version on can set its own with the **Missed Execution Grace Period (Seconds)** node option. n8n raises a node's grace period to an instance-derived minimum (based on `N8N_SCHEDULER_EXECUTOR_INTERVAL` and `N8N_SCHEDULER_MATERIALIZATION_WINDOW`) when set below it, and caps it at 30 days.

What happens to a missed run, and to any backlog behind it, depends on the trigger's misfire policy:

- **Don't Run Missed Executions** (default). n8n discards the backlog of missed runs entirely, and the schedule resumes from its next run. This matches the in-memory scheduler, which never runs a missed occurrence late.
- **Run the Most Recent Missed Execution.** The backlog collapses into a single catch-up run for the node, at the most recent missed time across all its trigger rules, then the schedule resumes.
- **Run the Most Recent Missed Execution Per Rule.** Like the previous policy, but each trigger rule catches up on its own, so a node with several trigger rules can fire one catch-up run per rule.

From n8n 2.36, a Schedule Trigger node added from that version on chooses the policy with the **If Execution Is Missed** node option; see the [Schedule Trigger node documentation](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.scheduletrigger#node-options). Trigger nodes that poll (such as Google Sheets Trigger or Airtable Trigger) always skip missed runs, and polling resumes from the next scheduled run.

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
