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

* Agent
    * Run an agent
* Session
    * Create session
    * Save profile on termination
    * Terminate session
    * Wait for download
* Window
    * Create a new browser window
    * Load URL
    * Take screenshot
    * Get live view
    * List windows
    * Close window
* Extraction
    * Query page
    * Query page with pagination
    * Smart scrape page
* Interaction
    * Click an element
    * Fill form
    * Hover on an element
    * Scroll
    * Type
* File
    * Upload a file
    * Get a file
    * Get many files
    * Load a file
    * Delete a file


## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Airtop node documentation integration templates](https://n8n.io/integrations/airtop) or [search all templates](https://n8n.io/workflows/)


## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Airtop's documentation](https://docs.airtop.ai/api-reference/airtop-api) for more information about the service.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}

Contact [Airtop's Support](https://docs.airtop.ai/guides/misc/support) for assistance or to create a feature request.

## Node reference <a href="#node-reference" id="node-reference"></a>

### Run an agent

Run a published Airtop agent. In the **Agent** field, select the agent to run, then map its input parameters. To run the agent against a specific browser profile, enter its ID in the optional **Browser Profile ID** field. Leave it empty to use the agent's default profile.

### Create a session and window <a href="#create-a-session-and-window" id="create-a-session-and-window"></a>

Create an Airtop browser session to get a **Session ID**, then use it to create a new browser window. After this, you can use any extraction or interaction operation.

### Manage windows

Work with the browser windows in a session:

- **Load URL**: Navigate a window to a page.
- **Get live view**: Get a Live View URL to watch and control a window in real time.
- **Take screenshot**: Capture an image of a window.
- **List windows**: List the windows open in a session.
- **Close window**: Close a specific window.

### Extract content <a href="#extract-content" id="extract-content"></a>

Extract content from a web browser using these operations:

- **Query page**: Extract information from the current window.
- **Query page with pagination**: Extract information from pages with pagination or infinite scrolling.
- **Smart scrape page**: Get the window content as markdown.

Get JSON responses by using the **JSON Output Schema** parameter in query operations.

### Interacting with pages <a href="#interacting-with-pages" id="interacting-with-pages"></a>

Interact with a page in a session by describing the element you want to act on in natural language:

- **Click an element**, **Hover on an element**, or **Type** text.
- **Fill form**: Fill several fields at once from a plain-language description of the values.
- **Scroll**: Scroll to a described element, or by a set amount toward a page edge.

### Work with files

Upload files to Airtop and use them in your browser automations:

- **Upload a file**: Upload a file from a URL or binary data, and optionally attach it to a page's file input in a session.
- **Load a file**: Attach a previously uploaded file to a page's file input in an existing session.
- **Get a file** and **Get many files**: Retrieve file details, or download a ready file as binary data.
- **Delete a file**: Permanently remove an uploaded file by its **File ID**.

### Wait for a download

After you trigger a download in a session, use **Wait for download** to wait until the file is ready, then get its file ID and download URL.

### Terminate a session <a href="#terminate-a-session" id="terminate-a-session"></a>

End your session to save resources. Sessions are automatically terminated based on the **Idle Timeout** set in the **Create Session** operation or can be manually terminated using the **Terminate Session** operation.
