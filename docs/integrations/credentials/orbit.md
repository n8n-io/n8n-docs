# Orbit

You can use these credentials to authenticate the following nodes with Orbit.

- [Orbit](/integrations/nodes/n8n-nodes-base.orbit/)

## Prerequisites

Create an [Orbit](https://app.orbit.love/) account.

There are two types of API Token available:

- User API Tokens are scoped to your Orbit user account, and actions performed using it will be attributed to you.
- Workspace API Tokens are scope to your Orbit workspace and are shared between workspace owners. Actions performed using it will not be attributed to any one indivudual.

## Which API Token to use

We recommend using a Workspace API Token for n8n as this gives you more control over key management and revocation. Use a User API Token if you specifically want activities created by n8n to be attributed to an individual team member.

## Using a User API Token

1. Access your [Account Settings page](https://app.orbit.love/user/edit).
2. Scroll down to the **_API Token_** section.
3. Click on the **_Copy_** button to copy the API Token.
4. Use this **_API Token_** in with your Orbit node credentials in n8n.

![Getting Orbit credentials](/_images/integrations/credentials/orbit/orbit-user-api-token.gif)

## Using a Workspace API Token

1. Access the Workspace Settings page.
2. Scroll down to the **_API Tokens_** section.
3. Click on the **_New API Token_** button to create a new Token.
4. Name the token **_n8n_** and provide a description of what the token will be used for.
5. Click on **_n8n_** in the list of API Tokens.
6. Click on the **_Copy_** button to copy the API Token.
7. Use this **_API Token_** in with your Orbit node credentials in n8n.

![Getting Orbit credentials](/_images/integrations/credentials/orbit/orbit-workspace-api-token.gif)

## Further Reference

- [Orbit API Documentation](https://docs.orbit.love)
