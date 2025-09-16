---
title: Execute Command
description: Documentation for the Execute Command node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: high
---

# Execute Command

The Execute Command node runs shell commands on the host machine that runs n8n.

/// warning | Security considerations
The Execute Command node can introduce significant security risks in environments that operate with untrusted users. Because of this, n8n recommends [disabling](/hosting/securing/blocking-nodes.md#exclude-nodes) it in such setups.
///

/// note | Which shell runs the command?
This node executes the command in the default shell of the host machine. For example, `cmd` on Windows and `zsh` on macOS.

If you run n8n with Docker, your command will run in the n8n container and not the Docker host.

If you're using [queue mode](/hosting/scaling/queue-mode.md), the command runs on the worker that's executing the task in production mode. When running manual executions, it runs on the main instance, unless you set `OFFLOAD_MANUAL_EXECUTIONS_TO_WORKERS` to `true`.
///

/// note | Not available on Cloud
This node isn't available on n8n Cloud.
///

## Node parameters

Configure the node using the following parameters.

### Execute Once

Choose whether you want the node to execute only once (turned on) or once for every item it receives as input (turned off).

### Command

Enter the command to execute on the host machine. Refer to sections below for examples of running [multiple commands](#run-multiple-commands) and [cURL commands](#run-curl-command).

#### Run multiple commands

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

#### Run cURL command

You can also use the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node to make a cURL request.

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

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'execute-command') ]]

## Common issues

For common questions or issues and suggested solutions, refer to [Common Issues](/integrations/builtin/core-nodes/n8n-nodes-base.executecommand/common-issues.md).
