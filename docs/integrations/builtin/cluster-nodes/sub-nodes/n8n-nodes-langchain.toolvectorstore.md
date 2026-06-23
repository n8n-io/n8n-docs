---
title: Vector Store Question Answer Tool node documentation
description: >-
  Learn how to use the Vector Store Question Answer Tool node in n8n. Follow
  technical documentation to integrate Vector Store Question Answer Tool node
  into your workflows.
contentType:
  - integration
  - reference
nodeTitle: Vector Store Question Answer Tool node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore
layout:
  description:
    visible: false
---

# Vector Store Question Answer Tool node <a href="#vector-store-question-answer-tool-node" id="vector-store-question-answer-tool-node"></a>

The Vector Store Question Answer node is a [tool](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-tool) that allows an [agent](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-agent) to summarize results and answer questions based on chunks from a [vector store](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/key-concept-glossary#ai-vector-store). 

On this page, you'll find the node parameters for the Vector Store Question Answer node, and links to more resources.

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Vector Store Question Answer Tool integrations](https://n8n.io/integrations/vector-store-tool/) page.
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

### Description of Data <a href="#description-of-data" id="description-of-data"></a>

Enter a description of the data in the vector store.

### Limit <a href="#limit" id="limit"></a>

The maximum number of results to return.

## How n8n populates the tool description <a href="#how-n8n-populates-the-tool-description" id="how-n8n-populates-the-tool-description"></a>

n8n uses the node name (select the name to edit) and **Description of Data** parameter to populate the tool description for AI agents using the following format:

> Useful for when you need to answer questions about [node name]. Whenever you need information about [Description of Data], you should ALWAYS use this. Input should be a fully formed question.

Spaces in the node name are converted to underscores in the tool description.

{% hint style="warning" %}
**Avoid special characters in node names**

Using special characters in the node name will cause errors when the agent runs:

![model errors from special characters](../../../.gitbook/assets/name-characters-error.png)

Use only alphanumeric characters, spaces, dashes, and underscores in node names.
{% endhint %}

## Related resources <a href="#related-resources" id="related-resources"></a>

View [example workflows and related content](https://n8n.io/integrations/vector-store-tool/) on n8n's website.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/tzB5H7fSmYiRvvv52e4P/" %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

