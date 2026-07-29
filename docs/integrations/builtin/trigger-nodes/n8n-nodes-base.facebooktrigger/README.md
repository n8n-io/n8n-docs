---
title: Facebook Trigger
description: >-
  Learn how to use the Facebook Trigger node in n8n. Follow technical
  documentation to integrate Facebook Trigger node into your workflows.
contentType:
  - integration
  - reference
priority: medium
nodeTitle: n8n-nodes-base.facebooktrigger
originalFilePath: integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/index.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger
url: >-
  https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger
layout:
  description:
    visible: false
---

# Facebook Trigger node <a href="#facebook-trigger-node" id="facebook-trigger-node"></a>

[Facebook](https://www.facebook.com/) is a social networking site to connect and share with family and friends online.

Use the Facebook Trigger node to trigger a workflow when events occur in Facebook.

{% hint style="info" %}
**Credentials**

You can find authentication information for this node [here](../../credentials/facebookapp.md).
{% endhint %}

{% hint style="info" %}
**Examples and templates**

For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/) page.
{% endhint %}

## Objects <a href="#objects" id="objects"></a>

- [**Ad Account**](ad-account.md): Get updates for certain ads changes.
- [**Application**](application.md): Get updates sent to the application.
- [**Certificate Transparency**](certificate-transparency.md): Get updates when new security certificates are generated for your subscribed domains, including new certificates and potential phishing attempts.
- Activity and events in a [**Group**](group.md)
- [**Instagram**](instagram.md): Get updates when someone comments on the Media objects of your app users; @mentions your app users; or when Stories of your app users expire.
- [**Link**](link.md): Get updates about the links for rich previews by an external provider
- [**Page**](page.md) updates
- [**Permissions**](permissions.md): Updates when granting or revoking permissions
- [**User**](user.md) profile updates
- [**WhatsApp Business Account**](whatsapp.md)<br>
    
    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p><strong>Use WhatsApp Trigger</strong></p><p>n8n recommends using the <a href="../n8n-nodes-base.whatsapptrigger.md">WhatsApp Trigger node</a> with the <a href="../../credentials/whatsapp.md">WhatsApp credentials</a> instead of the Facebook Trigger node for these events. The WhatsApp Trigger node has more events to listen to.</p></div>

- [**Workplace Security**](workplace-security.md)

For each **Object**, use the **Field Names or IDs** dropdown to select more details on what data to receive. Refer to the linked pages for more details.

## Related resources <a href="#related-resources" id="related-resources"></a>

View [example workflows and related content](https://n8n.io/integrations/facebook-trigger/) on n8n's website.

Refer to Meta's [Graph API documentation](https://developers.facebook.com/docs/graph-api/webhooks/reference) for details about their API.
