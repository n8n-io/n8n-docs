---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Discourse credentials
description: Documentation for Discourse credentials. Use these credentials to authenticate Discourse in n8n, a workflow automation platform.
contentType: integration
---

# Discourse credentials

You can use these credentials to authenticate the following nodes:

- [Discourse](/integrations/builtin/app-nodes/n8n-nodes-base.discourse/)

## Prerequisites

- Host an instance of [Discourse](https://discourse.org/)
- Create an account on your hosted instance and make sure that you are an admin

## Supported authentication methods

- API key

## Related resources

Refer to [Discourse's API documentation](https://docs.discourse.org/){:target=_blank .external-link} for more information about the service.

## Using API key

To configure this credential, you'll need:

- The **URL** of your Discourse instance, for example `https://community.n8n.io`
- An **API Key**: Create an API key through the Discourse admin panel. Refer to the [Discourse create and configure an API key documentation](https://meta.discourse.org/t/create-and-configure-an-api-key/230124){:target=_blank .external-link} for instructions on creating an API key and specifying a username.
- A **Username**: Use your own name, `system`, or another user.

Refer to the Authentication section of the [Discourse API documentation](https://docs.discourse.org/){:target=_blank .external-link} for examples.


