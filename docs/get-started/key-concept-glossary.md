---
title: n8n Glossary
description: Definitions of the terms n8n uses for workflows, agents, AI, and hosting, with links to the pages that explain each concept.
contentType: reference
nodeTitle: Key concept glossary
originalFilePath: glossary.md
originalUrl: 'https://docs.n8n.io/glossary'
url: 'https://docs.n8n.io/get-started/key-concept-glossary'
layout:
  description:
    visible: false
---

This glossary defines the terms n8n uses for building, running, and managing workflows and agents. Each entry links to the page that explains the concept in full.

## Workflow building blocks

### canvas (n8n) <a href="#canvas-n8n" id="canvas-n8n"></a>

The canvas is the main interface for building workflows in n8n's editor UI. You use the canvas to add and connect nodes to compose workflows. Learn more: [Create and run workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-run-workflows).

### community node (n8n) <a href="#community-node-n8n" id="community-node-n8n"></a>

A community node is a node built and shared by the community, not one of n8n's built-in nodes. You install community nodes on your instance to add integrations that n8n doesn't provide. Learn more: [Using community nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/community-nodes/using-community-nodes).

### credential (n8n) <a href="#credential-n8n" id="credential-n8n"></a>

In n8n, credentials store authentication information to connect with specific apps and services. After creating credentials with your authentication information (username and password, API key, OAuth secrets, and so on), you can use the associated app node to interact with the service. Learn more: [Create and edit credentials](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-edit-credentials).

### editor (n8n) <a href="#editor-n8n" id="editor-n8n"></a>

The n8n editor UI lets you create and manage workflows. The main area is the canvas, where you can compose workflows by adding, configuring, and connecting nodes. The side and top panels let you access other areas of the UI like credentials, templates, variables, executions, and more. Learn more: [Create and run workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-run-workflows).

### expression (n8n) <a href="#expression-n8n" id="expression-n8n"></a>

In n8n, expressions let you populate node parameters dynamically by executing JavaScript code. Instead of providing a static value, you can use the n8n expression syntax to define the value using data from previous nodes, other workflows, or your n8n environment. Learn more: [Expressions for data transformation](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/transform-data/expressions-for-data-transformation).

### node (n8n) <a href="#node-n8n" id="node-n8n"></a>

In n8n, nodes are individual components that you compose to create workflows. Some nodes start workflows; others fetch, send, and process data, define flow control logic, or connect with external services. Learn more: [Work with nodes](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/workflow-components/work-with-nodes).

### sub-workflow (n8n)

A sub-workflow is a workflow that another workflow calls. Use sub-workflows to split a large workflow into smaller, reusable parts. Learn more: [Sub-workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/break-workflows-into-smaller-parts).

### template (n8n) <a href="#template-n8n" id="template-n8n"></a>

n8n templates are pre-built workflows designed by n8n and community members that you can import into your n8n instance. When using templates, you may need to fill in credentials and adjust the configuration to suit your needs. Learn more: [Workflow templates](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/use-templates).

### trigger node (n8n) <a href="#trigger-node-n8n" id="trigger-node-n8n"></a>

A trigger node is a special node responsible for executing the workflow in response to certain conditions. All production workflows need at least one trigger to determine when the workflow should run. Learn more: [Trigger nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/trigger-nodes).

### workflow (n8n) <a href="#workflow-n8n" id="workflow-n8n"></a>

An n8n workflow is a collection of nodes that automate a process. Workflows begin execution when a trigger condition occurs, when you run them manually, or when another workflow calls them. They execute node by node, and can branch, merge, and loop to achieve complex tasks. Learn more: [Create and run workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-run-workflows).

## Data

### binary data (n8n)

Binary data is file-type data, such as images and documents. An item holds binary data in its `binary` object, separate from its `json` data. Learn more: [Binary data](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/handle-special-data-types/work-with-files-and-images).

### data pinning (n8n) <a href="#data-pinning-n8n" id="data-pinning-n8n"></a>

Data pinning lets you temporarily freeze the output data of a node during workflow development. This lets you develop workflows with predictable data without making repeated requests to external services. Production workflows ignore pinned data and request new data on each execution. Learn more: [Data mocking and pinning](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/pin-and-mock-data).

