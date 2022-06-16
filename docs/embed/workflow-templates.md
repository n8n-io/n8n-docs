# Workflow templates

n8n provides a library of workflow templates. When embedding n8n, you can:

* Continue to use n8n's workflow templates library (this is the default behavior)
* Disable workflow templates
* Create your own workflow templates library

## Disable workflow templates

In your environment variables, set `N8N_TEMPLATES_ENABLED` to false.

## Use your own workflow templates library

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

To learn about the data structure, try out the endpoints. You can also [contact us](mailto:support@n8n.io) for more support.