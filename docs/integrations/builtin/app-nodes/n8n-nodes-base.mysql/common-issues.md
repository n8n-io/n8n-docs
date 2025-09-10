---
title: MySQL node common issues
description: Documentation for common issues and questions in the MySQL node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: [integration, reference]
priority: high
---

# MySQL node common issues

Here are some common errors and issues with the [MySQL node](/integrations/builtin/app-nodes/n8n-nodes-base.mysql/index.md) and steps to resolve or troubleshoot them.

## Update rows by composite key

The MySQL node's **Update** operation lets you to update rows in a table by providing a **Column to Match On** and a value. This works for tables where single column values can uniquely identify individual rows.

You can't use this pattern for tables that use [composite keys](https://en.wikipedia.org/wiki/Composite_key), where you need multiple columns to uniquely identify a row. A example of this is MySQL's [`user` table](https://mariadb.com/kb/en/mysql-user-table/) in the `mysql` database, where you need both the `user` and `host` columns to uniquely identify rows.

To update tables with composite keys, write the query manually with the **Execute SQL** operation instead. There, you can match on multiple values, like in this example which matches on both `customer_id` and `product_id`: 

```sql
UPDATE orders SET quantity = 3 WHERE customer_id = 538 AND product_id = 800;
```

## Can't connect to a local MySQL server when using Docker

When you run either n8n or MySQL in Docker, you need to configure the network so that n8n can connect to MySQL.

The solution depends on how you're hosting the two components.

### If only MySQL is in Docker

If only MySQL is running in Docker, configure MySQL to listen on all interfaces by binding to `0.0.0.0` inside of the container (the official images are already configured this way).

When running the container, [publish the port](https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports/) with the `-p` flag. By default, MySQL runs on port 3306, so your Docker command should look like this:

```shell
docker run -p 3306:3306 --name my-mysql -d mysql:latest
```

When configuring [MySQL credentials](/integrations/builtin/credentials/mysql.md), the `localhost` address should work without a problem (set the **Host** to `localhost`).

### If only n8n is in Docker

If only n8n is running in Docker, configure MySQL to listen on all interfaces by binding to `0.0.0.0` on the host.

If you are running n8n in Docker on **Linux**, use the `--add-host` flag to map `host.docker.internal` to `host-gateway` when you start the container. For example:

```shell
docker run -it --rm --add-host host.docker.internal:host-gateway --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

If you are using Docker Desktop, this is automatically configured for you.

When configuring [MySQL credentials](/integrations/builtin/credentials/mysql.md), use `host.docker.internal` as the **Host** address instead of `localhost`.

### If MySQL and n8n are running in separate Docker containers

If both n8n and MySQL are running in Docker in separate containers, you can use Docker networking to connect them.

Configure MySQL to listen on all interfaces by binding to `0.0.0.0` inside of the container (the official images are already configured this way). Add both the MySQL and n8n containers to the same [user-defined bridge network](https://docs.docker.com/engine/network/drivers/bridge/).

When configuring [MySQL credentials](/integrations/builtin/credentials/mysql.md), use the MySQL container's name as the host address instead of `localhost`. For example, if you call the MySQL container `my-mysql`, you would set the **Host** to `my-mysql`.

### If MySQL and n8n are running in the same Docker container

If MySQL and n8n are running in the same Docker container, the `localhost` address doesn't need any special configuration. You can configure MySQL to listen on `localhost` and configure the **Host** in the [MySQL credentials in n8n](/integrations/builtin/credentials/ollama.md) to use `localhost`.

## Decimal numbers returned as strings

By default, the MySQL node returns [`DECIMAL` values](https://dev.mysql.com/doc/refman/8.4/en/fixed-point-types.html) as strings. This is done intentionally to avoid loss of precision that can occur due to limitation with the way JavaScript represents numbers. You can learn more about the decision in the documentation for the [MySQL library](https://sidorares.github.io/node-mysql2/docs/api-and-configurations) that n8n uses.

To output decimal values as numbers instead of strings and ignore the risks in loss of precision, enable the **Output Decimals as Numbers** option. This will output the values as numbers instead of strings.

As an alternative, you can manually	convert from the string to a decimal using the [`toFloat()` function](/code/builtin/data-transformation-functions/strings.md#string-toFloat) with [`toFixed()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) or with the [Edit Fields (Set) node](/integrations/builtin/core-nodes/n8n-nodes-base.set.md) after the MySQL node. Be aware that you may still need to account for a potential loss of precision.
