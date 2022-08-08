# Cal Trigger

[Cal](https://cal.com/) is the event-juggling scheduler for everyone. Focus on meeting, not making meetings.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/cal/).



## Example Usage

This workflow allows you to receive updates for events in Cal.

- [Cal Trigger]()

The final workflow should look like the following image.

![A workflow with the Cal Trigger node](/_images/integrations/builtin/trigger-nodes/caltrigger/workflow.png)


### 1. Cal Trigger node

1. First of all, you'll have to enter credentials for the Cal Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/cal/).
2. Select the events you want to receive updates for from the **Events** dropdown list.
3. Click on **Execute Node** to run the node.

(Optional Advanced Settings)

Click on **Add Field** under advanced fields and select the option(s) you wish to add. You can enter an EventType ID, an App ID and a payload template. Note that the eventType ID must be of a team EventType.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Cal Trigger node.

