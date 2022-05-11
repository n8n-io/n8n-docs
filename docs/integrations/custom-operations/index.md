# Custom operations

n8n supplies hundreds of nodes, allowing you to create workflows that link multiple products. However, some nodes do not include all the possible operations supported by a product's API. You can work around this using the core [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/) and [Webhook](/integrations/core-nodes/n8n-nodes-base.webhook/) nodes. 

To support this, n8n provides custom operations: a way to use the HTTP Request node with an existing integration credential. This avoids complex credentials setups. Creating an HTTP request usually requires understanding different authentication types, and setting up the appropriate option (basic auth, header, OAuth2, and so on). n8n's custom operations avoid this complexity.

