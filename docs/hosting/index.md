---
title: n8n Hosting Documentation and Guides
description: Access n8n hosting documentation and guides. Find comprehensive resources to help you set up and manage your self-hosted n8n instances.
contentType: overview
hide:
  - toc
  - feedback
  - kapaButton
---

# Self-hosting n8n

All self-hosted installations use the same core product. Without a license key, n8n runs as the free [Community edition](/hosting/community-edition-features.md). Adding a Business or Enterprise license key enables those editions.

## Choose your installation method

Select the installation method that best fits your technical requirements and infrastructure:

### Quick start options

- __npm__

	**Best for:** Local development, testing, or simple single-server deployments.
	
	**Requirements:** Node.js installed on your system.
	
	Installs n8n directly using Node Package Manager. Quick to set up but requires managing Node.js versions and dependencies yourself.

	[npm installation guide](/hosting/installation/npm.md)

- __Docker__

	**Best for:** Isolated environments, easy updates, and consistent deployments.
	
	**Requirements:** Docker installed on your system.
	
	Runs n8n in a container with all dependencies included. Simplifies installation and updates.

	[Docker installation guide](/hosting/installation/docker.md)

### Cloud platform setups

Deploy n8n on managed cloud infrastructure for production environments:

- __AWS__

	Deploy on Amazon Web Services using EC2, ECS, or other AWS services.

	[AWS setup guide](/hosting/installation/server-setups/aws.md)

- __Azure__

	Host n8n on Microsoft Azure with container instances or virtual machines.

	[Azure setup guide](/hosting/installation/server-setups/azure.md)

- __Google Cloud__

	Run n8n on Google Cloud using Cloud Run or Kubernetes Engine.

	[Google Cloud Run](/hosting/installation/server-setups/google-cloud-run.md) | [Kubernetes Engine](/hosting/installation/server-setups/google-kubernetes-engine.md)

- __DigitalOcean__

	Simple droplet-based hosting ideal for small to medium deployments.

	[DigitalOcean setup guide](/hosting/installation/server-setups/digital-ocean.md)

- __Hetzner__

	Cost-effective European hosting option with excellent performance.

	[Hetzner setup guide](/hosting/installation/server-setups/hetzner.md)

- __Heroku__

	Platform-as-a-service option for quick deployment with minimal configuration.

	[Heroku setup guide](/hosting/installation/server-setups/heroku.md)

- __OpenShift__

	Enterprise Kubernetes platform for containerized applications.

	[OpenShift setup guide](/hosting/installation/server-setups/openshift-crc.md)

- __Docker Compose__

	Multi-container setup ideal for production deployments with databases and additional services.

	[Docker Compose guide](/hosting/installation/server-setups/docker-compose.md)
