---
title: OpenAI Functions Agent node documentation
contentType:
  - integration
  - reference
priority: critical
nodeTitle: OpenAI Functions Agent node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/openai-functions-agent.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/openai-functions-agent
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/openai-functions-agent
description: >-
  Learn how to use the OpenAI Functions Agent of the AI Agent node in n8n.
  Follow technical documentation to integrate the OpenAI Functions Agent into
  your workflows.
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

# OpenAI Functions Agent

Use the OpenAI Functions Agent node to use an [OpenAI functions model](https://platform.openai.com/docs/guides/function-calling). These are models that detect when a function should be called and respond with the inputs that should be passed to the function.

Refer to [AI Agent](./) for more information on the AI Agent node itself.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ATANgfFVHG8eIRH2Xynm/" %}

{% hint style="info" %}
**OpenAI Chat Model required**

You must use the [OpenAI Chat Model](../../sub-nodes/n8n-nodes-langchain.lmchatopenai/) with this agent.
{% endhint %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the OpenAI Functions Agent using the following parameters.

### Prompt <a href="#prompt" id="prompt"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tALAgzlpmog5eZk893Ez/" %}

### Require Specific Output Format <a href="#require-specific-output-format" id="require-specific-output-format"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/FWz2tiBEchkNj9yOVoti/" %}

## Node options <a href="#node-options" id="node-options"></a>

Refine the OpenAI Functions Agent node's behavior using these options:

### System Message <a href="#system-message" id="system-message"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iItrx0Sif4nFlvnhRC32/" %}

### Max Iterations <a href="#max-iterations" id="max-iterations"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/5peNPbMzizpnVi5yyawQ/" %}

### Return Intermediate Steps <a href="#return-intermediate-steps" id="return-intermediate-steps"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iCkxSCJ5heC6EkrCHxvn/" %}

### Tracing Metadata <a href="#tracing-metadata" id="tracing-metadata"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8YMxu7WAgGuRiK8YvCjS/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

Refer to the main AI Agent node's [Templates and examples](./#templates-and-examples) section.

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).
