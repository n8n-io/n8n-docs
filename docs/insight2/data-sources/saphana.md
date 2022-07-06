---
id: saphana
title: SAP HANA
---

# SAP HANA

Insight can connect to SAP HANA databases to read and write data.

- [SAP HANA](#sap-hana)
	- [Connection](#connection)
	- [Querying SAP HANA](#querying-sap-hana)

## Connection

To add a new SAP HANA database, click on the `+` button on data sources panel at the left-bottom corner of the app editor. Select SAP HANA from the modal that pops up.

Insight requires the following to connect to your SAP HANA database:

- **Host**
- **Port**
- **Username**
- **Password**

:::info
Please make sure the host/ip of the database is accessible from your VPC if you have self-hosted Insight. If you are using Insight cloud, please whitelist our IP.
:::



![Insight - Data source - SAP HANA](/_images/insight2/datasource-reference/saphana/connect.png)



Click on **Test connection** button to verify if the credentials are correct and that the database is accessible to Insight server. Click on **Save** button to save the data source.

## Querying SAP HANA

Click on `+` button of the query manager at the bottom panel of the editor and select the database added in the previous step as the data source. Enter the query in the editor. Click on the `run` button to run the query.

**NOTE**: Query should be saved before running.



![Insight - Data source - SAP HANA](/_images/insight2/datasource-reference/saphana/query.png)



:::tip
Query results can be transformed using transformations. Read our transformations documentation to see how: **[link](/docs/tutorial/transformations)**
:::
