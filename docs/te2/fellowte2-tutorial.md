---
title: "TE² Tutorial"
description: This is a step by step guide how to use our TE² Plugin after you have installed and configured it. You will find all steps in Ephesoft that have do be proceeded to get to the table view.
date: "2021-07-05"
tags:
  - TE²
  - Plugin
  - Ephesoft
  - Table Extraction
---

### Prerequisites

To work with this tutorial you have to complete [Installation & Configuration](/doc2/fellow-te%c2%b2-plugin/installation-config/) Section for this Plugin.

* * *

### How To Use KV² Plugin

##### **Step 0: Log-in**

- log into the Ephesoft Transact Software with username and password

![](/_images/doc2/login1Unbenannt.png)

![](/_images/doc2/login2Unbenannt.png)

- After login you see the menu on the left side with two modules: Administrator & Operator with their defined functions:

<table><tbody><tr><td><strong>Administrator</strong></td><td><strong>Operator</strong></td></tr><tr><td>Batch Class Management</td><td>Batch List</td></tr><tr><td>Batch Instance Management</td><td>Review Validate</td></tr><tr><td>Folder Management</td><td>Web Scanner</td></tr><tr><td>System Configuration</td><td>Upload New Document</td></tr><tr><td>Report</td><td></td></tr></tbody></table>

#### **Step 1: Interface application of the FellowTE2 Plugin**

- Upload your documents through the Operator Module in “Upload Batch”:  
    

![](/_images/doc2/step1_1.png)

- Start the batch with the according batch class.

![](/_images/doc2/startbatch.png)

- Wait in the Administrator Module in “Batch Instance Management” for the batch to be processed and ready for validation.

![](/_images/doc2/Process3Unbenannt.png)

- Select your Batch and in the list and click to open the batch in order to validate the header and footer fields:

![](/_images/doc2/4-open-batchUnbenannt.png)

- Now you will be redirected to the Ephesoft Validation Window.  
    Besides the options Validate, Next Batch, Merge, Split and More you can find here the button to access the "Table" view.  
    

![](/_images/doc2/image-39-1024x541.png)

![](/_images/doc2/image-40-1024x541.png)

There is a default schema in place which is used by default and can handle most of the Invoice/ Table layouts. For some certain Invoice / Table layouts there are special (custom) layouts in place and certainly there could be more if there are any special needs within your Organisation.

The default schema can recognize values listed in table below. If any field which is marked as required in the table below is missing, this row cannot be recognized as a valid row.

<table><tbody><tr><td><strong>Name</strong></td><td><strong>Type</strong></td><td><strong>Required</strong></td></tr><tr><td>POSITION</td><td>string</td><td>false</td></tr><tr><td>DESCRIPTION</td><td>string</td><td>true</td></tr><tr><td>ITEM_NUMBER</td><td>string</td><td>false</td></tr><tr><td>QUANTITY</td><td>number</td><td>true</td></tr><tr><td>UNIT_PRICE</td><td>currency</td><td>true</td></tr><tr><td>TOTAL_AMOUNT</td><td>currency</td><td>true</td></tr><tr><td>PURCHASE_ORDER</td><td>string</td><td>false</td></tr></tbody></table>

![](/_images/doc2/image-43-1024x732.png)

TE² plugin backend intelligence is executing and optimizing the data/ table view which can then be validated or corrected by user if needed. Even if most tables are recognized and can be executed there are some limitations in the technology, meaning that certain kinds of tables cannot be recognized.

The following characteristics are some reasons on why tables can not be extracted:

1. Multi-line tables.
2. Mixed separation of columns (grid and no grid mix).
3. Table grid overlapping.
4. Too much distance between the column headers and the actual lines.

In any case, tables will be analysed by PolyDocs GmbH i. Gr. in order to determine possibility and viability of the table extraction.

Examples:

![](/_images/doc2/image-41-1024x727.png)

![](/_images/doc2/image-42-1024x648.png)
