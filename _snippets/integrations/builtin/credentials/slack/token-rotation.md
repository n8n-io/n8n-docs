Slack offers **token rotation** that you can turn on for bot and user tokens. This makes every tokens expire after 12 hours. While this may be useful for testing, n8n credentials using tokens with this enabled will fail after expiry. If you want to use your Slack credentials in production, this feature must be **off**.

To check if your Slack app has token rotation turned on, refer to the [Slack API Documentation | Token Rotation](https://api.slack.com/authentication/rotation).

/// note | If your app uses token rotation
Please note, if your Slack app uses token rotation, you can't turn it off again. You need to create a new Slack app with token rotation disabled instead. 
///
