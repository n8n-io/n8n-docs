---
title: Moonshot credentials
description: >-
  Documentation for Moonshot credentials. Use these credentials to authenticate
  Moonshot in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Moonshot credentials
originalFilePath: integrations/builtin/credentials/moonshot.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/moonshot'
url: 'https://docs.n8n.io/integrations/builtin/credentials/moonshot'
layout:
  description:
    visible: false
---


# Moonshot credentials <a href="#moonshot-credentials" id="moonshot-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Moonshot Kimi](../app-nodes/n8n-nodes-langchain.moonshot.md)
* [Moonshot Kimi Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmoonshot.md)


## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create a [Kimi API Platform account](https://platform.kimi.ai/).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Moonshot's documentation](https://platform.kimi.ai/docs/) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need a [Kimi API Platform](https://platform.kimi.ai/) account and an API key:

1. In the [Kimi API Platform console](https://platform.kimi.ai/console/api-keys), select **API Keys**.
2. Select **Create API Key**.
3. Enter a **name** and **project** for the API key.
4. Copy the API key and enter it in your n8n credential.
