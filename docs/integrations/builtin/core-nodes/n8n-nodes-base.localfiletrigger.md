---
title: Local File Trigger node documentation
description: >-
  Learn how to use the Local File Trigger node in n8n. Follow technical
  documentation to integrate Local File Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Local File Trigger node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.localfiletrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.localfiletrigger
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.localfiletrigger
layout:
  description:
    visible: false
---

# Local File Trigger node <a href="#local-file-trigger-node" id="local-file-trigger-node"></a>

The Local File Trigger node starts a workflow when it detects changes on the file system. These changes involve a file or folder getting added, changed, or deleted.

{% hint style="warning" %}
**Security considerations**

The Local File Trigger node can introduce significant security risks in environments that operate with untrusted users. Because of this, the node is [disabled](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/security/block-specific-nodes#exclude-nodes) by default starting from version 2.0.
{% endhint %}

{% hint style="info" %}
**Self-hosted n8n only**

This node isn't available on n8n Cloud.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

You can choose what event to watch for using the **Trigger On** parameter.

## Changes to a Specific File <a href="#changes-to-a-specific-file" id="changes-to-a-specific-file"></a>

The node triggers when the specified file changes.

Enter the path for the file to watch in **File to Watch**.

## Changes Involving a Specific Folder <a href="#changes-involving-a-specific-folder" id="changes-involving-a-specific-folder"></a>

The node triggers when a change occurs in the selected folder.

Configure these parameters:

- **Folder to Watch**: Enter the path of the folder to watch.
- **Watch for**: Select the type of change to watch for.


## Node options <a href="#node-options" id="node-options"></a>

Use the node **Options** to include or exclude files and folders.

- **Include Linked Files/Folders**: also watch for changes to linked files or folders.
- **Ignore**: files or paths to ignore. n8n tests the whole path, not just the filename. Supports the [Anymatch](https://github.com/micromatch/anymatch) syntax.
- **Max Folder Depth**: how deep into the folder structure to watch for changes.

### Examples for Ignore <a href="#examples-for-ignore" id="examples-for-ignore"></a>

Ignore a single file:

```sh
**/<fileName>.<suffix>
# For example, **/myfile.txt <a href="#for-example-myfiletxt" id="for-example-myfiletxt"></a>
```

Ignore a sub-directory of a directory you're watching:

```sh
**/<directoryName>/**
# For example, **/myDirectory/** <a href="#for-example-mydirectory" id="for-example-mydirectory"></a>
```

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Local File Trigger node documentation integration templates](https://n8n.io/integrations/local-file-trigger) or [search all templates](https://n8n.io/workflows/)
