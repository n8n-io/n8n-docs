---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Configuration methods
description: How to configure task runner.
contentType: howto
---

# Task runner

Task runner is a generic mechanism to execute tasks in a secure and performant way. It is used to execute user-provided JavaScript code in the Code Node.

This document describes how a task runner works and how it can be configured.

## How it works

The feature called task runner consists of three components: a task runner, a task broker and a task requester. A task runner connects to the task broker using a websocket connection. A task requester submits a task request to the broker, which will be picked up by an available task runner. The runner will execute the task and submit the results to the task requester. The task broker coordinates the communication between the runner and the requester. The n8n instance (main and worker) acts as the broker, and the Code Node is the task requester.

![Task runner overview](/_images/hosting/configuration/task-runner-concept.png)

## Configuring task runner

Task runner can be used in two different modes: `internal` and `external`.

### `internal` mode

In the `internal` mode, n8n instance launch the task runner as a child process. The n8n process is also responsible for monitoring and managing the lifecycle of the task runner. The task runner process will share the same `uid` and `gid` as n8n.

### `external` mode

In the `external` mode, the task runner is launched by an external orchestrator instead of n8n (e.g. kubernetes). Usually this means the task runner is configured to run as a side-car container next to n8n. In this mode the orchestrator is responsible for monitoring and managing the lifecycle of the task runner container. The task runner is fully isolated from the n8n instance.

When using the [Queue mode](/hosting/scaling/queue-mode), each n8n container (main, worker) needs to have its own task runner.

#### Configuring n8n instance in `external` mode

| Environment variables | Description |
| ------ | ----- |
| `N8N_RUNNERS_ENABLED=true` | Enables task runner. |
| `N8N_RUNNERS_MODE=external` | Use the `external` mode. |
| `N8N_RUNNERS_AUTH_TOKEN=<random secure shared secret>` | Secret task runner uses to connect to the broker. |

For full list of environment variables see [task runner environment variables](/hosting/configuration/environment-variables/task-runner).

#### Configuring the task runner in `external` mode

The task runner comes bundled within the n8n Docker image. It also includes a task runner launcher. The launcher is capable of starting the runner on-demand, which means lower memory usage when there's no work needed, but a short delay (few hundred ms) in cold-start. The launcher also monitors the launcher and restarts it in case of infinite loops or other issues.

![Task runner deployed as a side-car container](/_images/hosting/configuration/task-runner-external-mode.png)

The following properties should be configured for the container.

| Configuration | Description |
| ------ | ----- |
| `command` | `["/usr/local/bin/task-runner-launcher", "javascript"]` |
| `livenessProbe` | `GET /healthz`, port `5680` |

| Environment variables | Description |
| ------ | ----- |
| `N8N_RUNNERS_AUTH_TOKEN=<random secure shared secret>` | Secret task runner uses to connect to the broker. |
| `N8N_RUNNERS_MAX_CONCURRENCY=5` | How many concurrent tasks the runner can execute. |
| `N8N_RUNNERS_SERVER_ENABLED=true` | Enable the healthcheck server on the runner. |
| `N8N_RUNNERS_TASK_BROKER_URI=localhost:5679` | Configure the address of the task broker server within the n8n instance. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT=15` | After how many seconds does the task runner shut down automatically if there are no tasks to be executed. The launcher will start the runner automatically once there are tasks again to execute. Use value `0` to disable auto shutdown. |
| `NODE_OPTIONS=--max-old-space-size=<limit>` | The "memory limit" for the task runner node.js process. This should be lower than the limit for container, so the runner runs out of memory before the container. That way the launcher is capable of monitoring the runner. |

For full list of environment variables see [task runner environment variables](/hosting/configuration/environment-variables/task-runner).
