---
title: Email Import to DOC² 
description: This workflow searches for new e-mails in the configured sub-mailboxes of an e-mail address and uploads it to our DOC² system.
date: 2022-09-14
tags:
  - Workflow²
  - Email
  - Import
  - DOC²

---

#  Email Import to DOC²

This workflow searches for new e-mails in the configured sub-mailboxes of an e-mail address. When a new email is found, it receives the attachment and uploads it to our DOC² system.


![](/_images/example/email import/WF_email-import.png)


This workflow starts with a cronjob which can be configured as you want. To check for new emails this workflow uses the Gmail node. Before configuring it you have to create new credentials for OAuth2 API which you can find on [this](/workflow/integrations/credentials/google/) page. To download the attachment you have to deactivate the **Simplify** switcher and select from the Options dropdown **Download Attachments** (activate it) and **Attachment Prefix**. If you want to watch a specific Mailbox you have to select under Filters the **Label Names or IDs** option and choose the mailbox.

![](/_images/example/email import/WF_email-import_Mailbox1.png)

Before extracting the attachment to DOC² you have to add a custom Function. Just paste the following JavaScript code into it:

``` Javascript
for (item of items) {
  item.binary.data = item.binary.attachment_0;
  delete item.binary.attachment_0;
}

console.log('Done!', items);

return items;

```

Here is the complete workflow for you:


