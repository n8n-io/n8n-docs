---
title: NVIDIA Nemotron credentials
description: Documentation for NVIDIA Nemotron credentials. Use these credentials to authenticate NVIDIA Nemotron in n8n, a workflow automation platform.
contentType: [integration, reference]
priority: critical
---

# NVIDIA Nemotron credentials

You can use these credentials to authenticate the following nodes:

- [NVIDIA Nemotron Chat Model](/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatnvidia.md)

A single credential covers both deployment modes:

- **Cloud**: NVIDIA-hosted Nemotron models on [build.nvidia.com](https://build.nvidia.com/){:target="_blank" .external-link}.
- **Self-hosted NIM**: a [NVIDIA Inference Microservice](https://docs.nvidia.com/nim/){:target="_blank" .external-link} container running on your own infrastructure.

## Prerequisites

For cloud access, create an [NVIDIA build](https://build.nvidia.com/){:target="_blank" .external-link} account.

For self-hosted access, run a NIM container that exposes an OpenAI-spec compatible endpoint. Refer to [NVIDIA NIM documentation](https://docs.nvidia.com/nim/){:target="_blank" .external-link} for setup guidance.

## Supported authentication methods

- API key (optional when connecting to a self-hosted NIM that doesn't enforce authentication)

## Related resources

Refer to NVIDIA's [build catalogue](https://build.nvidia.com/models){:target="_blank" .external-link} for the list of available Nemotron models and to the [NIM documentation](https://docs.nvidia.com/nim/){:target="_blank" .external-link} for self-hosting guidance.

## Using API key

To configure this credential, you'll need:

- A **Base URL**: the OpenAI-spec compatible endpoint to call. Use the default `https://integrate.api.nvidia.com/v1` for build.nvidia.com cloud, or replace it with your self-hosted NIM URL (for example, `http://localhost:8000/v1`).
- An **API Key**: required for build.nvidia.com cloud. Leave blank for a self-hosted NIM that doesn't require authentication.

To generate an API key for build.nvidia.com:

1. Sign in to your [NVIDIA build](https://build.nvidia.com/){:target="_blank" .external-link} account.
2. Open a Nemotron model in the catalogue and select **Get API Key**.
3. Copy your key and add it as the **API Key** in n8n.

To connect to a self-hosted NIM:

1. Set **Base URL** to your NIM endpoint, including the `/v1` path (for example, `http://localhost:8000/v1`).
2. If your NIM requires authentication, paste the token into **API Key**. Otherwise, leave the field blank.
