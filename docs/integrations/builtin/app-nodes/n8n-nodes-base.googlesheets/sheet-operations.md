---
title: Google Sheets Sheet Within Document operations
description: Documentation for the Sheet operations in Google Sheets node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: critical
---

# Google Sheets Sheet Within Document operations

Use this operation to create, update, clear or delete a sheet in a Google spreadsheet from Google Sheets. Refer to [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/index.md) for more information on the Google Sheets node itself.

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Append or Update Row

Use this operation to update an existing row or add a new row at the end of the data if a matching entry isn't found in a sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
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
	- **Map Automatically**: n8n looks for incoming data that matches the columns in Google Sheets automatically. In this mode, make sure the incoming data fields are the same as the columns in Google Sheets. (Use an [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) node before this node to change them if required.)
    - **Nothing**: Don't map any data.

### Options
--8<-- "_snippets/integrations/builtin/app-nodes/googlesheets/node-options.md"

Refer to the [Method: spreadsheets.values.update | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update) API documentation for more information.

## Append Row

Use this operation to append a new row at the end of the data in a sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
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
	- **Map Automatically**: n8n looks for incoming data that matches the columns in Google Sheets automatically. In this mode, make sure the incoming data fields are the same as the columns in Google Sheets. (Use an [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) node before this node to change them if required.)
    - **Nothing**: Don't map any data.

### Options
--8<-- "_snippets/integrations/builtin/app-nodes/googlesheets/node-options.md"

Refer to the [Method: spreadsheets.values.append | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append) API documentation for more information.

## Clear a sheet

Use this operation to clear all data from a sheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Clear**.
- **Document**: Choose a spreadsheet with the sheet you want to clear data from.
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Sheet**: Choose a sheet you want to clear data from. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the sheet title. 
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`.
- **Clear**: Select what data you want cleared from the sheet.
    - **Whole Sheet**: Clear the entire sheet's data. Turn on **Keep First Row** to keep the first row of the sheet. 
    - **Specific Rows**: Clear data from specific rows. Also enter:
        - **Start Row Number**: Enter the first row number you want to clear.
        - **Number of Rows to Delete**: Enter the number of rows to clear. `1` clears data only the row in the **Start Row Number**.
    - **Specific Columns**: Clear data from specific columns. Also enter:
        - **Start Column**: Enter the first column you want to clear using the letter notation.
        - **Number of Columns to Delete**: Enter the number of columns to clear. `1` clears data only in the **Start Column**.
    - **Specific Range**: Enter the table range to clear data from, in [A1 notation](https://developers.google.com/sheets/api/guides/concepts#cell).

Refer to the [Method: spreadsheets.values.clear | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/clear) API documentation for more information.

## Create a new sheet

Use this operation to create a new sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Create**.
- **Document**: Choose a spreadsheet in which you want to create a new sheet. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Title**: Enter the title for your new sheet. 

### Options

- **Hidden**: Turn on this option to keep the sheet hidden in the UI. 
- **Right To Left**: Turn on this option to use RTL sheet instead of an LTR sheet. 
- **Sheet ID**: Enter the ID of the sheet. 
	- You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`
