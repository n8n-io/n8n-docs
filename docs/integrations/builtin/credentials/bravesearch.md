---
title: Brave Search credentials
description: Documentation for the Brave Search credentials. Use these credentials to authenticate Brave Search in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
layout:
  description:
    visible: false
---

# Brave Search credentials

{% hint style="info" %}
On n8n Cloud, you can skip setting up Brave Search credentials by selecting **Use Gateway credits** in the credential field of nodes that support it. Refer to [Gateway credits](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/gateway-credits) for details.
{% endhint %}

## Prerequisites

Create a [Brave Search API](https://api.search.brave.com/) account.

## Supported authentication methods

- API key

## Related resources

Refer to [Brave Search's API documentation](https://api-dashboard.search.brave.com/documentation) for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**: Your Brave Search subscription token.

To get your API key:

1. Go to [api.search.brave.com](https://api.search.brave.com/) and sign up or log in.
2. Choose a subscription plan. Brave offers a free tier with limited queries per month.
3. Navigate to the [API Keys](https://api-dashboard.search.brave.com/app/keys) page in your dashboard.
4. Copy your API key and enter it as the **API Key** in your n8n credential.