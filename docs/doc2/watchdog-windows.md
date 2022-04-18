---
title: "Watchdog for Windows"
date: "2022-01-28"
tags:
  - DOC²
  - Watchdog
  - Windows
---
---

### Download watchpuppy here:

[WatchPuppy-win](https://docs.cloudintegration.eu/wp-content/uploads/2022/03/WatchPuppy-win.zip)[Download](https://docs.cloudintegration.eu/wp-content/uploads/2022/03/WatchPuppy-win.zip)

## Select WatchPuppy configuration

WatchPuppy supports multiple configuration options. Please check out [this](/doc2/doc2app/import/watchpuppy-configuration/) page for information of the configurations.

### Run WatchPuppy

Create a folder on your machine e.g. C:\\Users\\Administrator\\Documents\\Watchpuppy

![](/_images/doc2/watchpuppy_exe-1-1024x164.png)

paste the downloaded .exe file here

![](/_images/doc2/run_bat-1-1024x194.png)

create a new file making sure it ends with .bat else windows won't be able to run it

Please enter all required arguments in the .bat file.

for export to DOC² use:

watchpuppy.exe -k <API Key> -c doc2 -r read -e error -p processed

After saving the entered arguments, double-click the .bat file and the corresponding folders will be created.

![](/_images/doc2/watchpuppy-folder-after-running_bat-1024x306.png)

* * *

#### In the next step upload document(s) to the read folder

\-> The document(s) are processed automatically
