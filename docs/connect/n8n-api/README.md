---
title: n8n public REST API Documentation and Guides
description: >-
  Access n8n public REST API documentation and guides. Find comprehensive
  resources to programmatically perform tasks with the public API instead of the
  GUI.
contentType: overview
search:
  boost: 5
hide:
  - feedback
  - kapaButton
nodeTitle: n8n API
originalFilePath: api/index.md
originalUrl: 'https://docs.n8n.io/api'
url: 'https://docs.n8n.io/connect/'
layout:
  description:
    visible: false
---

# n8n public REST API <a href="#n8n-public-rest-api" id="n8n-public-rest-api"></a>

{% hint style="info" %}
**Feature availability**

The n8n API isn't available during the free trial. Please upgrade to access this feature.
{% endhint %}

Using n8n's public API[^1], you can programmatically perform many of the same tasks as you can in the GUI. This section introduces n8n's REST API, including:

* How to [authenticate](authentication.md)
* [Paginating](pagination.md) results
* Using the [built-in API playground](use-an-api-playground.md) (self-hosted n8n only)
* [Endpoint reference](api-reference.md)

n8n provides an [n8n API node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.n8n) to access the API in your workflows.

## Choose your interaction method <a href="#choose-your-interaction-method" id="choose-your-interaction-method"></a>

### REST API (This section) <a href="#rest-api-this-section" id="rest-api-this-section"></a>
Interact with n8n directly using HTTP requests. Ideal for:
- Custom integrations and applications
- Language-agnostic HTTP calls
- Direct REST API usage in workflows

### n8n CLI (Recommended for developers) <a href="#n8n-cli-recommended-for-developers" id="n8n-cli-recommended-for-developers"></a>
Use [n8n CLI](../README.md) for a command-line experience. It wraps the public API and is optimized for:
- Command-line automation and scripting
- CI/CD pipeline integration
- AI agent integration (Claude Code, Cursor, etc.)
- Developers who prefer CLI tools

## Learn about REST APIs <a href="#learn-about-rest-apis" id="learn-about-rest-apis"></a>

The API documentation assumes you are familiar with REST APIs. If you're not, these resources may be helpful:

* [KnowledgeOwl's guide to working with APIs](https://support.knowledgeowl.com/help/working-with-apis): a basic introduction, including examples of how to call REST APIs.
* [IBM Cloud Learn Hub - What is an Application Programming Interface (API)](https://www.ibm.com/cloud/learn/api): this gives a general, but technical, introduction to APIs.
* [IBM Cloud Learn Hub - What is a REST API?](https://www.ibm.com/cloud/learn/rest-apis): more detailed information about REST APIs.
* [MDN web docs - An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview): REST APIs work over HTTP and use HTTP verbs, or methods, to specify the action to perform.

{% hint style="info" %}
**Use the API playground**

Trying out the API in the [playground](use-an-api-playground.md) can help you understand how APIs work. If you're worried about changing live data, consider setting up a test workflow, or test n8n instance, to explore safely.
{% endhint %}

[^1]: APIs, or application programming interfaces, offer programmatic access to a service's data and functionality. APIs make it easier for software to interact with external systems. They're often offered as an alternative to traditional user-focused interfaces accessed through web browsers or UI.
