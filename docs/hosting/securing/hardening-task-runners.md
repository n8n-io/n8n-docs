---
title: Hardening task runners
description: "Harden task runners for better isolation for your self-hosted n8n instance."
contentType: howto
---

# Hardening task runners

[Task runners](/hosting/configuration/task-runners.md) are responsible for executing code from the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md). While Code node executions are secure, you can follow these recommendations to further harden your task runners.

## Run task runners as sidecars in external mode

To increase the isolation between the core n8n process and code in the Code node, run task runners in [external mode](/hosting/configuration/task-runners.md#setting-up-external-mode). External task runners launch as separate containers, providing a fully isolated environment to execute the JavaScript defined in the Code node.

## Use the distroless image

For a reduced attack surface, use the distroless Docker image variant. Distroless images contain only the application and its runtime dependencies, excluding package managers, shells, and other utilities that aren't needed at runtime.

To use the distroless image, append the `-distroless` suffix to the Docker tag. For example: `2.4.6-distroless`.

## Run as the nobody user

For improved security, configure task runners to run as the unprivileged `nobody` user with user and group ID 65532. This prevents the container process from running with root privileges and limits potential damage from security vulnerabilities.

## Configure read-only root filesystem

Configure a [read-only root filesystem](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) to prevent any modifications to the container's filesystem at runtime. This helps protect against malicious code that might attempt to modify system files.

Task runners still require some temporary storage for operation. To accommodate this, mount a minimal `emptyDir` volume to `/tmp`. If your workflows require more temporary space, increase the size of the volume accordingly.
