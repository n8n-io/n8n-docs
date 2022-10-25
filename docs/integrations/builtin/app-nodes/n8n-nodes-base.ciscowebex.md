# Webex by Cisco

[Webex by Cisco](https://webex.com/) is a web conferencing and videoconferencing application.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/ciscoWebex/).


## Basic operations

* Meeting
    * Create
    * Delete
    * Get
    * Get All
    * Update
* Message
    * Create
    * Delete
    * Get
    * Get All
    * Update

## Example usage

This workflow allows you to create a new meeting. This example usage workflow uses the following node:

- [Webex by Cisco]()

The final workflow should look like the following image.

![A workflow with the Webex by Cisco node](/_images/integrations/builtin/app-nodes/ciscowebex/workflow.png)

### 1. Webex by Cisco node

1. First enter your credentials for node. You can find out how to do that [here](/integrations/builtin/credentials/ciscoWebex/).
2. Select 'Meeting' from the *Resource* dropdown list.
3. Select 'Create' from the *Operation* dropdown list.
4. Enter a *Title* for your new meeting.
5. Select the *Start* and *End* times for the meeting.
6. Optionally, use the *Additional Fields* menu to add further meeting details, for example an agenda, set the invitees, or a meeting recurrence.
7. Click on *Execute Node* to run the workflow.

![The Webex by Cisco node](/_images/integrations/builtin/app-nodes/ciscowebex/webex_node.png)
