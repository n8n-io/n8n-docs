# Respond to Webhook

The Respond to Webhook node allows you to control the response to incoming webhooks.

You can use this node in workflows with a [Webhook node](/integrations/core-nodes/n8n-nodes-base.webhook/){:target="_blank"}. To do this, in the Webhook node select the option **Using 'Respond to Webhook' node** from the **Response** operation.

!!! note "Expressions"
    When using [expressions](/code-examples/expressions/){:target="_blank"}, the Respond to Webhook node only runs for the first item in the input data.


## Node reference

The Respond to Webhook node has several required parameters and additional options.

### Main parameters

The node has a **Respond With** parameter that supports the following modes:

- **First Incoming Item** - Respond with the first incoming item's JSON.
- **Text** - Respond with the text defined in the **Response Body** field.
- **JSON** - Respond with a JSON object defined in the **Response Body** field.
- **Binary** - Respond with a binary file defined in the **Response Data Source** field.
- **No Data** - Don't send a response payload.

### Optional parameters

The node has the following options:

- **Response Code** - Set the [response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status){:target="_blank" .external} to be used.
- **Response Headers** - Define the response headers to send.

## Workflow behavior

Workflows that include this node behave as follows:

- If a workflow has two Respond to Webhook nodes, and the second node is executed after the first one, the second node is ignored.
- When the workflow finishes without executing the Respond to Webhook node, it returns a standard message with a 200 status.
- If the workflow errors before the first Respond to Webhook node gets executed, it returns an error message with a 500 status.
- If there is no webhook set up, the workflow execution ignores the Respond to Webhook node.

## Example usage

[This workflow](https://n8n.io/workflows/1306){:target="_blank"} serves an HTML page in response to a GET request.

### 1. Webhook node

This node triggers the workflow when it receives incoming requests (for example, when you open the webhook URL in a browser).

1. In the **Path** field, enter a human-readable value (for example, `my-form`).
2. From the **Respond** dropdown list, select **Using 'Respond to Webhook' node**.
3. Select **Execute Node** to run the node.
4. In a new browser tab, open the URL shown in the **Test URL** field under **Webhook URLs**.

### 2. Respond to Webhook node

This node defines the response to the request received in the previous step.

1. From the **Respond With** dropdown list, select **Text**.
2. In the **Response Body** field, enter the HTML code for the page you want to display (for example, the [Bootstrap Starter template](https://getbootstrap.com/docs/5.1/getting-started/introduction/#starter-template){:target="_blank" .external}).
3. Select **Add Option** > **Response Headers** > **Add Response Header** to add a header to the response with the following values:
   - **Name:** `Content-Type`
   - **Value:** `text/html; charset=UTF-8`
4. Close the **Respond to Webhook** modal and select **Execute Workflow**.
5. Open the **Test URL** from the Webhook node in a new browser tab. The browser should now show the page defined in the **Response Body** field of the Respond to Webhook node.
