---
title: Bitly node - n8n Documentation
description: Documentation for the Bitly node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Bitly

The Bitly node allows you to automate work in Bitly, and integrate Bitly with other applications. n8n has built-in support for a wide range of Bitly features, including creating, getting, and updating links.

On this page, you'll find a list of operations the Bitly node supports and links to more resources.

!!! note "Credentials"
    Refer to [Bitly credentials](/integrations/builtin/credentials/bitly/) for guidance on setting up authentication. 

!!! note "Examples and Templates"
    For usage examples and templates to help you get started, take a look at n8n's [Bitly integrations](https://n8n.io/integrations/bitly/){:target=_blank .external-link} list.




## Basic Operations

* Link
    * Create a link
    * Get a link
    * Update a link

## Example Usage

This workflow shows you how to create a new link. You can also find the [workflow](https://n8n.io/workflows/442) on the website. This example usage workflow uses the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Bitly]()

The final workflow should look like the following image.

![A workflow with the Bitly node](/_images/integrations/builtin/app-nodes/bitly/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Bitly node

1. First of all, you'll have to enter credentials for the Bitly node. You can find out how to do that [here](/integrations/builtin/credentials/bitly/).
2. Enter the URL in the *Long URL* field.
3. Click on *Execute Node* to run the workflow.

