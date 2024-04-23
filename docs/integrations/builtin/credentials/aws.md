---
title: AWS credentials
description: Documentation for AWS credentials. Use these credentials to authenticate AWS in n8n, a workflow automation platform.
contentType: integration
---

# AWS credentials

You can use these credentials to authenticate the following nodes:

- [AWS Bedrock Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatawsbedrock)
- [AWS Certificate Manager](/integrations/builtin/app-nodes/n8n-nodes-base.awscertificatemanager/)
- [AWS DynamoDB](/integrations/builtin/app-nodes/n8n-nodes-base.awsdynamodb/)
- [AWS Elastic Load Balancing](/integrations/builtin/app-nodes/n8n-nodes-base.awselb/)
- [AWS Lambda](/integrations/builtin/app-nodes/n8n-nodes-base.awslambda/)
- [AWS Rekognition](/integrations/builtin/app-nodes/n8n-nodes-base.awsrekognition/)
- [AWS S3](/integrations/builtin/app-nodes/n8n-nodes-base.awsS3/)
- [AWS SES](/integrations/builtin/app-nodes/n8n-nodes-base.awsses/)
- [AWS SNS](/integrations/builtin/app-nodes/n8n-nodes-base.awssns/)
- [AWS SNS Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.awssnstrigger/)
- [AWS SQS](/integrations/builtin/app-nodes/n8n-nodes-base.awssqs/)
- [AWS Textract](/integrations/builtin/app-nodes/n8n-nodes-base.awstextract/)
- [AWS Transcribe](/integrations/builtin/app-nodes/n8n-nodes-base.awstranscribe/)
- [Embeddings AWS Bedrock](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsawsbedrock)

## Prerequisites

Create an [AWS](https://aws.amazon.com/){:target=_blank .external-link} account.

## Supported authentication methods

- Access key

## Using Access key

Refer to the [AWS Managing Access Keys documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html){:target=_blank .external-link} for instructions on generating and updating access keys.

To configure your AWS credential in n8n, you'll need:

- The AWS **Region**: be sure to adjust this if you aren't using the default region
- The **Access Key ID**: provided when you generate an access key
- The **Secret Access Key**: provided when you generate an access key

## Using a temporary security credential

You can configure the access key as a temporary security credential by toggling the slider on.

If you select this option, you must add a **Session token** to the credential.

Refer to the [AWS Temporary security credential documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html){:target=_blank .external-link} for more information on working with temporary security credentials.

## Virtual Private Cloud usage (custom endpoint)

If you use [Amazon Virtual Private Cloud (VPC)](https://aws.amazon.com/vpc/){:target=_blank .external-link} to host n8n, you can establish a connection between your VPC and these apps:

- Rekognition
- Lambda
- SNS
- SES
- SQS
- S3

To use these apps with a custom endpoint, toggle the **Custom endpoint** slider on and add the relevant custom endpoint(s).

If you don't add a custom endpoint, the n8n credential will use the default endpoint.



