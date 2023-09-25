---
contentType: howTo
title: Access LangChain in n8n
description: How to get the n8n version that includes LangChain
---

# Access LangChain in n8n

!!! info "Feature availability"
	This feature is available on Cloud and self-hosted n8n, at all pricing tiers. To access it, you need either a separate Cloud account, or the LangChain n8n Docker image.

## Self-hosted

Try out LangChain in n8n by fetching the Docker image:

```sh
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n docker.n8n.io/n8nio/n8n:ai-beta
```

If using data volumes:

```sh
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n:ai-beta
```

Refer to [Installation | Docker](/hosting/installation/docker/) for more information on using n8n Docker images.

## Cloud

Go to [Try AI](https://app.n8n.cloud/try-ai){:target=_blank .external-link}.

You need to create a new account. This is separate to your existing n8n Cloud account.

n8n offers a 14-day free trial to try AI.

## Send feedback, join the conversation, and get help

Send feedback to ai@n8n.io.

Workshops and discussion of LangChain in n8n are on [Discord](https://discord.gg/bAt54txhHg){:target=_blank .external-link}. Join to share your projects and discuss ideas with the community.

Support is available on the [forum](https://community.n8n.io/){:target=_blank .external-link}.
