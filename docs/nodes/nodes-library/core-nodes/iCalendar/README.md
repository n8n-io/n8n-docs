---
permalink: /nodes/n8n-nodes-base.iCal
description: Learn how to use the iCalendar node in n8n
---

# iCalendar

The iCalendar node allows you to create event files that can be shared as an attachment.

## Basic Operations

- Create Event File

## Example Usage

This workflow allows you to create an event file and send it as an attachment via email. You can also find the [workflow](https://n8n.io/workflows/621) on n8n.io. This example usage workflow would use the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [iCalendar]()
- [Send Email](../SendEmail/README.md)

The final workflow should look like the following image.

![A workflow with the Gmail node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. iCalendar node (createEventFile)

This node will create an event file. We use this file as an attachment in the next node.

1. Enter the event title in the ***Event Title*** field.
2. Select the event start date and time in the ***Start*** field.
3. Select the event end date and time in the ***End*** field.
4. Select 'Get All' from the ***Operation*** dropdown list.
5. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node creates the event file.

![Using the iCalendar node to create an event file](./iCalendar_node.png)

### 3. Send Email node

This node will send the event file as an attachment.

1. First of all, you'll have to enter credentials for the Send Email node. You can find out how to do that [here](../../../credentials/SendEmail/README.md).
2. Enter the sender's email address in the ***From Email*** field.
3. Enter the receiver's email address in the ***To Email*** field.
4. Enter a subject in the ***Subject*** field.
5. Enter the email content in the ***Text*** field.
6. Enter `data` in the ***Attachments*** field. If you used a different name for the Binary Property, use that name instead. We add the name of the Binary Property and not the file name in the ***Attachments*** field.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node sends an email with the event file as an attachment.

![Using the Send Email node to send an email with an attachemnt](./SendEmail_node.png)
