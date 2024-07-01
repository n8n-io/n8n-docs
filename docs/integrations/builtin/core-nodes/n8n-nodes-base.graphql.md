---
title: GraphQL
description: Documentation for the GraphQL node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# GraphQL

[GraphQL](https://graphql.org/){:target=_blank .external-link} is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. Use the GraphQL node to query a GraphQL endpoint.

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [GraphQL integrations](https://n8n.io/integrations/graphql/){:target=_blank .external-link} list.
///

## Node parameters

* **Authentication**: Select the type of authentication to use. If you select anything other than **None**, the **Credential for <selected-auth-type>** parameter appears for you to select an existing or create a new authentication credential for that authentication type.
* **HTTP Request Method**: Select the underlying HTTP Request method the node should use. Choose from:
    * **GET**
    * **POST**: If you select this method, you'll also need to select the **Request Format** the node should use for the query payload. Choose from:
        * **GraphQL (Raw)**
        * **JSON**
* **Endpoint**: Enter the GraphQL Endpoint you'd like to hit.
* **Ignore SSL Issues**: When you turn on this control, n8n ignores SSL certificate validation failure.
* **Query**: Enter the GraphQL query you want to execute. Refer to [Related Resources](#related-resources) for information on writing your query.
* **Response Format**: Select the format you'd like to receive query results in. Choose between:
    * **JSON**
    * **String**: If you select this format, enter a **Response Data Property Name** to define the property the string is written to.

## Headers

Enter any **Headers** you want to pass as part of the query as **Name** / **Value** pairs.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/graphql/){:target=_blank .external-link} on n8n's website.

To use the GraphQL node, you need to understand GraphQL query language. GraphQL have their own [Introduction to GraphQL](https://graphql.org/learn/){:target=_blank .external-link} tutorial.

