---
title: "How to deal with different VAT amounts"
date: "2021-07-05"
tags:
  - VAT
---

## If you have an invoice with two different VAT amounts, teach them as follows:

![](/_images/doc2/image-1.png)

1. Invoice Details: Add the total amount in the corresponding field Total Amount. Leave Total Net Amount and Total VAT Amount blank.

![](/_images/doc2/Bildschirmfoto-2021-07-05-um-14.03.57-1024x520.png)

2\. Calculation Details: Add the higher Tax Rate into field Tax Rate Full and the lower Rate into Tax Rate Reduced. The other fields remain blank.

![](/_images/doc2/image-2-1024x524.png)

3\. After validating and exporting the Batch-ID from 1st upload after the 2nd upload of document the extracted fields are filled with the following values. The two Net amounts as well as the VAT amounts are automatically added together.

![](/_images/doc2/image-4-1024x589.png)

* * *

## If you have an invoice with 0 VAT amount, teach them as follows:

![](/_images/doc2/image-5.png)

1. Invoice Details: Add the total amount in the corresponding field Total Amount. Leave Total Net Amount and Total VAT Amount blank.

![](/_images/doc2/image-6-1024x485.png)

2\. Calculation Details: Just add 0 into field Tax Rate Free manually, choose Invoice Total for field Net Amount Free an also manually enter 0 in field Tax Amount Free. The other fields remain blank.

![](/_images/doc2/image-7-1024x485.png)

Most of the Tax Rate Free Invoices don't have either VAT nor IBAN. So these fields stay blank as well. In such cases, we will have VENDOR\_ID for the identification of the document.

3\. After validating and exporting the Batch-ID from 1st upload after the 2nd upload of document the extracted fields are filled with the following values.

\------ MISSING -------
