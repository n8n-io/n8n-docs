# Facebook Graph API

Facebook Graph API node allows you to automate work in the Facebook Graph platform and integrate Facebook Graph API with other applications. n8n has built-in support for a wide range of Facebook Graph API features, which includes basic operations like using queries GET POST DELETE for several parameters like host URL, request methods and much more.

On this page, you'll find a list of operations the Facebook Graph API node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Facebook Graph API credentials](https://docs.n8n.io/integrations/builtin/credentials/facebookgraph/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For example, usage and templates to help you get started, take a look at n8n's [Facebook Graph API integrations](https://n8n.io/integrations/facebookgraph/){:target="_blank" .external-link} list.


## Basic operations

**Default**
- GET
- POST
- DELETE 


**Video Uploads**
- GET
- POST
- DELETE 


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
* **Ignore SSL Issues**: Toggle to still download the response even if SSL certificate validation is not possible.
* **Send Binary Data**: Available for `POST` operations. If enabled binary data is sent as the body. Requires setting the following:
    * **Binary Property**: Name of the binary property which contains the data for the file to be uploaded.

## Example usage

This workflow allows you to retrieve the first and last name of a profile on Facebook. You can also find the [workflow](https://n8n.io/workflows/514) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Facebook Graph API]()

The final workflow should look like the following image.

![A workflow with the Facebook Graph API node](/_images/integrations/builtin/app-nodes/facebookgraphapi/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Facebook Graph API node

1. First of all, you'll have to enter credentials for the Facebook Graph API node. You can find out how to do that [here](/integrations/builtin/credentials/facebookgraph/).
2. Enter `me` in the *Node* field.
3. Click on the *Add Option* button and select 'Fields' from the dropdown list.
4. Click on the *Add Field* button and enter `first_name` in the *Name* field.
5. Click on the *Add Field* button and enter `last_name` in the *Name* field.
6. Click on *Execute Node* to run the workflow.
