---
title: Task runners
description: How to configure task runners to execute tasks using internal or external runner processes.
contentType: howto
---

# Task runners

Task runners are a generic mechanism to execute tasks in a secure and performant way. They're used to execute user-provided JavaScript and Python code in the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).

**Important:** Task runner support for native Python is currently in beta.

This document describes how task runners work and how you can configure them.

## How it works

The task runner feature consists of these components: one or more task runners, a task broker, and a task requester.

![Task runner overview](/_images/hosting/configuration/task-runner-concept.png)

Task runners connect to the task broker using a websocket connection. A task requester submits a task request to the broker where an available task runner can pick it up for execution.

The runner executes the task and submits the results to the task requester. The task broker coordinates communication between the runner and the requester.

The n8n instance (main and worker) acts as the broker. The Code node in this case is the task requester.

## Task runner modes

You can use task runners in two different modes: internal and external.

### Internal mode

In internal mode, the n8n instance launches the task runner as a child process. The n8n process monitors and manages the life cycle of the task runner. The task runner process shares the same `uid` and `gid` as n8n.

### External mode

In external mode, a [launcher](https://github.com/n8n-io/task-runner-launcher) launches one or more task runners on demand and manages their lifecycle. Typically, this means you add a sidecar container next to n8n running the [`n8nio/runners`](https://hub.docker.com/r/n8nio/runners) image containing the launcher, the JS task runner and the Python task runner. This sidecar container is fully isolated from the n8n instance. 

![Task runner deployed as a side-car container](/_images/hosting/configuration/task-runner-external-mode.png)

When using the [Queue mode](/hosting/scaling/queue-mode.md), each n8n container (main and workers) needs to have its own sidecar container

## Setting up external mode

Use the following docker compose as a reference to add a task runner sidecar container to your n8n deployment.

Keep in mind:

- The `n8nio/runners` image version must match that of the `n8nio/n8n` image.
- The n8n version must be >=1.111.0.

```yaml
services:
  n8n:
    image: n8nio/n8n:1.111.0
    container_name: n8n-main
    environment:
      - N8N_RUNNERS_ENABLED=true
      - N8N_RUNNERS_MODE=external
      - N8N_RUNNERS_BROKER_LISTEN_ADDRESS=0.0.0.0
      - N8N_RUNNERS_AUTH_TOKEN=your-secret-here
      - N8N_NATIVE_PYTHON_RUNNER=true
    ports:
      - "5678:5678"
    volumes:
      - n8n_data:/home/node/.n8n
    # etc.

  task-runners:
    image: n8nio/runners:1.111.0
    container_name: n8n-runners
    environment:
      - N8N_RUNNERS_TASK_BROKER_URI=http://n8n-main:5679
      - N8N_RUNNERS_AUTH_TOKEN=your-secret-here
      # etc.
    depends_on:
      - n8n

volumes:
  n8n_data:
```

### Configuring n8n instance in external mode

You can configure n8n to use external task runners by setting the following environment variables:

| Environment variables                                  | Description                                                |
|--------------------------------------------------------|------------------------------------------------------------|
| `N8N_RUNNERS_ENABLED=true`                             | Enables task runners.                                      |
| `N8N_RUNNERS_MODE=external`                            | Use task runners in external mode.                         |
| `N8N_RUNNERS_AUTH_TOKEN=<random secure shared secret>` | A shared secret task runners use to connect to the broker. |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS=0.0.0.0` | By default, the task broker only listens to localhost. When using multiple containers (for example, with Docker Compose), it needs to be able to accept external connections. |

For full list of environment variables see [task runner environment variables](/hosting/configuration/environment-variables/task-runners.md).

### Configuring task runners in external mode

The task runner comes bundled within the n8n Docker image. The Docker image also includes the task runner launcher.

The launcher can start the runner on-demand, which means lower memory usage when there's no work needed, but a short delay (few hundred ms) in cold-start. The launcher also monitors the runner and restarts it in case of infinite loops or other issues.

Run a task runner container from the n8n Docker image by setting the following properties:

| Configuration   | Description                                             |
|-----------------|---------------------------------------------------------|
| `command`       | `["/usr/local/bin/task-runner-launcher", "javascript"]` |
| `livenessProbe` | `GET /healthz`, port `5680`                             |

Set the following environment variables for the container, adjusted to fit your needs:

| Environment variables | Description |
| ------ | ----- |
| `N8N_RUNNERS_AUTH_TOKEN=<random secure shared secret>` | The shared secret the task runner uses to connect to the broker. |
| `N8N_RUNNERS_MAX_CONCURRENCY=5` | The number of concurrent tasks the runner can execute. |
| `N8N_RUNNERS_TASK_BROKER_URI=localhost:5679` | The address of the task broker server within the n8n instance. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT=15` | Number of seconds of inactivity to wait before shutting down the task runner process. The launcher will automatically start the runner again when there are new tasks to execute. Set to `0` to disable automatic shutdown. |
| `NODE_OPTIONS=--max-old-space-size=<limit>` | The memory limit for the task runner Node.js process. This should be lower than the limit for container so that the runner runs out of memory before the container. That way, the launcher is able to monitor the runner. |
| `GENERIC_TIMEZONE` | The [same default timezone as configured for the n8n instance](/hosting/configuration/environment-variables/timezone-localization.md). |

For full list of environment variables see [task runner environment variables](/hosting/configuration/environment-variables/task-runners.md).
