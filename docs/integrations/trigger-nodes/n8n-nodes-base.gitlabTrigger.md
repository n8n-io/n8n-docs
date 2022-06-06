# GitLab Trigger

[GitLab](https://gitlab.com/) is a web-based DevOps lifecycle tool that provides a Git-repository manager providing wiki, issue-tracking, and continuous integration/continuous installation pipeline features.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/credentials/gitlab/).



## Example Usage

This workflow allows you to receive updates for GitLab events. You can also find the [workflow](https://n8n.io/workflows/528) on the website. This example usage workflow would use the following node.

- [GitLab Trigger]()

The final workflow should look like the following image.

![A workflow with the GitLab Trigger node](/_images/integrations/trigger-nodes/gitlabtrigger/workflow.png)


### 1. GitLab Trigger node

1. First of all, you'll have to enter credentials for the GitLab Trigger node. You can find out how to do that [here](/integrations/credentials/gitlab/).
2. Enter the repository owner in the *Repository Owner* field.
3. Enter the repository name in the *Repository Name* field.
4. Select the `*` option in the *Events* field to receive updates when any event is triggered.
5. Click on *Execute Node* to run the workflow.

!!! note "Activate workflow for production"
    You'll need to save the workflow and then click on the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered as specified by the settings in the GitLab Trigger node.

