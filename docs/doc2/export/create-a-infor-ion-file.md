---
title: How to create an Infor ION file
description: This is a step by step guide how to create a Infor ION API file that is needed for the export from DOC² to Infor with the permissions InforOS user must have.
date: 2022-04-24
hero: How to create an Infor ION file
og_title: DOC² - How to create an Infor ION file
tags:
  - Export to Infor
  - ION 
  - DOC²
  - Settings
---

# How to create an Infor ION file

#### Step by step documentation how to create a Infor ION API file that is needed for the Infor export.

**Prerequisites:**

- An admin user für InforOS with the security roles "ION Desk Admin", "ION API Admin", "IDM Admin".
- A InforOS user that can be used as service account that has permission to create documents in IDM with the security roles "IDM-AdvancedUser", "Infor-SuiteUser" and "MingleEnterprise".

1. Open InforOS with a admin user and change to the "Infor ION API" Screen.
    Click on "Authorized Apps" and then on the "+"

![](/_images/doc2/image-14.png)

2\. Enter a meaningfull name and description like "Doc2Export". Choose "Backend Service" and click on the disk icon to save.

![](/_images/doc2/image-16-649x1024.png)

3\. Once the entires are saved, click the button "Download Credentials".

![](/_images/doc2/image-17-955x1024.png)

4\. Switch on "Create Service Account" and enter the service user name into the box.

Click "Download" to get the ION API file.

![](/_images/doc2/image-18.png)

![](/_images/doc2/image-19.png)
