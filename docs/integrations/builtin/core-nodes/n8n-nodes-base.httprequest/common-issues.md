---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: HTTP Request node common issues 
description: Documentation for common issues and questions in the HTTP Request node in n8n, a workflow automation platform. Includes details of the issue and suggested resolutions.
contentType: integration
priority: critical
---

# HTTP Request node common issues

Here are some common errors and issues with the [HTTP Request node](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/) and steps to resolve or troubleshoot them.

## Bad request - please check your parameters

This error displays when the node receives a 400 error indicating a bad request. This error most often occurs because:

* You're using an invalid name or value in a **Query Parameter**.
* You're passing array values in a **Query Parameter** but the array isn't formatted correctly. Try using the **Array Format in Query Parameters** option. Review the API documentation for your service and the options available there to ensure your array is formatted properly.

## The resource you are requesting could not be found

This error displays when the endpoint **URL** you entered is invalid.

This may be due to a typo in the URL or a deprecated API. Refer to your service's API documentation to verify you have a valid endpoint.

## Forbidden - perhaps check your credentials

This error displays when the node receives a 403 error indicating authentication failed.

To resolve, review the selected credentials and make sure you can authenticate with them. You may need to:

* Update permissions or scopes so that your API key or account is allowed to perform the operation you've selected.
* Format your generic credential in a different way.
* Generate a new API key or token with the appropriate permissions or scopes.