``` Javascript
{
    "meta": {
      "instanceId": "0a6a0e27589c939bf68273b85f2764bf176e24e8c6ceeff18fffa9c682f31c61"
    },
    "nodes": [
      {
        "parameters": {
          "triggerTimes": {
            "item": [
              {
                "mode": "everyX",
                "value": 1,
                "unit": "minutes"
              }
            ]
          }
        },
        "id": "e9005a67-296b-407c-8d42-c90d13783a86",
        "name": "Cron",
        "type": "n8n-nodes-base.cron",
        "typeVersion": 1,
        "position": [
          520,
          720
        ]
      },
      {
        "parameters": {
          "functionCode": "for (item of items) {\n  item.binary.data = item.binary.attachment_0;\n  delete item.binary.attachment_0;\n}\n\n// You can write logs to the browser console\nconsole.log('Done!', items);\n\nreturn items;"
        },
        "name": "Function 1",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [
          1340,
          360
        ],
        "id": "bc9ff5ad-76c7-400c-88a0-3606db71d093"
      },
      {
        "parameters": {
          "functionCode": "for (item of items) {\n  item.binary.data = item.binary.attachment_0;\n  delete item.binary.attachment_0;\n}\n\n// You can write logs to the browser console\nconsole.log('Done!', items);\n\nreturn items;"
        },
        "name": "Function 2",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [
          1340,
          720
        ],
        "id": "8c826c0c-a319-493a-b5f1-2b20eeb6a5cc"
      },
      {
        "parameters": {
          "functionCode": "for (item of items) {\n  item.binary.data = item.binary.attachment_0;\n  delete item.binary.attachment_0;\n}\n\n// You can write logs to the browser console\nconsole.log('Done!', items);\n\nreturn items;"
        },
        "name": "Function 3",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [
          1340,
          1060
        ],
        "id": "c372c618-34ad-4c54-8f41-3f3aad452960"
      },
      {
        "parameters": {
          "label": "={{$node[\"Mailbox 1\"].binary.attachment_0.fileName}}",
          "doc_type": "INVOICE",
          "importtype": "other"
        },
        "name": "Extract Invoice 1",
        "type": "n8n-nodes-base.extract",
        "typeVersion": 1,
        "position": [
          1660,
          360
        ],
        "id": "34e51cee-410c-4360-832f-918b7c065745",
        "credentials": {
          "Doc2AppApi": {
            "id": "19",
            "name": "Doc2App"
          }
        }
      },
      {
        "parameters": {
          "label": "={{$node[\"Mailbox 2\"].binary.attachment_0.fileName}}",
          "doc_type": "INVOICE",
          "importtype": "other"
        },
        "name": "Extract Invoice 2",
        "type": "n8n-nodes-base.extract",
        "typeVersion": 1,
        "position": [
          1660,
          720
        ],
        "id": "d63ba314-6872-4179-a2dd-beb3a9d1abf3",
        "credentials": {
          "Doc2AppApi": {
            "id": "19",
            "name": "Doc2App"
          }
        }
      },
      {
        "parameters": {
          "label": "={{$node[\"Mailbox 3\"].binary.attachment_0.fileName}}",
          "doc_type": "INVOICE",
          "importtype": "other"
        },
        "name": "Extract Invoice 3",
        "type": "n8n-nodes-base.extract",
        "typeVersion": 1,
        "position": [
          1660,
          1060
        ],
        "id": "06cea1b7-5911-4fa8-ad0e-5d8aab0c1216",
        "credentials": {
          "Doc2AppApi": {
            "id": "19",
            "name": "Doc2App"
          }
        }
      },
      {
        "parameters": {
          "operation": "getAll",
          "limit": 10,
          "simple": false,
          "filters": {
            "labelIds": [
              "CATEGORY_PERSONAL"
            ],
            "readStatus": "unread"
          },
          "options": {
            "dataPropertyAttachmentsPrefixName": "attachment_",
            "downloadAttachments": true
          }
        },
        "id": "4e9da720-1f8f-4517-aa74-dec4583b3b0f",
        "name": "Mailbox 1",
        "type": "n8n-nodes-base.gmail",
        "typeVersion": 2,
        "position": [
          880,
          360
        ],
        "alwaysOutputData": false,
        "credentials": {
          "gmailOAuth2": {
            "id": "20",
            "name": "Gmail account"
          }
        }
      },
      {
        "parameters": {
          "operation": "getAll",
          "limit": 10,
          "simple": false,
          "filters": {
            "labelIds": [
              "Label_2"
            ],
            "readStatus": "unread"
          },
          "options": {
            "dataPropertyAttachmentsPrefixName": "attachment_",
            "downloadAttachments": true
          }
        },
        "id": "3966af60-2210-42ce-8e62-7adc48a2a28a",
        "name": "Mailbox 2",
        "type": "n8n-nodes-base.gmail",
        "typeVersion": 2,
        "position": [
          880,
          720
        ],
        "alwaysOutputData": false,
        "credentials": {
          "gmailOAuth2": {
            "id": "20",
            "name": "Gmail account"
          }
        }
      },
      {
        "parameters": {
          "operation": "getAll",
          "limit": 10,
          "simple": false,
          "filters": {
            "labelIds": [
              "Label_3"
            ],
            "readStatus": "unread"
          },
          "options": {
            "dataPropertyAttachmentsPrefixName": "attachment_",
            "downloadAttachments": true
          }
        },
        "id": "14724003-69db-4705-8ead-27f463ebdd78",
        "name": "Mailbox 3",
        "type": "n8n-nodes-base.gmail",
        "typeVersion": 2,
        "position": [
          880,
          1060
        ],
        "alwaysOutputData": false,
        "credentials": {
          "gmailOAuth2": {
            "id": "20",
            "name": "Gmail account"
          }
        }
      },
      {
        "parameters": {
          "operation": "markAsRead",
          "messageId": "={{$node[\"Mailbox 1\"].json[\"id\"]}}"
        },
        "id": "41d06e96-1e2f-4d08-a8d3-2afe337a4025",
        "name": "Mark As Read 1",
        "type": "n8n-nodes-base.gmail",
        "typeVersion": 2,
        "position": [
          1080,
          200
        ],
        "credentials": {
          "gmailOAuth2": {
            "id": "20",
            "name": "Gmail account"
          }
        }
      },
      {
        "parameters": {
          "operation": "markAsRead",
          "messageId": "={{$node[\"Mailbox 2\"].json[\"id\"]}}"
        },
        "id": "149c1a57-818c-461a-83e0-a900109dd1f5",
        "name": "Mark As Read 2",
        "type": "n8n-nodes-base.gmail",
        "typeVersion": 2,
        "position": [
          1080,
          560
        ],
        "credentials": {
          "gmailOAuth2": {
            "id": "20",
            "name": "Gmail account"
          }
        }
      },
      {
        "parameters": {
          "operation": "markAsRead",
          "messageId": "={{$node[\"Mailbox 3\"].json[\"id\"]}}"
        },
        "id": "8c813f6d-0bee-4bfd-b558-2e8d72c525b9",
        "name": "Mark As Read 3",
        "type": "n8n-nodes-base.gmail",
        "typeVersion": 2,
        "position": [
          1080,
          900
        ],
        "credentials": {
          "gmailOAuth2": {
            "id": "20",
            "name": "Gmail account"
          }
        }
      }
    ],
    "connections": {
      "Cron": {
        "main": [
          [
            {
              "node": "Mailbox 1",
              "type": "main",
              "index": 0
            },
            {
              "node": "Mailbox 2",
              "type": "main",
              "index": 0
            },
            {
              "node": "Mailbox 3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Function 1": {
        "main": [
          [
            {
              "node": "Extract Invoice 1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Function 2": {
        "main": [
          [
            {
              "node": "Extract Invoice 2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Function 3": {
        "main": [
          [
            {
              "node": "Extract Invoice 3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Mailbox 1": {
        "main": [
          [
            {
              "node": "Function 1",
              "type": "main",
              "index": 0
            },
            {
              "node": "Mark As Read 1",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Mailbox 2": {
        "main": [
          [
            {
              "node": "Function 2",
              "type": "main",
              "index": 0
            },
            {
              "node": "Mark As Read 2",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Mailbox 3": {
        "main": [
          [
            {
              "node": "Function 3",
              "type": "main",
              "index": 0
            },
            {
              "node": "Mark As Read 3",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    }
  }

```