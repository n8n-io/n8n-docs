# Evaluation docs

Pages

- Overview
- Light evaluation
- Metric-based evaluation
- Tips and common issues

# Overview

## What is evaluation?

Evaluation is a crucial technique for checking that your AI workflow is reliable. It can be the difference between a flaky proof of concept and a solid production workflow. It is important both in the building phase and after deploying to production. 

The foundation of evaluation is running a test dataset through your workflow. This dataset contains multiple test cases. Each test case contains a sample input for your workflow, and often includesusually the expected output(s) too.

Evaluation allows you to:

- **Test your workflow over a range of inputs**, so you know how it performs on edge cases
- **Make changes with confidence** — without accidentally making things worse elsewhere
- **Compare performance** across different models or prompts

## Why is evaluation needed?

AI models are fundamentally different to code. Code is deterministic and can be reasoned about. That is very difficult with LLMs, since they are black boxes. Instead, LLM outputs must be *measured*, by running data through them and observing the output. 

You can only be sure your model performs reliably after you have run it over multiple inputs that accurately reflect all the edge cases that it will have to deal with in production.

## Two types of evaluation

### **Light evaluation (pre-deployment)**

Building a clean, comprehensive dataset is hard. In the initial building phase, it often makes sense to generate just a handful of examples. TheseThat can be enough to iterate the workflow to a releasable state (or a proof of concept). You can visually compareeyeball the results to get a sense of the workflow’s quality, without setting up formal metrics.

### **Metric-based evaluation (post-deployment)**

Once the workflow is deployed it’s easier to build a bigger, more representative dataset (e.g. from production executions). When a bug is discovered, the input that caused it can be added to the dataset. When fixing the bug, it’s important to run the whole dataset over the workflow again to check that the fix hasn’t accidentally made something else worse.

The quality of the outputs is measured using a metric, since there are too many test cases to eyeball. It also allows you to track quality changes to be tracked between runs.

### Comparison of evaluation types

|  | **Light evaluation (pre-deployment)** | **Metric-based evaluation (post-deployment)** |
| --- | --- | --- |
| **Performance improvements with each iteration** | Large | Small |
| **Dataset size** | Small | Large |
| **Dataset sources** | Hand-generated
AI-generated
Other | Production executions
AI-generated
Other |
| **Actual outputs** | Required | Required |
| **Expected outputs** | Optional | Required (usually) |
| **Evaluation** **metric** | Optional | Required |

# Light evaluation

<aside>

Light evaluation is available to registered community users and on all paid plans.

</aside>

## What it is

When building your workflow, you often want to test it withover a handful of examples to get a sense of how it performs and make improvements. Just eyeballing the workflow outputs for each example is enough — you don’t need to set up [formal scoring or metrics] yet.

Light evaluation allows you to run the examples in a test dataset through your workflow one-by-one, writing the outputs back to your dataset. You can then examine those outputs next to each other, and visually compare them to the expected outputs (if you have them).

## Prerequisites

Access to Google Sheets, since this is where you will define your test dataset.

## How it works

Light evaluation takes place in the ‘Editor’ tab of your workflow, although you’ll find instructions on how to set it up in the ‘Evaluations’ tab.

Steps:

1. Create a dataset
2. Wire the dataset up to the workflow
3. Write workflow outputs back to dataset
4. Run evaluation

The following explanation will use a sample workflow that assigns a category and priority to incoming support tickets.

![CleanShot 2025-05-15 at 05.54.15@2x.png](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_05.54.152x.png)

### 1. Create a dataset

Create a Google Sheet with a handful of examples for your workflow. Your sheet should contain column(s) for:

- The workflow input
- The expected (or correct) workflow output [optional]
- The actual output

Leave the actual output column(s) blank, since you’ll be filling them during the evaluation.

