---
description: n8n performance and resource consumption benchmarking.
---

# Benchmarking

This document outlines n8n's performance benchmarking.

## Summary

n8n can handle up to 220 workflow executions per second on a single instance, with the ability to scale up further by adding more instances.

The performance of n8n depends on many factors: the type of workflow, the resources available to n8n, and how you have configured [Scaling](/hosting/scaling/). To get an accurate estimate for your use case, run our [benchmarking framework](https://github.com/n8n-io/n8n-benchmarking){:target=_blank .external-link}.

## Single instance performance

<figure markdown>
  ![Graph showing n8n response times by requests per second](/_images/hosting/scaling/benchmarking-single-instance-100-140.png)
  <figcaption>This graph shows the percentage of requests getting a response within 100 seconds, and how that varies with load. Under higher loads n8n usually still processes the data, but takes over 100s to respond.</figcaption>
</figure>

<figure markdown>
  ![Graph showing n8n response times by requests per second](/_images/hosting/scaling/benchmarking-single-instance-100-250.png)
  <figcaption>This graph shows the percentage of requests getting a response within 100 seconds, and how that varies with load. Under higher loads n8n usually still processes the data, but takes over 100s to respond.</figcaption>
</figure>



