---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Google OAuth2 single service
description: Documentation for single service OAuth2 Google credentials. Use these credentials to authenticate Google in n8n, a workflow automation platform.
contentType: integration
priority: critical
---

# Google: OAuth2 single service

This document contains instructions for creating a Google credential for a single service. They're also available as a [video](#video).

--8<-- "_snippets/integrations/managed-google-oauth.md"

## Prerequisites

* Create a [Google Cloud](https://cloud.google.com/){:target=_blank .external-link} account.

## Set up OAuth

There are five steps to connecting your n8n credential to Google services:

1. [Create a Google Cloud Console project](#create-a-google-cloud-console-project).
1. [Enable APIs](#enable-apis).
1. [Configure your OAuth consent screen](#configure-your-oauth-consent-screen).
1. [Create your Google OAuth client credentials](#create-your-google-oauth-client-credentials).
1. [Finish your n8n credential](#finish-your-n8n-credential).

### Create a Google Cloud Console project

First, create a Google Cloud Console project. If you already have a project, jump to the next section:

--8<-- "_snippets/integrations/builtin/credentials/google/create-google-cloud-project.md"

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
2. In n8n, select **Sign in with Google** to complete your Google authentication.
3. **Save** your new credentials.

## Video

<div class="video-container">
<iframe width="840" height="472.5" src="https://www.youtube.com/embed/gZ6N2H3_vys" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Troubleshooting

### Google hasn't verified this app

--8<-- "_snippets/integrations/builtin/credentials/google/unverified-app.md"

### Google Cloud app becoming unauthorized

--8<-- "_snippets/integrations/builtin/credentials/google/app-becoming-unauthorized.md"

