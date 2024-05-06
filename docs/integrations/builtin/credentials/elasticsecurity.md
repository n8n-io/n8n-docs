---
title: Elastic Security credentials
description: Documentation for Elastic Security credentials. Use these credentials to authenticate Elastic Security in n8n, a workflow automation platform.
contentType: integration
---

# Elastic Security credentials

You can use these credentials to authenticate the following nodes:

- [Elastic Security](/integrations/builtin/app-nodes/n8n-nodes-base.elasticsecurity/)

## Prerequisites

- Create an [Elastic Security](https://www.elastic.co/security) account.
- [Deploy](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html) an application.

## Supported authentication methods

## Related resources

Refer to [Elastic Security's documentation](https://www.elastic.co/guide/en/security/current/es-overview.html){:target=_blank .external-link} for more information about the service.

## Using Basic Auth

To configure this credential, you'll need:

- A **Username**
- A **Password**
- Your Elasticsearch application's **Base URL** (also known as the Elasticsearch application endpoint)

Use the **Username** and **Password** you log into Elasticsearch with.

For the **Base URL**:

1. In Elasticsearch, select the option to **Manage this deployment**.
2. In the **Applications** section, copy the endpoint of the **Elasticsearch** application.
3. Add this in n8n as the **Base URL**.

/// note | Custom endpoint aliases
If you add a [custom endpoint alias](https://www.elastic.co/guide/en/cloud/current/ec-regional-deployment-aliases.html){:target=_blank .external-link} to a deployment, update your n8n credential **Base URL** with the new endpoint.
///

