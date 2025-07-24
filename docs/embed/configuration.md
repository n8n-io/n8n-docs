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
