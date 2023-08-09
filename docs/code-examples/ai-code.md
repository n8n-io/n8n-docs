---
title: Generate code with ChatGPT
description: Use ChatGPT to generate code in the Code node.
contentType: explanation
---

# Generate code with ChatGPT

!!! info "Experimental feature with limited availability"
	Available on n8n Cloud from version [TODO].  
	Python isn't supported.

## Use AI in the Code node

--8<-- "_snippets/code-examples/ai-how-to.md"

## Usage limits

During the trial phase there are no usage limits. If n8n makes the feature permanent, there will be usage limits as part of your pricing tier.

## Feature limits

The ChatGPT implementation in n8n has the following limitations:

* Only writes code that manipulates data from the n8n workflow. You can't ask it to pull in data from other sources.
* Doesn't work with large incoming data schemas.
* May have issues if there are a lot of nodes before the code node.

## Writing good prompts

Writing good prompts increases the chance of getting useful code back.

Some general tips:

* Provide examples: if possible, give a sample expected output. This helps the AI to better understand the transformation or logic you’re aiming for.
* Describe the processing steps: if there are specific processing steps or logic that should apply to the data, list them in sequence. For example: "First, filter out all users under 18. Then, sort the remaining users by their last name."
* Avoid ambiguities: while the AI understands various instructions, being clear and direct ensures you get the most accurate code. Instead of saying "Get the older users," you might say "Filter users who are 60 years and above."
* Be clear about what you expect as the output. Do you want the data transformed, filtered, aggregated, or sorted? Provide as much detail as possible.

And some n8n-specific guidance:

* Think about the input data: make sure ChatGPT knows which pieces of the data you want to access, and what the incoming data represents. You may need to tell ChatGPT about the availability of n8n's [Built-in methods and variables](/code-examples/methods-variables-reference/).
* Declare interactions between nodes: if your logic involves data from multiple nodes, specify how they should interact. "Merge the output of 'Node A' with 'Node B' based on the 'userID' property". if you prefer data to come from certain nodes or to ignore others, be clear: "Only consider data from the 'Purchases' node and ignore the 'Refunds' node."
* Ensure the output is compatible with n8n. Refer to [Data structure](/data/data-structure/) for more information on the data structure n8n requires.

### Example prompts

[TODO: add Nik's examples, and an example of prompt referencing complex input data]

### Related resources

* Pluralsight offer a short guide on [How to use ChatGPT to write code](https://www.pluralsight.com/blog/software-development/how-use-chatgpt-programming-coding){:target=_blank .external-link}, which includes example prompts.

## Fixing the code

The AI-generated code may work immediately, but you may have to edit it. You need to be aware of n8n's [Data structure](/data/data-structure/). You may also find n8n's [Built-in methods and variables](/code-examples/methods-variables-reference/) useful.
