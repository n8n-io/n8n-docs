---
description: n8n performance and resource consumption benchmarking.
---

# Benchmarking

This document outlines n8n's performance benchmarking. It describes the factors that affect performance, and includes two example benchmarks.

## Performance factors

n8n can handle up to 220 workflow executions per second on a single instance, while still responding to requests [TODO: check seconds vs ms], with the ability to scale up further by adding more instances.

The performance of n8n depends on factors including: 

* The type of workflow
* The resources available to n8n
* How you configure n8n's scaling options. 



## Run your own benchmarking

To get an accurate estimate for your use case, run n8n's [benchmarking framework](https://github.com/n8n-io/n8n-benchmarking){:target=_blank .external-link}. The repository contains more information about the benchmarking.

## Example: Single instance performance

<figure markdown>
  ![Graph showing n8n response times by requests per second](/_images/hosting/scaling/benchmarking-single-instance-100-250.png)
  <figcaption>This graph shows the percentage of requests getting a response within 100 seconds, and how that varies with load. Under higher loads n8n usually still processes the data, but takes over 100s to respond.</figcaption>
</figure>

Setup:

- Hardware: ECS c5a.large instance (4GB RAM)
- n8n setup: Single n8n instance (running in main mode, with Postgres database)
- Workflow: Webhook node, Set node

## Example: Multi-instance performance

<figure markdown>
  ![Graph showing n8n response times by requests per second](/_images/hosting/scaling/benchmarking-multi-instance-500-2500.png)
  <figcaption>This graph shows the percentage of requests getting a response within 100 seconds, and how that varies with load. Under higher loads n8n usually still processes the data, but takes over 100s to respond.</figcaption>
</figure>

Setup:

- Hardware: seven ECS c5a.4xlarge instances (8GB RAM each)
- n8n setup: two webhook instances, four worker instances, one database instance (MySQL), one main instance running n8n and Redis
- Workflow: Webhook node, Set node
