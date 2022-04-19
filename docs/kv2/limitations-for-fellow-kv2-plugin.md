---
title: "Limitations of Fellow KV² Plugin"
date: "2021-11-05"
tags:
  - KV²
  - Ephesoft
---

**Version: 1.0.11**

The Fellow KV² Plugin faces some small limitations for the correct extraction of header and footer fields. In this documentation you will find a list with the main limitations, the reason for it and the proposed "solution" for the user.

## 1\. Processing of multiple pages

**Description of the limitation**

For this case we are going to use the example with invoices. The Fellow KV² Plugin is capable of self-learning and training from different document types, which also means that different supplier invoice templates are trained.

The main issue displayed here is when a "trained" supplier has invoices fluctuating from one to multiple pages. The reason for that is because even if the supplier has been already "trained" by the user, the extraction might fail if the trained extraction rules are presented on another page. See process underneath:

![](/_images/doc2/Screenshot-2021-11-05-at-12.25.17-1024x730.png)

a) The user has trained the supplier "Banana" with an invoice with just one page. That means that the extraction rules are going to be determined on that first page. Specially fields like other custom fields that might appear not on the first page are going to present a problem for other multiple pages examples.

![](/_images/doc2/Screenshot-2021-11-05-at-12.30.41-1024x661.png)

b) The second scenario is when the same supplier "Banana" has send an invoice with more than just one page. Previously the extraction rules for the fields have been determined for page one. But, more specifically for additional custom fields, these are presented on a completely other page.

**Proposed solution for the user**

When presented with such a case the user has to take into account this limitation. This means the user will need to "re-learn" independently the second scenario (and future scenarios) again If further issues appear the user can always advise us with the available feedback function on the 5th tab (validation screen).
