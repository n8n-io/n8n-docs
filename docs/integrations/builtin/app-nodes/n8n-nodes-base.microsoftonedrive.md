# Microsoft OneDrive

[Microsoft OneDrive](https://onedrive.live.com/) is a file hosting service and synchronization service operated by Microsoft.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/microsoft/).


## Operations

* File
    * Copy a file
    * Delete a file
    * Download a file
    * Get a file
    * Rename a file
    * Search a file
    * Share a file
    * Upload a file up to 4MB in size
* Folder
    * Create a folder
    * Delete a folder
    * Get Children (get items inside a folder)
    * Rename a folder
    * Search a folder
    * Share a folder

## Related resources


Refer to [Microsoft's OneDrive API documentation](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/){:target=_blank .external-link} for more information about the service.

View [example workflows and related content](https://n8n.io/integrations/microsoft-onedrive/){:target=_blank .external-link} on n8n's website.

## Find the folder ID

To perform operations on folders, you need to supply the ID. You can find this:

* In the URL of the folder
* By searching for it using the node. You need to do this if using MS 365 (where OneDrive uses Sharepoint behind the scenes):
	1. Select **Resource** > **Folder**.
	2. Select **Operation** > **Search**.
	3. In **Query**, enter the folder name.
	4. Select **Execute node**. n8n runs the query and returns data about the folder, including an `id` field containing the folder ID.
