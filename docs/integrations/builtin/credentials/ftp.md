---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: FTP credentials
description: Documentation for FTP credentials. Use these credentials to authenticate FTP in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# FTP credentials

You can use these credentials to authenticate the following nodes:

- [FTP](/integrations/builtin/core-nodes/n8n-nodes-base.ftp/)

## Prerequisites

Create an account on a File Transfer Protocol (FTP) server like [JSCAPE](https://mft.jscape.com/lp/ftp-server){:target=_blank .external-link}, [OpenSSH](http://www.openssh.com/){:target=_blank .external-link}, or [FileZilla Server](https://filezilla-project.org/){:target=_blank .external-link}.

## Supported authentication methods

- **FTP account**: Use this method if your FTP server doesn't support SSH tunneling or encrypted connections.
- **SFTP account**: Use this method if your FTP server supports SSH tunneling and encrypted connections.

## Related resources

File Transfer Protocol (FTP) and Secure Shell File Transfer Protocol (SFTP) are protocols for transferring files directly between an FTP/SFTP client and server.

## Using FTP account

Use this method if your FTP server doesn't support SSH tunneling or encrypted connections.

To configure this credential, you'll need to:

1. Enter the name or IP address of your FTP server's **Host**.
2. Enter the **Port** number the connection should use.
3. Enter the **Username** the credential should connect as.
4. Enter the user's **Password**.

Review your FTP server provider's documentation for instructions on getting the information you need.

## Using SFTP account

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
