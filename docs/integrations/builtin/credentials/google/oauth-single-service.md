---
title: Google OAuth2 single service
description: Documentation for single service OAuth2 Google credentials. Use these credentials to authenticate Google in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: critical
---

# Google: OAuth2 single service

This document contains instructions for creating a Google credential for a single service. They're also available as a [video](#video).

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
1. **If you're self-hosting:** From your n8n credential, copy the **OAuth Redirect URL**. Paste it into the **Authorized redirect URIs** in Google Console. 
If you're using **n8n cloud**, you can leave this field empty as the OAuth setup is pre-configured, and the callback URL is fixed for that configuration.
1. Select **Create**.

### Finish your n8n credential

With the Google project and credentials fully configured, finish the n8n credential:
- If **self-hosted:**

1. From Google's **OAuth client created** modal, copy the **Client ID**. Enter this in your n8n credential.
1. From the same Google modal, copy the **Client Secret**. Enter this in your n8n credential.
- **If n8n cloud:**
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

