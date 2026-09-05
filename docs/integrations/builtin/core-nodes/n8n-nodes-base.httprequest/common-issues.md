---
title: HTTP Request node common issues
description: >-
  Documentation for common issues and questions in the HTTP Request node in n8n,
  a workflow automation platform. Includes details of the issue and suggested
  solutions.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: HTTP Request node common issues
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.httprequest/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/common-issues
layout:
  description:
    visible: false
---

# HTTP Request node common issues <a href="#http-request-node-common-issues" id="http-request-node-common-issues"></a>

Here are some common errors and issues with the [HTTP Request node](README.md) and steps to resolve or troubleshoot them.

## Bad request - please check your parameters <a href="#bad-request-please-check-your-parameters" id="bad-request-please-check-your-parameters"></a>

This error displays when the node receives a 400 error indicating a bad request. This error most often occurs because:

* You're using an invalid name or value in a **Query Parameter**.
* You're passing array values in a **Query Parameter** but the array isn't formatted correctly. Try using the [**Array Format in Query Parameters**](README.md#array-format-in-query-parameters) option.

Review the API documentation for your service to format your query parameters.


## The resource you are requesting could not be found <a href="#the-resource-you-are-requesting-could-not-be-found" id="the-resource-you-are-requesting-could-not-be-found"></a>


This error displays when the endpoint **URL** you entered is invalid.

This may be due to a typo in the URL or a deprecated API. Refer to your service's API documentation to verify you have a valid endpoint.


## Connection refused (ECONNREFUSED) <a href="#connection-refused-econnrefused" id="connection-refused-econnrefused"></a>


This error displays when the node reaches a host on the network but the target port has no listener. The TCP connection is actively refused. It isn't a DNS failure, a timeout, or a firewall drop.

On self-hosted n8n, the most common cause is Docker networking. Inside the n8n container, `localhost` and `127.0.0.1` point at the container itself, not at the host machine. A request to `http://localhost:5000` from the node lands on the n8n container's port 5000, where nothing listens.

To resolve, address the target by a name the container can route to:

* **Target on the host machine, Docker Desktop (Mac or Windows)**: use `http://host.docker.internal:<port>` in the **URL** field. Docker Desktop adds this hostname automatically.
* **Target on the host machine, Linux**: pass `--add-host=host.docker.internal:host-gateway` to the container, or set `extra_hosts` in `docker-compose.yml`:
    ```yaml
    services:
      n8n:
        image: n8nio/n8n
        extra_hosts:
          - "host.docker.internal:host-gateway"
    ```
    The same fix is documented for the [MySQL node](../../app-nodes/n8n-nodes-base.mysql/common-issues.md#cant-connect-to-a-local-mysql-server-when-using-docker).
* **Target in another container on the same Compose stack**: use the service name as the hostname, for example `http://my-api:5000`. Reference the container's internal port, not the published `ports:` mapping.

A separate cause appears on Node.js 17 and above, even outside Docker: `localhost` resolves to the IPv6 address `::1` before `127.0.0.1`. If the target binds only to `127.0.0.1`, the IPv6 attempt is refused and the fallback to IPv4 doesn't always succeed inside the HTTP Request node.

Use `http://127.0.0.1:<port>` in the **URL** field instead of `localhost`.

To verify the fix before re-running the workflow, exec into the n8n container and try the URL with `wget`:

```sh
docker exec -it n8n wget -qO- http://host.docker.internal:5000/health
```

If `wget` from inside the container succeeds, the HTTP Request node succeeds too. If `wget` also returns "connection refused," the cause is the network or the target service, not n8n.

On n8n Cloud, workflows run on n8n's infrastructure. There's no `localhost` and no path to a service on your machine. Expose local-only targets through a tunnel and use the public URL in the HTTP Request node.

## JSON parameter need to be an valid JSON <a href="#json-parameter-need-to-be-an-valid-json" id="json-parameter-need-to-be-an-valid-json"></a>

This error displays when you've passed a parameter as JSON and it's not formatted as valid JSON.

To resolve, review the JSON you've entered for these issues:

* Test your JSON in a JSON checker or syntax parser to find errors like missing quotation marks, extra or missing commas, incorrectly formatted arrays, extra or missing square brackets or curly brackets, and so on.
* If you've used an **Expression** in the node, be sure you've wrapped the entire JSON in double curly brackets, for example:
    ```
    {{
        {
        "myjson":
        {
            "name1": "value1",
            "name2": "value2",
            "array1":
                ["value1","value2"]
        }
        }
    }}
    ```

## Forbidden - perhaps check your credentials <a href="#forbidden-perhaps-check-your-credentials" id="forbidden-perhaps-check-your-credentials"></a>

This error displays when the node receives a 403 error indicating authentication failed.

To resolve, review the selected credentials and make sure you can authenticate with them. You may need to:

* Update permissions or scopes so that your API key or account can perform the operation you've selected.
* Format your generic credential in a different way.
* Generate a new API key or token with the appropriate permissions or scopes.

## 429 - The service is receiving too many requests from you <a href="#429-the-service-is-receiving-too-many-requests-from-you" id="429-the-service-is-receiving-too-many-requests-from-you"></a>

This error displays when the node receives a [429 error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) from the service that you're calling. This often means that you have hit the rate limits of that service. You can find out more on the [Handling API rate limits](../../handle-rate-limits.md) page.

To resolve the error, you can use one of the built-in options of the HTTP request node:

### Batching <a href="#batching" id="batching"></a>

Use this option to send requests in batches and introduce a delay between them.

1. In the HTTP Request node, select **Add Option > Batching**.
1. Set **Items per Batch** to the number of input items to include in each request.
1. Set **Batch Interval (ms)** to introduce a delay between requests in milliseconds. For example, to send one request to an API per second, set **Batch Interval (ms)** to `1000`.

### Retry on Fail <a href="#retry-on-fail" id="retry-on-fail"></a>

Use this option to retry the node after a failed attempt.

1. In the HTTP Request node, go to **Settings** and enable **Retry on Fail**.
1. Set **Max Tries** to the maximum number of times n8n should retry the node.
1. Set **Wait Between Tries (ms)** to the desired delay in milliseconds between retries. For example, to wait one second before retrying the request again, set **Wait Between Tries (ms)** to `1000`.

## Your uploaded file arrives with the wrong file name

When you send a file with **Body Content Type** set to **Form-Data**, n8n takes the file name of the `multipart/form-data` part from the binary data, not from the **Name** field. **Name** sets the form field name only. If the binary data has no file name, n8n sends `file`.

This matters when the receiving API identifies uploads by file name instead of by form field name, or when it requires a particular name or extension. The request arrives, but the API rejects it, often with a 400 error saying the file is missing. For example, the **Convert to Text File** operation of the [Convert to File node](../n8n-nodes-base.converttofile.md) names its output `file.txt` by default, so an API that expects `index.html` doesn't find it.

To resolve, set the file name on the binary data before the HTTP Request node:

* In the Convert to File node, set the **File Name** option to the name the API expects.
* In a [Code node](../n8n-nodes-base.code/README.md), set the file name on the binary property:

```javascript
for (const item of $input.all()) {
	item.binary.data.fileName = 'index.html';
}
return $input.all();
```

n8n copies the MIME type stored on the binary data into the `Content-Type` of the part, so set that too if your API checks it.

## Unsupported media type (415) when you send a file

This error displays when the API expects `multipart/form-data` but the request body isn't multipart.

**Body Content Type > n8n Binary File** sends the file as the whole request body. n8n sets `Content-Type` to the MIME type stored on the binary data, or to `application/octet-stream` when it has none, and doesn't add a multipart envelope or a boundary. An API that only accepts multipart uploads rejects this.

To send the same file as a multipart upload:

1. Set **Body Content Type** to **Form-Data**.
1. Add a **Body Parameters** entry and set its **Type** to **n8n Binary File**.
1. Set **Name** to the form field name from the API documentation.
1. Set **Input Data Field Name** to the binary property that holds the file, such as `data`.
