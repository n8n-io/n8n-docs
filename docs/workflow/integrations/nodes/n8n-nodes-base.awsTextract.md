# AWS Textract

[AWS Textract](https://aws.amazon.com/textract/) is a service that extracts printed text, handwriting, and data from any document.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/aws/).


## Basic Operations

- Analyze Receipt or Invoice

## Example Usage

This workflow allows you to extract data from a an invoice stored in AWS S3. You can also find the [workflow](https://n8n.io/workflows/1282) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [AWS S3](/workflow/integrations/nodes/n8n-nodes-base.awsS3/)
- [AWS Textract]()

The final workflow looks like the following image.

![A workflow using the AWS S3 and AWS Textract node](/_images/integrations/nodes/awstextract/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS S3 node (download: file)

This node will retrieve an image file with a receipt from an S3 bucket.

1. Choose your credentials for the AWS S3 node. See [here](/workflow/integrations/credentials/aws/) for information on how to create these credentials.
2. Enter the bucket name in the ***Bucket Name*** field.
3. Enter the file key in the ***File Key*** field.
4. Click on ***Execute Node*** to run the node.

In the screenshot below you can see the file returned by the node.

![Using the AWS S3 node to fetch a file stored in a bucket](/_images/integrations/nodes/awstextract/awss3_node.png)

### 3. AWS Textract node (analyzeExpense)

This node will extract data from the receipt returned by the previous node.

1. Choose your AWS credentials.
2. Click on ***Execute Node*** to run the node.

In the screenshot below, you can see the receipt data extracted by AWS Textract and returned by the node.

![Using the AWS Textract node to extract data from a receipt](/_images/integrations/nodes/awstextract/awstextract_node.png)
