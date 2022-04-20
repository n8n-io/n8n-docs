# Strapi

You can use these credentials to authenticate the following nodes with Strapi.
- [Strapi](/workflow/integrations/nodes/workflow-nodes-base.strapi/)

## Prerequisites

Install [Strapi](https://strapi.io/documentation/v3.x/getting-started/installation.html) on your server.

## Using API

1. Access your Strapi Admin dashboard.
2. Click on ***Settings*** in the left sidebar.
3. Click on ***Roles*** under the ***USERS & PERMISSIONS PLUGIN*** section.
4. Click on the pencil icon next to the role you want to edit.
5. In the ***Permissions*** section, give the required permissions.
6. Click on the ***Save*** button.
7. Click on ***Users*** in the left sidebar.
8. Click on the ***+ Add New user*** button.
9. Enter the required information.
10. Click on ***ON*** for the ***Confirmed*** field.
11. Select the role that you set the permissions for in the previous steps from the ***Role*** dropdown list.
12. Click on the ***Save*** button.
13. Use this email, password, and the URL of your Strapi instance with your Strapi node credentials in n8n.

![Getting Strapi credentials](/_images/integrations/credentials/strapi/using-api.gif)
