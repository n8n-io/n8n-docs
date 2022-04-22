# Mindee

[Mindee](https://mindee.com) develops API-based products for instantly extracting information from any kind of image and transforming it into usable data.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/mindee/).


## Basic Operations

**Invoice**
- Predict


**Receipt**
- Predict


## Example Usage

This workflow allows you to extract information from an image of a receipt using the Mindee node. You can also find the [workflow](https://n8n.io/workflows/702) on Workflow².io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [HTTP Request](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/)
- [Mindee]()

The final workflow should look like the following image.

![A workflow with the Mindee node](/_images/integrations/nodes/mindee/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.


### 2. HTTP Request (GET)

This example workflow uses the HTTP Request node to make a GET request to download the image of a receipt. You can also use other nodes, for example, the [Box](/workflow/integrations/nodes/n8n-nodes-base.box/) node, to get the images of the receipts you want to use.

1. Enter the URL of the image in the ***URL*** field. For example, `https://miro.medium.com/max/1400/0*1T9GkAb93w5NSMsf`.
2. Select 'File' from the ***Response Format*** dropdown list.
3. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the HTTP Request node downloads the image from the URL. This image (binary data) can now be used by the other nodes in the workflow.

![Using the HTTP Request node to get the file](/_images/integrations/nodes/mindee/httprequest_node.png)


### 3. Mindee node (predict: receipt)

This node will get the image of the receipt (binary data) from the HTTP Request node and extract the information from it.
1. Select 'Receipt' from the ***Resource*** dropdown list.
2. You'll have to enter credentials for the Mindee node. You can find out how to do that  [here](/workflow/integrations/credentials/mindee/).
3. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node extracts the information from the image that it got from the HTTP Request node.

![Using the Mindee node to extract information from receipt](/_images/integrations/nodes/mindee/mindee_node.png)




