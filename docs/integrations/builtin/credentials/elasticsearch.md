---
title: Elasticsearch credentials
description: Documentation for Elasticsearch credentials. Use these credentials to authenticate Elasticsearch in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Elasticsearch credentials

You can use these credentials to authenticate the following nodes:

- [Elasticsearch](/integrations/builtin/app-nodes/n8n-nodes-base.elasticsearch.md)

## Supported authentication methods

- Basic auth
- API-Key and Endpoint Authentication

You will need a **Base URL** (also known as the Elasticsearch endpoint) for either method. To find the endpoint:

1. In Elasticsearch, go to **Deployments**.
2. Select your deployment.
3. Select **Manage this deployment**.
4. In the **Applications** section, copy the endpoint of the **Elasticsearch** application.

## Related resources

Refer to [Elasticsearch's documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) for more information about the service.

## Using an API-Key and Endpoint (recommended)

To configure this credential, you'll need an [Elasticsearch](https://www.elastic.co/) account with a [deployment](https://www.elastic.co/docs/deploy-manage/deploy/elastic-cloud/create-an-organization) and:

- An [API Key](https://www.elastic.co/docs/deploy-manage/api-keys/elasticsearch-api-keys)
- Your Elasticsearch application's **Base URL**

To set up the credential:

1. Enter your Elasticsearch **Base URL**
2. Choose **API Key** as the Authentication type
3. Enter your Elasticsearch **API Key**
4. By default, n8n connects only if SSL certificate validation succeeds. If you'd like to connect even if SSL certificate validation fails, turn on **Ignore SSL Issues**.

## Using basic auth

To configure this credential, you'll need an [Elasticsearch](https://www.elastic.co/) account with a [deployment](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html) and:

- A **Username**
- A **Password**
- Your Elasticsearch application's **Base URL**

The basic auth method will **not** work with Elastic Serverless

To set up the credential:

1. Enter your Elasticsearch **Base URL**
2. Choose **Basic Auth** as the Authentication type
3. Enter your Elasticsearch **Username**.
4. Enter your Elasticsearch **Password**.
5. By default, n8n connects only if SSL certificate validation succeeds. If you'd like to connect even if SSL certificate validation fails, turn on **Ignore SSL Issues**.

/// note | Custom endpoint aliases
If you add a [custom endpoint alias](https://www.elastic.co/guide/en/cloud/current/ec-regional-deployment-aliases.html) to a deployment, update your n8n credential **Base URL** with the new endpoint.
///
