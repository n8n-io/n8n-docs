---
title: Rename Keys
description: >-
  Documentation for the Rename Keys node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Rename Keys
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.renamekeys.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.renamekeys'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.renamekeys'
layout:
  description:
    visible: false
---

# Rename Keys <a href="#rename-keys" id="rename-keys"></a>

Use the Rename Keys node to rename the keys of a key-value pair in n8n.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

You can rename one or multiple keys using the Rename Keys node. Select the **Add new key** button to rename a key.

For each key, enter the:

- **Current Key Name**: The current name of the key you want to rename.
- **New Key Name**: The new name you want to assign to the key.

## Node options <a href="#node-options" id="node-options"></a>

Choose whether to use a **Regex** regular expression to identify keys to rename. To use this option, you must also enter:

* The **Regular Expression** you'd like to use.
* **Replace With**: Enter the new name you want to assign to the key(s) that match the **Regular Expression**.
* You can also choose these Regex-specific options:
    * **Case Insensitive**: Set whether the regular expression should match case (turned off) or be case insensitive (turned on).
    * **Max Depth**: Enter the maximum depth to replace keys, using `-1` for unlimited and `0` for top-level only.

{% hint style="warning" %}
**Regex impacts**

Using a regular expression can affect any keys that match the expression, including keys you've already renamed.
{% endhint %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Rename Keys integration templates](https://n8n.io/integrations/rename-keys) or [search all templates](https://n8n.io/workflows/)
