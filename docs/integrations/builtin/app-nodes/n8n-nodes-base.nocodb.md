---
title: NocoDB node - n8n Documentation
description: Documentation for the NocoDB node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# NocoDB

The NocoDB node allows you to automate work in NocoDB, and integrate NocoDB with other applications. n8n has built-in support for a wide range of NocoDB features, including creating, updating, deleting, and retrieving rows. 

On this page, you'll find a list of operations the NocoDB node supports and links to more resources.

!!! note "Credentials"
    Refer to [NocoDB credentials](/integrations/builtin/credentials/nocodb/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [NocoDB integrations](https://n8n.io/integrations/nocodb/){:target="_blank" .external-link} list.


## Basic operations

* Row
    * Create a row
    * Delete a row
    * Retrieve all rows
    * Retrieve a row
    * Update a row

## Example usage

This workflow allows you to get all rows in your table.
This example workflow use the following two nodes.

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [NocoDB]()

The final workflow should look like the following image.

![A workflow with the NocoDB node](/_images/integrations/builtin/app-nodes/nocodb/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. NocoDB node

1. First enter your credentials for the NocoDB node. You can find out how to do that [here](/integrations/builtin/credentials/nocodb/).
2. Select NocoDB version your project using.
3. The **Row Resource** is selected by default.
4. Select **Get All** from the **Operation** dropdown.
5. Enter the NocoDB **Project Name**. (Project ID for older versions)
6. Enter the name of the targeted **Table**.
7. Click on **Execute Node** to run the workflow.

![The NocoDB node](/_images/integrations/builtin/app-nodes/nocodb/nocodb_node.png)

