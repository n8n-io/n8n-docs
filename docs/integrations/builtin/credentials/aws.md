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

n8n offers two credential types for AWS:

* **AWS (IAM)**: authenticate with an access key (Access Key ID and Secret Access Key).
* **AWS (Assume Role)**: authenticate by assuming an IAM role through AWS STS. The credentials n8n uses for the `AssumeRole` call can be entered manually, or read automatically from the environment n8n runs in.

If you self-host n8n on AWS infrastructure (EKS, ECS, or EC2) and want to avoid storing static keys in n8n, see [Using AWS system credentials](#using-aws-system-credentials-federated-authentication).

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
* [AWS IAM](../app-nodes/n8n-nodes-base.awsiam.md)
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

n8n uses the official AWS SDK to make the STS `AssumeRole` call, and requests fresh temporary credentials when it signs node requests, so you don't need to manage their expiry. This differs from the **Temporary security credential** option on the AWS (IAM) credential, where you enter a static session token that n8n can't renew: when that token expires, you must enter a new one.

### Setting up AWS Assume Role credentials <a href="#setting-up-aws-assume-role-credentials" id="setting-up-aws-assume-role-credentials"></a>

To configure this credential, you'll need:

#### Required Parameters <a href="#required-parameters" id="required-parameters"></a>

* **Region:** The AWS region in which to call the STS service to assume the role. n8n calls the regional STS endpoint for this region. This includes the AWS China (`cn-*`) and AWS GovCloud (`us-gov-*`) partitions (available from n8n 2.29.0).
* **Role ARN:** The Amazon Resource Name (ARN) of the IAM role you want to assume. It has the format `arn:aws:iam::123456789012:role/MyRole`. This role must have a trust policy that allows your credentials to assume it.
* **External ID:** A unique identifier required by the role's trust policy to prevent the "confused deputy" problem. This should be a secret value that you generate and configure in both the role's trust policy and this credential. Treat this value as sensitive. Don't share it with other n8n users you don't trust.
* **Role Session Name:** A name for the assumed role session (used for auditing).  Default values is `n8n-session`. This value appears in AWS CloudTrail logs so you can identify the session.

#### STS credentials (Choose one method) <a href="#sts-credentials-choose-one-method" id="sts-credentials-choose-one-method"></a>

You have two options for providing credentials to make the STS AssumeRole call:

##### Option 1: Use system credentials (recommended for server deployments) <a href="#option-1-use-system-credentials-recommended-for-server-deployments" id="option-1-use-system-credentials-recommended-for-server-deployments"></a>

Turn on **Use System Credentials** if the environment your n8n server runs in already has an AWS identity. n8n then discovers credentials for the `AssumeRole` call automatically, without storing static keys in n8n. n8n tries these sources in order and uses the first one that returns credentials:

1. Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and optionally `AWS_SESSION_TOKEN`)
2. EKS IAM Roles for Service Accounts (IRSA)
3. EKS Pod Identity
4. ECS or Fargate task role
5. EC2 instance profile

