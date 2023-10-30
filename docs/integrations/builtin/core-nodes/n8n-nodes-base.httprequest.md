---
title: HTTP Request
description: Documentation for the HTTP Request node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# HTTP Request

The HTTP Request node is one of the most versatile nodes in n8n. It allows you to make HTTP requests to query data from any app or service with a REST API.

When using this node, you're creating a REST API call. You need some understanding of basic API terminology and concepts.

There are two ways to create an HTTP request: configure the [node fields](#node-fields) or [import a curl command](#import-curl-command).

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [HTTP Request integrations](https://n8n.io/integrations/http-request/){:target=_blank .external-link} page.

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

Select **Predefined Credential Type**. This allows you to perform custom operations, without additional authentication setup. For example, n8n has an Asana node, and supports using your Asana credentials in the HTTP Request node. Refer to [Custom API operations](/integrations/custom-operations/) for more information.

#### Generic credentials

Select **Generic Credential Type** to set up authentication using one of the following methods:

* Basic Auth
* Custom Auth
* Digest Auth
* Header Auth
* OAuth1 API
* OAuth2 API
* Query Auth

	
Refer to [HTTP request credentials](/integrations/builtin/credentials/httprequest/) for more information setting up each credential type.

### Parameters, headers, and body

You can choose to send additional information with your request. The data you need to send depends on the API you're interacting with, and the type of request you're making. Refer to your service's API documentation for detailed guidance.

* **Send Query Parameters**: include query parameters. Query parameters are usually used as filters or searches on your query.
* **Send Headers**: include request headers. Headers contain metadata about your request.
* **Send Body**: send additional information in the body of your request.


### Options

Select **Add Option** to view and select these options.

- **Batching**: control how to batch large responses.
- **Ignore SSL Issues**: download the response even if SSL validation isn't possible.
- **Redirects**: choose whether to follow redirects. Enabled by default.
- **Response**: provide settings about the expected API response.
- **Proxy**: use this if you need to specify an HTTP proxy.
- **Timeout**: set a timeout for the request.

## Import curl command

[curl](https://curl.se/){:target=_blank .external-link} is a command line tool and library for transferring data with URLs.

You can use curl to call REST APIs. If the API documentation of the service you want to use provides curl examples, you can copy them out of the documentation and into n8n to configure the HTTP Request node.

Import a curl command:

1. Select **Import cURL command**.
2. Paste in your curl command.
3. Select **Import**. n8n loads the request configuration into the node fields. This overwrites any existing configuration.



