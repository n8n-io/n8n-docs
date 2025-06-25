

# embed/configuration.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n Embed Configuration
description: Learn how to configure your n8n Embed.
contentType: howto
---

# Configuration

--8<-- "_snippets/embed-license.md"

## Authentication

You can secure n8n by setting up [User management](/user-management/index.md), n8n's built-in authentication feature.

n8n supports [LDAP](/user-management/ldap.md) and [SAML](/user-management/saml/index.md).

### Credential overwrites

To offer OAuth login to users, it's possible to overwrite [credentials](/glossary.md#credential-n8n) on a global basis. This credential data isn't visible to users but the backend uses it automatically.

In the Editor UI, n8n hides all overwritten fields by default. This means that users are able to authenticate using  OAuth by pressing the "connect" button on the credentials.

n8n offers two ways to apply credential overwrites: using Environment Variable and using the REST API.

#### Using environment variables

You can set credential overwrites using environment variable by setting the `CREDENTIALS_OVERWRITE_DATA` to `{ CREDENTIAL_NAME: { PARAMETER: VALUE }}`.

/// warning
Even though this is possible, it isn't recommended. Environment variables aren't protected in n8n, so the data can leak to users.
///

#### Using REST APIs

The recommended way is to load the data using a custom REST endpoint. Set the `CREDENTIALS_OVERWRITE_ENDPOINT` to a path under which this endpoint should be made available.

/// note
The endpoints can be called just one at a time for security reasons.
///

For example:

1. Activate the endpoint by setting the environment variable in the environment n8n runs under:

    ```sh
    export CREDENTIALS_OVERWRITE_ENDPOINT=send-credentials
    ```

2. A JSON file with the credentials to overwrite is then needed. For example, a `oauth-credentials.json` file to overwrite credentials for Asana and GitHub could look like this:

    ```json
    {
        "asanaOAuth2Api": {
            "clientId": "<id>",
            "clientSecret": "<secret>"
        },
        "githubOAuth2Api": {
            "clientId": "<id>",
            "clientSecret": "<secret>"
        }
    }
    ```

3. Then apply it to the instance by sending it using curl:

    ```sh
    curl -H "Content-Type: application/json" --data @oauth-credentials.json http://localhost:5678/send-credentials
    ```

/// note
There are cases when credentials are based on others. For example, the `googleSheetsOAuth2Api` extends the `googleOAuth2Api`.
In this case, you can set parameters on the parent credentials (`googleOAuth2Api`) for all child-credentials (`googleSheetsOAuth2Api`) to use.
///

## Environment variables

