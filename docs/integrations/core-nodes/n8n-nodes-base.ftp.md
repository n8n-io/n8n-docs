# FTP

The FTP node is useful to access and upload files to an FTP server.

!!! note "Credential"
    You can find authentication information for this node [here](/integrations/credentials/ftp/).


## Basic Operations

- Delete a file
- Download a file
- List contents of a folder
- Rename/move content from old path to new path
- Upload a file

**Note:** To attach a file for upload, you will need to use an additional node such as the [Read Binary File](/integrations/core-nodes/n8n-nodes-base.readBinaryFile/) node or the [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/) node to pass the file as a data property.

## Node Reference

- ***Protocol:*** A dropdown list to choose between the FTP or SFTP protocol.
- ***Path:*** A field used to specify the remote path that you would like to connect to.
- ***Recursive:*** A toggle that can be used to include all subdirectories and files.

## Example Usage

This workflow allows you to upload a file to an FTP server and get a list of all files using the FTP node. You can also find the [workflow](https://n8n.io/workflows/663) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/)
- [FTP]()

The final workflow should look like the following image.

![A workflow with the FTP node](/_images/integrations/core-nodes/ftp/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. HTTP Request node

1. Enter the URL of the file you want to download in the ***URL*** field.
2. Select ***File*** from the ***Response Format*** dropdown list.
3. Click on ***Execute Node*** to run the node.

![Downloading a file with the HTTP Request node](/_images/integrations/core-nodes/ftp/httprequest_node.png)

### 3. FTP node (ftp: upload)

1. First of all, you'll have to enter credentials for the FTP node. You can find out how to do that [here](/integrations/credentials/ftp/).
2. Select ***Upload*** from the ***Operation*** dropdown list.
3. Enter the path where you would like to upload the file in the ***Path*** field.
4. Click on ***Execute Node*** to run the node.

![Uploading a file with the FTP node](/_images/integrations/core-nodes/ftp/ftp_node.png)

### 4. FTP1 node (ftp: list)

1. Select the credentials that you entered in the previous node.
2. Select ***List*** from the ***Operation*** dropdown list.
3. Enter the path to the folder where you uploaded the file in the previous step in the ***Path*** field.
4. Click on ***Execute Node*** to run the node.

![Getting a list of files with the FTP node](/_images/integrations/core-nodes/ftp/ftp1_node.png)
