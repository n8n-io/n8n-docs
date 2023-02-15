---
title: Third-party accounts
description: Connecting to third-party accounts
---

# Third-party accounts

A key part of n8n's functionality is to link third-party services. When you link an account from a third party application, you may need to either authorize n8n OAuth application access to your account, or provide an API key or other credentials. This section describes how n8n handles these grants and keys.

n8n recommends using [OAuth](https://oauth.net/2/){:target=_blank .external-link} for third-party applications that support it. The OAuth protocol allows n8n to request scoped access to specific resources in your third party account without you having to provide long-term credentials directly. n8n must request short-term access tokens at regular intervals, and most applications provide a way to revoke n8n's access to your account at any time.

Some third-party applications don't provide an OAuth interface. To access these services, you must provide the required authorization mechanism (often an API key). As a best practice, if your application provides such functionality, n8n recommends you limit that API key's access to only the resources you need access to within n8n.

When you use credentials in a workflow, n8n loads them into the execution environment of your n8n instance. For n8n Cloud, customer instances are logically isolated from another.

n8n doesn't log or export credentials by default. If you log their values you can always delete the data for that execution. The platform deletes execution data automatically based on the retention settings for your account.

You can delete your OAuth grants or key-based credentials at any time. Deleting OAuth grants within n8n doesn't revoke n8ns access to your account. You must revoke that access wherever you manage OAuth grants in your third party application.

### n8n Cloud storage and encryption

n8n stores all OAuth tokens, key-based credentials, and the rest of your Cloud instance's database on a disk that's encrypted at rest using Azure server-side encryption (at the time of writing, using AES256 and a FIPS-140-2 compliant implementation). For n8n cloud that database also resides in a private network. Backups of that database are also encrypted.

