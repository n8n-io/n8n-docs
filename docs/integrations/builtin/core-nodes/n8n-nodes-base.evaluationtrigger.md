---
title: Evaluation Trigger node documentation
description: >-
  Learn how to use the Evaluation Trigger node in n8n. Follow technical
  documentation to integrate Evaluation Trigger node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Evaluation Trigger node documentation
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.evaluationtrigger.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.evaluationtrigger
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.evaluationtrigger
layout:
  description:
    visible: false
---

# Evaluation Trigger node <a href="#evaluation-trigger-node" id="evaluation-trigger-node"></a>

Use the Evaluation Trigger node when setting up [evaluations](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/test-and-improve-ai-workflows/understand-why-to-test) to validate your AI workflow reliability. During evaluation, the Evaluation Trigger node reads your evaluation dataset from Google Sheets, sending the items through the workflow one at a time, in sequence.

On this page, you'll find the Evaluation Trigger node parameters and options.

{% hint style="info" %}
**Credentials for Google Sheets**

The Evaluation Trigger node uses data tables or Google Sheets to store the test dataset. To use Google Sheets as a dataset source, configure a [Google Sheets credential](../credentials/google/README.md).
{% endhint %}

## Parameters <a href="#parameters" id="parameters"></a>

- **Source:** Select the location to which you want to output the evaluation results. Default value is **Data table**.

    Source settings differ depending on **Source** selection.

    * When **Source** is **Data table**:
        * **Data table:** Select a data table by name or ID.
        * **Limit Rows**: Whether to limit the number of rows in the data table to process. Default state is `off`.
            * **Max Rows to Process**: When **Limit Rows** is enabled, the maximum number of rows to read and process during the evaluation. Default value is 10.
            * **Filter Rows:** Whether to filter rows in the data table to process. Default state is `off`.
     * When **Source** is **Google Sheets**:
        - **Credential to connect with**: Create or select an existing [Google Sheets credentials](../credentials/google/README.md).
        * **Document Containing Dataset**: Choose the spreadsheet document with the sheet containing your test dataset.
            - Select **From list** to choose the spreadsheet title from the dropdown list, **By URL** to enter the url of the spreadsheet, or **By ID** to enter the `spreadsheetId`. 
            - You can find the `spreadsheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/spreadsheetId/edit#gid=0`.
        * **Sheet Containing Dataset**: Choose the sheet containing your test dataset.
            - Select **From list** to choose the sheet title from the dropdown list, **By URL** to enter the url of the sheet, **By ID** to enter the `sheetId`, or **By Name** to enter the sheet title. 
            - You can find the `sheetId` in a Google Sheets URL: `https://docs.google.com/spreadsheets/d/aBC-123_xYz/edit#gid=sheetId`. 
        * **Limit Rows**: Whether to limit the number of rows in the sheet to process.
            * **Max Rows to Process**: When **Limit Rows** is enabled, the maximum number of rows to read and process during the evaluation.
        * **Filters:** Filter the evaluation dataset based on column values.
            * **Column**: Choose a sheet column you want to filter by. Select **From list** to choose the column name from the dropdown list, or **By ID** to specify an ID using an [expression](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/expressions-versus-data-nodes).
            * **Value**: The column value you want to filter by. The evaluation will only process rows with the given value for the selected column.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Evaluation Trigger node documentation integration templates](https://n8n.io/integrations/evaluation-trigger) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

To learn more about n8n evaluations, check out the [evaluations documentation](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/test-and-improve-ai-workflows/understand-why-to-test)

n8n provides an app node for evaluations. You can find the node docs [here](n8n-nodes-base.evaluation.md).

For common questions or issues and suggested solutions, refer to the evaluations [tips and common issues](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/test-and-improve-ai-workflows/fix-common-issues) page.
