# SeaTable Trigger

[SeaTable](https://seatable.co) is a collaborative database application with a spreadsheet interface.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/seaTable/).



## Example usage

This workflow allows you to receive updates when new rows are created in a Table. This example usage workflow would use the following node.

- [SeaTable Trigger]()

The final workflow should look like the following image.

![A workflow with the SeaTable Trigger node](/_images/integrations/builtin/trigger-nodes/seatabletrigger/workflow.png)


### 1. SeaTable Trigger node

1. First enter your credentials for the SeaTable Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/seaTable/).
2. Select the **Table** you want to receive updates for.
3. From the ***Events*** dropdown select **Row Created**.
3. Click on **Execute Node** to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the node.





