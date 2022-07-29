# Workflow management in Embed

When managing an embedded n8n deployment, spanning across teams or organizations, you will likely need to run the same (or similar) workflows for multiple users. There are two available options for doing so:

| Solution | Pros | Cons |
| -------- | ---- | ---- |
| Create a workflow for each user | No limitation on how workflow starts (can use any trigger) | Requires managing multiple workflows. |
| Create a single workflow, and pass it user credentials when executing | Simplified workflow management (only need to change one workflow). | To run the workflow, your product must call it |



!!! warning
    The APIs referenced in this document are subject to change at any time. Be sure the check for continued functionality with each version upgrade.


## Workflow per user

There are three general steps to follow:

* Obtain the credentials for each user, and any additional parameters that may be required based on the workflow.
* Create the n8n credentials for this user.
* Create the workflow.

### 1. Obtain user credentials

Here you need to capture all credentials for any node/service this user must authenticate with, along with any additional parameters required for the particular workflow. The credentials and any parameters needed will depend on your workflow and what you are trying to do.

### 2. Create user credentials

After all relevant credential details have been obtained, you can proceed to create the relevant service credentials in n8n. This can be done via the Editor UI or API call.


#### Using the Editor UI

1. From the menu select **Credentials** > **New**.
1. Use the drop-down to select the **Credential type** to create, for example *Airtable*.
    ![Create New Credentials drop-down](/_images/embed/managing-workflows/create_new_credentials.png)
1. In the **Create New Credentials** modal, enter the corresponding credentials details for the user, and select the nodes that will have access to these credentials.
    ![Create New Credentials modal](/_images/embed/managing-workflows/create_new_credentials2.png)
1. Click **Create** to finish and save.

#### Using the API

The frontend API used by the Editor UI can also be called to achieve the same result. The API endpoint is in the format: `https://<n8n-domain>/rest/credentials`.

For example, to create the credentials in the Editor UI example above, the request would be:
```
POST https://<n8n-domain>/rest/credentials
```

With the request body:
```json
{
   "name":"MyAirtable",
   "type":"airtableApi",
   "nodesAccess":[
      {
         "nodeType":"n8n-nodes-base.airtable"
      }
   ],
   "data":{
      "apiKey":"q12we34r5t67yu"
   }
}
```

The response will contain the ID of the new credentials, which you will use when creating the workflow for this user:
```json
{
   "data":{
      "name":"MyAirtable",
      "type":"airtableApi",
      "data":{
         "apiKey":"q12we34r5t67yu"
      },
      "nodesAccess":[
         {
            "nodeType":"n8n-nodes-base.airtable",
            "date":"2021-09-10T07:41:27.770Z"
         }
      ],
      "id":"29",
      "createdAt":"2021-09-10T07:41:27.777Z",
      "updatedAt":"2021-09-10T07:41:27.777Z"
   }
}
```

### 3. Create the workflow

Best practice is to have a “base” workflow that you then duplicate and customize for each new user with their credentials (and any other details).

You can duplicate and customize your template workflow using either the Editor UI or API call.

#### Using the Editor UI

1. From the menu select **Workflows** > **Open** to open the template workflow to be duplicated.

1. Select **Workflows** > **Duplicate**, then enter a name for this new workflow and click **Save**.
    ![Duplicate workflow](/_images/embed/managing-workflows/duplicate_workflow.png)

1. Update all relevant nodes to use the credentials for this user (created above).

1. **Save** this workflow set it to **Active** using the toggle in the top-right corner.

#### Using the API

1. Fetch the JSON of the template workflow using the endpoint: `https://<n8n-domain>/rest/workflows/<workflow_id>`
``` 
GET https://<n8n-domain>/rest/workflows/1012
```

