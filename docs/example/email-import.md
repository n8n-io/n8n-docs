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

This workflow searches for new e-mails in the configured sub-mailboxes of an e-mail address. When a new email is found, it receives the attachment and uploads it to DOC².


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

To extract the documents to DOC² you have to select the **Doc2App Upload Documents** node. To connect the node to your account you have to apply the API key. The documentation you can find on this page. 

![](/_images/example/email import/WF_Upload document.png)

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
      "id": "c65a6e6a-e05c-4164-ad3d-53f42b5389fb",
      "name": "Cron",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [
        500,
        700
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
        1320,
        340
      ],
      "id": "232c8e64-e643-44b9-a595-74fcc2672575"
    },
    {
      "parameters": {
        "functionCode": "for (item of items) {\n  item.binary.data = item.binary.attachment_0;\n  delete item.binary.attachment_0;\n}\n\n// You can write logs to the browser console\nconsole.log('Done!', items);\n\nreturn items;"
      },
      "name": "Function 2",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [
        1320,
        700
      ],
      "id": "b1736621-d62c-472c-a848-621bebc4ed2c"
    },
    {
      "parameters": {
        "functionCode": "for (item of items) {\n  item.binary.data = item.binary.attachment_0;\n  delete item.binary.attachment_0;\n}\n\n// You can write logs to the browser console\nconsole.log('Done!', items);\n\nreturn items;"
      },
      "name": "Function 3",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [
        1320,
        1040
      ],
      "id": "e8f3f5ca-1393-4770-97ee-6c4d66656be4"
    },
    {
      "parameters": {
        "operation": "getAll",
        "limit": 10,
        "simple": false,
        "filters": {
          "labelIds": [
            "Label_1"
          ],
          "readStatus": "unread"
        },
        "options": {
          "dataPropertyAttachmentsPrefixName": "attachment_",
          "downloadAttachments": true
        }
      },
      "id": "128dffe6-7b61-4ce5-80d1-78e791743708",
      "name": "Mailbox 1",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [
        860,
        340
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
      "id": "c5dda293-4e48-4a11-98b8-920fbd19efde",
      "name": "Mailbox 2",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [
        860,
        700
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
      "id": "b08c6f55-19bd-4a90-8187-bdb2fee95bc7",
      "name": "Mailbox 3",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [
        860,
        1040
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
      "id": "ce4e3b6e-4157-4ebe-ad2e-aefb4ded6a7a",
      "name": "Mark As Read 1",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [
        1060,
        180
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
      "id": "241ccb05-805d-44ce-8165-f5f35d5de686",
      "name": "Mark As Read 2",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [
        1060,
        540
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
      "id": "ed8301eb-d86d-439e-8586-3000b8b1d9f0",
      "name": "Mark As Read 3",
      "type": "n8n-nodes-base.gmail",
      "typeVersion": 2,
      "position": [
        1060,
        880
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
        "importtype": "other"
      },
      "id": "4ba2e931-7c49-442a-b1e2-07aa036c7357",
      "name": "Upload Document 1",
      "type": "n8n-nodes-base.upload",
      "typeVersion": 1,
      "position": [
        1640,
        340
      ],
      "credentials": {
        "Doc2AppApi": {
          "id": "19",
          "name": "Doc2App"
        }
      }
    },
    {
      "parameters": {
        "importtype": "other"
      },
      "id": "b213ed6a-9458-4622-9943-51c71da1ea4f",
      "name": "Upload Document 2",
      "type": "n8n-nodes-base.upload",
      "typeVersion": 1,
      "position": [
        1640,
        700
      ],
      "credentials": {
        "Doc2AppApi": {
          "id": "19",
          "name": "Doc2App"
        }
      }
    },
    {
      "parameters": {
        "importtype": "other"
      },
      "id": "81992b56-3fa2-4eec-98d3-00ea59c887d1",
      "name": "Upload Document 3",
      "type": "n8n-nodes-base.upload",
      "typeVersion": 1,
      "position": [
        1640,
        1040
      ],
      "credentials": {
        "Doc2AppApi": {
          "id": "19",
          "name": "Doc2App"
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
            "node": "Upload Document 1",
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
            "node": "Upload Document 2",
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
            "node": "Upload Document 3",
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