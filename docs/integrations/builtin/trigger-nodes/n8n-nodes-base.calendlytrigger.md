# Calendly Trigger

[Calendly](https://calendly.com/) is an automated scheduling software that is designed to make the process of finding meeting times easy.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/calendly/).



## Example Usage

This workflow allows you to receive updates for events in Calendly. You can also find the [workflow](https://n8n.io/workflows/540) on the website. This example usage workflow would use the following node.

- [Calendly Trigger]()

The final workflow should look like the following image.

![A workflow with the Calendly Trigger node](/_images/integrations/builtin/trigger-nodes/calendlytrigger/workflow.png)


### 1. Calendly Trigger node

1. First of all, you'll have to enter credentials for the Calendly Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/calendly/).
2. Select the events you want to receive updates for from the *Events* dropdown list.
3. Click on *Execute Node* to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Calendly Trigger node.

