---
permalink: /nodes/n8n-nodes-base.gitlabTrigger
---

# GitLab Trigger

[GitLab](https://gitlab.com/) is a web-based DevOps lifecycle tool that provides a Git-repository manager providing wiki, issue-tracking, and continuous integration/continuous deployment pipeline features.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Gitlab/README.md).
:::


## Example Usage

This workflow allows you to receive updates for GitLab events. You can also find the [workflow](https://n8n.io/workflows/528) on the website. This example usage workflow would use the following node.
- [GitLab Trigger]()

The final workflow should look like the following image.

![A workflow with the GitLab Trigger node](./workflow.png)


### 1. GitLab Trigger node

1. First of all, you'll have to enter credentials for the GitLab Trigger node. You can find out how to do that [here](../../../credentials/Gitlab/README.md).
2. Enter the repository owner in the *Repository Owner* field.
3. Enter the repository name in the *Repository Name* field.
4. Select the `*` option in the *Events* field to receive updates when any event is triggered.
5. Click on *Execute Node* to run the workflow.
