---
title: "Export to Infor IDM"
description: Step by Step guide how to export documents to Infor Document Management (IDM) without publishing the values in a seperate BOD.
icon: material/application-export
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
- An ION API file to create the communication between DOC² and Infor IDM. Follow the documentation here: [How to create an Infor ION file](/doc2/doc2app/export/infor/create-a-infor-ion-file/)
- A IDM document type where the documents shall be exported to.

Login to DOC², click on settings and select "Export".

![](/_images/doc2/image-1-1024x695.png)

  
Settings - Export

Click on "Add integration"

![](/_images/doc2/image-7-1024x751.png)

Settings - Export - Add integration

Choose "Infor IDM"

![](/_images/doc2/image-12-1024x356.png)

Click on the ION API File section and select the ION API file that you want to use for the communation between DOC² and IDM. If you don´t have a ION API file follow this documentation to create one: [How to create an Infor ION file](/doc2/doc2app/export/infor/create-a-infor-ion-file/)

![](/_images/doc2/image-22-1024x354.png)

Click on the IDM Mapping file section and choose the IDM Mapping file you want to use for the export.  
You find a example of the IDM mapping file on this page: [How to create a IDM mapping file](/doc2/doc2app/export/infor/how-to-create-a-idm-mapping-file/)

![](/_images/doc2/image-24-1024x352.png)

Click "Save" to the save the export setting.
