---
title: FTP credentials
description: >-
  Documentation for FTP credentials. Use these credentials to authenticate FTP
  in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: FTP credentials
originalFilePath: integrations/builtin/credentials/ftp.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/ftp'
url: 'https://docs.n8n.io/integrations/builtin/credentials/ftp'
layout:
  description:
    visible: false
---

# FTP credentials <a href="#ftp-credentials" id="ftp-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [FTP](../core-nodes/n8n-nodes-base.ftp.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an account on a File Transfer Protocol (FTP) server like [JSCAPE](https://mft.jscape.com/lp/ftp-server), [OpenSSH](https://www.openssh.com/), or [FileZilla Server](https://filezilla-project.org/).

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- **FTP account**: Use this method if your FTP server doesn't support SSH tunneling or encrypted connections.
- **SFTP account**: Use this method if your FTP server supports SSH tunneling and encrypted connections.

## Related resources <a href="#related-resources" id="related-resources"></a>

File Transfer Protocol (FTP) and Secure Shell File Transfer Protocol (SFTP) are protocols for transferring files directly between an FTP/SFTP client and server.

## Using FTP account <a href="#using-ftp-account" id="using-ftp-account"></a>

Use this method if your FTP server doesn't support SSH tunneling or encrypted connections.

To configure this credential, you'll need to:

1. Enter the name or IP address of your FTP server's **Host**.
2. Enter the **Port** number the connection should use.
3. Enter the **Username** the credential should connect as.
4. Enter the user's **Password**.

Review your FTP server provider's documentation for instructions on getting the information you need.

## Using SFTP account <a href="#using-sftp-account" id="using-sftp-account"></a>

Use this method if your FTP server supports SSH tunneling and encrypted connections.

To configure this credential, you'll need to:

1. Enter the name or IP address of your FTP server's **Host**.
2. Enter the **Port** number the connection should use.
3. Enter the **Username** the credential should connect as.
4. Enter the user's **Password**.
5. For the **Private Key**, enter a string for either key-based or host-based user authentication
    - Enter your Private Key in OpenSSH format. This is most often generated using the ssh-keygen `-o` parameter, for example: `ssh-keygen -o -a 100 -t ed25519`.
6. If the **Private Key** is encrypted, enter the **Passphrase** used to decrypt it.
    - If the **Private Key** doesn't use a passphrase, leave this field blank.

Review your FTP server provider's documentation for instructions on getting the information you need.
