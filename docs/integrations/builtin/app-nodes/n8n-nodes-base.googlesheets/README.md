---
title: Google Sheets
description: >-
  Documentation for the Google Sheets node in n8n, a workflow automation
  platform. Includes details of operations and configuration, and links to
  examples and credentials information.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: n8n-nodes-base.googlesheets
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/index.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets'
layout:
  description:
    visible: false
---

# Google Sheets <a href="#google-sheets" id="google-sheets"></a>

Use the Google Sheets node to automate work in Google Sheets, and integrate Google Sheets with other applications. n8n has built-in support for a wide range of Google Sheets features, including creating, updating, deleting, appending, removing and getting documents. 

On this page, you'll find a list of operations the Google Sheets node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Google Sheets credentials](../../credentials/google/README.md) for guidance on setting up authentication.
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* **Document**
    * [**Create**](document-operations.md#create-a-spreadsheet) a spreadsheet.
	* [**Delete**](document-operations.md#delete-a-spreadsheet) a spreadsheet.
* **Sheet Within Document**
	* [**Append or Update Row**](sheet-operations.md#append-or-update-row): Append a new row, or update the current one if it already exists.
	* [**Append Row**](sheet-operations.md#append-row): Create a new row.
	* [**Clear**](sheet-operations.md#clear-a-sheet) all data from a sheet.
	* [**Create**](sheet-operations.md#create-a-new-sheet) a new sheet.
	* [**Delete**](sheet-operations.md#delete-a-sheet) a sheet.
	* [**Delete Rows or Columns**](sheet-operations.md#delete-rows-or-columns): Delete columns and rows from a sheet.
	* [**Get Row(s)**](sheet-operations.md#get-rows): Read all rows in a sheet.
	* [**Update Row**](sheet-operations.md#update-row): Update a row in a sheet. 


## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-base.googlesheets integration templates](https://n8n.io/integrations/google-sheets) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Google Sheet's API documentation](https://developers.google.com/sheets/api) for more information about the service.



## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}
