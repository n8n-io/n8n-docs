---
description: Endpoint reference for n8n's public REST API, generated from the OpenAPI specification.
contentType: reference
nodeTitle: Endpoint reference
originalFilePath: api/api-reference.md
originalUrl: 'https://docs.n8n.io/api/api-reference'
url: 'https://docs.n8n.io/connect/n8n-api/api-reference'
layout:
  description:
    visible: false
---

# Endpoint reference

This section is the complete endpoint reference for n8n's public REST API, generated from the OpenAPI specification. Use it to explore every available operation and view the parameters, request bodies, and response schemas.

{% hint style="info" %}
**Feature availability**

The n8n API isn't available during the free trial. Please upgrade to access this feature.
{% endhint %}

## Before you start

* **Authenticate**: every request needs an API key. Refer to [Authentication](authentication.md).
* **Set your base URL**:
    * n8n Cloud: `https://<your-instance>.app.n8n.cloud/api/v1`
    * Self-hosted: `https://<your-domain>/api/v1`
* **Paginate** large result sets. Refer to [Pagination](pagination.md).

## Browse the endpoints

The endpoints are grouped by resource in the left sidebar under **n8n API**: Workflow, Execution, Credential, User, Audit, Tags, Source Control, Variables, Data Table, Projects, and more. Each page documents that resource's operations and schemas.

{% hint style="info" %}
**Try the API safely**

To experiment with live calls, use the [built-in API playground](use-an-api-playground.md) (self-hosted n8n only), or point requests at a test workflow or test instance.
{% endhint %}
