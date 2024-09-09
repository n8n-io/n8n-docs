---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# Manually install community nodes

You can manually install community nodes on self-hosted n8n.

You need to manually install community nodes in the following circumstances:

* Your n8n instance runs in queue mode.
* You want to install [private packages](https://docs.npmjs.com/creating-and-publishing-private-packages){:target=_blank .external-link}.

## Install a community node

Access your Docker shell:

```sh
docker exec -it n8n sh
```

Create `~/.n8n/nodes` if it doesn't already exist, and navigate into it:

```sh
mkdir ~/.n8n/nodes
cd ~/.n8n/nodes
```

Install the node:

```sh
npm i n8n-nodes-nodeName
```
Then restart n8n.

## Uninstall a community node

Access your Docker shell:

```sh
docker exec -it n8n sh
```

Run npm uninstall:

```sh
npm uninstall n8n-nodes-nodeName
```

## Upgrade a community node

/// warning | Breaking changes in versions
Node developers may introduce breaking changes in new versions of their nodes. A breaking change is an update that breaks previous functionality. Depending on the node versioning approach that a node developer chooses, upgrading to a version with a breaking change could cause all workflows using the node to break. Be careful when upgrading your nodes. If you find that an upgrade causes issues, you can [downgrade](#downgrade-a-community-node).
///
### Upgrade to the latest version

Access your Docker shell:

```sh
docker exec -it n8n sh
```

Run npm update:

```sh
npm update n8n-nodes-nodeName
```

### Upgrade or downgrade to a specific version

Access your Docker shell:

```sh
docker exec -it n8n sh
```

Run npm uninstall to remove the current version:

```sh
npm uninstall n8n-nodes-nodeName
```

Run npm install with the version specified:

```sh
# Replace 2.1.0 with your version number
npm install n8n-nodes-nodeName@2.1.0
```
