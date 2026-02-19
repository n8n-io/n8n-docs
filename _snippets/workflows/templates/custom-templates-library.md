In your environment variables, set `N8N_TEMPLATES_HOST` to the base URL of your API.

### Endpoints

Your API must provide the same endpoints and data structure as n8n's.

The endpoints are:

| Method | Path | Purpose |
| ------ | ---- | ------- |
| GET | `/templates/workflows/<id>` | Fetch template metadata for preview/browsing |
| GET | `/workflows/templates/<id>` | Fetch workflow data to import onto canvas |
| GET | `/templates/search` | Search for workflow templates |
| GET | `/templates/collections/<id>` | Get a specific template collection |
| GET | `/templates/collections` | List all template collections |
| GET | `/templates/categories` | List all template categories |
| GET | `/health` | Health check endpoint |

/// warning | Critical: Two different response formats required
The two workflow endpoints require **different response formats**:

- **`/templates/workflows/{id}`**: Returns template wrapped in a `workflow` key
- **`/workflows/templates/{id}`**: Returns template as a flat object

See response schemas below for details.
///

### Query parameters

The `/templates/search` endpoint accepts the following query parameters:

| Parameter  | Type                                         | Description                                      |
|------------|----------------------------------------------|--------------------------------------------------|
| `page`     | integer                                      | The page of results to return                    |
| `rows`     | integer                                      | The maximum number of results to return per page |
| `category` | comma-separated list of strings (categories) | The categories to search within                  |
| `search`   | string                                       | The search query                                 |

The `/templates/collections` endpoint accepts the following query parameters:

| Parameter  | Type                                         | Description                     |
|------------|----------------------------------------------|---------------------------------|
| `category` | comma-separated list of strings (categories) | The categories to search within |
| `search`   | string                                       | The search query                |

### Schemas

You can explore the data structure of the response objects returned by endpoints here:

??? note "Show `/templates/workflows/{id}` response schema"
	**Purpose**: Called when browsing templates in the UI. Returns metadata for display.

	**Response format**: Wrapped in a `"workflow"` key.

	**Example**:
	```json
	{
	  "workflow": {
	    "id": 123,
	    "name": "Template Name",
	    "description": "Template description",
	    "image": [
	      {
	        "id": 1,
	        "url": "https://example.com/image.png"
	      }
	    ],
	    "categories": [
	      {
	        "id": 1,
	        "name": "Category Name"
	      }
	    ],
	    "workflow": {
	      "nodes": [...],
	      "connections": {},
	      "settings": {},
	      "pinData": {}
	    }
	  }
	}
	```

	The `workflow` object structure matches the `workflow` item data schema below.

??? note "Show `/workflows/templates/{id}` response schema"
	**Purpose**: Returns workflow data to import onto canvas.

	**Response format**: Flat object (no wrapper).

	**Example**:
	```json
	{
	  "id": 123,
	  "name": "Template Name",
	  "workflow": {
	    "nodes": [...],
	    "connections": {},
	    "settings": {},
	    "pinData": {}
	  }
	}
	```

	The `workflow` object structure matches the `workflow` item data schema below.

