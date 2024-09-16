---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Facebook trigger
description: Documentation for the Facebook trigger node in n8n, a workflow automation platform. Includes details of operations and configuration, and links to examples and credentials information.
contentType: integration
priority: medium
---

# Facebook trigger

[Facebook](https://www.facebook.com/){:target=_blank .external-link} is a social networking site to connect and share with family and friends online.

Use the Facebook trigger node to trigger a workflow when events occur in Facebook.

/// note | Credentials
You can find authentication information for this node [here](/integrations/builtin/credentials/facebookapp/).
///

///  note  | Examples and templates
For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/){:target=_blank .external-link} page.
///

## Objects

- [**Ad Account**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/ad-account/): Get updates for certain ads changes.
- [**Application**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/application/): Get updates sent to the application.
- [**Certificate Transparency**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/certificate-transparency/): Get updates when new security certificates are generated for your subscribed domains, including new certificates and potential phishing attempts.
- Activity and events in a [**Group**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/group/)
- [**Instagram**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/instagram/): Get updates when someone comments on the Media objects of your app users; @mentions your app users; or when Stories of your app users expire.
- [**Link**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/link/): Get updates about the links for rich previews by an external provider
- [**Page**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/page/) updates
- [**Permissions**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/permissions/): Updates when granting or revoking permissions
- [**User**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/user/) profile updates
- [**WhatsApp business account**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/whatsapp/)
    
    /// note | Use WhatsApp trigger
    n8n recommends using the [WhatsApp trigger node](/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger/) with the [WhatsApp credentials](/integrations/builtin/credentials/whatsapp/) instead of the Facebook trigger node for these events. That trigger node includes twice the events to subscribe to.
    ///

- [**Workplace security**](/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/workplace-security/)

For each **Object**, use the **Field Names or IDs** dropdown to select more details on what data to receive. Refer to the linked pages for more details.

## Related resources

View [example workflows and related content](https://n8n.io/integrations/facebook-trigger/){:target=_blank .external-link} on n8n's website.

Refer to Meta's [Graph API documentation](https://developers.facebook.com/docs/graph-api/webhooks/reference){:target=_blank .external-link} for details about their API.
