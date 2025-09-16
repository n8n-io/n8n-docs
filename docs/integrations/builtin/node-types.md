---
contentType: overview
---

# Node types

This section contains the [node](/glossary.md#node-n8n) library: reference documentation for every built-in node in n8n.

--8<-- "_snippets/integrations/builtin/node-operations.md"

## Core nodes

Core nodes can be actions or [triggers](/glossary.md#trigger-node-n8n). Whereas most nodes connect to a specific external service, core nodes provide functionality such as logic, scheduling, or generic API calls.

## App nodes

App nodes integrate with specific external services and applications. The specific features differ from service to service, but some common examples include managing resources with [CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete), checking and updating statuses, sending and receiving messages, and converting data and documents.

App nodes may be triggers or actions depending on whether they start workflows or not, and many App nodes implement both functions.

## Cluster nodes

--8<-- "_snippets/integrations/builtin/cluster-nodes/cluster-nodes-summary.md"

## Community nodes

n8n supports custom nodes built by the community. Refer to [Community nodes](/integrations/community-nodes/installation/index.md) for guidance on installing and using these nodes.

For help building your own custom nodes, and publish them to [npm](https://www.npmjs.com/), refer to [Creating nodes](/integrations/creating-nodes/index.md) for more information.

## Credentials

External services need a way to identify and authenticate users. This data can range from an API key over an email/password combination to a long multi-line private key. You can save these in n8n as [credentials](/glossary.md#credential-n8n).

While not nodes themselves, credentials are often required to correctly use nodes. Once saved, nodes in n8n can request that credential information. As another layer of security, only node types with specific access rights can access the credentials.

To make sure that the data is secure, it gets saved to the database encrypted. n8n uses a random personal encryption key, which it automatically generates on the first run of n8n and then saved under `~/.n8n/config`.

To learn more about creating, managing, and sharing credentials, refer to [Manage credentials](/credentials/index.md).
