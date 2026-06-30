---
title: Grafana credentials
description: >-
  Documentation for Grafana credentials. Use these credentials to authenticate
  Grafana in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Grafana credentials
originalFilePath: integrations/builtin/credentials/grafana.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/grafana'
url: 'https://docs.n8n.io/integrations/builtin/credentials/grafana'
layout:
  description:
    visible: false
---

# Grafana credentials <a href="#grafana-credentials" id="grafana-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Grafana](../app-nodes/n8n-nodes-base.grafana.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

- Create a [Grafana](https://grafana.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Grafana's API documentation](https://grafana.com/docs/grafana/latest/developers/http_api/) for more information about authenticating with the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**: Refer to the [Create an API key documentation](https://grafana.com/docs/grafana/latest/administration/api-keys/#create-an-api-key) for detailed instructions on creating an API key.
- The **Base URL** for your Grafana instance, for example: `https://n8n.grafana.net`.

