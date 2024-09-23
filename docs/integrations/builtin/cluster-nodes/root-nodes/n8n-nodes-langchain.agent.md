---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: AI Agent node documentation
description: Learn how to use the AI Agent node in n8n. Follow technical documentation to integrate AI Agent node into your workflows.
contentType: integration
priority: critical
---

# AI Agent node

Use the Agent node to set which agent type you want to use.

On this page, you'll find the node parameters for the Agent node, and links to more resources.

/// note | Connect a tool
You must connect at least one tool sub-node.
///

n8n provides several agents. The tool agent is the default. n8n recommends using this for most use cases: it will handle most scenarios and provides the best experience when working with [tools](/advanced-ai/examples/understand-tools/). If your preferred AI model doesn't support tools, the conversational agent is a good general option.

## Conversational Agent

This agent is optimised for conversation allowing it to chat with the user.

--8<-- "_snippets/integrations/builtin/cluster-nodes/use-with-chat-trigger.md"

### Parameters

#### Text

The input from the chat. This is the user's query, also known as the prompt.

### Options

#### Human Message

Tell the agent about the tools it can use, and add context to the user's input.

You must include:

* `{tools}`: a LangChain expression. Provides a string of the tools you've connected to the Agent.
* `{format_instructions}`: a LangChain expression. Provides the schema or format from the output parser node you've connected.
* `{{input}}`: a LangChain variable. The user's prompt. Populated with the value of the **Text** parameter.

Example:

```
TOOLS
------
Assistant can ask the user to use tools to look up information that may be helpful in answering the users original question. The tools the human can use are:

{tools}

{format_instructions}

USER'S INPUT
--------------------
Here is the user's input (remember to respond with a markdown code snippet of a json blob with a single action, and NOTHING else):

{{input}}
```

#### System Message 

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/system-message.md"

#### Max Iterations

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/max-iterations.md"

#### Return Intermediate Steps

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/return-intermediate-steps.md"

## OpenAI Functions Agent 

Use the OpenAI Functions Agent node to use an [OpenAI functions model](https://platform.openai.com/docs/guides/gpt/function-calling){:target=_blank .external-link}. These are models that detect when a function should be called and respond with the inputs that should be passed to the function.

--8<-- "_snippets/integrations/builtin/cluster-nodes/use-with-chat-trigger.md"

You must use the [OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/) with this agent.

### Parameters

#### Text

The input from the chat. This is the user's query, also known as the prompt.

## ReAct Agent 

The ReAct Agent node implements [ReAct](https://react-lm.github.io/){:target=_blank .external-link} logic. ReAct (reasoning and action) brings together the reasoning powers of chain-of-thought prompting and action plan generation.

/// note | No memory
The ReAct agent doesn't support memory sub-nodes. This means it can't recall previous prompts, or simulate an ongoing conversation.
///

### Parameters

#### Text

The input from the chat. This is the user's query, also known as the prompt.

### Options

Use the options to create a message to send to the agent at the start of the conversation. The message type depends on the model you're using.

* Chat models: these models have the concept of three components interacting (AI, system, and human). They can receive system messages and human messages (prompts).
* Instruct models: these models don't have the concept of separate AI, system, and human components. They receive one body of text, the instruct message.

#### Human Message Template

Use this to extend the user prompt. This is a way for the agent to pass information from one iteration to the next.

Available LangChain expressions:

* `{input}`: contains the user prompt.
* `{agent_scratchpad}`: information to remember for the next iteration.

#### Prefix Message

Add text to prefix the tools list at the start of the conversation. You don't need to add the list of tools. LangChain automatically adds this.

#### Suffix Message for Chat Model

The final part of the system message. Sent before the user prompt.

#### Suffix Message for Regular Model

The final part of the message. Sent before the user prompt.

#### Return Intermediate Steps

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/return-intermediate-steps.md"

## SQL Agent 

The SQL Agent uses a SQL database as a data source. The agent builds a SQL query based on the natural language query in the prompt.

/// note | Postgres and MySQL Agents
If you are using Postgres or MySQL this doesn't support the tunnel options you can set in the credential.
///

### Data Source

Options:

* MySQL
* SQLite
* Postgres

/// note | SQLite
To use SQLite you will need to use a [Read/Write File From Disk](/integrations/builtin/core-nodes/n8n-nodes-base.filesreadwrite/) node before the Agent to read your SQLite file. 
///

### Prompt

The query to run on the data.

### Options

Use the options to refine the agent's behavior.

* Ignored Tables: comma-separated list of tables to ignore from the database. If empty, no tables are ignored.
* Include Sample Rows: number of sample rows to include in the prompt to the agent. It helps the agent to understand the schema of the database but it also increases the amount of tokens used.
* Included Tables: comma-separated list of tables to include in the database. If empty, all tables are included.
* Prefix Prompt: set the initial message.
* Suffix Prompt: set the final part of the message. Includes the user input and agent scratchpad. 
* Top K: number of database results the agent should keep in its context.

You can view prompt examples in the node.

## Tools Agent 

This agent has an enhanced ability to work with tools, and can ensure a standard output format.

The Tools Agent implements [Langchain's tool calling](https://js.langchain.com/docs/modules/agents/agent_types/tool_calling){:target=_blank .external-link} interface. This interface describes available tools and their schemas. The agent also has improved output parsing capabilities, as it passes the parser to the model as a formatting tool.

--8<-- "_snippets/integrations/builtin/cluster-nodes/use-with-chat-trigger.md"

This agent supports the following chat models:

* [OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/)
* [Groq Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgroq/)
* [Mistral Cloud Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud/)
* [Anthropic Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic/)
* [Azure OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatazureopenai/)

### Parameters

#### Text

The input from the chat. This is the user's query, also known as the prompt.

### Options

#### System Message 

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/system-message.md"

#### Max Iterations

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/max-iterations.md"

#### Return Intermediate Steps

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-root-nodes/return-intermediate-steps.md"

## Templates and examples
<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'agent') ]]

## Related resources

Refer to [LangChain's documentation on agents](https://js.langchain.com/docs/modules/agents/agent_types/){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
