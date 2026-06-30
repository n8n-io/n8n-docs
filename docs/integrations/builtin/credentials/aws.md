---
title: AWS credentials
description: >-
  Documentation for AWS credentials. Use these credentials to authenticate AWS
  in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: AWS credentials
originalFilePath: integrations/builtin/credentials/aws.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/aws'
url: 'https://docs.n8n.io/integrations/builtin/credentials/aws'
layout:
  description:
    visible: false
---

# AWS credentials <a href="#aws-credentials" id="aws-credentials"></a>

## AWS (IAM) credentials <a href="#aws-iam-credentials" id="aws-iam-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [AWS Bedrock Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatawsbedrock.md)
- [AWS Certificate Manager](../app-nodes/n8n-nodes-base.awscertificatemanager.md)
- [AWS Cognito](../app-nodes/n8n-nodes-base.awscognito.md)
- [AWS Comprehend](../app-nodes/n8n-nodes-base.awscomprehend.md)
- [AWS DynamoDB](../app-nodes/n8n-nodes-base.awsdynamodb.md)
- [AWS Elastic Load Balancing](../app-nodes/n8n-nodes-base.awselb.md)
- [AWS IAM](../app-nodes/n8n-nodes-base.awsiam.md)
- [AWS Lambda](../app-nodes/n8n-nodes-base.awslambda.md)
- [AWS Rekognition](../app-nodes/n8n-nodes-base.awsrekognition.md)
- [AWS S3](../app-nodes/n8n-nodes-base.awss3.md)
- [AWS SES](../app-nodes/n8n-nodes-base.awsses.md)
- [AWS SNS](../app-nodes/n8n-nodes-base.awssns.md)
- [AWS SNS Trigger](../trigger-nodes/n8n-nodes-base.awssnstrigger.md)
- [AWS SQS](../app-nodes/n8n-nodes-base.awssqs.md)
- [AWS Textract](../app-nodes/n8n-nodes-base.awstextract.md)
- [AWS Transcribe](../app-nodes/n8n-nodes-base.awstranscribe.md)
- [Embeddings AWS Bedrock](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsawsbedrock.md)

### Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API access key

### Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [AWS's Identity and Access Management documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started.html) for more information about the service.

### Using API access key <a href="#using-api-access-key" id="using-api-access-key"></a>

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

## AWS (Assume Role) credentials <a href="#aws-assume-role-credentials" id="aws-assume-role-credentials"></a>

You can use these credentials to authenticate the following nodes with enhanced security through IAM role assumption:

* [AWS Bedrock Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatawsbedrock.md)
* [AWS Certificate Manager](../app-nodes/n8n-nodes-base.awscertificatemanager.md)
* [AWS Cognito](../app-nodes/n8n-nodes-base.awscognito.md)
* [AWS Comprehend](../app-nodes/n8n-nodes-base.awscomprehend.md)
* [AWS DynamoDB](../app-nodes/n8n-nodes-base.awsdynamodb.md)
* [AWS Elastic Load Balancing](../app-nodes/n8n-nodes-base.awselb.md)
* [AWS Rekognition](../app-nodes/n8n-nodes-base.awsrekognition.md)
* [AWS S3](../app-nodes/n8n-nodes-base.awss3.md)
* [AWS SES](../app-nodes/n8n-nodes-base.awsses.md)
* [AWS SQS](../app-nodes/n8n-nodes-base.awssqs.md)
* [AWS Textract](../app-nodes/n8n-nodes-base.awstextract.md)
* [AWS Transcribe](../app-nodes/n8n-nodes-base.awstranscribe.md)
* [Embeddings AWS Bedrock](../cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsawsbedrock.md)

### Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* Role Assumption

### Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [AWS's IAM Role documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) and [STS AssumeRole documentation](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html) for more information about role assumption.

### Understanding AWS Role Assumption <a href="#understanding-aws-role-assumption" id="understanding-aws-role-assumption"></a>

