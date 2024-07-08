---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Local File trigger
description: Documentation for the Local File trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Local File trigger

The Local File trigger node starts a workflow when it detects changes on the file system. These changes involve a file or folder getting added, changed, or deleted.

/// note | Self-hosted n8n only
This node isn't available on n8n Cloud.
///

## Node parameters

You can choose what event to watch for:

**Trigger On**:

- **Changes to a Specific File**: triggers when the specified file changes.
	- **File to Watch**: the path to the file to watch.
- **Changes Involving a Specific Folder**: triggers when a change occurs in the selected folder.
	- **Folder to Watch**: the path of the folder to watch.
	- **Watch for**: the type of change to watch for.


## Node options

Use the node **Options** to include or exclude files and folders.

- **Include Linked Files/Folders**: also watch for changes to linked files or folders.
- **Ignore**: files or paths to ignore. n8n tests the whole path, not just the filename. Supports the [Anymatch](https://github.com/micromatch/anymatch){:target=_blank .external-link} syntax.
- **Max Folder Depth**: how deep into the folder structure to watch for changes.

### Examples for Ignore

Ignore a single file:

```sh
**/<fileName>.<suffix>
# For example, **/myfile.txt
```

Ignore a sub-directory of a directory you're watching:

```sh
**/<directoryName>/**
# For example, **/myDirectory/**
```

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'local-file-trigger') ]]
