---
title: Zep credentials
description: Documentation for the Zep credentials. Use these credentials to authenticate Zep in n8n, a workflow automation platform.
---

# Zep credentials

You can use these credentials to authenticate the following nodes:

* [Zep](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep/)
* [Zep Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorezep/)

## Prerequisites

Create a [Zep server](https://www.getzep.com/){:target=_blank .external-link} on the cloud or self-hosted with at least one project.

## Supported authentication methods

- API key

## Related resources

Refer to [Zep's Cloud SDK documentation](https://help.getzep.com/sdks){:target=_blank .external-link} and [Open Source SDK documentation](https://docs.getzep.com/sdk/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- An **API URL**: For Cloud instances, enter `https://api.getzep.com`. For self-hosted instances, enter the URL for your Zep server.
- An **API Key**: Generate a new API key from [**Project Settings**](https://help.getzep.com/projects){:target=_blank .external-link}.
