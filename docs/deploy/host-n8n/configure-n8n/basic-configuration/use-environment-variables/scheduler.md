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

The durable scheduler runs time-based work (such as schedule triggers) from a persisted store, so scheduled executions survive restarts. It's off by default. Set `N8N_SCHEDULER_ENABLED` to `true` to opt in. The remaining variables tune the engine and only take effect when the scheduler is enabled.

All durations are in seconds.

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SCHEDULER_ENABLED` | Boolean | `false` | Whether the durable scheduler is enabled. |
| `N8N_SCHEDULER_MATERIALIZATION_WINDOW` | Number | `60` | How far ahead, in seconds, the scheduler turns due schedules into concrete tasks. Must be greater than 0. |
| `N8N_SCHEDULER_SWEEP_INTERVAL` | Number | `10` | Interval, in seconds, between sweeps that materialize due schedules into tasks. Must be greater than 0. |
| `N8N_SCHEDULER_EXECUTOR_INTERVAL` | Number | `5` | Interval, in seconds, between executor passes that claim and run due tasks. Must be greater than 0. |
| `N8N_SCHEDULER_REAPER_INTERVAL` | Number | `30` | Interval, in seconds, between reaper passes that reclaim expired task leases. Must be greater than 0. |
| `N8N_SCHEDULER_LEASE_DURATION` | Number | `60` | How long, in seconds, a claimed task is leased before the reaper may reclaim it. Must be greater than 0. |
| `N8N_SCHEDULER_RETENTION` | Number | `604800` | How long, in seconds, to retain finished tasks before purging them. Defaults to 7 days. Must be greater than 0. |
| `N8N_SCHEDULER_MIN_INTERVAL` | Number | `0` | Minimum allowed interval, in seconds, between schedule fires. Set to `0` to disable the clamp. |
