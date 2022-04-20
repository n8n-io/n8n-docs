---
title: Execute Command
description: The Execute Command node is used to run shell commands on the host machine that runs Workflow²
tags:
  - Workflow²

---

# Execute Command

The Execute Command node is used to run shell commands on the host machine that runs Workflow².

!!! note " Keep in mind"
    1. If you are running Doc² in Docker, your command will run on the Doc² container and not the Docker host.
2. This node will execute the command in the default shell of the host machine. For example, this will be PowerShell on Windows and zsh on macOS.


## Node Reference

The Execute Command node has two properties:
1. ***Execute Once*** toggle: This is a boolean field that is used to specify whether you want the node to execute only once, or once for every item it receives an input.
2. ***Command*** field: This is a text field that is used to specify the command that will be executed on the host machine.


## Example Usage

This workflow allows you to execute a command that returns the percentage of the hard disk that is full using the Execute Command node. The workflow is triggered twice a day, and if the memory usage exceeds 80%, it will send an SMS using the Twilio node. You can also find the [workflow](https://n8n.io/workflows/716) on n8n.io. This example usage workflow would use the following nodes.
- [Cron](/workflow/integrations/core-nodes/n8n-nodes-base.cron/)
- [Execute Command]()
- [IF](/workflow/integrations/core-nodes/n8n-nodes-base.if/)
- [Twilio](/workflow/integrations/nodes/workflow-nodes-base.twilio/)
- [No Operation, do nothing](/workflow/integrations/core-nodes/n8n-nodes-base.noOp/)


The final workflow should look like the following image.

![A workflow with the Execute Command node](/_images/integrations/core-nodes/executecommand/workflow.png)

### 1. Cron node

The Cron node will trigger the workflow twice a day, at 9 AM and 4 PM.

1. Click on ***Add Cron Time***.
2. Select 'Every Day' from the ***Mode*** dropdown list.
3. Enter `9` in the ***Hour*** field.
4. Click on ***Add Cron Time***.
5. Select 'Every Day' from the ***Mode*** dropdown list.
6. Enter `16` in the ***Hour*** field.
7. Click on ***Execute Node*** to run the node.

![Using the Cron node to trigger the workflow twice a day](/_images/integrations/core-nodes/executecommand/cron_node.png)


### 2. Execute Command node

The Execute Command node will execute the command and return the percentage of hard disk space used on the host machine.

1. Enter `df -k / | tail -1 | awk '{print $5}'` in the ***Command*** field.
2. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node executes the command and returns the percentage of the hard disk that is full.

![Using the Execute Command node to get the percentage of hard disk used on the host machine](/_images/integrations/core-nodes/executecommand/executecommand_node.png)


### 3. IF node

This node will compare the percentage of the hard disk space used we got from the Execute Command node. If the usage of the memory exceeds 80%, it will return true otherwise false.

1. Click on ***Add Condition*** and select 'Number' from the dropdown list.
2. Click on the gears icon next to the ***Value 1*** field and click on ***Add Expression***.
3. Enter `{{parseInt($node["Execute Command"].json["stdout"])}}` in the ***Expression*** field. The output from the Execute Command node is a string. The `parseInt()` method converts the string into an integer.
4. Select 'Larger' from the ***Operation*** dropdown list.
5. Set ***Value 2*** to 80.
5. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node returns an output when the percentage of hard disk space used exceeds 80%.

![Using the IF node to check if the percentage of hard disk space used is greater than eighty percent](/_images/integrations/core-nodes/executecommand/if_node.png)

### 4. Twilio node (send: sms)

This node sends an SMS to the specified phone number when the usage of hard disk space  exceeds 80%.

1. Create a Twilio node connected to the 'true' output of the IF node.
2. You'll have to enter credentials for the Twilio node. You can find out how to do that [here](/workflow/integrations/credentials/twilio/).
3. Enter the Twilio phone number in the ***From*** field.
4. Enter the receiver's phone number in the ***To*** field.
5. Click on the gears icon next to the ***Message*** field and click on ***Add Expression***.

6. Enter `Your hard disk space is filling up fast! Your hard disk is {{$node["Execute Command"].json["stdout"]}} full.` in the ***Expression*** field.
7. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node sends an SMS with the percentage of the hard disk space used that we got from the Execute Command node.

![Using the Twilio node to send an SMS](/_images/integrations/core-nodes/executecommand/twilio_node.png)

### 5. NoOp node
Adding this node here is optional, as the absence of this node won't make a difference to the functioning of the workflow.

1. Create a ***NoOp*** node connected to the 'false' output of the IF node.
2. Click on ***Execute Node*** to run the node.

![Using the NoOp node](/_images/integrations/core-nodes/executecommand/noop_node.png)

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

You can also use the [HTTP Request](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) node to make a cURL request.

If you want to run the curl command in the Execute Command node, you will have to build a Docker image based on the existing Doc² image. The default Doc² Docker image uses Alpine Linux. You will have to install the curl package.
1. Create a file named Dockerfile.
2. Add the below code snippet to the Dockerfile.
```
FROM n8nio/n8n
RUN apk --update add curl
```
3. In the same folder, execute the command below command to build the Docker image.
```
docker build -t n8n-curl
```
4. Replace the Docker image you used before. For example, replace `n8nio/n8n` with `n8n-curl`.
5. Run the newly created Docker image, and you will now be able to execute ssh via the Execute Command-Node.




