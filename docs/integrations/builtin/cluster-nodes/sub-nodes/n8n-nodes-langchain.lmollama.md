---
title: Ollama Model
description: Documentation for the Ollama Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Ollama Model

The Ollama Model node allows you use local Llama 2 models.

On this page, you'll find the node parameters for the Ollama Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ollama/).
///
/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Ollama Model integrations](https://n8n.io/integrations/ollama-model/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: the model that generates the completion. The models options are fetched from the Ollama API running on the provided credential URL.

## Node options

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/ollama-options-1.md"
--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-sub-nodes/ollama-options-2.md"

## Related resources

View [example workflows and related content](https://n8n.io/integrations/ollama-model/){:target=_blank .external-link} on n8n's website.

Refer to [LangChains's Ollama documentation](https://js.langchain.com/docs/modules/model_io/models/llms/integrations/ollama){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
