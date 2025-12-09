---
tags:
  - Keyboard
  - Move canvas
  - Move nodes
  - Drag and drop
description: Keyboard shortcuts available in n8n.
hide:
  - tags
contentType: reference
---

# Keyboard shortcuts and controls

n8n provides keyboard shortcuts for some actions.

## Workflow controls
 
 - **Ctrl** + **Alt** + **n**: create new workflow
 - **Ctrl** + **o**: open workflow
 - **Ctrl** + **s**: save the current workflow 
 - **Ctrl** + **z**: undo
 - **Ctrl** + **shift** + **z**: redo
 - **Ctrl** + **Enter**: execute workflow

## Canvas

### Move the canvas

 - **Ctrl** + **Left Mouse Button** + drag: move node view
 - **Ctrl** + **Middle mouse button** + drag: move node view
 - **Space** + drag: move node view
 - **Middle mouse button** + drag: move node view
 - Two fingers on a touch screen: move node view

### Canvas zoom

- **+** or **=**: zoom in
- **-** or **_**: zoom out
- **0**: reset zoom level
- **1**: zoom to fit workflow
- **Ctrl** + **Mouse wheel**: zoom in/out

### Nodes on the canvas

- **Double click** on a node: open the node details
- **Ctrl/Cmd** + **Double click** on a sub-workflow node: open the sub-workflow in a new tab
- **Ctrl** + **a**: select all nodes
- **Ctrl** + **v**: paste nodes
- **Shift** + **s**: add sticky note

### With one or more nodes selected in canvas

 - **ArrowDown**: select sibling node below the current one
 - **ArrowLeft**: select node left of the current one
 - **ArrowRight**: select node right of the current one
 - **ArrowUp**: select sibling node above the current one
 - **Ctrl** + **c**: copy
 - **Ctrl** + **x**: cut
 - **D**: deactivate
 - **Delete**: delete
 - **Enter**: open
 - **F2**: rename
 - **P**: pin data in node. Refer to [Data pinning](/data/data-pinning.md) for more information.
 - **Shift** + **ArrowLeft**: select all nodes left of the current one
 - **Shift** + **ArrowRight**: select all nodes right of the current one
 - **Ctrl/Cmd** + **Shift** + **o** on a sub-workflow node: open the sub-workflow in a new tab 

## Node panel

 - **Tab**: open the Node Panel
 - **Enter**: insert selected node into workflow
 - **Escape**: close Node panel

### Node panel categories

- **Enter**: insert node into workflow, collapse/expand category, open subcategory
- **ArrowRight**: expand category, open subcategory 
- **ArrowLeft**: collapse category, close subcategory view

## Within nodes

- **=**: in an empty parameter input, this switches to [expressions](/glossary.md#expression-n8n) mode.

## Command bar

The Command Bar provides quick access to actions and navigation throughout n8n. Access it using **Ctrl/Cmd + K**, or click the magnifying glass icon on the canvas. Commands adapt based on your current view and permissions.

* **Workflow actions:** Add nodes, save, test, tidy up, publish/unpublish, duplicate, import/export, archive, delete
* **Resource navigation:** Create and open workflows, credentials, data tables, projects; access recent resources
* **Execution actions:** Debug, copy, retry, stop, or delete executions
* **General navigation:** Access Templates, Variables, Insights, Settings, Help resources, and Documentation

