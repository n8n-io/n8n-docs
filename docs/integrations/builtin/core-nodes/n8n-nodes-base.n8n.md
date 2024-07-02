---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n
description: Documentation for the n8n node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# n8n

A node to integrate with n8n itself. This node allows you to consume the [n8n API](/api/) in your workflows.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [n8n integrations](https://n8n.io/integrations/n8n/){:target=_blank .external-link} page.
///

## Related resources

### Credentials

Refer to the [API authentication](/api/authentication/) documentation for guidance on getting your n8n credentials.

### Examples

Refer to the [n8n node on the website](https://n8n.io/integrations/n8n/) for a list of examples.

### SSL

This node doesn't support SSL. If your server requires an SSL connection, use the [HTTP Request node](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the [n8n API](/api/).
The HTTP Request node has options to [provide the SSL certificate](/integrations/builtin/credentials/httprequest/#provide-an-ssl-certificate).

## Operations

* Audit
	* Generate
* Credential
	* Create
	* Delete
	* Get Schema
* Execution
	* Get
	* Get Many
	* Delete
* Workflow
	* Activate
	* Create
	* Deactivate
	* Delete
	* Get
	* Get Many
	* Update

