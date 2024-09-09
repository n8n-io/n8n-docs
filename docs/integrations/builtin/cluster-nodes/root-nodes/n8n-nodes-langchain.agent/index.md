---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: AI Agent node documentation
description: Learn how to use the AI Agent node in n8n. Follow technical documentation to integrate AI Agent node into your workflows.
priority: critical
---

# AI Agent node

Use the AI Agent node to set which agent type you want to use.

On this page, you'll find the node parameters for the Agent node and links to more resources.

/// note | Connect a tool
You must connect at least one tool sub-node.
///

n8n provides several agents:

* **Tools Agent** (default): This agent uses external tools and APIs to perform actions and retrieve information. It can understand the capabilities of different tools and determine which tool to use depending on the task. This agent helps integrate LLMs with various external services and databases.
    /// note | Begin here
    n8n recommends using this agent for most use cases. It will handle most scenarios and provides the best experience when working with [tools](/advanced-ai/examples/understand-tools/).
    /// 
* **Conversational Agent**: This agent has human-like conversations. It can maintain context, understand user intent, and provide relevant answers. This agent is typically used for building chatbots, virtual assistants and customer support systems. If your preferred AI model doesn't support tool calling or you're handling simpler interactions, this agent is a good general option. 
* **OpenAI Functions Agent**: Use this agent with an [OpenAI functions model](https://platform.openai.com/docs/guides/gpt/function-calling){:target=_blank .external-link}. You must use the [OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/) with this agent.
* **Plan and Execute Agent**: This agent creates a high-level plan to solve the given task and then executes the plan step by step. It's most useful for tasks that require a structured approach and careful planning.
* **ReAct Agent**: This agent reasons about a given task, determines the necessary actions, and then executes them. It follows the cycle of reasoning and acting until it completes the task. The ReAct agent can break down complex tasks into smaller sub-tasks, prioritise them, and execute them one after the other.

    /// note | No memory
    The ReAct agent doesn't support memory sub-nodes. This means it can't recall previous prompts, or simulate an ongoing conversation.
    ///

* **SQL Agent**: This agent uses a SQL database as a data source. It can understand natural language questions, convert them into SQL queries, execute the queries, and present the results in a user-friendly format. This agent is valuable for building natural language interfaces to databases.

## Templates and examples
<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'agent') ]]

## Related resources

Refer to [LangChain's documentation on agents](https://js.langchain.com/docs/modules/agents/agent_types/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
