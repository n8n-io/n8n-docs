---
title: Google Drive File and Folder operations
description: >-
  Documentation for the File and Folder operations in Google Drive node in n8n,
  a workflow automation platform. Includes details of operations and
  configuration, and links to examples and credentials information.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Google Drive File and Folder operations
originalFilePath: >-
  integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-folder-operations.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-folder-operations
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/file-folder-operations
layout:
  description:
    visible: false
---

# Google Drive File and Folder operations <a href="#google-drive-file-and-folder-operations" id="google-drive-file-and-folder-operations"></a>

Use this operation to search for files and folders in Google Drive. Refer to [Google Drive](README.md) for more information on the Google Drive node itself.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

## Search files and folders <a href="#search-files-and-folders" id="search-files-and-folders"></a>

Use this operation to search for files and folders in a drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](../../credentials/google/README.md).
- **Resource**: Select **File/Folder**.
- **Operation**: Select **Search**.
- **Search Method**: Choose how you want to search:
	- **Search File/Folder Name**: Fill out the **Search Query** with the name of the file or folder you want to search for. Returns files and folders that are partial matches for the query as well.
	- **Advanced Search**: Fill out the **Query String** to search for files and folders using [Google query string syntax](https://developers.google.com/drive/api/guides/search-files).
- **Return All**: Choose whether to return all results or only up to a given limit.
- **Limit**: The maximum number of items to return when **Return All** is disabled.
- **Filter**: Choose whether to limit the scope of your search:
	- **Drive**: The drive you want to search in. By default, uses your personal "My Drive". Select **From list** to choose the drive from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
		- You can find the `driveId` by visiting the shared drive in your browser and copying the last URL component: `https://drive.google.com/drive/u/1/folders/driveId`.
	- **Folder**: The folder to search in. Select **From list** to choose the folder from the dropdown list, **By URL** to enter the URL of the folder, or **By ID** to enter the `folderId`. 
		- You can find the `folderId` by visiting the shared folder in your browser and copying the last URL component: `https://drive.google.com/drive/u/1/folders/folderId`.
	- **What to Search**: Whether to search for **Files and Folders**, **Files**, or **Folders**.
	- **Include Trashed Items**: Whether to also return items in the Drive's trash.


### Options <a href="#options" id="options"></a>

- **Fields**: Select the fields to return. Can be one or more of the following: **[All]**, **explicitlyTrashed**, **exportLinks**, **hasThumbnail**, **iconLink**, **ID**, **Kind**, **mimeType**, **Name**, **Permissions**, **Shared**, **Spaces**, **Starred**, **thumbnailLink**, **Trashed**, **Version**, or **webViewLink**.

Refer to the [Method: files.list | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/files/list) API documentation for more information.
