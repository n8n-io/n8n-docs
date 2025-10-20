---
title: Rename Keys
description: Documentation for the Rename Keys node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: [integration, reference]
priority: medium
---

# Rename Keys

Use the Rename Keys node to rename the keys of a key-value pair in n8n.

## Node parameters

You can rename one or multiple keys using the Rename Keys node. Select the **Add new key** button to rename a key.

For each key, enter the:

- **Current Key Name**: The current name of the key you want to rename.
- **New Key Name**: The new name you want to assign to the key.

## Node options

Choose whether to use a **Regex** regular expression to identify keys to rename. To use this option, you must also enter:

* The **Regular Expression** you'd like to use.
* **Replace With**: Enter the new name you want to assign to the key(s) that match the **Regular Expression**.
* You can also choose these Regex-specific options:
    * **Case Insensitive**: Set whether the regular expression should match case (turned off) or be case insensitive (turned on).
    * **Max Depth**: Enter the maximum depth to replace keys, using `-1` for unlimited and `0` for top-level only.

/// warning | Regex impacts
Using a regular expression can affect any keys that match the expression, including keys you've already renamed.
///

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'rename-keys') ]]
