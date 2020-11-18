---
permalink: /credentials/imap
description: Learn to configure credentials for the IMAP node in n8n
---

# IMAP

You can use these credentials to authenticate the following nodes with IMAP.
- [IMAP Email](../../nodes-library/core-nodes/IMAPEmail/README.md)

## Prerequisites

Create an email account on a service with IMAP support. 

## Using IMAP

1. Retrieve your login credentials and IMAP connection parameters.
2. Use the login credentials and IMAP connection parameters with your IMAP Email node credentials in n8n.
3. Click on the ***Save*** button to save your credentials.


## Using Gmail

1. First you have to enable IMAP on your account. You can follow the first step described here: https://support.google.com/mail/answer/7126229?hl=en
2. Regular IMAP access is considered "Less secure access" by Google. So you have to allow this. Head to https://accounts.google.com then to Security
3. Scroll down until you see the Less secure app access and enable it
4. You also have to enable 2-Step verification. On the Signing in to Google section in the same page, activate 2-Step verification
5. After setting up 2-Step verification you can now create an App password. Create one.
6. Set up the node using the hostname, port and settings described above in the first step and the password generated on the previous step

Important note: You have to set up Ignore SSL issues in the node settings inside options to true as Gmail certificate is self signed.

If you are using a Google Suite account, instead of heading to https://accounts.google.com you have to access the admin panel located at https://admin.google.com. Steps are fairly similar but administrator must have Less secure apps enabled on your corporation for this to work.