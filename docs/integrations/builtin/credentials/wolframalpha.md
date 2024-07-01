---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Wolfram|Alpha credentials
description: Documentation for the Wolfram|Alpha credentials. Use these credentials to authenticate Wolfram|Alpha in n8n, a workflow automation platform.
contentType: integration
---

# Wolfram|Alpha credentials

You can use these credentials to authenticate the following nodes:

* [Wolfram|Alpha](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwolframalpha/)

## Prerequisites

- Register a [Wolfram ID](https://account.wolfram.com){:target=_blank .external-link} and verify your email address for your Wolfram ID.
- Sign in to the [Wolfram|Alpha Developer Portal](https://developer.wolframalpha.com){:target=_blank .external-link}.

## Supported authentication methods

- API key

## Related resources

Refer to [Wolfram|Alpha's Simple API documentation](https://products.wolframalpha.com/simple-api/documentation){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- An **App ID**: To get an App ID, open the Developer Portal and go to [**API Access**](https://developer.wolframalpha.com/access){:target=_blank .external-link}. Select **Get an App ID** to register an application and get an App ID. Select **Simple API** as the **API**. Copy the generated **App ID** and add it to your n8n credential.

## Resolve Forbidden connection error

If you enter your App ID and get an error that the credential is **Forbidden**, make sure that you have verified your email address for your Wolfram ID.

Go to your [Wolfram ID Details](https://account.wolfram.com/wolframid){:target=_blank .external-link} and select the link near your email address to send a verification email. You must open the link in that email to verify your email address.

It may take several minutes for the verification to populate to the API, but once it does, retrying the n8n credential should succeed.