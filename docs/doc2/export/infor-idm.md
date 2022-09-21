---
title: "Export to Infor IDM"
description: Step by Step guide how to export documents to Infor Document Management (IDM) without publishing the values in a seperate BOD.
date: "2021-10-22"
tags:
  - DOC²
  - Export
  - Infor
  - IDM
  - DOC²
---

#### Export to Infor Document Management without publishing the document values in a seperate BOD

Step by Step guide how to export documents to Infor Document Management (IDM) without publishing the values in a seperate BOD.

**Prerequisites:**

- An admin user für InforOS with the security roles "ION Desk Admin", "ION API Admin", "IDM Admin".
- An ION API file to create the communication between DOC² and Infor IDM. Follow the documentation here: [How to create an Infor ION file](/doc2/export/create-a-infor-ion-file/)
- A IDM document type where the documents shall be exported to.
- A IDM Mapping file which IDM uses to know which document content represents which information. You find a example of the IDM mapping file on this page: [How to create a IDM mapping file](/doc2/export/how-to-create-a-idm-mapping-file/)

Login to DOC², click on settings and select "Export".

![](/_images/doc2/ExportToInforIDM_1.png)


Settings - Export

Click on "Add integration"

![](/_images/doc2/ExportToInforIDM_2.png)

Settings - Export - Add integration

Choose "Infor IDM"

![](/_images/doc2/ExportToInforIDM_3.png)

Click on the ION API File section and select the ION API file that you want to use for the communation between DOC² and IDM. If you don´t have a ION API file follow this documentation to create one: [How to create an Infor ION file](/doc2/export/create-a-infor-ion-file/)

On normal exports you will have to pick "CLOUD" on the left slider.
With the right slider you can choose if you want to export the normal PDF Invoice to Infor or if you want to export the Invoice as ZUGfERD (PDF with X-Rechnung format ZUGfERD XML attachment).
![](/_images/doc2/ExportToInforIDM_4_PDF_Cloud.png)
![](/_images/doc2/ExportToInforIDM_4_ZUGfERD_Cloud.png)
On exports using [Watchdog](/doc2/fileshare/), you will have to pick "ONPREM" on the left slider.
![](/_images/doc2/ExportToInforIDM_4_PDF_OnPrem.png)
![](/_images/doc2/ExportToInforIDM_4_ZUGfERD_OnPrem.png)

Click on the IDM Mapping file section and choose the IDM Mapping file you want to use for the export.
You find a example of the IDM mapping file on this page: [How to create a IDM mapping file](/doc2/export/how-to-create-a-idm-mapping-file/)
![](/_images/doc2/ExportToInforIDM_5_PDF_Cloud.png)
![](/_images/doc2/ExportToInforIDM_5_ZUGfERD_Cloud.png)
![](/_images/doc2/ExportToInforIDM_5_PDF_OnPrem.png)
![](/_images/doc2/ExportToInforIDM_5_ZUGfERD_OnPrem.png)

Click "Save" to the save the export setting.
