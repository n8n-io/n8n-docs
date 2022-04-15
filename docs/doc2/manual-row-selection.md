---
title: "Manual row selection"
date: "2022-02-18"
tags:
  - DOC²
---

It is possible that on some documents text in rows is not only written under one column. It might happen that it is written through different columns like in the example below:

![](/_images/doc2/image-10-1024x606.png)

On the screenshot you can see that the table and columns have already been defined. Having a detailed look on the highlighted information (PRAEF) you will recognize that the text is written through columns "Bezeichnung", "Menge", "ME" and "Preis in EUR".

In that case it is not possible for the system to automatically define to which column the information belongs.

To solve this issue DOC² offers a possibility to manually select and map information on a document to any column.

First of all make sure training mode is activated:

![](/_images/doc2/image-11.png)

In addition you need to activate the row edit mode:

![](/_images/doc2/image-13-1024x314.png)

Please note that the manual mapping of text to a column is only possible for extractable columns (blue colour):

![](/_images/doc2/image-14-1024x669.png)

The violet ones can not be mapped manually as the mapping has already been done via the columns defined on the document.

Extractable columns need to be created first. You will learn here how that works: [Add new table column](/doc2/doc2app/table-train/training-of-table-extraction/add-new-table-column/)

Once the column has been created, training mode and row edit mode are activated you can map text on the document to the column as shown in the video below:

In the video you can see how to:

- select an area with your mouse
- double click a value to select the area (only possible for values without spaces)
- delete mapping and re-map the area
