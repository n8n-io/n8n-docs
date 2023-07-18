---
title: Storyblok
description: Documentation for the Storyblok node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Storyblok

The Storyblok node allows you to automate work in Storyblok, and integrate Storyblok with other applications. n8n has built-in support for a wide range of Storyblok features, including getting, deleting, and publishing stories. 

On this page, you'll find a list of operations the Storyblok node supports and links to more resources.

!!! note "Credentials"
    Refer to [Storyblok credentials](/integrations/builtin/credentials/storyblok/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Storyblok integrations](https://n8n.io/integrations/storyblok/){:target="_blank" .external-link} list.


## Basic Operations

### Content API
**Story**
- Get a story
- Get all stories


### Management API
**Story**
- Delete a story
- Get a story
- Get all stories
- Publish a story
- Unpublish a story


## Example Usage

This workflow allows you to get all the stories that have the slug starting with `release` and publish them using the Storyblok node. You can also find the [workflow](https://n8n.io/workflows/768) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Storyblok]()

The final workflow should look like the following image.

![A workflow with the Storyblok node](/_images/integrations/builtin/app-nodes/storyblok/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Storyblok node (getAll: story)

This node will get all the stories that have a slug starting with `release`. 

1. Select 'Management API' from the ***Source*** dropdown list.
2. You'll have to enter credentials for the Storyblok node. You can find out how to do that [here](/integrations/builtin/credentials/storyblok/).
3. Select 'Get All' from the ***Operation*** dropdown list.
4. Select a space from the ***Space ID*** dropdown list.
5. Click on the ***Add Filter*** button.
6. Enter `release` in the ***Starts With*** field.
7. Click on ***Execute Node*** to run the node.

In the screenshot below, you will notice that the node returns all the stories that have a slug starting with `release`.

![Using the Storyblok node to get filtered stories](/_images/integrations/builtin/app-nodes/storyblok/storyblok_node.png)



### 3. Storyblok1 node (publish: story)

This node will publish the stories that were returned by the previous node.

1. Select 'Management API' from the ***Source*** dropdown list.
2. Select the credentials that you entered in the previous node.
3. Select 'Publish' from the ***Operation*** dropdown list.
4. Click on the gears icon next to the ***Space ID*** field and click on ***Add Expression***.
5. Select the following in the ***Variable Selector*** section: Nodes > Storyblok > Parameters > space. You can also add the following expression: `{{$node["Storyblok"].parameter["space"]}}`.
6. Click on the gears icon next to the ***Story ID*** field and click on ***Add Expression***.
7. Select the following in the ***Variable Selector*** section: Nodes > Storyblok > Output Data > JSON > id. You can also add the following expression: `{{$node["Storyblok"].json["id"]}}`.
8. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node publishes the stories that were returned by the previous node.

![Using the Storyblok node to publish stories](/_images/integrations/builtin/app-nodes/storyblok/storyblok1_node.png)

