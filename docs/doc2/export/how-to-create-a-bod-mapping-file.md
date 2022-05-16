---
title: "How to create a BOD mapping file"
description: This is a step by step guide how to create a BOD mapping file. You will find all values and fields that would need an adjustment in DOC² and the BOD.
date: "2021-10-28"
tags:
  - DOC²
  - Export
  - Infor
  - BOD
  - Mapping
---

#### Step by step guide how to create a BOD mapping file.

You can download a example mapping file here:

[BOD mapping example](https://docs.cloudintegration.eu/wp-content/uploads/2021/11/BOD_Mappings.txt)[Download](https://docs.cloudintegration.eu/wp-content/uploads/2021/11/BOD_Mappings.txt)

To use the example file, rename the file from “BOD\_Mapping.txt” to “BOD\_Mapping.properties”.

****Here you can find an explanation how the file is structured.****

In the first block, all static values will be defined. Fields that would need an adjustment are "LogicalID" and "AccountingEntityID".

The "LogicalID" must be set to the logical ID of the IMS connection point that was defined for the DOC² BOD export.

The "AccountingEnity" must be set to the accounting entity of the target Infor ERP system.

```
#All static field attributes.
Static_Fields=AlternateDocSchema,AlternateDocLocation,LogicalID,ConfirmationCode,actionCode,AccountingEntityID

SFP_AlternateDocSchema=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\AlternateDocumentID\\ID\\schemeName
SFV_AlternateDocSchema=CorrelationID

SFP_AlternateDocLocation=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\AlternateDocumentID\\ID\\location
SFV_AlternateDocLocation=doc2

SFP_LogicalID=SyncCaptureDocumentType\\ApplicationArea\\Sender\\LogicalID
SFV_LogicalID=lid://infor.ims.doc2export

SFP_ConfirmationCode=SyncCaptureDocumentType\\ApplicationArea\\Sender\\ConfirmationCode
SFV_ConfirmationCode=OnError

SFP_actionCode=SyncCaptureDocumentType\\DataArea\\Sync\\ActionCriteria\\ActionExpression\\actionCode
SFV_actionCode=Add

SFP_AccountingEntityID=SyncCaptureDocumentType\\DataArea\\Sync\\AccountingEntityID
SFV_AccountingEntityID=infor.ln.100
```

In the second block you can adjust the document type mapping. On the left side you have the document type of DOC² and on the right side the document type of the BOD.

```
#All generated fields.
Generated_Fields=CreationDateTime,BODID

GFP_BODID=SyncCaptureDocumentType\\ApplicationArea\\BODID
GFV_BODID=BODID

GFP_CreationDateTime=SyncCaptureDocumentType\\ApplicationArea\\CreationDateTime
GFV_CreationDateTime=CurrentDate

#Document Type path.
DT_Path=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentType

#Mapping between doc2 document and IDM document.
Document_Types=Invoice
Invoice=SupplierInvoice
```

In the third block you can adjust the field mapping. On the left side are the fields of DOC² and on the right side the field names of the BOD.

```
#Index Field Mapping
Index_Fields=INVOICE_TYPE,PURCHASE_ORDER,INVOICE_NUMBER,INVOICE_DATE,DELIVERY_DATE,PAYMENT_TERMS,TAX_RATE,TAX_AMOUNT,NET_AMOUNT,TOTAL_AMOUNT,CURRENCY,VENDOR_ID,VENDOR_NAME,VAT_NO_EXTRACTED,IBAN_EXTRACTED,ACCOUNTING_ENTITY,CORRELATION_ID
IF_INVOICE_TYPE=InvoiceType
IF_PURCHASE_ORDER=PurchaseOrder
IF_INVOICE_NUMBER=InvoiceNumber
IF_INVOICE_DATE=InvoiceDate
IF_DELIVERY_DATE=DeliveryDate
IF_PAYMENT_TERMS=PaymentTerms
IF_TAX_RATE=VatPercent
IF_TAX_AMOUNT=VATAmount
IF_NET_AMOUNT=NetAmount
IF_TOTAL_AMOUNT=TotalAmount
IF_CURRENCY=Currency
IF_VENDOR_ID=SupplierID
IF_VENDOR_NAME=SupplierName
IF_IBAN_EXTRACTED=AccountNumber
IF_VAT_NO_EXTRACTED=VATRegNo
#IF_ACCOUNTING_ENTITY=AccountingEntityID
IF_CORRELATION_ID=AlternateDocumentID
#IF_VENDOR_IBAN=BankAccount
```

In the rest of the file should stay as is and does not need any modification.

```
#If index field value is to be used somewhere else define path here.

IFP_CORRELATION_ID=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\AlternateDocumentID\\ID
IFP_INVOICE_NUMBER=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentID\\ID
IFP_INVOICE_DATE=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentDateTime
#IFP_ACCOUNTING_ENTITY=SyncCaptureDocumentType\\DataArea\\Sync\\AccountingEntityID

#Index field common path
IF_COMMON_PATH=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentField

IF_Attributes=languageID

IFP_languageID=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentField\\Name\\languageID
IFV_languageID=en-us


#IF_Elements=name,value,fieldOrderNumber,datatype,category,pageID,fieldEnumeration
IF_Elements=name,value,fieldOrderNumber,page,fieldEnumeration
IFP_name=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentField\\Name
IFP_value=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentField\\Value
IFP_fieldOrderNumber=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentField\\FieldOrderNumber
IFP_page=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentField\\PageID
IFP_fieldEnumeration=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentField\\FieldValueEnumerationString


Pages_COMMON_PATH=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentPage

Page_Elements=pageID,sourceFileName,fileMimeType
PFP_pageID=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentPage\\PageID
PFP_sourceFileName=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentPage\\SourceFileName
PFP_fileMimeType=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\DocumentPage\\SourceMimeType

Batch_Level_Properties=fileSize,lastModificationPerson,lastModifiedDateTime

#Path_CreatePerson=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\CreationPerson\\Name
Path_fileSize=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\FileSize
Path_lastModificationPerson=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\LastModificationPerson\\Name
Path_lastModifiedDateTime=SyncCaptureDocumentType\\DataArea\\CaptureDocument\\LastModificationDateTime
```