- **Sheet Index**: By default, the new sheet is the last sheet in the spreadsheet. To override this behavior, enter the index you want the new sheet to use. When you add a sheet at a given index, Google increments the indices for all following sheets. Refer to [Sheets | SheetProperties](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#SheetProperties) documentation for more information.
- **Tab Color**: Enter the color as hex code or use the color picker to set the color of the tab in the UI. 

Refer to the [Method: spreadsheets.batchUpdate | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate) API documentation for more information.

## Delete a sheet

Use this operation to permanently delete a sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Delete**.
- **Document**: Choose a spreadsheet that contains the sheet you want to delete. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Sheet**: Choose the sheet you want to delete. 
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the name of the sheet.
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`. 

Refer to the [Method: spreadsheets.batchUpdate | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate) API documentation for more information.

## Delete Rows or Columns

Use this operation to delete rows or columns in a sheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Delete Rows or Columns**.
- **Document**: Choose a spreadsheet that contains the sheet you want to delete rows or columns from. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
- **Sheet**: Choose the sheet in which you want to delete rows or columns.
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the name of the sheet.
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`. 
- **Start Row Number** or **Start Column**: Enter the row number or column letter to start deleting.
- **Number of Rows to Delete** or **Number of Columns to delete**: Enter the number of rows or columns to delete. 

Refer to the [Method: spreadsheets.batchUpdate | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate) API documentation for more information.

## Get Row(s)

Use this operation to read one or more rows from a sheet. 

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Sheet Within Document**.
- **Operation**: Select **Get Row(s)**.
- **Document**: Choose a spreadsheet that contains the sheet you want to get rows from. 
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`. 
- **Sheet**: Choose a sheet you want to read rows from.
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the name of the sheet.
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`.
- **Filters**: By default, the node returns all rows in the sheet. Set filters to return a limited set of results: 
  	- **Column**: Select the column in your sheet to search against.
  	- **Value**: Enter a cell value to search for. You can drag input data parameters here.
	If your filter matches multiple rows, n8n returns the first result. If you want all matching rows: 
    	1. Under **Options**, select **Add Option** > **When Filter Has Multiple Matches**.
        2. Change **When Filter Has Multiple Matches** to **Return All Matches**.

### Options

- **Data Location on Sheet**: Use this option to specify a data range. By default, n8n will detect the range automatically until the last row in the sheet. 
- **Output Formatting**: Use this option to choose how n8n formats the data returned by Google Sheets.
  - **General Formatting**: 
    - **Values (unformatted)** (default): n8n removes currency signs and other special formatting. Data type remains as number.
    - **Values (formatted)**: n8n displays the values as they appear in Google Sheets (for example, retaining commas or currency signs) by converting the data type from number to string.
    - **Formulas**: n8n returns the formula. It doesn't calculate the formula output. For example, if a cell B2 has the formula `=A2`, n8n returns B2's value as `=A2` (in text). Refer to [About date & time values | Google Sheets](https://developers.google.com/sheets/api/guides/formats#about_date_time_values) for more information. 
  - **Date Formatting**: Refer to [DateTimeRenderOption | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/DateTimeRenderOption) for more information.
     	- **Formatted Text** (default): As displayed in Google Sheets, which depends on the spreadsheet locale. For example `01/01/2024`.
     	- **Serial Number**: Number of days since  December 30th 1899. 
- **When Filter Has Multiple Matches**: Set to **Return All Matches** to get multiple matches. By default only the first result gets returned. 

/// note | First row
n8n treats the first row in a Google Sheet as a heading row, and doesn't return it when reading all rows. If you want to read the first row, use the **Options** to set **Data Location on Sheet**.
///

Refer to the [Method: spreadsheets.batchUpdate | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate) API documentation for more information.

## Update Row

Use this operation to update existing row in a sheet. This operation only updates existing rows. To append rows when a matching entry isn't found in a sheet, use **Append or Update Row** operation instead.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
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
	- **Map Automatically**: n8n looks for incoming data that matches the columns in Google Sheets automatically. In this mode, make sure the incoming data fields are the same as the columns in Google Sheets. (Use an [Edit Fields](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) node before this node to change them if required.)
    - **Nothing**: Don't map any data.

### Options

- **Cell Format**: Use this option to choose how to format the data in cells. Refer to [Google Sheets API | CellFormat](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellFormat) for more information.
    - **Let Google Sheets format** (default): n8n formats text and numbers in the cells according to Google Sheets' default settings. 
    - **Let n8n format**: New cells in your sheet will have the same data types as the input data provided by n8n.
- **Data Location on Sheet**: Use this option when you need to specify where the data range on your sheet.
    - **Header Row**: Specify the row index that contains the column headers.
    - **First Data Row**: Specify the row index where the actual data starts.
  
Refer to the [Method: spreadsheets.batchUpdate | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate) API documentation for more information.