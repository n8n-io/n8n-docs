---
permalink: /nodes/n8n-nodes-base.copperTrigger
---

# Copper Trigger

[Copper](https://www.copper.com/) is a CRM that focuses on strong integration with Google's G Suite. It is mainly targeted towards small and medium-sized businesses.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Copper/README.md).
:::


## Example Usage

This workflow allows you to receive an update when a new project is created in Copper. You can also find the [workflow](https://n8n.io/workflows/537) on the website. This example usage workflow would use the following node.
- [Copper Trigger]()

The final workflow should look like the following image.

![A workflow with the Copper Trigger node](./workflow.png)


### 1. Copper Trigger node

1. First of all, you'll have to enter credentials for the Copper Trigger node. You can find out how to do that [here](../../../credentials/Copper/README.md).
2. Select 'Project' from the *Resource* dropdown list.
3. Select 'New' from the *Event* dropdown list.
4. Click on *Execute Node* to run the workflow.
