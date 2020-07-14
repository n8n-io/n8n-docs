---
permalink: /nodes/n8n-nodes-base.facebookGraphApi
---

# Facebook

[Facebook](https://www.facebook.com/) is an American online social media and social networking service based in Menlo Park, California.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Facebook/README.md).
:::

## Basic Operations

- Default
	- GET
	- POST
	- DELETE
- Video Uploads
	- GET
	- POST
	- DELETE


## Example Usage

This workflow allows you to retrieve the first and last name of a profile on Facebook. You can also find the [workflow](https://n8n.io/workflows/514) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Facebook Graph API]()

The final workflow should look like the following image.

![A workflow with the Facebook Graph API node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Facebook Graph API node

1. First of all, you'll have to enter credentials for the Facebook Graph API node. You can find out how to do that [here](../../../credentials/Facebook/README.md).
2. Enter 'me' in the *Node* field.
3. Click on the *Add Option* dropdown and select 'Fields' from the list.
4. Click on the *Add Field* button and add `first_name` and `last_name` as fields.
5. Click on *Execute Node* to run the workflow.
