# S3

S3 is an object storage service that allows you to block public access to all of your objects at the bucket or the account level with S3 Block Public Access. S3 maintains compliance programs, such as PCI-DSS, HIPAA/HITECH, FedRAMP, EU Data Protection Directive, and FISMA, to help you meet regulatory requirements.

!!! note "🔑 Credentials"
    You can find authentication information for this node [here](/workflow/integrations/credentials/s3/).


## Basic Operations

* Bucket
    * Create a bucket
    * Delete a bucket
    * Get all buckets
    * Search within a bucket
* File
    * Copy a file
    * Delete a file
    * Download a file
    * Get all files
    * Upload a file
* Folder
    * Create a folder
    * Delete a folder
    * Get all folders

**Note:** To attach a file for upload, you will need to use an additional node such as the [Read Binary File](/workflow/integrations/core-nodes/n8n-nodes-base.readBinaryFile/) node or the [HTTP Request](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/) node to pass the file as a data property.

## Example Usage

This workflow allows you to upload a file to an S3 compatible server and get a list of all the files in a bucket using the S3 node. You can also find the [workflow](https://n8n.io/workflows/674) on Workflow².io. This example usage workflow would use the following nodes.
- [Start](/workflow/integrations/core-nodes/n8n-nodes-base.start/)
- [HTTP Request](/workflow/integrations/core-nodes/n8n-nodes-base.httpRequest/)
- [S3]()

The final workflow should look like the following image.

![A workflow with the S3 node](/_images/integrations/nodes/s3/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. HTTP Request node (GET)

1. Enter the URL of the file in the ***URL*** field.
2. Select 'File' from the ***Response Format*** field.
3. Click on ***Execute Node*** to run the node.

![Using the HTTP Request node to get a file](/_images/integrations/nodes/s3/httprequest_node.png)


### 3. S3 node (upload: file)

1. First of all, you'll have to enter credentials for the S3 node. You can find out how to do that [here](/workflow/integrations/credentials/s3/).
2. Select 'Upload' from the ***Operation*** dropdown list.
3. Enter the bucket name in the ***Bucket Name*** field.
4. Click on the gears icon next to the ***File Name*** field and click on ***Add Expression***.

5. Select the following in the ***Variable Selector*** section: Nodes > HTTP Request > Output Data > Binary > data > fileName. You can also add the following expression: `{{$node["HTTP Request"].binary.data.fileName}}`
6. Click on ***Execute Node*** to run the node.


![Using the S3 node to upload a file to a bucket](/_images/integrations/nodes/s3/s3_node.png)

### 4. S node (getAll: file)

1. Select the credentials that you entered in the previous node.
2. Select 'Get All' from the ***Operation*** dropdown list.
3. Enter the bucket name in the ***Bucket Name*** field.
4. Toggle ***Return All*** to true.
5. Click on ***Execute Node*** to run the node.

![Using the S3 node to get a list of all the files in a bucket](/_images/integrations/nodes/s3/s_node.png)

## FAQs

### Setting file permissions in Wasabi

When uploading files to [Wasabi](https://wasabi.com/), permissions for the files must be set using the **ACL** dropdown and not the toggles.

![File permissions when using the S3 node with Wasabi](/_images/integrations/nodes/s3/acl_dropdown.png)
