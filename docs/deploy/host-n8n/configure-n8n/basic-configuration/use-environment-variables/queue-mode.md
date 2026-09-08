---
title: Queue mode environment variables
description: >-
  Environment variables to configure queue mode on your self-hosted n8n
  instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: Queue mode
originalFilePath: hosting/configuration/environment-variables/queue-mode.md
originalUrl: 'https://docs.n8n.io/hosting/configuration/environment-variables/queue-mode'
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/queue-mode
layout:
  description:
    visible: false
---

# Queue mode environment variables <a href="#queue-mode-environment-variables" id="queue-mode-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

You can run n8n in different modes depending on your needs. Queue mode provides the best scalability. Refer to [Queue mode](../../scaling/enable-queue-mode.md) for more information.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` | Boolean | `false` | Set to `true` if you want manual executions to run on the worker rather than on main. |
| `QUEUE_BULL_PREFIX` | String | - | Prefix to use for all queue keys. |
| `QUEUE_BULL_REDIS_DB` | Number | `0` | The Redis database used. |
| `QUEUE_BULL_REDIS_HOST` | String | `localhost` | The Redis host. |
| `QUEUE_BULL_REDIS_PORT` | Number | `6379` | The Redis port used. |
| `QUEUE_BULL_REDIS_USERNAME` | String | - | The Redis username (needs Redis version 6 or above). Don't define it for Redis < 6 compatibility |
| `QUEUE_BULL_REDIS_PASSWORD` | String | - | The Redis password. |
| `QUEUE_BULL_REDIS_TIMEOUT_THRESHOLD` | Number | `10000` | The Redis timeout threshold (in ms). |
| `QUEUE_BULL_REDIS_CLUSTER_NODES` | String | - | Expects a comma-separated list of Redis Cluster nodes in the format `host:port`, for the Redis client to initially connect to. If running in queue mode (`EXECUTIONS_MODE = queue`), setting this variable will create a Redis Cluster client instead of a Redis client, and n8n will ignore `QUEUE_BULL_REDIS_HOST` and `QUEUE_BULL_REDIS_PORT`. |
| `QUEUE_BULL_REDIS_TLS` | Boolean | `false` | Enable TLS on Redis connections. |
| `QUEUE_BULL_REDIS_DUALSTACK` | Boolean | `false` | Enable dual-stack support (IPv4 and IPv6) on Redis connections. |
| `QUEUE_WORKER_TIMEOUT` (**deprecated**) | Number | `30` | Deprecated from n8n 1.22.0. Use `N8N_GRACEFUL_SHUTDOWN_TIMEOUT` instead. How long should n8n wait (seconds) for running executions before exiting worker process on shutdown. |
| `QUEUE_HEALTH_CHECK_ACTIVE` | Boolean | `false` | Whether to enable health checks (true) or disable (false). |
| `QUEUE_HEALTH_CHECK_PORT` | Number | `5678` | The port to serve health checks on. If you experience a port conflict error when starting a worker server using its default port, change this. |
| `QUEUE_WORKER_LOCK_DURATION` | Number | `60000` | How long (in ms) is the lease period for a worker to work on a message. |
| `QUEUE_WORKER_LOCK_RENEW_TIME` | Number | `10000` | How frequently (in ms) should a worker renew the lease time. |
| `QUEUE_WORKER_STALLED_INTERVAL` | Number | `30000` | How often should a worker check for stalled jobs (use 0 for never). |
| `QUEUE_WORKER_MAX_STALLED_COUNT` (**deprecated**) | Number | `1` | **Deprecated** Removed in n8n 2.0. Setting this has no effect. See [Remove QUEUE_WORKER_MAX_STALLED_COUNT](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v20-breaking-changes#remove-queueworkermaxstalledcount) for migration details. |

## Webhook responses

In queue mode, a worker sends a webhook response back to the main instance inside a queue message. These variables set how large that message can be, and whether n8n stores a larger response body in binary data storage instead of failing the node. Refer to [Large webhook responses](../../scaling/enable-queue-mode.md#large-webhook-responses) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_WEBHOOK_RESPONSE_RELAY_SIZE_MAX` | Number | `64` | Maximum size (in MiB) of a response a worker sends back to the main instance inside a queue message. Redis holds several copies of a response in flight, so budget about 1.5 times this value in Redis memory per response in flight. The same limit applies to a tool result an MCP Trigger workflow returns. |
| `N8N_WEBHOOK_RESPONSE_RELAY_OFFLOAD_ENABLED` | Boolean | `false` | Whether a worker stores a response body above `N8N_WEBHOOK_RESPONSE_RELAY_SIZE_MAX` in binary data storage, so the main instance can stream it to the client, instead of failing the node. Needs a `N8N_DEFAULT_BINARY_DATA_MODE` that stores (`filesystem`, `database`, `s3`, or `azure`), and storage every instance can read. Set this on your workers only after every main and webhook instance runs n8n 2.34.0 or later. |

## Multi-main setup <a href="#multi-main-setup" id="multi-main-setup"></a>

Refer to [Configuring multi-main setup](../../scaling/enable-queue-mode.md#configuring-multi-main-setup) for details.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_MULTI_MAIN_SETUP_ENABLED` | Boolean | `false` | Whether to enable multi-main setup for queue mode (license required). |
| `N8N_MULTI_MAIN_SETUP_KEY_TTL` | Number | `10` | Time to live (in seconds) for leader key in multi-main setup. |
| `N8N_MULTI_MAIN_SETUP_CHECK_INTERVAL` | Number | `3` | Interval (in seconds) for leader check in multi-main setup. |
