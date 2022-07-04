# Google Perspective

[Google Perspective](https://www.perspectiveapi.com/) is a free API that uses machine learning to identify "toxic" comments, making it easier to host better conversations online.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/google/).


## Basic operations

* Analyze Comment

## Example usage

This workflow allows you to analyze a comment for profanity. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/workflow-nodes-base.start/)
- [Google Perspective]()

The final workflow should look like the following image.

![A workflow with the Google Perspective node](/_images/integrations/nodes/googleperspective/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Google Perspective node

1. First enter credentials for the Google Perspective node. You can find out how to enter credentials for this node [here](/workflow/integrations/credentials/google/).
2. The **Analyze Comment** ***Operation*** is selected by default.
3. In the ***Text*** field enter the comment to be analyzed.
4. From the ***Properties*** section click **Add Attribute**.
    * For ***Attribute Name*** select **Profanity**.
    * For ***Score Threshold*** leave the **0.00** default setting to return all scores.
5. Click on **Execute Node** to run the workflow.

![The Google Perspective node](/_images/integrations/nodes/googleperspective/googleperspective_node.png)
