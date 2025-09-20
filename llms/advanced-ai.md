

# advanced-ai/examples/agent-chain-comparison.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
title: Agents vs chains
description: A workflow example that demonstrates key differences between agents and chains.
---

# Demonstration of key differences between agents and chains

In this workflow you can choose whether your chat query goes to an [agent](/glossary.md#ai-agent) or [chain](/glossary.md#ai-chain). It shows some of the ways that agents are more powerful than chains.

[[ workflowDemo("file:///advanced-ai/examples/agents_vs_chains.json") ]]

## Key features

This workflow uses:

* [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md): start your workflow and respond to user chat interactions. The node provides a customizable chat interface.
* [Switch node](/integrations/builtin/core-nodes/n8n-nodes-base.switch.md): directs your query to either the agent or chain, depending on which you specify in your query. If you say "agent" it sends it to the agent. If you say "chain" it sends it to the chain.
* [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md): the Agent node interacts with other components of the workflow and makes decisions about what [tools](/glossary.md#ai-tool) to use.
* [Basic LLM Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm.md): the Basic LLM Chain node supports chatting with a connected LLM, but doesn't support [memory](/glossary.md#ai-memory) or tools.


## Using the example

--8<-- "_snippets/examples-color-key.md"


# advanced-ai/examples/api-workflow-tool.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
title: Call an API to fetch data
description: Use the n8n workflow tool to load data from an API using the HTTP Request node into your AI workflow.
---

# Call an API to fetch data

Use n8n to bring data from any [API](/glossary.md#api) to your AI. This workflow uses the [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) to provide the chat interface, and the [Call n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md) to call a second workflow that calls the API. The second workflow uses AI functionality to refine the API request based on the user's query.

[[ workflowDemo("file:///advanced-ai/examples/let_your_ai_call_an_api.json") ]]

## Key features

This workflow uses:

* [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md): start your workflow and respond to user chat interactions. The node provides a customizable chat interface.
* [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md): the key piece of the AI workflow. The Agent interacts with other components of the workflow and makes decisions about what tools to use.
* [Call n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md): plug in n8n workflows as custom tools. In AI, a tool is an interface the AI can use to interact with the world (in this case, the data provided by your workflow). The AI model uses the tool to access information beyond its built-in dataset.
* A [Basic LLM Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm.md) with an [Auto-fixing Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserautofixing.md) and [Structured Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/index.md) to read the user's query and set parameters for the API call based on the user input.

## Using the example

--8<-- "_snippets/examples-color-key.md"


# advanced-ai/examples/data-google-sheets.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
title: Chat with a Google Sheet using AI
description: Use the n8n workflow tool to load data from Google Sheets into your AI workflow.
---

# Chat with a Google Sheet using AI

Use n8n to bring your own data to AI. This workflow uses the [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) to provide the chat interface, and the [Call n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md) to call a second workflow that queries Google Sheets.

[[ workflowDemo("file:///advanced-ai/examples/chat_with_google_sheets_docs_version.json") ]]

## Key features

This workflow uses:

* [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md): start your workflow and respond to user chat interactions. The node provides a customizable chat interface.
* [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md): the key piece of the AI workflow. The Agent interacts with other components of the workflow and makes decisions about what tools to use.
* [Call n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md): plug in n8n workflows as custom tools. In AI, a tool is an interface the AI can use to interact with the world (in this case, the data provided by your workflow). The AI model uses the tool to access information beyond its built-in dataset.


## Using the example

--8<-- "_snippets/examples-color-key.md"


# advanced-ai/examples/human-fallback.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
title: Set a human fallback for AI workflows
description: Have a workflow that triggers a human answer when the AI can't help.
---

# Have a human fallback for AI workflows

This is a workflow that tries to answer user queries using the standard GPT-4 model. If it can't answer, it sends a message to Slack to ask for human help. It prompts the user to supply an email address.

This workflow uses the [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) to provide the chat interface, and the [Call n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md) to call a second workflow that handles checking for email addresses and sending the Slack message. 

[[ workflowDemo("file:///advanced-ai/examples/ask_a_human.json") ]]

## Key features

This workflow uses:

* [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md): start your workflow and respond to user chat interactions. The node provides a customizable chat interface.
* [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md): the key piece of the AI workflow. The Agent interacts with other components of the workflow and makes decisions about what tools to use.
* [Call n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md): plug in n8n workflows as custom tools. In AI, a tool is an interface the AI can use to interact with the world (in this case, the data provided by your workflow). It allows the AI model to access information beyond its built-in dataset.

## Using the example

--8<-- "_snippets/examples-color-key.md"


# advanced-ai/examples/introduction.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
title: Advanced AI examples and concepts
description: Example workflows and use cases for building AI functionality using n8n.
hide:
  - toc
---

# Advanced AI examples and concepts

This section provides explanations of important AI concepts, and workflow templates that highlight those concepts, with explanations and configuration guides. The examples cover common use cases and highlight different features of advanced AI in n8n.

<div class="grid cards" markdown>

-   __Agents and chains__

	Learn about [agents](/glossary.md#ai-agent) and [chains](/glossary.md#ai-chain) in AI, including exploring key differences using the example workflow.

	[:octicons-arrow-right-24: What's a chain in AI?](/advanced-ai/examples/understand-chains.md)  
    [:octicons-arrow-right-24: What's an agent in AI?](/advanced-ai/examples/understand-agents.md)  
	[:octicons-arrow-right-24: Demonstration of key differences between agents and chains](/advanced-ai/examples/agent-chain-comparison.md) 

-   __Call n8n Workflow Tool__

    Learn about [tools](/glossary.md#ai-tool) in AI, then explore examples that use n8n workflows as custom tools to give your AI workflow access to more data.

	[:octicons-arrow-right-24: What's a tool in AI?](/advanced-ai/examples/understand-tools.md)  
    [:octicons-arrow-right-24: Chat with Google Sheets](/advanced-ai/examples/data-google-sheets.md)  
	[:octicons-arrow-right-24: Call an API to fetch data](/advanced-ai/examples/api-workflow-tool.md)  
	[:octicons-arrow-right-24: Set up a human fallback](/advanced-ai/examples/human-fallback.md)  
	[:octicons-arrow-right-24: Let AI specify tool parameters with `$fromAI()`](/advanced-ai/examples/using-the-fromai-function.md)

-   __Vector databases__

    Learn about [vector databases](/glossary.md#ai-vector-store) in AI, along with related concepts including [embeddings](/glossary.md#ai-embedding) and retrievers.

	[:octicons-arrow-right-24: What's a vector database?](/advanced-ai/examples/understand-vector-databases.md)  
    [:octicons-arrow-right-24: Populate a Pinecone vector database from a website](/advanced-ai/examples/vector-store-website.md)   

-   __Memory__

    Learn about [memory](/glossary.md#ai-memory) in AI.

	[:octicons-arrow-right-24: What's memory in AI?](/advanced-ai/examples/understand-memory.md)  

-   __AI workflow templates__

	You can browse AI templates, included community contributions, on the n8n website. 

    [:octicons-arrow-right-24: Browse all AI templates](https://n8n.io/workflows/?categories=25){:target=_blank .external-link}


   
</div>


# advanced-ai/examples/understand-agents.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What's an agent in AI?
description: Understand agents in the context of AI. Learn how n8n provides agents.
contentType: explanation
---

# What's an agent in AI?

One way to think of an [agent](/glossary.md#ai-agent) is as a [chain](/advanced-ai/examples/understand-chains.md) that knows how to make decisions. Where a chain follows a predetermined sequence of calls to different AI components, an agent uses a language model to determine which actions to take.

Agents are the part of AI that act as decision-makers. They can interact with other agents and [tools](/glossary.md#ai-tool). When you send a query to an agent, it tries to choose the best tools to use to answer. Agents adapt to your specific queries, as well as the prompts that configure their behavior.

## Agents in n8n

n8n provides one Agent node, which can act as different types of agent depending on the settings you choose. Refer to the [Agent node documentation](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md) for details on the available agent types.

When execute a workflow containing an agent, the agent runs multiple times. For example, it may do an initial setup, followed by a run to call a tool, then another run to evaluate the tool response and respond to the user.


# advanced-ai/examples/understand-chains.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What's a chain in AI?
description: Understand chains in the context of AI. Learn about chains in n8n.
contentType: explanation
---

# What's a chain in AI?

[Chains](/glossary.md#ai-chain) bring together different components of AI to create a cohesive system. They set up a sequence of calls between the components. These components can include models and [memory](/glossary.md#ai-memory) (though note that in n8n chains can't use memory).


## Chains in n8n

n8n provides three chain nodes:

* [Basic LLM Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm.md): use to interact with an LLM, without any additional components.
* [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md): can connect to a [vector store](/glossary.md#ai-vector-store) using a retriever, or to an n8n workflow using the Workflow Retriever node. Use this if you want to create a workflow that supports asking questions about specific documents.
* [Summarization Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization.md): takes an input and returns a summary.

There's an important difference between chains in n8n and in other tools such as LangChain: none of the chain nodes support memory. This means they can't remember previous user queries. If you use LangChain to code an AI application, you can give your application memory. In n8n, if you need your workflow to support memory, use an agent. This is essential if you want users to be able to have a natural ongoing conversation with your app.


# advanced-ai/examples/understand-memory.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What's memory in AI?
description: Understand memory in the context of AI. Learn what's special about memory in n8n.
contentType: explanation
---

# What's memory in AI?

Memory is a key part of AI chat services. The [memory](/glossary.md#ai-memory) keeps a history of previous messages, allowing for an ongoing conversation with the AI, rather than every interaction starting fresh.

## AI memory in n8n

To add memory to your AI workflow you can use either:

* [Simple Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/index.md): stores a customizable length of chat history for the current session. This is the easiest to get started with.
* One of the memory services that n8n provides nodes for. These include:
	* [Motorhead](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymotorhead.md)
	* [Redis Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat.md)
	* [Postgres Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md) 
	* [Xata](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryxata.md)
	* [Zep](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep.md)

If you need to do advanced AI memory management in your workflows, use the [Chat Memory Manager](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager.md) node. 

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/chat-memory-manager-purpose.md"


# advanced-ai/examples/understand-tools.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What's a tool in AI?
description: Understand tools in the context of AI. Learn what's special about tools in n8n.
contentType: explanation
---

# What's a tool in AI?

In AI, 'tools' has a specific meaning. Tools act like addons that your AI can use to access extra context or resources.

Here are a couple of other ways of expressing it:

> Tools are interfaces that an agent can use to interact with the world ([source](https://langchain-ai.github.io/langgraphjs/how-tos/tool-calling/){:target=_blank .external-link})

<!--  -->

> We can think of these tools as being almost like functions that your AI model can call ([source](https://www.udemy.com/course/chatgpt-and-langchain-the-complete-developers-masterclass/){:target=_blank .external-link})

## AI tools in n8n

n8n provides tool [sub-nodes](/glossary.md#sub-node-n8n) that you can connect to your [AI agent](/glossary.md#ai-agent). As well as providing some popular tools, such as [Wikipedia](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwikipedia.md) and [SerpAPI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi.md), n8n provides three especially powerful tools:

* [Call n8n Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md): use this to load any n8n workflow as a tool.
* [Custom Code Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode.md): write code that your agent can run.
* [HTTP Request Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest.md): make calls to fetch a website or data from an API.

The next three examples highlight the Call n8n Workflow Tool:

- [Chat with Google Sheets](/advanced-ai/examples/data-google-sheets.md)
- [Call an API to fetch data](/advanced-ai/examples/api-workflow-tool.md)
- [Set up a human fallback](/advanced-ai/examples/human-fallback.md)

You can also learn how to [let AI dynamically specify parameters for tools with the `$fromAI()` function](/advanced-ai/examples/using-the-fromai-function.md).


# advanced-ai/examples/understand-vector-databases.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: What are vector databases?
description: Understand vector databases. Learn how n8n provides vector databases, along with the key components to work with them, including embeddings, retrievers, and document loaders.
contentType: explanation
---

# What are vector databases?

Vector databases store information as numbers:

> A vector database is a type of database that stores data as high-dimensional vectors, which are mathematical representations of features or attributes. ([source](https://learn.microsoft.com/en-us/semantic-kernel/memories/vector-db){:target=_blank .external-link})

This enables fast and accurate similarity searches. With a vector database, instead of using conventional database queries, you can search for relevant data based on semantic and contextual meaning.

## A simplified example

A vector database could store the sentence "n8n is a source-available automation tool that you can self-host", but instead of storing it as text, the vector database stores an array of dimensions (numbers between 0 and 1) that represent its features. This doesn't mean turning each letter in the sentence into a number. Instead, the vectors in the vector database describe the sentence. 

Suppose that in a vector store `0.1` represents `automation tool`, `0.2` represents `source available`, and `0.3` represents `can be self-hosted`. You could end up with the following vectors:

| Sentence | Vector (array of dimensions) |
| -------- | ------ |
| n8n is a source-available automation tool that you can self-host | [0.1, 0.2, 0.3] |
| Zapier is an automation tool | [0.1] |
| Make is an automation tool | [0.1] |
| Confluence is a wiki tool that you can self-host | [0.3] |

/// note | This example is very simplified
In practice, vectors are far more complex. A vector can range in size from tens to thousands of dimensions. The dimensions don't have a one-to-one relationship to a single feature, so you can't translate individual dimensions directly into single concepts. This example gives an approximate mental model, not a true technical understanding.
///


## Demonstrating the power of similarity search

Qdrant provides [vector search demos](https://qdrant.tech/demo/){:target=_blank .external-link} to help users understand the power of vector databases. The [food discovery demo](https://food-discovery.qdrant.tech/){:target=_blank .external-link} shows how a vector store can help match pictures based on visual similarities.

> This demo uses data from Delivery Service. Users may like or dislike the photo of a dish, and the app will recommend more similar meals based on how they look. It's also possible to choose to view results from the restaurants within the delivery radius. ([source](https://qdrant.tech/demo/){:target=_blank .external-link})

For full technical details, refer to the [Qdrant demo-food-discovery GitHub repository](https://github.com/qdrant/demo-food-discovery){:target=_blank .external-link}.

## Embeddings, retrievers, text splitters, and document loaders

Vector databases require other tools to function:

- Document loaders and text splitters: document loaders pull in documents and data, and prepare them for [embedding](/glossary.md#ai-embedding). Document loaders can use text splitters to break documents into chunks.
- Embeddings: these are the tools that turn the data (text, images, and so on) into vectors, and back into raw data. Note that n8n only supports text embeddings.
- Retrievers: retrievers fetch documents from vector databases. You need to pair them with an embedding to translate the vectors back into data.







# advanced-ai/examples/using-the-fromai-function.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Let AI specify tool parameters
description: Understand how n8n's `$fromAI()` function works and how to use it to dynamically populate parameters for AI app tools, or use the built-in automation to complete them instead.
contentType: explanation
tags:
  - $fromAI
  - $fromAI()
  - fromAI
  - fromAI()
hide:
  - tags
---

# Let AI specify the tool parameters

When configuring [app node](/integrations/builtin/app-nodes/index.md) [tools](/glossary.md#ai-tool) connected to the Tools Agent, many parameters can be filled in by the AI model itself. The AI model will use the context from the task and information from other connected tools to fill in the appropriate details.

There are two ways to do this, and you can switch between them.

## Let the model fill in the parameter

Each appropriate parameter field in the tool's editing dialog has an extra button at the end:

![image showing stars icon to the right of parameter field](/_images/advanced-ai/ai-stars.png)

On activating this button, the [AI Agent](/glossary.md#ai-agent) will fill in the expression for you, with no need for any further user input.
The field itself is filled in with a message indicating that the parameter has been defined automatically by the model.

If you want to define the parameter yourself, click on the 'X' in this box to revert to user-defined values. Note that the 'expression' field will now contain the expression generated by this feature, though you can now edit it further to add extra details as described in the following section.

/// warning 
Activating this feature will overwrite any manual definition you may have already added.
///

## Use the `$fromAI()` function 

The `$fromAI()` function uses AI to dynamically fill in parameters for tools connected to the [Tools AI agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent.md).  You can use the `$fromAI()` function in expressions within [app nodes](/integrations/builtin/app-nodes/index.md) (like [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/index.md), [Notion](/integrations/builtin/app-nodes/n8n-nodes-base.notion/index.md), or [Slack](/integrations/builtin/app-nodes/n8n-nodes-base.slack.md)) which are connected to the **AI Agent** as tools.

/// note | Only for the Node Tools
The `$fromAI()` function is only available for [app node](/integrations/builtin/app-nodes/index.md) tools connected to the Tools Agent. It isn't possible to use the `$fromAI()` function with the [Call n8n Workflow](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md), [Code](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode.md), [HTTP Request](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolhttprequest.md), or [other cluster sub-nodes](/integrations/builtin/cluster-nodes/sub-nodes/index.md).
///

To use the `$fromAI()` function, call it with the required `key` parameter:

```javascript
{{ $fromAI('email') }}
```

The `key` parameter and other arguments to the `$fromAI()` function aren't references to existing values. Instead, think of these arguments as hints that the AI model will use to populate the right data.

For instance, if you choose a key called `email`, the AI Model will look for an email address in its context, other tools, and input data. In chat workflows, it may ask the user for an email address if it can't find one elsewhere. You can optionally pass other parameters like `description` to give extra context to the AI model.

### Parameters

The `$fromAI()` function accepts the following parameters:

<!-- vale off -->

| Parameter | Type | Required? | Description |
| --------- | ---- | --------- | ----------- |
| `key` | string | :white_check_mark: | A string representing the key or name of the argument. This must be between 1 and 64 characters in length and can only contain lowercase letters, uppercase letters, numbers, underscores, and hyphens. |
| `description` | string | :x: | A string describing the argument. |
| `type` | string | :x: | A string specifying the data type. Can be string, number, boolean, or json (defaults to string). |
| `defaultValue` | any | :x: | The default value to use for the argument. |

<!-- vale on -->

### Examples

As an example, you could use the following `$fromAI()` expression to dynamically populate a field with a name:

```javascript
$fromAI("name", "The commenter's name", "string", "Jane Doe")
```

If you don't need the optional parameters, you could simplify this as:

```javascript
$fromAI("name")
```

To dynamically populate the number of items you have in stock, you could use a `$fromAI()` expression like this:

```javascript
$fromAI("numItemsInStock", "Number of items in stock", "number", 5)
```

If you only want to fill in parts of a field with a dynamic value from the model, you can use it in a normal expression as well. For example, if you want the model to fill out the `subject` parameter for an e-mail, but always pre-fix the generated value with the string 'Generated by AI:', you could use the following expression:

```javascript
Generated by AI: {{ $fromAI("subject") }}
```

### Templates

You can see the `$fromAI()` function in action in the following [templates](/glossary.md#template-n8n):

* [Angie, Personal AI Assistant with Telegram Voice and Text](https://n8n.io/workflows/2462-angie-personal-ai-assistant-with-telegram-voice-and-text/)
* [Automate Customer Support Issue Resolution using AI Text Classifier](https://n8n.io/workflows/2468-automate-customer-support-issue-resolution-using-ai-text-classifier/)
* [Scale Deal Flow with a Pitch Deck AI Vision, Chatbot and QDrant Vector Store](https://n8n.io/workflows/2464-scale-deal-flow-with-a-pitch-deck-ai-vision-chatbot-and-qdrant-vector-store/)


# advanced-ai/examples/vector-store-website.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
title: Populate a Pinecone vector database from a website
description: Scrape a website, load the data into Pinecone, then query it using a chat workflow.
---

# Populate a Pinecone vector database from a website

Use n8n to scrape a website, load the data into Pinecone, then query it using a chat workflow. This workflow uses the [HTTP node](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) to get website data, extracts the relevant content using the [HTML node](/integrations/builtin/core-nodes/n8n-nodes-base.html.md), then uses the [Pinecone Vector Store node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepinecone.md) to send it to Pinecone. 

[[ workflowDemo("file:///advanced-ai/examples/populate_a_pinecone_vector_database_from_a_website.json") ]]

## Key features

This workflow uses:

* [HTTP node](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md): fetches website data.
* [HTML node](/integrations/builtin/core-nodes/n8n-nodes-base.html.md): simplifies the data by extracting the main content from the page.
* [Pinecone Vector Store node](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepinecone.md) and [Embeddings OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai.md): transform the data into vectors and store it in Pinecone.
* [Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) and [Question and Answer Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md) to query the vector database.


## Using the example

--8<-- "_snippets/examples-color-key.md"


# advanced-ai/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n Advanced AI Documentation and Guides
description: Use n8n's LangChain integrations to build AI-powered functionality within your workflows. Connect your LangChain functionality to other data sources and services.
contentType: overview
---

# Advanced AI

Build AI functionality using n8n: from creating your own chat bot, to using AI to process documents and data from other sources.

/// info | Feature availability
This feature is available on Cloud and self-hosted n8n, in version 1.19.4 and above.
///

<div class="grid cards" markdown>

-   __Get started__

    Work through the short tutorial to learn the basics of building AI workflows in n8n.

    [:octicons-arrow-right-24: Tutorial](/advanced-ai/intro-tutorial.md)

-   __Use a Starter Kit__

    Try n8n's Self-hosted AI Starter Kit to quickly start building AI workflows.

    [:octicons-arrow-right-24: Self-hosted AI Starter Kit](/hosting/starter-kits/ai-starter-kit.md)

-   __Explore examples and concepts__

	Browse examples and workflow templates to help you build. Includes explanations of important AI concepts.

    [:octicons-arrow-right-24: Examples](/advanced-ai/examples/introduction.md)

-   __How n8n uses LangChain__

    Learn more about how n8n builds on LangChain.

    [:octicons-arrow-right-24: LangChain in n8n](/advanced-ai/langchain/overview.md)

-   __Browse AI templates__

    Explore a wide range of AI workflow templates on the n8n website.

    [:octicons-arrow-right-24: AI workflows on n8n.io](https://n8n.io/workflows/?categories=25){:target=_blank .external-link}

</div>

## Related resources

Related documentation and tools.

### Node types

This feature uses [Cluster nodes](/integrations/builtin/cluster-nodes/index.md): groups of [root](/integrations/builtin/cluster-nodes/root-nodes/index.md) and [sub](/integrations/builtin/cluster-nodes/sub-nodes/index.md) nodes that work together.

--8<-- "_snippets/integrations/builtin/cluster-nodes/cluster-nodes-summary.md"

### Workflow templates

You can browse [workflow templates](/glossary.md#template-n8n) in-app or on the n8n website [Workflows](https://n8n.io/workflows/?categories=25,26){:target=_blank .external-link} page.

Refer to [Templates](/workflows/templates.md) for information on accessing templates in-app.

### Chat trigger

Use the [n8n Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md) to trigger a workflow based on chat interactions.

### Chatbot widget

n8n provides a chatbot widget that you can use as a frontend for AI-powered chat workflows. Refer to the [@n8n/chat npm page](https://www.npmjs.com/package/@n8n/chat){:target=_blank .external-link} for usage information.


# advanced-ai/intro-tutorial.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Learn how to build AI workflows with n8n
type: tutorial
---

# Build an AI chat agent with n8n

Welcome to the introductory tutorial for building AI workflows with n8n. Whether you have used n8n before, or this is your first time, we will show you how the building blocks of AI workflows fit together and construct a working AI-powered chat agent which you can easily customize for your own purposes.

!["Screenshot of the completed workflow"](/_images/advanced-ai/ai-intro01.png)

Many people find it easier to take in new information in video format. This tutorial is based on one of n8n's popular videos, linked below. Watch the video or read the steps here, or both!

<iframe width="560" height="315" src="https://www.youtube.com/embed/yzvLfHb0nqE?si=7ruaUEycFcoQbYsD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### What you will need

- **n8n**: For this tutorial we recommend using the [n8n cloud](/manage-cloud/overview.md) service - there is a free trial for new users! For a self hosted service, refer to the [installation pages](/hosting/installation/docker.md).
- **Credentials for a chat model**: This tutorial uses OpenAI, but you can easily use DeepSeek, Google Gemini, Groq, Azure, and others (see the [sub-nodes documentation](/integrations/builtin/cluster-nodes/sub-nodes/index.md) for more).

### What you will learn

- AI concepts in n8n
- How to use the AI Agent node
- Working with Chat input
- Connecting with AI models
- Customising input
- Observing the conversation
- Adding persistence

## AI concepts in n8n

If you're already familiar with AI, feel free to skip this section. This is a basic introduction to AI concepts and how they can be used in n8n workflows.

An [AI agent](/glossary.md#ai-agent) builds on [Large Language Models (LLMs)](/glossary.md#large-language-model-llm), which generate text based
on input by predicting the next word. While LLMs only process input to produce
output, AI agents add goal-oriented functionality. They can use [tools](/glossary.md#ai-tool), process
their outputs, and make decisions to complete tasks and solve problems.

In n8n, the AI agent is represented as a node with some extra connections. 

| Feature             | LLM                        | AI Agent                           |
|---------------------|----------------------------|------------------------------------|
| Core Capability     | Text generation            | Goal-oriented task completion      |
| Decision-Making     | None                       | Yes                                |
| Uses Tools/APIs     | No                         | Yes                                |
| Workflow Complexity | Single-step                | Multi-step                         |
| Scope               | Generates language         | Performs complex, real-world tasks |
| Example             | LLM generating a paragraph | An agent scheduling an appointment |

By incorporating the AI agent as a node, n8n can combine AI-driven steps with traditional programming for efficient, real-world workflows. For instance, simpler tasks, like validating an email address, do not require AI, whereas a complex tasks, like processing the _content_ of an email or dealing with multimodal inputs (e.g., images, audio), are excellent uses of an AI agent.

## 1. Create a new workflow

--8<-- "_snippets/try-it-out/new-workflow.md"

## 2. Add a trigger node

Every workflow needs somewhere to start. In n8n these are called ['trigger nodes'](/glossary.md#trigger-node-n8n). For this workflow, we want to start with a chat node.

 1. Select **Add first step** or press ++tab++ to open the node menu.

 1. Search for **Chat Trigger**. n8n shows a list of nodes that match the search.

 1. Select **Chat Trigger** to add the node to the canvas. n8n opens the node.

 1. Close the node details view (Select **Back to canvas**) to return to the canvas.

??? explanation "More about the Chat Trigger node..."
    The trigger node generates output when there is an event causing it to trigger. In this case we want to be able to type in text to cause the workflow to run. In production, this trigger can be hooked up to a public chat interface as provided by n8n or embedded into another website. To start this simple workflow we will just use the built-in local chat interface to communicate, so no further setup is required.

[[ workflowDemo("file:////advanced-ai/tutorials/chat_01.json") ]]

## 3. Add an AI Agent Node

The AI Agent node is the core of adding AI to your workflows.

 1. Select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector on the trigger node to bring up the node search.

 1. Start typing "AI" and choose the **AI agent** node to add it.

 1. The editing view of the **AI agent** will now be displayed. 
 
 1. There are some fields which can be changed. As we're using the **Chat Trigger** node, the default setting for the source and specification of the prompt don't need to be changed.

[[ workflowDemo("file:////advanced-ai/tutorials/chat_02.json") ]]

## 4. Configure the node
  
AI agents require a chat model to be attached to process the incoming prompts.

1. Add a chat model by clicking the plus <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> button underneath the **Chat Model** connection on the **AI Agent** node (it's the first connection along the bottom of the node).

1. The search dialog will appear, filtered on 'Language Models'. These are the models with built-in support in n8n. For this tutorial we will use **OpenAI Chat Model**.

1. Selecting the **OpenAI Chat model** from the list will attach it to the **AI Agent** node and open the node editor. One of the parameters which can be changed is the 'Model'. Note that for the basic OpenAI accounts, only the 'gpt-4o-mini' model is allowed.

??? explanation "Which chat model?"
    As mentioned earlier, the LLM is the component which generates the text according to a prompt it is given. LLMs have to be created and trained, usually an intensive process. Different LLMS may have different capabilities or specialties, depending on the data they were trained with.

## 5. Add credentials (if needed)

In order for n8n to communicate with the chat model, it will need some [credentials](/credentials/index.md) (login data giving it access to an account on a different online service). If you already have credentials set up for OpenAI, these should appear by default in the credentials selector. Otherwise you can use the Credentials selector to help you add a new credential.

![image showing the credentials dialog for OpenAI](/_images/advanced-ai/ai-tutorial-credentials.png)

1. To add a new credential, click on the text which says 'Select credential'. An option to add a new credential will appear
   ![Screenshot showing create a new credential button](/_images/advanced-ai/ai-tutorial-create-credential.png)

1. This credential just needs an API key. When adding credentials of any type, check the text to the right-hand side. In this case it has a handy link to take you straight to your OpenAI account to retrieve the API key.

1. The API key is just one long string. That's all you need for this particular credential. Copy it from the OpenAI website and paste it into the **API key** section.

??? explanation "Keeping your credentials safe"
    Credentials are private pieces of information issued by apps and services to authenticate you as a user and allow you to connect and share information between the app or service and the n8n node. The type of information required varies depending on the app/service concerned. You should be careful about sharing or revealing the credentials outside of n8n.

## 6. Test the node

Now that the node is connected to the **Chat Trigger** and a chat model, we can test this part of the workflow.

1. Click on the 'Chat' button near the bottom of the canvas. This opens up a local chat window on the left and the AI agent logs on the right.

1. Type in a message and press ++enter++. You will now see the response from the chat model appear below your message.

1. The log window displays the inputs to and outputs from the AI Agent.
   ![image showing a chat session in progress](/_images/advanced-ai/ai-intro-chat.png)

??? explanation "Accessing the logs..."
    You can access the logs for the AI node even when you aren't using the chat interface. Open up the **AI Agent** node and click on the **Logs** tab in the right hand panel.
	![screenshot showing the Logs tab in the AIAgent](/_images/advanced-ai/ai-intro-logs.png)

## 7. Changing the prompt

The logs in the previous step reveal some extra data - the system prompt. This is the default message that the **AI Agent** primes the chat model with. From the log you can see this is set to "You are a helpful assistant". We can however change this prompt to alter the behavior of the chat model.

1. Open the **AI Agent** node. In the bottom of the panel is a section labeled 'Options' and a selector labeled 'Add Option'. Use this to select 'System message'

1. The system message is now displayed. This is the same priming prompt we noticed before in the logs. Change the prompt to something else to prime the chat model in a different way. You could try something like "You are a brilliant poet who always replies in rhyming couplets" for example.

1. Close the node and return to the chat window. Repeat your message and notice how the output has changed.
   ![image showing changed text for chat, now it rhymes; if you can believe that](/_images/advanced-ai/ai-intro-poet.png)

## 8. Adding persistence

The chat model is now giving us useful output, but there is something wrong with it which will become apparent when you try to have a conversation.

1. Use the chat and tell the chat model your name, for example "Hi there, my name is Nick".

1. Wait for the response, then type the message "What's my name?". The AI will not be able to tell you, however apologetic it may seem. The reason for this is we are not saving the context. The AI Agent has no [memory](/glossary.md#ai-memory).
   ![image showing a conversation illustrating the above](/_images/advanced-ai/ai-intro-memory.png)

1. In order to remember what has happened in the conversation, the AI Agent needs to preserve context. We can do this by adding memory to the **AI Agent** node. On the canvas click on the <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> on the bottom of the **AI Agent** node labeled "Memory".

1. From the panel which appears, select "Simple Memory". This will use the memory from the instance running n8n, and is usually sufficient for simple usage. The default value of 5 interactions should be sufficient here, but remember where this option is if you may want to change it later.

1. Repeat the exercise of having a conversation above, and see that the AI Agent now remembers your name.

## 9. Saving the workflow

Before we leave the workflow editor, remember to save the workflow or all your changes will be lost.

1. Click on the "Save" button in the top right of the editor window. Your workflow will now be saved and you can return to it later to chat again or add new features.

## Congratulations!

You have taken your first steps in building useful and effective workflows with AI. In this tutorial we have investigated the basic building blocks of an AI workflow, added an **AI Agent** and a chat model, and adjusted the prompt to get the kind of output we wanted. We also added memory so the chat could retain context between messages.

[[ workflowDemo("file:////advanced-ai/tutorials/chat_complete.json") ]]

## Next steps

Now you have seen how to create a basic AI workflow, there are plenty of resources to build on that knowledge and plenty of examples to give you ideas of where to go next:

* Learn more about AI concepts and view examples in [Examples and concepts](/advanced-ai/examples/introduction.md).
* Browse AI [Workflow templates](https://n8n.io/workflows/?categories=25){:target=_blank .external-link}.
* Find out how to [enhance the AI agent with tools](/advanced-ai/examples/understand-tools.md).


# advanced-ai/langchain/langchain-learning-resources.md

---
contentType: overview
title: LangChain learning resources
description: External resources to learn more about LangChain and AI.
---

# LangChain learning resources

You don't need to know details about LangChain to use n8n, but it can be helpful to learn a few concepts. This pages lists some learning resources that people at n8n have found helpful.

The [LangChain documentation](https://docs.langchain.com/docs/){:target=_blank .external-link} includes introductions to key concepts and possible use cases. Choose the [LangChain | Python](https://python.langchain.com/docs/get_started/introduction){:target=_blank .external-link} or [LangChain | JavaScript](https://js.langchain.com/docs/get_started/introduction/){:target=_blank .external-link} documentation for quickstarts, code examples, and API documentation. LangChain also provide [code templates](https://github.com/langchain-ai/langchain/tree/master/cookbook){:target=_blank .external-link} (Python only), offering ideas for potential use cases and common patterns.

[What Product People Need To Know About LangChain](https://www.commandbar.com/blog/langchain-guide){:target=_blank .external-link} provides a list of terminology and concepts, explained with helpful metaphors. Aimed at a wide audience.

If you prefer video, this [YouTube series by Greg Kamradt](https://youtu.be/_v_fgW2SkkQ?si=8Z2tfAoXnN3lXU9s){:target=_blank .external-link} works through the LangChain documentation, providing code examples as it goes.

n8n offers space to discuss LangChain on the [Discord](https://discord.gg/bAt54txhHg){:target=_blank .external-link}. Join to share your projects and discuss ideas with the community.


# advanced-ai/langchain/langchain-n8n.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
title: LangChain concepts in n8n
description: How LangChain concepts map to n8n, and which n8n nodes to use.
---

# LangChain concepts in n8n

This page explains how LangChain concepts and features map to n8n nodes.

This page includes lists of the LangChain-focused nodes in n8n. You can use any n8n node in a workflow where you interact with LangChain, to link LangChain to other services. The LangChain features uses n8n's [Cluster nodes](/integrations/builtin/cluster-nodes/index.md).


/// note | n8n implements LangChain JS
This feature is n8n's implementation of [LangChain's JavaScript framework](https://js.langchain.com/docs/get_started/introduction){:target=_blank .external-link}.
///
## Trigger nodes

[Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/index.md)

## Cluster nodes

--8<-- "_snippets/integrations/builtin/cluster-nodes/cluster-nodes-summary.md"

### Root nodes

Each cluster starts with one [root node](/glossary.md#root-node-n8n).

#### Chains

A [chain](/glossary.md#ai-chain) is a series of LLMs, and related tools, linked together to support functionality that can't be provided by a single LLM alone.

Available nodes:

* [Basic LLM Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm.md)
* [Retrieval Q&A Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/index.md)
* [Summarization Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization.md)
* [Sentiment Analysis](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.sentimentanalysis.md)
* [Text Classifier](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier.md)

Learn more about [chaining in LangChain](https://js.langchain.com/docs/concepts/lcel){:target=_blank .external-link}.

#### Agents

> An [agent](/glossary.md#ai-agent){ data-preview} has access to a suite of tools, and determines which ones to use depending on the user input. Agents can use multiple tools, and use the output of one tool as the input to the next. [Source](https://github.com/langchain-ai/langchainjs/blob/def3a26c054575e1ed40b9062087e8c0a8899633/docs/core_docs/docs/modules/agents/index.mdx){:target=_blank .external-link}

Available nodes:

* [Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/index.md)

Learn more about [Agents in LangChain](https://js.langchain.com/docs/concepts/agents){:target=_blank .external-link}.

#### Vector stores

[Vector stores](/glossary.md#ai-vector-store) store embedded data, and perform vector searches on it.

* [Simple Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory.md)
* [PGVector Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepgvector.md)
* [Pinecone Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepinecone.md)
* [Qdrant Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreqdrant.md)
* [Supabase Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoresupabase.md)
* [Zep Vector Store](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorezep.md)

Learn more about [Vector stores in LangChain](https://js.langchain.com/docs/concepts/vectorstores/){:target=_blank .external-link}.

#### Miscellaneous

Utility nodes.

[LangChain Code](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.code.md): import LangChain. This means if there is functionality you need that n8n hasn't created a node for, you can still use it.

### Sub-nodes

Each root node can have one or more [sub-nodes](/glossary.md#sub-node-n8n) attached to it.

#### Document loaders

Document loaders add data to your chain as documents. The data source can be a file or web service.

Available nodes:

* [Default Document Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader.md)
* [GitHub Document Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader.md)

Learn more about [Document loaders in LangChain](https://js.langchain.com/docs/concepts/document_loaders){:target=_blank .external-link}.

#### Language models

[LLMs (large language models)](/glossary.md#large-language-model-llm) are programs that analyze datasets. They're the key element of working with AI.

Available nodes:

* [Anthropic Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatanthropic.md)
* [AWS Bedrock Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatawsbedrock.md)
* [Cohere Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmcohere.md)
* [Hugging Face Inference Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference.md)
* [Mistral Cloud Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatmistralcloud.md)
* [Ollama Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/index.md)
* [Ollama Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/index.md)
* [OpenAI Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatopenai/index.md)

Learn more about [Language models in LangChain](https://js.langchain.com/docs/concepts/chat_models){:target=_blank .external-link}.

#### Memory

[Memory](/glossary.md#ai-memory) retains information about previous queries in a series of queries. For example, when a user interacts with a chat model, it's useful if your application can remember and call on the full conversation, not just the most recent query entered by the user.

Available nodes:

* [Motorhead](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymotorhead.md)
* [Redis Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryredischat.md)
* [Postgres Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md) 
* [Simple Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/index.md)
* [Xata](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryxata.md)
* [Zep](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memoryzep.md)

Learn more about [Memory in LangChain](https://langchain-ai.github.io/langgraphjs/concepts/memory/){:target=_blank .external-link}.

#### Output parsers

Output parsers take the text generated by an LLM and format it to match the structure you require.

Available nodes:

* [Auto-fixing Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserautofixing.md)
* [Item List Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparseritemlist.md)
* [Structured Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/index.md)

Learn more about [Output parsers in LangChain](https://js.langchain.com/docs/concepts/output_parsers/){:target=_blank .external-link}.

#### Retrievers


* [Contextual Compression Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievercontextualcompression.md)
* [MultiQuery Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievermultiquery.md)
* [Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore.md)
* [Workflow Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrieverworkflow.md)


#### Text splitters

Text splitters break down data (documents), making it easier for the LLM to process the information and return accurate results.

Available nodes:

* [Character Text Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.textsplittercharactertextsplitter.md)
* [Recursive Character Text Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.textsplitterrecursivecharactertextsplitter.md)
* [Token Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.textsplittertokensplitter.md)

n8n's text splitter nodes implements parts of [LangChain's text_splitter API](https://js.langchain.com/docs/concepts/text_splitters/){:target=_blank .external-link}.

#### Tools

Utility [tools](/glossary.md#ai-tool).

* [Calculator](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcalculator.md)
* [Code Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode.md)
* [SerpAPI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi.md)
* [Think Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolthink.md)
* [Vector Store Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md)
* [Wikipedia](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwikipedia.md)
* [Wolfram|Alpha](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolwolframalpha.md)
* [Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolworkflow.md)

#### Embeddings

> [Embeddings](/glossary.md#ai-embedding) capture the "relatedness" of text, images, video, or other types of information. ([source](https://supabase.com/docs/guides/ai/concepts){:target=_blank .external-link})

Available nodes:


* [Embeddings AWS Bedrock](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsawsbedrock.md)
* [Embeddings Cohere](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingscohere.md)
* [Embeddings Google PaLM](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglepalm.md)
* [Embeddings Hugging Face Inference](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference.md)
* [Embeddings Mistral Cloud](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsmistralcloud.md)
* [Embeddings Ollama](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsollama.md)
* [Embeddings OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsopenai.md)

Learn more about [Text embeddings in LangChain](https://js.langchain.com/docs/concepts/embedding_models/){:target=_blank .external-link}.


#### Miscellaneous

* [Chat Memory Manager](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorymanager.md)





# advanced-ai/langchain/langsmith.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
title: Use LangSmith with n8n
description: How to enable LangSmith for your self-hosted n8n instance.
---

# Use LangSmith with n8n

[LangSmith](https://www.langchain.com/langsmith){:target=_blank .external-link} is a developer platform created by the LangChain team. You can connect your n8n instance to LangSmith to record and monitor runs in n8n, just as you can in a LangChain application.

/// info | Feature availability
Self-hosted n8n only.
///

## Connect your n8n instance to LangSmith

1. [Log in to LangSmith](https://smith.langchain.com/settings){:target=_blank .external-link} and get your API key.
1. Set the LangSmith environment variables:

	| Variable | Value |
	| -------- | ----- |
	| LANGCHAIN_ENDPOINT | `"https://api.smith.langchain.com"` |
	| LANGCHAIN_TRACING_V2 | `true` |
	| LANGCHAIN_API_KEY | Set this to your API key |

	Set the variables so that they're available globally in the environment where you host your n8n instance. You can do this in the same way as the rest of your general configuration. These aren't n8n environment variables, so don't try to set them using the [n8n configuration file](/hosting/configuration/configuration-methods.md#set-environment-variables-using-a-file).

1. Restart n8n.

For information on using LangSmith, refer to [LangSmith's documentation](https://docs.smith.langchain.com/){:target=_blank .external-link}.


# advanced-ai/langchain/overview.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
title: LangChain in n8n
description: Understand how n8n uses LangChain to provide advanced AI functionality.
hide:
  - toc
---

# LangChain in n8n

n8n provides a collection of nodes that implement LangChain's functionality. The LangChain nodes are configurable, meaning you can choose your preferred agent, LLM, memory, and so on. Alongside the LangChain nodes, you can connect any n8n node as normal: this means you can integrate your LangChain logic with other data sources and services.

* [Learning resources](/advanced-ai/langchain/langchain-learning-resources.md): n8n's documentation for LangChain assumes you're familiar with AI and LangChain concepts. This page provides links to learning resources.
* [LangChain concepts and features in n8n](/advanced-ai/langchain/langchain-n8n.md): how n8n represents LangChain concepts and features.
