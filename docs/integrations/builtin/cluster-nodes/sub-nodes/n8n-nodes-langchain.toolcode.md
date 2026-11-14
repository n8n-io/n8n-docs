---
title: Custom Code Tool node documentation
description: >-
  Learn how to use the Custom Code Tool node in n8n. Follow technical
  documentation to integrate Custom Code Tool node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: Custom Code Tool node documentation
originalFilePath: integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode
layout:
  description:
    visible: false
---

# Custom Code Tool node <a href="#custom-code-tool-node" id="custom-code-tool-node"></a>

Use the Custom Code Tool node to write code that an agent[^1] can run.

On this page, you'll find the node parameters for the Custom Code Tool node and links to more resources.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Description <a href="#description" id="description"></a>

Give your custom code a description. This tells the agent when to use this tool. For example:

> Call this tool to get a random color. The input should be a string with comma separated names of colors to exclude.

### Language <a href="#language" id="language"></a>

You can use JavaScript or Python.

### JavaScript / Python box <a href="#javascript-python-box" id="javascript-python-box"></a>

Write the code here.

You can access the tool input using `query`. For example, to take the input string and lowercase it:

```js
let myString = query;
return myString.toLowerCase();
```

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Custom Code Tool node documentation integration templates](https://n8n.io/integrations/code-tool) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/Yl56nEscwQQAbBUeWfvp/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
