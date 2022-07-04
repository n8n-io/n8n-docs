# HaloPSA

You can use these credentials to authenticate the following nodes with HaloPSA.
- [HaloPSA](/workflow/integrations/nodes/workflow-nodes-base.haloPSA/)

## Prerequisites

Create a [HaloPSA](https://halopsa.com/) account.

## Allow your application to use the API:

1. Access your HaloPSA dashboard.
2. Click on the **Configuration** link in the left panel.
3. Under the **Integrations** menu entry, click on **HaloPSA API**.
4. In the **API Details** section you find the values **Resource Server**, **Authorisation Server**, and **Tenant**.
5. In the **Applications** section click on the **View Applications** button.
6. Click on the **New** button to register a new application or click on an existing one and then the **Edit** button to edit it.
7. Enter a name for your application (for example `n8n`).
8. Choose `Client ID and Secret (Services)` as the **Authentication Method**.
9. Make a note of both the **Client ID** and the **Client Secret**. The Client Secret will only be shown once and you will need to generate a new one when lost.
10. Select `Agent` as your **Login Type** and one of your agents in the **Agent to log in as** field.
11. On the **Permissions** tab, tick `all` and hit the **Save** button.
12. On n8n's HaloPSA credentials screen, fill in the values obtained in the previous steps. The **Tenant** field will be accessible only when the **Hosting Type** is set to `Hosted Solution of Halo`.

![A workflow with the HaloPSA node](/_images/integrations/credentials/halopsa/halopsa-n8n-credentials.jpg)

!['Resource Server', 'Authorisation Server', 'and Tenant'](/_images/integrations/credentials/halopsa/halopsa-credentials-1.jpg)
!['Cliend ID' and 'Client Secret'](/_images/integrations/credentials/halopsa/halopsa-credentials-2.jpg)
