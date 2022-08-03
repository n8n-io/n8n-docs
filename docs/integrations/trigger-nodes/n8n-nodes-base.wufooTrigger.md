# Wufoo Trigger

[Wufoo](https://wufoo.com) is an online form builder that helps you create custom HTML forms without writing code.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/wufoo/).


## Example Usage

This workflow allows you to receive updates when a form is submitted in Wufoo. You can also find the [workflow](https://n8n.io/workflows/703) on n8n.io. This example usage workflow would use the following node.

- [Wufoo Trigger]()

The final workflow should look like the following image.

![A workflow with the Wufoo Trigger node](/_images/integrations/trigger-nodes/wufootrigger/workflow.png)

### 1. Wufoo Trigger node

1. First of all, you'll have to enter credentials for the Wufoo Trigger node. You can find out how to do that [here](/integrations/credentials/wufoo/).
2. Select a form from the ***Forms*** dropdown list.
3. Click on ***Execute Node*** to run the node.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Wufoo Trigger node.

