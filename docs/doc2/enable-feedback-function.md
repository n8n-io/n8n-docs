---
title: "Enable Feedback Function"
date: "2021-07-05"
description: This documentation should explain how to enable the Feedback Function within the Fellow Ephesoft Plugins
tags:
  - DOC²
  - Feedback
  - Fellow Ephesoft Plugins
---

This documentation should explain how to enable the Feedback Function within the Ephesoft Plugins.

The Feedback Function allows the clients to send Feedback to each single Test, directly while performing the Test. Feedback is created and sent during the validation process. For each “Validation” where user enters Feedback we have a ticket created automatically in our Ticket system [Zammad](https://support.cloudintegration.eu/#ticket/view/all_open). The Ticket contains information about the result (Feedback Type), Reporter Email Address and Feedback (Textfield) which are set by tester during validation, as well as a copy of the tested document, which is automatically linked to the ticket.

  
Feedback Function set up and configured within the Batch Class and visible to the clients on the Validation UI of Ephesoft in Tab "5 Feedback".

![](/_images/doc2/Bildschirmfoto-2021-07-05-um-13.43.36-1024x475.png)

## Steps to Enable Feedback:

Download the Feedback FieldTypes from below or go to any Batch Class where Feedback is already enabled to get them from there.  
**If you download from here you can skip Step 1 explained below**.

[INVOICE\_DE\_FieldTypes](https://docs.cloudintegration.eu/wp-content/uploads/2021/07/INVOICE_DE_FieldTypes.zip)[Download](https://docs.cloudintegration.eu/wp-content/uploads/2021/07/INVOICE_DE_FieldTypes.zip)

**Step 1: Get Feedback Fields zip folder**  
Go to Batch Class where Feedback is setup, open "Index Fields" and navigate to last page in order to see the Feedback fields (which are the last four: FEEDBACK\_TYPE, FILE\_ID, FEEDBACK\_EMAIL, FEEDBACK\_DESCRIPTION).

Select the four last fields and click Export, to download it to your machine.

![](/_images/doc2/Bildschirmfoto-2021-07-05-um-14.45.42-1024x476.png)

**Step 2: Import to (other) Document Types**  
Once you have the Feedback Fields zip folder stored your machine you can import it to any document type in your Batch Class where you like to have it available. Simply Drag & Drop the zip file to "Index Fields" folder of the single document types.

![](/_images/doc2/Bildschirmfoto-2021-07-05-um-15.02.15-1024x479.png)

_NOTE: This step must be done/repeated for each Document Type!_
