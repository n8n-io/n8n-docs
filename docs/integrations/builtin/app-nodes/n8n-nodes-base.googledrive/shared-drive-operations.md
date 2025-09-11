---
title: Google Drive Shared Drive operations
description: Documentation for the Shared Drive operations in Google Drive node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: high
---

# Google Drive Shared Drive operations

Use this operation to create, delete, get, and update shared drives in Google Drive. Refer to [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/index.md) for more information on the Google Drive node itself.

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

## Create a shared drive

Use this operation to create a new shared drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Shared Drive**.
- **Operation**: Select **Create**.
- **Name**: The name to use for the new shared drive.

### Options

- **Capabilities**: The capabilities to set for the new shared drive (see [REST Resources: drives | Google Drive](https://developers.google.com/drive/api/reference/rest/v3/drives) for more details):
	- **Can Add Children**: Whether the current user can add children to folders in this shared drive.
	- **Can Change Copy Requires Writer Permission Restriction**: Whether the current user can change the `copyRequiresWriterPermission` restriction on this shared drive.
	- **Can Change Domain Users Only Restriction**: Whether the current user can change the `domainUsersOnly` restriction on this shared drive.
	- **Can Change Drive Background**: Whether the current user can change the background on this shared drive.
	- **Can Change Drive Members Only Restriction**: Whether the current user can change the `driveMembersOnly` restriction on this shared drive.
	- **Can Comment**: Whether the current user can comment on files in this shared drive.
	- **Can Copy**: Whether the current user can copy files in this shared drive.
	- **Can Delete Children**: Whether the current user can delete children from folders in this shared drive.
	- **Can Delete Drive**: Whether the current user can delete this shared drive. This operation may still fail if there are items not in the trash in the shared drive.
	- **Can Download**: Whether the current user can download files from this shared drive.
	- **Can Edit**: Whether the current user can edit files from this shared drive.
	- **Can List Children**: Whether the current user can list the children of folders in this shared drive.
	- **Can Manage Members**: Whether the current user can add, remove, or change the role of members of this shared drive.
	- **Can Read Revisions**: Whether the current user can read the revisions resource of files in this shared drive.
	- **Can Rename Drive**: Whether the current user can rename this shared drive.
	- **Can Share**: Whether the current user can share files or folders in this shared drive.
	- **Can Trash Children**: Whether the current user can trash children from folders in this shared drive.
- **Color RGB**: The color of this shared drive as an RGB hex string.
- **Hidden**: Whether to hide this shared drive in the default view.
- **Restrictions**: Restrictions to add to this shared drive (see [REST Resources: drives | Google Drive](https://developers.google.com/drive/api/reference/rest/v3/drives) for more details):
	- **Admin Managed Restrictions**: When enabled, restrictions here will override the similarly named fields to true for any file inside of this shared drive.
	- **Copy Requires Writer Permission**: Whether the options to copy, print, or download files inside this shared drive should be disabled for readers and commenters.
	- **Domain Users Only**: Whether to restrict access to this shared drive and items inside this shared drive to users of the domain to which this shared drive belongs.
	- **Drive Members Only**: Whether to restrict access to items inside this shared drive to its members.

Refer to the [Method: drives.insert | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/drives/insert) API documentation for more information.

## Delete a shared drive

Use this operation to delete a shared drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Shared Drive**.
- **Operation**: Select **Delete**.
- **Shared Drive**: Choose the shared drive want to delete. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
    - You can find the `driveId` in the URL for the shared Google Drive: `https://drive.google.com/drive/u/0/folders/driveID`.

Refer to the [Method: drives.delete | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/drives/delete) API documentation for more information.

## Get a shared drive

Use this operation to get a shared drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Shared Drive**.
- **Operation**: Select **Get**.
- **Shared Drive**: Choose the shared drive want to get. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
    - You can find the `driveId` in the URL for the shared Google Drive: `https://drive.google.com/drive/u/0/folders/driveID`.

### Options

- **Use Domain Admin Access**: Whether to issue the request as a domain administrator. When enabled, grants the requester access if they're an administrator of the domain to which the shared drive belongs.

Refer to the [Method: drives.get | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/drives/get) API documentation for more information.

<!-- vale from-write-good.Weasel = NO -->
## Get many shared drives

Use this operation to get many shared drives.
<!-- vale from-write-good.Weasel = YES -->

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Shared Drive**.
- **Operation**: Select **Get Many**.
- **Return All**: Choose whether to return all results or only up to a given limit.
- **Limit**: The maximum number of items to return when **Return All** is disabled.
- **Shared Drive**: Choose the shared drive want to get. 
    - Select **From list** to choose the title from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
    - You can find the `driveId` in the URL for the shared Google Drive: `https://drive.google.com/drive/u/0/folders/driveID`.

### Options

- **Query**: The query string to use to search for shared drives. See [Search for shared drives | Google Drive](https://developers.google.com/drive/api/guides/search-shareddrives) for more information.
- **Use Domain Admin Access**: Whether to issue the request as a domain administrator. When enabled, grants the requester access if they're an administrator of the domain to which the shared drive belongs.

Refer to the [Method: drives.get | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/drives/get) API documentation for more information.

## Update a shared drive

Use this operation to update a shared drive.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Drive credentials](/integrations/builtin/credentials/google/index.md).
- **Resource**: Select **Shared Drive**.
- **Operation**: Select **Update**.
- **Shared Drive**: Choose the shared drive you want to update. 
    - Select **From list** to choose the drive from the dropdown list, **By URL** to enter the URL of the drive, or **By ID** to enter the `driveId`. 
    - You can find the `driveId` in the URL for the shared Google Drive: `https://drive.google.com/drive/u/0/folders/driveID`.

### Update Fields

- **Color RGB**: The color of this shared drive as an RGB hex string.
- **Name**: The updated name for the shared drive.
- **Restrictions**: Restrictions for this shared drive (see [REST Resources: drives | Google Drive](https://developers.google.com/drive/api/reference/rest/v3/drives) for more details):
	- **Admin Managed Restrictions**: When enabled, restrictions here will override the similarly named fields to true for any file inside of this shared drive.
	- **Copy Requires Writer Permission**: Whether the options to copy, print, or download files inside this shared drive should be disabled for readers and commenters.
	- **Domain Users Only**: Whether to restrict access to this shared drive and items inside this shared drive to users of the domain to which this shared drive belongs.
	- **Drive Members Only**: Whether to restrict access to items inside this shared drive to its members.

Refer to the [Method: drives.update | Google Drive](https://developers.google.com/drive/api/reference/rest/v2/drives/update) API documentation for more information.
