---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Weaviate credentials
description: Documentation for Weaviate credentials. Use these credentials to authenticate Weaviate in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: medium
---

# Weaviate credentials

You can use these credentials to authenticate the following nodes:

* [Weaviate Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreweaviate.md)

## Supported authentication methods

- API key

## Related resources

Refer to [Weaviate's connection documentation](https://docs.weaviate.io/weaviate/connections){:target=_blank .external-link} for more information on how to connect to Weaviate.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

### Connection type: Weaviate Cloud

Create your [Weaviate Cloud Database](https://docs.weaviate.io/cloud/quickstart) and [follow this instruction on how to get both parameters](https://docs.weaviate.io/cloud/quickstart#13-connect-to-your-weaviate-cloud-instance) from your Weaviate Cloud Database:

- **Weaviate Cloud Endpoint**
- **Weaviate Api Key**

Note: Weaviate provides a free sandbox option for testing.

### Connection type: Custom Connection

For this Connection Type, you will need to [deploy Weaviate](https://docs.weaviate.io/deploy){:target=_blank .external-link} on your own server, and correctly expose it to N8N.

You can then provide all the arguments for your custom connection. This configuration is the equivalent to a [Weaviate Custom Connection](https://docs.weaviate.io/weaviate/connections/connect-custom) directly from the client.

Refer to [Weaviate's authentication documentation](https://docs.weaviate.io/deploy/configuration/authentication#api-key-authentication){:target=_blank .external-link} for more information on creating and using API keys.

For community support, refer to [Weaviate Forums](https://forum.weaviate.io/).