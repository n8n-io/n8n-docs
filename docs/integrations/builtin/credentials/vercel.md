---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Vercel AI Gateway credentials
description: Documentation for the Vercel AI Gateway credentials. Use these credentials to authenticate the Vercel AI Gateway in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: critical
---

# Vercel AI Gateway credentials

You can use these credentials to authenticate the following nodes:

- [Chat Vercel AI Gateway](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatvercel.md)

## Prerequisites

Create a [Vercel](https://vercel.com/) account.

## Supported authentication methods

- API key
- OIDC token

## Related resources

Refer to the [Vercel AI Gateway documentation](https://vercel.com/docs/ai-gateway) for more information about the service.

## Using API key

To configure this credential, you'll need:

- An **API Key**

To generate your API Key:

1. Login to your Vercel account or [create](https://vercel.com/) an account.
2. Go to the Vercel dashboard and click the **AI Gateway** tab.
3. Click **API keys** on the left side bar
4. Click **Add key** and proceed with **Create key** from the Dialog
4. Copy your key and add it as the **API Key** in n8n.

## Using OIDC token

To configure this credential, you'll need:

- An **OIDC token**

To generate your OIDC token:

1. In local development, link your application to a Vercel project with the command `vc link`
2. Run the command `vercel env pull` to pull the environment variables from Vercel
3. Copy your token and add it as the **OIDC TOKEN** in n8n.