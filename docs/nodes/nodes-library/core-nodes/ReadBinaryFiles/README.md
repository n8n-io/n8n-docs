---
permalink: /nodes/n8n-nodes-base.readBinaryFiles
description: Learn how to use the Read Binary Files node in n8n
---

# Read Binary Files

The Read Binary Files node is used to read multiple files from the host machine that runs n8n.

::: tip 💡 Keep in mind
1. If you are running n8n in Docker, your command will run on the n8n container and not the Docker host.
2. This node will look for files relative to the n8n install path. It is recommended to use absolute file paths to prevent any errors.
:::

## Node Reference

1. *File Selector* field: This is a field that is used to specify the type of files to be read. For example, `*.jpg`.
2. *Property Name* field: Name of the binary property to which to write the data of the read files.

It is also possible to select files from a certain directory, by specifying the path in the *File Selector* field. For example, `/data/folder/*.jpg`.

## Example Usage

This workflow allows you to read multiple files from the host machine using the Read Binary Files node. You can also find the [workflow](https://n8n.io/workflows/578) on the website. This example usage workflow would use the following two nodes.
- [Start](../../core-nodes/Start/README.md)
- [Read Binary Files]()


The final workflow should look like the following image.

![A workflow with the Read Binary Files node](./workflow.png)

### 1. Start node

The start node exists by default when you create a new workflow.

### 2. Read Binary Files node

1. Enter the type of files you want to read in the *File Selector* field.
2. Click on *Execute Node* to run the workflow.

## Further Reading

<FurtherReadingBlog />
