n8n supplies hundreds of nodes, allowing you to create workflows that link multiple products. However, some nodes don't include all the possible operations supported by a product's API. You can work around this by making a custom API call using the [HTTP Request](/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node.

One of the most complex parts of setting up API calls is managing authentication. n8n simplifies authentication for services with an existing node.

n8n includes credential-only nodes. These are integrations where n8n supports setting up credentials for use in the HTTP Request node, but doesn't provide a standalone node.
