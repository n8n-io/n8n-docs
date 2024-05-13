---
title: Bubble credentials
description: Documentation for Bubble credentials. Use these credentials to authenticate Bubble in n8n, a workflow automation platform.
contentType: integration
---

# Bubble credentials

You can use these credentials to authenticate the following nodes:

- [Bubble](/integrations/builtin/app-nodes/n8n-nodes-base.bubble/)

## Prerequisites

- Create a [Bubble](https://bubble.io){:target=_blank .external-link} account.
- [Create an app](https://manual.bubble.io/help-guides/getting-started/creating-and-managing-apps#creating-apps){:target=_blank .external-link} within that account.

/// note | Bubble plans
You need a Starter plan or higher to access the Bubble API.
///

## Supported authentication methods

- API key

## Related resources

Refer to [Bubble's API documentation](https://manual.bubble.io/help-guides/integrations/api){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Token**: Refer to the [Bubble Authentication documentation](https://manual.bubble.io/core-resources/api/the-bubble-api/the-data-api/authentication){:target=_blank .external-link} for instructions on creating a new API token.
- An **App Name**: The name of the app you created the API token for.
- The **Environment**: Choose between **Live** or **Development**. Select the environment that makes sense for your app.
- The **Hosting**:
    - **Bubble Hosting**: Choose this option if you haven't set up a custom domain
    - **Self Hosting**: Choose this option if you've set up a [custom domain](https://manual.bubble.io/help-guides/design/elements/the-page#custom-domain-1){:target=_blank .external-link} in Bubble. Add the **Domain**.

