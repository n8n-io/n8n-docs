---
title: n8n Hosting Documentation and Guides
description: >-
  Access n8n hosting documentation and guides for setting up and managing
  self-hosted n8n instances.
contentType: overview
hide:
  - toc
  - feedback
  - kapaButton
nodeTitle: Host n8n
originalFilePath: hosting/index.md
originalUrl: 'https://docs.n8n.io/hosting'
url: 'https://docs.n8n.io/deploy/'
layout:
  description:
    visible: false
---

# Self-hosting n8n <a href="#self-hosting-n8n" id="self-hosting-n8n"></a>

You can self-host n8n on your own infrastructure, on-premises, or in a private cloud, using Docker Compose, one-line setup, or other deployment methods. Not sure if self-hosting is right for you? See [Choose how to use n8n](https://app.gitbook.com/s/CxSeOtVxqqhfxMSac0AV/choose-how-to-use-n8n).

{% hint style="success" %}
**Don't want to read the docs? Run this:**

```bash
curl -fsSL https://get.n8n.io | sh
```

Requires Docker on Linux or macOS (or WSL on Windows). Sets up n8n locally in one step. See the [one-line setup guide](install-options/one-line-setup.md) for what it does, or keep reading to compare every installation method.
{% endhint %}

All self-hosted installations use the same core product. Without a license key, n8n runs as the free Community edition. Adding a Business or Enterprise license key enables those editions. See [Compare editions](community-edition-features.md) for the differences between the self-hosted editions.

## Choose your installation method <a href="#choose-your-installation-method" id="choose-your-installation-method"></a>

Select the installation method that best fits your technical requirements and infrastructure:

- __One-line setup__

	**Best for:** Quick setup with minimal configuration.
	
	**Requirements:** Linux or macOS system with curl installed.
	
	Automated installation script that handles all dependencies and configuration for you.

	[One-line setup guide](install-options/one-line-setup.md)

- __Docker Compose__

	**Best for:** Production deployments with databases and additional services.
	
	**Requirements:** Docker and Docker Compose installed on your system.
	
	Multi-container setup ideal for robust deployments with persistent data and scalability.

	[Docker Compose guide](install-options/install-using-docker-compose.md)

- __AWS__

	Deploy on Amazon Web Services using EC2, ECS, or other AWS services.

	[AWS setup guide](install-options/use-a-cloud-provider/deploy-to-aws.md)

- __Azure__

	Host n8n on Microsoft Azure with container instances or virtual machines.

	[Azure setup guide](install-options/use-a-cloud-provider/deploy-to-azure.md)

- __Google Cloud__

	Run n8n on Google Cloud using Cloud Run or Kubernetes Engine.

	[Google Cloud Run](install-options/use-a-cloud-provider/deploy-to-google-cloud-run.md) | [Kubernetes Engine](install-options/use-a-cloud-provider/deploy-to-google-kubernetes.md)

- __DigitalOcean__

	Simple droplet-based hosting ideal for small to medium deployments.

	[DigitalOcean setup guide](install-options/use-a-cloud-provider/deploy-to-digital-ocean.md)

- __Hetzner__

	Cost-effective European hosting option with excellent performance.

	[Hetzner setup guide](install-options/use-a-cloud-provider/deploy-to-hetzner.md)

- __Heroku__

	Platform-as-a-service option for quick deployment with minimal configuration.

	[Heroku setup guide](install-options/use-a-cloud-provider/deploy-to-heroku.md)

- __OpenShift__

	Enterprise Kubernetes platform for containerized applications.

	[OpenShift setup guide](install-options/use-a-cloud-provider/deploy-to-openshift-local-crc.md)

- __npm__

	**Best for:** Local development or testing.
	
	**Requirements:** Node.js installed on your system.
	
	npm installation is deprecated from n8n 3.0. Consider using Docker Compose or one-line setup instead.
	
	Installs n8n directly using Node Package Manager. Quick to set up but requires managing Node.js versions and dependencies yourself.

	[npm installation guide](install-options/install-with-npm.md)
