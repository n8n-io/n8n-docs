---
title: Azure Cosmos DB credentials
description: Documentation for the Azure Cosmos DB credentials. Use these credentials to authenticate Azure Cosmos DB in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Azure Cosmos DB credentials

You can use these credentials to authenticate the following nodes:

* [Azure Cosmos DB](/integrations/builtin/app-nodes/n8n-nodes-base.azurecosmosdb.md)

## Prerequisites

* Create an [Azure](https://azure.microsoft.com) subscription.
* Create an [Azure Cosmos DB account](https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-manage-database-account).

## Supported authentication methods

* API Key

## Related resources

<!-- vale Vale.Spelling = NO -->
Refer to [Azure Cosmos DB's API documentation](https://learn.microsoft.com/en-us/rest/api/cosmos-db/) for more information about the service.
<!-- vale Vale.Spelling = YES -->

## Using API Key

To configure this credential, you'll need:

* An **Account**: The name of your Azure Cosmos DB account.
* A **Key**: A key for your Azure Cosmos DB account. Select **Overview** > **Keys** in the Azure portal for your Azure Cosmos DB. You can use either of the two account keys for this purpose.
* A **Database**: The name of the Azure Cosmos DB database to connect to.

Refer to [Get your primary key | Microsoft](https://learn.microsoft.com/en-us/previous-versions/azure/cosmos-db/how-to-obtain-keys?tabs=azure-portal) for more detailed steps.

## Common issues

Here are the known common errors and issues with Azure Cosmos DB credentials.

--8<-- "_snippets/integrations/builtin/credentials/microsoft-need-admin-approval.md"
