---
title: Postgres credentials
contentType:
  - integration
  - reference
priority: high
nodeTitle: Postgres credentials
originalFilePath: integrations/builtin/credentials/postgres.md
originalUrl: https://docs.n8n.io/integrations/builtin/credentials/postgres
url: https://docs.n8n.io/integrations/builtin/credentials/postgres
description: >-
  Documentation for Postgres credentials. Use these credentials to authenticate
  Postgres in n8n, a workflow automation platform.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Postgres credentials

You can use these credentials to authenticate the following nodes:

* [Postgres](../app-nodes/n8n-nodes-base.postgres/README.md)
* [Agent](../cluster-nodes/root-nodes/n8n-nodes-langchain.agent/README.md)
* [Postgres Chat Memory](../cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat.md)
* [PGVector Vector Store](../cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstorepgvector.md)

{% hint style="info" %}
**Agent node users**

The Agent node doesn't support SSH tunnels or the **CA Certificate**, **Client Private Key**, and **Client Certificate** fields.
{% endhint %}

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

[Create a user account](https://www.postgresql.org/docs/current/sql-createuser.html) on a Postgres server.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

* Database connection

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to [Postgres's documentation](https://www.postgresql.org/docs/current/index.html) for more information about the service.

## Using database connection <a href="#using-database-connection" id="using-database-connection"></a>

To configure this credential, you'll need:

* The **Host** or domain name for the server.
* The **Database** name.
* A **User** name.
* A user **Password**.
* **Maximum Number of Connections**: The maximum size of each connection pool.
* **Ignore SSL Issues (Insecure)**: Set whether the credential connects if SSL validation fails.
* **SSL**: Choose whether to use SSL in your connection.
* Optional SSL certificates (available from n8n 2.47.0): **CA Certificate**, **Client Private Key**, and **Client Certificate**.
* The **Port** number to use for the connection.
* **SSH Tunnel**: Choose if you want to use SSH to encrypt the network connection with the Postgres server.

To set up the database connection:

1.  Enter the **Host** or domain name for the Postgres server. You can either run the `/conninfo` command to confirm the host name or run this query:

    ```
    SELECT inet_server_addr();
    ```
2. Enter the **Database** name. Run the `/conninfo` command to confirm the database name.
3. Enter the **User** name of the user you wish to connect as.
4. Enter the user's **Password**.
5. **Maximum Number of Connections**: Enter the maximum number of connections for each connection pool that n8n opens with this credential. The default is `100`. In queue mode, the main instance and each worker keep their own pools. One n8n process can also open more than one pool for the same credential, for example for Postgres nodes on different node versions or for the **Postgres Chat Memory** node. Keep the total number of connections across all pools below the maximum your Postgres server allows.
6. **Ignore SSL Issues (Insecure)**: If you turn this on, the credential connects over SSL without validating the server certificate, and n8n hides the **SSL** setting.
7. **SSL**: Choose whether to use SSL in your connection. The options are:
   * **Allow**: Connect over SSL and verify the server certificate, the same as **Require**. n8n doesn't fall back to a connection without SSL.
   * **Disable**: Connect without SSL.
   * **Require**: Connect over SSL only, and verify that a trusted certificate authority (CA) issued the server certificate. To trust a private CA, add its root certificate in **CA Certificate**. Without it, n8n trusts the public certificate authorities built into Node.js, plus any certificate authorities you [added to your self-hosted instance](https://app.gitbook.com/s/jm0ZYRpZIPWge2ZSiDYO/host-n8n/configure-n8n/basic-configuration/configuration-examples/configure-custom-ssl-certificate-authorities).
8. If you set **SSL** to **Allow** or **Require**, you can add these certificates in PEM format (available from n8n 2.47.0):
   * **CA Certificate**: The root certificate of the CA that issued the server certificate. Add it when your Postgres server uses a certificate from a private CA, such as a managed database service that issues its own certificates. If the server certificate comes from a public CA, leave this field empty. Paste a single certificate, from `-----BEGIN CERTIFICATE-----` to `-----END CERTIFICATE-----`. This field doesn't accept a bundle with several certificates. If your provider gives you a bundle, paste only the certificate of the CA that issued your server certificate.
   * **Client Private Key** and **Client Certificate**: The private key and certificate n8n presents to the server. Add both when the server requires client certificate authentication. The private key can't have a passphrase.
9.  Enter the **Port** number to use for the connection. You can either run the `/conninfo` command to confirm the host name or run this query:

    ```
    SELECT inet_server_port();
    ```
10. **SSH Tunnel**: Turn this setting on to connect to the database over SSH. n8n then connects to the **Host** and **Port** from the SSH server, so enter them as the SSH server sees them, such as `localhost` when Postgres runs on the SSH server. Refer to [SSH tunnel limitations](postgres.md#ssh-tunnel-limitations) before you use SSH. After you turn it on:
    1. Select **SSH Authenticate with** to set the SSH Tunnel type to build:
       * Select **Password** if you want to connect to SSH using a password.
       * Select **Private Key** if you want to connect to SSH using an identity file (private key) and a passphrase.
    2. Enter the address of the SSH server as the **SSH Host**.
    3. **SSH Port**: Enter the port of the SSH server. The default is `22`.
    4. **SSH User**: Enter the username to log in as.
    5. If you selected **Password** for **SSH Authenticate with**, add the user's **SSH Password**.
    6. If you selected **Private Key** for **SSH Authenticate with**:
       1. Add the contents of the **Private Key** or identity file used for SSH.
       2. If you created the private key with a passphrase, enter it in **Passphrase**. If the private key has no passphrase, leave **Passphrase** blank.

Refer to [Secure TCP/IP Connections with SSH Tunnels](https://www.postgresql.org/docs/current/ssh-tunnels.html) for more information.

### SSH tunnel limitations <a href="#ssh-tunnel-limitations" id="ssh-tunnel-limitations"></a>

Only use the **SSH Tunnel** setting if:

* You're using the credential with the [Postgres](../app-nodes/n8n-nodes-base.postgres/README.md) node (Agent node doesn't support SSH tunnels).
* You have an SSH server running on the same machine as the Postgres server.
* You have a user account that can log in using `ssh`.
