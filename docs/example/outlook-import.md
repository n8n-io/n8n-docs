---
title: Email Import to DOC² 
description: This workflow searches for new e-mails in the configured sub-mailboxes of an e-mail address and uploads it to our DOC² system.
date: 2022-09-14
tags:
  - Workflow²
  - Email
  - Outlook
  - Import
  - DOC²

---

#  Outlook Import to DOC²

With the following workflow you can upload the attachments from your outlook emails to DOC².

![](/_images/workflows/workflows/WF-outlook-import.png)

**1.** The `Interval` node is used to trigger the workflow to run at regular intervals of time<br>
**2.** The `Return Folder IDs` is a function node that you can customize as you want to. You have to enter your folder IDs from your Outlook account from where you want to get the attachments exported

  ``` Javascript
  return [{
    folder_id: ''
  }, {
    folder_id: ''
  }]

  ```

**3.** The `Get Unread Messages` checks for all the messages that are unread

   ![](/_images/workflows/workflows/WF-outlook-import-get-unread-messages.png)

**3.1** <ins>First of all, you have to add your Microsoft account. Please follow these steps:</ins><br>
    3.1.1 Access the [Microsoft Application Registration Portal](https://aka.ms/appregistrations)<br>
    3.1.2 Click on the `Register an application` button
        ![](/_images/workflows/workflows/WF-outlook-import-app-registrations-new.png)<br>
    3.1.3 Enter a name for your app in the `Name` field.<br>
    3.1.4 Select 'Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal     Microsoft accounts (eg. Skype, Xbox)' under the **Supported account types** section.<br>
    3.1.5 Copy the `OAuth Callback URL` provided in the Microsoft node credentials in Workflow².<br>
    3.1.6 Paste it in the `Redirect URI (optional)` field on the `Register an application` page.
        ![](/_images/workflows/workflows/WF-outlook-import-register-an-application.png)<br>
    3.1.7 Click on the `Register` button.<br>
    3.1.8 Copy the **Application (client) ID**.<br>
    3.1.9 Paste the Application ID in the `Client ID` field in the Microsoft node credentials in Workflow².
        ![](/_images/workflows/workflows/WF-outlook-import-microsoft-outlook-oauth2-api.png)<br>
    3.1.10 On your Microsoft application page, click on **Certificates & secrets** in the left sidebar.
        ![](/_images/workflows/workflows/WF-outlook-import-app-registrations-doc2.png)<br>
    3.1.11 Click on the `+ New client secret` button under the **Client secrets** section.
        ![](/_images/workflows/workflows/WF-outlook-import-certificates-and-secrets-new.png)<br>
    3.1.12 Enter a description in the **Description** field.<br>
    3.1.13 Click on the `Add` button.<br>
    3.1.14 Copy the displayed secret under the **Value** column.<br>
        ![](/_images/workflows/workflows/WF-outlook-import-certificates-and-secrets-value.png)<br>
    3.1.15 Paste the secret in the **Client Secret** field in the Microsoft node credentials in Workflow².
        ![](/_images/workflows/workflows/WF-outlook-import-microsoft-outlook-oauth2-api.png)<br>
    3.1.16 Click on the button in the OAuth section to connect a Microsoft account to Workflow².<br>
    3.1.17 Login to your Microsoft account and allow the app to access your info.<br>
    3.1.18 Click on the `Save` button in the Microsoft node credentials in DOC² to save your credentials.<br>

   Now the node is going to check for new unread emails that are in the folder from Step 2.

**4.** The `Get Attachments` node will extract all the attachments from the emails. First, you have to select the Microsoft account configured in step **3.1**<br>
        ![](/_images/workflows/workflows/WF-outlook-import-get-attachments.png)    
**5.** The `Mark message as read` node marks the emails that were checked in the steps above as read<br> 
   ![](/_images/workflows/workflows/WF-outlook-import-mark-message-as-read.png)<br> 
**6.** The `Download Attachments` node downloads the attachments from the emails in a temporary directory as a binary file<br>
   ![](/_images/workflows/workflows/WF-outlook-import-download-attachment.png)<br> 
**7.** The `Get Folder Name` node is a custom function that returns the name of the folders as we need it for the classification of the uploaded documents to DOC² in the next step. For this, you have to enter the folder IDs again from Step 2. and enter the name of the corresponding folders:

  ``` Javascript
  parent_folder_ids = {
    "": "Invoice",
    "": "Delivery Note"
  }

  if ($node["Get unread messages"].json["parentFolderId"]){
    folder_id =  $node["Get unread messages"].json["parentFolderId"];

    for (const [key, value] of Object.entries(parent_folder_ids)) {
      if (key == folder_id){
        item.inbox = value;
      }
    }

  }

  console.log('Done!');

  return item;

  ```

**8.** The `Upload Document` node uploads the saved attachments to DOC²
   ![](/_images/workflows/workflows/WF-outlook-import-upload-document.png)


<ins>Here is the complete workflow for you to download:</ins>

``` Script
{
  "meta": {
    "instanceId": "eb73f4ffdc88a336ed06723651bb7b7abb2d020a5b45cd3b91150b837f59c98c"
  },
  "nodes": [
    {
      "parameters": {
        "resource": "folderMessage",
        "operation": "getAll",
        "folderId": "={{$json[\"folder_id\"]}}",
        "additionalFields": {
          "filter": "isRead eq false"
        }
      },
      "name": "Get unread messages",
      "type": "n8n-nodes-base.microsoftOutlook",
      "typeVersion": 1,
      "position": [
        940,
        600
      ],
      "id": "23a77cf1-9f71-40e9-9ae9-f5417fe76421",
      "credentials": {
        "microsoftOutlookOAuth2Api": {
          "id": "11",
          "name": "Microsoft Outlook DocDemo"
        }
      }
    },
    {
      "parameters": {
        "operation": "update",
        "messageId": "={{ $json[\"id\"] }}",
        "updateFields": {
          "isRead": true
        }
      },
      "name": "Mark message as read",
      "type": "n8n-nodes-base.microsoftOutlook",
      "typeVersion": 1,
      "position": [
        1200,
        380
      ],
      "id": "9c2c6467-e6f4-4d89-ba81-6045a7ac63e6",
      "credentials": {
        "microsoftOutlookOAuth2Api": {
          "id": "11",
          "name": "Microsoft Outlook DocDemo"
        }
      }
    },
    {
      "parameters": {
        "interval": 60
      },
      "name": "Interval",
      "type": "n8n-nodes-base.interval",
      "typeVersion": 1,
      "position": [
        440,
        600
      ],
      "id": "88cf517a-035c-4bf1-993d-12133ee5ba6c"
    },
    {
      "parameters": {
        "functionCode": "return [{\n  folder_id: 'AQMkADU3MDE3NmZlLWU2YzItNGQ0OS05NWRiLTM0MmVkNzYzNTRjNgAuAAADu1RgjMDZp0WqTbb026ZmKQEAUH0YFZIcxE_bNey9i76OTQAAAo5hAAAA'\n}, {\n  folder_id: 'AQMkADU3MDE3NmZlLWU2YzItNGQ0OS05NWRiLTM0MmVkNzYzNTRjNgAuAAADu1RgjMDZp0WqTbb026ZmKQEAUH0YFZIcxE_bNey9i76OTQAAAo5sAAAA'\n}]"
      },
      "id": "471c6b80-d47a-47f4-9c82-1ef0352dcfb5",
      "name": "Return Folder IDs",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [
        700,
        600
      ]
    },
    {
      "parameters": {
        "label": "={{$node[\"Get Attachments\"].json[\"name\"]}}",
        "doc_type": "INVOICE",
        "importtype": "email",
        "address": "={{$node[\"Get unread messages\"].json[\"sender\"][\"emailAddress\"][\"address\"]}}",
        "inbox": "={{$json[\"inbox\"]}}"
      },
      "id": "30d39327-c9a8-4ed7-ad95-8da701d73dc5",
      "name": "Upload Document",
      "type": "n8n-nodes-base.upload",
      "typeVersion": 1,
      "position": [
        1920,
        600
      ],
      "credentials": {
        "Doc2AppApi": {
          "id": "12",
          "name": "Doc2App Lopi"
        }
      }
    },
    {
      "parameters": {
        "resource": "messageAttachment",
        "operation": "getAll",
        "messageId": "={{ $json[\"id\"] }}",
        "additionalFields": {}
      },
      "id": "589491a9-182a-4b14-bfa9-30af3365fc69",
      "name": "Get Attachments",
      "type": "n8n-nodes-base.microsoftOutlook",
      "typeVersion": 1,
      "position": [
        1200,
        600
      ],
      "credentials": {
        "microsoftOutlookOAuth2Api": {
          "id": "11",
          "name": "Microsoft Outlook DocDemo"
        }
      }
    },
    {
      "parameters": {
        "functionCode": "parent_folder_ids = {\n  \"AQMkADU3MDE3NmZlLWU2YzItNGQ0OS05NWRiLTM0MmVkNzYzNTRjNgAuAAADu1RgjMDZp0WqTbb026ZmKQEAUH0YFZIcxE_bNey9i76OTQAAAo5hAAAA\": \"Invoice\",\n  \"AQMkADU3MDE3NmZlLWU2YzItNGQ0OS05NWRiLTM0MmVkNzYzNTRjNgAuAAADu1RgjMDZp0WqTbb026ZmKQEAUH0YFZIcxE_bNey9i76OTQAAAo5sAAAA\": \"Delivery Note\"\n}\n\nif ($node[\"Get unread messages\"].json[\"parentFolderId\"]){\n  folder_id =  $node[\"Get unread messages\"].json[\"parentFolderId\"];\n\n  for (const [key, value] of Object.entries(parent_folder_ids)) {\n    if (key == folder_id){\n      item.inbox = value;\n    }\n  }\n\n}\n\nconsole.log('Done!');\n\nreturn item;"
      },
      "id": "5c966077-e271-4de9-b5d9-c1096e8181f2",
      "name": "Get Folder Name",
      "type": "n8n-nodes-base.functionItem",
      "typeVersion": 1,
      "position": [
        1680,
        600
      ]
    },
    {
      "parameters": {
        "resource": "messageAttachment",
        "operation": "download",
        "messageId": "={{ $node[\"Get unread messages\"].json[\"id\"] }}",
        "attachmentId": "={{$json[\"id\"]}}"
      },
      "id": "1a6c6c83-a29a-483e-9ee1-74141af17339",
      "name": "Download Attachment",
      "type": "n8n-nodes-base.microsoftOutlook",
      "typeVersion": 1,
      "position": [
        1440,
        600
      ],
      "credentials": {
        "microsoftOutlookOAuth2Api": {
          "id": "11",
          "name": "Microsoft Outlook DocDemo"
        }
      }
    }
  ],
  "connections": {
    "Get unread messages": {
      "main": [
        [
          {
            "node": "Mark message as read",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get Attachments",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Interval": {
      "main": [
        [
          {
            "node": "Return Folder IDs",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Return Folder IDs": {
      "main": [
        [
          {
            "node": "Get unread messages",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Attachments": {
      "main": [
        [
          {
            "node": "Download Attachment",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get Folder Name": {
      "main": [
        [
          {
            "node": "Upload Document",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Download Attachment": {
      "main": [
        [
          {
            "node": "Get Folder Name",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}

```