# Mattermost

You can use these credentials to authenticate the following nodes with Mattermost.

- [Mattermost](/integrations/nodes/n8n-nodes-base.mattermost/)

## Prerequisites

- Create a [Mattermost](https://www.mattermost.com/) account.

**Note:** A system administrator has to grant permission to the user to generate an access token. Refer to the [FAQs](#_1-how-to-grant-permissions-to-the-users-to-generate-access-tokens) to learn how a system administrator can grant this permission.

## Using Access Token

1. Click on your username on the top left corner and select 'Account Settings' from the dropdown list.
2. Click on the ***Security*** tab.
3. Click on ***Edit*** in the ***Personal Access Tokens*** section.
4. Click on the ***Create Token*** button.
5. Enter a description in the ***Token Description*** field.
6. Click on the ***Save*** button.
7. Click on the ***Yes, Create*** button.
8. Use this ***Acess Token*** with your Mattermost node credentials in n8n.

![Generating Access Token](/_images/integrations/credentials/mattermost/using-access-token.gif)

## FAQs

### How to grant permissions to the users to generate access tokens?

A system admin has to grant permissions to the users for the user to create access tokens. If you're a system admin, follow the steps mentioned below.

1. Click on your username on the top left corner and select 'System Console' from the dropdown list.
2. Click on ***Integration Management*** under the ***INTEGRATIONS*** section on the left sidebar.
3. Go to Integration Management.
4. Scroll down to the ***Enable Personal Access Tokens*** and enable personal access tokens.
5. Click on the ***Save*** button.
6. Click on ***Users*** under the ***USER MANAGEMENT*** section on the left sidebar.
7. Personal access tokens are generated for individual users, so they must be enabled for each user. Click on ***Member*** next to the user you want to grant permission to, and select 'Manage Roles' from the dropdown list.
8. Check the ***Allow this account to generate personal access tokens*** checkbox.
9. Select any additional permissions you want to grant the user and click on the ***Save*** button.

**Note:** You may also create a bot account and apply the same for it.

The user can now generate a personal access token by going to  their account settings and following the steps mentioned [above](#using-access-token).

![Granting permission to user](/_images/integrations/credentials/mattermost/granting-permission.gif)



- [Personal Access Tokens](https://docs.mattermost.com/developer/personal-access-tokens.html)
