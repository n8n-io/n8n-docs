---
title: Generate code with ChatGPT
description: Use ChatGPT to generate code in the Code node.
contentType: explanation
---

# Generate code with ChatGPT

!!! info "Experimental feature with limited availability"
	Available on n8n Cloud from version [TODO].
	Python isn't supported. [TODO: confirm]

## Use AI in the Code node

!!! note "AI generated code overwrites your code"
	If you've already written some code on the **Code** tab, the AI generated code will replace it. n8n recommends using AI as a starting point to create your initial code, then editing it as needed.

To use ChatGPT to generate code in the Code node:

1. In the Code node, set **Language** to **JavaScript**.
1. Select the **Ask AI** tab.
1. Write your query.
1. Select **Generate Code**. n8n sends your query to ChatGPT, then displays the result in the **Code** tab.

## Usage limits

During the trial phase there are no usage limits. If n8n makes the feature permanent, there will be usage limits as part of your pricing tier.

## Writing good prompts

## Fixing the code

The AI-generated code may work immediately, but you may have to edit it. You need to be aware of n8n's [Data structure](/data/data-structure/). You may also find n8n's [Built-in methods and variables](/code-examples/methods-variables-reference/) useful.
