---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: PostBin
description: Documentation for the PostBin node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Postbin

PostBin is a service that helps you test API clients and webhooks. Use the PostBin node to automate work in Postbin, and integrate PostBin with other applications. n8n has built-in support for a wide range of PostBin features, including creating and deleting bins, and getting and sending requests. 

On this page, you'll find a list of operations the PostBin node supports, and links to more resources.

## Operations

* Bin
	* Create
	* Get
	* Delete
* Request
	* Get
	* Remove First
	* Send

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'postbin') ]]

## Send requests

To send requests to a Postbin bin:

1. Go to [Postbin](https://www.toptal.com/developers/postbin/){:target=_blank .external-link} and follow the steps to generate a new bin. Postbin gives you a unique URL, including a bin ID.
2. In the Postbin node, select the **Request** resource.
3. Choose the type of **Operation** you want to perform.
4. Enter your bin ID in **Bin ID**.

## Create and manage bins

You can create and manage Postbin bins using the Postbin node. 

1. In **Resource**, select **Bin**.
2. Choose an **Operation**. You can create, delete, or get a bin.
