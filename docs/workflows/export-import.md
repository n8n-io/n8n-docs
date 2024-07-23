---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Export and import workflows
contentType: howto
---

# Export and import workflows

n8n saves workflows in JSON format. You can export your workflows as JSON files or import JSON files into your n8n library. 

/// warning | Sharing credentials
Note that the exported JSON file of your workflow will contain your credentials as well. If you don't want to share your credentials (recommended), delete them from the JSON file.
///

You can export and import workflows in several ways:

## Copy-Paste

You can copy and paste a workflow or parts of it by selecting the nodes you want to copy to the clipboard (`Ctrl + c` or `cmd +c`) and pasting it (`Ctrl + v` or `cmd + v`) into the Editor UI.

To select all nodes, or a group of nodes, click and drag:
  ![Select a group of nodes](/_images/workflows/export-import/selectingnodes.gif)

## From the Editor UI menu

<figure><img src="/_images/courses/level-one/chapter-six/l1-c6-import-export-menu.png" alt="Import/Export menu" style="width:100%"><figcaption align = "center"><i>Import & Export workflows menu</i></figcaption></figure>

From the top navigation bar, select the three dots in the upper right <img alt="Workflow menu icon" class="off-glb" src="/_images/common-icons/three-dots-horizontal.png"> to see the following options: 

* **Download**: Download your current workflow as a JSON file on your computer.
* **Import from URL**: Import a workflow as a published JSON file. 
* **Import from File** Import a workflow as a JSON file from you computer.

## From the command line

* Export: See the [full list of commands ](/hosting/cli-commands/){:target="_blank" .external} for exporting workflows or credentials.
* Import: See the [full list of commands ](/hosting/cli-commands/#import-workflows-and-credentials){:target="_blank" .external} for importing workflows or credentials.