---
title: "Watchdog for Windows"
description: In this documentation you will find how to configure Watchdog for Windows for easy Fileshare Import of your local documents to DOC².
date: "2022-01-28"
tags:
  - DOC²
  - Fileshare Import
  - Watchdog
  - Windows
---
---

# Watchdog for Windows

### Download file here:

<a href="/doc2/fileshare/Watchdog.exe" download>Watchdog Download</a>

## Folder configuration

First configure the following folders:

* Read folder → documents that are exported to DOC2 are uploaded here
* Error folder → documents that ran into an error during the export are saved here
* Processed folder → successfully processed documents are stored here

To configure these folders, you must select the **Settings folder** and press `Browse` for each folder

![](/_images/doc2/Import_Watchdog_Windows_FolderConfiguration.png)


## General configuration

Next, configure general parameters:

  * Environment → where you want to export the documents, the following options are available here:
    - DOC² → here the watchdog exports the documents only to DOC²
    - INFOR OS → here the watchdog checks if there are export orders for Infor OS On-Premise issued by DOC² and then the document is exported to IDM.
  * API key → this key can be found under Integration settings of your DOC² account

There are two more specific parameters:

  * When exporting to Infor OS:
    - Document types → here you have the choice between three different document types

![](/_images/doc2/Import_Watchdog_Windows_GeneralConfiguration.png)
