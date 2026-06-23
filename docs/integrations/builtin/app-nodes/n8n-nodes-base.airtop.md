---
title: Airtop node documentation
description: >-
  Learn how to use the Airtop node in n8n. Follow technical documentation to
  integrate Airtop node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Airtop node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.airtop.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.airtop'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.airtop'
layout:
  description:
    visible: false
---

# Airtop node <a href="#airtop-node" id="airtop-node"></a>

Use the Airtop node to automate work in Airtop, and integrate Airtop with other applications. n8n has built-in support for a wide range of Airtop features, enabling you to control a cloud-based web browser for tasks like querying, scraping, and interacting with web pages.

On this page, you'll find a list of operations the Airtop node supports, and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Airtop credentials](../credentials/airtop.md) for guidance on setting up authentication.
{% endhint %}


## Operations <a href="#operations" id="operations"></a>

* Session
    * Create session
    * Save profile on termination
    * Terminate session
* Window
    * Create a new browser window
    * Load URL
    * Take screenshot
    * Close window
* Extraction
    * Query page
    * Query page with pagination
    * Smart scrape page
* Interaction
    * Click an element
    * Hover on an element
    * Type


## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Airtop node documentation integration templates](https://n8n.io/integrations/airtop) or [search all templates](https://n8n.io/workflows/)


## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Airtop's documentation](https://docs.airtop.ai/api-reference/airtop-api) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/lMIxsgtfHVazfAS7oe1v/" %}

Contact [Airtop's Support](https://docs.airtop.ai/guides/misc/support) for assistance or to create a feature request.

## Node reference <a href="#node-reference" id="node-reference"></a>

### Create a session and window <a href="#create-a-session-and-window" id="create-a-session-and-window"></a>

Create an Airtop browser session to get a **Session ID**, then use it to create a new browser window. After this, you can use any extraction or interaction operation.

### Extract content <a href="#extract-content" id="extract-content"></a>

Extract content from a web browser using these operations:

- **Query page**: Extract information from the current window.
- **Query page with pagination**: Extract information from pages with pagination or infinite scrolling.
- **Smart scrape page**: Get the window content as markdown.

Get JSON responses by using the **JSON Output Schema** parameter in query operations.

### Interacting with pages <a href="#interacting-with-pages" id="interacting-with-pages"></a>

Click, hover, or type on elements by describing the element you want to interact with.

### Terminate a session <a href="#terminate-a-session" id="terminate-a-session"></a>

End your session to save resources. Sessions are automatically terminated based on the **Idle Timeout** set in the **Create Session** operation or can be manually terminated using the **Terminate Session** operation.
