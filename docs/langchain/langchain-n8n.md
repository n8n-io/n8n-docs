---
contentType: explanation
title: LangChain concepts in n8n
description: How LangChain concepts map to n8n, and which n8n nodes to use.
---

# LangChain concepts in n8n

This page explains how LangChain concepts and features map to n8n nodes.

This page includes lists of the LangChain-focused nodes in n8n. You can use any n8n node in a workflow where you interact with LangChain, to link LangChain to other services. The LangChain features uses n8n's [Cluster nodes](/integrations/builtin/cluster-nodes/).

[TODO: this list is very incomplete. Check in with Jan on Friday latest for the definitive list]
[TODO: this list structure probably needs to change as the UI will likely change before release]

!!! note "n8n implements LangChain JS"
	This feature is n8n's implementation of [LangChain's JavaScript framework](https://js.langchain.com/docs/get_started/introduction){:target=_blank .external-link}. This means that n8n's nodes support what LangChain supports. Some of the services listed may have additional functionality, but if it isn't supported by LangChain, it also isn't supported by n8n. [TODO: rephrase this it's horrible]

## Trigger nodes

[On new manual Chat Message](/integrations/builtin/trigger-nodes/n8n-nodes-base.manualchattrigger/)

## Credentials

* [Anthropic AI](/integrations/builtin/credentials/anthropicai/)
* [Cohere](/integrations/builtin/credentials/cohere/)
* [Hugging Face](/integrations/builtin/credentials/huggingface/)
* [Motorhead](/integrations/builtin/credentials/motorhead/)
* [Ollama](/integrations/builtin/credentials/ollama/)
* [Pinecone](/integrations/builtin/credentials/pinecone/)
* [Serp](/integrations/builtin/credentials/serp/)
* [Wolfram|Alpha](/integrations/builtin/credentials/wolframalpha/)
* [Xata](/integrations/builtin/credentials/xata/)
* [Zep](/integrations/builtin/credentials/zep/)

## Cluster nodes

--8<-- "_snippets/integrations/builtin/cluster-nodes/cluster-nodes-summary.md"

### Root nodes

Each cluster starts with one root node.

#### Chains

A chain is a series of LLMs, and related tools, linked together to support functionality that can't be provided by a single LLM alone.

Available nodes:

* [LLM Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.chainllm/)
* [Summarization Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.chainsummarization/)
* [Vector Store QA Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.chainvectorstoreqa/)

Learn more about [Chains in LangChain](https://js.langchain.com/docs/modules/chains/){:target=_blank .external-link}.

#### Agents

> An agent has access to a suite of tools, and determines which ones to use depending on the user input. Agents can use multiple tools, and use the output of one tool as the input to the next. [Source](https://js.langchain.com/docs/modules/agents/)

Available nodes:

* [Conversational Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.conversationalagent/)
* [OpenAI Functions Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.openaifunctionsagent/)
* [ReAct Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.reactagent/)
* [SQL Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.sqlagent/)

Learn more about [Agents in LangChain](https://js.langchain.com/docs/modules/agents/){:target=_blank .external-link}.


### Sub-nodes

Each root node can have one or more sub-nodes attached to it.

#### Document loaders

Document loaders add data to your chain as documents. The data source can be a file or web service.

Available nodes:

* [Binary Input Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.documentbinaryinputloader/)
* [GitHub Document Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.documentgithubloader/)
* [JSON Input Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.documentjsoninputloader/)

Learn more about [Document loaders in LangChain](https://js.langchain.com/docs/modules/data_connection/document_loaders/){:target=_blank .external-link}.

#### Language models

LLMs (large language models) are programs that analyze datasets. They're the key element of working with AI.

Available nodes:

* [Chat Anthropic](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmchatanthropic/)
* [Chat Ollama](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmchatollama/)
* [Chat OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmchatopenai/)
* [Cohere](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmcohere/)
* [Google PaLM Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatgooglepalm/)
* [Google PaLM Language Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmgooglepalm/)
* [Hugging Face Inference](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmhuggingfaceinference/)
* [Ollama](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmollama/)
* [OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmopenai/)

Learn more about [Language models in LangChain](https://js.langchain.com/docs/modules/model_io/models/){:target=_blank .external-link}.

#### Memory

Memory retains information about previous queries in a series of queries. For example, when a user interacts with a chat model, it's useful if your application can remember and call on the full conversation, not just the most recent query entered by the user.

Available nodes:

* [Chat Messages Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memorychatretriever/)
* [Motorhead](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memorymotorhead/)
* [Redis Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memoryredischat/)
* [Window Buffer Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memorybufferwindow/)
* [Xata](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memoryxata/)
* [Zep](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memoryzep/)

Learn more about [Memory in LangChain](https://js.langchain.com/docs/modules/memory/){:target=_blank .external-link}.

#### Output parsers

Output parsers take the text generated by an LLM and format it to match the structure you require.

Available nodes:

* [Auto-fixing Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.outputparserautofixing/)
* [Item List Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.outputparseritemlist/)
* [Structured Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.outputparserstructured/)

Learn more about [Output parsers in LangChain](https://js.langchain.com/docs/modules/model_io/output_parsers/){:target=_blank .external-link}.

#### Text splitters

Text splitters break down data (documents), making it easier for the LLM to process the information and return accurate results.

Available nodes:

* [Character Text Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.textsplittercharactertextsplitter/)
* [Recursive Character Text Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.textsplitterrecursivecharactertextsplitter/)
* [Token Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.textsplittertokensplitter/)

n8n's text splitter nodes implements parts of [LangChain's text_splitter API](https://js.langchain.com/docs/api/text_splitter/){:target=_blank .external-link}.

#### Tools

Utility tools.

* [Calculator](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolcalculator/)
* [Code Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolcode/)
* [SerpAPI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolserp/)
* [Wikipedia](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolwikipedia/)
* [Wolfram|Alpha](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolwolframalpha/)
* [Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolworkflow/)

#### Embeddings

> Embeddings capture the "relatedness" of text, images, video, or other types of information. ([source](https://supabase.com/docs/guides/ai/concepts){:target=_blank .external-link})

Available nodes:

* [Embeddings Cohere](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingscohere/)
* [Embeddings Google PaLM](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingsgooglepalm/)
* [Embeddings Hugging Face Inference](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingshuggingfaceinference/)
* [Embeddings OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.embeddingsopenai/)
* [Embeddings TensorFlow](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingstensorflow/)

Learn more about [Text embeddings in LangChain](https://js.langchain.com/docs/modules/data_connection/text_embedding/){:target=_blank .external-link}.


#### Vector stores

Vector stores store embedded data, and perform vector searches on it.

* [In Memory Vector Store](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.inmemoryvectorstore/)
* [Pinecone: Insert](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstorepineconeinsert/)
* [Pinecone: Load](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstorepineconeload/)
* [Supabase: Insert](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstoresupabaseinsert/)
* [Supabase: Load](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstoresupabaseload/)
* [Zep Vector Store: Insert](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstorezepinsert/)
* [Zep Vector Store: Load](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstorezepload/)

Learn more about [Vector stores in LangChain](https://js.langchain.com/docs/modules/data_connection/vectorstores/){:target=_blank .external-link}.

#### Retrievers [TODO: verify section & section position]

[TODO: add exact node name when known]
* [context compression](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievercontextualcompression/)
* [multi](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievermultiquery/)
* [workflow](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievern8nworkflow/)
* [similarity](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrieversimilarityccoretreshold/)
