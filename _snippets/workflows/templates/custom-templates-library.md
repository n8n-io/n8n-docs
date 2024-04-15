In your environment variables, set `N8N_TEMPLATES_HOST` to the base URL of your API.

Your API must provide the same endpoints and data structure as n8n's.

The endpoints are:

| Method | Path |
| ------ | ---- |
| GET | /templates/workflows/`<id>` |
| GET | /templates/workflows |
| GET | /templates/collections/`<id>` |
| GET | /templates/collections | 
| GET | /templates/categories |
| GET | /health |

To learn about the data structure, try out n8n's API endpoints:

[https://api.n8n.io/templates/categories](https://api.n8n.io/templates/categories){:target=_blank .external-link}  
[https://api.n8n.io/templates/collections](https://api.n8n.io/templates/collections){:target=_blank .external-link}  
[https://api.n8n.io/templates/workflows](https://api.n8n.io/templates/workflows){:target=_blank .external-link}  
[https://api.n8n.io/health](https://api.n8n.io/health){:target=_blank .external-link}  

You can also [contact us](mailto:help@n8n.io) for more support.
