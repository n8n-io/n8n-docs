---
title: Azure Cosmos DB credentials
description: >-
  Documentation for the Azure Cosmos DB credentials. Use these credentials to
  authenticate Azure Cosmos DB in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: Azure Cosmos DB credentials
originalFilePath: integrations/builtin/credentials/azurecosmosdb.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/azurecosmosdb'
url: 'https://docs.n8n.io/integrations/builtin/credentials/azurecosmosdb'
layout:
  description:
    visible: false
---

# Azure Cosmos DB credentials <a href="#azure-cosmos-db-credentials" id="azure-cosmos-db-credentials"></a>

You can use these credentials to authenticate the following nodes:

* [Azure Cosmos DB](../app-nodes/n8n-nodes-base.azurecosmosdb.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

* Create an [Azure](https://azure.microsoft.com) subscription.
* Create an [Azure Cosmos DB account](https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-manage-database-account).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* API Key

## Related resources <a href="#related-resources" id="related-resources"></a>


Refer to [Azure Cosmos DB's API documentation](https://learn.microsoft.com/en-us/rest/api/cosmos-db/) for more information about the service.


## Using API Key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

* An **Account**: The name of your Azure Cosmos DB account.
* A **Key**: A key for your Azure Cosmos DB account. Select **Overview** > **Keys** in the Azure portal for your Azure Cosmos DB. You can use either of the two account keys for this purpose.
* A **Database**: The name of the Azure Cosmos DB database to connect to.

Refer to [Get your primary key | Microsoft](https://learn.microsoft.com/en-us/previous-versions/azure/cosmos-db/how-to-obtain-keys?tabs=azure-portal) for more detailed steps.

## Common issues <a href="#common-issues" id="common-issues"></a>

Here are the known common errors and issues with Azure Cosmos DB credentials.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/jqvB0gfEfubAawaXt51F/" %}
