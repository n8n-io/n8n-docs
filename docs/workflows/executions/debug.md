---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
title: Debug and re-run past executions
description: How to copy execution data into your current workflow in order to debug previous executions.
---

# Debug and re-run past executions

/// info | Feature availability
Available on n8n Cloud and registered Community plans.
///

You can load data from a previous execution into your current workflow. This is useful for debugging data from failed production executions: you can see a failed execution, make changes to your workflow to fix it, then re-run it with the previous execution data.

## Load data

To load data from a previous execution:

1. In your workflow, select the **Executions** tab to view the **Executions** list.
1. Select the execution you want to debug. n8n displays options depending on whether the workflow was successful or failed:
	* For failed executions: select **Debug in editor**.
	* For successful executions: select **Copy to editor**.
1. n8n copies the execution data into your current workflow, and [pins the data](/data/data-pinning/) in the first node in the workflow.

/// note | Check which executions you save
The executions available on the **Executions** list depends on your [Workflow settings](/workflows/settings/).
///
