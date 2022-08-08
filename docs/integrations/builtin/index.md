# Overview

This section contains the node library: reference documentation for every built-in node in n8n, and their credentials.

## Node types

There are three node types in n8n: app nodes, trigger nodes, and core nodes.

### App nodes

These nodes provide integrations with external services.

### Trigger nodes

The trigger nodes start a workflow and supply the initial data. A workflow can contain multiple trigger nodes but with each execution, only one of them will execute. This is because the other trigger nodes would not have any input as they're the nodes from which the execution of the workflow starts.

### Core nodes

Core nodes provide key functionality, such as describing workflow logic, or manipulating data. Some core nodes are trigger nodes (such as the Webhook Trigger Node).

## Credentials

External services need a way to identify and authenticate users. This data can range from an API key over an email/password combination to a long multi-line private key. You can save these in n8n as credentials.

Nodes in n8n can then request that credential information. As another layer of security, only node types with specific access rights can access the credentials.

To make sure that the data is secure, it gets saved to the database encrypted. n8n uses a random personal encryption key, which it automatically generates on the first run of n8n and then saved under `~/.n8n/config`.