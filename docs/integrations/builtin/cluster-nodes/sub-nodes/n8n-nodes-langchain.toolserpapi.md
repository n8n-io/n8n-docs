---
title: SerpApi (Google Search) node documentation
description: >-
  Learn how to use the SerpApi (Google Search) node in n8n. Follow technical
  documentation to integrate SerpApi (Google Search) node into your workflows.
contentType:
  - integration
  - reference
priority: high
nodeTitle: SerpApi (Google Search) node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi
layout:
  description:
    visible: false
---

# SerpApi (Google Search) node <a href="#serpapi-google-search-node" id="serpapi-google-search-node"></a>

{% hint style="warning" %}
**Deprecated**

This node is deprecated, and will be removed in a future version. Use the verified **SerpApi Official** community node instead.
{% endhint %}

The SerpAPI node allows an agent[^1] in your workflow to call Google's Search API.

On this page, you'll find the node parameters for the SerpAPI node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/serp.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/L75pqqTYRK2D04H3RzmB/" %}

## Node options <a href="#node-options" id="node-options"></a>

* **Country**: Enter the country code you'd like to use. Refer to [Google GL Parameter: Supported Google Countries](https://serpapi.com/google-countries) for supported countries and country codes.
* **Device**: Select the device to use to get the search results.
* **Explicit Array**: Choose whether to force SerpApi to fetch the Google results even if a cached version is already present (turned on) or not (turned off).
* **Google Domain**: Enter the Google Domain to use. Refer to [Supported Google Domains](https://serpapi.com/google-domains) for supported domains.
* **Language**: Enter the language code you'd like to use. Refer to [Google HL Parameter: Supported Google Languages](https://serpapi.com/google-languages) for supported languages and language codes.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse SerpApi (Google Search) node documentation integration templates](https://n8n.io/integrations/serpapi) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Serp's documentation](https://serpapi.com/search-api) for more information about the service. You can also view [LangChain's documentation on their Serp integration](https://js.langchain.com/docs/integrations/tools/serpapi/).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/TbnZmZEDZnkAWTXWp8th/" %}

[^1]: AI agents are artificial intelligence systems capable of responding to requests, making decisions, and performing real-world tasks for users. They use large language models (LLMs) to interpret user input and make decisions about how to best process requests using the information and resources they have available.
