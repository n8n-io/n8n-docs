
---
title: Rename Keys
description: The Rename Keys node is used to rename the keys of a key-value pair in Workflow².
tags:
  - Workflow²
  - Rename Keys
---

# Rename Keys
The Rename Keys node is used to rename the keys of a key-value pair in Workflow².


## Node Reference

You can rename one or multiple keys using the Rename Keys node. Click on the *Add new key* button to rename a key.

There are two properties in the Rename Keys node.

- ***Current Key Name*** field: The current name of the key that you would like to rename.
- ***New Key Name*** field: The new name that you would like to assign to the key.


## Example Usage

This workflow allows you to rename a key using the Rename Keys node. You can also find the [workflow](https://n8n.io/workflows/582) on the website. This example usage workflow would use the following three nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [Set](/integrations/core-nodes/n8n-nodes-base.set/)
- [Rename Keys]()


The final workflow should look like the following image.

![A workflow with the Rename Keys node](/_images/integrations/core-nodes/renamekeys/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Set node

1. Click on the ***Add Value*** button and select the 'String' option from the dropdown list.
2. Enter a name for the key in the ***Name*** field and enter a value in the ***Value*** field.

### 3. Rename Keys node

1. Click on the ***Add new key*** button.
2. Enter the name of the key you created in the previous step in the ***Current Key Name*** field.
3. Enter the new name that you would like to give the key in the ***New Key Name*** field.
4. Click on ***Execute Node*** to run the workflow.
