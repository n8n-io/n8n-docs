---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Evaluations
description: Use n8n evaluations to build reliable AI workflows. Build confidence in your LLM-powered workflows by comparing the output from known test cases.
contentType: overview
---

# Overview

## What are evaluations?

Evaluation is a crucial technique for checking that your AI workflow is reliable. It can be the difference between a flaky proof of concept and a solid production workflow. It is important both in the building phase and after deploying to production. 

The foundation of evaluation is running a test dataset through your workflow. This dataset contains multiple test cases. Each test case contains a sample input for your workflow, and often includes the expected output(s) too.

Evaluation allows you to:

* **Test your workflow over a range of inputs** so you know how it performs on edge cases
* **Make changes with confidence** without accidentally making things worse elsewhere
* **Compare performance** across different models or prompts

## Why is evaluation needed?

AI models are fundamentally different to code. Code is deterministic and can be reasoned about. That is very difficult with LLMs, since they are black boxes. Instead, LLM outputs must be *measured*, by running data through them and observing the output. 

You can only build confidence that your model performs reliably after you have run it over multiple inputs that accurately reflect all the edge cases that it will have to deal with in production.

## Two types of evaluation

### Light evaluation (pre-deployment)

Building a clean, comprehensive dataset is hard. In the initial building phase, it often makes sense to generate just a handful of examples. These can be enough to iterate the workflow to a releasable state (or a proof of concept). You can visually compare the results to get a sense of the workflow's quality, without setting up formal metrics.

### Metric-based evaluation (post-deployment)

Once the workflow is deployed it's easier to build a bigger, more representative dataset from production executions. When a bug is discovered, the input that caused it can be added to the dataset. When fixing the bug, it's important to run the whole dataset over the workflow again as a [regression test](https://en.wikipedia.org/wiki/Regression_testing) to check that the fix hasn't accidentally made something else worse.

The quality of the outputs is measured using a metric, a numeric value representing a particular characteristic, since there are too many test cases to check individually. It also allows you to track quality changes to be tracked between runs.

### Comparison of evaluation types

|                                                     | Light evaluation (pre-deployment)       | Metric-based evaluation (post-deployment)      |
|-----------------------------------------------------|-----------------------------------------|------------------------------------------------|
| **Performance improvements<br>with each iteration** | Large                                   | Small                                          |
| **Dataset size**                                    | Small                                   | Large                                          |
| **Dataset sources**                                 | Hand-generated<br>AI-generated<br>Other | Production executions<br>AI-generated<br>Other |
| **Actual outputs**                                  | Required                                | Required                                       |
| **Expected outputs**                                | Optional                                | Required (usually)                             |
| **Evaluation** **metric**                           | Optional                                | Required                                       |
