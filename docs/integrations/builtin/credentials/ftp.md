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

Create an account on a File Transfer Protocol (FTP) server.

## Supported authentication methods

- FTP account: Use this method if your FTP server doesn't support SSH tunneling or encrypted connections.
- SFTP account: Use this method if your FTP server supports SSH tunneling and encrypted connections.

## Related resources

File Transfer Protocol (FTP) and Secure Shell File Transfer Protocol (SFTP) are protocols for transferring files directly between an FTP/SFTP client and server.

## Using FTP account

To configure this credential, you'll need:

- A **Host**: Enter the name or IP address of your FTP server's host.
- A **Port**: Enter the port number the connection should use.
- A **Username**: Enter the name of the user the connection should use.
- A **Password**: Enter the user's password.

Review your FTP server provider's documentation for instructions on getting the information you need.

## Using SFTP account

To configure this credential, you'll need:

- A **Host**: Enter the name or IP address of your FTP server's host.
- A **Port**: Enter the port number the connection should use.
- A **Username**: Enter the name of the user the connection should use.
- A **Password**: Enter the user's password.
- A **Private Key**: Enter a string for either key-based or host-based user authentication (OpenSSH format).
- A **Passphrase**: If the **Private Key** is encrypted, enter the passphrase used to decrypt it.

Review your FTP server provider's documentation for instructions on getting the information you need.