# Overview

n8n supplies hundreds of nodes, allowing you to create workflows that link multiple products. However, some nodes don't include all the possible operations supported by a product's API. You can work around this using the core [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/) and [Webhook](/integrations/core-nodes/n8n-nodes-base.webhook/) nodes. 

To support this, n8n provides custom operations: a way to use the HTTP Request node with an existing credential. This avoids complex credentials setups. Creating an HTTP request can require knowledge of different authentication types, and work to set up the appropriate option (such as basic auth, header, or OAuth2.). n8n's custom operations feature avoids this complexity, using [app-specific HTTP credentials](/integrations/custom-operations/app-specific-http-credentials/).




