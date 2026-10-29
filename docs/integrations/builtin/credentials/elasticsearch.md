---
title: Elasticsearch credentials
description: >-
  Documentation for Elasticsearch credentials. Use these credentials to
  authenticate Elasticsearch in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Elasticsearch credentials
originalFilePath: integrations/builtin/credentials/elasticsearch.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/elasticsearch'
url: 'https://docs.n8n.io/integrations/builtin/credentials/elasticsearch'
layout:
  description:
    visible: false
---

# Elasticsearch credentials <a href="#elasticsearch-credentials" id="elasticsearch-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Elasticsearch](../app-nodes/n8n-nodes-base.elasticsearch.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Elasticsearch's documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) for more information about the service.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need an [Elasticsearch](https://www.elastic.co/) account with a [deployment](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html) and:

- A **Username**
- A **Password**
- Your Elasticsearch application's **Base URL** (also known as the Elasticsearch application endpoint)

To set up the credential:

1. Enter your Elasticsearch **Username**.
2. Enter your Elasticsearch **Password**.
3. In Elasticsearch, go to **Deployments**.
4. Select your deployment.
5. Select **Manage this deployment**.
6. In the **Applications** section, copy the endpoint of the **Elasticsearch** application.
7. Enter this in n8n as the **Base URL**.
8. By default, n8n connects only if SSL certificate validation succeeds. If you'd like to connect even if SSL certificate validation fails, turn on **Ignore SSL Issues**.

{% hint style="info" %}
**Custom endpoint aliases**

If you add a [custom endpoint alias](https://www.elastic.co/guide/en/cloud/current/ec-regional-deployment-aliases.html) to a deployment, update your n8n credential **Base URL** with the new endpoint.
{% endhint %}
