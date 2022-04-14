# Elastic Security

You can use these credentials to authenticate the following nodes:

- [Elastic Security](/integrations/nodes/n8n-nodes-base.elasticSecurity/)

## Prerequisites

- Create an [Elastic Security](https://www.elastic.co/security) account.
- [Deploy](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html) an application.

## Using Basic Auth

**From Elastic Security**:

1. Navigate to your ***Dashboard*** > ***Deployments*** section and open the dashboard for the desired deployment.
2. From the ***Applications*** section, copy the endpoint of your application.

**From n8n**:

1. In the ***Credential Data*** section, enter your:
    * Username
    * Password
    * Base URL: The application endpoint obtained above.
2. Click ***Save*** to save your credentials.
