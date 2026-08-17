---
title: Deploy n8n in canvas-only mode
description: How the N8N_CANVAS_ONLY environment variable hides n8n's navigation and workflow settings to show only the workflow canvas.
layout:
  description:
    visible: false
---

# Deploy n8n in canvas-only mode

In canvas-only mode, when you open a workflow you see only that workflow's canvas. Elements that would navigate away from it, like the command bar, are hidden.


{% hint style="info" %}
**Feature availability**

Canvas-only mode is available from n8n 2.15.0.
{% endhint %}

## Turn on canvas-only mode

Set `N8N_CANVAS_ONLY` to `true`:

```bash
export N8N_CANVAS_ONLY=true
```

Canvas-only mode applies to the whole instance. You can't turn it on for individual workflows or users.

## What changes in canvas-only mode

On the workflow details route, canvas-only mode hides:

- **The header's top menu.** The workflow name, breadcrumbs, save controls, and tags no longer show.
- **The sidebar.** n8n's main navigation isn't visible.
- **Overlay elements.** The command bar and "Ask AI assistant" button are no longer shown.
- **Keyboard shortcuts.** The following keyboard shortcuts are disabled in canvas-only mode: **Ctrl/Cmd** + **s** (save), **Ctrl/Cmd** + **Alt** + **n** (create new workflow), **Ctrl/Cmd** + **p** (publish), **Ctrl/Cmd** + **u** (unpublish), **Ctrl/Cmd** + **k** (command bar)

n8n keeps the following visible:

- **The workflow canvas and its nodes.** You can still pan, zoom, and edit the workflow.
- **The tab bar** for switching between the editor, executions, and evaluations. It floats near the top of the screen instead of sitting inside the header.
- **The logs panel** to display execution logs of individual nodes.
- **The node creator panel.** The "Add a node" panel still opens from the canvas, repositioned to the top of the screen instead of below the header.
