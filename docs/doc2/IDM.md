---
title: IDM Business Context Model
description: In this documentation you will find informations how to create new document types in IDM and connect them with the corresponding workbench in LN 
tags:
  - DOC²
  - Infor
  - IDM
  - LN
---

## What is Infor Document Management (IDM)?

Infor Document Management (IDM) is an enterprise document management application deployed and integrated within the Infor Operating Service portal.

IDM is one of several Infor applications that uses the user interface of Infor Ming.leTM.

IDM is a central repository where you can manage your common business rules for creating, storing, and managing documents – such as invoices, vendor document, and employee records. You can view, edit, create, and store the physical files.

You can extend IDM with DOC². It provides optical character recognition (OCR) and intelligent character recognition (ICR) capabilities. These tools enable more complete and improved document capture processes. You can scan and connect your documents through a standard web browser and connect the documents to your business process. With IDM you can find the documents you require and you are always working with the latest, most complete version of a document. With access to all your critical business information in-context, DOC²  further automates your document workflows through automatic categorization and retrieval of key document metadata.


## Accessing IDM

Access the application with the IDM URL.

By accessing the system through this URL, you are ensured that the required libraries are loaded during the page load. Otherwise, several features such as Shortcuts and Context Sharing, do not work properly. The IDM URL is provided to your IDM administrator.

After logging in you can access the client application through the app switcher in the Infor Ming.le portal.


### Control Center

To access the Control Center, click the options menu next to the **+ Add Document** button on the **Document Management** landing page and select **Control Center**.

![](/_images/doc2/Infor/IDM_Control Center.png)

If you have the `IDM-AdvancedUser` role or higher, you can perform these actions from the control center:

1. Configure the Exporter/Importer. (See below)

2. Synchronize the data model. Through this action the systems can self-heal by synchronizing the data model.

For all other actions in the control center, see the _Infor Document Management Administration Guide – Cloud Edition_. These actions are only available for users with the `IDM-Administrator` role.

### Configuration Exporter / Importer

![](/_images/doc2/Infor/IDM_ControlCenter_Document Type_Import.png)

Configuration Exporter and Importer allows the user to export / import the Configuration parts of Control Center (Document Types Filter, Result List, Business Context Model, and ION Configuration) using XML documents.

The xml files for all common document types can be downloaded here.

- Order Confirmation: <a href="/_images/doc2/Infor/IDMconfiguration_OrderConfirmation.xml" download>IDMconfiguration_OrderConfirmation</a>
- Delivery Note: <a href="/_images/doc2/Infor/IDMconfiguration_DeliveryNote.xml" download>IDMconfiguration_DeliveryNote</a>
- Invoice: <a href="/_images/doc2/Infor/IDMconfiguration_Invoice.xml" download>IDMconfiguration_Invoice</a> 

If you are using Infor LN as ERP also upload these xml files:

- Order Confirmation: <a href="/_images/doc2/Infor/IDMconfiguration_BusinessContext_OrderConfirmation.xml" download>IDMconfiguration_BusinessContext_OrderConfirmation</a>
- Delivery Note: <a href="/_images/doc2/Infor/IDMconfiguration_BusinessContext_DeliveryNote.xml" download>IDMconfiguration_BusinessContext_DeliveryNote</a>
*Tabspace*<a href="/_images/doc2/Infor/IDMconfiguration_BusinessContext_DeliveryNote2.xml" download>IDMconfiguration_BusinessContext_DeliveryNote2</a>
- Invoice: <a href="/_images/doc2/Infor/IDMconfiguration_BusinessContext_Invoice.xml" download>IDMconfiguration_BusinessContext_Invoice</a>


You can import the files as follows:

### Using the Import tab

1. Navigate to **Control Center** > **Administration** > **Import / Export** and click the **Import** tab.
2. Click **Select XML file** and browse for the XML file. A file validation applies. Only XML files that were created by the exporter are accepted. If validation fails, **Import XML** file remains disabled.
3. When the configuration file is uploaded, an import preview is displayed and includes any or all of these parts:
![](/_images/doc2/Infor/IDM_Using the import tab.png)
4. You can collapse or expand each part to see possible warnings or information:
   + :fontawesome-solid-triangle-exclamation:{ style="color: #EE0F0F" } Warning - yellow sign: The warning sign does not disable **Import XML file**. We recommend that you go through all warning messages before starting the importer. This could be due to these situations:
    + Some configuration parts already exist in the repository that might be overwritten, for example, Result List.
    + Some configuration parts already exist in the repository that might be lost, for example, Document Type Filter.
   + :fontawesome-solid-info:{ style="color: #eee20e" } Information - blue sign: The information sign does not disable Import XML file. It is usually displayed in these situations:
    + If some parts cannot be imported, for example, Items.
    + If some existing parts are merged with new ones from the XML file, for example, Result List.
   + A green OK sign with no message required.
5. Click **Import XML file** to run the importer. When the import is finished, a report window is displayed with an information table that summarizes the status of the import. If any error occurs during the import, the error message informs the user what went wrong.

When the import is successful, **Import XML file** is disabled.

This is how the general Information and attributes look like in IDM under the corresponding document type:

**Order Confirmation**

![](/_images/doc2/Infor/IDM_DocumentType_OrderConfirmation.png)
![](/_images/doc2/Infor/IDM_Attributes_OrderConfirmation.png)

**Delivery Note**

![](/_images/doc2/Infor/IDM_DocumentType_DeliveryNote.png)
![](/_images/doc2/Infor/IDM_Attributes_DeliveryNote.png)

**Invoice**

![](/_images/doc2/Infor/IDM_DocumentType_Invoice.png)
![](/_images/doc2/Infor/IDM_Attributes_Invoice.png)

When you open the **Business Context Model** menu item
![](/_images/doc2/Infor/IDM_BusinessContextModel.png)
you will find the information here as follows:

**Order Confirmation**

![](/_images/doc2/Infor/BusinessContextModel_XQuery_OrderConfirmation.png)
```oc
/ORDER_CONFIRMATION[@MDS_EntityType = "{entityType}" AND @MDS_id1 = "{id1}"]
```

**Delivery Note**

![](/_images/doc2/Infor/BusinessContextModel_XQuery_DeliveryNote.png)
```dn
/DELIVERY_NOTE[@MDS_EntityType = "{entityType}" AND @MDS_id1 = "{id1}"]
```

![](/_images/doc2/Infor/BusinessContextModel_XQuery_DeliveryNote2.png)
```dn2
/DELIVERY_NOTE[@Delivery_Note_Id="{id3}"]
```

**Invoice**

![](/_images/doc2/Infor/BusinessContextModel_XQuery_Invoice.png)
```inv
/LN_SupplierInvoice[@MDS_EntityType = "{entityType}" AND @MDS_id1 = "{id1}"]
```

All these steps connect all documents from IDM to the corresponding workbench in LN, where they are also displayed. And this is how it looks in LN:

**Order Confirmation**

![](/_images/doc2/Infor/LN_Order_Order Confirmation.png)

**Delivery Note**

![](/_images/doc2/Infor/LN_Workbench Order volume_Delivery Note.png)

**Invoice**

![](/_images/doc2/Infor/LN_Workbench Accounts Payable Processing_Invoice.png)