# GitHub Trigger

[GitHub](https://github.com/) provides hosting for software development and version control using Git. It offers the distributed version control and source code management (SCM) functionality of Git, access control and several collaboration features such as bug tracking, feature requests, task management, and wikis for every project.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/integrations/credentials/github/).



## Example Usage

This workflow allows you to receive updates for GitHub events. You can also find the [workflow](https://n8n.io/workflows/527) on the website. This example usage workflow would use the following node.
- [GitHub Trigger]()

The final workflow should look like the following image.

![A workflow with the GitHub Trigger node](/_images/integrations/trigger-nodes/githubtrigger/workflow.png)


### 1. GitHub Trigger node

1. First of all, you'll have to enter credentials for the GitHub Trigger node. You can find out how to do that [here](/integrations/credentials/github/).
2. Enter the repository owner in the *Repository Owner* field.
3. Enter the repository name in the *Repository Name* field.
4. Select the `*` option in the *Events* field to receive updates when any event is triggered.
5. Click on *Execute Node* to run the workflow.

!!! note " Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the GitHub Trigger node.

