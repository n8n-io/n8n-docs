# Configuration

## Authentication

You can secure n8n using Basic Authentication by setting the following environment variables:

```sh
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=<USER>
export N8N_BASIC_AUTH_PASSWORD=<PASSWORD>
``` 

### Credential overwrites

To offer OAuth login to users, it's possible to overwrite credentials on a global basis. This credential data isn't visible to users but the backend uses it automatically.

In the Editor UI, n8n hides all overwritten fields by default. This means that users are able to authenticate using  OAuth by pressing the "connect" button on the credentials.

n8n offers two ways to apply credential overwrites: using Environment Variable and using the REST API.

#### Using environment variables

Credential overwrites can be set using environment variable by setting the `CREDENTIALS_OVERWRITE_DATA` to `{ CREDENTIAL_NAME: { PARAMETER: VALUE }}`.

!!! warning
    Even though this is possible, it isn't recommended. Environment variables aren't protected in n8n, so the data can leak to users.


#### Using REST APIs

The recommended way is to load the data using a custom REST endpoint. Set the `CREDENTIALS_OVERWRITE_ENDPOINT` to a path under which this endpoint should be made available.

!!! note
    The endpoints can be called just one at a time for security reasons.


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

!!! note
    There are cases when credentials are based on others. For example, the `googleSheetsOAuth2Api` extends the `googleOAuth2Api`. 
    In this case, you can set parameters on the parent credentials (`googleOAuth2Api`) which will be used by all child-credentials (`googleSheetsOAuth2Api`).


## Environment variables

