---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: SSH credentials
description: Documentation for SSH credentials. Use these credentials to authenticate SSH in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# SSH credentials

You can use these credentials to authenticate the following nodes:

- [SSH](/integrations/builtin/core-nodes/n8n-nodes-base.ssh/)

## Prerequisites

- Create a remote server with SSH enabled.
- Create one of the following:
    - A user account that can `ssh` into the server: Use with [password authentication](#using-password).
    - An SSH key for the server or service: Use with [private key authentication](#using-private-key).

## Supported authentication methods

- Password
- Private key

## Related resources

Secure Shell (SSH) protocol is a method for securely sending commands over a network. Refer to [Connecting to GitHub with SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh) for an example of SSH setup.


## Using password

To configure this credential, you'll need:

- A **Host**: Enter the IP address of the server you are connecting to.
- A **Port**: Enter the port to use for this connection. SSH uses port 22 by default.
- A **Username**: Enter the username for the user account with `ssh` access on the server.
- A **Password**: Enter the password for that user account.

## Using private key

To configure this credential, you'll need:

- A **Host**: Enter the IP address of the server you are connecting to.
- A **Port**: Enter the port to use for this connection. SSH uses port 22 by default.
- A **Username**: Enter the username of the account that generated the private key.
- An SSH **Private Key**: Enter the entire contents of your SSH private key.
- _Optional:_ If you created a **Passphrase** for the key, enter the passphrase. If you didn't create a passphrase for the key, leave blank.

