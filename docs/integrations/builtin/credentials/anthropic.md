---
title: Anthropic credentials
description: >-
  Documentation for the Anthropic credentials. Use these credentials to
  authenticate Anthropic in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Anthropic credentials
originalFilePath: integrations/builtin/credentials/anthropic.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/anthropic'
url: 'https://docs.n8n.io/integrations/builtin/credentials/anthropic'
layout:
  description:
    visible: false
---

# Anthropic credentials <a href="#anthropic-credentials" id="anthropic-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Anthropic](../app-nodes/n8n-nodes-langchain.anthropic.md)
- [Anthropic Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Anthropic's documentation](https://docs.anthropic.com/claude/reference/getting-started-with-the-api) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need an [Anthropic Console account](https://console.anthropic.com) with access to Claude.

Then:

1. In the Anthropic Console, open **Settings >** [**API Keys**](https://console.anthropic.com/settings/keys).
2. Select **+ Create Key**.
3. Give your key a **Name**, like `n8n-integration`.
4. Select **Copy Key** to copy the key.
5. Enter this as the **API Key** in your n8n credential.
6. (Optional) To add custom headers to your API requests:
    1. Enable the **Add Custom Header** toggle.
    2. Enter the **Header Name** for your custom header.
    3. Enter the **Header Value** for your custom header.

Refer to Anthropic's [Intro to Claude](https://docs.anthropic.com/en/docs/intro-to-claude) and [Quickstart](https://docs.anthropic.com/en/docs/quickstart) for more information.
