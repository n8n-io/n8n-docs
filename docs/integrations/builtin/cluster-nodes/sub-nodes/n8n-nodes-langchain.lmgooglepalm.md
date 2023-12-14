---
title: Google PaLM Language Model
description: Documentation for the Google PaLM Language Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Google PaLM Language Model

Use the Google PaLM Language Model node to use Google's PaLM models.

On this page, you'll find the node parameters for the Google PaLM Language Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/google/googlepalm/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Google PaLM LM integrations](https://n8n.io/integrations/google-palm-language-model/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

**Model**: the model to use to generate the completion. n8n dynamically loads models from the Google PaLM API and you will only see the models available to your account.

## Node options

* **Maximum Number of Tokens**: the completion length, in characters.
* **Sampling Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: the number of token choices the model uses to generate the next token.
* **Top P**: use a lower value to ignore less probable options.


## Related resources

View [example workflows and related content](https://n8n.io/integrations/google-palm-language-model/){:target=_blank .external-link} on n8n's website.

Refer to [LangChain's Google PaLM documentation](https://js.langchain.com/docs/modules/model_io/models/llms/integrations/google_palm){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
