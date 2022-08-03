# Node codex files

The codex file contains metadata about your node. This file is the JSON file at the root of your node. For example, the [`HttpBin.node.json`](https://github.com/n8n-io/n8n-nodes-starter/blob/master/nodes/HttpBin/HttpBin.node.json){:target=_blank .external-class} file in the n8n starter. 

The codex filename must match the node base filename. For example, given a node base file named `MyNode.node.ts`, the codex would be named `MyNode.node.json`.

| Parameter | Description |
| -------- | ----------- |
| `node`    | Includes the node name. Must start with `n8n-nodes-base.`. For example, `n8n-nodes-base.openweatherapi`. | 
| `nodeVersion` | The node version. This should have the same value as the `version` parameter in your main node file. For example, `"1.0"`. |
| `codexVersion` | The codex file version. For example, `"1.0"`. |
| `categories` | The settings in the `categories` array determine which category n8n adds your node to in the GUI. See [Node categories](#node-categories) for more information. |
| `resources` | The `resources` object contains links to your node documentation. n8n automatically adds help links to credentials and nodes in the GUI. |

## Node categories

You can define one or more categories in your node configuration JSON. This helps n8n put the node in the correct category in the nodes panel.

Choose from these categories:

* Data & Storage
* Finance & Accounting
* Marketing & Content
* Productivity
* Miscellaneous
* Sales
* Development
* Analytics
* Communication
* Utility

You must match the syntax. For example, `Data & Storage` not `data and storage`.
