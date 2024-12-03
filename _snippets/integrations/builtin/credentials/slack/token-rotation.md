Slack offers **token rotation** that can be turned on for bot and user tokens. This will make the token expire every 12 hours. While this may be useful for testing, it will cause the n8n credential to fail after expiry. If you want to use your slack credentials in production, this feature needs to be turned **off**. 

To check if you have token rotation turned on for your slack app, please refer to the [Slack API Documentation | Token Rotation](https://api.slack.com/authentication/rotation){:target=_blank .external-link} for instructions.

/// note | If Token Rotation has been activated
Please note, token rotation may not be turned off again and you will have to create a new slack app instead. 
///
