---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SearXNG Node
description: The SearXNG node allows you to integrate search capabilities into your workflows using SearXNG. SearXNG aggregates results from multiple search engines without tracking you.
contentType: [integration, reference]
---

## Node Operations

- **Search**
  - Runs a search query and returns the results.

## Parameters

- **Query** (`string`)
  - The search term or phrase you want to query.

- **Categories** (`string`, optional)
  - Comma-separated list of categories to search within, (eg: `general`, `images`).
  - Options available are: **`general`, `files`, `images`, `IT`, `map`, `music`, `news`, `science`, `social media`, `videos`**
  - If left empty, the default categories configured in your SearXNG instance will be used.

- **Language** (`string`, optional)
  - Two-letter language code to filter search results by language (e.g., `en` for English, `fr` for French).
  - Look [here](https://docs.searxng.org/user/search-syntax.html#select-language) for exhaustive list of langage codes

- **Time Range** (`string`, optional)
  - Set a time range if needed; format is XXX

- **Safe Search** (`number`, optional)
  - Enables or disables filtering (None, Moderate, or Strict) of explicit content in the search results.

- **Results Per Page** (`number`, optional)
  - Specify the number of results to retrieve per page.​

- **Page Number** (`number`, optional) Indicate the page number of the results to retrieve.

## Node Options
You can further configure the node using these options:
- **API URL** (`string`, optional)
  - Provide a custom URL for a SearXNG instance if you are not using the default instance.​

## Example Usage

To use the SearXNG node in a workflow:

1. Add the **SearXNG** node to your workflow.
2. Set the **Query** parameter to your desired search term.
3. Optionally, specify **Categories**, **Language**, **Time Range**, and **Safe Search** parameters to refine your search.
4. Connect the node to subsequent nodes to process the search results as needed.

## Practical Applications

- **Content Aggregation**: Collect the latest articles or posts on a specific topic.
- **Data Enrichment**: Enhance records with up-to-date information from the web.
- **Monitoring**: Keep track of new developments or mentions of particular keywords.

## Considerations
- This node requires you to run the SearXNG service on the same network as your n8n instance. **Ensure your n8n instance has network access to the SearXNG service.**
- The quality and availability of search results depend on the configuration and health of the SearXNG instance you are using.

For more information on setting up and configuring SearXNG, refer to the [SearXNG documentation](https://docs.searxng.org/).

## Additional Resources

- [SearXNG Official Documentation](https://docs.searxng.org/)
- [n8n Documentation on Integrations](https://docs.n8n.io/integrations/)
