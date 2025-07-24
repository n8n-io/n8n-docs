---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google Drive File operations
description: Documentation for the File operations in Google Drive node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: high
---

# Google Drive File operations

Use this operation to create, delete, change, and manage files in Google Drive. Refer to [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/index.md) for more information on the Google Drive node itself.

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Copy a file

Use this operation to copy a file to a drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **File**.
- **Operation**: Select **Copy**.
- **File**: Choose a file you want to copy. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the URL of the file, or **By ID** to enter the `fileId`. 
    - You can find the `fileId` in a shareable Google Drive file URL: `https://docs.google.com/document/d/fileId/edit#gid=0`. In your Google Drive, select **Share > Copy link** to get the shareable file URL.
- **File Name**: The name to use for the new copy of the file.
- **Copy In The Same Folder**: Choose whether to copy the file to the same folder. If disabled, set the following:
	- **Parent Drive**: Select **From list** to choose the drive from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
	- **Parent Folder**: Select **From list** to choose the folder from the dropdown list, **By URL** to enter the URL of the folder, or **By ID** to enter the `folderId`. 
	- You can find the `driveId` and `folderID` by visiting the shared drive or folder in your browser and copying the last URL component: `https://drive.google.com/drive/u/1/folders/driveId`.

### Options

- **Copy Requires Writer Permissions**: Select whether to enable readers and commenters to copy, print, or download the new file.
- **Description**: A short description of the file.

Refer to the [Method: files.copy | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/copy){:target=_blank .external-link} API documentation for more information.

## Create from text

Use this operation to create a new file in a drive from provided text.

Enter these parameters:
- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **File**.
- **Operation**: Select **Create From Text**.
- **File Content**: Enter the file content to use to create the new file.
- **File Name**: The name to use for the new file.
- **Parent Drive**: Select **From list** to choose the drive from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
- **Parent Folder**: Select **From list** to choose the folder from the dropdown list, **By URL** to enter the URL of the folder, or **By ID** to enter the `folderId`. 

You can find the `driveId` and `folderID` by visiting the shared drive or folder in your browser and copying the last URL component: `https://drive.google.com/drive/u/1/folders/driveId`.

### Options

