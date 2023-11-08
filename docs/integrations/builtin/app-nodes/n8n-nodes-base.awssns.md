---
title: AWS SNS
description: Documentation for the AWS SNS node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# AWS SNS

Use the AWS SNS node to automate work in AWS SNS, and integrate AWS SNS with other applications. n8n has built-in support for a wide range of AWS SNS features, including publishing messages.

On this page, you'll find a list of operations the AWS SNS node supports and links to more resources.

/// note | Credentials
Refer to [AWS SNS credentials](/integrations/builtin/credentials/aws/) for guidance on setting up authentication.
///

/// note | Examples and Templates
For usage examples and templates to help you get started, take a look at n8n's [AWS SNS integrations](https://n8n.io/integrations/aws-sns/){:target=_blank .external-link} list.
///

## Basic Operations

* Publish a message to a topic

## Example Usage

This workflow allows you to publish a message using AWS SNS. You can also find the [workflow](https://n8n.io/workflows/501) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [AWS SNS]()

The final workflow should look like the following image.

![A workflow with the AWS SNS node](/_images/integrations/builtin/app-nodes/awssns/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS SNS node

1. First of all, you'll have to enter credentials for the AWS SNS node. You can find out how to do that [here](/integrations/builtin/credentials/aws/).
2. Select the topic in the *Topic* dropdown list. You can find instructions on how to create a new topic in AWS SNS [here](https://docs.aws.amazon.com/sns/latest/dg/sns-tutorial-create-topic.html).
3. Enter a subject for your message in the *Subject* field.
4. Enter your message in the *Message* field.
5. Click on *Execute Node* to run the workflow.

