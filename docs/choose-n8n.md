---
description: Choose between our Cloud service, or self-hosting options. Learn more about licenses and n8n payment plans.
contentType: overview
---

# Choose your n8n

n8n offers two primary deployment options:

- **n8n Cloud**: A fully-managed hosted solution with no installation required
- **Self-hosted**: Deploy n8n on your own infrastructure using npm, Docker, or server setups

## Feature Comparison

### Self-hosted Community Edition

The Community Edition includes almost the complete feature set of n8n, **except** for these features:

| Feature Category | Not Available in Community Edition | Available In |
|-----------------|-----------------------------------|--------------|
| **Variables & Configuration** | Custom Variables | Enterprise editions, some Cloud paid plans |
| **Environments** | Environments | Enterprise editions, some Cloud paid plans |
| **Secrets Management** | External secrets | Enterprise editions, some Cloud paid plans |
| **Storage** | External storage for binary data | Enterprise editions |
| **Logging** | Log streaming (standard logging IS included) | Enterprise editions |
| **Scaling** | Multi-main mode (queue mode IS included) | Enterprise editions |
| **Organization** | Projects | Enterprise editions, some Cloud paid plans |
| **Authentication** | SSO (SAML, LDAP) | Enterprise editions |
| **Collaboration** | Workflow and credential sharing** | Enterprise editions, some Cloud paid plans |
| **Version Control** | Version control using Git | Enterprise editions, some Cloud paid plans |

\*\* In Community Edition, only the instance owner and the user who creates workflows/credentials can access them.

### Self-hosted Registered Community Edition (Free)

By registering your Community Edition with your email, you unlock these additional features:

| Feature | Description |
|---------|-------------|
| Folders | Organize your workflows into folders |
| Debug in editor | Copy and pin execution data when working on a workflow |
| Custom execution data | Save, find, and annotate execution metadata |

### n8n Cloud vs Self-hosted Enterprise

Both n8n Cloud (Enterprise plan) and Self-hosted Enterprise editions include all the features listed above that are missing from the Community Edition.

For specific details on which features are available on Cloud Starter, Pro, and Business self-hosted plans, see the [pricing page](https://n8n.io/pricing/).

## Pros and Cons Comparison

| Aspect | n8n Cloud | Self-hosted |
|--------|-----------|-------------|
| **Setup & Deployment** |
| Installation | ✅ No installation needed | ❌ Requires setup (npm, Docker, or server) |
| Technical expertise | ✅ None required | ❌ Required for installation and configuration |
| **Infrastructure Management** |
| Hosting | ✅ Fully hosted by n8n | ❌ You must provide and manage infrastructure |
| Maintenance | ✅ Handled by n8n | ❌ Your responsibility |
| **Control & Customization** |
| Deployment control | ❌ Managed by n8n | ✅ Full control over deployment |
| Customization | ❌ Limited to available options | ✅ Recommended for customized use cases |
| **Cost** |
| Free option | ⚠️ Free trial available | ✅ Free Community Edition with most features |
| Paid options | ✅ Range of paid plans | ✅ Paid Enterprise option available |
| **Features** |
| Core features | ✅ Included | ✅ Included in free Community Edition |
| Enterprise features | ❌ Requires paid plans | ❌ Requires Enterprise license (free Community limited) |
| **Use Cases** |
| Quick start | ✅ Ideal for getting started | ⚠️ Takes longer to set up |
| Production use | ✅ Supported | ✅ Recommended for production |
| Custom requirements | ⚠️ Limited customization | ✅ Recommended for customized use cases |

**Legend**: ✅ Advantage | ❌ Disadvantage | ⚠️ Mixed/depends on needs

For detailed pricing and plan comparisons, see the [pricing page](https://n8n.io/pricing/).

## Decision Guide

| Your Situation | Recommended Option | Reason |
|----------------|-------------------|---------|
| Want to start quickly | **n8n Cloud** | No installation needed |
| Don't have technical expertise | **n8n Cloud** | Hosted solution, no setup required |
| Need production-ready deployment | **Both options work** | Both Cloud and self-hosted support production use |
| Have customized use cases | **Self-hosted** | Recommended for customization |
| Want most features for free | **Self-hosted Community Edition** | Free with almost complete feature set |
| Need folders and debugging features for free | **Registered Community Edition** | Free registration unlocks these features |
| Need enterprise features (SSO, environments, projects, etc.) | **Cloud (paid) or Self-hosted Enterprise** | These features require paid plans |
| Have infrastructure and technical resources | **Self-hosted** | Can manage your own deployment |

For specific feature availability across different Cloud and self-hosted plans, see the [pricing page](https://n8n.io/pricing/).

## Getting Started

### n8n Cloud

Visit [n8n Cloud](https://n8n.io/cloud/) to sign up for a free trial.

### Self-hosted

Refer to the [hosting documentation](/hosting/index.md) for installation options:

- [npm installation](/hosting/installation/npm.md)
- [Docker installation](/hosting/installation/docker.md)
- [Server setup guides](/hosting/installation/server-setups/index.md)

To register a Community Edition instance for additional features, go to **Settings > Usage and plan** and select **Unlock**.

## Additional Resources

- [Pricing details](https://n8n.io/pricing/)
- [Sustainable Use License](/sustainable-use-license.md)
- [Community Edition features](/hosting/community-edition-features.md)
- [Choose your n8n](/choose-n8n.md)