---
title: Configuring Google Drive node
description: Here we will check how to configure google drive node to export document from DOC² to Google Drive
tags:
  - Workflow²
  - Example
  - DOC²Export
  - Google Drive

---

# Adding and Configuring **Google Drive** module

Add the **Google Drive** node to the workflow as described for the **Doc2StatusTrigger**

Select **OAuth2** for the Authentication method

![Doc2AppStatusTrigger Sample](/_images/example/gdrive/image16.png)

Click **Add New** for the Credentials for Google, it will open a dialog as shown below.

![Doc2AppStatusTrigger Sample](/_images/example/gdrive/image17.png)

Copy the **OAuth Redirect URL** and use this to create new google OAuth2.0 app as shown in the tutorial below.

[Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en)

![OAuth 2.0 (Screen 1)](/_images/example/gdrive/image20.png)

![OAuth 2.0 (Screen 2)](/_images/example/gdrive/image21.png)

![OAuth 2.0 (Screen 3)](/_images/example/gdrive/image22.png)

![OAuth 2.0 (Screen 4)](/_images/example/gdrive/image23.png)

Copy the **Client ID** and **Client Secret** for newly created oauth client and add it to the Google Drive module connection screen as show above

Select **File** for the Resource option and **Upload** as operation.

For the file content we will send the full extracted JSON returned from previous module.

To convert the json response to string we are going to use below expression for file content

```json
{{JSON.stringify($node["Status Trigger"].json)}}
```

For the filename we will extract the filename from json returned from previous module.

```json
{{$node["Status Trigger"].json["filename"].replace('.pdf','.json') }}
```

Click **Execute** button and you should see output like below.

![Google Drive Node Success](/_images/example/gdrive/image18.png)

This means that document has been uploaded to Google Drive successfully.
