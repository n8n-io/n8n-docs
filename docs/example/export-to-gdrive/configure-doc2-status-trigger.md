---
title: Configuring DOC² App Status Trigger node
description: Here we will check how to add and configure DOC² app status trigger node
tags:
  - Workflow²
  - Example
  - DOC²Export
  - Google Drive

---

## Getting Doc2 API Key

Open **Doc2App** and click **Settings** from the top right menu bar
and then click **API** option

![Settings](/_images/example/gdrive/image8.png)

![Settings](/_images/example/gdrive/image9.png)

Copy the **API Key** from below opened screen

![Settings](/_images/example/gdrive/image10.png)

## Configure Node

Click the ![Add Button](/_images/example/gdrive/image11.png) button at top right corner and then search for **Doc2App Status Trigger**

![Doc2App Status Trigger Configurations Dialog](/_images/example/gdrive/image12.png)

Drag the node to the workflow. It will open configuration dialog as show below.

![Doc2App Status Trigger Configuration Screen](/_images/example/gdrive/image13.png)

Add the Doc2API key to the credentials and select **Pending Export** for the status.

![Doc2App Status Trigger Configured](/_images/example/gdrive/image14.png)

Click the **Listen for Event** button to listen for exported documents

Open **Doc2App**, upload a sample document, validate and export it.

![Doc2AppStatusTrigger Sample](/_images/example/gdrive/image15.png)

You should have result as show above. This means that the node has been configured properly.
