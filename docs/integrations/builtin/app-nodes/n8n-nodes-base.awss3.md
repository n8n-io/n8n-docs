# AWS S3

The AWS S3 node allows you to automate work in the AWS S3 platform and integrate AWS S3 with other applications. n8n has built-in support for a wide range of AWS S3 features, which includes basic operations like creating, getting, deleting, copying, uploading, and downloading folders, files, and buckets.

On this page, you'll find a list of operations the AWS S3 node supports and links to more resources.

!!! note "Credentials"
  Refer to the [AWS S3 credentials](https://docs.n8n.io/integrations/builtin/credentials/aws/) for guidance on setting up authentication. 

!!! note "Examples & Templates"
  For usage examples and templates to help you get started, take a look at n8n's [AWS S3 integrations](https://n8n.io/integrations/aws-s3/){:target=_blank .external-link} list.


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

## Example Usage

This workflow allows you to create a bucket on AWS S3. You can also find the [workflow](https://n8n.io/workflows/458) on the website. This example usage workflow would use the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [AWS S3]()

The final workflow should look like the following image.

![A workflow with the AWS S3 node](/_images/integrations/builtin/app-nodes/awss3/workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. AWS S3 node

1. First of all, you'll have to enter credentials for the AWS S3 node. You can find out how to do that [here](/integrations/builtin/credentials/aws/).
2. Select 'Bucket' from the *Resource* dropdown list.
3. Enter a name for your bucket in the *Name* field.
4. Click on *Execute Node* to run the workflow.




