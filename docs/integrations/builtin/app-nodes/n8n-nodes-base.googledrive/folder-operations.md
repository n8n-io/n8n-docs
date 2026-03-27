---
title: Google Drive Folder operations
description: Documentation for the Folder operations in Google Drive node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: high
---

# Google Drive Folder operations

Use this operation to create, delete, and share folders in Google Drive. Refer to [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/index.md) for more information on the Google Drive node itself.

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Create a folder

Use this operation to create a new folder in a drive.

Enter these parameters:
- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Create**.
- **Folder Name**: The name to use for the new folder.
- **Parent Drive**: Select **From list** to choose the drive from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
- **Parent Folder**: Select **From list** to choose the folder from the dropdown list, **By URL** to enter the URL of the folder, or **By ID** to enter the `folderId`. 

You can find the `driveId` and `folderID` by visiting the shared drive or folder in your browser and copying the last URL component: `https://drive.google.com/drive/u/1/folders/driveId`.

### Options

- **Simplify Output**: Choose whether to return a simplified version of the response instead of including all fields.
- **Folder Color**: The color of the folder as an RGB hex string.

Refer to the [Method: files.insert | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/insert) API documentation for more information.

## Delete a folder

Use this operation to delete a folder from a drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Delete**.
- **Folder**: Choose a folder you want to delete. 
    - Select **From list** to choose the folder from the dropdown list, **By URL** to enter the URL of the folder, or **By ID** to enter the `folderId`. 
    - You can find the `folderId` in a Google Drive folder URL: `https://drive.google.com/drive/u/0/folders/folderID`.

### Options

- **Delete Permanently**: Choose whether to delete the folder now instead of moving it to the trash.

Refer to the [Method: files.delete | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/delete) API documentation for more information.

## Share a folder

Use this operation to add sharing permissions to a folder.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Folder**.
- **Operation**: Select **Share**.
- **Folder**: Choose a file you want to move. 
    - Select **From list** to choose the folder from the dropdown list, **By URL** to enter the URL of the folder, or **By ID** to enter the `folderId`. 
    - You can find the `folderId` in a Google Drive folder URL: `https://drive.google.com/drive/u/0/folders/folderID`.
- **Permissions**: The permissions to add to the folder:
	- **Role**: Select what users can do with the folder. Can be one of **Commenter**, **File Organizer**, **Organizer**, **Owner**, **Reader**, **Writer**.
	- **Type**: Select the scope of the new permission:
		- **User**: Grant permission to a specific user, defined by entering their **Email Address**.
		- **Group**: Grant permission to a specific group, defined by entering its **Email Address**.
		- **Domain**: Grant permission to a complete domain, defined by the **Domain**.
		- **Anyone**: Grant permission to anyone. Can optionally **Allow File Discovery** to make the file discoverable through search.

### Options

- **Email Message**: A plain text custom message to include in the notification email.
<!-- vale from-microsoft.FirstPerson = NO -->
- **Move to New Owners Root**: Available when trying to transfer ownership while sharing an item not in a shared drive. When enabled, moves the folder to the new owner's My Drive root folder.
<!-- vale from-microsoft.FirstPerson = YES -->
- **Send Notification Email**: Whether to send a notification email when sharing to users or groups.
- **Transfer Ownership**: Whether to transfer ownership to the specified user and downgrade the current owner to writer permissions.
- **Use Domain Admin Access**: Whether to perform the action as a domain administrator.

Refer to the [REST Resources: files | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files) API documentation for more information.
