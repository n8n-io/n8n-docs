---
title: Anthropic credentials
description: Documentation for the Anthropic credentials. Use these credentials to authenticate Anthropic in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Anthropic credentials

You can use these credentials to authenticate the following nodes:

- [Anthropic](/integrations/builtin/app-nodes/n8n-nodes-langchain.anthropic.md)
- [Anthropic Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic.md)

## Supported authentication methods

- API key

## Related resources

Refer to [Anthropic's documentation](https://docs.anthropic.com/claude/reference/getting-started-with-the-api) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need an [Anthropic Console account](https://console.anthropic.com) with access to Claude.

Then:

1. In the Anthropic Console, open **Settings >** [**API Keys**](https://console.anthropic.com/settings/keys).
2. Select **+ Create Key**.
3. Give your key a **Name**, like `n8n-integration`.
4. Select **Copy Key** to copy the key.
5. Enter this as the **API Key** in your n8n credential.

Refer to Anthropic's [Intro to Claude](https://docs.anthropic.com/en/docs/intro-to-claude) and [Quickstart](https://docs.anthropic.com/en/docs/quickstart) for more information.
