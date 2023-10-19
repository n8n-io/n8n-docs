---
title: Write Binary File
description: Documentation for the Write Binary File node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Write Binary File

The Write Binary File node writes a file to the host machine that runs n8n.

!!! note "Examples and templates"
	For usage examples and templates to help you get started, refer to n8n's [Write Binary File integrations](https://n8n.io/integrations/write-binary-file/){:target=_blank .external-link} page.

!!! note "File locations"
    * If you are running n8n in Docker, your command will run on the n8n container and not the Docker host.
	* This node will look for files relative to the n8n install path. n8n recommends using absolute file paths to prevent any errors.


## Node parameters

* **File Name**: this field specifies the path to which the file should be written, along with the file name.
* **Property Name**: name of the binary property to which to write the data of the read file.

## Node options

**Append**: enable this to append to an existing file, instead of creating a new one.

