---
title: WF² Second Approval with DOC²
description: Extended documents-approval as important for any business. We show you how you can easily create a Worfklow to assign an approval
date: 2022-09-15
tags:
  - Workflow²
  - Approval
  - DOC²
---

# WF² Second Approval with DOC²

For your invoice receipt process in DOC², we now support second approvals. This means one user or group member approves an invoice, assigns it to a second user or group for review and approval to ensure the approval is granted correctly.

After next release, you are able to use this advanced approval workflow to assign invoices to specific users or groups, depending on the total amount of the invoice.

With our new **Approve/Reject node**, you can use this workflow to automatically approve or reject invoices that have defined high or low totals, for example.

![](/_images/workflows/workflows/extended_approval.png)





## Examples

First Approval workflow

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

Second Approval workflow

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
