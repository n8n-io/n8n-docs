---
title: TOTP credentials
description: >-
  Documentation for TOTP credentials. Use these credentials to authenticate TOTP
  in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
nodeTitle: TOTP credentials
originalFilePath: integrations/builtin/credentials/totp.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/totp'
url: 'https://docs.n8n.io/integrations/builtin/credentials/totp'
layout:
  description:
    visible: false
---

# TOTP credentials <a href="#totp-credentials" id="totp-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [TOTP](../core-nodes/n8n-nodes-base.totp.md)

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

Generate a TOTP **Secret** and **Label**.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- Secret and label

## Related resources <a href="#related-resources" id="related-resources"></a>

Time-based One-time Password (TOTP) is an algorithm that generates a one-time password (OTP) using the current time. Refer to [Google Authenticator | Key URI format](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) for more information.

## Using secret and label <a href="#using-secret-and-label" id="using-secret-and-label"></a>

To configure this credential, you'll need:

- A **Secret**: The secret key encoded in the QR code during authenticator setup. It's an arbitrary key value encoded in Base32, for example: `BVDRSBXQB2ZEL5HE`. Refer to [Google Authenticator Secret](https://github.com/google/google-authenticator/wiki/Key-Uri-Format#secret) for more information.
- A **Label**: The identifier for the account. It contains an account name as a URI-encoded string. You can include prefixes to identify the provider or service managing the account. If you use prefixes, use a literal or url-encoded colon to separate the issuer prefix and the account name, for example: `GitHub:john-doe`. Refer to [Google Authenticator Label](https://github.com/google/google-authenticator/wiki/Key-Uri-Format#label) for more information.
