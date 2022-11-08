# Google Docs

[Google Docs](https://docs.google.com) is a web-based word processor that is part of Google's office software suite within its Google Drive service.

!!! note "Credentials"
    You can find authentication information for this node [here](/integrations/builtin/credentials/google/).


## Basic operations 

* Document
    * Create
    * Get
    * Update

## Example usage

This workflow allows you to create a new Google Doc and add your desired text to it. This example usage workflow uses the following nodes.
- [Start](/integrations/builtin/core-nodes/n8n-nodes-base.start/)
- [Google Docs]()

The final workflow should look like the following image.

![A workflow with the Google Docs node](/_images/integrations/builtin/app-nodes/googledocs/workflow.png)

### 1. Start node

The Start node exists by default when you create a new workflow.

### 2. Google Docs node - create

The **Document** resource is selected by default. Configure the remaining parameters as follows:

1. From the **Authentication** dropdown select your desired method and the corresponding [**Credentials**](/integrations/builtin/credentials/google/).
2. From the **Operation** dropdown select **Create**.
3. From the **Drive** dropdown select which of your drives this file will be created in. My Drive is selected by default.
4. From the **Folder** dropdown select which of you drive folders this file will be created in. The root folder (`/`) is selected by default.
5. In the **Title** field enter the name of your new Google Doc.

![Creating a file with the Google Docs node](/_images/integrations/builtin/app-nodes/googledocs/googledocs_node.png)

### 3. Google Docs node - update

The **Document** resource is selected by default. Configure the remaining parameters as follows:

1. From the **Operation** dropdown select **Update**.
2. In the **Doc ID or URL** field, enter the document ID or URL of the file created by the previous node.
3. From **Actions**, configure the fields as follows:
    - **Object:** Select the object of the action. Here we use 'Text'.
    - **Action:** Select the action to be performed on the object. Here we use 'Insert'.
    - **Insert Segment:** Select where in the document the action should be performed. Here we use 'Body'.
    - **Insert Location:** Select the location within the selected Segment. Here we use 'At end of specific location'.
    - **Text:** Enter the text to be inserted.

![Updating text in a file with the Google Docs node](/_images/integrations/builtin/app-nodes/googledocs/googledocs1_node.png)
