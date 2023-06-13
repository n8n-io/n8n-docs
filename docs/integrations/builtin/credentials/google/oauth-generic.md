---
title: Google OAuth2 generic
description: Documentation for generic OAuth2 Google credentials. Use these credentials to authenticate Google services in n8n, a workflow automation platform.
---

# Google: OAuth2 generic

This document contains instructions for creating a generic OAuth2 Google credential for use with [custom operations](/integrations/custom-operations/).

## Prerequisites

* [Google Cloud](https://cloud.google.com/){:targe=_blank .external-link} account
* [Google Cloud Platform project](https://developers.google.com/workspace/marketplace/create-gcp-project){:targe=_blank .external-link}
* If you haven't used OAuth in your Google Cloud project before, you need to [configure the OAuth consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent){:target=_blank .external-link}.
* If using Google Perspective: [Request API Access](https://developers.perspectiveapi.com/s/docs-get-started){:targe=_blank .external-link}
* If using Google Ads: [Developer Token](https://developers.google.com/google-ads/api/docs/first-call/dev-token){:targe=_blank .external-link}

## Set up OAuth

### Create a new credential in n8n

1. Follow the steps to [Create a credential](/credentials/add-edit-credentials/). If you create a credential by selecting **Create new** in the credentials dropdown in a node, n8n automatically creates the correct credential type for that node. If you select **Credentials > New**, you must browse for the credential type. To create a credential for a [custom API call](/integrations/custom-operations/), select **Google OAuth2 API**. This allows you to create a generic credential, then set its scopes.
2. Note the **OAuth Redirect URL** from the node credential modal. You'll need this in the next section.

	??? Details "View screenshot"
		![OAuth Callback URL](/_images/integrations/builtin/credentials/google/oauth_callback.png)

3. You must provide the scopes for this credential. Refer to [Scopes](#scopes) for more information.

### Set up OAuth in Google Cloud

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials){:target=_blank .external-link} and make sure you're in the project you want to use.

	??? Details "View screenshot"
		![Google project dropdown](/_images/integrations/builtin/credentials/google/check-google-project.png)

2. Select **+ CREATE CREDENTIALS > OAuth client ID**. .   

	??? Details "View screenshot"   
		![Create credentials](/_images/integrations/builtin/credentials/google/create-credentials.png)

3. In the **Application type** dropdown, select **Web application**. Google automatically generates a name.
4. Under **Authorizes redirect URIs**, select **+ ADD URI**. Paste in the OAuth redirect URL from the previous step.

	??? Details "View screenshot"   
		![Web application](/_images/integrations/builtin/credentials/google/application-web-application.png)
		
5. Select **CREATE**.
6. Enable each Google service API that you want to use:
	--8<-- "_snippets/integrations/builtin/credentials/google/enable-apis.md"

### Create and test your connection

In n8n:

1. Enter your new **Client ID** and **Client Secret** from Google Cloud Console in the credentials modal.
2. Select **Sign in with Google** to complete your Google authentication.
3. **Save** your new credentials.

The following video demonstrates the steps described above:

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/gZ6N2H3_vys" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Scopes

Many Google services have multiple possible access scopes. A scope limits what a user can do. Refer to [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes){:target=_blank .external-link} for a list of scopes for all services.

n8n doesn't support all scopes. When creating a generic Google OAuth2 API credential, you can enter scopes from the list. If you enter a scope that n8n doesn't already support, it won't work.

??? Details "Supported scopes"
	| Service | Available scopes |
	| ------- | ---------------- |
	| Gmail | 	https://www.googleapis.com/auth/gmail.labels <br /> https://www.googleapis.com/auth/gmail.addons.current.action.compose <br />	https://www.googleapis.com/auth/gmail.addons.current.message.action <br /> https://mail.google.com/ <br /> https://www.googleapis.com/auth/gmail.modify <br />	https://www.googleapis.com/auth/gmail.compose |
	| Google Ads | https://www.googleapis.com/auth/adwords |
	| Google Analytics | https://www.googleapis.com/auth/analytics <br /> https://www.googleapis.com/auth/analytics.readonly |
	| Google Big Query | https://www.googleapis.com/auth/bigquery |
	| Google Books | https://www.googleapis.com/auth/books |
	| Google Calendar | 	https://www.googleapis.com/auth/calendar <br /> https://www.googleapis.com/auth/calendar.events |
	| Google Cloud Natural Language | https://www.googleapis.com/auth/cloud-language <br /> https://www.googleapis.com/auth/cloud-platform |
	| Google Cloud Storage | https://www.googleapis.com/auth/cloud-platform <br /> https://www.googleapis.com/auth/cloud-platform.read-only <br /> https://www.googleapis.com/auth/devstorage.full_control <br /> https://www.googleapis.com/auth/devstorage.read_only <br /> https://www.googleapis.com/auth/devstorage.read_write |
	| Google Contacts | https://www.googleapis.com/auth/contacts |
	| Google Docs | https://www.googleapis.com/auth/documents <br /> https://www.googleapis.com/auth/drive <br /> https://www.googleapis.com/auth/drive.file |
	| Google Drive | https://www.googleapis.com/auth/drive <br /> https://www.googleapis.com/auth/drive.appdata <br /> https://www.googleapis.com/auth/drive.photos.readonly |
	| Google Firebase Cloud Firestore | https://www.googleapis.com/auth/datastore <br /> https://www.googleapis.com/auth/firebase |
	| Google Firebase Realtime Database | https://www.googleapis.com/auth/userinfo.email <br /> https://www.googleapis.com/auth/firebase.database <br /> https://www.googleapis.com/auth/firebase |
	| Google Perspective | https://www.googleapis.com/auth/userinfo.email |
	| Google Sheets | https://www.googleapis.com/auth/drive.file <br /> https://www.googleapis.com/auth/spreadsheets |
	| Google Slide | https://www.googleapis.com/auth/drive.file <br /> https://www.googleapis.com/auth/presentations |
	| Google Tasks | https://www.googleapis.com/auth/tasks |
	| Google Translate | https://www.googleapis.com/auth/cloud-translation |
	| GSuite Admin | https://www.googleapis.com/auth/admin.directory.group <br /> https://www.googleapis.com/auth/admin.directory.user <br /> https://www.googleapis.com/auth/admin.directory.domain.readonly <br /> https://www.googleapis.com/auth/admin.directory.userschema.readonly |

## Troubleshooting

### Google hasn't verified this app

--8<-- "_snippets/integrations/credentials/google/unverified-app.md"

