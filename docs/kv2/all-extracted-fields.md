---
title: "All extracted fields"
date: "2021-07-05"

description: Shows the quality of the extraction using graphical indicators

tags:
  - General
  - DOC²
  - KV²
---

### 1 Invoice Details

<table><tbody><tr><td><strong>Field Name</strong></td><td><strong>Description</strong></td></tr><tr><td>Invoice Number</td><td>Sometimes there are multiple invoice numbers on invoices. Select the one you want to extract here</td></tr><tr><td>Invoice Date</td><td>Select invoice date here</td></tr><tr><td>Purchase Order</td><td>Sometimes there are multiple purchase order numbers on invoices. Select here the one you want to extract</td></tr><tr><td>Delivery Date</td><td>Select the delivery date here if available. If this is not visible/notated on the invoice, leave this field blank.</td></tr><tr><td>Payment Terms</td><td><span class="has-inline-color has-black-color">Select payment terms, if available</span></td></tr><tr><td>Total Net Amount</td><td>leave this field blank, it will be calculated from the data on tab "Calculation Details"</td></tr><tr><td>Total VAT Amount</td><td>leave this field blank, it will be calculated from the data on tab "Calculation Details"</td></tr><tr><td>Total Amount</td><td>select total amount here</td></tr><tr><td>Currency</td><td>select invoice currency e.g. EUR/GBP here</td></tr><tr><td>Invoice Type</td><td>if the document is an invoice, <strong>Invoice</strong> should be selected here. If the document is a credit note, select <strong>Credit Note</strong> here.</td></tr></tbody></table>

### 2 Calculation Details

<table><tbody><tr><td><strong>Field Name</strong></td><td><strong>Description</strong></td></tr><tr><td>Tax Rate Full</td><td>If there are multiple tax rates on the invoice, select the higher of the two here<br>see example <a href="/doc2/fellowkv2-plugin/fellowkv2-tutorial/how-to-deal-with-different-vat-amounts/">here</a><br></td></tr><tr><td>Net Amount Full</td><td>see example <a href="/doc2/fellowkv2-plugin/fellowkv2-tutorial/how-to-deal-with-different-vat-amounts/">here</a><br></td></tr><tr><td>Tax Amount Full</td><td>see example <a href="/doc2/fellowkv2-plugin/fellowkv2-tutorial/how-to-deal-with-different-vat-amounts/">here</a><br></td></tr><tr><td>Taxe Rate Reduced</td><td>If there are multiple tax rates on the invoice, select the lower of the two here<br>see example <a href="/doc2/fellowkv2-plugin/fellowkv2-tutorial/how-to-deal-with-different-vat-amounts/">here</a><br></td></tr><tr><td>Net Amount Reduced</td><td>see example <a href="/doc2/fellowkv2-plugin/fellowkv2-tutorial/how-to-deal-with-different-vat-amounts/">here</a><br></td></tr><tr><td>Tax Amount Reduced</td><td>see example <a href="/doc2/fellowkv2-plugin/fellowkv2-tutorial/how-to-deal-with-different-vat-amounts/">here</a><br></td></tr><tr><td>Tax Rate Free</td><td>For a tax-free invoice enter 0 here<br>see example <a href="/doc2/fellowkv2-plugin/fellowkv2-tutorial/how-to-deal-with-different-vat-amounts/">here</a><br></td></tr><tr><td>Net Amount Free</td><td>For a tax-free invoice, enter the total amount here<br>see example <a href="/doc2/fellowkv2-plugin/fellowkv2-tutorial/how-to-deal-with-different-vat-amounts/">here</a><br></td></tr><tr><td>Tax Amount Free</td><td>For a tax-free invoice enter 0 here<br>see example <a href="/doc2/fellowkv2-plugin/fellowkv2-tutorial/how-to-deal-with-different-vat-amounts/">here</a><br></td></tr></tbody></table>

### 3 Recipient Details

This Tab is only needed in case you have (multiple) sub companies. In that case please choose the respective value here. Auto population can be possible based on recognized VAT Number Recipient.

If there are no sub companies, this tab can be ignored or also be hidden within the Batch Class Configuration.

<table><tbody><tr><td>Recipient Name</td><td></td></tr><tr><td>VAT Number Recipient</td><td></td></tr></tbody></table>

### 4 Vendor Details

  
Tab Vendor Details shows all data related to the vendor. Most of the fields here will be auto-populated from fuzzy DB and cannot be edited in this screen. Only VAT No Extracted and Vendor IBAN should be checked and validated.

<table><tbody><tr><td>Vendor ID</td><td></td></tr><tr><td>Vendor Name</td><td></td></tr><tr><td>Vendor Street</td><td></td></tr><tr><td>Vendor ZIP</td><td></td></tr><tr><td>Vendor City</td><td></td></tr><tr><td>Vendor Country</td><td></td></tr><tr><td>Vendor VAT ID</td><td></td></tr><tr><td>VAT No Extracted</td><td>Vat No. of the vendor sending the invoice</td></tr><tr><td>Vendor IBAN</td><td>IBAN of the vendor, if multiple values are available and recognized please select the main one</td></tr><tr><td>IBAN Extracted</td><td></td></tr><tr><td>Vendor PO Box</td><td></td></tr><tr><td>Vendor Phone</td><td></td></tr><tr><td>Vendor Email</td><td></td></tr><tr><td>Vendor Web Address</td><td></td></tr></tbody></table>

Please Note that some fields might have limitations like limited amount of character. These limitation differ between the single ERP systems and potential issues while sending the data are not caused by the KV² Plugin.
