---
title: Cloud hosting
description: Background on n8n's Cloud hosting, and its implications for privacy and security.
---

# Cloud hosting

n8n cloud is hosted on the [Microsoft Azure](https://aws.amazon.com/){:target=_blank .external-link} platform. The physical hardware powering n8n, and the data stored by our platform, is hosted in the Azure Germany West Central data center in Frankfurt. This is controlled and secured by Microsoft. You can read more about [Azure’s security practices](https://learn.microsoft.com/en-us/azure/security/fundamentals/physical-security){:target=_blank .external-link} and [compliance certifications](https://learn.microsoft.com/en-us/azure/compliance/){:target=_blank .external-link}.

n8n further secures access to Azure resources through a series of controls, including but not limited to: 

* Using multi-factor authentication to access Azure
* Hosting services within a private network inaccessible to the public internet
