---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Sheets
description: Documentation for the Document operations in Google Sheets node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: critical
---

# Google Sheets Document operations

Use this operation to create or delete a Google spreadsheet from Google Sheets. Refer to [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/) for more information on the Telegram node itself.

## Create a spreadsheet

Use this operation to create a new spreadsheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Document**.
- **Operation**: Select **Create**.
- **Title**: Enter the title of the new spreadsheet you want to create.
- **Sheets**: Add the **Title(s)** of the sheet(s) you want to create within the spreadsheet. 

### Options

|**Options**|**Description**|
|---|---|
| **Locale** <br>This affects formatting details such as functions, dates, and currency. Note that Google doesn't support all locales/languages.| Enter the locale of the spreadsheet in one of the following formats: `en` (639-1), `fil` (639-2 if no 639-1 format exists), or `en_US` (combination of ISO language and country).                                                                                                                       |
| **Recalculation Interval** <br>Enter the desired recalculation interval for the spreadsheet functions. This affects how often NOW, TODAY, RAND, and RANDBETWEEN are updated.| - **On Change**: Recalculates whenever there is a change in the spreadsheet. <br> - **Minute**: Recalculates every minute. <br> - **Hour**: Recalculates every hour. <br> Refer to [Set a spreadsheet’s location & calculation settings](https://support.google.com/docs/answer/58515){:target=_blank .external-link} for more information about these options.  |

Refer to the [Method: spreadsheets.create | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create){:target=_blank .external-link} API documentation for more information.

## Delete a spreadsheet

Use this operation to delete an existing spreadsheet.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/).
- **Resource**: Select **Document**.
- **Operation**: Select **Delete**.
- **Document**: Choose a spreadsheet you want to delete. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.

Refer to the [Method: files.delete | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/delete){:target=_blank .external-link} API documentation for more information.