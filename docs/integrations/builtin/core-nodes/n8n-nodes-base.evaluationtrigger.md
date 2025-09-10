---
title: Evaluation Trigger node documentation
description: Learn how to use the Evaluation Trigger node in n8n. Follow technical documentation to integrate Evaluation Trigger node into your workflows.
contentType: [integration, reference]
---

# Evaluation Trigger node

Use the Evaluation Trigger node when setting up [evaluations](/advanced-ai/evaluations/overview.md) to validate your AI workflow reliability. During evaluation, the Evaluation Trigger node reads your evaluation dataset from Google Sheets, sending the items through the workflow one at a time, in sequence.

On this page, you'll find the Evaluation Trigger node parameters and 

/// note | Requires Google Sheets
The Evaluation Trigger node uses Google Sheets to store the test dataset. To use evaluations, you must configure a [Google Sheets credential](/integrations/builtin/credentials/google/index.md).
///

## Parameters

- **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
* **Document Containing Dataset**: Choose the spreadsheet document with the sheet containing your test dataset.
    - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
    - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
* **Sheet Containing Dataset**: Choose the sheet containing your test dataset.
    - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the sheet title. 
    - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`. 
* **Limit Rows**: Whether to limit the number of rows in the sheet to process.
	* **Max Rows to Process**: When **Limit Rows** is enabled, the maximum number of rows to read and process during the evaluation.

## Filters

Optionally filter the evaluation dataset based on column values.

* **Column**: Choose a sheet column you want to filter by. Select **From list** to choose the column name from the dropdown list, or **By ID** to specify an ID using an [expression](/code/expressions.md).
* **Value**: The column value you want to filter by. The evaluation will only process rows with the given value for the selected column.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'evaluation-trigger') ]]

## Related resources

To learn more about n8n evaluations, check out the [evaluations documentation](/advanced-ai/evaluations/overview.md)

n8n provides an app node for evaluations. You can find the node docs [here](/integrations/builtin/core-nodes/n8n-nodes-base.evaluation.md).

For common questions or issues and suggested solutions, refer to the evaluations [tips and common issues](/advanced-ai/evaluations/tips-and-common-issues.md) page.
