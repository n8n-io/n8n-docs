---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Facebook Graph API node documentation
description: Learn how to use the Facebook Graph API node in n8n. Follow technical documentation to integrate Facebook Graph API node into your workflows.
contentType: integration
priority: medium
---

# Facebook Graph API node

Use the Facebook Graph API node to automate work in Facebook Graph API, and integrate Facebook Graph API with other applications. n8n has built-in support for a wide range of Facebook Graph API features, including using queries GET POST DELETE for several parameters like host URL, request methods and much more.

On this page, you'll find a list of operations the Facebook Graph API node supports and links to more resources.

/// note | Credentials
Refer to [Facebook Graph API credentials](/integrations/builtin/credentials/facebookgraph/) for guidance on setting up authentication. 
///

## Operations

* **Default**
    * GET
    * POST
    * DELETE 
* **Video Uploads**
    * GET
    * POST
    * DELETE 


### Parameters

* **Host URL**: The host URL for the request. The following options are available:
    * **Default**: Requests are passed to the `graph.facebook.com` host URL. Used for the majority of requests.
    * **Video**: Requests are passed to the `graph-video.facebook.com` host URL. Used for video upload requests only.
* **HTTP Request Method**: The method to be used for this request, from the following options:
    * **GET**
    * **POST**
    * **DELETE**
* **Graph API Version**: The version of the [Facebook Graph API](https://developers.facebook.com/docs/graph-api/changelog) to be used for this request.
* **Node**: The node on which to operate, for example `/<page-id>/feed`. Read more about it in the [official Facebook Developer documentation](https://developers.facebook.com/docs/graph-api/using-graph-api).
* **Edge**: Edge of the node on which to operate. Edges represent collections of objects which are attached to the node.
* **Ignore SSL Issues**: Toggle to still download the response even if SSL certificate validation isn't possible.
* **Send Binary File**: Available for `POST` operations. If enabled binary data is sent as the body. Requires setting the following:
    * **Input Binary Field**: Name of the binary property which contains the data for the file to be uploaded.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'facebook-graph-api') ]]
