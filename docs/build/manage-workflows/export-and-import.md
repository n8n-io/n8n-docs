---
title: Export and import workflows
contentType: howto
nodeTitle: Export and import
originalFilePath: workflows/export-import.md
originalUrl: https://docs.n8n.io/workflows/export-import
url: https://docs.n8n.io/build/manage-workflows/export-and-import
description: Different ways to export and import workflows in n8n.
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
---

# Export and import

n8n saves workflows in JSON format. You can export your workflows as JSON files or import JSON files into your n8n library. You can export and import workflows in several ways.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/OlpV1rtc5ZIqBmvX4lBQ/" %}

## Copy-Paste <a href="#copy-paste" id="copy-paste"></a>

You can copy and paste a workflow or parts of it by selecting the nodes you want to copy to the clipboard (`Ctrl + c` or `cmd +c`) and pasting it (`Ctrl + v` or `cmd + v`) into the Editor UI.

To select all nodes or a group of nodes, click and drag: ![Select a group of nodes](../.gitbook/assets/selectingnodes.gif)

## From the Editor UI menu <a href="#from-the-editor-ui-menu" id="from-the-editor-ui-menu"></a>

From the top navigation bar, select the three dots in the upper right <img src="../.gitbook/assets/three-dots-horizontal (1).png" alt="Workflow menu icon" data-size="line"> to see the following options:

* **Download**: Downloads your current workflow as a JSON file to your computer.
* **Import from URL**: Imports workflow JSON from a URL, for example, [this workflow JSON file on GitHub](https://raw.githubusercontent.com/n8n-io/self-hosted-ai-starter-kit/refs/heads/main/n8n/demo-data/workflows/srOnR8PAY3u4RSwb.json).
* **Import from File**: Imports a workflow as a JSON file from your computer.

## From the command line <a href="#from-the-command-line" id="from-the-command-line"></a>

### Using the n8n CLI

The `n8n-cli package` commands bundle workflows into a portable `.n8np` file you can import into another instance. See [n8n packages](n8n-packages/README.md), and [Export a package](n8n-packages/export-a-package.md) for the available options. n8n packages are in Preview and may change in future releases.

{% hint style="info" %}
The n8n CLI is the method n8n recommends for moving workflows between instances from the command line. It runs from any machine with network access, carries the folders, projects, and references a workflow needs, and checks an import before writing anything.
{% endhint %}

### Using the Server CLI

* Export: See the [export commands](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/use-the-command-line#export-entities) for exporting workflows or credentials.
* Import: See the [import commands](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/use-the-command-line#import-entities) for importing workflows or credentials.

{% hint style="info" %}
n8n recommends the [n8n CLI](#using-the-n8n-cli) over the Server CLI export and import commands for new work. We plan to deprecated Server CLI export and import commands, though this is not yet scheduled.
{% endhint %}

## From the n8n API

The n8n API can export and import [n8n packages](n8n-packages/README.md), which carry workflows along with the folders, projects, and references they need. n8n packages are in Preview and may change in future releases.

To move a single workflow as JSON instead, use the workflow endpoints in the [n8n API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api).
