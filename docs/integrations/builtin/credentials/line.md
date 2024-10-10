---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: Line credentials
description: Documentation for Line credentials. Use these credentials to authenticate the Line node in n8n, a workflow automation platform.
contentType: integration
priority: medium
---

# Line credentials

<!-- vale off -->
/// warning | Deprecated: End of service
LINE Notify is discontinuing service as of April 1st 2025 and this node will no longer work after that date. View LINE Notify's [end of service announement](https://notify-bot.line.me/closing-announce){:target=_blank .external-link} for more information.
///
<!-- vale on -->

You can use these credentials to authenticate the following nodes:

- [Line](/integrations/builtin/app-nodes/n8n-nodes-base.line/)

## Supported authentication methods

- Notify OAuth2

## Related resources

Refer to [Line Notify's API documentation](https://notify-bot.line.me/doc/en/){:target=_blank .external-link} for more information about the service.

## Using Notify OAuth2

To configure this credential, you'll need a [Line](https://line.me/en/){:target=_blank .external-link} account and:

- A **Client ID**
- A **Client Secret**

To generate both, connect Line with [Line Notify](https://notify-bot.line.me/en/){:target=_blank .external-link}. Then:

1. Open the Line Notify page to [add a new service](https://notify-bot.line.me/my/services/new){:target=_blank .external-link}.
1. Enter a **Service name**. This name displays when someone tries to connect to the service.
1. Enter a **Service description**.
1. Enter a **Service URL**
1. Enter your **Company/Enterprise**.
1. Select your **Country/region**.
1. Enter your name or team name as the **Representative**.
1. Enter a valid **Email address**. Line will verify this email address before the service is fully registered. Use an email address you have ready access to.
1. Copy the **OAuth Redirect URL** from your n8n credential and enter it as the **Callback URL** in Line Notify.
1. Select **Agree and continue** to agree to the terms of service.
1. Verify the information you entered is correct and select **Add**.
1. Check your email and open the Line Notify Registration URL to verify your email address.
1. Once verification is complete, open [**My services**](https://notify-bot.line.me/my/services/){:target=_blank .external-link}.
1. Select the service you just added.
1. Copy the **Client ID** and enter it in your n8n credential.
1. Select the option to **Display** the **Client Secret**. Copy the **Client Secret** and enter it in your n8n credential.
1. In n8n, select **Connect my account** and follow the on-screen prompts to finish the credential.

Refer to the Authentication section of [Line Notify's API documentation](https://notify-bot.line.me/doc/en/){:target=_blank .external-link} for more information.
