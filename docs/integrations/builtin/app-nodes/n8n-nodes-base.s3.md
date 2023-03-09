# S3

The S3 node allows you to automate work in S3, and integrate S3 with other applications. n8n has built-in support for a wide range of S3 features, including creating, deleting, and getting buckets, files, and folders. 

On this page, you'll find a list of operations the S3 node supports and links to more resources.

!!! note "Credentials"
    Refer to [S3 credentials](https://docs.n8n.io/integrations/builtin/credentials/s3/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For usage examples and templates to help you get started, take a look at n8n's [S3 integrations](https://n8n.io/integrations/s3/){:target="_blank" .external-link} list.


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

**Note:** To attach a file for upload, you will need to use an additional node such as the [Read Binary File](/integrations/builtin/core-nodes/n8n-nodes-base.readbinaryfile/) node or the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the file as a data property.

## Example Usage

This workflow allows you to upload a file to an S3 compatible server and get a list of all the files in a bucket using the S3 node. You can also find the [workflow](https://n8n.io/workflows/674) on n8n.io. This example usage workflow would use the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)
- [S3]()

The final workflow should look like the following image.

![A workflow with the S3 node](/_images/integrations/builtin/app-nodes/s3/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. HTTP Request node (GET)

1. Enter the URL of the file in the ***URL*** field.
2. Select 'File' from the ***Response Format*** field.
3. Click on ***Execute Node*** to run the node.

![Using the HTTP Request node to get a file](/_images/integrations/builtin/app-nodes/s3/httprequest_node.png)


### 3. S3 node (upload: file)

1. First of all, you'll have to enter credentials for the S3 node. You can find out how to do that [here](/integrations/builtin/credentials/s3/).
2. Select 'Upload' from the ***Operation*** dropdown list.
3. Enter the bucket name in the ***Bucket Name*** field.
4. Click on the gears icon next to the ***File Name*** field and click on ***Add Expression***.

5. Select the following in the ***Variable Selector*** section: Nodes > HTTP Request > Output Data > Binary > data > fileName. You can also add the following expression: `{{$node["HTTP Request"].binary.data.fileName}}`
6. Click on ***Execute Node*** to run the node.


![Using the S3 node to upload a file to a bucket](/_images/integrations/builtin/app-nodes/s3/s3_node.png)

### 4. S node (getAll: file)

1. Select the credentials that you entered in the previous node.
2. Select 'Get All' from the ***Operation*** dropdown list.
3. Enter the bucket name in the ***Bucket Name*** field.
4. Toggle ***Return All*** to true.
5. Click on ***Execute Node*** to run the node.

![Using the S3 node to get a list of all the files in a bucket](/_images/integrations/builtin/app-nodes/s3/s_node.png)

## FAQs

### Setting file permissions in Wasabi

When uploading files to [Wasabi](https://wasabi.com/), permissions for the files must be set using the **ACL** dropdown and not the toggles.

![File permissions when using the S3 node with Wasabi](/_images/integrations/builtin/app-nodes/s3/acl_dropdown.png)
