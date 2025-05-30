---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Metric-based evaluations
description: Use metric-based evaluations to measure, score, and improve production AI-based workflow performance over time.
contentType: howto
---

# Metric-based evaluations
<!-- vale from-microsoft.HeadingPunctuation = NO -->

/// note | Available on Pro and Enterprise plans
Metric-based evaluation is available on Pro and Enterprise plans. Registered community and Starter plan users can also use it for a single workflow.
///

### What are metric-based evaluations?

Once your workflow is ready for deployment, you often want to test it on more examples than [when you were building it](/advanced-ai/evaluations/light-evaluations.md).

For example, when production executions start to turn up edge cases, you want to add them to your test dataset so that you can make sure they're covered.

For large datasets like the ones built from production data, it can be hard to get a sense of performance just by eyeballing the results. Instead, you must measure performance. Metric-based evaluations can assign one or more scores to each test run, which you can compare to previous runs. Individual scores get rolled up to measure performance on the whole dataset. 

This feature allows you to run evaluations that calculate metrics, track how those metrics change between runs and drill down into the reasons for those changes.

Metrics can be deterministic functions (such as the distance between two strings) or you can calculate them using AI. Metrics often involve checking how far away the output is from a *reference output* (also called ground truth). To do so, the dataset must contain that reference output. Some evaluations don't need this reference output though (for example, checking text for sentiment or toxicity).

## How it works

/// note | Requires Google Sheets
Evaluations use Google Sheets to store the test dataset. To use evaluations, you must configure a [Google Sheets credential](/integrations/builtin/credentials/google/index.md).
///

1. Set up [light evaluation](/advanced-ai/evaluations/light-evaluations.md)
2. Calculate metrics
3. Write metrics back to evaluation
4. Run evaluation and view results

### 1. Set up light evaluation

Follow the [setup instructions](/advanced-ai/evaluations/light-evaluations.md) to create a dataset and wire it up to your workflow, writing outputs back to the dataset.

The following steps use the same support ticket classification workflow from the light evaluation docs:

![Light evaluation workflow](/_images/advanced-ai/evaluations/light-evaluation-workflow.png)

### 2. Calculate metrics

Metrics are dimensions used to score the output of your workflow. They often compare the actual workflow output with a reference output. It's common to use AI to calculate metrics, although it's sometimes possible to just use code. In n8n, metrics are always numbers.

You need to add the logic to calculate the metrics for your workflow, at a point after it has produced the outputs. You can add any reference outputs your metric uses as a column in your dataset. This makes sure they it will be available in the workflow, since they will be output by the evaluation trigger.

Examples:

* [Correctness](https://n8n.io/workflows/4271): whether the output's meaning is consistent with a reference output.
* [Categorization](https://n8n.io/workflows/4269): whether the output exactly matches the expected output.
* Helpfulness: whether the answer addresses the question.
* [String similarity](https://n8n.io/workflows/4274): how close the output is to a reference output, measured character-by-character.
* [Tool calling](https://n8n.io/workflows/4268): whether the agent called the right tool.
* [RAG document relevance](https://n8n.io/workflows/4273): when working with a vector database, whether the documents retrieved are relevant to the question.
* RAG answer groundedness: when working with a vector database, whether the answer is ["grounded"](https://www.deepset.ai/blog/rag-llm-evaluation-groundedness) in the documents retrieved.

Calculating metrics can add latency and cost, so you may only want to do it when running an evaluation and avoid it when making a production execution. You can do this by putting the metric logic after a ['check if evaluating' operation](/integrations/builtin/core-nodes/n8n-nodes-base.evaluation.md#check-if-evaluating).

![Check if evaluating node](/_images/advanced-ai/evaluations/check-if-evaluating.png)

### 3. Write metrics back to evaluation

n8n needs to know how to extract the metrics you calculated in step 2. Do this by adding an evaluation node with the ['Set metrics' operation](/integrations/builtin/core-nodes/n8n-nodes-base.evaluation.md#set-metrics) and mapping your metrics into it.

![Add set metrics node](/_images/advanced-ai/evaluations/add-set-metrics.png)

This support ticket classification workflow shows the 'Set outputs' operation added and wired up. Since the metrics in this workflow just check whether the actual output is an exact match of the expected one, the workflow calculates them in an expression in the 'Set metrics' node rather than adding any further nodes to the workflow.

### 4. Run evaluation and view results

Switch to the **Evaluations** tab on your workflow and click the **Run evaluation** button. An evaluation will start. Once the evaluation has finished, it will display a summary score for each metric.

You can see the results for each test case by clicking on the test run row. Clicking on an individual test case will open the execution that produced it (in a new tab).
