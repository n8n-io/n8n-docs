---
title: Local File trigger
description: Documentation for the Local File trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Local File trigger

The Local File trigger node starts a workflow when it detects changes on the file system. These changes involve a file or folder getting added, changed or deleted.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Local File Trigger's integrations](https://n8n.io/integrations/local-file-trigger/){:target=_blank .external-link} page.

## Parameters

You can choose what event to watch for:

**Trigger On**:

- **Changes to a Specific File**: triggers when the specified file changes.
	- **File to Watch**: the path to the file to watch.
- **Changes Involving a Specific Folder**: triggers when a change occurs in the selected folder.
	- **Folder to Watch**: the path of the folder to watch.
	- **Watch for**: the type of change to watch for.


## Options

Use **Options** settings to include or exclude files and folders.

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

## Related resources

View [example workflows and related content](https://n8n.io/integrations/local-file-trigger/){:target=_blank .external-link} on n8n's website.
