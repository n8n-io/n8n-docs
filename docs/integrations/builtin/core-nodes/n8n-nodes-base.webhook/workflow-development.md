---
title: Webhook node workflow development documentation
description: Learn how to build, test, and use the Webhook node in your workflows in n8n.
priority: critical
contentType: howto
---

# Workflow development

The [Webhook node](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md) works a bit differently from other core nodes. n8n recommends following these processes for building, testing, and using your Webhook node in production.

n8n generates two **Webhook URLs** for each Webhook node: a **Test URL** and a **Production URL**.

## Build and test workflows

While building or testing a workflow, use the **Test** webhook URL.

Using a test webhook ensures that you can view the incoming data in the editor UI, which is useful for debugging. Select **Listen for test event** to register the webhook before sending the data to the test webhook. The test webhook stays active for 120 seconds.

When using the Webhook node on localhost on a [self-hosted](/hosting/index.md) n8n instance, run n8n in tunnel mode:

* [npm with tunnel](/hosting/installation/npm.md#n8n-with-tunnel)
* [Docker with tunnel](/hosting/installation/docker.md#n8n-with-tunnel)

<video src="/_video/integrations/builtin/core-nodes/webhook/webhook-node-intro.mp4" controls width="100%"></video>

## Production workflows

When your workflow is ready, switch to using the **Production** webhook URL. You can then publish your workflow, and n8n runs it automatically when an external service calls the webhook URL.

When working with a Production webhook, ensure that you have saved and published the workflow. Data flowing through the webhook isn't visible in the editor UI with the production webhook.

Refer to [Create a workflow](/workflows/create.md) for more information on publishing workflows.
