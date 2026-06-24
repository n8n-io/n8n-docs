---
title: Wolfram|Alpha tool node documentation
description: >-
  Learn how to use the Wolfram|Alpha tool node in n8n. Follow technical
  documentation to integrate Wolfram|Alpha tool node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Wolfram|Alpha tool node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwolframalpha.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwolframalpha
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwolframalpha
layout:
  description:
    visible: false
---

# Wolfram|Alpha tool node <a href="#wolframoralpha-tool-node" id="wolframoralpha-tool-node"></a>

Use the Wolfram|Alpha tool node to connect your agents[^1] and chains[^2] to Wolfram|Alpha's computational intelligence engine.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/wolframalpha.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Wolfram|Alpha tool node documentation integration templates](https://n8n.io/integrations/wolframoralpha) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Wolfram|Alpha's documentation](https://products.wolframalpha.com/api) for more information about the service. You can also view [LangChain's documentation on their WolframAlpha Tool](https://js.langchain.com/docs/integrations/tools/wolframalpha/).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
[^2]: AI chains allow you to interact with large language models (LLMs) and other resources in sequences of calls to components. AI chains in n8n don't use persistent memory, so you can't use them to reference previous context (use AI agents for this).
