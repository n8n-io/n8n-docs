---
title: Vercel AI Gateway credentials
description: >-
  Documentation for the Vercel AI Gateway credentials. Use these credentials to
  authenticate the Vercel AI Gateway in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Vercel AI Gateway credentials
originalFilePath: integrations/builtin/credentials/vercel.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/vercel'
url: 'https://docs.n8n.io/integrations/builtin/credentials/vercel'
layout:
  description:
    visible: false
---

# Vercel AI Gateway credentials <a href="#vercel-ai-gateway-credentials" id="vercel-ai-gateway-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Chat Vercel AI Gateway](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatvercel.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Vercel](https://vercel.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key
- OIDC token

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to the [Vercel AI Gateway documentation](https://vercel.com/docs/ai-gateway) for more information about the service.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**

To generate your API Key:

1. [Login to Vercel](https://vercel.com/login) or [create an account](https://vercel.com/signup).
2. Go to the Vercel dashboard and select the **AI Gateway** tab.
3. Select **API keys** on the left side bar.
4. Select **Add key** and proceed with **Create key** from the Dialog.
4. Copy your key and add it as the **API Key** in n8n.

## Using OIDC token <a href="#using-oidc-token" id="using-oidc-token"></a>

To configure this credential, you'll need:

- An **OIDC token**

To generate your OIDC token:

1. In local development, link your application to a Vercel project with the `vc link` command.
2. Run the `vercel env pull` command to pull the environment variables from Vercel.
3. Copy your token and add it as the **OIDC TOKEN** in n8n.
