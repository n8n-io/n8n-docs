---
title: Configuring Doc2App Status Trigger node
description: Here we will check how to add and configure doc2app status trigger node
tags:
  - Workflow²
  - Example
  - Doc2Export
  - Google Drive

---


# Adding and Configuring **Doc2 Status Trigger** node

## Getting Doc2 API Key

Open Doc2App and click **Settings** from the top right menu bar
and then **API**

![Settings](/_images/example/gdrive/image8.png)

![Settings](/_images/example/gdrive/image9.png)

![Settings](/_images/example/gdrive/image10.png)

Copy the API Key

## Configure Node

Click the ![Settings](/_images/example/gdrive/image11.png) and then search for **Doc2AppStatusTrigger**

Drag the node and add to the workflow. It will open configuration dialog as show below

![Doc2AppStatusTrigger Configurations Dialog](/_images/example/gdrive/image12.png)

Add the Doc2API key to the credentials and select **Pending Export** for the status.

![Doc2AppStatusTrigger Sample](/_images/example/gdrive/image14.png)

Click the **Listen for Even**t button and then validate and export a sample document from Doc2App.

![Doc2AppStatusTrigger Sample](/_images/example/gdrive/image15.png)

You should have result as show above. This means that the module has been configured properly
