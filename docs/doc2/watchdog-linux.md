---
title: "Watchdog for Linux"
description: This is how to configure Watchdog for Linux for easy Fileshare Import of your local documents to DOC².
date: "2021-11-22"
tags:
  - DOC²
  - Fileshare Import
  - Watchdog
  - Linux
---

# Watchdog for Linux

### Download watchpuppy here:

[WatchPuppy-Linux](blob:https://docs.cloudintegration.eu/e913a8f9-71ed-49dd-aab3-2c74dfbff5c7)[Download](blob:https://docs.cloudintegration.eu/e913a8f9-71ed-49dd-aab3-2c74dfbff5c7)

## Select WatchPuppy configuration

WatchPuppy supports multiple configuration options. Please check out [this](/doc2/doc2app/import/watchpuppy-configuration/) page for information of the configurations.

#### Run WatchPuppy

\-> Navigate to the downloaded watchpuppy folder

You have to pass the arguments that are marked as required on [this](/doc2/doc2app/import/watchpuppy-configuration/) page.

```
./watchpuppy -c idm -k demo-api-key -r ~/watchpuppy/read -e ~/watchpuppy/error -p ~/watchpuppy/processed --doc_types "INVOICE,DELIVERY_NOTE,ORDER_CONFIRMATION"
```

> WatchPuppy will create the specified directories for you if they don't exist. After entering the start command WatchPuppy will check if any new files are moved into the specified input directory "-r". If it finds a new file it will upload it to doc2app. As soon as the processing and validation is done it will export the document.

* * *

You can also find more information by entering:./watchpuppy -h

![](/_images/doc2/image.png)

* * *

#### Upload document(s) to the Read folder

![](/_images/doc2/Folder-Read.png)

\-> The document(s) are processed automatically

* * *

> If you have selected DOC² you will find the document on the dashboard

![](/_images/doc2/DOC²_Dashboard_1-1024x333.png)

Document running

![](/_images/doc2/DOC²_Dashboard_2-1024x343.png)

Document ready for Validation

After the validation The status will change to Pending-Watcher-Export. Then WatchPuppy will export the document.
