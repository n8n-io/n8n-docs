---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Zep credentials
description: Documentation for the Zep credentials. Use these credentials to authenticate Zep in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Zep credentials

You can use these credentials to authenticate the following nodes:

* [Zep](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep/)
* [Zep Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorezep/)

## Supported authentication methods

- API key

## Related resources

Refer to [Zep's Cloud SDK documentation](https://help.getzep.com/sdks){:target=_blank .external-link} and [Open Source SDK documentation](https://docs.getzep.com/sdk/){:target=_blank .external-link} for more information about the service. Refer to [Zep's REST API documentation](https://getzep.github.io/zep/){:target=_blank .external-link} for information about the API.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need a [Zep server](https://www.getzep.com/){:target=_blank .external-link} with at least one project and:

- An **API URL**
- An **API Key**

Setup depends on whether you're using Zep Cloud or self-hosted Zep Open Source.

### Zep Cloud setup

Follow these instructions if you're using [Zep Cloud](https://app.getzep.com){:target=_blank .external-link}:

1. In Zep, open the [**Project Settings**](https://app.getzep.com/projects){:target=_blank .external-link}.
2. In the **Project Keys** section, select **Add Key**.
3. Enter a **Key Name**, like `n8n integration`.
4. Select **Create**.
5. Copy the key and enter it in your n8n integration as the **API Key**.
6. Turn on the **Cloud** toggle.

### Self-hosted Zep Open Source setup

Follow these instructions if you're self-hosting [Zep Open Source](https://docs.getzep.com/deployment/quickstart/){:target=_blank .external-link}:

1. Enter the JWT token for your Zep server as the **API Key** in n8n.
    - If you haven't generated a JWT token for your Zep server before, refer to Zep's [Configuring Authentication](https://docs.getzep.com/deployment/auth/){:target=_blank .external-link} for instructions.
2. Make sure the **Cloud** toggle is off.
3. Enter the URL for your Zep server as the **API URL**.