There are many [environment variables configurable in n8n](https://docs.n8n.io/reference/environment-variables.html). The following are most relevant for your hosted solution:

| Variable | Values | Description |
| :------- | :----- | :---------- |
| `EXECUTIONS_TIMEOUT` | `number` | The maximum amount of time (in seconds) a workflow is allowed to run. |
| `EXECUTIONS_PROCESS` | `'main', 'own'` | If workflow executions should run in the main process or in their own process. The `main` setting requires fewer resources. |
| `EXECUTIONS_DATA_PRUNE` | `boolean` | If data of past executions should be deleted automatically. |
| `EXECUTIONS_DATA_MAX_AGE` | `number` | Number of hours after which old executions are deleted. |
| `NODES_EXCLUDE` | `Array<string>` | Specific nodes that should not be made available. |
| `NODES_INCLUDE` | `Array<string>` | Specific nodes that should be included. |
| `N8N_TEMPLATES_ENABLED` | `boolean` | Whether workflow templates should be enabled (true) or disabled (false) |
| `N8N_TEMPLATES_HOST` | `string` | Defaults to https://api.n8n.io. Change this if creating your own workflow template library. Note that to use your own workflow templates library, your API must provide the same endpoints and response structure as n8n's. Refer to [Workflow templates](workflow-templates.md) for more information. |

## Backend hooks

It's possible to define external hooks that n8n executes whenever a specific operation runs. You can use these to, for example, to log data, change data, or forbid an action by throwing an error.

### Available hooks

| Hook     | Arguments | Description |
| :------- | :---------| :---------- |
| `credentials.create` | `[credentialData: ICredentialsDb]` | Called before new credentials get created. Can be used to restrict the number of credentials. |
| `credentials.delete` | `[id: credentialId]` | Called before credentials get deleted. |
| `credentials.update` | `[credentialData: ICredentialsDb]` | Called before existing credentials are saved. |
| `frontend.settings` | `[frontendSettings: IN8nUISettings]` | Gets called on n8n startup. Allows you to, for example, overwrite frontend data like the displayed OAuth URL. |
| `n8n.ready` | `[app: App]` | Called once n8n is ready. Can be used to, for example, register custom API endpoints. |
| `n8n.step` |  | Called when an n8n process gets stopped. Allows you to save some process data. |
| `oauth1.authenticate` | `[oAuthOptions: clientOAuth1.Options, oauthRequestData: {oauth_callback: string}]` | Called before an OAuth1 authentication. Can be used to overwrite an OAuth callback URL. |
| `oauth2.callback` | `[oAuth2Parameters: {clientId: string, clientSecret: string \| undefined, accessTokenUri: string, authorizationUri: string, redirectUri: string, scopes: string[]}]` | Called in an OAuth2 callback. Can be used to overwrite an OAuth callback URL. |
| `workflow.activate` | `[workflowData: IWorkflowDb]` | Called before a workflow gets activated. Can be used to restrict the number of active workflows. |
| `workflow.afterDelete` | `[workflowId: string]` | Called after a workflow gets deleted. |
| `workflow.afterUpdate` | `[workflowData: IWorkflowBase]` | Called after an existing workflow gets saved. |
| `workflow.create` | `[workflowData: IWorkflowBase]` | Called before a workflow gets created. Can be used to restrict the number of saved workflows. |
| `workflow.delete` | `[workflowId: string]` | Called before a workflow gets delete. |
| `workflow.postExecute` | `[run: IRun, workflowData: IWorkflowBase]` | Called after a workflow gets executed. |
| `workflow.preExecute` | `[workflow: Workflow: mode: WorkflowExecuteMode]` | Called before a workflow gets executed. Allows you to count or limit the number of workflow executions. |
| `workflow.update` | `[workflowData: IWorkflowBase]` | Called before an existing workflow gets saved. |

### Registering hooks

Hooks are set by registering a hook file that contains the hook functions. 
Hook registration is done using the environment variable `EXTERNAL_HOOK_FILES`. 

The variable can be set to a single file: 

`EXTERNAL_HOOK_FILES=/data/hook.js` 

Or to contain multiple files separated by a semicolon: 

`EXTERNAL_HOOK_FILES=/data/hook1.js;/data/hook2.js`

### Hook files

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

### Hook functions

A hook or a hook file can contain multiple hook functions, with all functions executed one after another.
If the parameters of the hook function are objects, it's possible to change the data of that parameter to change the behavior of n8n.
Additionally, the database can also be accessed in any hook function using `this.dbCollections` (see above).

## Frontend external hooks

Like backend external hooks, it's possible to define external hooks in the frontend code that get executed by n8n whenever a specific operation is performed. They can be used, for example, to log data and change data.

### Available hooks

| Hook     | Description |
| :------- | :---------- |
| `credentialsEdit.credentialTypeChanged` | Called when an existing credential's type is changed. |
| `credentials.create` | Called when a new credential is created. |
| `credentialsList.dialogVisibleChanged` |  |
| `dataDisplay.nodeTypeChanged` |  |
| `dataDisplay.onDocumentationUrlClick` | Called when the help documentation link is selected. |
| `execution.open` | Called when an existing execution is opened. |
| `executionsList.openDialog` | Called when the an execution is selected from existing Workflow Executions. |
| `expressionEdit.itemSelected` |  |
| `expressionEdit.dialogVisibleChanged` |  |
| `nodeCreateList.filteredNodeTypesComputed` |  |
| `nodeCreateList.nodeFilterChanged` | Called when a new entry has been made in the node panel filter. |
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
| `workflow.afterUpdate` | Called when an existing workflow is updated. |
| `workflow.open` |  |
| `workflowRun.runError` |  |
| `workflowRun.runWorkflow` | Called when a workflow is executed. |
| `workflowSettings.dialogVisibleChanged` |  |
| `workflowSettings.saveSettings` | Called when the settings of a workflow are saved. |

### Registering hooks

Hooks can be set by loading the hooks script on the page. One way to do this is by creating a hooks file in the project and adding a script tag in your `editor-ui/public/index.html` file:

```html
<script src="frontend-hooks.js"></script>
```

### Hook files

Hook files are regular JavaScript files which have the following format:

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

### Hook functions

Multiple hook functions can be defined per hook. Each hook function is invoked with the following arguments arguments:

* `store`: The Vuex store object. Can be used to change or get data from the store.
* `metadata`: Object that contains any data provided by the hook. To see exactly what's passed, search for the hook in the `editor-ui` package.
