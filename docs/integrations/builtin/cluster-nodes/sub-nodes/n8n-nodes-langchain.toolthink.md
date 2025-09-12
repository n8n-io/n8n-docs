---
title: Think Tool node documentation
description: Learn how to use the Think Tool node in n8n. Follow technical documentation to integrate the Tool Think node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Think Tool node

The Think Tool node is a [tool](/glossary.md#ai-tool) that invites an [agent](/glossary.md#ai-agent) to do some thinking before answering. Essentially, it allows the agent to reflect on the question by talking to itself before providing an answer. In particular, this is useful for complex queries that require a thoughtful response.


--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'think-tool') ]]

### Prompting example

As an example, say you ask the agent:

<!-- vale off -->
> *Jack is looking at Anne. Anne is looking at George. Jack is married, George is not, and we don't know if Anne is married. Is a married person looking at an unmarried person?*
<!-- vale on -->
	
The agent will do its thinking with the tool:

<!-- vale off -->
> *We have the following information: 1. Jack is looking at Anne. 2. Anne is looking at George. 3. Jack is married. 4. George is not married. 5. We don't know if Anne is married or not.*

> *We need to determine if a married person is looking at an unmarried person. Let's consider both cases for Anne:*

> *Case 1: Anne is married.*

> - *If Anne is married, then she (married) is looking at George (unmarried). In this case, a married person (Anne) is looking at an unmarried person (George).*

> *Case 2: Anne is unmarried.*

> - *If Anne is unmarried, then Jack (married) is looking at Anne (unmarried). In this case, a married person (Jack) is looking at an unmarried person (Anne).*

> *In both scenarios, we find that a married person is looking at an unmarried person. Therefore, the answer to the question is yes.*
<!-- vale on -->
	
and then afterward provide the answer:

<!-- vale off -->
> *Yes, a married person is looking at an unmarried person. In both possible scenarios regarding Anne's marital status, we find that a married individual (either Jack or Anne) is looking at an unmarried individual (either George or Anne).*
<!-- vale on -->

## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/tools-link.md"

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"


