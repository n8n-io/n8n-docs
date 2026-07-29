---
title: PostBin node documentation
description: >-
  Learn how to use the PostBin node in n8n. Follow technical documentation to
  integrate PostBin node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: PostBin node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.postbin.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.postbin'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.postbin'
layout:
  description:
    visible: false
---

# PostBin node <a href="#postbin-node" id="postbin-node"></a>

PostBin is a service that helps you test API clients and webhooks. Use the PostBin node to automate work in PostBin, and integrate PostBin with other applications. n8n has built-in support for a wide range of PostBin features, including creating and deleting bins, and getting and sending requests. 

On this page, you'll find a list of operations the PostBin node supports, and links to more resources.

## Operations <a href="#operations" id="operations"></a>

* Bin
	* Create
	* Get
	* Delete
* Request
	* Get
	* Remove First
	* Send

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse PostBin node documentation integration templates](https://n8n.io/integrations/postbin) or [search all templates](https://n8n.io/workflows/)

## Send requests <a href="#send-requests" id="send-requests"></a>

To send requests to a PostBin bin:

1. Go to [PostBin](https://www.toptal.com/developers/postbin/) and follow the steps to generate a new bin. PostBin gives you a unique URL, including a bin ID.
2. In the PostBin node, select the **Request** resource.
3. Choose the type of **Operation** you want to perform.
4. Enter your bin ID in **Bin ID**.

## Create and manage bins <a href="#create-and-manage-bins" id="create-and-manage-bins"></a>

You can create and manage PostBin bins using the PostBin node. 

1. In **Resource**, select **Bin**.
2. Choose an **Operation**. You can create, delete, or get a bin.
