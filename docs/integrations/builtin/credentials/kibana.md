---
title: Kibana credentials
description: >-
  Documentation for the Kibana credentials. Use these credentials to
  authenticate Kibana in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Kibana credentials
originalFilePath: integrations/builtin/credentials/kibana.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/kibana'
url: 'https://docs.n8n.io/integrations/builtin/credentials/kibana'
layout:
  description:
    visible: false
---

# Kibana credentials <a href="#kibana-credentials" id="kibana-credentials"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/7QbEnpnpOks3Rq0SiMFb/" %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create an [Elasticsearch](https://www.elastic.co/) account.
- If you're creating a new account to test with, load some sample data into Kibana. Refer to the [Kibana quick start](https://www.elastic.co/guide/en/kibana/current/get-started.html) for more information.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Basic auth

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Kibana's API documentation](https://www.elastic.co/guide/en/kibana/current/api.html) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](../custom-api-actions-for-existing-nodes.md) to learn more. View [example workflows and related content](https://n8n.io/integrations/kibana/) on n8n's website.

## Using basic auth <a href="#using-basic-auth" id="using-basic-auth"></a>

To configure this credential, you'll need:

- The **URL** you use to access Kibana, for example `http://localhost:5601`
- A **Username**: Use the same username that you use to log in to Elastic.
- A **Password**: Use the same password that you use to log in to Elastic.
