---
title: SerpAPI
description: Documentation for the SerpAPI node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
---

# SerpAPI

The SerpAPI node allows an agent in your workflow to call Google's Search API.

On this page, you'll find the node parameters for the SerpAPI node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/serp/).
///

/// note | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [SerpAPI integrations](https://n8n.io/integrations/serpapi/){:target=_blank .external-link} page.
///	

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node options

* **Country**: refer to [Google GL Parameter: Supported Google Countries](https://serpapi.com/google-countries){:target=_blank .external-link} for supported countries and country codes.
* **Device**: the device to use to get the search results.
* **Explicit Array**: whether to force SerpApi to fetch the Google results even if a cached version is already present.
* **Google Domain**: refer to [Supported Google Domains](https://serpapi.com/google-domains) for supported domains.
* **Language**: refer to [Google HL Parameter: Supported Google Languages](https://serpapi.com/google-languages){:target=_blank .external-link} for supported languages and language codes.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/serpapi/){:target=_blank .external-link} on n8n's website.

Refer to [Serp's documentation](https://serpapi.com/search-api){:target=_blank .external-link} for more information about the service. You can also view [LangChain's documentation on their Serp integration](https://js.langchain.com/docs/api/tools/classes/Serper){:target=_blank .external-link}.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
