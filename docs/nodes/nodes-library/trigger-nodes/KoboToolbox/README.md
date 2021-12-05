---
permalink: /nodes/n8n-nodes-base.koboToolboxTrigger
description: Learn how to use the KoboToolbox Trigger node in n8n
---

# KoboToolbox

[KoboToolbox](https://www.kobotoolbox.org/) is a field survey / data collection tool that makes it easy to design interactive forms to be filled offfline from mobile devices. It is available both as a free cloud solution or as a self-hosted version.

::: tip 🔑 Credentials
You can find authentication information for this node [here](../../../credentials/KoboToolbox/README.md).
:::

This trigger node will trigger an event upon new submissions of a specific form. The trigger node will take care of the creation / deletion of the hook, so no setup is required on KoboToolbox side to enable these notifications.

It works the same way as the Get Submission operation in the [KoboToolbox](../../core-nodes/KoboToolbox/README.md) node, and in particular supports the same reformatting options.

## Example Usage

This workflow will trigger an execution on every new submission of a form.

![A simple workflow with the KoboToolbox Trigger node](./workflow.png)

### 1. KoboToolbox Trigger node

In the ***Parameters*** panel, specify the KoboToolbox ***Form ID*** for which you want to listen to new submissions, as well as any reformatting options if needed. For information on the reformatting options, refer to the [KoboToolbox](../../core-nodes/KoboToolbox/README.md) node documentation.

Your workflow will now be triggered whenever a new submission is received by the KoboToolbox server.

Keep in mind that since form submissions can be made offline by the data collectors, the actual reception of the submissions on the server may happen long after the real data collection.
