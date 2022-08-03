# Clockify Trigger

[Clockify](https://clockify.me/) is a free time tracker and timesheet app for tracking work hours across projects.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/clockify/).


**Note:** This node uses the workflow timezone setting to specify the range of time entries starting time. You have to configure the workflow timezone setting if you want this Trigger node to retrieve the right time entries.

## Example Usage

This workflow allows you to get new time entries from Clockify. You can also find the [workflow](https://n8n.io/workflows/536) on the website. This example usage workflow would use the following node.

- [Clockify Trigger]()

The final workflow should look like the following image.

![A workflow with the Clockify Trigger node](/_images/integrations/trigger-nodes/clockifytrigger/workflow.png)


### 1. Clockify Trigger node

1. First enter your credentials for the Clockify Trigger node. You can find out how to do that [here](/integrations/credentials/clockify/).
2. Select the *Workspace* you want to receive updates for using the dropdown list.
3. Click on *Execute Node* to run the workflow.

**Note:** This node uses polling to get new time entries. You have to use the *Add Poll Time* button if you want this Trigger node to run and retrieve new time entries regularly.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Clockify Trigger node.

