---
contentType: tutorial
nodeTitle: Deploy to Easypanel
url: >-
  https://docs.n8n.io/deploy/host-n8n/install-options/use-a-cloud-provider/deploy-to-easypanel
layout:
  description:
    visible: false
---

# Hosting n8n on Easypanel <a href="#hosting-n8n-on-easypanel" id="hosting-n8n-on-easypanel"></a>

[Easypanel](https://easypanel.io) is a self-hosted Docker deployment platform. n8n has a one-click deployment template there, which deploys n8n alongside a PostgreSQL database and a task runner.

## Use the deployment template <a href="#use-the-deployment-template" id="use-the-deployment-template"></a>

The quickest way to get started with deploying n8n to your own server through Easypanel is using the **Deploy on Easypanel** button:

[![Deploy on Easypanel](https://easypanel.io/img/deploy-on-easypanel-40.svg)](https://easypanel.io/templates/n8n)

This opens the n8n template on Easypanel. Easypanel generates the required secrets (database password, encryption key, runner auth token) automatically, and assigns a domain for the n8n service.

### Deploy n8n <a href="#deploy-n8n" id="deploy-n8n"></a>

Select **Deploy**. Easypanel provisions the n8n app service, its PostgreSQL database, and a task runner service, then starts them.

## Related resources

* [Use a cloud provider](./)
* [DigitalOcean](deploy-to-digital-ocean.md)
* [Heroku](deploy-to-heroku.md)
* [Hetzner Cloud](deploy-to-hetzner.md)
* [AWS](deploy-to-aws.md)
* [Azure](deploy-to-azure.md)
* [Google Cloud Run](deploy-to-google-cloud-run.md)
* [Google Kubernetes Engine](deploy-to-google-kubernetes.md)
* [OpenShift Local (CRC)](deploy-to-openshift-local-crc.md)
* [Use Docker Compose](use-docker-compose.md)
