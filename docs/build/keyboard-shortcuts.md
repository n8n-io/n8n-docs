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
nodeTitle: Keyboard shortcuts
originalFilePath: keyboard-shortcuts.md
originalUrl: 'https://docs.n8n.io/keyboard-shortcuts'
url: 'https://docs.n8n.io/build/keyboard-shortcuts'
layout:
  description:
    visible: false
---

# Keyboard shortcuts and controls <a href="#keyboard-shortcuts-and-controls" id="keyboard-shortcuts-and-controls"></a>

n8n provides keyboard shortcuts for some actions.

## Workflow controls <a href="#workflow-controls" id="workflow-controls"></a>
 
 - **Ctrl/Cmd** + **Alt** + **n**: create new workflow
 - **Ctrl/Cmd** + **o**: open workflow
 - **Ctrl/Cmd** + **s**: save the current workflow 
 - **Ctrl/Cmd** + **z**: undo
 - **Ctrl/Cmd** + **shift** + **z**: redo
 - **Ctrl/Cmd** + **Enter**: execute workflow

## Canvas <a href="#canvas" id="canvas"></a>

### Move the canvas <a href="#move-the-canvas" id="move-the-canvas"></a>

 - **Ctrl/Cmd** + **Left Mouse Button** + drag: move node view
 - **Ctrl/Cmd** + **Middle mouse button** + drag: move node view
 - **Space** + drag: move node view
 - **Middle mouse button** + drag: move node view
 - Two fingers on a touch screen: move node view

### Canvas zoom <a href="#canvas-zoom" id="canvas-zoom"></a>

- **+** or **=**: zoom in
- **-** or **_**: zoom out
- **0**: reset zoom level
- **1**: zoom to fit workflow
- **Ctrl/Cmd** + **Mouse wheel**: zoom in/out

### Nodes on the canvas <a href="#nodes-on-the-canvas" id="nodes-on-the-canvas"></a>

- **Double click** on a node: open the node details
- **Ctrl/Cmd** + **Double click** on a sub-workflow node: open the sub-workflow in a new tab
- **Ctrl/Cmd** + **a**: select all nodes
- **Ctrl/Cmd** + **v**: paste nodes
- **Shift** + **s**: add sticky note

### With one or more nodes selected in canvas <a href="#with-one-or-more-nodes-selected-in-canvas" id="with-one-or-more-nodes-selected-in-canvas"></a>

 - **ArrowDown**: select sibling node below the current one
 - **ArrowLeft**: select node left of the current one
 - **ArrowRight**: select node right of the current one
 - **ArrowUp**: select sibling node above the current one
 - **Ctrl/Cmd** + **c**: copy
 - **Ctrl/Cmd** + **g**: group selected nodes
 - **Ctrl/Cmd** + **shift** + **g**: ungroup selected nodes
 - **Ctrl/Cmd** + **x**: cut
 - **D**: deactivate
 - **Delete**: delete
 - **Enter**: open
 - **F2**: rename
 - **P**: pin data in node. Refer to [Data pinning](work-with-data/pin-and-mock-data.md) for more information.
 - **Shift** + **ArrowLeft**: select all nodes left of the current one
 - **Shift** + **ArrowRight**: select all nodes right of the current one
 - **Ctrl/Cmd** + **Shift** + **o** on a sub-workflow node: open the sub-workflow in a new tab 

## Node panel <a href="#node-panel" id="node-panel"></a>

 - **N**: open the Node Panel
 - **Enter**: insert selected node into workflow
 - **Escape**: close Node panel

### Node panel categories <a href="#node-panel-categories" id="node-panel-categories"></a>

- **Enter**: insert node into workflow, collapse/expand category, open subcategory
- **ArrowRight**: expand category, open subcategory 
- **ArrowLeft**: collapse category, close subcategory view

## Within nodes <a href="#within-nodes" id="within-nodes"></a>

- **=**: in an empty parameter input, this switches to [expressions](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#expression-n8n) mode.

## Command bar <a href="#command-bar" id="command-bar"></a>

The Command Bar provides quick access to actions and navigation throughout n8n. Access it using **Ctrl/Cmd + K**, or click the magnifying glass icon on the canvas. Commands adapt based on your current view and permissions.

* **Workflow actions:** Add nodes, save, test, tidy up, publish/unpublish, duplicate, import/export, archive, delete
* **Resource navigation:** Create and open workflows, credentials, data tables, projects; access recent resources
* **Execution actions:** Debug, copy, retry, stop, or delete executions
* **General navigation:** Access Templates, Variables, Insights, Settings, Help resources, and Documentation

