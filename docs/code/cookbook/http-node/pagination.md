---
description: Pagination examples for the HTTP Request node.
contentType: howto
---

# Pagination in the HTTP Request node

The HTTP Request node supports pagination. This page provides some example configurations, including using the [HTTP node variables](/code/builtin/http-node-variables/).

Refer to [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) for more information on the node.

--8<-- "_snippets/integrations/builtin/core-nodes/http/pagination-api-differences.md"

## An example API

You can try these examples with any API that supports pagination. If you need a free option, [Punk API](https://punkapi.com/documentation/v2){:target=_blank .external-link} is free with rate limits, and doesn't require authorization.

## Enable pagination

In the HTTP Request node, select **Add Option** > **Pagination**.

## Use a URL from the response to get the next page using `$response`

If the API returns the URL of the next page in its response:

1. Set **Pagination Mode** to **Response Contains Next URL**. n8n displays the parameters for this option.
1. In **Next URL**, use an expression to set the URL. The exact expression depends on the data returned by your API. For example, if the API includes a parameter called `next-page` in the response body:
	```javascript
	{{ $response.body["next-page"] }}
	```

## Get the next page by number using `$count`

If the API you're using allows you to target a particular page by number:

1. Set **Pagination Mode** to **Update a Parameter in Each Request**.
1. Set **Type** to **Query**.
1. Enter the **Name** of the query parameter. This depends on your API. For example, Punk API uses a query parameter named `page` to set the page. So **Name** would be `page`.
1. Hover over **Value** and toggle **Expression** on.
1. Enter `{{ $pageCount + 1 }}`

`$pageCount` is the number of pages the HTTP Request node has fetched. It starts at zero. Most API pagination counts from one (the first page is page one). So adding `+1` to `$count` means the node fetches page one on its first loop, page two on its second, and so on.

## Set the page size in the query

If the API you're using supports choosing the page size in the query:

1. Select **Add Parameter** in **Query Parameters**. This is in the main node parameters, not in the option settings.
1. Enter the **Name** of the query parameter. This depends on your API. For example, Punk API uses a query parameter named `per_page` to set page size. So **Name** would be `per_page`.
1. In **Value**, enter your page size.



