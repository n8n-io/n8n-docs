---
title: IMAP credentials
description: >-
  Documentation for IMAP credentials. Use these credentials to authenticate IMAP
  in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: high
nodeTitle: IMAP
originalFilePath: integrations/builtin/credentials/imap/index.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/imap'
url: 'https://docs.n8n.io/integrations/builtin/credentials/imap'
layout:
  description:
    visible: false
---

# IMAP credentials <a href="#imap-credentials" id="imap-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [IMAP Email](../../core-nodes/n8n-nodes-base.emailimap.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Create an email account on a service with IMAP support.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- User account

## Related resources <a href="#related-resources" id="related-resources"></a>

Internet Message Access Protocol (IMAP) is a standard protocol for receiving email. Most email providers offer instructions on setting up their service with IMAP; refer to your provider's IMAP instructions.

## Using user account <a href="#using-user-account" id="using-user-account"></a>

To configure this credential, you'll need:

- A **User** name: The email address you're retrieving email for.
- A **Password**: Either the password you use to check email or an app password. Your provider will tell you whether to use your own password or to generate an app password.
- A **Host**: The IMAP host address for your email provider, often formatted as `imap.<provider>.com`. Check with your provider.
- A **Port** number: The default is port `993`. Use this port unless your provider or email administrator tells you to use something different.

Choose whether to use **SSL/TLS** and whether to **Allow Self-Signed Certificates**.

### Provider instructions <a href="#provider-instructions" id="provider-instructions"></a>

Refer to the quickstart guides for these common email providers.

#### Gmail <a href="#gmail" id="gmail"></a>

Refer to [Gmail](gmail.md).

#### Outlook.com <a href="#outlookcom" id="outlookcom"></a>

Refer to [Outlook.com](outlook.md).

#### Yahoo <a href="#yahoo" id="yahoo"></a>

Refer to [Yahoo](yahoo.md).

### My provider isn't listed <a href="#my-provider-isnt-listed" id="my-provider-isnt-listed"></a>

If your email provider isn't listed here, search for their `IMAP settings` or `IMAP instructions`.
