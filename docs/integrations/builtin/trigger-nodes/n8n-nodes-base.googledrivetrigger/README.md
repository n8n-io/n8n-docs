---
title: Google Drive Trigger node documentation
description: >-
  Learn how to use the Google Drive Trigger node in n8n. Follow technical
  documentation to integrate Google Drive Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: n8n-nodes-base.googledrivetrigger
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.googledrivetrigger/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.googledrivetrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.googledrivetrigger
layout:
  description:
    visible: false
---

# Google Drive Trigger node <a href="#google-drive-trigger-node" id="google-drive-trigger-node"></a>

[Google Drive](https://drive.google.com) is a file storage and synchronization service developed by Google. It allows users to store files on their servers, synchronize files across devices, and share files.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/google/README.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Google Drive Trigger integrations](https://n8n.io/integrations/google-drive-trigger/) page.
{% endhint %}

{% hint style="info" %}
**Manual Executions vs. Activation**

On manual executions this node will return the last event matching its search criteria. If no event matches the criteria (for example because you are watching for files to be created but no files have been created so far), an error is thrown. Once saved and activated, the node will regularly check for any matching events and will trigger your workflow for each event found.
{% endhint %}

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).
