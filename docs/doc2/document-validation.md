---
title: "Document Validation"
date: "2021-10-29"
---

### How to Validate a document

After you have uploaded a document as described on https://docs.cloudintegration.eu/docs/doc2app/doc%c2%b2-tutorial/dashboard/, perform the following steps to validate it:

1. Go to HOME where you will find the DASHBOARD with uploaded documents

![](/_images/doc2/DOC²_Dashboard-1024x640.png)

2\. Click on the bar to open the document. In this case it doesn't matter if you click on the document name or the status.

![](/_images/doc2/DOC²_Document-1024x640.png)

On the left-hand side, you can see the documents preview, where you can also jump from one to the other page when you document has more than just one page. In the middle part of the screen, you have the big overview of the document where you can also see the extracted values marked in purple. And, finally, on the right-hand side you have all the segments of the extracted values.

Let’s focus on this last part.

Firstly, on the top right side you can define the document origin if needed:

![](/_images/doc2/image-9.png)

For different origins the document can have different amount and date formats. To be sure dates and figures/amounts will be extracted correctly make sure the document origin is set properly.

Now, we get the basic information like invoice number, date etc. If you click on the field of invoice number for example, you get directly marked where on the invoice it was extracted.

![](/_images/doc2/DOC²_Document_Invoice-Number-1024x640.png)

You can now check if the number was extracted correctly. All values that were correctly extracted you confirm with the checkmark. You can do this with every single field. Another important point is that on the right side of each field you get a percentage of the confidence level of the DOC².

All values that have been correctly extracted and confirmed with the check mark will have a green bar at the beginning of the field.

![](/_images/doc2/DOC²_Document_correct_green-colour-1024x640.png)

A great example is on the next segment of field IBAN, where the IBAN is not even extracted, as confidence level is equal to 0. To train and extract the value, just enter the field and mark the IBAN on the invoice. You get this message if you are sure of your selection, so click yes.

![](/_images/doc2/DOC²_trained-field-confirmation-1024x640.png)

The selected value will be extracted to the IBAN field and displayed on the invoice. Please confirm the value with the checkmark to finalize it.

![](/_images/doc2/DOC²_confirm-extracted-value-1024x640.png)

The procedure for each extracted or non-extracted value is always the same. Here are some examples of the values extracted from an invoice:

![](/_images/doc2/DOC²-_VAT-and-amounts-1024x640.png)

![](/_images/doc2/DOC²_Vendor-details-1024x640.png)

For the vendor details we have configured the Fuzzy search, where the supplier identification is matched by the master data imported from your ERP system. If for example the supplier’s name was missing you could also look it up in this table. Everything is set up very easily and user-friendly so this job of making the validation is faster.

After checking all the fields available for extraction, you can confirm the changes and export directly. If you have to interrupt editing, e.g. because of a last-minute appointment or a phone call, you can also save the changes you have confirmed up to that point and continue later.

![](/_images/doc2/DOC²_Save_Confirm-and-Export-1024x640.png)

When you have saved the changes, the document remains in the Ready for Validation status.

![](/_images/doc2/DOC²_Ready-for-Validation-status-1024x640.png)

Find more details in the following sections:
