# Gmail

[Gmail](https://www.gmail.com) is an email service developed by Google. Users can access Gmail on the web and using third-party programs that synchronize email content through POP or IMAP protocols.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/google/).


## Basic Operations

* Draft
    * Create a new email draft
    * Delete a draft
    * Get a draft
    * Get all drafts
* Label
    * Create a new label
    * Delete a label
    * Get a label
    * Get all labels
* Message
    * Send an email
    * Delete a message
    * Get a message
    * Get all messages
    * Reply to an email
* Message Label
    * Add a label to a message
    * Remove a label from a message

## Example Usage

This workflow allows you to get all messages with a certain label, remove the label from the messages, and add a new label to the messages. You can also find the [workflow](https://n8n.io/workflows/621) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Gmail]()

The final workflow should look like the following image.

![A workflow with the Gmail node](/_images/integrations/nodes/gmail/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Gmail node (getAll: message)

This node will return ten messages with the label `n8n` from Gmail. If you want to return all the messages toggle ***Return All*** to `true`.

1. First of all, you'll have to enter credentials for the Gmail node. You can find out how to do that [here](/workflow/integrations/credentials/google/).
2. Select 'Message' from the ***Resource*** dropdown list.
3. Select 'Get All' from the ***Operation*** dropdown list.
4. Click on the ***Add Field*** button and select 'Format' from the dropdown list.
5. Select 'Full' from ***Format*** dropdown menu. This option will return the full email message data with the body content parsed in the payload field.
6. Click on the ***Add Field*** button and select 'Label IDs' from the dropdown list.
7. Select the label from the ***Label IDs*** dropdown list.
8. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns ten email messages with the label `n8n`.

![Using the Gmail node to get all messages with a particular label](/_images/integrations/nodes/gmail/gmail_node.png)



### 3. Gmail1 node (remove: messageLabel)

This node will remove the label `n8n` from all the messages that you received in the previous node. If you want to remove a different label, select that label instead.

1. Select the credentials that you entered in the previous Gmail node.
2. Select 'Message Label' from the ***Resource*** dropdown list.
3. Select 'Remove' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Message ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > Gmail > Output Data > JSON > id. You can also add the following expression: `{{$node["Gmail"].json["id"]}}`.
6. Select the label from the ***Label IDs*** dropdown list.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node removes the `n8n` label from the messages that we received from the previous node.

![Using the Gmail node to remove a label from the messages](/_images/integrations/nodes/gmail/gmail1_node.png)


### 4. Gmail2 node (add: messageLabel)

This node will add a new label `nodemation` to the messages that we received from the Gmail node. If you want to add a different label, select that label instead.

1. Select the credentials that you entered in the previous Gmail node.
2. Select 'Message Label' from the ***Resource*** dropdown list.
3. Click on the gears icon next to the ***Message ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Gmail > Output Data > JSON > id. You can also add the following expression: `{{$node["Gmail"].json["id"]}}`.
5. Select the label from the ***Label IDs*** dropdown list.
6. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node adds a new label `nodemation` to the messages that we received from the Gmail node.

![Using the Gmail node to add a label to the messages](/_images/integrations/nodes/gmail/gmail2_node.png)

## FAQs

### How to return all the messages with a particular label?

To return all the messages with a particular label, follow the steps mentioned below.

1. Select 'Message' from the ***Resource*** dropdown list.
2. Select 'Get All' from the ***Operation*** dropdown list.
3. If you want to all return all the messages with a particular, toggle ***Return All*** to `true`.
4. Click on ***Add Field*** and select 'Query'.
5. Enter `label:LABEL_NAME` in the ***Query*** field. Replace `LABEL_NAME` with your label name.
6. Click on ***Execute Node*** to run the node.

Refer to [Search operators you can use with Gmail](https://support.google.com/mail/answer/7190?hl=en) to learn more about filtering your search results.




