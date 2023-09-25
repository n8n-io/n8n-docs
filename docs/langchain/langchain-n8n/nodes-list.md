---
contentType: overview
title: LangChain nodes
description: Which n8n nodes relate to LangChain.
---

# LangChain nodes

These are the LangChain-focused nodes in n8n. You can use any n8n node in a workflow where you interact with LangChain, to link LangChain to other services. The LangChain features uses n8n's [Cluster nodes](/integrations/builtin/cluster-nodes/).

[TODO: this list is very incomplete. Check in with Jan on Friday latest for the definitive list]

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
* [WolframAlpha](/integrations/builtin/credentials/wolframalpha/)
* [Xata](/integrations/builtin/credentials/xata/)
* [Zep](/integrations/builtin/credentials/zep/)

## Cluster nodes

--8<-- "_snippets/integrations/builtin/cluster-nodes/cluster-nodes-summary.md"

### Root nodes

Each cluster starts with one root node.

#### Agents

* [Conversational Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.conversationalagent/)
* [OpenAI Functions Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.openaifunctionsagent/)
* [ReAct Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.reactagent/)
* [SQL Agent](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.sqlagent/)

#### Chains

* [LLM Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.chainllm/)
* [Retrieval QA Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.chainretrievalqa/)
* [Structured Output Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.chainstructuredoutput/)
* [Summarization Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.chainsummarization/)
* [Vector Store QA Chain](/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-base.chainvectorstoreqa/)


### Sub-nodes

Each root node can have one or more sub-nodes attached to it.

#### Document loaders

* [Binary Input Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.documentbinaryinputloader/)
* [GitHub Document Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.documentgithubloader/)
* [JSON Input Loader](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.documentjsoninputloader/)

#### Embeddings

[Embeddings OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.embeddingsopenai/)

#### Language models

* [Chat Anthropic](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmchatanthropic/)
* [Chat Ollama](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmchatollama/)
* [Chat OpenAI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmchatopenai/)
* [Cohere](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmcohere/)
* [Hugging Face Inference](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmhuggingfaceinference/)
* [Ollama](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmollama/)
* [Open AI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.lmopenai/)

#### Memory

* [Chat Messages Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memorychatretriever/)
* [Motorhead](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memorymotorhead/)
* [Redis Chat Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memoryredischat/)
* [Window Buffer Memory](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memorybufferwindow/)
* [Xata](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memoryxata/)
* [Zep](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.memoryzep/)

#### Output parsers

* [Auto-fixing Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.outputparserautofixing/)
* [Item List Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.outputparseritemlist/)
* [Structured Output Parser](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.outputparserstructured/)

#### Retrievers

[Vector Store Retriever](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.retrievervectorstore/)

#### Text splitters

* [Character Text Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.textsplittercharactertextsplitter/)
* [Recursive Character Text Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.textsplitterrecursivecharactertextsplitter/)
* [Token Splitter](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.textsplittertokensplitter/)

#### Tools

* [Calculator](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolcalculator/)
* [Code Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolcode/)
* [SerpAPI](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolserp/)
* [Wikipedia](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolwikipedia/)
* [Wolfram|Alpha](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolwolframalpha/)
* [Workflow Tool](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.toolworkflow/)

#### Vector stores

* [In Memory Vector Store](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.inmemoryvectorstore/)
* [Pinecone: Insert](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstorepineconeinsert/)
* [Pinecone: Load](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstorepineconeload/)
* [Supabase: Insert](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstoresupabaseinsert/)
* [Supabase: Load](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstoresupabaseload/)
* [Zep Vector Store: Insert](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstorezepinsert/)
* [Zep Vector Store: Load](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-base.vectorstorezepload/)
