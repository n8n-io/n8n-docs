---
title: crowd.dev credentials
description: Documentation for the crowd.dev credentials. Use these credentials to authenticate crowd.dev in n8n, a workflow automation platform.
contentType: integration
---

# crowd.dev credentials

You can use these credentials to authenticate the following nodes:

* [crowd.dev](/integrations/builtin/app-nodes/n8n-nodes-base.crowddev/)
* [crowd.dev Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.crowddevtrigger/)

## Prerequisites

Create a working instance of [crowd.dev](https://www.crowd.dev/){:target=_blank .external-link}.

## Supported authentication methods

- API Key

## Related resources

Refer to [crowd.dev's documentation](https://docs.crowd.dev/docs){:target=_blank .external-link} for more information about the service, and their [API documentation](https://api.crowd.dev/api-reference){:target=_blank .external-link} for working with the API.

## Using API Key

To configure this credential, you'll need:

- A **URL**:
    - If your crowd.dev instance is hosted on crowd.dev, keep the default of `https://app.crowd.dev`.
    - If your crowd.dev instance is [self-hosted](https://docs.crowd.dev/docs/technical-docs/self-hosting){:target=_blank .external-link}, use the URL you use to access your crowd.dev instance.
- Your crowd.dev **Tenant ID**
- An API **Token** 

The Tenant ID and API token can both be found in the **Settings** section of the crowd.dev app. Refer to the [crowd.dev API documentation](https://api.crowd.dev/api-reference){:target=_blank .external-link} for more detailed instructions.
