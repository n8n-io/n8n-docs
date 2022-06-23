---
title: Doc² export to Excel
description: In this example we trigger the result from Doc² and write the result to excel and upload it to Dropbox.
date: 2022-06-23
tags:
  - Workflow²
  - Dropbox
  - Excel
  - Doc²

---

#  Doc² export to Excel and Upload to Dropbox


![](/_images/excel-dropbox.png)


In this example we trigger the result from Doc² and write the result to excel and upload it to Dropbox.



## Example

``` Javascript
{
  "name": "Export to Dropbox",
  "nodes": [
    {
      "parameters": {},
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [
        180,
        420
      ]
    },
    {
      "parameters": {
        "document_type": "INVOICE",
        "status": "validated_pending_export"
      },
      "name": "Status Trigger",
      "type": "n8n-nodes-base.statusTrigger",
      "typeVersion": 1,
      "position": [
        200,
        200
      ],
      "webhookId": "b4e6be8c-5be1-4c75-8906-aa8790c1dd51",
      "credentials": {
        "Doc2AppApi": {
          "id": "1",
          "name": "Doc2App account"
        }
      }
    },
    {
      "parameters": {
        "operation": "toFile",
        "fileFormat": "xlsx",
        "options": {
          "fileName": "excel.xlsx"
        }
      },
      "name": "Spreadsheet File",
      "type": "n8n-nodes-base.spreadsheetFile",
      "typeVersion": 1,
      "position": [
        900,
        200
      ]
    },
    {
      "parameters": {
        "functionCode": "// Code here will run only once, no matter how many input items there are.\n// More info and help: https://docs.polydocs.io/workflow/integrations/core-nodes/n8n-nodes-base.function\n// Tip: You can use luxon for dates and $jmespath for querying JSON structures\n\n// Loop over inputs and add a new field called 'myNewField' to the JSON of each one\n//for (item of items) {\n//  item.json.myNewField = 1;\n//}\n\n// You can write logs to the browser console\nconsole.log('Done!');\n\nreturn items[0].json.fields_compact;\n\n"
      },
      "name": "Function",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [
        640,
        200
      ]
    },
    {
      "parameters": {
        "options": {}
      },
      "name": "Spreadsheet File1",
      "type": "n8n-nodes-base.spreadsheetFile",
      "typeVersion": 1,
      "position": [
        1320,
        200
      ]
    },
    {
      "parameters": {
        "path": "/excel.xlsx",
        "binaryData": true
      },
      "name": "Dropbox",
      "type": "n8n-nodes-base.dropbox",
      "typeVersion": 1,
      "position": [
        1320,
        0
      ],
      "credentials": {
        "dropboxApi": {
          "id": "4",
          "name": "Dropbox account"
        }
      }
    }
  ],
  "connections": {
    "Status Trigger": {
      "main": [
        [
          {
            "node": "Function",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Start": {
      "main": [
        []
      ]
    },
    "Spreadsheet File": {
      "main": [
        [
          {
            "node": "Spreadsheet File1",
            "type": "main",
            "index": 0
          },
          {
            "node": "Dropbox",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Function": {
      "main": [
        [
          {
            "node": "Spreadsheet File",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Spreadsheet File1": {
      "main": [
        []
      ]
    }
  },
  "active": false,
  "settings": {},
  "id": 2
}

```
