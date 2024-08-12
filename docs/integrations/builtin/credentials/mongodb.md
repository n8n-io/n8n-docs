---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: MongoDB credentials
description: Documentation for MongoDB credentials. Use these credentials to authenticate MongoDB in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# MongoDB credentials

You can use these credentials to authenticate the following nodes:

- [MongoDB](/integrations/builtin/app-nodes/n8n-nodes-base.mongodb/)

## Prerequisites

- Create a user account with the appropriate permissions on a [MongoDB](https://www.mongodb.com/){:target=_blank .external-link} server.
- As a Project Owner, add all the [n8n IP addresses](/manage-cloud/cloud-ip/) to the IP Access List Entries in the project's **Network Access**. Refer to [Add IP Access List entries](https://www.mongodb.com/docs/atlas/security/ip-access-list/#add-ip-access-list-entries){:target=_blank .external-link} for detailed instructions.

If you are setting up MongoDB from scratch, create a cluster and a database. Refer to the [MongoDB Atlas documentation](https://www.mongodb.com/docs/atlas/){:target=_blank .external-link} for more detailed instructions on these steps.

## Supported authentication methods

- Database connection - Connection string
- Database connection - Values

## Related resources

Refer to the [MongoDBs Atlas documentation](https://www.mongodb.com/docs/atlas/){:target=_blank .external-link} for more information about the service.

## Using database connection - Connection string

To configure this credential, you'll need the [Prerequisites](#prerequisites) listed above. Then:

1. Select **Connection String** as the **Configuration Type**.
2. Enter your MongoDB **Connection String**. To get your connection string in MongoDB, go to **Database > Connect**.
    1. Select **Drivers**.
    2. Copy the code you see in **Add your connection string into your application code**. It will be something like: `mongodb+srv://yourName:yourPassword@clusterName.mongodb.net/?retryWrites=true&w=majority`.
    3. Replace the `<password>` and `<username>` in the connection string with the database user's credentials you'll be using.
    4. Enter that connection string into n8n.
    5. Refer to [Connection String](https://www.mongodb.com/docs/manual/reference/connection-string/){:target=_blank .external-link} for information on finding and formatting your connection string.
3. Enter your **Database** name. This is the name of the database that the user whose details you added to the connection string is logging into.
4. Select whether to **Use TLS**: Turn on to use TLS. You must have your MongoDB database configured to use TLS and have an x.509 certificate generated. Add information for these certificate fields in n8n:
    - **CA Certificate**
    - **Public Client Certificate**
    - **Private Client Key**
    - **Passphrase**

Refer to [MongoDB's x.509 documentation](https://www.mongodb.com/docs/manual/core/security-x.509/#std-label-client-x509-certificates-requirements) for more information on working with x.509 certificates.

## Using database connection - Values

To configure this credential, you'll need the [Prerequisites](#prerequisites) listed above. Then:

1. Select **Values** as the **Configuration Type**.
2. Enter the database **Host** name or address.
3. Enter the **Database** name.
4. Enter the **User** you'd like to log in as.
5. Enter the user's **Password**.
6. Enter the **Port** to connect over. This is the port number your server uses to listen for incoming connections.
7. Select whether to **Use TLS**: Turn on to use TLS. You must have your MongoDB database configured to use TLS and have an x.509 certificate generated. Add information for these certificate fields in n8n:
    - **CA Certificate**
    - **Public Client Certificate**
    - **Private Client Key**
    - **Passphrase**

Refer to [MongoDB's x.509 documentation](https://www.mongodb.com/docs/manual/core/security-x.509/#std-label-client-x509-certificates-requirements) for more information on working with x.509 certificates.
