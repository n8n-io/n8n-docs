---
title: OpenAI Assistant
description: Documentation for the OpenAI Assistant node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# OpenAI Assistant

Use the OpenAI Assistant node to work with OpenAI's [Assistants API](https://platform.openai.com/docs/assistants/overview){:target=_blank .external-link}.

On this page, you'll find a list of operations the OpenAI Assistant node supports, and links to more resources.

///  note  | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/openai/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [OpenAI Assistant's integrations](https://n8n.io/integrations/openai-assistant/){:target=_blank .external-link} page.
///	

## Node parameters

### Create New Assistant

Define the **Name**, **Instructions**, and the **Model** you want to use.

### Use Existing Assistant

Select your **Assistant**.

### Text

The input from the chat. This is the user's query, also known as the prompt.

### OpenAI Tools

Choose the [OpenAI Assistants Tools](https://platform.openai.com/docs/assistants/tools){:target=_blank .external-link} you're using with this assistant.

### Options

* Base URL: change the OpenAI API URL.
* Max Retries: how many times to retry a request.
* Timeout: maximum amount of time a request is allowed to take in milliseconds.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/openai-assistant/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's OpenAI assistant documentation](https://js.langchain.com/docs/modules/agents/agent_types/openai_assistant){:target=_blank .external-link} for more information about the service.
--8<-- "_glossary/ai-glossary.md"
