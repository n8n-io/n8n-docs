---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google OAuth2 generic
description: Documentation for generic OAuth2 Google credentials. Use these credentials to authenticate Google services in n8n, a workflow automation platform.
contentType: integration
---

# Google: OAuth2 generic

This document contains instructions for creating a generic OAuth2 Google credential for use with [custom operations](/integrations/custom-operations/).

--8<-- "_snippets/integrations/managed-google-oauth.md"

## Prerequisites

* Create a [Google Cloud](https://cloud.google.com/){:targe=_blank .external-link} account.

## Set up OAuth

There are five steps to connecting your n8n credential to Google services:

1. [Create a Google Cloud Console project](#create-a-google-cloud-console-project).
1. [Enable APIs](#enable-apis).
1. [Configure your OAuth consent screen](#configure-your-oauth-consent-screen).
1. [Create your Google OAuth client credentials](#create-your-google-oauth-client-credentials).
1. [Finish your n8n credential](#finish-your-n8n-credential).

### Create a Google Cloud Console project

First, create a Google Cloud Console project. If you already have a project, jump to the next section:

1. Log in to the [Google Cloud Console](https://console.cloud.google.com){:target=_blank .external-link} using your Google credentials.
2. In the top menu, select the project dropdown in the top navigation and select **New project** or go directly to the [New Project](https://console.cloud.google.com/projectcreate){:target=_blank .external-link} page.
3. Enter a **Project name** and select the **Location** for your project.
4. Select **Create**.
5. Check the top navigation and make sure the **Select a project** dropdown has your project selected. If not, select the project you just created.

	<figure markdown="span">
	![The project dropdown in the Google Cloud top navigation](/_images/integrations/builtin/credentials/google/google-cloud-project-dropdown.png)
	<figcaption>Check the project dropdown in the Google Cloud top navigation</figcaption>
	</figure>

### Enable APIs

With your project created, enable the APIs you'll need access to:

--8<-- "_snippets/integrations/builtin/credentials/google/enable-apis.md"

### Configure your OAuth consent screen

If you haven't used OAuth in your Google Cloud project before, you'll need to [configure the OAuth consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent){:target=_blank .external-link}:

1. Access your [Google Cloud Console - Library](https://console.cloud.google.com/apis/library){:target=_blank .external-link}. Make sure you're in the correct project.
	<figure markdown="span">
	![The project dropdown in the Google Cloud top navigation](/_images/integrations/builtin/credentials/google/google-cloud-project-dropdown.png)
	<figcaption>Check the project dropdown in the Google Cloud top navigation</figcaption>
	</figure>
1. Open the left navigation menu and go to **APIs & Services > OAuth consent screen**.
2. For **User Type**, select **Internal** for user access within your organization's Google workspace or **External** for any user with a Google account. Refer to Google's [User type documentation](https://support.google.com/cloud/answer/10311615#user-type&zippy=%2Cexternal%2Cinternal){:target=_blank .external-link} for more information on user types.
3. Select **Create**.
4. Enter the essential information:
	- **App name**
	- **User support email**
	- **Email addresses** field in **Developer contact information**
5. In the **Authorized domains** section, add `n8n.cloud` if using n8n's Cloud service. If you're [self-hosting](/hosting/), add the domain of your n8n instance.
7. Select **SAVE AND CONTINUE** to go to the **Scopes** page.
8. You don't need to set any scopes. Select **SAVE AND CONTINUE** again to go to the **Summary** page.
9. On the **Summary** page, review the information for accuracy.

### Create your Google OAuth client credentials

Next, create the OAuth client credentials in Google:

1. In the **APIs & Services** section, select **Credentials**.
2. Select **+ CREATE CREDENTIALS > OAuth client ID**.
3. In the **Application type** dropdown, select **Web application**.
4. Google automatically generates a **Name**. Update the **Name** to something you'll recognize in your console.
5. From your n8n credential, copy the **OAuth Redirect URL**. Paste it into the **Authorized redirect URIs** in Google Console.
6. Select **CREATE**.

### Finish your n8n credential

With the Google project and credentials fully configured, finish the n8n credential:

1. From Google's **OAuth client created** modal, copy the **Client ID**. Enter this in your n8n credential.
2. From the same Google modal, copy the **Client Secret**. Enter this in your n8n credential.
3. You must provide the scopes for this credential. Refer to [Scopes](#scopes) for more information. Enter multiple scopes in a space-separated list, for example:
	```
	https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.addons.current.action.compose
	```
4. In n8n, select **Sign in with Google** to complete your Google authentication.
5. **Save** your new credentials.

## Video

The following video demonstrates the steps described above:


<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/gZ6N2H3_vys" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Scopes

Google services have one or more possible access scopes. A scope limits what a user can do. Refer to [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes){:target=_blank .external-link} for a list of scopes for all services.

n8n doesn't support all scopes. When creating a generic Google OAuth2 API credential, you can enter scopes from the **Supported scopes** list below. If you enter a scope that n8n doesn't already support, it won't work.

??? Details "Supported scopes"
	| Service | Available scopes |
	| ------- | ---------------- |
	| Gmail | 	https://www.googleapis.com/auth/gmail.labels <br /> https://www.googleapis.com/auth/gmail.addons.current.action.compose <br />	https://www.googleapis.com/auth/gmail.addons.current.message.action <br /> https://mail.google.com/ <br /> https://www.googleapis.com/auth/gmail.modify <br />	https://www.googleapis.com/auth/gmail.compose |
	| Google Ads | https://www.googleapis.com/auth/adwords |
	| Google Analytics | https://www.googleapis.com/auth/analytics <br /> https://www.googleapis.com/auth/analytics.readonly |
	| Google BigQuery | https://www.googleapis.com/auth/bigquery |
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

--8<-- "_snippets/integrations/builtin/credentials/google/unverified-app.md"

### Google Cloud app becoming unauthorized

--8<-- "_snippets/integrations/builtin/credentials/google/app-becoming-unauthorized.md"