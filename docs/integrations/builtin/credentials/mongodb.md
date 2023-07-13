---
title: MongoDB credentials
description: Documentation for MongoDB credentials. Use these credentials to authenticate MongoDB in n8n, a workflow automation platform.
---

# MongoDB credentials

You can use these credentials to authenticate the following nodes with MongoDB:

- [MongoDB](/integrations/builtin/app-nodes/n8n-nodes-base.mongodb/)

## Prerequisites

Create a user account with the appropriate permissions on a MongoDB server.

## Using connection string or values

Choose how to connect to MongoDB by selecting the type of connection in **Configuration Type**.
For formatting details for **Connection String**, refer to [Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/){:target=_blank .external-link}.


## Connecting to MongoDB Atlas

You need to configure your MongoDB database, then configure your n8n credential.

### MongoDB Atlas settings

1. Inside your MongoDB organization, set up your database cluster. Your cluster will be visible in **Organization > Project**, in the **Database** section.
![Setting up the cluster in MongoDB Atlas](/_images/integrations/builtin/app-nodes/mongodb/cluster.png)
2. Inside the cluster, you need to have a database to connect to. If you don't have a database yet, you can go to **Collections** and select **Add My Own Data**. A dialog will show up: enter the name of the database in the **Database name** field and the name of the collection in the **Collection name** field.
![The dialog to create a new database in MongoDB Atlas](/_images/integrations/builtin/app-nodes/mongodb/database_create.png)
3. Once ready, you'll see the database in **Organization > Project > Databases > Collections**.
![A database and collection in MongoDB Atlas](/_images/integrations/builtin/app-nodes/mongodb/collections.png)
4. In the **Network Access** section of your project you need to allow list the n8n IPs. Select **Add IP Address** button and add all the IPs listed [here](/choose-n8n/cloud/#cloud-ip-addresses). The allow list IPs will be visible in the **IP Access List** table.
![The list of IPs allowed to connect to the cluster in MongoDB Atlas](/_images/integrations/builtin/app-nodes/mongodb/network_access.png)

### n8n settings

1. In MongoDB Atlas, go to the cluster page and select **Connect**. A dialog will open. Select **Drivers**.
1. In the MongoDB dialog, copy the code you see in **Add your connection string into your application code**. It will be something like: `mongodb+srv://yourName:yourPassword@clusterName.5j5fpzo.mongodb.net/?retryWrites=true&w=majority`. You can find details on how to format the connection string [here](https://www.mongodb.com/docs/manual/reference/connection-string/){:target=_blank .external-link}.
![The connect dialog where to copy the connection string](/_images/integrations/builtin/app-nodes/mongodb/connect.png)
1. In the MongoDB credential dialog set **Configuration Type** as **Connection string**.
1. Paste the code you copied from the MongoDB dialog in the **Connection String** parameter in the n8n dialog.
1. Replace `<password>` with your user's password.
1. Input the name of the database you created in the **Database** field.
1. Click **Save**. A green box will confirm the connection was successful.
