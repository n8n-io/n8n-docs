# Google Sheets

[Google Sheets](https://www.google.com/sheets) is a web-based spreadsheet program that is part of Google's office software  suite within its Google Drive service.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/google/).


## Basic Operations

* Spreadsheet
    * Create a spreadsheet
* Sheet
    * Append data to a sheet
    * Clear data from a sheet
    * Create a new sheet
    * Delete columns and rows from a sheet
    * Look up a specific column value and return the matching row
    * Read data from a sheet
    * Remove a sheet
    * Update rows in a sheet

## Example Usage

This workflow allows you to append, lookup, update, and read data from Google Sheets. You can also find the [workflow](https://n8n.io/workflows/694) on n8n.io. This example usage workflow uses the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Set](/workflow/integrations/core-nodes/n8n-nodes-base.set/)
- [Google Sheets]()

The final workflow should look like the following image.

![A workflow with the Google Sheets node](/_images/integrations/nodes/googlesheets/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.


### 2. Set node

This example workflow uses the Set node to generate data that we want to add to Google Sheets. You can also use other nodes, for example, the [HTTP Request](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) node, to get the data you want to add to the Google Sheets.

1. Click on the ***Add Value*** button and select 'String' from the dropdown list.
2. Enter `Name` in the ***Name*** field.
3. Enter the name for a house in the ***Value*** field.
4. Click on the ***Add Value*** button and select 'String' from the dropdown list.
5. Enter `Rent` in the ***Name*** field.
6. Enter the rent of the house along with the currency in the ***Value*** field. For example, `$1000`.
7. Click on the ***Add Value*** button and select 'String' from the dropdown list.
8. Enter `City` in the ***Name*** field.
9. Enter the name of the city in the ***Value*** field.
10. Click on the ***Add Value*** button and select 'Number' from the dropdown list.
11. Enter `ID` in the ***Name*** field.
12. Click on the gears icon next to the ***Value*** field and click on ***Add Expression***.
13. Paste the following expression: `{{Math.floor(Math.random()*1000)}}`. This expression will generate a three-digit random number.
14. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the Set node has created data that will be passed to the next nodes in the workflow. Also, the output shows a random three-digit number as the ID, created by the expression.

![Using the Set node to set data to be inserted in the Google Sheets node](/_images/integrations/nodes/googlesheets/set_node.png)


### 3. Google Sheets node (Append)

#### Creating a Google Sheets spreadsheet

1. Create a new [Google Sheets](https://sheet.new) spreadsheet.
2. In your spreadsheet, enter `ID`, `Name`, `Rent`, and `City` in the cells A1, B1, C1, and D1, respectively.
3. Copy the string of characters located between `/d/` and `/edit` in your spreadsheet URL. This string is the Spreadsheet ID, which we will use in the Google Sheets node.

#### Configure the Google Sheets node

This Google Sheets node will add the data from the Set node in a new row to the Google Sheets that we will specify using the Spreadsheet ID.

1. Select 'OAuth2' from the ***Authentication*** dropdown list.
2.  First of all, you'll have to enter credentials for the Google Sheets node. You can find out how to enter credentials for this node [here](/workflow/integrations/credentials/google/).
3. Select 'Append' from the ***Operation*** dropdown list.
4. Paste the Spreadsheet ID you copied in the previous step, in the ***Spreadsheet ID*** field.
5. In the ***Range*** field, enter the range of columns to append the data to your spreadsheet. Make sure that your range includes enough columns for all the data in the Set node. For this workflow, enter `A:D` in the ***Range*** field.
6. Click on the ***Add Option*** button and select 'Value Input Mode' from the dropdown list.
7. Select 'User Entered' from the ***Value Input Mode*** dropdown list. Refer to the [FAQs](#how-to-enter-values-with-a-proper-format) for more information on why we used this option.
8. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will observe that the node adds the data from the Set node to the Google Sheets. You will also notice that the values get added in the format they are set.

![Using the Google Sheets node to insert data into a Google Sheets spreadsheet](/_images/integrations/nodes/googlesheets/googlesheets_node.png)

### 4. Google Sheets1 node (Lookup)

This node will return the entries from the Google Sheets that have `Berlin` as the City. Feel free to change the city name to something else but make sure you have at least one record with the city name you look for in your Google Sheets spreadsheet.

1. Select 'OAuth2' from the ***Authentication*** dropdown list.
2. Select the credentials that you entered in the previous Google Sheets node.
3. Select 'Lookup' from the ***Operation*** dropdown list.
4. In the ***Spreadsheet ID*** field, enter the same string used in the previous Google Sheets node.
5. Enter `City` in the ***Lookup Column*** field.
6. Enter `Berlin` in the ***Lookup Value*** field.
7. Click on the ***Add Option*** button and select 'Return All Matches' from the dropdown list.
8. Toggle ***Return All Matches*** to true. This option returns all the entries that contain `Berlin` as the City. Refer to the [FAQs](#how-to-return-all-the-values-with-the-lookup-operation) for more information.
9. Click on the ***Add Option*** button and select 'Value Render Mode' from the dropdown list. This option determines how the values should render in the output. The 'Unformatted Value' option returns the data without formatting it. Refer to the [FAQs](#what-are-the-various-formats-to-read-the-data-from-the-google-sheets) for more information on why we used this option.
10. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that the node returns all the entries that contain Berlin as the City. The output is unformatted and is passed on to the next nodes in the workflow.

![Using the Google Sheets node to lookup for data in the Google Sheets spreadsheet](/_images/integrations/nodes/googlesheets/googlesheets1_node.png)


### 5. Set1 node

We will use expressions to get the data from the previous node and increase the rent by $100 for the houses in Berlin.

1. Click on the ***Add Value*** button and select 'String' from the dropdown list.
2. Enter `Name` in the ***Name*** field.
3. Click on the gears icon next to the ***Value*** field click on ***Add Expression***.
4. Select the following in the ***Variable Selector*** section: Nodes > Google Sheets1 > Output Data > JSON > Name. You can also add the following expression: `{{$node["Google Sheets1"].json["Name"]}}`.
5. Click on the ***Add Value*** button and select 'String' from the dropdown list.
6. Enter `City` in the ***Name*** field.
7. Click on the gears icon next to the ***Value*** field click on ***Add Expression***.
8. Select the following in the ***Variable Selector*** section: Nodes > Google Sheets1 > Output Data > JSON > City. You can also add the following expression: `{{$node["Google Sheets1"].json["City"]}}`.
9. Click on the ***Add Value*** button and select 'Number' from the dropdown list.
10. Click on the gears icon next to the ***Value*** field click on ***Add Expression***.
11. Paste the following expression: `{{$node["Google Sheets1"].json["Rent"]+100}}`. This expression will increase the rent by $100.
12. Click on the ***Add Value*** button and select 'Number' from the dropdown list.
13. Enter `ID` in the ***Name*** field.
14. Click on the gears icon next to the ***Value*** field click on ***Add Expression***.
15. Select the following in the ***Variable Selector*** section: Nodes > Google Sheets1 > Output Data > JSON > ID. You can also add the following expression: `{{$node["Google Sheets1"].json["ID"]}}`.
16. Click on ***Execute Node*** to run the node.


In the screenshot below, you will notice that the node uses an expression to get the data from the previous node and increases the rent of the houses by $100. This new data will be passed to the next nodes in the workflow.

![Using the Set node to increase the rent](/_images/integrations/nodes/googlesheets/set1_node.png)

### 6. Google Sheets2 node (Update)

This node will update the rent for the houses in Berlin with the new rent set in the previous node.

1. Select 'OAuth2' in the ***Authentication*** field.
2. Select the credentials that you entered in the previous Google Sheets node.
3. Select 'Update' from the ***Operation*** dropdown list.
4. In the ***Spreadsheet ID*** field, enter the same string used in the previous Google Sheets node.
5. In the ***Range*** field, enter the same range used in the previous Google Sheets node.
6. Enter `ID` in the ***Key*** field.
7. Click on the ***Add Option*** button and select 'Value Input Mode' from the dropdown list.
8. Select 'User Entered' from the ***Value Input Mode*** dropdown list. Refer to the [FAQs](#how-to-enter-values-with-a-proper-format) for more information on why we used this option.
9. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that this node updates the rent values of the houses in Berlin based on the ID in the Google Sheets. You will also see that the updated values are in the correct format.

![Using the Google Sheets node to update the data to the Google Sheets spreadsheet](/_images/integrations/nodes/googlesheets/googlesheets2_node.png)

### 7. Google Sheets3 node (Read)

This node will read the data from Google Sheets.

1. Select 'OAuth2' in the ***Authentication*** field.
2. Select the credentials that you entered in the previous Google Sheets node.
3. Select 'Read' from the ***Operation*** dropdown list.
4. In the ***Spreadsheet ID*** field, enter the same string used in the previous Google Sheets node.
5. In the ***Range*** field, enter the same range used in the previous Google Sheets node.
6. Click on the ***Add Option*** button and select 'Value Render Mode' from the dropdown list.
7. Select 'Formatted Value' from the ***Value Render Mode*** dropdown list. Refer to the [FAQs](#what-are-the-various-formats-to-read-the-data-from-the-google-sheets) for more information on why we used this option.
8. Click on ***Execute Node*** to run the workflow.

In the screenshot below, you will notice that this node returns all the values from the Google Sheets in the appropriate format.

![Using the Google Sheets node to read data from the Google Sheets spreadsheet](/_images/integrations/nodes/googlesheets/googlesheets3_node.png)

## FAQs

### What are the various formats to read the data from the Google Sheets?

There are three different formats to read the data from the Google Sheets.

- **Unformatted Value:** In this mode, the node calculates the values, but doesn't format them. For example, if cell A1 is 1.23, and cell A2 is =A1, and the format of these cells is currency, then values returned will be of the format number. For cell A1 and A2, the values returned will be 1.23.
- **Formula:** In this mode, the node will return the formula. The node does not calculate the values. For example,  if cell A1 is 1.23, and cell A2 is =A1, and the format of these cells is currency, then the value returned will be of the format number. The value returned for cell A2 will be =A1.
- **Formatted Value:** In this mode, the node calculates the values and returns the values with the cells' format. For example, if cell A1 is 1.23, and cell A2 is =A1, and the format of these cells is currency, then the values returned will be $1.23.

To change the format, click on ***Add Option*** and select 'Value Render Mode' from the dropdown list. Select the appropriate option you want your output to be returned to from the ***Value Render Mode*** dropdown list.

### How to enter values in the correct format?

There are two different formats you can use to add/update data in Google Sheets.

- **Raw:** This is the default format. In this format, the values are stored as-is and not parsed. For example, the node stores the text 2020-10-01 as a string in the Google Sheets.
- **User Entered:** In this format, the node parse the values. It follows the rules that are applied when entering text into the cell via the Google Sheet UI. For example, the node stores the text 2020-10-01 as a date in the Google Sheets.

To change the format, click on ***Add Option*** and select 'Value Input Mode' from the dropdown list. Select the appropriate option you want your data to be stored in, from the ***Value Input Mode*** dropdown list.

### How to append an array in the Google Sheets?

To insert the data in Google Sheets, you have to first convert the data in a valid JSON (key, value) format. You can use the [Function node](/workflow/integrations/core-nodes/n8n-nodes-base.function/) to convert the array into JSON format.

### How to return all the values with the Lookup operation?

By default, the Lookup operation returns only the first value that it matches. To return all the values that match, click on ***Add Option*** and select 'Return All Matches'. Toggle ***Return All Matches*** to true.

### How to specify a sheet?

By default, the Google Sheets node will operate on the default sheet, `Sheet 1`. If you rename the sheet or want to use a different sheet, you have to specify the name of the sheet. You can do that in the ***Range*** field. For example, if you need to use a sheet named `n8n` for the range `A` to `H`, enter `n8n!A:H` in the ***Range*** field.




