---
title: Acuity Scheduling credentials
description: Documentation for Acuity Scheduling credentials. Use these credentials to authenticate Acuity Scheduling in n8n, a workflow automation platform.
contentType: integration
---

# Acuity Scheduling credentials

You can use these credentials to authenticate the following nodes with Acuity Scheduling.

- [Acuity Scheduling Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.acuityschedulingtrigger/)

## Prerequisites

Create an [Acuity Scheduling](https://acuityscheduling.com/){:target=_blank .external-link} account.

## Supported authentication methods

- API 
- OAuth2

## Using API

To use the Acuity API credentials, follow the [Acuity API Quick Start authentication instructions](https://developers.acuityscheduling.com/reference/quick-start#authentication){:target=_blank .external-link}. You'll need the numeric **User ID** and **API Key**.

## Using OAuth2

/// note | Note for n8n Cloud users
You'll only need to enter the Credentials Name and click on the circle button in the OAuth section to connect your Acuity Scheduling account to n8n.
///

Should you need to set this up from scratch, you'll need to complete the [Acuity OAuth2 Account Registration page](https://acuityscheduling.com/oauth2/register){:target=_blank .external-link}, and then use the **Client ID** and **Client Secret** provided from that registration.
