---
title: "Changelog"
date: "2022-03-18"
tags:
  - TE²
  - Ephesoft

---


:fontawesome-solid-bug-slash:{ style="color: #EE0F0F" } **FIXED**

:fontawesome-solid-thumbs-up:{ style="color: #03900c" }  **NEW FEATURE**

:fontawesome-solid-award:{ style="color: #eee20e" } **IMPROVEMENT**


<i class="fa-solid fa-award-simple"></i>

# 1.14

- :fontawesome-solid-bug-slash:{ style="color: #EE0F0F" } **FIXED**: Header line disappearing when activating training mode in TE2 (via Ephesoft)
- :fontawesome-solid-bug-slash:{ style="color: #EE0F0F" } **Fixed**: TE - Calculations details are not extracted
- :fontawesome-solid-bug-slash:{ style="color: #EE0F0F" } **Fixed**: Extracted columns dont show on page 2
- Added: Column selection should not be enable after selecting the tick
- Fixed: TE - Table is not extracted correctly
- Added: Search PO Matching can we use a like
- Improved: Table Column Sort for PO Line Table as Done in TEv3
- Added: Table data editable and show errors without having to enable table training mode
- Updated: TE² V2 STAGE - Ungroup button "hidden"
- Added: No mapping on hide/show for amount fields
- Updated: Watcher exported document should be opened in exported/finished mode
- Fixed: Document Export table data
- Fixed: Click on cancel changes the language
- Added: trash icon on field validation and delete rules button
- Added: Add Training mode flag for all api calls on TE3
- Added: Set istabletraining_doc attribute to true when sending call from table training page
- Removed: Remove delete rules button from the field validation screen
- Fixed: Issue with Restore extracted columns
- Updated: Correct translation for NOCOLUMNSFOUND for es-es and fr
- Added: Table training
- Fixed: TE V3 Error when we test with Swiss Format
- Fixed: TE3 Row area keeps changing
- Added: all reformat api call send difference of format_options
- Added: Ability to make line item table from PO Table
- Updated: Only 10 pages of a PDF are displayed
- Added: AI Indicator button for training mode
- Fixed: TE Can't find the Table
- Added: Translation on Stage missing: "Auftragsdaten"
- Fixed: Table Extraction Error
- Added: Overlay for Custom Color
- Added: Show number by fields
- Added: Delete a Custom Table Column
- Added: table Extraction new flow implementation
- Fixed: Number are not extracted all
- Added: KOMISSION (NACHNAME, VORNAME) / MAßNUMMER
- Added: Zugpferd Export UI
- Added: PO table sort
- Fixed: Auftragsbestätigung gets to Rechnung
- Updated: Allow more than 10 pages in PDF in Doc²
- Added: Document restart alert if it takes more than 5 minutes
- Added: Keystrokes Hints Tooltip
- Improved: PO image component and its functionality
- Updated: languages drop down is not appearing
- Added: Doc² Export Flow²
- Added: PO - Help
- Fixed: After addition of two new fields, the existing tests are breaking
- Fixed: DOC² TableExtraction, can't delete a columns
- Fixed: Supplier: IDG, DOC² doesn't work but TE² does?!
- Updated: Total is trainded wrong
- Fixed: Amount Formatting Issues
- Fixed: Button Visibility issue on Some invoice
- Added: " Full " row should show if all other fields are empty
- Added: Setting - Master Data Validation
- Updated: Number value Formatting
- Added: PEPPOL BIS Billing 3.0
- Fixed: Checkbox extraction not working correctly
- Added: Option to switch table extraction version
- Added: Auftrag - Accept / Recject PO Update
- Removed: Table - Quantity bug
- Added: Kommission
- Added: Infor Table Export
- Improved: More table extraction settings
- Added: Save dashboard filters and selected language Unless user clear it
- Added: Custom Field Label and Fuzzy
- Fixed: The document fields and table is not mapped which was already exported
- Improved: Table Train - Error in Group mapping needs to be set again
- Added: Doc2API dashboard API Test
- Added: Basic UI Test for Doc2Landing
- Updated: export configuration update
- Updated: zammad customer is ticket autor
- Added: Table Export Column Mappings and Formatted Data
- Fixed: [Extraction View] Mapped Columns
- Improved: Advance Settings on Table extraction view
- Fixed: Calc is wrong
- Updated: Supplierer Match not working

# 1.13

