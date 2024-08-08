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
    * **Create** a spreadsheet
	* **Delete** a spreadsheet
* **Sheet Within Document**
	* **Append or Update Row**: Append a new row, or update the current one if it already exists.
	* **Append Row**: Create a new row.
	* **Clear** all data from a sheet.
	* **Create** a new sheet.
	* **Delete** a sheet.
	* **Delete Rows or Columns**: Delete columns and rows from a sheet.
	* **Get Row(s)**: Read all rows in a sheet.
	* **Update Row**: Update a row in a sheet. 

### Create a spreadsheet

Use this operation to create a new spreadsheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Document**.
- **Operation**: Select **Create**.
- **Title**: Enter the title of the new spreadsheet you want to create.
- **Sheets**: Add the **Title(s)** of the sheet(s) you want to create within the spreadsheet. 
- **Options**: 
    - **Locale**: Enter the locale of the spreadsheet in one of the following formats; `en` (639-1), `fil` (639-2 if no 639-1 format exists) or `en_US` (combination of ISO language and country). This affects formatting details such as functions, dates, and currency. Note that Google doesn't support all locales/languages.
    - **Recalculation Interval**: Enter the desired recalculation interval for the spreadsheet functions. This affects how often `NOW`, `TODAY`, `RAND`, and `RANDBETWEEN` are updated. Select **On Change** for recalculating whenever there is a change in the spreadsheet, **Minute** for recalculating every minute, or **Hour** for recalculating every hour.
  	Refer to [Set a spreadsheet’s location & calculation settings](https://support.google.com/docs/answer/58515){:target=_blank .external-link} for more information about these options. 

Refer to the[Google Sheets API](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets){:target=_blank .external-link} documentation for more information.

### Delete a spreadsheet

Use this operation to delete an existing spreadsheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Document**.
- **Operation**: Select **Delete**.
- **Document**: Choose a spreadsheet you want to delete. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the spreadsheet ID. 
    - You can find the spreadsheet ID in a Google Sheets URL:
	`https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`

Refer to the[Google Sheets API](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets){:target=_blank .external-link} documentation for more information.

### Append or Update Row

Use this operation to update existing entry or to add a new row at the end of the data if a matching entry isn't found in a Google Sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Append or Update Row**.
- **Document**: Choose a spreadsheet with the sheet you want to append a row to. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL:
	`https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`
- **Sheet**: Choose a sheet you want to delete. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By ID** to enter the sheet title. 
    - You can find the `sheetId` in a Google Sheets URL:
	`https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`
- **Mapping Column Mode**: 
	- **Map Each Column Manually**: Enter **Values to Send** for each column.
	- **Map Automatically**: n8n looks for incoming data that matches the columns in Google Sheets automatically. In this mode, make sure the incoming data fields are the same as the columns in Google Sheets. (Use an [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set/) node before this node to change them if required.)
--8<-- "_snippets/integrations/builtin/app-nodes/googlesheets/node-options.md"

Refer to the[Google Sheets API | Method: spreadsheets.values.update](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update){:target=_blank .external-link} documentation for more information.

### Append Row

Use this operation to append a new row at the end of the data in a Google Sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Append Row**.
- **Document**: Choose a spreadsheet with the sheet you want to append a row to. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL:
	`https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`
- **Sheet**: Choose a sheet you want to append a row to. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By ID** to enter the sheet title. 
    - You can find the `sheetId` in a Google Sheets URL:
	`https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`
- **Mapping Column Mode**: 
	- **Map Each Column Manually**: Select the **Column to Match On** when finding the rows to update. Enter **Values to Send** for each column.
	- **Map Automatically**: n8n looks for incoming data that matches the columns in Google Sheets automatically. In this mode, make sure the incoming data fields are the same as the columns in Google Sheets. (Use an [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set/) node before this node to change them if required.)
--8<-- "_snippets/integrations/builtin/app-nodes/googlesheets/node-options.md"

Refer to the[Google Sheets API | Method: spreadsheets.values.append](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append){:target=_blank .external-link} documentation for more information.

### Clear 

Use this operation to clear all data from a sheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Clear**.
- **Document**: Choose a spreadsheet with the sheet you want to append a row to. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL:
	`https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`
- **Sheet**: Choose a sheet you want to append a row to. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By ID** to enter the sheet title. 
    - You can find the `sheetId` in a Google Sheets URL:
	`https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`
- **Clear**: 
    - **Whole Sheet**: Turn on **Keep First Row** to keep the first row of the sheet. 
    - **Specific Rows**: Enter **Start Row Number** and **Number of Rows to Delete** to specify the rows to clear. 
    - **Specific Columns**: Enter **Start Column** and **Number of Columns to Delete** to specify the rows to clear. 
    - **Specific Range**: Enter the table range to clear data from, in [A1 notation](https://developers.google.com/sheets/api/guides/concepts#cell){:target=_blank .external-link}.
--8<-- "_snippets/integrations/builtin/app-nodes/googlesheets/node-options.md"

Refer to the[Google Sheets API | Method: spreadsheets.values.clear](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/clear){:target=_blank .external-link} documentation for more information.

### Create 

Use this operation to create a new sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Create**.
- **Document**: Choose a spreadsheet in which you want to create your new Google Sheet. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL:
	`https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`
- **Title**: Enter the title for your new sheet. 
- **Options**: 
    - **Hidden**: Turn on this option to keep the sheet hidden in the UI. 
    - **Right To Left**: Turn on this option to use RTL sheet instead of an LTR sheet. 
    - **Sheet ID**: Enter the ID of the sheet. 
	- **Sheet Index**: Enter the `sheetId` 
	- **Tab Color**:

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'google-sheets') ]]

## Related resources

Refer to [Google Sheet's API documentation](https://developers.google.com/sheets/api){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

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
				3. Open the Customer Datastore node, enable **Return All**, then select **Test step**.
				4. In the Google Sheets node, go through the steps above, using these settings:
					* Select **Update Row** as the **Operation**.
					* In **Column to Match On**, select `test1`.
					* For the first field of **Values to Update**, drag in the **name** from the input view.
					* For the second field of **Values to Update**, drag in the **email** from the input view.
				5. Select **Test step**.
				6. View your spreadsheet. **test2** should now contain the email addresses that match to the names in the input data.  
				![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/test-sheet-after.png)  

	* **Nothing**: don't map any data.


## Read operations

To read from a sheet:

1. Select your **Authentication** method and credential. Refer to [Google credentials](/integrations/builtin/credentials/google/) for more information.
2. In **Resource**, select **Sheet Within Document**.
3. In **Operation**, select **Get Many Rows**.
4. Choose the **Document** and **Sheet** you want to read from.

/// note | First row
n8n treats the first row in a Google Sheet as a heading row, and doesn't return it when reading all rows. If you want to read the first row, use the **Options** to set **Data Location on Sheet**.
///
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