AWS Role Assumption allows you to securely access AWS resources by temporarily assuming an IAM role, rather than using long-lived access keys. This follows AWS security best practices and enables:

* **Cross-account access:** Access resources in different AWS accounts
* **Enhanced security:** Use temporary credentials that automatically expire
* **Principle of least privilege:** Grant only the permissions needed for specific tasks
* **Audit trail:** Better tracking of who accessed what resources

### Setting up AWS Assume Role credentials <a href="#setting-up-aws-assume-role-credentials" id="setting-up-aws-assume-role-credentials"></a>

To configure this credential, you'll need:

#### Required Parameters <a href="#required-parameters" id="required-parameters"></a>

* **Region:** The AWS region in which to call the STS service to assume the role.
* **Role ARN:** The Amazon Resource Name (ARN) of the IAM role you want to assume. It has the format `arn:aws:iam::123456789012:role/MyRole`. This role must have a trust policy that allows your credentials to assume it.
* **External ID:** A unique identifier required by the role's trust policy to prevent the "confused deputy" problem. This should be a secret value that you generate and configure in both the role's trust policy and this credential. Treat this value as sensitive. Don't share it with other n8n users you don't trust.
* **Role Session Name:** A name for the assumed role session (used for auditing).  Default values is `n8n-session`. This value appears in AWS CloudTrail logs so you can identify the session.

#### STS credentials (Choose one method) <a href="#sts-credentials-choose-one-method" id="sts-credentials-choose-one-method"></a>

You have two options for providing credentials to make the STS AssumeRole call:

##### Option 1: Use system credentials (recommended for server deployments) <a href="#option-1-use-system-credentials-recommended-for-server-deployments" id="option-1-use-system-credentials-recommended-for-server-deployments"></a>

Enable this option if your n8n server has AWS credentials configured through:

* Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`)
* EC2 instance profile
* ECS task role
* EKS pod identity

This option requires your n8n administrator to enable system credentials access by setting environment variable `N8N_AWS_SYSTEM_CREDENTIALS_ACCESS_ENABLED` to `true`

##### Option 2: Manual STS Credentials <a href="#option-2-manual-sts-credentials" id="option-2-manual-sts-credentials"></a>

If system credentials aren't available, provide these manually:

* **STS Access Key ID:** Access Key ID for an IAM user or role that has permission to assume the target role.
* **STS Secret Access Key:** Secret Access Key corresponding to the STS Access Key ID.
* **STS Session Token** (optional): Session token if using temporary credentials for the STS call.

#### Optional Parameters <a href="#optional-parameters" id="optional-parameters"></a>

* **Custom Endpoints:** If using Amazon VPC, you can specify custom endpoints for AWS services:

    * Rekognition Endpoint
    * Lambda Endpoint
    * SNS Endpoint
    * SES Endpoint
    * SQS Endpoint
    * S3 Endpoint
    * SSM Endpoint

### Setup Steps <a href="#setup-steps" id="setup-steps"></a>

1. Create the IAM Role in the target AWS account.

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "AWS": "arn:aws:iam::SOURCE-ACCOUNT:root"
         },
         "Action": "sts:AssumeRole",
         "Condition": {
           "StringEquals": {
             "sts:ExternalId": "your-unique-external-id"
           }
         }
       }
     ]
   }
   
   ```
2. Configure the credential in n8n.
   * Select your AWS **Region**
   * Enter the **Role ARN** of the role you created
   * Set a unique **External ID** (same as in the trust policy)
   * Choose your **STS credentials method**
   * Enter the **Role Session Name** (or use default)
3. **Test the credential** using the built-in test function to verify the role assumption works.

### Security Best Practices <a href="#security-best-practices" id="security-best-practices"></a>

* Use unique External IDs for each credential to prevent unauthorized access.
* Rotate the STS credentials used for role assumption.
* Apply the principle of least privilege to both the assuming credentials and the target role.
