---
title: Microsoft Excel 365 node documentation
description: >-
  Learn how to use the Microsoft Excel node in n8n. Follow technical
  documentation to integrate Microsoft Excel node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Microsoft Excel 365 node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.microsoftexcel.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftexcel
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftexcel
layout:
  description:
    visible: false
---

# Microsoft Excel 365 node <a href="#microsoft-excel-365-node" id="microsoft-excel-365-node"></a>

Use the Microsoft Excel node to automate work in Microsoft Excel, and integrate Microsoft Excel with other applications. n8n has built-in support for a wide range of Microsoft Excel features, including adding and retrieving lists of table data, and workbooks, as well as getting worksheets. 

On this page, you'll find a list of operations the Microsoft Excel node supports and links to more resources.

{% hint style="info" %}
**Credentials**

This node supports two authentication options:

- **Microsoft Excel OAuth2 API**: the Microsoft Excel-specific OAuth2 credential (default).
- **Microsoft OAuth2 API**: a generic Microsoft Graph credential that you can reuse across other Microsoft nodes. When you select this option, make sure the credential is granted the scopes this node needs (for example, `Files.ReadWrite`, or `Files.ReadWrite.All` if that's the permission your administrator has consented).

Refer to [Microsoft credentials](../credentials/microsoft.md) for guidance on setting up authentication.
{% endhint %}

{% hint style="info" %}
**Government Cloud Support**

If you're using a government cloud tenant (US Government, US Government DOD, or China), make sure to select the appropriate **Microsoft Graph API Base URL** in your Microsoft credentials configuration.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Operations <a href="#operations" id="operations"></a>

* Table
    * Adds rows to the end of the table
    * Retrieve a list of table columns
    * Retrieve a list of table rows
    * Looks for a specific column value and then returns the matching row
* Workbook
    * Adds a new worksheet to the workbook.
    * Get data of all workbooks
* Worksheet
    * Get all worksheets
    * Get worksheet content

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Microsoft Excel 365 node documentation integration templates](https://n8n.io/integrations/microsoft-excel) or [search all templates](https://n8n.io/workflows/)

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}
