---
title: WordPress
description: Documentation for the WordPress node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# WordPress

Use the WordPress node to automate work in WordPress, and integrate WordPress with other applications. n8n has built-in support for a wide range of WordPress features, including creating, updating, and getting posts and users.

On this page, you'll find a list of operations the WordPress node supports and links to more resources.

/// note | Credentials
Refer to [WordPress credentials](/integrations/builtin/credentials/wordpress/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [WordPress integrations](https://n8n.io/integrations/wordpress/){:target="_blank" .external-link} list.
///

## Basic Operations

* Post
    * Create a post
    * Get a post
    * Get all posts
    * Update a post
* User
    * Create a user
    * Get a user
    * Get all users
    * Update a user

## Example Usage

This workflow allows you to create and update a post in WordPress. You can also find the [workflow](https://n8n.io/workflows/668) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [WordPress]()

The final workflow should look like the following image.

![A workflow with the WordPress node](/_images/integrations/builtin/app-nodes/wordpress/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Wordpress node (create: post)

1. First of all, you'll have to enter credentials for the WordPress node. You can find out how to do that [here](/integrations/builtin/credentials/wordpress/).
2. Enter the title in the ***Title*** field.
3. Click on ***Test step*** to run the workflow.

![Using the WordPress node to create a new post](/_images/integrations/builtin/app-nodes/wordpress/wordpress_node.png)


### 3. Wordpress1 node (update: post)

1. Select the credentials that you entered in the previous node.
2. Select 'Update' from the ***Operation*** dropdown list.
3. Click on the gears icon next to the ***Post ID*** field and click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Wordpress > Output Data > JSON > id. You can also add the following expression: `{{$node["Wordpress"].json["id"]}}`.
5. Click on the ***Add Field*** button and select 'Content' from the dropdown list.
6. Enter the content in the ***Content*** filed.
7. Click on ***Test step*** to run the workflow.


![Using the WordPress node to update the post](/_images/integrations/builtin/app-nodes/wordpress/wordpress1_node.png)

