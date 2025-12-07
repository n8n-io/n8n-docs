---
title: Task runners
description: How to configure task runners to execute tasks using internal or external runner processes.
contentType: howto
---

# Task runners

Task runners are a generic mechanism to execute tasks in a secure and performant way. They're used to execute user-provided JavaScript and Python code in the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).

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

In internal mode, the n8n instance launches the task runner as a child process. The n8n process monitors and manages the life cycle of the task runner. The task runner process shares the same `uid` and `gid` as n8n. This is **not** recommended for production.

### External mode

In external mode, a [launcher application](https://github.com/n8n-io/task-runner-launcher) launches task runners on demand and manages their lifecycle. Typically, this means that next to n8n you add a sidecar container running the [`n8nio/runners`](https://hub.docker.com/r/n8nio/runners) image containing the launcher, the JS task runner and the Python task runner. This sidecar container is independent from the n8n instance.

![Task runner deployed as a side-car container](/_images/hosting/configuration/task-runner-external-mode.png)

When using [Queue mode](/hosting/scaling/queue-mode.md), each worker needs to have its own sidecar container for task runners. 

In addition, if you haven't enabled offloading manual executions to workers (if you aren't setting `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS=true` in your configuration), then your main instance will run manual executions and needs its own sidecar container for task runners as well. Please note that running n8n with offloading disabled isn't recommended for production.

## Setting up external mode

In external mode, you run the `n8nio/runners` image as a sidecar container next to n8n. Below you will find a docker compose as a reference. Keep in mind that the `n8nio/runners` image version must match that of the `n8nio/n8n` image, and the n8n version must be >=1.111.0.

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

There are three layers of configuration: the n8n container, the runners container, and the launcher inside the runners container.

### Configuring n8n container in external mode

These are the main environment variables that you can set on the n8n container running in external mode:

| Environment variables                                  | Description                                                |
|--------------------------------------------------------|------------------------------------------------------------|
| `N8N_RUNNERS_ENABLED=true`                             | Enables task runners.                                      |
| `N8N_RUNNERS_MODE=external`                            | Use task runners in external mode.                         |
| `N8N_RUNNERS_AUTH_TOKEN=<random secure shared secret>` | A shared secret task runners use to connect to the broker. |
| `N8N_RUNNERS_BROKER_LISTEN_ADDRESS=0.0.0.0` | By default, the task broker only listens to localhost. When using multiple containers (for example, with Docker Compose), it needs to be able to accept external connections. |

For full list of environment variables see [task runner environment variables](/hosting/configuration/environment-variables/task-runners.md).

### Configuring runners container in external mode

These are the main environment variables that you can set on the runners container running in external mode:

| Environment variables | Description |
| ------ | ----- |
| `N8N_RUNNERS_AUTH_TOKEN=<random secure shared secret>` | The shared secret the task runner uses to connect to the broker. |
| `N8N_RUNNERS_TASK_BROKER_URI=localhost:5679` | The address of the task broker server within the n8n instance. |
| `N8N_RUNNERS_AUTO_SHUTDOWN_TIMEOUT=15` | Number of seconds of inactivity to wait before shutting down the task runner process. The launcher will automatically start the runner again when there are new tasks to execute. Set to `0` to disable automatic shutdown. |

For full list of environment variables see [task runner environment variables](/hosting/configuration/environment-variables/task-runners.md).

### Configuring launcher in runners container in external mode

The launcher reads environment variables from runners container environment, and performs the following actions:

* Passing environment variables from the launcher's own environment to all runners (`allowed-env`)
* Setting specific environment variables on specific runners (`env-overrides`)

Which environment variables to pass and to set are defined in the [launcher config file](https://github.com/n8n-io/n8n/blob/master/docker/images/runners/n8n-task-runners.json) included in the runners image. This config file is located in the container at `/etc/task-runners.json`. To learn more about the launcher config file, refer to the [Config file documentation](https://github.com/n8n-io/task-runner-launcher/blob/main/docs/setup.md#config-file).

The default launcher configuration file is locked down, but you can edit this file, for example, to allowlist first- or third-party modules. To customize the launcher configuration file, mount to this path:

```
path/to/n8n-task-runners.json:/etc/n8n-task-runners.json
```

## Adding extra dependencies 

### 1. Extend the `n8nio/runners` image

You can extend the `n8nio/runners` image to add extra dependencies to the runners. You'll need `n8nio/runners:1.121.0` or later to do this.

```dockerfile
FROM n8nio/runners:1.121.0
USER root
RUN cd /opt/runners/task-runner-javascript && pnpm add moment uuid
RUN cd /opt/runners/task-runner-python && uv pip install numpy pandas
COPY n8n-task-runners.json /etc/n8n-task-runners.json
USER runner
```

You must also allowlist any first-party or third-party packages for use by the Code node. Do this by editing the configuration file `n8n-task-runners.json` to include the packages in your extended image.

```json
{
  "task-runners": [
    {
      "runner-type": "javascript",
      "env-overrides": {
        "NODE_FUNCTION_ALLOW_BUILTIN": "crypto",         // <-- allowlist Node.js builtin modules here
        "NODE_FUNCTION_ALLOW_EXTERNAL": "moment,uuid",   // <-- allowlist third-party JS packages here
      }
    },
    {
      "runner-type": "python",
      "env-overrides": {
        "PYTHONPATH": "/opt/runners/task-runner-python",
        "N8N_RUNNERS_STDLIB_ALLOW": "json",              // <-- allowlist Python standard library packages here
        "N8N_RUNNERS_EXTERNAL_ALLOW": "numpy,pandas"     // <-- allowlist third-party Python packages here
      }
    }
  ]
}
```

* `NODE_FUNCTION_ALLOW_BUILTIN`: comma-separated list of allowed node builtin modules.
* `NODE_FUNCTION_ALLOW_EXTERNAL`: comma-separated list of allowed JS packages.
* `N8N_RUNNERS_STDLIB_ALLOW`: comma-separated list of allowed Python standard library packages.
* `N8N_RUNNERS_EXTERNAL_ALLOW`: comma-separated list of allowed Python packages.

### 2. Build your custom image

For example, from the n8n repository root:

```bash
docker buildx build \
  -f docker/images/runners/Dockerfile \
  -t n8nio/runners:custom \
  .
```

### 3. Run the image

For example:

```bash
docker run --rm -it \
  -e N8N_RUNNERS_AUTH_TOKEN=test \
  -e N8N_RUNNERS_LAUNCHER_LOG_LEVEL=debug \
  -e N8N_RUNNERS_TASK_BROKER_URI=http://host.docker.internal:5679 \
  -p 5680:5680 \
  n8nio/runners:custom
```

