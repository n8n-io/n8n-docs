---
title: Think Tool node documentation
description: >-
  Learn how to use the Think Tool node in n8n. Follow technical documentation to
  integrate the Tool Think node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: Think Tool node documentation
originalFilePath: integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolthink.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolthink
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolthink
layout:
  description:
    visible: false
---

# Think Tool node <a href="#think-tool-node" id="think-tool-node"></a>

The Think Tool node is a tool[^1] that invites an agent[^2] to do some thinking before answering. Essentially, it allows the agent to reflect on the question by talking to itself before providing an answer. In particular, this is useful for complex queries that require a thoughtful response.


{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse Think Tool node documentation integration templates](https://n8n.io/integrations/think-tool) or [search all templates](https://n8n.io/workflows/)

### Prompting example <a href="#prompting-example" id="prompting-example"></a>

As an example, say you ask the agent:


> *Jack is looking at Anne. Anne is looking at George. Jack is married, George is not, and we don't know if Anne is married. Is a married person looking at an unmarried person?*

	
The agent will do its thinking with the tool:


> *We have the following information: 1. Jack is looking at Anne. 2. Anne is looking at George. 3. Jack is married. 4. George is not married. 5. We don't know if Anne is married or not.*

> *We need to determine if a married person is looking at an unmarried person. Let's consider both cases for Anne:*

> *Case 1: Anne is married.*

> - *If Anne is married, then she (married) is looking at George (unmarried). In this case, a married person (Anne) is looking at an unmarried person (George).*

> *Case 2: Anne is unmarried.*

> - *If Anne is unmarried, then Jack (married) is looking at Anne (unmarried). In this case, a married person (Jack) is looking at an unmarried person (Anne).*

> *In both scenarios, we find that a married person is looking at an unmarried person. Therefore, the answer to the question is yes.*

	
and then afterward provide the answer:


> *Yes, a married person is looking at an unmarried person. In both possible scenarios regarding Anne's marital status, we find that a married individual (either Jack or Anne) is looking at an unmarried individual (either George or Anne).*


## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tzB5H7fSmYiRvvv52e4P/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

[^1]: In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.
[^2]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
