# HTTP Request

You can use these credentials to authenticate the following nodes:

- [HTTP Request](/workflow/integrations/core-nodes/workflow-nodes-base.httpRequest/)

## Prerequisites

You must use the authentication method required by the app or service you want to query. The following authentication methods are available:

* Basic Auth
* Digest Auth
* Header Auth
* OAuth1
* OAuth2
* None

You can learn more about HTTP authentication [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#see_also).

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
