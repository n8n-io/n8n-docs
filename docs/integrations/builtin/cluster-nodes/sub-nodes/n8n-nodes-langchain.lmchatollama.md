---
title: Ollama Chat Model
description: Documentation for the Ollama Chat Model node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Ollama Chat Model

The Ollama Chat Model node allows you use local Llama 2 models with conversational agents.

On this page, you'll find the node parameters for the Ollama Chat Model node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/ollama/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Ollama Chat Model integrations](https://n8n.io/integrations/ollama-chat-model/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node parameters

* **Model**: the model that generates the completion. The models options are fetched from the Ollama API running on the provided credential URL.

## Node options

* **Sampling Temperature**: controls the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
* **Top K**: limits the number of highest probability vocabulary tokens to consider at each step. A higher value increases diversity but may reduce coherence. Set to `-1` to disable. Valid range is between -1 and 100.
* **Top P**: chooses from the smallest possible set of tokens whose cumulative probability exceeds the probability top_p. Helps generate more human-like text by reducing repetitions. Valid range is between 0 and 1.
* **Frequency Penalty**: adjusts the penalty for tokens that have already appeared in the generated text. Higher values discourage repetition. Must be a non-negative number.
* **Keep Alive**: specifies the duration to keep the loaded model in memory after use. Useful for frequently used models. Format: 1h30m (1 hour 30 minutes).
* **Low VRAM Mode**: whether to activate low VRAM mode, which reduces memory usage at the cost of slower generation speed. Useful for GPUs with limited memory.
* **Main GPU ID**: specifies the ID of the GPU to use for the main computation. Only change this if you have multiple GPUs.
* **Context Batch Size**: sets the batch size for prompt processing. Larger batch sizes may improve generation speed but increase memory usage.
* **Context Length**: the maximum number of tokens to use as context for generating the next token. Smaller values reduce memory usage, while larger values provide more context to the model.
* **Number of GPUs**: specifies the number of GPUs to use for parallel processing. Set to `-1` for auto-detection.
* **Max Tokens to Generate**: the maximum number of tokens to generate. Set to `-1` for no limit. Be cautious when setting this to a large value, as it can lead to very long outputs.
* **Number of CPU Threads**: specifies the number of CPU threads to use for processing. Set to `0` for auto-detection.
* **Penalize Newlines**: whether the model will be less likely to generate newline characters, encouraging longer continuous sequences of text.
* **Presence Penalty**: adjusts the penalty for tokens based on their presence in the generated text so far. Positive values penalize tokens that have already appeared, encouraging diversity.
* **Repetition Penalty**: adjusts the penalty factor for repeated tokens. Higher values more strongly discourage repetition. Set to `1.0` to disable repetition penalty.
* **Use Memory Locking**: whether to lock the model in memory to prevent swapping. This can improve performance but requires sufficient available memory.
* **Use Memory Mapping**: whether to use memory mapping for loading the model. This can reduce memory usage but may impact performance. Recommended to keep enabled.
* **Load Vocabulary Only**: whether to only load the model vocabulary without the weights. Useful for quickly testing tokenization.
* **Output Format**: specifies the format of the API response. Choose between **Default** and **JSON**.


## Related resources

View [example workflows and related content](https://n8n.io/integrations/openai-model/){:target=_blank .external-link} on n8n's website.

Refer to [LangChains's Ollama Chat Model documentation](https://js.langchain.com/docs/modules/model_io/models/chat/integrations/ollama){:target=_blank .external-link} for more information about the service.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
