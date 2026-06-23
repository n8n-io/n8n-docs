---
title: Read/Write Files from Disk
description: >-
  Documentation for the Read/Write Files from Disk node in n8n, a workflow
  automation platform. Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Read/Write Files from Disk
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.readwritefile.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile
layout:
  description:
    visible: false
---

# Read/Write Files from Disk <a href="#readwrite-files-from-disk" id="readwrite-files-from-disk"></a>

Use the Read/Write Files from Disk node to read and write files from/to the machine where n8n is running.

The paths this node can access depend on your n8n deployment. Refer to [File locations](#file-locations) for details.

## Operations <a href="#operations" id="operations"></a>

- [**Read File(s) From Disk**](#read-files-from-disk): Use this operation to retrieve one or more files from the computer that runs n8n.
- [**Write File to Disk**](#write-file-to-disk): Use this operation to create a binary file on the computer that runs n8n.

Refer to the sections below for more information on configuring the node for each operation.

## Read File(s) From Disk <a href="#read-files-from-disk" id="read-files-from-disk"></a>

Configure this operation with these parameters:

* **File(s) Selector**: Enter the path of the file you want to read.
	- To enter multiple files, enter a page path pattern. You can use these characters to define a path pattern:
		- `*`: Matches any character zero or more times, excluding path separators.
		- `**`: Matches any character zero or more times, include path separators.
		- `?`: Matches any character except for path separators one time.
		- `[]`: Matches any characters inside the brackets. For example, `[abc]` would match the characters `a`, `b`, or `c`, and nothing else.

Refer to [Picomatch's Basic globbing](https://github.com/micromatch/picomatch#basic-globbing) documentation for more information on these characters and their expected behavior.

### Read File(s) From Disk options <a href="#read-files-from-disk-options" id="read-files-from-disk-options"></a>

You can also configure this operation with these **Options**:

* **File Extension**: Enter the extension for the file in the node output.
* **File Name**: Enter the name for the file in the node output.
* **MIME Type**: Enter the file's MIME type in the node output. Refer to [Common MIME types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) for a list of file extensions and their MIME types.
* **Put Output File in Field**: Enter the name of the field in the output data to contain the file.

## Write File to Disk <a href="#write-file-to-disk" id="write-file-to-disk"></a>

Configure this operation with these parameters:

* **File Path and Name**: Enter the destination for the file, the file's name, and the file's extension.
* **Input Binary Field**: Enter the name of the field in the node input data that will contain the binary file.

### Write File to Disk options <a href="#write-file-to-disk-options" id="write-file-to-disk-options"></a>

You can also configure this operation with these **Options**:

This operation includes a single option, whether to **Append** data to an existing file instead of creating a new one (turned on) or to create a new file instead of appending to existing (turned off).

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Read/Write Files from Disk integration templates](https://n8n.io/integrations/readwrite-files-from-disk) or [search all templates](https://n8n.io/workflows/)

## File locations <a href="#file-locations" id="file-locations"></a>

The paths this node can read from and write to depend on your n8n deployment.

### n8n Cloud <a href="#n8n-cloud" id="n8n-cloud"></a>

On n8n Cloud, the node can only access paths under `/home/node/`. Paths outside this directory (for example, `/tmp/` or `/data/`) fail with an access error.

{% hint style="info" %}
**Field placeholders on Cloud**

The default placeholders in the node's **File(s) Selector** and **File Path and Name** fields (such as `/home/user/Pictures/**/*.png` and `/data/example.jpg`) are examples. On Cloud, replace them with a path under `/home/node/`.
{% endhint %}

{% hint style="warning" %}
**Cloud filesystem is ephemeral**

Files this node writes on Cloud aren't guaranteed to persist across workflow executions, worker restarts, or instance redeploys. Don't use this node to store files you need to keep.

n8n reserves the `/home/node/.n8n/` directory for its internal state. Don't write your own files there.

For persistent file handling on Cloud, use a cloud storage node such as [AWS S3](../app-nodes/n8n-nodes-base.awss3.md), [Google Drive](../app-nodes/n8n-nodes-base.googledrive/README.md), or [FTP](n8n-nodes-base.ftp.md).
{% endhint %}

### Self-hosted n8n <a href="#self-hosted-n8n" id="self-hosted-n8n"></a>

On self-hosted n8n, by default the node can access any path the n8n process can reach. To restrict access, set the [`N8N_RESTRICT_FILE_ACCESS_TO`](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/use-environment-variables/security) environment variable to one or more allowed directories (semicolon-separated).

{% hint style="info" %}
**Default changes in n8n 2.0**

Starting in n8n 2.0, `N8N_RESTRICT_FILE_ACCESS_TO` defaults to `~/.n8n-files`. To allow file operations elsewhere, set the variable explicitly. Refer to [n8n 2.0 breaking changes](https://app.gitbook.com/s/hhM8Cox90Piiv0u0EgHM/v20-breaking-changes#set-default-value-for-n8n_restrict_file_access_to) for details.
{% endhint %}

If you run n8n in Docker, paths refer to the n8n container's filesystem, not the Docker host. To make host directories available to this node, mount them as volumes into the container.

n8n recommends using absolute file paths to prevent errors.
