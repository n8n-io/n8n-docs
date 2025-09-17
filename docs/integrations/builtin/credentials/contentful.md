---
title: Contentful credentials
description: Documentation for Contentful credentials. Use these credentials to authenticate Contentful in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Contentful credentials

You can use these credentials to authenticate the following nodes:

- [Contentful](/integrations/builtin/app-nodes/n8n-nodes-base.contentful.md)

## Prerequisites

- Create a [Contentful](https://www.contentful.com/) account.
- Create a [Contentful space](https://www.contentful.com/help/getting-started/contentful-101/#step-2-create-a-space).

## Supported authentication methods

- API access token

## Related resources

Refer to [Contentful's API documentation](https://www.contentful.com/developers/docs/references/) for more information about the service.

## Using API access token

To configure this credential, you'll need:

- Your Contentful **Space ID**: The Space ID displays as you generate the tokens;  You can also refer to the [Contentful Find space ID documentation](https://www.contentful.com/help/spaces/find-space-id/) to view the Space ID.
- A **Content Delivery API Access Token**: Required if you want to use the [Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/). Leave blank if you don't intend to use this API.
- A **Content Preview API Access Token**: Required if you want to use the [Content Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/). Leave blank if you don't intend to use this API.

View and generate access tokens in Contentful in **Settings > API keys**. Contentful generates tokens for both Content Delivery API and Content Preview API as part of a single key. Refer to the [Contentful API authentication documentation](https://www.contentful.com/developers/docs/references/authentication/) for detailed instructions.

