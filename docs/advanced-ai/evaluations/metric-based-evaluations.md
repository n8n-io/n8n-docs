# Metric-based evaluation

/// note | Available on Pro and Enterprise plans
Metric-based evaluation is available on Pro and Enterprise plans. Registered community and Starter plan users can also use it for a single workflow.
///

### What it is

Once your workflow is ready for deployment, you often want to test it on more examples than [when you were building it](/advanced-ai/evaluations/light-evaluations.md).

For example, when production executions start to turn up edge cases, you want to add them to your test dataset so that you can make sure they're covered.

For large datasets like the ones built from production data, it can be hard to get a sense of performance just by eyeballing the results. Instead, performance must be measured. Each test run is assigned one or more scores which can be compared to previous runs, and rolled up to measure performance on the whole dataset. 

This feature allows you to run evaluations that calculate metrics, track how those metrics change between runs and drill down into the reasons for those changes.

Metrics can be deterministic functions (such as the distance between two strings) or they can be calculated using AI. Metrics often involve checking how far away the output is from a *reference output* (also called ground truth). To do so, the dataset must contain that reference output. Some evaluations don't need this reference output though (for example, checking text for sentiment or toxicity).

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

We'll illustrate the following steps with the same support ticket classification workflow from the light evaluation docs:

![Light evaluation workflow](_images/advanced-ai/evaluations/light-evaluation-workflow.png)

### 2. Calculate metrics

Metrics are dimensions used to score the output of your workflow. They often compare the actual workflow output with a reference output. Many are calculated using AI, although some can be calculated just using code. In n8n, metrics are always numbers.

You need to add the logic to calculate the metrics for your workflow, at a point after the outputs have been produced. Any reference outputs your metric uses can be added as a column in your dataset. This makes sure they it will be available in the workflow, since they will be output by the evaluation trigger.

Examples:

* Correctness: whether the output is consistent with a reference output
* Helpfulness: whether the answer addresses the question
* String similarity: how close the output is to a reference output, measured character-by-character
* Tool calling: whether the right tool was called by an agent
* RAG document relevance: when working with a vector database, whether the documents retrieved are relevant to the question
* RAG answer groundedness: when working with a vector database, whether the answer is grounded in the documents retrieved

Calculating metrics can add latency and cost, so you may only want to do it when running an evaluation and avoid it when making a production execution. You can do this by putting the metric logic after a 'check if evaluating' operation.

![Check if evaluating node](_images/advanced-ai/evaluations/check-if-evaluating.png)

### 3. Write metrics back to evaluation

n8n needs to know how to extract the metrics you calculated in step 2. Do this by adding a 'Set metrics' node and mapping your metrics into it.

<figure markdown="span">
![Add set metrics node](/_images/advanced-ai/evaluations/add-set-metrics.png)
<figcaption>The support ticket classification workflow with the 'set outputs' operation added in and wired up. Since the metrics in this workflow just check whether the actual output exactly matches the expected one, we calculate them in an expression in the 'set metrics' node rather than adding any extra nodes to the workflow.</figcaption>
</figure>

### 4. Run evaluation and view results

Switch to the **Evaluations** tab on your workflow and click the **Run evaluation** button. An evaluation will start. Once the evaluation has finished an overall score for each metric is displayed.

You can see the results for each test case by clicking on the test run row. Clicking on an individual test case will open the execution that produced it (in a new tab).
