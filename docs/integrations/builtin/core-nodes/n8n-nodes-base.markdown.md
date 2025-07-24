---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Markdown
description: Documentation for the Markdown node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: medium
---

# Markdown

The Markdown node converts between Markdown and HTML formats.

## Operations

This node's operations are **Modes**:

* **Markdown to HTML**: Use this mode to convert from Markdown to HTML.
* **HTML to Markdown**: Use this mode to convert from HTML to Markdown.

## Node parameters

* **HTML** or **Markdown**: Enter the data you want to convert. The field name changes based on which **Mode** you select.
* **Destination Key**: Enter the field you want to put the output in. Specify nested fields using dots, for example `level1.level2.newKey`.

## Node options

The node's **Options** depend on the **Mode** selected.

/// note | Test out the options
Some of the options depend on each other or can interact. We recommend testing out options to confirm the effects are what you want.
///

### Markdown to HTML options

| Option | Description | Default |
| ------ | ----------- | ------- |
| **Add Blank To Links** | Whether to open links a new window (enabled) or not (disabled). | Disabled |
| **Automatic Linking To URLs** | Whether to automatically link to URLs (enabled) or not (disabled). If enabled, n8n converts any string that it identifies as a URL to a link. | Disabled |
| **Backslash Escapes HTML Tags** | Whether to allow backslash escaping of HTML tags (enabled) or not (disabled). When enabled, n8n escapes any `<` or `>` prefaced with `\`. For example, `\<div\>` renders as `&lt;div&gt;`.  | Disabled |
| **Complete HTML Document** | Whether to output a complete HTML document (enabled) or an HTML fragment (disabled). A complete HTML document includes the `<DOCTYPE HTML>` declaration, `<html>` and `<body>` tags, and the `<head>` element.  | Disabled |
| **Customized Header ID** | Whether to support custom heading IDs (enabled) or not (disabled). When enabled, you can add custom heading IDs using `{header ID here}` after the heading text. | Disabled |
| **Emoji Support** | Whether to support emojis (enabled) or not (disabled). | Disabled. |
| **Encode Emails** | Whether to transform ASCII character emails into their equivalent decimal entities (enabled) or not (disabled). | Enabled | 
| **Exclude Trailing Punctuation From URLs** | Whether to exclude trailing punctuation from automatically linked URLs (enabled) or not (disabled). For use with **Automatic Linking To URLs**. | Disabled |
| **GitHub Code Blocks** | Whether to enable GitHub Flavored Markdown code blocks (enabled) or not (disabled). | Enabled |
| **GitHub Compatible Header IDs** | Whether to generate GitHub Flavored Markdown heading IDs (enabled) or not (disabled). GitHub Flavored Markdown generates heading IDs with `-` in place of spaces and removes non-alphanumeric characters. | Disabled |
| **GitHub Mention Link** | Change the link used with **GitHub Mentions**.  | Disabled |
| **GitHub Mentions** | Whether to support tagging GitHub users with `@` (enabled) or not (disabled). When enabled, n8n replaces `@name` with `https://github.com/name`. | Disabled |
| **GitHub Task Lists** | Whether to support GitHub Flavored Markdown task lists (enabled) or not (disabled). | Disabled |
| **Header Level Start** | Number. Set the start level for headers. For example, changing this field to `2` causes n8n to treat `#` as `<h2>`, `##` as `<h3>`, and so on. | 1 |
| **Mandatory Space Before Header** | Whether to make a space between `#` and heading text required (enabled) or not (disabled). When enabled, n8n renders a heading written as `##Some header text` literally (it doesn't turn it into a heading element) | Disabled |
| **Middle Word Asterisks** | Whether n8n should treat asterisks in words as Markdown (disabled) or render them as literal asterisks (enabled). | Disabled |
| **Middle Word Underscores** | Whether n8n should treat underscores in words as Markdown (disabled) or render them as literal underscores (enabled). | Disabled |
| **No Header ID** | Disable automatic generation of header IDs (enabled). | Disabled |
| **Parse Image Dimensions** | Support setting maximum image dimensions in Markdown syntax (enabled). | Disabled |
| **Prefix Header ID** | Define a prefix to add to header IDs. | None |
| **Raw Header ID** | Whether to remove spaces, `'`, and `"` from header IDs, including prefixes, replacing them with `-` (enabled) or not (disabled). | Disabled |
| **Raw Prefix Header ID** | Whether to prevent n8n from modifying header prefixes (enabled) or not (disabled) | Disabled |
| **Simple Line Breaks** | Whether to create line breaks without a double space at the end of a line (enabled) or not (disabled). | Disabled |
| **Smart Indentation Fix** | Whether to try to smartly fix indentation problems related to ES6 template strings in indented code blocks (enabled) or not (disabled). | Disabled |
| **Spaces Indented Sublists** | Whether to remove the requirement to indent sublists four spaces (enabled) or not (disabled). | Disabled |
| **Split Adjacent Blockquotes** | Whether to split adjacent blockquote blocks (enabled) or not (disabled). If you don't enable this, n8n treats quotes (indicated by `>` at the start of the line) on separate lines as a single blockquote, even when separated by an empty line.  | Disabled |
| **Strikethrough** | Whether to support strikethrough syntax (enabled) or not (disabled). When enabled, you can add a ~~strikethrough~~ effect using `~~` around the word or phrase. | Disabled |
| **Tables Header ID** | Whether to add an ID to table header tags (enabled) or not (disabled). | Disabled |
| **Tables Support** | Whether to support tables (enabled) or not (disabled). | Disabled |

### HTML to Markdown options

| Option | Description | Default |
| ------ | ----------- | ------- |
| **Bullet Marker** | Specify the character to use for unordered lists. | * |
| **Code Block Fence** | Specify the characters to use for code blocks. | ``` |
| **Emphasis Delimiter** | Specify the character `<em>`. | _ |
| **Global Escape Pattern** | Overrides the default character escape settings. You may want to use Text Replacement Pattern instead. | None |
| **Ignored Elements** | Ignore given HTML elements, and their children. | None |
| **Keep Images With Data** | Whether to keep images with data (enabled) or not (disabled). Support files up to 1MB. | Disabled |
| **Line Start Escape Pattern** | Overrides the default character escape settings. You may want to use Text Replacement Pattern instead. | None |
| **Max Consecutive New Lines** | Number. Specify the maximum number of consecutive new lines allowed. | 3 |
| **Place URLs At The Bottom** | Whether to place URLs at the bottom of the page and format using link reference definitions (enabled) or not (disabled). | Disabled |
| **Strong Delimiter** | Specify the characters for `<strong>`. | ** |
| **Style For Code Block** | Specify the styling for code blocks. Options are **Fence** and **Indented**. | Fence |
| **Text Replacement Pattern** | Define a text replacement pattern using regex. | None |
| **Treat As Blocks** | Specify HTML elements to treat as blocks (surround with blank lines) | None |

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'markdown') ]]

## Parsers

n8n uses the following parsers:

* To convert from HTML to Markdown: [node-html-markdown](https://www.npmjs.com/package/node-html-markdown){:target=_blank .external-link}.
* To convert from Markdown to HTML: [Showdown](https://www.npmjs.com/package/showdown){:target=_blank .external-link}. Some options allow you to extend your Markdown with [GitHub Flavored Markdown](https://github.github.com/gfm/){:target=_blank .external-link}.


