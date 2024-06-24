---
title: Twilio credentials
description: Documentation for Twilio credentials. Use these credentials to authenticate Twilio in n8n, a workflow automation platform.
contentType: integration
---

# Twilio credentials

You can use these credentials to authenticate the following nodes:

- [Twilio](/integrations/builtin/app-nodes/n8n-nodes-base.twilio/)
- [Twilio trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger/)

## Prerequisites

Create a [Twilio](https://twilio.com/){:target=_blank .external-link} account.

## Supported authentication methods

- Auth token: Twilio recommends this method for local testing only.
- API key: Twilio recommends this method for production.

## Related resources

Refer to [Twilio's API documentation](https://www.twilio.com/docs){:target=_blank .external-link} for more information about the service.

## Using Auth Token

To configure this credential, you'll need:

- An **Auth Type**: Select **Auth Token**.
- An **Account SID**: The Account SID acts as a username. Go to **Console Dashboard > Account Info** to view and copy your Account SID.
- An **Auth Token**: The Auth Token acts as a password. Go to **Console Dashboard > Account Info** to view and copy (or change) your Auth Token.

Refer to [Auth Tokens and How to Change Them](https://help.twilio.com/articles/223136027-Auth-Tokens-and-How-to-Change-Them){:target=_blank .external-link} for more detailed instructions.

## Using API key

To configure this credential, you'll need:

- An **Auth Type**: Select **API Key**.
- An **Account SID**: The Account SID acts as a username. Go to **Console Dashboard > Account Info** to view and copy your Account SID.
- An **API Key SID**: Generated when you create an API key.
- An **API Key Secret**: Generated when you create an API key.

To create an API key, go to your **Account > Keys & credentials > API keys & tokens > Create API Key**. Copy the **SID** and **Secret** displayed with the key and enter them in your n8n credential. Refer to [Create an API key](https://www.twilio.com/docs/iam/api-keys#create-an-api-key){:target=_blank .external-link} for more detailed instructions.

### Selecting an API key type

When you create a Twilio API key, you must select an API key type. The options are:

* **Main**: This key type gives you the same level of access as using your Account SID and Auth Token in API requests.
* **Standard**: This key type gives you access to all the functionality in Twilio's APIs except the API key resources and Account resources.
* **Restricted**: This key type is in beta. n8n hasn't tested the credential against this key type; if you try it, let us know if you run into any issues.

The n8n credential works with **Main** and **Standard** key types.

Refer to [Types of API keys](https://www.twilio.com/docs/iam/api-keys#types-of-api-keys){:target=_blank .external-link} for more information on the key types.
