{
	"nodes": [
	  {
		"parameters": {
		  "functionCode": "dict = {\n  'first_name': item.billing.first_name,\n  'last_name': item.billing.last_name,\n  'email': item.billing.email,\n}\n\nreturn dict;"
		},
		"name": "Normalize",
		"type": "n8n-nodes-base.functionItem",
		"typeVersion": 1,
		"position": [
		  460,
		  480
		]
	  },
	  {
		"parameters": {
		  "conditions": {
			"string": [
			  {
				"value1": "={{$json[\"thelist\"].join(', ')}}",
				"operation": "notContains",
				"value2": "={{$node[\"Normalize\"].json[\"email\"]}}"
			  }
			]
		  }
		},
		"name": "New Contact?",
		"type": "n8n-nodes-base.if",
		"typeVersion": 1,
		"position": [
		  980,
		  480
		]
	  },
	  {
		"parameters": {
		  "functionCode": "thelist = []\n\nitems.forEach(function(item) {\n  console.log(item['json']['fields']['all']['email'])\n  thelist.push(item['json']['fields']['all']['email'])\n})\nconsole.log(thelist)\n\nreturn {thelist}"
		},
		"name": "Normalize Contactdata",
		"type": "n8n-nodes-base.function",
		"typeVersion": 1,
		"position": [
		  800,
		  480
		]
	  },
	  {
		"parameters": {
		  "email": "={{$node[\"Normalize\"].json[\"email\"]}}",
		  "firstName": "={{$node[\"Normalize\"].json[\"first_name\"]}}",
		  "lastName": "={{$node[\"Normalize\"].json[\"last_name\"]}}",
		  "company": "",
		  "additionalFields": {},
		  "options": {}
		},
		"name": "Yes - New Contact",
		"type": "n8n-nodes-base.mautic",
		"typeVersion": 1,
		"position": [
		  1180,
		  460
		],
		"credentials": {
		}
	  },
	  {
		"parameters": {
		  "operation": "getAll",
		  "returnAll": true,
		  "options": {
			"publishedOnly": true
		  }
		},
		"name": "Mautic - Get Contacts",
		"type": "n8n-nodes-base.mautic",
		"typeVersion": 1,
		"position": [
		  620,
		  480
		],
		"credentials": {
		}
	  },
	  {
		"parameters": {
		  "operation": "sendEmail",
		  "campaignEmailId": 6,
		  "contactId": "={{$json[\"id\"]}}"
		},
		"name": "Webshop - WelcomeEmail",
		"type": "n8n-nodes-base.mautic",
		"typeVersion": 1,
		"position": [
		  1360,
		  460
		],
		"credentials": {
		}
	  },
	  {
		"parameters": {
		  "event": "order.created"
		},
		"name": "New OrderTrigger",
		"type": "n8n-nodes-base.wooCommerceTrigger",
		"typeVersion": 1,
		"position": [
		  280,
		  480
		],
		"webhookId": "",
		"credentials": {
		}
	  }
	],
	"connections": {
	  "Normalize": {
		"main": [
		  [
			{
			  "node": "Mautic - Get Contacts",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  },
	  "New Contact?": {
		"main": [
		  [
			{
			  "node": "Yes - New Contact",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  },
	  "Normalize Contactdata": {
		"main": [
		  [
			{
			  "node": "New Contact?",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  },
	  "Yes - New Contact": {
		"main": [
		  [
			{
			  "node": "Webshop - WelcomeEmail",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  },
	  "Mautic - Get Contacts": {
		"main": [
		  [
			{
			  "node": "Normalize Contactdata",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  },
	  "New OrderTrigger": {
		"main": [
		  [
			{
			  "node": "Normalize",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  }
	}
  }
