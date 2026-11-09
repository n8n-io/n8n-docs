---
title: NVIDIA Nemotron credentials
description: >-
  Documentation for NVIDIA Nemotron credentials. Use these credentials to
  authenticate NVIDIA Nemotron in n8n, a workflow automation platform.
contentType:
  - integration
  - reference
priority: critical
nodeTitle: NVIDIA Nemotron credentials
originalFilePath: integrations/builtin/credentials/nvidia.md
originalUrl: 'https://docs.n8n.io/integrations/builtin/credentials/nvidia'
url: 'https://docs.n8n.io/integrations/builtin/credentials/nvidia'
layout:
  description:
    visible: false
---

# NVIDIA Nemotron credentials <a href="#nvidia-nemotron-credentials" id="nvidia-nemotron-credentials"></a>

You can use these credentials to authenticate the following nodes:

- [NVIDIA Nemotron Chat Model](../cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatnvidia.md)

A single credential covers both deployment modes:

- **Cloud**: NVIDIA-hosted Nemotron models on [build.nvidia.com](https://build.nvidia.com/).
- **Self-hosted NIM**: a [NVIDIA Inference Microservice](https://docs.nvidia.com/nim/) container running on your own infrastructure.

## Prerequisites <a href="#prerequisites" id="prerequisites"></a>

For cloud access, create an [NVIDIA build](https://build.nvidia.com/) account.

For self-hosted access, run a NIM container that exposes an OpenAI-spec compatible endpoint. Refer to [NVIDIA NIM documentation](https://docs.nvidia.com/nim/) for setup guidance.

## Supported authentication methods <a href="#supported-authentication-methods" id="supported-authentication-methods"></a>

- API key (optional when connecting to a self-hosted NIM that doesn't enforce authentication)

## Related resources <a href="#related-resources" id="related-resources"></a>

Refer to NVIDIA's [build catalogue](https://build.nvidia.com/models) for the list of available Nemotron models and to the [NIM documentation](https://docs.nvidia.com/nim/) for self-hosting guidance.

## Using API key <a href="#using-api-key" id="using-api-key"></a>

To configure this credential, you'll need:

- A **Base URL**: the OpenAI-spec compatible endpoint to call. Use the default `https://integrate.api.nvidia.com/v1` for build.nvidia.com cloud, or replace it with your self-hosted NIM URL (for example, `http://localhost:8000/v1`).
- An **API Key**: required for build.nvidia.com cloud. Leave blank for a self-hosted NIM that doesn't require authentication.

To generate an API key for build.nvidia.com:

1. Sign in to your [NVIDIA build](https://build.nvidia.com/) account.
2. Open a Nemotron model in the catalogue and select **Get API Key**.
3. Copy your key and add it as the **API Key** in n8n.

To connect to a self-hosted NIM:

1. Set **Base URL** to your NIM endpoint, including the `/v1` path (for example, `http://localhost:8000/v1`).
2. If your NIM requires authentication, paste the token into **API Key**. Otherwise, leave the field blank.
