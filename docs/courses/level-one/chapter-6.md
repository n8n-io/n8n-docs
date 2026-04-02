---
contentType: tutorial
---

<!-- vale from-microsoft.We = NO -->
<!-- vale from-microsoft.FirstPerson = NO -->
# Exporting and importing workflows

In this chapter, you will learn how to export and import workflows.

## Exporting and importing workflows

You can save n8n workflows locally as JSON files. This is useful if you want to share your workflow with someone else or import a workflow from someone else.

--8<-- "_snippets/workflows/sharing-credentials.md"

<figure><img src="/_images/courses/level-one/chapter-six/l1-c6-import-export-menu.png" alt="Import/Export menu" style="width:100%"><figcaption align = "center"><i>Import & Export workflows menu</i></figcaption></figure>

You can export and import workflows in three ways:

* From the **Editor UI** menu:
    * Export: From the top navigation bar, select the three dots in the upper right, then select **Download**. This will download your current workflow as a JSON file on your computer.
    * Import: From the top navigation bar, select the three dots in the upper right, then select **Import from URL** (to import a published workflow) or **Import from File** (to import a workflow as a JSON file).
* From the **Editor UI** canvas:
	* Export: Select all the nodes on the canvas and use ++ctrl+c++ to copy the workflow JSON. You can paste this into a file or share it directly with other people.
	* Import: You can paste a copied workflow JSON directly into the canvas with ++ctrl+v++.
* From the command line:
    * Export: See the [full list of commands ](/hosting/cli-commands.md) for exporting workflows or credentials.
    * Import: See the [full list of commands ](/hosting/cli-commands.md#import-workflows-and-credentials) for importing workflows or credentials.
