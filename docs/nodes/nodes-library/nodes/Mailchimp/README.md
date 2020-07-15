---
permalink: /nodes/n8n-nodes-base.mailchimp
---

# Mailchimp

[Mailchimp](https://mailchimp.com/) is an integrated marketing platform that allows business owners to automate their email campaigns and track user engagement.

::: tip 🔑 Credentials
The instructions for authenticating with Mailchimp are [here](../../../credentials/MailChimp/README.md).
:::

## Basic Operations

- Member
	- Add a new member to the list
	- Delete a member of the list
	- Get a member of the list
	- Get all members of the list
	- Update a member of the list
- Member Tag
	- Add tags for a list member
	- Remove tags of a list member

## Example Usage

This workflow demonstrates creating a new member in a list. You can also find the [workflow](https://n8n.io/workflows/413) on this website. This example usage workflow uses the following two nodes.

- [Start](../../core-nodes/Start)
- [Mailchimp]()

The final workflow should look like the following image.

![A workflow with the Mailchimp node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Mailchimp Node

1. First of all, you'll have to enter credentials for the Mailchimp node. You can find out how to do that [here](../../../credentials/MailChimp/README.md).
4. Choose the Mailchimp list you want to use from the *List* dropdown.
5. Enter the email address you want to add in the *Email* field.
6. Choose their status in the *Status* field.
8. Click on *Execute Node* to run the workflow.
