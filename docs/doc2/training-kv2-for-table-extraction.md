---
title: "Training KV2 for Table Extraction"
date: "2021-12-16"
---

The function explained in this documentation is used for extracting the table from all types of documents (Invoices, Contracts, Forms, Medical Prescriptions etc.). The extraction of data from tables can be achieved by following the steps described below:

1\. Login to your account with your Email and Password.

2\. Import the desired document on your dashboard.

3\. Click on the document to Open it in the edit screen.

4\. Scroll down to **Line Items** (located at the very bottom right of the available fields).

5\. Click on the table icon inside the textbox

![](/_images/doc2/Line-Items-1-1024x194.png)

**TIP**: If no table extraction is to be performed in the selected document, this can be set with the symbol next to "Line Items".

![](/_images/doc2/Line-Items-2.png)

6\. The following screen will be displayed.

![](/_images/doc2/TE_Adjust-table-1024x548.png)

The following options and functions are now available (displayed on the left half of the screen):

- **Zoom in:** as the name suggests it allows the user to zoom in on the document

![](/_images/doc2/zoom-in.png)

- **Zoom out:** as the name suggests it allows the user to zoom out on the document

![](/_images/doc2/zoom-out.png)

- **Autodetect Table:** This function is for automatically detecting the table in the document – should the plugin be unable to detect the table it has to be selected manually.

![](/_images/doc2/autodetect-table.png)

- **Select Table:** This function allows the user to manually select the desired table via drag-selection.

![](/_images/doc2/edit-table.png)

The Table can also be adjusted here (for example the height and width).

![](/_images/doc2/TE_adjust-table-and-save-1024x549.png)

adjust and save

- **Add Columns:** this function allows the user to manually add guidelines to help the system determine the correct columns (blue lines) as displayed on the following screenshot

![](/_images/doc2/add-line.png)

![](/_images/doc2/Table-select-2.png)

Once these guidelines are added additional functions are available.

![](/_images/doc2/exend-line.png)

The first one allows the user to delete all lines while the second one extends these guidelines to all pages of the document.

Is only one line selected, a delete button will be added, and it allows the user to delete the selected line.

![](/_images/doc2/delete-1-line.png)

- **Save Changes:** allows the user to save any changes made.

![](/_images/doc2/save.png)

**TIP****:** Is the table marking wrong and should be deleted, select the marking of said table – a red symbol will appear allowing the removal of the marking.

![](/_images/doc2/Bildschirmfoto-2021-12-16-um-14.53.08-1024x307.png)

  
7) Once the changes are saved the plugin will automatically extract the found data and display it on a table to the right.

![](/_images/doc2/Table-1-1.png)

The available functions on this side of the screen are as follows:

- **Revert Changes:** Allows the user to undo any changes.

![](/_images/doc2/undo.png)

- **Advanced Settings:** This function allows for additional settings to extract the data further correctly.

![](/_images/doc2/advanced-settings-1.png)

Once selected the following screen will pop up:

![](/_images/doc2/Table-2-1.png)

“Header row count” defines how many rows are part of the header for example if the header has two rows the corresponding number (2 in this case) must be selected.

“Move Extra Row to desc”

- **Add new line:** Adds an additional line at the bottom of the table.

![](/_images/doc2/add-new-line.png)

- **Delete all extracted data:** Deletes all extracted data from the table.

![](/_images/doc2/delete-extr.-data.png)

- **Block table extraction for this supplier:** This must be selected if no table should be extracted from this supplier.

![](/_images/doc2/blox-table-ex.png)

Every column name must be assigned correctly for example “POS.NO.” corresponds to “Position”.

**This must be done for all column names – otherwise it will produce an error!**

![](/_images/doc2/position-1024x590.png)

Next select the three dots next to the position to which the content is oriented for example the position number.

![](/_images/doc2/position-2.png)

Beside the possibility to delete (via the trashcan symbol) the row (which of course can be found in all other columns as well) the option "Group Rows" is important here.

![](/_images/doc2/group-data-1024x495.png)

This option groups all the date corresponding to the position.

Should the system recognize empty or undesirable data delete them via the purple “X” on the left side of the table.

![](/_images/doc2/delete-row.png)

Once the table has been set up as desired, the settings can be saved by clicking on "Save". It will then immediately transport the user back to the dashboard.

![](/_images/doc2/Bildschirmfoto-2021-12-16-um-14.41.25-1024x92.png)

Alternatively, the document can be exported immediately by clicking on "Confirm & Export".

![](/_images/doc2/Bildschirmfoto-2021-12-16-um-14.41.30-1024x83.png)
