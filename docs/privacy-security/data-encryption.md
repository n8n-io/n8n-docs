---
title: Data encryption
description: How n8n encrypts data in transit and at rest.
---

n8n handles data encryption for n8n Cloud users. 

Self-hosters must:

* Set up a reverse proxy in front of your n8n instance to handle TLS.
* Ensure data is encrypted at rest.

## Encryption of data in transit: TLS (SSL) Certificates

When you use the n8n web application, traffic between your client and n8n services is encrypted in transit. The same applies for traffic related to the public API or webhook trigger nodes. SSL certificates are managed and renewed by n8n.


## Encryption of data at rest

n8n encrpts customer data at rest in your instance's mounted volume. n8n uses Azure Storage server side encryption (using AES256 and a FIPS-140-2 compliant implementation). Azure Storage has achieved a wide range of compliance certifications which can be seen in detail at: [https://learn.microsoft.com/en-us/azure/storage/common/storage-compliance-offerings](https://learn.microsoft.com/en-us/azure/storage/common/storage-compliance-offerings){:target=_blank .external-link}.

