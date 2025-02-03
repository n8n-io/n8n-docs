---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
description: Learn how to build AI workflows with n8n
type: tutorial
---

{{ macros_info() }}

# Tutorial: Build an AI chat agent with n8n

- TODO: Introduction text

!["Screenshot of the completed workflow"](/_images/advanced-ai/ai-intro01.png)

Many people find it easier to take in new information in video format. This tutorial is based on one of n8n's popular videos, linked below. Watch the video or read the steps here, or both!

<iframe width="560" height="315" src="https://www.youtube.com/embed/yzvLfHb0nqE?si=7ruaUEycFcoQbYsD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### What you will need

- **n8n**: For this tutorial we recommend using the [n8n cloud](/choose-n8n/cloud/) service - there is a free trial for new users!. For a self hosted service, refer to the [installation pages](/hosting/installation/docker/).
- **Credentials for a chat model**: This tutorial will use OpenAI, but you can easily user DeepSeek, Google Gemini, Groq, Azure and others (see the [sub-nodes documentation](/integrations/builtin/cluster-nodes/sub-nodes/) for more).

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

An AI agent builds on Large Language Models (LLMs), which generate text based
on input by predicting the next word. While LLMs only process input to produce
output, AI agents add goal-oriented functionality. They can use tools, process
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

By incorporating the AI agent as a node, n8n can combine AI-driven steps with traditional programming for efficient, real-world workflows. For instance, simpler tasks like validating an email address does not require AI, whereas a complex tasks like processing the _content_ of an email or dealing with multimodal inputs (e.g., images, audio) is an excellent use of an AI agent.

## 1. Create a new workflow

--8<-- "_snippets/try-it-out/new-workflow.md"

## 2. Add a trigger node

Every workflow needs somewhere to start. In n8n these are called 'trigger nodes'. For this workflow, we want to start with a chat node.

 1. Select **Add first step** or press ++tab++ to open the node menu.

 1. Search for **Chat Trigger**. n8n shows a list of nodes that match the search.

 1. Select **Chat Trigger** to add the node to the canvas. n8n opens the node.

 1. Close the node details view (Select **Back to canvas**) to return to the canvas.

??? explanation "More about the Chat Trigger node..."
    The trigger node generates output when there is an event causing it to trigger. In this case we want to be able to type in text to cause the workflow to run. In production, this trigger can be hooked up to a public chat interface as provided by n8n or embedded into another website. To start this simple workflow we will just use the built-in local chat interface to communicate, so no further setup is required.

[[ workflowDemo("file:////advanced-ai/tutorials/chat_01.json") ]]

## 3. Add an AI Agent Node

The AI Agent node is the core of adding AI to your workflows.

 1. Select the **Add node** <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> connector on the trigger node to bring up the node search

 1. Start typing "AI" and choose the **AI agent** node to add it.

 1. The editing view of the **AI agent** will now be displayed. 
 
 1. There are some fields which can be changed. For this tutorial, the default **Agent** should be left at the default (**Tools Agent**). As we are using the **Chat Trigger** node, the other default setting for the source and specification of the prompt don't need to be changed.

??? explanation "Explanation..."
    Some text with a more detailed explanation of this step

[[ workflowDemo("file:////advanced-ai/tutorials/chat_02.json") ]]

## 4. Configure the node
  
AI agents require a chat model to be attached to process the incoming prompts.

1. Add a chat model by pressing the Add a chat model by clicking the plus <span class="inline-image">![Add node icon](/_images/try-it-out/add-node-small.png){.off-glb}</span> button underneat the **Chat Model** connection on the **AI Agent** node (it's the first connection along the bottom of the node).

2. The search dialog will appear, filtered on 'Language Models'. These are the models with built-in support in n8n. For this tutorial we will use **OpenAI Chat Model**.

3. Selecting the **OpenAI Chat model** from the list will attach it to the **AI Agent** node and open the node editor. One of the parameters which can be changed is the 'Model'. Note that for the basic OpenAI accounts, only the 'gpt-4o-mini' model is allowed.

??? explanation "Which chat model?"
    As mentioned earlier, the LLM is the component which generates the text according to a prompt it is given. LLMs have to be created and trained, usually an intensive process. Different LLMS may have different capabilities or specialties, depending on the data they were trained with. 

## 5. Add credentials (if needed)

In order for n8n to communicate with the chat model, it will need some credentials (login data giving it access to an account on a different online service). If you already have an account 


![image showing the credentials dialog for OpenAI](_images/advanced-ai/ai-tutorial-credentials.png)

??? explanation "Keeping your credentials safe"
    Some text with a more detailed explanation of this step


## 6. Test the node

- Use the chat trigger to test the workflow by sending a sample message (e.g., “Hello”).
- Check the logs to see:
    - Input Data: Data received from the trigger (e.g., session ID, chat message).
    - Output Data: The response generated by the AI agent (e.g., “Hello, how can I assist you today?”).

## 7. Changing the prompt

- changing the prompt settings
- demonstrate the changes

## 8. Persistence:
    
- demonstrate lack of persistence
- add memory


## 9. saving the workflow

## Congratulations!

TODO: summary of what was achieved

[[ workflowDemo("file:////advanced-ai/tutorials/chat_complete.json") ]]

## Next steps

Now you have seen how to create a basic AI workflow, there are plenty of resources to build on that knowledge and plenty of examples to give you ideas of where to go next:

* Learn more about AI concepts and view examples in [Examples and concepts](/advanced-ai/examples/introduction/).
* Browse AI [Workflow templates](https://n8n.io/workflows/?categories=25){:target=_blank .external-link}.
* ...
* ...
