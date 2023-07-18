---
title: Google credentials
description: Documentation for Google credentials. Use these credentials to authenticate Google in n8n, a workflow automation platform.
contentType: overview
---

# Google credentials

This section contains:

* [OAuth2 single service](/integrations/builtin/credentials/google/oauth-single-service/): create an OAuth2 credential for a specific service node, such as the Gmail node.
* [OAuth2 generic](/integrations/builtin/credentials/google/oauth-generic/): create an OAuth2 credential for use with [custom operations](/integrations/custom-operations/).
* [Service Account](/integrations/builtin/credentials/google/service-account/): create a Service Account credential.

## OAuth2 and Service Account

There are two authentication methods available for Google services nodes, [OAuth2](https://developers.google.com/identity/protocols/oauth2){:target=_blank .external-link} and [Service Account](https://cloud.google.com/iam/docs/understanding-service-accounts){:target=_blank .external-link}. n8n recommends using OAuth. It's more widely available, and easier to set up. Refer to the [Google documentation: Understanding service accounts](https://cloud.google.com/iam/docs/understanding-service-accounts){:target=_blank .external-link} for guidance on when you need service account.

## Compatible nodes

Once configured, you can use your credentials to authenticate the following nodes. Most nodes are compatible with OAuth2 authentication. Support for Service Account authentication is limited.

??? Details "Compatibility"
	| Node | OAuth | Service Account |
	| :--- | :---: | :-------------: |
	| [G Suite Admin](/integrations/builtin/app-nodes/n8n-nodes-base.gsuiteadmin/) | :white_check_mark: | :x: |
	| [Google Ads](/integrations/builtin/app-nodes/n8n-nodes-base.googleads/) | :white_check_mark: | :x: |
	| [Gmail](/integrations/builtin/app-nodes/n8n-nodes-base.gmail/) | :white_check_mark: | :white_check_mark: |
	| [Google Analytics](/integrations/builtin/app-nodes/n8n-nodes-base.googleanalytics/) | :white_check_mark: | :x: |
	| [Google BigQuery](/integrations/builtin/app-nodes/n8n-nodes-base.googlebigquery/) | :white_check_mark: | :x: |
	| [Google Books](/integrations/builtin/app-nodes/n8n-nodes-base.googlebooks/) | :white_check_mark: | :white_check_mark: |
	| [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/) | :white_check_mark: | :x: |
	| [Google Chat](/integrations/builtin/app-nodes/n8n-nodes-base.googlechat/) | :x: | :white_check_mark: |
	| [Google Cloud Storage](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudstorage/) | :white_check_mark: | :x: |
	| [Google Contacts](/integrations/builtin/app-nodes/n8n-nodes-base.googlecontacts/) | :white_check_mark: | :x: |
	| [Google Cloud Firestore](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudfirestore/) | :white_check_mark: | :x: |
	| [Google Cloud Natural Language](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudnaturallanguage/) | :white_check_mark: | :x: |
	| [Google Cloud Realtime Database](/integrations/builtin/app-nodes/n8n-nodes-base.googlecloudrealtimedatabase/) | :white_check_mark: | :x: |
	| [Google Docs](/integrations/builtin/app-nodes/n8n-nodes-base.googledocs/) | :white_check_mark: | :white_check_mark: |
	| [Google Drive](/integrations/builtin/app-nodes/n8n-nodes-base.googledrive/) | :white_check_mark: | :white_check_mark: |
	| [Google Drive Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.googledrivetrigger/) | :white_check_mark: | :white_check_mark: |
	| [Google Perspective](/integrations/builtin/app-nodes/n8n-nodes-base.googleperspective/) | :white_check_mark: | :x: |
	| [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/) | :white_check_mark: | :white_check_mark: |
	| [Google Slides](/integrations/builtin/app-nodes/n8n-nodes-base.googleslides/) | :white_check_mark: | :white_check_mark: |
	| [Google Tasks](/integrations/builtin/app-nodes/n8n-nodes-base.googletasks/) | :white_check_mark: | :x: |
	| [Google Translate](/integrations/builtin/app-nodes/n8n-nodes-base.googletranslate/) | :white_check_mark: | :white_check_mark: |
	| [YouTube](/integrations/builtin/app-nodes/n8n-nodes-base.youtube/) | :white_check_mark: | :x: |

!!! note "Note for n8n Cloud users"
    For the following nodes, you can authenticate by entering the **Credentials Name** and selecting **Sign in with Google** in the OAuth section to connect your Google account to n8n:

    * [Google Calendar](/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/)
    * [Google Contacts](/integrations/builtin/app-nodes/n8n-nodes-base.googlecontacts/)
    * [Google Sheets](/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)
    * [Google Tasks](/integrations/builtin/app-nodes/n8n-nodes-base.googletasks/)





