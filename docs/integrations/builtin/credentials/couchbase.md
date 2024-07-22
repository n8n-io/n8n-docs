---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Couchbase credentials
description: Documentation for Couchbase credentials. Use these credentials to authenticate Couchbase in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Couchbase credentials

You can use these credentials to authenticate the following nodes:

- [Couchbase](/integrations/builtin/app-nodes/n8n-nodes-base.couchbase/)

## Prerequisites

- [Database access credentials](https://docs.couchbase.com/cloud/clusters/manage-database-users.html#create-database-credentials){:target=_blank .external-link} (username and password) with the appropriate permissions on a [Couchbase Capella](https://cloud.couchbase.com/){:target=_blank .external-link} cluster or a [Couchbase Server](https://docs.couchbase.com/server/current/install/install-intro.html) cluster.

If you are setting up Couchbase from scratch, you'll have to create a cluster and a bucket. Refer to the [Couchbase documentation](https://docs.couchbase.com/home/index.html){:target=_blank .external-link} for more detailed instructions on these steps.

## Supported authentication methods

- Database connection - Values

## Related resources

Refer to the [Couchbase documentation](https://docs.couchbase.com/home/index.html){:target=_blank .external-link} for more information about the service.


## Using database connection - Values

To configure this credential, you'll need:

- The **Connection String** for the database
- The **Username**
- A user **Password**
- A **Bucket**, **Scope**, and **Collection**
- Under **Credential to connect with**, select **Create New Credential**
- Input these values and press save

