---
permalink: /credentials/baserow
description: Learn to configure credentials for the Baserow node in n8n
---

# Baserow

You can use these credentials to authenticate the following node with Baserow.
- [Baserow](../../nodes-library/nodes/Baserow/README.md)

## Prerequisites

Create an [Baserow](https://baserow.io/) account on any hosted baserow instance
or a self hosted instance.

## Using API Key

1. Open your Baserow dashboard.
2. Click on the user menu on the top left and select 'Settings' from the dropdown list.
3. Select the **API Tokens** section and click on the **Create token +** button.
4. Choose a name and give the rights to the group you want.
5. Since you key is created, click on the **...** next to the token name and copy the token.
6. Go back to n8n and enter a name for your credentials in the **Credentials Name** field in the 'Baserow API' credentials.
7. Paste the API token in the **API Token** field in the 'Baserow API' credentials in n8n.
8. Click on the **Create** button to create the credentials.
