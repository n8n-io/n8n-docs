---
title: Confluence node documentation
description: >-
  Learn how to use the Confluence node in n8n. Follow technical documentation
  to integrate Confluence node into your workflows.
contentType:
  - integration
  - reference
layout:
  description:
    visible: false
---

# Confluence node

Use the Confluence node to automate work in [Confluence Cloud](https://www.atlassian.com/software/confluence) and integrate it with other applications. n8n has built-in support for creating, reading, updating, and deleting pages, working with page labels and comments, uploading and downloading attachments, listing spaces, and searching content with CQL.

On this page, you'll find a list of operations the Confluence node supports, guidance on choosing a site and a page, and links to more resources.

{% hint style="info" %}
**Credentials**

The node offers two ways to sign in, chosen with the **Authentication** dropdown:

* **Cloud OAuth2**: sign in as a person with the [Confluence Cloud OAuth2 API credential](../credentials/confluence.md). The credential holds the OAuth app's client ID and secret.
* **Service Account**: sign in as an Atlassian service account with the **Atlassian Service Account** credential, for unattended workflows where no user is present. The credential's scopes are fixed when it's created, and space permissions apply on top, like for any other user.

With either method, you choose the Confluence site in the node itself.
{% endhint %}

## Choosing a site

Every operation starts with the **Site** parameter, which selects the Confluence Cloud site to work with:

* **Pick from a list** (the default): choose from the sites the connection can access.
* **By URL**: paste the site's address, for example `https://example.atlassian.net`.
* **Leave it empty**: if the connection has access to exactly one site, the node uses it automatically. If it can access several, the node asks you to pick one and lists them in the error.

## Choosing a page

Operations that target a page offer four ways to point at it:

* **Pick from a list** (the default): search pages by title. Select a **Space** first to narrow the list to one space.
* **By URL**: paste the page's link straight from the browser or Confluence's **Share** button.
* **By ID**: paste the page's numeric ID.
* **By Title**: enter the page's title. The title must match exactly one page; select a **Space** to scope the lookup if several pages share the title.

## Page bodies

Operations that write page or comment content offer a **Body Format** choice:

* **Plain Text** (the default): enter plain text; each line becomes a paragraph. No markup needed.
* **Storage**: enter Confluence storage-format XHTML, for example `<h2>Title</h2><p>Text</p>`.
* **Atlas Doc Format**: enter a raw [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/) JSON document.

Operations that read content return the body in **Storage** (the default) or **Atlas Doc Format**, or as **Plain Text** extracted from the document, which is useful for feeding page content to AI and search workflows.

The **Append** operation writes the page in the format you select, whatever format the page was saved in. When the two formats differ, Confluence converts the whole page. The content and the macros survive, but Confluence rewrites the stored markup, so the page's version history shows a difference for the whole page and not only for the appended content. To keep the difference small, select the format the page already uses.

## Create and publish Confluence page drafts

Confluence keeps a draft next to the published version of a page, so a draft never replaces what readers see:

* **Create** with **Create as Draft** enabled makes an unpublished page. Its author sees it in the space tree with a **Draft** badge.
* **Update** with **Status** set to **Draft** saves the changes as an unpublished draft. This does not unpublish the page. The live page keeps showing the last published version, and Confluence marks the page **Unpublished changes**.

To publish a draft, run **Update** on it with **Status** set to **Published**.

## Operations

* **Attachment**:
  * Delete: move an attachment to the trash, or permanently delete it.
  * Get Many: list the attachments on a page, optionally downloading each file.
  * Upload: upload a file as an attachment on a page. Uploading a file with the same name as an existing attachment creates a new version of it.
* **Page**:
  * Add Comment: add a footer comment to a page, or reply to an existing comment.
  * Add Labels: add one or more labels to a page.
  * Append: append content to the bottom of an existing page.
  * Create: create a new page in a space, optionally as a draft, private, at the space root, or under a parent page.
  * Delete: move a page to trash, or permanently delete it. Child pages aren't deleted. They move up to the deleted page's parent.
  * Delete Comment: permanently delete a footer comment.
  * Get: retrieve a page, optionally with its full sub-tree, returning one item per page in tree order, the page itself first.
  * Get Comments: list the top-level footer comments on a page.
  * Get Labels: list the labels on a page.
  * Get Many by Label: retrieve all pages carrying a label, optionally within one space.
  * Remove Label: remove a label from a page.
  * Update: replace the title and body of an existing page, or change its draft/published status.
* **Search**:
  * Query: search content with a [CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/) query, optionally fetching each result's full page content on the same request.
* **Space**:
  * Get: retrieve a space.
  * Get Many: retrieve many spaces.

## Templates and examples

[Search all templates](https://n8n.io/workflows/) for examples using this node.

## Related resources

Refer to [Atlassian's Confluence Cloud REST API documentation](https://developer.atlassian.com/cloud/confluence/rest/v2/intro/) for more information about the service.
