---
title: MongoDB node - n8n Documentation
description: Documentation for the MongoDB node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# MongoDB

The MongoDB node allows you to automate work in MongoDB, and integrate MongoDB with other applications. n8n has built-in support for a wide range of MongoDB features, including aggregating, updating, finding, deleting, and getting documents. 

On this page, you'll find a list of operations the MongoDB node supports and links to more resources.

!!! note "Credentials"
    Refer to [MongoDB credentials](/integrations/builtin/credentials/mongodb/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [MongoDB integrations](https://n8n.io/integrations/mongodb/){:target="_blank" .external-link} list.



## Operations

* Aggregate documents
* Delete documents
* Find documents
* Find and replace documents
* Find and update documents
* Insert documents
* Update documents


## Example Usage

This workflow allows you to insert a document into a MongoDB collection. You can also find the [workflow](https://n8n.io/workflows/503) on the website. This example usage workflow would use the following three nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Set](/integrations/builtin/core-nodes/n8n-nodes-base.set/)
- [MongoDB]()

The final workflow should look like the following image.

![A workflow with the MongoDB node](/_images/integrations/builtin/app-nodes/mongodb/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Set node

1. Click on the *Add Value* button and select 'String' from the dropdown list.
2. Enter `my_key`in the *Name* field.
3. Enter `my_value` in the *Value* field.

### 3. MongoDB node

1. First of all, you'll have to enter credentials for the MongoDB node. You can find out how to do that [here](/integrations/builtin/credentials/mongodb/).
2. Select 'Insert' from the *Operation* dropdown list.
3. Enter the name of your MongoDB collection in the *Collection* field.
4. Enter `my_key` in the *Fields* field.
5. Click on *Execute Node* to run the workflow.





