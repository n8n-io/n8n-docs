# Vero

[Vero](https://www.getvero.com/) is a messaging platform that helps manage real-time data to create a better customer experience.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/vero/).


## Basic Operations

* User
    * Create or update a user profile
    * Change a users identifier
    * Unsubscribe a user.
    * Resubscribe a user.
    * Delete a user.
    * Adds a tag to a users profile.
    * Removes a tag from a users profile.
* Event
    * Track an event for a specific customer


## Example Usage

This workflow allows you to create a user profile in Vero. You can also find the [workflow](https://n8n.io/workflows/499) on the website. This example usage workflow would use the following two nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Vero]()

The final workflow should look like the following image.

![A workflow with the Vero node](/_images/integrations/nodes/vero/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Vero node

1. First of all, you'll have to enter credentials for the Vero node. You can find out how to do that [here](/workflow/integrations/credentials/vero/).
2. Enter the unique identifier of the user in the *ID* field.
3. Click on *Execute Node* to run the workflow.
