---
permalink: /nodes/n8n-nodes-base.awsS3
description: Learn how to use the AWS S3 node in n8n
---

# AWS S3

[AWS S3](https://aws.amazon.com/s3/) is a service offered by Amazon Web Services that provides object storage through a web service interface.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/AWS/README.md).
:::

## Basic Operations

<Resource node="AWS S3" />

## Example Usage

This workflow allows you to create a bucket on AWS S3. You can also find the [workflow](https://n8n.io/workflows/458) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [AWS S3]()

The final workflow should look like the following image.

![A workflow with the AWS S3 node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS S3 node

1. First of all, you'll have to enter credentials for the AWS S3 node. You can find out how to do that [here](../../../credentials/AWS/README.md).
2. Select 'Bucket' from the *Resource* dropdown list.
3. Enter a name for your bucket in the *Name* field.
4. Click on *Execute Node* to run the workflow.
