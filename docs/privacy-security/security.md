---
description: n8n's security policies
contentType: explanation
---
<!-- vale off -->
# Security

This page describes n8n's security practices.

## User accounts, authentication, and authorization

### n8n Cloud

When you sign up for an n8n cloud account, you create an account directly with n8n. 

When you create an account on n8n.cloud with a username and password, n8n implements best practices for account. For example, n8n salts and hashes your password, then stores the hashed password in a database which is encrypted at rest.

### Self-hosted

n8n salts and hashes the passwords of self-hosted users on account creation. However, encrypting other data at rest is the responsibility of the user. Refer to [Data encryption | Self-hosted n8n](#self-hosted-n8n) for more information.

n8n supports custom session timeouts on self-hosted.

## Third-party accounts

A key part of n8n's functionality is to link third-party services. When you link an account from a third party application, you may need to either authorize n8n OAuth application access to your account, or provide an API key or other credentials. This section describes how n8n handles these grants and keys.

n8n recommends using [OAuth](https://oauth.net/2/){:target=_blank .external-link} for third-party applications that support it. The OAuth protocol allows n8n to request scoped access to specific resources in your third party account without you having to provide long-term credentials directly. n8n must request short-term access tokens at regular intervals, and most applications provide a way to revoke n8n's access to your account at any time.

Some third-party applications don't provide an OAuth interface. To access these services, you must provide the required authorization mechanism (often an API key). As a best practice, if your application provides such functionality, n8n recommends you limit that API key's access to only the resources you need access to within n8n.

When you use credentials in a workflow, n8n loads them into the execution environment of your n8n instance. For n8n Cloud, customer instances are logically isolated from another.

n8n doesn't log or export credentials by default. If you log their values you can always delete the data for that execution. The platform deletes execution data automatically based on the retention settings for your account.

You can delete your OAuth grants or key-based credentials at any time. Deleting OAuth grants within n8n doesn't revoke n8ns access to your account. You must revoke that access wherever you manage OAuth grants in your third party application.

### n8n Cloud storage and encryption

n8n stores all OAuth tokens, key-based credentials, and the rest of your Cloud instance's database on a disk that's encrypted at rest using Azure server-side encryption (at the time of writing, using AES256 and a FIPS-140-2 compliant implementation). For n8n cloud that database also resides in a private network. Backups of that database are also encrypted.

## Cloud hosting

n8n cloud uses [Microsoft Azure](https://aws.amazon.com/){:target=_blank .external-link} for hosting. The physical hardware powering n8n, and the data stored by the platform, is hosted in the Azure Germany West Central data center in Frankfurt. Microsoft controls and secures this. You can read more about [Azure’s security practices](https://learn.microsoft.com/en-us/azure/security/fundamentals/physical-security){:target=_blank .external-link} and [compliance certifications](https://learn.microsoft.com/en-us/azure/compliance/){:target=_blank .external-link}.

n8n further secures access to Azure resources through a series of controls, including: 

* Using multi-factor authentication to access Azure
* Hosting services within a private network inaccessible to the public internet

## Data encryption

### n8n Cloud

n8n handles data encryption for n8n Cloud users. 

#### Encryption of data in transit: TLS and SSL certificates

When you use the n8n web application, it encrypts traffic between your client and n8n services in transit. The same applies for traffic related to the public API or webhook trigger nodes. n8n manages and renews SSL certificates.


#### Encryption of data at rest

n8n encrypts customer data at rest in your instance's mounted volume. n8n uses Azure Storage server side encryption (using AES256 and a FIPS-140-2 compliant implementation). Azure Storage has achieved a wide range of compliance certifications. Refer to [Azure Storage compliance offerings](https://learn.microsoft.com/en-us/azure/storage/common/storage-compliance-offerings){:target=_blank .external-link} for more information.

### Self-hosted n8n

Self-hosters must:

* Make sure data is encrypted in transit by setting up a reverse proxy in front of the n8n instance to handle TLS.
* Handle encrypting data at rest. This can be achieved by using encrypted partitions, or encryption at the hardware level, and ensuring n8n and its database is written to that location. Cloud providers typically offer storage systems with disk encryption built-in.

## Development

n8n uses GitHub to store and version all production code. Employees use multi-factor authentication to access the GitHub organization.

Only authorized employees are able to deploy code to production.

## Monitoring

n8n monitors code, infrastructure and core application for known vulnerabilities and addresses critical vulnerabilities in a timely manner.

## Email security

n8n delivers emails to users for email verification, error notifications, and more. n8n implements SPF, DKIM and DMARC DNS records to guard against email spoofing and forgery. You can review these records using a DNS lookup tool.

## Corporate security

n8n follows best practices for corporate security.

### Employment checks

n8n performs employment checks on all new hires.

### Workstation security

n8n provides hardware to all new hires. These machines run a local agent that sets configuration of the operating system to hardened standards, including:

- Automatic OS updates
- Hard disk encryption
- Anti-malware software
- Screen lock


### System access

n8n grants employees access to systems on a least-privilege basis. This means that employees only have access to the data they need to perform their job. The company reviews system access quarterly, on any change in role, and upon termination.

### Security training

Employees receive privacy and security training during onboarding as well as on an ongoing basis. n8n requires all employees to read and sign n8n's comprehensive information security policy covering the security, availability, and confidentiality of n8n services.
<!-- vale on -->
