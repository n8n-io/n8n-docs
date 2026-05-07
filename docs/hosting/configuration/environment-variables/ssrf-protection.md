---
title: SSRF protection environment variables
description: Configure SSRF protection for your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
---

# SSRF protection environment variables

--8<-- "_snippets/self-hosting/file-based-configuration.md"

These variables control [SSRF protection](/hosting/securing/ssrf-protection.md) for nodes that make HTTP requests to user-controllable targets.

| Variable | Type  | Default  | Description |
| :------- | :---- | :------- | :---------- |
| `N8N_SSRF_PROTECTION_ENABLED` | Boolean | `false` | Whether to enable SSRF protection for nodes making HTTP requests. |
| `N8N_SSRF_BLOCKED_IP_RANGES` | String | Standard private/reserved ranges | Comma-separated CIDR ranges to block. Use `default` to include the [standard blocked ranges](/hosting/securing/ssrf-protection.md#default-blocked-ranges), optionally combined with custom ranges (for example: `default,100.0.0.0/8`). |
| `N8N_SSRF_ALLOWED_IP_RANGES` | String | - | Comma-separated CIDR ranges to allow. Takes precedence over the blocked ranges. |
| `N8N_SSRF_ALLOWED_HOSTNAMES` | String | - | Comma-separated hostname patterns to allow. Supports wildcards (for example: `*.n8n.internal`). Takes precedence over blocked IP ranges. |
| `N8N_SSRF_DNS_CACHE_MAX_SIZE` | Number | `1048576` | Maximum DNS cache size in bytes. Uses LRU eviction when the limit is reached. Default is 1 MB. |
