---
layout:
  width: default
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Deploy

n8n offers two different deployment methods. [n8n Cloud](use-n8n-cloud/) gives fast, managed setup on an instance run by n8n. [Self-hosted n8n](host-n8n/) lets you run n8n on your own machine or infrastructure.\
\
**Deploy** documentation helps you deploy, configure, secure, and maintain n8n in either model.

<table data-view="cards"><thead><tr><th>Deployment option</th><th data-card-target data-type="content-ref">Go to section</th></tr></thead><tbody><tr><td><strong>Use n8n Cloud</strong><br>Managed by n8n. Get started quickly, with less operational work.</td><td><a href="use-n8n-cloud/">use-n8n-cloud</a></td></tr><tr><td><strong>Self-host n8n</strong><br>Run n8n yourself with Docker, npm, Docker Compose, or a supported platform.</td><td><a href="host-n8n/">host-n8n</a></td></tr></tbody></table>

### Compare deployment options

Below is a high-level overview of each option. If you're still deciding, see [Choose your n8n](https://n8n.gitbook.io/n8n-docs-next/fTXFsp54tRnnn2McXCeU/choose-how-to-use-n8n).

#### Use n8n Cloud

n8n Cloud is the managed option. n8n runs the instance for you.

Choose Cloud if you want to:

* Start fast with minimal setup
* Reduce infrastructure and maintenance work
* Use Cloud-specific admin and configuration tools

{% content-ref url="use-n8n-cloud/" %}
[use-n8n-cloud](use-n8n-cloud/)
{% endcontent-ref %}

#### Self-host n8n

Self-hosting gives you control over how n8n runs and how your environment is managed.

Choose self-hosting if you want to:

* Run n8n on your own infrastructure
* Finely control upgrades, configuration, and security
* Design for custom scaling or platform requirements

<table data-view="cards"><thead><tr><th>Self-hosted topic</th><th data-card-target data-type="content-ref">Open</th></tr></thead><tbody><tr><td><strong>Host n8n overview</strong><br>Start with the main self-hosted landing page.</td><td><a href="host-n8n/">host-n8n</a></td></tr><tr><td><strong>Install options</strong><br>Set up n8n with Docker, npm, Docker Compose, or a cloud provider.</td><td><a href="host-n8n/install-options/">install-options</a></td></tr><tr><td><strong>Configure n8n</strong><br>Manage databases, environment variables, users, licenses, and security settings.</td><td><a href="host-n8n/configure-n8n/">configure-n8n</a></td></tr><tr><td><strong>Keep n8n running</strong><br>Monitor, log, trace, and update your instance.</td><td><a href="host-n8n/keep-n8n-running/">keep-n8n-running</a></td></tr><tr><td><strong>Understand the architecture</strong><br>Learn how n8n works and how the database is structured.</td><td><a href="host-n8n/understand-the-architecture/">understand-the-architecture</a></td></tr></tbody></table>

{% content-ref url="host-n8n/" %}
[host-n8n](host-n8n/)
{% endcontent-ref %}