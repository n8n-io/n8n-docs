---
permalink: /nodes/n8n-nodes-base.awsSns
description: Learn how to use the AWS SNS node in n8n
---

# AWS SNS

[AWS SNS](https://aws.amazon.com/sns/) is a notification service provided as part of Amazon Web Services. It provides a low-cost infrastructure for the mass delivery of messages, predominantly to mobile users.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/AWS/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.awsSns" />

## Example Usage

This workflow allows you to publish a message using AWS SNS. You can also find the [workflow](https://n8n.io/workflows/501) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [AWS SNS]()

The final workflow should look like the following image.

![A workflow with the AWS SNS node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS SNS node

1. First of all, you'll have to enter credentials for the AWS SNS node. You can find out how to do that [here](../../../credentials/AWS/README.md).
2. Select the topic in the *Topic* dropdown list. You can find instructions on how to create a new topic in AWS SNS [here](https://docs.aws.amazon.com/sns/latest/dg/sns-tutorial-create-topic.html).
3. Enter a subject for your message in the *Subject* field.
4. Enter your message in the *Message* field.
5. Click on *Execute Node* to run the workflow.
