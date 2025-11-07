# Lemonade Nodes

[Back to Built-in Nodes](../../README.md)

The Lemonade nodes provide integration with the Lemonade AI platform, enabling powerful AI and machine learning capabilities directly within your n8n workflows. With the Lemonade server integration, you can leverage language models, embeddings, and chat-based conversational AI in a seamless manner.

---

## Overview

The Lemonade integration includes three primary nodes:

- **LmLemonade**: Interface with Lemonade's Language Learning Models (LLM) for generating text and completing natural language tasks.
- **EmbeddingsLemonade**: Generate vector embeddings from text inputs using Lemonade embedding models, useful for semantic search, clustering, and similarity detection.
- **LmChatLemonade**: Perform dynamic chat-based conversations utilizing Lemonade's chat models, supporting dialog flows and contextual understanding.

This integration requires API credentials to connect securely to your Lemonade server and facilitates AI-powered automation and data processing workflows inside n8n.

---

## Credentials

### Lemonade API Credentials

Before using any Lemonade node, you must set up your Lemonade API credentials:

- Go to **Settings > API Credentials** in n8n.
- Create new credentials using the **Lemonade API** type.
- Provide your **API Key** and any required authentication parameters supplied by the Lemonade platform.
- Save your credentials and select them in your Lemonade nodes.

---

## Nodes Reference

### LmLemonade Node

Use the LmLemonade node to interact with Lemonade's language models for natural language generation and completion tasks.

#### Features

- Select from available Lemonade language models.
- Provide prompt inputs to generate text completions.
- Configure parameters such as max tokens, temperature, and stop sequences.
- Supports synchronous completion and streaming modes (if supported by the Lemonade server).

#### Parameters

| Parameter       | Description                                  | Required | Default Value |
| --------------- | --------------------------------------------| -------- | ------------- |
| **Model**       | Select Lemonade LLM model to use            | Yes      | —             |
| **Prompt**      | Input text prompt or template for the model | Yes      | —             |
| **Max Tokens**  | Maximum length of the generated output      | No       | 256           |
| **Temperature** | Controls randomness of output (0–1)         | No       | 0.7           |
| **Stop**       | Sequences where completion should stop       | No       | None          |

#### Example Usage

Use this node to generate article summaries, code snippets, or extract information from text.

---

### EmbeddingsLemonade Node

Generate vector embeddings from textual data using Lemonade's embedding models.

#### Features

- Convert plain text inputs into numeric vector embeddings.
- Choose from multiple embedding model options based on your use case.
- Useful for search engines, recommendation systems, and similarity analyses.

#### Parameters

| Parameter         | Description                          | Required | Default Value |
| ----------------- | ---------------------------------- | -------- | ------------- |
| **Embedding Model** | Select the embedding model to use | Yes      | —             |
| **Input Text**     | Text content to convert into vector| Yes      | —             |

#### Example Usage

Transform customer feedback into embeddings for clustering and sentiment detection workflows.

---

### LmChatLemonade Node

Leverage Lemonade chat models to build conversational AI workflows with context-aware interactions.

#### Features

- Conduct multi-turn conversations using Lemonade's chat AI.
- Configure dynamic prompts, user messages, and previous dialog context.
- Use for customer support bots, virtual assistants, and interactive applications.

#### Parameters

| Parameter         | Description                           | Required | Default Value |
| ----------------- | ----------------------------------- | -------- | ------------- |
| **Chat Model**    | Choose the Lemonade chat model        | Yes      | —             |
| **Messages**      | Input chat messages (array of objects) | Yes      | —             |
| **Max Tokens**    | Limit on generated response length    | No       | 256           |
| **Temperature**   | Output randomness control              | No       | 0.7           |

#### Example Usage

Build a helpdesk chatbot that interprets customer queries and provides real-time responses.

---

## Getting Started

1. **Create Lemonade API Credentials**  
   Set up your API key in the n8n credentials manager under the Lemonade API credential type.

2. **Add Lemonade Nodes to Your Workflow**  
   Choose from LmLemonade, EmbeddingsLemonade, or LmChatLemonade nodes depending on your use case.

3. **Configure Node Parameters**  
   Select models, input prompts or texts, and adjust parameters like max tokens and temperature.

4. **Connect Nodes in Your Workflow**  
   Design your automation by connecting nodes to process inputs, generate AI responses, or embed data.

5. **Execute Workflow**  
   Run your workflow and inspect outputs returned by Lemonade nodes for further processing or storage.

---

## Configuration and Tips

- Always verify API key validity and permissions to avoid authentication errors.
- Adjust model parameters to optimize performance and output relevance for your use case.
- Chain multiple Lemonade nodes to build advanced AI/ML pipelines, e.g., embedding generation followed by clustering.
- Handle API rate limits and errors gracefully in your workflows using error triggers and retries.

---

## Troubleshooting

| Issue                             | Solution                                                                |
|----------------------------------|------------------------------------------------------------------------|
| Authentication error             | Check your API key validity and Lemonade credential configuration.     |
| Node returns empty or no output  | Verify your prompt/input text and adjust parameters like max tokens.   |
| Workflow execution slow          | Lower complexity or shorten prompts; check server accessibility.       |
| Embedding vectors not usable      | Confirm embedding model compatibility and input formatting.            |
| Chat conversation context lost   | Ensure messages array includes relevant previous dialog history.       |

If problems persist, consult the Lemonade platform documentation or contact their support.

---

## Dependencies

- This integration requires the Lemonade server API endpoint to be accessible.
- The workflow nodes depend on the Langchain components.
- Proper credentials configuration in n8n is mandatory.

---

## Examples

### EmbeddingsLemonade Example

| Parameter       | Value                         |
|-----------------|-------------------------------|
| Embedding Model | `lemonade-embed-001`           |
| Input Text     | "Analyze customer reviews for sentiment." |

The node outputs a vector that can feed into further analysis nodes such as clustering or search.

### LmChatLemonade Example

| Parameter       | Value                               |
|-----------------|-----------------------------------|
| Chat Model      | `lemonade-chat-003`                 |
| Messages        | `[{"role":"user","content":"Hello! How can you help me?"}]` |

Returns a conversational response from the Lemonade chat model.

---

## Further Information

For detailed API capabilities and model availability, visit the [Lemonade Platform Documentation](https://www.lemonade.ai/docs).

---

*This documentation is part of the n8n Lemonade server integration module.*
