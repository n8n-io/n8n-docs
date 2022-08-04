---
title: "Workflow² public REST API"
description: Using n8n's public API, you can programmatically perform many of the same tasks as you can in the GUI. This section introduces n8n's REST API.
tags:
  - Workflow²
  - API

---
# n8n public REST API

Using n8n's public API, you can programmatically perform many of the same tasks as you can in the GUI. This section introduces n8n's REST API, including:

* How to [authenticate](/workflow/api/authentication/)
* [Paginating](/workflow/api/pagination/) results
* Using the [built-in API playground](/workflow/api/using-api-playground/)
* [Endpoint reference](/workflow/api/api-reference/)



## Learn about REST APIs

The API documentation assumes you are familiar with REST APIs. If you're not, these resources may be helpful:

* [KnowledgeOwl's guide to working with APIs](https://support.knowledgeowl.com/help/working-with-apis): a basic introduction, including examples of how to call REST APIs.
* [IBM Cloud Learn Hub - What is an Application Programming Interface (API)](https://www.ibm.com/cloud/learn/api): this gives a general, but technical, introduction to APIs.
* [IBM Cloud Learn Hub - What is a REST API?](https://www.ibm.com/cloud/learn/rest-apis): more detailed information about REST APIs.
* [mdn web docs - An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview): REST APIs work over HTTP, and use HTTP verbs, or methods, to indicate the type of action to perform.

!!! tip "Use the API playground"
    Trying out the API in the [playground](/workflow/api/using-api-playground/) can help you understand how APIs work. If you're worried about changing live data, consider setting up a test workflow, or test n8n instance, to explore safely.