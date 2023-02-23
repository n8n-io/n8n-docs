# AWS Textract

The AWS Textract node allows you to automate work in AWS Textract, and integrate AWS Textract with other applications. n8n has built-in support for a wide range of AWS Textract features, including analyzing invoices.

On this page, you'll find a list of operations the AWS Textract node supports and links to more resources.

!!! note "Credentials"
  Refer to [AWS Textract credentials](https://docs.n8n.io/integrations/builtin/credentials/aws/) for guidance on setting up authentication. 

!!! note "Examples and Templates"
  For usage examples and templates to help you get started, take a look at n8n's [AWS Textract integrations](https://n8n.io/integrations/aws-textract/){:target=_blank .external-link} list.

## Basic Operations

- Analyze Receipt or Invoice

## Example Usage

This workflow allows you to extract data from a an invoice stored in AWS S3. You can also find the [workflow](https://n8n.io/workflows/1282) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [AWS S3](/integrations/builtin/app-nodes/n8n-nodes-base.awsS3/)
- [AWS Textract]()

The final workflow looks like the following image.

![A workflow using the AWS S3 and AWS Textract node](/_images/integrations/builtin/app-nodes/awstextract/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS S3 node (download: file)

This node will retrieve an image file with a receipt from an S3 bucket.

1. Choose your credentials for the AWS S3 node. See [here](/integrations/builtin/credentials/aws/) for information on how to create these credentials.
2. Enter the bucket name in the ***Bucket Name*** field.
3. Enter the file key in the ***File Key*** field.
4. Click on ***Execute Node*** to run the node.

In the screenshot below you can see the file returned by the node.

![Using the AWS S3 node to fetch a file stored in a bucket](/_images/integrations/builtin/app-nodes/awstextract/awss3_node.png)

### 3. AWS Textract node (analyzeExpense)

This node will extract data from the receipt returned by the previous node.

1. Choose your AWS credentials.
2. Click on ***Execute Node*** to run the node.

In the screenshot below, you can see the receipt data extracted by AWS Textract and returned by the node.

![Using the AWS Textract node to extract data from a receipt](/_images/integrations/builtin/app-nodes/awstextract/awstextract_node.png)
