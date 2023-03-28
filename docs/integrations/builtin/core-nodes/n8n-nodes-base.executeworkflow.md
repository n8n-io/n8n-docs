---
title: Execute Workflow node - n8n Documentation
description: Documentation for the Execute Workflow node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
---

# Execute Workflow

Use the Execute Workflow node to run a different workflow on the host machine that runs n8n.

## Node reference

The Execute Workflow node has two properties:

- **Source**: This field specifies from where to get the workflow's information.
	- Database
	- Local File
	- Parameter
	- URL
- **Workflow**: This field contains information about the workflow, such as the workflow ID, URL, or a file.


## FAQs

### How to find the workflow ID

1. Open the workflow for which you want to get the workflow ID.
2. Copy the number after `workflow/` in your URL and paste that in the **Workflow ID** field.


### How does data get passed from one workflow to another?

Let's say that there's a Execute Workflow node in **Workflow A**. The Execute Workflow node calls another workflow, **Workflow B**.
- The Execute Workflow node passes the data to the Start node of **Workflow B**.
- The last node of **Workflow B** sends the data back to the Execute Workflow node in **Workflow A**.

