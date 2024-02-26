---
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

## Example Usage

This workflow allows you to execute a command that returns the percentage of the hard disk that's full using the Execute Command node. The workflow triggers twice a day, and if the memory usage exceeds 80%, it sends an SMS using the Twilio node. You can also find the [workflow](https://n8n.io/workflows/716) on n8n.io. This example usage workflow would use the following nodes.

- [Schedule trigger](/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/)
- [Execute Command]()
- [IF](/integrations/builtin/core-nodes/n8n-nodes-base.if/)
- [Twilio](/integrations/builtin/app-nodes/n8n-nodes-base.twilio/)
- [No Operation, do nothing](/integrations/builtin/core-nodes/n8n-nodes-base.noop/)

The final workflow should look like the following image.

![A workflow with the Execute Command node](/_images/integrations/builtin/core-nodes/executecommand/workflow.png)

### 1. Cron node

The Cron node will trigger the workflow twice a day, at 9 AM and 4 PM.

1. Click on **Add Cron Time**.
2. Select 'Every Day' from the **Mode** dropdown list.
3. Enter `9` in the **Hour** field.
4. Click on **Add Cron Time**.
5. Select 'Every Day' from the **Mode** dropdown list.
6. Enter `16` in the **Hour** field.
7. Click on **Test step** to run the node.

![Using the Cron node to trigger the workflow twice a day](/_images/integrations/builtin/core-nodes/executecommand/cron_node.png)

### 2. Execute Command node

The Execute Command node executes the command and return the percentage of hard disk space used on the host machine.

1. Enter `df -k / | tail -1 | awk '{print $5}'` in the **Command** field.
2. Click on **Test step** to run the node.

In the screenshot below, note that the node executes the command and returns the percentage of the hard disk that's full.

![Using the Execute Command node to get the percentage of hard disk used on the host machine](/_images/integrations/builtin/core-nodes/executecommand/executecommand_node.png)

### 3. IF node

This node will compare the percentage of the hard disk space used we got from the Execute Command node. If the usage of the memory exceeds 80%, it will return true otherwise false.

1. Click on **Add Condition** and select 'Number' from the dropdown list.
2. Click on the gears icon next to the **Value 1** field and click on **Add Expression**.
3. Enter `{{parseInt($node["Execute Command"].json["stdout"])}}` in the **Expression** field. The output from the Execute Command node is a string. The `parseInt()` method converts the string into an integer.
4. Select 'Larger' from the **Operation** dropdown list.
5. Set **Value 2** to 80.
5. Click on **Test step** to run the node.

In the screenshot below, you will notice that the node returns an output when the percentage of hard disk space used exceeds 80%.

![Using the IF node to check if the percentage of hard disk space used is greater than 80%](/_images/integrations/builtin/core-nodes/executecommand/if_node.png)

### 4. Twilio node (send: SMS)

This node sends an SMS to the specified phone number when the usage of hard disk space  exceeds 80%.

1. Create a Twilio node connected to the 'true' output of the IF node.
2. You'll have to enter credentials for the Twilio node. You can find out how to do that [here](/integrations/builtin/credentials/twilio/).
3. Enter the Twilio phone number in the **From** field.
4. Enter the receiver's phone number in the **To** field.
5. Click on the gears icon next to the **Message** field and click on **Add Expression**.

6. Enter `Your hard disk space is filling up fast! Your hard disk is {{$node["Execute Command"].json["stdout"]}} full.` in the **Expression** field.
7. Click on **Test step** to run the node.

In the screenshot below, note that the node sends an SMS with the percentage of the hard disk space used that you got from the Execute Command node.

![Using the Twilio node to send an SMS](/_images/integrations/builtin/core-nodes/executecommand/twilio_node.png)

### 5. NoOp node

Adding this node here is optional, as the absence of this node won't make a difference to the functioning of the workflow.

1. Create a **NoOp** node connected to the 'false' output of the IF node.
2. Click on **Test step** to run the node.

![Using the NoOp node](/_images/integrations/builtin/core-nodes/executecommand/noop_node.png)

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

