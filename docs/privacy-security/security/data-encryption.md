---
title: Data encryption
description: How n8n encrypts data in transit and at rest.
---

# Data encryption

## n8n Cloud

n8n handles data encryption for n8n Cloud users. 

### Encryption of data in transit: TLS and SSL certificates

When you use the n8n web application, it encrypts traffic between your client and n8n services in transit. The same applies for traffic related to the public API or webhook trigger nodes. n8n manages and renews SSL certificates.


### Encryption of data at rest

n8n encrypts customer data at rest in your instance's mounted volume. n8n uses Azure Storage server side encryption (using AES256 and a FIPS-140-2 compliant implementation). Azure Storage has achieved a wide range of compliance certifications. Refer to [Azure Storage compliance offerings](https://learn.microsoft.com/en-us/azure/storage/common/storage-compliance-offerings){:target=_blank .external-link} for more information.

## Self-hosted n8n

Self-hosters must:

* Set up a reverse proxy in front of your n8n instance to handle TLS.
* Handle encrypting data at rest.

