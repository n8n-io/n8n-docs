---
contentType: howTo
title: Access LangChain in n8n
description: How to get the n8n version that includes LangChain
---

# Access LangChain in n8n

!!! info "Feature availability"
	This feature is available on Cloud and self-hosted n8n. To access it, you need either a separate Cloud account, or the LangChain n8n Docker image.

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

You need to create a new account. This is separate to your existing n8n Cloud account. n8n offers a 14-day free trial to try AI.

1. Go to [Register](https://app.n8n.cloud/try-ai){:target=_blank .external-link}.
2. Enter your details, then select **Try for free**.
3. n8n prompts you to choose your n8n flavor. Select **n8n with LangChain**, then select **Continue**.

!!! note "Existing n8n users can't reuse email address"
	If you have an existing n8n Cloud account, you must use a different email address when signing up for the AI trial.

## Browse the LangChain nodes

1. Create a new workflow.
1. Select **Add node** <span class="inline-image">![Add node icon](/_images/common-icons/nodes-panel.png)</span> to open the nodes panel. 
1. Select **Advanced AI**
1. Explore the options. Refer to [LangChain concepts in n8n](/langchain/langchain-n8n/) for a list of available nodes, and how they relate to LangChain functionality.

## Send feedback, join the conversation, and get help

Send feedback to ai@n8n.io.

Workshops and discussion of LangChain in n8n are on [Discord](https://discord.gg/bAt54txhHg){:target=_blank .external-link}. Join to share your projects and discuss ideas with the community.

Support is available on the [forum](https://community.n8n.io/){:target=_blank .external-link}.
