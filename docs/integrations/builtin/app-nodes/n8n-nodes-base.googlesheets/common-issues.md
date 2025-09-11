---
title: Google Sheets node common issues 
description: Documentation for common questions and solutions in the Google Sheets node in n8n, a workflow automation platform. Includes details of the issue and suggested resolutions.
contentType: [integration, reference]
priority: critical
---

# Google Sheets node common issues

Here are some common errors and issues with the [Google Sheets node](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/index.md) and steps to resolve or troubleshoot them.

## Append an array

To insert an array of data into Google Sheets, you must convert the array into a valid JSON (key, value) format.

To do so, consider using:

1. The [Split Out](/integrations/builtin/core-nodes/n8n-nodes-base.splitout.md) node.
1. The [AI Transform](/integrations/builtin/core-nodes/n8n-nodes-base.aitransform.md) node. For example, try entering something like:
    ```
    Convert 'languages' array to JSON (key, value) pairs.
    ```
1. The [Code node](/integrations/builtin/core-nodes/n8n-nodes-base.code/index.md).

<!-- vale off -->
## Column names were updated after the node's setup
<!-- vale on -->

You'll receive this error if the Google Sheet's column names have changed since you set up the node.

To refresh the column names, re-select **Mapping Column Mode**. This should prompt the node to fetch the column names again.

Once the column names refresh, update the node parameters.
