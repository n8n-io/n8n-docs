---
title: "DOC² - Infor API Flow"
description: Here you will find different use cases how processes of your different document types look like and are going to be integrated to Infor.
date: "2022-01-24"
tags:
  - DOC²
  - PO Matching
  - Infor LN
  - Infor M3
  - Use Cases
---

## API with Infor OS & Infor CloudSuite




![Infor CloudSuite API Flow DOC²](/_images/doc2/infor/Doc2-Infor.png)

The DOC² integration to Infor LN / M3 is mostly done via ION API, ION Desk and the Infor Standard BODs. There are mainly two paths that need to be considered when integrating: how we export the data to Infor and how we get data for the master data validation in DOC².



The first export path starts with the ION API which allows DOC² to not only send the pdf with the attributes to IDM but to also send the BOD Sync.CaptureDocument to ION Desk. In ION Desk we transform this Sync.CaptureDocument via ION mappings to the desired target BODs, always depending on which document type we are processing. These transformed Infor BODs are then automatically imported to LN or M3.



The second path is when we want to perform master data validation in DOC² to identify the supplier or to compare / match the purchase order lines. That's why we automatically activate a trigger in LN / M3 so that when a new entry or changes are made in the master data, we receive the Sync.RemitToPartyMaster, Sync.SupplierPartyMaster and the Sync.PurchaseOrder BODs to DOC². The process is configured again in ION Desk where we define the dataflow to a specific connection point to DOC².


[Infor Export](/doc2/export/export-to-infor/)

[IDM Business Context Model](/doc2/doc2-with-infor/IDM-business-context-model/)

[Infor SSO with DOC²](/doc2/configuring-sso-in-cloud/)

[Infor Infrastructure & Security](/doc2/doc2-with-infor/infrastructure/)


