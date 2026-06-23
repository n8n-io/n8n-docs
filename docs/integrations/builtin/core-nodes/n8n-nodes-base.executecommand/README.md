---
title: Execute Command
description: >-
  Documentation for the Execute Command node in n8n, a workflow automation
  platform. Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: high
nodeTitle: n8n-nodes-base.executecommand
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.executecommand/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executecommand
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.executecommand
layout:
  description:
    visible: false
---

# Execute Command <a href="#execute-command" id="execute-command"></a>

The Execute Command node runs shell commands on the host machine that runs n8n.

{% hint style="warning" %}
**Security considerations**

The Execute Command node can introduce significant security risks in environments that operate with untrusted users. Because of this, the node is [disabled](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/block-specific-nodes#exclude-nodes) by default starting from version 2.0.
{% endhint %}

{% hint style="info" %}
**Which shell runs the command?**

This node executes the command in the default shell of the host machine. For example, `cmd` on Windows and `zsh` on macOS.

If you run n8n with Docker, your command will run in the n8n container and not the Docker host.

If you're using [queue mode](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/enable-queue-mode), the command runs on the worker that's executing the task in production mode. When running manual executions, it runs on the main instance, unless you set `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` to `true`.
{% endhint %}

{% hint style="info" %}
**Not available on Cloud**

This node isn't available on n8n Cloud.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the node using the following parameters.

### Execute Once <a href="#execute-once" id="execute-once"></a>

Choose whether you want the node to execute only once (turned on) or once for every item it receives as input (turned off).

### Command <a href="#command" id="command"></a>

Enter the command to execute on the host machine. Refer to sections below for examples of running [multiple commands](#run-multiple-commands) and [cURL commands](#run-curl-command).

#### Run multiple commands <a href="#run-multiple-commands" id="run-multiple-commands"></a>

Use one of two methods to run multiple commands in one Execute Command node:

* Enter each command on one line separated by `&&`. For example, you can combine the change directory (cd) command with the list (ls) command using `&&`.

    ```bash
    cd bin && ls
    ```

* Enter each command on a separate line. For example, you can write the list (ls) command on a new line after the change directory (cd) command.

    ```bash
    cd bin
    ls
    ```

#### Run cURL command <a href="#run-curl-command" id="run-curl-command"></a>

You can also use the [HTTP Request](../n8n-nodes-base.httprequest/README.md) node to make a cURL request.

If you want to run the curl command in the Execute Command node, you will have to build a Docker image based on the existing n8n image. The default n8n Docker image uses Alpine Linux. You will have to install the curl package.

1. Create a file named `Dockerfile`.
2. Add the below code snippet to the Dockerfile.

    ```shell
    FROM docker.n8n.io/n8nio/n8n
    USER root
    RUN apk --update add curl
    USER node
    ```

3. In the same folder, execute the command below to build the Docker image.

    ```shell
    docker build -t n8n-curl
    ```

4. Replace the Docker image you used before. For example, replace `docker.n8n.io/n8nio/n8n` with `n8n-curl`.
5. Run the newly created Docker image. You'll now be able to execute ssh using the Execute Command Node.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-base.executecommand integration templates](https://n8n.io/integrations/execute-command) or [search all templates](https://n8n.io/workflows/)

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common Issues](common-issues.md).
