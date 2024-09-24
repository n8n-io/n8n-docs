---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Contentful credentials
description: Documentation for Contentful credentials. Use these credentials to authenticate Contentful in n8n, a workflow automation platform.
contentType: integration
---

# Contentful credentials

You can use these credentials to authenticate the following nodes:

- [Contentful](/integrations/builtin/app-nodes/n8n-nodes-base.contentful/)

## Prerequisites

- Create a [Contentful](https://www.contentful.com/){:target=_blank .external-link} account.
- Create a [Contentful space](https://www.contentful.com/help/contentful-101/#step-2-create-a-space){:target=_blank .external-link}.

## Supported authentication methods

- API access token

## Related resources

Refer to [Contentful's API documentation](https://www.contentful.com/developers/docs/references/){:target=_blank .external-link} for more information about the service.

## Using API access token

To configure this credential, you'll need:

- Your Contentful **Space ID**: The Space ID displays as you generate the tokens;  You can also refer to the [Contentful Find space ID documentation](https://www.contentful.com/help/find-space-id/){:target=_blank .external-link} to view the Space ID.
- A **Content Delivery API Access Token**: Required if you want to use the [Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/){:target=_blank .external-link}. Leave blank if you don't intend to use this API.
- A **Content Preview API Access Token**: Required if you want to use the [Content Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/){:target=_blank .external-link}. Leave blank if you don't intend to use this API.

View and generate access tokens in Contentful in **Settings > API keys**. Contentful generates tokens for both Content Delivery API and Content Preview API as part of a single key. Refer to [Contentful Creating and managing API keys](https://training.contentful.com/student/activity/1050378-creating-and-managing-api-keys){:target=_blank .external-link} for detailed instructions.

