# Asana Trigger

[Asana](https://asana.com/) is a web and mobile application designed to help teams organize, track, and manage their work.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/asana/).


## Example Usage

This workflow allows you to receive updates when an event occurs in Asana. You can also find the [workflow](https://n8n.io/workflows/654) on Workflow².io. This example usage workflow would use the following node.
- [Asana Trigger]()

The final workflow should look like the following image.

![A workflow with the Asana Trigger node](/_images/integrations/trigger-nodes/asanatrigger/workflow.png)

### 1. Asana Trigger node

1. First of all, you'll have to enter credentials for the Asana Trigger node. You can find out how to do that [here](/workflow/integrations/credentials/asana/).
2. Enter the name of the resource in the ***Resource*** field.
3. Enter the name of the workspace in the ***Workspace*** field.
4. Click on ***Execute Node*** to run the node.

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Asana Trigger node.

