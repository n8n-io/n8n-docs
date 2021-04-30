---
permalink: /nodes/n8n-nodes-base.awsLambda
description: Learn how to use the AWS Lambda node in n8n
---

# AWS Lambda

[AWS Lambda](https://aws.amazon.com/lambda/) is an event-driven, serverless computing platform provided by Amazon as a part of Amazon Web Services. It is a computing service that runs code in response to events and automatically manages the computing resources required by that code.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/AWS/README.md).
:::

## Basic Operations

<Resource node="AWS Lambda" />

## Example Usage

This workflow allows you to invoke a function using AWS Lambda. You can also find the [workflow](https://n8n.io/workflows/510) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [AWS Lambda]()

The final workflow should look like the following image.

![A workflow with the AWS Lambda node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS Lambda node

1. First of all, you'll have to enter credentials for the AWS Lambda node. You can find out how to do that [here](../../../credentials/AWS/README.md).
2. Select the function that you want to invoke from the *Function* dropdown list.
3. Click on *Execute Node* to run the workflow.
