---
title: Evaluation node documentation
description: Documentation for the Evaluation node in n8n, a workflow automation platform. Includes guidance on usage and links to examples.
contentType: [integration, reference]
---

# Evaluation node

The Evaluation node performs various operations related to [evaluations](/advanced-ai/evaluations/overview.md) to validate your AI workflow reliability.

Use the Evaluation node in these scenarios:

* To conditionally execute logic based on whether the workflow is under evaluation
* To write evaluation outcomes back to a Google Sheet datasetor
* To log scoring metrics for your evaluation performance to n8n's evaluations tab

/// note | Credentials for Google Sheets
The Evaluation node's **Set Outputs** operation records evaluation results to data tables or Google Sheets. To use Google Sheets as a recording location, configure a [Google Sheets credential](/integrations/builtin/credentials/google/index.md).
///

## Operations

The Evaluation node offers the following operations:

* [**Set Outputs**](#set-outputs): Write the results of an evaluation back to a data table or Google Sheet dataset.
* [**Set Metrics**](#set-metrics): Record metrics scoring the evaluation performance to n8n's **Evaluations** tab.
* [**Check If Evaluating**](#check-if-evaluating): Branches the workflow execution logic depending on whether the current execution is an evaluation.

The parameters and options available depend on the operation you select.

### Set Outputs

The **Set Outputs** operation has the following parameters:

- **Source:** Select the location to which you want to output the evaluation results. Default value is **Data table**.

   Source settings differ depending on **Source** selection.

    * When **Source** is **Data table**:
        * **Data table:** Select a data table by name or ID
    * When **Source** is **Google Sheets**:
        * **Credential to connect with**: Create or select an existing [Google Sheets credentials](/integrations/builtin/credentials/google/index.md).
        * **Document Containing Dataset**: Choose the spreadsheet document you want to write the evaluation results to. Usually this is the same document you select in the [Evaluation Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.evaluationtrigger.md) node.
        * Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
            * You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
        * **Sheet Containing Dataset**: Choose the sheet you want to write the evaluation results to. Usually this is the same sheet you select in the [Evaluation Trigger](/integrations/builtin/core-nodes/n8n-nodes-base.evaluationtrigger.md) node.
            * Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the sheet title. 
            * You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`. 

You define the items to write to the data table or Google Sheet in the **Outputs** section. For each output, you set the following:

* **Name**: The Google Sheet column name to write the evaluation results to.
* **Value**: The value to write to the Google Sheet.

### Set Metrics

The **Set Metrics** operation includes a **Metrics to Return** section where you define the metrics to record and track for your evaluations. You can see the metric results in your workflow's **Evaluations** tab.

For each metric you wish to record, you set the following details:

* **Name**: The name to use for the metric.
* **Value**: The numeric value to record. Once you run your evaluation, you can drag and drop values from previous nodes here. Metric values must be numeric.

### Check If Evaluating

The **Check If Evaluating** operation doesn't have any parameters. This operation provides branching output connectors so that you can conditionally execute logic depending on whether the current execution is an evaluation or not.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'evaluation') ]]

## Related resources

To learn more about n8n evaluations, check out the [evaluations documentation](/advanced-ai/evaluations/overview.md)

n8n provides a trigger node for evaluations. You can find the node docs [here](/integrations/builtin/core-nodes/n8n-nodes-base.evaluationtrigger.md).

For common questions or issues and suggested solutions, refer to the evaluations [tips and common issues](/advanced-ai/evaluations/tips-and-common-issues.md) page.
