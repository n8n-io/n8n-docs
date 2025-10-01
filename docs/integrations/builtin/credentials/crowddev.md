---
title: crowd.dev credentials
description: Documentation for the crowd.dev credentials. Use these credentials to authenticate crowd.dev in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# crowd.dev credentials

You can use these credentials to authenticate the following nodes:

* [crowd.dev](/integrations/builtin/app-nodes/n8n-nodes-base.crowddev.md)
* [crowd.dev Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.crowddevtrigger.md)

## Prerequisites

Create a working instance of [crowd.dev](https://www.crowd.dev/).

## Supported authentication methods

- API key

## Related resources

Refer to [crowd.dev's documentation](https://docs.crowd.dev/docs) for more information about the service, and their [API documentation](https://api.crowd.dev/api-reference) for working with the API.

## Using API key

To configure this credential, you'll need:

- A **URL**:
    - If your crowd.dev instance is hosted on crowd.dev, keep the default of `https://app.crowd.dev`.
    - If your crowd.dev instance is [self-hosted](https://docs.crowd.dev/docs/technical-docs/self-hosting), use the URL you use to access your crowd.dev instance.
- Your crowd.dev **Tenant ID**: Displayed in the **Settings** section of the crowd.dev app
- An API **Token**: Displayed in the **Settings** section of the crowd.dev app

Refer to the [crowd.dev API documentation](https://api.crowd.dev/api-reference) for more detailed instructions.
