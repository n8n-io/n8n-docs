---
description: >-
  Start n8n workflows when a Databricks job run or pipeline update starts,
  succeeds, or fails. Set up the polling trigger or a webhook alternative.
layout:
  description:
    visible: false
---

# Databricks Trigger node

<!-- ENT-424: before this page leaves draft, add a "Feature availability" info hint here with the sentence "The Databricks Trigger node is available from n8n X.Y.Z." Fill X.Y.Z from the first n8n release that contains the commit that un-hides the node. Do not invent a version. -->

Use the Databricks Trigger node to respond to events in [Databricks](https://www.databricks.com/) and integrate Databricks with other applications. The node starts a workflow when a run of a Databricks job or an update of a Databricks pipeline starts, succeeds, or fails.

{% hint style="info" %}
**Credentials**

Refer to [Databricks credentials](../credentials/databricks.md) for guidance on setting up authentication. The node accepts the **Databricks** (access token) and **Databricks OAuth2 API** credentials.
{% endhint %}

## Set up the trigger

1. Add a **Databricks Trigger** node to a workflow.
2. Set **Authentication** to **Access Token** or **OAuth2** and select the credential. For an **OAuth2** credential, set its **Grant Type** to **Client Credentials (Service Principal)** for a service principal, or to **Authorization Code (User)** for a signed-in user. Refer to [Use a service principal](#use-a-service-principal).
3. Set **Resource** to **Job** to watch the runs of a job, or to **Pipeline** to watch the updates of a Databricks pipeline.
4. Select the job in **Job**, or the pipeline in **Pipeline**. Each field offers three modes:
	* **From List**: select from the workspace. Type to filter by name. The pipeline list also matches the ID. Databricks lists only the jobs the credential's identity has **CAN VIEW** on.
	* **By ID**: enter the ID. A job ID is a whole number, for example `281874479417551`. A pipeline ID is a UUID, for example `8199cd89-e2f5-4169-a6aa-656a24c8886d`.
	* **By URL**: paste the page URL from Databricks, for example `https://<your-workspace>/jobs/<job-id>` or `https://<your-workspace>/pipelines/<pipeline-id>`. The node also accepts the hash form of both pages, such as `https://<your-workspace>/?o=<workspace-id>#job/<job-id>` and `https://<your-workspace>/?o=<workspace-id>#joblist/pipelines/<pipeline-id>`.
5. Select the **Events** that start the workflow. Refer to [Events](#events).
6. Keep **Simplify** on to get the output described in [Output](#output). Turn it off to get the raw Databricks object.
7. Under **Poll Times**, select a poll **Mode** to set how often the trigger checks Databricks. The default is **Every Minute**. Refer to [How the trigger polls](#how-the-trigger-polls).
8. Select **Fetch Test Event** to check the setup. Refer to [Test the trigger](#test-the-trigger).
9. Publish the workflow.

## Events

The trigger starts the workflow once for each event of each run or update. It doesn't report a run or update again after it has reported it as finished, for example after a repair of a job run.

### Job events

Available when **Resource** is **Job**. The default selection is **Run Failed** and **Run Succeeded**.

* **Run Failed**: a run ended with any result other than a full success. This includes canceled, skipped, and partly failed runs (`SUCCESS_WITH_FAILURES`).
* **Run Started**: the trigger saw a new run of the job.
* **Run Succeeded**: a run ended with every task successful. The termination code is `SUCCESS`.

A run that starts and ends between two polls produces two items in the same execution when you select both **Run Started** and its final event. Both items then carry the same finished timing.

### Pipeline events

Available when **Resource** is **Pipeline**. The default selection is **Update Completed** and **Update Failed**.

* **Update Completed**: an update ran to completion.
* **Update Failed**: an update failed, or Databricks canceled it. Stopping a pipeline cancels the running update, so a stop produces this event.
* **Update Started**: the trigger saw a new update of the pipeline.

{% hint style="info" %}
**Continuous pipelines**

A continuous pipeline runs one update until you stop it, so **Update Completed** never happens for it. **Update Started** happens when the pipeline starts or restarts. **Update Failed** happens when the update fails or when you stop the pipeline. Refer to [Watch a pipeline through a job](#watch-a-pipeline-through-a-job) for a way to get a completion signal.
{% endhint %}

## Output

With **Simplify** on, each item has the same top-level keys for both resources: `event`, the watched object (`job` or `pipeline`), the run or update, `result`, and `timing`. `result` is absent on **Run Started** and **Update Started**. The node drops keys that have no value.

### Job output

| Field | Value |
|-------|-------|
| `event` | `runStarted`, `runSucceeded`, or `runFailed`. |
| `job.id` | The job ID. |
| `run.id` | The run ID. Pass it to the **Get Run** or **Get Run Output** operation of the Databricks node, as in [Example: Notify when a job run fails](../app-nodes/n8n-nodes-base.databricks.md#example-notify-when-a-job-run-fails). |
| `run.name` | The run name. |
| `run.url` | The run page URL in Databricks. |
| `run.trigger` | What started the run, for example `ONE_TIME`. |
| `run.creator` | The user or service principal that created the run. |
| `run.parameters` | The job parameters of the run, as name and value pairs. A parameter without a value shows its default. |
| `result.state` | The life cycle state. `TERMINATED` for a finished run. |
| `result.code` | The termination code, for example `SUCCESS`, `SUCCESS_WITH_FAILURES`, `CANCELED`, or `RUN_EXECUTION_ERROR`. |
| `result.type` | The termination type, for example `SUCCESS` or `CLIENT_ERROR`. |
| `result.message` | The termination message. Absent when Databricks gives none. |
| `timing.startedAt` | The start time in UTC. |
| `timing.endedAt` | The end time in UTC. Absent while the run is still going. |
| `timing.durationMs` | The run duration in milliseconds. Absent while the run is still going. |
| `timing.queuedMs` | The time the run waited in the queue, in milliseconds. |

A **Run Failed** item looks like this:

```json
{
	"event": "runFailed",
	"job": { "id": 281874479417551 },
	"run": {
		"id": 41847992357943,
		"name": "nightly-etl",
		"url": "https://adb-example.cloud.databricks.com/?o=1234567890#job/281874479417551/run/41847992357943",
		"trigger": "ONE_TIME",
		"creator": "service-principal@example.com",
		"parameters": { "fail": "true" }
	},
	"result": {
		"state": "TERMINATED",
		"code": "RUN_EXECUTION_ERROR",
		"type": "CLIENT_ERROR",
		"message": "Task main failed with message: Workload failed, see run output for details."
	},
	"timing": {
		"startedAt": "2026-09-01T13:37:18.171Z",
		"endedAt": "2026-09-01T13:37:58.640Z",
		"durationMs": 40469,
		"queuedMs": 14111
	}
}
```

### Pipeline output

| Field | Value |
|-------|-------|
| `event` | `updateStarted`, `updateCompleted`, or `updateFailed`. |
| `pipeline.id` | The pipeline ID. |
| `pipeline.name` | The pipeline name. Absent when the Databricks event carries none. |
| `pipeline.url` | The pipeline page URL in Databricks. |
| `update.id` | The update ID. |
| `update.url` | The update page URL in Databricks. |
| `result.state` | `COMPLETED`, `FAILED`, or `CANCELED`. |
| `result.message` | The message of the Databricks event, for example `Update 01ee1d is COMPLETED.`. |
| `result.errors` | The exceptions of a failed update. Each entry has `type`, `code`, `sqlState`, `message`, and `stack`, where `stack` lists `class`, `method`, `file`, and `line` for each frame. Absent when the event has no exceptions. |
| `timing.startedAt` | The time of the first in-flight event the trigger saw for the update. Absent when the trigger saw only the final event, for example when the update was already running when you published the workflow. |
| `timing.runningAt` | The time the update reached the `RUNNING` state. Absent when the trigger didn't see that event. |
| `timing.endedAt` | The time of the final event. Absent on **Update Started**. |
| `timing.durationMs` | `endedAt` minus `runningAt`, in milliseconds. Absent when `runningAt` is absent. |

An **Update Completed** item looks like this:

```json
{
	"event": "updateCompleted",
	"pipeline": {
		"id": "8199cd89-e2f5-4169-a6aa-656a24c8886d",
		"name": "orders-ingest",
		"url": "https://adb-example.cloud.databricks.com/pipelines/8199cd89-e2f5-4169-a6aa-656a24c8886d"
	},
	"update": {
		"id": "01ee1dae-da54-415a-aba8-0c8b0de503f1",
		"url": "https://adb-example.cloud.databricks.com/pipelines/8199cd89-e2f5-4169-a6aa-656a24c8886d/updates/01ee1dae-da54-415a-aba8-0c8b0de503f1"
	},
	"result": {
		"state": "COMPLETED",
		"message": "Update 01ee1d is COMPLETED."
	},
	"timing": {
		"startedAt": "2026-09-01T14:20:31.066Z",
		"runningAt": "2026-09-01T14:20:31.066Z",
		"endedAt": "2026-09-01T14:20:35.738Z",
		"durationMs": 4672
	}
}
```

### Raw output

With **Simplify** off, each item is the object Databricks returns, plus the `event` key. For a job, this is a run as the Jobs API lists it. For a pipeline, this is an `update_progress` event as the Pipelines API lists it. Refer to [list runs](https://docs.databricks.com/api/jobs/v2/list-runs) and [list pipeline events](https://docs.databricks.com/api/pipelines/v2/events) in the Databricks API reference.

## How the trigger polls

The node checks Databricks on the schedule in **Poll Times**. An event reaches the workflow up to one poll interval after it happens. Refer to [Get events in seconds with a webhook](#get-events-in-seconds-with-a-webhook) if that's too slow.

* The first time you publish the workflow, the trigger starts from that moment. For a job, it doesn't report runs that started earlier. For a pipeline, it still reports the end of an update that was already running when you published, without `timing.startedAt`, `timing.runningAt`, or `timing.durationMs`.
* When you unpublish and publish again, the trigger continues from where it stopped and reports what happened while the workflow stayed unpublished. When you change the job or pipeline, or switch **Resource**, it starts fresh from that moment.
* The trigger still reports a run or update that Databricks lists late, and reports it once. It reports a long run when the run ends, no matter how long the run takes.
* If a job starts more than 1,000 runs between two polls, the trigger reports the most recent 1,000 and writes a warning to the n8n log.
* Every poll makes at least one request to Databricks, so **Every Minute** is at least 1,440 requests a day for each trigger node. A poll that finds nothing doesn't create an execution. For a job that runs a few times a day, **Every X** with 10 or 15 minutes is enough. A pipeline poll reads every event in its window, not only update events, so a busy pipeline costs more for each poll than a job.

## Test the trigger

Select **Fetch Test Event** to run the trigger once by hand. For a job, the node reads the latest 25 runs. Each run gives one item: **Run Started** while it runs, or its final event once it has finished. For a pipeline, the node reads the latest 100 events and returns the update events among them. An update can give both its start and its end. The node lists items oldest first and keeps only the events in your **Events** selection. The test returns nothing when no run or update matches, for example when you select only **Run Started** and no run is going. A test doesn't change what the published workflow reports later.

## Use a service principal

The trigger runs unattended for as long as the workflow stays published, so use a credential that belongs to a service principal. That's an **OAuth2** credential with **Grant Type** set to **Client Credentials (Service Principal)**. A credential tied to a person stops working when that person leaves or revokes consent. Refer to [Using OAuth2 (service principal)](../credentials/databricks.md#using-oauth2-service-principal) for the setup steps. Track the expiry date of the secret. The trigger stops when the secret lapses.

### Grant CAN VIEW

The credential's identity needs **CAN VIEW** on each job or pipeline you watch. It's the lowest permission level for both. To grant it on a job, open the job in Databricks and select **Edit permissions** in the **Job details** pane. Pick the user or service principal, set the permission to **Can View**, then select **Add** and **Save**. For a pipeline, grant it in the pipeline's permissions settings. Refer to the Databricks documentation on [job permissions](https://docs.databricks.com/aws/en/jobs/privileges) and the [pipeline access control list](https://docs.databricks.com/aws/en/security/auth/access-control/#lakeflow-pipelines-acls). The [Required Databricks privileges](../credentials/databricks.md#required-databricks-privileges) table lists the other privileges the credential needs.

## Get events in seconds with a webhook

The trigger polls, so an event reaches the workflow up to one poll interval after it happens. If you need a job event within seconds, let Databricks push it to a [Webhook](../core-nodes/n8n-nodes-base.webhook/README.md) node instead. Databricks job notifications can call a webhook when a run starts, succeeds, or fails. Pipelines can't send webhooks. Refer to [Watch a pipeline through a job](#watch-a-pipeline-through-a-job).

Before you start:

* A Databricks workspace admin must create the notification destination. Databricks doesn't sign the payload, so the Basic Auth username and password on the Webhook node are the only check.
* The payload holds only IDs, so the workflow reads the run with the Databricks node.
* Databricks documents no retry, so keep a Databricks Trigger node as the fallback for missed events.
* Databricks must reach your n8n instance over HTTPS. For a self-hosted instance behind a firewall, allow the Databricks outbound IP ranges listed under **Networking requirements** on the [notification destinations](https://docs.databricks.com/aws/en/admin/workspace-settings/notification-destinations) page.

To set it up:

1. In n8n, add a **Webhook** node. Set **HTTP Method** to **POST**. Set **Authentication** to **Basic Auth** and create a **Basic Auth** credential with a **User** and a **Password**. Keep **Respond** at **Immediately**. Copy the **Production URL**.
2. Add a **Databricks** node after the Webhook node. Set **Resource** to **Job** and **Operation** to **Get Run**. Set **Run** to **By ID** and enter the expression `{{ $json.body.run.run_id }}`. The node returns the full run, with `run_state`, `run_result`, and `run_error_message`. Refer to [Get Run](../app-nodes/n8n-nodes-base.databricks.md#get-run).
3. Publish the workflow.
4. In Databricks, a workspace admin creates the destination. Select your username in the top bar, then **Settings**. In the **Workspace admin** section, open the **Notifications** tab and select **Manage**. Select **Add destination**, choose **Webhook**, enter the production URL, and enter the **User** and **Password** from step 1. Select **Create**. Refer to [Manage notification destinations](https://docs.databricks.com/aws/en/admin/workspace-settings/notification-destinations).
5. In the job, open the **Job details** pane and select **Edit notifications** under **Job notifications**. Select **Add notification**, choose the destination in **Destination**, and check **Start**, **Success**, or **Failure**. Select **Save**. Refer to [Add notifications on a job](https://docs.databricks.com/aws/en/jobs/notifications).

Databricks then sends one POST request for each event. The body arrives in `$json.body`:

```json
{
	"event_type": "jobs.on_failure",
	"workspace_id": 1234567890,
	"run": { "run_id": 41847992357943 },
	"job": { "job_id": 281874479417551, "name": "nightly-etl" }
}
```

`event_type` is `jobs.on_start`, `jobs.on_success`, `jobs.on_failure`, or `jobs.on_duration_warning_threshold_exceeded`. Check only the boxes you need in Databricks, or branch on `$json.body.event_type` with an [If](../core-nodes/n8n-nodes-base.if.md) node. A job can notify up to three destinations for each event type.

## Watch a pipeline through a job

The **Pipeline** resource watches every update of a Databricks pipeline, whatever started it. In three cases, watch a job instead.

### The pipeline runs as a task in a job

Watch the job when you care about the job as a whole, for example when other tasks follow the pipeline task. The job sees only the updates it started. Watch the pipeline when you need the exceptions and stack of a failed update in `result.errors`.

### The pipeline is continuous

A continuous pipeline never produces **Update Completed**. To get a completion signal, run it from a triggered job with a pipeline task. The job runs the pipeline as a single update that completes, so **Run Succeeded** on the job and **Update Completed** on the pipeline both happen. The pipeline then processes data when the job runs, not continuously.

### You need the event within seconds

Jobs can send webhooks, but pipelines can't. A job with a pipeline task gives the pipeline the webhook path in [Get events in seconds with a webhook](#get-events-in-seconds-with-a-webhook).

Refer to [Pipeline task for jobs](https://docs.databricks.com/aws/en/jobs/tasks/pipeline) and [Triggered vs. continuous pipeline mode](https://docs.databricks.com/aws/en/ldp/concepts/pipeline-mode) for more information.

## Common issues

### The trigger doesn't start the workflow

* The first time you publish the workflow, the trigger starts from that moment and doesn't replay older runs. Start a new run or update to test it.
* Open the **Executions** list. A failed poll shows there with the Databricks error.
* Check the **Events** selection. **Run Started** and **Update Started** aren't selected by default.
* A continuous pipeline never produces **Update Completed**. Refer to [Watch a pipeline through a job](#watch-a-pipeline-through-a-job).
* A run that's still going produces only **Run Started**. Its final event follows once Databricks reports it as finished.
* The credential expired. A service principal secret lasts at most 730 days, and a user-login connection ends when its refresh token expires. Refer to [OAuth secrets expire](../credentials/databricks.md#create-a-service-principal-and-oauth-secret) and [Configure token lifetimes](../credentials/databricks.md#configure-token-lifetimes).

### The job or pipeline isn't in the list

Databricks lists only the jobs the credential's identity has **CAN VIEW** on. The search scans at most the first 1,000 jobs or pipelines of the workspace. Use **By ID** or **By URL** instead, or grant **CAN VIEW** first.

### Permission errors

When the credential's identity lacks **CAN VIEW**, Databricks rejects the request with `PERMISSION_DENIED`. n8n shows the Databricks message as the error and adds one of these hints as the description:

```text
Grant Can View on the job to the user or service principal of the credential, then retry.
```

```text
Grant Can View on the pipeline to the user or service principal of the credential, then retry.
```

You see the error in the node when you select **Fetch Test Event**. In a published workflow, each failed poll appears as a failed execution in the **Executions** list. Refer to [Grant CAN VIEW](#grant-can-view).

### Invalid job or pipeline ID

The node checks the ID before it calls Databricks:

* `Job ID must be a whole number`: use the numeric ID shown in the job URL in Databricks.
* `Job ID is too large to send exactly`: IDs above `9007199254740991` lose precision in JavaScript, so the node can't watch this job.
* `Pipeline ID must be a UUID`: use the ID shown in the pipeline URL in Databricks, for example `8199cd89-e2f5-4169-a6aa-656a24c8886d`.

### Unexpected response

n8n shows `Databricks did not return a JSON list of job runs` or `Databricks did not return a JSON list of pipeline events` when the **Host** in the credential isn't a Databricks workspace URL. Check the **Host** and retry.

## Related resources

* [Databricks node](../app-nodes/n8n-nodes-base.databricks.md)
* [Databricks credentials](../credentials/databricks.md)
* [Jobs API: list runs](https://docs.databricks.com/api/jobs/v2/list-runs)
* [Pipelines API: list pipeline events](https://docs.databricks.com/api/pipelines/v2/events)
* [Databricks access control lists](https://docs.databricks.com/aws/en/security/auth/access-control/)
