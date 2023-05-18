---
title: AWS Lambda
description: Documentation for the AWS Lambda node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# AWS Lambda

The AWS Lambda node allows you to automate work in AWS Lambda, and integrate AWS Lambda with other applications. n8n has built-in support for a wide range of AWS Lambda features, including invoking functions.

On this page, you'll find a list of operations the AWS Lambda node supports and links to more resources.

!!! note "Credentials"
    Refer to [AWS Lambda credentials](/integrations/builtin/credentials/aws/) for guidance on setting up authentication. 

!!! note "Examples and Templates"
    For usage examples and templates to help you get started, take a look at n8n's [AWS Lambda integrations](https://n8n.io/integrations/aws-lambda/){:target=_blank .external-link} list.



## Basic Operations

* Invoke a function

## Example Usage

This workflow allows you to invoke a function using AWS Lambda. You can also find the [workflow](https://n8n.io/workflows/510) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [AWS Lambda]()

The final workflow should look like the following image.

![A workflow with the AWS Lambda node](/_images/integrations/builtin/app-nodes/awslambda/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS Lambda node

1. First of all, you'll have to enter credentials for the AWS Lambda node. You can find out how to do that [here](/integrations/builtin/credentials/aws/).
2. Select the function that you want to invoke from the *Function* dropdown list.
3. Click on *Execute Node* to run the workflow.

