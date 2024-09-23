---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Sheets
description: Documentation for the Google Sheets node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: critical
---

# Google Sheets

Use the Google Sheets node to automate work in Google Sheets, and integrate Google Sheets with other applications. n8n has built-in support for a wide range of Google Sheets features, including creating, updating, deleting, appending, removing and getting documents. 

On this page, you'll find a list of operations the Google Sheets node supports and links to more resources.

/// note | Credentials
Refer to [Google Sheets credentials](/integrations/builtin/credentials/google/) for guidance on setting up authentication. 
///

## Operations

* **Document**
    * [**Create**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/document-operations/#create-a-spreadsheet) a spreadsheet.
	* [**Delete**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/document-operations/#delete-a-spreadsheet) a spreadsheet.
* **Sheet Within Document**
	* [**Append or Update Row**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations/#append-or-update-row): Append a new row, or update the current one if it already exists.
	* [**Append Row**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations/#append-row): Create a new row.
	* [**Clear**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations/#clear-a-sheet) all data from a sheet.
	* [**Create**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations/#create-a-new-sheet) a new sheet.
	* [**Delete**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations/#delete-a-sheet) a sheet.
	* [**Delete Rows or Columns**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations/#delete-rows-or-columns): Delete columns and rows from a sheet.
	* [**Get Row(s)**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations/#get-rows): Read all rows in a sheet.
	* [**Update Row**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/sheet-operations/#update-row): Update a row in a sheet. 


## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'google-sheets') ]]

## Related resources

Refer to [Google Sheet's API documentation](https://developers.google.com/sheets/api){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

<!-- ## Examples
This example uses the Customer Datastore node to provide sample data to load into Google Sheets. It assumes you've already set up your [credentials](/integrations/builtin/credentials/google/).	
	1. Set up a Google Sheet with two columns, `test1` and `test`. In `test1`, enter the names from the Customer Datastore node:  
	![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/test-sheet-before.png)  
	2. Create the workflow: use the manual trigger, Customer Datastore, and Google Sheets nodes.  
	![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/workflow.png)  
	3. Open the Customer Datastore node, enable **Return All**, then select **Test step**.
	4. In the Google Sheets node, go through the steps above, using these settings:
		* Select **Update Row** as the **Operation**.
		* In **Column to Match On**, select `test1`.
		* For the first field of **Values to Update**, drag in the **name** from the input view.
		* For the second field of **Values to Update**, drag in the **email** from the input view.
	5. Select **Test step**.
	6. View your spreadsheet. **test2** should now contain the email addresses that match to the names in the input data.  
	![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/test-sheet-after.png)   -->

## Append an array

To insert an array of data into Google Sheets, you must convert the array into a valid JSON (key, value) format.

To do so, consider using:

1. The [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout/) node.
1. The [AI Transform](/integrations/builtin/core-nodes/n8n-nodes-base.aitransform/) node. For example, try entering something like:
    ```
    Convert 'languages' array to JSON (key, value) pairs.
    ```
1. The [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/).

## Column names were updated after the node's setup

You'll receive this error if the Google Sheet's column names have changed since you set up the node.

To refresh the column names, re-select **Mapping Column Mode**. This should prompt the node to fetch the column names again.

Once the column names refresh, update the node parameters.
