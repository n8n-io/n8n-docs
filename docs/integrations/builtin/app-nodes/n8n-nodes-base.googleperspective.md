---
title: Google Perspective
description: Documentation for the Google Perspective node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Google Perspective

Use the Google Perspective node to automate work in Google Perspective, and integrate Google Perspective with other applications. n8n has built-in support for a wide range of Google Perspective features, including analyzing comments.

On this page, you'll find a list of operations the Google Perspective node supports and links to more resources.

/// note | Credentials
Refer to [Google Perspective credentials](/integrations/builtin/credentials/google/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Google Perspective integrations](https://n8n.io/integrations/google-perspective/){:target="_blank" .external-link} list.
///
## Basic operations

* Analyze Comment

## Example usage

This workflow allows you to analyze a comment for profanity. This example usage workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Google Perspective]()

The final workflow should look like the following image.

![A workflow with the Google Perspective node](/_images/integrations/builtin/app-nodes/googleperspective/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Google Perspective node

1. First enter credentials for the Google Perspective node. You can find out how to enter credentials for this node [here](/integrations/builtin/credentials/google/).
2. The **Analyze Comment** ***Operation*** is selected by default.
3. In the ***Text*** field enter the comment to be analyzed.
4. From the ***Properties*** section click **Add Attribute**.
    * For ***Attribute Name*** select **Profanity**.
    * For ***Score Threshold*** leave the **0.00** default setting to return all scores.
5. Click on **Execute Node** to run the workflow.

![The Google Perspective node](/_images/integrations/builtin/app-nodes/googleperspective/googleperspective_node.png)

