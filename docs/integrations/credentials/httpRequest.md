# HTTP Request

You can use these credentials to authenticate the following nodes:

- [HTTP Request](/integrations/core-nodes/n8n-nodes-base.httpRequest/)

## Prerequisites

You must use the authentication method required by the app or service you want to query.

### Existing credential types

n8n recommends using this option whenever there's a credential type available for the service you want to connect to.  It offers an easier way to set up and manage credentials, compared to configuring generic credentials.

You can use [Predefined credential types](/integrations/custom-operations/#predefined-credential-types) to perform custom operations with some APIs where n8n has a node for the platform. For example, n8n has an Asana node, and supports using your Asana credentials in the HTTP Request node. Refer to [Custom operations](/integrations/custom-operations/) for more information.

### Generic authentication

The following generic authentication methods are available:

* Basic Auth
* Digest Auth
* Header Auth
* OAuth1
* OAuth2
* None

You can learn more about HTTP authentication [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#see_also).


## Using an existing credential type

--8<-- "_snippets/integrations/predefined-credential-type-how-to.md"

Refer to [Custom API operations](/integrations/custom-operations/) for more information.

## Using Basic Auth / Digest Auth

1. Enter a descriptive *Credentials Name*.
2. In the *Credential Data* section, enter the *Username* and *Password* for the app or service your HTTP Request is targeting. 
3. Click **Create** to save your credentials.

## Using Header Auth

1. Enter a descriptive *Credentials Name*.
2. In the *Credential Data* section, enter the header *Name* and *Value* required for the app or service your HTTP Request is targeting. Read more about [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#authentication).
3. Click **Create** to save your credentials.

## Using OAuth1

1. Enter a descriptive *Credentials Name*.
2. In the *Credential Data* section, enter the following authentication details:
    * *Authorization URL*
    * *Access Token URL*
    * *Consumer Key*
    * *Consumer Secret*
    * *Request Token URL*
    * *Signature Method*
3. Click **Create** to save your credentials.

Read more about [OAuth1](https://oauth.net/1/).

## Using OAuth2

1. Enter a descriptive *Credentials Name*.
2. In the *Credential Data* section, enter the following authentication details:
    * *Authorization URL*
    * *Access Token URL*
    * *Client ID*
    * *Client Secret*
    * *Scope*
    * *Auth URI Query Parameters*
    * *Authentication*
3. Click **Create** to save your credentials.

Read more about [OAuth2](https://oauth.net/2/).

