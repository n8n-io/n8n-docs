---
title: Eventbrite credentials
description: >-
  Documentation for Eventbrite credentials. Use these credentials to
  authenticate Eventbrite in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Eventbrite credentials
originalFilePath: integrations/builtin/credentials/eventbrite.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/eventbrite'
url: 'https://docs.n8n.io/integrations/builtin/credentials/eventbrite'
layout:
  description:
    visible: false
---

# Eventbrite credentials <a href="#eventbrite-credentials" id="eventbrite-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Eventbrite Trigger](../trigger-nodes/n8n-nodes-base.eventbritetrigger.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an [Eventbrite](https://www.eventbrite.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API private key
- OAuth2

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Eventbrite's API documentation](https://www.eventbrite.com/platform/api) for more information about the service.

## Using API private key <a href="#using-api-private-key" id="using-api-private-key"></a>

To configure this credential, you'll need:

- A **Private Key**: Refer to the [Eventbrite API Authentication Get a Private Token documentation](https://www.eventbrite.com/platform/api#/introduction/authentication/1.-get-a-private-token) for detailed steps to generate a Private Token. Use this private token as the **Private Key** in the n8n credential.

## Using OAuth2 <a href="#using-oauth2" id="using-oauth2"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/HoGXnGIfupVt81dGox48/" %}

If you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the instructions in the [Eventbrite API authentication For App Partners documentation](https://www.eventbrite.com/platform/api#/introduction/authentication/2.-(for-app-partners)-authorize-your-users) to set up OAuth.
