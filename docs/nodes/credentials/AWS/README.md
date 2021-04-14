---
permalink: /credentials/aws
description: Learn to configure credentials for the AWS nodes in n8n
---

# AWS

You can use these credentials to authenticate the following nodes with AWS.

- [AWS Comprehend](../../nodes-library/nodes/AWSComprehend/README.md)
- [AWS Lambda](../../nodes-library/nodes/AWSLambda/README.md)
- [AWS Rekognition](../../nodes-library/nodes/AWSRekognition/README.md)
- [AWS S3](../../nodes-library/nodes/AWSS3/README.md)
- [AWS SES](../../nodes-library/nodes/AWSSES/README.md)
- [AWS SNS](../../nodes-library/nodes/AWSSNS/README.md)
- [AWS SNS Trigger](../../nodes-library/trigger-nodes/AWSSNSTrigger/README.md)
- [AWS SQS](../../nodes-library/nodes/AWSSQS/README.md)

## Prerequisites

Create an [AWS](https://aws.amazon.com/) account.

## Using Access Token

1. Open your [AWS Management Console](https://console.aws.amazon.com).
2. Click on your name on the top right and select 'My Security Credentials' from the dropdown.
3. Click on the ***Create New Access Key*** button, under the ***Access keys (access key ID and secret access key)*** section
4. Click on the ***Show Access Key*** button.
5. Copy the displayed Access Key ID.
6. Enter the name for your credentials in the ***Credentials Name*** field in the 'AWS' credentials in n8n.
7. Paste the Access Key ID in the ***Access Key ID*** field in the 'AWS' credentials in n8n.
8. Copy the secret access key from your AWS console.
9. Paste the secret access key in the ***Secret Access Key*** field in the 'AWS' credentials in n8n.
10. Click the ***Create*** button to save your credentials in n8n.

**Note:** If you're running your AWS instance in a different region, please update the ***Region*** field accordingly.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/zJgHOSSwC4A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>