---
title: JWT
description: >-
  Documentation for the JWT node in n8n, a workflow automation platform.
  Includes guidance on usage, and links to examples.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: JWT
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.jwt.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.jwt'
url: 'https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.jwt'
layout:
  description:
    visible: false
---

# JWT <a href="#jwt" id="jwt"></a>

Work with JSON web tokens in your n8n workflows.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../credentials/jwt.md).
{% endhint %}

## Operations <a href="#operations" id="operations"></a>

* Decode
* Sign
* Verify

## Node parameters <a href="#node-parameters" id="node-parameters"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/hLGdVKMP8bGrbsRtVcGc/" %}

* **Credential to connect with**: Select or create a [JWT credential](../credentials/jwt.md) to connect with.
* **Token**: Enter the token to **Verify** or **Decode**.
* If you select the **Sign** operation, you'll also have this parameter:
    * **Use JSON to Build Payload**: When turned on, the node uses JSON to build the claims. The selection here influences what appears in the Payload Claims section.

## Payload Claims <a href="#payload-claims" id="payload-claims"></a>

The node only displays payload claims if you select the **Sign** operation. What you see depends on what you select for **Use JSON to Build Payload**:

* If you select **Use JSON to Build Payload**, this section displays a JSON editor where you can construct the claims.
* If you don't select **Use JSON to Build Payload**, this section prompts you to **Add Claim**.

You can add the following claims.

### Audience <a href="#audience" id="audience"></a>

The **Audience** or `aud` claim identifies the intended recipients of the JWT.

Refer to ["aud" (Audience) Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.3) for more information.

### Expires In <a href="#expires-in" id="expires-in"></a>

The **Expires In** or `exp` claim identifies the time after which the JWT expires and must not be accepted for processing.

Refer to ["exp" (Expiration Time) Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4) for more information.

### Issuer <a href="#issuer" id="issuer"></a>

The **Issuer** or `iss` claim identifies the principal that issued the JWT.

Refer to ["iss" (Issuer) Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.1) for more information.

### JWT ID <a href="#jwt-id" id="jwt-id"></a>

The **JWT ID** or `jti` claim provides a unique identifier for the JWT.

Refer to ["jti" (JWT ID) Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.7) for more information.

### Not Before <a href="#not-before" id="not-before"></a>

The **Not Before** or `nbf` claim identifies the time before which the JWT must not be accepted for processing.

Refer to ["nbf" (Not Before) Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5) for more information.

### Subject <a href="#subject" id="subject"></a>

The **Subject** or `sub` claim identifies the principal that's the subject of the JWT.

Refer to ["sub" (Subject) Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.2) for more information.

## Node options <a href="#node-options" id="node-options"></a>

### Decode node options <a href="#decode-node-options" id="decode-node-options"></a>

The **Return Additional Info** toggle controls how much information the node returns.

When turned on, the node returns the complete decoded token with information about the header and signature. When turned off, the node only returns the payload.

### Sign node options <a href="#sign-node-options" id="sign-node-options"></a>

Use the **Override Algorithm** control to select the algorithm to use for verifying the token. This algorithm will override the algorithm selected in the credentials.

### Verify node options <a href="#verify-node-options" id="verify-node-options"></a>

This operation includes several node options:

* **Return Additional Info**: This toggle controls how much information the node returns. When turned on, the node returns the complete decoded token with information about the header and signature. When turned off, the node only returns the payload.
* **Ignore Expiration**: This toggle controls whether the node should ignore the token's expiration time claim (`exp`). Refer to ["exp" (Expiration Time) Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4) for more information.
* **Ignore Not Before Claim**: This toggle controls whether to ignore the token's not before claim (`nbf`). Refer to ["nbf" (Not Before) Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.5) for more information.
* **Clock Tolerance**: Enter the number of seconds to tolerate when checking the `nbf` and `exp` claims. This allows you to deal with small clock differences among different servers. Refer to ["exp" (Expiration Time) Claim](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1.4) for more information.
* **Override Algorithm**: The algorithm to use for verifying the token. This algorithm will override the algorithm selected in the credentials.

## Templates and examples <a href="#templates-and-examples" id="templates-and-examples"></a>


[Browse JWT integration templates](https://n8n.io/integrations/jwt) or [search all templates](https://n8n.io/workflows/)
