---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SerpApi (Google Search) node documentation
description: Learn how to use the SerpApi (Google Search) node in n8n. Follow technical documentation to integrate SerpApi (Google Search) node into your workflows.
contentType: integration
priority: high
---

# SerpApi (Google Search) node

The SerpAPI node allows an agent in your workflow to call Google's Search API.

On this page, you'll find the node parameters for the SerpAPI node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/serp/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node options

* **Country**: Enter the country code you'd like to use. Refer to [Google GL Parameter: Supported Google Countries](https://serpapi.com/google-countries){:target=_blank .external-link} for supported countries and country codes.
* **Device**: Select the device to use to get the search results.
* **Explicit Array**: Choose whether to force SerpApi to fetch the Google results even if a cached version is already present (turned on) or not (turned off).
* **Google Domain**: Enter the Google Domain to use. Refer to [Supported Google Domains](https://serpapi.com/google-domains) for supported domains.
* **Language**: Enter the language code you'd like to use. Refer to [Google HL Parameter: Supported Google Languages](https://serpapi.com/google-languages){:target=_blank .external-link} for supported languages and language codes.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(page.title, 'serpapi') ]]

## Related resources

Refer to [Serp's documentation](https://serpapi.com/search-api){:target=_blank .external-link} for more information about the service. You can also view [LangChain's documentation on their Serp integration](https://js.langchain.com/docs/integrations/tools/serpapi/){:target=_blank .external-link}.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
