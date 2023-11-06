---
title: Wait
description: Documentation for the Wait node in n8n, a workflow automation platform. Includes guidance on usage, and links to examples.
contentType: integration
---

# Wait

Use the Wait node pause your workflow's execution. When the workflow pauses it offloads the execution data to the database. When the resume condition is met, the workflow reloads the data and the execution continues.

The Wait node can resume on the following conditions:

* After time interval
* At specified time
* On webhook call

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Wait integrations](https://n8n.io/integrations/wait/){:target=_blank .external-link} page.
///
## Operations

* Resume
	* After Time Interval
	* At Specified Time
	* On Webhook Call

## Related resources

View [example workflows and related content](https://n8n.io/integrations/wait/){:target=_blank .external-link} on n8n's website.

## Time-based operations
    
For the time-based resume operations, note that:

* For wait times less than 65 seconds, the workflow  doesn't offload execution data offloaded to the database. Instead, the process continues to run and execution resumes after the specified interval passes.
* The n8n server time is always used regardless of the timezone setting. Workflow timezone settings, and any changes made to them, don't affect the Wait node interval or specified time. 

## On Webhook Call usage

The resume **On webhook call** option enables your workflows to resume when the Wait node receives an HTTP call.

The webhook URL that resumes the execution when called is generated at runtime. The Wait node provides the `$resumeWebhookUrl` variable so that you can reference and send the yet-to-be-generated URL wherever needed, for example to a third-party service or in an email. 

When the workflow executes, the Wait node generates the resume URL and the webhook(s) in your workflow using the `$resumeWebhookUrl` reference become functional. This generated URL is unique to each execution, meaning that your workflow can contain multiple Wait nodes and as the webhook URL is called it will resume each Wait node sequentially.

### Webhooks reference

See the [Webhook node](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/) documentation to learn more about the Authentication, Method, and Response parameters when configuring the Wait node to resume on a webhook call.

In addition to the parameters shared with the Webhook node, the Wait node has the following configuration options:

* **Limit wait time**: Set the maximum amount of time to wait before the execution resumes.
* **Add Option** > **Webhook Suffix**: Provide a suffix that you want to appended to the resume URL. This is useful for creating unique webhook URLs for each Wait node when a workflow contains multiple Wait nodes. Not that the generated `$resumeWebhookUrl` won't automatically include this suffix, you must manually append it to the webhook URL before exposing it.

### Limitations

There are some limitations to keep in mind when using On Webhook Call:

* Partial executions of your workflow change the `$resumeWebhookUrl`, so be sure that the node sending this URL to your desired third-party runs in the same execution as the Wait node.
* When testing your workflow using the Editor UI, you can't see the rest of the execution following the Wait node. To inspect the execution results enable **Save Manual Executions** in you [workflow settings](/workflows/settings/) to be able to review the execution results there.
