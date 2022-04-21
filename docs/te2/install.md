
# How to install & configure Fellow TE² Plugin

Fellow TE² Plugin is installed directly in Ephesoft Transact. The installation process is same for instances set up in Cloud or On Premise.

Prerequisites
Download the Fellow TE² Plugin from here
You must have Administration rights in Ephesoft Transact.
You must have set up working Batch Class or install Fellows default Batch Class for Plugin usage if no Batch Class is set up in your Ephesoft System, yet. (Contact us to get the Fellow default Batch Class)

## Installation

### Step 1: 

Open your Ephesoft Transact system

![](/_images/te/Ephesoft1.png)

### Step 2: 

As an Admin please click into the Administrator section and select eg. “Batch Class Management”. Open the menu bar on the left and click “System Configuration”.

![](/_images/te/Ephesoft2.png)

### Step 3: 

Open Workflow Management
Drag & Drop or upload the plugin zip files into the “Import Plugin” area to auto-install the plugin.

Make sure that file name is exactly “fellowtable2extractionplugin.zip” and that the files are not renamed (eg by downloading multiple times) as Ephesoft cannot recognize files with another name.

![](/_images/te/Ephesoft3.png)

Make sure that the installation was successful by checking the list under Workflow Management if the new plugin is listed (sample below).

![](/_images/te/Ephesoft4.png)


The Installation part of the plugin is now done and it can be associated to a Batch Class and configured

## Association to Batch Class & Configuration 

### Step 1: 

Open the menu bar on the left and click “Batch Class Management” and open the Batch Class in which the plugin should run

![](/_images/te/Ephesoft5.png)

### Step 2: 

Associate Fellow TE² Plugin with a Batch Class (FELLOW_TABLE2_EXTRACT)
Click Modules and then Extraction on left side of Batch Class Configuration Screen. It will show all the Extraction modules configured for this Batch Class.
Find FELLOW_TABLE2_EXTRACT in “Associated Plugins” column and move it to “Selected Plugins” by click the right arrow button as shown in picture below.

In the “Selected Plugins” column keep the plugin FELLOW_TABLE2_EXTRACT on the bottom of the list, then click “Apply” and then click “Deploy” to activate your changes.

![](/_images/te/Ephesoft6.png)

### Step 3: 

Configure Fellow TE² Plugin (FELLOW_TABLE2_EXTRACT)
Expand the “Extraction” folder in the left menu and select the newly added FELLOW_TABLE2_EXTRACT module.

![](/_images/te/Ephesoft7.png)

Now set up Config details as described below and then click “Apply” and “Deploy”

| Field                                          | Value                                      | Description                          |
| ---------------------------------------------- | ------------------------------------------ | ------------------------------------ | 
| Table Extraction Enabled (Version:1.0.3):*     | True                                       | here you can see the version number of the installed plugin and set value “True” for plugin activation  |
| Key Values DLF Names (Separated by | symbol):* |	"VAT_NO_EXTRACTED|IBAN_EXTRACTED|VENDOR_ID" |	List of the Key Values, separated by pipe character (“|”) |
|  Fellow Webservice URL:*                       | https://cloudintegration.eu/api/fellowkv/extract_table/extract_table | link to the Fellow cloud repository  | 
| Fellow Webservice API Key:*                    | — provided by Fellow Consulting per subscription — | 	personal API key to connect to Fellow Cloud repository |


before you can start using the plugin.

Step 4: Create Table in your Batch Class Document Type
NOTE: this step is only needed if you do not use Fellow Default Batch Class

It is needed to create an invoice Table in the configuration in order that Ephesoft can show tables.

Open the menu and go Batch Class Management again

![](/_images/te/Ephesoft8.png)

Open your dedicated Batch Class

![](/_images/te/Ephesoft9.png)

Select a certain Document Type (eg. INVOICE_DE), open Folder “Index Fields”, select “Tables” and click “Add”

![](/_images/te/Ephesoft10.png)

Add new Table with Name “InvoiceTable” and click Apply and then Deploy (see two screenshots below)

![](/_images/te/Ephesoft11.png)

![](/_images/te/Ephesoft12.png)

Open newly created folder “InvoiceTable” and add a Columns with Name “DESCRIPTION”

![](/_images/te/Ephesoft13.png)

![](/_images/te/Ephesoft14.png)

Click Apply and Deploy

Note that the step “Create Table in your Batch Class Document Type” Must be done for each Document Type.
Once you have it done in one Document Type you can export from there and import to other Document Types:

Export

![](/_images/te/Ephesoft15.png)

Import to other Document type and click Apply and Deploy

![](/_images/te/Ephesoft16.png)

The association and configuration part of the plugin is now done. Note that you have to re-start Transact server

FINAL Step 5: Re-start Transact Server
see Article ho to restart Transact