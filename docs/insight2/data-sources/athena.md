---
title: Athena
description: 
tags:
  - Insight²
  - Data Sources
---

# Athena

Insight² can connect to Amazon Athena databases to read and write data.

- [Athena](#athena)
	- [Connection](#connection)
	- [Querying Amazon Athena](#querying-amazon-athena)
		- [Basic queries](#basic-queries)
			- [Creating table](#creating-table)
			- [Inserting to table](#inserting-to-table)
			- [Select operation](#select-operation)

## Connection

Insight² requires the following to connect to your Athena.

- **Database**
- **S3 output location**
- **Access key**
- **Secret key**
- **Region**

:::info
You can also configure for **[additional optional parameters](https://github.com/ghdna/athena-express)**.
:::



![Insight² - Amazon Athena - Connection](/_images/insight2/datasource-reference/athena/athena-connection.png)



## Querying Amazon Athena

- Click on `+` button of the query manager at the bottom panel of the editor and select the database added in the previous step as the datasource. Query manager then can be used to write SQL queries.



![Insight² - Querying- Amazon Athena](/_images/insight2/datasource-reference/athena/athena-query.png)



- Click on the `run` button to run the query.

**NOTE:** Query should be saved before running.

:::tip
Refer amazon athena docs here for more info: [link](https://docs.aws.amazon.com/athena/latest/ug/what-is.html)
:::

### Basic queries

:::tip
**Refer amazon athena docs here for more info:** [link](https://docs.aws.amazon.com/athena/latest/ug/what-is.html)
:::

#### Creating table


```sql
CREATE EXTERNAL TABLE student (
    name STRING,
    age INT
)  LOCATION 's3://athena-express-akiatfa53s-2022/';
```

#### Inserting to table

```sql
INSERT INTO student
VALUES ('Lansing',1)
```

#### Select operation

```sql
SELECT * from student WHERE AGE=1
```
