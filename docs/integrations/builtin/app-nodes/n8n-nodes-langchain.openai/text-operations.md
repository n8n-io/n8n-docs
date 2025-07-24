---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: OpenAI Text operations 
description: Documentation for the Text operations in OpenAI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: [integration, reference]
priority: critical
---

# OpenAI Text operations

Use this operation to message a model or classify text for violations in OpenAI. Refer to [OpenAI](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/index.md) for more information on the OpenAI node itself.

## Message a Model

Use this operation to send a message or prompt to an OpenAI model and receive a response.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Text**.
- **Operation**: Select **Message a Model**.
- **Model**: Select the model you want to use. If you’re not sure which model to use, try `gpt-4o` if you need high intelligence or `gpt-4o-mini` if you need the fastest speed and lowest cost. Refer to [Models overview | OpenAI Platform](https://platform.openai.com/docs/models){:target=_blank .external-link} for more information. 
- **Messages**: Enter a **Text** prompt and assign a **Role** that the model will use to generate responses. Refer to [Prompt engineering | OpenAI](https://platform.openai.com/docs/guides/prompt-engineering){:target=_blank .external-link} for more information on how to write a better prompt by using these roles. Choose from one of these roles: 
    - **User**: Sends a message as a user and gets a response from the model. 
    - **Assistant**: Tells the model to adopt a specific tone or personality. 
    - **System**: By default, the system message is `"You are a helpful assistant"`. You can define instructions in the user message, but the instructions set in the system message are more effective. You can only set one system message per conversation. Use this to set the model's behavior or context for the next user message. 
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data. 
- **Output Content as JSON**: Turn on to attempt to return the response in JSON format. Compatible with `GPT-4 Turbo` and all `GPT-3.5 Turbo` models newer than `gpt-3.5-turbo-1106`.

### Options

- **Frequency Penalty**: Apply a penalty to reduce the model's tendency to repeat similar lines. The range is between `0.0` and `2.0`.
- **Maximum Number of Tokens**: Set the maximum number of tokens for the response. One token is roughly four characters for standard English text. Use this to limit the length of the output. 
- **Number of Completions**: Defaults to 1. Set the number of completions you want to generate for each prompt. Use carefully since setting a high number will quickly consume your tokens. 
- **Presence Penalty**: Apply a penalty to influence the model to discuss new topics. The range is between `0.0` and `2.0`.
- **Output Randomness (Temperature)**: Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around `0.7`) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it. Defaults to `1.0`. 
- **Output Randomness (Top P)**: Adjust the Top P setting to control the diversity of the assistant's responses. For example, `0.5` means half of all likelihood-weighted options are considered. We recommend altering this or **Output Randomness (Temperature)** but not both. Defaults to `1.0`. 

Refer to [Message a Model | OpenAI](https://platform.openai.com/docs/api-reference/text-completion/create){:target=_blank .external-link} documentation for more information.

## Classify Text for Violations

Use this operation to identify and flag content that might be harmful. OpenAI model will analyze the text and return a response containing:

- `flagged`: A boolean field indicating if the content is potentially harmful.
- `categories`: A list of category-specific violation flags.
- `category_scores`: Scores for each category.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](/integrations/builtin/credentials/openai.md).
- **Resource**: Select **Text**.
- **Operation**: Select **Classify Text for Violations**.
- **Text Input**: Enter text to classify if it violates the moderation policy. 
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data.

### Options

- **Use Stable Model**: Turn on to use the stable version of the model instead of the latest version, accuracy may be slightly lower.

Refer to [Moderations | OpenAI](https://platform.openai.com/docs/api-reference/moderations){:target=_blank .external-link} documentation for more information.

## Common issues

For common errors or issues and suggested resolution steps, refer to [Common Issues](/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/common-issues.md).
