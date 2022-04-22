# Nextcloud

[Nextcloud](https://nextcloud.com/) is a free and open-source suite of client-server software for creating and using file hosting services.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/nextCloud/).


## Basic Operations

* File
    * Copy a file
    * Delete a file
    * Download a file
    * Move a file
    * Share a file
    * Upload a file
* Folder
    * Copy a folder
    * Create a folder
    * Delete a folder
    * Return the contents of a given folder
    * Move a folder
    * Share a folder
* User
    * Invite a user to a NextCloud organization
    * Delete a user.
    * Retrieve information about a single user.
    * Retrieve a list of users.
    * Edit attributes related to a user.

## Example Usage

This workflow allows you to create a folder in Nextcloud, upload a file into that folder, and list the contents of the folder. You can also find the [workflow](https://n8n.io/workflows/620) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [Nextcloud]()
- [HTTP Request](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/)

The final workflow should look like the following image.

![A workflow with the Nextcloud node](/_images/integrations/nodes/nextcloud/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Nextcloud node (create: folder)

1. First of all, you'll have to enter credentials for the Nextcloud node. You can find out how to do that [here](/workflow/integrations/credentials/nextCloud/).
2. Select the 'Folder' option from the ***Resource*** dropdown list.
3. Enter a folder name in the ***Folder*** field.
4. Click on ***Execute Node*** to run the node.

![Create a folder in Nextcloud using the Nextcloud node](/_images/integrations/nodes/nextcloud/nextcloud_node.png)

### 3. HTTP Request node (GET)

1. Enter `https://n8n.io/n8n-logo.png` in the ***URL*** field.
2. Select 'File' from the ***Response Format*** dropdown list.
3. Click on ***Execute Node*** to run the node.

![Get a file to upload in Nextcloud using the HTTP Request node](/_images/integrations/nodes/nextcloud/httprequest_node.png)

### 4. Nextcloud1 node (upload: file)

1. Select the credentials that you entered in the Nextcloud node.
2. Enter the path of the Nextcloud folder you created in the previous steps along with a file name in the ***File Path*** field.
3. Set the ***Binary Data*** toggle to true.
4. Click on ***Execute Node*** to run the node.

![Upload a file in Nextcloud using the Nextcloud node](/_images/integrations/nodes/nextcloud/nextcloud1_node.png)

### 5. Nextcloud2 node (list: folder)

1. Select the credentials that you entered in the Nextcloud node.
2. Select 'Folder' from the ***Resource*** dropdown list.
3. Select 'List' from the ***Operation*** dropdown list.
4. Enter the name of the Nextcloud folder you created in the previous steps in the ***Folder Path*** field.
5. Click on ***Execute Node*** to run the node.

![List the contents of a Nextcloud folder using the Nextcloud node](/_images/integrations/nodes/nextcloud/nextcloud2_node.png)
