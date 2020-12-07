---
permalink: /nodes/n8n-nodes-base.httpRequest
description: Learn how to use the HTTP Request node in n8n
---

# HTTP Request

The HTTP Request node is one of the most versatile nodes in n8n. It allows you to make HTTP requests which can be used to query data from apps and services.

## Node Reference

- **Authentication:** In this dropdown list, there are several authentication options to use with HTTP requests.
	- Basic Auth
	- Digest Auth
	- Header Auth
	- OAuth1
	- OAuth2
	- None
- **Request Method:** In this dropdown list, there are several methods that can be used to send different type of HTTP requests.
	- DELETE
	- GET
	- HEAD
	- PATCH
	- POST
	- PUT
- **URL:** This field is where the URL to request has to be entered.
- **Ignore SSL Issues:** This option can be used to download the response even if SSL validation is not possible.
- **Response Format:** Select the format in which the data gets returned from the URL. You can choose between File, JSON, and String.
- **JSON/RAW Parameters:** This option can be used to specify whether the body/query parameter should be set via the value-key pair UI or JSON/RAW.
- **Options**
	- **Full Response:** This option can be used to retrieve the full response instead of only the body from the URL.
	- **Follow Redirect:** This option can be used to follow any redirections with a status code 3xx.
	- **Ignore Response Code:** This option can be used to let the node execute even when the HTTP status code is not 2xx.
	- **Proxy:** This field is used to specify an HTTP proxy that you may want to use.
	- **Timeout:** The maximum time (in ms) to wait for a response header from the server before aborting the request.
	- **Headers:** This section is used to specify any optional HTTP request headers you may want to include with your request.
	- **Query Parameters:** This section is used to specify any HTTP query parameters you may want to include with your request.

## Example Usage

This workflow allows you to GET a sample list of users from [reqres.in](https://reqres.in/), add a new user using a POST request, and update the user using a PATCH request. You can also find the [workflow](https://n8n.io/workflows/602) on n8n.io. This example usage workflow uses the following nodes.
- [Start](../../core-nodes/Start/README.md)
- [HTTP Request]()

The final workflow should look like the following image.

![A workflow with the HTTP Request node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.


### 2. HTTP Request node (GET)

1. Enter `https://reqres.in/api/users` in the ***URL*** field.
2. Click on ***Execute Node*** to run the workflow.

![Get a list of sample users using the HTTP Request node](./HTTPRequest_node.png)


### 3. HTTP Request1 node (POST)

1. Select 'POST' from the ***Request Method*** dropdown list.
2. Enter `https://reqres.in/api/users` in the ***URL*** field.
3. Click on the ***Add Parameter*** button in the *Body Parameters* section.
4. Enter `name` in the ***Name*** field.
5. Enter `Neo` in the ***Value*** field.
6. Click on the ***Add Parameter*** button in the *Body Parameters* section.
7. Enter `job` in the ***Name*** field.
8. Enter `Programmer` in the ***Value*** field.
9. Click on ***Execute Node*** to run the workflow.

![Create a user using the HTTP Request node](./HTTPRequest1_node.png)


### 4. HTTP Request2 node (PATCH)

1. Select 'PATCH' from the ***Request Method*** dropdown list.
2. Enter `https://reqres.in/api/users/2` in the ***URL*** field.
3. Click on the ***Add Parameter*** button in the *Body Parameters* section.
4. Enter `name` in the ***Name*** field.
5. Enter `Neo` in the ***Value*** field.
6. Click on the ***Add Parameter*** button in the *Body Parameters* section.
7. Enter `job` in the ***Name*** field.
8. Enter `The Chosen One` in the ***Value*** field.
9. Click on ***Execute Node*** to run the workflow.

![Update a user using the HTTP Request node](./HTTPRequest2_node.png)

## FAQs

### 1. How to fetch a binary file from a URL?

To fetch a binary file with the HTTP Request node, follow the steps mentioned below.

1. Enter the URL of the file in the ***URL*** field. For example, you can enter `https://n8n.io/n8n-logo.png` to fetch the n8n logo.
2. Select 'File' from the ***Response Format*** dropdown list.
3. (Optional) Change the binary property value in the ***Binary Property*** field. Throughout the workflow, you can refer to the binary data with the value you set in this field.
4. Click on ***Execute Node*** to run the node.
5. After the node gets executed, click on the ***Binary*** tab.
6. Click on the ***Show Binary Data*** button to view the file.

### 2. How to send a binary file to an API endpoint?

Depending on your use-case, you might want to send a binary file to an API endpoint. To do that, follow the steps mentioned below.

1. Connect the HTTP Request node with a node that has previously fetched the binary file. This node can be an HTTP Request node, [Read Binary File](../ReadBinaryFile/README.md) node, [Google Drive](../../nodes/GoogleDrive/README.md) node or any such node.
2. Select 'POST' from the ***Request Method*** dropdown list.

**Note:** Refer to the API documentation of your API to make sure that you have selected the correct HTTP request method.

3. Enter the URL where you want to send the binary file in the ***URL*** field.
4. Toggle ***JSON/RAW Parameters*** to `true`.
5. Toggle ***Send Binary Data*** to `true`.
6. If you are referring to the binary property with a different value, enter that value in the ***Binary Property*** field.
7. Click on ***Add Option*** and select 'Body Content Type' from the dropdown list.
8. Select 'Form-Data Multipart' from the ***Body Content Type*** dropdown list.
9. Click on ***Execute Node*** to run the node.

### 3. How to get the HTTP status code after an execution?

To get the HTTP status code, follow the steps mentioned below.
1. Click on ***Add Option*** and select 'Full Response'.
2. Toggle ***Full Response*** to `true`.

When the node gets executed, you will receive the HTTP status code, the HTTP status message, and the header parameters.

### 4. How to send XML data?

To send XML data, follow the steps mentioned below.
1. Toggle ***JSON/RAW Parameters*** to `true`.
2. Click on ***Add Option*** and select 'Body Content Type'.
3. Select 'RAW/Custom' from the ***Body Content Type*** field.
4. Enter the XML data in the ***Body*** field.

## Further Reading

- [Creating scheduled text affirmations with n8n 🤟](https://medium.com/n8n-io/creating-scheduled-text-affirmations-with-n8n-1c4189efae19)
- [Cross-posting content automatically with n8n ✍️](https://medium.com/n8n-io/automating-cross-posting-blog-posts-using-n8n-%EF%B8%8F-af2a89601810)
- [HTTP Request Node — The Swiss Army Knife](https://medium.com/n8n-io/http-request-node-the-swiss-army-knife-b14e22283383)
- [Supercharging your conference registration process with n8n 🎫](https://medium.com/n8n-io/supercharging-your-conference-registration-process-with-n8n-2831cdff37f9)
