---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Text Classifier
description: Documentation for the Text Classifier node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# Text Classifier

Use the Text Classifier node to classify (categorize) incoming data. Using the
categories provided in the parameters (see below), each item is passed to the
model to determine its category.

On this page, you'll find the node parameters for the Text Classifier node,
and links to more resources.

## Node parameters

Add the categories that you want to classify your input as. By default the
input field `chatInput` is used, but you can configure the field you want to
use by changing the **Prompt**.

Categories have a name and a description. Use the description to tell the
model what the category means. This is important if the meaning isn't obvious.
You can add as many categories as you like.

## Node options

* **Allow Multiple Classes To Be True**: You can configure the classifier to
  always output a single class per item, or allow the model to select multiple
  classes.

* **Add Fallback Option**: If this option is set, the model can select a
  fallback-option, or "Other" category, for when none of the categories are
  detected. Otherwise, if none of the categories are detected, the item is
  dropped.

* **Prompt**: This determines what input to consider for the classification.

	There are two options here:

	* **Take from previous node automatically** (the default), which takes the
	   `chatInput` field
	* **Define below**, allows you to define your own input text. For example,
	  use an expression that takes a different input field, such as
	  `{{ $json.raw }}`

* Other options:
	* **System Prompt Template**, allows you to change the system prompt that's
	  used for the classification. It uses a placeholder for the categories,
	  `{categories}`


## Related resources

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
