# AWS SNS Trigger

[AWS SNS](https://aws.amazon.com/sns/) is a notification service provided as part of Amazon Web Services. It provides a low-cost infrastructure for the mass delivery of messages, predominantly to mobile users.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/aws/).



## Example Usage

This workflow allows you to receive updates for events in AWS SNS. You can also find the [workflow](https://n8n.io/workflows/509) on the website. This example usage workflow would use the following node.
- [AWS SNS Trigger]()

The final workflow should look like the following image.

![A workflow with the AWS SNS Trigger node](/_images/integrations/trigger-nodes/awssnstrigger/workflow.png)


### 1. AWS SNS Trigger node

1. First of all, you'll have to enter credentials for the AWS SNS Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/aws/).
2. Select the topic you want to listen for in the *Topic* dropdown list.
3. Click on *Execute Node* to run the workflow.

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the AWS SNS Trigger node.

