---
permalink: /credentials/aws
---

# AWS

AWS credentials work with several different nodes. You can find a list of nodes and their supported operations in the integrations page linked below. You can also browse the source code of the node on GitHub.

| Node Name       | Supported Operations                                                      | Source Code                                                                                 |
|-----------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| [AWS Lambda](../../nodes-library/nodes/AWSLambda/README.md)      | [Integrations Page](https://n8n.io/integrations/n8n-nodes-base.awsLambda)     | [GitHub](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Aws/AwsLambda.node.ts)     |
| [AWS SES](../../nodes-library/nodes/AWSSES/README.md)         | [Integrations Page](https://n8n.io/integrations/n8n-nodes-base.awsSes)        | [GitHub](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Aws/AwsSes.node.ts)        |
| [AWS S3](../../nodes-library/nodes/AWSS3/README.md)          | [Integrations Page](https://n8n.io/integrations/n8n-nodes-base.awsS3)         | [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Aws/S3)         |
| [AWS SNS](../../nodes-library/nodes/AWSSNS/README.md)         | [Integrations Page](https://n8n.io/integrations/n8n-nodes-base.awsSns)        | [GitHub](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Aws/AwsSns.node.ts)        |
| [AWS SNS Trigger](../../nodes-library/trigger-nodes/AWSSNSTrigger/README.md) | [Integrations Page](https://n8n.io/integrations/n8n-nodes-base.awsSnsTrigger) | [GitHub](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Aws/AwsSnsTrigger.node.ts) |


## Prerequisites

Create an [AWS](https://aws.amazon.com/) account.

## Using Access Token

1. Open your AWS Management Console.
2. Click on your name on the top right and select 'My Security Credentials' from the dropdown.
3. Under the Access keys dropdown, click on the 'Create New Access Key' button.
4. Click on 'Show Access Key' to retrieve your ID and key for use with your AWS node credentials in n8n.

![Getting AWS credentials](./using-access-token.gif)
