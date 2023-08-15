---
title: Microsoft Excel
description: Documentation for the Microsoft Excel node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Microsoft Excel

The Microsoft Excel node allows you to automate work in Microsoft Excel, and integrate Microsoft Excel with other applications. n8n has built-in support for a wide range of Microsoft Excel features, including adding and retrieving lists of table data, and workbooks, as well as getting worksheets. 

On this page, you'll find a list of operations the Microsoft Excel node supports and links to more resources.

!!! note "Credentials"
    Refer to [Microsoft Excel credentials](/integrations/builtin/credentials/microsoft/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Microsoft Excel integrations](https://n8n.io/integrations/microsoft-excel/){:target="_blank" .external-link} list.



## Basic Operations

* Table
    * Adds rows to the end of the table
    * Retrieve a list of tablecolumns
    * Retrieve a list of tablerows
    * Looks for a specific column value and then returns the matching row
* Workbook
    * Adds a new worksheet to the workbook.
    * Get data of all workbooks
* Worksheet
    * Get all worksheets
    * Get worksheet content

## Example Usage

This workflow allows you to get information about all workbooks from Microsoft Excel. You can also find the [workflow](https://n8n.io/workflows/566) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Microsoft Excel]()

The final workflow should look like the following image.

![A workflow with the Microsoft Excel node](/_images/integrations/builtin/app-nodes/microsoftexcel/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Microsoft Excel node

1. First of all, you'll have to enter credentials for the Microsoft Excel node. You can find out how to do that [here](/integrations/builtin/credentials/microsoft/).
2. Select the 'Get All' option from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.

