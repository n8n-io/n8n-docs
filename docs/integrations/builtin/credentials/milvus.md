---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Milvus Vector Store credentials
description: Documentation for the Milvus credentials. Use these credentials to authenticate Milvus in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# Milvus credentials

You can use these credentials to authenticate the following nodes:

* [Milvus Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus.md)

## Prerequisites

Create and run an [Milvus](https://milvus.io/){:target=_blank .external-link} instance. Refer to the [Install Milvus](https://milvus.io/docs/install-overview.md){:target=_blank .external-link} for more information.

## Supported authentication methods

- Base URL, Username and Password

## Related resources

Refer to [Milvus's Authentication documentation](https://milvus.io/docs/authenticate.md?tab=docker#Authenticate-User-Access){:target=_blank .external-link} for more information about setting up authentication.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using instance URL

To configure this credential, you'll need:

- The **Base URL** of your Milvus instance.

The default **Base URL** is `http://localhost:19530`. If you have issues connecting to a local n8n server, try `127.0.0.1` instead of `localhost`.

- The **Username** and **Password** for your Milvus instance. By default these are `root` and `Milvus`, respectively.
