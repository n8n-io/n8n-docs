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

**5.** Open the tab and click on **Try it out** in the upper right corner to enter the following value

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

**5.** Open the tab and click on **Try it out** in the upper right corner to enter the following value

doc-id:   https://app.polydocs.io/2a/**4a2ed020-f471-43ca-937d-84df1fe53b0f**

![Picture](/_images/doc2/DOC2_API_GET_Document-Status_doc_id.png){ loading=lazy }





