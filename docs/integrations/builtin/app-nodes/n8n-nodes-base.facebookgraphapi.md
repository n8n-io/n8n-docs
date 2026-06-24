---
title: Facebook Graph API node documentation
description: >-
  Learn how to use the Facebook Graph API node in n8n. Follow technical
  documentation to integrate Facebook Graph API node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Facebook Graph API node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.facebookgraphapi
layout:
  description:
    visible: false
---

# Facebook Graph API node <a href="#facebook-graph-api-node" id="facebook-graph-api-node"></a>

Use the Facebook Graph API node to automate work in Facebook Graph API, and integrate Facebook Graph API with other applications. n8n has built-in support for a wide range of Facebook Graph API features, including using queries GET POST DELETE for several parameters like host URL, request methods and much more.

On this page, you'll find a list of operations the Facebook Graph API node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Facebook Graph API credentials](../credentials/facebookgraph.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* **Default**
    * GET
    * POST
    * DELETE 
* **Video Uploads**
    * GET
    * POST
    * DELETE 


### Parameters <a href="#parameters" id="parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

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

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Facebook Graph API node documentation integration templates](https://n8n.io/integrations/facebook-graph-api) or [search all templates](https://n8n.io/workflows/)
