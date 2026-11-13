---
title: Elastic Security credentials
description: >-
  Documentation for Elastic Security credentials. Use these credentials to
  authenticate Elastic Security in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Elastic Security credentials
originalFilePath: integrations/builtin/credentials/elasticsecurity.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/elasticsecurity'
url: 'https://docs.n8n.io/integrations/builtin/credentials/elasticsecurity'
layout:
  description:
    visible: false
---

# Elastic Security credentials <a href="#elastic-security-credentials" id="elastic-security-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Elastic Security](../app-nodes/n8n-nodes-base.elasticsecurity.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create an [Elastic Security](https://www.elastic.co/security) account.
- [Deploy](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html) an application.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth
- API Key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Elastic Security's documentation](https://www.elastic.co/guide/en/security/current/es-overview.html) for more information about the service.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need:

- A **Username**: For the user account you log into Elasticsearch with.
- A **Password**: For the user account you log into Elasticsearch with.
- Your Elasticsearch application's **Base URL** (also known as the Elasticsearch application endpoint):

    1. In Elasticsearch, select the option to **Manage this deployment**.
    2. In the **Applications** section, copy the endpoint of the **Elasticsearch** application.
    3. Add this in n8n as the **Base URL**.

{% hint style="info" %}
**Custom endpoint aliases**

If you add a [custom endpoint alias](https://www.elastic.co/guide/en/cloud/current/ec-regional-deployment-aliases.html) to a deployment, update your n8n credential **Base URL** with the new endpoint.
{% endhint %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: For the user account you log into Elasticsearch with. Refer to Elasticsearch's [Create API key documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-api-create-api-key.html) for more information.
- Your Elasticsearch application's **Base URL** (also known as the Elasticsearch application endpoint):

    1. In Elasticsearch, select the option to **Manage this deployment**.
    2. In the **Applications** section, copy the endpoint of the **Elasticsearch** application.
    3. Add this in n8n as the **Base URL**.
