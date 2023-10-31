---
title: ServiceNow
description: Documentation for the ServiceNow node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# ServiceNow

Use the ServiceNow node to automate work in ServiceNow, and integrate ServiceNow with other applications. n8n has built-in support for a wide range of ServiceNow features, including getting business services, departments, configuration items, and dictionary as well as creating, updating, and deleting incidents, users, and table records. 

On this page, you'll find a list of operations the ServiceNow node supports and links to more resources.

!!! note "Credentials"
    Refer to [ServiceNow credentials](/integrations/builtin/credentials/servicenow/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [ServiceNow integrations](https://n8n.io/integrations/servicenow/){:target="_blank" .external-link} list.


## Basic operations

* Business Service
    * Get All
* Configuration Items
    * Get All
* Department
    * Get All
* Dictionary
    * Get All
* Incident
    * Create
    * Delete
    * Get
    * Get All
    * Update
* Table Record
    * Create
    * Delete
    * Get
    * Get All
    * Update
* User
    * Create
    * Delete
    * Get
    * Get All
    * Update
* User Group
    * Get All
* User Role
    * Get All

## Example usage

This workflow allows you to get the 50 most recent incidents and view only the desired fields. This example usage workflow uses the following nodes:

- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [ServiceNow]()

The final workflow should look like the following image.

![A workflow with the ServiceNow node](/_images/integrations/builtin/app-nodes/servicenow/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. ServiceNow node

1. First enter credentials, you can find out how to do that [here](/integrations/builtin/credentials/servicenow/).
2. Select **Incident** from the ***Resource*** dropdown.
3. Select **Get All** from the ***Operation*** dropdown.
4. Click ***Add Option*** and select **Fields**.
5. Use the dropdown to select the fields you want to view, here we used `Close code`, `Severity`, `Sys ID`, and `Resolve time`.
6. Click on ***Execute Node*** to run the workflow.

![The ServiceNow node](/_images/integrations/builtin/app-nodes/servicenow/servicenow_node.png)

