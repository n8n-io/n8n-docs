---
title: Google Sheets node common issues
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Google Sheets node common issues
originalFilePath: integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/common-issues.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/common-issues
url: >-
  https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/common-issues
description: >-
  Documentation for common questions and solutions in the Google Sheets node in
  n8n, a workflow automation platform. Includes details of the issue and
  suggested resolutions.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Common issues

Here are some common errors and issues with the [Google Sheets node](./) and steps to resolve or troubleshoot them.

## Append an array <a href="#append-an-array" id="append-an-array"></a>

To insert an array of data into Google Sheets, you must convert the array into a valid JSON (key, value) format.

To do so, consider using:

1. The [Split Out](../../core-nodes/n8n-nodes-base.splitout.md) node.
2.  The [AI Transform](../../core-nodes/n8n-nodes-base.aitransform.md) node. For example, try entering something like:

    ```
    Convert 'languages' array to JSON (key, value) pairs.
    ```
3. The [Code node](../../core-nodes/n8n-nodes-base.code/).

## Column names were updated after the node's setup <a href="#column-names-were-updated-after-the-nodes-setup" id="column-names-were-updated-after-the-nodes-setup"></a>

You'll receive this error if the Google Sheet's column names have changed since you set up the node.

To refresh the column names, re-select **Mapping Column Mode**. This should prompt the node to fetch the column names again.

Once the column names refresh, update the node parameters.
