---
title: API Calls
description: API integration provides functions and services that connect applications and processes. Here are examples of how to make API calls through api.polydocs.io.
date: "2022-10-26"
icons: material/api
tags:
  - DOC²
  - Settings
  - API Calls
  - api.polydocs.io
---

#### In this section you will find examples of different API Calls via [api.polydocs.io](https://api.polydocs.io/docs).

<ins>For each example, authentication is the first step</ins>

# Authentication

**1.** Open [api.polydocs.io](https://api.polydocs.io/docs)<br>
**2.** Click on **Authorize** in the upper right corner

![Picture](/_images/doc2/admin_guides_doc2-api-authorize.png){ loading=lazy }

**3.** Enter your [API Key](/doc2/settings/integration/api-integration/) and confirm by clicking `Authorize`

![Picture](/_images/doc2/admin_guides_doc2-api-authorize_key.png){ loading=lazy }




## Upload document

After completing steps **1.-3.**<br>
**4.** scroll down to 

![Picture](/_images/doc2/DOC2_API_POST_Process.png){ loading=lazy }

**5.** Open the tab and click on `Try it out` in the upper right corner to enter the following value

source:   **email:{Pattern name}**  

![Picture](/_images/doc2/DOC2_API_POST_document process.png){ loading=lazy }

 
**6.** Select the file you want to upload and click `Execute`

Your document will be uploaded to your dashboard with the rules you set in [DOC²](https://app.polydocs.io/settings/classify-extract)

![Picture](/_images/doc2/DOC2_classification-rules_Pattern.png){ loading=lazy }
![Picture](/_images/doc2/DOC2_Uploaded-doc-on-dashboard.png){ loading=lazy }


## Document Status

After completing steps **1.-3.**<br>
**4.** scroll down to

![Picture](/_images/doc2/DOC2_API_GET_Document-Status.png){ loading=lazy }

**5.** Open the tab and click on `Try it out` in the upper right corner to enter the following value

doc-id:   https://app.polydocs.io/2a/**9c931f6f-f352-4526-a78d-c036c39a8d9e**

You get the document id when you open the document on the dashboard. This is the last part of the URL when the document is open.

![Picture](/_images/doc2/DOC2_API_GET_Document-Status_doc_id.png){ loading=lazy }


You will receive the following response:

![Picture](/_images/doc2/DOC2_API_GET_Document-Status_Response.png){ loading=lazy }

**Ready For Validation** means that the user can check the document.

## Upload document with metadata

After completing steps **1.-3.**<br>
**4.** scroll down to one of these endpoints:<br>
 - /document/process_documents<br>
 - /document/process<br>
 - /document/process_base64<br>

Here we will upload a document to /document/process but the steps are the same for the other endpoints


**5.** Open the tab and click on `Try it out` in the upper right corner to enter the following value

1. Enter Metadata ![](/_images/doc2/metadata/metadata-upload.png)
   1. Metadata needs to be in a valid json format. [Json Validator](https://jsonlint.com/)<br>
      An example of a metadata entry would be:<br> 
      ```
     `{"custom-key": "the custom value", "custom_doc_id": "8a5cf33b-c923-4879-96ca-94d69965d508"}`
      ```
2. Select a file to upload ![](/_images/doc2/metadata/file-upload.png)
3. Click `Execute`
4. Wait for response. If the metadata field is not a valid json an error message will appear. ![Invalid Json response](/_images/doc2/metadata/invalid-json-response.png) If "success": true, then your document will be uploaded to your dashboard with the rules you set in [DOC²](https://app.polydocs.io/settings/classify-extract)



