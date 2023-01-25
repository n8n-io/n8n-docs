# Google Drive

Google Drive node allows you to automate work in the Google Drive platform and integrate Google Drive with other applications. n8n has built-in support for a wide range of Google Drive features, which includes basic operations like creating, updating, listing, deleting, and getting drives, files, and folders. 

On this page, you'll find a list of operations the Google Drive node supports and links to more resources.

!!! note "Credentials"
    Refer to the [Google Drive credentials](https://docs.n8n.io/integrations/builtin/credentials/google/) for guidance on setting up authentication. 

!!! note "Examples and templates"
    For example, usage and templates to help you get started, take a look at n8n's [Google Drive integrations](https://n8n.io/integrations/google-drive/){:target="_blank" .external-link} list.


## Basic Operations

* Drive
    * Create a drive
    * Delete a drive
    * Get a drive
    * List all drives
    * Update a drive
* File
    * Copy a file
    * Delete a file
    * Download a file
    * List files and folders
    * Share a file
    * Update a file
    * Upload a file
* Folder
    * Create a folder
    * Delete a folder
    * Share a folder

## Example Usage

This workflow allows you to download a file from Google Drive. You can also find the [workflow](https://n8n.io/workflows/515) on the website. This example usage workflow uses the following two nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Google Drive]()
- [Write Binary File](/integrations/builtin/core-nodes/n8n-nodes-base.writebinaryfile/)

The final workflow should look like the following image.

![A workflow with the Google Drive node](/_images/integrations/builtin/app-nodes/googledrive/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Google Sheets node

1. First of all, you'll have to enter credentials for the Google Drive node. You can find out how to do that [here](/integrations/builtin/credentials/google/), in the section 'Google Drive / Sheets API'.
2. Select the authentication method you plan to use from the *Authentication* dropdown list.
3. Select 'Download' from the *Operation* dropdown list.
4. Copy the string of characters located between `/d/` and `/edit` in your Google Drive URL. Paste that string in the *File ID* field.

### 3. Write Binary File node

1. Enter the destination file path in the *File Name* field.
2. Click on *Execute Node* to run the workflow.

## FAQs

### How do I list all files/folders within a folder?

To list all the files and folders within a folder, follow the steps mentioned below.

1. Toggle ***Use Query String*** to `true`.
2. Copy the string of characters located after `https://drive.google.com/drive/u/0/folders/`. This string is the folder ID.
3. Enter `'FOLDER_ID' in parents` in the ***Query String*** field. Replace `FOLDER_ID` with the folder ID you copied in the previous step.

There are several additional options available to fine grain the listed results. Refer to [Search for files and folders: Querystring](https://developers.google.com/drive/api/v3/search-files#query_string_examples) for more information.




