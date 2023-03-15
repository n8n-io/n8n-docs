# Webhook

The Webhook node allows you to create [webhooks](https://en.wikipedia.org/wiki/Webhook){:target=_blank .external-link}, which can receive data from apps and services when an event occurs. It's a trigger node, which means it can start an n8n workflow. This allows services to connect to n8n and run a workflow.

You can use the Webhook node as a trigger for a workflow when you want to receive data and run a workflow based on the data. The Webhook node also supports returning the data generated at the end of a workflow. This makes it useful for build a workflow to process data and return the results, like an API endpoint.

The webhook allows you to trigger workflows from services that don't have a dedicated app trigger node.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Webhook integrations](https://n8n.io/integrations/webhook/){:target=_blank .external-link} list.


<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed//videoseries?list=PLlET0GsrLUL5niZQDjW56b_AxpvnEZyps" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## Build and test workflows

While building or testing a workflow, use a test webhook URL. Using a test webhook ensures that you can view the incoming data in the editor UI, which is useful for debugging. Select **Execute Node** to register the webhook before sending the data to the test webhook. The test webhook stays active for 120 seconds.

When using the Webhook node on the localhost, run n8n in tunnel mode: [npm with tunnel](/hosting/installation/npm/#n8n-with-tunnel) or [Docker with tunnel](/hosting/installation/docker/#n8n-with-tunnel).


## Production workflows

When your workflow is ready, switch to using the production webhook URL. You can then activate your workflow, and n8n runs it automatically when an external service calls the webhook URL.

When working with a Production webhook, ensure that you have saved and activated the workflow. Data flowing through the webhook isn't visible in the editor UI with the production webhook.

## Node parameters

These are the main node configuration fields.

* **Webhook URLs**
    - **Production**: a production webhook is only registered when a workflow has been activated (via the switch on the top right of the page). You will never see its data in the Editor UI. To save the executions, you can either set that as a global default or you can specify that on a per-workflow basis in the workflow settings. You will then see the data from the workflow under ‘Past Executions'.
    - **Test**: A Test webhook is only registered in the time between executing a workflow via the UI and until the first call gets made (when it displays “waiting for Webhook call”). After the Test webhook gets called for the first time, it displays the data in the Editor UI, and then gets deactivated.

* **Authentication** [TODO]: The Webhook node supports two methods of authenticating a request that it receives:
	* [**Basic Auth**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication){:target=_blank .external-link}: a method of authentication where you must include the username and password in the request header.
	* [**Header Auth**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization){:target=_blank .external-link}: a method of authentication where the specified header parameter must be passed along with the request. This method can be used when you want to authenticate using an API key or an access token, for example.
		!!! tip  Keep in mind
    		The **Credential Data** required for Header Auth credentials will vary on the type used. For example, if you need to provide an `Authorization: Bearer <token>` header, the Credential Data `Name` would be `Authorization` and the `Value` would be `Bearer <token>`.
		

* **HTTP Method**: the Webhook node supports standard [HTTP Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods){:target=_blank .external-link}.
* **Path**: by default, this field contains a randomly generated webhook URL path, to avoid conflicts with other webhook nodes. You can manually specify a URL path. For example, you may need to do this if you use n8n to prototype an API, and want consistent endpoint URLs.
* **Respond**:
    - **Immediately**: the Webhook node returns the response code and the message **Workflow got started**.
    - **When Last Node Finishes**: the Webhook node returns the response code and the data output from the last node executed in the workflow.
		- **Using 'Respond to Webhook' Node**: the Webhook node responds as defined in the [Respond to Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/) node.
* **Response Code**: customize the [HTTP response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status){:target=_blank .external-link} that the Webhook node returns upon successful execution.
* **Response Data**: choose what data to include in the response body.

## Node options

[TODO: might want a table. Availability is a pain]

Select **Add Option** to view more configuration options. The available options depend on your node parameters.

* **Binary Data**: this option is available when the Webhook node is set to receive POST requests. Enabling this setting allows the Webhook node to receive binary data, such as an image or audio file.
* **Ignore Bots**: ignore requests from bots like link previewers and web crawlers.
* **Raw Body**:  specify that the Webhook node will receive data in a raw format, such as JSON or XML.
* **Response Content-Type**: choose the format for the webhook body.
* **Response Headers**: send additional headers in the Webhook response. Refer to [MDN Web Docs | Response header](https://developer.mozilla.org/en-US/docs/Glossary/Response_header){:target=_blank .external-link} to learn more about response headers.
* **Property Name**: by default, n8n returns all available data. For example, if you choose to respond when the last node finishes, n8n returns all data from the last node. You can choose to return 


## Get the webhook URLs

The Webhook node has two URLs: test URL and production URL. n8n displays the URLs at the top of the node panel. Select **Test URL** or **Production URL** to toggle which URL n8n displays.

![Screenshot of the webhook URLs](/_images/integrations/builtin/core-nodes/webhook/webhook-urls.png)

## Add route parameters

Use the **Path** field to add route parameters to the webhook URL path. This is useful when creating an API. The **Path** field can take the following values:

- `/:variable`
- `/path/:variable`
- `/:variable/path`
- `/:variable1/path/:variable2`
- `/:variable1/:variable2`

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

To send a response of type string:

1. Select **Response Mode** > **When Last Node Finishes**.
2. Select **Response Data** > **First Entry JSON**.
3. Select **Add Option** > **Property Name**.
4. Enter the name of the property that contains the response. This defaults to `data`.
5. Connect a Set node to the Webhook node.
6. In the Set node, select **Add Value** > **String**.
7. Enter the name of the property in the **Name** field. The name should match the property name from step 4.
8. Enter the string value in the **Value** field.
9. Toggle **Keep Only Set** to on (green).

When you call the Webhook, it sends the string response from the Set node.





