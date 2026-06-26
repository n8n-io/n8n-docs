---
title: SearXNG Tool node documentation
description: >-
  Learn how to use the SearXNG Tool node in n8n. Follow technical documentation
  to integrate SearXNG Tool node into your workflows.
contentType:
  - integration
  - reference
nodeTitle: SearXNG Tool node documentation
originalFilePath: >-
  integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolsearxng.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolsearxng
url: >-
  https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolsearxng
layout:
  description:
    visible: false
---

# SearXNG Tool node <a href="#searxng-tool-node" id="searxng-tool-node"></a>

The SearXNG Tool node allows you to integrate search capabilities into your workflows using SearXNG. SearXNG aggregates results from multiple search engines without tracking you.

On this page, you'll find the node options for the SearXNG Tool node, and links to more resources.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/searxng.md).
{% endhint %}

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/X6JM1Mgg5iwvZLDpGEB0/" %}

## Node Options <a href="#node-options" id="node-options"></a>

* **Number of Results**: The number of results to retrieve. The default is 10.
* **Page Number**: The page number of the search results to retrieve. The default is 1.
* **Language**: A two-letter [language code](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) to filter search results by language. For example: `en` for English, `fr` for French. The default is `en`.
* **Safe Search**: Enables or disables filtering explicit content in the search results. Can be None, Moderate, or Strict. The default is None.

## Running a SearXNG instance <a href="#running-a-searxng-instance" id="running-a-searxng-instance"></a>

This node requires running the SearXNG service on the same network as your n8n instance. Ensure your n8n instance has network access to the SearXNG service.

This node requires results in JSON format, which isn't enabled in the default SearXNG configuration. To enable JSON output, add `json` to the `search.formats` section of your SearXNG instance's `settings.yml` file:

```yaml
search:
  # options available for formats: [html, csv, json, rss]
  formats:
    - html
    - json
```

If the `formats` section isn't there, add it. The exact location of the `settings.yml` file depends on how you installed SearXNG. You can find more by visiting the [SearXNG configuration documentation](https://docs.searxng.org/admin/installation-searxng.html#configuration).

The quality and availability of search results depend on the configuration and health of the SearXNG instance you use. 

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse SearXNG Tool node documentation integration templates](https://n8n.io/integrations/searxng) or [search all templates](https://n8n.io/workflows/)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [SearXNG's documentation](https://docs.searxng.org/) for more information about the service. You can also view [LangChain's documentation on their SearXNG integration](https://python.langchain.com/docs/integrations/tools/searx_search/).

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/mjXhKRIw98UJ5hk9LWBl/" %}

