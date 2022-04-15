---
title: "How to create a IDM mapping file"
date: "2021-10-26"
tags:
  - Infor
---

#### Step by step guide how to create a IDM mapping file.

You can download a example mapping file here:

[IDM mapping example](https://docs.cloudintegration.eu/wp-content/uploads/2021/10/IDM_Mappings.txt)[Download](https://docs.cloudintegration.eu/wp-content/uploads/2021/10/IDM_Mappings.txt)

To use the example file, rename the file from "IDM\_Mapping.txt" to "IDM\_Mapping.properties".

**Here you can find an explanation how the file is structured.**

In the first block the document type gets mapped. On the left side you see the document type name of DOC² and the right side the document type name of IDM.

```
#Define Name of document
#Example: <Doc2DocumentType>=<IDMDocumentType>
#Invoice=LN_SupplierInvoice
INVOICE=LN_SupplierInvoice
```

In the second block you can define static values which will be used in the mapping file.

In the example there is a static field for FileNameSeperator and ACLString.

With the field ACLString you can define the ACL that will set in IDM for each exported document.

```
#Define mappings for the static values
#Example: Static_Values=<StaticVariableName>:<type>
Static_Values=FileNameSeparator,ACLString
#Example: SF_<StaticVariableName> = StaticValue
SV_FileNameSeparator=_
SV_ACLString=Public
```

In the third block you can define static values that will be transfered to IDM.

It will be use to set the EntityType, AccountingEntity and GroupAccountingEntity in IDM.

The values need to be set accordingly to your evironment.

```
#Define mappings for the static fields
#Example: Static_Fields=<IDMAttributeId>:<type>
Static_Fields=MDS_EntityType:STRING,MDS_AccountingEntity,MDS_BodRefAccEntity
#Example: SF_<IDMAttributeId> = StaticValue
SF_MDS_EntityType=InforERPEnterpriseFinancialsReceivedInvoice
SF_MDS_AccountingEntity=100
SF_MDS_BodRefAccEntity=infor.ln.0100
```

In the fourth block you can map the DOC² fields to the IDM attributes.

```
#Define index fields
#Example: Index_Fields=<IndexFieldIdFromEphesoft>:<type>
Index_Fields=INVOICE_NUMBER:STRING,CORRELATION_ID:STRING,ACCOUNTING_ENTITY:STRING,INVOICE_DATE:STRING,GROUP_ACCOUNTING_ENTITY:STRING,SUPPLIER_NAME:STRING
#Example: IF_<IndexFieldIdFromDoc2> = <IDMAttributeId>
IF_INVOICE_NUMBER=SupplierInvoiceNumber
IF_CORRELATION_ID=MDS_id1
IF_INVOICE_DATE=InvoiceDate
IF_SUPPLIER_NAME=SupplierName
```

In the fifth block the ACL String of the second block will be mapped to the ACL field of IDM. Usualy this should not be changed.

```
#Define ACL Field value
#Example: ACL_Fields= Concatenation of other defined fields that together should be a valid ACL in IDM
ACL_Fields=SV_ACLString
```

In the last block you can define the "Searchable\_PDF\_Name". That will be the name if the document in IDM.

It can be a single field name or a concatenation of different fields. For example:

Searchable\_PDF\_Name=IF\_INVOICE\_NUMBER+SV\_FileNameSeparator+IF\_SUPPLIER\_NAME

```
#Define Resource Mapping
#Example: Searchable_PDF_Name= Concatenation of other defined fields
Searchable_PDF_Name=IF_INVOICE_NUMBER
```
