# Medium

[Medium](https://www.medium.com/) is an online publishing platform and home to a diverse array of stories, ideas, and perspectives. It empowers writers to share their work and ideas with the readers.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/medium/).


## Basic Operations

* Post
    * Create a post
* Publication
    * Get all publications


## Example Usage

This workflow allows you to post an article to a publication on Medium. You can also find the [workflow](https://n8n.io/workflows/594) on the website. This example usage workflow uses the following two nodes.

- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [Medium]()

The final workflow should look like the following image.

![A workflow with the Medium node](/_images/integrations/nodes/medium/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Medium node

1. First of all, you'll have to enter credentials for the Medium node. You can find out how to do that [here](/workflow/integrations/credentials/medium/).
2. Toggle ***Publication*** to true.
3. Select the publication from the ***Publication ID*** dropdown list.
4. Enter the title in the ***Title*** field.
5. Select the format from the ***Content Format*** dropdown list.
6. Enter conent of the post in the ***Content*** field.
7. Click on ***Execute Node*** to run the workflow.