This option requires your n8n administrator to enable system credentials access by setting the environment variable `N8N_AWS_SYSTEM_CREDENTIALS_ACCESS_ENABLED` to `true`. Refer to [Using AWS system credentials](#using-aws-system-credentials-federated-authentication) for setup details and security considerations.

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
* On shared instances, keep system credentials access disabled. Refer to [Using AWS system credentials](#using-aws-system-credentials-federated-authentication).

## Using AWS system credentials (federated authentication)

This section is for administrators of self-hosted n8n instances.

{% hint style="info" %}
System credentials access is for self-hosted n8n only. It's not available on n8n Cloud.
{% endhint %}

When n8n runs on AWS infrastructure, the infrastructure itself can provide an AWS identity. There are no access keys to create, store, or rotate. This is the standard way to authenticate workloads on EKS, ECS, and EC2, and security teams often require it ("zero static keys").

n8n reads these **system credentials** with the official AWS SDK credential providers, and uses them as the starting credentials for the **AWS (Assume Role)** credential when **Use System Credentials** is turned on. This works for all nodes that accept the AWS (Assume Role) credential, including the AWS Bedrock AI nodes.

### Enabling access

Access to system credentials is **disabled by default**. To enable it, set this environment variable on every n8n instance (main and workers):

```bash
N8N_AWS_SYSTEM_CREDENTIALS_ACCESS_ENABLED=true
```

{% hint style="warning" %}
When enabled, any n8n user who can create an AWS (Assume Role) credential can use the server's own AWS identity as the starting point for role assumption. Only enable this on single-tenant, self-hosted instances where you trust everyone who can create credentials.

To limit what workflows can do with the server's identity, keep the server's own IAM permissions minimal. Ideally, grant just `sts:AssumeRole` on the specific roles workflows should use, each protected by an External ID.
{% endhint %}

### Supported credential sources

n8n tries these sources in order and uses the first one that returns credentials:

| Order | Source | How n8n detects it | Typical platform |
|---|---|---|---|
| 1 | Environment variables | `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` (optionally `AWS_SESSION_TOKEN`) | Any |
| 2 | IAM Roles for Service Accounts (IRSA) | `AWS_ROLE_ARN` and `AWS_WEB_IDENTITY_TOKEN_FILE` | Amazon EKS |
| 3 | EKS Pod Identity | `AWS_CONTAINER_CREDENTIALS_FULL_URI` | Amazon EKS |
| 4 | Container task role | `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` | Amazon ECS / Fargate |
| 5 | Instance profile | EC2 instance metadata service (IMDSv2) | Amazon EC2 |

Things to keep in mind:

* AWS injects the detection variables for sources 2 to 4 automatically when you configure the platform feature. You don't set them yourself.
* If you set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` on the container, they take precedence over IRSA, Pod Identity, and instance roles. Remove them if you want the federated source to be used.
* n8n resolves system credentials when it needs them, so rotated or short-lived source credentials (for example, the IRSA token that Kubernetes rotates) are picked up automatically.
* Reading AWS CLI profiles from `~/.aws` (`AWS_PROFILE`) is intentionally not supported.

#### Amazon EKS with IRSA

[IAM Roles for Service Accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) associates an IAM role with the Kubernetes service account that runs n8n. Annotate the service account with the role ARN (`eks.amazonaws.com/role-arn`). EKS then injects `AWS_ROLE_ARN` and `AWS_WEB_IDENTITY_TOKEN_FILE` into the pod, and n8n exchanges the token with the regional STS endpoint.

#### Amazon EKS with Pod Identity

[EKS Pod Identity](https://docs.aws.amazon.com/eks/latest/userguide/pod-identities.html) is the newer alternative to IRSA. Install the Pod Identity Agent add-on and create a pod identity association between the n8n service account and an IAM role. No OIDC provider setup needed.

#### Amazon ECS and Fargate

Assign a [task role](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html) to the n8n task definition.

#### Amazon EC2

Attach an [instance profile](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html) to the instance running n8n. n8n uses IMDSv2, so instances with IMDSv1 disabled work.

### AWS China and GovCloud

{% hint style="info" %}
**Available from n8n 2.29.0**. On earlier versions, IRSA fails in the AWS China and GovCloud partitions because n8n called the global STS endpoint.
{% endhint %}

System credentials and role assumption work in all AWS partitions. n8n calls the regional STS endpoint for the credential's region: `sts.{region}.amazonaws.com.cn` in AWS China (`cn-*`) and `sts.us-gov-{east,west}-1.amazonaws.com` in AWS GovCloud (`us-gov-*`).

### Proxy behavior

If your instance uses an HTTP(S) proxy (`HTTPS_PROXY`, `HTTP_PROXY`, `NO_PROXY`), n8n routes STS calls (the web identity exchange and `AssumeRole`) through it. Requests to link-local metadata services (EC2 IMDS, ECS and Pod Identity endpoints) always go directly, never through the proxy. These addresses are only reachable from the host itself.

### Related environment variables

| Variable | Default | Purpose |
|---|---|---|
| `N8N_AWS_SYSTEM_CREDENTIALS_ACCESS_ENABLED` | `false` | Allow the **Use System Credentials** option on AWS (Assume Role) credentials to read the server's AWS identity. |
| `N8N_AWS_SYSTEM_CREDENTIALS_SDK_SOURCES` | `all` | Transitional, available from n8n 2.29.0. Controls which system-credential sources resolve through the AWS SDK rather than n8n's legacy resolver. Accepts `all`, `none`, or a comma-separated subset of `environment`, `roleForServiceAccount`, `podIdentity`, `containerMetadata`, `instanceMetadata`. Only change this if AWS authentication broke after an upgrade. n8n removes this flag in a future release. |
| `N8N_AWS_LEGACY_SIGNER` | `false` | Transitional, available from n8n 2.30.0. Set to `true` to sign AWS requests with the legacy `aws4` signer instead of AWS's Signature V4 implementation. Only use as a rollback if AWS requests fail after an upgrade. n8n removes this flag in a future release. |

### Troubleshooting

* **"Access to AWS system credentials disabled, contact your administrator."**: The **Use System Credentials** option is on, but `N8N_AWS_SYSTEM_CREDENTIALS_ACCESS_ENABLED` isn't set to `true` on the server.
* **The wrong identity is used**: Check the source order above. Environment variables beat IRSA, which beats Pod Identity, ECS, and EC2. A stray `AWS_ACCESS_KEY_ID` in the container is the most common cause.
* **Credential test fails on EKS**: Verify the service account annotation (IRSA) or the pod identity association, and confirm the pod received the injected environment variables (`kubectl exec <pod-name> -- env | grep AWS`).
