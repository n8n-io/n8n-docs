---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n public REST API Documentation and Guides
description: Access n8n public REST API documentation and guides. Find comprehensive resources to programmatically perform tasks with the public API instead of the GUI.
contentType: overview
search:
    boost: 5
---

# n8n public REST API

/// info | Feature availability
The n8n API isn't available during the free trial. Please upgrade to access this feature.  
///

Using n8n's public [API](/glossary.md#api), you can programmatically perform many of the same tasks as you can in the GUI. This section introduces n8n's REST API, including:

* How to [authenticate](/api/authentication.md)
* [Paginating](/api/pagination.md) results
* Using the [built-in API playground](/api/using-api-playground.md) (self-hosted n8n only)
* [Endpoint reference](/api/api-reference.md)

n8n provides an [n8n API node](/integrations/builtin/core-nodes/n8n-nodes-base.n8n.md) to access the API in your workflows.

## Learn about REST APIs

The API documentation assumes you are familiar with REST APIs. If you're not, these resources may be helpful:

* [KnowledgeOwl's guide to working with APIs](https://support.knowledgeowl.com/help/working-with-apis){:target=_blank .external-link}: a basic introduction, including examples of how to call REST APIs.
* [IBM Cloud Learn Hub - What is an Application Programming Interface (API)](https://www.ibm.com/cloud/learn/api){:target=_blank .external-link}: this gives a general, but technical, introduction to APIs.
* [IBM Cloud Learn Hub - What is a REST API?](https://www.ibm.com/cloud/learn/rest-apis){:target=_blank .external-link}: more detailed information about REST APIs.
* [MDN web docs - An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview){:target=_blank .external-link}: REST APIs work over HTTP and use HTTP verbs, or methods, to specify the action to perform.

/// tip | Use the API playground (self-hosted n8n only)
Trying out the API in the [playground](/api/using-api-playground.md) can help you understand how APIs work. If you're worried about changing live data, consider setting up a test workflow, or test n8n instance, to explore safely.
///
