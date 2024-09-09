---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Twilio credentials
description: Documentation for Twilio credentials. Use these credentials to authenticate Twilio in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Twilio credentials

You can use these credentials to authenticate the following nodes:

- [Twilio](/integrations/builtin/app-nodes/n8n-nodes-base.twilio/)
- [Twilio trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger/)

## Supported authentication methods

- **Auth token**: Twilio recommends this method for local testing only.
- **API key**: Twilio recommends this method for production.

## Related resources

Refer to [Twilio's API documentation](https://www.twilio.com/docs){:target=_blank .external-link} for more information about the service.

## Using Auth Token

To configure this credential, you'll need a [Twilio](https://twilio.com/){:target=_blank .external-link} account and:

- Your Twilio **Account SID**
- Your Twilio **Auth Token**

To set up the credential:

1. In n8n, select **Auth Token** as the **Auth Type**.
2. In Twilio, go to **Console Dashboard > Account Info**.
3. Copy your **Account SID** and enter this in your n8n credential. This acts as a username.
4. Cop your **Auth Token** and enter this in your n8n credential. This acts as a password.

Refer to [Auth Tokens and How to Change Them](https://help.twilio.com/articles/223136027-Auth-Tokens-and-How-to-Change-Them){:target=_blank .external-link} for more information.

## Using API key

To configure this credential, you'll need a [Twilio](https://twilio.com/){:target=_blank .external-link} account and:

- Your Twilio **Account SID**
- An **API Key SID**: Generated when you create an API key.
- An **API Key Secret**: Generated when you create an API key.

To set up the credential:

1. In n8n, select **API Key** as the **Auth Type**.
2. In Twilio, go to **Console Dashboard > Account Info**.
3. Copy your **Account SID** and enter it in your n8n credential.
4. In Twilio, go to your account's [**API keys & tokens**](https://www.twilio.com/console/project/api-keys) page.
5. Select **Create API Key**.
6. Enter a **Friendly name** for your API key, like `n8n integration`.
7. Select your **Key type**. n8n works with either **Main** or **Standard**. Refer to [Selecting an API key type](#selecting-an-api-key-type) for more information.
8. Select **Create API Key** to finish creating the key.
5. On the **Copy secret key** page, copy the **SID** displayed with the key and enter it in your n8n credential **API Key SID**.
6. On the **Copy secret key** page, copy the **Secret** displayed with the key and enter it in your n8n credential **API Key Secret**.

Refer to [Create an API key](https://www.twilio.com/docs/iam/api-keys#create-an-api-key){:target=_blank .external-link} for more detailed instructions.

### Selecting an API key type

When you create a Twilio API key, you must select a key type. The n8n credential works with **Main** and **Standard** key types.

Here are more details on the different API key types:

* **Main**: This key type gives you the same level of access as using your Account SID and Auth Token in API requests.
* **Standard**: This key type gives you access to all the functionality in Twilio's APIs except the API key resources and Account resources.
* **Restricted**: This key type is in beta. n8n hasn't tested the credential against this key type; if you try it, let us know if you run into any issues.

Refer to [Types of API keys](https://www.twilio.com/docs/iam/api-keys#types-of-api-keys){:target=_blank .external-link} for more information on the key types.
