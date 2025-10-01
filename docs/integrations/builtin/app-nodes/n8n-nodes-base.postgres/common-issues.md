---
title: Postgres node common issues
description: Documentation for common issues and questions in the Postgres node in n8n, a workflow automation platform. Includes details of the issue and suggested solutions.
contentType: [integration, reference]
priority: high
---

# Postgres node common issues

Here are some common errors and issues with the [Postgres node](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/index.md) and steps to resolve or troubleshoot them.

## Dynamically populate SQL `IN` groups with parameters

In Postgres, you can use the SQL [`IN` comparison construct](https://www.postgresql.org/docs/current/functions-comparisons.html#FUNCTIONS-COMPARISONS-IN-SCALAR) to make comparisons between groups of values:

```sql
SELECT color, shirt_size FROM shirts WHERE shirt_size IN ('small', 'medium', 'large');
```

While you can use n8n [expressions](/code/expressions.md) in your query to dynamically populate the values in an `IN` group, combining this with [query parameters](/integrations/builtin/app-nodes/n8n-nodes-base.postgres/index.md#use-query-parameters) provides extra protection by automatically sanitizing input.

To construct an `IN` group query with query parameters:

1. Set the **Operation** to **Execute Query**.
2. In **Options**, select **Query Parameters**.
3. Use an expression to select an array from the input data. For example, `{{ $json.input_shirt_sizes }}`.
4. In the **Query** parameter, write your query with the `IN` construct with an empty set of parentheses. For example:
	```sql
	SELECT color, shirt_size FROM shirts WHERE shirt_size IN ();
	```
5. Inside of the `IN` parentheses, use an expression to dynamically create index-based placeholders (like `$1`, `$2`, and `$3`) for the number of items in your query parameter array. You can do this by increasing each array index by one since the placeholder variables are 1 indexed:
	```sql
	SELECT color, shirt_size FROM shirts WHERE shirt_size IN ({{ $json.input_shirt_sizes.map((i, pos) => "$" + (pos+1)).join(', ') }});
	```

With this technique, n8n automatically creates the correct number of [prepared statement placeholders](https://www.postgresql.org/docs/current/sql-prepare.html) for the `IN` values according to the number of items in your array.

## Working with timestamps and time zones

To avoid complications with how n8n and Postgres interpret timestamp and time zone data, follow these general tips:

- **Use UTC when storing and passing dates**: Using UTC helps avoid confusion over timezone conversions when converting dates between different representations and systems.
- **Set the execution timezone**: Set the global timezone in n8n using either [environment variables](/hosting/configuration/configuration-examples/time-zone.md) (for self-hosted) or in the [settings](/manage-cloud/set-cloud-timezone.md) (for n8n Cloud). You can set a workflow-specific timezone in the [workflow settings](/workflows/settings.md).
- **Use ISO 8601 format**: The [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601) encodes the day of the month, month, year, hour, minutes, and seconds in a standardized string. n8n passes dates between nodes as strings and uses [Luxon](/code/cookbook/luxon.md) to parse dates. If you need to cast to ISO 8601 explicitly, you can use the [Date & Time node](/integrations/builtin/core-nodes/n8n-nodes-base.datetime.md) and a custom format set to the string `yyyy-MM-dd'T'HH:mm:ss`.

## Outputting Date columns as date strings instead of ISO datetime strings 

n8n's uses the [`pg` package](https://www.npmjs.com/package/pg) to integrate with Postgres, which affects how n8n processes date, timestamp, and related types from Postgres.

The `pg` package parses `DATE` values into `new Date(row_value)` by default, which produces a date that follows the [ISO 8601 datetime string](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) format. For example, a date of `2025-12-25` might produce a datetime sting of `2025-12-25T23:00:00.000Z` depending on the instance's timezone settings.

To work around this, use the [Postgres `TO_CHAR` function](https://www.postgresql.org/docs/current/functions-formatting.html#FUNCTIONS-FORMATTING) to format the date into the expected format at query time:

```sql
SELECT TO_CHAR(date_col, 'YYYY-MM-DD') AS date_col_as_date FROM table_with_date_col
```

This will produce the date as a string without the time or timezone components. To continue the earlier example, with this casting, a date of `2025-12-25` would produce the string `2025-12-25`. You can find out more in the [`pg` package documentation on dates](https://node-postgres.com/features/types#date--timestamp--timestamptz).
