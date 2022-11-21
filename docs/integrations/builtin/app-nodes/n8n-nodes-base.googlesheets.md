# Google Sheets

[Google Sheets](https://www.google.com/sheets){:target=_blank} is a web-based spreadsheet program that's part of Google's office software suite within its Google Drive service.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/google/).


## Operations

* Document
    * Create
	* Delete
* Sheet within document
    * Append: append data to a sheet
	* Append or update: append a new row, or update the current one if it already exists.
    * Clear: clear all data from a sheet
    * Create: create a new sheet
    * Delete: delete columns and rows from a sheet
    * Read rows: read all rows in a sheet.
    * Remove: remove a sheet
    * Update: update rows in a sheet

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
	* **Auto-Map Input Data to Columns**: use this when the table column names (or JSON parameter names) in the node input view match the column names in your spreadsheet. In **Column to Match On**, select the column name in Google Sheets that you want to map to.
	* **Map Each Column Below**: use this when the column names and data structure in your node input data doesn't match the names and structure in Google Sheets. 
		1. In **Column to Match On**, select or enter the column name in Google Sheets. 
		2. In **Value of Column to Match On**, drag in the table column (or JSON parameter) whose value you want to search for. 
		3. In **Values to Send** select **Add Field**. 
		4. Enter a **Column** from your Google Sheet, and the value from the node input data you want to add to that column in **Value**.

			??? Details "View example and screenshots"
				This example uses the Customer Datastore node to provide sample data to load into Google Sheets. It assumes you've already set up your [credentials](/integrations/builtin/credentials/google/).

				1. Set up a Google Sheet with two columns, `test1` and `test`. In `test1`, enter the names from the Customer Datastore node:  
				![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/test-sheet-before.png)  
				2. Create the workflow: use the manual trigger, Customer Datastore, and Google Sheets nodes.  
				![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/workflow.png)  
				3. Open the Customer Datastore node, enable **Return All**, then select **Execute node**.
				4. In the Google Sheets node, go through the steps above, using these settings:
					* Select **Update** as the **Operation**.
					* In **Column to Match On**, select `test1`.
					* For **Value of Column to Match On**, drag in the **name** column from the input view.
					* Then set up your **Values to Send**: enter `test2` in **Column**, and drag the **email** column from the input view into **Value**.
				5. Select **Execute node**.
				6. View your spreadsheet. **test2** should now contain the email addresses that match to the names in the input data.  
				![The spreadsheet set up for testing](/_images/integrations/builtin/app-nodes/googlesheets/test-sheet-after.png)  

	* **Nothing**: don't map any data.


## Read operations

To read from a sheet:

1. Select your **Authentication** method and credential. Refer to [Google credentials](/integrations/builtin/credentials/google/) for more information.
2. In **Resource**, select **Sheet Within Document**.
3. In **Operation**, select **Read Rows**.
4. Choose the **Document** and **Sheet** you want to read from.

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


