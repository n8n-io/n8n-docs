---
title: WF² Approval with DOC²
description: Documents Approval as important for any business. We show you how you can a easy Worfklow to create an approval
date: 2021-07-05
tags:
  - Workflow²
  - Approval
  - DOC²
  - Ming.le
  - Infor OS
---

# WF² Approval with DOC²

We now support double approvals meaning one user or groupmember approves a document and the document gets assigned to a second user or group to make sure that everything goes as wanted.

Once the update is live, you can for example utilize the extended approval workflow from here to assign invoices to specific users or groups depending on the total cost (total amount) on an invoice.

And with our Approve/Reject node in the mix you can have the workflow automatically approve or reject invoices which for example have high or low total amounts.

![](/_images/workflows/workflows/extended_approval.png)





## Example

First workflow

``` Javascript
},
"nodes": [
{
	"parameters": {
	"selection": "group",
	"group": ""
	},
	"name": "Assign Finance 5000",
	"type": "n8n-nodes-base.assignEmployee",
	"typeVersion": 1,
	"position": [
	620,
	80
	],
	"id": "",
	"credentials": {

	}
},
{
	"parameters": {
	"conditions": {
		"number": [
		{
			"value1": "={{$json[\"fields_compact\"][\"total_amount\"]}}",
			"operation": "larger",
			"value2": 5000
		}
		]
	},
	"combineOperation": "any"
	},
	"name": ">5000?",
	"type": "n8n-nodes-base.if",
	"typeVersion": 1,
	"position": [
	420,
	240
	],
	"id": ""
},
{
	"parameters": {
	"conditions": {
		"number": [
		{
			"value1": "={{$node[\"First\"].json[\"fields_compact\"][\"total_amount\"]}}",
			"operation": "larger",
			"value2": 100
		}
		]
	}
	},
	"name": ">100?",
	"type": "n8n-nodes-base.if",
	"typeVersion": 1,
	"position": [
	620,
	380
	],
	"id": ""
},
{
	"parameters": {
	"selection": "group",
	"group": ""
	},
	"name": "Assign Finance 100",
	"type": "n8n-nodes-base.assignEmployee",
	"typeVersion": 1,
	"position": [
	800,
	240
	],
	"id": "",
	"credentials": {

	}
},
{
	"parameters": {
	"document_type": "INVOICE",
	"status": "validated_pending_approval"
	},
	"name": "First",
	"type": "n8n-nodes-base.statusTrigger",
	"typeVersion": 1,
	"position": [
	240,
	240
	],
	"webhookId": "",
	"id": "",
	"credentials": {

	}
},
{
	"parameters": {
	"doc_id": "={{$node[\"First\"].json[\"doc_id\"]}}",
	"todo": "approve"
	},
	"id": "",
	"name": "Approve/Reject Documents",
	"type": "n8n-nodes-base.approvereject",
	"typeVersion": 1,
	"position": [
	800,
	400
	],
	"credentials": {

	}
}
],
"connections": {
">5000?": {
	"main": [
	[
		{
		"node": "Assign Finance 5000",
		"type": "main",
		"index": 0
		}
	],
	[
		{
		"node": ">100?",
		"type": "main",
		"index": 0
		}
	]
	]
},
">100?": {
	"main": [
	[
		{
		"node": "Assign Finance 100",
		"type": "main",
		"index": 0
		}
	],
	[
		{
		"node": "Approve/Reject Documents",
		"type": "main",
		"index": 0
		}
	]
	]
},
"First": {
	"main": [
	[
		{
		"node": ">5000?",
		"type": "main",
		"index": 0
		}
	]
	]
}
}

```

Second workflow

```Javascript
{
  "nodes": [
    {
      "parameters": {
        "document_type": "INVOICE",
        "status": "approved_pending_second_approval"
      },
      "name": "Second",
      "type": "n8n-nodes-base.statusTrigger",
      "typeVersion": 1,
      "position": [
        600,
        520
      ],
      "webhookId": "",
      "id": "",
      "credentials": {

      }
    },
    {
      "parameters": {
        "selection": "group",
        "group": ""
      },
      "name": "Assign Head",
      "type": "n8n-nodes-base.assignEmployee",
      "typeVersion": 1,
      "position": [
        980,
        360
      ],
      "id": "",
      "credentials": {

      }
    },
    {
      "parameters": {
        "selection": "group",
        "group": ""
      },
      "name": "Assign Finance",
      "type": "n8n-nodes-base.assignEmployee",
      "typeVersion": 1,
      "position": [
        1160,
        520
      ],
      "id": "",
      "credentials": {

      }
    },
    {
      "parameters": {
        "doc_id": "={{$node[\"Second\"].json[\"doc_id\"]}}",
        "todo": "approve"
      },
      "id": "",
      "name": "Auto Approve",
      "type": "n8n-nodes-base.approvereject",
      "typeVersion": 1,
      "position": [
        1160,
        700
      ],
      "credentials": {

      }
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{$node[\"Second\"].json[\"fields_compact\"][\"total_amount\"]}}",
              "operation": "larger",
              "value2": 100
            }
          ]
        },
        "combineOperation": "any"
      },
      "name": ">100",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        980,
        680
      ],
      "id": ""
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{$json[\"fields_compact\"][\"total_amount\"]}}",
              "operation": "larger",
              "value2": 5000
            }
          ]
        },
        "combineOperation": "any"
      },
      "name": ">5000",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [
        780,
        520
      ],
      "id": ""
    }
  ],
  "connections": {
    "Second": {
      "main": [
        [
          {
            "node": ">5000",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    ">100": {
      "main": [
        [
          {
            "node": "Assign Finance",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Auto Approve",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    ">5000": {
      "main": [
        [
          {
            "node": "Assign Head",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": ">100",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```
