---
title: Upload files using GCS
description: 
tags:
  - Insight²
  - Examples
---

# Upload files using GCS

In this guide, we are going to create an interface to upload PDFs to Google Cloud Storage.

Before adding the new data source we will need to have a private key for our GCS bucket and make sure the key has the appropriate rights.

## Setting up Google Cloud Storage data source

1. Go to the data source manager on the left-sidebar and click on the `+` button.
2. Add a new GCS data source from the  **APIs** section in modal that pops up.
3. Enter the **JSON private key for service account** and test the connection.
4. Click on **Save** to add the data source.



![Insight² - How To - Upload files using GCS](/_images/insight2/how-to/upload-files-gcs/adding-account.png)


## Adding a file picker

1. Drag and drop the **file picker** widget on the canvas
2. Configure the file picker:
  - Change the **Accept file types** to `{{"application/pdf"}}` for the picker to accept only pdf files. In the screenshot below, we have set the accepted file type property to `{{"application/pdf"}}` so it will allow to select only pdf files:



![Insight² - How To - Upload files using GCS](/_images/insight2/how-to/upload-files-gcs/result-filepicker.png)



  - Change the **Max file count** to `{{1}}` as we are only going to upload 1 file at a time.

1. Select a pdf file and hold it in the file picker.


 File types must be valid **[MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)** type according to input element specification or a valid file extension.

 To accept any/all file type(s), set `Accept file types` to an empty value.




![Insight² - How To - Upload files using GCS](/_images/insight2/how-to/upload-files-gcs/config-filepicker.png)




## Creating a query

1. Click on the `+` button of the query manager at the bottom panel of the editor and select the GCS data source
2. Select **Upload file** operation and enter the required parameters:
- Bucket: `gs://test-1`
- File Name: `{{components.file1.file[0]['name']}}`
- Content Type: `{{components.file1.file[0]['type']}}`
- Upload data: `{{components.file1.file[0]['base64Data']}}`
- Enconding: `base64`
3. Click on **Save** to create the query

## Running the query
1. Add a **button** that will fire the query to upload the file
2. Edit the properties of the button and add a **event handler** to **Run the query** on **On-Click** event.
3. Click on **Button** to fire the query, this will upload the pdf file that you selected earlier through the file picker and will upload it on the GCS.



![Insight² - How To - Upload files using GCS](/_images/insight2/how-to/upload-files-gcs/final-result.png)


