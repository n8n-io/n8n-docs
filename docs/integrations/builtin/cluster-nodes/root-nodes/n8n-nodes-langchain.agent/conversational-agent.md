---
title: Conversational AI Agent node documentation
description: >-
  Learn how to use the Conversational Agent of the AI Agent node in n8n. Follow
  technical documentation to integrate the Conversational Agent into your
  workflows.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: Conversational AI Agent node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent
layout:
  description:
    visible: false
---

# Conversational AI Agent node <a href="#conversational-ai-agent-node" id="conversational-ai-agent-node"></a>

{% hint style="info" %}
**Feature removed**

n8n removed this functionality in February 2025.
{% endhint %}

The Conversational Agent has human-like conversations. It can maintain context, understand user intent, and provide relevant answers. This agent is typically used for building chatbots, virtual assistants, and customer support systems.

The Conversational Agent describes tools[^1] in the system prompt and parses JSON responses for tool calls. If your preferred AI model doesn't support tool calling or you're handling simpler interactions, this agent is a good general option. It's more flexible but may be less accurate than the [Tools Agent](tools-agent.md).

Refer to [AI Agent](README.md) for more information on the AI Agent node itself.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ATANgfFVHG8eIRH2Xynm/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

Configure the Conversational Agent using the following parameters.

### Prompt <a href="#prompt" id="prompt"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tALAgzlpmog5eZk893Ez/" %}

### Require Specific Output Format <a href="#require-specific-output-format" id="require-specific-output-format"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/FWz2tiBEchkNj9yOVoti/" %}

## Node options <a href="#node-options" id="node-options"></a>

Refine the Conversational Agent node's behavior using these options:

### Human Message <a href="#human-message" id="human-message"></a>

Tell the agent about the tools it can use and add context to the user's input.

You must include these expressions and variable:

* `{tools}`: A LangChain expression that provides a string of the tools you've connected to the Agent. Provide some context or explanation about who should use the tools and how they should use them.
* `{format_instructions}`: A LangChain expression that provides the schema or format from the output parser node you've connected. Since the instructions themselves are context, you don't need to provide context for this expression.
* `{{input}}`: A LangChain variable containing the user's prompt. This variable populates with the value of the **Prompt** parameter. Provide some context that this is the user's input.

Here's an example of how you might use these strings:

Example:

```
TOOLS
------
Assistant can ask the user to use tools to look up information that may be helpful in answering the user's original question. The tools the human can use are:

{tools}

{format_instructions}

USER'S INPUT
--------------------
Here is the user's input (remember to respond with a markdown code snippet of a JSON blob with a single action, and NOTHING else):

{{input}}
```

### System Message <a href="#system-message" id="system-message"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iItrx0Sif4nFlvnhRC32/" %}

### Max Iterations <a href="#max-iterations" id="max-iterations"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/5peNPbMzizpnVi5yyawQ/" %}

### Return Intermediate Steps <a href="#return-intermediate-steps" id="return-intermediate-steps"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/iCkxSCJ5heC6EkrCHxvn/" %}

### Tracing Metadata <a href="#tracing-metadata" id="tracing-metadata"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/8YMxu7WAgGuRiK8YvCjS/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>

Refer to the main AI Agent node's [Templates and examples](README.md#templates-and-examples) section.

## Common issues <a href="#common-issues" id="common-issues"></a>

For common questions or issues and suggested solutions, refer to [Common issues](common-issues.md).

[^1]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