- Fixed: Rules are not working
- Fixed: Button delete rule is not working
- Fixed: AI Indicator update counter
- Added: New OCR 13.3.0
- Fixed: DOC² TE V3: Save rules doesn't work
- Fixed: DOC² TE V3: What is being extracted? Weird & Wrong data
- Added: Button make PO auto matching
- Fixed: Exporting a document, if you re-open the file, the layout is standard
- Fixed: Fields that are marked red prevent exporting
- Updated: Artikelnummer ist not calculated automatically when pressing the +/- button
- Updated: Save data before redirect to PO Page from Field Validation and Table Extraction
- Added: Restore Extracted columns on a button click
- Added: Mapping Columns Dropdown in Alphabetical Order
- Added: Delete and Save Rule button
- Fixed: Document Form - Export cannot be triggered
- Improved: Doc2app Translation - Pending
- Added: No column mapping option for "Item Number"
- Fixed: Document Caching Issue after doc is deleted
- Added: Add 3 more fields in in the advanced setting and also in response
- Improved: Overlay color issue
- Fixed: TE Columns remapping not working
- Fixed: Row selection is not working
- Fixed: Table Extraction V3 Cache issue
- Improved: Key or Value can not be empty
- Fixed: TE Module settings aren't saved
- Fixed: cE and Cf fields switched
- Fixed: Document Checkboxes aren't working
- Added: colors will be populated based on the closest match to the already defined colors list
- Added: Checkbox Paar is not correct
- Fixed: Account search for Medi Order based on the Customer Number
- Added: PO The Header of both tables are always german
- Fixed: Invoice Number at Delivery Note doc type - change to Order Number
- Fixed: Title in PO is wrong - Should be based on the doc type
- Fixed: f-key is select the Search but it types f as well
- Updated: The font size of the Restore Defaults is too small, need to increase on Field Settings screen
- Improved: Placeholder for calc fields
- Added: Rechtschreibfehler bei Lieferschein fix
- Improved: Extra space between additional amount fields
- Added: highlight group column
- Updated: Add PO ICON in Dashboard
- Added: Documentation for Table Extraction
- Added: Calc was not trained after 2 times exporting
- Fixed: Mapping removed but still there
- Removed: Table training page in Doc2
- Added: Dashboard List update to sort the Columns
- Improved: MWST - make field green
- Updated: Move error message Popup
- Improved: Issue with column selection - looses selection
- Fixed: TE3 column selection near the edge is difficult
- Improved: Dashboard Pagination Issue
- Fixed: table data edit mode -> column selected but no indication on table which row is selected
- Improved: gettexttable column background color remain purple on firefox
- Updated: Click on column send call for gettexttable without selection
- Added: Error on upload we add unit
- Fixed: Double Click TE to extract
- Added: Checkbox export description - Infor ( Cloud or OnPremise )
- Updated: Selecting Images should only be possible with edit
- Fixed: Extra Button when PO Matching is enabled
- Added: All customer Invoices Error out
- Fixed: Option to refresh user settings in Account Settings
- Added: clean image required to be used in html
- Added: PO Image panel improvements
- Improved: Artikelnummer erfassen
- Added: doc2app table extraction page for ephesoft and others
- Added: selected area edit should not be enable on column mode
- Fixed: Table Train for TE²
- Added: different url for image based on source of the image in detail view response
- Added: click on column should also open the mapping column in extraction view
- Improved: quotation mark in amount swiss invoice support
- Added: Customers documents are not finished automatic
- Fixed: Form from Company
- Added: PO - Matching
- Added: Document Classification Change
- Updated: API Endpoint to manage organisation preferences
- Added: Group by show object object instead of proper line item
- Added: Calc MwSt.
- Added: Free Tax is mapped wrong

# 1.10

- Fixed: Add browser support for Safari
- Added: Option to refresh user settings in Account Settings
- Fixed: Missing link to IDM

# 1.9

- Fixed: edit export config is not working
- Fixed: Doc2Landing - No Back by Table
- Added: Add the Address in the fuzzy DB
- Fixed: Fuzzy Error - Auftrag not working
- Fixed: Lieferschein is shown as Invoice in the dashboard
- Added: Calc Fields Optional Due Date
- Added: Button for auto Detecting Tables

# 1.8

- Fixed: Can not check config files or download here
- Fixed: WatchDog - Logik Error Fix
- Fixed: edit export config is not working
- Fixed: Dutch Invoice extraction isn't working
- Fixed: Belgium Invoice extraction isn't working
- Fixed: French Invoice extraction isn't working
- Fixed: Zoom + Column is not working
- Fixed: Column removal not possible
- Fixed: Order Confirmation Table not working
- Fixed: missing translation on dashboard
- Added: resize handlers visible not resizing the selected area
- Fixed: Deleted Table Column can be mapped
- Fixed: TE column change doesn't save the changes
- Added: Doc² - Flow² Export Setting is not open
- Improved: Table train zoom in/out pdf
- Improved: Table Train field draw click instead click hold
- Fixed: Dashboard - DocType is not Translated
- Removed: Console Errors are shown when logged in successfully
- Fixed: Selected currency: € finishing not possible
- Added: [TableExtractionView] Resize selected areas
- Added: doc2 validation: navigate with keyboard
- Improved: Dashboard status - grid view
- Updated: increase font of tooltip
- Added: Tooltip for the Format for Amount + Date
- Fixed: origin dropdown sometimes dont show options
- Fixed: Upload File Drag & Drop works select is not working
- Added: Total Discount Training
- Fixed: Draw Columns and change the size - the columns are lost
- Fixed: Doc² Change Table Size is not working
- Fixed: multiple selected area draw
- Fixed: Line item mapping resets when switch to field validation screen
- Added: Doc² - > Export to Flow²
- Added: dynamic validation screen layout
- Added: Hide Doctype option
- Fixed: Title of the page is wrong in Settings > PO Module
- Fixed: Only Admins should have access to settings
- Improved: Design Changes on Extraction view
- Fixed: Multipage Table extract not working







