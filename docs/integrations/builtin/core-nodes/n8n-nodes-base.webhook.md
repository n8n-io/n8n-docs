---
title: Webhook
description: Documentation for the Webhook node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
tags:
  - "webhook set route parameters"
  - "get webhook URL"
  - "call workflow externally"
hide:
  - tags
---

# Webhook

Use the Webhook node to create [webhooks](https://en.wikipedia.org/wiki/Webhook){:target=_blank .external-link}, which can receive data from apps and services when an event occurs. It's a trigger node, which means it can start an n8n workflow. This allows services to connect to n8n and run a workflow.

You can use the Webhook node as a trigger for a workflow when you want to receive data and run a workflow based on the data. The Webhook node also supports returning the data generated at the end of a workflow. This makes it useful for build a workflow to process data and return the results, like an API endpoint.

The webhook allows you to trigger workflows from services that don't have a dedicated app trigger node.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Webhook integrations](https://n8n.io/integrations/webhook/){:target=_blank .external-link} list.



## Build and test workflows

While building or testing a workflow, use a test webhook URL. Using a test webhook ensures that you can view the incoming data in the editor UI, which is useful for debugging. Select **Execute Node** to register the webhook before sending the data to the test webhook. The test webhook stays active for 120 seconds.

When using the Webhook node on the localhost, run n8n in tunnel mode: [npm with tunnel](/hosting/installation/npm/#n8n-with-tunnel) or [Docker with tunnel](/hosting/installation/docker/#n8n-with-tunnel).

<video width="840" controls>
<source src="/_video/integrations/builtin/core-nodes/webhook/webhook-node-intro.mp4" type="video/mp4">
</video>

## Production workflows

When your workflow is ready, switch to using the production webhook URL. You can then activate your workflow, and n8n runs it automatically when an external service calls the webhook URL.

When working with a Production webhook, ensure that you have saved and activated the workflow. Data flowing through the webhook isn't visible in the editor UI with the production webhook.

## Node parameters

These are the main node configuration fields.

### Webhook URLs

The Webhook node has two URLs: test URL and production URL. n8n displays the URLs at the top of the node panel. Select **Test URL** or **Production URL** to toggle which URL n8n displays.

![Screenshot of the webhook URLs](/_images/integrations/builtin/core-nodes/webhook/webhook-urls.png)

* **Test**: n8n registers a test webhook when you select **Listen for event** or **Execute workflow**, if the workflow isn't active. When you call the webhook URL, n8n displays the data in the workflow.
* **Production**: n8n registers a production webhook when you activate the workflow. When using the production URL, n8n doesn't display the data in the workflow. You can still view workflow data for a production execution: select the **Executions** tab in the workflow, then select the workflow execution you want to view.


### Authentication

You can require authentication for any service calling your webhook URL.

* [**Basic Auth**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication){:target=_blank .external-link}: a method of authentication where calls to the webhook URL must include the username and password in the request header.
* [**Header Auth**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization){:target=_blank .external-link}: a method of authentication where calls to the webhook URL must include the specified header parameter. For example, use this method when you want to authenticate using an API key or an access token.
		
	!!! note  Credential data can vary
	The **Credential Data** required for header auth credentials depends on the type used. For example, if you need to provide an `Authorization: Bearer <token>` header, the Credential Data `Name` will be `Authorization` and the `Value` will be `Bearer <token>`.
		

### HTTP Method

The Webhook node supports standard [HTTP Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods){:target=_blank .external-link}.

### Path

By default, this field contains a randomly generated webhook URL path, to avoid conflicts with other webhook nodes. 

You can manually specify a URL path, including adding route parameters. For example, you may need to do this if you use n8n to prototype an API, and want consistent endpoint URLs.

The **Path** field can take the following formats:

- `/:variable`
- `/path/:variable`
- `/:variable/path`
- `/:variable1/path/:variable2`
- `/:variable1/:variable2`

### Respond

* **Immediately**: the Webhook node returns the response code and the message **Workflow got started**.
* **When Last Node Finishes**: the Webhook node returns the response code and the data output from the last node executed in the workflow.
* **Using 'Respond to Webhook' Node**: the Webhook node responds as defined in the [Respond to Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/) node.

### Response Code

Customize the [HTTP response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status){:target=_blank .external-link} that the Webhook node returns upon successful execution.

### Response Data

Choose what data to include in the response body.


## Node options

Select **Add Option** to view more configuration options. The available options depend on your node parameters. Refer to the table for option availability.


* **Binary Data**: enabling this setting allows the Webhook node to receive binary data, such as an image or audio file.
* **Ignore Bots**: ignore requests from bots like link previewers and web crawlers.
* **No Response Body**: enable this to prevent n8n sending a body with the response.
* **Raw Body**:  specify that the Webhook node will receive data in a raw format, such as JSON or XML.
* **Response Content-Type**: choose the format for the webhook body.
* **Response Data**: send custom data with the response.
* **Response Headers**: send additional headers in the Webhook response. Refer to [MDN Web Docs | Response header](https://developer.mozilla.org/en-US/docs/Glossary/Response_header){:target=_blank .external-link} to learn more about response headers.
* **Property Name**: by default, n8n returns all available data. You can choose to return a specific JSON key, so that n8n returns the value.


| Option | Required node configuration |
| ------ | --------------------------- | 
| Binary data | Either: <br /> HTTP Method > POST <br /> HTTP Method > PATCH <br /> HTTP Method > PUT |
| Ignore Bots | Any |
| No Response Body | Respond > Immediately |
| Raw Body | Any |
| Response Content-Type | Both: <br /> Respond > When Last Node Finishes <br /> Response Data > First Entry JSON |
| Response Data | Respond > Immediately |
| Response Headers | Any |
| Property Name | Both: <br /> Respond > When Last Node Finishes <br /> Response Data > First Entry JSON |

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

!!! note
	In the examples, replace `<https://your-n8n.url/webhook/path>` with your webhook URL.  
	The examples make GET requests. You can use whichever HTTP method you set in **HTTP Method**.

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
5. Connect an Edit Fields node to the Webhook node.
6. In the Edit Fields node, select **Add Value** > **String**.
7. Enter the name of the property in the **Name** field. The name should match the property name from step 4.
8. Enter the string value in the **Value** field.
9. Toggle **Keep Only Set** to on (green).

When you call the Webhook, it sends the string response from the Edit Fields node.






