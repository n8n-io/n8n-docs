---
title: Export and import workflows
description: Different ways to export and import workflows in n8n.
contentType: howto
---

# Export and import workflows

n8n saves workflows in JSON format. You can export your workflows as JSON files or import JSON files into your n8n library. 
You can export and import workflows in several ways. 

--8<-- "_snippets/workflows/sharing-credentials.md"

## Copy-Paste

You can copy and paste a workflow or parts of it by selecting the nodes you want to copy to the clipboard (`Ctrl + c` or `cmd +c`) and pasting it (`Ctrl + v` or `cmd + v`) into the Editor UI.

To select all nodes or a group of nodes, click and drag:
  ![Select a group of nodes](/_images/workflows/export-import/selectingnodes.gif)

## From the Editor UI menu

From the top navigation bar, select the three dots in the upper right <img alt="Workflow menu icon" class="off-glb" src="/_images/common-icons/three-dots-horizontal.png"> to see the following options: 

<figure><img src="/_images/courses/level-one/chapter-six/l1-c6-import-export-menu.png" alt="Import/Export menu" style="width:100%"><figcaption align = "center"><i>Import & Export workflows menu</i></figcaption></figure>

* **Download**: Downloads your current workflow as a JSON file to your computer.
* **Import from URL**: Imports workflow JSON from a URL, for example, [this workflow JSON file on GitHub](https://raw.githubusercontent.com/n8n-io/self-hosted-ai-starter-kit/refs/heads/main/n8n/demo-data/workflows/srOnR8PAY3u4RSwb.json). 
* **Import from File**: Imports a workflow as a JSON file from your computer.

## From the command line

* Export: See the [full list of commands ](/hosting/cli-commands.md#export-workflows-and-credentials) for exporting workflows or credentials.
* Import: See the [full list of commands ](/hosting/cli-commands.md#import-workflows-and-credentials) for importing workflows or credentials.
