# Built-in integrations

This section contains the node library: reference documentation for every built-in node in n8n, and their credentials.

--8<-- "_snippets/integrations/builtin/node-types.md"

## Credentials

External services need a way to identify and authenticate users. This data can range from an API key over an email/password combination to a long multi-line private key. You can save these in n8n as credentials.

Nodes in n8n can then request that credential information. As another layer of security, only node types with specific access rights can access the credentials.

To make sure that the data is secure, it gets saved to the database encrypted. n8n uses a random personal encryption key, which it automatically generates on the first run of n8n and then saved under `~/.n8n/config`.

To learn more about creating, managing, and sharing credentials, refer to [Manage credentials](/credentials/).

## Community nodes

n8n supports custom nodes built by the community. Refer to [Community nodes](/integrations/community-nodes/) for guidance on installing and using these nodes.

For help building your own custom nodes, and publish them to [npm](https://www.npmjs.com/){:target=_blank .external-link}, refer to [Creating nodes](/integrations/creating-nodes/) for more information.