The response will contain the JSON data of the selected workflow:
```json
{
  "data": {
    "id": "1012",
    "name": "Nathan's Workflow",
    "active": false,
    "nodes": [
      {
        "parameters": {},
        "name": "Start",
        "type": "n8n-nodes-base.start",
        "typeVersion": 1,
        "position": [
          130,
          640
        ]
      },
      {
        "parameters": {
          "authentication": "headerAuth",
          "url": "https://internal.users.n8n.cloud/webhook/custom-erp",
          "options": {
            "splitIntoItems": true
          },
          "headerParametersUi": {
            "parameter": [
              {
                "name": "unique_id",
                "value": "recLhLYQbzNSFtHNq"
              }
            ]
          }
        },
        "name": "HTTP Request",
        "type": "n8n-nodes-base.httpRequest",
        "typeVersion": 1,
        "position": [
          430,
          300
        ],
        "credentials": {
          "httpHeaderAuth": "beginner_course"
        }
      },
      {
        "parameters": {
          "operation": "append",
          "application": "appKBGQfbm6NfW6bv",
          "table": "processingOrders",
          "options": {}
        },
        "name": "Airtable",
        "type": "n8n-nodes-base.airtable",
        "typeVersion": 1,
        "position": [
          990,
          210
        ],
        "credentials": {
          "airtableApi": "Airtable"
        }
      },
      {
        "parameters": {
          "conditions": {
            "string": [
              {
                "value1": "={{$json[\"orderStatus\"]}}",
                "value2": "processing"
              }
            ]
          }
        },
        "name": "IF",
        "type": "n8n-nodes-base.if",
        "typeVersion": 1,
        "position": [
          630,
          300
        ]
      },
      {
        "parameters": {
          "keepOnlySet": true,
          "values": {
            "number": [
              {
                "name": "=orderId",
                "value": "={{$json[\"orderID\"]}}"
              }
            ],
            "string": [
              {
                "name": "employeeName",
                "value": "={{$json[\"employeeName\"]}}"
              }
            ]
          },
          "options": {}
        },
        "name": "Set",
        "type": "n8n-nodes-base.set",
        "typeVersion": 1,
        "position": [
          800,
          210
        ]
      },
      {
        "parameters": {
          "functionCode": "let totalBooked = items.length;\nlet bookedSum = 0;\n\nfor(let i=0; i < items.length; i++) {\n  bookedSum = bookedSum + items[i].json.orderPrice;\n}\nreturn [{json:{totalBooked, bookedSum}}]\n"
        },
        "name": "Function",
        "type": "n8n-nodes-base.function",
        "typeVersion": 1,
        "position": [
          800,
          400
        ]
      },
      {
        "parameters": {
          "webhookUri": "https://discord.com/api/webhooks/865213348202151968/oD5_WPDQwtr22Vjd_82QP3-_4b_lGhAeM7RynQ8Js5DzyXrQEnj0zeAQIA6fki1JLtXE",
          "text": "=This week we have {{$json[\"totalBooked\"]}} booked orders with a total value of {{$json[\"bookedSum\"]}}. My Unique ID: {{$node[\"HTTP Request\"].parameter[\"headerParametersUi\"][\"parameter\"][0][\"value\"]}}"
        },
        "name": "Discord",
        "type": "n8n-nodes-base.discord",
        "typeVersion": 1,
        "position": [
          1000,
          400
        ]
      },
      {
        "parameters": {
          "triggerTimes": {
            "item": [
              {
                "mode": "everyWeek",
                "hour": 9
              }
            ]
          }
        },
        "name": "Cron",
        "type": "n8n-nodes-base.cron",
        "typeVersion": 1,
        "position": [
          220,
          300
        ]
      }
    ],
    "connections": {
      "HTTP Request": {
        "main": [
          [
            {
              "node": "IF",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Start": {
        "main": [
          []
        ]
      },
      "IF": {
        "main": [
          [
            {
              "node": "Set",
              "type": "main",
              "index": 0
            }
          ],
          [
            {
              "node": "Function",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Set": {
        "main": [
          [
            {
              "node": "Airtable",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Function": {
        "main": [
          [
            {
              "node": "Discord",
              "type": "main",
              "index": 0
            }
          ]
        ]
      },
      "Cron": {
        "main": [
          [
            {
              "node": "HTTP Request",
              "type": "main",
              "index": 0
            }
          ]
        ]
      }
    },
    "createdAt": "2021-07-16T11:15:46.066Z",
    "updatedAt": "2021-07-16T12:05:44.045Z",
    "settings": {},
    "staticData": null,
    "tags": []
  }
}
```

1. Save the returned JSON data and update any relevant credentials and fields for the new user.

1. Create a new workflow using the updated JSON as the request body at endpoint: `https://<n8n-domain>/rest/workflows`
``` 
POST https://<n8n-domain>/rest/workflows/
```

The response will contain the ID of the new workflow, which you will use in the next step.

1. Lastly, activate the new workflow:
```
PATCH https://<n8n-domain>/rest/workflows/1012
```

Passing the additional value `active` in your JSON payload:
```json
// ...
"active":true,
"settings": {},
"staticData": null,
"tags": []
```

## Single workflow

There are four steps to follow to implement this method:

* Obtain the credentials for each user, and any additional parameters that may be required based on the workflow. See [Obtain user credentials](#obtain-user-credentials) above.
* Create the n8n credentials for this user. See [Create user credentials](#create-user-credentials) above.
* Create the workflow.
* Call the workflow as needed.

### Create the workflow

The details and scope of this workflow will vary greatly according to the individual use case, however there are a few design implementations to keep in mind:

* This workflow must be triggered by a [Webhook](https://docs.n8n.io/nodes/n8n-nodes-base.webhook/#webhook) node.
* The incoming webhook call must contain the user’s credentials and any other workflow parameters required.
* Each node where the user’s credentials are needed should use an [expression](https://docs.n8n.io/nodes/expressions.html) so that the node’s credential field reads the credential provided in the webhook call.
* Save and activate the workflow, ensuring the [Production URL](https://docs.n8n.io/nodes/n8n-nodes-base.webhook/#node-reference) is selected for the Webhook node.

### Call the workflow

For each new user, or for any existing user as may be needed, call the webhook defined as the workflow trigger and provide the necessary credentials (and any other workflow parameters).
