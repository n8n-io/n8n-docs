---
title: WhatsApp Business Cloud credentials
description: Documentation for WhatsApp Business Cloud credentials. Use these credentials to authenticate WhatsApp Business Cloud in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: high
---

# WhatsApp Business Cloud credentials

You can use these credentials to authenticate the following nodes:

- [WhatsApp Business Cloud](/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/index.md)
- [WhatsApp Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger.md)

## Requirements

To create credentials for WhatsApp, you need the following Meta assets:

- A [Meta developer](https://developers.facebook.com/docs/development/register) account: A developer account allows you to create and manage Meta apps, including WhatsApp integrations.
??? note "Set up a Meta developer account"
	1. Visit the [Facebook Developers site](https://developers.facebook.com).
	2. Click **Getting Started** in the upper-right corner (if the link says **My Apps**, you've already set up a developer account).
	3. Agree to terms and conditions.
	4. Provide a phone number for verification.
	5. Select your occupation or role.
- A Meta [business portfolio](https://www.facebook.com/business/help/1710077379203657?id=180505742745347): WhatsApp messaging services require a Meta business portfolio, formerly called a Business Manager account. The UI may still show either option.
??? note "Set up a Meta business portfolio"
	1. Visit the [Facebook Business site](https://business.facebook.com).
	2. Select **Create an account**.
		* If you already have a Facebook Business account and portfolio, but want a new portfolio, open the business portfolio selector in the left-side menu and select **Create a business portfolio**.
	3. Enter a **Business portfolio name**.
	4. Enter your **name**.
	5. Enter a **business email**.
	6. Select **Submit** or **Create**.
- A Meta [business app](https://developers.facebook.com/docs/development/create-an-app/) configured with WhatsApp: Once you have a developer account, you will create a Meta business app.
??? note "Set up a Meta business app with WhatsApp"
	1. Visit the [Meta for Developers Apps dashboard](https://developers.facebook.com/apps/)
	2. Select **Create app**.
	3. In **Add products to your app**, select **Set up** in the WhatsApp tile. Refer to [Add the WhatsApp Product](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers#step-3--add-the-whatsapp-product) for more detail.
	4. This opens the WhatsApp **Quickstart** page. Select your business portfolio.
	5. Select **Continue**.
	6. In the left-side menu, go to **App settings** > **Basic**.
	7. Set the **Privacy Policy URL** and **Terms of Service URL** for the app.
	8. Change the **App Mode** to **Live**.


## Supported authentication methods

- API key: Use for the [WhatsApp Business Cloud](/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/index.md) node.
- OAuth2: Use for the [WhatsApp Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger.md) node.

## Related resources

Refer to [WhatsApp's API documentation](https://developers.facebook.com/docs/whatsapp/#platform-apis) for more information about the service.

Meta classifies users who create WhatsApp business apps as Tech Providers; refer to Meta's [Get Started for Tech Providers](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers) for more information.

## Using API key

You need WhatsApp API key credentials to use the [WhatsApp Business Cloud](/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/index.md) node.

To configure this credential, you'll need:

- An API **Access Token**
- A **Business Account ID**

To generate an access token, follow these steps:

1. Visit the [Meta for Developers Apps dashboard](https://developers.facebook.com/apps/).
2. Select your Meta app.
3. In the left-side menu, select **WhatsApp** > **API Setup**.
4. Select **Generate access token** and confirm the access you want to grant.
5. Copy the **Access token** and add it to n8n as the **Access Token**.
6. Copy the **WhatsApp Business Account ID** and add it to n8n as the **Business Account ID**.

Refer to [Test Business Messaging on WhatsApp](https://developers.facebook.com/docs/whatsapp/solution-providers/become-a-tech-provider-legacy-flow#step-4--test-business-messaging-on-whatsapp) for more information on the above steps.

Fully verifying and launching your app will take further configuration. Refer to Meta's [Get Started for Tech Providers](https://developers.facebook.com/docs/whatsapp/solution-providers/become-a-tech-provider-legacy-flow#step-5--scale-your-solution) Steps 5 and beyond for more information. Refer to [App Review](https://developers.facebook.com/docs/resp-plat-initiatives/app-review) for more information on the Meta App Review process.

## Using OAuth2

You need WhatsApp OAuth2 credentials to use the [WhatsApp Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger.md) node.

To configure this credential, you'll need:

- A **Client ID**
- A **Client Secret**

To retrieve these items, follow these steps:

1. Visit the [Meta for Developers Apps dashboard](https://developers.facebook.com/apps/).
2. Select your Meta app.
3. In the left-side menu, select **App settings** > **Basic**.
4. Copy the **App ID** and enter it as the **Client ID** within the n8n credential.
5. Copy the **App Secret** and enter it as the **Client Secret** within the n8n credential.

Fully verifying and launching your app will take further configuration. Refer to Meta's [Get Started for Tech Providers](https://developers.facebook.com/docs/whatsapp/solution-providers/become-a-tech-provider-legacy-flow#step-5--scale-your-solution) Steps 5 and beyond for more information. Refer to [App Review](https://developers.facebook.com/docs/resp-plat-initiatives/app-review) for more information on the Meta App Review process.
