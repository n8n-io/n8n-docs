---
title: Vero
description: Documentation for the Vero node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Vero

Use the Vero node to automate work in Vero, and integrate Vero with other applications. n8n has built-in support for a wide range of Vero features, including creating and deleting users. 

On this page, you'll find a list of operations the Vero node supports and links to more resources.

/// note | Credentials
Refer to [Vero credentials](/integrations/builtin/credentials/vero/) for guidance on setting up authentication. 
///
/// note | Examples and templates
For usage examples and templates to help you get started, take a look at n8n's [Vero integrations](https://n8n.io/integrations/vero/){:target="_blank" .external-link} list.
///

## Basic Operations

* User
    * Create or update a user profile
    * Change a users identifier
    * Unsubscribe a user.
    * Resubscribe a user.
    * Delete a user.
    * Adds a tag to a users profile.
    * Removes a tag from a users profile.
* Event
    * Track an event for a specific customer


## Example Usage

This workflow allows you to create a user profile in Vero. You can also find the [workflow](https://n8n.io/workflows/499) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Vero]()

The final workflow should look like the following image.

![A workflow with the Vero node](/_images/integrations/builtin/app-nodes/vero/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Vero node

1. First of all, you'll have to enter credentials for the Vero node. You can find out how to do that [here](/integrations/builtin/credentials/vero/).
2. Enter the unique identifier of the user in the *ID* field.
3. Click on *Execute Node* to run the workflow.

