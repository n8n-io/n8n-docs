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

The canvas is the main area of the editor where you build workflows. You add nodes to the canvas and connect them to compose a workflow. Learn more: [Create and run workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-run-workflows).

### community node (n8n) <a href="#community-node-n8n" id="community-node-n8n"></a>

A community node is a node built and shared by the community, not one of n8n's built-in nodes. You install community nodes on your instance to add integrations that n8n doesn't provide. Learn more: [Using community nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/community-nodes/using-community-nodes).

### credential (n8n) <a href="#credential-n8n" id="credential-n8n"></a>

Credentials store the authentication details n8n needs to connect to an app or service, such as a username and password, an API key, or OAuth secrets. You create a credential once, then select it in the nodes that use that service. Workflows reference credentials by name and ID, and don't contain the secrets themselves. Learn more: [Create and edit credentials](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-edit-credentials).

### editor (n8n) <a href="#editor-n8n" id="editor-n8n"></a>

The editor is the n8n UI where you create and manage workflows. Its main area is the canvas. Other areas of the UI let you manage credentials, templates, executions, and other resources. Learn more: [Create and run workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-run-workflows).

### expression (n8n) <a href="#expression-n8n" id="expression-n8n"></a>

Expressions set node parameters dynamically using JavaScript. Instead of a static value, you write an expression that uses data from previous nodes, other workflows, or your n8n environment. Learn more: [Expressions for data transformation](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/transform-data/expressions-for-data-transformation).

### Gateway credits (n8n)

Gateway credits let you run supported AI models and third-party services in your workflows without creating provider accounts or setting up credentials. n8n routes the requests through its own gateway and bills the usage from your instance's prepaid credit balance. Learn more: [Use Gateway credits](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/use-gateway-credits).

### node (n8n) <a href="#node-n8n" id="node-n8n"></a>

Nodes are the components you connect to build a workflow. A node can start the workflow, fetch, send, or process data, control the flow of execution, or connect to an external service. Learn more: [Work with nodes](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/workflow-components/work-with-nodes).

### sub-workflow (n8n)

A sub-workflow is a workflow that another workflow calls. Use sub-workflows to split a large workflow into smaller, reusable parts. Learn more: [Sub-workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/break-workflows-into-smaller-parts).

### template (n8n) <a href="#template-n8n" id="template-n8n"></a>

Templates are pre-built workflows from n8n and community members that you can import into your instance. After you import a template, you may need to add credentials and adjust the configuration. Learn more: [Workflow templates](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/use-templates).

### trigger node (n8n) <a href="#trigger-node-n8n" id="trigger-node-n8n"></a>

A trigger node starts a workflow when an event or condition occurs, such as a schedule, an incoming request, or a new message. A workflow that runs automatically needs at least one trigger. Learn more: [Trigger nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/trigger-nodes).

### webhook (n8n)

A webhook is a URL that receives HTTP requests from other services. The Webhook node uses a webhook to start a workflow when a request arrives. Learn more: [Webhook node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/core-nodes/n8n-nodes-base.webhook).

### workflow (n8n) <a href="#workflow-n8n" id="workflow-n8n"></a>

A workflow is a set of connected nodes that automates a process. A workflow runs when a trigger fires, when you run it manually, or when another workflow calls it. Data passes from node to node, and a workflow can branch, merge, and loop. Learn more: [Create and run workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/create-and-run-workflows).

## Data

### binary data (n8n)

Binary data is file-type data, such as images and documents. An item holds binary data in its `binary` object, separate from its `json` data. Learn more: [Binary data](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/handle-special-data-types/work-with-files-and-images).

### data pinning (n8n) <a href="#data-pinning-n8n" id="data-pinning-n8n"></a>

Data pinning temporarily freezes the output data of a node during workflow development. This lets you build with predictable data without making repeated requests to external services. Production workflows ignore pinned data and request new data on each execution. Learn more: [Data mocking and pinning](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/pin-and-mock-data).

### data table (n8n)

A data table stores structured, tabular data inside n8n. Workflows in the same project can read and write a data table without an external database. Learn more: [Data tables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/data-tables).

### item (n8n)

An item is a single record of data that passes between nodes. A node receives and returns an array of items, and most nodes run their operation once for each item. Each item holds its data in a `json` object, plus an optional `binary` object for files. Learn more: [How n8n structures data](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/work-with-data/understand-n8ns-data-structure).

