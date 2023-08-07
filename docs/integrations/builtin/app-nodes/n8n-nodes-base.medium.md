---
title: Medium
description: Documentation for the Medium node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Medium

The Medium node allows you to automate work in Medium, and integrate Medium with other applications. n8n has built-in support for a wide range of Medium features, including creating posts, and getting publications. 

On this page, you'll find a list of operations the Medium node supports and links to more resources.

!!! note "Credentials"
    Refer to [Medium credentials](/integrations/builtin/credentials/medium/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Medium integrations](https://n8n.io/integrations/medium/){:target="_blank" .external-link} list.


## Basic Operations

* Post
    * Create a post
* Publication
    * Get all publications


## Example Usage

This workflow allows you to post an article to a publication on Medium. You can also find the [workflow](https://n8n.io/workflows/594) on the website. This example usage workflow uses the following two nodes.

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Medium]()

The final workflow should look like the following image.

![A workflow with the Medium node](/_images/integrations/builtin/app-nodes/medium/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Medium node

1. First of all, you'll have to enter credentials for the Medium node. You can find out how to do that [here](/integrations/builtin/credentials/medium/).
2. Toggle ***Publication*** to true.
3. Select the publication from the ***Publication ID*** dropdown list.
4. Enter the title in the ***Title*** field.
5. Select the format from the ***Content Format*** dropdown list.
6. Enter conent of the post in the ***Content*** field.
7. Click on ***Execute Node*** to run the workflow.





