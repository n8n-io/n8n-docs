---
title: Durable scheduler
description: How the durable scheduler runs time-based workflows from a database-backed queue for your self-hosted n8n instance.
layout:
  description:
    visible: false
---

# Durable scheduler

The durable scheduler runs time-based workflows, such as those that start with a Schedule Trigger node, from a database-backed queue instead of from each instance's memory. This page explains what the durable scheduler changes, how to turn it on, and how it works. For the environment variables that configure it, see [Scheduler environment variables](basic-configuration/use-environment-variables/scheduler.md).

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

The [remaining variables](basic-configuration/use-environment-variables/scheduler.md) only take effect once the scheduler is on. The defaults suit most instances, so change them only to tune timing precision, storage, or load across instances. All durations are in seconds unless stated otherwise.

## How the durable scheduler works <a href="#how-it-works" id="how-it-works"></a>

These terms make the environment variables easier to reason about:

- **Schedule**: a recurring rule, such as a Schedule Trigger node's "every 15 minutes" setting. The scheduler stores each schedule in the database.
- **Run**: a single firing of a schedule at a specific time. The scheduler records upcoming runs ahead of time as individual rows.

The scheduler moves each run through four stages, and each stage has its own [environment variables](basic-configuration/use-environment-variables/scheduler.md):

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
