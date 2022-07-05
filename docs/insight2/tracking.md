---
id: tracking
title: Tracking
slug: /tracking
---

# Tracking    

:::tip
Insight does not store any data fetched from the data sources. Insight acts as a proxy and the data from data sources is sent to the client application without storing.
:::

## Server

:::tip
Self-hosted version of Insight pings our server to fetch the latest product updates every 24 hours. You can disable this by setting the value of `CHECK_FOR_UPDATES` environment variable to `0`. This feature is enabled by default.
:::

## Client 

Insight tracks anonymous usage data such as page loads and clicks. Insight tracks only the events and doesn't capture data from data sources.

Tracking can be disabled by setting the value environment variable `ENABLE_TRACKING` to `0`. 