??? note "Show `workflow` item data schema"
	```json title="Workflow item data schema"
	{
	  "$schema": "http://json-schema.org/draft-07/schema#",
	  "title": "Generated schema for Root",
	  "type": "object",
	  "properties": {
	    "id": {
	      "type": "number"
	    },
	    "name": {
	      "type": "string"
	    },
	    "totalViews": {
	      "type": "number"
	    },
	    "price": {},
	    "purchaseUrl": {},
	    "recentViews": {
	      "type": "number"
	    },
	    "createdAt": {
	      "type": "string"
	    },
	    "user": {
	      "type": "object",
	      "properties": {
	        "username": {
	          "type": "string"
	        },
	        "verified": {
	          "type": "boolean"
	        }
	      },
	      "required": [
	        "username",
	        "verified"
	      ]
	    },
	    "nodes": {
	      "type": "array",
	      "items": {
	        "type": "object",
	        "properties": {
	          "id": {
	            "type": "number"
	          },
	          "icon": {
	            "type": "string"
	          },
	          "name": {
	            "type": "string"
	          },
	          "codex": {
	            "type": "object",
	            "properties": {
	              "data": {
	                "type": "object",
	                "properties": {
	                  "details": {
	                    "type": "string"
	                  },
	                  "resources": {
	                    "type": "object",
	                    "properties": {
	                      "generic": {
	                        "type": "array",
	                        "items": {
	                          "type": "object",
	                          "properties": {
	                            "url": {
	                              "type": "string"
	                            },
	                            "icon": {
	                              "type": "string"
	                            },
	                            "label": {
	                              "type": "string"
	                            }
	                          },
	                          "required": [
	                            "url",
	                            "label"
	                          ]
	                        }
	                      },
	                      "primaryDocumentation": {
	                        "type": "array",
	                        "items": {
	                          "type": "object",
	                          "properties": {
	                            "url": {
	                              "type": "string"
	                            }
	                          },
	                          "required": [
	                            "url"
	                          ]
	                        }
	                      }
	                    },
	                    "required": [
	                      "primaryDocumentation"
	                    ]
	                  },
	                  "categories": {
	                    "type": "array",
	                    "items": {
	                      "type": "string"
	                    }
	                  },
	                  "nodeVersion": {
	                    "type": "string"
	                  },
	                  "codexVersion": {
	                    "type": "string"
	                  }
	                },
	                "required": [
	                  "categories"
	                ]
	              }
	            }
	          },
	          "group": {
	            "type": "string"
	          },
	          "defaults": {
	            "type": "object",
	            "properties": {
	              "name": {
	                "type": "string"
	              },
	              "color": {
	                "type": "string"
	              }
	            },
	            "required": [
	              "name"
	            ]
	          },
	          "iconData": {
	            "type": "object",
	            "properties": {
	              "icon": {
	                "type": "string"
	              },
	              "type": {
	                "type": "string"
	              },
	              "fileBuffer": {
	                "type": "string"
	              }
	            },
	            "required": [
	              "type"
	            ]
	          },
	          "displayName": {
	            "type": "string"
	          },
	          "typeVersion": {
	            "type": "number"
	          },
	          "nodeCategories": {
	            "type": "array",
	            "items": {
	              "type": "object",
	              "properties": {
	                "id": {
	                  "type": "number"
	                },
	                "name": {
	                  "type": "string"
	                }
	              },
	              "required": [
	                "id",
	                "name"
	              ]
	            }
	          }
	        },
	        "required": [
	          "id",
	          "icon",
	          "name",
	          "codex",
	          "group",
	          "defaults",
	          "iconData",
	          "displayName",
	          "typeVersion"
	        ]
	      }
	    }
	  },
	  "required": [
	    "id",
	    "name",
	    "totalViews",
	    "price",
	    "purchaseUrl",
	    "recentViews",
	    "createdAt",
	    "user",
	    "nodes"
	  ]
	}
	```

??? note "Show `category` item data schema"
	```json title="Category item data schema"
	{
	  "$schema": "http://json-schema.org/draft-07/schema#",
	  "type": "object",
	  "properties": {
	    "id": {
	      "type": "number"
	    },
	    "name": {
	      "type": "string"
	    }
	  },
	  "required": [
	    "id",
	    "name"
	  ]
	}
	```

??? note "Show `collection` item data schema"
	```json title="Collection item data schema"
	{
	  "$schema": "http://json-schema.org/draft-07/schema#",
	  "type": "object",
	  "properties": {
	    "id": {
	      "type": "number"
	    },
	    "rank": {
	      "type": "number"
	    },
	    "name": {
	      "type": "string"
	    },
	    "totalViews": {},
	    "createdAt": {
	      "type": "string"
	    },
	    "workflows": {
	      "type": "array",
	      "items": {
	        "type": "object",
	        "properties": {
	          "id": {
	            "type": "number"
	          }
	        },
	        "required": [
	          "id"
	        ]
	      }
	    },
	    "nodes": {
	      "type": "array",
	      "items": {}
	    }
	  },
	  "required": [
	    "id",
	    "rank",
	    "name",
	    "totalViews",
	    "createdAt",
	    "workflows",
	    "nodes"
	  ]
	}
	```

You can also interactively explore n8n's API endpoints:

[https://api.n8n.io/templates/categories](https://api.n8n.io/templates/categories)  
[https://api.n8n.io/templates/collections](https://api.n8n.io/templates/collections)  
[https://api.n8n.io/templates/search](https://api.n8n.io/templates/search)  
[https://api.n8n.io/health](https://api.n8n.io/health)  


You can [contact us](mailto:help@n8n.io) for more support.
