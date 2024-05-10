---
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

Currently, this node don't have support to SSL, if your server have a SSL connection it can be used a combination of the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest) with the [Code node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code).
The HTTP Request node have Options to ignore SSL Issues or input the SSL credentials.
At the Code node, this python code retrives the json:
```
# example for retrive the "Workflow Get Many" endpoint data to json
data_list = _input.item.json["data"]
return data_list
```

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

