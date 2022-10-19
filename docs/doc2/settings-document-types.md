---
title: Document Types
description: Here you will find all documents available in DOC² as invoice, credit note, delivery note, order confirmation and many more
date: "2021-10-29"
tags:
  - DOC²
  - Settings
  - Document Types
---


## Document Types

In DOC² you will find the `SETTINGS` menu in the upper bar on `HOME` Screen.

![](/_images/doc2/DOC2_Dashboard_Settings.png)

If you are logged in to DOC² as an admin, you will find all fields of a document that can be extracted under the respective document type.

Open the menu **Document Types**.

![](/_images/doc2/DOC2_Dashboard_Settings_Document Types.png)

In the following overview you will find all standard document types available for you:

![](/_images/doc2/DOC2_Document Types.png)

To see which fields can be extracted, for example from an invoice, click on `FIELDS` for this document type.

![](/_images/doc2/DOC2_Invoice_Fields.png)

Here you will find all the fields that can be extracted:

| INVOICE DETAILS    | PAYMENT DETAILS     |  VAT & AMOUNTS      |  VENDOR DETAILS     |
|       :----:       |        :----:       |       :----:        |      :----:         | 
| INVOICE NUMBER     | IBAN                | CURRENCY            | ADDRESS             |
| INVOICE DATE       | PAYMENT TERMS       | NET AMOUNT          | SUPPLIER NAME       | 
| DELIVERY DATE      |                     | NET AMOUNT REDUCED  | VENDOR ID           |
| PO NUMBER          |                     | NET AMOUNT TAX FREE | VENDOR VAT          |
| ORDER DATE         |                     | REDUCED TAX AMOUNT  |                     | 
|                    |                     | TAX AMOUNT          |                     | 
|                    |                     | TAX AMOUNT TAX FREE |                     |
|                    |                     | TOTAL NET AMOUNT    |                     |
|                    |                     | VAT RATE            |                     | 
|                    |                     | VAT RATE REDUCED    |                     |


For every overpoint you can also **CREATE FIELD**s like freight, postage or any field with an amount you want to extract from your invoices.

For each field you can check the boxes if they are 

- REQUIRED: Here you can define if the field must contain a value to continue.

- READ ONLY: Here you can define if a field can only be displayed but not edited.

- HIDDEN: Here you can define whether a field should be hidden or displayed in the extraction view.

- FORCE VALIDATION: Here you can define whether a field must always be validated manually, even if it has been read 100% by DOC².

- OCR and MATCH SCORE: Setting as described below, per field.

- FORMULA: Creation of a formula per field.


![](/_images/doc2/image-7.png)

If all settings are made and should be saved, please confirm this with the "SAVE" button, otherwise the settings will not be applied.

![](/_images/doc2/image-8-1024x167.png)



### RECOGNITION SETTINGS

![](/_images/doc2/DOC2_field settings_recognition settings.png)

**OCR:**

Here you can set the sensitivity of the OCR (Optical Character Recognition) function for all fields at once. This value determines the sensitivity with which a field is marked in red if it could not be extracted with 100% certainty (OCR related!).

**MATCH SCORE:**

Here you can set the sensitivity of the MATCH SCORE function for all fields at once. This value determines from when a field is marked in red if DOC² has not extracted the field with 100% probability. In this case the field needs to be validated manually.

The button "RESTORE DEFAULTS" will set back both values to "50".

![](/_images/doc2/image-3.png)


**PROFILE**

Here you can define the profile that shall be used. Either Default or ZUGFeRD.<br> In profile ZUGFeRD there are predefined fields that are mandatory for this type of invoice.<br> If you do not explicitly use ZUGFeRD, please select "Default".

![](/_images/doc2/DOC2_field settings_profile.png)




