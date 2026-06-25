---
title: Qwen Cloud credentials
description: >-
  Documentation for Qwen Cloud credentials. Use these credentials to
  authenticate Qwen Cloud in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Qwen Cloud credentials
originalFilePath: integrations/builtin/credentials/alibaba.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/alibaba'
url: 'https://docs.n8n.io/integrations/builtin/credentials/alibaba'
layout:
  description:
    visible: false
---

# Qwen Cloud credentials <a href="#alibaba-cloud-credentials" id="alibaba-cloud-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [Qwen Cloud](../app-nodes/n8n-nodes-langchain.alibabacloud.md)
- [Qwen Cloud Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatalibabacloud.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Qwen Cloud](https://qwencloud.com/) account.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Qwen Cloud API key documentation](https://docs.qwencloud.com/developer-guides/administration/api-keys) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- An **API Key**

1. Sign in to [Qwen Cloud](https://qwencloud.com/).
2. Go to **API Keys**.
3. Use the workspace switcher at the bottom of the sidebar to select the workspace where you want to create the key.
4. Select **Create API key**.
5. Enter a description, then select **Generate Key**.
6. Copy the API key. It displays only once.
7. Enter the API key in your n8n credential.
8. Set **Region** to **Singapore**. Other regions are available only through Alibaba Cloud Model Studio.

Refer to [Qwen Cloud API key documentation](https://docs.qwencloud.com/developer-guides/administration/api-keys) for more information.
