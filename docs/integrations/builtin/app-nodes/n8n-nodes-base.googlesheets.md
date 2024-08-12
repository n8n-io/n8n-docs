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
    * [**Create**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#create-a-spreadsheet) a spreadsheet.
	* [**Delete**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#delete-a-spreadsheet) a spreadsheet.
* **Sheet Within Document**
	* [**Append or Update Row**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#append-or-update-row): Append a new row, or update the current one if it already exists.
	* [**Append Row**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#append-row): Create a new row.
	* [**Clear**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#clear-a-sheet) all data from a sheet.
	* [**Create**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#create-a-new-sheet) a new sheet.
	* [**Delete**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#delete-a-sheet) a sheet.
	* [**Delete Rows or Columns**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#delete-rows-or-columns): Delete columns and rows from a sheet.
	* [**Get Row(s)**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#get-rows): Read all rows in a sheet.
	* [**Update Row**](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/#update-row): Update a row in a sheet. 

### Create a spreadsheet

Use this operation to create a new spreadsheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Document**.
- **Operation**: Select **Create**.
- **Title**: Enter the title of the new spreadsheet you want to create.
- **Sheets**: Add the **Title(s)** of the sheet(s) you want to create within the spreadsheet. 
<!-- vale off -->
- **Options**: 
    - **Locale**: Enter the locale of the spreadsheet in one of the following formats; `en` (639-1), `fil` (639-2 if no 639-1 format exists) or `en_US` (combination of ISO language and country). This affects formatting details such as functions, dates, and currency. Note that Google doesn't support all locales/languages.
    - **Recalculation Interval**: Enter the desired recalculation interval for the spreadsheet functions. This affects how often `NOW`, `TODAY`, `RAND`, and `RANDBETWEEN` are updated. Select **On Change** for recalculating whenever there is a change in the spreadsheet, **Minute** for recalculating every minute, or **Hour** for recalculating every hour.
  	Refer to [Set a spreadsheet’s location & calculation settings](https://support.google.com/docs/answer/58515){:target=_blank .external-link} for more information about these options. 
<!-- vale on -->

Refer to the [Method: spreadsheets.create | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create){:target=_blank .external-link} API documentation for more information.

### Delete a spreadsheet

Use this operation to delete an existing spreadsheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Document**.
- **Operation**: Select **Delete**.
- **Document**: Choose a spreadsheet you want to delete. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.

Refer to the [Method: files.delete | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/delete){:target=_blank .external-link} API documentation for more information.

### Append or Update Row

Use this operation to update an existing row or add a new row at the end of the data if a matching entry isn't found in a sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Append or Update Row**.
- **Document**: Choose a spreadsheet that contains the sheet you want to append or update row(s) to. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Sheet**: Choose a sheet you want to append or update row(s) to. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the sheet title. 
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`.
- **Mapping Column Mode**: 
	- **Map Each Column Manually**: Enter **Values to Send** for each column.
	- **Map Automatically**: n8n looks for incoming data that matches the columns in Google Sheets automatically. In this mode, make sure the incoming data fields are the same as the columns in Google Sheets. (Use an [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set/) node before this node to change them if required.)
    - **Nothing**: Don't map any data.
--8<-- "_snippets/integrations/builtin/app-nodes/googlesheets/node-options.md"

Refer to the [Method: spreadsheets.values.update | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update){:target=_blank .external-link} API documentation for more information.

### Append Row

Use this operation to append a new row at the end of the data in a sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Append Row**.
- **Document**: Choose a spreadsheet with the sheet you want to append a row to. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Sheet**: Choose a sheet you want to append a row to. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the sheet title. 
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`. 
- **Mapping Column Mode**: 
	- **Map Each Column Manually**: Select the **Column to Match On** when finding the rows to update. Enter **Values to Send** for each column.
	- **Map Automatically**: n8n looks for incoming data that matches the columns in Google Sheets automatically. In this mode, make sure the incoming data fields are the same as the columns in Google Sheets. (Use an [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set/) node before this node to change them if required.)
    - **Nothing**: Don't map any data.
--8<-- "_snippets/integrations/builtin/app-nodes/googlesheets/node-options.md"

Refer to the [Method: spreadsheets.values.append | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append){:target=_blank .external-link} API documentation for more information.

### Clear a sheet

Use this operation to clear all data from a sheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Clear**.
- **Document**: Choose a spreadsheet with the sheet you want to clear data from.
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Sheet**: Choose a sheet you want to clear data from. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the sheet title. 
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`.
- **Clear**: 
    - **Whole Sheet**: Turn on **Keep First Row** to keep the first row of the sheet. 
    - **Specific Rows**: Enter **Start Row Number** and **Number of Rows to Delete** to specify the rows to clear. 
    - **Specific Columns**: Enter **Start Column** and **Number of Columns to Delete** to specify the rows to clear. 
    - **Specific Range**: Enter the table range to clear data from, in [A1 notation](https://developers.google.com/sheets/api/guides/concepts#cell){:target=_blank .external-link}.
--8<-- "_snippets/integrations/builtin/app-nodes/googlesheets/node-options.md"

Refer to the [Method: spreadsheets.values.clear | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/clear){:target=_blank .external-link} API documentation for more information.

### Create a new sheet

Use this operation to create a new sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Create**.
- **Document**: Choose a spreadsheet in which you want to create a new sheet. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Title**: Enter the title for your new sheet. 
- **Options**: 
    - **Hidden**: Turn on this option to keep the sheet hidden in the UI. 
    - **Right To Left**: Turn on this option to use RTL sheet instead of an LTR sheet. 
    - **Sheet ID**: Enter the ID of the sheet. 
    	- You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`
	- **Sheet Index**: Enter the index of the sheet within the spreadsheet.
	- **Tab Color**: Enter the color as hex code or use the color picker to set the color of the tab in the UI. 

Refer to the [Method: spreadsheets.batchUpdate | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate){:target=_blank .external-link} API documentation for more information.

### Delete a sheet

Use this operation to permanently delete a sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Delete**.
- **Document**: Choose a spreadsheet that contains the sheet you want to delete. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Sheet**: Choose a sheet in which you want to delete. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the name of the sheet.
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`. 

Refer to the [Method: spreadsheets.batchUpdate | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate){:target=_blank .external-link} API documentation for more information.

### Delete Rows or Columns

Use this operation to delete rows or columns in a sheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Delete Rows or Columns**.
- **Document**: Choose a spreadsheet that contains the sheet you want to delete rows or columns from. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Sheet**: Choose a sheet in which you want to delete. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the name of the sheet.
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`. 
- **Start Row Number** or **Start Column**: Enter the row number of column name to start deleting.
- **Number of Rows to Delete** or **Number of Columns to delete**: Enter the number of rows or columns to delete. 

Refer to the [Method: spreadsheets.batchUpdate | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate){:target=_blank .external-link} API documentation for more information.

### Get Row(s)

Use this operation to read one or more rows from a sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Get Row(s)**.
- **Document**: Choose a spreadsheet that contains the sheet you want to get rows from. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`. 
- **Sheet**: Choose a sheet you want to read rows from.
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the name of the sheet.
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`.
- **Filters**: Set filters to return a limited set of results: By default, the node returns all rows in the sheet.
  	- **Column**: Select the column in your sheet to search against.
  	- **Value**: Enter a cell value to search for. You can drag input data parameters here.
	If your filter matches multiple rows, n8n returns the first result. If you want all matching rows: 
    	1. Under **Options**, select **Add Option** > **When Filter Has Multiple Matches**.
        2. Change **When Filter Has Multiple Matches** to **Return All Matches**.
- **Options**: 
    - **Data Location on Sheet**: Use this option to specify a data range. By default, n8n will detect the range automatically until the last row in the sheet. 
    - **Output Formatting**: Use this option to choose how n8n formats the data returned by Google Sheets.
      - **General Formatting**: 
        - **Values (unformatted)** (default): n8n removes currency signs and other special formatting. Data type remains as number.
        - **Values (formatted)**: n8n displays the values as they appear in Google Sheets (for example, retaining commas or currency signs) by converting the data type from number to string.
        - **Formulas**: n8n returns the formula. It doesn't calculate the formula output. For example, if a cell B2 has the formula `=A2`, n8n returns B2's value as `=A2` (in text). Refer to [About date & time values | Google Sheets](https://developers.google.com/sheets/api/guides/formats#about_date_time_values){:target=_blank .external-link} for more information. 
      - **Date Formatting**: Refer to [DateTimeRenderOption | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/DateTimeRenderOption){:target=_blank .external-link} for more information. 
	  	- **Formatted Text** (default): As displayed in Google Sheets, which depends on the spreadsheet locale. For example `01/01/2024`.
	  	- **Serial Number**: Number of days since  December 30th 1899. 
    - **When Filter Has Multiple Matches**: Set to **Return All Matches** to get multiple matches. By default only the first result gets returned. 

/// note | First row
n8n treats the first row in a Google Sheet as a heading row, and doesn't return it when reading all rows. If you want to read the first row, use the **Options** to set **Data Location on Sheet**.
///

Refer to the [Method: spreadsheets.batchUpdate | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate){:target=_blank .external-link} API documentation for more information.

### Update Row

Use this operation to update existing row in a sheet. This operation only updates existing rows. To append rows when a matching entry isn't found in a sheet, use **Append or Update Row** operation instead.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Update Row**.
- **Document**: Choose a spreadsheet with the sheet you want to update. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Sheet**: Choose a sheet you want to update. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the sheet title. 
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`.
- **Mapping Column Mode**: 
	- **Map Each Column Manually**: Enter **Values to Send** for each column.
	- **Map Automatically**: n8n looks for incoming data that matches the columns in Google Sheets automatically. In this mode, make sure the incoming data fields are the same as the columns in Google Sheets. (Use an [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set/) node before this node to change them if required.)
    - **Nothing**: Don't map any data.
- **Options**:
    - **Cell Format**: Use this option to choose how to format the data in cells. Refer to [Google Sheets API | CellFormat](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellFormat){:target=_blank .external-link} for more information.
        - **Let Google Sheets format** (default): n8n formats text and numbers in the cells according to Google Sheets' default settings. 
        - **Let n8n format**: New cells in your sheet will have the same data types as the input data provided by n8n.
    - **Data Location on Sheet**: Use this option when you need to specify where the data range on your sheet.
        - **Header Row**: Specify the row index that contains the column headers.
        - **First Data Row**: Specify the row index where the actual data starts.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'google-sheets') ]]

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

To insert an array of data into Google Sheets, you must convert the data into a valid JSON (key, value) format. You can use the [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/) to convert the array into JSON format.




