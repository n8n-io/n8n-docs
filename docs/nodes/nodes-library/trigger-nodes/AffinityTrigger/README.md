---
permalink: /nodes/n8n-nodes-base.affinityTrigger
---

# Affinity Trigger

[Affinity](https://www.affinity.co/) is a powerful relationship intelligence platform enabling teams to leverage their network to close the next big deal.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Affinity/README.md).
:::

## Example Usage

This workflow allows you to receive updates when a new list is created in Affinity. You can also find the [workflow](https://n8n.io/workflows/672) on n8n.io. This example usage workflow would use the following node.
- [Affinity Trigger]()

The final workflow should look like the following image.

![A workflow with the Affinity Trigger node](./workflow.png)

### 1. Affinity Trigger node

1. First of all, you'll have to enter credentials for the Affinity Trigger node. You can find out how to do that [here](../../../credentials/Affinity/README.md).
2. Select 'list.created' from the ***Events*** dropdown list.
3. Click on ***Execute Node*** to run the node.
