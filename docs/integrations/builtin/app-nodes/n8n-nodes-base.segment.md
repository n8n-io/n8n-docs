---
title: Segment node - n8n Documentation
description: Documentation for the Segment node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Segment

The Segment node allows you to automate work in Segment, and integrate Segment with other applications. n8n has built-in support for a wide range of Segment features, including adding users to groups, creating identities, and tracking activities. 

On this page, you'll find a list of operations the Segment node supports and links to more resources.

!!! note "Credentials"
    Refer to [Segment credentials](/integrations/builtin/credentials/segment/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Segment integrations](https://n8n.io/integrations/segment/){:target="_blank" .external-link} list.


## Basic Operations

* Group
    * Add a user to a group
* Identify
    * Create an identity
* Track
    * Record the actions your users perform. Every action triggers an event, which can also have associated properties.
    * Record page views on your website, along with optional extra information about the page being viewed.

## Example Usage

This workflow allows you to track an event in Segment. You can also find the [workflow](https://n8n.io/workflows/495) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Segment]()

The final workflow should look like the following image.

![A workflow with the Segment node](/_images/integrations/builtin/app-nodes/segment/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Segment node

1. First of all, you'll have to enter credentials for the Segment node. You can find out how to do that [here](/integrations/builtin/credentials/segment/).
2. Select the 'Track' option from the *Resource* dropdown list.
3. Enter the ID of the user in the *User ID* field.
4. Enter the name of event in the *Event* field.
5. Click on *Execute Node* to run the workflow.

