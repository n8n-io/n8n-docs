{
	"nodes": [
	  {
		"parameters": {
		  "operation": "post",
		  "additionalFields": {
			"first_name": "={{$node[\"Normalize\"].json[\"first_name\"]}}",
			"last_name": "={{$node[\"Normalize\"].json[\"last_name\"]}}",
			"email": "={{$node[\"Normalize\"].json[\"email\"]}}"
		  }
		},
		"name": "SugarCrm",
		"type": "n8n-nodes-base.sugarCrm",
		"typeVersion": 1,
		"position": [
		  1120,
		  0
		],
		"credentials": {
		}
	  },
	  {
		"parameters": {
		  "email": "={{$json[\"email\"]}}",
		  "firstName": "={{$json[\"first_name\"]}}",
		  "lastName": "={{$json[\"last_name\"]}}",
		  "company": "",
		  "additionalFields": {},
		  "options": {}
		},
		"name": "SaveContactMautic",
		"type": "n8n-nodes-base.mautic",
		"typeVersion": 1,
		"position": [
		  760,
		  -80
		],
		"credentials": {
		}
	  },
	  {
		"parameters": {
		  "operation": "editContactPoint",
		  "contactId": "={{$json[\"id\"]}}",
		  "points": 10
		},
		"name": "Add10Points",
		"type": "n8n-nodes-base.mautic",
		"typeVersion": 1,
		"position": [
		  940,
		  -80
		],
		"credentials": {
		}
	  },
	  {
		"parameters": {
		  "event": "customer.created"
		},
		"name": "NewCustomerTrigger",
		"type": "n8n-nodes-base.wooCommerceTrigger",
		"typeVersion": 1,
		"position": [
		  400,
		  -80
		],
		"webhookId": "",
		"credentials": {
		}
	  },
	  {
		"parameters": {
		  "functionCode": "dict = {\n  'first_name': item.billing.first_name,\n  'last_name': item.billing.last_name,\n  'email': item.billing.email,\n}\n\nreturn dict;"
		},
		"name": "NormalizeMain",
		"type": "n8n-nodes-base.functionItem",
		"typeVersion": 1,
		"position": [
		  580,
		  -80
		]
	  },
	  {
		"parameters": {
		  "operation": "sendEmail",
		  "campaignEmailId": 6,
		  "contactId": "={{$node[\"SaveContactMautic\"].json[\"id\"]}}"
		},
		"name": "Welcome-Email",
		"type": "n8n-nodes-base.mautic",
		"typeVersion": 1,
		"position": [
		  1120,
		  -160
		],
		"credentials": {
		}
	  }
	],
	"connections": {
	  "SaveContactMautic": {
		"main": [
		  [
			{
			  "node": "Add10Points",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  },
	  "Add10Points": {
		"main": [
		  [
			{
			  "node": "Welcome-Email",
			  "type": "main",
			  "index": 0
			},
			{
			  "node": "SugarCrm",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  },
	  "NewCustomerTrigger": {
		"main": [
		  [
			{
			  "node": "NormalizeMain",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  },
	  "NormalizeMain": {
		"main": [
		  [
			{
			  "node": "SaveContactMautic",
			  "type": "main",
			  "index": 0
			}
		  ]
		]
	  }
	}
  }
