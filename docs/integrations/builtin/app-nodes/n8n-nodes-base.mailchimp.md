# Mailchimp

The Mailchimp node allows you to automate work in Mailchimp, and integrate Mailchimp with other applications. n8n has built-in support for a wide range of Mailchimp features, including creating, updating, and deleting campaigns, as well as getting list groups. 

On this page, you'll find a list of operations the Mailchimp node supports and links to more resources.

!!! note "Credentials"
    Refer to [Mailchimp credentials](https://docs.n8n.io/integrations/builtin/credentials/mailchimp/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Mailchimp integrations](https://n8n.io/integrations/mailchimp/){:target="_blank" .external-link} list.


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

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Mailchimp]()

The final workflow should look like the following image.

![A workflow with the Mailchimp node](/_images/integrations/builtin/app-nodes/mailchimp/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mailchimp node

1. First of all, you'll have to enter credentials for the Mailchimp node. You can find out how to do that [here](/integrations/builtin/credentials/mailchimp/).
4. Select the Mailchimp list from the *List* dropdown list.
5. Enter the email address in the *Email* field.
6. Select the status from the *Status* dropdown list.
8. Click on *Execute Node* to run the workflow.
