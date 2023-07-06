---
title: MongoDB credentials
description: Documentation for MongoDB credentials. Use these credentials to authenticate MongoDB in n8n, a workflow automation platform.
---

# MongoDB credentials

You can use these credentials to authenticate the following nodes with MongoDB.

- [MongoDB](/integrations/builtin/app-nodes/n8n-nodes-base.mongodb/)

## Prerequisites

Create an user account with the appropriate permissions on a MongoDB server.

## Using Connection String or Values

Choose how to connect to MongoDB by selecting the type of connection in ***Configuration Type***.
If you're using the Connection String you can find formatting details [here](https://www.mongodb.com/docs/manual/reference/connection-string/).


## Connecting to MongoDB Atlas

We provide some specific information on how to connect to MongoDB Atlas.

MongoDB Atlas settings:

1. Inside your MongoDB organization, set up your database cluster.
![Setting up the cluster in MongoDB Atlas](/_images/integrations/builtin/app-nodes/mongodb/cluster.png)
2. Inside the cluster, be sure to have a database to connect to. If you don't have a database yet, you can go to ***Collections*** and click on ***Add My Own Data***. A dialog will show up: enter the name of the database and the first collection.
![The dialog to create a new database in MongoDB Atlas](/_images/integrations/builtin/app-nodes/mongodb/database_create.png)
3. Once ready you'll see the database in ***Organization > Project > Databases > Collections***.
![A database and collection in MongoDB Atlas](/_images/integrations/builtin/app-nodes/mongodb/collections.png)
4. In the ***Network Access*** section of your project you need to whitelist the n8n IPs. Click on the ***Add IP Address*** button and add all the IPs you find [here](https://docs.n8n.io/choose-n8n/cloud/#cloud-ip-addresses).
![The list of IPs allowed to connect to the cluster in MongoDB Atlas](/_images/integrations/builtin/app-nodes/mongodb/network_access.png)

n8n settings:

1. In MongoDB Atlas, go to the cluster page and click on ***Connect***. A dialog will show up, click on ***Drivers***.
2. In the MongoDB dialog, copy the code you see in ***Add your connection string into your application code***. It will be something like: `mongodb+srv://yourName:yourPassword@clusterName.5j5fpzo.mongodb.net/?retryWrites=true&w=majority`. You can find details on how to format the connection string [here](https://www.mongodb.com/docs/manual/reference/connection-string/).
![The connect dialog where to copy the connection string](/_images/integrations/builtin/app-nodes/mongodb/connect.png)
3. In the MongoDB credential dialog set ***Configuration Type*** as ***Connection string***.
4. Paste the code you copied from the Mondo DB dialog in the ***Connection String*** parameter in the n8n dialog.
5. Replace `<password>` with your user's password.
6. Input the name of the database you created in the ***Database*** field.
7. Click ***Save***, a green box will confirm the connection was successful.
