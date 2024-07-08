---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: CrateDB credentials
description: Documentation for CrateDB credentials. Use these credentials to authenticate CrateDB in n8n, a workflow automation platform.
contentType: integration
---

# CrateDB credentials

You can use these credentials to authenticate the following nodes:

- [CrateDB](/integrations/builtin/app-nodes/n8n-nodes-base.cratedb/)

## Prerequisites

An available instance of CrateDB. 

## Supported authentication methods

- account connection

## Related resources

Refer to [CrateDB's documentation](https://cratedb.com/docs/crate/reference/en/latest/){:target=_blank .external-link} for more information about the service.

## Using account connection

To configure this credential, you'll need:

- Your **Host** name
- Your **Database** name
- A **User** name
- A user **Password**
- To set the **SSL** parameter. Refer to the [CrateDB Secured Communications (SSL/TLS) documentation](https://cratedb.com/docs/crate/reference/en/5.7/admin/ssl.html#admin-ssl){:target=_blank .external-link} for more information. The options n8n supports are:
    - Allow 
    - Disable
    - Require
- A **Port** number

Refer to the [Connect to a CrateDB cluster documentation](https://cratedb.com/docs/crate/clients-tools/en/latest/connect/){:target=_blank .external-link} for detailed instructions on these fields and their default values.

