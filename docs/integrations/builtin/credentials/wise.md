---
title: Wise credentials
description: Documentation for Wise credentials. Use these credentials to authenticate Wise in n8n, a workflow automation platform.
contentType: integration
---

# Wise credentials

You can use these credentials to authenticate the following nodes with Wise.

- [Wise](/integrations/builtin/app-nodes/n8n-nodes-base.wise/)
- [Wise Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.wisetrigger/)

## Prerequisites

Create a [Wise](https://wise.com/) account.

## Using API Token

1. Open your Wise [dashboard](https://wise.com/user/account/).
2. Click on the username on the top right and select 'Settings' from the dropdown list.
3. Scroll down to the bottom and click on ***API tokens***.
4. Click on the ***Add new token*** button.
5. Enter a name in the ***Name or description*** field.
6. Click on the ***Create token*** button.
7. Scroll down to the bottom and click on ***API tokens***.
8. Click on ***Reveal key*** to reveal the newly generated API key.
9. Enter your Wise account password in the ***Please enter your password*** field.
10. Copy the displayed API key.
11. Enter the name for your credentials in the ***Credentials Name*** field in the 'Wise API' credentials in n8n.
12. Paste the API key in the ***API Token*** field in the 'Wise API' credentials in n8n.
13. If you're using a Wise sandbox account, select 'Test' from the ***Environment*** dropdown list in the 'Wise API' credentials in n8n.
14. Click on the ***Create*** button to create your credentials.

The following video demonstrates the steps mentioned above.

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/hys2lDEScUE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


## Personal Token SCA

When making a request to an SCA (strong customer authentication) protected endpoint, Wise returns a 403 Forbidden HTTP status code.
SCA is required on Get Statements, and Funds transfer request. It is disabled when using test endpoints.

If SCA is required, Wise returns an error similar to below: 

> This request requires Strong Customer Authentication (SCA). Please add a key pair to your account and n8n credentials. See https://api-docs.transferwise.com/#strong-customer-authentication-personal-token


To enable signing a token you need to create and add a public and private key. Add the public key to Wise in user [profile settings](https://wise.com/settings/public-keys){:target=_blank .external-link}.

To generate an RSA key pair:

```sh
$ openssl genrsa -out private.pem 2048 
$ openssl rsa -pubout -in private.pem -out public.pem
```
With the generated keys, add them to n8n and Wise:

- Add the content of the public key `public.pem` to your Wise user [profile settings](https://wise.com/settings/public-keys).
- Add the content of the private key `private.pem` to your n8n Wise Credential under `Private Key (Optional)`



