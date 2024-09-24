---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: HTTP Request node common issues 
description: Documentation for common issues and questions in the HTTP Request node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: integration
priority: critical
---

# HTTP Request node common issues

Here are some common errors and issues with the [HTTP Request node](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) and steps to resolve or troubleshoot them.

## Bad request - please check your parameters

This error displays when the node receives a 400 error indicating a bad request. This error most often occurs because:

* You're using an invalid name or value in a **Query Parameter**.
* You're passing array values in a **Query Parameter** but the array isn't formatted correctly. Try using the [**Array Format in Query Parameters**](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/#array-format-in-query-parameters) option.

Review the API documentation for your service to format your query parameters.

<!-- vale off -->
## The resource you are requesting could not be found
<!-- vale on -->

This error displays when the endpoint **URL** you entered is invalid.

This may be due to a typo in the URL or a deprecated API. Refer to your service's API documentation to verify you have a valid endpoint.

## JSON parameter need to be an valid JSON

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

## Forbidden - perhaps check your credentials

This error displays when the node receives a 403 error indicating authentication failed.

To resolve, review the selected credentials and make sure you can authenticate with them. You may need to:

* Update permissions or scopes so that your API key or account can perform the operation you've selected.
* Format your generic credential in a different way.
* Generate a new API key or token with the appropriate permissions or scopes.
