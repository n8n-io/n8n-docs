---
title: Google Sheets
description: Documentation for the Google Sheets node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
---

# Google Sheets

Use the Google Sheets node to automate work in Google Sheets, and integrate Google Sheets with other applications. n8n has built-in support for a wide range of Google Sheets features, including creating, updating, deleting, appending, removing and getting documents. 

On this page, you'll find a list of operations the Google Sheets node supports and links to more resources.

!!! note "Credentials"
    Refer to [Google Sheets credentials](/integrations/builtin/credentials/google/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [Google Sheets integrations](https://n8n.io/integrations/google-sheets/){:target="_blank" .external-link} list.


## Operations

* Document
    * Create
	* Delete
* Sheet within document
	* Append or Update Row: append a new row, or update the current one if it already exists.
	* Append Row: create a new row.
	* Clear: clear all data from a sheet
	* Create: create a new sheet
	* Delete: delete a sheet
	* Delete Rows or Columns: delete columns and rows from a sheet
	* Get Many Rows: read all rows in a sheet.
	* Update Row: update rows in a sheet

## Related resources

Refer to [Google Sheet's API documentation](https://developers.google.com/sheets/api){:target=_blank .external-link} for more information about the service.

View [example workflows and related content](https://n8n.io/integrations/google-sheets/){:target=_blank .external-link} on n8n's website.

## Update operations

To update data in a sheet:

1. Select your **Authentication** method and credential. Refer to [Google credentials](/integrations/builtin/credentials/google/) for more information.
2. In **Resource**, select **Sheet Within Document**.
3. In **Operation**, select one of the append operations.
4. Choose the **Document** and **Sheet** you want to edit.
5. Choose your **Data Mode**:
	* **Map Automatically**: use this when the table column names (or JSON parameter names) in the node input view match the column names in your spreadsheet. In **Column to Match On**, select the column name in Google Sheets that you want to map to.
	* **Map Each Column Manually**: use this when the column names and data structure in your node input data doesn't match the names and structure in Google Sheets. 
		1. In **Column to Match On**, select or enter the column name in Google Sheets. 
		2. In the first field in **Value to Update**, drag in the table column (or JSON parameter) whose value you want to search for.
		3. In the second field of **Values to Update**, drag in the value you want to add. 

			??? Details "View example and screenshots"
				This example uses the Customer Datastore node to provide sample data to load into Google Sheets. It assumes you've already set up your [credentials](/integrations/builtin/credentials/google/).

				1. Set up a Google Sheet with two columns, `test1` and `test`. In `test1`, enter the names from the Customer Datastore node:  
				![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/test-sheet-before.png)  
				2. Create the workflow: use the manual trigger, Customer Datastore, and Google Sheets nodes.  
				![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/workflow.png)  
				3. Open the Customer Datastore node, enable **Return All**, then select **Execute node**.
				4. In the Google Sheets node, go through the steps above, using these settings:
					* Select **Update Row** as the **Operation**.
					* In **Column to Match On**, select `test1`.
					* For the first field of **Values to Update**, drag in the **name** from the input view.
					* For the second field of **Values to Update**, drag in the **email** from the input view.
				5. Select **Execute node**.
				6. View your spreadsheet. **test2** should now contain the email addresses that match to the names in the input data.  
				![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/test-sheet-after.png)  

	* **Nothing**: don't map any data.


## Read operations

To read from a sheet:

1. Select your **Authentication** method and credential. Refer to [Google credentials](/integrations/builtin/credentials/google/) for more information.
2. In **Resource**, select **Sheet Within Document**.
3. In **Operation**, select **Get Many Rows**.
4. Choose the **Document** and **Sheet** you want to read from.

!!! note "First row"
	n8n treats the first row in a Google Sheet as a heading row, and doesn't return it when reading all rows. If you want to read the first row, use the **Options** to set **Data Location on Sheet**.

### Filters

By default, the Google Sheets node reads and returns all rows in the sheet. To return a limited set of results:

1. Select **Add Filter**.
2. In **Column**, select the column in your sheet to search against.
3. In **Value**, enter a cell value to search for. You can drag input data parameters here.

If your filter matches multiple rows, n8n returns the first result. If you want all matching rows:

1. Under **Options**, select **Add Option** > **When Filter Has Multiple Matches**.
2. Change **When Filter Has Multiple Matches** to **Return All Matches**.

### Output formatting

You can choose how n8n formats the data returned by Google Sheets:

1. After setting up the node to read rows, select **Add Option** > **Output Formatting**.
2. In **General Formatting**, choose one of:
	* **Values (unformatted)**: numbers stay as numbers, but n8n removes currency signs and other special formatting.
	* **Values (formatted)**: n8n displays the values as they appear in Google Sheets (for example, retaining commas or currency signs) To do this, n8n converts the data type from number to string.
	* **Formulas**: n8n returns the formula. It doesn't calculate the formula output. For example, if a cell B2 has the formula `=A2`, n8n returns B2's value as `=A2` (in text).
3. Choose your preferred **Date Formatting**.

## Append an array

To insert an array of data into Google Sheets, you must convert the data into a valid JSON (key, value) format. You can use the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/) to convert the array into JSON format.

## Cell formatting for update and append

You can choose how to format the data in cells:

1. After setting up the node to append data, select **Add Option** > **Cell Format**.
2. In **Cell Format**, select one of:
	* **Let n8n format**: the new cells in your sheet keep the data type of the data in n8n.
	* **Let Google Sheets format**: allow Google Sheets to style the cells as if you typed the data directly into the cells.



