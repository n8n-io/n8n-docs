---
title: Postgres node common issues
description: >-
  Documentation for common issues and questions in the Postgres node in n8n, a
  workflow automation platform. Includes details of the issue and suggested
  solutions.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Postgres node common issues
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.postgres/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.postgres/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.postgres/common-issues
layout:
  description:
    visible: false
---

# Postgres node common issues <a href="#postgres-node-common-issues" id="postgres-node-common-issues"></a>

Here are some common errors and issues with the [Postgres node](README.md) and steps to resolve or troubleshoot them.

## Dynamically populate SQL `IN` groups with parameters <a href="#dynamically-populate-sql-in-groups-with-parameters" id="dynamically-populate-sql-in-groups-with-parameters"></a>

In Postgres, you can use the SQL [`IN` comparison construct](https://www.postgresql.org/docs/current/functions-comparisons.html#FUNCTIONS-COMPARISONS-IN-SCALAR) to make comparisons between groups of values:

```sql
SELECT color, shirt_size FROM shirts WHERE shirt_size IN ('small', 'medium', 'large');
```

While you can use n8n [expressions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes) in your query to dynamically populate the values in an `IN` group, combining this with [query parameters](README.md#use-query-parameters) provides extra protection by automatically sanitizing input.

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

## Working with timestamps and time zones <a href="#working-with-timestamps-and-time-zones" id="working-with-timestamps-and-time-zones"></a>

To avoid complications with how n8n and Postgres interpret timestamp and time zone data, follow these general tips:

- **Use UTC when storing and passing dates**: Using UTC helps avoid confusion over timezone conversions when converting dates between different representations and systems.
- **Set the execution timezone**: Set the global timezone in n8n using either [environment variables](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/set-the-timezone) (for self-hosted) or in the [settings](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/use-n8n-cloud/configure-cloud/set-your-timezone) (for n8n Cloud). You can set a workflow-specific timezone in the [workflow settings](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/configure-workflow-settings).
- **Use ISO 8601 format**: The [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601) encodes the day of the month, month, year, hour, minutes, and seconds in a standardized string. n8n passes dates between nodes as strings and uses [Luxon](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/handle-special-data-types/work-with-dates-and-times) to parse dates. If you need to cast to ISO 8601 explicitly, you can use the [Date & Time node](../../core-nodes/n8n-nodes-base.datetime.md) and a custom format set to the string `yyyy-MM-dd'T'HH:mm:ss`.

## How the node returns date and timestamp columns <a href="#outputting-date-columns-as-date-strings-instead-of-iso-datetime-strings" id="outputting-date-columns-as-date-strings-instead-of-iso-datetime-strings"></a>

n8n uses the [`pg` package](https://www.npmjs.com/package/pg) to integrate with Postgres, which affects how n8n processes date, timestamp, and related types. What you get back depends on the node version:

| Column type | Node version 2.9 and later | Node version 2.7–2.8 | Node version 2.1–2.6 |
| --- | --- | --- | --- |
| `DATE` | `2025-12-25` | `2025-12-25` | a datetime string, shifted by the host time zone |
| `timestamp without time zone` | `2025-12-25T14:30:00.123456` | a UTC instant, shifted by the host time zone | a UTC instant, shifted by the host time zone |
| `timestamp with time zone` | `2025-12-25T14:30:00.123Z` | `2025-12-25T14:30:00.123Z` | `2025-12-25T14:30:00.123Z` |

Below node version 2.1 the node sets no type parsers at all, so all three types come back as JavaScript `Date` objects instead of strings. The JSON output looks the same, but an expression sees an object.

A `timestamp with time zone` keeps milliseconds only on every version, including 2.9.

To get the current node version, open the node and select the **Settings** tab. The version appears at the bottom of the panel, for example `Postgres node version 2.9 (Latest)`.

### A timestamp without time zone before node 2.9

A `timestamp without time zone` column stores no offset. Before node version 2.9, n8n read it as an instant anyway, which has three effects:

- The output ends in `Z`, which says the value is UTC. The column makes no such claim.
- The conversion uses the time zone of the n8n process, taken from the `TZ` environment variable, or the system time zone when `TZ` isn't set. Two instances with different host time zones produce different strings for the same stored value. The n8n timezone setting and the workflow timezone don't change this.
- The output keeps milliseconds only, so a column storing microseconds loses the last three digits.

From node version 2.9 the node returns the value the server sent, with a `T` between the date and the time and no suffix. The result is the same on every instance and keeps full precision. Add a new Postgres node to get version 2.9. An existing node keeps its current behavior.

The new output has no `Z`, so expressions and **Code** nodes that compare it with UTC strings or parse it as UTC read a different time. Check the nodes that use this column before you replace an existing node.

This applies when the server uses the default `DateStyle` of ISO. On any other `DateStyle`, node 2.9 returns the value as the server sent it, with no `T` inserted.

If you can't move to 2.9, cast the column at query time:

```sql
SELECT ts_col::text AS ts_col_as_text FROM table_with_ts_col
```

This gives the same value node 2.9 returns, with a space instead of the `T`. The [`TO_CHAR` function](https://www.postgresql.org/docs/current/functions-formatting.html#FUNCTIONS-FORMATTING) can insert the `T` for you, but its `US` pattern always writes six digits, so `14:30:00` becomes `14:30:00.000000`:

```sql
SELECT TO_CHAR(ts_col, 'YYYY-MM-DD"T"HH24:MI:SS.US') AS ts_col_as_text FROM table_with_ts_col
```

{% hint style="info" %}
**The CrateDB, QuestDB, and TimescaleDB nodes**

These three nodes share the Postgres date handling but keep the older timestamp reading. From node version 1.1 they return a `DATE` as `YYYY-MM-DD` and a `timestamp without time zone` as a UTC instant, as Postgres node versions 2.7 and 2.8 do. To get the stored value, cast the column at query time with `SELECT ts_col::text AS ts_col_as_text FROM table_with_ts_col`.
{% endhint %}

### A DATE column before node 2.7

Before node version 2.7, the `pg` package returns a `DATE` as a JavaScript `Date` at midnight in the time zone of the n8n process, which shows in the output as an [ISO 8601 datetime string](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations). The instant that midnight lands on depends on the host time zone. On an instance at UTC+1, a date of `2025-12-25` produces `2025-12-24T23:00:00.000Z`, a day earlier than the stored date. On an instance at UTC-5 it produces `2025-12-25T05:00:00.000Z`. From node version 2.7, the node returns `DATE` as its `YYYY-MM-DD` value and you don't need a workaround.

On older node versions, use the [Postgres `TO_CHAR` function](https://www.postgresql.org/docs/current/functions-formatting.html#FUNCTIONS-FORMATTING) to format the date into the expected format at query time:

```sql
SELECT TO_CHAR(date_col, 'YYYY-MM-DD') AS date_col_as_date FROM table_with_date_col
```

This produces the date as a string without the time or timezone components. To continue the earlier example, with this casting a date of `2025-12-25` produces the string `2025-12-25`. You can find out more in the [`pg` package documentation on dates](https://node-postgres.com/features/types#date--timestamp--timestamptz).
