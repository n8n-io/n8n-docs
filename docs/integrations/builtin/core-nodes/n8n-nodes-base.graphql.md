---
title: GraphQL
description: Documentation for the GraphQL node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: medium
---

# GraphQL


[GraphQL](https://graphql.org/){:target=_blank .external-link} is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. Use the GraphQL node to query a GraphQL endpoint using either HTTP requests or WebSocket connections for real-time subscriptions.

## Connection Mode

The GraphQL node supports two connection modes:

### HTTP Mode
Standard HTTP requests for one-time GraphQL queries and mutations. This is the default mode and works with most GraphQL APIs.

### WebSocket Mode
WebSocket connections for real-time GraphQL subscriptions. Use this mode when you need to receive continuous updates from a GraphQL subscription.
=======
[GraphQL](https://graphql.org/) is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. Use the GraphQL node to query a GraphQL endpoint.

## Node parameters

--8<-- "_snippets/integrations/builtin/app-nodes/ai-tools.md"

### Connection Mode

Select the connection mode to use:

* **HTTP**: Standard HTTP request for one-time queries
* **WebSocket**: WebSocket connection for real-time subscriptions

### Authentication

Select the type of authentication to use. **Note**: Authentication options are only available for HTTP mode.

If you select anything other than **None**, the **Credential for <selected-auth-type>** parameter appears for you to select an existing or create a new authentication credential for that authentication type.

### HTTP Request Method

Select the underlying HTTP Request method the node should use. Choose from:

* **GET**
* **POST**: If you select this method, you'll also need to select the **Request Format** the node should use for the query payload. Choose from:
    * **GraphQL (Raw)**
    * **JSON**

### URL

Enter the GraphQL endpoint URL:
* For HTTP mode: Use `https://` URLs (e.g., `https://api.example.com/graphql`)
* For WebSocket mode: Use `wss://` URLs (e.g., `wss://api.example.com/graphql`)

### Query

Enter the GraphQL query you want to execute.

### Variables

Enter query variables as a JSON object. This parameter is available for:
* HTTP POST requests with JSON format
* WebSocket subscriptions

### Operation Name

Enter the name of the operation to execute. This is optional and only available for HTTP POST requests with JSON format.

### Response Format

Select the format you'd like to receive query results in. Choose between:

* **JSON**
* **String**: If you select this format, enter a **Response Data Property Name** to define the property the string is written to.

### Headers

Enter any **Headers** you want to pass as part of the query as **Name** / **Value** pairs.

### Ignore SSL Issues

When you turn on this control, n8n ignores SSL certificate validation failure.

## WebSocket-specific parameters

These parameters are only available when **Connection Mode** is set to **WebSocket**.

### Connection Timeout

Set the timeout for WebSocket connection establishment in seconds. Default is 30 seconds.

### Subscription Timeout

Set the timeout for subscription messages in seconds. Default is 300 seconds. This timeout resets after each message is received.

### WebSocket Subprotocol

Select the WebSocket subprotocol to use:

* **graphql-transport-ws**: Modern GraphQL over WebSocket protocol (recommended)
* **graphql-ws**: Alternative GraphQL WebSocket protocol
* **graphql**: Legacy GraphQL WebSocket protocol

## Request Format (HTTP mode only)

When using HTTP POST method, select the request format:

* **JSON (Recommended)**: JSON object with query, variables, and operationName properties. The standard and most widely supported format for GraphQL requests.
* **GraphQL (Raw)**: Raw GraphQL query string. Not all servers support this format. Use JSON for better compatibility.

## Response Data Property Name

When **Response Format** is set to **String**, enter the name of the property to which the response data should be written.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'graphql') ]]

## WebSocket Usage Examples

### Real-time Subscription

For real-time data, use WebSocket mode with a subscription query:

```graphql
subscription {
  newMessage {
    id
    content
    timestamp
  }
}
```

### Connection Setup

The node automatically handles:
* WebSocket connection establishment
* Protocol-specific initialization messages
* Subscription message formatting
* Real-time message collection
* Connection cleanup

### Message Handling

The node collects all subscription messages and returns them as an array. Each message is processed according to the selected subprotocol.

## Related resources

To use the GraphQL node, you need to understand GraphQL query language. GraphQL have their own [Introduction to GraphQL](https://graphql.org/learn/) tutorial.

For WebSocket subscriptions, refer to the [GraphQL over WebSocket Protocol](https://github.com/enisdenjo/graphql-ws){:target=_blank .external-link} documentation.

