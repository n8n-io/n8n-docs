# AWS

AWS credentials work with several different nodes. You can find a list of nodes and their supported operations in the integrations page linked below. You can also browse the source code of the node on GitHub.

| Node Name       | Supported Operations                                                      | Source Code                                                                                 |
|-----------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| AWS Lambda      | [Documentation](https://n8n.io/integrations/n8n-nodes-base.awsLambda)     | [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/awsLambda)     |
| AWS S3          | [Documentation](https://n8n.io/integrations/n8n-nodes-base.awsS3)         | [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/awsS3)         |
| AWS SES         | [Documentation](https://n8n.io/integrations/n8n-nodes-base.awsSes)        | [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/awsSes)        |
| AWS SNS         | [Documentation](https://n8n.io/integrations/n8n-nodes-base.awsSns)        | [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/awsSns)        |
| AWS SNS Trigger | [Documentation](https://n8n.io/integrations/n8n-nodes-base.awsSnsTrigger) | [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/awsSnsTrigger) |

You can find information about the operations supported by the BannerBear node on the [integrations](https://n8n.io/integrations/n8n-nodes-base.bannerbear) page. You can also browse the source code of the node on [GitHub](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/BannerBear).

## Prerequisites

Create an [AWS](https://aws.amazon.com/) account.

## Using Access Token

1. Open your AWS Management Console.
2. Click on your name and select 'My Security Credentials' from the dropdown.
3. Under the Access keys dropdown, click on the 'Create New Access Key' button.
4. Click on 'Show Access Key' to retrieve your ID and key for use with your AWS node credentials in n8n.

![Getting AWS credentials](./using-access-token.gif)