![a [sample dataset](https://docs.google.com/spreadsheets/d/1uuPS5cHtSNZ6HNLOi75A2m8nVWZrdBZ_Ivf58osDAS8/edit?gid=294497137#gid=294497137) for our support ticket classification workflow](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_05.56.172x.png)

a [sample dataset](https://docs.google.com/spreadsheets/d/1uuPS5cHtSNZ6HNLOi75A2m8nVWZrdBZ_Ivf58osDAS8/edit?gid=294497137#gid=294497137) for our support ticket classification workflow

### 2. Wire the dataset up to your workflow

**Insert an evaluation trigger to pull in your dataset**

Each time the evaluation trigger runs, it will output a single item representing one row of your dataset.

Clicking the ‘Evaluate all’ button to the left of the evaluation trigger will run your workflow multiple times in sequence, once for each row in your dataset. This is a special behavior of the evaluation trigger.

While wiring the trigger up, you often only want to run it once. You can do this by either:

- Setting the trigger’s ‘Max rows to process’ to 1
- Clicking on the ‘Execute node’ button on the trigger (rather than the ‘Evaluate all’ button)

**Wire the trigger up to your workflow**

You can now connect the evaluation trigger to the rest of your workflow and reference the data that it outputs. At a minimum, you need to use the dataset’s input column(s) later in the workflow.

If you have multiple triggers in your workflow you will need to [merge their branches together].

![Our support ticket classification workflow with the evaluation trigger added in and wired up](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_05.58.202x.png)

Our support ticket classification workflow with the evaluation trigger added in and wired up

### 3. Write workflow outputs back to dataset

To populate the output column(s) of your dataset when the evaluation runs:

- Insert the ‘Set outputs’ action of the evaluation node
- Wire it up to your workflow at a point after the outputs you’re evaluating have been produced
- In the node’s parameters, map the workflow outputs into the correct dataset column

![Our support ticket classification workflow with the ‘set outputs’ operation added in and wired up](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_06.04.262x.png)

Our support ticket classification workflow with the ‘set outputs’ operation added in and wired up

### 4. Run evaluation

Click on the ‘Execute workflow’ button to the left of the evaluation trigger. The workflow will execute multiple times, once for each row of the dataset.

![CleanShot 2025-05-15 at 06.06.39@2x.png](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_06.06.392x.png)

Review the outputs of each execution in the Google Sheet, and examine the execution details using the workflow’s ‘executions’ tab if you need to.

Once your dataset grows past a handful of examples, consider [metric-based evaluation] to get a numerical view of performance. See also [tips and common issues].

# Metric-based evaluation

<aside>

Metric-based evaluation is available on Pro and Enterprise plans. Registered community and Starter plan users can also use it for one workflow.

</aside>

### What it is

Once your workflow is ready for deployment, you often want to test it on more examples than [when you were building it].

For example, when production executions start to turn up edge cases, you want to add them to your test dataset so that you can make sure they’re covered.

For large datasets like the ones built from production data, it can be hard to get a sense of performance just by eyeballing the results. Instead, performance must be measured. Each test run is assigned one or more scores which can be compared to previous runs, and rolled up to measure performance on the whole dataset. 

This feature allows you to run evaluations that calculate metrics, track how those metrics change between runs and drill down into the reasons for those changes.

Metrics can be deterministic functions (such as the distance between two strings) or they can be calculated using AI. Metrics often involve checking how far away the output is from a *reference output* (also called ground truth). To do so, the dataset must contain that reference output. Some evaluations don’t need this reference output though (e.g. checking text for sentiment or toxicity).

## Prerequisites

Access to Google Sheets, since this is where you will define your test dataset.

## How it works

1. Set up [light evaluation]
2. Calculate metrics
3. Write metrics back to evaluation
4. Run evaluation and view results

### 1. Set up light evaluation

Follow the [setup instructions] to create a dataset and wire it up to your workflow, writing outputs back to the dataset.

We’ll illustrate the following steps with the same support ticket classification workflow from the light evaluation docs.

![CleanShot 2025-05-15 at 06.08.55@2x.png](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_06.08.552x.png)

### 2. Calculate metrics

Metrics are dimensions used to score the output of your workflow. They often compare the actual workflow output with a reference output. Many are calculated using AI, although some can be calculated just using code. In n8n, metrics are always numbers.

You need to add the logic to calculate the metric(s) to your workflow, at a point after the outputs have been produced. Any reference outputs your metric uses can be added as a column in your dataset. This makes sure they it will be available in the workflow, since they will be output by the evaluation trigger.

**Examples** (with links to templates):

- Correctness: whether the output is consistent with a reference output
- Helpfulness: whether the answer addresses the question
- String similarity: how close the output is to a reference output, measured character-by-character
- Tool calling: whether the right tool was called by an agent
- RAG document relevance: when working with a vector database, whether the documents retrieved are relevant to the question
- RAG answer groundedness: when working with a vector database, whether the answer is grounded in the documents retrieved
- ~~[Token usage]~~
- ~~[Execution time]~~

Calculating metrics can add latency and cost, so you may only want to do it when running an evaluation and avoid it when making a production execution. You can do this by putting the metric logic after a ‘check if evaluating’ operation.

![CleanShot 2025-05-15 at 06.11.35@2x.png](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_06.11.352x.png)

### 3. Write metrics back to evaluation

n8n needs to know how to extract the metrics you calculated in step 2. Do this by adding a ‘Set metrics’ node and mapping your metrics into it.

![Our support ticket classification workflow with the ‘set outputs’ operation added in and wired up. Since the metrics in this workflow just check whether the actual output exactly matches the expected one, we calculate them in an expression in the ‘set metrics’ node rather than adding any extra nodes to the workflow.](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_06.09.462x.png)

Our support ticket classification workflow with the ‘set outputs’ operation added in and wired up. Since the metrics in this workflow just check whether the actual output exactly matches the expected one, we calculate them in an expression in the ‘set metrics’ node rather than adding any extra nodes to the workflow.

### 4. Run evaluation and view results

Switch to the ‘Evaluations’ tab on your workflow and click the ‘Run evaluation’ button. An evaluation will start. Once the evaluation has finished an overall score for each metric is displayed.

You can see the results for each test case by clicking on the test run row. Clicking on an individual test case will open the execution that produced it (in a new tab).

# Tips and common issues

## Combining multiple triggers

If you have another trigger in the workflow already, you have two potential starting points: that trigger and the evaluation trigger. In order to make sure your workflow works as expected no matter which trigger is executed, you will need to merge these branches together.

![Logic to merge two trigger branches together so that they have the same data format and can be referenced from a single node](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_06.02.012x.png)

Logic to merge two trigger branches together so that they have the same data format and can be referenced from a single node

To do so:

1. **Get the data format of the other trigger**
    - Execute the other trigger
    - Open it and navigate to the JSON view of its output pane
    - Click the ‘copy’ button on the right
2. **Re-shape the evaluation trigger data to match**
    - Insert a ‘Set’ node after the evaluation trigger and connect them together
    - Change its mode to ‘JSON’
    - Paste your data into the ‘JSON’ field, removing the `[` and `]` on the first and last lines
    - Switch the field type to ‘Expression’
    - Map in the data from the trigger by dragging it from the input pane
    - For strings, make sure to replace the entire value (including the quotes) and add `.toJsonString()` to the end of the expression
3. **Merge the branches using a ‘No-op’ node**
    - Insert a ‘No-op’ node and wire both the other trigger and the ‘Set’ node up to it. (The ‘No-op’ node just outputs whatever input it receives.)
4. **Reference the ‘No-op’ node outputs in the rest of the workflow**
    - Since both paths will flow through this node with the same format, you can be sure that your input data will always be there

## Avoiding evaluation breaking the chat

n8n’s internal chat reads the output data of the last executed node in the workflow. After adding a ‘set outputs’ node, this data may not be in the expected format, or even contain the chat response.

![CleanShot 2025-05-15 at 06.41.21@2x.png](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_06.41.212x.png)

The solution is to add an extra branch coming out of your agent. Lower branches are executed later in n8n, which means any node you attach to this branch will be executed last. You can use a no-op node here since it only needs to pass the agent output through.

## Accessing tool data when calculating metrics

Sometimes you need to know what happened in executed sub-nodes of an agent, for example to check whether a tool was executed. You can’t reference these nodes directly with expressions, but you can enable the ‘Return intermediate steps’ option in the agent. This will add an extra output field called `intermediateSteps` which you can use in later nodes.

![CleanShot 2025-05-15 at 06.30.44@2x.png](Evaluation%20docs%201ea5b6e0c94f80c1bcaad2e1dab33a5e/CleanShot_2025-05-15_at_06.30.442x.png)

## Multiple evaluations in the same workflow

You can only have one evaluation set up per workflow. In other words, you can only have one evaluation trigger per workflow.

However, you can still test different parts of your workflow with different evaluations by putting those parts in [sub-workflows] and evaluating each sub-workflow.

## Dealing with inconsistent results

Metrics can often have noise: they may be different across evaluation runs of the exact same workflow. This is because the workflow itself may return different results, or any LLM-based metrics might have natural variation in them.

You can compensate for this by duplicating the rows of your dataset, so that each row appears more than once in the dataset. Since this means that each input will effectively be running multiple times, any variation will be smoothed out.