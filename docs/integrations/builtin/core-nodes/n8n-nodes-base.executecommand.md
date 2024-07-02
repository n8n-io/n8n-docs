---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Execute Command
description: Documentation for the Execute Command node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Execute Command

The Execute Command node runs shell commands on the host machine that runs n8n.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Execute Command integrations](https://n8n.io/integrations/execute-command/){:target=_blank .external-link} page.
///

/// note | Which shell runs the command?
This node executes the command in the default shell of the host machine. For example, `cmd` on Windows and `zsh` on macOS.

If you run n8n with Docker, your command will run in the n8n container and not the Docker host.
///

/// note | Not available on Cloud
This node isn't available on n8n Cloud.
///

## Node Reference

The Execute Command node has two properties:

1. **Execute Once** toggle: This is a boolean field that specifies whether you want the node to execute only once, or once for every item it receives an input.
2. **Command** field: This is a text field that specifies the command to execute on the host machine.

## FAQs

### How to run multiple commands in the Execute Command node?

You can combine multiple commands using `&&`. For example, you can combine the change directory (cd) command with the list (ls) command using `&&`.

```bash
cd bin && ls
```

To run multiple commands, you can also write the commands on separate lines. For example, you can write the list (ls) command on a new line after the change directory (cd) command.

```bash
cd bin
ls
```

### How to run the curl command in the Execute Command node?

You can also use the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to make a cURL request.

If you want to run the curl command in the Execute Command node, you will have to build a Docker image based on the existing n8n image. The default n8n Docker image uses Alpine Linux. You will have to install the curl package.

1. Create a file named `Dockerfile`.
2. Add the below code snippet to the Dockerfile.

    ```shell
    FROM docker.n8n.io/n8nio/n8n
    RUN apk --update add curl
    ```

3. In the same folder, execute the command below command to build the Docker image.

    ```shell
    docker build -t n8n-curl
    ```

4. Replace the Docker image you used before. For example, replace `docker.n8n.io/n8nio/n8n` with `n8n-curl`.
5. Run the newly created Docker image, and you will now be able to execute ssh using the Execute Command-Node.

