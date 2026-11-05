---
description: >-
  Give n8n Assistant and connected MCP clients reusable context about how you
  and your team build in n8n.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
  anchors:
    visible: true
tags:
  - tag: preview
    primary: true
---

# Agentic context management

Agentic context management lets you give AI tools in n8n reusable context, such as your naming rules and preferred nodes, so you don't repeat it in every prompt.

{% hint style="info" %}
**Preview status**

Agentic context management is in Preview and may change in future releases. Avoid relying on it in production.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/KbKP88R2IFii1k97togq/" %}

## How context reaches AI tools

You manage context in **Settings** > **Context**. n8n stores it once and passes it to every AI surface that reads it:

* **n8n Assistant** reads context on every message you send, so an edit applies from your next message.
* **MCP clients** connected to the [n8n MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server) read context through MCP tools, each time they call them.

Context follows n8n's permissions. Each person only receives the context they're allowed to see, and only people with the right role can change context that applies to others.

## Types of context

n8n supports two kinds of context:

* [Preferences](preferences.md): short instructions, such as "Always connect an error workflow", that AI tools apply every time they build workflows and agents for you. You can save a preference for yourself, for a project, or for everyone on the instance.
* [Skills](skills.md): instructions, with optional reference files, that agents and n8n Assistant follow for a specific task. You can create skills in n8n or import them from GitHub.

## In this section

* [Preferences](preferences.md): save rules that AI tools apply every time they build for you.
* [Skills](skills.md): create skills for agents and n8n Assistant, and import skills from GitHub.

## Related resources

* [Build](../)
* [Ways of building workflows](../ways-of-building-workflows/)
* [Build and manage agents](../build-and-manage-agents/)
* [Integrate AI](../integrate-ai/)
* [Manage workflows](../manage-workflows/)
* [Flow logic](../flow-logic/)
* [Work with data](../work-with-data/)
* [Code in n8n](../code-in-n8n/)
* [Keyboard shortcuts](../keyboard-shortcuts.md)