### variable (n8n)

A custom variable stores a read-only value that you reuse across workflows. A variable is either global, available across the whole instance, or scoped to a single project. Learn more: [Custom variables](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/code-in-n8n/define-custom-variables).

## Agents and AI in n8n

### agent (n8n)

An agent is an autonomous assistant you build in n8n. Each agent has a language model, instructions, and capabilities you configure, such as tools, [skills](#skill-n8n), memory, a [knowledge base](#knowledge-base-n8n), and [sub-agents](#sub-agent-n8n). Agents are separate items in your project, not part of a workflow, and people reach them through chat, channels, and schedules. Agents are in Preview. Don't confuse an agent with the [AI Agent node](#ai-agent-node-n8n), which runs inside a workflow. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents).

### AI agent <a href="#ai-agent" id="ai-agent"></a>

An AI agent is a system that uses a large language model (LLM) to interpret a request and decide which actions to take, such as calling tools, to complete it. In n8n you can build an AI agent in two ways: as an [agent](#agent-n8n), or with the [AI Agent node](#ai-agent-node-n8n) in a workflow. Learn more: [What's an agent in AI?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/what-agents-do).

### AI Agent node (n8n)

The AI Agent node adds an AI agent to a workflow. It's a cluster node: a root node that you extend with sub-nodes, such as a chat model, tools, and memory. It's a different feature from an [agent](#agent-n8n) built in the Agent Builder. Learn more: [AI Agent node](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent).

### AI chain <a href="#ai-chain" id="ai-chain"></a>

An AI chain calls an LLM and other components in a fixed sequence. Unlike an agent, a chain doesn't decide which steps to take. Chains in n8n don't use persistent memory, so they can't reference previous context. Use an AI agent when you need that. Learn more: [What's a chain in AI?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/what-chains-do).

### AI memory <a href="#ai-memory" id="ai-memory"></a>

Memory lets an AI keep message context across interactions. This gives you an ongoing conversation with an AI agent, without sending the full history with each message. In n8n, agents and the AI Agent node can use memory. AI chains can't. Learn more: [What's memory in AI?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/how-memory-works).

### AI tool <a href="#ai-tool" id="ai-tool"></a>

A tool is a resource an AI agent can call to get information or take an action, such as searching the web, calling an API, or running a workflow. The model decides when to use a tool to answer a request. Learn more: [What's a tool in AI?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/how-tools-work).

### cluster node (n8n) <a href="#cluster-node-n8n" id="cluster-node-n8n"></a>

Cluster nodes are groups of nodes that work together to provide functionality in a workflow. A cluster node consists of a root node and one or more sub-nodes that extend its functionality. Learn more: [Cluster nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes).

### knowledge base (n8n)

A knowledge base is a set of files that an [agent](#agent-n8n) can search and read for context when it answers. You upload files to the agent, such as CSV, PDF, Markdown, and text files. Knowledge bases are available on n8n Cloud, and in Preview on self-hosted instances. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#upload-knowledge).

### Model Context Protocol (MCP)

Model Context Protocol (MCP) is an open standard that lets AI clients connect to external tools and data. n8n works as an MCP client, so agents can use tools from MCP servers. n8n also works as an MCP server, so supported MCP clients can connect to your instance. A connected client can search the workflows you can view, but it gets previews only. To let a client read full workflow data, run a workflow, or edit it, you enable MCP access on the instance and then enable each workflow individually. Learn more: [MCP servers](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/mcp-servers) and [Set up and use n8n MCP server](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/connect-to-n8n-mcp-server).

### n8n Assistant

n8n Assistant is a chat-based agent in n8n that helps you create, edit, test, and troubleshoot workflows from natural language. It can also build agents and help with instance tasks. n8n Assistant is in Preview. Learn more: [Use n8n Assistant](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/ways-of-building-workflows/n8n-assistant).

### root node (n8n) <a href="#root-node-n8n" id="root-node-n8n"></a>

Each cluster node contains a single root node that defines its main functionality. You attach one or more sub-nodes to the root node to extend it. Learn more: [Cluster nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes).

### sandbox (n8n)

A sandbox is an isolated environment that agents and n8n Assistant use to run code. They share one sandbox connection. n8n Cloud manages the connection. On self-hosted instances, an instance owner or admin configures a sandbox provider. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#configure-the-shared-sandbox).

### skill (n8n)

A skill bundles instructions with the tools an agent needs for a specific task. Add a skill to an agent to reuse that behavior. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#bundle-capabilities-with-skills).

### sub-agent (n8n)

A sub-agent is a published agent that another agent can hand work to. Use sub-agents when a task has separate parts and a specialized agent can handle each part better. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#add-sub-agents).

### sub-node (n8n) <a href="#sub-node-n8n" id="sub-node-n8n"></a>

A sub-node connects to the root node of a cluster node and extends it. Sub-nodes provide access to specific services or resources, or add dedicated processing, such as a calculator. Learn more: [Sub-nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes).

### tool approval (n8n)

Tool approval is a human-in-the-loop check on an AI tool call. For a sensitive tool, the agent pauses and waits for a person to approve or reject the call before the tool runs. Learn more: [Build and manage agents](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/build-and-manage-agents#approve-tool-calls) and [Human-in-the-loop for AI tool calls](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/ai-examples/human-in-the-loop-for-tools).

## General AI terms

These terms aren't specific to n8n. Each definition explains how the term applies when you build AI workflows in n8n.

### AI embedding <a href="#ai-embedding" id="ai-embedding"></a>

Embeddings are numerical representations of data as vectors. AI uses them to interpret complex data and relationships, because content with related meaning has nearby vectors. You store embeddings in a [vector store](#ai-vector-store). Learn more: [What are vector databases?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/store-and-search-data-with-vectors).

### AI groundedness <a href="#ai-groundedness" id="ai-groundedness"></a>

In retrieval-augmented generation (RAG), groundedness measures how well a model's response reflects its source information. A grounded response uses the source documents. An ungrounded response includes speculation or hallucination that those sources don't support. Learn more: [RAG in n8n](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/retrieve-relevant-context).

### AI hallucination <a href="#ai-hallucination" id="ai-hallucination"></a>

A hallucination is output from an LLM that sounds plausible but is false or unsupported by any source. Techniques such as RAG reduce hallucinations by grounding responses in source documents. Learn more: [RAG in n8n](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/retrieve-relevant-context).

### AI reranking <a href="#ai-reranking" id="ai-reranking"></a>

Reranking refines the order of a list of candidate documents to improve the relevance of search results. RAG and other applications use reranking to surface the most relevant information for generation or downstream tasks. Learn more: [Reranker Cohere](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.rerankercohere).

### AI retrieval-augmented generation (RAG) <a href="#ai-retrieval-augmented-generation-rag" id="ai-retrieval-augmented-generation-rag"></a>

Retrieval-augmented generation (RAG) gives an LLM access to information from external sources to improve its responses. A RAG system retrieves relevant documents and uses them to ground responses in up-to-date, domain-specific, or proprietary knowledge. RAG systems often rely on vector stores to manage and search that data. Learn more: [RAG in n8n](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/retrieve-relevant-context).

### AI vector store <a href="#ai-vector-store" id="ai-vector-store"></a>

A vector store, or vector database, stores embeddings and returns the ones closest in meaning to a query. Combine a vector store with embeddings and a retriever to give your AI access to your own data. Learn more: [What are vector databases?](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/understand-ai-components/store-and-search-data-with-vectors).

### LangChain <a href="#langchain" id="langchain"></a>

LangChain is an AI development framework for working with LLMs. It provides a standard way to use different models and resources and to link components together into complex applications. n8n represents most LangChain concepts as cluster nodes. Learn more: [LangChain in n8n](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/langchain-in-n8n).

### Large language model (LLM) <a href="#large-language-model-llm" id="large-language-model-llm"></a>

Large language models, or LLMs, are machine learning models trained on large amounts of data to work with natural language. In n8n, you connect an LLM to an agent or chain with a chat model sub-node. Learn more: [Sub-nodes](https://app.gitbook.com/s/BKcbOzIWja8NfqKDcqHc/builtin/cluster-nodes/sub-nodes).

## Organize and collaborate

### project (n8n) <a href="#project-n8n" id="project-n8n"></a>

Projects group related resources, such as workflows, credentials, variables, data tables, and agents, so teams can collaborate on them. You assign each user a role in each project, so one person can have different access in different projects. Learn more: [RBAC projects](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/organize-work-in-projects).

### role (n8n)

A role defines what a user can do. Instance roles apply across the whole instance. Project roles apply within a single project. Learn more: [RBAC role types](https://app.gitbook.com/s/wMJrGrimpx3PxCJpUswm/manage-users-and-access/set-permissions-and-roles-rbac/see-available-roles).

### tag (n8n)

Tags label workflows so you can filter them. Tags are global: a tag you create is available to every user on the instance. Learn more: [Workflow tags](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/manage-workflows/tag-workflows).

## Run and publish

### draft (n8n)

A draft is the working version of a workflow, or of an agent. n8n saves your edits to the draft automatically, and the draft doesn't run in production until you publish it. See also [publish](#publish-n8n). Learn more: [Save and publish workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/save-and-publish-workflows).

### error workflow (n8n)

An error workflow is a workflow that runs when another workflow's execution fails. Use it to send alerts or take other action on failure. Learn more: [Error handling](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/flow-logic/handle-errors-gracefully).

### evaluation (n8n) <a href="#evaluation-n8n" id="evaluation-n8n"></a>

An evaluation tests a workflow by running a dataset of test cases through it and checking the results against expected outputs or metrics. Use evaluations to confirm that an AI workflow stays reliable as you change models, prompts, or logic. Learn more: [Evaluations](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/integrate-ai/test-and-improve-ai-workflows/understand-why-to-test).

### execution (n8n)

An execution is a single run of a workflow. A manual execution starts when you run the workflow from the editor. A production execution starts automatically when a published workflow's trigger fires. Learn more: [Executions](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/understand-executions).

### publish (n8n)

n8n saves your changes to a workflow as you edit. When you're ready to put the workflow into production, you publish a version of it. The published version runs when its trigger fires. Learn more: [Save and publish workflows](https://app.gitbook.com/s/rPN1zU5jaYNvwH7RzxqA/understand-workflows/save-and-publish-workflows).

## Hosting, editions, and licensing

### edition (n8n) <a href="#edition-n8n" id="edition-n8n"></a>

When you self-host n8n, the edition is the variant of the software you run: Community, Registered Community, Business, or Enterprise. All editions share the same underlying product. The free Community edition runs without a license key. When you subscribe to a paid Business or Enterprise plan, you get a license key that unlocks the features for that plan. See also [plan](#plan-n8n) and [license](#license-n8n). Learn more: [Compare plans and editions](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/community-edition-features).

### entitlement (n8n) <a href="#entitlement-n8n" id="entitlement-n8n"></a>

Entitlements grant n8n instances access to plan-restricted features for a specific period of time.

Floating entitlements are a pool of entitlements that you can distribute among various n8n instances. You can reassign a floating entitlement to transfer its access to a different n8n instance. See also [license](#license-n8n) and [plan](#plan-n8n). Learn more: [License key](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/manage-your-license).

### instance (n8n)

An instance is a single n8n installation, either hosted by n8n Cloud or self-hosted. Each instance has its own workflows, users, credentials, and settings. Learn more: [Choose how to use n8n](choose-how-to-use-n8n.md).

### license (n8n) <a href="#license-n8n" id="license-n8n"></a>

License has two senses in n8n. First, it's the legal terms n8n uses to distribute its source code. Second, it's the license key that unlocks the features for a paid plan. When you self-host and subscribe to a paid Business or Enterprise plan, you add the license key to your instance to activate it. See also [entitlement](#entitlement-n8n) and [plan](#plan-n8n). Learn more: [License key](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/manage-your-license).

### plan (n8n) <a href="#plan-n8n" id="plan-n8n"></a>

A plan is a commercial subscription tier, such as Starter, Pro, Business, or Enterprise. Your plan sets the features, usage limits, and price of your subscription, whether you use n8n Cloud or self-host. See also [edition](#edition-n8n) and [license](#license-n8n). Learn more: [Compare plans and editions](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/community-edition-features).

### queue mode (n8n)

Queue mode is a self-hosted scaling setup. A main instance receives triggers and passes executions to worker instances, which run them in parallel. Learn more: [Queue mode](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/scaling/enable-queue-mode).

## Related resources

* [n8n Docs](./)
* [Choose how to use n8n](choose-how-to-use-n8n.md)
* [Build your first workflow](build-your-first-workflow.md)
* [Learning paths](learning-paths.md)
