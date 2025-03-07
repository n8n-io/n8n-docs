---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Airtop node documentation
description: Learn how to use the Airtop node in n8n. Follow technical documentation to integrate Airtop node into your workflows.
contentType: [integration, reference]
---

<!-- 
The title should be the name of the integration 
Match the brand name exactly. For example, GitHub NOT Github
When you add this node to mkdocs.yml in the navigation, prepend it with the `_Name_:` only, for example ActiveCampaign: _relativepath_
-->
# Airtop node

Use the Airtop node to automate work in Airtop, and integrate Airtop with other applications. n8n has built-in support for a wide range of Airtop features, enabling you to control a cloud-based web browser for tasks like querying, scraping, and interacting with web pages.

On this page, you'll find a list of operations the Airtop node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/airtop.md).
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

Refer to [Airtop's documentation](https://docs.airtop.ai/){:target=_blank .external-link} for more information about the service.

Contact [Airtop's Support](https://docs.airtop.ai/guides/misc/support) for assistance or to create a feature request.

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"

## Node reference

### Create a session and window

Create an Airtop browser session to get a Session ID, then use it to create a new browser window. After this, you can use any extraction or interaction operation.

### Content extraction

Extract content from a web browser using these operations:

- Query page: Extract information from the current window
- Query page with pagination: Extract information from pages with pagination or infinite scrolling
- Smart scrape: Get window content as markdown

Get JSON responses by using the **JSON Output Schema** parameter in query operations.

### Interacting with pages

Click, hover, or type on elements by describing the element you want to interact with.

### Terminate session

End your session to save resources. Sessions are automatically terminated based on the _Idle Timeout_ in the _Create Session_ operation or can be manually terminated using the **Terminate Session** operation.
