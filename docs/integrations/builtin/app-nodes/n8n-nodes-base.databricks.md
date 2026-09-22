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
| `run_result` | The termination code, for example `SUCCESS`, `SUCCESS_WITH_FAILURES`, `CANCELED`, or `RUN_EXECUTION_ERROR`. `null` until the run finishes. |
| `run_succeeded` | `true` when `run_result` is `SUCCESS`, `false` for any other result. `null` until the run finishes. |
| `run_error_message` | The termination message of a run that didn't succeed, cut at 500 characters. `null` otherwise. |

Use these fields in an [If](../core-nodes/n8n-nodes-base.if.md) node to branch on the outcome without reading the nested `status` object.

### Get Run Output

**Get Run Output** reads what the tasks of a run produced. Set **Run** to the job run to get every task. A task run ID returns one item for that task only. The node reads the run's tasks, fetches the output of each task, and returns one item per task:

| Field | Value |
|-------|-------|
| `run_id` | The run you asked for. |
| `job_id` | The job the run belongs to. |
| `task_key` | The key of the task in the job definition. Absent when you pass a task run ID. |
| `task_run_id` | The run ID of this task. |
| `truncated` | `true` when Databricks cut the notebook output or the logs. |
| `notebook_output`, `sql_output`, `dbt_output`, `run_job_output`, `clean_rooms_notebook_output`, `logs`, `logs_truncated`, `error`, `error_trace`, `info`, `metadata` | The task output as Databricks returns it. Which fields appear depends on the task type. `notebook_output.result` holds the value a notebook returns with `dbutils.notebook.exit()`. `error` explains why a task failed or why its output isn't available. |

A run with no tasks returns one item for the run itself. You can also read a run that hasn't finished, but tasks that are still running have no output yet. The node reads at most 2,000 tasks of one run. Above that it fails with `Run <run-id> has more tasks than the node can read`.

### Run

**Run** starts a run of the job, the same as **Run now** in Databricks.

| Field | Description |
|-------|-------------|
| **Job** | The job to run. |
| **Job Parameters** | Job-level parameters for this run. Select **Add Parameter** and enter a **Name** and a **Value** for each one. They override the default values defined on the job. The node sends every value as a string. |
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
* If the run ends with any other result, including `SUCCESS_WITH_FAILURES` and `CANCELED`, the node fails with `Job run <run-id> failed (<code>): <message>` (or the code again when Databricks gives no message) and the run page URL.
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

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Databricks node documentation integration templates](https://n8n.io/integrations/databricks) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Databricks' REST API documentation](https://docs.databricks.com/api/) for details about their API.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/96ifDzfcUuwOyYrubZUt/" %}
