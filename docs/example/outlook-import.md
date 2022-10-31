---
title: Email Import with O365 to DOC²
description: This workflow searches for new e-mails in the configured sub-mailboxes of an e-mail address and uploads it to our DOC² system.
date: 2022-09-14
tags:
  - Workflow²
  - Email
  - Outlook
  - O365
  - Import
  - DOC²

---

##  Outlook Import to DOC² for certain sub-organizations

With the following workflow you can upload email attachments from specific folders to a specific sub-organization of your DOC² organization. This can be useful if you want to import invoices from your Outlook inbox but only want them to be visible to a specific sub-organization.

![](/_images/workflows/workflows/WF-outlook-import.png)

**1.** The `Interval` node is used to trigger the workflow to run at regular intervals of time.<br>
**2.** The `Microsoft getFolders` is an Outlook node that gets all the Folders in your Outlook Inbox.<br>
![](/_images/workflows/workflows/WF-outlook-import-get-folders.png)<br>
**3.** The `FunctionItem` is a node where you can specify the folders intended for your sub-organizations. These must have the same name as the folders in your Outlook.

``` Javascript
  checker = {
  '101_Polydocs':'',
  '102_Polydocs':''
	}

  mapping = {}

  item = $node["Microsoft getFolders"].json

  if (item.displayName in checker) {
    mapping[item.displayName]=item.id
  }

  return mapping;
```

**4.** The `IF` node checks if the folders entered in step 3 exist. If they exist and the name matches, the export continues. If the entered folder name does not exist, nothing happens.

**5.** The `SplitInBatches` node splits the list of folders down to single pieces to ensure that every Inbox gets checked after another.

   ![](/_images/workflows/workflows/WF-outlook-import-splitbatch.png)

**6.** The `Get unread messages` node searches for all unread messages.

   ![](/_images/workflows/workflows/WF-outlook-import-get-unread-messages.png)

**7.** The `IF` node will check if the `Get unread message` node found new messages and, if there are any, sends the information further.

   ![](/_images/workflows/workflows/WF-outlook-import-get-unread-messages.png)

**8.** First of all, you have to add your Microsoft account.<ins>Please follow these steps:</ins><br>
    8.1 Access the [Microsoft Application Registration Portal](https://aka.ms/appregistrations)<br>
    8.2 Click on the `+ New registration` button
        ![](/_images/workflows/workflows/WF-outlook-import-app-registrations-new.png)<br>
    8.3 Enter a name for your app in the `Name` field.<br>
    8.4 Select `Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal     Microsoft accounts (eg. Skype, Xbox)` under the **Supported account types** section.<br>
    8.5 Copy the `OAuth Callback URL` provided in the Microsoft node credentials in Workflow².<br>
    ![](/_images/workflows/workflows/WF-outlook-import-OAuth-redirect-url.png)
    8.6 Choose **Web** and paste it in the next field under the `Redirect URI (optional)` section.
        ![](/_images/workflows/workflows/WF-outlook-import-register-an-application.png)<br>
    8.7 Click on the `Register` button at the bottom left.<br>
    8.8 Copy the **Application (client) ID**.<br>
    8.9 Paste the Application ID in the `Client ID` field in the Microsoft node credentials in Workflow².
        ![](/_images/workflows/workflows/WF-outlook-import-microsoft-outlook-oauth2-api.png)<br>
    8.10 On your Microsoft application page, click on **Certificates & secrets** in the left sidebar.
        ![](/_images/workflows/workflows/WF-outlook-import-app-registrations-doc2.png)<br>
    8.11 Click on the `+ New client secret` button under the **Client secrets** section.
        ![](/_images/workflows/workflows/WF-outlook-import-certificates-and-secrets-new.png)<br>
    8.12 Enter a description in the **Description** field.<br>
	8.13 Click on the `Add` button.<br>
    8.14 Copy the displayed secret under the **Value** column.<br>
        ![](/_images/workflows/workflows/WF-outlook-import-certificates-and-secrets-value.png)<br>
    8.15 Paste the secret in the **Client Secret** field in the Microsoft node credentials in Workflow².
        ![](/_images/workflows/workflows/WF-outlook-import-microsoft-outlook-oauth2-api.png)<br>
    8.16 Click on the button in the OAuth section to connect a Microsoft account to Workflow².<br>
    8.17 Login to your Microsoft account and allow the app to access your info.<br>
    8.18 Click on the `Save` button in the Microsoft node credentials in DOC² to save your credentials.<br>

   Now the node is going to check for new unread emails that are in the folder from Step 2.

**9.** The `Get Attachments` node will extract all the attachments from the emails. First, you have to select the Microsoft account configured in step 3.1<br>

   ![](/_images/workflows/workflows/WF-outlook-import-get-attachments.png)

**10.** The `Mark message as read` node marks the emails that were checked in the steps above as read<br>
   ![](/_images/workflows/workflows/WF-outlook-import-mark-message-as-read.png)<br>
**11.** The `Download Attachments` node downloads the attachments from the emails in a temporary directory as a binary file<br>
   ![](/_images/workflows/workflows/WF-outlook-import-download-attachment.png)<br>

**12.** The `Upload Document` node uploads the saved attachments to DOC². You just have to specify what inbox, in this case 101_Polydocs and to what sub-organization it is supposed to be uploaded.<br>

![](/_images/workflows/workflows/WF-outlook-import-Doc-Upload.png)<br>

:fontawesome-solid-triangle-exclamation:{ style="color: #EE0F0F" }
**13.** Add the classification rules in DOC² so that the upload node knows where to upload the documents.

You can find this in the `Settings` under the menu item **Classification and Extraction** in the subitem `Document Processing`.

![](/_images/workflows/workflows/WF-outlook-import-doc2-settings.png)

![](/_images/workflows/workflows/WF-outlook-import-classification-rules.png)<br>

* For the `Pattern` enter your Outlook folder name, in this example **101_Polydocs**<br>
* For the `type` select **E-Mail**<br>
* For `Sub Organization` select the Sub-Organization where the documents should be uploaded.<br>
* You can choose any `document type` as the document type. Leave the field blank for each document type<br>


<ins>Here is the complete workflow for you to download:</ins>

<a href="/example/downloadables/Workflow_Outlook_Docs.json" download>Download</a>
