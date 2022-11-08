# Formstack Trigger

[Formstack](https://www.formstack.com/) is a workplace productivity platform that helps organizations streamline digital work through no-code online forms, documents, and signatures.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/formstackTrigger/).


## Example Usage

This workflow allows you to receive updates for newly created submissions in Formstack forms. This example workflow uses the following node:

- [Formstack Trigger]()

The final workflow should look like the following image.

![A workflow with the Formstack Trigger node](/_images/integrations/builtin/trigger-nodes/formstacktrigger/workflow.png)


### 1. Formstack Trigger node

1. First enter credentials for the Formstack Trigger node. You can find out how to do that [here](/integrations/builtin/credentials/formstackTrigger/).
2. Enter the form you want to receive updates for using the *Form Name/ID* field.
3. Click on **Execute Node** to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the Form.io Trigger node.
