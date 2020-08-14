---
permalink: /nodes/n8n-nodes-base.executeWorkflow
---

# Execute Workflow

The Execute Workflow node is used to run a different workflow on the host machine that runs n8n.

## Node Reference

The Execute Workflow node has two properties:
- ***Source***: This field is used to specify from where to get the workflow's information.
	- Database
	- Local File
	- Parameter
	- URL
- ***Workflow***: This field contains information about the workflow, such as the workflow ID, URL, or a file.


## Example Usage

This workflow allows you to execute another workflow on the host machine using the Execute Workflow node. You can also find the [workflow](https://n8n.io/workflows/588) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [Execute Workflow]()

The final workflow should look like the following image.

![A workflow with the Execute Workflow node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Execute Workflow node

1. Enter the ID of the workflow that you want to execute in the ***Workflow ID*** field. You can find instructions on how to obtain the ID of a workflow in the FAQs below.
2. Click on ***Execute Node*** to run the workflow.


## FAQs

### How do I find the workflow ID?

1. Open the workflow for which you want to get the workflow ID.
2. Copy the number after `workflow/` in your URL and paste that in the ***Workflow ID*** field.


### How does data get passed from one workflow to another?

Let's say, that there's a Execute Workflow node in **Workflow A**. The Execute Workflow node calls another workflow, **Workflow B**.
- The Execute Workflow node passes the data to the Start node of **Workflow B**.
- The last node of **Workflow B** sends the data back to the Execute Workflow node in **Workflow A**.
