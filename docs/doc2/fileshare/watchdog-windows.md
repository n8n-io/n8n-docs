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

### Download the file here:
<a href="/doc2/fileshare/Watchdog.exe" download>Watchdog Download</a><br>
<a href="/doc2/fileshare/poppler.zip" download>Poppler Download</a>

## Folder configuration

First configure the following folders:

* Read folder → documents that should be uploaded to DOC² have to be in this folder
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

## Install poppler
For the barcode Splitting to work you need to download the poppler.zip - unzip it and add the bin lib to the PATH system Variable.

1. Search for System variable or Systemumgebungsvariablen
2. click on System Variables ![](/_images/doc2/watchdog/systemeigenschaften.png)
3. Open the system Variables, select Path and click on edit ![](/_images/doc2/watchdog/windows-env.png)
4. Add the path to the unziped poppler folder + \Libary\bin to the Path ![](/_images/doc2/watchdog/add-to-path.png)

Done!
