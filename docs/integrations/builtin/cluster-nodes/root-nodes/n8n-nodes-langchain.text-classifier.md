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
* **Include Confidence Scores**: Add the model's score for each category to the output. The option is off by default, and the output doesn't change while it's off. Available from n8n 2.45.0. There's no new node version, so an existing Text Classifier node gets the option when you upgrade. The node reports the scores in a `classification` object, described in [Confidence scores](#confidence-scores).
* **System Prompt Template**: Use this option to change the system prompt that's used for the classification. It uses the `{categories}` placeholder for the categories.

* **Enable Auto-Fixing**: When enabled, the node automatically fixes model outputs to ensure they match the expected format. Do this by sending the schema parsing error to the LLM and asking it to fix it.


## Confidence scores

Turn on **Include Confidence Scores** to see how strongly the model matched each item. Each routed item keeps its original fields and gains a `classification` object:

* `category`: the category branch the item went to.
* `confidence`: the model's score for that category, from 0.0 to 1.0.
* `scores`: the model's score for each category you defined, including the ones the item didn't match.

```json
{
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

The node drops any score it can't read as a number, so `confidence` can be missing from `classification`, and a category can be missing from `scores`. Check that the field exists before you compare it.

When an item matches more than one category, each copy carries the confidence for its own branch. On the **Other** branch, `category` is `Other` and `confidence` runs the other way: 1.0 means no category fit the item, 0.0 means one of them did.

The scores are estimates from the model, not measured probabilities. They can change between runs and between models. To find weak classifications, compare the categories in `scores` against each other, which is steadier than a fixed cut-off. If you do filter on a fixed value, set it from your own data and check it again after you change the model.

If you name one of your categories `confidence`, the node stops with an error while this option is on. Rename the category, or turn the option off.

## Related resources <a href="#related-resources" id="related-resources"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

