---
title: Webhook node common issues 
description: Documentation for common issues and questions in the Webhook node in n8n, a workflow automation platform. Includes details of the issues and suggested solutions.
contentType: [integration, reference]
priority: critical
---

# Common issues and questions

Here are some common issues and questions for the [Webhook node](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md) and suggested solutions.

## Listen for multiple HTTP methods

By default, the Webhook node accepts calls that use a single method. For example, it can accept GET or POST requests, but not both. If you want to accept calls using multiple methods:

1. Open the node **Settings**.
1. Turn on **Allow Multiple HTTP Methods**.
1. Return to **Parameters**. By default, the node now accepts GET and POST calls. You can add other methods in the **HTTP Methods** field.

The Webhook node has an output for each method, so you can perform different actions depending on the method.

## Use the HTTP Request node to trigger the Webhook node

The [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) node makes HTTP requests to the URL you specify.

1. Create a new workflow.
2. Add the HTTP Request node to the workflow.
3. Select a method from the **Request Method** dropdown list. For example, if you select GET as the **HTTP method** in your Webhook node, select GET as the request method in the HTTP Request node.
4. Copy the URL from the Webhook node, and paste it in the **URL** field in the HTTP Request node.
5. If using the test URL for the webhook node: execute the workflow with the Webhook node.
6. Execute the HTTP Request node.

## Use curl to trigger the Webhook node

You can use [curl](https://curl.se/) to make HTTP requests that trigger the Webhook node. 

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
5. Connect an [Edit Fields node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) to the Webhook node.
6. In the Edit Fields node, select **Add Value** > **String**.
7. Enter the name of the property in the **Name** field. The name should match the property name from step 4.
8. Enter the string value in the **Value** field.
9. Toggle **Keep Only Set** to on (green).

When you call the Webhook, it sends the string response from the Edit Fields node.

## Test URL versus Production URL

n8n generates two **Webhook URLs** for each Webhook node: a **Test URL** and a **Production URL**.

While building or testing a workflow, use the **Test URL**. Once you're ready to use your Webhook URL in production, use the **Production URL**.

| **URL type** | **How to trigger** | **Listening duration** | **Data shown in editor UI?** | 
| :--- | --- | --- | :---: |
| Test URL | Select **Listen for test event** and trigger a test event from the source. | 120 seconds | :white_check_mark: |
| Production URL | Activate the workflow | Until workflow deactivated | :x: |

Refer to [Workflow development](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/workflow-development.md) for more information.

## IP addresses in whitelist are failing to connect

If you're unable to connect from IP addresses in your IP whitelist, check if you are running n8n behind a reverse proxy.

If so, set the `N8N_PROXY_HOPS` [environment variable](/hosting/configuration/environment-variables/index.md) to the number of reverse-proxies n8n is running behind.

## Only one webhook per path and method

n8n only permits registering one webhook for each path and HTTP method combination (for example, a `GET` request for `/my-request`). This avoids ambiguity over which webhook should receive requests.

If you receive a message that the path and method you chose are already in use, you can either:

* Deactivate the workflow with the conflicting webhook.
* Change the webhook path and/or method for one of the conflicting webhooks.

## Timeouts on n8n Cloud

n8n Cloud uses Cloudflare to protect against malicious traffic. If your webhook doesn't respond within 100 seconds, the incoming request will fail with a [524 status code](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-524/).

Because of this, for long-running processes that might exceed this limit, you may need to introduce polling logic by configuring two separate webhooks:

* One webhook to start the long-running process and send an immediate response.
* A second webhook that you can call at intervals to query the status of the process and retrieve the result once it's complete.