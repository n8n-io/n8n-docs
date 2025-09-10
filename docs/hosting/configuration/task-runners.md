---
title: Task runners
description: How to configure task runners to execute tasks using internal or external runner processes.
contentType: howto
---

# Task runners

Task runners are a generic mechanism to execute tasks in a secure and performant way. They're used to execute user-provided JavaScript and Python code in the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).

/// note | In beta
Task runner support for native Python and the `n8nio/runners` image are in beta. Until this feature is stable, you must use the `N8N_NATIVE_PYTHON_RUNNER=true` environment variable to enable the Python runner.
///

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

When using the [Queue mode](/hosting/scaling/queue-mode.md), each n8n container (main and workers) needs to have its own sidecar task runners container.

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

The launcher will read env vars from runners container environment, and will pass along env vars to each runner as defined in the [default launcher config file](https://github.com/n8n-io/n8n/blob/master/docker/images/runners/n8n-task-runners.json), located in the container at `/etc/task-runners.json`. To customize the launcher config file, mount to this path.

For further information about the launcher config file, see [here](https://github.com/n8n-io/task-runner-launcher/blob/main/docs/setup.md#config-file).

## Adding extra dependencies 

You can customize the `n8nio/runners` image. To do so, you will find the runners Dockerfile at [this directory](https://github.com/n8n-io/n8n/tree/master/docker/images/runners) in the n8n repository. The manifests referred to below are also found in this directory.

To make additional packages available on the Code node, you can bake extra packages into your custom runners image at build time:

* JavaScript: edit `docker/images/runners/package.json`
  (package.json manifest used to install runtime-only deps into the JS runner)
* Python (Native): edit `docker/images/runners/extras.txt`
  (requirements.txt-style list installed into the Python runner venv)

> Important: for security, any external libraries must be explicitly allowed for Code node use. Update `n8n-task-runners.json` to allowlist what you add.

### 1) JavaScript packages

Edit the runtime extras manifest `docker/images/runners/package.json`:

```json
{
  "name": "task-runner-runtime-extras",
  "description": "Runtime-only deps for the JS task-runner image, installed at image build.",
  "private": true,
  "dependencies": {
    "moment": "2.30.1"
  }
}
```

Add any packages you want under `"dependencies"` (pin them for reproducibility), e.g.:

```json
"dependencies": {
  "moment": "2.30.1",
  "uuid": "9.0.0"
}
```

### 2) Python packages

Edit the requirements file `docker/images/runners/extras.txt`:

```
# Runtime-only extras for the Python task runner (installed at image build)
numpy==2.3.2
# add more, one per line, e.g.:
# pandas==2.2.2
```

Pin versions (for example, `==2.3.2`) for deterministic builds.

### 3) Allowlist packages for the Code node

Open `docker/images/runners/n8n-task-runners.json` and add your packages to the env overrides:

```json
{
  "task-runners": [
    {
      "runner-type": "javascript",
      "env-overrides": {
        "NODE_FUNCTION_ALLOW_BUILTIN": "crypto",
        "NODE_FUNCTION_ALLOW_EXTERNAL": "moment,uuid",   // <-- add JS packages here
      }
    },
    {
      "runner-type": "python",
      "env-overrides": {
        "PYTHONPATH": "/opt/runners/task-runner-python",
        "N8N_RUNNERS_STDLIB_ALLOW": "json",
        "N8N_RUNNERS_EXTERNAL_ALLOW": "numpy,pandas"     // <-- add Python packages here
      }
    }
  ]
}
```

* `NODE_FUNCTION_ALLOW_BUILTIN`: comma-separated list of allowed node builtin modules.
* `NODE_FUNCTION_ALLOW_EXTERNAL`: comma-separated list of allowed JS packages.
* `N8N_RUNNERS_STDLIB_ALLOW`: comma-separated list of allowed Python standard library packages.
* `N8N_RUNNERS_EXTERNAL_ALLOW`: comma-separated list of allowed Python packages.

### 4) Build your custom image

For example, from the n8n repository root:

```bash
docker buildx build \
  -f docker/images/runners/Dockerfile \
  -t n8nio/runners:custom \
  .
```

### 5) Run it

For example:

```bash
docker run --rm -it \
  -e N8N_RUNNERS_AUTH_TOKEN=test \
  -e N8N_RUNNERS_LAUNCHER_LOG_LEVEL=debug \
  -e N8N_RUNNERS_TASK_BROKER_URI=http://host.docker.internal:5679 \
  -p 5680:5680 \
  n8nio/runners:custom
```

