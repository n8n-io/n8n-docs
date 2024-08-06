---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
title: WhatsApp Business Cloud credentials
description: Documentation for WhatsApp Business Cloud credentials. Use these credentials to authenticate WhatsApp Business Cloud in n8n, a workflow automation platform.
contentType: integration
priority: high
---

# WhatsApp Business Cloud credentials

You can use these credentials to authenticate the following nodes:

- [WhatsApp Business Cloud](/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/)
- [WhatsApp Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger/)

## Prerequisites

- Create a [Meta developer](https://developers.facebook.com/docs/development/register){:target=_blank .external-link} account.
- Create a Meta [business app](https://developers.facebook.com/docs/development/create-an-app/){:target=_blank .external-link}.
    - WhatsApp messaging services require a Meta business portfolio, formerly called a Business Manager account. The UI may still show either option. Refer to Meta's [Create a business portfolio documentation](https://www.facebook.com/business/help/1710077379203657?id=180505742745347){:target=_blank .external-link} for detailed instructions.

See each supported authentication method below for more detailed instructions on creating the app.

## Supported authentication methods

- API key: Use for the [WhatsApp Business Cloud](/integrations/builtin/app-nodes/n8n-nodes-base.whatsapp/) node.
- OAuth2: Use for the [WhatsApp Trigger](/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger/) node.

## Related resources

Refer to [WhatsApp's API documentation](https://developers.facebook.com/docs/whatsapp/#platform-apis){:target=_blank .external-link} for more information about the service.

Meta classifies users who create WhatsApp business apps as Tech Providers; refer to Meta's [Get Started for Tech Providers](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers){:target=_blank .external-link} for more information.

## Using API key

To configure this credential, you'll need:

- An API **Access Token**: Generated when you create a Meta app with WhatsApp as the product.
- A **Business Account ID**: Generated for all WhatsApp Business accounts. You can view yours in **Business Manager** > **Business Settings** > **Accounts** > **WhatsApp Business Accounts** and view your account details, or copy it from the Meta app you create.

To generate an access token, create a Meta app with WhatsApp as the product. To create the app:

1. From the Meta for Developers [Apps dashboard](https://developers.facebook.com/apps/){:target=_blank .external-link}, select **Create App**.
2. Select **Business**. If you don't see that option:
    1. Select **Other**.
    2. For **App type**, select **Business**, then select **Next**.
3. Enter a **name** for your app.
4. Enter a contact **email address**.
5. Select **Create app**. Refer to [Create a Meta app](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers#step-2--create-a-meta-app){:target=_blank .external-link} for more detail on the above steps.
6. In **Add products to your app**, select **Set up** in the WhatsApp tile. Refer to [Add the WhatsApp Product](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers#step-3--add-the-whatsapp-product){:target=_blank .external-link} for more detail.
7. This opens the WhatsApp **Quickstart** page. Either select an existing business portfolio or create a new one.
8. Select **Continue**.
9. Go to **App settings** > **Basic**.
10. Set the **Privacy Policy URL** and **Terms of Service URL** for the app.
10. Change the **App Mode** to **Live**.
11. Open the **API Setup** page either from the app navigation or from the **Start Using API** on the **Quickstart** page.
12. Copy the **Temporary access token** and add it to n8n as the **Access Token**.
13. Copy the **WhatsApp Business Account ID** and add it to n8n as the **Business Account ID**.

Refer to [Test Business Messaging on WhatsApp](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers#step-4--test-business-messaging-on-whatsapp){:target=_blank .external-link} for more information on the above steps.

Fully verifying and launching your app will take further configuration. Refer to Meta's [Get Started for Tech Providers](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers#step-5--scale-your-solution){:target=_blank .external-link} Steps 5 and beyond for more information. Refer to [App Review](https://developers.facebook.com/docs/resp-plat-initiatives/app-review){:target=_blank .external-link} for more information on the Meta App Review process.

## Using OAuth2

To configure this credential, you'll need:

- A **Client ID**: Generated once you create a Meta app with WhatsApp as the product.
- A **Client Secret**: Generated once you create a Meta app with WhatsApp as the product.

To generate both, create a Meta app with WhatsApp as the product. To create the app:

1. From the Meta for Developers [Apps dashboard](https://developers.facebook.com/apps/){:target=_blank .external-link}, select **Create App**.
2. Select **Business**. If you don't see that option:
    1. Select **Other**.
    2. For **App type**, select **Business**, then select **Next**.
3. Enter a **name** for your app.
4. Enter a contact **email address**.
5. Select **Create app**. Refer to [Create a Meta app](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers#step-2--create-a-meta-app){:target=_blank .external-link} for more detail on the above steps.
6. In **Add products to your app**, select **Set up** in the WhatsApp tile. Refer to [Add the WhatsApp Product](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers#step-3--add-the-whatsapp-product){:target=_blank .external-link} for more detail.
7. This opens the WhatsApp **Quickstart** page. Either select an existing business portfolio or create a new one.
8. Select **Continue**.
9. Go to **App settings** > **Basic**.
10. Set the **Privacy Policy URL** and **Terms of Service URL** for the app.
10. Change the **App Mode** to **Live**.
11. Go to **App settings** > **Basic**.
12. Copy the **App ID** and enter it as the **Client ID** within the n8n credential.
13. Copy the **App Secret** and enter it as the **Client Secret** within the n8n credential.

Fully verifying and launching your app will take further configuration. Refer to Meta's [Get Started for Tech Providers](https://developers.facebook.com/docs/whatsapp/solution-providers/get-started-for-tech-providers#step-5--scale-your-solution){:target=_blank .external-link} Steps 5 and beyond for more information. Refer to [App Review](https://developers.facebook.com/docs/resp-plat-initiatives/app-review){:target=_blank .external-link} for more information on the Meta App Review process.
