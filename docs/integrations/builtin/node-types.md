---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: overview
---

# Built-in integrations

This section contains the node library: reference documentation for every built-in node in n8n, and their credentials.

--8<-- "_snippets/integrations/builtin/node-operations.md"

## Core nodes

Core nodes can be actions or triggers. Whereas most nodes connect to a specific external service, core nodes provide functionality such as logic, scheduling, or generic API calls.

## Cluster nodes

--8<-- "_snippets/integrations/builtin/cluster-nodes/cluster-nodes-summary.md"

## Credentials

External services need a way to identify and authenticate users. This data can range from an API key over an email/password combination to a long multi-line private key. You can save these in n8n as credentials.

Nodes in n8n can then request that credential information. As another layer of security, only node types with specific access rights can access the credentials.

To make sure that the data is secure, it gets saved to the database encrypted. n8n uses a random personal encryption key, which it automatically generates on the first run of n8n and then saved under `~/.n8n/config`.

To learn more about creating, managing, and sharing credentials, refer to [Manage credentials](/credentials/).

## Community nodes

n8n supports custom nodes built by the community. Refer to [Community nodes](/integrations/community-nodes/installation/) for guidance on installing and using these nodes.

For help building your own custom nodes, and publish them to [npm](https://www.npmjs.com/){:target=_blank .external-link}, refer to [Creating nodes](/integrations/creating-nodes/overview/) for more information.
