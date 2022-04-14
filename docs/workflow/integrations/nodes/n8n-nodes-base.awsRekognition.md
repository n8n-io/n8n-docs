# AWS Rekognition

[AWS Rekognition](https://aws.amazon.com/rekognition/) allows you to add image and video analysis to your applications. With AWS Rekognition, you can identify faces, labels, and celebrities in images.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/aws/).


## Basic Operations

**Image**

- Analyze


## Example Usage

This workflow allows you to detect a face from an image using the AWS Rekognition node. You can also find the [workflow](https://n8n.io/workflows/694) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/)
- [AWS Rekognition]()

The final workflow should look like the following image.

![A workflow with the AWS Rekognition node](/_images/integrations/nodes/awsrekognition/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.


### 2. HTTP Request node (GET)

This example workflow uses the HTTP Request node to fetch an image from a URL. You can also use the [Read Binary File](/integrations/core-nodes/n8n-nodes-base.readBinaryFile/) node to read an image file from the path you specify.

1. Enter the URL of the image in the ***URL*** field. For example, `https://n8n.io/_nuxt/img/04c67e5.png`.
2. Select 'File' from the ***Response Format*** dropdown list.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the HTTP Request node fetches the image from the URL. This image gets passed on as binary data to the next node in the workflow.

![Using the HTTP Request node to fetch an image from a URL](/_images/integrations/nodes/awsrekognition/httprequest_node.png)


### 3. AWS Rekognition node (analyze: image)

This node will detect faces in the image that we fetched in the previous node. You can also use this node to analyze an image stored in your AWS Bucket.

1. First of all, you'll have to enter credentials for the AWS Rekognition node. You can find out how to enter credentials for this node [here](/integrations/credentials/aws/).
2. Set ***Binary Data*** to `true`.
3. Click on ***Execute Node*** to run the node.

In the screenshot below, you will observe that the node detects the face in the image that we got from the HTTP Request node.

![Using the AWS Rekognition node to detect faces in an image](/_images/integrations/nodes/awsrekognition/awsrekognition_node.png)
