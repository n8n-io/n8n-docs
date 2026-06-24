---
contentType: overview
nodeTitle: Node types
originalFilePath: integrations/builtin/node-types.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/node-types'
url: 'https://docs.n8n.io/integrations/builtin/node-types'
layout:
  description:
    visible: false
---

# Built-in integrations <a href="#built-in-integrations" id="built-in-integrations"></a>

This section contains the node[^1] library: reference documentation for every built-in node in n8n, and their credentials.

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/nqwVeyXZtOyDsX8afllD/" %}

## Core nodes <a href="#core-nodes" id="core-nodes"></a>

Core nodes can be actions or triggers[^2]. Whereas most nodes connect to a specific external service, core nodes provide functionality such as logic, scheduling, or generic API calls.

## Cluster nodes <a href="#cluster-nodes" id="cluster-nodes"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/nQYOCBZiuZBtHlBAOFq9/" %}

## Credentials <a href="#credentials" id="credentials"></a>

External services need a way to identify and authenticate users. This data can range from an API key over an email/password combination to a long multi-line private key. You can save these in n8n as credentials[^3].

Nodes in n8n can then request that credential information. As another layer of security, only node types with specific access rights can access the credentials.

To make sure that the data is secure, it gets saved to the database encrypted. n8n uses a random personal encryption key, which it automatically generates on the first run of n8n and then saved under `~/.n8n/config`.

To learn more about creating, managing, and sharing credentials, refer to [Manage credentials](/credentials/index.md).

## Community nodes <a href="#community-nodes" id="community-nodes"></a>

n8n supports custom nodes built by the community. Refer to [Community nodes](../community-nodes/installation-and-management/README.md) for guidance on installing and using these nodes.

For help building your own custom nodes, and publish them to [npm](https://www.npmjs.com/), refer to [Creating nodes](https://app.gitbook.com/s/r7wKI4I1BgdBCuq5Cvcx/create-nodes/overview) for more information.

[^1]: In n8n, nodes are individual components that you compose to create workflows. Nodes define when the workflow should run, allow you to fetch, send, and process data, can define flow control logic, and connect with external services.
[^2]: A trigger node is a special node responsible for executing the workflow in response to certain conditions. All production workflows need at least one trigger to determine when the workflow should run.
[^3]: In n8n, credentials store authentication information to connect with specific apps and services. After creating credentials with your authentication information (username and password, API key, OAuth secrets, etc.), you can use the associated app node to interact with the service.
