---
title: Databricks node documentation
description: >-
  Learn how to use the Databricks node in n8n. Follow technical documentation to
  integrate Databricks node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Databricks node documentation
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.databricks.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.databricks'
url: 'https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.databricks'
layout:
  description:
    visible: false
---

# Databricks node <a href="#databricks-node" id="databricks-node"></a>

Use the Databricks node to automate work in Databricks, and integrate Databricks with other applications. n8n has built-in support for a wide range of Databricks features, including running jobs, executing SQL queries, managing Unity Catalog objects, querying ML model serving endpoints, and working with vector search indexes.

On this page, you'll find a list of operations the Databricks node supports and links to more resources.

{% hint style="info" %}
**Credentials**

Refer to [Databricks credentials](../credentials/databricks.md) for guidance on setting up authentication.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/6vuTxJwns2nA8U7V56ij/" %}

## Operations <a href="#operations" id="operations"></a>

* Databricks SQL
	* Execute Query
* File
	* Create Directory
	* Delete Directory
	* Delete File
	* Download File
	* Get File Metadata
	* List Directory
	* Upload File
* Genie
	* Create Conversation Message
	* Execute Message SQL Query
	* Get Conversation Message
	* Get Genie Space
	* Get Query Results
	* Start Conversation
* Job
	* Get
	* Get Run
	* Get Run Output
	* Run
* Lakebase
	* Delete
	* Execute Function
	* Get Many
	* Insert
	* Insert or Update
	* Update
* Model Serving
	* Query Endpoint
* Unity Catalog
	* Create Catalog
	* Create Function
	* Create Volume
	* Delete Catalog
	* Delete Function
	* Delete Volume
	* Get Catalog
	* Get Function
	* Get Table
	* Get Volume
	* List Catalogs
	* List Functions
	* List Tables
	* List Volumes
	* Update Catalog
* Vector Search
	* Create Index
	* Get Index
	* List Indexes
	* Query Index

## Job operations

Use the **Job** resource to start a run of an existing job, read the status and output of a run, and read a job's definition. Every operation calls the Databricks Jobs API 2.2.

### Jobs, runs, and tasks

Databricks separates a job from its runs, and a run from its tasks:

* A **job** is the definition: its name, tasks, clusters, and schedule. It has a job ID. **Get** and **Run** take a job.
* A **run** is one execution of a job. It has its own run ID and a run page in Databricks. **Get Run** and **Get Run Output** take a run. **Run** returns the run ID of the run it started.
* A **task** is one step inside a run. Each task has a task key and its own task run ID. **Get Run Output** reads every task of a run and returns one item per task.

### Select a job or run

The **Job** field (on **Get** and **Run**) and the **Run** field (on **Get Run** and **Get Run Output**) offer three modes:

* **From list**: select a job from the workspace, or a run from the recent runs of all jobs. Type to filter. The run list shows the run name (or `Job <job-id>`), the result or the current state of a run that hasn't finished, the start time in UTC, and the run ID.
* **By ID**: enter the numeric ID. The node rejects anything that isn't a whole number.
* **By URL**: paste the page URL from Databricks. The node accepts `https://<your-workspace>/jobs/<job-id>` for a job and `https://<your-workspace>/jobs/<job-id>/runs/<run-id>` for a run. It also accepts the hash form of both pages, `https://<your-workspace>/?o=<workspace-id>#job/<job-id>` and `https://<your-workspace>/?o=<workspace-id>#job/<job-id>/run/<run-id>`, with or without `?o=<workspace-id>`.

### Get

**Get** reads the definition of the job in the **Job** field. It returns one item with the job as Databricks returns it, including `job_id`, `creator_user_name`, `run_as_user_name`, `created_time`, `settings`, and, when the job has a trigger, `trigger_state`. The node reads at most 2,000 tasks, job clusters, environments, or parameters of one job. Above that it fails with `Job <job-id> has more settings entries than the node can read`.

### Get Run

**Get Run** reads the run in the **Run** field and returns the run object from Databricks with five extra fields:

