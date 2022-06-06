# NocoDB

You can use these credentials to authenticate the following nodes:

- [NocoDB](/integrations/nodes/n8n-nodes-base.nocoDb/)

## Prerequisites

* Install [NocoDB](https://www.nocodb.com/)
* Optional: Enable [API Access](https://docs.nocodb.com/developer-resources/api-tokens)

## Using Auth Token

From NocoDB Project:

1. Click the rightmost button and click **Copy auth token**.

![NocoDB Auth](/_images/integrations/nodes/nocodb/xc-auth.png)

From n8n:

1. Enter a descriptive ***Credentials Name***.
2. In the **Credentials Data** section enter the following:
    * ***API Token***: The authentication token for your NocoDB project.
    * ***Host***: The host of your NocoDB instance, for example `http://localhost:8080`.
3. Click **Create** to save your new credentials.

## Using API Token

From NocoDB Project: Enable [API Access](https://docs.nocodb.com/developer-resources/api-tokens)

From n8n:

1. Enter a descriptive ***Credentials Name***.
2. In the ***Credentials Data*** section enter the following:
    * ***API Token***: The authentication token for your NocoDB project, obtained when enabling API access (above).
    * ***Host***: The host of your NocoDB instance, for example `http://localhost:8080`.
3. Click **Create** to save your new credentials.
