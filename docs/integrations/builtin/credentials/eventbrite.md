---
title: Eventbrite credentials
description: Documentation for Eventbrite credentials. Use these credentials to authenticate Eventbrite in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Eventbrite credentials

You can use these credentials to authenticate the following nodes:

- [Eventbrite Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.eventbritetrigger.md)

## Prerequisites

Create an [Eventbrite](https://www.eventbrite.com/) account.

## Supported authentication methods

- API private key
- OAuth2

## Related resources

Refer to [Eventbrite's API documentation](https://www.eventbrite.com/platform/api) for more information about the service.

## Using API private key

To configure this credential, you'll need:

- A **Private Key**: Refer to the [Eventbrite API Authentication Get a Private Token documentation](https://www.eventbrite.com/platform/api#/introduction/authentication/1.-get-a-private-token) for detailed steps to generate a Private Token. Use this private token as the **Private Key** in the n8n credential.

## Using OAuth2

--8<-- "_snippets/integrations/builtin/credentials/cloud-oauth-button.md"

If you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the instructions in the [Eventbrite API authentication For App Partners documentation](https://www.eventbrite.com/platform/api#/introduction/authentication/2.-(for-app-partners)-authorize-your-users) to set up OAuth.
