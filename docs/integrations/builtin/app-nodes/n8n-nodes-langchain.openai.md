---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: OpenAI
description: Documentation for the OpenAI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: critical
---

# OpenAI

Use the OpenAI node to automate work in OpenAI, and integrate OpenAI with other applications. n8n has built-in support for a wide range of OpenAI features, including creating images and assistants, as well as chatting with models. 

On this page, you'll find a list of operations the OpenAI node supports and links to more resources.

/// note | OpenAI Assistant node
The OpenAI node replaces the OpenAI assistant node from version 1.29.0 on.
///

/// note | Credentials
Refer to [OpenAI credentials](/integrations/builtin/credentials/openai/) for guidance on setting up authentication. 
///

## Operations

* Assistant
	* **Create an Assistant**
	* **Delete an Assistant** from an account
	* **List Assistants** in an organization
	* **Message an Assistant**
	* **Update an Assistant**
* Text
	* **Message a Model**
	* **Classify Text for Violations**
* Image
	* **Analyze Image**: Take in images and answer questions about them
	* **Generate an Image**: Creates an image from a text prompt
* Audio
	* Generate
	* Transcribe
	* Translate
* File
	* Delete
	* List
	* Upload

### Create an Assistant

Use this operation to create a new assistant.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Assistant**.
- **Operation**: Select **Create an Assistant**.
- **Model**: Select the model that the assistant will use. If you’re not sure which model to use then try `gpt-4o` if you need high intelligence or `gpt-4o-mini` if you need the fastest speed and lowest cost. Refer to [Models overview | OpenAI Platform](https://platform.openai.com/docs/models) for more information. 
- **Name**: Enter the name of the assistant. The maximum length is 256 characters.
- **Description**: Enter the description of the assistant. The maximum length is 512 characters.
  ```
  A virtual assistant that helps users with daily tasks, including setting reminders, answering general questions, and providing quick information.
  ```
- **Instructions**: Enter the system instructions that the assistant uses. The maximum length is 32,768 characters. Use this to specify the persona used by the model in its replies. 
  ```
  Always respond in a friendly and engaging manner. When a user asks a question, provide a concise answer first, followed by a brief explanation or additional context if necessary. If the question is open-ended, offer a suggestion or ask a clarifying question to guide the conversation. Keep the tone positive and supportive, and avoid technical jargon unless specifically requested by the user.
  ```
- **Code Interpreter**: Turn on to enable the code interpreter for the assistant, where it can write and execute code in a sandboxed environment. Enable this tool for tasks that require computations, data analysis, or any logic-based processing.
- **Knowledge Retrieval**: Turn on to enable knowledge retrieval for the assistant, allowing it to access external sources or a connected knowledge base. Refer to [File Search | OpenAI Platform](https://platform.openai.com/docs/assistants/tools/file-search) for more information. 
  - **Files**: Select a file to upload for your external knowledge source. Use **Upload a File** operation to add more files. 

#### Options

- **Output Randomness (Temperature)**: Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around 0.7) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it. Defaults to `1.0`. 
- **Output Randomness (Top P)**: Adjust the Top P setting to control the diversity of the assistant's responses. For example, `0.5` means half of all likelihood-weighted options are considered. We recommend altering this or **Output Randomness (Temperature)** but not both. Defaults to `1.0`. 
- **Fail if Assistant Already Exists**: If enabled, the operation will fail if an assistant with the same name already exists. 

Refer to [Create assistant | OpenAI](https://platform.openai.com/docs/api-reference/assistants/createAssistant) documentation for more information. 

### Delete an Assistant

Use this operation to delete an existing assistant from your account.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Assistant**.
- **Operation**: Select **Delete an Assistant**.
- **Assistant**: Select the assistant you want to delete **From list** or **By ID** 

Refer to [Delete assistant | OpenAI](https://platform.openai.com/docs/api-reference/assistants/deleteAssistant) documentation for more information. 

### List Assistants

Use this operation to retrieve a list of assistants in your organization.

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Assistant**.
- **Operation**: Select **List Assistants**.

#### Options

- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data. This option is enabled by default. 

Refer to [List assistants | OpenAI](https://platform.openai.com/docs/api-reference/assistants/listAssistants) documentation for more information. 
  
## Message an Assistant

Use this operation to send a message to an assistant and receive a response.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Assistant**.
- **Operation**: Select **Message an Assistant**.
- **Assistant**: Select the assistant you want to message.
- **Prompt**: Enter the text prompt or message that you want to send to the assistant.
  - **Take from Previous Node Automatically**: Automatically use the input from a previous node's `chatInput` field.
  - **Define Below**: Manually define the prompt by entering static text or using an expression to reference data from previous nodes.

### Options

- **Base URL**: Enter the base URL that the assistant should use for making API requests. This option is useful for directing the assistant to use endpoints provided by other LLM providers that offer an OpenAI-compatible API.
- **Max Retries**: Specify the number of times the assistant should retry an operation in case of failure. 
- **Timeout**: Set the maximum amount of time in milliseconds, that the assistant should wait for a response before timing out. Use this option to prevent long waits during operations.
- **Preserve Original Tools**: Turn off to remove the original tools associated with the assistant. Use this if you want to temporarily remove tools for this specific operation.

## Update an Assistant

Use this operation to update the details of an existing assistant.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Assistant**.
- **Operation**: Select **Update an Assistant**.
- **Assistant**: Select the assistant you want to update.

### Options

- **Code Interpreter**: Turn on to enable the code interpreter for the assistant, where it can write and execute code in a sandboxed environment. Enable this tool for tasks that require computations, data analysis, or any logic-based processing.
- **Description**: Enter the description of the assistant. The maximum length is 512 characters.
  ```
  A virtual assistant that helps users with daily tasks, including setting reminders, answering general questions, and providing quick information.
  ```
- **Instructions**: Enter the system instructions that the assistant uses. The maximum length is 32,768 characters. Use this to specify the persona used by the model in its replies. 
  ```
  Always respond in a friendly and engaging manner. When a user asks a question, provide a concise answer first, followed by a brief explanation or additional context if necessary. If the question is open-ended, offer a suggestion or ask a clarifying question to guide the conversation. Keep the tone positive and supportive, and avoid technical jargon unless specifically requested by the user.
  ```
- **Knowledge Retrieval**: Turn on to enable knowledge retrieval for the assistant, allowing it to access external sources or a connected knowledge base. Refer to [File Search | OpenAI Platform](https://platform.openai.com/docs/assistants/tools/file-search) for more information. 
- **Files**: Select a file to upload for your external knowledge source. Use **Upload a File** operation to add more files. 
- **Model**: Select the model that the assistant will use. If you’re not sure which model to use then try `gpt-4o` if you need high intelligence or `gpt-4o-mini` if you need the fastest speed and lowest cost. Refer to [Models overview | OpenAI Platform](https://platform.openai.com/docs/models) for more information. 
- **Name**: Enter the name of the assistant. The maximum length is 256 characters.
- **Remove All Custom Tools (Functions)**: Turn on to remove all custom tools (functions) from the assistant. 
- **Output Randomness (Temperature)**: Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around 0.7) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it. Defaults to `1.0`. 
- **Output Randomness (Top P)**: Adjust the Top P setting to control the diversity of the assistant's responses. For example, `0.5` means half of all likelihood-weighted options are considered. We recommend altering this or **Output Randomness (Temperature)** but not both. Defaults to `1.0`. 

Refer to [Modify assistant | OpenAI](https://platform.openai.com/docs/api-reference/assistants/modifyAssistant) documentation for more information. 

## Message a Model

Use this operation to send a message or prompt to an OpenAI model and receive a response.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Text**.
- **Operation**: Select **Message a Model**.
- **Model**: Select the model you want to use. If you’re not sure which model to use then try `gpt-4o` if you need high intelligence or `gpt-4o-mini` if you need the fastest speed and lowest cost. Refer to [Models overview | OpenAI Platform](https://platform.openai.com/docs/models) for more information. 
- **Messages**: Enter a text prompt and assign a role that the model will use to generate responses. There are three roles you can choose from: 
    - **User**: Sends a message as a user and gets a response from the model. 
    - **Assistant**: Tells the model to adopt a specific tone or personality. 
    - **System**: By default, the system message is `"You are a helpful assistant"`. You can define instructions in the user message, but the instructions set in the system message are more effective. You can only set one system message per conversation. Use this to set the model's behavior or context for the next user message. 
	Refer to [Prompt engineering | OpenAI](https://platform.openai.com/docs/guides/prompt-engineering) for more information on how to write a better prompt by utilizing these three roles. 
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data. 
- **Output Content as JSON**: Turn on to attempt to return the response in JSON format. Compatible with GPT-4 Turbo and all GPT-3.5 Turbo models newer than gpt-3.5-turbo-1106.

### Options

- **Frequency Penalty**: Apply a penalty to reduce the model's tendency to repeat similar lines. The range is between `0.0` and `2.0`.
- **Maximum Number of Tokens**: Set the maximum number of tokens for the response. One token is roughly four characters for standard English text. Use this to limit the length of the output. 
- **Number of Completions**: 
- **Presence Penalty**: Apply a penalty to influence the model to discuss new topics. The range is between `0.0` and `2.0`.
- **Output Randomness (Temperature)**: Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around 0.7) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it. Defaults to `1.0`. 
- **Output Randomness (Top P)**: Adjust the Top P setting to control the diversity of the assistant's responses. For example, `0.5` means half of all likelihood-weighted options are considered. We recommend altering this or **Output Randomness (Temperature)** but not both. Defaults to `1.0`. 

Refer to [Message a Model | OpenAI](https://platform.openai.com/docs/api-reference/text-completion/create) documentation for more information.

## Classify Text for Violations

Use this operation to identify and flag content that might be harmful. OpenAI model will analyze the text and return a response containing:
- `flagged`: A boolean field indicating if the content is potentially harmful.
- `categories`: A list of category-specific violation flags.
- `category_scores`: Scores for each category.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Text**.
- **Operation**: Select **Classify Text for Violations**.
- **Text Input**: Enter text to classify if it violates the moderation policy. 
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data.

### Options

- **Use Stable Model**: TUrn on to use the stable version of the model instead of the latest version, accuracy may be slightly lower.

Refer to [Moderations | OpenAI](https://platform.openai.com/docs/api-reference/moderations) documentation for more information.

## Classify Text for Violations

Use this operation to identify and flag content that might be harmful. OpenAI model will analyze the text and return a response containing:
- `flagged`: A boolean field indicating if the content is potentially harmful.
- `categories`: A list of category-specific violation flags.
- `category_scores`: Scores for each category.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Text**.
- **Operation**: Select **Classify Text for Violations**.
- **Text Input**: Enter text to classify if it violates the moderation policy. 
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data.

### Options

- **Use Stable Model**: TUrn on to use the stable version of the model instead of the latest version, accuracy may be slightly lower.

Refer to [Moderations | OpenAI](https://platform.openai.com/docs/api-reference/moderations) documentation for more information.

## Analyze Image

Use this operation to take in images and answer questions about them.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Image**.
- **Operation**: Select **Analayze Image**.
- **Model**: Select the model you want to use to generate an image. 
- **Text Input**: Ask a question about the image.
- **Input Type**: 
  - **Image URL(s)**: Enter the URL(s) of the image(s) to analyze. Add multiple URLs separated by comma.
  - **Binary File(s)**: Enter the name of the binary property which contains the image(s).
  

### Options

- **Detail**: Specify the balance between response time vs token usage. 
- **Length of Description (Max Tokens)**: Defaults to 300. Fewer tokens will result in shorter, less detailed image description.

Refer to [Images | OpenAI](https://platform.openai.com/docs/api-reference/images) documentation for more information.

## Generate an Image

Use this operation to create an image from a text prompt.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credentials](/integrations/builtin/credentials/openai/).
- **Resource**: Select **Image**.
- **Operation**: Select **Generate an Image**.
- **Model**: Select the model you want to use to generate an image. 
- **Prompt**: Enter the text description of the desired image(s). The maximum length is 1000 characters for `dall-e-2` and 4000 characters for `dall-e-3`.

### Options

- **Quality**: The quality of the image you generate. `HD` creates images with finer details and greater consistency across the image. This option is only supported for `dall-e-3`. 
- **Resolution**: Select the resolution of the generated images. Select `1024x1024` for `dall-e-2`. Select one of `1024x1024`, `1792x1024`, or `1024x1792` for `dall-e-3` models.
- **Style**: Select the style of the generated images. This option is only supported for `dall-e-3`. 
  - **Natural**: Use this to produce more natural looking images.
  - **Vivid**: Use this to produce hyper-real and dramatic images.
- **Respond with image URL(s)**: Whether to return image URL(s) instead of binary file(s): 
- **Put Output in Field**: Enter the name of the output field to put the binary file data in. 

Refer to [Create image | OpenAI](https://platform.openai.com/docs/api-reference/images/create) documentation for more information.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'openai') ]]

## Related resources

Refer to [OpenAI's documentation](https://beta.openai.com/docs/introduction){:target=_blank .external-link} for more information about the service.

Refer to [OpenAI's assistants documentation](https://platform.openai.com/docs/assistants/how-it-works/objects){:target=_blank .external-link} for more information about how assistants work.

For help dealing with rate limits, refer to [Handling rate limits](/integrations/builtin/rate-limits/).

--8<-- "_snippets/integrations/builtin/app-nodes/operation-not-supported.md"


## Using tools with OpenAI assistants

Some operations allow you to connect tools. [Tools](https://docs.n8n.io/advanced-ai/examples/understand-tools/) act like addons that your AI can use to access extra context or resources.

Select the **Tools** connector to browse the available tools and add them.

Once you add a tool connection, the OpenAI node becomes a root node, allowing it to form a cluster node with the tools sub-nodes. See [Node types](/integrations/builtin/node-types/#cluster-nodes) for more information on cluster nodes and root nodes.

### Operations that support tool connectors

* Assistant
	* Message Assistant
* Text
	* Message Model