### data table (n8n)

A data table stores structured, tabular data inside n8n, so you don't need an external database. Data tables are scoped to a [project](#project-n8n), and workflows in that project can read and write them with the [Data Table node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.datatable). You can also manage them in the Data tables tab and through the [n8n API](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/n8n-api/api-reference). Data tables suit light to moderate storage. Learn more: [Data tables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/data-tables) and [Data Table node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.datatable).

### variable (n8n)

A custom variable stores a read-only string that you reuse across workflows. A variable is either global, available across the whole instance, or scoped to a single project. Learn more: [Custom variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/define-custom-variables).

## Agents and AI in n8n

### agent (n8n)

An agent is an autonomous assistant you build in n8n. Each agent has a language model, instructions, and capabilities you configure, such as tools, [skills](#skill-n8n), memory, a [knowledge base](#knowledge-base-n8n), and [sub-agents](#sub-agent-n8n). Agents are separate items in your project, not part of a workflow, and people reach them through chat, channels, and schedules. Agents are in Preview. Don't confuse an agent with the [AI Agent node](#ai-agent-node-n8n), which runs inside a workflow. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents).

### AI agent <a href="#ai-agent" id="ai-agent"></a>

An AI agent is an AI system that uses a large language model (LLM) to interpret a request and decide which actions to take, such as calling tools, to complete it. In n8n you can build an AI agent in two ways: as an [agent](#agent-n8n), or with the [AI Agent node](#ai-agent-node-n8n) in a workflow. Learn more: [What's an agent in AI?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/what-agents-do).

### AI Agent node (n8n)

The AI Agent node adds an AI agent to a workflow. It's a cluster node: a root node that you extend with sub-nodes, such as a chat model, tools, and memory. It's a different feature from an [agent](#agent-n8n) built in the Agent Builder. Learn more: [AI Agent node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent).

### AI chain <a href="#ai-chain" id="ai-chain"></a>

An AI chain calls an LLM and other components in a fixed sequence. Unlike an agent, a chain doesn't decide which steps to take. AI chains in n8n don't use persistent memory, so you can't use them to reference previous context (use AI agents for this). Learn more: [What's a chain in AI?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/what-chains-do).

### AI memory <a href="#ai-memory" id="ai-memory"></a>

In an AI context, memory lets AI tools persist message context across interactions. This lets you have continuing conversations with AI agents, for example, without submitting ongoing context with each message. In n8n, agents and AI Agent nodes can use memory, but AI chains can't. Learn more: [What's memory in AI?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/how-memory-works).

### AI tool <a href="#ai-tool" id="ai-tool"></a>

In an AI context, a tool is an add-on resource that the AI can refer to for specific information or features when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks. Learn more: [What's a tool in AI?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/how-tools-work).

### cluster node (n8n) <a href="#cluster-node-n8n" id="cluster-node-n8n"></a>

In n8n, cluster nodes are groups of nodes that work together to provide AI features in a workflow, such as agents, chains, and vector stores. They consist of a root node and one or more sub-nodes that extend the node's features. For example, the AI Agent root node uses sub-nodes for a chat model, memory, and tools. n8n represents most LangChain concepts as cluster nodes. Learn more: [Cluster nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes).

### knowledge base (n8n)

A knowledge base is a set of files that an [agent](#agent-n8n) can search and read for context when it answers. You upload files to the agent, such as CSV, PDF, Markdown, and text files. Knowledge bases are available on n8n Cloud, and in Preview on self-hosted instances. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#upload-knowledge).

### Model Context Protocol (MCP)

Model Context Protocol (MCP) is an open standard that lets AI clients connect to external tools and data. n8n supports both sides of it:

- **As an MCP client**, n8n lets agents and the AI Agent node use tools from MCP servers, either from the one-click server registry or through the MCP Client Tool node.
- **As an MCP server**, n8n lets MCP clients such as Claude connect to your instance. The instance-level MCP server lets a client build, edit, run, and test workflows and manage data tables and agents. The MCP Server Trigger node exposes a single workflow's tools as its own MCP server.

Learn more: [MCP servers](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/mcp-servers) and [Set up and use n8n MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server).

### n8n Assistant

n8n Assistant is a chat-based agent in n8n that helps you create, edit, test, and troubleshoot workflows from natural language. It can also build agents and help with instance tasks. n8n Assistant is in Preview. Learn more: [Use n8n Assistant](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/n8n-assistant).

### root node (n8n) <a href="#root-node-n8n" id="root-node-n8n"></a>

Each n8n cluster node contains a single root node that defines the main function of the cluster, such as running an AI agent or a chain. One or more sub-nodes attach to the root node to extend its features. Learn more: [Cluster nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes).

### skill (n8n)

A skill bundles instructions with the tools an agent needs for a specific task. Add a skill to an agent to reuse that behavior. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#bundle-capabilities-with-skills).

### sub-agent (n8n)

A sub-agent is a published agent that another agent can hand work to. Use sub-agents when a task has separate parts and a specialized agent can handle each part better. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#add-sub-agents).

### sub-node (n8n) <a href="#sub-node-n8n" id="sub-node-n8n"></a>

n8n cluster nodes consist of one or more sub-nodes connected to a root node. Sub-nodes extend the features of the root node, providing access to specific services or resources, such as chat models, memory, and vector stores, or offering specific types of dedicated processing, like a calculator. Learn more: [Sub-nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes).

### tool approval (n8n)

Tool approval is a human-in-the-loop check on an AI tool call. For a sensitive tool, the agent pauses and waits for a person to approve or reject the call before the tool runs. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#approve-tool-calls) and [Human-in-the-loop for AI tool calls](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/ai-examples/human-in-the-loop-for-tools).

## General AI terms

These terms aren't specific to n8n. Each definition explains how the term applies when you build AI workflows in n8n.

### AI embedding <a href="#ai-embedding" id="ai-embedding"></a>

Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or [vector stores](#ai-vector-store), are databases designed to store and access embeddings. Learn more: [What are vector databases?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/store-and-search-data-with-vectors).

### AI groundedness <a href="#ai-groundedness" id="ai-groundedness"></a>

In AI, and specifically in retrieval-augmented generation (RAG) contexts, groundedness and ungroundedness are measures of how much a model's responses accurately reflect source information. The model uses its source documents to generate grounded responses, while ungrounded responses involve speculation or hallucination unsupported by those same sources. Learn more: [RAG in n8n](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/retrieve-relevant-context).

### AI hallucination <a href="#ai-hallucination" id="ai-hallucination"></a>

A hallucination is output from an LLM (large language model) that sounds plausible but is false or unsupported by any source. Techniques such as RAG reduce hallucinations by grounding responses in source documents. Learn more: [RAG in n8n](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/retrieve-relevant-context).

### AI reranking <a href="#ai-reranking" id="ai-reranking"></a>

Reranking is a technique that refines the order of a list of candidate documents to improve the relevance of search results. Retrieval-augmented generation (RAG) and other applications use reranking to surface the most relevant information for generation or downstream tasks. Learn more: [Reranker Cohere](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.rerankercohere).

### AI retrieval-augmented generation (RAG) <a href="#ai-retrieval-augmented-generation-rag" id="ai-retrieval-augmented-generation-rag"></a>

Retrieval-augmented generation, or RAG, is a technique for providing LLMs access to new information from external sources to improve AI responses. RAG systems retrieve relevant documents to ground responses in up-to-date, domain-specific, or proprietary knowledge to supplement their original training data. RAG systems often rely on vector stores to manage and search this external data efficiently. Learn more: [RAG in n8n](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/retrieve-relevant-context).

### AI vector store <a href="#ai-vector-store" id="ai-vector-store"></a>

A vector store, or vector database, stores embeddings and returns the ones closest in meaning to a query. Combine a vector store with embeddings and a retriever to give your AI access to your own data. Learn more: [What are vector databases?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/store-and-search-data-with-vectors).

### LangChain <a href="#langchain" id="langchain"></a>

LangChain is an AI-development framework used to work with large language models (LLMs). LangChain provides a standardized system for working with a wide variety of models and other resources and linking different components together to build complex applications. n8n represents most LangChain concepts as cluster nodes. Learn more: [LangChain in n8n](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/langchain-in-n8n).

### Large language model (LLM) <a href="#large-language-model-llm" id="large-language-model-llm"></a>

Large language models, or LLMs, are AI machine learning models designed to excel in natural language processing (NLP) tasks. They're built by training on large amounts of data to develop probabilistic models of language and other data. In n8n, you connect an LLM to an agent or chain with a chat model sub-node. Learn more: [Sub-nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes).

## Organize, run, and publish

### draft (n8n)

A draft is the working version of a workflow, or of an agent. n8n saves your edits to the draft automatically, and the draft doesn't run in production until you publish it. See also [publish](#publish-n8n). Learn more: [Save and publish workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/save-and-publish-workflows).

### evaluation (n8n) <a href="#evaluation-n8n" id="evaluation-n8n"></a>

An evaluation tests a workflow by running a dataset of test cases through it and checking the results against expected outputs or metrics. Use evaluations to confirm that an AI workflow stays reliable as you change models, prompts, or logic. Learn more: [Evaluations](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/test-and-improve-ai-workflows/understand-why-to-test).

### execution (n8n)

An execution is a single run of a workflow. A manual execution starts when you run the workflow from the editor. A production execution starts automatically when a published workflow's trigger fires. Learn more: [Executions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/understand-executions).

### project (n8n) <a href="#project-n8n" id="project-n8n"></a>

n8n projects let you separate workflows, variables, credentials, data tables, and agents into separate groups for easier management. Projects make it easier for teams to collaborate by sharing and compartmentalizing related resources. You assign each user a role in each project, so one person can have different access in different projects. Learn more: [RBAC projects](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects).

### publish (n8n)

n8n saves your changes to a workflow as you edit. When you're ready to put the workflow into production, you publish a version of it. The published version runs when its trigger fires. Learn more: [Save and publish workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/save-and-publish-workflows).

## Hosting, editions, and licensing

### edition (n8n) <a href="#edition-n8n" id="edition-n8n"></a>

When you self-host n8n, the edition is the variant of the software you run: Community, Registered Community, Business, or Enterprise. All editions share the same underlying product. The free Community edition runs without a license key. When you subscribe to a paid Business or Enterprise plan, you get a license key that unlocks the features for that plan. See also [plan](#plan-n8n) and [license](#license-n8n). Learn more: [Compare plans and editions](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/community-edition-features).

### entitlement (n8n) <a href="#entitlement-n8n" id="entitlement-n8n"></a>

In n8n, entitlements grant n8n instances access to plan-restricted features for a specific period of time.

Floating entitlements are a pool of entitlements that you can distribute among various n8n instances. You can reassign a floating entitlement to transfer its access to a different n8n instance. See also [license](#license-n8n) and [plan](#plan-n8n). Learn more: [License key](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/manage-your-license).

### instance (n8n)

An instance is a single n8n installation, either hosted by n8n Cloud or self-hosted. Each instance has its own workflows, users, credentials, and settings. Learn more: [Choose how to use n8n](choose-how-to-use-n8n.md).

### license (n8n) <a href="#license-n8n" id="license-n8n"></a>

License has two senses in n8n. First, it's the legal terms n8n uses to distribute its source code. Second, it's the license key that unlocks the features for a paid plan. When you self-host and subscribe to a paid Business or Enterprise plan, you add the license key to your instance to activate it. See also [entitlement](#entitlement-n8n) and [plan](#plan-n8n). Learn more: [License key](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/manage-your-license).

### plan (n8n) <a href="#plan-n8n" id="plan-n8n"></a>

A plan is a commercial subscription tier, such as Starter, Pro, Business, or Enterprise. Your plan sets the features, usage limits, and price for your subscription, whether you use n8n Cloud or self-host. See also [edition](#edition-n8n) and [license](#license-n8n). Learn more: [Compare plans and editions](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/community-edition-features).

### queue mode (n8n)

Queue mode is a self-hosted scaling setup. A main instance receives triggers and passes executions to worker instances, which run them in parallel. Learn more: [Queue mode](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/enable-queue-mode).

## Related resources

* [n8n Docs](./)
* [Choose how to use n8n](choose-how-to-use-n8n.md)
* [Build your first workflow](build-your-first-workflow.md)
* [Learning paths](learning-paths.md)
