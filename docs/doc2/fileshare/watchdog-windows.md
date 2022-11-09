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

### Download the files here:
<a href="/doc2/fileshare/Watchdog.exe" download>Watchdog Download</a><br>
<a href="/doc2/fileshare/poppler.zip" download>Poppler Download</a>

## Running Watchdog
Watchdog can run in headless mode as a servcie and in UI mode. 
The UI mode can be used to make changes to the configuration if you dont want to adjust the watchdog-config.yml file manually.

To start Watchdog in ui mode: `Watchdog.exe ui` 
To start Watchdog in headless mode: 

1. Open a cmd window with admin priveleges
2. `cd` to the directory where the `Watchdog.exe` is located
3. execute these commands: 
    1. `Watchdog.exe install`
    2. `Watchdog.exe start`
    3. Optional - To enable Autostart: `Watchdog.exe --startup delayed install`
   
If Watchdog cant find the config file or the configuration is invalid it will start in UI mode for you to make adjustments to the Settings.
To save the changes start and stop the app. Afterwards run the `Watchdog.exe start` command and watchdog will start in headless mode. 

## Stoping and Uninstalling Watchdog
To stop the Watchdog Service run: `Watchdog.exe stop` <br>
To remove the Watchdog Service: `Watchdog.exe remove`


## Folder configuration

First configure the following folders:

* Read folder → documents that should be uploaded to DOC² have to be in this folder.
* Error folder → documents that ran into an error during the export are saved here.
* Processed folder → successfully processed documents are stored here.

To configure these folders, you must select the **Settings folder** and press `Browse` for each folder.

![](/_images/doc2/Import_Watchdog_Windows_FolderConfiguration.png)



#### Select an environment to which your documents should be exported.
  :fontawesome-solid-circle-info:{ style="color: #0F17E4" } The following options are available:

  **DOC²** → the documents will only be exported to DOC²

  ![](/_images/doc2/Import_Watchdog_Windows_General_Settings_2.png)
  
  **INFOR OS** → here WATCHDOG checks if there are export orders for Infor OS On-Premise issued by DOC² and then the document is exported to IDM.

  There are two more specific parameters:

  When exporting to Infor OS three document types are available

![](/_images/doc2/Import_Watchdog_Windows_General_Settings_1.png)

#### API Key 
→ this key can be found under the Integration settings of your DOC² account.

#### Barcode splitting
If you want to process documents in which several documents with barcodes are combined in one PDF, these are separated by the barcode using the following setting when uploading to DOC².

![](/_images/doc2/Import_Watchdog_Windows_Barcode_Splitting.png)


## Install poppler
For the barcode Splitting to work you need to download the poppler.zip - unzip it and add the bin lib to the PATH system Variable.

1. Search for System variable or Systemumgebungsvariablen
2. click on System Variables ![](/_images/doc2/watchdog/systemeigenschaften.png)
3. Open the system Variables, select Path and click on edit ![](/_images/doc2/watchdog/windows-env.png)
4. Add the path to the unziped poppler folder + \Libary\bin to the Path ![](/_images/doc2/watchdog/add-to-path.png)

Done!


