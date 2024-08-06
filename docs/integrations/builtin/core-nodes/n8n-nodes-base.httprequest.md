---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: HTTP Request
description: Documentation for the HTTP Request node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
priority: critical
---

# HTTP Request

The HTTP Request node is one of the most versatile nodes in n8n. It allows you to make HTTP requests to query data from any app or service with a REST API.

When using this node, you're creating a REST API call. You need some understanding of basic API terminology and concepts.

There are two ways to create an HTTP request: configure the [node fields](#node-fields) or [import a curl command](#import-curl-command).

/// note | Credentials
Refer to [HTTP Request credentials](/integrations/builtin/credentials/httprequest/) for guidance on setting up authentication. 
///

## Node parameters

### Method

Select the method to use for the request:

- DELETE
- GET
- HEAD
- OPTIONS
- PATCH
- POST
- PUT

### URL

Enter the endpoint you want to use.

### Authentication

n8n recommends using the **Predefined Credential Type** option when it's available. It offers an easier way to set up and manage credentials, compared to configuring generic credentials.

#### Predefined credentials

Credentials for integrations supported by n8n, including both built-in and community nodes. Use **Predefined Credential Type** for custom operations without extra setup. Refer to [Custom API operations](/integrations/custom-operations/) for more information.


#### Generic credentials

Credentials for integrations not supported by n8n. You'll need to manually configure the authentication process, including specifying the required API endpoints, necessary parameters, and the authentication method. 

You can select one of the following methods:

* Basic auth
* Custom auth
* Digest auth
* Header auth
* OAuth1 API
* OAuth2 API
* Query auth


Refer to [HTTP request credentials](/integrations/builtin/credentials/httprequest/) for more information setting up each credential type.

### Parameters, headers, and body

You can choose to send extra information with your request. The data you need to send depends on the API you're interacting with, and the request you're making. Refer to your service's API documentation for detailed guidance.

* **Send Query Parameters**: include query parameters. Use query parameters as filters or searches on your query.
* **Send Headers**: include request headers. Headers contain metadata about your request.
* **Send Body**: send extra information in the body of your request.

## Node options

Select **Add Option** to view and select these options.

- **Batching**: control how to batch large numbers of input items.
- **Ignore SSL Issues**: download the response even if SSL validation isn't possible.
- **Redirects**: choose whether to follow redirects. Enabled by default.
- **Response**: provide settings about the expected API response.
- **Pagination**: handle query results that are too big for the API to return in a single call. Refer to [Pagination](#pagination) for more information.
- **Proxy**: use this if you need to specify an HTTP proxy.
- **Timeout**: set a timeout for the request.

### Pagination

Use this option to paginate results.

/// note | Inspect the API data first
Some options for pagination require knowledge of the data returned by the API you're using. Before setting up pagination, either check the API documentation, or do an API call without pagination, to see the data it returns.
///
??? Details "Understand pagination"
    Pagination means splitting a large set of data into multiple pages. The amount of data on each page depends on the limit you set.
  
    For example, you make an API call to an endpoint called `/users`. The API wants to send back information on 300 users, but this is too much data for the API to send in one response. 
  
    If the API supports pagination, you can incrementally fetch the data. To do this, you call `/users` with a pagination limit, and a page number or URL to tell the API which page to send. In this example, say you use a limit of 10, and start from page 0. The API sends the first 10 users in its response. You then call the API again, increasing the page number by 1, to get the next 10 results.

Configure the pagination settings:

* **Pagination Mode**:
	* **Off**: turn off pagination.
	* **Update a Parameter in Each Request**: use this when you need to dynamically set parameters for each request.
	* **Response Contains Next URL**: use this when the API response includes the URL of the next page. Use an expression to set **Next URL**.

For example setups, refer to [HTTP Request node cookbook | Pagination](/code/cookbook/http-node/pagination/).

n8n provides built-in variables for working with HTTP node requests and responses when using pagination:

--8<-- "_snippets/integrations/builtin/core-nodes/http/pagination-variables.md"

--8<-- "_snippets/integrations/builtin/core-nodes/http/pagination-api-differences.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'http-request') ]]

## Import curl command

[curl](https://curl.se/){:target=_blank .external-link} is a command line tool and library for transferring data with URLs.

You can use curl to call REST APIs. If the API documentation of the service you want to use provides curl examples, you can copy them out of the documentation and into n8n to configure the HTTP Request node.

Import a curl command:

1. Select **Import cURL command**.
2. Paste in your curl command.
3. Select **Import**. n8n loads the request configuration into the node fields. This overwrites any existing configuration.

## Ask AI to configure the HTTP node

From version 1.40.0, you can use AI to configure the node parameters:

1. Select **Ask AI**.
1. Enter the **Service** and **Request** you want to use. For example, to use the NASA API to get their picture of the day, enter `NASA` in **Service** and `get picture of the day` in **Request**.
1. Check the parameters: the AI tries to fill them out, but you may still need to adjust or correct the configuration.

For Cloud users, n8n provides a customized knowledge base of API specifications for the AI to draw on to provide good results. For services that aren't in the knowledge base, n8n falls back on OpenAI GPT-4's default knowledge. You can view the [list of services in the knowledge base](https://github.com/n8n-io/n8n/blob/master/packages/cli/src/services/ai/resources/api-knowledgebase.json){:target=_blank .external-link}.

Self-hosted users need to [enable AI features and provide their own API keys](/hosting/configuration/environment-variables/ai/). On self-hosted you don't have access to n8n's API specifications knowledge base, so all responses from the AI use OpenAI GPT-4's default knowledge.

