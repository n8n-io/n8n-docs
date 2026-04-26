---
title: Google OAuth2 single service
description: Documentation for single service OAuth2 Google credentials. Use these credentials to authenticate Google in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: critical
---

# Google: OAuth2 single service

This document contains instructions for creating a Google credential for a single service. They're also available as a [video](#video).

## Prerequisites

* Create a [Google Cloud](https://cloud.google.com/) account.

## Managed OAuth2

n8n Cloud users can use **Managed OAuth2** for the following nodes:

--8<-- "_snippets/integrations/managed-google-oauth.md"

To use **Managed OAuth2**, just click **Sign in with Google** in the credentials screen. No more setup is required in the Google Cloud Console or elsewhere.

![Managed OAuth2 credentials screen](/_images/integrations/builtin/credentials/google/managed-oauth.png)

If you prefer to use Custom OAuth2, use the dropdown to change the authentication type.

## Custom OAuth2

Managed OAuth2 isn't available for self-hosted n8n users, nor for Google nodes not listed [above](#managed-oauth2). You must create a custom OAuth2 single service credential. This means creating an app in the Google Cloud Console and connecting it to n8n with a Client ID and Client Secret.

The rest of this document covers the full process.

## Set up Custom OAuth2

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
1. In n8n, select **Sign in with Google** to complete your Google authentication.
1. **Save** your new credentials.

## Video

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/FBGtpWMTppw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Troubleshooting

### Google hasn't verified this app

--8<-- "_snippets/integrations/builtin/credentials/google/unverified-app.md"

### Google Cloud app becoming unauthorized

--8<-- "_snippets/integrations/builtin/credentials/google/app-becoming-unauthorized.md"

## Local development and testing

If you're running n8n on your local machine, you don't need a public domain,
SSL certificate, or port forwarding to use Google OAuth. Google allows
`localhost` as a valid redirect URI for development purposes.

Your n8n OAuth redirect URL will look something like this: http://localhost:5678/rest/oauth2-credential/callback

Add this URL to the **Authorized redirect URIs** field in your Google Cloud
Console OAuth client settings. For more details on acceptable redirect URIs,
refer to [Google's redirect URI documentation](https://support.google.com/cloud/answer/15549257?hl=en#zippy=%2Cweb-applications).

### Testing mode and test users

By default, new Google Cloud projects are in **Testing** mode. In this mode,
only accounts you manually add as test users can complete the OAuth flow —
everyone else will see an "app not verified" or access denied screen.

To add test users:

1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Go to **APIs & Services** > **OAuth consent screen**.
3. Scroll down to the **Test users** section.
4. Select **Add users** and enter the Gmail address(es) you want to allow.

Refer to [Google's consent screen guide](https://developers.google.com/workspace/guides/configure-oauth-consent)
for more detail on test users.

/// note | When to publish your app
If you want any Google account (not just test users) to authenticate, you'll
need to publish your OAuth app. Apps requesting sensitive scopes go through
Google's review process. For personal use or internal tooling, staying in
Testing mode is usually fine.
///

## OAuth scopes

When connecting Google services to workflows — especially AI agent workflows —
it's good practice to request only the scopes your workflow actually needs.
Overly broad scopes increase the risk of unintended data access or modification
if a workflow behaves unexpectedly.

For example, if your workflow only needs to read calendar events, use: https://www.googleapis.com/auth/calendar.readonly

Instead of the broader: https://www.googleapis.com/auth/calendar

You can find the full list of available scopes for each Google service in the
[OAuth 2.0 Scopes for Google APIs](https://developers.google.com/identity/protocols/oauth2/scopes) reference.

## Troubleshooting

### redirect_uri_mismatch

This error means the redirect URI n8n is sending doesn't match any of the
URIs registered in your Google Cloud Console OAuth client.

**Fix:** Copy the **OAuth Redirect URL** from your n8n credential panel and
paste it exactly — including the protocol (`http` or `https`) and port number —
into the **Authorized redirect URIs** field of your Google OAuth client.

### Access denied / "app not verified"

This usually happens when your app is still in Testing mode and the Google
account you're trying to authenticate with hasn't been added as a test user.

**Fix:** Go to **APIs & Services** > **OAuth consent screen** > **Test users**
and add the account you're trying to use.

### invalid_client

This error typically means the Client ID or Client Secret in your n8n
credential doesn't match what's in Google Cloud Console.

**Fix:** Go back to your OAuth client in Google Cloud Console, copy both
values fresh, and re-enter them in n8n. Watch out for accidental spaces when
copying.
