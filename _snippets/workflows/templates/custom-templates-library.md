In your environment variables, set `N8N_TEMPLATES_HOST` to the base URL of your API.

Your API must provide the same endpoints and data structure as n8n's.

The endpoints are:

| Method | Path |
| ------ | ---- |
| GET | /templates/workflows/`<id>` |
| GET | /templates/search |
| GET | /templates/collections/`<id>` |
| GET | /templates/collections | 
| GET | /templates/categories |
| GET | /health |

The `/templates/search` endpoint accepts the following query parameters:

  | Parameter  | Type                                         | Description                             |
  |------------|----------------------------------------------|-----------------------------------------|
  | `page`     | integer                                      | The page of results to return           |
  | `rows`     | integer                                      | The maximum number of results to return per page |
  | `category` | comma-separated list of strings (categories) | The categories to search within         |
  | `search`   | string                                       | The search query                        |

The `/templates/collections` endpoint accepts the following query parameters:

   | Parameter  | Type                                         | Description                     |
   |------------|----------------------------------------------|---------------------------------|
   | `category` | comma-separated list of strings (categories) | The categories to search within |
   | `search`   | string                                       | The search query                |

To learn about the data structure, try out n8n's API endpoints:

[https://api.n8n.io/templates/categories](https://api.n8n.io/templates/categories)  
[https://api.n8n.io/templates/collections](https://api.n8n.io/templates/collections)  
[https://api.n8n.io/templates/search](https://api.n8n.io/templates/search)  
[https://api.n8n.io/health](https://api.n8n.io/health)  

You can also [contact us](mailto:help@n8n.io) for more support.
