---
title: Xata credentials
description: Documentation for the Xata credentials. Use these credentials to authenticate Xata in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Xata credentials

You can use these credentials to authenticate the following nodes:

* [Xata](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryxata.md)

## Prerequisites

Create a [Xata](https://xata.io/) database or an account on an existing database.

## Supported authentication methods

- API key

## Related resources

Refer to [Xata's documentation](https://xata.io/docs/rest-api/authentication) for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"

## Using API key

To configure this credential, you'll need:

- The **Database Endpoint**: The Workspace API requires that you identify the database you're requesting information from using this format: `https://{workspace-display-name}-{workspace-id}.{region}.xata.sh/db/{dbname}`. Refer to [Workspace API](https://xata.io/docs/rest-api#workspace-api) for more information.
    - `{workspace-display-name}`: The workspace display name is an optional identifier you can include in your Database Endpoint. The API ignores it, but including it can make it easier to figure out which workspace this database is in if you're saving multiple credentials.
    - `{workspace-id}`: The unique ID of the workspace, 6 alphanumeric characters.
    - `{region}`: The hosting region for the database. This value must match the database region configuration.
    - `{dbname}`: The name of the database you're interacting with.
- A **Branch**: Enter the name of the GitHub branch for your database.
- An **API Key**: To generate an API key, go to [**Account Settings**](https://app.xata.io/settings) and select **+ Add a key**. Refer to [Generate an API Key](https://xata.io/docs/rest-api#generate-an-api-key) for more information.