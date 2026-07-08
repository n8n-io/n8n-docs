---
title: Azure Cosmos DB node documentation
description: >-
  Learn how to use the Azure Cosmos DB node in n8n. Follow technical
  documentation to integrate Azure Cosmos DB node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Azure Cosmos DB node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.azurecosmosdb.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.azurecosmosdb
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.azurecosmosdb
layout:
  description:
    visible: false
---

# Azure Cosmos DB node <a href="#azure-cosmos-db-node" id="azure-cosmos-db-node"></a>

Use the Azure Cosmos DB node to automate work in Azure Cosmos DB and integrate Azure Cosmos DB with other applications. n8n has built-in support for a wide range of Azure Cosmos DB features, which includes creating, getting, updating, and deleting containers and items.

On this page, you'll find a list of operations the Azure Cosmos DB node supports, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/azurecosmosdb.md).
{% endhint %}


## Operations <a href="#operations" id="operations"></a>

* **Container**:
	* **Create**
	* **Delete**
	* **Get**
	* **Get Many**
* **Item**:
	* **Create**
	* **Delete**
	* **Get**
	* **Get Many**
	* **Execute Query**
	* **Update**

## Item: Execute Query <a href="#item-execute-query" id="item-execute-query"></a>

Execute a NoSQL SQL query against a container and return matching items.

### Parameters <a href="#parameters" id="parameters"></a>

| Parameter | Required | Description |
| --- | --- | --- |
| **Container** | Yes | The container to run the query against. Select from a list or enter the container ID directly. |
| **Query** | Yes | The SQL query to execute. Use `$1`, `$2`, `$3`, etc. as positional placeholders for query parameters. n8n automatically converts these to `@Param1`, `@Param2`, `@Param3` before sending the request to Azure Cosmos DB. For example: `SELECT * FROM c WHERE c.status = $1 AND c.startDate = $2`. |
| **Simplify** | No | When enabled (default), strips internal Cosmos DB metadata fields (those starting with `_`) from the returned items. Disable to receive the full raw API response. |

### Options <a href="#options" id="options"></a>

Expand **Options** to configure query parameters.

| Option | Description |
| --- | --- |
| **Query Parameters** | A comma-separated list of string values mapped positionally to `$1`, `$2`, etc. in the query. **All values are always sent as strings.** Use this for simple text filters such as names or status values. Example: `active,2024`. |
| **Query Parameters (JSON)** | A JSON array of values mapped positionally to `$1`, `$2`, etc. in the query. Preserves native types: numbers, booleans, `null`, and strings with leading zeros. Use this instead of **Query Parameters** when type precision matters. Example: `[1737062400000, "01234", true, null]`. |

{% hint style="info" %}
**Choosing between Query Parameters and Query Parameters (JSON)**

Azure Cosmos DB performs type-sensitive comparisons. A filter like
`WHERE c.startDate = $1` returns no results if `startDate` is stored as a number
in the database but the parameter arrives as a string.

- Use **Query Parameters** when all your filter values are text (names, statuses, identifiers).
- Use **Query Parameters (JSON)** when you need to filter on numbers, booleans, `null`, or strings that start with digits and must stay as strings (for example, zip codes such as `"01234"`).

**Limitation:** JavaScript's JSON parser can't represent integers larger than
`Number.MAX_SAFE_INTEGER` (`9007199254740991`) with full precision. Values beyond
this limit may lose precision when using **Query Parameters (JSON)**.
{% endhint %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Azure Cosmos DB node documentation integration templates](https://n8n.io/integrations/azure-cosmos-db) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>


Refer to [Azure Cosmos DB's documentation](https://learn.microsoft.com/en-us/rest/api/cosmos-db/) for more information about the service.


{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}
