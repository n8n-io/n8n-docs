---
title: HTTP Request node documentation
description: >-
  Learn how to use the HTTP Request node in n8n. Follow technical documentation
  to integrate HTTP Request node into your workflows.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: n8n-nodes-base.httprequest
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest'
layout:
  description:
    visible: false
---

# HTTP Request node <a href="#http-request-node" id="http-request-node"></a>

The HTTP Request node is one of the most versatile nodes in n8n. It allows you to make HTTP requests to query data from any app or service with a REST API. You can use the HTTP Request node a regular node or attached to an [AI agent](../../cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent.md) to use as a [tool](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/how-tools-work){ data-preview }.

When using this node, you're creating a REST API call. You need some understanding of basic API terminology and concepts.

There are two ways to create an HTTP request: configure the [node parameters](#node-parameters) or [import a curl command](#import-curl-command).

{% hint style="info" %}
**Credentials**

Refer to [HTTP Request credentials](../../credentials/httprequest.md) for guidance on setting up authentication.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Method <a href="#method" id="method"></a>

Select the method to use for the request:

- DELETE
- GET
- HEAD
- OPTIONS
- PATCH
- POST
- PUT

### URL <a href="#url" id="url"></a>

Enter the endpoint you want to use.

### Authentication <a href="#authentication" id="authentication"></a>

n8n recommends using the **Predefined Credential Type** option when it's available. It offers an easier way to set up and manage credentials, compared to configuring generic credentials.

#### Predefined credentials <a href="#predefined-credentials" id="predefined-credentials"></a>

Credentials for integrations supported by n8n, including both built-in and community nodes. Use **Predefined Credential Type** for custom operations without extra setup. Refer to [Custom API operations](../../custom-api-actions-for-existing-nodes.md) for more information.

#### Generic credentials <a href="#generic-credentials" id="generic-credentials"></a>

Credentials for integrations not supported by n8n. You'll need to manually configure the authentication process, including specifying the required API endpoints, necessary parameters, and the authentication method. 

You can select one of the following methods:

* Basic auth
* Custom auth
* Digest auth
* Header auth
* OAuth1 API
* OAuth2 API
* Query auth

Refer to [HTTP request credentials](../../credentials/httprequest.md) for more information on setting up each credential type.

### Send Query Parameters <a href="#send-query-parameters" id="send-query-parameters"></a>

Query parameters act as filters on HTTP requests. If the API you're interacting with supports them and the request you're making needs a filter, turn this option on.

**Specify your query parameters** using one of the available options:

* **Using Fields Below**: Enter **Name**/**Value** pairs of **Query Parameters**. To enter more query parameter name/value pairs, select **Add Parameter**. The name is the name of the field you're filtering on, and the value is the filter value.
* **Using JSON**: Enter **JSON** to define your query parameters.

Refer to your service's API documentation for detailed guidance.

### Send Headers <a href="#send-headers" id="send-headers"></a>

Use this parameter to send headers with your request. Headers contain metadata or context about your request.

**Specify Headers** using one of the available options:

* **Using Fields Below**: Enter **Name**/**Value** pairs of **Header Parameters**. To enter more header parameter name/value pairs, select **Add Parameter**. The name is the header you wish to set, and the value is the value you want to pass for that header.
* **Using JSON**: Enter **JSON** to define your header parameters.

Refer to your service's API documentation for detailed guidance.

### Send Body <a href="#send-body" id="send-body"></a>

If you need to send a body with your API request, turn this option on.

Then select the **Body Content Type** that best matches the format for the body content you wish to send.


#### Form URLencoded <a href="#form-urlencoded" id="form-urlencoded"></a>


Use this option to send your body as `application/x-www-form-urlencoded`.

**Specify Body** using one of the available options:

* **Using Fields Below**: Enter **Name**/**Value** pairs of **Body Parameters**. To enter more body parameter name/value pairs, select **Add Parameter**. The name should be the form field name, and the value is what you wish to set that field to.
* **Using Single Field**: Enter your name/value pairs in a single **Body** parameter with format `fieldname1=value1&fieldname2=value2`.

Refer to your service's API documentation for detailed guidance.

#### Form-Data <a href="#form-data" id="form-data"></a>

Use this option to send your body as `multipart/form-data`.

Configure your **Body Parameters** by selecting the **Parameter Type**:

* Choose **Form Data** to enter **Name**/**Value** pairs.
* Choose **n8n Binary File** to pull the body from a file the node has access to.
    * **Name**: Enter the ID of the field to set.
    * **Input Data Field Name**: Enter the name of the incoming field containing the binary file data you want to process.

Select **Add Parameter** to enter more parameters.

Refer to your service's API documentation for detailed guidance.

#### JSON <a href="#json" id="json"></a>

Use this option to send your body as JSON.

**Specify Body** using one of the available options:

* **Using Fields Below**: Enter **Name**/**Value** pairs of **Body Parameters**. To enter more body parameter name/value pairs, select **Add Parameter**.
* **Using JSON**: Enter **JSON** to define your body.

Refer to your service's API documentation for detailed guidance.

#### n8n Binary File <a href="#n8n-binary-file" id="n8n-binary-file"></a>

Use this option to send the contents of a file stored in n8n as the body.

Enter the name of the incoming field that contains the file as the **Input Data Field Name**.

Refer to your service's API documentation for detailed guidance on how to format the file.

#### Raw <a href="#raw" id="raw"></a>

Use this option to send raw data in the body.

* **Content Type**: Enter the `Content-Type` header to use for the raw body content. Refer to the IANA [Media types](https://www.iana.org/assignments/media-types/media-types.xhtml) documentation for a full list of MIME content types.
* **Body**: Enter the raw body content to send.

Refer to your service's API documentation for detailed guidance.

## Node options <a href="#node-options" id="node-options"></a>

Select **Add Option** to view and select these options. Options are available to all parameters unless otherwise noted.

### Array Format in Query Parameters <a href="#array-format-in-query-parameters" id="array-format-in-query-parameters"></a>

{% hint style="info" %}
**Option availability**

This option is only available when you turn on **Send Query Parameters**.
{% endhint %}

Use this option to control the format for arrays included in query parameters. Choose from these options:

* **No Brackets**: Arrays will format as the name=value for each item in the array, for example: `foo=bar&foo=qux`.
* **Brackets Only**: The node adds square brackets after each array name, for example: `foo[]=bar&foo[]=qux`.
* **Brackets with Indices**: The node adds square brackets with an index value after each array name, for example: `foo[0]=bar&foo[1]=qux`.

Refer to your service's API documentation for guidance on which option to use.

### Batching <a href="#batching" id="batching"></a>

Control how to batch large numbers of input items:

* **Items per Batch**: Enter the number of input items to include in each batch.
* **Batch Interval**: Enter the time to wait between each batch of requests in milliseconds. Enter 0 for no batch interval.

### Ignore SSL Issues <a href="#ignore-ssl-issues" id="ignore-ssl-issues"></a>

By default, n8n only downloads the response if SSL certificate validation succeeds. If you'd like to download the response even if SSL certificate validation fails, turn this option on.

### Lowercase Headers <a href="#lowercase-headers" id="lowercase-headers"></a>

Choose whether to lowercase header names (turned on, default) or not (turned off).

### Redirects <a href="#redirects" id="redirects"></a>

Choose whether to follow redirects (turned on by default) or not (turned off). If turned on, enter the maximum number of redirects the request should follow in **Max Redirects**.

### Response <a href="#response" id="response"></a>

Use this option to set some details about the expected API response, including:

* **Include Response Headers and Status**: By default, the node returns only the body. Turn this option on to return the full response (headers and response status code) as well as the body.
* **Never Error**: By default, the node returns success only when the response returns with a 2xx code. Turn this option on to return success regardless of the code returned.
* **Response Format**: Select the format in which the data gets returned. Choose from:
    * **Autodetect** (default): The node detects and formats the response based on the data returned.
    * **File**: Select this option to put the response into a file. Enter the field name where you want the file returned in **Put Output in Field**.
    * **JSON**: Select this option to format the response as JSON.
    * **Text**: Select this option to format the response as plain text. Enter the field name where you want the file returned in **Put Output in Field**.

### Pagination <a href="#pagination" id="pagination"></a>

Use this option to paginate results, useful for handling query results that are too big for the API to return in a single call.

{% hint style="info" %}
**Inspect the API data first**

Some options for pagination require knowledge of the data returned by the API you're using. Before setting up pagination, either check the API documentation, or do an API call without pagination, to see the data it returns.
{% endhint %}
<details>

<summary>Understand pagination</summary>

Pagination means splitting a large set of data into multiple pages. The amount of data on each page depends on the limit you set.

For example, you make an API call to an endpoint called `/users`. The API wants to send back information on 300 users, but this is too much data for the API to send in one response. 

If the API supports pagination, you can incrementally fetch the data. To do this, you call `/users` with a pagination limit, and a page number or URL to tell the API which page to send. In this example, say you use a limit of 10, and start from page 0. The API sends the first 10 users in its response. You then call the API again, increasing the page number by 1, to get the next 10 results.

</details>

Configure the pagination settings:

* **Pagination Mode**:
    * **Off**: Turn off pagination.
    * **Update a Parameter in Each Request**: Use this when you need to dynamically set parameters for each request.
    * **Response Contains Next URL**: Use this when the API response includes the URL of the next page. Use an expression to set **Next URL**.

For example setups, refer to [HTTP Request node cookbook | Pagination](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/cookbook/http-request-node/pagination).

n8n provides built-in variables for working with HTTP node requests and responses when using pagination:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/I3wrw8MpZtbjn2khruiw/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/91KTZVqkKv8rY72iELNl/" %}

### Proxy <a href="#proxy" id="proxy"></a>

Use this option if you need to specify an HTTP proxy.

Enter the **Proxy** the request should use. This takes precedence over global settings defined with the [`HTTP_PROXY`, `HTTPS_PROXY`, or `ALL_PROXY` environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/deployment).

### Timeout <a href="#timeout" id="timeout"></a>

Use this option to set how long the node should wait for the server to send response headers (and start the response body). The node aborts requests that exceed this value for the initial response.

Enter the **Timeout** time to wait in milliseconds.

## Tool-only options <a href="#tool-only-options" id="tool-only-options"></a>

The following options are only available when attached to an [AI agent](../../cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent.md) as a [tool](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/how-tools-work){ data-preview }.

### Optimize Response <a href="#optimize-response" id="optimize-response"></a>

Whether to optimize the tool response to reduce the amount of data passed to the LLM. Optimizing the response can reduce costs and can help the LLM ignore unimportant details, often leading to better results.

When optimizing responses, you select an expected response type, which determines other options you can configure. The supported response types are:

#### JSON <a href="#json" id="json"></a>

When expecting a **JSON** response, you can configure which parts of the JSON data to use as a response with the following choices:

* **Field Containing Data**: This field identifies a specific part of the JSON object that contains your relevant data. You can leave this blank to use the entire response.
* **Include Fields**: This is how you choose which fields you want in your response object. There are three choices:
	* **All**: Include all fields in the response object.
	* **Selected**: Include only the fields specified below.
		* **Fields**: A comma-separated list of fields to include in the response. You can use dot notation to specify nested fields. You can drag fields from the Input panel to add them to the field list.
	* **Exclude**: Include all fields *except* the fields specified below.
		* **Fields**: A comma-separated list of fields to exclude from the response. You can use dot notation to specify nested fields. You can drag fields from the Input panel to add them to the field list.

#### HTML <a href="#html" id="html"></a>

When expecting **HTML**, you can identify the part of an HTML document relevant to the LLM and optimize the response with the following options:

* **Selector (CSS)**: A specific element or element type to include in the response HTML. Uses the `body` element by default.
* **Return Only Content**: Whether to strip HTML tags and attributes from the response, leaving only the actual content. This uses fewer tokens and may be easier for the model to understand.
	* **Elements To Omit**: A comma-separated list of CSS selectors to exclude when extracting content.
* **Truncate Response**: Whether to limit the response size to save tokens.
	* **Max Response Characters**: The maximum number of characters to include in the HTML response. The default value is 1000.

#### Text <a href="#text" id="text"></a>

When expecting a generic **Text** response, you can optimize the results with the following options:

* **Truncate Response**: Whether to limit the response size to save tokens.
	* **Max Response Characters**: The maximum number of characters to include in the HTML response. The default value is 1000.

## Import curl command <a href="#import-curl-command" id="import-curl-command"></a>

[curl](https://curl.se/) is a command line tool and library for transferring data with URLs.

You can use curl to call REST APIs. If the API documentation of the service you want to use provides curl examples, you can copy them out of the documentation and into n8n to configure the HTTP Request node.

Import a curl command:

{% hint style="info" %}
**Import format**

This option always imports any parameter values as strings. If you wish to preserve the type of numbers and booleans in your request, switch **Using Fields Below** to **Using JSON** and paste your JSON object containing the parameters.
{% endhint %}

1. From the HTTP Request node's **Parameters** tab, select **Import cURL**. The **Import cURL command** modal opens.
2. Paste your curl command into the text box.
3. Select **Import**. n8n loads the request configuration into the node fields. This overwrites any existing configuration.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse n8n-nodes-base.httprequest integration templates](https://n8n.io/integrations/http-request) or [search all templates](https://n8n.io/workflows/)

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common Issues](common-issues.md).
