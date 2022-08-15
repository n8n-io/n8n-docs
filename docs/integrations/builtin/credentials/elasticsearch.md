# Elasticsearch

You can use these credentials to authenticate the following nodes:

- [Elasticsearch](/integrations/builtin/app-nodes/n8n-nodes-base.elasticsearch/)

## Prerequisites

- Create an [Elasticsearch](https://www.elastic.co/) account.
- [Deploy](https://www.elastic.co/guide/en/cloud/current/ec-create-deployment.html) an application.

## Using Basic Auth

**From Elasticsearch**:

1. Navigate to your ***Dashboard*** > ***Deployments*** section and open the dashboard for the desired deployment.
2. From the ***Applications*** section, copy the endpoint of the Elasticsearch application.

**From n8n**:

1. Enter a descriptive ***Credentials Name***.
2. In the ***Credential Data*** section, enter your:
    * Username
    * Password
    * Base URL: The Elasticsearch application endpoint obtained above.
3. Click ***Create*** to save your credentials.