n8n has many [environment variables](/hosting/configuration/environment-variables/index.md) you can configure. Here are the most relevant environment variables for your hosted solution:

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `EXECUTIONS_TIMEOUT` | Number | `-1` | Sets a default timeout (in seconds) to all workflows after which n8n stops their execution. Users can override this for individual workflows up to the duration set in `EXECUTIONS_TIMEOUT_MAX`. Set `EXECUTIONS_TIMEOUT` to `-1` to disable. |
| `EXECUTIONS_DATA_PRUNE` | Boolean | `true` | Whether to delete data of past executions on a rolling basis. |
| `EXECUTIONS_DATA_MAX_AGE` | Number | `336` | The execution age (in hours) before it's deleted. |
| `EXECUTIONS_DATA_PRUNE_MAX_COUNT` | Number | `10000` | Maximum number of executions to keep in the database. 0 = no limit |
| `NODES_EXCLUDE` | Array of strings | - | Specify which nodes not to load. For example, to block nodes that can be a security risk if users aren't trustworthy: `NODES_EXCLUDE: "[\"n8n-nodes-base.executeCommand\", \"n8n-nodes-base.readWriteFile\"]"` |
| `NODES_INCLUDE` | Array of strings | - | Specify which nodes to load. |
| `N8N_TEMPLATES_ENABLED` | Boolean | `true` | Enable [workflow templates](/glossary.md#template-n8n) (true) or disable (false). |
| `N8N_TEMPLATES_HOST` | String | `https://api.n8n.io` | Change this if creating your own workflow template library. Note that to use your own workflow templates library, your API must provide the same endpoints and response structure as n8n's. Refer to [Workflow templates](/workflows/templates.md) for more information. |

## Backend hooks

It's possible to define external hooks that n8n executes whenever a specific operation runs. You can use these, for example, to log data, change data, or forbid an action by throwing an error.

### Available hooks

| Hook     | Arguments | Description |
| :------- | :---------| :---------- |
| `credentials.create` | `[credentialData: ICredentialsDb]` | Called before new credentials get created. Use to restrict the number of credentials. |
| `credentials.delete` | `[id: credentialId]` | Called before credentials get deleted. |
| `credentials.update` | `[credentialData: ICredentialsDb]` | Called before existing credentials are saved. |
| `frontend.settings` | `[frontendSettings: IN8nUISettings]` | Gets called on n8n startup. Allows you to, for example, overwrite frontend data like the displayed OAuth URL. |
| `n8n.ready` | `[app: App]` | Called once n8n is ready. Use to, for example, register custom API endpoints. |
| `n8n.stop` |  | Called when an n8n process gets stopped. Allows you to save some process data. |
| `oauth1.authenticate` | `[oAuthOptions: clientOAuth1.Options, oauthRequestData: {oauth_callback: string}]` | Called before an OAuth1 authentication. Use to overwrite an OAuth callback URL. |
| `oauth2.callback` | `[oAuth2Parameters: {clientId: string, clientSecret: string \| undefined, accessTokenUri: string, authorizationUri: string, redirectUri: string, scopes: string[]}]` | Called in an OAuth2 callback. Use to overwrite an OAuth callback URL. |
| `workflow.activate` | `[workflowData: IWorkflowDb]` | Called before a workflow gets activated. Use to restrict the number of active workflows. |
| `workflow.afterDelete` | `[workflowId: string]` | Called after a workflow gets deleted. |
| `workflow.afterUpdate` | `[workflowData: IWorkflowBase]` | Called after an existing workflow gets saved. |
| `workflow.create` | `[workflowData: IWorkflowBase]` | Called before a workflow gets created. Use to restrict the number of saved workflows. |
| `workflow.delete` | `[workflowId: string]` | Called before a workflow gets delete. |
| `workflow.postExecute` | `[run: IRun, workflowData: IWorkflowBase]` | Called after a workflow gets executed. |
| `workflow.preExecute` | `[workflow: Workflow: mode: WorkflowExecuteMode]` | Called before a workflow gets executed. Allows you to count or limit the number of workflow executions. |
| `workflow.update` | `[workflowData: IWorkflowBase]` | Called before an existing workflow gets saved. |

### Registering hooks

Set hooks by registering a hook file that contains the hook functions.
To register a hook, set the environment variable `EXTERNAL_HOOK_FILES`.

You can set the variable to a single file:

`EXTERNAL_HOOK_FILES=/data/hook.js`

Or to contain multiple files separated by a semicolon:

`EXTERNAL_HOOK_FILES=/data/hook1.js;/data/hook2.js`

### Backend hook files

Hook files are regular JavaScript files that have the following format:

```js
module.exports = {
    "frontend": {
        "settings": [
            async function (settings) {
                settings.oauthCallbackUrls.oauth1 = 'https://n8n.example.com/oauth1/callback';
                settings.oauthCallbackUrls.oauth2 = 'https://n8n.example.com/oauth2/callback';
            }
        ]
    },
    "workflow": {
        "activate": [
            async function (workflowData) {
                const activeWorkflows = await this.dbCollections.Workflow.count({ active: true });

                if (activeWorkflows > 1) {
                    throw new Error(
                        'Active workflow limit reached.'
                    );
                }
            }
        ]
    }
}
```

### Backend hook functions

A hook or a hook file can contain multiple hook functions, with all functions executed one after another.

If the parameters of the hook function are objects, it's possible to change the data of that parameter to change the behavior of n8n.

You can also access the database in any hook function using `this.dbCollections` (refer to the code sample in [Backend hook files](#backend-hook-files).

## Frontend external hooks

Like backend external hooks, it's possible to define external hooks in the frontend code that get executed by n8n whenever a user performs a specific operation. You can use them, for example, to log data and change data.

### Available hooks

| Hook     | Description |
| :------- | :---------- |
| `credentialsEdit.credentialTypeChanged` | Called when an existing credential's type changes. |
| `credentials.create` | Called when someone creates a new credential. |
| `credentialsList.dialogVisibleChanged` |  |
| `dataDisplay.nodeTypeChanged` |  |
| `dataDisplay.onDocumentationUrlClick` | Called when someone selects the help documentation link. |
| `execution.open` | Called when an existing execution opens. |
| `executionsList.openDialog` | Called when someone selects an execution from existing Workflow Executions. |
| `expressionEdit.itemSelected` |  |
| `expressionEdit.dialogVisibleChanged` |  |
| `nodeCreateList.filteredNodeTypesComputed` |  |
| `nodeCreateList.nodeFilterChanged` | Called when someone makes any changes to the node panel filter. |
| `nodeCreateList.selectedTypeChanged` |  |
| `nodeCreateList.mounted` |  |
| `nodeCreateList.destroyed` |  |
| `nodeSettings.credentialSelected` |  |
| `nodeSettings.valueChanged` |  |
| `nodeView.createNodeActiveChanged` |  |
| `nodeView.addNodeButton` |  |
| `nodeView.createNodeActiveChanged` |  |
| `nodeView.mount` |  |
| `pushConnection.executionFinished` |  |
| `showMessage.showError` |  |
| `runData.displayModeChanged` |  |
| `workflow.activeChange` |  |
| `workflow.activeChangeCurrent` |  |
| `workflow.afterUpdate` | Called when someone updates an existing workflow. |
| `workflow.open` |  |
| `workflowRun.runError` |  |
| `workflowRun.runWorkflow` | Called when a workflow executes. |
| `workflowSettings.dialogVisibleChanged` |  |
| `workflowSettings.saveSettings` | Called when someone saves the settings of a workflow. |

### Registering hooks

You can set hooks by loading the hooks script on the page. One way to do this is by creating a hooks file in the project and adding a script tag in your `editor-ui/public/index.html` file:

```html
<script src="frontend-hooks.js"></script>
```

### Frontend hook files

Frontend external hook files are regular JavaScript files which have the following format:

```js
window.n8nExternalHooks = {
  nodeView: {
    mount: [
      function (store, meta) {
        // do something
      },
    ],
    createNodeActiveChanged: [
      function (store, meta) {
        // do something
      },
      function (store, meta) {
        // do something else
      },
    ],
    addNodeButton: [
      function (store, meta) {
        // do something
      },
    ],
  },
};
```

### Frontend hook functions

You can define multiple hook functions per hook. Each hook function is invoked with the following arguments arguments:

* `store`: The Vuex store object. You can use this to change or get data from the store.
* `metadata`: The object that contains any data provided by the hook. To see what's passed, search for the hook in the `editor-ui` package.


# embed/deployment.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Deployment

--8<-- "_snippets/embed-license.md"

See the [hosting documentation](https://docs.n8n.io/reference/server-setup.html) for detailed setup options.

## User data

n8n recommends that you follow the same or similar practices used internally for n8n Cloud: Save user data using [Rook](https://rook.io/) and, if an n8n server goes down, a new instance starts on another machine using the same data.

Due to this, you don't need to use backups except in case of a catastrophic failure, or when a user wants to reactivate their account within your prescribed retention period (two weeks for n8n Cloud).

## Backups

n8n recommends creating nightly backups by attaching another container, and copying all data to this second container. In this manner, RAM usage is negligible, and so doesn't impact the amount of users you can place on the server.

## Restarting

If your instance is down or restarting, missed executions (for example, Cron or Webhook nodes) during this time aren't recoverable. If it's important for you to maintain 100% uptime, you need to build another proxy in front of it which caches the data.


# embed/index.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: n8n Embed Documentation and Guides
description: Learn how to white label and integrate n8n into your products with the Embed feature. Includes usage, costs, licensing, and support details.
contentType: overview
---

# n8n Embed

n8n Embed is part of n8n's paid offering. Using Embed, you can white label n8n, or incorporate it in your software as part of your commercial product.

For more information about when to use Embed, as well as costs and licensing processes, refer to [Embed](https://n8n.io/embed/){:target=_blank .external-link} on the n8n website.

## Support

The [community forum](https://community.n8n.io/) can help with various issues. If you are a current Embed customer, you can also contact n8n support, using the email provided when you bought the license.

## Russia and Belarus

n8n Embed isn't available in Russia and Belarus. Refer to n8n's blog post [Update on n8n cloud accounts in Russia and Belarus](https://blog.n8n.io/update-on-n8n-cloud-accounts-in-russia-and-belarus/){:target=_blank .external-link} for more information.


# embed/managing-workflows.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Workflow management in Embed

--8<-- "_snippets/embed-license.md"

When managing an embedded n8n deployment, spanning across teams or organizations, you will likely need to run the same (or similar) workflows for multiple users. There are two available options for doing so:

| Solution | Pros | Cons |
| -------- | ---- | ---- |
| Create a workflow for each user | No limitation on how workflow starts (can use any trigger) | Requires managing multiple workflows. |
| Create a single workflow, and pass it user credentials when executing | Simplified workflow management (only need to change one workflow). | To run the workflow, your product must call it |



/// warning
The APIs referenced in this document are subject to change at any time. Be sure the check for continued functionality with each version upgrade.
///

## Workflow per user

There are three general steps to follow:

* Obtain the credentials for each user, and any additional parameters that may be required based on the workflow.
* Create the [n8n credentials](/glossary.md#credential-n8n) for this user.
* Create the workflow.

### 1. Obtain user credentials

Here you need to capture all credentials for any node/service this user must authenticate with, along with any additional parameters required for the particular workflow. The credentials and any parameters needed will depend on your workflow and what you are trying to do.

### 2. Create user credentials

After all relevant credential details have been obtained, you can proceed to create the relevant service credentials in n8n. This can be done using the Editor UI or API call.


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

* Obtain the credentials for each user, and any additional parameters that may be required based on the workflow. See [Obtain user credentials](#1-obtain-user-credentials) above.
* Create the n8n credentials for this user. See [Create user credentials](#2-create-user-credentials) above.
* Create the workflow.
* Call the workflow as needed.

### Create the workflow

The details and scope of this workflow will vary greatly according to the individual use case, however there are a few design implementations to keep in mind:

* This workflow must be triggered by a [Webhook](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md) node.
* The incoming webhook call must contain the user’s credentials and any other workflow parameters required.
* Each node where the user’s credentials are needed should use an [expression](/code/expressions.md) so that the node’s credential field reads the credential provided in the webhook call.
* Save and activate the workflow, ensuring the production URL is selected for the Webhook node. Refer to [webhook node](/integrations/builtin/core-nodes/n8n-nodes-base.webhook/index.md) for more information.

### Call the workflow

For each new user, or for any existing user as may be needed, call the webhook defined as the workflow trigger and provide the necessary credentials (and any other workflow parameters).


# embed/prerequisites.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: explanation
---

# Prerequisites

--8<-- "_snippets/embed-license.md"

The requirements provided here are an example based on n8n Cloud and are for illustrative purposes only. Your requirements may vary depending on the number of users, workflows, and executions. Contact n8n for more information.

| Component | Sizing | Supported |
| :-------- | :----- | :-------- |
| CPU/vCPU  | Minimum 10 CPU cycles, scaling as needed | Any public or private cloud |
| Database  | 512 MB - 4 GB SSD | SQLite or PostgreSQL |
| Memory    | 320 MB - 2 GB | |

## CPU considerations

n8n isn't CPU intensive so even small instances (of providers such as AWS and GCP) should be enough for most use cases. Usually, memory requirements supersede CPU requirements, so focus resources there when planning your infrastructure.

## Database considerations

n8n uses its database to store [credentials](/glossary.md#credential-n8n), past executions, and workflows.

A core feature of n8n is the flexibility to choose a database. All the supported databases have different advantages and disadvantages, which you have to consider individually and pick the one that best suits your needs. By default n8n creates an SQLite database if no database exists at the given location.

n8n recommends that every n8n instance have a dedicated database. This helps to prevent dependencies and potential performance degradation. If it isn't possible to provide a dedicated database for every n8n instance, n8n recommends making use of Postgres's schema feature.

For Postgres, the database must already exist on the DB-instance. The database user for the n8n process needs to have full permissions on all tables that they're using or creating. n8n creates and maintains the database schema.

### Best practices

* SSD storage.
* In containerized cloud environments, ensure that the volume is persisted and mounted when stopping/starting a container. If not, all data is lost.
* If using Postgres, don't use the `tablePrefix` configuration option. It will be deprecated in the near future.
* Pay attention to the changelog of new versions and consider reverting migrations before downgrading.
* Set up at least the basic database security and stability mechanisms such as IP allow lists and backups.

## Memory considerations

An n8n instance doesn't typically require large amounts of available memory. For example an n8n Cloud instance at idle requires ~100MB. It's the nature of your workflows and the data being processed that determines your memory requirements.

For example, while most nodes just pass data to the next node in the workflow, the [Code node](/code/code-node.md) creates a pre-processing and post-processing copy of the data. When dealing will large binary files, this can consume all available resources.


# embed/white-labelling.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# White labelling

--8<-- "_snippets/embed-license.md"

White labelling n8n means customizing the frontend styling and assets to match your brand identity. The process involves changing two packages in n8n's source code [github.com/n8n-io/n8n](https://github.com/n8n-io/n8n){:target=_blank .external-link}:

* [packages/design-system](https://github.com/n8n-io/n8n/tree/master/packages/design-system){:target=_blank .external-link}: n8n's [storybook](https://storybook.js.org/){:target=_blank .external-link} design system with CSS styles and Vue.js components
* [packages/editor-ui](https://github.com/n8n-io/n8n/tree/master/packages/editor-ui){:target=_blank .external-link}: n8n's [Vue.js](https://vuejs.org/){:target=_blank .external-link} frontend build with [Vite.js](https://vitejs.dev){:target=_blank .external-link}

## Prerequisites

You need the following installed on your development machine:

--8<-- "_snippets/integrations/creating-nodes/prerequisites.md"

Create a fork of [n8n's repository](https://github.com/n8n-io/n8n){:target=_blank .external-link} and clone your new repository.

```shell
git clone https://github.com/<your-organization>/n8n.git n8n
cd n8n
```

Install all dependencies, build and start n8n.

```shell
npm install
npm run build
npm run start
```

Whenever you make changes you need to rebuild and restart n8n. While developing you can use `npm run dev` to automatically rebuild and restart n8n anytime you make code changes. 

## Theme colors

To customize theme colors open [packages/design-system](https://github.com/n8n-io/n8n/tree/master/packages/design-system){:target=_blank .external-link} and start with:

- [packages/design-system/src/css/_tokens.scss](https://github.com/n8n-io/n8n/blob/master/packages/design-system/src/css/_tokens.scss){:target=_blank .external-link}
- [packages/design-system/src/css/_tokens.dark.scss](https://github.com/n8n-io/n8n/blob/master/packages/design-system/src/css/_tokens.dark.scss){:target=_blank .external-link}

At the top of `_tokens.scss` you will find `--color-primary` variables as HSL colors:

```scss
@mixin theme {
	--color-primary-h: 6.9;
	--color-primary-s: 100%;
	--color-primary-l: 67.6%;
```

In the following example the primary color changes to <span style="color:#0099ff">#0099ff</span>. To convert to HSL you can use a [color converter tool](https://www.w3schools.com/colors/colors_converter.asp){:target=_blank .external-link}.

```scss
@mixin theme {
	--color-primary-h: 204;
	--color-primary-s: 100%;
	--color-primary-l: 50%;
```

![Example Theme Color Customization](/_images/embed/white-label/color-transition.gif)


## Theme logos

To change the editor’s logo assets look into [packages/editor-ui/public](https://github.com/n8n-io/n8n/tree/master/packages/editor-ui/public){:target=_blank .external-link} and replace:

- favicon-16x16.png
- favicon-32x32.png
- favicon.ico
- n8n-logo.svg
- n8n-logo-collapsed.svg
- n8n-logo-expanded.svg

Replace these logo assets. n8n uses them in Vue.js components, including:

* [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/MainSidebar.vue){:target=_blank .external-link}: top/left logo in the main sidebar.
* [Logo.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/Logo.vue): reused in other components.

In the following example replace `n8n-logo-collapsed.svg` and `n8n-logo-expanded.svg` to update the main sidebar's logo assets.

![Example Logo Main Sidebar](/_images/embed/white-label/logo-main-sidebar.png)

If your logo assets require different sizing or placement you can customize SCSS styles at the bottom of [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/MainSidebar.vue){:target=_blank .external-link}.

```scss
.logoItem {
	display: flex;
	justify-content: space-between;
	height: $header-height;
	line-height: $header-height;
	margin: 0 !important;
	border-radius: 0 !important;
	border-bottom: var(--border-width-base) var(--border-style-base) var(--color-background-xlight);
	cursor: default;

	&:hover, &:global(.is-active):hover {
		background-color: initial !important;
	}

	* { vertical-align: middle; }
	.icon {
		height: 18px;
		position: relative;
		left: 6px;
	}

}
```

## Text localization

To change all text occurrences like `n8n` or `n8n.io` to your brand identity you can customize n8n's English internationalization file: [packages/editor-ui/src/plugins/i18n/locales/en.json](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/plugins/i18n/locales/en.json){:target=_blank .external-link}.

n8n uses the [Vue I18n](https://kazupon.github.io/vue-i18n/){:target=_blank .external-link} internationalization plugin for Vue.js to translate the majority of UI texts. To search and replace text occurrences inside `en.json` you can use [Linked locale messages](https://kazupon.github.io/vue-i18n/guide/messages.html#linked-locale-messages){:target=_blank .external-link}.

In the following example add the `_brand.name` translation key to white label n8n's [AboutModal.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/AboutModal.vue){:target=_blank .external-link}.

```js
{
	"_brand.name": "My Brand",
	//replace n8n with link to _brand.name
	"about.aboutN8n": "About @:_brand.name",
	"about.n8nVersion": "@:_brand.name Version",
}
```

![Example About Modal Localization](/_images/embed/white-label/about-modal.png)

### Window title

To change n8n's window title to your brand name, edit the following:

- [packages/editor-ui/index.html](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/index.html){:target=_blank .external-link}
- [packages/editor-ui/src/components/mixins/titleChange.ts](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/mixins/titleChange.ts){:target=_blank .external-link}

The following example replaces all occurrences of `n8n` and `n8n.io` with `My Brand` in `index.html` and `titleChange.ts`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Replace html title attribute -->
	<title>My Brand - Workflow Automation</title>
</head>
```

```typescript
$titleSet(workflow: string, status: WorkflowTitleStatus) {
	// replace n8n prefix
	window.document.title = `My Brand - ${icon} ${workflow}`;
},

$titleReset() {
	// replace n8n prefix
	document.title = `My Brand - Workflow Automation`;
},
```

![Example Window Title Localization](/_images/embed/white-label/window-title.png)






# embed/workflow-templates.md

---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Workflow templates

--8<-- "_snippets/embed-license.md"

n8n provides a library of workflow [templates](/glossary.md#template-n8n). When embedding n8n, you can:

* Continue to use n8n's workflow templates library (this is the default behavior)
* Disable workflow templates
* Create your own workflow templates library

## Disable workflow templates

--8<-- "_snippets/workflows/templates/disable-templates.md"

## Use your own workflow templates library

--8<-- "_snippets/workflows/templates/custom-templates-library.md"

## Add your workflows to the n8n library

--8<-- "_snippets/workflows/templates/submit-templates.md"

