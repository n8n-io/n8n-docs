---
title: Text Classifier node documentation
description: >-
  Learn how to use the Text Classifier node in n8n. Follow technical
  documentation to integrate Text Classifier node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Text Classifier node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.text-classifier
layout:
  description:
    visible: false
---

# Text Classifier node <a href="#text-classifier-node" id="text-classifier-node"></a>

Use the Text Classifier node to classify (categorize) incoming data. Using the categories provided in the parameters (see below), each item is passed to the model to determine its category.

On this page, you'll find the node parameters for the Text Classifier node, and links to more resources.

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

* **Input Prompt** defines the input to classify. This is usually an expression that references a field from the input items. For example, this could be `{{ $json.chatInput }}` if the input is a chat trigger. By default it references the `text` field.
* **Categories**: Add the categories that you want to classify your input as. Categories have a name and a description. Use the description to tell the model what the category means. This is important if the meaning isn't obvious. You can add as many categories as you like.

## Node options <a href="#node-options" id="node-options"></a>

* **Allow Multiple Classes To Be True**: You can configure the classifier to always output a single class per item (turned off), or allow the model to select multiple classes (turned on).
* **When No Clear Match**: Define what happens if the model can't find a good match for an item. There are two options:
	- **Discard Item** (the default): If the node doesn't detect any of the categories, it drops the item.
	- **Output on Extra, 'Other' Branch**: Creates a separate output branch called **Other**. When the node doesn't detect any of the categories, it outputs items in this branch.
* **Include Confidence Scores**: Add the model's score for each category to the output. The option is off by default, and the output doesn't change while it's off. The node reports the scores in a `classification` object, described in [Confidence scores](#confidence-scores).
* **System Prompt Template**: Use this option to change the system prompt that's used for the classification. It uses the `{categories}` placeholder for the categories.

* **Enable Auto-Fixing**: When enabled, the node automatically fixes model outputs to ensure they match the expected format. Do this by sending the schema parsing error to the LLM and asking it to fix it.


## Confidence scores

{% hint style="info" %}
**Feature availability**

The Text Classifier node's **Include Confidence Scores** option is available from n8n 2.45.0. Every version of the node has the option, so a node you already built gets it when you upgrade n8n.
{% endhint %}

Turn on **Include Confidence Scores** to see how strongly the model matched each item. Each routed item keeps its own fields and gains a `classification` object:

* `category`: the category branch the item went to.
* `confidence`: the model's score for that category, from 0.0 to 1.0. The node leaves the field out when the model gives no score it can read as a number.
* `scores`: the model's score for each category you defined, including the ones the item didn't match. The node leaves out a category it can't read, and leaves out `scores` itself when no category has a score.

```json
{
	"text": "My invoice is wrong and I need it fixed today",
	"classification": {
		"category": "Billing",
		"confidence": 0.92,
		"scores": {
			"Billing": 0.92,
			"Urgent": 0.61
		}
	}
}
```

When an item matches more than one category, each copy carries the confidence for its own branch. If you set **When No Clear Match** to **Output on Extra, 'Other' Branch**, items on that branch get a `category` of `Other`. There, `confidence` runs the other way: 1.0 means no category fit the item, and 0.0 means one of them did. The `scores` map covers the categories you defined, so it has no entry for **Other**.

The scores are estimates from the model, not measured probabilities. They can change between runs and between models. To find weak classifications, compare the categories in `scores` against each other, which is steadier than a fixed cutoff. If you do filter on a fixed value, check that the field exists first, set the value from your own data, and check it again after you change the model.

The option also adds the scores to the format the model must return, so each item costs more tokens and the model's answers can change. Test your workflow again after you turn the option on.

The node writes `classification` over a field of the same name on the incoming item. If you name one of your categories `confidence`, the node stops with the error `The category name "confidence" is reserved when confidence scores are on`. Rename the category, or turn off **Include Confidence Scores**.

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

