---
permalink: /nodes/n8n-nodes-base.microsoftExcel
description: Learn how to use the Microsoft Excel node in n8n
---

# Microsoft Excel

[Microsoft Excel](https://office.live.com/start/excel.aspx) is a spreadsheet developed by Microsoft. It features calculation, graphing tools, pivot tables, and a macro programming language called Visual Basic for Applications.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Microsoft/README.md).
:::

## Basic Operations

<Resource node="n8n-nodes-base.microsoftExcel" />

## Example Usage

This workflow allows you to get information about all workbooks from Microsoft Excel. You can also find the [workflow](https://n8n.io/workflows/566) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Microsoft Excel]()

The final workflow should look like the following image.

![A workflow with the Microsoft Excel node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Microsoft Excel node

1. First of all, you'll have to enter credentials for the Microsoft Excel node. You can find out how to do that [here](../../../credentials/Microsoft/README.md).
2. Select the 'Get All' option from the *Operation* dropdown list.
3. Click on *Execute Node* to run the workflow.
