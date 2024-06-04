---
title: RabbitMQ credentials
description: Documentation for RabbitMQ credentials. Use these credentials to authenticate RabbitMQ in n8n, a workflow automation platform.
contentType: integration
---

# RabbitMQ credentials

You can use these credentials to authenticate the following nodes:

- [RabbitMQ](/integrations/builtin/app-nodes/n8n-nodes-base.rabbitmq/)
- [RabbitMQ Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.rabbitmqtrigger/)

## Prerequisites

Install a [RabbitMQ broker](https://www.rabbitmq.com/).

## Supported authentication methods

- User connection

## Related resources

Refer to [RabbitMQ's Connections documentation](https://www.rabbitmq.com/docs/connections){:target=_blank .external-link} for more information about the service.

## Using user connection
<!--vale off-->

To configure this credential, you'll need:

- A **Hostname**: The hostname for the RabbitMQ broker.
- A **Port**: The port the connection should use.
- A **User**: The user to log in as for the connection. The default is `guest`. RabbitMQ recommends using a different user in production environments. Refer to [Access Control | The Basics](https://www.rabbitmq.com/docs/access-control#basics) for more information. If you're using the `guest` account with a non-localhost connection, refer to [`guest` user issues](#guest-user-issues) below for troubleshooting tips.
- A **Password**: The password for the user. The default password for the `guest` user is `guest`.
- A **Vhost**: Enter the [virtual host](https://www.rabbitmq.com/docs/vhosts){:target=_blank .external-link} the connection should use. The default virtual host is `/`.
- **SSL**: Select whether the connection should use SSL. If turned on, also set:
    - **Passwordless**: Select whether the SSL certificate connection is passwordless or uses SASL mechanism EXTERNAL. If turned on, you'll also need to enter:
        - The **Client Certificate**: Paste the text of the SSL client certificate to use.
        - The **Client Key**: Paste the SSL client key to use.
        - The **Passphrase**: Paste the SSL passphrase to use.
    - **CA Certificates**: Paste the text of the SSL CA certificates to use.
<!--vale on-->

## `guest` user issues

If you use the `guest` user for the credential and you try to access a remote host, you may see a connection error. The RabbitMQ logs show an error like this:

    [error] <0.918.0> PLAIN login refused: user 'guest' can only connect via localhost

This happens because RabbitMQ prohibits the default `guest` user from connecting from remote hosts. It can only connect over the `localhost`.

To resolve this error, you can:

- Update the `guest` user to allow it remote host access.
- Create or use a different user to connect to the remote host. The `guest` user is the only user limited by default.

Refer to ["guest" user can only connect from localhost](https://www.rabbitmq.com/docs/access-control#loopback-users){:target=_blank .external-link} for more information.

