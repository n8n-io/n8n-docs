In your environment variables, set `N8N_TEMPLATES_HOST` to the base URL of your API.

### Endpoints

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

### Data schema

You can explore the data structure of the items in the response object returned by endpoints here:

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
