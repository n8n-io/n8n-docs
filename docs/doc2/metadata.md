---
title: "Metadata"
date: "2021-11-23"
---

Metadata is key information used for classification and easy access of the document management system to the documents. The information relates to the relevant content of the file. It can be an invoice number, the date of a document or the type of document, e.g. "incoming invoice".

## How to create meta data

The prerequisite for this is your ERP master data in an Excel or xls file including e.g.

- Vendor ID
- Vendor name
- IBAN
- VAT No
- Payment terms
- Currency

This master data is used to complete and validate the meta data to be stored for the invoice.

- The REP solution allows the admin user to update this master data to the REP solution.
- The ERP master data is sometimes not unique or complete, especially for older suppliers. Therefore, not all information can always be added.
- If the master data is not completely filled or is not unique, the Admin will complete the metadata obtained from it.
- Payment terms: The PC from the master data with the best discount is used to calculate the due date from the invoice date. This can be overridden by the admin.

![](/_images/doc2/FLOW²_System_Setup_Metadata-types-1024x572.png)

Go to System - Setup - Metadata types

If you use our DOC² service the following index fields are going to be extracted and the meta data must be created accordingly and would looks like this:

### For Document Type INVOICE

| DOC² | FLOW² |
| --- | --- |
| INVOICE\_NUMBER | InvoiceNumber |
| INVOICE\_DATE | InvoiceDate |
| DELIVERY\_DATE | DeliveryDate |
| PURCHASE\_ORDER | PurchaseOrder |
| PAYMENT\_TERMS | PaymentTerms |
| TAX\_RATE | VatPercent |
| TAX\_AMOUNT | VATAmount |
| NET\_AMOUNT | NetAmount |
| TOTAL\_AMOUNT | TotalAmount |
| CURRENCY | Currency |
| VENDOR\_ID | SupplierID |
| VENDOR\_NAME | SupplierName |
| IBAN\_EXTRACTED | AccountNumber |
| VAT\_NO\_EXTRACTED | VATRegNo |
| ACCOUNTING\_ENTITY | AccountingEntityID |
| CORRELATION\_ID | AlternateDocumentID |

![](/_images/doc2/FLOW²_Metadata-types_create-new-1024x583.png)

![](/_images/doc2/FLOW²_Create-Matadata-type-1024x592.png)

![](/_images/doc2/FLOW²_Create-next-Metadata-type-1024x570.png)

![](/_images/doc2/FLOW²_Create-Metadata-type-and-save-1024x480.png)

![](/_images/doc2/FLOW²_Metadata-type-created-successfully-1024x586.png)

Continue like this until all metadata types are created.
