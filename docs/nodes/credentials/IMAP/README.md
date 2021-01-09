---
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

1. Access your [Gmail](https://mail.google.com) account.
2. Click on the gears icon on the top and click on ***See all settings***.
3. Click on the ***Forwarding and POP/IMAP*** tab.
4. Under the ***IMAP access*** section, select 'Enable IMAP'.
5. Click on the ***Save Changes*** button.
6. Go to your [Google Account](https://myaccount.google.com) page.
7. Click on ***Security*** on the left sidebar.
8. Click on ***2-Step Verification*** under the ***Signing in to Google*** section.
9. Set up your 2-Step Verification method.
10. Click on ***App passwords*** under the ***Signing in to Google*** section.
11. Select 'Mail' from the ***Select app*** dropdown list.
12. Select 'Other' from the ***Select device*** dropdown list.
13. Enter a name in the text field.
14. Click on the ***GENERATE*** button.
15. Copy the displayed password.
16. In the IMAP node credentials, enter your email address in the ***User*** field. For example, `example@gmail.com`.
17. Paste the App password you copied in **Step 15** in the ***Password*** field.
18. Enter `imap.google.com` in the ***Host*** field.
19. Toggle ***SSL/TLS*** to `true`.
20. Click on ***Save*** to save your credentials.

**Note:** Before executing the node, set the ***Ignore SSL Issues*** option to true as the Gmail certificate is self-signed.

## Further Reading

- [Set up IMAP](https://support.google.com/mail/answer/7126229?hl=en)
- [Sign in with App Passwords](https://support.google.com/accounts/answer/185833?hl=en)
