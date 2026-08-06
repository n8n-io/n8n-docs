---
title: SSRF protection environment variables
description: Configure SSRF protection for your self-hosted n8n instance.
contentType: reference
tags:
  - environment variables
hide:
  - toc
  - tags
nodeTitle: SSRF protection
originalFilePath: hosting/configuration/environment-variables/ssrf-protection.md
originalUrl: >-
  https://docs.n8n.io/hosting/configuration/environment-variables/ssrf-protection
url: >-
  https://docs.n8n.io/deploy/host-n8n/configure-n8n/basic-configuration/use-environment-variables/ssrf-protection
layout:
  description:
    visible: false
---

# SSRF protection environment variables <a href="#ssrf-protection-environment-variables" id="ssrf-protection-environment-variables"></a>

{% include "https://app.gitbook.com/s/GixZThfitWP21x2gQFpD/~/reusable/ASsLuMLGKMy2O0q7awMF/" %}

Server-Side Request Forgery (SSRF) is an attack that tricks a server into making HTTP requests to addresses an attacker chooses, such as internal-only targets like `localhost`, private network ranges, or a cloud provider's metadata endpoint (`169.254.169.254`). Because workflows can build request URLs from user-controlled input, n8n can guard outbound requests whose destination comes from that input.

SSRF protection is off by default. This page lists the variables that turn it on and tune it.

## What protection covers

| Variable | Type | Default | Description |
| :------- | :--- | :------ | :---------- |
| `N8N_SSRF_PROTECTION_ENABLED` | Boolean | `false` | Turns on SSRF protection for requests to user-controllable targets. |
| `N8N_SSRF_BLOCKED_IP_RANGES` | String | `default` | Comma-separated CIDR ranges to block. The keyword `default` (case-insensitive) expands to n8n's built-in set. Append your own ranges: `default,100.64.0.0/10`. |
| `N8N_SSRF_ALLOWED_IP_RANGES` | String | `-` | Comma-separated CIDR ranges to allow. Takes precedence over the block list, so use it to reach a known internal host. |
| `N8N_SSRF_ALLOWED_HOSTNAMES` | String | `-` | Comma-separated hostnames to allow. Supports a leading `*.` wildcard: `*.internal.example.com` matches any subdomain, including nested ones, but not the bare domain. Matching is case-insensitive. |
| `N8N_SSRF_BLOCKED_HOSTNAMES` | String | `-` | Comma-separated hostnames to deny by name, checked before DNS resolution. Uses the same leading `*.` wildcard and case-insensitive matching as `N8N_SSRF_ALLOWED_HOSTNAMES`. An allowed hostname always overrides a blocked one. |
| `N8N_SSRF_DNS_CACHE_MAX_SIZE` | Number | `1048576` | Maximum size of the internal DNS-resolution cache, in bytes (1 MB by default). n8n evicts the least recently used entries when the cache is full. |

n8n logs a warning and skips any invalid CIDR range you set in `N8N_SSRF_BLOCKED_IP_RANGES` or `N8N_SSRF_ALLOWED_IP_RANGES`, so a typo won't stop the instance from starting.

### Blocked by default

When `N8N_SSRF_BLOCKED_IP_RANGES` includes `default`, n8n blocks these ranges:

- Private networks ([RFC 1918](https://datatracker.ietf.org/doc/html/rfc1918)): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
- Loopback: `127.0.0.0/8`, `::1/128`
- Link-local, including cloud metadata: `169.254.0.0/16`, `fe80::/10`
- IPv6 unique-local: `fc00::/7`, `fd00::/8`
- Reserved or special-purpose: `0.0.0.0/8`, `192.0.0.0/24`, `192.0.2.0/24`, `198.18.0.0/15`, `198.51.100.0/24`, `203.0.113.0/24`

## How n8n evaluates a request

n8n checks each destination in this order and stops at the first match:

1. **Allowed hostname**: if the request hostname matches `N8N_SSRF_ALLOWED_HOSTNAMES`, n8n allows the request.
2. **Blocked hostname**: if the request hostname matches `N8N_SSRF_BLOCKED_HOSTNAMES`, n8n blocks the request. This check runs before DNS resolution, so n8n rejects the name without a lookup, even if it would resolve to a public IP.
3. **Allowed IP range**: if the resolved IP matches `N8N_SSRF_ALLOWED_IP_RANGES`, n8n allows the request.
4. **Blocked IP range**: if the resolved IP matches `N8N_SSRF_BLOCKED_IP_RANGES`, n8n blocks the request.
5. **Otherwise**: n8n allows the request.

Because n8n checks the allow lists first, an allow entry always overrides the block list.

## Common scenarios

Reach an internal service on purpose. If a workflow must call an internal host, allow just that target rather than turning off protection:

```bash
N8N_SSRF_PROTECTION_ENABLED=true
N8N_SSRF_ALLOWED_IP_RANGES=10.20.0.5/32
```

Allow an internal hostname:

```bash
N8N_SSRF_ALLOWED_HOSTNAMES=*.svc.cluster.local
```

Tighten beyond the defaults. Add ranges specific to your environment:

```bash
N8N_SSRF_BLOCKED_IP_RANGES=default,100.64.0.0/10
```

Deny a hostname by name. Block a host and all its subdomains, regardless of the IP it resolves to:

```bash
N8N_SSRF_BLOCKED_HOSTNAMES=example.com,*.example.com
```

{% hint style="info" %}
**Hostname blocking is egress governance, not SSRF hardening**

`N8N_SSRF_BLOCKED_HOSTNAMES` denies by name, so callers can still reach the same destination through an IP literal, an alternate hostname, or DNS rebinding. Use it to discourage known unwanted destinations, but rely on the IP-based block list for SSRF protection.
{% endhint %}

## When n8n blocks a request

A request blocked by IP fails with the error "The request was blocked because it resolves to a restricted IP address". A request blocked by hostname fails with "The request was blocked because the destination hostname is restricted". Both descriptions name the target and tell the user to ask their n8n administrator to allow the hostname or IP range. Add the expected target to `N8N_SSRF_ALLOWED_IP_RANGES` or `N8N_SSRF_ALLOWED_HOSTNAMES` if the request is genuine.

{% hint style="warning" %}
**Review allow lists before enabling in production**

Protection is off by default so it doesn't break existing self-hosted setups that call internal services. Before you turn it on, list the internal hosts your workflows need and add them to the allow lists. Prefer narrow allow entries, such as a single host or hostname, over turning protection off.
{% endhint %}
