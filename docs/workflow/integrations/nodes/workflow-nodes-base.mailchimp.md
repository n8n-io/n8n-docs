# Mailchimp

[Mailchimp](https://mailchimp.com/) is an integrated marketing platform that allows business owners to automate their email campaigns and track user engagement.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/mailchimp/).


## Basic Operations

* Campaign
    * Delete a campaign
    * Get a campaign
    * Get all the campaigns
    * Replicate a campaign
    * Creates a Resend to Non-Openers version of this campaign
    * Send a campaign
* List Group
    * Get all groups
* Member
    * Create a new member on list
    * Delete a member on list
    * Get a member on list
    * Get all members on list
    * Update a new member on list
* Member Tag
    * Add tags from a list member
    * Remove tags from a list member

## Example Usage

This workflow allows you to add a new member to a list in Mailchimp. You can also find the [workflow](https://n8n.io/workflows/413) on this website. This example usage workflow uses the following two nodes.

- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [Mailchimp]()

The final workflow should look like the following image.

![A workflow with the Mailchimp node](/_images/integrations/nodes/mailchimp/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mailchimp node

1. First of all, you'll have to enter credentials for the Mailchimp node. You can find out how to do that [here](/workflow/integrations/credentials/mailchimp/).
4. Select the Mailchimp list from the *List* dropdown list.
5. Enter the email address in the *Email* field.
6. Select the status from the *Status* dropdown list.
8. Click on *Execute Node* to run the workflow.
