---
title: Wolfram|Alpha credentials
description: >-
  Documentation for the Wolfram|Alpha credentials. Use these credentials to
  authenticate Wolfram|Alpha in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Wolfram|Alpha credentials
originalFilePath: integrations/builtin/credentials/wolframalpha.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/wolframalpha'
url: 'https://docs.n8n.io/integrations/builtin/credentials/wolframalpha'
layout:
  description:
    visible: false
---

# Wolfram|Alpha credentials <a href="#wolframoralpha-credentials" id="wolframoralpha-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Wolfram|Alpha](../cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwolframalpha.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Wolfram|Alpha's Simple API documentation](https://products.wolframalpha.com/simple-api/documentation) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need a registered [Wolfram ID](https://account.wolfram.com) and:

- An **App ID**

To get an App ID:

1. Open the Wolfram|Alpha Developer Portal and go to [**API Access**](https://developer.wolframalpha.com/access).
2. Select **Get an App ID**.
3. Enter a **Name** for your application, like `n8n integration`.
4. Enter a **Description** for your application.
5. Select **Simple API** as the **API**.
6. Select **Submit**.
6. Copy the generated **App ID** and enter it in your n8n credential.

Refer to **Getting Started** in the [Wolfram|Alpha Simple API documentation](https://products.wolframalpha.com/simple-api/documentation) for more information.

## Resolve Forbidden connection error <a href="#resolve-forbidden-connection-error" id="resolve-forbidden-connection-error"></a>

If you enter your App ID and get an error that the credential is **Forbidden**, make sure that you have verified your email address for your Wolfram ID:

1. Go to your [Wolfram ID Details](https://account.wolfram.com/wolframid).
2. If you don't see the **Verified** label underneath your **Email address**, select the link to **Send a verification email**.
3. You must open the link in that email to verify your email address.

It may take several minutes for the verification to populate to the API, but once it does, retrying the n8n credential should succeed.
