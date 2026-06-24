---
title: Google Sheets Document operations
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Google Sheets Document operations
originalFilePath: >-
  integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/document-operations.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/document-operations
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/document-operations
description: >-
  Documentation for the Document operations in Google Sheets node in n8n, a
  workflow automation platform. Includes details of operations and
  configuration, and links to examples and credentials informat
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Document operations

Use this operation to create or delete a Google spreadsheet from Google Sheets. Refer to [Google Sheets](./) for more information on the Google Sheets node itself.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Create a spreadsheet <a href="#create-a-spreadsheet" id="create-a-spreadsheet"></a>

Use this operation to create a new spreadsheet.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Google Sheets credentials](../../credentials/google/).
* **Resource**: Select **Document**.
* **Operation**: Select **Create**.
* **Title**: Enter the title of the new spreadsheet you want to create.
* **Sheets**: Add the **Title(s)** of the sheet(s) you want to create within the spreadsheet.

### Options <a href="#options" id="options"></a>

* **Locale**: Enter the locale of the spreadsheet. This affects formatting details such as functions, dates, and currency. Use one of the following formats:
  * `en` (639-1)
  * `fil` (639-2 if no 639-1 format exists)
  * `en_US` (combination of ISO language and country).
  * Refer to [List of ISO 639 language codes](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) and [List of ISO 3166 country codes](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) for language and country codes. Note that Google doesn't support all locales/languages.
* **Recalculation Interval**: Enter the desired recalculation interval for the spreadsheet functions. This affects how often `NOW`, `TODAY`, `RAND`, and `RANDBETWEEN` are updated. Select **On Change** for recalculating whenever there is a change in the spreadsheet, **Minute** for recalculating every minute, or **Hour** for recalculating every hour. Refer to [Set a spreadsheet’s location & calculation settings](https://support.google.com/docs/answer/58515) for more information about these options.

Refer to the [Method: spreadsheets.create | Google Sheets](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create) API documentation for more information.

## Delete a spreadsheet <a href="#delete-a-spreadsheet" id="delete-a-spreadsheet"></a>

Use this operation to delete an existing spreadsheet.

Enter these parameters:

* **Credential to connect with**: Create or select an existing [Google Sheets credentials](../../credentials/google/).
* **Resource**: Select **Document**.
* **Operation**: Select **Delete**.
* **Document**: Choose a spreadsheet you want to delete.
  * Select **From list** to choose the title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`.
  * You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.

Refer to the [Method: files.delete | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/delete) API documentation for more information.
