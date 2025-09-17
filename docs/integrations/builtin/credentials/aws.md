---
title: AWS credentials
description: Documentation for AWS credentials. Use these credentials to authenticate AWS in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# AWS credentials

You can use these credentials to authenticate the following nodes:

- [AWS Bedrock Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatawsbedrock.md)
- [AWS Certificate Manager](/integrations/builtin/app-nodes/n8n-nodes-base.awscertificatemanager.md)
- [AWS Cognito](/integrations/builtin/app-nodes/n8n-nodes-base.awscognito.md)
- [AWS Comprehend](/integrations/builtin/app-nodes/n8n-nodes-base.awscomprehend.md)
- [AWS DynamoDB](/integrations/builtin/app-nodes/n8n-nodes-base.awsdynamodb.md)
- [AWS Elastic Load Balancing](/integrations/builtin/app-nodes/n8n-nodes-base.awselb.md)
- [AWS IAM](/integrations/builtin/app-nodes/n8n-nodes-base.awsiam.md)
- [AWS Lambda](/integrations/builtin/app-nodes/n8n-nodes-base.awslambda.md)
- [AWS Rekognition](/integrations/builtin/app-nodes/n8n-nodes-base.awsrekognition.md)
- [AWS S3](/integrations/builtin/app-nodes/n8n-nodes-base.awss3.md)
- [AWS SES](/integrations/builtin/app-nodes/n8n-nodes-base.awsses.md)
- [AWS SNS](/integrations/builtin/app-nodes/n8n-nodes-base.awssns.md)
- [AWS SNS Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.awssnstrigger.md)
- [AWS SQS](/integrations/builtin/app-nodes/n8n-nodes-base.awssqs.md)
- [AWS Textract](/integrations/builtin/app-nodes/n8n-nodes-base.awstextract.md)
- [AWS Transcribe](/integrations/builtin/app-nodes/n8n-nodes-base.awstranscribe.md)
- [Embeddings AWS Bedrock](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsawsbedrock.md)

## Supported authentication methods

- API access key

## Related resources

Refer to [AWS's Identity and Access Management documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started.html) for more information about the service.

## Using API access key

To configure this credential, you'll need an [AWS](https://aws.amazon.com/) account and:

- Your AWS **Region**
- The **Access Key ID**: Generated when you create an access key.
- The **Secret Access Key**: Generated when you create an access key.

To create an access key and set up the credential:

1. In your n8n credential, select your AWS **Region**.
1. Log in to the [IAM console](https://console.aws.amazon.com/iam).
2. In the navigation bar on the upper right, select your user name and then select **Security credentials**.
3. In the **Access keys** section, select **Create access key**.
4. On the **Access key best practices & alternatives page**, choose your use case. If it doesn't prompt you to create an access key, select **Other**.
5. Select **Next**.
6. Set a **description** tag value for the access key to make it easier to identify, for example `n8n integration`.
7. Select **Create access key**.
8. Reveal the **Access Key ID** and **Secret Access Key** and enter them in n8n.
10. To use a **Temporary security credential**, turn that option on and add a **Session token**. Refer to the [AWS Temporary security credential documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) for more information on working with temporary security credentials.
11. If you use [Amazon Virtual Private Cloud (VPC)](https://aws.amazon.com/vpc/) to host n8n, you can establish a connection between your VPC and some apps. Use **Custom Endpoints** to enter relevant custom endpoint(s) for this connection. This setup works with these apps:
    - Rekognition
    - Lambda
    - SNS
    - SES
    - SQS
    - S3

You can also generate access keys through the AWS CLI and AWS API. Refer to the [AWS Managing Access Keys documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for instructions on generating access keys using these methods.

