# HTTP Request

The HTTP Request node is one of the most versatile nodes in n8n. It allows you to make HTTP requests to query data from apps and services.

!!! note "Credential"
    You can find authentication information for this node [here](/integrations/credentials/httpRequest/).


## Node Reference

- **Authentication:** there are two options for authentication:
	- Select **Existing Credential Type** to use predefined credential types. This allows you to perform custom operations with some APIs where n8n has a node for the platform. For example, n8n has an Asana node, and supports using your Asana credentials in the HTTP Request node. Refer to [Custom API operations](/integrations/custom-operations/) for more information.
	- Select **Generic Credential Type** to set up authentication using one of the following methods:
		- Basic Auth
		- Digest Auth
		- Header Auth
		- OAuth1
		- OAuth2
		- None
	
	!!! note "Use existing credential type when possible"
		n8n recommends using the **Existing credential type** option when it's available. It offers an easier way to set up and manage credentials, compared to configuring generic credentials.

- **Request Method:** Select the method to be used for the request:
	- DELETE
	- GET
	- HEAD
	- PATCH
	- POST
	- PUT
- **URL**: The full URL of the request.
- **Ignore SSL Issues**: Download the response even if SSL validation isn't possible.
- **Response Format**: Select the format in which the data gets returned from the URL. You can choose between File, JSON, and String.
- **JSON/RAW Parameters**: Whether to set the body/query parameter using the value-key pair UI (disabled) or JSON/RAW (enabled). When using JSON/RAW, the **Header** field requires a JSON object. Refer to [Examples - Create a JSON/RAW header object](#create-a-jsonraw-header-object) for more information.
- **Options**:
	- **Batch Interval**: The time (in milliseconds) between each batch of requests. Set to `0` to disable.
	- **Batch Size**: If set, n8n splits input in batches to throttle requests. Use `-1` to disable. n8n treats `0` as `1`.
	- **Full Response**: Retrieve the full response instead of just the body from the URL.
	- **Follow Redirect**: Follow any redirects with a status code `3xx`.
	- **Ignore Response Code**: Let the node execute even when the HTTP status code isn't 2xx.
	- **Proxy**: Specify an HTTP proxy that you may want to use.
	- **Split Into Items**: Flatten the node output as a simple array. See the [Examples](#examples) section to learn more.
	- **Timeout:** The maximum time (in ms) to wait for a response header from the server before aborting the request.
	- **Use Querystring**: Set this option to `true` if you need arrays serialized as `foo=bar&foo=baz` instead of the default `foo[0]=bar&foo[1]=baz`.
	- **Headers**: Specify any optional HTTP request headers you may want to include with your request.
	- **Query Parameters**: Specify any HTTP query parameters you may want to include with your request.

## Example usage

This workflow allows you to GET a sample list of users from [reqres.in](https://reqres.in/), add a new user using a POST request, and update the user using a PATCH request. You can also find the [workflow](https://n8n.io/workflows/602) on n8n.io. This example usage workflow uses the following nodes.

- [Start](/integrations/core-nodes/n8n-nodes-base.start/)
- [HTTP Request]()

The final workflow should look like the following image.

![A workflow with the HTTP Request node](/_images/integrations/core-nodes/httprequest/workflow.png)

### Step 1: Start node

The start node exists by default when you create a new workflow.


### Step 2: HTTP Request node (GET)

1. Enter `https://reqres.in/api/users` in the **URL** field.
2. Click on **Execute Node** to run the workflow.

![Get a list of sample users using the HTTP Request node](/_images/integrations/core-nodes/httprequest/httprequest_node.png)


### Step 3: HTTP Request1 node (POST)

1. Select **POST** from the **Request Method** dropdown list.
2. Enter `https://reqres.in/api/users` in the **URL** field.
3. Click on the **Add Parameter** button in the *Body Parameters* section.
4. Enter `name` in the **Name** field.
5. Enter `Neo` in the **Value** field.
6. Click on the **Add Parameter** button in the *Body Parameters* section.
7. Enter `job` in the **Name** field.
8. Enter `Programmer` in the **Value** field.
9. Click on **Execute Node** to run the workflow.

![Create a user using the HTTP Request node](/_images/integrations/core-nodes/httprequest/httprequest1_node.png)


### Step 4: HTTP Request2 node (PATCH)

1. Select **PATCH** from the **Request Method** dropdown list.
2. Enter `https://reqres.in/api/users/2` in the **URL** field.
3. Click on the **Add Parameter** button in the **Body Parameters** section.
4. Enter `name` in the **Name** field.
5. Enter `Neo` in the **Value** field.
6. Click on the **Add Parameter** button in the **Body Parameters** section.
7. Enter `job` in the **Name** field.
8. Enter `The Chosen One` in the **Value** field.
9. Click on **Execute Node** to run the workflow.

![Update a user using the HTTP Request node](/_images/integrations/core-nodes/httprequest/httprequest2_node.png)

## Examples

### Fetch a binary file from a URL

1. Enter the URL of the file in the **URL** field. For example, you can enter `https://n8n.io/n8n-logo.png` to fetch the n8n logo.
2. Select **File** from the **Response Format** dropdown list.
3. (Optional) Change the binary property value in the **Binary Property** field. Throughout the workflow, you can refer to the binary data with the value you set in this field.
4. Click on **Execute Node** to run the node.
5. After the node gets executed, click on the **Binary** tab.
6. Click on the **Show Binary Data** button to view the file.

### Send a binary file to an API endpoint

Depending on your use-case, you might want to send a binary file to an API endpoint. To do that, follow the steps mentioned below.

1. Connect the HTTP Request node with a node that has previously fetched the binary file. This node can be an HTTP Request node, [Read Binary File](/integrations/core-nodes/n8n-nodes-base.readBinaryFile/) node, [Google Drive](/integrations/nodes/n8n-nodes-base.googleDrive/) node or any such node.
2. Select **POST** from the **Request Method** dropdown list. Check the API documentation of your API to make sure that you have selected the correct HTTP request method.
3. Enter the URL where you want to send the binary file in the **URL** field.
4. Toggle **JSON/RAW Parameters** to `true`.
5. Toggle **Send Binary Data** to `true`.
6. Click on **Add Option** and select **Body Content Type** from the dropdown list.
7. Select **Form-Data Multipart** from the **Body Content Type** dropdown list.
8. If you are referring to the binary property with a different value, enter that value in the **Binary Property** field (name displayed in the binary tab after executing the previous node). To set a name for the form field, separate the field name with a colon, example `sendKey:binaryProperty`. If you want to send multiple files, separate them with comma, example: `sendKey1:binaryProperty1,sendKey2:binaryProperty2`
9. Click **Execute Node** to run the node.

Refer to this example [workflow](https://n8n.io/workflows/1338).

### Get the HTTP status code after an execution

1. Click on **Add Option** and select 'Full Response'.
2. Toggle **Full Response** to `true`.

When the node gets executed, you will receive the HTTP status code, the HTTP status message, and the header parameters.

### Send XML data

1. Toggle **JSON/RAW Parameters** to `true`.
2. Click on **Add Option** and select 'Body Content Type'.
3. Select **RAW/Custom** from the **Body Content Type** field.
4. Enter the XML data in the **Body** field.

### When to use the Split Into Items parameter

Not all incoming data has the [structure](/data/data-structure/) needed to allow nodes to [process](/data/data-structure/#data-flow) each individual item. With most nodes, you must use the Item List node to change data structure. The HTTP Request node allows you to do this automatically by enabling the **Split Into Items** parameter.

### Create a JSON/RAW header object

When you enable **JSON/RAW Parameters**, you must provide the **Headers** field as a JSON object. To do this, use the expressions editor to write the JSON.

For example, to send a header named "Example header", with a value of "Test value":

1. Open the expressions editor for the **Headers** field.
2. Enter the following expression:
	```js
	// Note the spacing between the opening expression brackets 
	// and the opening JSON brackets
	{{ {"Example header":"Test value"} }}
	```
3. Close the expressions editor to return to the node view. The header object is visible in the **Headers** field.

!!! warning "You must use the expressions editor"
	You must use the expressions editor to create your JSON object. Writing JSON directly in the **Headers** field is invalid.




