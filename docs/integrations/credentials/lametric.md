# Lametric

You can use these credentials to authenticate the following nodes: 

- [Lametric](/integrations/nodes/n8n-nodes-base.lametric/)
- [Spotify](/integrations/nodes/n8n-nodes-base.spotify/)

## Prerequisites

You need to have an account on the [LaMetric developer portal](https://developer.lametric.com) and the device needs to be registered there. 

## Basic authorization, integrated in the LaMetric node

You can find the detailed documentation about basic authorization in the [official LaMetric documentation](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/device-authorization.html). 

Steps to connect to the device: 


1. Access your [LaMetric developer portal](https://developer.lametric.com) dashboard. Click on the user dropdown menu on the top right and select *My devices* 
![LaMetric developer portal](/_images/integrations/credentials/lametric/lametricDeveloper1.png)
2. In this tab, we can see our device, its name and the apiKey
![LaMetric developer portal](/_images/integrations/credentials/lametric/lametricDeveloper2.png)
3. In the n8n project, insert one *LaMetric node*. 
![LaMetric Node](/_images/integrations/credentials/lametric/lametricNode.png)
4. On the LaMetric menu, select the *credential for LaMetric -> create new*. Add the credentials: user (according to the documentation, this user is always *dev*), Api Key and URL (make sure that the device can be reached by the n8n instance)
![LaMetric Credentials](/_images/integrations/credentials/lametric/lametricCredentials.png)

## Alternative way

LaMetric also offers oauth2 authorization. Please, go [here](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/cloud-authorization.html) for more information 
