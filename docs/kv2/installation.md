---
title: "Installation & Config"
description: How to install & configure KV² Plugin
date: "2021-07-02"
tags:
  - KV²
  - Plugin
  - Ephesoft
  - Installation
  - Configuration
---

### **How to install & configure KV² Plugin**

KV² Plugin is installed directly in Ephesoft Transact. The installation process is same for instances set up in **Cloud** or **On Premise**.

#### Prerequisites

- Download the KV² Plugin from [here](https://www.fellow-consulting.de/fellowkv-plugin/)  
    _**Note**: Fellow KV² Plugin consist of two zip files!_

![](/_images/doc2/zipfiles.png)

- You must have Administration rights in Ephesoft Transact.
- You must have set up working Batch Class or install Fellows default Batch Class for Plugin usage if no Batch Class is set up in your Ephesoft System, yet. (Contact us to get the Fellow default Batch Class)

### Installation

**Step 0: Access your Infor OS and open IDM Capture in the menu on the top left.**

![](/_images/doc2/Screenshot-2021-07-13-at-12.12.26.png)

##### Step 1: Open your Ephesoft Transact system

![](/_images/doc2/Bildschirmfoto-2021-07-02-um-12.46.59-1024x545.png)

##### Step 2: As an Admin please click into the Administrator section and select eg. "Batch Class Management". Open the menu bar on the left and click "System Configuration".

![](/_images/doc2/Bildschirmfoto-2021-07-02-um-12.48.56-1024x523.png)

##### Step 3: Open Workflow Management  
Drag & Drop or upload both plugin zip files into the "Import Plugin" area to auto-install the plugin.

  
Note: _Make sure that file name is exactly "fellowkv2exportplugin.zip" / "fellowkv2extractplugin.zip" and that the files are not renamed (eg by downloading multiple times) as Ephesoft cannot recognize files with another name._

![](/_images/doc2/Bildschirmfoto-2021-07-02-um-12.54.13-1024x541.png)

Make sure that the installation was successful by checking the list under Workflow Management if the 2 new plugins are listed (sample below).

![](/_images/doc2/MicrosoftTeams-image-3-1-1024x355.png)

The Installation part of the plugin is now done and it can be associated to a Batch Class and configured.

### Association to Batch Class & Configuration

##### Step 1: Open the menu bar on the left and click "Batch Class Management" and open the Batch Class in which the plugin should run

![](/_images/doc2/open-BC.png)

#### **Step 2: associate Extraction Module of the Plugin (FELLOW\_KV2\_EXTRACT)**

Click **Modules** and then **Extraction** on left side of Batch Class Configuration Screen. It will show all the Extraction modules configured for this Batch Class.  
Find **FELLOW\_KV2\_EXTRACT** in "Associated Plugins" column and move it to "Selected Plugins" by click the right arrow button as shown in picture below.

![](/_images/doc2/Bildschirmfoto-2021-07-02-um-13.39.13-1024x545.png)

**IMPORTANT**:  
In the "Selected Plugins" column highlight the plugin and slide the plugin "FELLOW\_KV2\_EXTRACT" to be above "FUZZYDB" with the arrow pointing upwards, click "Apply" and then click "Deploy" to activate your changes.

![](/_images/doc2/Bildschirmfoto-2021-07-02-um-13.40.11-1024x539.png)

#### **Step 3: Configure Extraction Module of the Plugin (FELLOW\_KV2\_EXTRACT)**

Expand the "Extraction" folder in the left menu and select the newly added **FELLOW\_KV2\_EXTRACT** module.

![](/_images/doc2/Bildschirmfoto-2021-07-02-um-13.51.15-1-1024x541.png)

Now set up Config details as described below and then click "Apply" and "Deploy"

<table><tbody><tr><td><strong>Field</strong></td><td><strong>Value</strong></td><td><strong>Description</strong></td></tr><tr><td>Fellow KV2 Extraction Enabled (Version:1.0.3):*</td><td>True</td><td>Here you can see the version number of the installed plugin and set value "True" for plugin activation</td></tr><tr><td>Enabled DLF List (Separated by | symbol):*</td><td>INVOICE_NUMBER|INVOICE_DATE|PURCHASE_ORDER|<br>DELIVERY_DATE|PAYMENT_TERMS|TOTAL_AMOUNT|<br>TAX_RATE|NET_AMOUNT|TAX_AMOUNT|TAX_RATE_2|<br>NET_AMOUNT_2|TAX_AMOUNT_2|TAX_RATE_3|NET_AMOUNT_3|<br>TAX_AMOUNT_3|VAT_NO_EXTRACTED|IBAN_EXTRACTED</td><td><span class="has-inline-color has-black-color">List of all Index fields that should be validated, written in upper cases to reflect Ephesoft field names, separated by pipe character ("|")</span></td></tr><tr><td>Key Values DLF Names (Separated by | symbol):*</td><td>VAT_NO_EXTRACTED|IBAN_EXTRACTED|VENDOR_ID<br></td><td>List of the Key Values</td></tr><tr><td>DLF Value Overwrite Mode:</td><td><em><span class="has-inline-color has-vivid-cyan-blue-color">select one of following possibilities:</span></em><br>- Do Not Overwrite Populated DLFs<br>- Always Overwrite Populated DLFs<br>- Overwrite Populated DLFs With Confidence Below Threshold</td><td>Select Overwrite or Do Not overwrite. The threshold option will overwrite only if the confidencecalculated by Transact of a field is lower than the value below</td></tr><tr><td>DLF Overwrite Confidence Threshold:*</td><td>50</td><td>This property is only used for the Threshold DLF OverwriteMode. Otherwise, enter 0.</td></tr><tr><td>DLF Force Review Threshold:*</td><td>50</td><td>Auto rules will be assigned a confidence based on AutoConfidence Values assignment logic. If the confidence is below the value entered here, the DLF will bemarked for operator review.</td></tr><tr><td>Fellow KV2 Webservice URL:*</td><td><a href="https://cloudintegration.eu/api/fellowkv/extract/get_tfidf_rules" data-type="URL" data-id="https://cloudintegration.eu/api/fellowkv/extract/get_tfidf_rules">https://cloudintegration.eu/api/fellowkv/extract/get_tfidf_rules</a></td><td>link to the Fellow cloud repository</td></tr><tr><td>Fellow Webservice API Key:*</td><td><em><span class="has-inline-color has-vivid-cyan-blue-color">-- provided by Fellow Consulting per subscription</span></em> <em><span class="has-inline-color has-vivid-cyan-blue-color">--</span></em></td><td>personal API key to connect to Fellow Cloud repository</td></tr></tbody></table>

##### Step 4: associate **Export Module** of the Plugin (**FELLOW\_KV2\_EXPORT**)

Click **Modules** and then **Export** on left side of Batch Class Configuration Screen. It will show all the Export modules configured for this Batch Class.  
Find **FELLOW\_KV2\_EXPORT** in "Associated Plugins" column and move it to "Selected Plugins" by click the right arrow button as shown in picture below.

![](/_images/doc2/Bildschirmfoto-2021-07-02-um-14.16.07-1024x547.png)

**IMPORTANT**:  
In the "Selected Plugins" column highlight the plugin "FELLOW\_KV2\_EXPORT" and slide it to the top with the arrow pointing upwards, click "Apply" and then click "Deploy" to activate your changes.

![](/_images/doc2/Bildschirmfoto-2021-07-02-um-14.20.57-1024x544.png)

##### Step 5: Configure **Export Module** of the Plugin (**FELLOW\_KV2\_EXPORT**)

Expand the "Export" folder in the left menu and select the newly added **FELLOW\_KV2\_EXPORT** module.

![](/_images/doc2/Bildschirmfoto-2021-07-02-um-15.08.39-1024x543.png)

Now set up Config details as described below and then click "Apply" and "Deploy"

<table><tbody><tr><td><strong>Field</strong></td><td><strong>Value</strong></td><td><strong>Description</strong></td></tr><tr><td>Fellow KV2 Export Enabled (Version:1.0.3):*</td><td>True</td><td>Here you can see the version number of the installed plugin and set value "True" for plugin activation</td></tr><tr><td>Enabled DLF List (Separated by | symbol):*</td><td>INVOICE_NUMBER|INVOICE_DATE|PURCHASE_ORDER|DELIVERY_DATE|<br>PAYMENT_TERMS|TOTAL_AMOUNT|TAX_RATE|NET_AMOUNT|<br>TAX_AMOUNT|TAX_RATE_2|NET_AMOUNT_2|TAX_AMOUNT_2|<br>TAX_RATE_3|NET_AMOUNT_3|TAX_AMOUNT_3|<br>VAT_NO_EXTRACTED|IBAN_EXTRACTED</td><td><span class="has-inline-color has-black-color">List of all Index fields that should be validated, written in upper cases to reflect Ephesoft field names, separated by pipe character ("|")</span></td></tr><tr><td>Key Values DLF Names (Separated by | symbol):*</td><td>VAT_NO_EXTRACTED|IBAN_EXTRACTED|VENDOR_ID<br></td><td></td></tr><tr><td>Fellow KV2 Webservice URL:*</td><td><a href="https://cloudintegration.eu/api/fellowkv/export/export_rules">https://cloudintegration.eu/api/fellowkv/export/export_rules</a></td><td>link to the Fellow cloud repository</td></tr><tr><td>Fellow Webservice API Key:*</td><td><em><span class="has-inline-color has-vivid-cyan-blue-color">-- provided by Fellow Consulting per subscription</span></em> <em><span class="has-inline-color has-vivid-cyan-blue-color">--</span></em></td><td>personal API key to connect to Fellow Cloud repository</td></tr></tbody></table>

The association and configuration part of the plugin is now done. Note that you have to re-start Transact server before you can start using the plugin.

**Step 6: Deactivate extraction rules for not needed index fields.**

In order to deactivate the extraction rules in every field you have to go through every document type. So, when you open the batch class you will see the following list:

![](/_images/doc2/image-26-1024x411.png)

Now, start from the top and go through every document type following exactly the same steps.

As an example, let's start with document type INVOICE\_DE. So, open the folder and you will see al index fields available.

![](/_images/doc2/image-27-1024x424.png)

Now, we can start with for instance the delivery date and you will need to deactivate the fields by checking off the box in the last column and clicking on "Apply" and "Deploy". It should look like this:

![](/_images/doc2/image-28-1024x494.png)

Please deactivate the rules for all index fields but CREDIT\_NOTE, CURRENCY, IBAN\_EXTRACTED, INVOICE and VAT\_NO\_EXTRACTED.

**Step 7: Import the feedback fields.**

Please use this zip file for the import:

[INVOICE\_DE\_FieldTypes-1](https://docs.cloudintegration.eu/wp-content/uploads/2021/07/INVOICE_DE_FieldTypes-1.zip)[Download](https://docs.cloudintegration.eu/wp-content/uploads/2021/07/INVOICE_DE_FieldTypes-1.zip)

Now go through every document type and use the box underneath for "Import Index Field(s)" to select or drag and drop the zip file:

![](/_images/doc2/image-29-1024x639.png)

##### FINAL Step 8: Re-start Transact Server

see [Article](/doc2/fellowkv2-plugin/how-to-restart-ephesoft-server/) ho to restart Transact
