---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Anthropic credentials
description: Documentation for the Anthropic credentials. Use these credentials to authenticate Anthropic in n8n, a workflow automation platform.
priority: medium
---

# Anthropic credentials

You can use these credentials to authenticate the following nodes:

- [Anthropic Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/)

## Supported authentication methods

- API key

## Related resources

Refer to [Anthropic's documentation](https://docs.anthropic.com/claude/reference/getting-started-with-the-api){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need an [Anthropic Console account](https://console.anthropic.com){:target=_blank .external-link} with access to Claude.

Then:

1. In the Anthropic Console, open **Settings >** [**API Keys**](https://console.anthropic.com/settings/keys){:target=_blank .external-link}.
2. Select **+ Create Key**.
3. Give your key a **Name**, like `n8n-integration`.
4. Select **Copy Key** to copy the key.
5. Enter this as the **API Key** in your n8n credential.

Refer to Anthropic's [Intro to Claude](https://docs.anthropic.com/en/docs/intro-to-claude){:target=_blank .external-link} and [Quickstart](https://docs.anthropic.com/en/docs/quickstart){:target=_blank .external-link} for more information.
