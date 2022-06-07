---
title: Configuring Google Drive node
descpriton: Here we will check how to configure google drive node to export document from Doc2 to Google Drive
tags:
  - Workflow²
  - Example
  - Doc2Export
  - Google Drive

---

# Adding and Configuring **Google Drive** module

Add the **Google Drive** node to the workflow as described for the **Doc2StatusTrigger**

Select **OAuth2** for the Authentication method

![Doc2AppStatusTrigger Sample](/_images/example/gdrive/image16.png)

Click **Add New** for the Credentials for Google, it will open a dialog as shown below.

![Doc2AppStatusTrigger Sample](/_images/example/gdrive/image17.png)

Copy the OAuth Redirect URL and use this to create new google OAuth2.0 app as shown in the tutorial below

[Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en)

Copy the Client ID and Client Secret for newly created app and add it to the Google Drive account connection screen as show above

Select **File** for the Resource option and **Upload** as operation.

Set {{JSON.stringify($node["Status Trigger"].json)}} for the File Content

Set {{$node["Status Trigger"].json["filename"].replace('.pdf','.json') }} for the File Name.

Click execute Node and you should see output like below.

![Google Drive Node Success](/_images/example/gdrive/image18.png)

## Activate the workflow

Click **Execute Workflow** button on main screen and test by exporting another sample document.

![Final](/_images/example/gdrive/image19.png)