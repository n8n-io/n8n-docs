---
permalink: /nodes/n8n-nodes-base.executeCommand
---

# Execute Command

The Execute Command node is used to run shell commands on the host machine that runs n8n.

::: tip 💡 Keep in mind
1. If you are running n8n in Docker, your command will run on the n8n container and not the Docker host.
2. This node will execute the command in the default shell of the host machine. For example, this will be PowerShell on Windows and Z Shell on MacOS.
:::

The Execute Command node has two properties:
1. *Execute Once* toggle: This is a boolean field that is used to specify whether you want the node to execute only once, or once for every item it receives an input.
2. *Command* field: This is a text field that is used to specify the command that will be executed on the host machine.


## Example Usage

This workflow allows you to execute commands on the host machine using the Execute Command node. You can also find the [workflow](https://n8n.io/workflows/570) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Execute Command]()


The final workflow should look like the following image.

![A workflow with the Execute Command node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Execute Command node

1. Enter the command that you want to execute in the *Command* field.
2. Click on *Execute Node* to run the workflow.
