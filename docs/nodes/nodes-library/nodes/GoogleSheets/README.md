---
permalink: /nodes/n8n-nodes-base.googleSheets
---

# Google Sheets

[Google Sheets](https://www.google.com/sheets) is a web-based spreadsheet program that is part of Google's office software  suite within its Google Drive service.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/Google/README.md).
:::

## Basic Operations

- Append data to a sheet
- Clear data from a sheet
- Delete columns and rows from a sheet
- Look up a specific column value and return the matching row
- Read data from a sheet
- Update rows in a sheet

## Example Usage

This workflow shows you how to add to and read from a Google Sheets spreadsheet. You can also find the [workflow](https://n8n.io/workflows/600) on this website. This example usage workflow uses the following three nodes.
- [Start](../../core-nodes/Start/README.md)
- [Set](../../core-nodes/Set/README.md)
- [Google Sheets]()

The final workflow should look like the following image.

![A workflow with the Google Sheets node](./workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.


### 2. Set node

1. Click on the ***Add Value*** button and select 'Number' from the dropdown list.
2. Enter `id` in the ***Name*** field.
3. Click on the ***Add Value*** button and select 'String' from the dropdown list.
4. Enter `name` in the ***Name*** field.
5. Enter the value for the name in the ***Value*** field.
6. Click on ***Execute Node*** to run the node.

![Using the Set node to set data to be inserted by the Google Sheets node](./Set_node.png)


### 3. Google Sheets node (Append)

1. First of all, you'll have to enter credentials for the Google Sheets node. You can find out how to do that [here](../../../credentials/Google/README.md), in the section 'Google Drive / Sheets API'.
2. Select 'OAuth2' in the ***Authentication*** field.
3. Select 'Append' from the ***Operation*** dropdown list.
4. Copy the string of characters located between `/d/` and `/edit` in your spreadsheet URL. Paste that string in the ***Sheet ID*** field.
5. In the ***Range*** field, enter the range of columns to append the data to in your spreadsheet. Make sure that your range includes enough columns for all the data included in the Set node.
6. Enter `id` in the A1 cell and `name` in the B1 cell  of the spreadsheet.
7. Click on ***Execute Node*** to run the workflow.

![Using the Google Sheets node to insert data into a Google Sheets spreadsheet](./GoogleSheets_node.png)


### 4. Google Sheets1 node (Read)

1. Select the credentials that you entered in the previous Google Sheets node.
2. Select 'OAuth2' in the ***Authentication*** field.
3. Select 'Read' from the ***Operation*** dropdown list.
4. In the ***Sheet ID*** field, enter the same string used in the previous Google Sheets node.
5. In the ***Range*** field, enter the same range used in the previous Google Sheets node.
6. Click on ***Execute Node*** to run the workflow.

![Using the Google Sheets node to read data from a Google Sheets spreadsheet](./GoogleSheets1_node.png)
