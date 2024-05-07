---
title: Elasticsearch credentials
description: Documentation for Elasticsearch credentials. Use these credentials to authenticate Elasticsearch in n8n, a workflow automation platform.
contentType: integration
---

# Elasticsearch credentials

You can use these credentials to authenticate the following nodes:

- [Elasticsearch](/integrations/builtin/app-nodes/n8n-nodes-base.elasticsearch/)

## Prerequisites

- Create an [Elasticsearch](https://www.elastic.co/) account.
- [Deploy](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html) an application.

## Supported authentication methods

- Basic auth

## Related resources

Refer to [Elasticsearch's documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html){:target=_blank .external-link} for more information about the service.

## Using basic auth

To configure this credential, you'll need:

- A **Username**: For the user account you log into Elasticsearch with.
- A **Password**: For the user account you log into Elasticsearch with.
- Your Elasticsearch application's **Base URL** (also known as the Elasticsearch application endpoint):

    1. In Elasticsearch, select the option to **Manage this deployment**.
    2. In the **Applications** section, copy the endpoint of the **Elasticsearch** application.
    3. Add this in n8n as the **Base URL**.

/// note | Custom endpoint aliases
If you add a [custom endpoint alias](https://www.elastic.co/guide/en/cloud/current/ec-regional-deployment-aliases.html){:target=_blank .external-link} to a deployment, update your n8n credential **Base URL** with the new endpoint.
///
