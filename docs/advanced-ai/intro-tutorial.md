---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Learn how to build AI workflows with n8n
type: tutorial
---

# Tutorial: Build an AI chat agent with n8n

- TODO: Introduction text

!["Screenshot of the completed workflow"](/_images/advanced-ai/ai-intro01.png)


Many people find it easier to take in new information in video format. This tutorial is based on one of our accompanying videos, linked below. Watch the video or read the steps here, or both!

<iframe width="560" height="315" src="https://www.youtube.com/embed/yzvLfHb0nqE?si=7ruaUEycFcoQbYsD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### What you will need

- n8n. For this tutorial we recommend using the [n8n cloud](/choose-n8n/cloud/) service - there is a free trial for new users!. For a self hosted service, refer to the [installation pages](/hosting/installation/docker/).
- Credentials for a chat model. This tutorial will use OpenAI, but you can easily user DeepSeek, Google Gemini, Groq, Azure and others (see the [sub-nodes documentation](/integrations/builtin/cluster-nodes/sub-nodes/) for more).

### What you will learn

- Concepts of AI in n8n
- How to use the AI Agent node
- Working with Chat input
- Connecting with AI models
- Customising input
- Observing the conversation
- Adding persistence

## AI concepts in n8n

If you're already familiar with AI, feel free to skip this section. This is a basic introduction to AI concepts and how they can be used in n8n workflows.

An AI agent builds on Large Language Models (LLMs), which generate text based on input by predicting the next word. While LLMs only process input to produce output, AI agents add goal-oriented functionality. They can use tools, process their outputs, and make decisions to complete tasks and solve problems.

In n8n, the AI agent is represented as a node with some extra connections. 

| Feature             | LLM                        | AI Agent                           |
|---------------------|----------------------------|------------------------------------|
| Core Capability     | Text generation            | Goal-oriented task completion      |
| Decision-Making     | None                       | Yes                                |
| Uses Tools/APIs     | No                         | Yes                                |
| Workflow Complexity | Single-step                | Multi-step                         |
| Scope               | Generates language         | Performs complex, real-world tasks |
| Example             | LLM generating a paragraph | An agent scheduling an appointment |

By incorporating the AI agent as a node, n8n can combine AI-driven steps with traditional programming for efficient, real-world workflows. For instance, simpler tasks like validating an email address does not require AI, whereas a complex tasks like processing the _content_ of an email or dealing with multimodal inputs (e.g., images, audio) is an excellent use of an AI agent.

## 1. Create a new workflow

--8<-- "_snippets/try-it-out/new-workflow.md"

## 2. Add a trigger node

Every workflow needs somewhere to start. In n8n these are called 'trigger nodes'. For this workflow, we want to start with a chat node.

 1. Select **Add first step** or press ++Tab++ to open the node menu.

 1. Search for **Chat Trigger**. n8n shows a list of nodes that match the search.

 1. Select **Chat Trigger** to add the node to the canvas. n8n opens the node.

 1. Close the node details view (Select **Back to canvas**) to return to the canvas.

??? explanation "Explanation..."
    The trigger node generates output when there is an event causing it to trigger. In this case we want to be able to type in text to cause the workflow to run. In production, this trigger can be hooked up to a public chat interface as provided by n8n or embedded into another website. To start this simple workflow we will just use the built-in local chat interface to communicate, so no further setup is required.

<n8n-demo workflow="%7B%0A%20%20%22name%22%3A%20%22AI%20tutorial%22%2C%0A%20%20%22nodes%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22%40n8n%2Fn8n-nodes-langchain.chatTrigger%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201.1%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20-200%2C%0A%20%20%20%20%20%20%20%20-40%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22a2d42e1f-36df-4a6a-a3b4-99a162074d11%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22When%20chat%20message%20received%22%2C%0A%20%20%20%20%20%20%22webhookId%22%3A%20%2297c1a41f-8ef0-4d63-a924-92eb634384d3%22%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22pinData%22%3A%20%7B%7D%2C%0A%20%20%22connections%22%3A%20%7B%7D%2C%0A%20%20%22active%22%3A%20false%2C%0A%20%20%22settings%22%3A%20%7B%0A%20%20%20%20%22executionOrder%22%3A%20%22v1%22%0A%20%20%7D%2C%0A%20%20%22versionId%22%3A%20%22b1641385-c6b0-48a8-8e26-20d1f6bd7fda%22%2C%0A%20%20%22meta%22%3A%20%7B%0A%20%20%20%20%22instanceId%22%3A%20%22cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7%22%0A%20%20%7D%2C%0A%20%20%22id%22%3A%20%22l05TkWXXYbOiuL4o%22%2C%0A%20%20%22tags%22%3A%20%5B%5D%0A%7D"></n8n-demo>

## 3. Add an AI Agent Node

??? explanation "Explanation..."
    Some text with a more detailed explanation of this step

<n8n-demo workflow="%7B%0A%20%20%22name%22%3A%20%22AI%20tutorial%22%2C%0A%20%20%22nodes%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22%40n8n%2Fn8n-nodes-langchain.chatTrigger%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201.1%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20-300%2C%0A%20%20%20%20%20%20%20%20-40%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22a2d42e1f-36df-4a6a-a3b4-99a162074d11%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22When%20chat%20message%20received%22%2C%0A%20%20%20%20%20%20%22webhookId%22%3A%20%2297c1a41f-8ef0-4d63-a924-92eb634384d3%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22%40n8n%2Fn8n-nodes-langchain.agent%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201.7%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20-80%2C%0A%20%20%20%20%20%20%20%20-40%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%220f61a10f-668f-42f7-b835-cf3efb60082a%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22AI%20Agent%22%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22pinData%22%3A%20%7B%7D%2C%0A%20%20%22connections%22%3A%20%7B%0A%20%20%20%20%22When%20chat%20message%20received%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22AI%20Agent%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20%22active%22%3A%20false%2C%0A%20%20%22settings%22%3A%20%7B%0A%20%20%20%20%22executionOrder%22%3A%20%22v1%22%0A%20%20%7D%2C%0A%20%20%22versionId%22%3A%20%22b1641385-c6b0-48a8-8e26-20d1f6bd7fda%22%2C%0A%20%20%22meta%22%3A%20%7B%0A%20%20%20%20%22instanceId%22%3A%20%22cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7%22%0A%20%20%7D%2C%0A%20%20%22id%22%3A%20%22l05TkWXXYbOiuL4o%22%2C%0A%20%20%22tags%22%3A%20%5B%5D%0A%7D"></n8n-demo>

