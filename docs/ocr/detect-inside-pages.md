---
title: "Detect inside pages"
description: In this part of the API, we are able to detect and extract special parts of your document. The section is split up in three different parts.
date: "2021-07-06"
tags:
  - OCR
  - API
---

In this part of the API, we are able to detect and extract special parts of your document. The section is split up in three different parts:

![](/_images/doc2/image-21-1024x194.png)

## Detect blank pages

TBD

## Detect language

![](/_images/doc2/image-22-1024x252.png)

This functionality allows you to put in a text of your choice and our API will recognize the language it is written in.

### _Done!_

## Detect tables

We are now diving into a table extraction part of the API, which will automatically extract metadata out of your document.

To start off, in this section the API once again allows you to have your results shown in a response body or sent to you via E-Mail. If you choose to have it sent to you via E-Mail, just type n your adress at the start of the section.

Now you are asked to load up your document before choosing parameters again.

### Functionalities and Parameters

**Report** (true/false) allows you to choose whether or not to receive an accuracy report.

![](/_images/doc2/image-23.png)

Example for an accuracy report

**Grid and contour** (true/false): This parameters decides on whether or not you will receive the document in a base64 file on top of your extracted data. This might be helpful, for the general usage it is not necessary though.

**Mode** (stream/lattice) decides on the way the table is extracted. We recommend to leave this on auto, since both ways should extract the same metadata.

**Format** (Excel, Json, HTML) lets you choose the format you want your metadata extracted in.

### Execute

After hitting execute, you will receive your extracted data in code format like shown underneath, or you will have the metadata sent to you via E-Mail:

![](/_images/doc2/image-24-1024x369.png)

### _Done!_
