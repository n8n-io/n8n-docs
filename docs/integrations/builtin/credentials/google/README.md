---
title: Google credentials
contentType: overview
nodeTitle: Google
originalFilePath: integrations/builtin/credentials/google/index.md
originalUrl: https://docs.n8n.io/integrations/builtin/credentials/google
url: https://docs.n8n.io/integrations/builtin/credentials/google
description: >-
  Documentation for Google credentials. Use these credentials to authenticate
  Google in n8n, a workflow automation platform.
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Google

This section contains:

* [OAuth2 single service](oauth-single-service.md): Create an OAuth2 credential for a specific service node, such as the Gmail node. Two options exist:
  * [Managed OAuth2](oauth-single-service.md#managed-oauth2): Sign in with Google directly on n8n, with no setup required on the Google Cloud Console. Available for n8n Cloud users only, for certain Google nodes.
  * [Custom OAuth2](oauth-single-service.md#custom-oauth2): Configure an OAuth2 app in the Google Cloud Console and connect it to your n8n credential.
* [OAuth2 API (generic)](oauth-generic.md): Create an OAuth2 credential for use with [custom operations](../../custom-api-actions-for-existing-nodes.md).
* [Service Account](service-account.md): Create a [Service Account](https://cloud.google.com/iam/docs/service-account-overview) credential for some specific service nodes.
* [Google PaLM and Gemini](../googleai.md): Get a Google Gemini/Google PaLM API key.

## OAuth2 and Service Account <a href="#oauth2-and-service-account" id="oauth2-and-service-account"></a>

There are two authentication methods available for Google services nodes:

* [OAuth2](https://developers.google.com/identity/protocols/oauth2): Recommended because it's more widely available and easier to set up.
* [Service Account](https://cloud.google.com/iam/docs/understanding-service-accounts): Refer to the [Google documentation: Understanding service accounts](https://cloud.google.com/iam/docs/understanding-service-accounts) for guidance on when you need a service account.

### Managed OAuth2 for n8n Cloud users <a href="#managed-oauth2-for-n8n-cloud-users" id="managed-oauth2-for-n8n-cloud-users"></a>

[Managed OAuth2](oauth-single-service.md#managed-oauth2) is available for the following Google nodes, for n8n Cloud users. This provides a simplified credential creation process:

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/3hg9lh4E1cKGSLdAAfcv/" %}

## Compatible nodes <a href="#compatible-nodes" id="compatible-nodes"></a>

Once configured, you can use your credentials to authenticate the following nodes. Most nodes are compatible with OAuth2 authentication. Support for Service Account authentication is limited.

| Node                                                                                            | OAuth | Service Account |
| ----------------------------------------------------------------------------------------------- | :---: | :-------------: |
| [Google Ads](../../app-nodes/n8n-nodes-base.googleads.md)                                       |   ✅   |        ❌        |
| [Gmail](../../app-nodes/n8n-nodes-base.gmail/)                                                  |   ✅   |        ⚠️       |
| [Google Analytics](../../app-nodes/n8n-nodes-base.googleanalytics.md)                           |   ✅   |        ❌        |
| [Google BigQuery](../../app-nodes/n8n-nodes-base.googlebigquery.md)                             |   ✅   |        ✅        |
| [Google Books](../../app-nodes/n8n-nodes-base.googlebooks.md)                                   |   ✅   |        ✅        |
| [Google Calendar](../../app-nodes/n8n-nodes-base.googlecalendar/)                               |   ✅   |        ❌        |
| [Google Chat](../../app-nodes/n8n-nodes-base.googlechat.md)                                     |   ✅   |        ✅        |
| [Google Cloud Storage](../../app-nodes/n8n-nodes-base.googlecloudstorage.md)                    |   ✅   |        ✅        |
| [Google Contacts](../../app-nodes/n8n-nodes-base.googlecontacts.md)                             |   ✅   |        ❌        |
| [Google Cloud Firestore](../../app-nodes/n8n-nodes-base.googlecloudfirestore.md)                |   ✅   |        ✅        |
| [Google Cloud Natural Language](../../app-nodes/n8n-nodes-base.googlecloudnaturallanguage.md)   |   ✅   |        ❌        |
| [Google Cloud Realtime Database](../../app-nodes/n8n-nodes-base.googlecloudrealtimedatabase.md) |   ✅   |        ❌        |
| [Google Docs](../../app-nodes/n8n-nodes-base.googledocs.md)                                     |   ✅   |        ✅        |
| [Google Drive](../../app-nodes/n8n-nodes-base.googledrive/)                                     |   ✅   |        ✅        |
| [Google Drive Trigger](../../trigger-nodes/n8n-nodes-base.googledrivetrigger/)                  |   ✅   |        ✅        |
| [Google Perspective](../../app-nodes/n8n-nodes-base.googleperspective.md)                       |   ✅   |        ❌        |
| [Google Sheets](../../app-nodes/n8n-nodes-base.googlesheets/)                                   |   ✅   |        ✅        |
| [Google Slides](../../app-nodes/n8n-nodes-base.googleslides.md)                                 |   ✅   |        ✅        |
| [Google Tasks](../../app-nodes/n8n-nodes-base.googletasks.md)                                   |   ✅   |        ❌        |
| [Google Translate](../../app-nodes/n8n-nodes-base.googletranslate.md)                           |   ✅   |        ✅        |
| [Google Workspace Admin](../../app-nodes/n8n-nodes-base.gsuiteadmin.md)                         |   ✅   |        ❌        |
| [YouTube](../../app-nodes/n8n-nodes-base.youtube.md)                                            |   ✅   |        ❌        |

{% hint style="warning" %}
**Gmail and Service Accounts**

Google technically supports Service Accounts for use with Gmail, but it requires enabling domain-wide delegation, which Google discourages, and its behavior can be inconsistent.

n8n recommends using OAuth2 with the Gmail node.
{% endhint %}
