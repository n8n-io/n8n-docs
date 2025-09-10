---
title: Facebook Trigger
description: Learn how to use the Facebook Trigger node in n8n. Follow technical documentation to integrate Facebook Trigger node into your workflows.
contentType: [integration, reference]
priority: medium
---

# Facebook Trigger node

[Facebook](https://www.facebook.com/) is a social networking site to connect and share with family and friends online.

Use the Facebook Trigger node to trigger a workflow when events occur in Facebook.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/facebookapp.md).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/) page.
///

## Objects

- [**Ad Account**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/ad-account.md): Get updates for certain ads changes.
- [**Application**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/application.md): Get updates sent to the application.
- [**Certificate Transparency**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/certificate-transparency.md): Get updates when new security certificates are generated for your subscribed domains, including new certificates and potential phishing attempts.
- Activity and events in a [**Group**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/group.md)
- [**Instagram**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/instagram.md): Get updates when someone comments on the Media objects of your app users; @mentions your app users; or when Stories of your app users expire.
- [**Link**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/link.md): Get updates about the links for rich previews by an external provider
- [**Page**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/page.md) updates
- [**Permissions**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/permissions.md): Updates when granting or revoking permissions
- [**User**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/user.md) profile updates
- [**WhatsApp Business Account**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/whatsapp.md)
    
    /// note | Use WhatsApp Trigger
    n8n recommends using the [WhatsApp Trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger.md) with the [WhatsApp credentials](/integrations/builtin/credentials/whatsapp.md) instead of the Facebook Trigger node for these events. The WhatsApp Trigger node has more events to listen to.
    ///

- [**Workplace Security**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/workplace-security.md)

For each **Object**, use the **Field Names or IDs** dropdown to select more details on what data to receive. Refer to the linked pages for more details.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/facebook-trigger/) on n8n's website.

Refer to Meta's [Graph API documentation](https://developers.facebook.com/docs/graph-api/webhooks/reference) for details about their API.
