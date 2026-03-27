---
title: OpenWeatherMap credentials
description: Documentation for OpenWeatherMap credentials. Use these credentials to authenticate OpenWeatherMap in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# OpenWeatherMap credentials

You can use these credentials to authenticate the following nodes:

- [OpenWeatherMap](/integrations/builtin/app-nodes/n8n-nodes-base.openweathermap.md)

## Supported authentication methods

- API access token

## Related resources

Refer to [OpenWeatherMap's API documentation](https://openweathermap.org/api) for more information about the service.

## Using API access token

To configure this credential, you'll need an [OpenWeatherMap](https://openweathermap.org/) account and:

- An **Access Token**

To get your **Access Token**:

1. After you verify your email address, OpenWeatherMap includes an **API Key** in your welcome email.
2. Copy that key and enter it in your n8n credential.

If you'd prefer to create a new key:

1. To create a new key, go to **Account >** [**API Keys**](https://home.openweathermap.org/api_keys).
2. In the **Create Key** section, enter an **API Key Name**, like `n8n integration`.
3. Select **Generate** to generate your key.
4. Copy the generated key and enter it in your n8n credential.
