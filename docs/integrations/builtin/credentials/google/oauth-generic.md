---
title: Google OAuth2 generic
description: Documentation for generic OAuth2 Google credentials. Use these credentials to authenticate Google services in n8n, a workflow automation platform.
contentType: [integration, reference]
---

# Google: OAuth2 generic

This document contains instructions for creating a generic OAuth2 Google credential for use with [custom operations](/integrations/custom-operations.md).

--8<-- "_snippets/integrations/managed-google-oauth.md"

## Prerequisites

* Create a [Google Cloud](https://cloud.google.com/) account.

## Set up OAuth

There are five steps to connecting your n8n credential to Google services:

1. [Create a Google Cloud Console project](#create-a-google-cloud-console-project).
1. [Enable APIs](#enable-apis).
1. [Configure your OAuth consent screen](#configure-your-oauth-consent-screen).
1. [Create your Google OAuth client credentials](#create-your-google-oauth-client-credentials).
1. [Finish your n8n credential](#finish-your-n8n-credential).

### Create a Google Cloud Console project

First, create a Google Cloud Console project. If you already have a project, jump to the [next section](#enable-apis):

--8<-- "_snippets/integrations/builtin/credentials/google/create-google-cloud-project.md"

### Enable APIs

With your project created, enable the APIs you'll need access to:

--8<-- "_snippets/integrations/builtin/credentials/google/enable-apis.md"

### Configure your OAuth consent screen

If you haven't used OAuth in your Google Cloud project before, you'll need to [configure the OAuth consent screen](https://developers.google.com/workspace/guides/configure-oauth-consent):

1. Access your [Google Cloud Console - Library](https://console.cloud.google.com/apis/library). Make sure you're in the correct project.
	<figure markdown="span">
	![The project dropdown in the Google Cloud top navigation](/_images/integrations/builtin/credentials/google/google-cloud-project-dropdown.png)
	<figcaption>Check the project dropdown in the Google Cloud top navigation</figcaption>
	</figure>
1. Open the left navigation menu and go to **APIs & Services > OAuth consent screen**. Google will redirect you to the Google Auth Platform overview page.
1. Select **Get started** on the **Overview** tab to begin configuring OAuth consent.
1. Enter an **App name** and **User support email** to include on the Oauth screen. Select **Next** to continue.
1. For the **Audience**, select **Internal** for user access within your organization's Google workspace or **External** for any user with a Google account. Refer to Google's [User type documentation](https://support.google.com/cloud/answer/15549945?sjid=17061891731152303663-EU#user-type) for more information on user types. Select **Next** to continue.
1. Select the **Email addresses** Google should use to contact you about changes to your project. Select **Next** to continue.
1. Read and accept the Google's User Data Policy. Select **Continue** and then select **Create**.
1. In the left-hand menu, select **Branding**.
1. In the **Authorized domains** section, select **Add domain**:
	* If you're using n8n's Cloud service, add `n8n.cloud`
	* If you're [self-hosting](/hosting/index.md), add the domain of your n8n instance.
1. Select **Save** at the bottom of the page.

### Create your Google OAuth client credentials

Next, create the OAuth client credentials in Google:

1. Access your [Google Cloud Console](https://console.cloud.google.com/). Make sure you're in the correct project.
1. In the **APIs & Services** section, select [**Credentials**](https://console.cloud.google.com/apis/credentials).
1. Select **+ Create credentials** > **OAuth client ID**.
1. In the **Application type** dropdown, select **Web application**.
1. Google automatically generates a **Name**. Update the **Name** to something you'll recognize in your console.
1. From your n8n credential, copy the **OAuth Redirect URL**. Paste it into the **Authorized redirect URIs** in Google Console.
1. Select **Create**.

### Finish your n8n credential

With the Google project and credentials fully configured, finish the n8n credential:

1. From Google's **OAuth client created** modal, copy the **Client ID**. Enter this in your n8n credential.
1. From the same Google modal, copy the **Client Secret**. Enter this in your n8n credential.
1. You must provide the scopes for this credential. Refer to [Scopes](#scopes) for more information. Enter multiple scopes in a space-separated list, for example:
	```
	https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.addons.current.action.compose
	```
1. In n8n, select **Sign in with Google** to complete your Google authentication.
1. **Save** your new credentials.

## Video

The following video demonstrates the steps described above:

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/FBGtpWMTppw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Scopes

Google services have one or more possible access scopes. A scope limits what a user can do. Refer to [OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes) for a list of scopes for all services.

n8n doesn't support all scopes. When creating a generic Google OAuth2 API credential, you can enter scopes from the **Supported scopes** list below. If you enter a scope that n8n doesn't already support, it won't work.

??? Details "Supported scopes"
	| Service                              | Available scopes                                                                                                                                                                                                                                                                                                                                                               |
	|--------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
	| Gmail                                | <ul><li>`https://www.googleapis.com/auth/gmail.labels`</li><li>`https://www.googleapis.com/auth/gmail.addons.current.action.compose`</li><li>`https://www.googleapis.com/auth/gmail.addons.current.message.action`</li><li>`https://mail.google.com/`</li><li>`https://www.googleapis.com/auth/gmail.modify`</li><li>`https://www.googleapis.com/auth/gmail.compose`</li></ul> |
	| Google Ads                           | <ul><li>`https://www.googleapis.com/auth/adwords`</li></ul>                                                                                                                                                                                                                                                                                                                    |
	| Google Analytics                     | <ul><li>`https://www.googleapis.com/auth/analytics`</li><li>`https://www.googleapis.com/auth/analytics.readonly`</li></ul>                                                                                                                                                                                                                                                     |
	| Google BigQuery                      | <ul><li>`https://www.googleapis.com/auth/bigquery`</li></ul>                                                                                                                                                                                                                                                                                                                   |
	| Google Books                         | <ul><li>`https://www.googleapis.com/auth/books`</li></ul>                                                                                                                                                                                                                                                                                                                      |
	| Google Calendar                      | <ul><li>`https://www.googleapis.com/auth/calendar`</li><li>`https://www.googleapis.com/auth/calendar.events`</li></ul>                                                                                                                                                                                                                                                         |
	| Google Cloud<br> Natural Language    | <ul><li>`https://www.googleapis.com/auth/cloud-language`</li><li>`https://www.googleapis.com/auth/cloud-platform`</li></ul>                                                                                                                                                                                                                                                    |
	| Google Cloud<br>Storage              | <ul><li>`https://www.googleapis.com/auth/cloud-platform`</li><li>`https://www.googleapis.com/auth/cloud-platform.read-only`</li><li>`https://www.googleapis.com/auth/devstorage.full_control`</li><li>`https://www.googleapis.com/auth/devstorage.read_only`</li><li>`https://www.googleapis.com/auth/devstorage.read_write`</li></ul>                                         |
	| Google Contacts                      | <ul><li>`https://www.googleapis.com/auth/contacts`</li></ul>                                                                                                                                                                                                                                                                                                                   |
	| Google Docs                          | <ul><li>`https://www.googleapis.com/auth/documents`</li><li>`https://www.googleapis.com/auth/drive`</li><li>`https://www.googleapis.com/auth/drive.file`</li></ul>                                                                                                                                                                                                             |
	| Google Drive                         | <ul><li>`https://www.googleapis.com/auth/drive`</li><li>`https://www.googleapis.com/auth/drive.appdata`</li><li>`https://www.googleapis.com/auth/drive.photos.readonly`</li></ul>                                                                                                                                                                                              |
	| Google Firebase<br>Cloud Firestore   | <ul><li>`https://www.googleapis.com/auth/datastore`</li><li>`https://www.googleapis.com/auth/firebase`</li></ul>                                                                                                                                                                                                                                                               |
	| Google Firebase<br>Realtime Database | <ul><li>`https://www.googleapis.com/auth/userinfo.email`</li><li>`https://www.googleapis.com/auth/firebase.database`</li><li>`https://www.googleapis.com/auth/firebase`</li></ul>                                                                                                                                                                                              |
	| Google Perspective                   | <ul><li>`https://www.googleapis.com/auth/userinfo.email`</li></ul>                                                                                                                                                                                                                                                                                                             |
	| Google Sheets                        | <ul><li>`https://www.googleapis.com/auth/drive.file`</li><li>`https://www.googleapis.com/auth/spreadsheets`</li></ul>                                                                                                                                                                                                                                                          |
	| Google Slide                         | <ul><li>`https://www.googleapis.com/auth/drive.file`</li><li>`https://www.googleapis.com/auth/presentations`</li></ul>                                                                                                                                                                                                                                                         |
	| Google Tasks                         | <ul><li>`https://www.googleapis.com/auth/tasks`</li></ul>                                                                                                                                                                                                                                                                                                                      |
	| Google Translate                     | <ul><li>`https://www.googleapis.com/auth/cloud-translation`</li></ul>                                                                                                                                                                                                                                                                                                          |
	| GSuite Admin                         | <ul><li>`https://www.googleapis.com/auth/admin.directory.group`</li><li>`https://www.googleapis.com/auth/admin.directory.user`</li><li>`https://www.googleapis.com/auth/admin.directory.domain.readonly`</li><li>`https://www.googleapis.com/auth/admin.directory.userschema.readonly`</li></ul>                                                                               |

## Troubleshooting

### Google hasn't verified this app

--8<-- "_snippets/integrations/builtin/credentials/google/unverified-app.md"

### Google Cloud app becoming unauthorized

--8<-- "_snippets/integrations/builtin/credentials/google/app-becoming-unauthorized.md"