| Field | Value |
|-------|-------|
| `run_state` | The life cycle state, for example `RUNNING` or `TERMINATED`. |
| `run_finished` | `true` when the run has reached a final state. |
| `run_result` | The termination code, for example `SUCCESS`, `SUCCESS_WITH_FAILURES`, `USER_CANCELED`, or `RUN_EXECUTION_ERROR`. `null` until the run finishes. Refer to `termination_details.code` in the [Databricks API reference](https://docs.databricks.com/api/workspace/jobs/getrun) for the full list. |
| `run_succeeded` | `true` when `run_result` is `SUCCESS`, `false` for any other result. `null` until the run finishes. |
| `run_error_message` | The termination message of a run that didn't succeed, cut at 500 characters. `null` otherwise. |

Use these fields in an [If](../core-nodes/n8n-nodes-base.if.md) node to branch on the outcome without reading the nested `status` object.

### Get Run Output

**Get Run Output** reads what the tasks of a run produced. Set **Run** to the job run to get every task. A task run ID returns one item for that task only. The node reads the run's tasks, fetches the output of each task, and returns one item per task:

| Field | Value |
|-------|-------|
| `run_id` | The run you asked for. |
| `job_id` | The job the run belongs to. |
| `task_key` | The key of the task in the job definition. |
| `task_run_id` | The run ID of this task. |
| `truncated` | `true` when Databricks cut the notebook output or the logs. |
| `notebook_output`, `sql_output`, `dbt_output`, `run_job_output`, `clean_rooms_notebook_output`, `logs`, `logs_truncated`, `error`, `error_trace`, `info`, `metadata` | The task output as Databricks returns it. Which fields appear depends on the task type. `notebook_output.result` holds the value a notebook returns with `dbutils.notebook.exit()`. `error` explains why a task failed or why its output isn't available. |

A run with no tasks returns one item for the run itself. When Databricks retried a task, the node returns one item for each attempt, with the same `task_key` and a different `task_run_id`. You can also read a run that hasn't finished, but tasks that are still running have no output yet. The node reads at most 2,000 tasks of one run. Above that it fails with `Run <run-id> has more tasks than the node can read`.

### Run

**Run** starts a run of the job, the same as **Run now** in Databricks.

| Field | Description |
|-------|-------------|
| **Job** | The job to run. |
| **Job Parameters** | Job-level parameters for this run. Select **Add Parameter** and enter a **Name** and a **Value** for each one. They override the default values defined on the job. The node sends every value as a string. Databricks accepts a parameter the job doesn't define and records it on the run. |
| **Wait for Completion** | Whether to wait until the run finishes and return the final run. Off by default. |
| **Timeout** (in **Options**) | Maximum time in seconds to wait for the run to finish. Default `600`, minimum `1`. Shown only when **Wait for Completion** is on. |

With **Wait for Completion** off, the node returns the new run ID right away and the job keeps running in Databricks:

```json
{
	"run_id": 41847992357943,
	"number_in_job": 41847992357943
}
```

Pass `run_id` to **Get Run** or **Get Run Output** later to read the result.

#### Wait for the run to finish

With **Wait for Completion** on, the node checks the run every 5 seconds until it reaches a final state (`TERMINATED`, `SKIPPED`, or `INTERNAL_ERROR`) or until the **Timeout** passes. Canceling the execution stops the wait. Then:

* If the run succeeds, the node returns the full run object from Databricks.
* If the run ends with any other result, including `SUCCESS_WITH_FAILURES` and `USER_CANCELED`, the node fails with `Job run <run-id> failed (<code>): <message>` (or the code again when Databricks gives no message) and the run page URL.
* If the run is still going when the timeout passes, the node fails with `Job run <run-id> did not finish within <n> seconds`. The error names the last state and the run page URL. The node doesn't cancel the run in Databricks. Raise **Timeout**, or turn off **Wait for Completion** and read the run later with **Get Run**.

Some jobs run longer than a workflow execution should wait. For those, start the run with **Wait for Completion** off. Let a **Databricks Trigger** node start a second workflow when the run ends.

### Required job permissions

The identity the credential authenticates as needs the **Workspace access** entitlement and a permission on the job:

| Operations | Permission on the job |
|------------|-----------------------|
| **Get**, **Get Run**, **Get Run Output** | **CAN VIEW** |
| **Run** | **CAN MANAGE RUN** |

**CAN MANAGE** and **IS OWNER** include both permissions. Databricks returns only the jobs and runs the identity has **CAN VIEW** on, so the **Job** and **Run** lists offer only those. A run started with **Run** executes as the job's run-as identity, not as the credential. **Get** returns this identity as `run_as_user_name`. By default, this is the job owner. Refer to [Required Databricks privileges](../credentials/databricks.md#required-databricks-privileges) for the other resources of the node.

When the permission is missing, Databricks rejects the request with `PERMISSION_DENIED`. n8n shows the Databricks message as the error. The message names the missing permission. n8n adds one of these hints as the error description:

```text
Grant at least Can View on the job to the signed-in user or service principal in Databricks, then retry.
```

```text
Grant at least Can Manage Run on the job to the signed-in user or service principal in Databricks, then retry.
```

### Example: Notify when a job run fails

This workflow posts one Slack message for each task of a failed run.

1. Add a **Databricks Trigger** node. Set **Resource** to **Job**. Select the job in **Job**. Set **Events** to **Run Failed** only. Keep **Simplify** on. The trigger fires once for each run that ends with any result other than a full success, including canceled and skipped runs. Its output holds the run ID in `run.id`, the run page URL in `run.url`, and the termination code and message in `result.code` and `result.message`.
2. Add a **Databricks** node. Set **Resource** to **Job** and **Operation** to **Get Run Output**. Set **Run** to **By ID** and enter the expression `{{ $json.run.id }}`. The node returns one item for each task of the failed run.
3. Add a [Slack](n8n-nodes-base.slack/README.md) node. Set **Resource** to **Message** and **Operation** to **Send**. Select the channel. Use a message text like this:

	```text
	Databricks run {{ $('Databricks Trigger').item.json.run.name }} failed ({{ $('Databricks Trigger').item.json.result.code }}).
	Task {{ $json.task_key }}: {{ $json.error ?? 'no error text' }}
	{{ $('Databricks Trigger').item.json.run.url }}
	```

Both Databricks nodes can share one credential. It needs **CAN VIEW** on the job. Use a credential that belongs to a service principal, so the trigger keeps firing when a person leaves or revokes consent.

To send one message for the whole run instead of one for each task, add an [Aggregate](../core-nodes/n8n-nodes-base.aggregate.md) node before the Slack node, or turn on **Execute Once** in the Slack node's settings.

## Lakebase operations

Use the **Lakebase** resource to read and write rows in a Lakebase database, the managed Postgres service inside Databricks. Every operation calls the [Lakebase Data API](https://docs.databricks.com/aws/en/oltp/projects/data-api) over HTTPS, so the node needs no connection string and no database driver.

{% hint style="info" %}
**One-time setup in Databricks**

The Data API is off by default, and the identity the credential authenticates as needs a Postgres role on the project. Follow [Set up Lakebase for the Data API](../credentials/databricks.md#set-up-lakebase-for-the-data-api) before you use these operations. The Data API rejects personal access tokens, so the Lakebase resource needs an OAuth2 credential.
{% endhint %}

### Select a table

Every operation starts with the same five fields. Each offers a **From list** mode and a **By ID** mode.

| Field | Value |
|-------|-------|
| **Project** | The Lakebase project. |
| **Branch** | The branch of the project, for example `production`. Lakebase branches a database the way Git branches code. |
| **Database** | The Postgres database on the branch, for example `databricks_postgres`. |
| **Schema** | The schema that holds the table. `public` by default. The lists offer only the schemas the Data API exposes. |
| **Table** | The table to work on. **Execute Function** takes a **Function** instead. |

The table, column, and function lists read the project's OpenAPI document. They stay empty until you turn that setting on.

### Get Many

**Get Many** reads rows from the table and returns one item for each row.

| Field | Description |
|-------|-------------|
| **Return All** | Whether to return every matching row. Off by default. |
| **Limit** | Maximum number of rows to return. Default `50`. Shown only when **Return All** is off. |
| **Select Rows** | The conditions a row has to meet. Select **Add Condition** and set a **Column Name or ID**, a **Condition**, and a **Value**. With no conditions, the node returns every row. |
| **Combine Conditions** | **AND** requires every condition, **OR** requires any one of them. Default **AND**. |
| **Sort** | The columns to order by. Select **Add Sort Rule** and set a **Column Name or ID** and a **Direction**. |
| **Output Columns** (in **Options**) | The columns to return. Returns every column when empty. |

The **Condition** list offers **Equals**, **Not Equals**, **Greater Than**, **Greater Than or Equal**, **Less Than**, **Less Than or Equal**, **Like**, **Like (Case-Insensitive)**, **Is Null**, and **Is Not Null**. The two **Like** conditions take `*` in place of `%`, and `_` for a single character. **Is Null** and **Is Not Null** take no value.

The node reads 1,000 rows for each request and makes at most 100 requests, so **Return All** returns up to 100,000 rows. A project's **Maximum rows** setting can cap a single response below 1,000.

Paging needs a stable order. With **Return All** on, or a **Limit** above 1,000, and no **Sort** rule set, the node orders by the table's primary key, so no row arrives twice or gets skipped. A table with no primary key still pages, but in whatever order Postgres returns.

#### Example: Read today's failed orders

Set **Table** to `orders`. Under **Select Rows**, add `status` **Equals** `failed`, then add `created_at` **Greater Than or Equal** `{{ $now.startOf('day') }}`. Leave **Combine Conditions** as **AND**. Under **Sort**, add `created_at` **DESC**. Set **Limit** to `100`.

### Insert

**Insert** writes one row for each input item.

Set **Mapping Column Mode** to choose where the values come from:

* **Map Each Column Manually**: set each column in the node. A column you leave empty isn't sent, so Postgres applies its default.
* **Map Automatically**: take the values from the input item, matching field names to column names. The node drops any field the table doesn't have, so an item carrying extra data from an earlier node still writes.

The node returns the row as the database stored it, including values Postgres filled in, such as a serial ID or a `now()` default:

```json
{
	"id": 42,
	"sku": "SKU-1",
	"name": "Widget",
	"price": 9.5,
	"created_at": "2026-10-08T09:14:22.418Z"
}
```

The mapper marks a column required when it's `NOT NULL` and has no default.

### Update

**Update** changes the rows that match a column you choose.

Set **Column to match on** to the column that identifies the row, usually the primary key. The node matches rows where that column equals the value you give, and writes the other mapped columns to them. A column you leave empty in **Map Each Column Manually** isn't sent, so it keeps its current value.

The node returns one item for each updated row. A match that finds nothing returns no items, and isn't an error. The operation fails before sending anything when a matching column has no value, because that would update rows you didn't mean to.

#### Example: Mark an order as shipped

Set **Table** to `orders` and **Mapping Column Mode** to **Map Each Column Manually**. Set **Column to match on** to `id`. Set `id` to `{{ $json.order_id }}` and `status` to `shipped`. Leave every other column empty, so only `status` changes.

### Insert or Update

**Insert or Update** writes the row, and updates the existing row instead when one already matches.

Set **Columns to match on** to the columns that decide whether the row is already there. Those columns have to carry a primary key or a unique constraint together, so a composite key needs every one of its columns selected. Without such a constraint the operation fails, and the node tells you to add one in Databricks.

Unlike **Update**, the matching columns stay in the written row, because Postgres reads them from the row you send.

A matching column with no value fails the operation. Postgres counts two nulls as different, so a null would never match an existing row and the operation would insert a duplicate on every run.

The node returns one item for each row it wrote, new or updated.

### Delete

**Delete** removes the rows that match the conditions. It takes the same **Select Rows** and **Combine Conditions** fields as **Get Many**.

Delete needs at least one condition. The Data API applies no filter of its own, so an unfiltered request would empty the table with nothing to undo it. The node refuses to send one.

The node returns one item for each deleted row, so a later node can record what the operation removed.

{% hint style="warning" %}
**Deleted rows don't come back**

A delete through the Data API isn't wrapped in a transaction the workflow can roll back. Run the same conditions through **Get Many** first to see what the delete will match.
{% endhint %}

### Execute Function

**Execute Function** calls a Postgres function in the schema and returns what it gives back. The role needs `EXECUTE` on the function.

Set **Specify Arguments** to choose how to pass the arguments:

* **Using Fields Below**: the node reads the function's signature and shows one field for each argument, with the required ones marked. Leave an optional argument blank to use the function's default. A boolean argument always sends its switch value, so it can't fall back to a default.
* **Using JSON**: write a JSON object in **Arguments (JSON)** with one key for each argument, for example `{ "a": 1, "b": 2 }`.

What the node returns depends on what the function returns:

| The function returns | The node returns |
|----------------------|------------------|
| A single value | One item, with the value in `result` |
| `TABLE (...)` or `SETOF <table>` | One item for each row, the same shape as **Get Many** |
| `void` | One item, `{"success": true}` |

#### Example: Call a function that returns a number

For this function:

```sql
CREATE FUNCTION add_numbers(a integer, b integer)
RETURNS integer
LANGUAGE sql
AS $$ SELECT a + b $$;
```

Select `add_numbers` in **Function**, keep **Specify Arguments** as **Using Fields Below**, and set `a` to `2` and `b` to `3`. The node returns:

```json
{
	"result": 5
}
```

### Row-level security

Lakebase is real Postgres, so row-level security applies to the Data API. Postgres evaluates policies against the role of the connected Databricks identity, not against n8n.

Two credentials pointed at the same table can return different rows, and both are correct. When you compare a workflow's output with what you see in the Databricks SQL editor, check which identity each one uses.

Two things to know when a table returns nothing:

* A table with row security turned on hides every row until a policy grants them. An empty result can mean no policy, not no data.
* A role with `bypassrls` sees every row. The project owner holds `DATABRICKS_SUPERUSER`, so testing as the owner hides a missing policy.

### Common Lakebase issues

| What you see | What to do |
|--------------|------------|
| `Provided authentication token is not a valid JWT encoding` | The credential uses a personal access token. The Data API takes OAuth2 only. Switch the credential to OAuth2. |
| `invalid token permissions` (`PGRST301`) | The identity has no Postgres role on this branch. Create one with `databricks_create_role`. If the credential itself expired, reconnect it. |
| `permission denied to set role` (`42501`) | The role isn't granted to the Data API. Run `GRANT "<role>" TO authenticator` as the role's creator. A project owner can't use the Data API at all, so connect a non-owner identity. |
| Empty column lists, or `Turn on Data API > API > Advanced settings > OpenAPI specification` | The project doesn't serve its schema document. Turn on the **OpenAPI specification** setting. |
| `Could not find the table` (`PGRST205`) | Check the schema and table names, and that the Data API exposes the schema. Right after you create or alter a table, the same request can fail once and succeed on a retry while the API reloads its schema. |
| `Could not find the column` (`PGRST204`) | A mapped column isn't in the table. Reopen the node to refresh the column list. |
| The schema isn't exposed (`PGRST106`) | Add the schema to the exposed schemas in the project's Data API settings. |
| `there is no unique or exclusion constraint matching the ON CONFLICT specification` (`42P10`) | The columns in **Columns to match on** don't carry a unique constraint or primary key together. Select every column of the key, or add a constraint in Databricks. |
| A duplicate key, a null in a `NOT NULL` column, a type mismatch, or a foreign key still in use | The write breaks a rule the table enforces. The node shows the Postgres message and names the column. Fix the value, or the table. |

Refer to [Set up Lakebase for the Data API](../credentials/databricks.md#set-up-lakebase-for-the-data-api) for the role and grant steps these messages point at.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Databricks node documentation integration templates](https://n8n.io/integrations/databricks) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Databricks' REST API documentation](https://docs.databricks.com/api/) for details about their API.

To use Databricks with AI agents, refer to the [Databricks Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdatabricks.md) node and the [Databricks Genie MCP server](../cluster-nodes/sub-nodes/n8n-mcp-registry.databricksgenie.md).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}
