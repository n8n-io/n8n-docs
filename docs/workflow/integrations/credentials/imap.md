# IMAP

You can use these credentials to authenticate the following nodes with IMAP.
- [IMAP Email](/workflow/integrations/core-nodes/n8n-nodes-base.imapEmail/)

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
18. Enter `imap.gmail.com` in the ***Host*** field.
19. Toggle ***SSL/TLS*** to `true`.
20. Click on ***Save*** to save your credentials.

**Note:** Before executing the node, set the ***Ignore SSL Issues*** option to true as the Gmail certificate is self-signed.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/q4KUTgiglvE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Yahoo Mail

1. Open your [Yahoo Mail](https://mail.yahoo.com) account.
2. Click on your avatar on the top right and select 'Account info'.
3. Click on the ***Account security*** tab in the left sidebar.
4. Scroll down to the bottom and click on ***Generate app password***.
5. Select 'Other app' from the ***Select your app*** dropdown list.
6. Enter the name of the app in the ***Enter custom name*** field.
7. Click on the ***Generate*** button.
8. Copy the displayed password.
9. Enter the name for your credentials in the ***Credentials Name*** field in the 'IMAP' credentials in n8n.
10. Enter your email address in the ***User*** field.
11. Paste the password you copied earlier in the ***Password*** field.
12. Enter `imap.mail.yahoo.com` in the ***Host*** field.
13. Toggle ***SSL/TLS*** to `true`.
14. Click on ***Save*** to save your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/2SFGl3xBdOA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Using Outlook.com

1. Enter the name for your credentials in the ***Credentials Name*** field in the 'IMAP' credentials in n8n.
2. Enter your email address in the ***User*** field.
3. Enter your account password in the ***Password*** field.
4. Enter `outlook.office365.com` in the ***Host*** field.
5. Toggle ***SSL/TLS*** to `true`.
6. Click on ***Create*** to create your credentials.

**Note** If you get a connection error, please follow the steps mentioned in the [FAQs](#how-to-solve-the-connection-error-when-connecting-to-outlook-com).

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/gCWiILtHnPQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## FAQs

### How to solve the connection error when connecting to Outlook.com?

If you receive a connection error while configuring the credentials for your Outlook account, follow the steps mentioned below:
1. Go to [account.live.com/activity](https://account.live.com/activity).
2. Sign in using the email address and password of your account.
3. Under the ***Recent activity*** section, find the Session Type event that matches the most recent time you received the connection error and click to expand it.
4. Select ***This was me*** to let the system know you authorize the IMAP connection.




- [Set up IMAP for Gmail account](https://support.google.com/mail/answer/7126229?hl=en)
- [Sign in with App Passwords for your Gmail Account](https://support.google.com/accounts/answer/185833?hl=en)
- [Set up IMAP for Yahoo mail account](https://help.yahoo.com/kb/sln4075.html)
- [Sign in with App Passwords for your Yahoo mail Account](https://help.yahoo.com/kb/generate-manage-third-party-passwords-sln15241.html)
- [POP, IMAP, and SMTP settings for Outlook.com](https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-for-outlook-com-d088b986-291d-42b8-9564-9c414e2aa040)
