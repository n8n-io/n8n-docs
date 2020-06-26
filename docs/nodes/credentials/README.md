# Credentials

Information about different credentials in n8n.

## Redirect URI

When you are using OAuth2 authentication with a node in n8n, you must pass what is called a redirect URI to the respective node platform you are using (for instance, Slack or Google API).

This redirect URI is given to you by n8n and you can find it in the credentials menu when you are entering the OAuth2 data.

![Getting a redirect URI](https://i.imgur.com/kSIcvjU.gif)

This redirect URI must be set by you in the node platform you are using as mentioned. In the below example we're setting it up for Slack.

![Setting Slack OAuth2 redirect URI](https://i.imgur.com/3VUWinx.gif)


