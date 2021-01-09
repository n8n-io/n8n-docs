---
description: Learn how to use the Postmark Trigger node in n8n
---

# Postmark Trigger

[Postmark](https://postmarkapp.com) helps deliver and track application email. You can track statistics such as the number of emails sent or processed, opens, bounces and, spam complaints.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Postmark/README.md).
:::

## Example Usage

This workflow allows you to receive updates when an email is bounced or opened using the Postmark Trigger Node. You can also find the [workflow](https://n8n.io/workflows/660) on n8n.io. This example usage workflow would use the following node.
- [Postmark Trigger]()

The final workflow should look like the following image.

![A workflow with the Postmark Trigger node](./workflow.png)

### 1. Postmark Trigger node

1. First of all, you'll have to enter credentials for the Postmark Trigger node. You can find out how to do that [here](../../../credentials/Postmark/README.md).
2. Select 'Bounce' from the ***Events*** dropdown list.
3. Select 'Open' from the ***Events*** dropdown list.
4. Toggle the ***Include Content*** field to true.
5. Click on ***Execute Node*** to run the node.

::: tip 💡 Activate workflow for production
You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Postmark Trigger node.
:::
