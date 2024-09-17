---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SearchApi
description: Documentation for the SearchApi node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
priority: high
---

# SearchApi

The SearchApi node allows an agent in your workflow to call Google, Bing, Baidu, Google News, YouTube APIs.

On this page, you'll find the node parameters for the SearchApi node, and links to more resources.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/searchapi/).
///

--8<-- "_snippets/integrations/builtin/cluster-nodes/sub-node-expression-resolution.md"

## Node options

* **Engine**: defines an engine that will be used to retrieve real-time data. Refer to [documentation](https://www.searchapi.io/docs/google) for all available engines.
* **Country**: refer to [Google GL Parameter: Supported Google Countries](https://www.searchapi.io/docs/parameters/google/gl){:target=_blank .external-link} for supported countries and country codes.
* **Device**: the device to use to get the search results.
* **Google Domain**: refer to [Supported Google Domains](https://www.searchapi.io/docs/parameters/google/domain) for supported domains.
* **Language**: refer to [Google HL Parameter: Supported Google Languages](https://www.searchapi.io/docs/parameters/google/hl){:target=_blank .external-link} for supported languages and language codes.
* **Video ID**: defines the video you want to search. Usable only with `youtube_transcripts` engine.
* **Lang**: defines language for transcripts. Usable only with `youtube_transcripts` engine.

## Templates and examples

<!-- see https://www.notion.so/n8n/Pull-in-templates-for-the-integrations-pages-37c716837b804d30a33b47475f6e3780 -->
[[ templatesWidget(title, 'searchapi') ]]

## Related resources

Refer to [SearchApi's documentation](https://www.searchapi.io/){:target=_blank .external-link} for more information about the service. You can also view [LangChain's documentation on integration](https://js.langchain.com/docs/integrations/tools/searchapi/){:target=_blank .external-link}.

--8<-- "_snippets/integrations/builtin/cluster-nodes/langchain-overview-link.md"
--8<-- "_glossary/ai-glossary.md"
