---
title: Zep credentials
description: Documentation for the Zep credentials. Use these credentials to authenticate Zep in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Zep credentials

You can use these credentials to authenticate the following nodes:

* [Zep](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep.md)
* [Zep Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorezep.md)

## Supported authentication methods

- API key

## Related resources

Refer to [Zep's Cloud SDK documentation](https://help.getzep.com/install-sdks) for more information about the service. Refer to [Zep's REST API documentation](https://getzep.github.io/zep/) for information about the API.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need a [Zep server](https://www.getzep.com/) with at least one project and:

- An **API URL**
- An **API Key**

Setup depends on whether you're using Zep Cloud or self-hosted Zep Open Source.

### Zep Cloud setup

Follow these instructions if you're using [Zep Cloud](https://app.getzep.com):

1. In Zep, open the **Project Settings**.
2. In the **Project Keys** section, select **Add Key**.
3. Enter a **Key Name**, like `n8n integration`.
4. Select **Create**.
5. Copy the key and enter it in your n8n integration as the **API Key**.
6. Turn on the **Cloud** toggle.

### Self-hosted Zep Open Source setup

/// warning | Deprecated
The Zep team [deprecated the open source Zep Community Edition](https://blog.getzep.com/announcing-a-new-direction-for-zeps-open-source-strategy/) in April, 2025. These instructions may not work in the future.
///

Follow these instructions if you're self-hosting Zep Open Source:

1. Enter the JWT token for your Zep server as the **API Key** in n8n.
2. Make sure the **Cloud** toggle is off.
3. Enter the URL for your Zep server as the **API URL**.
