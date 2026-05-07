---
title: External hooks
description: Use external hooks to execute custom code whenever n8n runs a specific operation.
contentType: howto
---

# External hooks

External hooks let you run custom code whenever n8n performs a specific operation. Use them to log data, change data, or forbid an action by throwing an error.

There are two types:

- **Backend hooks**: run server-side, registered using the `EXTERNAL_HOOK_FILES` environment variable.
- **Frontend hooks**: run in the browser, loaded with a script tag.

For the environment variables used to register hooks, refer to [External hooks environment variables](/hosting/configuration/environment-variables/external-hooks.md).

## Backend hooks

### Available hooks

| Hook     | Arguments | Description |
| :------- | :---------| :---------- |
| `credentials.create` | `[credentialData: ICredentialsDb]` | Called before new credentials get created. Use to restrict the number of credentials. |
| `credentials.delete` | `[id: credentialId]` | Called before credentials get deleted. |
| `credentials.update` | `[credentialData: ICredentialsDb]` | Called before n8n saves existing credentials. |
| `frontend.settings` | `[frontendSettings: IN8nUISettings]` | Gets called on n8n startup. Allows you to, for example, overwrite frontend data like the displayed OAuth URL. |
| `n8n.ready` | `[app: App]` | Called once n8n is ready. Use to, for example, register custom API endpoints. |
| `n8n.stop` |  | Called when an n8n process gets stopped. Allows you to save some process data. |
| `oauth1.authenticate` | `[oAuthOptions: clientOAuth1.Options, oauthRequestData: {oauth_callback: string}]` | Called before an OAuth1 authentication. Use to overwrite an OAuth callback URL. |
| `oauth2.callback` | `[oAuth2Parameters: {clientId: string, clientSecret: string \| undefined, accessTokenUri: string, authorizationUri: string, redirectUri: string, scopes: string[]}]` | Called in an OAuth2 callback. Use to overwrite an OAuth callback URL. |
| `workflow.activate` | `[workflowData: IWorkflowDb]` | Called before a workflow gets activated. Use to restrict the number of active workflows. |
| `workflow.afterCreate` | `[workflowId: string]` | Called after a workflow gets created. |
| `workflow.afterDelete` | `[workflowId: string]` | Called after a workflow gets deleted. |
| `workflow.afterUpdate` | `[workflowData: IWorkflowBase]` | Called after an existing workflow gets saved. |
| `workflow.create` | `[workflowData: IWorkflowBase]` | Called before a workflow gets created. Use to restrict the number of saved workflows. |
| `workflow.delete` | `[workflowId: string]` | Called before a workflow gets deleted. |
| `workflow.postExecute` | `[run: IRun, workflowData: IWorkflowBase]` | Called after a workflow gets executed. |
| `workflow.preExecute` | `[workflow: Workflow: mode: WorkflowExecuteMode]` | Called before a workflow gets executed. Allows you to count or limit the number of workflow executions. |
| `workflow.update` | `[workflowData: IWorkflowBase]` | Called before an existing workflow gets saved. |
| `workflow.afterArchive` | `[workflowId: string]` | Called after you archive a workflow. |
| `workflow.afterUnarchive` | `[workflowId: string]` | Called after you restore a workflow from the archive. |

### Registering hooks

Set hooks by registering a hook file that contains the hook functions. To register a hook, set the environment variable `EXTERNAL_HOOK_FILES`.

You can set the variable to a single file:

`EXTERNAL_HOOK_FILES=/data/hook.js`

Or to contain multiple files separated by a colon:

`EXTERNAL_HOOK_FILES=/data/hook1.js:/data/hook2.js`

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

You can also access the database in any hook function using `this.dbCollections` (refer to the code sample in [Hook files](#hook-files) above).

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

### Registering frontend hooks

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

You can define multiple hook functions per hook. n8n calls each hook function with the following arguments:

* `store`: The Vuex store object. You can use this to change or get data from the store.
* `metadata`: The object that contains any data provided by the hook. To see what's passed, search for the hook in the `editor-ui` package.
