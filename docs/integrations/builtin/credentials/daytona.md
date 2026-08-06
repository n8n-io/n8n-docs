---
title: Daytona credentials
description: Documentation for the Daytona credentials. Use these credentials to authenticate Daytona in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
layout:
  description:
    visible: false
---

# Daytona credentials

## Prerequisites

Create a [Daytona](https://app.daytona.io/) account.

## Supported authentication methods

- API key

## Related resources

Refer to [Daytona's API documentation](https://www.daytona.io/docs/en/tools/api/) for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API URL**: The URL of your Daytona API endpoint.
- An **API Key**: Your Daytona API key.

To get your API key:

1. Log in to the [Daytona Dashboard](https://app.daytona.io/dashboard/keys).
2. Select **Create Key**.
3. Enter a name for the key, such as `n8n integration`.
4. Set an expiration date and select the permissions your key needs.
5. Select **Create** to generate the key.
6. Copy the API key and enter it as the **API Key** in your n8n credential.

For the **API URL**, use `https://app.daytona.io/api` for Daytona's hosted service or the URL of your self-hosted Daytona instance.

Refer to [Daytona's API Keys documentation](https://www.daytona.io/docs/en/api-keys/) for more information.