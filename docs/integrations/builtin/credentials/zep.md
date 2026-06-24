---
title: Zep credentials
description: >-
  Documentation for the Zep credentials. Use these credentials to authenticate
  Zep in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Zep credentials
originalFilePath: integrations/builtin/credentials/zep.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/zep'
url: 'https://docs.n8n.io/integrations/builtin/credentials/zep'
layout:
  description:
    visible: false
---

# Zep credentials <a href="#zep-credentials" id="zep-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Zep](../cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep.md)
* [Zep Vector Store](../cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorezep.md)

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Zep's Cloud SDK documentation](https://help.getzep.com/install-sdks) for more information about the service. Refer to [Zep's REST API documentation](https://getzep.github.io/zep/) for information about the API.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need a [Zep server](https://www.getzep.com/) with at least one project and:

- An **API URL**
- An **API Key**

Setup depends on whether you're using Zep Cloud or self-hosted Zep Open Source.

### Zep Cloud setup <a href="#zep-cloud-setup" id="zep-cloud-setup"></a>

Follow these instructions if you're using [Zep Cloud](https://app.getzep.com):

1. In Zep, open the **Project Settings**.
2. In the **Project Keys** section, select **Add Key**.
3. Enter a **Key Name**, like `n8n integration`.
4. Select **Create**.
5. Copy the key and enter it in your n8n integration as the **API Key**.
6. Turn on the **Cloud** toggle.

### Self-hosted Zep Open Source setup <a href="#self-hosted-zep-open-source-setup" id="self-hosted-zep-open-source-setup"></a>

{% hint style="warning" %}
**Deprecated**

The Zep team [deprecated the open source Zep Community Edition](https://blog.getzep.com/announcing-a-new-direction-for-zeps-open-source-strategy/) in April, 2025. These instructions may not work in the future.
{% endhint %}

Follow these instructions if you're self-hosting Zep Open Source:

1. Enter the JWT token for your Zep server as the **API Key** in n8n.
2. Make sure the **Cloud** toggle is off.
3. Enter the URL for your Zep server as the **API URL**.
