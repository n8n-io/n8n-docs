---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n Glossary
description: A glossary of terms commonly used when working with n8n and related software.
contentType: reference
---

#### AI agent

AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.

#### AI chain

AI chains allow you to interact with large language models (LLMs) and other resources in sequences of calls to components. AI chains in n8n don't use persistent memory, so you can't use them to reference previous context (use AI agents for this).

#### AI embedding

Embeddings are numerical representations of data using vectors. They're used by AI to interpret complex data and relationships by mapping values across many dimensions. Vector databases, or vector stores, are databases designed to store and access embeddings.

#### AI reranking

Reranking is a technique that refines the order of a list of candidate documents to improve the relevance of search results. Retrieval-Augmented Generation (RAG) and other applications use reranking to prioritize the most relevant information for generation or downstream tasks.

#### AI memory

In an AI context, memory allows AI tools to persist message context across interactions. This allows you to have a continuing conversations with AI agents, for example, without submitting ongoing context with each message. In n8n, AI agent nodes can use memory, but AI chains can't.

#### AI tool

In an AI context, a tool is an add-on resource that the AI can refer to for specific information or functionality when responding to a request. The AI model can use a tool to interact with external systems or complete specific, focused tasks.

#### AI vector store

Vector stores, or vector databases, are databases designed to store numerical representations of information called embeddings.

#### API

APIs, or application programming interfaces, offer programmatic access to a service's data and functionality. APIs make it easier for software to interact with external systems. They're often offered as an alternative to traditional user-focused interfaces accessed through web browsers or UI.

#### canvas (n8n)

The canvas is the main interface for building workflows in n8n's editor UI. You use the canvas to add and connect nodes to compose workflows.

#### cluster node (n8n)

In n8n, cluster nodes are groups of nodes that work together to provide functionality in a workflow. They consist of a root node and one or more sub nodes that extend the node's functionality.

#### credential (n8n)

In n8n, credentials store authentication information to connect with specific apps and services. After creating credentials with your authentication information (username and password, API key, OAuth secrets, etc.), you can use the associated app node to interact with the service.

#### data pinning (n8n)

Data pinning allows you to temporarily freeze the output data of a node during workflow development. This allows you to develop workflows with predictable data without making repeated requests to external services. Production workflows ignore pinned data and request new data on each execution.

#### editor (n8n)

The n8n editor UI allows you to create and manage workflows. The main area is the canvas, where you can compose workflows by adding, configuring, and connecting nodes. The side and top panels allow you to access other areas of the UI like credentials, templates, variables, executions, and more.

#### entitlement (n8n)

In n8n, entitlements grant n8n instances access to plan-restricted features for a specific period of time.

Floating entitlements are a pool of entitlements that you can distribute among various n8n instances. You can re-assign a floating entitlement to transfer its access to a different n8n instance.

#### evaluation (n8n)

In n8n, evaluation allows you to tag and organize execution history and compare it against new executions. You can use this to understand how your workflow performs over time as you make changes. In particular, this is useful while developing AI-centered workflows.

#### expression (n8n)

In n8n, expressions allow you to populate node parameters dynamically by executing JavaScript code. Instead of providing a static value, you can use the n8n expression syntax to define the value using data from previous nodes, other workflows, or your n8n environment.

#### LangChain

LangChain is an AI-development framework used to work with large language models (LLMs). LangChain provides a standardized system for working with a wide variety of models and other resources and linking different components together to build complex applications.

#### Large language model (LLM)

Large language models, or LLMs, are AI machine learning models designed to excel in natural language processing (NLP) tasks. They're built by training on large amounts of data to develop probabilistic models of language and other data.

#### node (n8n)

In n8n, nodes are individual components that you compose to create workflows. Nodes define when the workflow should run, allow you to fetch, send, and process data, can define flow control logic, and connect with external services.

#### project (n8n)

n8n projects allow you to separate workflows, variables, and credentials into separate groups for easier management. Projects make it easier for teams to collaborate by sharing and compartmentalizing related resources.

#### root node (n8n)

Each n8n cluster node contains a single root nodes that defines the main functionality of the cluster. One or more sub nodes attach to the root node to extend its functionality.

#### sub node (n8n)

n8n cluster nodes consist of one or more sub nodes connected to a root node. Sub nodes extend the functionality of the root node, providing access to specific services or resources or offering specific types of dedicated processing, like calculator functionality, for example.

#### template (n8n)

n8n templates are pre-built workflows designed by n8n and community members that you can import into your n8n instance. When using templates, you may need to fill in credentials and adjust the configuration to suit your needs.

#### trigger node (n8n)

A trigger node is a special node responsible for executing the workflow in response to certain conditions. All production workflows need at least one trigger to determine when the workflow should run.

#### workflow (n8n)

An n8n workflow is a collection of nodes that automate a process. Workflows begin execution when a trigger condition occurs and execute sequentially to achieve complex tasks.

<!-- To do
#### OAuth
#### pagination
#### Role-based access control (RBAC)
#### SAML/SSO
#### two-factor authentication (2FA)
#### webhook
-->
