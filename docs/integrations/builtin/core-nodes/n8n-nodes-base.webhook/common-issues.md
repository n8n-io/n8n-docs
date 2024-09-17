---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Webhook node common issues 
description: Documentation for common issues and questions in the Webhook node in n8n, a workflow automation platform. Includes details of the issues and suggested solutions.
contentType: integration
priority: critical
---

# Common issues and questions

Here are some common issues and questions for the [Webhook node](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) and suggested solutions.

## Listen for multiple HTTP methods

By default, the Webhook node accepts calls that use a single method. For example, it can accept GET or POST requests, but not both. If you want to accept calls using multiple methods:

1. Open the node **Settings**.
1. Turn on **Allow Multiple HTTP Methods**.
1. Return to **Parameters**. By default, the node now accepts GET and POST calls. You can add other methods in the **HTTP Methods** field.

The Webhook node has an output for each method, so you can perform different actions depending on the method.

## Use the HTTP Request node to trigger the Webhook node

The [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node makes HTTP requests to the URL you specify.

1. Create a new workflow.
2. Add the HTTP Request node to the workflow.
3. Select a method from the **Request Method** dropdown list. For example, if you select GET as the **HTTP method** in your Webhook node, select GET as the request method in the HTTP Request node.
4. Copy the URL from the Webhook node, and paste it in the **URL** field in the HTTP Request node.
5. If using the test URL for the webhook node: execute the workflow with the Webhook node.
6. Execute the HTTP Request node.

## Use curl to trigger the Webhook node

You can use [curl](https://curl.se/){:target=_blank .external-link} to make HTTP requests that trigger the Webhook node. 

/// note
In the examples, replace `<https://your-n8n.url/webhook/path>` with your webhook URL.  
The examples make GET requests. You can use whichever HTTP method you set in **HTTP Method**.
///

Make an HTTP request without any parameters:

```sh
curl --request GET <https://your-n8n.url/webhook/path>
```

Make an HTTP request with a body parameter:

```sh
curl --request GET <https://your-n8n.url/webhook/path> --data 'key=value'
```

Make an HTTP request with header parameter:

```sh
curl --request GET <https://your-n8n.url/webhook/path> --header 'key=value'
```

Make an HTTP request to send a file:

```sh
curl --request GET <https://your-n8n.url/webhook/path> --from 'key=@/path/to/file'
```
Replace `/path/to/file` with the path of the file you want to send.

## Send a response of type string

By default, the response format is JSON or an array. To send a response of type string:

1. Select **Response Mode** > **When Last Node Finishes**.
2. Select **Response Data** > **First Entry JSON**.
3. Select **Add Option** > **Property Name**.
4. Enter the name of the property that contains the response. This defaults to `data`.
5. Connect an [Edit Fields node](/integrations/builtin/core-nodes/n8n-nodes-base.set/) to the Webhook node.
6. In the Edit Fields node, select **Add Value** > **String**.
7. Enter the name of the property in the **Name** field. The name should match the property name from step 4.
8. Enter the string value in the **Value** field.
9. Toggle **Keep Only Set** to on (green).

When you call the Webhook, it sends the string response from the Edit Fields node.
