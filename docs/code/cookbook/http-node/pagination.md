---
description: Pagination examples for the HTTP Request node.
contentType: howto
---

# Pagination in the HTTP Request node

The HTTP Request node supports pagination. This page provides some example configurations, including using the [HTTP node variables](/code/builtin/http-node-variables.md).

Refer to [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/index.md) for more information on the node.

--8<-- "_snippets/integrations/builtin/core-nodes/http/pagination-api-differences.md"


## Enable pagination

In the HTTP Request node, select **Add Option** > **Pagination**.

## Use a URL from the response to get the next page using `$response`

If the API returns the URL of the next page in its response:

1. Set **Pagination Mode** to **Response Contains Next URL**. n8n displays the parameters for this option.
1. In **Next URL**, use an [expression](/glossary.md#expression-n8n) to set the URL. The exact expression depends on the data returned by your API. For example, if the API includes a parameter called `next-page` in the response body:
	```javascript
	{{ $response.body["next-page"] }}
	```

## Get the next page by number using `$pageCount`

If the API you're using supports targeting a specific page by number:

1. Set **Pagination Mode** to **Update a Parameter in Each Request**.
1. Set **Type** to **Query**.
1. Enter the **Name** of the query parameter. This depends on your API and is usually described in its documentation. For example, some APIs use a query parameter named `page` to set the page. So **Name** would be `page`.
1. Hover over **Value** and toggle **Expression** on.
1. Enter `{{ $pageCount + 1 }}`

`$pageCount` is the number of pages the HTTP Request node has fetched. It starts at zero. Most API pagination counts from one (the first page is page one). This means that adding `+1` to `$pageCount` means the node fetches page one on its first loop, page two on its second, and so on.

## Navigate pagination through body parameters

If the API you're using allows you to paginate through the body parameters:

1. Set the HTTP Request Method to **POST**
1. Set **Pagination Mode** to **Update a Parameter in Each Request**.
1. Select **Body** in the **Type** parameter.
1. Enter the **Name** of the body parameter. This depends on the API you're using. `page` is a common key name.
1. Hover over **Value** and toggle **Expression** on.
1. Enter `{{ $pageCount + 1 }}`

## Set the page size in the query

If the API you're using supports choosing the page size in the query:

1. Select **Send Query Parameters** in main node parameters (this is the parameters you see when you first open the node, not the settings within options).
1. Enter the **Name** of the query parameter. This depends on your API. For example, a lot of APIs use a query parameter named `limit` to set page size. So **Name** would be `limit`.
1. In **Value**, enter your page size.


