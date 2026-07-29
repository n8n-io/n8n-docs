---
title: Hardening task runners
description: Harden task runners for better isolation for your self-hosted n8n instance.
contentType: howto
nodeTitle: Harden task runners
originalFilePath: hosting/securing/hardening-task-runners.md
originalUrl: 'https://docs.n8n.io/hosting/securing/hardening-task-runners'
url: 'https://docs.n8n.io/deploy/host-n8n/configure-n8n/security/harden-task-runners'
layout:
  description:
    visible: false
---

# Hardening task runners <a href="#hardening-task-runners" id="hardening-task-runners"></a>

[Task runners](../set-up-task-runners.md) are responsible for executing code from the [Code node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.code). While Code node executions are secure, you can follow these recommendations to further harden your task runners.

## Run task runners as sidecars in external mode <a href="#run-task-runners-as-sidecars-in-external-mode" id="run-task-runners-as-sidecars-in-external-mode"></a>

To increase the isolation between the core n8n process and code in the Code node, run task runners in [external mode](../set-up-task-runners.md#setting-up-external-mode). External task runners launch as separate containers, providing a fully isolated environment to execute the JavaScript defined in the Code node.

## Use the distroless image <a href="#use-the-distroless-image" id="use-the-distroless-image"></a>

For a reduced attack surface, use the distroless Docker image variant. Distroless images contain only the application and its runtime dependencies, excluding package managers, shells, and other utilities that aren't needed at runtime.

To use the distroless image, append the `-distroless` suffix to the Docker tag. For example: `2.4.6-distroless`.

## Run as the nobody user <a href="#run-as-the-nobody-user" id="run-as-the-nobody-user"></a>

For improved security, configure task runners to run as the unprivileged `nobody` user with user and group ID 65532. This prevents the container process from running with root privileges and limits potential damage from security vulnerabilities.

## Configure read-only root filesystem <a href="#configure-read-only-root-filesystem" id="configure-read-only-root-filesystem"></a>

Configure a [read-only root filesystem](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) to prevent any modifications to the container's filesystem at runtime. This helps protect against malicious code that might attempt to modify system files.

Task runners still require some temporary storage for operation. To accommodate this, mount a minimal `emptyDir` volume to `/tmp`. If your workflows require more temporary space, increase the size of the volume accordingly.

## Configure an AppArmor profile <a href="#configure-an-apparmor-profile" id="configure-an-apparmor-profile"></a>

As a defence-in-depth measure, apply an [AppArmor](https://apparmor.net/) profile to prevent the task runner container from reading sensitive `/proc` files such as `environ` and `mounts`. These files can expose environment variables, including secrets and credentials, to code running inside the container. Refer to the [Kubernetes AppArmor documentation](https://kubernetes.io/docs/tutorials/security/apparmor/) for how to apply a profile to a pod.

Add the following rule to your AppArmor profile:

```
audit deny @{PROC}/[0-9]*/{environ,mounts} rwl,
```

This denies and logs any attempt to read, write, or link to per-process `environ` and `mounts` files.
