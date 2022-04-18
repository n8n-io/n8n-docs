---
title: "Document Types"
date: "2021-10-29"
tags:
  - DOC²
  - Document Types
---

In DOC² you will find the "SETTINGS" menu in the "DASHBOARD". Open this menu:

![](/_images/doc2/image-49-1024x401.png)

There you will find the menu item "Document Types". Open this menu:

![](/_images/doc2/image-50-1024x502.png)

In the following overview you will find all document types available in DOC²:

![](/_images/doc2/image.png)

Select the document type you want to configure. For example, "INVOICE":

![](/_images/doc2/image-1.png)

You will now see all settings you can make for this document type. For example you can configure the fields you want to extract from your documents:

![](/_images/doc2/image-2-1024x822.png)

**Recognition Settings**

OCR:

Here you can set the sensitivity of the OCR (Optical Character Recognition) function for all fields at once. This value determines the sensitivity with which a field is marked in red if it could not be extracted with 100% certainty (OCR related!).

MATCH SCORE:

Here you can set the sensitivity of the MATCH SCORE function for all fields at once. This value determines from when a field is marked in red if DOC² has not extracted the field with 100% probability. In this case the field needs to be validated manually.

The button "RESTORE DEFAULTS" will set back both values to "50".

![](/_images/doc2/image-3.png)

**SPLIT**

You can define how imported documents shall be split. Either by page or by invoice number (if you import PDF files with more than one invoice/several invoices).

![](/_images/doc2/image-4.png)

**PROFILE**

Here you can define the profile that shall be used. For example Peppol or Zugferd. If you do not explicitly use one of the two, please select "Default".

![](/_images/doc2/image-6.png)

Below you will find all the fields available for this type of document. You can set the following values per field individually:  

REQUIRED: Here you can define if the field must contain a value to continue.  

READ ONLY: Here you can define if a field can only be displayed but not edited.  

HIDDEN: Here you can define whether a field should be hidden or displayed in the extraction view.  

FORCE VALIDATION: Here you can define whether a field must always be validated manually, even if it has been read 100% by DOC².  

OCR and MATCH SCORE: Setting as described above, per field.  

FORMULA: Creation of a formula per field.

![](/_images/doc2/image-7.png)

If all settings are made and should be saved, please confirm this with the "SAVE" button, otherwise the settings will not be applied.

![](/_images/doc2/image-8-1024x167.png)
