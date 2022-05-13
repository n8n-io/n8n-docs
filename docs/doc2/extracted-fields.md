---
title: "Extracted fields"
date: "2021-11-23"
description: In this documentation you will find all extracted fields of document type invoice and the index field mapping for FLOW². 
tags:
  - Fields
  - DOC²
  - Mapping
  - FLOW²
---

## Document Type: Invoice

| DOC² | Description |
| --- | --- |
|  |  |
| INVOICE NUMBER |  |
| INVOICE DATE |  |
| DELIVERY DATE |  |
| PO NUMBER | Purchase Order Number |
| IBAN |  |
| PAYMENT TERMS |  |
| NET AMOUNT |  |
| TAX AMOUNT | in germany e.g. 19% (or 16%) |
| VAT RATE | in germany e.g. 19% (or 16%) |
| NET AMOUNT REDUCED |  |
| TAX AMOUNT REDUCED | in germany e.g. 7% |
| VAT RATE REDUCED | in germany e.g. 7% |
| NET AMOUNT FREE |  |
| TAX AMOUNT FREE | 0.00€ |
| VAT RATE FREE | 0% |
| TOTAL NET AMOUNT | any discounts deducted |
| TOTAL TAX AMOUNT | any discounts deducted |
| TOTAL AMOUNT | any discounts deducted |
| CURRENCY |  |
| VENDOR ID |  |
| VENDOR NAME |  |
| VENDOR VAT |  |
| VENDOR ADDRESS |  |

* * *

## Mapping FLOW²

### Index Field Mapping

Index\_Fields=INVOICE\_TYPE,PURCHASE\_ORDER,INVOICE\_NUMBER,INVOICE\_DATE,DELIVERY\_DATE,PAYMENT\_TERMS,TAX\_RATE,TAX\_AMOUNT,NET\_AMOUNT,TOTAL\_AMOUNT,CURRENCY,VENDOR\_ID,VENDOR\_NAME,VAT\_NO\_EXTRACTED,IBAN\_EXTRACTED,ACCOUNTING\_ENTITY,CORRELATION\_ID  
IF\_INVOICE\_TYPE=InvoiceType  
IF\_PURCHASE\_ORDER=PurchaseOrder  
IF\_INVOICE\_NUMBER=InvoiceNumber  
IF\_INVOICE\_DATE=InvoiceDate  
IF\_DELIVERY\_DATE=DeliveryDate  
IF\_PAYMENT\_TERMS=PaymentTerms  
IF\_TAX\_RATE=VatPercent  
IF\_TAX\_AMOUNT=VATAmount  
IF\_NET\_AMOUNT=NetAmount  
IF\_TOTAL\_AMOUNT=TotalAmount  
IF\_CURRENCY=Currency  
IF\_VENDOR\_ID=SupplierID  
IF\_VENDOR\_NAME=SupplierName  
IF\_IBAN\_EXTRACTED=AccountNumber  
IF\_VAT\_NO\_EXTRACTED=VATRegNo  
IF\_ACCOUNTING\_ENTITY=AccountingEntityID  
IF\_CORRELATION\_ID=AlternateDocumentID
 #IF\_VENDOR\_IBAN=BankAccount
