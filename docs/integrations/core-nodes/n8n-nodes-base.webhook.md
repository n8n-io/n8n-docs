# Webhook

The Webhook node is one of the most powerful nodes in n8n. It allows you to create [webhooks](https://en.wikipedia.org/wiki/Webhook), which can be used to receive data from apps and services when an event occurs. It is a trigger node, which means that it serves as the starting point for an n8n workflow. This allows several different services to connect to n8n and run a workflow when data is received.

!!! note "Keep in mind"
    * When using the Webhook node on localhost, ensure that n8n is running in tunnel mode: [npm with tunnel](/hosting/installation/npm/#n8n-with-tunnel){:target="_blank" .external} or [Docker with tunnel](/hosting/installation/docker/#n8n-with-tunnel){:target="_blank" .external}.
    * When working with a production webhook, ensure that you have saved and activated the workflow. Don't forget that the data flowing through the webhook won't be visible in the Editor UI with the production webhook.

Webhook nodes can be used as triggers for workflows when you want to receive data and run a workflow based on the data. The Webhook node also supports returning the data generated at the end of a workflow. This makes it very useful to build a workflow to process data and return the results, like an API endpoint.

While building or testing a workflow, we recommend that you use a test webhook URL. Using a test webhook ensures that you can view the incoming data in the Editor UI, which is useful for debugging.

Make sure that you select the **Execute Node** button to register the webhook before sending the data to the test webhook. **The test webhook stays active for 120 seconds.** This means that you need to send the data to the Webhook node within this time window, otherwise you need to execute the node again.


🎥 The following playlist will help you learn how to use the Webhook node in n8n.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed//videoseries?list=PLlET0GsrLUL5niZQDjW56b_AxpvnEZyps" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Node Reference

### Main parameters

To use the Webhook node, you need to configure the following parameters:

1. **Webhook URLs**
    - **Production URL**: A Production webhook is only registered when a workflow has been activated (via the Activate toggle on the top right of the page). You will never see its data in the Editor UI. To save the executions, you can either set that as a global default or specify that on a per-workflow basis in the [workflow settings](/workflows/workflows/#workflow-settings){:target="_blank" .external}. You will then see the data from the workflow under 'Past Executions'.

    - **Test URL**: A Test webhook is only registered in the time between executing a workflow via the UI and until the first call gets made (when it displays "waiting for Webhook call"). After the Test webhook gets called for the first time, it displays the data in the Editor UI, and then gets deactivated.

2. **Authentication:** The Webhook node supports two methods of authenticating a request that it receives.
    - [**Basic Auth**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication){:target="_blank" .external-link} - A method of authentication where the specified username and password must be passed along with the request.
    - [**Header Auth**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization){:target="_blank" .external-link} - A method of authentication where the specified header parameter must be passed along with the request. This method can be used when you want to authenticate using an API key or an access token, for example.
    - **None** - This option allows you to use the Webhook node without authentication.

    !!! note  "Keep in mind"
        The **Credential Data** required for Header Auth credentials will vary on the type used. For example, if you need to provide an `Authorization: Bearer <token>` header, the Credential Data `Name` would be `Authorization` and the `Value` would be `Bearer <token>`.


3. **HTTP Method:** The Webhook node supports receiving six types of [HTTP Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods){:target="_blank" .external-link}.

    - [**DELETE Request**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE){:target="_blank" .external-link} - DELETE requests are typically used to delete data from a resource.
    - [**GET Request**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET){:target="_blank" .external-link} - GET requests are typically used to request data from a resource. This type of request is typically used to retrieve data from a service.
    - [**HEAD Request**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD){:target="_blank" .external-link} - HEAD requests are typically used to request headers (information) from a resource, not the data itself.
    - [**PATCH Request**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH){:target="_blank" .external-link} - PATCH requests are typically used to make partial modifications to data from a resource.
    - [**POST Request**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST){:target="_blank" .external-link} - POST requests are typically used to send data to a resource for a create/update operation. This type of request is typically used to send data to a service.
    - [**PUT Request**](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT){:target="_blank" .external-link} - PUT requests are typically used to create a new resource.

4. **Path:** By default, this field contains a randomly generated webhook URL path, to avoid conflicts with other webhook nodes. You can also manually specify a URL path if necessary. A good example would be if you were using n8n to prototype an API, and wanted consistent endpoint URLs.

5. **Respond:** This dropdown list allows you to select between three response modes.
    - **Immediately** - When this option is selected, the Webhook node will return the specified response code as soon as the node executes, along with the message “Workflow got started.”.
    - **When last node finishes** - When this option is selected, the Webhook node will return the specified response code along with the data output from the last node executed in the workflow.
    - **Using 'Respond to Webhook node'** - When this option is selected, the Webhook node will return the response defined in the [Respond to Webhook node](/integrations/core-nodes/n8n-nodes-base.respondToWebhook/){:target="_blank" .external}.

6. **Response Code:** Allows you to customize the [HTTP response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status){:target="_blank" .external-link} that the Webhook node will return upon successful execution.

### Optional parameters

The Webhook node also supports several optional methods that can be used during configuration.

- **Binary Data** - This option is available only when the Webhook node is set to receive POST requests. Setting this to 'true' lets the Webhook node know that it will receive binary data (such as an image/audio). You can use this option when you expect to receive a file via your Webhook node.
- **Ignore Bots** - Setting this to 'true' makes the Webhook node ignore requests from bots like link previewers and web crawlers.
- **Property Name** - This option is available only when the Response Data property is set to 'First Entry JSON'. It is used to specify the name of the property to return the data of, instead of the entire JSON.
- **Raw Body** - This option is used to specify when the Webhook node will receive data in a RAW format, such as JSON or XML.
- **Response Content-Type**
- [**Response Headers**](https://developer.mozilla.org/en-US/docs/Glossary/Response_header){:target="_blank" .external-link} - This option allows you to specify additional headers in the Webhook response.

### Conditional parameters
The Webhook node also supports several other parameters, that are used only in certain configurations.

- **Response Data:** This option is available only when set to respond when ‘Last node finishes'. It allows you to choose which data to return:
    - **All Entries** - Choose this option to return all the data generated by the last node in the workflow, as an array.
    - **First Entry JSON** - Choose this option to return the first data entry of the last node in the workflow, as a JSON object.
    - **First Entry Binary** - Choose this option to return the binary data of the first entry of the last node in the workflow, as a binary file.
    - **No Response Body:** Choose this option to return a response code without a body.

## Example Usage

This workflow allows you to receive the weather information of a city using the Webhook and the OpenWeatherMap nodes. You can also find the [workflow](https://n8n.io/workflows/807){:target="_blank" .external} on n8n.io. This example usage workflow uses the following nodes:

- [Webhook]()
- [OpenWeatherMap](/integrations/nodes/n8n-nodes-base.openWeatherMap/){:target="_blank" .external}
- [Set](/integrations/core-nodes/n8n-nodes-base.set/){:target="_blank" .external}

The final workflow should look like the following image.

![A workflow with the Webhook node](/_images/integrations/core-nodes/webhook/workflow.png)

### 1. Webhook node

This node will trigger the workflow. We will make a GET request to the Test URL and pass on a query parameter `city`. We will use the value of this query parameter in the next node in the workflow.

1. From **Webhook URLs**, select the 'Test' tab and copy the displayed URL. We will make a GET request to this URL later on.
2. From **Respond**, select 'When last node finishes'.
3. From **Response Data**, select 'All Entries'.
4. Save the workflow to register the webhook.
5. Select **Execute Node** to run the node.
6. In a new browser tab, paste the Test URL you copied in the previous step and append `?city=Berlin` to it. This query will request data for a specific value (`Berlin`) from a query parameter (`city`). The URL should look like this:`https://your-n8n.url/webhook/path?city=Berlin`.
7. Press Enter (or Return) to make a request to the Test Webhook URL.

In the screenshot below, you will notice that the node triggers the workflow and receives a query parameter. We will use the value of the query parameter in the next node in the workflow.

![Using the Webhook node to trigger the workflow](/_images/integrations/core-nodes/webhook/webhook_node.png)

### 2. OpenWeatherMap node

This node will return data about the current weather for the city that we received in the previous node.

1. In the **Credential for OpenWeatherMap API**, select **Create New** and add your credentials (Access Token). Learn how to do that in the [node credentials docs](/integrations/credentials/openWeatherMap/){:target="_blank" .external}.
2. In the **City** parameter, select the gear icon next to the field and select **Add Expression**.
3. In the *Expression* box, write the following expression: `{{$node["Webhook"].json["query"]["city"]}}`.<br>
   You can also select this expression from the **Variable Selector:** Nodes > Webhook > Output Data > JSON > query > city.
4. Select ***Execute Node** to run the node. The node will return data about the current weather in Berlin.

![Using the OpenWeatherMap node to get weather updates for Berlin](/_images/integrations/core-nodes/webhook/openweathermap_node.png)

### 3. Set node

1. Select **Add Value** and select 'String' from the dropdown list.
2. In the **Name** field enter `weather`.
3. In the **Value** field, select **Add Expression**.
4. In the *Expression* box, write the following expression: The weather in `{{$node["OpenWeatherMap"].json["name"]}}`: `{{$node["OpenWeatherMap"].json["main"]["temp"]}}` °C with `{{$node["OpenWeatherMap"].json["weather"][0]["description"]}}`.
   You can also select the three expressions from the **Variable Selector**.
5. Toggle **Keep Only Set** to `true`. This option ensures that only the data set in this node get passed on to the next nodes in the workflow.
6. Select **Execute Node** to run the node.

![Using the Set node to set the values for temp and description](/_images/integrations/core-nodes/webhook/set_node.png)

Save the workflow and execute it again by clicking on the ***Execute Workflow*** button in the Editor UI. This time you will receive the temperature and description as the response in the browser.

![Webhook node response in browser](/_images/integrations/core-nodes/webhook/response_browser.png)

!!! note "Activate workflow for production"
    This example workflow uses the Webhook node, which is a Trigger node. You'll need to save the workflow and then select the Activate toggle on the top right of the screen to activate the workflow. Your workflow will then be triggered every time a GET request is sent to the ***Production*** webhook URL.



## FAQs

### Where to find the Webhook URLs?

In the node parameters section, in the Webhook URLs toggle, you will find the Test URL and the Production URL.

By default, the node displays the Test URL. If you want the Production URL, select the **Test** tab. Select the displayed URL to copy it.

Here is a GIF demonstrating how to retrieve the test and production webhook URLs in n8n.

![Retrieving the Test and Production URLs from the Webhook node](/_images/integrations/core-nodes/webhook/webhook-url.gif)

### How to use the HTTP Request node to trigger the Webhook node?

The [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/){:target="_blank" .external} node is used to make HTTP requests to the URL you specify. To use the HTTP Request node to trigger the Webhook node, follow the steps below.

1. Create a new workflow.
2. Add the HTTP Request node to the workflow.
3. Select the appropriate method from the **Request Method** dropdown list.
    For example, if you have selected GET as the HTTP method in your Webhook node, select GET as the request method in the HTTP Request node.
4. Copy the URL from the Webhook node, and paste it in the **URL** field in the HTTP Request node.
5. Execute the workflow with the Webhook node (if you're using the Test URL).
6. Execute the HTTP Request node.

Here is a video demonstrating how to send a request to a Webhook based workflow using the HTTP Request node:

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube-nocookie.com/embed/WLIDTRJGfWw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### How to use route parameters?

You can add route parameters to the webhook URL path. This is useful when you are creating an API. The *Path* field can take the following values:

- `/:variable`
- `/path/:variable`
- `/:variable/path`
- `/:variable1/path/:variable2`
- `/:variable1/:variable2`

### How to use cURL to trigger the Webhook node?

You can use [cURL](https://curl.se/){:target="_blank" .external-link} to make HTTP requests that will trigger the Webhook node. To use cURL, make sure that you have installed it on your machine. You can follow [this guide](https://www.booleanworld.com/curl-command-tutorial-examples/){:target="_blank" .external-link} to install cURL on your machine.
Based on your use-case, you can make an HTTP request with or without any parameters. You can also send files with the HTTP request using cURL.

**Note:** In the following commands, replace `https://your-n8n.url/webhook/path` with your webhook URL.

#### Make an HTTP request without any parameters
 To make a GET request without any parameters, use the following command in your terminal.

```sh
curl --request GET https://your-n8n.url/webhook/path
```

To make a POST request, use the following command.

```bash
curl --request POST https://your-n8n.url/webhook/path
```

#### Make an HTTP request with body parameter

To make an HTTP request with a body parameter, use the following command.

```sh
curl --request GET https://your-n8n.url/webhook/path --data 'key=value'
```

#### Make an HTTP request with header parameter

To make an HTTP request with a header parameter, use the following command.

```sh
curl --request GET https://your-n8n.url/webhook/path --header 'key=value'
```

#### Make an HTTP request to send a file

To send a file with the HTTP request, use the following command.

```sh
curl --request GET https://your-n8n.url/webhook/path --from 'key=@/path/to/file'
```
Replace `/path/to/file` with the path of the file you want to send.

### How to send a response of type `string`?

To send a response of type string, follow the steps below.

1. Select 'When last node finishes' from the **Respond** dropdown list.
2. Select 'First Entry JSON' from the **Response Data** dropdown list.
3. Select 'Add Option' and select 'Property Name' from the dropdown list.
4. Enter the name of the property that contains the response.
5. Connect a Set node to the Webhook node.
6. In the Set node, select 'Add Value' and select 'String'.
7. Enter the name of the property in the **Name** field. The name should match the property name from step 4.
8. Enter the string value in the **Value** field.
9. Toggle **Keep Only Set** to `true`.

When the Webhook gets called, it will send the string response that was set in the Set node.
