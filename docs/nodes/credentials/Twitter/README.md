---
permalink: /credentials/twitter
description: Learn to configure credentials for the Twitter node in n8n
---

# Twitter

You can use these credentials to authenticate the following nodes with Twitter.
- [Twitter](../../nodes-library/nodes/Twitter/README.md)

## Prerequisites

Create a [Twitter developer account](https://developer.twitter.com/).

## Using OAuth

1. Access the [Twitter Developer](https://developer.twitter.com/en/portal/projects-and-apps) portal.
2. Scroll down to the ***Standalone Apps*** section and click on the ***+Create App*** button.
3. Enter a name for your app in the ***App name*** field.
4. Click on the ***Complete*** button.
5. Copy the displayed ***API key*** and ***API secret key***.
6. Scroll down to the ***Setup your App*** section and click on the ***App settings*** button.
7. Scroll down to the ***Authentication settings*** section and click on the ***Edit*** button.
8. Toggle ***Enable 3-legged OAuth*** to `true`.
9. Copy the 'OAuth Callback URL' provided in the Twitter OAuth API credentials in n8n and paste it in the ***Callback URLs*** field on the Twitter Developer Portal.
10. Enter your website URL in the ***Website URL*** field.
11. Click on the ***Save*** button.
12. Use the 'API key' and the 'API secret key' that you copied earlier with your Twitter OAuth API credentials in n8n.
13. Click on the circle button in the OAuth section to connect a Twitter account to n8n.
14. Click the ***Save*** button to save your credentials.

**Note:** If you want to create, like, or retweet a tweet, or send a direct message you have to provide the appropriate App permissions to your Twitter app.

![Getting Twitter credentials](./using-oauth.gif)

## Further Reference

- [Application-only Authentication](https://developer.twitter.com/en/docs/authentication/oauth-2-0/application-only)