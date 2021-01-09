---
description: Learn how to use the Facebook Graph API node in n8n
---

# Facebook Graph API

[Facebook](https://www.facebook.com/) is a social networking site that makes it easy to connect and share with family and friends online.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/FacebookGraphAPI/README.md).
:::

## Basic Operations

::: details Default
- GET
- POST
- DELETE
:::

::: details Video Uploads
- GET
- POST
- DELETE
:::

## Example Usage

This workflow allows you to retrieve the first and last name of a profile on Facebook. You can also find the [workflow](https://n8n.io/workflows/514) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Facebook Graph API]()

The final workflow should look like the following image.

![A workflow with the Facebook Graph API node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Facebook Graph API node

1. First of all, you'll have to enter credentials for the Facebook Graph API node. You can find out how to do that [here](../../../credentials/FacebookGraphAPI/README.md).
2. Enter `me` in the *Node* field.
3. Click on the *Add Option* button and select 'Fields' from the dropdown list.
4. Click on the *Add Field* button and enter `first_name` in the *Name* field.
5. Click on the *Add Field* button and enter `last_name` in the *Name* field.
6. Click on *Execute Node* to run the workflow.