- **APP Properties**: A bundle of arbitrary key-value pairs which are private to the requesting app.
- **Properties**: A bundle of arbitrary key-value pairs which are visible to all apps.
- **Keep Revision Forever**: Choose whether to set the `keepForever` field in the new head revision. This only applies to files with binary content. You can keep a maximum of 200 revisions, after which you must delete the pinned revisions.
<!-- vale from-microsoft.RangeFormat = NO -->
<!-- vale from-microsoft.Ranges = NO -->
- **OCR Language**: An [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code to help the OCR interpret the content during import.
<!-- vale from-microsoft.Ranges = YES -->
<!-- vale from-microsoft.RangeFormat = YES -->
- **Use Content As Indexable Text**: Choose whether to mark the uploaded content as indexable text.
- **Convert to Google Document**: Choose whether to create a Google Document instead of the default `.txt` format. You must enable the Google Docs API in the [Google API Console](https://console.cloud.google.com/apis/library/docs.googleapis.com) for this to work.

Refer to the [Method: files.insert | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/insert){:target=_blank .external-link} API documentation for more information.

## Delete a file

Use this operation to delete a file from a drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **File**.
- **Operation**: Select **Delete**.
- **File**: Choose a file you want to delete. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the URL of the file, or **By ID** to enter the `fileId`. 
    - You can find the `fileId` in a shareable Google Drive file URL: `https://docs.google.com/document/d/fileId/edit#gid=0`. In your Google Drive, select **Share > Copy link** to get the shareable file URL.

### Options

- **Delete Permanently**: Choose whether to delete the file now instead of moving it to the trash.

Refer to the [Method: files.delete | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/delete){:target=_blank .external-link} API documentation for more information.

## Download a file

Use this operation to download a file from a drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **File**.
- **Operation**: Select **Download**.
- **File**: Choose a file you want to download. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the URL of the file, or **By ID** to enter the `fileId`. 
    - You can find the `fileId` in a shareable Google Drive file URL: `https://docs.google.com/document/d/fileId/edit#gid=0`. In your Google Drive, select **Share > Copy link** to get the shareable file URL.

### Options

- **Put Output File in Field**: Choose the field name to place the binary file contents to make it available to following nodes.
- **Google File Conversion**: Choose the formats to export as when downloading Google Files:
	* **Google Docs**: Choose the export format to use when downloading Google Docs files:  **HTML**, **MS Word Document**, **Open Office Document**, **PDF**, **Rich Text (rtf)**, or **Text (txt)**.
	* **Google Drawings**: Choose the export format to use when downloading Google Drawing files: **JPEG**, **PDF**, **PNG**, or **SVG**.
	* **Google Slides**: Choose the export format to use when downloading Google Slides files: **MS PowerPoint**, **OpenOffice Presentation**, or **PDF**.
	* **Google Sheets**: Choose the export format to use when downloading Google Sheets files: **CSV**, **MS Excel**, **Open Office Sheet**, or **PDF**.
- **File Name**: The name to use for the downloaded file.

Refer to the [Method: files.get | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/get){:target=_blank .external-link} API documentation for more information.

## Move a file

Use this operation to move a file to a different location in a drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **File**.
- **Operation**: Select **Move**.
- **File**: Choose a file you want to move. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the URL of the file, or **By ID** to enter the `fileId`. 
    - You can find the `fileId` in a shareable Google Drive file URL: `https://docs.google.com/document/d/fileId/edit#gid=0`. In your Google Drive, select **Share > Copy link** to get the shareable file URL.
- **Parent Drive**: Select **From list** to choose the drive from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
- **Parent Folder**: Select **From list** to choose the folder from the dropdown list, **By URL** to enter the URL of the folder, or **By ID** to enter the `folderId`. 

You can find the `driveId` and `folderID` by visiting the shared drive or folder in your browser and copying the last URL component: `https://drive.google.com/drive/u/1/folders/driveId`.

Refer to the [Method: parents.insert | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/parents/insert){:target=_blank .external-link} API documentation for more information.

## Share a file

Use this operation to add sharing permissions to a file.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **File**.
- **Operation**: Select **Share**.
- **File**: Choose a file you want to share. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the URL of the file, or **By ID** to enter the `fileId`. 
    - You can find the `fileId` in a shareable Google Drive file URL: `https://docs.google.com/document/d/fileId/edit#gid=0`. In your Google Drive, select **Share > Copy link** to get the shareable file URL.
- **Permissions**: The permissions to add to the file:
	- **Role**: Select what users can do with the file. Can be one of **Commenter**, **File Organizer**, **Organizer**, **Owner**, **Reader**, **Writer**.
	- **Type**: Select the scope of the new permission:
		- **User**: Grant permission to a specific user, defined by entering their **Email Address**.
		- **Group**: Grant permission to a specific group, defined by entering its **Email Address**.
		- **Domain**: Grant permission to a complete domain, defined by the **Domain**.
		- **Anyone**: Grant permission to anyone. Can optionally **Allow File Discovery** to make the file discoverable through search.

### Options

- **Email Message**: A plain text custom message to include in the notification email.
<!-- vale from-microsoft.FirstPerson = NO -->
- **Move to New Owners Root**: Available when trying to transfer ownership while sharing an item not in a shared drive. When enabled, moves the file to the new owner's My Drive root folder.
<!-- vale from-microsoft.FirstPerson = YES -->
- **Send Notification Email**: Whether to send a notification email when sharing to users or groups.
- **Transfer Ownership**: Whether to transfer ownership to the specified user and downgrade the current owner to writer permissions.
- **Use Domain Admin Access**: Whether to perform the action as a domain administrator.

Refer to the [REST Resources: files | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files){:target=_blank .external-link} API documentation for more information.

## Update a file

Use this operation to update a file.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **File**.
- **Operation**: Select **Update**.
- **File to Update**: Choose a file you want to update. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the URL of the file, or **By ID** to enter the `fileId`. 
    - You can find the `fileId` in a shareable Google Drive file URL: `https://docs.google.com/document/d/fileId/edit#gid=0`. In your Google Drive, select **Share > Copy link** to get the shareable file URL.
- **Change File Content**: Choose whether to send new binary data to replace the existing file content. If enabled, fill in the following:
	- **Input Data Field Name**: The name of the input field that contains the binary file data you wish to use.
- **New Updated File Name**: A new name for the file if you want to update the filename.

### Options

- **APP Properties**: A bundle of arbitrary key-value pairs which are private to the requesting app.
- **Properties**: A bundle of arbitrary key-value pairs which are visible to all apps.
- **Keep Revision Forever**: Choose whether to set the `keepForever` field in the new head revision. This only applies to files with binary content. You can keep a maximum of 200 revisions, after which you must delete the pinned revisions.
<!-- vale from-microsoft.RangeFormat = NO -->
<!-- vale from-microsoft.Ranges = NO -->
- **OCR Language**: An [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code to help the OCR interpret the content during import.
<!-- vale from-microsoft.Ranges = YES -->
<!-- vale from-microsoft.RangeFormat = YES -->
- **Use Content As Indexable Text**: Choose whether to mark the uploaded content as indexable text.
- **Move to Trash**: Whether to move the file to the trash. Only possible for the file owner.
- **Return Fields**: Return metadata fields about the file. Can be one or more of the following: **[All]**, **explicitlyTrashed**, **exportLinks**, **hasThumbnail**, **iconLink**, **ID**, **Kind**, **mimeType**, **Name**, **Permissions**, **Shared**, **Spaces**, **Starred**, **thumbnailLink**, **Trashed**, **Version**, or **webViewLink**.

Refer to the [Method: files.update | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/update){:target=_blank .external-link} API documentation for more information.

## Upload a file

Use this operation to upload a file.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **File**.
- **Operation**: Select **Upload**.
- **Input Data Field Name**: The name of the input field that contains the binary file data you wish to use.
- **File Name**: The name to use for the new file.
- **Parent Drive**: Select **From list** to choose the drive from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
- **Parent Folder**: Select **From list** to choose the folder from the dropdown list, **By URL** to enter the URL of the folder, or **By ID** to enter the `folderId`. 

You can find the `driveId` and `folderID` by visiting the shared drive or folder in your browser and copying the last URL component: `https://drive.google.com/drive/u/1/folders/driveId`.

### Options

- **APP Properties**: A bundle of arbitrary key-value pairs which are private to the requesting app.
- **Properties**: A bundle of arbitrary key-value pairs which are visible to all apps.
- **Keep Revision Forever**: Choose whether to set the `keepForever` field in the new head revision. This only applies to files with binary content. You can keep a maximum of 200 revisions, after which you must delete the pinned revisions.
<!-- vale from-microsoft.RangeFormat = NO -->
<!-- vale from-microsoft.Ranges = NO -->
- **OCR Language**: An [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) language code to help the OCR interpret the content during import.
<!-- vale from-microsoft.Ranges = YES -->
<!-- vale from-microsoft.RangeFormat = YES -->
- **Use Content As Indexable Text**: Choose whether to mark the uploaded content as indexable text.
- **Simplify Output**: Choose whether to return a simplified version of the response instead of including all fields.

Refer to the [Method: files.insert | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/insert){:target=_blank .external-link} API documentation for more information.
