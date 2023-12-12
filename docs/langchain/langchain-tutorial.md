---
description: Learn how to build AI workflows using n8n's LangChain implementation. You'll build a chat workflow that uses ChatGPT and pulls in data from other n8n workflows.
type: tutorial
---

# Tutorial: Build an AI workflow in n8n

This tutorial introduces LangChain functionality in n8n. You can work through it with no prior knowledge of LangChain, AI, or n8n. However, if you've never used n8n before, you should also do the [Longer quickstart](/try-it-out/longer-introduction/), which introduces key n8n concepts.

In this tutorial you will:

* Create a workflow from scratch. It uses the Manual Chat Trigger to simulate and test chat interactions, ChatGPT to power the chat functionality, and a custom tool to connect to other n8n workflows.
* Understand key concepts, including:
	* The role of agents, models, and tools when building AI functionality.
	* Cluster nodes in n8n: groups of root and sub-node.
	* Loading your own data into AI workflows.

## Step one: Sign up for n8n

--8<-- "_snippets/try-it-out/install-run-n8n.md"

## Step two: New workflow

--8<-- "_snippets/try-it-out/new-workflow.md"

## Step three: Add a trigger node

A trigger node starts a workflow. For this tutorial, use the [Manual Chat Trigger](/integrations/builtin/core-nodes/n8n-nodes-langchain.manualchattrigger/). This provides a chat interface that you can use to test the workflow.

1. Select **Add first step**.
1. Search for **Manual Chat Trigger**. n8n shows a list of nodes that match the search.
1. Select **Manual Chat Trigger** to add the node to the canvas. n8n opens the node.
1. Close the node details view to return to the canvas.

## Step four: Add an agent

An agent takes an input, such as a user query, then uses a collection of tools to respond. In n8n the AI Agent node is a root node: a node whose behavior you can configure using sub-nodes.

??? Details "Cluster nodes: root and sub-nodes"
	--8<-- "_snippets/integrations/builtin/cluster-nodes/cluster-nodes-summary.md"

1. Select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node.png)</span> connector. n8n opens the nodes panel.
1. Search for **Agent**. n8n shows a list of nodes that match the search.
1. Select **AI Agent**. n8n adds the node to the canvas and opens it.
1. Close the node details view to return to the canvas.

## Step five: Chat functionality

To provide chat interactions, the workflow needs:

* A chat model, to process chat inputs and generate responses.
* Memory, so that the workflow can remember and use previous sections of the chat.

Use the connectors on the bottom of the AI Agent node to connect the following:

* **Model**: OpenAI Chat Model. 
	Set up the credentials for this node.
	??? Details "Credential setup steps"
		1. Create an account with [OpenAI](https://openai.com/){:target=_blank .external-link}. 1. [Create API key](https://platform.openai.com/api-keys){:target=_blank .external-link}. 
		1. In the OpenAI Chat Model node, select **Credential to connect with** > **Create New Credential** to open the credential modal.
		1. Paste the API key into **API Key**.
		1. Select **Save**. n8n tests the connection and confirms if the key is working.
		1. Close the credential modal.
* **Memory**: Window Buffer Memory

## Step six: 

## Next steps

* Read [What product people need to know about LangChain](https://www.commandbar.com/blog/langchain-guide){:target=_blank .external-link} to learn more about AI concepts and terminology.
* Explore n8n using the [Quickstarts](/try-it-out/) and [Workflow templates](https://n8n.io/workflows/){:target=_blank .external-link}.
