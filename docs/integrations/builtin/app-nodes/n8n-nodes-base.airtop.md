---
title: Airtop node documentation
description: Learn how to use the Airtop node in n8n. Follow technical documentation to integrate Airtop node into your workflows.
contentType: [integration, reference]
---

# Airtop node

Use the Airtop node to automate work in Airtop, and integrate Airtop with other applications. n8n has built-in support for a wide range of Airtop features, enabling you to control a cloud-based web browser for tasks like querying, scraping, and interacting with web pages.

On this page, you'll find a list of operations the Airtop node supports, and links to more resources.

///  note  | Credentials
Refer to [Airtop credentials](/integrations/builtin/credentials/airtop.md) for guidance on setting up authentication.
///


## Operations

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


## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'airtop') ]]


## Related resources

Refer to [Airtop's documentation](https://docs.airtop.ai/api-reference/airtop-api) for more information about the service.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

Contact [Airtop's Support](https://docs.airtop.ai/guides/misc/support) for assistance or to create a feature request.

## Node reference

### Create a session and window

Create an Airtop browser session to get a **Session ID**, then use it to create a new browser window. After this, you can use any extraction or interaction operation.

### Extract content

Extract content from a web browser using these operations:

- **Query page**: Extract information from the current window.
- **Query page with pagination**: Extract information from pages with pagination or infinite scrolling.
- **Smart scrape page**: Get the window content as markdown.

Get JSON responses by using the **JSON Output Schema** parameter in query operations.

### Interacting with pages

Click, hover, or type on elements by describing the element you want to interact with.

### Terminate a session

End your session to save resources. Sessions are automatically terminated based on the **Idle Timeout** set in the **Create Session** operation or can be manually terminated using the **Terminate Session** operation.