## 4. Configure the node
  
- AI agents require a chat model (e.g., a large language model like GPT) to function.
- Add a chat model by clicking the plus (+) button and connecting to a model (e.g., OpenAI GPT).

## 5. Add credentials (if needed)

- explain credentials

??? explanation "Keeping your credentials safe"
    Some text with a more detailed explanation of this step


## 6. Test the node:

- Use the chat trigger to test the workflow by sending a sample message (e.g., “Hello”).
- Check the logs to see:
    - Input Data: Data received from the trigger (e.g., session ID, chat message).
    - Output Data: The response generated by the AI agent (e.g., “Hello, how can I assist you today?”).

## 7. Changing the prompt:

- changing the prompt settings
- demonstrate the changes

## 8. Persistence:
    
- demonstrate lack of persistence
- add memory


## 9. saving the workflow

## Congratulations!

TODO: summary of what was achieved

<n8n-demo workflow="%7B%0A%20%20%22name%22%3A%20%22AI%20tutorial%22%2C%0A%20%20%22nodes%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22%40n8n%2Fn8n-nodes-langchain.chatTrigger%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201.1%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20-300%2C%0A%20%20%20%20%20%20%20%20-40%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22a2d42e1f-36df-4a6a-a3b4-99a162074d11%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22When%20chat%20message%20received%22%2C%0A%20%20%20%20%20%20%22webhookId%22%3A%20%2297c1a41f-8ef0-4d63-a924-92eb634384d3%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22%40n8n%2Fn8n-nodes-langchain.agent%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201.7%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20-80%2C%0A%20%20%20%20%20%20%20%20-40%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%220f61a10f-668f-42f7-b835-cf3efb60082a%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22AI%20Agent%22%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22model%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22__rl%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%22mode%22%3A%20%22list%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22value%22%3A%20%22gpt-4o-mini%22%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%22options%22%3A%20%7B%7D%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22%40n8n%2Fn8n-nodes-langchain.lmChatOpenAi%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201.2%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%20-100%2C%0A%20%20%20%20%20%20%20%20160%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22b8129c6d-f201-4378-8f66-ce9a6cfd5f3b%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22OpenAI%20Chat%20Model%22%2C%0A%20%20%20%20%20%20%22credentials%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22openAiApi%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22id%22%3A%20%22jiPPcYV9I70iKapN%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22name%22%3A%20%22OpenAi%20account%2037%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22parameters%22%3A%20%7B%7D%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22%40n8n%2Fn8n-nodes-langchain.memoryBufferWindow%22%2C%0A%20%20%20%20%20%20%22typeVersion%22%3A%201.3%2C%0A%20%20%20%20%20%20%22position%22%3A%20%5B%0A%20%20%20%20%20%20%20%2020%2C%0A%20%20%20%20%20%20%20%20180%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%22id%22%3A%20%22afbab05c-1e87-4f7a-9d66-c86f9db1ec64%22%2C%0A%20%20%20%20%20%20%22name%22%3A%20%22Window%20Buffer%20Memory%22%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22pinData%22%3A%20%7B%7D%2C%0A%20%20%22connections%22%3A%20%7B%0A%20%20%20%20%22When%20chat%20message%20received%22%3A%20%7B%0A%20%20%20%20%20%20%22main%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22AI%20Agent%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22main%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22OpenAI%20Chat%20Model%22%3A%20%7B%0A%20%20%20%20%20%20%22ai_languageModel%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22AI%20Agent%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22ai_languageModel%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22Window%20Buffer%20Memory%22%3A%20%7B%0A%20%20%20%20%20%20%22ai_memory%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%5B%0A%20%20%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22node%22%3A%20%22AI%20Agent%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22type%22%3A%20%22ai_memory%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22index%22%3A%200%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%5D%0A%20%20%20%20%20%20%5D%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%20%20%22active%22%3A%20false%2C%0A%20%20%22settings%22%3A%20%7B%0A%20%20%20%20%22executionOrder%22%3A%20%22v1%22%0A%20%20%7D%2C%0A%20%20%22versionId%22%3A%20%22b1641385-c6b0-48a8-8e26-20d1f6bd7fda%22%2C%0A%20%20%22meta%22%3A%20%7B%0A%20%20%20%20%22templateCredsSetupCompleted%22%3A%20true%2C%0A%20%20%20%20%22instanceId%22%3A%20%22cb484ba7b742928a2048bf8829668bed5b5ad9787579adea888f05980292a4a7%22%0A%20%20%7D%2C%0A%20%20%22id%22%3A%20%22l05TkWXXYbOiuL4o%22%2C%0A%20%20%22tags%22%3A%20%5B%5D%0A%7D" frame="true">



## Next steps


* Learn more about AI concepts and view examples in [Examples and concepts](/advanced-ai/examples/introduction/).
* Browse AI [Workflow templates](https://n8n.io/workflows/?categories=25){:target=_blank .external-link}.
* ...
* ...
