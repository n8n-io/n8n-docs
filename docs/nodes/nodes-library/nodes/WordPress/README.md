---
permalink: /nodes/n8n-nodes-base.wordpress
---

# WordPress

[WordPress](https://wordpress.org/) is a free and open-source content management system written in PHP and paired with a MySQL or MariaDB database.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/WordPress/README.md).
:::

## Basic Operations

- Post
    - Create a post
    - Get a post
    - Get all posts
    - Update a post
- User
	- Create a user
	- Get a user
	- Get all users
	- Update a user

## Example Usage

This workflow allows you to get all posts from WordPress. You can also find the [workflow](https://n8n.io/workflows/546) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [WordPress]()

The final workflow should look like the following image.

![A workflow with the WordPress node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. WordPress node

1. First of all, you'll have to enter credentials for the WordPress node. You can find out how to do that [here](../../../credentials/WordPress/README.md).
2. Select 'Get All' from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.
