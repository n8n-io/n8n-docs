---
title: IDM Business Context Model
description: In this documentation you will find informations how to create new document types in IDM and connect them with the corresponding workbench in LN 
tags:
  - DOC²
  - Infor
  - IDM
  - LN
---

**What is Infor Document Management (IDM)?**

Infor Document Management (IDM) is an enterprise document management application deployed and integrated within the Infor Operating Service portal.

IDM is one of several Infor applications that uses the user interface of Infor Ming.leTM.

IDM is a central repository where you can manage your common business rules for creating, storing, and managing documents – such as invoices, vendor document, and employee records. You can view, edit, create, and store the physical files.

You can extend IDM with DOC². It provides optical character recognition (OCR) and intelligent character recognition (ICR) capabilities. These tools enable more complete and improved document capture processes. You can scan and connect your documents through a standard web browser and connect the documents to your business process. With IDM you can find the documents you require and you are always working with the latest, most complete version of a document. With access to all your critical business information in-context, DOC²  further automates your document workflows through automatic categorization and retrieval of key document metadata.


**Accessing IDM**

Access the application with the IDM URL.

By accessing the system through this URL, you are ensured that the required libraries are loaded during the page load. Otherwise, several features such as Shortcuts and Context Sharing, do not work properly. The IDM URL is provided to your IDM administrator.

After logging in you can access the client application through the app switcher in the Infor Ming.le portal.


**Control Center**

To access the Control Center, click the options menu next to the **+ Add Document** button on the **Document Management** landing page and select **Control Center**.

![](/_images/doc2/Infor/IDM_Control Center.png)

If you have the IDM-AdvancedUser role or higher, you can perform these actions from the control center:

1. Configure the Exporter/Importer.

   See below

2. Synchronize the data model. Through this action the systems can self-heal by synchronizing the data model.

For all other actions in the control center, see the Infor Document Management Administration Guide – Cloud Edition. These actions are only available for users with the IDM-Administrator role.

**Configuration Exporter / Importer**

![](/_images/doc2/Infor/IDM_ControlCenter_Document Type_Import.png)

Configuration Exporter and Importer allows the user to export / import the Configuration parts of Control Center (Document Types Filter, Result List, Business Context Model, and ION Configuration) using XML documents.

The xml files for all common document types can be downloaded here.

- Order Confirmation: ![](/_images/doc2/Infor/IDMconfiguration_OrderConfirmation.xml)
- Delivery Note: ![](/_images/doc2/Infor/IDMconfiguration_DeliveryNote.xml)
- Invoice: ![](/_images/doc2/Infor/IDMconfiguration_Invoice.xml)

If you are using Infor LN as ERP also upload these xml files:

- Order Confirmation: ![](/_images/doc2/Infor/IDMconfiguration_BusinessContext_OrderConfirmation.xml)
- Delivery Note: ![](/_images/doc2/Infor/IDMconfiguration_BusinessContext_DeliveryNote.xml)
                 ![](/_images/doc2/Infor/IDMconfiguration_BusinessContext_DeliveryNote2.xml)
- Invoice: ![](/_images/doc2/Infor/IDMconfiguration_BusinessContext_Invoice.xml)


**Fill in fields accordingly**

![](/_images/doc2/IDM_Verbundene Dokumente_5.png)
![](/_images/doc2/IDM_Dokumenteinstellungen_6.png)

:fontawesome-solid-triangle-exclamation:{ style="color: #EE0F0F" }
It is important to make sure that the linked fields (e.g. id1) match - i.e. if the number in the "Purchase Order" field on the invoice matches the "id" field on the delivery note, this must be entered accordingly.
:fontawesome-solid-triangle-exclamation:{ style="color: #EE0F0F" }

![](/_images/doc2/IDM_Geschaeftskontextmodell_7.png)
**Add the three entities by clicking "+".**
![](/_images/doc2/IDM_Geschaeftskontextmodell Entitaeten_8.png)

**Invoice:**

![](/_images/doc2/IDM_PurchaseOrder_9.png)

**Delivery Note:**

![](/_images/doc2/IDM_Lieferschein_10.png)

**Order confirmation:**

![](/_images/doc2/IDM_Auftragsbestaetigung_11.png)



