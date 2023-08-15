---
title: Local File trigger
description: Documentation for the Local File trigger node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Local File trigger

The [Local File trigger]() node starts a workflow when changes on the file system are detected. These changes involve a file or folder geting added, changed or deleted.

## Node Reference

- ***trigger On:***
    - ***Changes to a Specifc File:*** triggers when the specified file is changed
	- ***Changes Involving a Specific Folder:*** triggers when the a change in the selected folder occurs
- ***Additional Fields:***
	- ***File to Watch:*** The path to the file to watch. This field is shown when 'trigger On' is set to 'Changes to a Specifc File'.
	- ***Folder to Watch:*** The path of the folder to watch. This field is shown when 'trigger On' is set to 'Changes Involving a Specific Folder'.
	- ***Watch for:*** The type of change to watch for. This field is shown when 'trigger On' is set to 'Changes Involving a Specific Folder'.
	- ***Options:***
		- ***Include Linked Files/Folders:*** Also watch for changes to linked files or folders.
		- ***Ignore:*** Files or paths to ignore. The whole path is tested, not just the filename. Supports the [Anymatch](https://github.com/micromatch/anymatch) syntax.
		- ***Max Folder Depth:*** How deep into the folder structure to watch for changes.

