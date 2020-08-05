---
permalink: /nodes/n8n-nodes-base.emailReadImap
---

# IMAP Email

The IMAP Email node is used to receive emails via an IMAP email server. This node is a trigger node.

::: tip 🔑 Credential
You can find authentication information for this node [here](../../../credentials/IMAPEmail/README.md).
:::

## Basic Operations

- Receive an email

## Node Reference

- ***Mailbox Name*** field: The mailbox from which you want to receive emails.
- ***Action*** field: Used to specify whether or not an email should be marked as read when n8n receives it.
- ***Download Attachment*** field: Used to specify whether or not you want to download any attachments received with the emails.

## Example Usage

This workflow allows you to receive an email using the IMAP Email node. You can also find the [workflow](https://n8n.io/workflows/587) on the website. This example usage workflow would use the following two nodes.
- [IMAP Email]()

The final workflow should look like the following image.

![A workflow with the IMAP Email node](./workflow.png)

### 1. IMAP Email node

1. First of all, you'll have to enter credentials for the IMAP Email node. You can find out how to do that [here](../../../credentials/IMAPEmail/README.md).
2. Enter the name of the mailbox from which you want to receive emails in the ***Mailbox Name*** field.
3. Click on ***Execute Node*** to run the workflow.
