# Overview

n8n supplies hundreds of nodes, allowing you to create workflows that link multiple products. However, some nodes don't include all the possible operations supported by a product's API. You can work around this using the core [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/) and [Webhook](/integrations/core-nodes/n8n-nodes-base.webhook/) nodes. 

To support this, n8n provides a way to use the HTTP Request node with either an existing credential, or using n8n's credential creation process. This avoids complex credentials setups. Creating an HTTP request can require knowledge of different authentication types, and work to set up the appropriate option (such as basic auth, header, or OAuth2.). n8n avoids this complexity using [App-specific HTTP credentials](/integrations/custom-operations/app-specific-http-credentials/).




