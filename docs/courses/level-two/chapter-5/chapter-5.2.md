# Workflow 2 – Generating reports

In this workflow, you will merge data from different sources, transform binary data, generate files, and send notifications about them. The final workflow should look like this:

<figure><img src="/_images/courses/level-two/chapter-five/workflow2.png" alt="" style="width:100%"><figcaption align = "center"><i>Workflow 2 for aggregating data and generating files</i></figcaption></figure>

To make things easier, let's split the workflow into three parts.

## Part 1 – Getting data

1. Use the *HTTP Request node* to get data from the API endpoint that stores company data. Configure the following node parameters:

      * Authentication: Header Auth
      * URL: https://internal.users.n8n.cloud/webhook/custom-erp
      * Options > Add Option > Split Into Items: toggle to true.
      * Headers > Add Header:
          * Name: unique_id
          * Value: your_unique_id

2. Use the *Airtable node* to list data from the `customers` table (where you updated the fields *region* and *subregion*).
3. Use the *Merge node* to merge data from the *Airtable* and *HTTP Request node*, based on the common key `customer ID`.

!!! question "Quiz questions"

    * What is the name of the employee assigned to customer 1?
    * What is the order status of customer 6?

## Part 2 – Transforming data

1. Use the *Items List node* to sort data by *orderPrice* in descending order.
2. Use the *Split In Batches node* to split the data into batches of 5.
3. Use the *Set node* to set four values, referenced with expressions from the previous node: *customerEmail*, *customerRegion*, *customerSince*, and *orderPrice*.
4. Use the *Date & Time node* to change the date format of the field *customerSince* to the format MM/DD/YYYY.
5. Use the *Move Binary node* to transform the incoming data from JSON to binary format. Note that you need to convert all data.

!!! question "Quiz questions"

    * What is the highest order price?
    * What is the lowest order price in the first batch of items?

## Part 3 – Generating files

9. Use the *Write Binary File node* to generate a PDF file.
10. Send the PDF file via email to an email address you have access to.
11. Use the *Discord node* to send a message in the n8n Discord channel `#course-level-two` with the Text: "I sent the PDF via email. My ID:" followed by your ID.


12. Use the *Spreadsheet File node* to create a spreadsheet with the file name set as the expression: `{{$runIndex > 0 ? 'file_low_orders':'file_high_orders'}}`.
13. Use the *Google Drive node* to upload the spreadsheet to Google Drive.
14. Use the *Discord node* to send a message in the n8n Discord channel `#course-level-two` with the Text: <br/>
    "I uploaded the spreadsheet with name `{file name}` and kind `{file kind}`. My ID:" followed by your ID. <br/>
	 Note that you need to replace the text in curly brackets `{}` with expressions that take the respective information from the *Google Drive node*.

!!! question "Quiz questions"

    * What is the formatted date assigned to customer 7?
    * How many emails with PDF files are sent?
